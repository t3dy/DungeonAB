/**
 * Tests for drafter skill tiers — pilots make roughly rational picks
 * scaled by skill, with identifiable preference mistakes at the low
 * end (the Novice takes the finicky rare over the reliable body).
 */

import { strict as assert } from 'assert';
import {
  DRAFT_PERSONAS, PILOT_TIERS, PILOT_PERSONAS,
  rationalValue, evaluatePick, aiPick,
} from '../src/draft/PackDraft.js';
import { CHARACTER_CARDS, EQUIPMENT_CARDS, CLASSES, CARD_TYPES } from '../src/game/Cards.js';
import { PARTY_CAP } from '../src/agents/Party.js';
import { simulate } from '../tools/mine.js';

const prodigy = PILOT_TIERS.find(p => p.id === 'prodigy');
const novice = PILOT_TIERS.find(p => p.id === 'novice');
const flatRng = { next: () => 0 };

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);
const cleric = CHARACTER_CARDS.find(c => c.class === CLASSES.CLERIC);
const wand = EQUIPMENT_CARDS.find(e => e.id === 'eq-wand-embers'); // the finicky rare

describe('The rational baseline knows the measured hierarchy', () => {
  test('a body outvalues the bomb item until the party has four', () => {
    const thinPool = [fighter, cleric]; // two bodies so far
    assert.ok(rationalValue(fighter, thinPool) > rationalValue(wand, thinPool),
      'third body > wand');
    const fullPool = [fighter, fighter, fighter, cleric, cleric];
    assert.ok(rationalValue(wand, fullPool) > rationalValue(fighter, fullPool),
      'with five bodies, the bomb finally wins');
  });

  test('the cleric is the mythic uncommon', () => {
    const noCleric = [fighter, fighter];
    assert.ok(rationalValue(cleric, noCleric) > rationalValue(fighter, noCleric),
      'first cleric > another fighter');
  });
});

describe('Skill tiers make different picks from the same pack', () => {
  test('the Novice takes the shiny rare; the Prodigy takes the body', () => {
    const pack = [wand, fighter];
    const pool = [cleric, CHARACTER_CARDS.find(c => c.class === CLASSES.ROGUE)]; // 2 bodies
    assert.equal(aiPick(pack, prodigy, pool, flatRng).id, fighter.id,
      'the Prodigy fills the party');
    assert.equal(aiPick(pack, novice, pool, flatRng).id, wand.id,
      'the Novice cannot resist the glass cannon');
  });

  test('skill shrinks the chaos: pros are consistent', () => {
    const hotRng = { next: () => 1 };
    const pool = [fighter];
    const spreadFor = persona =>
      evaluatePick(fighter, persona, pool, hotRng) - evaluatePick(fighter, persona, pool, flatRng);
    assert.ok(spreadFor(novice) > spreadFor(prodigy),
      'the Novice\'s evaluations swing wider than the Prodigy\'s');
  });

});

describe('Skill expression is measurable (the 17lands check)', () => {
  test('across simulated tables, the Prodigy outperforms the Novice', () => {
    // Drafts and dungeons are seeded, but combat rolls come from the
    // global Math.random, so win rates need a real sample. The Prodigy's
    // edge over the Novice measures 4-8 points — it narrowed from 6-9
    // when sustained workings and the boss unleash landed, because the
    // Novice drafts spells more freely than the Prodigy does. At 300
    // games a pilot the standard error on that difference is ~3.7
    // points, which flipped this assertion often enough to matter; 900
    // brings it to ~2.1 and the comparison back inside the noise floor.
    // `hard` is where evaluation starts to matter at all — easy and
    // medium forgive almost any pool (DESIGN_DIALOGUE.md §6).
    const games = simulate({ tables: PILOT_PERSONAS.length * 900, difficulty: 'hard' });
    const seat0 = id => games.filter(g => g.seat === 0 && g.pilotId === id);
    const wr = id => {
      const mine = seat0(id);
      return mine.filter(g => g.victory).length / mine.length;
    };
    const shortHanded = id => {
      const mine = seat0(id);
      return mine.filter(g => g.partySize < PARTY_CAP).length / mine.length;
    };

    // The party cap is absolute, for every pilot
    for (const g of games) {
      assert.ok(g.partySize <= PARTY_CAP, `no pilot fields more than ${PARTY_CAP}`);
    }

    // The Novice's body-blindness now shows as a short-handed party —
    // the measurable version of "took the shiny rare over the body"
    assert.ok(shortHanded('novice') > shortHanded('prodigy'),
      `the Novice marches short-handed more often (${shortHanded('novice').toFixed(2)} vs ${shortHanded('prodigy').toFixed(2)})`);

    assert.ok(wr('prodigy') > wr('novice'),
      `skill separates win rates (prodigy ${wr('prodigy').toFixed(2)} vs novice ${wr('novice').toFixed(2)})`);
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
