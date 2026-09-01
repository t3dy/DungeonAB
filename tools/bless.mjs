#!/usr/bin/env node
/**
 * Bless the golden chronicles.
 *
 * A golden file freezes a seeded delve's whole story. Any change to a
 * mechanic or a line shows up as a readable diff in review, which is the
 * point: prose changes are easy to make by accident and impossible to
 * spot in a code diff.
 *
 * Combat rolls come from the global Math.random, so a delve is not
 * reproducible on its own. The seeding here replaces Math.random with a
 * deterministic stream for the duration of the run — the same trick the
 * test uses, so the golden and the check agree by construction.
 *
 *   npm run bless          # rewrite the golden files
 *   npm test               # fails if a delve no longer matches one
 *
 * Re-bless deliberately, and read the diff before you do. A golden file
 * that gets re-blessed without being read is a golden file that has
 * stopped testing anything.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Simulator } from '../src/sim/Simulator.js';
import { toMarkdown } from '../src/narrative/Chronicle.js';
import { SeededRandom } from '../src/draft/PackDraft.js';
import { getAllCards } from '../src/game/Cards.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const GOLDEN_DIR = path.join(HERE, '../tests/golden');

/** The delves that are frozen. Keep this list short and varied. */
export const CASES = [
  { name: 'medium-delve', seed: 'golden-medium', difficulty: 'medium' },
  { name: 'hard-delve', seed: 'golden-hard', difficulty: 'hard' },
  // Chosen to end in a wipe: the set has to freeze a defeat as well as
  // victories, or the endings, the fall lines and the trophies-lost
  // writing are never exercised by a golden at all.
  // Re-picked when rooms got bigger and the hazards got teeth: the old
  // seed started winning, and three victories freeze no defeat at all.
  // Re-picked again (2026-09-01) after the boss floor and the
  // recalibration that followed it — `golden-fall-1` survived the new
  // curve. This case exists to freeze a wipe, so when it stops wiping,
  // find a seed that does rather than accepting three victories.
  { name: 'nightmare-delve', seed: 'golden-fall-2', difficulty: 'nightmare' },
];

/**
 * Run one case with Math.random pinned, so the same seed gives the same
 * story every time. Restores the real Math.random on every path out.
 */
export function renderCase({ seed, difficulty }) {
  const real = Math.random;
  const rng = new SeededRandom(`${seed}-rolls`);
  Math.random = () => rng.next();
  try {
    const pool = new SeededRandom(seed).shuffle(getAllCards()).slice(0, 27);
    const sim = new Simulator(pool, seed, difficulty);
    let guard = 0;
    while (!sim.gameOver && guard++ < 400) sim.tick();
    return toMarkdown(sim.getChronicle(), { ledger: true });
  } finally {
    Math.random = real;
  }
}

export function goldenPath(name) {
  return path.join(GOLDEN_DIR, `${name}.md`);
}

function main() {
  fs.mkdirSync(GOLDEN_DIR, { recursive: true });
  for (const c of CASES) {
    const text = renderCase(c);
    const file = goldenPath(c.name);
    const existed = fs.existsSync(file);
    const before = existed ? fs.readFileSync(file, 'utf8') : null;
    fs.writeFileSync(file, text);
    const status = !existed ? 'created' : (before === text ? 'unchanged' : 'UPDATED');
    console.log(`${status.padEnd(10)} ${path.relative(process.cwd(), file)}  (${text.split('\n').length} lines)`);
  }
  console.log('\nRead the diff before committing. A golden re-blessed unread tests nothing.');
}

if (process.argv[1] && process.argv[1].endsWith('bless.mjs')) main();
