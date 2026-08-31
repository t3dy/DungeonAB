/**
 * Dramaturg — the narrative designer, as a module
 *
 * This game generates its stories at runtime, which means nobody writes
 * them and everybody is responsible for them. A mechanic is not just a
 * rule; it is a sentence-generator, and most of the reasons a delve
 * reads badly are mechanical rather than lexical. The prose was fine.
 * The dungeon was boring.
 *
 * So this file is a reader with opinions, kept in the codebase rather
 * than in a person's head, and pointed at the transcripts the simulator
 * produces (`tools/simulate.mjs`). It holds three things:
 *
 *   POETICS   — what this designer thinks a generated delve owes a
 *               reader, each with a probe that can find it or fail to
 *               find it in an actual log
 *   POSITIONS — contestable stances, each with what would change its
 *               mind. A position nothing could refute is a preference
 *               wearing a lab coat
 *   INTERESTS — the questions asked of every transcript, in order
 *
 * The probes matter more than the prose around them. This project has
 * been wrong before about whether a thing was working — twice on the
 * strength of samples too small to say anything (DESIGN_DIALOGUE.md §N)
 * — and a critic who cannot be checked is worth less than no critic.
 * Every finding here names the room it came from, so a disagreement is
 * a disagreement about a specific line rather than about taste.
 *
 * What this is NOT: a scorer. There is a number at the end because
 * numbers sort, and sorting three hundred delves is the only way to
 * find the interesting ones. The number is a way of *finding* the log
 * worth reading, never a verdict on it.
 */

/* ------------------------------------------------------------------ */
/* The house poetics                                                   */
/* ------------------------------------------------------------------ */

/**
 * Textual markers for effects that reach forward out of one room and
 * land in a later one. Kept as data because they are the seam between
 * the mechanics and the reading: when a new forward-reaching effect is
 * wired, its line goes here, and the continuity probe starts counting
 * it. When one is removed, the probe stops crediting a carry that no
 * longer happens.
 *
 * These are the mechanics wired in v7 — a stance held into the next
 * fight, a favourable aspect, a warning spent on the snare it was
 * about — plus the older ones that always reached forward (an alarm, a
 * poison that ticks next room, a wound that lowers a ceiling).
 */
export const CARRY_MARKERS = [
  'the room before this one',
  'came through the last room',
  'the corrected heavens',
  'the aspect is favourable',
  'the snare the party was told about',
  'this is the snare',
  'forewarned',
  'the alarm',
  'alarmed',
  'poison damage next room',
  'the warning',
];

const has = (text, needles) => {
  const t = (text || '').toLowerCase();
  return needles.some(n => t.includes(n));
};

/** Every line of prose a room offers, in reading order. */
const proseOf = room => [room.predicament, room.deliberation, room.resolution, room.aside]
  .filter(Boolean);

const delveProse = delve => delve.rooms.flatMap(proseOf);

/**
 * Roster names as they appear in the writing.
 *
 * The Chronicle stores a roster entry as `"✨ Simon Forman (cleric)"`,
 * and the prose says `Simon Forman`, so the icon and the class have to
 * come off or nothing ever matches. Getting this wrong is not a small
 * bug: it made every delve in the corpus report "nobody is named",
 * which read as a devastating finding about the writing and was a
 * finding about this function.
 *
 * Longest first, so "Pico della Mirandola" is consumed before "Pico".
 */
const rosterNames = delve => (delve.roster || [])
  .map(n => String(n)
    .replace(/\([^)]*\)\s*$/, '')          // trailing "(cleric)"
    .replace(/^[^\p{L}]+/u, '')            // leading icon and space
    .trim())
  .filter(Boolean)
  .sort((a, b) => b.length - a.length);

/**
 * How often each magus is named in the prose of a delve.
 * Counts the longest matching form once per occurrence, so a party
 * member is not credited twice for one mention.
 */
function nameCounts(delve) {
  const names = rosterNames(delve);
  const counts = Object.fromEntries(names.map(n => [n, 0]));
  for (const line of delveProse(delve)) {
    let rest = line;
    for (const n of names) {
      // Consume matches so a shorter name inside a longer one does not
      // double-count the same words
      let i = rest.indexOf(n);
      while (i !== -1) {
        counts[n]++;
        rest = rest.slice(0, i) + ' '.repeat(n.length) + rest.slice(i + n.length);
        i = rest.indexOf(n);
      }
    }
  }
  return counts;
}

