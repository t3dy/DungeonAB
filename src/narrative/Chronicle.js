/**
 * Chronicle — the complete, saveable record of what happened
 *
 * Two layers, deliberately separated:
 *
 *   1. **The ledger** — a structured event for *every* observable state
 *      change, emitted by diffing a full snapshot each tick. Nothing can
 *      be silent here, because nothing has to remember to speak: if a
 *      number moved, the diff saw it move.
 *
 *   2. **The prose** — the curated story the player reads, assembled
 *      from the room's three beats plus the events salient enough to
 *      earn a line.
 *
 * The separation exists because a silence audit taught us both halves
 * of the lesson at once. Hand-placed narration is *bypassable*: heroes
 * were dying on the march with the Chronicle saying nothing, purely
 * because a snapshot was taken three lines too late. And narrating
 * everything inline is *unreadable*: six identical "the dark takes
 * nothing" lines buried the beats that mattered. A ledger nobody has to
 * remember to write, plus prose somebody curated, answers both.
 *
 * A chronicle spans a whole campaign, not one delve. The same party
 * descending again appends a new chapter, so the document reads as one
 * saga: Delve I, Delve II, and the scars carried between them.
 */

/** The current save format. Bump when the shape changes incompatibly. */
export const CHRONICLE_VERSION = 1;

/**
 * How loudly an event wants to be read.
 *
 *   beat    — a story beat; always reaches the prose
 *   notable — reaches the prose when it crosses a threshold
 *   ledger  — recorded, and read only by someone opening the ledger
 */
export const SALIENCE = { BEAT: 'beat', NOTABLE: 'notable', LEDGER: 'ledger' };

/**
 * Every observable field of a run, in one place.
 *
 * This is the single definition of "state the player could care about".
 * The Chronicle diffs it, and tests/silence.test.js asserts that
 * everything in it produces an event when it moves — so adding a
 * mechanic without a field here, or a field without writing, fails.
 */
export function snapshotState(sim) {
  const p = sim.party;
  return {
    gold: p.gold,
    score: p.score,
    materials: p.materials,
    potions: p.potions.length,
    supply: p.supply,
    trophies: p.trophies.length,
    spellsLearned: p.spellsLearned,
    grimoire: p.grimoire.length,
    poison: p.poisonLinger || 0,
    alarmed: p.alarmed ? 1 : 0,
    desecrated: p.desecrated ? 1 : 0,
    living: p.living().length,
    reserve: p.reserve.length,
    health: p.members.reduce((s, m) => s + Math.max(0, m.health), 0),
    wounds: p.members.reduce((s, m) => s + m.wounds, 0),
    equipment: p.members.reduce((s, m) => s + m.equipment.length, 0),
    weaponMods: p.members.reduce((s, m) => s + m.weaponMods.length, 0),
    keys: p.keys.length,
    roomsCleared: sim.roomsCleared,
    // Which floor the party is standing on. A descent is a state change
    // the player cares about (everything below is scaled harder), so it
    // is recorded like any other (rule 7).
    floor: sim.dungeon?.rooms[sim.path[Math.min(sim.roomIndex, sim.path.length - 1)]]?.floor || 0,
  };
}

/**
 * How each field reads when it moves.
 *
 * `up`/`down` are written for the *delta*, which is always positive in
 * the text — the direction is in the wording, not a minus sign.
 * `salience` decides whether a change earns prose or only the ledger;
 * `threshold` promotes a notable change to a beat once it is big enough.
 */
