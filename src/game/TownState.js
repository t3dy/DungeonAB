/**
 * TownState — the world's memory (v6)
 *
 * The dungeon asks "can your expedition solve what it meets?"
 * The town asks "what did your expedition's actions do to the world?"
 *
 * Everything the party does that the town would notice lands here:
 * faction standings, individual NPCs and how they feel, and an
 * append-only consequence log the writing reads back. It rides on the
 * Campaign, so it persists across every depth the way the party does.
 */

/** The town's standing interests. Standings run -100 (hostile) to +100 (allied). */
export const FACTIONS = {
  scholars: { name: 'the Scholars', icon: '📚', text: 'Librarians, translators, and the university men.' },
  guild: { name: 'the Craft Guild', icon: '⚒️', text: 'Smiths, printers, tinkers, and their apprentices.' },
  nobles: { name: 'the Noble Houses', icon: '👑', text: 'Patrons, courtiers, and everyone who wants their ear.' },
  clergy: { name: 'the Clergy', icon: '🕯️', text: 'The chapter house, the almshouse, and the tribunal.' },
  merchants: { name: 'the Merchants', icon: '⚖️', text: 'The market, the moneylenders, the caravan masters.' },
  underworld: { name: 'the Underworld', icon: '🗝️', text: 'Fences, gangs, and the people who know where things went.' },
};

/** Standing bands — what a number means when the town looks at you. */
export function standingLabel(value) {
  if (value >= 60) return 'allied';
  if (value >= 25) return 'friendly';
  if (value > -25) return 'neutral';
  if (value > -60) return 'wary';
  return 'hostile';
}

export class TownState {
  constructor() {
    /** faction id → standing (-100..100) */
    this.factions = Object.fromEntries(Object.keys(FACTIONS).map(id => [id, 0]));
    /** npc id → { id, name, met, disposition, flags:Set } */
    this.npcs = {};
    /** Append-only: what the town remembers, newest last. */
    this.log = [];
    /** Encounter ids already resolved this campaign (one-shots don't repeat). */
    this.resolved = new Set();
    /** Standing services unlocked by past deeds (supplier, patron, passage...). */
    this.unlocked = new Set();
    /** Depth of the last visit, so a visit's encounters are stable per depth. */
    this.lastVisitDepth = -1;
  }

  /* ---------------------------------------------------------------- */
  /* Factions                                                          */
  /* ---------------------------------------------------------------- */

  standing(factionId) {
    return this.factions[factionId] ?? 0;
  }

  standingOf(factionId) {
    return standingLabel(this.standing(factionId));
  }

  /**
   * Shift a faction's standing and remember why. Returns the new value.
   */
  adjustFaction(factionId, delta, why = null) {
    if (!(factionId in this.factions)) return 0;
    const before = this.factions[factionId];
    this.factions[factionId] = Math.max(-100, Math.min(100, before + delta));
    if (why) {
      this.remember({
        kind: 'faction', faction: factionId, delta, text: why,
        standing: this.factions[factionId],
      });
    }
    return this.factions[factionId];
  }

  /** Factions currently friendly or better — who greets the party warmly. */
  allies() {
    return Object.keys(this.factions).filter(id => this.factions[id] >= 25);
  }

  /** Factions wary or worse — who watches the party leave. */
  enemies() {
    return Object.keys(this.factions).filter(id => this.factions[id] <= -25);
  }

  /* ---------------------------------------------------------------- */
  /* NPCs — the town's individual memory                               */
  /* ---------------------------------------------------------------- */

  npc(id, name = null) {
    if (!this.npcs[id]) {
      this.npcs[id] = { id, name: name || id, met: false, disposition: 0, flags: new Set() };
    }
    if (name) this.npcs[id].name = name;
    return this.npcs[id];
  }

  meet(id, name) {
    const n = this.npc(id, name);
    n.met = true;
    return n;
  }

  /** Shift how one person feels about the party. */
  adjustNpc(id, delta, why = null, name = null) {
    const n = this.npc(id, name);
    n.met = true;
    n.disposition = Math.max(-100, Math.min(100, n.disposition + delta));
    if (why) this.remember({ kind: 'npc', npc: id, delta, text: why, disposition: n.disposition });
    return n;
  }

  flag(id, flagName) {
    this.npc(id).flags.add(flagName);
  }

  hasFlag(id, flagName) {
    return !!this.npcs[id]?.flags.has(flagName);
  }

  knows(id) {
    return !!this.npcs[id]?.met;
  }

  /* ---------------------------------------------------------------- */
  /* Unlocks and the log                                               */
  /* ---------------------------------------------------------------- */

  unlock(key, why = null) {
    this.unlocked.add(key);
    if (why) this.remember({ kind: 'unlock', key, text: why });
  }

  has(key) {
    return this.unlocked.has(key);
  }

  markResolved(encounterId) {
    this.resolved.add(encounterId);
  }

  isResolved(encounterId) {
    return this.resolved.has(encounterId);
  }

  remember(entry) {
    this.log.push({ ...entry, at: this.log.length });
    return entry;
  }

  /** The last few things the town remembers, for the interlude writing. */
  recent(n = 3) {
    return this.log.slice(-n);
  }

  /* ---------------------------------------------------------------- */
  /* What standing actually buys                                       */
  /* ---------------------------------------------------------------- */

  /**
   * The multiplier on town prices. Merchants set the rate; a standing
   * supplier shaves more. Ranges roughly 0.7 (beloved) to 1.35 (barely
   * served) — reputation is money.
   */
  priceMultiplier() {
    const m = this.standing('merchants');
    let mult = 1 - (m / 100) * 0.25;
    if (this.has('supplier')) mult -= 0.08;
    if (this.standing('underworld') >= 25) mult -= 0.05;   // fenced goods are cheap
    if (this.standing('guild') <= -25) mult += 0.12;        // the craftsmen mark you up
    return Math.max(0.7, Math.min(1.35, Math.round(mult * 100) / 100));
  }

  /**
   * Is the town dangerous to walk in? Enough enemies and a visit can
   * turn violent (v6 §11: town is not a completely safe zone).
   */
  hostility() {
    const enemies = this.enemies();
    let risk = enemies.length * 0.12;
    if (this.standing('underworld') <= -40) risk += 0.15;   // the gangs hold grudges personally
    if (this.has('peacemaker')) risk -= 0.2;
    return Math.max(0, Math.min(0.75, Math.round(risk * 100) / 100));
  }

  /** A compact view for the UI and the ledger. */
  summary() {
    return {
      factions: Object.entries(this.factions).map(([id, value]) => ({
        id, name: FACTIONS[id].name, icon: FACTIONS[id].icon,
        value, label: standingLabel(value),
      })),
      allies: this.allies(),
      enemies: this.enemies(),
      unlocked: [...this.unlocked],
      knownNpcs: Object.values(this.npcs).filter(n => n.met).map(n => ({
        id: n.id, name: n.name, disposition: n.disposition, flags: [...n.flags],
      })),
      priceMultiplier: this.priceMultiplier(),
      hostility: this.hostility(),
      log: this.log.slice(),
    };
  }
}
