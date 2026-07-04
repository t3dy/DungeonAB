/**
 * DungeonGen — seeded room-graph dungeon generation
 *
 * Layered generation (per the Procedural Dungeon Design Tips chat):
 * 1. Spine: entrance → N rooms → boss
 * 2. Branches: 1-2 side paths with optional loot
 * 3. Room typing with guarantees (lab, library, shrine)
 * 4. Difficulty scaling on monster density and disaster count
 */

import { SeededRandom } from '../draft/PackDraft.js';

export const ROOM_TYPES = {
  ENTRANCE: 'entrance',
  CORRIDOR: 'corridor',
  MONSTER: 'monster',
  TRAP: 'trap',
  TREASURE: 'treasure',
  LIBRARY: 'library',
  SHRINE: 'shrine',
  LAB: 'lab',
  MATERIALS: 'materials',
  DISASTER: 'disaster',
  BOSS: 'boss',
};

const ROOM_ICONS = {
  entrance: '🚪', corridor: '⬛', monster: '👹', trap: '⚠️',
  treasure: '💰', library: '📚', shrine: '🕯️', lab: '⚗️',
  materials: '🌿', disaster: '🌋', boss: '🐉',
};

/**
 * Room type distribution by difficulty (spine rooms, excluding
 * entrance/boss). Weights, not counts.
 */
const TYPE_WEIGHTS = {
  easy: { monster: 2, trap: 1, treasure: 2, library: 1, shrine: 1.5, lab: 1, materials: 2, disaster: 0.5, corridor: 1 },
  medium: { monster: 3, trap: 1.5, treasure: 2, library: 1, shrine: 1, lab: 1, materials: 1.5, disaster: 1, corridor: 1 },
  hard: { monster: 4, trap: 2.5, treasure: 1.5, library: 1, shrine: 0.7, lab: 1, materials: 1, disaster: 2, corridor: 0.5 },
  nightmare: { monster: 5, trap: 3, treasure: 1.5, library: 0.8, shrine: 0.5, lab: 1, materials: 1, disaster: 3, corridor: 0.3 },
};

function weightedPick(rng, weights) {
  const entries = Object.entries(weights);
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let roll = rng.next() * total;
  for (const [type, w] of entries) {
    roll -= w;
    if (roll <= 0) return type;
  }
  return entries[0][0];
}

export class Dungeon {
  constructor(rooms, theme) {
    this.rooms = rooms; // Array of room objects in order
    this.theme = theme; // One of DUNGEON_THEMES
  }
  getRoom(index) {
    return this.rooms[index] || null;
  }
  get length() {
    return this.rooms.length;
  }
}

/**
 * Generate a dungeon.
 * @param seed        world seed
 * @param difficulty  easy|medium|hard|nightmare
 * @param opts        { wantLab: bool,   — guarantee a lab when the
 *                                         party drafted an alchemist
 *                      theme: string,   — force a theme id; otherwise
 *                                         the seed decides
 *                      depth: number }  — campaign depth (1 = first
 *                                         dungeon); deeper is meaner
 */
export function generateDungeon(seed, difficulty = 'medium', opts = {}) {
  const rng = new SeededRandom(seed);
  const depth = Math.max(1, opts.depth || 1);

  // The seed decides where you're delving, unless the caller does
  const theme = DUNGEON_THEMES[opts.theme]
    || rng.pick(Object.values(DUNGEON_THEMES));

  // Difficulty sets the table; the theme leans on it
  const weights = { ...(TYPE_WEIGHTS[difficulty] || TYPE_WEIGHTS.medium) };
  for (const [type, tweak] of Object.entries(theme.weightTweaks)) {
    weights[type] = Math.max(0.1, (weights[type] || 0) + tweak);
  }

  // Difficulty sharpens the monsters themselves, not just the map
  const statScale = STAT_SCALE[difficulty] || 1;

  const spineLength = 8 + Math.floor(rng.next() * 4); // 8-11 rooms between entrance and boss
  const rooms = [];

  rooms.push(makeRoom(0, ROOM_TYPES.ENTRANCE, rng, theme, depth, statScale));

  for (let i = 1; i <= spineLength; i++) {
    const type = weightedPick(rng, weights);
    rooms.push(makeRoom(i, type, rng, theme, depth, statScale));
  }

  // Guarantees: at least one library and one shrine; a lab if wanted.
  // Themes add their own identity guarantees on top.
  ensureRoomType(rooms, ROOM_TYPES.LIBRARY, rng, theme, depth, statScale, theme.minLibraries || 1);
  ensureRoomType(rooms, ROOM_TYPES.SHRINE, rng, theme, depth, statScale);
  if (opts.wantLab || theme.alwaysLab) {
    ensureRoomType(rooms, ROOM_TYPES.LAB, rng, theme, depth, statScale);
    // A lab without materials is glassware and regret
    ensureRoomType(rooms, ROOM_TYPES.MATERIALS, rng, theme, depth, statScale, 1);
  }

  rooms.push(makeRoom(rooms.length, ROOM_TYPES.BOSS, rng, theme, depth, statScale));

  // Depth positions for the renderer (a winding descent)
  let x = 0;
  let y = 0;
  for (const room of rooms) {
    room.x = x;
    room.y = y;
    if (rng.next() < 0.5) x += 1; else y += 1;
  }

  return new Dungeon(rooms, theme);
}

