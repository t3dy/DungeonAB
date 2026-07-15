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

  test('the curse chaser reads big numbers as pure upside', () => {
    const cursed = EQUIPMENT_CARDS.find(e => e.cursed);
    const pool = [fighter, fighter, fighter, fighter];
    const warlord = DRAFT_PERSONAS.find(p => p.id === 'warlord');
    const noviceVal = evaluatePick(cursed, novice, pool, flatRng);
    const warlordVal = evaluatePick(cursed, warlord, pool, flatRng);
    const plain = EQUIPMENT_CARDS.find(e => e.id === 'eq-greatsword');
    // The warlord flinches from the curse relative to clean gear; the novice doesn't
    assert.ok(evaluatePick(plain, warlord, pool, flatRng) > warlordVal, 'warlord flinches');
    assert.ok(noviceVal > evaluatePick(plain, novice, pool, flatRng) - 3, 'novice chases');
  });
});

describe('Skill expression is measurable (the 17lands check)', () => {
  test('across simulated tables, the Prodigy outperforms the Novice', () => {
    // Seat-0 pilots rotate through all PILOT_PERSONAS; seeds are fixed,
    // so this is deterministic, not flaky. Nightmare, because the
    // measured finding is that easier tiers barely punish bad drafting
    // (guaranteed-coverage packs force bodies into every pool).
    const games = simulate({ tables: PILOT_PERSONAS.length * 12, difficulty: 'nightmare' });
    const wr = id => {
      const mine = games.filter(g => g.seat === 0 && g.pilotId === id);
      return mine.filter(g => g.victory).length / mine.length;
    };
    const bodies = id => {
      const mine = games.filter(g => g.seat === 0 && g.pilotId === id);
      return mine.reduce((s, g) => s + g.partySize, 0) / mine.length;
    };
    assert.ok(bodies('prodigy') > bodies('novice'),
      `the Prodigy drafts more bodies (${bodies('prodigy').toFixed(1)} vs ${bodies('novice').toFixed(1)})`);
    assert.ok(wr('prodigy') > wr('novice'),
      `skill separates win rates (prodigy ${wr('prodigy')} vs novice ${wr('novice')})`);
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
