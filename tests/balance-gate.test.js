/**
 * The balance gate.
 *
 * Every mechanic and asset change this project makes moves the
 * difficulty curve, and this session re-swept STAT_SCALE by hand six
 * times before anything automated existed. Doing it by hand means
 * sometimes not doing it, and a curve that has quietly drifted makes
 * every measurement taken against it wrong.
 *
 * So: a red build when the curve leaves its band. `npm run calibrate`
 * reports the drift and, with --write, searches for new constants.
 *
 * The tolerance is deliberately loose. Combat rolls come from the global
 * Math.random and this runs a smaller sample than the committed
 * benchmark, so a tight gate here would be a flaky gate — and a flaky
 * gate gets ignored, which is worse than no gate.
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { TARGET, TOLERANCE } from '../tools/calibrate.mjs';
import { runMining } from '../tools/mine.js';
import { STAT_SCALE } from '../src/world/DungeonGen.js';

/* Smaller than the committed benchmark: this runs on every test pass */
const TABLES = 400;
const GATE = TOLERANCE + 2;      // sampling slack on top of the design band

function winRate(difficulty) {
  const { games } = runMining({ tables: TABLES, difficulty });
  return (games.filter(g => g.victory).length / games.length) * 100;
}

describe('The difficulty curve is where the design says', () => {
  const measured = {};

  test('every difficulty is inside its band', () => {
    const drifted = [];
    for (const [difficulty, target] of Object.entries(TARGET)) {
      const wr = winRate(difficulty);
      measured[difficulty] = wr;
      if (Math.abs(wr - target) > GATE) {
        drifted.push(`${difficulty} ${wr.toFixed(1)}% (target ${target}%, scale ${STAT_SCALE[difficulty]})`);
      }
    }
    assert.deepEqual(drifted, [],
      `the curve has drifted — run \`npm run calibrate\` to see it and \`--write\` to fix it:\n  ${drifted.join('\n  ')}`);
  });

  test('the curve still descends', () => {
    // Sharper than the bands: whatever the absolute numbers, a harder
    // difficulty must be harder. A change that inverted two rungs while
    // leaving both inside tolerance would slip past the test above.
    assert.ok(measured.easy > measured.medium, 'easy is easier than medium');
    assert.ok(measured.medium > measured.hard, 'medium is easier than hard');
    assert.ok(measured.hard > measured.nightmare, 'hard is easier than nightmare');
  });

  test('the scales themselves rise with difficulty', () => {
    assert.ok(STAT_SCALE.easy < STAT_SCALE.medium);
    assert.ok(STAT_SCALE.medium < STAT_SCALE.hard);
    assert.ok(STAT_SCALE.hard < STAT_SCALE.nightmare);
  });

  test('the committed benchmark was measured against these constants', () => {
    // MINING_REPORT.md is quoted throughout the design docs. A report
    // generated before the last balance change is quietly describing a
    // different game, and nothing about reading it would say so. The
    // report stamps the scales it ran against; they must still match.
    const report = readFileSync(new URL('../MINING_REPORT.md', import.meta.url), 'utf8');
    const stamp = report.match(/<!-- STAT_SCALE (\{.*?\}) -->/);
    assert.ok(stamp, 'the benchmark records what it was measured against');
    assert.deepEqual(JSON.parse(stamp[1]), STAT_SCALE,
      'MINING_REPORT.md is stale — regenerate it with `npm run bench`');
  });

  test('the target curve is the one the design documents', () => {
    // A guard against fixing a drift by moving the goalposts: these
    // numbers are quoted throughout DESIGN.md and DESIGN_DIALOGUE.md.
    assert.deepEqual(TARGET, { easy: 99, medium: 88, hard: 71, nightmare: 45 });
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
