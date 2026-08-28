/**
 * Costing — what a card is actually worth, weighted by how it scales
 *
 * The lesson this encodes was found three separate times, each by
 * measurement, each after shipping something that looked balanced:
 *
 *   §8  Three combat spells lost 33 win points to three equipment
 *       cards, and *all* of the gap was the boss chamber. A +2 weapon
 *       is +2 for twelve rounds; a one-shot burst off a large health
 *       pool is a rounding error.
 *   §9  Healing applied after a fight did nothing; the same healing
 *       applied per-round mattered.
 *   §12 Tactic branches giving per-round combat value measured +11.4
 *       and +6.4; branches giving situational value measured +3.4 and
 *       +3.0, from numbers that looked comparable on the card.
 *
 * The generalisation: **this game's damage concentrates in one long
 * fight, so an effect that repeats every round is worth roughly an
 * order of magnitude more than the same number applied once.** Raw
 * addition of effect values is therefore a bad cost model, and every
 * time we have used one it has mispriced something.
 *
 * `ROUNDS_THAT_MATTER` is the lever: the boss fight is capped at 12
 * rounds and most of a party's health is spent there.
 */

import { TACTICS } from './Tactics.js';

/** Tactic effects live on the tree, not on the card-shaped export. */
const TACTIC_EFFECTS = new Map(TACTICS.map(t => [t.id, t.effect]));

/** How long the fight that decides the run actually runs. */
export const ROUNDS_THAT_MATTER = 12;

/**
 * How each kind of effect scales, as a multiplier on its face value.
 *
 *   perRound    — applies every round of every fight
 *   perFight    — once per fight, but every fight
 *   perRoom     — once per room, including the quiet ones
 *   oneShot     — once, when its situation comes up
 *   situational — once, and only when a specific thing is present
 *   resource    — a march, a potion, a material: felt across the delve
 */
export const SCALING = {
  perRound: ROUNDS_THAT_MATTER,
  perFight: 2.5,
  perRoom: 2,
  oneShot: 1,
  situational: 0.5,
  resource: 3,
};

/**
 * Which scaling each known effect key has. Anything not listed is
 * treated as `oneShot` and flagged, so a new effect cannot quietly
 * enter the pool uncosted.
 */
export const EFFECT_SCALING = {
  /* combat, every round */
  flankDamage: 'perRound',
  cover: 'perRound',
  monsterAtk: 'perRound',
  vsArmored: 'perRound',
  wardPerCast: 'perRound',
  ward: 'perRound',
  burn: 'perRound',
  sustain: 'perRound',
  attack: 'perRound',
  defense: 'perRound',

  /* once a fight */
  opening: 'perFight',
  damage: 'perFight',
  featureOpener: 'perFight',
  summonAttack: 'perRound',

  /* once a room */
  extraCast: 'perRoom',
  heal: 'perRoom',

  /* resources felt across the whole delve */
  supply: 'resource',
  mendAtShrine: 'resource',
  materials: 'resource',
  potions: 'resource',

  /* stat lines */
  health: 'perRound',
  mind: 'perFight',

  /* situational */
  fireTrapSoak: 'situational',
  // A march saved, but only at a stairhead: once or twice a delve
  campSupply: 'situational',
  vsUndead: 'situational',
  selfHarm: 'perFight',
  light: 'resource',
};

/**
 * How much of a point actually reaches the mechanic.
 *
 * The model has to price the number the *fight* sees, not the number
 * printed on the card. Incoming damage subtracts `totalDefense() / 3`,
 * so three points of defence is one point of mitigation a round -- and
 * costing it raw made Haunted Armor read as eight times the card
 * Flanking is, when measurement puts them within two win points of each
 * other.
 */
export const CONVERSION = {
  defense: 1 / 3,
  health: 1,
  mind: 1 / 2,          // spell power reads floor(mind / 2)
};

/**
 * Keys where a NEGATIVE number is the good outcome.
 *
 * `monsterAtk: -2` means the foe hits two weaker, which is a payout,
 * not a cost. Treating the sign naively priced Encirclement at exactly
 * zero -- its +2 flanking damage and its -2 to the monster's swing
 * cancelled -- for a card that measures as one of the strongest in the
 * pool.
 */
export const GOOD_WHEN_NEGATIVE = new Set(['monsterAtk', 'selfHarm']);

/** Booleans have no face value, so they carry a flat worth. */
export const FLAG_WORTH = {
  sustainFull: 12,
  allSpellsArea: 10,
  noSelfHarm: 6,
  undeadQuelled: 4,
  revealEthereal: 5,
  // A stairhead camp is interrupted about a third of the time for 4-7
  // damage; a watched one never is, once or twice a delve
  campWatched: 4,
  consumes: -2,
};