/**
 * The values, each with a probe that reads one delve and returns
 * `{ pass, note, evidence }`. `mechanisms` names the code that could
 * serve the value better — the whole point of keeping the critic in the
 * repository rather than in a document is that its complaints arrive
 * pointed at a file.
 */
export const POETICS = {
  protagonist: {
    id: 'protagonist',
    statement: 'A delve should be about somebody.',
    because:
      'Four names go down and four names come back, and if the transcript '
      + 'cannot say which of them this was about, the party is a stat block '
      + 'with a roster attached. A protagonist does not have to be assigned; '
      + 'it has to be discoverable afterwards.',
    mechanisms: ['narrative/Barks.js', 'encounters/RoomEncounters.js decideRoomAction advocates'],
    probe(delve) {
      const counts = nameCounts(delve);
      const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      if (ranked.length === 0) return { pass: false, note: 'no roster recorded' };
      const [top, n] = ranked[0];
      const second = ranked[1]?.[1] ?? 0;
      const named = ranked.filter(([, c]) => c > 0).length;
      if (n === 0) {
        return { pass: false, note: 'nobody in the party is named in the prose at all' };
      }
      if (n < 2) {
        return { pass: false, note: `the most-named magus (${top}) appears once — nobody emerges` };
      }
      return {
        pass: true,
        note: `${top} carries it (${n} mentions against ${second}); ${named}/${ranked.length} named`,
        evidence: top,
      };
    },
  },

  continuity: {
    id: 'continuity',
    statement: 'Rooms should be in the order they are for a reason.',
    because:
      'The failure mode of a generated crawl is a list: room, room, room, '
      + 'each complete in itself and reorderable without loss. A story is '
      + 'rooms that owe each other something — a warning spent three rooms '
      + 'later, a stance carried into the fight after it, a wound that has '
      + 'not closed. This is the value the v7 wiring was for.',
    mechanisms: [
      'encounters/RoomEncounters.js (forcedFormation, starBlessed, forewarned)',
      'agents/Adventurer.js wounds',
    ],
    probe(delve) {
      const carried = delve.rooms.filter(r => has(proseOf(r).join(' '), CARRY_MARKERS));
      const share = delve.rooms.length ? carried.length / delve.rooms.length : 0;
      return {
        pass: carried.length >= 2,
        note: carried.length === 0
          ? 'nothing any room did reaches any later room'
          : `${carried.length} of ${delve.rooms.length} rooms answer an earlier one (${Math.round(share * 100)}%)`,
        evidence: carried.map(r => r.turn),
      };
    },
  },

  reversal: {
    id: 'reversal',
    statement: 'Something must go wrong, and it should be legible when it does.',
    because:
      'A delve where every decision pays is a report of competence. The '
      + 'reader needs one place where the party is worse off at the end of a '
      + 'room than at the start of it, or there is nothing to have survived.',
    mechanisms: ['encounters/Encounters.js resolveOption failure branches', 'world/DungeonGen.js disaster weight'],
    probe(delve) {
      const bad = delve.rooms.filter(r =>
        r.falls.length || r.wounds.length
        || r.events.some(e => e.field === 'health' && /took|damage|taken/i.test(e.text || ''))
        || /damage|worse|fails|gives way|explodes/i.test(r.resolution || ''));
      return {
        pass: bad.length >= 1,
        note: bad.length
          ? `${bad.length} room${bad.length === 1 ? '' : 's'} cost the party something`
          : 'nothing went wrong anywhere in the delve',
        evidence: bad.map(r => r.turn),
      };
    },
  },

  rationing: {
    id: 'rationing',
    statement: 'If every room is a beat, no room is.',
    because:
      'Salience is a budget, not a compliment. Six consecutive rooms of '
      + 'incident read flatter than four quiet ones and a disaster, and the '
      + 'quiet rooms are what make the loud one legible.',
    mechanisms: ['narrative/Chronicle.js SALIENCE thresholds'],
    probe(delve) {
      /*
       * Concentration, not presence. The first version of this probe
       * asked whether a room carried any beat at all and reported that
       * 100% of delves failed — which was true and meaningless, because
       * every room carries at least one. What the value is actually
       * about is whether the loud room stands above the quiet ones: a
       * profile of 1,2,2,1,1,2,3,2,1,1,1,6 is well rationed, and a flat
       * 3,3,3,3,3,3 is not, even though both are "beats everywhere".
       */
      const counts = delve.rooms.map(r =>
        r.events.filter(e => e.salience === 'beat').length);
      if (counts.length < 4) return { pass: null, note: 'too short to ration anything' };
      const sorted = counts.slice().sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)] || 1;
      const peak = sorted[sorted.length - 1];
      const ratio = peak / Math.max(1, median);
      return {
        pass: ratio >= 2,
        note: ratio >= 2
          ? `the loudest room runs ${ratio.toFixed(1)}× the median (peak ${peak}, median ${median})`
          : `flat: peak ${peak} against a median of ${median} — no room stands out`,
      };
    },
  },

  roadNotTaken: {
    id: 'roadNotTaken',
    statement: 'A choice reads as a choice only when the alternatives are named.',
    because:
      'The party deliberates and then acts, and if the transcript prints '
      + 'only the act, the reader sees a rail. "They might have chosen to '
      + 'force the door" is the whole difference between a decision and an '
      + 'instruction — and it is where a drafted capability becomes visible '
      + 'as the thing that opened a door nobody else had.',
    mechanisms: ['narrative/Narrator.js composeDeliberation', 'encounters/EncounterEngine.js evaluateOptions'],
    probe(delve) {
      const withAlts = delve.rooms.filter(r => /might have chosen/i.test(r.deliberation || ''));
      const deliberated = delve.rooms.filter(r => r.deliberation);
      const share = deliberated.length ? withAlts.length / deliberated.length : 0;
      return {
        pass: share >= 0.4,
        note: `${withAlts.length} of ${deliberated.length} deliberations name a road not taken`,
        evidence: withAlts.map(r => r.turn),
      };
    },
  },

  mortalityEarned: {
    id: 'mortalityEarned',
    statement: 'A death is only worth reading if the dead had a line first.',
    because:
      'A name that appears for the first time in the sentence that kills it '
      + 'is a casualty figure. The mechanics decide who dies; the writing '
      + 'decides whether anyone had met them. If the party loses somebody '
      + 'the transcript never introduced, the loss is arithmetic.',
    mechanisms: ['narrative/Barks.js', 'narrative/Narrator.js composeResolution'],
    probe(delve) {
      const falls = [];
      for (const r of delve.rooms) {
        for (const f of r.falls) falls.push({ turn: r.turn, text: f });
      }
      if (falls.length === 0) return { pass: null, note: 'nobody fell' };
      const names = rosterNames(delve);
      const unearned = [];
      for (const fall of falls) {
        const who = names.find(n => fall.text.includes(n));
        if (!who) continue;
        const earlier = delve.rooms
          .filter(r => r.turn < fall.turn)
          .flatMap(proseOf)
          .some(line => line.includes(who));
        if (!earlier) unearned.push(who);
      }
      return {
        pass: unearned.length === 0,
        note: unearned.length
          ? `${unearned.join(', ')} died without ever having been mentioned`
          : `${falls.length} death${falls.length === 1 ? '' : 's'}, each of somebody the reader had met`,
        evidence: unearned,
      };
    },
  },

  specificity: {
    id: 'specificity',
    statement: 'Name the thing and state the number.',
    because:
      'House style, and load-bearing: the numbers are what let a reader '
      + 'tell a good decision from a lucky one. "The party is hurt" is a '
      + 'mood. "5 damage, and the party scattered across the floor" is an '
      + 'account of something that happened.',
    mechanisms: ['narrative/Prose.js', 'tests/prose.test.js'],
    probe(delve) {
      const resolutions = delve.rooms.map(r => r.resolution).filter(Boolean);
      const numeric = resolutions.filter(l => /\d/.test(l));
      const share = resolutions.length ? numeric.length / resolutions.length : 0;
      return {
        pass: share >= 0.5,
        note: `${numeric.length} of ${resolutions.length} resolutions state a number`,
      };
    },
  },

  concision: {
    id: 'concision',
    statement: 'A resolution should be readable in one breath.',
    because:
      'This is the failure a generated game arrives at by addition. Every '
      + 'preparation, ward, tactic, cover bonus and drop appends its own '
      + 'sentence to the room\'s resolution, each one individually correct '
      + 'and well written, and what reaches the reader is eight hundred '
      + 'characters of concatenated bookkeeping with the actual event buried '
      + 'in the middle of it. Nobody wrote that paragraph. It accumulated. '
      + 'The fix is not shorter sentences, it is a budget: the resolution '
      + 'gets to say the two or three things that mattered, and the rest '
      + 'belongs in the ledger that already exists to hold them.',
    mechanisms: [
      'encounters/RoomEncounters.js preps (every effect pushes a line)',
      'narrative/Narrator.js composeResolution',
      'narrative/Chronicle.js SALIENCE — the ledger is already the place for these',
    ],
    probe(delve) {
      const lengths = delve.rooms.map(r => (r.resolution || '').length).filter(Boolean);
      if (lengths.length === 0) return { pass: null, note: 'no resolutions' };
      const longest = Math.max(...lengths);
      const overlong = lengths.filter(l => l > 320).length;
      return {
        pass: overlong === 0,
        note: overlong
          ? `${overlong} of ${lengths.length} resolutions run past 320 characters (longest ${longest})`
          : `longest resolution ${longest} characters`,
      };
    },
  },

  shape: {
    id: 'shape',
    statement: 'The back half should cost more than the front half.',
    because:
      'An autobattler fails in the middle: the opening has novelty and the '
      + 'end has a boss, and rooms four through eight are where a reader '
      + 'stops reading. If the damage taken is flat across the delve, the '
      + 'dungeon has no rising action to give the writing.',
    mechanisms: ['world/DungeonGen.js floorScale', 'game/Progression.js'],
    probe(delve) {
      const n = delve.rooms.length;
      if (n < 4) return { pass: null, note: 'too short to have a shape' };
      const cost = room => room.events
        .filter(e => e.field === 'health' || e.field === 'wounds' || e.field === 'living')
        .length;
      const mid = Math.floor(n / 2);
      const front = delve.rooms.slice(0, mid).reduce((s, r) => s + cost(r), 0);
      const back = delve.rooms.slice(mid).reduce((s, r) => s + cost(r), 0);
      return {
        pass: back >= front,
        note: `front half ${front}, back half ${back}`,
      };
    },
  },

  closure: {
    id: 'closure',
    statement: 'The ending should answer the delve it ended.',
    because:
      'A generated log stops when the boss dies or the party does. Stopping '
      + 'is not ending. The last thing the reader sees should refer to '
      + 'something the delve actually did — who came back, what it cost, '
      + 'what was carried out — rather than to a scoreboard that would read '
      + 'the same after any delve.',
    mechanisms: ['narrative/Chronicle.js endDelve', 'narrative/Narrator.js composeEpitaph'],
    probe(delve) {
      const o = delve.outcome;
      if (!o) return { pass: false, note: 'the delve has no recorded ending' };
      if (!o.epitaph) return { pass: false, note: 'the ending is a tally with no sentence on it' };
      const names = rosterNames(delve);
      const personal = names.some(n => o.epitaph.includes(n));
      return {
        pass: true,
        note: personal
          ? 'the epitaph names somebody who went down'
          : 'the epitaph closes the delve but names nobody in it',
        evidence: o.epitaph,
      };
    },
  },
};

