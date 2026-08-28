/**
 * Tests for outfitting — the player's hand on the party.
 *
 * The draft hands out kit by best fit, which is a sensible default and
 * not a decision. These cover the decisions: moving a piece onto a
 * particular character, saying who prepares a working, and giving an
 * adventurer a name and a history of the player's own.
 *
 * The invariant that matters most is conservation: a piece of equipment
 * moved around the party is never duplicated and never lost, because a
 * player who loses the Tower Shield to a UI click has lost a draft pick.
 */

import { strict as assert } from 'assert';
import { Party } from '../src/agents/Party.js';
import {
  CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, CLASSES, getCard, getAllCards,
} from '../src/game/Cards.js';
import { Campaign, shopPrice } from '../src/game/Campaign.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const fighter = byClass(CLASSES.FIGHTER);
const wizard = byClass(CLASSES.WIZARD);
const cleric = byClass(CLASSES.CLERIC);

/** Every piece of kit the party is holding, wherever it is. */
function allKit(party) {
  return [
    ...[...party.members, ...party.reserve].flatMap(m => m.equipment.map(e => e.id)),
    ...party.pack.map(e => e.id),
  ].sort();
}

describe('Kit goes where the player puts it', () => {
  test('a piece moves, and nothing is duplicated or lost', () => {
    const party = new Party([fighter, wizard, cleric,
      getCard('eq-tower-shield'), getCard('eq-grimoire'), getCard('eq-lockpicks')]);
    const before = allKit(party);

    const target = party.members.find(m => m.class === CLASSES.WIZARD);
    const move = party.equipTo('eq-tower-shield', target.name);
    assert.ok(move, 'the shield moved');
    assert.equal(move.to.name, target.name);
    assert.ok(target.equipment.some(e => e.id === 'eq-tower-shield'), 'the wizard has the shield');
    assert.deepEqual(allKit(party), before, 'the same kit, in different hands');
  });

  test('one piece per slot: a displaced piece goes back, never vanishes', () => {
    const party = new Party([fighter, wizard,
      getCard('eq-tower-shield'), getCard('eq-chainmail')]);
    const before = allKit(party);
    const w = party.members.find(m => m.class === CLASSES.WIZARD);

    party.equipTo('eq-tower-shield', w.name);
    party.equipTo('eq-chainmail', w.name);      // both are armor

    const armorOn = w.equipment.filter(e => e.slot === 'armor');
    assert.equal(armorOn.length, 1, 'nobody wears two suits of armor');
    assert.deepEqual(allKit(party), before, 'the displaced suit is still in the party');
  });

  test('taking a piece off leaves it with the pack, and it can go back on', () => {
    const party = new Party([fighter, getCard('eq-greatsword')]);
    const before = allKit(party);
    assert.ok(party.unequip('eq-greatsword'), 'it comes off');
    assert.equal(party.pack.length, 1, 'and waits in the pack');
    assert.deepEqual(allKit(party), before);

    party.equipTo('eq-greatsword', party.members[0].name);
    assert.equal(party.pack.length, 0, 'and goes back on');
    assert.ok(party.members[0].equipment.some(e => e.id === 'eq-greatsword'));
  });

  test('a move to nowhere changes nothing', () => {
    const party = new Party([fighter, getCard('eq-greatsword')]);
    const before = allKit(party);
    assert.equal(party.equipTo('eq-greatsword', 'Nobody At All'), null);
    assert.equal(party.equipTo('eq-does-not-exist', party.members[0].name), null);
    assert.deepEqual(allKit(party), before);
  });
});

