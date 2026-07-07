/**
 * DraftSignals — reading the table (v5 P0: draft signals with teeth)
 *
 * The design's #1 pillar is "The Draft Is the Game," which only holds
 * if pack picks are *legible*: you should be able to read what the
 * rivals want and know which cards you'll lose if you pass. Both are
 * derivable from the very same `scoreCard` the AI drafts with, run
 * with a flat (chaos-free) rng so the prediction is deterministic.
 *
 * Pure module — every function reads draft/seat state and returns
 * plain data; the UI renders it.
 */

import { CARD_TYPES, CLASSES } from '../game/Cards.js';
import { scoreCard } from './PackDraft.js';

// Chaos-free scoring: the AI's honest preference, minus the dice
const FLAT_RNG = { next: () => 0 };

/**
 * A short, readable appetite for a seat — what this rival is hungry
 * for right now, from its persona and the pool it has assembled.
 * Returns { text, urgent } where urgent flags a rival still without
 * a single hero (they'll grab the next character they see).
 */
export function describeAppetite(seat) {
  const persona = seat.persona;
  const pool = seat.pool || [];
  const chars = pool.filter(c => c.type === CARD_TYPES.CHARACTER);
  const classes = new Set(chars.map(c => c.class));
  const spells = pool.filter(c => c.type === CARD_TYPES.SPELL).length;

  // No body yet: the loudest, most actionable signal
  if (chars.length === 0) {
    return { text: 'hunting its first hero — any character will do', urgent: true };
  }

  const frags = [];

  // Primary drive: the type this persona weights above the rest
  const topType = dominantType(persona);
  if (topType === CARD_TYPES.SPELL) {
    frags.push(classes.has(CLASSES.WIZARD) ? 'spell-hungry, and has the wizard to burn them' : 'hoarding spells, wants a caster');
  } else if (topType === CARD_TYPES.EQUIPMENT) {
    frags.push('collecting gear for the ones it has');
  } else if (topType === CARD_TYPES.CHARACTER) {
    frags.push(chars.length >= 4 ? 'fielding a small army' : 'stacking bodies');
  }

  // Class ambition: the class it favors most, if still thin on it
  const wantClass = dominantClass(persona);
  if (wantClass && !classes.has(wantClass)) {
    frags.push(`eyeing a ${wantClass}`);
  }

  // A glaring gap the rival will move to fill
  if (!classes.has(CLASSES.CLERIC) && chars.length >= 2) frags.push('no healer yet');

  return { text: frags.slice(0, 2).join(', ') || 'building a balanced band', urgent: false };
}

/**
 * The threats hanging over the player's current pack: the seat it
 * passes to next, and the cards that seat covets most (its top
 * pick, plus any close runner-up). Passing the pack hands those over.
 * Returns { seat, cardIds:Set, top } or null when nothing's at stake.
 */
export function recipientThreats(draft, topN = 2, closeBand = 1.2) {
  const seat = draft.nextRecipientSeat?.();
  const pack = draft.getPlayerPack?.() || [];
  if (!seat || pack.length <= 1) return null;

  const scored = pack
    .map(card => ({ id: card.id, card, score: scoreCard(card, seat.persona, seat.pool, FLAT_RNG) }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0].score;
  const coveted = scored
    .filter((s, i) => i < topN && (i === 0 || best - s.score <= closeBand))
    .map(s => s.id);

  return { seat, cardIds: new Set(coveted), top: scored[0] };
}

/**
 * Does the receiving rival covet this specific card? Convenience for
 * per-card rendering. `threats` is the result of recipientThreats.
 */
export function isCoveted(threats, cardId) {
  return !!threats && threats.cardIds.has(cardId);
}

/* -------- helpers -------- */

function dominantType(persona) {
  const entries = Object.entries(persona.weights || {});
  if (entries.length === 0) return CARD_TYPES.CHARACTER;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

function dominantClass(persona) {
  const entries = Object.entries(persona.classBias || {});
  if (entries.length === 0) return null;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}