/* ------------------------------------------------------------------ */
/* Positions — contestable, and each says what would change its mind    */
/* ------------------------------------------------------------------ */

export const POSITIONS = [
  {
    id: 'variety-is-not-story',
    claim: 'Different numbers are not a different story.',
    because:
      'Two delves can differ in every value the ledger records and read as '
      + 'the same delve, because shape is what a reader remembers. Rolling '
      + 'wider does not fix this; it makes the sameness better disguised.',
    refutedBy:
      'Readings across many logs showing high variance in shape (which rooms '
      + 'cost, where the turn falls) even where outcomes are similar.',
  },
  {
    id: 'ledger-is-not-story',
    claim: 'A log that needs its ledger to be understood has failed as prose.',
    because:
      'The ledger exists so that nothing can move silently, which is an '
      + 'auditing goal. If the reader has to open it to know what happened, '
      + 'the curation above it is not doing its job.',
    refutedBy:
      'Readers reporting they prefer the ledger, or prose-only readings that '
      + 'consistently answer the INTERESTS below without it.',
  },
  {
    id: 'unmet-is-unbuilt',
    claim: 'A mechanic the reader never meets is not in the game.',
    because:
      'Already house doctrine for coverage (CLAUDE.md rule 12); it is a '
      + 'narrative rule as much as an auditing one. The stairhead camp was '
      + 'built, tested, and met by 2% of delves.',
    refutedBy: 'Nothing. This one is settled; it is here because it is easy to forget.',
  },
  {
    id: 'repetition-across-costs-more',
    claim: 'Repetition between delves costs more than repetition inside one.',
    because:
      'A reader reads one delve closely and a saga loosely. The second '
      + 'delve is where a generated game either becomes a campaign or '
      + 'becomes obviously a machine, and the tell is always a sentence '
      + 'they are sure they have read before.',
    refutedBy:
      'Cross-delve line-repetition measures staying low while readers still '
      + 'report the saga feeling samey — which would mean the tell is '
      + 'structural rather than lexical.',
  },
  {
    id: 'loss-should-be-decided',
    claim: 'A loss should be traceable to a decision, not to a die.',
    because:
      'The party deliberates, chooses, and pays. When the payment cannot be '
      + 'traced back to the choice, the transcript reads as weather. This is '
      + 'the argument for consequences that reach forward: they make the '
      + 'earlier decision visible at the moment it is paid for.',
    refutedBy:
      'Logs where random loss reads as tragedy rather than noise — plausible '
      + 'if the writing frames it as fate rather than as mechanism.',
  },
  {
    id: 'protagonist-discovered',
    claim: 'The protagonist should be discovered, never assigned.',
    because:
      'If the systems are too even, no one emerges and the delve is about '
      + 'nobody; if a character is designated in advance, the others are '
      + 'luggage. What is wanted is uneven outcomes that a reader can '
      + 'narrate afterwards.',
    refutedBy:
      'Readings where an assigned viewpoint character measurably improves '
      + 'the other values without flattening the rest of the party.',
  },
  {
    id: 'middle-is-where-it-fails',
    claim: 'The middle of a delve is where generated narrative dies.',
    because:
      'Openings get novelty free and endings get the boss free. Rooms four '
      + 'through eight have to earn attention with nothing but what the '
      + 'systems put there, so they are the honest test of the mechanics.',
    refutedBy: 'Per-room engagement measures showing the drop-off elsewhere.',
  },
];