describe('Somebody prepares the working', () => {
  test('the named caster’s mind sets the power, not the party’s best', () => {
    const party = new Party([fighter, wizard, getCard('sp-firebolt')]);
    const dullest = party.members.reduce((a, b) => (a.mind <= b.mind ? a : b));
    const sharpest = party.members.reduce((a, b) => (a.mind >= b.mind ? a : b));
    assert.ok(sharpest.mind > dullest.mind, 'the fixture can tell them apart');

    party.assignCaster('sp-firebolt', sharpest.name);
    const good = party.castSpell('combat', 'sp-firebolt').effectivePower;
    party.castThisRoom.clear();

    party.assignCaster('sp-firebolt', dullest.name);
    const bad = party.castSpell('combat', 'sp-firebolt').effectivePower;
    assert.ok(bad < good, `the wrong hands are weaker (${bad} < ${good})`);
  });

  test('a dead caster does not turn the grimoire off', () => {
    const party = new Party([fighter, wizard, getCard('sp-firebolt')]);
    const caster = party.members.find(m => m.class === CLASSES.WIZARD);
    party.assignCaster('sp-firebolt', caster.name);
    caster.alive = false;
    caster.health = 0;

    const cast = party.castSpell('combat', 'sp-firebolt');
    assert.ok(cast, 'the working still goes off');
    assert.equal(cast.effectivePower, party.grimoire[0].power + Math.floor(party.bestMind() / 2),
      'it falls back to the sharpest mind still standing');
  });

  test('renaming a caster keeps their working', () => {
    // Held by the body, not the name. The first cut stored the display
    // name and a rename quietly handed the working back to the party.
    const party = new Party([fighter, wizard, getCard('sp-firebolt')]);
    const w = party.members.find(m => m.class === CLASSES.WIZARD);
    party.assignCaster('sp-firebolt', w.name);
    const powerBefore = party.castSpell('combat', 'sp-firebolt').effectivePower;
    party.castThisRoom.clear();

    party.renameMember(w, 'Old Yarrow the Younger');
    assert.equal(party.casterOf(party.grimoire[0])?.name, 'Old Yarrow the Younger',
      'the same body still prepares it');
    assert.equal(party.castSpell('combat', 'sp-firebolt').effectivePower, powerBefore,
      'and it is exactly as strong as it was');
  });

  test('clearing the caster returns the working to the party', () => {
    const party = new Party([fighter, wizard, getCard('sp-firebolt')]);
    party.assignCaster('sp-firebolt', party.members[0].name);
    party.assignCaster('sp-firebolt', null);
    assert.equal(party.casterOf(party.grimoire[0]), null, 'nobody in particular holds it');
  });
});

describe('A character the player named', () => {
  test('a rename sticks, and an empty one gives the card’s name back', () => {
    const party = new Party([fighter]);
    const m = party.members[0];
    const original = m.name;

    m.rename('  Hilda One-Eye  ');
    assert.equal(m.name, 'Hilda One-Eye', 'trimmed and kept');
    assert.equal(m.givenName, 'Hilda One-Eye');

    m.rename('');
    assert.equal(m.name, original, 'and the card gets its name back');
    assert.equal(m.givenName, null);
  });

  test('a backstory is kept, bounded, and optional', () => {
    const party = new Party([fighter]);
    const m = party.members[0];
    assert.equal(m.backstory, '', 'nobody starts with one');
    m.setBackstory('Lost the eye to a door, not a monster.');
    assert.match(m.backstory, /Lost the eye/);
    m.setBackstory('x'.repeat(900));
    assert.ok(m.backstory.length <= 400, 'a backstory is not a novel');
  });

  test('names, histories, kit and casters all survive a save', () => {
    const party = new Party([fighter, wizard, cleric,
      getCard('eq-tower-shield'), getCard('sp-firebolt')]);
    const w = party.members.find(m => m.class === CLASSES.WIZARD);
    party.equipTo('eq-tower-shield', w.name);
    party.assignCaster('sp-firebolt', w.name);
    party.renameMember(w, 'Old Yarrow the Younger');
    w.setBackstory('Third of that name. The first two also read too much.');

    const lookup = id => getAllCards().find(c => c.id === id) || null;
    const back = Party.fromJSON(JSON.parse(JSON.stringify(party.toJSON())), lookup);
    const restored = back.members.find(m => m.name === 'Old Yarrow the Younger');

    assert.ok(restored, 'the name came back');
    assert.match(restored.backstory, /Third of that name/, 'and the history with it');
    assert.ok(restored.equipment.some(e => e.id === 'eq-tower-shield'), 'still holding the shield');
    assert.equal(back.grimoire[0].casterName, 'Old Yarrow the Younger', 'still their working');
    assert.deepEqual(allKit(back), allKit(party), 'and no kit went missing in the post');
  });
});

