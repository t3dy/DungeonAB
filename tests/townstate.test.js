/**
 * The town as a place that remembers. Faction standings and NPC
 * memory ride the campaign; town situations run on the same capability
 * engine the dungeon does; reputation moves prices; and a town with
 * enemies in it is not a safe place to walk.
 */

import { strict as assert } from 'assert';
import { Campaign } from '../src/game/Campaign.js';
import { TownState, FACTIONS, standingLabel } from '../src/game/TownState.js';
import { offerTownEncounters, TOWN_ENCOUNTERS } from '../src/encounters/TownEncounters.js';
import { SeededRandom } from '../src/draft/PackDraft.js';
import { CHARACTER_CARDS } from '../src/game/Cards.js';

const byId = id => CHARACTER_CARDS.find(c => c.id === id);
const campaignWith = (pool, seed = 'town-test') => {
  const c = new Campaign(pool, { seed });
  c.depth = 1;
  return c;
};

describe('The town keeps a memory', () => {
  test('standings move, clamp, and read as words', () => {
    const town = new TownState();
    assert.equal(town.standingOf('scholars'), 'neutral');
    town.adjustFaction('scholars', 40, 'did them a service');
    assert.equal(town.standingOf('scholars'), 'friendly');
    town.adjustFaction('scholars', 500);
    assert.equal(town.standing('scholars'), 100, 'clamped');
    town.adjustFaction('guild', -500);
    assert.equal(town.standing('guild'), -100, 'clamped the other way');
    assert.equal(standingLabel(-100), 'hostile');
  });

  test('the log records why, not just what', () => {
    const town = new TownState();
    town.adjustFaction('guild', -20, 'The party broke a guild window.');
    assert.ok(town.log.at(-1).text.includes('window'));
  });

  test('individuals are remembered, with disposition and flags', () => {
    const town = new TownState();
    assert.ok(!town.knows('apothecary'));
    town.adjustNpc('apothecary', 30, 'helped her', 'the Apothecary');
    assert.ok(town.knows('apothecary'));
    town.flag('apothecary', 'owes-favour');
    assert.ok(town.hasFlag('apothecary', 'owes-favour'));
    assert.ok(!town.hasFlag('apothecary', 'never-set'));
  });

  test('summary exposes every faction for the UI', () => {
    const town = new TownState();
    assert.equal(town.summary().factions.length, Object.keys(FACTIONS).length);
  });
});

describe('Reputation is money', () => {
  test('a good name makes the town cheaper; a bad one makes it dearer', () => {
    const town = new TownState();
    const base = town.priceMultiplier();
    town.adjustFaction('merchants', 80);
    assert.ok(town.priceMultiplier() < base);
    const hostile = new TownState();
    hostile.adjustFaction('guild', -60);
    assert.ok(hostile.priceMultiplier() > base);
  });

  test('and the campaign actually charges it', () => {
    const pool = [byId('char-agrippa')];
    const poor = campaignWith(pool, 'price-a');
    const loved = campaignWith(pool, 'price-b');
    poor.party.members[0].takeDamage(8);
    loved.party.members[0].takeDamage(8);
    const before = poor.healCost();
    loved.town.adjustFaction('merchants', 80);
    loved.town.unlock('supplier');
    assert.ok(loved.healCost() < before, 'the healer');
    assert.ok(loved.potionCost() < poor.potionCost(), 'the potions');
    assert.ok(loved.forgeCost() < poor.forgeCost(), 'the smith');
  });

  test('a town full of grudges is not a safe zone', () => {
    const town = new TownState();
    assert.equal(town.hostility(), 0);
    town.adjustFaction('guild', -50);
    town.adjustFaction('underworld', -60);
    assert.ok(town.hostility() > 0.2);
  });
});