const FIELDS = {
  gold: {
    icon: '💰', label: 'gold', salience: SALIENCE.NOTABLE, threshold: 25,
    up: n => `The purse is ${n} heavier.`,
    down: n => `${n} gold leaves the purse.`,
  },
  score: {
    icon: '🏅', label: 'renown', salience: SALIENCE.LEDGER,
    up: n => `${n} renown earned.`,
    down: n => `${n} renown lost.`,
  },
  materials: {
    icon: '🌿', label: 'materials', salience: SALIENCE.NOTABLE, threshold: 3,
    up: n => `${n} more alchemical materials in the satchel.`,
    down: n => `${n} materials spent at the bench.`,
  },
  potions: {
    icon: '🧪', label: 'potions', salience: SALIENCE.BEAT,
    up: n => `${n} more draught${n > 1 ? 's' : ''} corked and stowed.`,
    down: n => `${n} draught${n > 1 ? 's are' : ' is'} drunk.`,
  },
  supply: {
    icon: '🕯️', label: 'oil', salience: SALIENCE.LEDGER,
    up: n => `${n} more march${n > 1 ? 'es' : ''} of oil found.`,
    down: n => `${n} march${n > 1 ? 'es' : ''} of oil burned.`,
  },
  trophies: {
    icon: '🏆', label: 'trophies', salience: SALIENCE.BEAT,
    up: n => `${n} trophy${n > 1 ? ' more taken' : ' taken'} from the dead.`,
    down: n => `${n} trophies lost.`,
  },
  spellsLearned: {
    icon: '📖', label: 'workings learned', salience: SALIENCE.BEAT,
    up: n => `${n} new working${n > 1 ? 's' : ''} copied into the grimoire.`,
    down: n => `${n} working${n > 1 ? 's' : ''} lost from memory.`,
  },
  grimoire: {
    icon: '📜', label: 'grimoire', salience: SALIENCE.LEDGER,
    up: n => `The grimoire grows by ${n}.`,
    down: n => `${n} scroll${n > 1 ? 's burn' : ' burns'} away on use.`,
  },
  poison: {
    icon: '🐍', label: 'venom', salience: SALIENCE.BEAT,
    up: n => `Venom works in the blood: ${n} damage waiting on the march.`,
    down: n => `The venom is spent.`,
  },
  alarmed: {
    icon: '🔔', label: 'the alarm', salience: SALIENCE.BEAT,
    up: () => 'An alarm is ringing somewhere below. Whatever comes next knows.',
    down: () => 'The alarm has stopped mattering; the thing it warned has been met.',
  },
  desecrated: {
    icon: '⛧', label: 'desecration', salience: SALIENCE.BEAT,
    up: () => 'The party has taken something the dungeon considers its own. It will remember.',
    down: () => 'The debt is settled.',
  },
  living: {
    icon: '☠️', label: 'the living', salience: SALIENCE.BEAT,
    up: n => `${n} more stand${n > 1 ? '' : 's'} with the party.`,
    down: n => `${n} of the party ${n > 1 ? 'are' : 'is'} down.`,
  },
  reserve: {
    icon: '🎭', label: 'the reserve', salience: SALIENCE.NOTABLE, threshold: 1,
    up: n => `${n} more wait${n > 1 ? '' : 's'} in town.`,
    down: n => `${n} called up from the reserve.`,
  },
  health: {
    icon: '❤️', label: 'health', salience: SALIENCE.NOTABLE, threshold: 6,
    up: n => `${n} health mended.`,
    down: n => `${n} health taken.`,
  },
  wounds: {
    icon: '✚', label: 'wounds', salience: SALIENCE.BEAT,
    up: n => `${n} wound${n > 1 ? 's' : ''} that will not close down here.`,
    down: n => `${n} wound${n > 1 ? 's' : ''} closed.`,
  },
  equipment: {
    icon: '🎒', label: 'kit', salience: SALIENCE.NOTABLE, threshold: 1,
    up: n => `${n} piece${n > 1 ? 's' : ''} of kit taken up.`,
    down: n => `${n} piece${n > 1 ? 's' : ''} of kit lost.`,
  },
  weaponMods: {
    icon: '⚗️', label: 'weapon coatings', salience: SALIENCE.NOTABLE, threshold: 1,
    up: n => `${n} blade${n > 1 ? 's' : ''} coated at the bench.`,
    down: n => `${n} coating${n > 1 ? 's wear' : ' wears'} off.`,
  },
  keys: {
    icon: '🗝️', label: 'keys', salience: SALIENCE.NOTABLE,
    up: n => `${n === 1 ? 'A key' : `${n} keys`} taken up. Somewhere below there is a door for it.`,
    down: n => `${n === 1 ? 'A key' : `${n} keys`} gone from the ring.`,
  },
  floor: {
    icon: '🪜', label: 'floor', salience: SALIENCE.BEAT,
    up: n => `The party descends ${n === 1 ? 'a floor' : `${n} floors`}: everything below hits harder.`,
    down: n => `The party climbs back up ${n === 1 ? 'a floor' : `${n} floors`}.`,
  },
  roomsCleared: {
    icon: '🚪', label: 'rooms cleared', salience: SALIENCE.LEDGER,
    up: n => `${n} more room${n > 1 ? 's' : ''} behind them.`,
    down: n => `${n} room${n > 1 ? 's' : ''} uncleared.`,
  },
};