describe('The quartermaster keeps a shop, not a vending machine', () => {
  test('stock is priced by what a card does, and in reach of a real purse', () => {
    // A party leaves a delve with a median of 67 gold and a hire asks
    // 42, so kit has to be buyable in ones — not a shopping spree, and
    // not out of reach either.
    const prices = [...EQUIPMENT_CARDS, ...SPELL_CARDS].map(c => shopPrice(c, 1));
    assert.ok(Math.min(...prices) >= 35, 'nothing is nearly free');
    assert.ok(Math.max(...prices) <= 200, `nothing is unreachable (dearest ${Math.max(...prices)})`);
    // ...and the model, not a hand-written table, decides the order
    assert.ok(shopPrice(getCard('sp-fireball'), 1) > shopPrice(getCard('eq-lockpicks'), 1),
      'the fireball costs more than the lockpicks');
    assert.ok(shopPrice(getCard('eq-lantern'), 3) > shopPrice(getCard('eq-lantern'), 1),
      'and a shop this far down is the only shop there is');
  });

  test('the shop never sells what the party already carries', () => {
    const camp = new Campaign([fighter, wizard, getCard('eq-tower-shield'), getCard('sp-firebolt')],
      { seed: 'shop-dupes' });
    camp.depth = 1;
    const held = new Set([
      ...camp.party.members.flatMap(m => m.equipment.map(e => e.id)),
      ...camp.party.grimoire.map(s => s.id),
    ]);
    for (const offer of camp.shopOffers()) {
      assert.ok(!held.has(offer.card.id), `${offer.card.name} is not already in the party`);
    }
  });

  test('buying spends the gold, hands the piece to the named member, and clears the shelf', () => {
    const camp = new Campaign([fighter, wizard, cleric], { seed: 'shop-buy' });
    camp.depth = 1;
    camp.party.gold = 500;
    const offer = camp.shopOffers().find(o => o.card.type === 'equipment');
    assert.ok(offer, 'the shop stocks kit');

    const target = camp.party.members[2];
    const before = camp.party.gold;
    const sale = camp.buyFromShop(offer.card.id, target.name);

    assert.ok(sale, 'it sold');
    assert.equal(camp.party.gold, before - offer.price, 'the purse is lighter by the price');
    assert.equal(sale.wearer?.name, target.name, 'and the named member is carrying it');
    assert.ok(target.equipment.some(e => e.id === offer.card.id));
    assert.ok(!camp.shopOffers().some(o => o.card.id === offer.card.id), 'the shelf is empty');
  });

  test('an empty purse buys nothing at all', () => {
    const camp = new Campaign([fighter, wizard], { seed: 'shop-broke' });
    camp.depth = 1;
    camp.party.gold = 0;
    const offer = camp.shopOffers()[0];
    const kitBefore = allKit(camp.party).length;
    assert.equal(camp.buyFromShop(offer.card.id), null, 'no sale');
    assert.equal(camp.party.gold, 0, 'and no debt either');
    assert.equal(allKit(camp.party).length, kitBefore);
  });

  test('a bought working joins the grimoire and can be handed to a caster', () => {
    const camp = new Campaign([fighter, wizard], { seed: 'shop-spell' });
    camp.depth = 1;
    camp.party.gold = 500;
    const offer = camp.shopOffers().find(o => o.card.type === 'spell');
    if (!offer) return;                       // this seed's shelf is all kit
    camp.buyFromShop(offer.card.id);
    assert.ok(camp.party.grimoire.some(s => s.id === offer.card.id), 'it is in the book');
    const w = camp.party.members.find(m => m.class === CLASSES.WIZARD);
    assert.ok(camp.party.assignCaster(offer.card.id, w.name), 'and somebody can prepare it');
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
