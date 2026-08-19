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
import { getCondition } from '../game/Conditions.js';
import { applyNature } from '../game/Bestiary.js';
import { rollFeatures } from './RoomFeatures.js';

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
  VAULT: 'vault',   // the rich room behind the secret door
};

/**
 * Room shapes (procgen v3) — a dungeon is not a corridor of identical
 * cells. Each shape is a footprint the renderer draws literally and
 * the fiction reads off: a hall is long, a cavern is wide and ragged,
 * a cell is a closet. Sizes are in tiles; one tile is roughly one
 * adventurer's floor space, so a 5×5 chamber genuinely holds a fight.
 */
export const ROOM_SHAPES = {
  CHAMBER: 'chamber',     // squarish, the standard fighting room
  HALL: 'hall',           // long rectangle: processionals, libraries
  CAVERN: 'cavern',       // big and ragged: corners cut off
  PASSAGE: 'passage',     // narrow connector, fights are cramped here
  CELL: 'cell',           // small square: closets, vaults, oubliettes
  ROTUNDA: 'rotunda',     // round: shrines, wells
};

/**
 * Per-function geometry: what shapes a room of this type can take, and
 * how big. `min`/`max` are tile extents (w × h before orientation).
 * Combat rooms are floored at 5×4 so a capped party of four plus a
 * monster all fit with room to swing (Party.PARTY_CAP).
 */
const ROOM_GEOMETRY = {
  entrance:  [{ shape: 'chamber', min: [5, 5], max: [6, 6] }, { shape: 'hall', min: [7, 4], max: [9, 4] }],
  corridor:  [{ shape: 'passage', min: [6, 2], max: [10, 3] }, { shape: 'hall', min: [7, 3], max: [9, 4] }],
  monster:   [{ shape: 'chamber', min: [5, 5], max: [7, 7] }, { shape: 'cavern', min: [7, 5], max: [10, 8] }, { shape: 'hall', min: [8, 4], max: [11, 5] }],
  trap:      [{ shape: 'passage', min: [6, 3], max: [9, 3] }, { shape: 'chamber', min: [5, 4], max: [6, 5] }],
  treasure:  [{ shape: 'cell', min: [4, 4], max: [5, 5] }, { shape: 'chamber', min: [5, 5], max: [6, 6] }],
  library:   [{ shape: 'hall', min: [8, 5], max: [12, 6] }, { shape: 'chamber', min: [6, 6], max: [8, 8] }],
  shrine:    [{ shape: 'rotunda', min: [6, 6], max: [8, 8] }, { shape: 'chamber', min: [5, 5], max: [6, 6] }],
  lab:       [{ shape: 'chamber', min: [6, 5], max: [8, 7] }, { shape: 'hall', min: [8, 4], max: [10, 5] }],
  materials: [{ shape: 'cavern', min: [6, 5], max: [9, 7] }, { shape: 'cell', min: [4, 4], max: [5, 5] }],
  disaster:  [{ shape: 'cavern', min: [8, 6], max: [12, 9] }, { shape: 'hall', min: [9, 4], max: [12, 5] }],
  boss:      [{ shape: 'cavern', min: [10, 8], max: [14, 11] }, { shape: 'hall', min: [12, 6], max: [16, 8] }],
  vault:     [{ shape: 'cell', min: [4, 4], max: [5, 5] }],
};

/** The smallest floor a fight can happen on without feeling like a hallway. */
export const COMBAT_FLOOR = { w: 5, h: 4 };

/**
 * Roll a room's footprint. Orientation flips w/h half the time, so
 * halls run both ways and the map doesn't comb in one direction.
 */
function rollGeometry(type, rng) {
  const options = ROOM_GEOMETRY[type] || ROOM_GEOMETRY.corridor;
  const pick = options[Math.floor(rng.next() * options.length)];
  let w = pick.min[0] + Math.floor(rng.next() * (pick.max[0] - pick.min[0] + 1));
  let h = pick.min[1] + Math.floor(rng.next() * (pick.max[1] - pick.min[1] + 1));
  if (rng.next() < 0.5) [w, h] = [h, w];
  return { w, h, shape: pick.shape };
}