/* ------------------------------------------------------------------ */
/* Interests — the questions, in the order they get asked               */
/* ------------------------------------------------------------------ */

export const INTERESTS = [
  { id: 'about-whom', question: 'Who was this delve about, and does the transcript know?' },
  { id: 'the-turn', question: 'Where did it turn, and was the turn a decision or a die?' },
  { id: 'the-price', question: 'What did the party pay, and for what?' },
  { id: 'the-learning', question: 'What is known at the boss door that was not known at the entrance?' },
  { id: 'the-retelling', question: 'Is there one sentence a reader would repeat to somebody else?' },
];

/* ------------------------------------------------------------------ */
/* Reading a log                                                        */
/* ------------------------------------------------------------------ */

/**
 * Read one delve against the poetics.
 *
 * Returns findings in a fixed order (the order of POETICS), each with
 * the value's own statement so a reading is legible without this file
 * open beside it. `score` is the share of applicable values met — a
 * sorting key for finding the logs worth reading, not a grade.
 */
export function readDelve(delve) {
  const findings = Object.values(POETICS).map(v => {
    const result = v.probe(delve);
    return {
      value: v.id,
      statement: v.statement,
      pass: result.pass,
      note: result.note,
      evidence: result.evidence ?? null,
      mechanisms: v.mechanisms,
    };
  });
  const applicable = findings.filter(f => f.pass !== null);
  const met = applicable.filter(f => f.pass);
  return {
    delve: delve.number,
    theme: delve.theme || null,
    seed: delve.seed || null,
    rooms: delve.rooms.length,
    victory: !!delve.outcome?.victory,
    findings,
    failures: findings.filter(f => f.pass === false),
    score: applicable.length ? met.length / applicable.length : 0,
  };
}

