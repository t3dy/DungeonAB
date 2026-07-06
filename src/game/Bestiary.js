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
 */

const NATURES = {
  // the Old Delve
  'rat-swarm': { trait: 'swarm', weak: ['fire'] },
  'gelatinous': { trait: 'armored', weak: ['frost'], resist: ['shock'] },
  'wraith': { trait: 'ethereal' },
  'ogre-king': { trait: 'armored' },
  'dragon-whelp': { resist: ['fire'], weak: ['frost'] },

  // the Ancient Crypt
  'bone-warden': { trait: 'armored' },
  'grave-mites': { trait: 'swarm', weak: ['fire'] },
  'barrow-shade': { trait: 'ethereal' },
  'hungry-ghoul': { trait: 'venomous' },
  'shrouded-king': { trait: 'armored' },
  'abbot-of-worms': { trait: 'venomous' },

  // the Cinder Galleries
  'salamander': { resist: ['fire'], weak: ['frost'] },
  'cinder-bats': { trait: 'swarm', resist: ['fire'], weak: ['frost'] },
  'magma-toad': { resist: ['fire'], weak: ['frost'] },
  'obsidian-golem': { trait: 'armored', resist: ['shock'] },
  'cinder-wyrm': { resist: ['fire'], weak: ['frost'] },
  'forge-tyrant': { trait: 'armored', resist: ['fire'] },

  // the Drowned Athenaeum
  'flying-tomes': { trait: 'swarm', weak: ['fire'] },
  'ink-elemental': { weak: ['fire'], resist: ['shock'] },
  'spectral-scribe': { trait: 'ethereal' },
  'index-wight': { weak: ['fire'] },
  'archivist': { trait: 'ethereal' },
  'grand-errata': { trait: 'armored', weak: ['fire'] },

  // the Mad Alchemist's Dungeon
  'sludge-elemental': { trait: 'venomous', resist: ['shock'] },
  'potion-rats': { trait: 'swarm' },
  'mutant-vine': { trait: 'armored', weak: ['fire'] },
  'mad-alchemist': { trait: 'venomous' },
  'the-precipitate': { trait: 'armored', resist: ['fire', 'frost'] },

  // the Castle of the Vampire Lord
  'bat-cloud': { trait: 'swarm' },
  'pale-hound': { trait: 'venomous' },
  'crimson-mist': { trait: 'ethereal' },
  'vampire-lord': { trait: 'ethereal' },
  'the-bride': { trait: 'ethereal' },

  // the Root Cellar of the Bog Witch
  'jar-imp': { trait: 'swarm', resist: ['fire'] },
  'pickled-thing': { trait: 'venomous' },
  'root-golem': { trait: 'armored', weak: ['fire'] },
  'bog-toad': { trait: 'venomous' },
  'the-cauldron': { trait: 'armored', resist: ['fire'] },

  // the Ice Caverns of the Mad Pyromancer
  'frost-wisp': { trait: 'ethereal', resist: ['frost'], weak: ['fire'] },
  'ice-crawler': { trait: 'swarm', weak: ['fire'] },
  'thawed-dead': { trait: 'venomous' },
  'cinder-imp': { resist: ['fire'], weak: ['frost'] },
  'mad-pyromancer': { resist: ['fire'], weak: ['frost'] },   // the irony is structural
  'glacier-heart': { trait: 'armored', resist: ['frost'], weak: ['fire'] },
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