describe('Town situations run on the capability engine', () => {
  test('every town situation can be answered without any capability', () => {
    for (const def of TOWN_ENCOUNTERS) {
      assert.ok(def.options.some(o => (o.requires || []).length === 0), `${def.id}`);
    }
  });

  test('capabilities open town options the same way dungeon ones do', () => {
    const digby = campaignWith([byId('char-digby')]);   // diplomacy, antiquarian, appraisal
    const ids = digby.townOptions('town-bookseller').map(o => o.id);
    assert.ok(ids.includes('recognize-significance'), 'antiquarian reads the window');
    assert.ok(ids.includes('appraise-price'), 'appraisal prices it');
    assert.ok(!ids.includes('divine-contents'), 'nobody here scries');

    const brahe = campaignWith([byId('char-brahe')]);   // none of those
    assert.deepEqual(brahe.townOptions('town-bookseller').map(o => o.id), ['browse-on']);
  });

  test('an outcome writes to the town, and the town keeps it', () => {
    const c = campaignWith([byId('char-digby')]);
    c._townOffers = ['town-bookseller'];
    c._offerDepth = c.depth;
    const before = c.town.standing('scholars');
    const result = c.resolveTownOption('town-bookseller', 'recognize-significance');
    assert.ok(result?.success);
    assert.ok(c.town.standing('scholars') > before, 'the scholars noticed');
    assert.ok(c.town.has('scholars-seek-you'));
    assert.ok(c.town.knows('bookseller'));
  });

  test('an option the party cannot reach cannot be taken', () => {
    const c = campaignWith([byId('char-brahe')]);
    c._townOffers = ['town-bookseller'];
    c._offerDepth = c.depth;
    assert.equal(c.resolveTownOption('town-bookseller', 'recognize-significance'), null);
  });

  test('a resolved situation leaves the board', () => {
    const c = campaignWith([byId('char-digby')]);
    c._townOffers = ['town-bookseller', 'town-street-thief'];
    c._offerDepth = c.depth;
    c.resolveTownOption('town-bookseller', 'browse-on');
    assert.ok(!c.townOffers().some(d => d.id === 'town-bookseller'));
  });

  test('one-shots never come back', () => {
    const town = new TownState();
    town.markResolved('town-closed-apothecary');
    const offers = offerTownEncounters(town, new SeededRandom('o'), { count: 99 });
    assert.ok(!offers.some(d => d.id === 'town-closed-apothecary'));
  });

  test('offers are stable across re-renders', () => {
    const c = campaignWith([byId('char-digby')]);
    assert.deepEqual(c.townOffers().map(d => d.id), c.townOffers().map(d => d.id));
  });

  test('a bad choice costs health and standing', () => {
    const c = campaignWith([byId('char-brahe')]);
    c._townOffers = ['town-tavern-brawl'];
    c._offerDepth = c.depth;
    const hp = c.party.totalHealth();
    const result = c.resolveTownOption('town-tavern-brawl', 'wade-in');
    assert.equal(result.success, false);
    assert.ok(c.party.totalHealth() < hp);
    assert.ok(c.town.standing('merchants') < 0);
  });
});

describe('The Town Remembers', () => {
  test('it does not appear until there is something to remember', () => {
    const town = new TownState();
    const offered = () => offerTownEncounters(town, new SeededRandom('r'), { count: 99 })
      .some(d => d.id === 'town-remembers');
    assert.ok(!offered());
    town.adjustFaction('guild', -30, 'broke a window');
    town.adjustFaction('merchants', -20, 'a brawl');
    assert.ok(offered());
  });

  test('its options react to what the town actually holds', () => {
    const c = campaignWith([byId('char-digby'), byId('char-brahe')]);
    c.town.adjustFaction('guild', -40, 'broke guild property');
    c.town.adjustFaction('merchants', -30, 'a brawl');
    const ids = c.townOptions('town-remembers').map(o => o.id);
    assert.ok(ids.includes('mend-fences'), 'there are fences to mend');
    assert.ok(ids.includes('make-repairs'), 'the guild is owed repairs');
    assert.ok(!ids.includes('work-old-friends'), 'and no allies yet to call on');
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
