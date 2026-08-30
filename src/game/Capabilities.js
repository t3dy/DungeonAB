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
  debate: { name: 'Debate', icon: '💬', text: 'Challenges an argument\'s assumptions.' },
  syncretism: { name: 'Syncretism', icon: '☯️', text: 'Reconciles competing traditions.' },
  music: { name: 'Music', icon: '🎵', text: 'Performance as persuasion, distraction, or balm.' },
  harmony: { name: 'Harmony', icon: '🎶', text: 'Strengthens what already works together.' },
  medicine: { name: 'Medicine', icon: '💊', text: 'Diagnoses and treats the body.' },
  telepathy: { name: 'Telepathy', icon: '📡', text: 'A link to minds that carry their own capabilities.' },
};

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
