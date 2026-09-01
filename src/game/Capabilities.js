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
  /* --- already in use across the card pool ---------------------- */
  tinkering: { name: 'Tinkering', icon: '🔧', text: 'Manipulates machines and mechanisms.' },
  diplomacy: { name: 'Diplomacy', icon: '🤝', text: 'Another way of interacting with people.' },
  rogue: { name: 'Rogue Craft', icon: '🗡️', text: 'Locks, traps, shadows, and the exits nobody else noticed.' },
  fencing: { name: 'Fencing', icon: '🤺', text: 'Blade-work as a social and a combat option both.' },
  tactics: { name: 'Tactics', icon: '🎯', text: 'Reads and reshapes the formation.' },
  conjuring: { name: 'Conjuring', icon: '🪄', text: 'Summons, binds, and speaks with what is not flesh.' },
  divination: { name: 'Divination', icon: '🔮', text: 'Information before commitment, not raw power.' },
  alchemy: { name: 'Alchemy', icon: '⚗️', text: 'Substances, bodies, medicines, poisons, reactions.' },
  healing: { name: 'Healing', icon: '💚', text: 'Mends wounds and cures what lingers.' },
  knowledge: { name: 'Knowledge', icon: '📖', text: 'Recognizes traditions, histories, and texts.' },
  appraisal: { name: 'Appraisal', icon: '💰', text: 'Knows what a thing is actually worth.' },
  translation: { name: 'Translation', icon: '🌐', text: 'Renders the obscure legible.' },
  observation: { name: 'Observation', icon: '👁️', text: 'Notices what a careless party would miss.' },
  experimentation: { name: 'Experimentation', icon: '🧪', text: 'Tests, iterates, transforms materials.' },
  correspondence: { name: 'Correspondence', icon: '🔗', text: 'Links disparate systems of meaning.' },
  memory: { name: 'Memory', icon: '🧠', text: 'Holds more, and holds it in relation.' },
  mathematics: { name: 'Mathematical Magic', icon: '📐', text: 'Number, proportion, and the working built on them.' },
  navigation: { name: 'Navigation', icon: '🧭', text: 'Finds the way, or the way around.' },

  /* --- the Renaissance additions -------------------------------- */
  antiquarian: { name: 'Antiquarian Knowledge', icon: '🏺', text: 'Recognizes what is historically significant.' },
  astronomy: { name: 'Astronomy', icon: '🔭', text: 'Reads the sky and what moves by it.' },
  naturalPhilosophy: { name: 'Natural Philosophy', icon: '🌿', text: 'Non-occult explanations for magical problems.' },
  imagination: { name: 'Imagination', icon: '✨', text: 'Unconventional associations, novel solutions.' },
  syncretism: { name: 'Syncretism', icon: '☯️', text: 'Reconciles competing traditions.' },
  music: { name: 'Music', icon: '🎵', text: 'Performance as persuasion, distraction, or balm.' },
  harmony: { name: 'Harmony', icon: '🎶', text: 'Strengthens what already works together.' },
  medicine: { name: 'Medicine', icon: '💊', text: 'Diagnoses and treats the body.' },
  telepathy: { name: 'Telepathy', icon: '📡', text: 'A link to minds that carry their own capabilities.' },
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
  tinkering: ['mathematics', 'experimentation', 'observation'],
  diplomacy: ['translation', 'appraisal', 'telepathy'],
  rogue: ['observation', 'tinkering', 'navigation'],
  fencing: ['tactics', 'observation'],
  tactics: ['observation', 'navigation', 'fencing'],
  conjuring: ['correspondence', 'divination', 'syncretism'],
  divination: ['astronomy', 'observation', 'correspondence'],
  alchemy: ['experimentation', 'medicine', 'naturalPhilosophy'],
  healing: ['medicine', 'harmony', 'alchemy'],
  knowledge: ['antiquarian', 'translation', 'memory'],
  appraisal: ['antiquarian', 'knowledge', 'observation'],
  translation: ['knowledge', 'correspondence', 'memory'],
  observation: ['divination', 'naturalPhilosophy', 'appraisal'],
  experimentation: ['naturalPhilosophy', 'alchemy', 'tinkering'],
  correspondence: ['syncretism', 'astronomy', 'harmony'],
  memory: ['knowledge', 'imagination', 'music'],
  mathematics: ['astronomy', 'harmony', 'tinkering'],
  astronomy: ['mathematics', 'divination', 'navigation'],
  navigation: ['astronomy', 'mathematics', 'observation'],
  harmony: ['music', 'mathematics', 'correspondence'],
  music: ['harmony', 'memory', 'imagination'],
  imagination: ['memory', 'music', 'syncretism'],
  syncretism: ['correspondence', 'translation', 'knowledge'],
  antiquarian: ['knowledge', 'appraisal', 'translation'],
  naturalPhilosophy: ['experimentation', 'observation', 'medicine'],
  medicine: ['healing', 'alchemy', 'naturalPhilosophy'],
  telepathy: ['conjuring', 'divination', 'diplomacy'],
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
