/**
 * Bestiary — every monster's nature, in one inspectable place
 *
 * Themes declare *who* lives in a dungeon; the bestiary declares what
 * they're *like*: combat traits, elemental weaknesses, resistances.
 * Merged onto monsters at generation time, so archived layouts carry
 * their natures with them. Packs extend it via registerNatures().
 *
 * Traits (each changes the fight, each is narrated):
 *   slow      — the party strikes first; no incoming damage round 1
 *   armored   — shaves 2 from the party's blows each round
 *   ethereal  — steel passes through (party damage ×0.6) unless a
 *               cleric's presence gives the blades conviction
 *   venomous  — a won fight still leaves poison working; it bites on
 *               the next room unless a cleric draws it
 *   swarm     — packed bodies: spell openings land ×1.5
 *
 * Elements: fire, frost, shock, holy. weak ×1.5, resist ×0.5 on spell
 * openings. The undead are always weak to holy — no annotation needed.
 *
 * Signature moves (combat v2): some kinds fight with more than teeth.
 * A move fires every N rounds in place of the plain counter-blow, and
 * the exchange log carries it to the chronicle and the renderer:
 *   breath — an elemental wash, +bonus damage (dragons, salamanders)
 *   drain  — the hit feeds the thing: half the damage returns as health
 *   hex    — a muttered working; every party swing lands 1 lighter
 *   crush  — a single massive blow, +bonus damage (ogres, engulfers)
 */

const MOVE_DEFS = {
  breath: (name, element, every = 3, bonus = 2) => ({ kind: 'breath', name, element, every, bonus }),
  drain: (name, every = 3) => ({ kind: 'drain', name, every, bonus: 0 }),
  hex: (name, every = 4) => ({ kind: 'hex', name, every, bonus: 0 }),
  crush: (name, every = 3, bonus = 3) => ({ kind: 'crush', name, every, bonus }),
};

const NATURES = {
  // the Old Delve
  'rat-swarm': { trait: 'swarm', weak: ['fire'] },
  'gelatinous': { trait: 'armored', weak: ['frost'], resist: ['shock'], move: MOVE_DEFS.crush('Engulf', 4) },
  'wraith': { trait: 'ethereal', move: MOVE_DEFS.drain('Chilling Touch') },
  'ogre-king': { trait: 'armored', move: MOVE_DEFS.crush('Overhead Smash') },
  'dragon-whelp': { resist: ['fire'], weak: ['frost'], move: MOVE_DEFS.breath('Cinder Breath', 'fire') },

  // the Ancient Crypt
  'bone-warden': { trait: 'armored' },
  'grave-mites': { trait: 'swarm', weak: ['fire'] },
  'barrow-shade': { trait: 'ethereal', move: MOVE_DEFS.drain('Barrow Chill') },
  'hungry-ghoul': { trait: 'venomous' },
  'shrouded-king': { trait: 'armored', move: MOVE_DEFS.drain('The Shroud Feeds') },
  'abbot-of-worms': { trait: 'venomous', move: MOVE_DEFS.hex('Sermon of Rot') },

  // the Cinder Galleries
  'salamander': { resist: ['fire'], weak: ['frost'], move: MOVE_DEFS.breath('Scalding Spit', 'fire', 4) },
  'cinder-bats': { trait: 'swarm', resist: ['fire'], weak: ['frost'] },
  'magma-toad': { resist: ['fire'], weak: ['frost'] },
  'obsidian-golem': { trait: 'armored', resist: ['shock'], move: MOVE_DEFS.crush('Basalt Fist', 4) },
  'cinder-wyrm': { resist: ['fire'], weak: ['frost'], move: MOVE_DEFS.breath('Forge Breath', 'fire') },
  'forge-tyrant': { trait: 'armored', resist: ['fire'], move: MOVE_DEFS.crush('Hammerfall') },

  // the Drowned Athenaeum
  'flying-tomes': { trait: 'swarm', weak: ['fire'] },
  'ink-elemental': { weak: ['fire'], resist: ['shock'] },
  'spectral-scribe': { trait: 'ethereal' },
  'index-wight': { weak: ['fire'] },
  'archivist': { trait: 'ethereal', move: MOVE_DEFS.hex('Redaction') },
  'grand-errata': { trait: 'armored', weak: ['fire'], move: MOVE_DEFS.hex('Errata Slip') },

  // the Mad Alchemist's Dungeon
  'sludge-elemental': { trait: 'venomous', resist: ['shock'] },
  'potion-rats': { trait: 'swarm' },
  'mutant-vine': { trait: 'armored', weak: ['fire'] },
  'mad-alchemist': { trait: 'venomous', move: MOVE_DEFS.hex('Debilitating Tincture') },
  'the-precipitate': { trait: 'armored', resist: ['fire', 'frost'], move: MOVE_DEFS.crush('Absorb', 4) },

  // the Castle of the Vampire Lord
  'bat-cloud': { trait: 'swarm' },
  'pale-hound': { trait: 'venomous' },
  'crimson-mist': { trait: 'ethereal', move: MOVE_DEFS.drain('Red Thirst') },
  'vampire-lord': { trait: 'ethereal', move: MOVE_DEFS.drain('The Lord Drinks') },
  'the-bride': { trait: 'ethereal', move: MOVE_DEFS.drain('The Older Thirst') },

  // the Root Cellar of the Bog Witch
  'jar-imp': { trait: 'swarm', resist: ['fire'] },
  'pickled-thing': { trait: 'venomous' },
  'root-golem': { trait: 'armored', weak: ['fire'], move: MOVE_DEFS.crush('Taproot Slam', 4) },
  'bog-toad': { trait: 'venomous' },
  'bog-witch': { move: MOVE_DEFS.hex('The Long Recipe') },
  'the-cauldron': { trait: 'armored', resist: ['fire'], move: MOVE_DEFS.crush('Boil Over', 4) },

  // the Ice Caverns of the Mad Pyromancer
  'frost-wisp': { trait: 'ethereal', resist: ['frost'], weak: ['fire'] },
  'ice-crawler': { trait: 'swarm', weak: ['fire'] },
  'thawed-dead': { trait: 'venomous' },
  'cinder-imp': { resist: ['fire'], weak: ['frost'] },
  'mad-pyromancer': { resist: ['fire'], weak: ['frost'], move: MOVE_DEFS.breath('Exile\'s Fire', 'fire') },   // the irony is structural
  'glacier-heart': { trait: 'armored', resist: ['frost'], weak: ['fire'], move: MOVE_DEFS.crush('Calving', 4) },
};

/** Packs register natures for their own kinds (DLC). */
export function registerNatures(map) {
  Object.assign(NATURES, map);
}

/** Overlay a monster's nature onto its roster entry. */
export function applyNature(monster) {
  const nature = NATURES[monster.kind];
  return nature ? { ...monster, ...nature } : monster;
}

/**
 * The elemental multiplier for a spell against a monster:
 * weak ×1.5, resist ×0.5, the undead always weak to holy.
 */
export function elementMult(spell, monster) {
  const el = spell?.element;
  if (!el) return 1;
  if (el === 'holy' && monster.undead) return 1.5;
  if ((monster.weak || []).includes(el)) return 1.5;
  if ((monster.resist || []).includes(el)) return 0.5;
  return 1;
}

/** For tests and the writing: the trait vocabulary. */
export const TRAITS = ['slow', 'armored', 'ethereal', 'venomous', 'swarm'];
