/**
 * Tests for item identification — unlabeled phials, the run's secret
 * appearance→effect map, and the ways a party earns the knowledge:
 * the alchemist's nose, the scholar's memory, or a reckless stomach.
 */

import { strict as assert } from 'assert';
import { appearanceMapFor, elixirDef, ELIXIR_KINDS, PHIAL_APPEARANCES } from '../src/game/Elixirs.js';
import { Party } from '../src/agents/Party.js';
import { rollFind, resolvePhialFind } from '../src/encounters/RoomEncounters.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, PERSONALITY_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const pers = archetype => PERSONALITY_CARDS.find(p => p.archetype === archetype);

describe('The run\'s secret map', () => {
  test('the same seed always deals the same appearances', () => {
    const a = appearanceMapFor('delve-77');
    const b = appearanceMapFor('delve-77');
    assert.deepEqual(a, b);
  });

  test('every appearance maps to a real elixir kind', () => {
    const map = appearanceMapFor('any-seed');
    for (const appearance of PHIAL_APPEARANCES) {
      assert.ok(elixirDef(map[appearance]), `${appearance} maps to a kind`);
    }
  });

  test('different seeds shuffle differently (eventually)', () => {
    const base = JSON.stringify(appearanceMapFor('seed-a'));
    const differs = ['seed-b', 'seed-c', 'seed-d', 'seed-e']
      .some(s => JSON.stringify(appearanceMapFor(s)) !== base);
    assert.ok(differs, 'at least one of four seeds deals a different map');
  });

  test('a party keeps its first map for the whole campaign', () => {
    const party = new Party([byClass('fighter')]);
    const first = party.ensureElixirMap('dungeon-one');
    const second = party.ensureElixirMap('dungeon-two');
    assert.equal(first, second, 'the second dungeon cannot reshuffle the truth');
  });
});

describe('Identification paths', () => {
  test('the alchemist names a phial by nose, no drinking required', () => {
    const party = new Party([byClass('alchemist')]);
    party.ensureElixirMap('sniff');
    const phial = party.makePhial(0.1);
    const before = party.living()[0].health;
    const prep = resolvePhialFind(party, phial, 0.9);
    assert.equal(party.knowsPhial(phial), phial.kind, 'lore learned');
    assert.equal(party.phials.length, 1, 'the phial is pocketed, not drunk');
    assert.equal(party.living()[0].health, before, 'nobody paid in blood');
    assert.ok(prep.text.includes(phial.appearance), 'the chronicle names the appearance');
  });

  test('the Scholarly recall the treatise on a good roll', () => {
    const party = new Party([byClass('fighter'), pers('scholarly')]);
    party.ensureElixirMap('stacks');
    const phial = party.makePhial(0.2);
    const prep = resolvePhialFind(party, phial, 0.1);   // roll < 0.5 recalls
    assert.equal(party.knowsPhial(phial), phial.kind);
    assert.equal(party.phials.length, 1);
    assert.ok(prep.text.includes('treatise'));
  });

  test('the Reckless quaff-test, and the lesson sticks either way', () => {
    const party = new Party([byClass('fighter'), pers('reckless')]);
    party.ensureElixirMap('gulp');
    const phial = party.makePhial(0.3);
    const prep = resolvePhialFind(party, phial, 0.9);
    assert.equal(party.knowsPhial(phial), phial.kind, 'drinking teaches');
    assert.equal(party.phials.length, 0, 'the phial is gone');
    assert.ok(prep.text.includes('quaff-test'));
  });

  test('a timid party pockets the mystery unopened', () => {
    const party = new Party([byClass('fighter'), pers('craven')]);
    party.ensureElixirMap('nope');
    const phial = party.makePhial(0.4);
    resolvePhialFind(party, phial, 0.9);
    assert.equal(party.knowsPhial(phial), null, 'still a mystery');
    assert.equal(party.phials.length, 1, 'but a carried mystery');
  });

  test('a known appearance is recognized on sight thereafter', () => {
    const party = new Party([byClass('fighter'), pers('reckless')]);
    party.ensureElixirMap('twice');
    const first = party.makePhial(0.3);
    resolvePhialFind(party, first, 0.9);              // quaff-tested
    const second = { ...first };
    const prep = resolvePhialFind(party, second, 0.9);
    assert.ok(prep.text.includes('known stock'), 'no second guinea pig needed');
    assert.equal(party.phials.length, 1, 'the recognized phial is kept');
  });
});