/** The fields the ledger knows how to describe. */
export const CHRONICLED_FIELDS = Object.keys(FIELDS);

/**
 * Diff two snapshots into events. Anything that moved produces one —
 * including a field with no entry in FIELDS, which gets a plain
 * fallback rather than vanishing. Silence is not an available outcome.
 */
export function diffEvents(before, after, context = {}) {
  const events = [];
  for (const key of Object.keys(after)) {
    const from = before[key] ?? 0;
    const to = after[key];
    if (from === to) continue;
    const delta = to - from;
    const spec = FIELDS[key];
    const magnitude = Math.abs(delta);

    let text;
    let salience = SALIENCE.LEDGER;
    let icon = '•';
    if (spec) {
      icon = spec.icon;
      text = delta > 0 ? spec.up(magnitude) : spec.down(magnitude);
      salience = spec.salience;
      if (salience === SALIENCE.NOTABLE && spec.threshold && magnitude < spec.threshold) {
        salience = SALIENCE.LEDGER;
      }
    } else {
      // An unknown field still gets recorded. This is the backstop that
      // makes silence structurally impossible: a mechanic added without
      // writing shows up here rather than disappearing.
      text = `${key} ${delta > 0 ? 'rose' : 'fell'} by ${magnitude}.`;
    }

    events.push({
      turn: context.turn ?? 0,
      room: context.room ?? null,
      field: key, from, to, delta,
      icon, text, salience,
      described: !!spec,
    });
  }
  return events;
}

/**
 * The running record of a party's whole campaign.
 */
export class Chronicle {
  constructor(partyName = 'the party') {
    this.version = CHRONICLE_VERSION;
    this.partyName = partyName;
    this.delves = [];
    this.current = null;
  }

  /** Begin a delve. Chapters are numbered across the campaign. */
  beginDelve({ seed, difficulty, depth, theme, roster, condition } = {}) {
    this.current = {
      number: this.delves.length + 1,
      seed: seed ?? null,
      difficulty: difficulty ?? null,
      depth: depth ?? 1,
      theme: theme ?? null,
      condition: condition ?? null,
      roster: roster ?? [],
      rooms: [],
      events: [],
      outcome: null,
      startedAt: null,
    };
    this.delves.push(this.current);
    return this.current;
  }

  /** One room: its three beats, plus every event the tick produced. */
  recordRoom(narration, events = []) {
    if (!this.current) this.beginDelve();
    this.current.rooms.push({
      turn: narration?.turn ?? this.current.rooms.length + 1,
      room: narration?.room ?? null,
      icon: narration?.icon ?? null,
      action: narration?.action ?? null,
      predicament: narration?.predicament ?? null,
      deliberation: narration?.deliberation ?? null,
      resolution: narration?.resolution ?? null,
      aside: narration?.aside ?? null,
      falls: narration?.falls ?? [],
      wounds: narration?.wounds ?? [],
      events,
    });
    this.current.events.push(...events);
  }