/**
 * Guarantee at least `minCount` rooms of a type exist by converting
 * random convertible spine rooms (never the entrance, never rooms
 * of other guaranteed types)
 */
const PROTECTED_TYPES = new Set([
  ROOM_TYPES.ENTRANCE, ROOM_TYPES.BOSS,
  ROOM_TYPES.LIBRARY, ROOM_TYPES.SHRINE, ROOM_TYPES.LAB, ROOM_TYPES.MATERIALS,
]);

function ensureRoomType(rooms, type, rng, theme, depth, statScale, minCount = 1) {
  const have = rooms.filter(r => r.type === type).length;
  let need = minCount - have;

  while (need > 0) {
    const convertible = rooms.filter(r => !PROTECTED_TYPES.has(r.type));
    if (convertible.length === 0) break;
    const target = rng.pick(convertible);
    const replacement = makeRoom(target.index, type, rng, theme, depth, statScale);
    replacement.x = target.x;
    replacement.y = target.y;
    rooms[rooms.indexOf(target)] = replacement;
    need--;
  }
}

function makeRoom(index, type, rng, theme, depth = 1, statScale = 1) {
  const room = {
    index,
    type,
    icon: ROOM_ICONS[type] || '⬛',
    cleared: false,
  };

  // Per-type payloads. Depth is the campaign's whetstone: deeper
  // dungeons hit harder and pay better.
  if (type === ROOM_TYPES.MONSTER) {
    room.monster = rollMonster(rng, false, theme, depth, statScale);
  }
  if (type === ROOM_TYPES.BOSS) {
    room.monster = rollMonster(rng, true, theme, depth, statScale);
  }
  if (type === ROOM_TYPES.TREASURE) {
    room.gold = Math.round((20 + Math.floor(rng.next() * 40)) * (1 + 0.2 * (depth - 1)));
    room.mimicChance = 0.18;
  }
  if (type === ROOM_TYPES.TRAP) {
    room.trapDamage = 4 + Math.floor(rng.next() * 4) + (theme.trapBonus || 0) + (depth - 1);
  }
  if (type === ROOM_TYPES.MATERIALS) {
    room.materials = 1 + Math.floor(rng.next() * 2);
  }

  return room;
}

/* ------------------------------------------------------------------ */
/* Dungeon themes — each delve has a face (Megabase: different         */
/* dungeon types, incl. the Dungeon of the Mad Alchemist)              */
/* ------------------------------------------------------------------ */