/**
 * Score one effect bag. Returns the weighted total plus a breakdown, so
 * a card that prices badly can be argued with rather than just rejected.
 */
export function costEffects(effects = {}) {
  let total = 0;
  const parts = [];
  const unknown = [];

  for (const [key, value] of Object.entries(effects)) {
    if (key === 'flankMin') continue;          // a threshold, not a payout
    if (typeof value === 'boolean') {
      if (!value) continue;
      const worth = FLAG_WORTH[key];
      if (worth === undefined) { unknown.push(key); continue; }
      total += worth;
      parts.push({ key, kind: 'flag', worth });
      continue;
    }
    if (typeof value !== 'number' || value === 0) continue;

    const kind = EFFECT_SCALING[key];
    if (!kind) { unknown.push(key); }
    const scale = SCALING[kind] ?? SCALING.oneShot;
    const conversion = CONVERSION[key] ?? 1;
    const helpful = GOOD_WHEN_NEGATIVE.has(key) ? value < 0 : value > 0;
    const worth = Math.abs(value) * conversion * scale * (helpful ? 1 : -1);
    total += worth;
    parts.push({ key, kind: kind || 'unscaled', face: value, conversion, scale, worth });
  }

  return { total, parts, unknown };
}

/**
 * What a card is worth, whatever type it is. One model so equipment,
 * spells, tactics and characters can be compared against each other
 * rather than each against its own private cap.
 */
export function costCard(card) {
  if (!card) return { total: 0, parts: [], unknown: [] };

  switch (card.type) {
    case 'character': {
      const s = card.stats || {};
      return costEffects({
        health: (s.health || 0) / ROUNDS_THAT_MATTER,   // a pool, not a per-round tick
        attack: s.attack || 0,
        defense: s.defense || 0,
        mind: s.mind || 0,
      });
    }
    case 'equipment': {
      const bag = { ...(card.bonus || {}) };
      // Class-keyed actions are the real payload on the bomb items --
      // but only the WEARER's class fires, so the card is worth the best
      // single entry, not the sum of all five. Summing them priced
      // Haunted Armor's one ghostly blade as five.
      for (const action of Object.values(card.classActions || {})) {
        for (const [k, v] of Object.entries(action)) {
          if (typeof v === 'number') bag[k] = Math.max(bag[k] || 0, v);
        }
      }
      return costEffects(bag);
    }
    case 'spell': {
      // A working's burst plus what it keeps doing (SPELL_SUSTAIN_SHARE)
      const power = card.power || 0;
      return costEffects({
        damage: power,
        sustain: card.use === 'utility' ? 0 : power * 0.5,
      });
    }
    case 'tactic': {
      // The card-shaped export carries no effect bag; the tree does
      const effect = card.effect || TACTIC_EFFECTS.get(card.id) || {};
      return costEffects(effect);
    }
    default:
      return costEffects({});
  }
}

/**
 * Outliers, measured against each type's own distribution.
 *
 * Absolute bands were tried first and thrown away: they were guessed
 * rather than measured, and a guessed band either passes everything or
 * fails a whole card type at once (the first version flagged all
 * sixteen characters). What actually catches a problem card is being
 * far from its own peers -- Rationing measured +13.8 win points alone
 * against about +3 for every other tactic, and that shape is visible in
 * the distribution without anyone having to know the right number in
 * advance.
 *
 * `sigmas` is how far from its type's mean a card may sit. Returns the
 * outliers with enough context to argue with.
 */
export function costOutliers(cards, { sigmas = 2.5 } = {}) {
  const byType = new Map();
  for (const card of cards) {
    const { total, unknown } = costCard(card);
    if (!byType.has(card.type)) byType.set(card.type, []);
    byType.get(card.type).push({ card, cost: total, unknown });
  }

  const report = { types: {}, outliers: [], unknown: [] };
  for (const [type, rows] of byType) {
    const costs = rows.map(r => r.cost);
    const mean = costs.reduce((s, v) => s + v, 0) / costs.length;
    const variance = costs.reduce((s, v) => s + (v - mean) ** 2, 0) / costs.length;
    const sd = Math.sqrt(variance);
    report.types[type] = { n: rows.length, mean, sd, min: Math.min(...costs), max: Math.max(...costs) };

    for (const row of rows) {
      if (row.unknown.length) {
        report.unknown.push({ name: row.card.name, keys: row.unknown });
      }
      // A type whose cards are all identical has no spread to measure
      if (sd < 0.5) continue;
      const z = (row.cost - mean) / sd;
      if (Math.abs(z) > sigmas) {
        report.outliers.push({
          name: row.card.name, type, cost: row.cost, mean, sd, z,
          high: z > 0,
        });
      }
    }
  }
  return report;
}