  /** A line with no room attached — town, the draft, the road. */
  recordAside(text, salience = SALIENCE.BEAT) {
    if (!this.current) this.beginDelve();
    this.current.events.push({
      turn: this.current.rooms.length, room: null, field: null,
      icon: '·', text, salience, described: true,
    });
  }

  endDelve(outcome) {
    if (!this.current) return;
    this.current.outcome = outcome;
  }

  /** Everything that happened, newest delve last. */
  allEvents() {
    return this.delves.flatMap(d => d.events);
  }

  /** Events worth reading aloud. */
  beats(delve = this.current) {
    return (delve?.events || []).filter(e => e.salience === SALIENCE.BEAT);
  }

  toJSON() {
    return {
      version: this.version,
      partyName: this.partyName,
      delves: this.delves,
    };
  }

  static fromJSON(data) {
    const c = new Chronicle(data?.partyName || 'the party');
    c.version = data?.version ?? CHRONICLE_VERSION;
    c.delves = Array.isArray(data?.delves) ? data.delves : [];
    c.current = c.delves[c.delves.length - 1] || null;
    return c;
  }
}

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];

export function delveNumeral(n) {
  return ROMAN[n] || String(n);
}

/**
 * The saga as a document the player can actually read.
 *
 * `ledger: true` includes every recorded event, not just the beats —
 * the complete record, for anyone who wants to audit the run rather
 * than read it.
 */
export function toMarkdown(chronicle, { ledger = false } = {}) {
  const L = [];
  L.push(`# The Chronicle of ${chronicle.partyName}`, '');
  if (chronicle.delves.length === 0) {
    L.push('_Nothing has happened yet._');
    return L.join('\n');
  }

  for (const d of chronicle.delves) {
    L.push(`## Delve ${delveNumeral(d.number)}${d.theme ? ` — ${d.theme}` : ''}`, '');
    const facts = [
      d.difficulty && `**Difficulty:** ${d.difficulty}`,
      d.depth && `**Depth:** ${d.depth}`,
      d.condition && `**Wager:** ${d.condition}`,
      d.seed && `**Seed:** \`${d.seed}\``,
    ].filter(Boolean);
    if (facts.length) L.push(facts.join(' · '), '');
    if (d.roster.length) {
      L.push('**Who went down:** ' + d.roster.join(', '), '');
    }

    for (const r of d.rooms) {
      L.push(`### ${r.icon || ''} Room ${r.turn}${r.room ? ` — ${r.room}` : ''}`.trim(), '');
      for (const line of [r.predicament, r.deliberation, r.resolution]) {
        if (line) L.push(line, '');
      }
      if (r.aside) L.push(`_${r.aside}_`, '');
      for (const w of r.wounds) L.push(`- ${w}`);
      for (const f of r.falls) L.push(`- ${f}`);
      if (r.wounds.length || r.falls.length) L.push('');
      if (ledger && r.events.length) {
        L.push('<details><summary>Ledger</summary>', '');
        for (const e of r.events) L.push(`- ${e.icon} ${e.text}`);
        L.push('', '</details>', '');
      }
    }

    if (d.outcome) {
      L.push(`### ${d.outcome.victory ? '🏆 The way out' : '☠️ The end of it'}`, '');
      if (d.outcome.epitaph) L.push(d.outcome.epitaph, '');
      const tally = [
        `**Rooms cleared:** ${d.outcome.roomsCleared ?? 0}`,
        `**Score:** ${d.outcome.score ?? 0}`,
        `**Gold:** ${d.outcome.gold ?? 0}`,
        `**Trophies:** ${d.outcome.trophies ?? 0}`,
        `**Survivors:** ${d.outcome.survivors ?? 0}`,
      ];
      L.push(tally.join(' · '), '');
    }
  }
  return L.join('\n');
}