const ROOM_ICONS = {
  entrance: '🚪', corridor: '⬛', monster: '👹', trap: '⚠️',
  treasure: '💰', library: '📚', shrine: '🕯️', lab: '⚗️',
  materials: '🌿', disaster: '🌋', boss: '🐉', vault: '💎',
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
  constructor(rooms, theme, condition = null, layout = {}) {
    this.rooms = rooms;         // Array of room objects in order
    this.theme = theme;         // One of DUNGEON_THEMES
    this.condition = condition; // The player's wager, or null
    // Spatial layout (procgen v2, per the Spelunky critical-path
    // pattern in Shaker/Togelius/Nelson ch.3):
    this.spine = layout.spine || rooms.map((_, i) => i);   // the guaranteed path, entrance→boss
    this.edges = layout.edges                              // [{a, b, secret, kind}] between room indexes
      || rooms.slice(1).map((_, i) => ({ a: i, b: i + 1, secret: false, kind: 'door' }));
    this.branches = layout.branches || [];                 // [{junction, rooms:[idx], secret, consumed}]
    // Vertical shortcuts: a shaft in the floor that skips ahead down
    // the spine for a fall. [{from, to, secret, consumed}]
    this.trapdoors = layout.trapdoors || [];
  }
  getRoom(index) {
    return this.rooms[index] || null;
  }
  get length() {
    return this.rooms.length;
  }
  /** The unconsumed branch hanging off this room, if any. */
  branchAt(roomIndex) {
    return this.branches.find(b => b.junction === roomIndex && !b.consumed) || null;
  }
  /** The unconsumed trapdoor in this room's floor, if any. */
  trapdoorAt(roomIndex) {
    return this.trapdoors.find(t => t.from === roomIndex && !t.consumed) || null;
  }
}

/* ------------------------------------------------------------------ */
/* Spatial layout — rectangles that don't overlap                      */
/* ------------------------------------------------------------------ */

/** Do two rooms' footprints (plus a gap) collide? */
function overlaps(a, b, gap = 2) {
  return Math.abs(a.x - b.x) * 2 < a.w + b.w + gap
      && Math.abs(a.y - b.y) * 2 < a.h + b.h + gap;
}

const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

/**
 * Place `room` adjacent to `from` in tile space: walk out along a
 * direction by both half-extents plus a corridor gap, and keep the
 * first placement that touches nothing already standing. Rooms carry
 * x/y as their CENTER in tiles (floats), so variable footprints tile
 * the plane without a grid to fight.
 * Returns the direction used, or null if the room could not be placed.
 */
function placeAdjacent(room, from, placed, rng, preferred = null) {
  const dirs = preferred ? [preferred, ...rng.shuffle(DIRS)] : rng.shuffle(DIRS);
  for (const dir of dirs) {
    for (const gap of [2, 3, 5]) {
      const [dx, dy] = dir;
      room.x = from.x + dx * ((from.w + room.w) / 2 + gap);
      room.y = from.y + dy * ((from.h + room.h) / 2 + gap);
      if (!placed.some(p => overlaps(room, p))) return dir;
    }
  }
  return null;
}

/**
 * Which way should the dungeon grow next? A straight line of rooms is
 * neither a dungeon nor renderable, so the walk turns to keep its
 * footprint roughly square: whichever axis is currently shorter gets
 * extended, with enough randomness that no two seeds snake alike.
 */
