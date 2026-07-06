/**
 * SpriteAtlas — Kenney "Tiny Dungeon" (CC0) tile mapping
 *
 * One 192×176 sheet, 12×11 tiles of 16px, no spacing. This module is
 * the single source of truth for which tile depicts what: party
 * classes, every monster kind in every theme's roster, and the props
 * that dress each room type. Everything falls back — an unmapped
 * monster gets the cyclops, an unmapped room gets nothing — so new
 * content can never crash the renderer.
 *
 * Art: Kenney (kenney.nl), Creative Commons Zero.
 */

export const ATLAS = {
  url: new URL('../assets/tiny-dungeon.png', import.meta.url).href,
  cols: 12,
  rows: 11,
  tile: 16,
};

/* The party — one face per class */
const CLASS_TILES = {
  fighter: { col: 0, row: 8 },     // closed-helm knight
  cleric: { col: 2, row: 7 },      // bald monk
  wizard: { col: 0, row: 7 },      // purple-hat wizard
  rogue: { col: 4, row: 9 },       // green-bandana ranger
  alchemist: { col: 4, row: 7 },   // aproned artisan
};

/* The menagerie — every monster kind across every theme's roster */
const MONSTER_TILES = {
  // the Old Delve
  'rat-swarm': { col: 3, row: 10 },
  'skeleton': { col: 4, row: 10 },      // armored bone-beast
  'goblin-gang': { col: 1, row: 7 },    // shirtless toll-brawler
  'gelatinous': { col: 0, row: 9 },     // slime
  'wraith': { col: 1, row: 10 },        // ghost
  'dragon-whelp': { col: 2, row: 9 },   // red crawler
  'ogre-king': { col: 1, row: 9 },      // cyclops

  // the Ancient Crypt
  'bone-warden': { col: 4, row: 10 },
  'grave-mites': { col: 2, row: 10 },   // spider
  'barrow-shade': { col: 1, row: 10 },
  'hungry-ghoul': { col: 1, row: 9 },
  'shrouded-king': { col: 3, row: 9 },  // hooded, red-eyed
  'abbot-of-worms': { col: 1, row: 10 },

  // the Cinder Galleries
  'salamander': { col: 2, row: 9 },
  'cinder-bats': { col: 0, row: 10 },
  'magma-toad': { col: 0, row: 9 },
  'obsidian-golem': { col: 4, row: 10 },
  'cinder-wyrm': { col: 2, row: 9 },
  'forge-tyrant': { col: 1, row: 9 },

  // the Drowned Athenaeum
  'flying-tomes': { col: 0, row: 10 },
  'ink-elemental': { col: 0, row: 9 },
  'spectral-scribe': { col: 1, row: 10 },
  'index-wight': { col: 3, row: 9 },
  'archivist': { col: 3, row: 9 },
  'grand-errata': { col: 4, row: 10 },

  // the Mad Alchemist's Dungeon
  'sludge-elemental': { col: 0, row: 9 },
  'potion-rats': { col: 3, row: 10 },
  'mutant-vine': { col: 2, row: 10 },
  'failed-homunculus': { col: 1, row: 9 },
  'mad-alchemist': { col: 3, row: 9 },
  'the-precipitate': { col: 0, row: 9 },

  // the Castle of the Vampire Lord
  'castle-thrall': { col: 1, row: 7 },      // the bloodless footman
  'bat-cloud': { col: 0, row: 10 },
  'pale-hound': { col: 4, row: 10 },        // the grey beast
  'crimson-mist': { col: 1, row: 10 },      // the ghost-shape
  'vampire-lord': { col: 3, row: 9 },       // hooded, red-eyed
  'the-bride': { col: 3, row: 8 },          // the pale lady

  // the Root Cellar of the Bog Witch
  'jar-imp': { col: 2, row: 9 },            // the small red fury
  'pickled-thing': { col: 0, row: 9 },      // green and glistening
  'root-golem': { col: 4, row: 10 },
  'bog-toad': { col: 0, row: 9 },
  'bog-witch': { col: 4, row: 8 },          // the grey-haired elder
  'the-cauldron': { col: 1, row: 9 },       // the round hungry thing

  // the Ice Caverns of the Mad Pyromancer
  'frost-wisp': { col: 1, row: 10 },        // pale and drifting
  'ice-crawler': { col: 2, row: 10 },       // too many legs
  'thawed-dead': { col: 1, row: 7 },        // walking wrong
  'cinder-imp': { col: 2, row: 9 },         // the red crawler
  'mad-pyromancer': { col: 0, row: 7 },     // the wizard gone wrong
  'glacier-heart': { col: 4, row: 10 },     // the grey mass
};
const MONSTER_FALLBACK = { col: 1, row: 9 }; // when in doubt, cyclops

