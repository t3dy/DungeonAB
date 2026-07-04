/**
 * Tests for campaign mode — the long game.
 * (Megabase procgen chat: surviving teams carry equipment to a
 * progressively harder dungeon after resting and spending gold
 * in town.)
 */

import { strict as assert } from 'assert';
import { Campaign, TOWN_PRICES, hireCost } from '../src/game/Campaign.js';
import { generateDungeon, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, PERSONALITY_CARDS, CLASSES } from '../src/game/Cards.js';
import { composeTownInterlude } from '../src/narrative/Narrator.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);
const cleric = CHARACTER_CARDS.find(c => c.class === CLASSES.CLERIC);
const wizard = CHARACTER_CARDS.find(c => c.class === CLASSES.WIZARD);
const shield = EQUIPMENT_CARDS.find(e => e.id === 'eq-tower-shield');
const bolt = SPELL_CARDS.find(s => s.use === 'combat');
const pious = PERSONALITY_CARDS.find(c => c.archetype === 'pious');

describe('Depth scaling', () => {
  test('deeper dungeons grow meaner monsters', () => {
    const shallow = generateDungeon('depth-test', 'medium', { theme: 'delve', depth: 1 });
    const deep = generateDungeon('depth-test', 'medium', { theme: 'delve', depth: 4 });
    const avg = d => {
      const ms = d.rooms.filter(r => r.monster).map(r => r.monster);
      return ms.reduce((s, m) => s + m.attack + m.health, 0) / ms.length;
    };
    assert.ok(avg(deep) > avg(shallow), `depth 4 outmuscles depth 1 (${avg(deep)} > ${avg(shallow)})`);
  });

  test('deeper dungeons pay better', () => {
    // Same seed, same rng draws — gold differs only by the depth multiplier
    const shallow = generateDungeon('gold-test', 'medium', { theme: 'delve', depth: 1 });
    const deep = generateDungeon('gold-test', 'medium', { theme: 'delve', depth: 3 });
    const sGold = shallow.rooms.filter(r => r.gold).map(r => r.gold);
    const dGold = deep.rooms.filter(r => r.gold).map(r => r.gold);
    if (sGold.length && dGold.length) {
      assert.ok(dGold[0] > sGold[0], `treasure scales (${dGold[0]} > ${sGold[0]})`);
    }
  });

  test('deeper traps bite harder', () => {
    const shallow = generateDungeon('trap-depth', 'medium', { theme: 'delve', depth: 1 });
    const deep = generateDungeon('trap-depth', 'medium', { theme: 'delve', depth: 5 });
    const maxTrap = d => Math.max(0, ...d.rooms.filter(r => r.trapDamage).map(r => r.trapDamage));
    if (maxTrap(shallow) > 0 && maxTrap(deep) > 0) {
      assert.ok(maxTrap(deep) > maxTrap(shallow));
    }
  });
});

describe('The campaign carries the party', () => {
  test('the same Party object walks into every dungeon', () => {
    const campaign = new Campaign([fighter, cleric, shield, bolt], { seed: 'carry-1' });
    const sim1 = campaign.nextDelve('delve');
    assert.equal(sim1.party, campaign.party, 'delve 1 uses the campaign party');
    assert.equal(sim1.depth, 1);

    // Scars, loot, and spells persist to the next dungeon
    campaign.party.gold = 77;
    campaign.party.members[0].takeDamage(5);
    sim1.victory = true; // pretend the delve was won
    campaign.recordDelve(sim1);

    const sim2 = campaign.nextDelve('crypt');
    assert.equal(sim2.party, campaign.party, 'delve 2 carries the same party');
    assert.equal(sim2.depth, 2);
    assert.equal(sim2.party.gold, 77, 'the purse survives the trip');
    const f = sim2.party.members[0];
    assert.ok(f.health < f.maxHealth, 'wounds carry too, until the town heals them');
    assert.ok(f.equipment.some(e => e.id === 'eq-tower-shield'), 'equipment stays assigned');
  });

  test('a lost delve ends the campaign', () => {
    const campaign = new Campaign([fighter], { seed: 'doom-1' });
    const sim = campaign.nextDelve();
    sim.victory = false;
    campaign.recordDelve(sim);
    assert.equal(campaign.over, true);
    assert.equal(campaign.nextDelve(), null, 'no delving past the grave');
  });

  test('retiring banks the score and counts as the win', () => {
    const campaign = new Campaign([fighter, cleric], { seed: 'retire-1' });
    campaign.nextDelve();
    campaign.party.addScore(240);
    campaign.retire();
    const summary = campaign.getSummary();
    assert.equal(summary.retired, true);
    assert.equal(summary.over, true);
    assert.equal(summary.score, 240);
  });
});