function nextHeading(placed, rng, heading) {
  const xs = placed.map(r => r.x);
  const ys = placed.map(r => r.y);
  const spanX = Math.max(...xs) - Math.min(...xs);
  const spanY = Math.max(...ys) - Math.min(...ys);

  // Rooms are big, so a few unbroken steps run the map off the screen.
  // Once the footprint is clearly lopsided the turn is not optional:
  // grow the shorter axis, no dice involved.
  const lopsided = Math.abs(spanX - spanY) > 8;
  if (lopsided) return spanX > spanY ? [0, 1] : [1, 0];

  // Otherwise keep the course sometimes, so corridors have runs
  if (heading && rng.next() < 0.4) return heading;
  return rng.next() < 0.5 ? [1, 0] : [0, 1];
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

  // The player's wager on the dungeon (a risk/reward modifier)
  const condition = typeof opts.condition === 'object' && opts.condition
    ? opts.condition
    : getCondition(opts.condition);

  // Difficulty sets the table; the theme and the condition lean on it
  const weights = { ...(TYPE_WEIGHTS[difficulty] || TYPE_WEIGHTS.medium) };
  for (const [type, tweak] of Object.entries(theme.weightTweaks)) {
    weights[type] = Math.max(0.1, (weights[type] || 0) + tweak);
  }
  for (const [type, tweak] of Object.entries(condition.weightTweaks || {})) {
    weights[type] = Math.max(0.1, (weights[type] || 0) + tweak);
  }

  // Difficulty sharpens the monsters themselves, not just the map
  const statScale = STAT_SCALE[difficulty] || 1;

  const spineLength = 8 + Math.floor(rng.next() * 4); // 8-11 rooms between entrance and boss
  const rooms = [];

  rooms.push(makeRoom(0, ROOM_TYPES.ENTRANCE, rng, theme, depth, statScale, condition));

  for (let i = 1; i <= spineLength; i++) {
    const type = weightedPick(rng, weights);
    rooms.push(makeRoom(i, type, rng, theme, depth, statScale, condition));
  }

  // Guarantees: at least one library and one shrine; a lab if wanted.
  // Themes add their own identity guarantees on top.
  ensureRoomType(rooms, ROOM_TYPES.LIBRARY, rng, theme, depth, statScale, condition, weights, theme.minLibraries || 1);
  ensureRoomType(rooms, ROOM_TYPES.SHRINE, rng, theme, depth, statScale, condition, weights);
  if (opts.wantLab || theme.alwaysLab) {
    ensureRoomType(rooms, ROOM_TYPES.LAB, rng, theme, depth, statScale, condition, weights);
    // A lab without materials is glassware and regret
    ensureRoomType(rooms, ROOM_TYPES.MATERIALS, rng, theme, depth, statScale, condition, weights, 1);
  }

  rooms.push(makeRoom(rooms.length, ROOM_TYPES.BOSS, rng, theme, depth, statScale, condition));

  /* ---- Spatial layout (procgen v3: footprints, not cells) ----------- */

  // The spine winds down and right, each chamber set far enough from
  // the last to leave a corridor between them. Direction persists a
  // little, so the dungeon reads as passages and turns rather than a
  // random scatter.
  rooms[0].x = 0;
  rooms[0].y = 0;
  const placed = [rooms[0]];
  let heading = [1, 0];
  for (let i = 1; i < rooms.length; i++) {
    heading = nextHeading(placed, rng, heading);
    const dir = placeAdjacent(rooms[i], rooms[i - 1], placed, rng, heading);
    if (dir) heading = dir;
    placed.push(rooms[i]);
  }

  const spine = rooms.map((_, i) => i);
  const edges = rooms.slice(1).map((_, i) => ({ a: i, b: i + 1, secret: false, kind: 'door' }));
  const branches = [];

  // Furnish the spine: pillars to fight behind, a brazier to shove
  // things into, a sarcophagus nobody should open (RoomFeatures).
  // Footprint decides how much fits, so this runs after the layout.
  for (const room of rooms) room.features = rollFeatures(room, rng, theme);

  // Branches: optional side rooms off the spine. Roughly half are
  // secret — a hidden door the rogue or the scholar might notice,
  // with a vault (NetHack-style riches) at the end.
  const branchCount = 1 + Math.floor(rng.next() * 2);   // 1-2 branches
  const BRANCH_TYPES = [
    ROOM_TYPES.TREASURE, ROOM_TYPES.MATERIALS, ROOM_TYPES.MONSTER, ROOM_TYPES.LIBRARY,
  ];

  for (let b = 0; b < branchCount; b++) {
    // A junction mid-spine (never the entrance or the boss)
    const junction = 1 + Math.floor(rng.next() * (spine.length - 2));

    const secret = rng.next() < 0.5;
    const chainLen = 1 + Math.floor(rng.next() * 2);    // 1-2 rooms deep
    const branchRooms = [];
    let prev = rooms[junction];
    let prevIdx = junction;
    let heading = null;

    for (let i = 0; i < chainLen; i++) {
      // The last room of a secret branch is the vault
      const isLast = i === chainLen - 1;
      const type = secret && isLast
        ? ROOM_TYPES.VAULT
        : BRANCH_TYPES[Math.floor(rng.next() * BRANCH_TYPES.length)];

      const room = makeRoom(rooms.length, type, rng, theme, depth, statScale, condition);
      const dir = placeAdjacent(room, prev, placed, rng, heading);
      if (!dir) break;    // boxed in; the dungeon keeps its secret
      heading = dir;
      room.secret = secret;
      room.discovered = !secret;   // secret rooms start unknown
      room.features = rollFeatures(room, rng, theme);
      rooms.push(room);
      placed.push(room);

      edges.push({
        a: prevIdx, b: room.index,
        secret: secret && i === 0,
        kind: secret && i === 0 ? 'secret' : 'arch',
      });
      branchRooms.push(room.index);
      prevIdx = room.index;
      prev = room;
    }

    if (branchRooms.length > 0) {
      branches.push({ junction, rooms: branchRooms, secret, consumed: false });
    }
  }

  /* ---- Trapdoors: the shaft in the floor ---------------------------- */
  // A vertical shortcut down the spine. Taking one skips the rooms
  // between (their loot and their danger both) and costs a fall. Half
  // are hidden under rubble — those the party can blunder into.
  const trapdoors = [];
  const trapdoorCount = rng.next() < 0.65 ? 1 : 0;
  for (let t = 0; t < trapdoorCount; t++) {
    // From somewhere in the first two thirds, to 2-4 rooms further on,
    // never past the boss (the boss is always fought, never skipped)
    const lastSpine = spine.length - 1;
    const from = 1 + Math.floor(rng.next() * Math.max(1, Math.floor(lastSpine * 0.6)));
    const to = Math.min(from + 2 + Math.floor(rng.next() * 3), lastSpine - 1);
    if (to <= from + 1) continue;
    trapdoors.push({
      from, to,
      secret: rng.next() < 0.5,
      fall: 3 + Math.floor(rng.next() * 3) + (depth - 1),
      consumed: false,
    });
    edges.push({ a: from, b: to, secret: false, kind: 'trapdoor' });
  }

  return new Dungeon(rooms, theme, condition, { spine, edges, branches, trapdoors });
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

function ensureRoomType(rooms, type, rng, theme, depth, statScale, condition, weights, minCount = 1) {
  const have = rooms.filter(r => r.type === type).length;
  let need = minCount - have;

  while (need > 0) {
    // Convert the type most over-represented against the theme's own
    // intent — a guarantee should never eat a theme's identity rooms
    // (the castle keeps its hoard; the caverns keep their disasters)
    const candidates = rooms.filter(r => !PROTECTED_TYPES.has(r.type));
    if (candidates.length === 0) break;
    let worstType = null;
    let worstScore = -1;
    for (const t of new Set(candidates.map(r => r.type))) {
      const score = candidates.filter(r => r.type === t).length / Math.max(0.1, weights?.[t] || 0.1);
      if (score > worstScore) { worstScore = score; worstType = t; }
    }
    const convertible = candidates.filter(r => r.type === worstType);
    const target = rng.pick(convertible);
    // Conversion happens before the layout pass, so the replacement
    // brings its own footprint (a shrine is shaped like a shrine, not
    // like the corridor it replaced) and gets placed with everything else
    const replacement = makeRoom(target.index, type, rng, theme, depth, statScale, condition);
    rooms[rooms.indexOf(target)] = replacement;
    need--;
  }
}

function makeRoom(index, type, rng, theme, depth = 1, statScale = 1, condition = {}) {
  const geometry = rollGeometry(type, rng);
  const room = {
    index,
    type,
    icon: ROOM_ICONS[type] || '⬛',
    cleared: false,
    // Footprint in tiles (procgen v3). x/y (the center) are assigned
    // by the layout pass once every room's size is known.
    w: geometry.w,
    h: geometry.h,
    shape: geometry.shape,
  };

  // Per-type payloads. Depth is the campaign's whetstone: deeper
  // dungeons hit harder and pay better. The condition is the player's
  // wager on top — meaner monsters, deeper traps, richer hoards.
  if (type === ROOM_TYPES.MONSTER) {
    room.monster = rollMonster(rng, false, theme, depth, statScale, condition);
  }
  if (type === ROOM_TYPES.BOSS) {
    room.monster = rollMonster(rng, true, theme, depth, statScale, condition);
  }
  if (type === ROOM_TYPES.TREASURE) {
    const base = (20 + Math.floor(rng.next() * 40)) * (1 + 0.2 * (depth - 1));
    room.gold = Math.round(base * (condition.goldMult || 1));
    room.mimicChance = 0.18;
  }
  if (type === ROOM_TYPES.VAULT) {
    // Whoever hid this room meant it: 3× a treasure room's haul,
    // and mimics love a vault
    const base = (60 + Math.floor(rng.next() * 120)) * (1 + 0.2 * (depth - 1));
    room.gold = Math.round(base * (condition.goldMult || 1));
    room.mimicChance = 0.28;
  }
  if (type === ROOM_TYPES.TRAP) {
    room.trapDamage = 4 + Math.floor(rng.next() * 4) + (theme.trapBonus || 0) + (depth - 1) + (condition.trapBonus || 0);
    // Each theme sets its own kind of snares
    const types = theme.trapTypes || ['spike'];
    room.trapType = types[Math.floor(rng.next() * types.length)];
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
    trapTypes: ['spike', 'alarm'],
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
    trapTypes: ['spike', 'poison'],
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
    trapTypes: ['fire', 'spike'],
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
    trapTypes: ['alarm', 'spike'],
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
    trapTypes: ['poison', 'fire'],
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

  castle: {
    id: 'castle', name: 'the Castle of the Vampire Lord', icon: '🦇',
    tagline: 'The invitation was in your dreams. The exit clause was not.',
    // Features: the Lord's treasury runs deep, his study is real, but
    // the chapels were desecrated centuries ago — heal elsewhere.
    weightTweaks: { treasure: 1.5, library: 0.5, monster: 0.5, shrine: -0.7, materials: -0.5, corridor: -0.3 },
    minLibraries: 1,
    trapTypes: ['alarm', 'spike'],
    monsters: [
      { kind: 'castle-thrall', name: 'a thrall footman, polite and bloodless', icon: '🧟', attack: 6, health: 13, undead: true, bribable: true },
      { kind: 'bat-cloud', name: 'a chittering cloud of castle bats', icon: '🦇', attack: 4, health: 9, undead: false },
      { kind: 'pale-hound', name: 'a pale hound with a red velvet collar', icon: '🐺', attack: 7, health: 12, undead: true },
      { kind: 'crimson-mist', name: 'a crimson mist that pours under the door', icon: '🌫️', attack: 8, health: 11, undead: true },
    ],
    bosses: [
      { kind: 'vampire-lord', name: 'the Vampire Lord, apologizing for the hour', icon: '🧛', attack: 13, health: 35, undead: true },
      { kind: 'the-bride', name: 'the Bride, who was here long before the Lord', icon: '👰', attack: 12, health: 33, undead: true },
    ],
  },

  bogcellar: {
    id: 'bogcellar', name: 'the Root Cellar of the Bog Witch', icon: '🧹',
    tagline: 'Everything down here is pickled, potted, or patient. Some of it is all three.',
    // Features: her stillroom always works, the shelves drip with
    // reagents, and the rot in the timbers bites like a trap.
    weightTweaks: { materials: 1.5, lab: 1, trap: 0.5, treasure: -0.5, corridor: -0.3 },
    alwaysLab: true,          // the witch's stillroom
    trapBonus: 1,             // rot, roots, and jars best left corked
    trapTypes: ['poison', 'spike'],
    monsters: [
      { kind: 'jar-imp', name: 'an imp still angry about the jar', icon: '🫙', attack: 5, health: 10, undead: false, bribable: true },
      { kind: 'pickled-thing', name: 'a pickled thing that finished pickling', icon: '🥒', attack: 6, health: 14, undead: true },
      { kind: 'root-golem', name: 'a golem of taproots and bad intentions', icon: '🌳', attack: 7, health: 18, undead: false, slow: true },
      { kind: 'bog-toad', name: 'a bog toad the size of a smokehouse', icon: '🐸', attack: 6, health: 16, undead: false, slow: true },
    ],
    bosses: [
      { kind: 'bog-witch', name: 'the Bog Witch, delighted to have company for dinner', icon: '🧙‍♀️', attack: 12, health: 34, undead: false, bribable: true },
      { kind: 'the-cauldron', name: 'the Cauldron, which learned to want', icon: '🍲', attack: 13, health: 36, undead: false },
    ],
  },

  icecaverns: {
    id: 'icecaverns', name: 'the Ice Caverns of the Mad Pyromancer', icon: '🧊',
    tagline: 'He moved here so the fires couldn\'t spread. The fires found other ambitions.',
    // Features: fire-and-ice makes the worst traps (flash-melt, refreeze)
    // and the caverns themselves keep failing — steam bursts, ceiling
    // thaw, cave-ins. Shrines froze over long ago.
    weightTweaks: { disaster: 1.5, trap: 1, shrine: -0.5, library: -0.3 },
    trapBonus: 2,             // flash-melted floors refreeze with edges
    trapTypes: ['fire', 'spike'],
    monsters: [
      { kind: 'frost-wisp', name: 'a frost wisp singed around the edges', icon: '❄️', attack: 5, health: 9, undead: false },
      { kind: 'ice-crawler', name: 'an ice crawler with too many pick-shaped legs', icon: '🕷️', attack: 6, health: 13, undead: false },
      { kind: 'thawed-dead', name: 'one of the thawed dead, steaming gently', icon: '🧟', attack: 7, health: 14, undead: true },
      { kind: 'cinder-imp', name: 'a cinder imp wearing a snowball like armor', icon: '🔥', attack: 6, health: 11, undead: false },
    ],
    bosses: [
      { kind: 'mad-pyromancer', name: 'the Mad Pyromancer, delighted someone flammable came', icon: '🧙', attack: 14, health: 32, undead: false },
      { kind: 'glacier-heart', name: 'the Glacier\'s Heart, half-melted and wholly furious', icon: '💠', attack: 12, health: 38, undead: false, slow: true },
    ],
  },
};

/**
 * Difficulty multiplier on monster stats — easy dungeons pull their
 * punches, nightmare dungeons do not.
 *
 * Recalibrated twice. First (2026-07-15) after the arcane fixes
 * (uniform character costing, prepared spells, mind scaling, the
 * wizard's second cast) made parties materially stronger: medium had
 * drifted to 99% wins. Again after sustained workings and the boss
 * unleash (RoomEncounters.SPELL_SUSTAIN_SHARE), which pushed hard from
 * 69% to 76%. Both times the target is the same curve the party cap
 * earned — roughly 88% medium, 71% hard, 45% nightmare — so that a
 * balance fix never silently doubles as a difficulty cut.
 */
export const STAT_SCALE = {
  easy: 0.9,
  medium: 1.32,
  hard: 1.60,
  nightmare: 1.98,
};

/* ------------------------------------------------------------------ */
/* Layouts — dungeons as data (the archive & editor foundation)        */
/* ------------------------------------------------------------------ */

/**
 * A dungeon flattened to plain JSON: everything needed to rebuild it
 * exactly — rooms with payloads, edges, spine, branches. This is what
 * the archive stores and the editor edits.
 */
export function serializeDungeon(dungeon) {
  return {
    themeId: dungeon.theme.id,
    conditionId: dungeon.condition?.id || 'none',
    rooms: dungeon.rooms.map(r => ({
      index: r.index, type: r.type, x: r.x, y: r.y,
      // Footprint travels with the layout, or a replayed dungeon would
      // be a different dungeon (procgen v3)
      w: r.w, h: r.h, shape: r.shape,
      ...(r.features?.length ? { features: [...r.features] } : {}),
      secret: !!r.secret,
      ...(r.monster ? { monster: { ...r.monster } } : {}),
      ...(r.gold !== undefined ? { gold: r.gold } : {}),
      ...(r.mimicChance !== undefined ? { mimicChance: r.mimicChance } : {}),
      ...(r.trapDamage !== undefined ? { trapDamage: r.trapDamage } : {}),
      // Trap kind decides what springing it costs — without it every
      // archived trap replayed as a generic spike pit (audit A3)
      ...(r.trapType !== undefined ? { trapType: r.trapType } : {}),
      ...(r.materials !== undefined ? { materials: r.materials } : {}),
    })),
    spine: [...dungeon.spine],
    edges: dungeon.edges.map(e => ({ ...e })),
    branches: dungeon.branches.map(b => ({ ...b, rooms: [...b.rooms], consumed: false })),
    trapdoors: dungeon.trapdoors.map(t => ({ ...t, consumed: false })),
  };
}

/**
 * Rebuild a live Dungeon from a serialized layout. Run state resets:
 * rooms uncleared, secrets sealed, monsters back at full health.
 */
export function dungeonFromLayout(layout) {
  const theme = DUNGEON_THEMES[layout.themeId] || DUNGEON_THEMES.delve;
  const condition = getCondition(layout.conditionId);
  const rooms = layout.rooms.map(r => ({
    ...r,
    icon: ROOM_ICONS[r.type] || '⬛',
    cleared: false,
    discovered: !r.secret,
    // Layouts archived before procgen v3 have no footprint; give them
    // their type's smallest one so old designs still draw and still fight
    ...(r.w ? {} : geometryFallback(r.type)),
    features: [...(r.features || [])],
    ...(r.monster ? { monster: { ...r.monster } } : {}),
  }));
  return new Dungeon(rooms, theme, condition, {
    spine: [...layout.spine],
    edges: layout.edges.map(e => ({ ...e, kind: e.kind || (e.secret ? 'secret' : 'door') })),
    branches: layout.branches.map(b => ({ ...b, rooms: [...b.rooms], consumed: false })),
    trapdoors: (layout.trapdoors || []).map(t => ({ ...t, consumed: false })),
  });
}

/** The smallest legal footprint for a room type (pre-v3 layouts). */
export function geometryFallback(type) {
  const spec = (ROOM_GEOMETRY[type] || ROOM_GEOMETRY.corridor)[0];
  return { w: spec.min[0], h: spec.min[1], shape: spec.shape };
}

/**
 * The default payload when the editor retypes a room — deterministic,
 * theme-appropriate, no RNG needed.
 */
export function defaultPayloadFor(type, theme, isBoss = false) {
  // A retyped room takes its new function's footprint too — a boss
  // chamber is not the size of the corridor it used to be
  const geo = geometryFallback(type);
  if (type === ROOM_TYPES.MONSTER) return { ...geo, monster: applyNature({ ...theme.monsters[0] }) };
  if (type === ROOM_TYPES.BOSS) return { ...geo, monster: applyNature({ ...theme.bosses[0], isBoss: true }) };
  if (type === ROOM_TYPES.TREASURE) return { ...geo, gold: 35, mimicChance: 0.18 };
  if (type === ROOM_TYPES.VAULT) return { ...geo, gold: 100, mimicChance: 0.28 };
  if (type === ROOM_TYPES.TRAP) return { ...geo, trapDamage: 5, trapType: (theme.trapTypes || ['spike'])[0] };
  if (type === ROOM_TYPES.MATERIALS) return { ...geo, materials: 2 };
  return geo;
}

/**
 * Content packs may register whole new dungeon themes (DLC).
 */
export function registerTheme(theme) {
  if (!theme?.id || !theme.monsters?.length || !theme.bosses?.length) {
    throw new Error('a theme needs an id, monsters, and at least one boss');
  }
  DUNGEON_THEMES[theme.id] = theme;
  return theme;
}

function rollMonster(rng, isBoss, theme, depth = 1, statScale = 1, condition = {}) {
  const pool = isBoss ? theme.bosses : theme.monsters;
  const monster = applyNature({ ...rng.pick(pool) });

  // The player's wager reshapes the foe: bosses and rank-and-file
  // scale separately (Monster Swarms thins the many; the Long Throne
  // fattens the one).
  const condAtk = (isBoss ? condition.bossAttackMult : condition.monsterAttackMult) || 1;
  const condHp = (isBoss ? condition.bossHealthMult : condition.monsterHealthMult) || 1;

  // Depth: things get meaner the farther from daylight
  const depthFactor = 1 + 0.15 * (depth - 1);
  monster.attack = Math.max(1, Math.round(monster.attack * depthFactor * statScale * condAtk));
  monster.health = Math.max(1, Math.round(monster.health * (1 + 0.2 * (depth - 1)) * statScale * condHp));
  if (isBoss) monster.isBoss = true;

  return monster;
}