/** Read every delve in a chronicle. */
export function readChronicle(chronicle) {
  return (chronicle.delves || []).map(readDelve);
}

/**
 * What one line from this delve would a reader repeat?
 *
 * A *sentence*, not a room. The first version of this returned the
 * longest resolution from a costly room, which reliably surfaced the
 * single worst paragraph in the delve — a run-on of fifteen appended
 * mechanical effects — and presented it as the writing's best moment.
 * That was a useful accident: it is how the `concision` value above got
 * written. But the retelling line has to be something a person would
 * actually say out loud.
 *
 * So: split into sentences, prefer one from a room that cost something,
 * and take the longest that still fits in a breath and carries a
 * specific — a number, or somebody's name.
 */
export function bestLine(delve) {
  const names = rosterNames(delve);
  const costly = delve.rooms.filter(r =>
    r.falls.length || r.wounds.length || /damage/i.test(r.resolution || ''));
  const rooms = costly.length ? costly : delve.rooms;

  const sentences = rooms
    .flatMap(r => [...r.falls, r.resolution].filter(Boolean))
    .flatMap(text => text.split(/(?<=[.!?])\s+/))
    .map(s => s.trim())
    .filter(s => s.length >= 40 && s.length <= 200);

  if (sentences.length === 0) return null;
  const specific = sentences.filter(s => /\d/.test(s) || names.some(n => s.includes(n)));
  const pool = specific.length ? specific : sentences;
  return pool.reduce((a, b) => (b.length > a.length ? b : a));
}

