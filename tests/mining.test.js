/**
 * Tests for the mining harness — the 17lands-style pipeline that
 * simulates AI-drafted tables and aggregates pick/play statistics.
 * Small samples here: we test structure and sanity, not balance.
 */

import { strict as assert } from 'assert';
import { draftTable, simulate, aggregate, renderReport, runMining } from '../tools/mine.js';
import { getAllCards, CARD_TYPES } from '../src/game/Cards.js';

describe('Drafting a full AI table', () => {
  test('every seat drafts a complete, legal pool', () => {
    const draft = draftTable(0);
    assert.equal(draft.finished, true, 'the draft completes');
    for (const seat of draft.seats) {
      assert.equal(seat.pool.length, 24, `${seat.name} made all 24 picks`);
      const chars = seat.pool.filter(c => c.type === CARD_TYPES.CHARACTER);
      assert.ok(chars.length >= 1, `${seat.name} has at least one character`);
    }
  });

  test('the same table index drafts the same pools (seeded)', () => {
    const a = draftTable(7).seats[0].pool.map(c => c.id);
    const b = draftTable(7).seats[0].pool.map(c => c.id);
    assert.deepEqual(a, b);
  });
});

describe('Game records', () => {
  test('simulate returns one complete record per seat', () => {
    const games = simulate({ tables: 2, difficulty: 'medium' });
    assert.equal(games.length, 8, '2 tables × 4 seats');
    for (const g of games) {
      assert.equal(typeof g.victory, 'boolean');
      assert.ok(g.poolIds.length === 24);
      assert.equal(g.picks.length, 24, 'every pick logged');
      assert.ok(g.picks.every(p => p.takenAt >= 1 && p.takenAt <= 24), 'pick positions in range');
      assert.ok(g.decisions.length > 0, 'room decisions were logged');
      assert.ok(g.decisions.every(d => d.room && d.action), 'decisions carry room and action');
    }
  });
});

describe('Aggregation and report', () => {
  test('card stats, curves, and tables come out sane', () => {
    const { games, agg, report } = runMining({ tables: 4, difficulty: 'medium' });
    assert.equal(agg.total, games.length);

    for (const row of agg.cardRows) {
      assert.ok(row.games > 0);
      assert.ok(row.wrIn >= 0 && row.wrIn <= 1, `${row.id} WR in [0,1]`);
      assert.ok(!Number.isNaN(row.iwd), `${row.id} IWD is a number`);
      assert.ok(Number.isNaN(row.ata) || (row.ata >= 1 && row.ata <= 24), `${row.id} ATA in pick range`);
    }

    const sizes = [...agg.bySize.values()].reduce((s, [n]) => s + n, 0);
    assert.equal(sizes, agg.total, 'every game lands in exactly one size bucket');

    for (const [key, a] of agg.byAction) {
      assert.ok(a.ok <= a.n, `${key} successes ≤ attempts`);
    }

    assert.ok(report.includes('## Party-size win curve'), 'report has the curve');
    assert.ok(report.includes('## Decision outcomes'), 'report has the decision table');
    assert.ok(report.includes('IWD'), 'report has card stats');
  });

  test('known card names resolve in the report (not raw ids)', () => {
    const { report } = runMining({ tables: 3 });
    const anyName = getAllCards().some(c => report.includes(c.name));
    assert.ok(anyName, 'at least one real card name appears');
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