/* Room dressing — the prop that stands on the platform */
const PROP_TILES = {
  treasure: { col: 5, row: 7 },        // gold-trimmed chest
  'treasure-open': { col: 7, row: 7 }, // looted chest
  vault: { col: 6, row: 7 },           // the silver-bound hoard chest
  mimic: { col: 8, row: 7 },           // the chest with TEETH
  trap: { col: 4, row: 3 },            // spike gate
  library: { col: 5, row: 5 },         // archive cabinet
  shrine: { col: 4, row: 2 },          // glowing reliquary
  lab: { col: 8, row: 3 },             // green reagent vat
  materials: { col: 6, row: 5 },       // gatherer's sack
  entrance: { col: 10, row: 3 },       // the door down
  shop: { col: 0, row: 6 },            // the peddler's counter
  'shop-barrel': { col: 7, row: 5 },   // stock beside the stall
  altar: { col: 8, row: 2 },           // the offering basin, green and patient
  stairs: { col: 3, row: 6 },          // the ladder down
};

/* Architecture — the dungeon fabric itself (walls, floors, dressing) */
export const ARCH_TILES = {
  wallBrick: { col: 9, row: 4 },       // grey brickwork
  wallBrickB: { col: 10, row: 4 },     // brickwork, weathered
  floorStone: { col: 0, row: 3 },      // stone plank floor
  floorStoneB: { col: 1, row: 3 },     // stone planks, worn
  floorSand: { col: 0, row: 4 },       // packed tan earth
  floorPaver: { col: 6, row: 3 },      // earth with stone pavers
  banner: { col: 5, row: 2 },          // the red wall banner (boss chambers)
  portcullis: { col: 4, row: 3 },      // the iron gate (locked doors)
};

/* Torches — each theme burns its own color */
export const TORCH_TILES = {
  plain: { col: 5, row: 10 },
  green: { col: 6, row: 10 },
  red: { col: 7, row: 10 },
  blue: { col: 8, row: 10 },
};
const THEME_TORCH = {
  volcanic: 'red', castle: 'red',
  madlab: 'green', bogcellar: 'green',
  icecaverns: 'blue', library: 'blue',
};
export function getTorchTile(themeId) {
  return TORCH_TILES[THEME_TORCH[themeId] || 'plain'];
}

/* Each theme's floor fabric (walls share the brick) */
const THEME_FLOOR = {
  delve: 'floorStone', crypt: 'floorStoneB', volcanic: 'floorSand',
  library: 'floorStoneB', madlab: 'floorPaver', castle: 'floorStone',
  bogcellar: 'floorPaver', icecaverns: 'floorStoneB', athanor: 'floorPaver',
};
export function getFloorTile(themeId) {
  return ARCH_TILES[THEME_FLOOR[themeId] || 'floorStone'];
}

/* Effect sprites drawn from the sheet (procedural glows cover the rest) */
export const FX_TILES = {
  slash: { col: 2, row: 5 },           // white melee slashes
  'potion-green': { col: 6, row: 9 },
  'potion-red': { col: 7, row: 9 },
  'potion-blue': { col: 8, row: 9 },
};

/**
 * Content packs register tiles for their own monster kinds (DLC).
 * A tile is either { col, row } on the Tiny Dungeon sheet, or
 * { img: url } for standalone art (e.g. engraving extractions).
 */
export function registerMonsterTiles(map) {
  for (const [kind, tile] of Object.entries(map)) {
    MONSTER_TILES[kind] = tile;
  }
}

export function getClassTile(cls) {
  return CLASS_TILES[cls] || CLASS_TILES.fighter;
}

export function getMonsterTile(kind) {
  return MONSTER_TILES[kind] || MONSTER_FALLBACK;
}

/**
 * The prop for a room in its current state (a looted chest opens;
 * rooms with no dressing return null and keep their emoji).
 */
export function getRoomProp(room) {
  if (room.type === 'treasure') {
    return room.cleared ? PROP_TILES['treasure-open'] : PROP_TILES.treasure;
  }
  if (room.type === 'vault') {
    return room.cleared ? PROP_TILES['treasure-open'] : PROP_TILES.vault;
  }
  if (PROP_TILES[room.type]) return PROP_TILES[room.type];
  return null;
}

/** For tests: every mapped tile must live inside the sheet. */
export function getAllMappedTiles() {
  return [
    ...Object.values(CLASS_TILES),
    ...Object.values(MONSTER_TILES),
    ...Object.values(PROP_TILES),
    ...Object.values(FX_TILES),
    ...Object.values(ARCH_TILES),
    ...Object.values(TORCH_TILES),
    MONSTER_FALLBACK,
  ];
}
