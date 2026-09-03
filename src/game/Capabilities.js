/**
 * Capabilities — the vocabulary of what a party can DO
 *
 * Cards already carry `capabilities: [...]` and Party already answers
 * `hasCapability()` / `capabilityHolders()`. What was missing was the
 * dictionary: what each tag is called, what it means, and what it
 * looks like on a card. This is that dictionary, and it is the only
 * file to touch when adding a capability — the encounter engine reads
 * tags generically and never enumerates them.
 *
 * A capability means:
 *   "this character knows how to interact with this category of problem"
 * It does NOT mean "+10% damage." Capabilities open options; they do
 * not multiply numbers.
 *
 * NOTE ON THE NAME: `game/Tactics.js` also exports a `CAPABILITIES`,
 * but it is a different and narrower thing — four predicates over the
 * party (attack/cast/room/march) that gate the tactic tree. These are
 * the per-card tags. The two never mix; import them by module.
 */

export const CAPABILITIES = {
  /*
   * v8.1: twelve words, down from twenty-eight.
   *
   * The 28-word vocabulary was a scarcity problem that came back twice:
   * fixed on the cards (median held 19 → 15 of 28) and re-saturated by
   * encounters asking "any of these four?", then partially re-fixed by
   * grading. Twelve words each held by at most four magi makes every
   * tag a real draft decision, every encounter ask legible, and the
   * affinity graph small enough for a player to hold in their head.
   *
   * Each word absorbed its old neighbours:
   *   warcraft   ← tactics, fencing        roguery  ← rogue, (hiding)
   *   tinkering  ← + experimentation       alchemy  ← + naturalPhilosophy
   *   medicine   ← + healing               rhetoric ← diplomacy, debate
   *   scholarship← knowledge, translation, antiquarian, memory
   *   astrology  ← astronomy, mathematics, navigation
   *   divination ← + telepathy             conjuring ← + imagination
   *   observation← + appraisal
   *   correspondence ← + syncretism, music, harmony
   */
  warcraft: { name: 'Warcraft', icon: '⚔️', text: 'Formations, duels, and the reading of a fight before it starts.' },
  roguery: { name: 'Roguery', icon: '🗡️', text: 'Locks, shadows, ciphers, and the exits nobody else noticed.' },
  observation: { name: 'Observation', icon: '👁️', text: 'Notices what a careless party would miss, and what a thing is worth.' },
  tinkering: { name: 'Tinkering', icon: '🔧', text: 'Mechanisms, instruments, and the patience to test until it works.' },
  alchemy: { name: 'Alchemy', icon: '⚗️', text: 'Substances, reactions, and non-occult explanations for occult problems.' },
  medicine: { name: 'Medicine', icon: '💊', text: 'Diagnoses, treats, and mends the body.' },
  scholarship: { name: 'Scholarship', icon: '📖', text: 'Texts, histories, tongues, and the memory that holds them in relation.' },
  astrology: { name: 'Astrology', icon: '🔭', text: 'The sky, the number, and everything that moves by either.' },
  divination: { name: 'Divination', icon: '🔮', text: 'Knowing the hidden before committing to it.' },
  conjuring: { name: 'Conjuring', icon: '🪄', text: 'Summons, binds, and imagines what is not flesh into answering.' },
  correspondence: { name: 'Correspondence', icon: '🔗', text: 'The links between systems — metals to planets, tones to spheres, one tradition to another.' },
  rhetoric: { name: 'Rhetoric', icon: '🤝', text: 'Persuasion, disputation, and the bargain nobody planned to offer.' },
};

/**
 * What else bears on a problem.
 *
 * A capability gate used to be a lock: hold `astronomy` or the orrery
 * option is not on the menu. Measured, that lock opened for 93% of
 * narrow parties and 100% of broad ones, because each situation asks
 * "do you hold any of these four?" and against four independent draws
 * even a thin party nearly always holds one. A gate 93% of parties pass
 * is not a gate, and every payoff downstream of it was capped by that
 * seven-point gap (DESIGN_DIALOGUE.md §P).
 *
 * So the lock becomes a slope. These are the neighbours of each
 * capability — the tags a person would actually want beside them on
 * that problem. They do two jobs:
 *
 *   1. **Adjacency opens the door.** A mathematician may attempt the
 *      orrery. They are not an astronomer and the writing says so, but
 *      the option is on the menu, which is what makes an encounter a
 *      question rather than a key-check.
 *   2. **Depth grades the answer.** How many of the bearing tags the
 *      party holds decides how well it goes — one is a rough job, three
 *      is mastery. This is the discrimination the binary gate could not
 *      provide, and unlike a gate it cannot saturate: there is always a
 *      further tag to hold.
 *
 * House doctrine caught up with, rather than departed from: standing
 * rule 4 has always been gradient outcomes, not binary win/lose. The
 * encounters were the last place still doing it the old way.
 *
 * Symmetry is not required and not enforced — `medicine` leans on
 * `healing` more than `healing` leans on `medicine` — but the relation
 * should be one a player could guess before reading this table.
 */
export const AFFINITIES = {
  warcraft: ['roguery', 'observation'],
  roguery: ['observation', 'warcraft', 'tinkering'],
  observation: ['roguery', 'divination', 'tinkering'],
  tinkering: ['observation', 'alchemy', 'astrology'],
  alchemy: ['tinkering', 'medicine', 'correspondence'],
  medicine: ['alchemy', 'scholarship'],
  scholarship: ['correspondence', 'rhetoric', 'medicine'],
  astrology: ['divination', 'correspondence', 'tinkering'],
  divination: ['astrology', 'conjuring', 'observation'],
  conjuring: ['divination', 'correspondence'],
  correspondence: ['scholarship', 'astrology', 'conjuring'],
  rhetoric: ['scholarship', 'correspondence', 'warcraft'],
};

/** Everything that bears on an option asking for these capabilities. */
export function bearingOn(requires = []) {
  const set = new Set(requires);
  for (const cap of requires) {
    for (const near of AFFINITIES[cap] || []) set.add(near);
  }
  return set;
}

export function isCapability(id) {
  return Object.prototype.hasOwnProperty.call(CAPABILITIES, id);
}

export function getCapability(id) {
  return CAPABILITIES[id] || null;
}

/** The display name for a tag, falling back to the raw id. */
export function capabilityName(id) {
  return CAPABILITIES[id]?.name || id;
}

export function allCapabilityIds() {
  return Object.keys(CAPABILITIES);
}