export const DUNGEON_THEMES = {
  delve: {
    id: 'delve', name: 'the Old Delve', icon: '⛏️',
    tagline: 'A classic hole in the ground, wronged by generations of management.',
    weightTweaks: {},
    monsters: [
      { kind: 'rat-swarm', name: 'a chittering rat swarm', icon: '🐀', attack: 4, health: 10, undead: false },
      { kind: 'skeleton', name: 'a rattling skeleton patrol', icon: '💀', attack: 6, health: 14, undead: true },
      { kind: 'goblin-gang', name: 'a goblin toll-gang', icon: '👺', attack: 5, health: 12, undead: false, bribable: true },
      { kind: 'gelatinous', name: 'a gelatinous horror', icon: '🟩', attack: 5, health: 18, undead: false, slow: true },
      { kind: 'wraith', name: 'a cold-eyed wraith', icon: '👻', attack: 8, health: 12, undead: true },
    ],
    bosses: [
      { kind: 'dragon-whelp', name: 'the Dragon Whelp of the Deep Vault', icon: '🐉', attack: 12, health: 34, undead: false },
      { kind: 'ogre-king', name: 'the Ogre King Under the Stair', icon: '👹', attack: 14, health: 38, undead: false, bribable: true },
    ],
  },

  crypt: {
    id: 'crypt', name: 'the Ancient Crypt', icon: '⚰️',
    tagline: 'The dead were buried with their grudges. Both kept.',
    weightTweaks: { monster: 1, shrine: 0.5, treasure: -0.5 },
    monsters: [
      { kind: 'bone-warden', name: 'a bone warden on its rounds', icon: '💀', attack: 6, health: 15, undead: true },
      { kind: 'grave-mites', name: 'a boil of grave mites', icon: '🪲', attack: 4, health: 9, undead: false },
      { kind: 'barrow-shade', name: 'a barrow shade, thin as smoke', icon: '👻', attack: 8, health: 11, undead: true },
      { kind: 'hungry-ghoul', name: 'a ghoul between meals', icon: '🧟', attack: 7, health: 13, undead: true },
    ],
    bosses: [
      { kind: 'shrouded-king', name: 'the Shrouded King in his broken throne-niche', icon: '👑', attack: 12, health: 32, undead: true },
      { kind: 'abbot-of-worms', name: 'the Abbot of Worms, still preaching', icon: '☠️', attack: 10, health: 36, undead: true },
    ],
  },

  volcanic: {
    id: 'volcanic', name: 'the Cinder Galleries', icon: '🌋',
    tagline: 'The mountain is not dormant. The mountain is patient.',
    weightTweaks: { disaster: 1, trap: 0.5, shrine: -0.3 },
    trapBonus: 2, // fire traps bite harder
    monsters: [
      { kind: 'salamander', name: 'a salamander the size of a mistake', icon: '🦎', attack: 7, health: 14, undead: false },
      { kind: 'cinder-bats', name: 'a shriek of cinder bats', icon: '🦇', attack: 5, health: 9, undead: false },
      { kind: 'magma-toad', name: 'a magma toad, gently steaming', icon: '🐸', attack: 6, health: 16, undead: false, slow: true },
      { kind: 'obsidian-golem', name: 'an obsidian golem with a slow fuse', icon: '🗿', attack: 8, health: 20, undead: false, slow: true },
    ],
    bosses: [
      { kind: 'cinder-wyrm', name: 'the Cinder Wyrm coiled in its forge-nest', icon: '🐉', attack: 13, health: 36, undead: false },
      { kind: 'forge-tyrant', name: 'the Forge Tyrant, hammer still warm', icon: '🔨', attack: 14, health: 34, undead: false, bribable: true },
    ],
  },

  library: {
    id: 'library', name: 'the Drowned Athenaeum', icon: '📚',
    tagline: 'Knowledge wants to be free. It has been waiting a long time.',
    weightTweaks: { library: 2, monster: -0.5, materials: -0.5 },
    minLibraries: 2,
    monsters: [
      { kind: 'flying-tomes', name: 'a wheeling flock of flying tomes', icon: '📖', attack: 5, health: 10, undead: false },
      { kind: 'ink-elemental', name: 'an ink elemental, still wet', icon: '🫧', attack: 6, health: 13, undead: false },
      { kind: 'spectral-scribe', name: 'a spectral scribe mid-citation', icon: '👻', attack: 7, health: 12, undead: true },
      { kind: 'index-wight', name: 'the wight of a disappointed librarian', icon: '🧟', attack: 8, health: 14, undead: true },
    ],
    bosses: [
      { kind: 'archivist', name: 'the Archivist, quill dripping', icon: '🪶', attack: 11, health: 33, undead: true },
      { kind: 'grand-errata', name: 'the Grand Errata, a book that reads back', icon: '📕', attack: 12, health: 35, undead: false },
    ],
  },

  madlab: {
    id: 'madlab', name: 'the Mad Alchemist\'s Dungeon', icon: '⚗️',
    tagline: 'The experiments continued after the funding stopped. And after the alchemist did.',
    weightTweaks: { lab: 1.5, materials: 1, disaster: 0.5, shrine: -0.5 },
    alwaysLab: true, // the theme's identity: labs regardless of party
    monsters: [
      { kind: 'sludge-elemental', name: 'a sludge elemental, recently fed', icon: '🟢', attack: 6, health: 15, undead: false },
      { kind: 'potion-rats', name: 'a scurry of potion-glowing rats', icon: '🐀', attack: 5, health: 10, undead: false },
      { kind: 'mutant-vine', name: 'a vine that learned grasping from a textbook', icon: '🌿', attack: 6, health: 14, undead: false, slow: true },
      { kind: 'failed-homunculus', name: 'a homunculus that failed peer review', icon: '🧪', attack: 7, health: 12, undead: false, bribable: true },
    ],
    bosses: [
      { kind: 'mad-alchemist', name: 'the Mad Alchemist, flask raised in welcome', icon: '⚗️', attack: 12, health: 34, undead: false },
      { kind: 'the-precipitate', name: 'the Precipitate, everything the drains refused', icon: '🫠', attack: 13, health: 37, undead: false },
    ],
  },
};

/**
 * Difficulty multiplier on monster stats — easy dungeons pull their
 * punches, nightmare dungeons do not
 */
export const STAT_SCALE = {
  easy: 0.85,
  medium: 1.0,
  hard: 1.3,
  nightmare: 1.7,
};

function rollMonster(rng, isBoss, theme, depth = 1, statScale = 1) {
  const pool = isBoss ? theme.bosses : theme.monsters;
  const monster = { ...rng.pick(pool) };

  // Depth: things get meaner the farther from daylight
  const depthFactor = 1 + 0.15 * (depth - 1);
  monster.attack = Math.round(monster.attack * depthFactor * statScale);
  monster.health = Math.round(monster.health * (1 + 0.2 * (depth - 1)) * statScale);
  if (isBoss) monster.isBoss = true;

  return monster;
}
