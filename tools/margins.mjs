#!/usr/bin/env node
/**
 * Does the draft buy margins and access?
 *
 * The difficulty curve (99/88/71/45) is calibrated and enforced, so
 * aggregate win rate can never express draft quality — it is a
 * controlled variable. The design decision (2026-08-31) is that a good
 * draft buys MARGINS (score, survivors, trophies) and ACCESS (vaults
 * reached, situations answered with a capability rather than endured).
 * This tool measures whether it actually does.
 *
 *   npm run margins            # 150 tables (600 games) at medium
 *   npm run margins 200 hard   # bigger, or a different difficulty
 *
 * Standing rule (DESIGN_DIALOGUE.md §N): party-shape buckets need
 * several hundred delves; two apparent wins at n≈150 vanished at n≈500.
 * Default n here is 600 games for that reason. Quartile spreads are
 * reported with the count in each bucket so a thin bucket is visible.
 */

import { simulate } from './mine.js';
import { Party } from '../src/agents/Party.js';
import { getAllCards } from '../src/game/Cards.js';
import { allEncounters } from '../src/encounters/EncounterEngine.js';
import '../src/encounters/Encounters.js';

const all = getAllCards();
const card = id => all.find(c => c.id === id);

/** Situation options that require at least one capability, by id. */
const GATED = new Set();
for (const def of allEncounters()) {
  for (const opt of def.options) {
    if ((opt.requires || []).length > 0) GATED.add(opt.id);
  }
}

const mean = a => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

function pearson(xs, ys) {
  const mx = mean(xs), my = mean(ys);
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < xs.length; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    dx += (xs[i] - mx) ** 2;
    dy += (ys[i] - my) ** 2;
  }
  return num / Math.sqrt(dx * dy || 1);
}

export function measure(games) {
  const rows = games.map(g => {
    const p = new Party(g.poolIds.map(card).filter(Boolean));
    const situations = g.decisions.filter(d => d.room === 'situation');
    const answered = situations.filter(d => GATED.has(d.action));
    return {
      breadth: p.capabilities().size,
      score: g.score,
      survivors: g.survivors,
      trophies: g.trophies,
      rooms: g.roomsCleared,
      victory: g.victory,
      vaults: g.decisions.filter(d => d.room === 'vault').length,
      situations: situations.length,
      answered: answered.length,
    };
  });

  const breadths = rows.map(r => r.breadth);
  const sorted = [...breadths].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const low = rows.filter(r => r.breadth <= q1);
  const high = rows.filter(r => r.breadth >= q3);

  const spread = key => ({
    low: mean(low.map(r => r[key])),
    high: mean(high.map(r => r[key])),
    r: pearson(breadths, rows.map(r => r[key])),
  });

  return {
    n: rows.length,
    breadth: { min: sorted[0], q1, median: sorted[Math.floor(sorted.length / 2)], q3, max: sorted[sorted.length - 1] },
    buckets: { low: low.length, high: high.length },
    score: spread('score'),
    survivors: spread('survivors'),
    trophies: spread('trophies'),
    rooms: spread('rooms'),
    vaults: spread('vaults'),
    // Access in the capability sense: of the situations a party met,
    // how many it answered with something it drafted.
    answerRate: {
      low: mean(low.map(r => (r.situations ? r.answered / r.situations : 0))),
      high: mean(high.map(r => (r.situations ? r.answered / r.situations : 0))),
    },
    winRate: { low: mean(low.map(r => +r.victory)), high: mean(high.map(r => +r.victory)) },
  };
}

function fmt(x, d = 1) { return Number(x).toFixed(d); }

function main() {
  const args = process.argv.slice(2);
  const tables = Number(args.find(a => /^\d+$/.test(a))) || 150;
  const difficulty = args.find(a => ['easy', 'medium', 'hard', 'nightmare'].includes(a)) || 'medium';

  console.log(`Simulating ${tables} tables (${tables * 4} games) at ${difficulty}…`);
  const games = simulate({ tables, difficulty });
  const m = measure(games);

  console.log(`\nn=${m.n} at ${difficulty} · breadth q1=${m.breadth.q1} median=${m.breadth.median} q3=${m.breadth.q3}`);
  console.log(`narrow bucket ${m.buckets.low} games · broad bucket ${m.buckets.high} games\n`);
  console.log('                     narrow    broad     pearson r (breadth vs value)');
  for (const [label, key] of [
    ['score', 'score'], ['survivors', 'survivors'], ['trophies', 'trophies'],
    ['rooms cleared', 'rooms'], ['vaults reached', 'vaults'],
  ]) {
    const s = m[key];
    console.log(`  ${label.padEnd(18)}${fmt(s.low).padStart(7)}  ${fmt(s.high).padStart(7)}     ${fmt(s.r, 3)}`);
  }
  console.log(`  ${'situations answered'.padEnd(18)}${fmt(m.answerRate.low * 100).padStart(6)}%  ${fmt(m.answerRate.high * 100).padStart(6)}%     (share of those met)`);
  console.log(`  ${'win rate'.padEnd(18)}${fmt(m.winRate.low * 100).padStart(6)}%  ${fmt(m.winRate.high * 100).padStart(6)}%     (the controlled variable, for reference)`);
}

if (process.argv[1] && process.argv[1].endsWith('margins.mjs')) main();