describe('The town between', () => {
  test('healing costs gold per missing health point', () => {
    const campaign = new Campaign([fighter], { seed: 'town-1' });
    campaign.party.gold = 100;
    campaign.party.members[0].takeDamage(10);
    assert.equal(campaign.missingHealth(), 10);
    assert.equal(campaign.healCost(), 10 * TOWN_PRICES.healPerHp);

    const receipt = campaign.healAll();
    assert.equal(receipt.healed, 10);
    assert.equal(campaign.party.gold, 100 - receipt.cost);
    assert.equal(campaign.missingHealth(), 0, 'everyone is whole');
    assert.equal(campaign.healAll(), null, 'nothing left to heal');
  });

  test('the temple discounts the Devout', () => {
    const plain = new Campaign([fighter], { seed: 't-plain' });
    const devout = new Campaign([fighter, pious], { seed: 't-devout' });
    plain.party.members[0].takeDamage(10);
    devout.party.members[0].takeDamage(10);
    assert.ok(devout.healCost() < plain.healCost(),
      `piety pays (${devout.healCost()} < ${plain.healCost()})`);
  });

  test('an empty purse buys no healing', () => {
    const campaign = new Campaign([fighter], { seed: 'town-poor' });
    campaign.party.members[0].takeDamage(10);
    campaign.party.gold = 1;
    assert.equal(campaign.healAll(), null);
    assert.equal(campaign.party.gold, 1, 'the coin stays');
  });

  test('potions go from the shop into the satchel', () => {
    const campaign = new Campaign([fighter], { seed: 'town-shop' });
    campaign.party.gold = TOWN_PRICES.potion;
    assert.equal(campaign.buyPotion(), true);
    assert.equal(campaign.party.potions.length, 1);
    assert.equal(campaign.party.gold, 0);
    assert.equal(campaign.buyPotion(), false, 'no gold, no draught');
  });

  test('the town interlude is real writing that names the next depth', () => {
    const campaign = new Campaign([fighter, wizard], { seed: 'town-story' });
    campaign.nextDelve();
    const text = composeTownInterlude(campaign.party, campaign.depth);
    assert.ok(text.length > 80);
    assert.ok(text.includes(`depth ${campaign.depth + 1}`), 'rumor knows what waits below');
  });
});

describe('The hiring board', () => {
  test('the board offers two candidates, priced and deterministic', () => {
    const a = new Campaign([fighter], { seed: 'hire-board' });
    const b = new Campaign([fighter], { seed: 'hire-board' });
    a.nextDelve(); b.nextDelve();
    const offersA = a.recruitOffers();
    const offersB = b.recruitOffers();
    assert.equal(offersA.length, 2);
    assert.deepEqual(offersA.map(o => o.card.id), offersB.map(o => o.card.id), 'same seed, same board');
    for (const o of offersA) assert.ok(o.cost > 0, 'candidates cost gold');
  });

  test('the board is stable across re-renders but reshuffles by depth', () => {
    const c = new Campaign([fighter], { seed: 'hire-stable' });
    c.nextDelve();
    const first = c.recruitOffers().map(o => o.card.id);
    assert.deepEqual(c.recruitOffers().map(o => o.card.id), first, 'no reshuffle on redraw');
    c.nextDelve(); // depth 2
    c.recruitOffers();            // draws the fresh board for the new depth
    assert.equal(c._recruitDepth, 2, 'a new depth posts a new board');
  });

  test('hiring adds the member and deducts the fee', () => {
    const c = new Campaign([fighter], { seed: 'hire-do' });
    c.nextDelve();
    const offer = c.recruitOffers()[0];
    c.party.gold = offer.cost + 5;
    const before = c.party.members.length;
    const member = c.recruit(offer.card.id);
    assert.ok(member, 'someone was hired');
    assert.equal(c.party.members.length, before + 1);
    assert.equal(c.party.gold, 5);
    assert.ok(!c.recruitOffers().some(o => o.card.id === offer.card.id), 'off the board once hired');
  });

  test('an empty purse hires no one', () => {
    const c = new Campaign([fighter], { seed: 'hire-poor' });
    c.nextDelve();
    const offer = c.recruitOffers()[0];
    c.party.gold = offer.cost - 1;
    assert.equal(c.recruit(offer.card.id), null);
    assert.equal(c.party.gold, offer.cost - 1, 'the coin stays');
  });

  test('recruits deeper cost more', () => {
    assert.ok(hireCost(fighter, 3) > hireCost(fighter, 1), 'depth raises the asking price');
  });
});

describe('The blacksmith', () => {
  test('sharpening adds a permanent +attack mod to the best striker', () => {
    const c = new Campaign([fighter, wizard], { seed: 'forge-do' });
    c.nextDelve();
    c.party.gold = 100;
    const striker = c.party.living().reduce((a, b) => (a.attack >= b.attack ? a : b));
    const before = striker.attack;
    const receipt = c.forge();
    assert.ok(receipt, 'the smith worked');
    assert.equal(receipt.target, striker.name);
    assert.equal(striker.attack, before + TOWN_PRICES.forgeMod.attack);
    assert.ok(striker.weaponMods.some(m => m.name === TOWN_PRICES.forgeMod.name));
  });

  test('the forge never mutates shared card definitions', () => {
    // Two campaigns, same drafted fighter card — sharpening one must
    // not bleed into the other's copy.
    const a = new Campaign([fighter], { seed: 'forge-iso-a' });
    const b = new Campaign([fighter], { seed: 'forge-iso-b' });
    a.nextDelve(); b.nextDelve();
    a.party.gold = 100;
    const bBefore = b.party.members[0].attack;
    a.forge();
    assert.equal(b.party.members[0].attack, bBefore, 'the other party is untouched');
  });

  test('an empty purse forges nothing', () => {
    const c = new Campaign([fighter], { seed: 'forge-poor' });
    c.nextDelve();
    c.party.gold = c.forgeCost() - 1;
    assert.equal(c.forge(), null);
  });

  test('the smith charges more the deeper you delve', () => {
    const c = new Campaign([fighter], { seed: 'forge-depth' });
    c.nextDelve();
    const shallow = c.forgeCost();
    c.nextDelve();
    assert.ok(c.forgeCost() > shallow);
  });
});

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(`  ${err.message}`);
    throw err;
  }
}

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}
