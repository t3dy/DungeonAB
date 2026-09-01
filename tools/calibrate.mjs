#!/usr/bin/env node
/**
 * Calibrate — put the difficulty curve back on target
 *
 * Every mechanic and asset change this project makes moves the curve,
 * and re-swept STAT_SCALE by hand six times in a single session before
 * this existed. That is a task for a script: the search is mechanical,
 * the target has been the same for months, and doing it by hand means
 * sometimes not doing it.
 *
 * Usage:
 *   npm run calibrate              # report the drift, change nothing
 *   npm run calibrate -- --write   # patch STAT_SCALE to the best values
 *   npm run calibrate -- --tables 900
 *
 * It reports by default. Writing a design constant is the kind of thing
 * that should be asked for out loud.
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import { runMining } from './mine.js';
import { STAT_SCALE } from '../src/world/DungeonGen.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GEN = path.join(ROOT, 'src/world/DungeonGen.js');

/**
 * The curve the game is designed around. Easy is a tutorial, medium is
 * the default experience, hard is where evaluation skill starts to
 * matter, nightmare is a coin-flip for a good draft.
 *
 * These numbers have survived the boss floor of 2026-09-01, and the
 * near-miss is worth recording. Giving bosses a floor so they always get
 * to act (RoomEncounters.bossFloor) dropped easy to 86%, and a sweep
 * appeared to show it pinned at 86-88% whatever the monster scale — from
 * which the conclusion was drawn that 99 had only ever been achievable
 * because the last room was free, and the target was moved to 90.
 *
 * The sweep was editing `src/game/Progression.js`. STAT_SCALE lives in
 * `src/world/DungeonGen.js`. Every reading in it was taken at an
 * unchanged constant, so the "plateau" was one number measured four
 * times. Easy reaches 98.7% at scale 0.35, the target was never
 * unreachable, and it is 99 again.
 *
 * Two lessons, both already in MEASUREMENT.md and both re-earned here:
 * verify that a sweep is actually moving the thing it claims to move,
 * and be most suspicious of a measurement that conveniently justifies
 * changing a design commitment.
 */
export const TARGET = { easy: 99, medium: 88, hard: 71, nightmare: 45 };

/** How far off target is worth acting on, in win-rate points. */
export const TOLERANCE = 3;

export function measure(difficulty, tables = 700) {
  const { games } = runMining({ tables, difficulty });
  return (games.filter(g => g.victory).length / games.length) * 100;
}

/** Where the curve sits right now. */
export function currentCurve(tables = 700) {
  const out = {};
  for (const d of Object.keys(TARGET)) out[d] = measure(d, tables);
  return out;
}

/**
 * Search for the scale that lands nearest target for one difficulty.
 *
 * A bisection rather than a grid: win rate falls monotonically as the
 * monsters sharpen, so the interval can be halved instead of swept.
 * Each probe is a full mining run, so probes are the expensive thing.
 */