/* ------------------------------------------------------------------ */
/* Critique across many logs                                            */
/* ------------------------------------------------------------------ */

/**
 * Where the mechanics are failing the writing, measured over a corpus.
 *
 * One log failing a value is a log. A third of them failing the same
 * value is a mechanic, and this is the function that tells the two
 * apart — the whole reason the simulator writes hundreds of transcripts
 * rather than one good one.
 *
 * `THRESHOLD` is the share of delves that must fail a value before it
 * is called systemic. A fifth is deliberately low: this is a list of
 * things to look at, not a list of things that are broken.
 */
export const THRESHOLD = 0.2;

export function critique(readings) {
  if (readings.length === 0) return { corpus: 0, systemic: [], healthy: [], repetition: null };

  const byValue = {};
  for (const r of readings) {
    for (const f of r.findings) {
      if (f.pass === null) continue;
      const b = byValue[f.value] = byValue[f.value] || { met: 0, n: 0, notes: [], mechanisms: f.mechanisms, statement: f.statement };
      b.n++;
      if (f.pass) b.met++;
      else if (b.notes.length < 4) b.notes.push(`delve ${r.delve}: ${f.note}`);
    }
  }

  const rows = Object.entries(byValue).map(([value, b]) => ({
    value,
    statement: b.statement,
    failRate: 1 - b.met / b.n,
    met: b.met,
    n: b.n,
    examples: b.notes,
    mechanisms: b.mechanisms,
  })).sort((a, b) => b.failRate - a.failRate);

  return {
    corpus: readings.length,
    systemic: rows.filter(r => r.failRate >= THRESHOLD),
    healthy: rows.filter(r => r.failRate < THRESHOLD),
    all: rows,
  };
}

/**
 * The tell this designer trusts most: a sentence the reader has met
 * before, in a different delve.
 *
 * Held separately from the poetics because it is a property of the
 * corpus rather than of any log — no single transcript can fail it, and
 * that is exactly why it goes unnoticed until a player has played four
 * times (position: repetition-across-costs-more).
 */
export function repetitionAcross(chronicles) {
  const seen = new Map();
  let lines = 0;
  for (const [i, c] of chronicles.entries()) {
    for (const d of c.delves || []) {
      for (const line of delveProse(d)) {
        lines++;
        const key = line.trim();
        if (!seen.has(key)) seen.set(key, new Set());
        seen.get(key).add(i);
      }
    }
  }
  const shared = [...seen.entries()]
    .filter(([, runs]) => runs.size > 1)
    .map(([line, runs]) => ({ line, runs: runs.size }))
    .sort((a, b) => b.runs - a.runs);
  return {
    lines,
    distinct: seen.size,
    shared: shared.slice(0, 20),
    // A line in most runs is a template doing its job (a room type has
    // to introduce itself); a line in a few is the tell.
    reuseRate: lines ? 1 - seen.size / lines : 0,
  };
}