describe('Elixir effects land on the taster', () => {
  const kindPhial = (party, kind) => {
    // Find the appearance that maps to the wanted kind this run
    const appearance = Object.keys(party.elixirMap).find(a => party.elixirMap[a] === kind);
    return { appearance, kind };
  };

  test('venom hurts; mending heals; vigor sharpens', () => {
    const party = new Party([byClass('fighter')]);
    party.ensureElixirMap('effects');
    const hero = party.members[0];

    const venom = party.drinkPhial(kindPhial(party, 'venom'), hero);
    assert.equal(hero.health, hero.maxHealth - venom.def.damage, 'venom bites');

    party.drinkPhial(kindPhial(party, 'healing'), hero);
    assert.ok(hero.health > hero.maxHealth - venom.def.damage, 'mending mends');

    const atkBefore = hero.attack;
    party.drinkPhial(kindPhial(party, 'vigor'), hero);
    assert.equal(hero.attack, atkBefore + 2, 'vigor is permanent for the run');
  });

  test('a hurt party quaffs a phial known to be Mending', () => {
    const party = new Party([byClass('fighter')]);
    party.ensureElixirMap('triage');
    const phial = kindPhial(party, 'healing');
    party.learnPhial(phial);
    party.phials.push(phial);
    const hero = party.members[0];
    hero.takeDamage(Math.ceil(hero.maxHealth * 0.7));
    const drank = party.quaffIfNeeded();
    assert.ok(drank, 'the known phial serves as a potion');
    assert.equal(party.phials.length, 0);
  });

  test('an unknown phial is not quaffed by a careful party', () => {
    const party = new Party([byClass('fighter')]);
    party.ensureElixirMap('careful');
    party.phials.push(party.makePhial(0.5));
    const hero = party.members[0];
    hero.takeDamage(Math.ceil(hero.maxHealth * 0.7));
    party.quaffIfNeeded();
    assert.equal(party.phials.length, 1, 'the mystery stays corked');
  });

  test('the Reckless at death\'s door drink the mystery', () => {
    const party = new Party([byClass('fighter'), pers('reckless')]);
    party.ensureElixirMap('desperate');
    party.phials.push(party.makePhial(0.5));
    const hero = party.members[0];
    hero.takeDamage(hero.maxHealth - 1);   // one hit point left
    const drank = party.quaffIfNeeded();
    assert.ok(drank, 'better a gamble than a grave');
    assert.equal(party.phials.length, 0);
  });
});

describe('Phials in the wild', () => {
  test('rollFind deals phials among its finds', () => {
    const party = new Party([byClass('fighter')]);
    party.ensureElixirMap('wild');
    const kinds = new Set();
    for (let r = 0.01; r < 1; r += 0.02) {
      const f = rollFind(party, true, r);
      kinds.add(f.find);
    }
    assert.ok(kinds.has('phial'), `phials turn up in hoards (${[...kinds]})`);
    assert.ok(kinds.has('scroll') && kinds.has('trinket'), 'without crowding out the old finds');
  });

  test('a full crawl with an alchemist aboard still concludes', () => {
    const sim = new Simulator(
      [byClass('fighter'), byClass('alchemist'), byClass('cleric'), pers('reckless')],
      'elixir-crawl', 'easy',
    );
    let guard = 0;
    while (!sim.gameOver && guard++ < 80) sim.tick();
    assert.ok(sim.gameOver, 'the crawl concludes');
    const state = sim.getState();
    assert.ok(state.party.phials >= 0 && state.party.keys >= 0, 'state carries the new counters');
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
