/**
 * PackDraft — MTG-style pack draft engine
 *
 * A table of drafters (the player in seat 0 + AI opponents) opens
 * packs, picks one card each, and passes — left, then right, then
 * left again, one direction per round. Pack construction guarantees
 * coverage (every pack has characters) so no draft is ever dead.
 */

import { CARD_TYPES, CLASSES } from '../game/Cards.js';
import { pooledCards } from '../game/CardPacks.js';

/**
 * Seeded RNG (LCG — same approach as SnakeAB's ProcGen)
 */
export class SeededRandom {
  constructor(seed) {
    this.seed = this.hashCode(String(seed)) % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
    // Warm up: similar seed strings hash to nearby states, and an
    // LCG's first draw barely separates them. Three spins decorrelate.
    for (let i = 0; i < 3; i++) this.next();
  }
  hashCode(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h = h & h;
    }
    return Math.abs(h);
  }
  next() {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

/* ------------------------------------------------------------------ */
/* AI drafter personas — each seat wants different things              */
/* ------------------------------------------------------------------ */

/*
 * Personas have two independent axes:
 *   preferences — WHAT they like (weights/classBias/quirks): identity,
 *                 stable across skill.
 *   skill (0-1) — HOW WELL they evaluate: high skill blends toward the
 *                 rational baseline (rationalValue, calibrated by the
 *                 mining harness) and shrinks the chaos factor. Low
 *                 skill amplifies preferences into predictable mistakes.
 */
export const DRAFT_PERSONAS = [
  {
    id: 'warlord',
    name: 'The Warlord',
    icon: '⚔️',
    desc: 'Drafts muscle first: fighters, weapons, and the will to use them.',
    skill: 0.55,
    weights: { character: 3, equipment: 2.5, spell: 0.8, personality: 1 },
    classBias: { fighter: 3, rogue: 1.5 },
  },
  {
    id: 'archmage',
    name: 'The Archmage',
    icon: '🔮',
    desc: 'Hoards spells and the wizards to wield them.',
    skill: 0.5,
    weights: { character: 2, equipment: 1, spell: 3, personality: 1 },
    classBias: { wizard: 3, cleric: 1.5 },
  },
  {
    id: 'guildmaster',
    name: 'The Guildmaster',
    icon: '⚖️',
    desc: 'Balances the ledger: a bit of everything, nothing wasted.',
    skill: 0.7,
    weights: { character: 2, equipment: 2, spell: 2, personality: 2 },
    classBias: { rogue: 2, alchemist: 2 },
  },
];

/*
 * Skill-tier pilots — not seated at the default table (which stays
 * player + 3), but available for lobbies, benchmarks, and the mining
 * harness, which uses them to measure the game's skill expression:
 * if the Prodigy and the Novice post the same win rate, the draft
 * isn't rewarding evaluation skill.
 */
export const PILOT_TIERS = [
  {
    id: 'prodigy',
    name: 'The Prodigy',
    icon: '🧠',
    desc: 'Evaluates coldly: bodies to four, the mythic uncommons, no romance.',
    skill: 0.95,
    weights: { character: 2, equipment: 2, spell: 2, personality: 2 },
    classBias: {},
  },
  {
    id: 'novice',
    name: 'The Novice',
    icon: '🎈',
    desc: 'Takes the shiniest rare every time. The glass cannon is SO cool.',
    skill: 0.15,
    weights: { character: 1.2, equipment: 2.2, spell: 2.2, personality: 1.5 },
    classBias: {},
    quirks: { shiny: 2.5, bodyBlind: true, curseChaser: true },
  },
];

/** Every persona that can pilot a seat (table AIs + skill tiers). */
export const PILOT_PERSONAS = [...DRAFT_PERSONAS, ...PILOT_TIERS];

/* ------------------------------------------------------------------ */
/* Pack construction — guaranteed coverage                             */
/* ------------------------------------------------------------------ */

/**
 * Build one 8-card pack: 3 characters, 2 equipment, 2 spells,
 * 1 personality. Duplicates across packs are allowed (multiple
 * copies exist "in the box") but not within a pack.
 */
export function buildPack(rng) {
  const pack = [];
  const usedIds = new Set();

  const take = (pool, count) => {
    const shuffled = rng.shuffle(pool);
    let taken = 0;
    for (const card of shuffled) {
      if (taken >= count) break;
      if (usedIds.has(card.id)) continue;
      usedIds.add(card.id);
      pack.push({ ...card });
      taken++;
    }
  };

  // The pool = base cards + every enabled content pack's
  take(pooledCards(CARD_TYPES.CHARACTER), 3);
  take(pooledCards(CARD_TYPES.EQUIPMENT), 2);
  take(pooledCards(CARD_TYPES.SPELL), 2);
  take(pooledCards(CARD_TYPES.PERSONALITY), 1);

  return rng.shuffle(pack);
}

/* ------------------------------------------------------------------ */
/* AI pick logic — need-weighted scoring with a chaos factor           */
/* ------------------------------------------------------------------ */

/**
 * Score a card for an AI drafter given persona + current pool
 */
export function scoreCard(card, persona, pool, rng) {
  let score = persona.weights[card.type] || 1;

  const characters = pool.filter(c => c.type === CARD_TYPES.CHARACTER);

  if (card.type === CARD_TYPES.CHARACTER) {
    // Class bias
    score += (persona.classBias[card.class] || 0);
    // Diminishing returns on a big roster
    score -= characters.length * 0.35;
    // Desperation: no characters yet and draft is moving — grab one
    if (characters.length === 0) score += 3;
    // Alchemists tempt everyone a little (labs are valuable)
    if (card.class === CLASSES.ALCHEMIST && !characters.some(c => c.class === CLASSES.ALCHEMIST)) {
      score += 0.7;
    }
  }

  if (card.type === CARD_TYPES.EQUIPMENT) {
    // Equipment for a class we actually have is worth more
    if (card.bestFor && characters.some(c => c.class === card.bestFor)) score += 1.5;
    if (card.bestFor && !characters.some(c => c.class === card.bestFor)) score -= 0.5;
    // AI drafters see the curse and flinch; the hidden upside is the
    // player's to read. Trap picks wheel around the table.
    if (card.cursed) score -= 0.8;
  }

  if (card.type === CARD_TYPES.SPELL) {
    // Spells sing with a wizard in the pool
    if (characters.some(c => c.class === CLASSES.WIZARD)) score += 1.2;
  }

  if (card.type === CARD_TYPES.PERSONALITY) {
    // One or two personalities is plenty
    const personalities = pool.filter(c => c.type === CARD_TYPES.PERSONALITY);
    score -= personalities.length * 1.2;
    // Trap personalities read as liabilities to the AI; their hidden
    // upsides are the player's to spot
    if (card.trap) score -= 0.6;
  }

  // Chaos: AI drafters are not machines. Well. They are. But fun ones.
  score += rng.next() * 1.2;

  return score;
}

/**
 * The rational baseline — what the card is actually worth, calibrated
 * by the mining harness (tools/mine.js): bodies dominate until four,
 * the cleric is the format's mythic uncommon, class-keyed items are
 * the real bombs, the Craven is a measured trap. This is the "pro"
 * evaluation that skill blends toward.
 */
export function rationalValue(card, pool) {
  const characters = pool.filter(c => c.type === CARD_TYPES.CHARACTER);
  let v = 1;

  if (card.type === CARD_TYPES.CHARACTER) {
    // A body is the best card in the format until you have four
    v = characters.length < 4
      ? 6.5 - characters.length * 0.4
      : 4 - (characters.length - 3) * 0.9;
    // The mythic uncommon: unglamorous, measured at ~+7 win points
    if (card.class === CLASSES.CLERIC && !characters.some(c => c.class === CLASSES.CLERIC)) v += 1.5;
  }

  if (card.type === CARD_TYPES.EQUIPMENT) {
    v = 2;
    if (card.classActions) v += 2;   // the real bombs (+22 pts on a thin party)
    if (card.bestFor && characters.some(c => c.class === card.bestFor)) v += 1;
    if (card.cursed) v -= 0.2;       // the pro prices the printed cost, reads the upside
  }

  if (card.type === CARD_TYPES.SPELL) {
    v = 2
      + (characters.some(c => c.class === CLASSES.WIZARD) ? 1 : 0)
      + (card.use === 'heal' ? 0.5 : 0);
  }

  if (card.type === CARD_TYPES.PERSONALITY) {
    const personalities = pool.filter(c => c.type === CARD_TYPES.PERSONALITY);
    v = 1 - personalities.length * 1.2;
    if (card.archetype === 'craven') v -= 1;     // measured: 62% vs 83% baseline
    if (card.archetype === 'reckless' || card.archetype === 'greedy') v += 0.3;
  }

  return v;
}

/**
 * The preference/bias evaluation — the persona's identity, plus the
 * predictable mistakes its quirks encode:
 *   shiny       — overvalues finicky rares (class-keyed items, big spells)
 *   bodyBlind   — no urgency about drafting characters
 *   curseChaser — reads a curse's big numbers as pure upside
 */
export function biasValue(card, persona, pool) {
  const characters = pool.filter(c => c.type === CARD_TYPES.CHARACTER);
  const quirks = persona.quirks || {};
  let v = persona.weights?.[card.type] ?? 1;

  if (card.type === CARD_TYPES.CHARACTER) {
    v += persona.classBias?.[card.class] || 0;
    v -= characters.length * 0.35;
    if (!quirks.bodyBlind && characters.length === 0) v += 3;
  }
  if (card.type === CARD_TYPES.EQUIPMENT && card.cursed) {
    v += quirks.curseChaser ? 0.8 : -0.8;
  }
  if (quirks.shiny && (card.classActions || (card.type === CARD_TYPES.SPELL && card.power >= 5))) {
    v += quirks.shiny;
  }
  if (card.type === CARD_TYPES.PERSONALITY) {
    const personalities = pool.filter(c => c.type === CARD_TYPES.PERSONALITY);
    v -= personalities.length * 1.2;
    if (card.trap && !quirks.curseChaser) v -= 0.6;
  }
  return v;
}

/**
 * A pilot's actual pick evaluation: skill blends the rational baseline
 * with the persona's preferences, and pros are consistent (low chaos)
 * where novices are erratic.
 */
export function evaluatePick(card, persona, pool, rng) {
  const skill = persona.skill ?? 0.5;
  const chaos = rng.next() * (0.4 + (1 - skill) * 1.6);
  return skill * rationalValue(card, pool)
    + (1 - skill) * biasValue(card, persona, pool)
    + chaos;
}

/**
 * AI drafter picks the highest-scoring card from a pack
 */
export function aiPick(pack, persona, pool, rng) {
  let best = null;
  let bestScore = -Infinity;
  for (const card of pack) {
    const s = evaluatePick(card, persona, pool, rng);
    if (s > bestScore) {
      bestScore = s;
      best = card;
    }
  }
  return best;
}

/* ------------------------------------------------------------------ */
/* The draft table                                                     */
/* ------------------------------------------------------------------ */

export class PackDraft {
  /**
   * @param seed        Reproducible table seed
   * @param numRounds   Packs per drafter (default 3)
   * @param packSize    Cards per pack (default 8 from buildPack)
   */
  constructor(seed = 'table', numRounds = 3) {
    this.rng = new SeededRandom(seed);
    this.numRounds = numRounds;

    // Seat 0 is the player; 1-3 are AI personas
    this.seats = [
      { id: 'player', name: 'You', icon: '🐍', isAI: false, pool: [] },
      ...DRAFT_PERSONAS.map(p => ({
        id: p.id, name: p.name, icon: p.icon, isAI: true, persona: p, pool: [],
      })),
    ];

    this.round = 0;          // 0-based round index
    this.pickInRound = 0;    // 0-based pick index within the round
    this.packs = [];         // Current packs, indexed by seat
    this.finished = false;
    this.log = [];           // Pick history for signal-reading UI

    this.openNewPacks();
  }

  /**
   * Crack a fresh pack for every seat
   */
  openNewPacks() {
    this.packs = this.seats.map(() => buildPack(this.rng));
    this.pickInRound = 0;
  }

  /**
   * Pass direction alternates by round: left, right, left
   */
  passDirection() {
    return this.round % 2 === 0 ? 1 : -1;
  }

  /**
   * The player's current pack
   */
  getPlayerPack() {
    return this.packs[0];
  }

  /**
   * Execute one full table pick: the player takes `cardId` from
   * their pack, every AI picks from theirs, packs pass.
   * Returns { playerCard, aiPicks } or null if finished/invalid.
   */
  playerPick(cardId) {
    if (this.finished) return null;

    const playerPack = this.packs[0];
    const idx = playerPack.findIndex(c => c.id === cardId);
    if (idx === -1) return null;

    const playerCard = playerPack.splice(idx, 1)[0];
    this.seats[0].pool.push(playerCard);
    this.log.push({ round: this.round, pick: this.pickInRound, seat: 0, card: playerCard });

    // AI seats pick simultaneously
    const aiPicks = [];
    for (let s = 1; s < this.seats.length; s++) {
      const seat = this.seats[s];
      const card = aiPick(this.packs[s], seat.persona, seat.pool, this.rng);
      if (card) {
        const i = this.packs[s].findIndex(c => c.id === card.id);
        this.packs[s].splice(i, 1);
        seat.pool.push(card);
        this.log.push({ round: this.round, pick: this.pickInRound, seat: s, card });
        aiPicks.push({ seat: seat.name, icon: seat.icon, card });
      }
    }

    this.pickInRound++;

    // Pass packs (rotate array against the pass direction)
    if (this.packs[0].length > 0) {
      const dir = this.passDirection();
      if (dir === 1) {
        this.packs.unshift(this.packs.pop());
      } else {
        this.packs.push(this.packs.shift());
      }
    } else {
      // Packs exhausted — next round or done
      this.round++;
      if (this.round >= this.numRounds) {
        this.finished = true;
      } else {
        this.openNewPacks();
      }
    }

    return { playerCard, aiPicks };
  }

  /**
   * The player's drafted pool, organized
   */
  getPlayerPool() {
    const pool = this.seats[0].pool;
    return {
      all: pool,
      characters: pool.filter(c => c.type === CARD_TYPES.CHARACTER),
      equipment: pool.filter(c => c.type === CARD_TYPES.EQUIPMENT),
      spells: pool.filter(c => c.type === CARD_TYPES.SPELL),
      personalities: pool.filter(c => c.type === CARD_TYPES.PERSONALITY),
    };
  }

  /**
   * Signal reading: what has come back around
   */
  getTableSummary() {
    return this.seats.map(seat => ({
      name: seat.name,
      icon: seat.icon,
      isAI: seat.isAI,
      counts: {
        characters: seat.pool.filter(c => c.type === CARD_TYPES.CHARACTER).length,
        equipment: seat.pool.filter(c => c.type === CARD_TYPES.EQUIPMENT).length,
        spells: seat.pool.filter(c => c.type === CARD_TYPES.SPELL).length,
        personalities: seat.pool.filter(c => c.type === CARD_TYPES.PERSONALITY).length,
      },
    }));
  }
}
