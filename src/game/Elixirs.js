/**
 * Elixirs — unidentified potions (roguelike item identification)
 *
 * The NetHack tradition: hoards hold unlabeled phials, and what a
 * "murky green" phial *does* is decided per run by a seeded shuffle.
 * Knowledge is earned — an alchemist's nose, a scholar's memory, or
 * somebody brave enough to quaff-test — and once earned, every later
 * phial of that appearance is known for the rest of the run.
 */

import { SeededRandom } from '../draft/PackDraft.js';

export const ELIXIR_KINDS = [
  { kind: 'healing', name: 'the Elixir of Mending', icon: '💚', good: true, heal: 8 },
  { kind: 'vigor', name: 'the Elixir of Vigor', icon: '💪', good: true, attack: 2 },
  { kind: 'stoneskin', name: 'the Elixir of Stoneskin', icon: '🪨', good: true, defense: 2 },
  { kind: 'clarity', name: 'the Elixir of Clarity', icon: '👁️', good: true, mind: 2 },
  { kind: 'venom', name: 'Distilled Venom', icon: '🐍', good: false, damage: 6 },
  { kind: 'torpor', name: 'the Draught of Torpor', icon: '😴', good: false, attack: -2 },
];

/** One appearance per kind — the bijection the run keeps secret. */
export const PHIAL_APPEARANCES = [
  'murky green', 'fizzing amber', 'oily black',
  'quicksilver-bright', 'smoke-grey', 'luminous blue',
];

/**
 * The run's secret: appearance → elixir kind, shuffled by seed.
 * Deterministic, so an archived dungeon keeps its phial logic.
 */
export function appearanceMapFor(seed) {
  const rng = new SeededRandom(`elixirs-${seed}`);
  const kinds = rng.shuffle(ELIXIR_KINDS.map(k => k.kind));
  const map = {};
  PHIAL_APPEARANCES.forEach((appearance, i) => {
    map[appearance] = kinds[i % kinds.length];
  });
  return map;
}

export function elixirDef(kind) {
  return ELIXIR_KINDS.find(k => k.kind === kind) || null;
}
