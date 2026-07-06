/**
 * CardPacks — the content pack registry
 *
 * The base card pool never changes; packs append to it. A pack is a
 * plain object { id, name, description, cards: [...] } — the format
 * shared by built-in DLC (see src/packs/), the player's card editor,
 * and imported JSON. Disabled packs stay registered but out of the
 * draft (Bycer's TCG Deep Dive: expansions extend, never mutate).
 */

import {
  CARD_TYPES, CLASSES,
  CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, PERSONALITY_CARDS,
} from './Cards.js';

const BASE_BY_TYPE = {
  [CARD_TYPES.CHARACTER]: CHARACTER_CARDS,
  [CARD_TYPES.EQUIPMENT]: EQUIPMENT_CARDS,
  [CARD_TYPES.SPELL]: SPELL_CARDS,
  [CARD_TYPES.PERSONALITY]: PERSONALITY_CARDS,
};

/* Stat budgets keep player-made cards honest (costed design) */
export const BUDGETS = {
  character: { statTotal: 34 },      // health + attack*2 + defense*2 + mind
  equipment: { bonusTotal: 4 },      // net bonus points
  spell: { maxPower: 6 },
  personality: {},                   // must reuse an existing archetype
};

const KNOWN_ARCHETYPES = PERSONALITY_CARDS.map(c => c.archetype);

/**
 * Validate one card. Returns a list of problems (empty = valid).
 */
export function validateCard(card) {
  const problems = [];
  if (!card || typeof card !== 'object') return ['not a card'];
  if (!card.id) problems.push('needs an id');
  if (!card.name || card.name.length < 2) problems.push('needs a name');
  if (!Object.values(CARD_TYPES).includes(card.type)) problems.push(`unknown type "${card.type}"`);

  if (card.type === CARD_TYPES.CHARACTER) {
    if (!Object.values(CLASSES).includes(card.class)) problems.push(`unknown class "${card.class}"`);
    const s = card.stats || {};
    for (const k of ['health', 'attack', 'defense', 'mind']) {
      if (!(Number.isFinite(s[k]) && s[k] >= 1)) problems.push(`stat ${k} must be ≥ 1`);
    }
    const total = (s.health || 0) + (s.attack || 0) * 2 + (s.defense || 0) * 2 + (s.mind || 0);
    if (total > BUDGETS.character.statTotal) {
      problems.push(`stat budget ${total} exceeds ${BUDGETS.character.statTotal} (health + 2×attack + 2×defense + mind)`);
    }
  }
  if (card.type === CARD_TYPES.EQUIPMENT) {
    const bonus = card.bonus || {};
    const total = Object.values(bonus).reduce((s, v) => s + v, 0);
    if (total > BUDGETS.equipment.bonusTotal) {
      problems.push(`bonus total ${total} exceeds ${BUDGETS.equipment.bonusTotal}`);
    }
    if (Object.keys(bonus).length === 0) problems.push('equipment needs at least one bonus');
  }
  if (card.type === CARD_TYPES.SPELL) {
    if (!['combat', 'heal', 'utility'].includes(card.use)) problems.push(`spell use must be combat/heal/utility`);
    if (!(Number.isFinite(card.power) && card.power >= 1 && card.power <= BUDGETS.spell.maxPower)) {
      problems.push(`spell power must be 1–${BUDGETS.spell.maxPower}`);
    }
  }
  if (card.type === CARD_TYPES.PERSONALITY) {
    if (!KNOWN_ARCHETYPES.includes(card.archetype)) {
      problems.push(`personality archetype must be one of: ${KNOWN_ARCHETYPES.join(', ')}`);
    }
  }
  return problems;
}

/**
 * Validate a whole pack: shape, card validity, id uniqueness.
 */
export function validatePack(pack) {
  const problems = [];
  if (!pack?.id || !pack?.name) problems.push('a pack needs an id and a name');
  if (!Array.isArray(pack?.cards) || pack.cards.length === 0) problems.push('a pack needs cards');
  const ids = new Set();
  for (const card of pack?.cards || []) {
    for (const p of validateCard(card)) problems.push(`${card?.name || card?.id || '?'}: ${p}`);
    if (ids.has(card.id)) problems.push(`duplicate card id ${card.id}`);
    ids.add(card.id);
  }
  return problems;
}

/* The registry itself */
const registry = [];

export function registerPack(pack, { enabled = true } = {}) {
  const problems = validatePack(pack);
  if (problems.length) throw new Error(`invalid pack: ${problems.join('; ')}`);
  const existing = registry.findIndex(p => p.pack.id === pack.id);
  const record = { pack, enabled };
  if (existing >= 0) registry[existing] = record; else registry.push(record);
  return record;
}

export function setPackEnabled(packId, enabled) {
  const record = registry.find(p => p.pack.id === packId);
  if (record) record.enabled = enabled;
  return record || null;
}

export function listPacks() {
  return registry.map(r => ({ id: r.pack.id, name: r.pack.name, description: r.pack.description, cards: r.pack.cards.length, enabled: r.enabled }));
}

/**
 * The live card pool for a type: base cards plus every enabled pack's.
 * This is what the draft builds packs from.
 */
export function pooledCards(type) {
  const extra = registry
    .filter(r => r.enabled)
    .flatMap(r => r.pack.cards.filter(c => c.type === type));
  return [...(BASE_BY_TYPE[type] || []), ...extra];
}

/** For tests: wipe the registry. */
export function _resetPacks() {
  registry.length = 0;
}
