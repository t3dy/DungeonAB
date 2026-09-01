/**
 * The card-measurement fixtures must be able to measure something.
 *
 * `npm run card` is what standing rule 10 leans on to price a card
 * ("the cost model only screens"), and on 2026-09-01 it was found
 * reporting confident zeroes at both ends of the difficulty curve. Its
 * single base party won 98.7% on easy and 0.3% on nightmare, so no card
 * could move the number in either direction — not because cards are
 * worthless but because a saturated comparison has nothing to say.
 *
 * That is standing rule 11 (a comparison that cannot fail is worse than
 * no test) broken inside the instrument, which is the worst place for it:
 * a broken gate fails loudly, a broken instrument publishes.
 *
 * So the fixtures are gated. Whenever STAT_SCALE moves — and every
 * mechanic change moves it — this fails until they are re-searched.
 */

import { strict as assert } from 'assert';
import { winRate, baseFor, MEASURABLE } from '../tools/card.mjs';
import { STAT_SCALE } from '../src/world/DungeonGen.js';

/*
 * Small enough to run on every test pass, which makes it noisy: two
 * arms of 120 have a wide band, so the assertion is against the
 * MEASURABLE window (25-75) rather than against a target. A fixture only
 * fails here when it has drifted properly out of the regime, not when it
 * has wandered a few points.
 */
const N = 120;

describe('A card can be measured at every difficulty', () => {
  const measured = {};

  test('every fixture sits where a card could help or hurt', () => {
    const bad = [];
    for (const difficulty of Object.keys(STAT_SCALE)) {
      const wr = winRate([], { difficulty, n: N, seedPrefix: `fixture-${difficulty}` });
      measured[difficulty] = wr;
      if (wr < MEASURABLE.lo || wr > MEASURABLE.hi) {
        bad.push(`${difficulty} ${wr.toFixed(1)}% (want ${MEASURABLE.lo}-${MEASURABLE.hi}%)`);
      }
    }
    assert.deepEqual(bad, [],
      'card fixtures have drifted out of the measurable band — re-search '
      + `BASE_BY_DIFFICULTY in tools/card.mjs:\n  ${bad.join('\n  ')}`);
  });

  test('a fixture never contains the card being measured', () => {
    // A base already holding the card under test reports it as worth
    // nothing, which is indistinguishable from a dead card.
    const held = baseFor('hard').map(c => c.id);
    assert.ok(held.includes('eq-lantern'), 'the hard fixture carries the lantern');
    const without = baseFor('hard', ['eq-lantern']).map(c => c.id);
    assert.ok(!without.includes('eq-lantern'), 'and excludes it when it is the subject');
    assert.equal(without.length, held.length - 1);
  });

  test('each difficulty gets its own fixture, because one cannot serve all', () => {
    // Not a style preference: the monster-scale spread is 4.7x, so a
    // party that can lose on easy is annihilated on nightmare.
    const shapes = Object.keys(STAT_SCALE).map(d => baseFor(d).length);
    assert.ok(new Set(shapes).size > 1, 'the fixtures differ in size');
    assert.ok(shapes[0] < shapes[shapes.length - 1],
      'and they get bigger as the dungeon gets meaner');
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