export function solve(difficulty, { tables = 500, probes = 6 } = {}) {
  const original = fs.readFileSync(GEN, 'utf8');
  const target = TARGET[difficulty];
  let lo = Math.max(0.4, STAT_SCALE[difficulty] * 0.6);
  let hi = STAT_SCALE[difficulty] * 1.6;
  const trace = [];

  const probe = (scale) => {
    fs.writeFileSync(GEN, original.replace(
      new RegExp(`${difficulty}: [0-9.]+`), `${difficulty}: ${scale.toFixed(2)}`,
    ));
    // The module cache holds the old constant, so measure in a child
    return parseFloat(execFileSync('node', [
      '-e',
      // pathToFileURL, not a slash-swapped path: on Windows a bare
      // `C:/...` specifier is not a valid ESM scheme and the child dies
      // with ERR_UNSUPPORTED_ESM_URL_SCHEME. It failed silently enough
      // that `npm run calibrate` had apparently never completed on a
      // Windows checkout — which makes standing rule 10 ("balance is
      // measured, not judged") aspirational on the machine it matters on.
      `import('${pathToFileURL(path.join(ROOT, 'tools/mine.js')).href}').then(async m => {`
      + ` const g = m.runMining({ tables: ${tables}, difficulty: '${difficulty}' }).games;`
      + ` console.log((g.filter(x => x.victory).length / g.length * 100).toFixed(2)); });`,
    ], { encoding: 'utf8' }).trim());
  };

  try {
    // Bracket before bisecting. Bounds derived from the current value
    // are only trustworthy if the current value is roughly right -- and
    // the whole reason to run this is that it might not be. Without
    // expansion the search silently converges on the edge of its own
    // range and reports a confident wrong answer.
    let loWr = probe(lo);
    trace.push({ scale: lo, wr: loWr });
    for (let i = 0; i < 4 && loWr < target; i++) {
      lo = Math.max(0.2, lo * 0.6);
      loWr = probe(lo);
      trace.push({ scale: lo, wr: loWr });
    }
    let hiWr = probe(hi);
    trace.push({ scale: hi, wr: hiWr });
    for (let i = 0; i < 4 && hiWr > target; i++) {
      hi *= 1.5;
      hiWr = probe(hi);
      trace.push({ scale: hi, wr: hiWr });
    }

    for (let i = 0; i < probes; i++) {
      const mid = (lo + hi) / 2;
      const wr = probe(mid);
      trace.push({ scale: mid, wr });
      if (Math.abs(wr - target) <= 0.5) break;
      if (wr > target) lo = mid; else hi = mid;      // higher scale = harder
    }
  } finally {
    fs.writeFileSync(GEN, original);
  }

  const best = trace.reduce((a, b) =>
    Math.abs(b.wr - target) < Math.abs(a.wr - target) ? b : a);
  return { difficulty, target, best, trace };
}

function main() {
  const args = process.argv.slice(2);
  const write = args.includes('--write');
  const at = args.indexOf('--tables');
  const tables = at >= 0 ? parseInt(args[at + 1], 10) : 700;

  console.log(`Target curve: ${Object.entries(TARGET).map(([d, t]) => `${d} ${t}%`).join(' · ')}\n`);
  const curve = currentCurve(tables);
  let drifted = [];
  console.log('difficulty   scale   measured   target   drift');
  for (const [d, wr] of Object.entries(curve)) {
    const drift = wr - TARGET[d];
    const flag = Math.abs(drift) > TOLERANCE ? '  ⚠' : '';
    if (Math.abs(drift) > TOLERANCE) drifted.push(d);
    console.log(`${d.padEnd(12)} ${STAT_SCALE[d].toFixed(2).padStart(5)} ${wr.toFixed(1).padStart(10)} ${String(TARGET[d]).padStart(8)} ${(drift >= 0 ? '+' : '') + drift.toFixed(1)}${flag}`);
  }

  if (drifted.length === 0) {
    console.log('\nThe curve is on target. Nothing to do.');
    return;
  }
  console.log(`\n${drifted.length} difficult${drifted.length === 1 ? 'y has' : 'ies have'} drifted past ${TOLERANCE} points: ${drifted.join(', ')}`);

  if (!write) {
    console.log('Run with --write to search for and apply new values.');
    return;
  }

  let src = fs.readFileSync(GEN, 'utf8');
  for (const d of drifted) {
    if (d === 'easy') continue;      // easy is a tutorial; it is left alone
    const { best } = solve(d);
    console.log(`  ${d}: ${STAT_SCALE[d].toFixed(2)} → ${best.scale.toFixed(2)} (measured ${best.wr.toFixed(1)}%)`);
    src = src.replace(new RegExp(`${d}: [0-9.]+`), `${d}: ${best.scale.toFixed(2)}`);
  }
  fs.writeFileSync(GEN, src);
  console.log('\nSTAT_SCALE updated. Re-run `npm test` and regenerate MINING_REPORT.md.');
}

if (process.argv[1] && process.argv[1].endsWith('calibrate.mjs')) main();
