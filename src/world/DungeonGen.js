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
  SHOP: 'shop',     // a peddler's stall in the dark (Spelunky tradition)
  ALTAR: 'altar',   // a god that trades in offerings (DCSS tradition)
  STAIRS: 'stairs', // the way down to the next floor (multi-floor, Phase 5)
};

const ROOM_ICONS = {
  entrance: '🚪', corridor: '⬛', monster: '👹', trap: '⚠️',
  treasure: '💰', library: '📚', shrine: '🕯️', lab: '⚗️',
  materials: '🌿', disaster: '🌋', boss: '🐉', vault: '💎',
  shop: '🪙', altar: '⚖️', stairs: '🪜',
};

/**
 * Room type distribution by difficulty (spine rooms, excluding
 * entrance/boss). Weights, not counts.
 */
const TYPE_WEIGHTS = {
  easy: { monster: 2, trap: 1, treasure: 2, library: 1, shrine: 1.5, lab: 1, materials: 2, disaster: 0.5, corridor: 1, shop: 0.7, altar: 0.6 },
  medium: { monster: 3, trap: 1.5, treasure: 2, library: 1, shrine: 1, lab: 1, materials: 1.5, disaster: 1, corridor: 1, shop: 0.7, altar: 0.7 },
  hard: { monster: 4, trap: 2.5, treasure: 1.5, library: 1, shrine: 0.7, lab: 1, materials: 1, disaster: 2, corridor: 0.5, shop: 0.5, altar: 0.8 },
  nightmare: { monster: 5, trap: 3, treasure: 1.5, library: 0.8, shrine: 0.5, lab: 1, materials: 1, disaster: 3, corridor: 0.3, shop: 0.4, altar: 0.9 },
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
    this.edges = layout.edges                              // [{a, b, secret}] between room indexes
      || rooms.slice(1).map((_, i) => ({ a: i, b: i + 1, secret: false }));
    this.branches = layout.branches || [];                 // [{junction, rooms:[idx], secret, consumed}]
  }
  getRoom(index) {
    return this.rooms[index] || null;
  }
  get length() {
    return this.rooms.length;
  }
  /** How many floors this dungeon stacks (single-floor legacy = 1). */
  get floorCount() {
    return 1 + Math.max(0, ...this.rooms.map(r => r.floor || 0));
  }
  /** The unconsumed branch hanging off this room, if any. */
  branchAt(roomIndex) {
    return this.branches.find(b => b.junction === roomIndex && !b.consumed) || null;
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
 *                      depth: number,   — campaign depth (1 = first
 *                                         dungeon); deeper is meaner
 *                      floors: number } — pin the floor count; omit to
 *                                         let difficulty dig (easy 1,
 *                                         hard 2, nightmare 2-3)
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

  // Floors: meaner dungeons dig deeper (multi-floor, Phase 5). Every
  // floor down, the foes and the payouts both climb. No rng is spent
  // when the caller pins the count — pinned generations stay
  // sequence-identical for comparisons and replays.
  const floors = opts.floors || {
    easy: 1,
    medium: () => (rng.next() < 0.4 ? 2 : 1),
    hard: 2,
    nightmare: () => (rng.next() < 0.5 ? 3 : 2),
  }[difficulty] || 1;
  const floorCount = typeof floors === 'function' ? floors() : floors;

  const rooms = [];
  rooms.push(makeRoom(0, ROOM_TYPES.ENTRANCE, rng, theme, depth, statScale, condition, 0));

  for (let f = 0; f < floorCount; f++) {
    // A single-floor dungeon keeps the classic 8-11 room spine;
    // stacked floors run shorter segments so the whole delve stays sane
    const segLength = floorCount === 1
      ? 8 + Math.floor(rng.next() * 4)
      : 5 + Math.floor(rng.next() * 3);
    for (let i = 0; i < segLength; i++) {
      const type = weightedPick(rng, weights);
      rooms.push(makeRoom(rooms.length, type, rng, theme, depth, statScale, condition, f));
    }
    if (f < floorCount - 1) {
      rooms.push(makeRoom(rooms.length, ROOM_TYPES.STAIRS, rng, theme, depth, statScale, condition, f));
    }
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

  rooms.push(makeRoom(rooms.length, ROOM_TYPES.BOSS, rng, theme, depth, statScale, condition, floorCount - 1));

  /* ---- Spatial layout (procgen v2 + cave modes) ---------------------- */

  // The spine walks the grid (the guaranteed critical path). Built
  // dungeons wind neatly down and right; caves are walked by an agent
  // digger (PCG ch.3): the Cinder Galleries tunnel long and stubborn,
  // grottos curl back on themselves. Each floor lays out in its own
  // horizontal band, so floors never collide and the minimap reads
  // them as strata.
  const layoutMode = theme.layoutMode || 'winding';
  const occupied = new Set();
  let x = 0;
  let y = 0;
  let dir = [1, 0];
  let laidFloor = 0;
  for (const room of rooms) {
    if ((room.floor || 0) !== laidFloor) {
      laidFloor = room.floor || 0;
      x = 0;
      y = laidFloor * 12;
      dir = [1, 0];
    }
    room.x = x;
    room.y = y;
    occupied.add(`${x},${y}`);
    [x, y, dir] = nextCell(layoutMode, x, y, dir, laidFloor, occupied, rng);
  }

  const spine = rooms.map((_, i) => i);
  const edges = rooms.slice(1).map((_, i) => ({ a: i, b: i + 1, secret: false }));
  const branches = [];

  // Branches: optional side rooms off the spine. Roughly half are
  // secret — a hidden door the rogue or the scholar might notice,
  // with a vault (NetHack-style riches) at the end. Half the open
  // ones are locked instead (the PCG book's lock-and-key pattern):
  // an iron door guarding a vault, its key stashed earlier on the
  // spine for whoever clears that room.
  const branchCount = 1 + Math.floor(rng.next() * 2);   // 1-2 branches
  const BRANCH_TYPES = [
    ROOM_TYPES.TREASURE, ROOM_TYPES.MATERIALS, ROOM_TYPES.MONSTER, ROOM_TYPES.LIBRARY,
  ];
  const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  // Junctions sit mid-spine — never the entrance, the boss, or a
  // staircase (nobody hides a door in a stairwell)
  const junctionPool = spine.slice(1, -1).filter(i => rooms[i].type !== ROOM_TYPES.STAIRS);

  for (let b = 0; b < branchCount; b++) {
    if (junctionPool.length === 0) break;
    const junction = rng.pick(junctionPool);
    const jRoom = rooms[junction];

    // Find a free cell next to the junction
    const dirs = rng.shuffle(DIRS);
    const dir = dirs.find(([dx, dy]) => !occupied.has(`${jRoom.x + dx},${jRoom.y + dy}`));
    if (!dir) continue; // boxed in; the dungeon keeps its secret

    const secret = rng.next() < 0.5;
    // A locked door needs spine ahead of it to hide the key in
    const locked = !secret && junction >= 2 && rng.next() < 0.5;
    const chainLen = 1 + Math.floor(rng.next() * 2);    // 1-2 rooms deep
    const branchRooms = [];
    let px = jRoom.x;
    let py = jRoom.y;
    let prevIdx = junction;

    const jBand = (jRoom.floor || 0) * 12;
    for (let i = 0; i < chainLen; i++) {
      const nx = px + dir[0];
      const ny = py + dir[1];
      if (occupied.has(`${nx},${ny}`)) break;
      // A detour may lean one cell past its stratum, never two
      if (ny < jBand - 1 || ny > jBand + 11) break;

      // The last room of a secret or locked branch is the vault
      const isLast = i === chainLen - 1;
      const type = (secret || locked) && isLast
        ? ROOM_TYPES.VAULT
        : BRANCH_TYPES[Math.floor(rng.next() * BRANCH_TYPES.length)];

      const room = makeRoom(rooms.length, type, rng, theme, depth, statScale, condition, jRoom.floor || 0);
      room.x = nx;
      room.y = ny;
      room.secret = secret;
      room.discovered = !secret;   // secret rooms start unknown; locked doors are visible
      rooms.push(room);
      occupied.add(`${nx},${ny}`);

      edges.push({ a: prevIdx, b: room.index, secret: secret && i === 0, locked: locked && i === 0 });
      branchRooms.push(room.index);
      prevIdx = room.index;
      px = nx;
      py = ny;
    }

    if (branchRooms.length > 0) {
      const branch = { junction, rooms: branchRooms, secret, locked, consumed: false };
      if (locked) {
        // The key waits somewhere on the spine before the door
        // (a count — two doors may stash keys in the same room)
        const keyRoom = 1 + Math.floor(rng.next() * (junction - 1));
        rooms[keyRoom].hasKey = (rooms[keyRoom].hasKey || 0) + 1;
        branch.keyRoom = keyRoom;
      }
      branches.push(branch);
    }
  }

  return new Dungeon(rooms, theme, condition, { spine, edges, branches });
}

/**
 * The next cell for the spine walker. 'winding' is the classic
 * built-dungeon descent (right or down, never back). Cave modes run
 * an agent digger: it prefers its heading ('digger' tunnels long,
 * 'grotto' turns constantly), never reverses, stays in its floor's
 * band, and never re-digs a cell. Boxed in, it tunnels east until
 * daylight — the grid is infinite that way.
 */
function nextCell(mode, x, y, dir, floor, occupied, rng) {
  if (mode !== 'digger' && mode !== 'grotto') {
    return rng.next() < 0.5 ? [x + 1, y, [1, 0]] : [x, y + 1, [0, 1]];
  }
  const persist = mode === 'digger' ? 4 : 1;
  const yMin = floor * 12;
  const yMax = floor * 12 + 10;
  const candidates = [
    { d: dir, w: persist },
    { d: [dir[1], dir[0]], w: 2 },
    { d: [-dir[1], -dir[0]], w: 2 },
  ].filter(({ d }) => {
    const ny = y + d[1];
    return ny >= yMin && ny <= yMax && !occupied.has(`${x + d[0]},${ny}`);
  });
  if (candidates.length > 0) {
    const total = candidates.reduce((s, c) => s + c.w, 0);
    let pick = rng.next() * total;
    for (const c of candidates) {
      pick -= c.w;
      if (pick <= 0) return [x + c.d[0], y + c.d[1], c.d];
    }
  }
  let nx = x + 1;
  while (occupied.has(`${nx},${y}`)) nx++;
  return [nx, y, [1, 0]];
}

/**
 * Guarantee at least `minCount` rooms of a type exist by converting
 * random convertible spine rooms (never the entrance, never rooms
 * of other guaranteed types)
 */
const PROTECTED_TYPES = new Set([
  ROOM_TYPES.ENTRANCE, ROOM_TYPES.BOSS, ROOM_TYPES.STAIRS,
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
    const replacement = makeRoom(target.index, type, rng, theme, depth, statScale, condition, target.floor || 0);
    replacement.x = target.x;
    replacement.y = target.y;
    rooms[rooms.indexOf(target)] = replacement;
    need--;
  }
}

function makeRoom(index, type, rng, theme, depth = 1, statScale = 1, condition = {}, floor = 0) {
  const room = {
    index,
    type,
    floor,
    icon: ROOM_ICONS[type] || '⬛',
    cleared: false,
  };

  // Every floor down, the dungeon means it a little more: foes hit
  // harder and hoards run richer on the lower strata
  const floorMult = 1 + 0.12 * floor;
  const floorGold = 1 + 0.15 * floor;

  // Per-type payloads. Depth is the campaign's whetstone: deeper
  // dungeons hit harder and pay better. The condition is the player's
  // wager on top — meaner monsters, deeper traps, richer hoards.
  if (type === ROOM_TYPES.MONSTER) {
    room.monster = rollMonster(rng, false, theme, depth, statScale * floorMult, condition, index);
  }
  if (type === ROOM_TYPES.BOSS) {
    room.monster = rollMonster(rng, true, theme, depth, statScale * floorMult, condition, index);
  }
  if (type === ROOM_TYPES.TREASURE) {
    const base = (20 + Math.floor(rng.next() * 40)) * (1 + 0.2 * (depth - 1)) * floorGold;
    room.gold = Math.round(base * (condition.goldMult || 1));
    room.mimicChance = 0.18;
  }
  if (type === ROOM_TYPES.VAULT) {
    // Whoever hid this room meant it: 3× a treasure room's haul,
    // and mimics love a vault
    const base = (60 + Math.floor(rng.next() * 120)) * (1 + 0.2 * (depth - 1)) * floorGold;
    room.gold = Math.round(base * (condition.goldMult || 1));
    room.mimicChance = 0.28;
  }
  if (type === ROOM_TYPES.TRAP) {
    room.trapDamage = 4 + Math.floor(rng.next() * 4) + (theme.trapBonus || 0) + (depth - 1) + Math.floor(floor / 2) + (condition.trapBonus || 0);
    // Each theme sets its own kind of snares
    const types = theme.trapTypes || ['spike'];
    room.trapType = types[Math.floor(rng.next() * types.length)];
  }
  if (type === ROOM_TYPES.MATERIALS) {
    room.materials = 1 + Math.floor(rng.next() * 2);
  }
  if (type === ROOM_TYPES.SHOP) {
    // The peddler's stall: prices jitter per stall and climb with depth
    const depthTax = (depth - 1) * 2;
    room.stock = [
      { id: 'draught', name: 'a healing draught', icon: '🧪', price: 10 + Math.floor(rng.next() * 5) + depthTax },
      { id: 'materials', name: 'a bundle of materials', icon: '🌿', price: 7 + Math.floor(rng.next() * 4) + depthTax },
      { id: 'key', name: 'a heavy iron key', icon: '🗝️', price: 18 + Math.floor(rng.next() * 8) + depthTax },
    ];
  }
  if (type === ROOM_TYPES.ALTAR) {
    // What the god considers a respectful offering
    room.demand = 15 + Math.floor(rng.next() * 15) + 5 * (depth - 1);
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
    weightTweaks: { monster: 1, shrine: 0.5, treasure: -0.5, altar: 0.5, shop: -0.3 },
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
    layoutMode: 'digger',   // lava tubes: long stubborn tunnels
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
    weightTweaks: { lab: 1.5, materials: 1, disaster: 0.5, shrine: -0.5, shop: 0.4 },
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
    layoutMode: 'digger',     // root-runs: the cellar was dug, not built
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
    layoutMode: 'grotto',     // melt-chambers curl back on themselves
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
 * punches, nightmare dungeons do not
 */
export const STAT_SCALE = {
  easy: 0.85,
  medium: 1.0,
  hard: 1.3,
  nightmare: 1.7,
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
      floor: r.floor || 0,
      secret: !!r.secret,
      ...(r.monster ? { monster: { ...r.monster } } : {}),
      ...(r.gold !== undefined ? { gold: r.gold } : {}),
      ...(r.mimicChance !== undefined ? { mimicChance: r.mimicChance } : {}),
      ...(r.trapDamage !== undefined ? { trapDamage: r.trapDamage } : {}),
      ...(r.materials !== undefined ? { materials: r.materials } : {}),
      ...(r.hasKey ? { hasKey: r.hasKey } : {}),
      // Stock re-shelves for a re-delve: the sold flags stay behind
      ...(r.stock ? { stock: r.stock.map(({ sold, ...good }) => ({ ...good })) } : {}),
      ...(r.demand !== undefined ? { demand: r.demand } : {}),
    })),
    spine: [...dungeon.spine],
    edges: dungeon.edges.map(e => ({ ...e })),
    branches: dungeon.branches.map(b => ({ ...b, rooms: [...b.rooms], consumed: false })),
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
    ...(r.monster ? { monster: { ...r.monster } } : {}),
    ...(r.stock ? { stock: r.stock.map(({ sold, ...good }) => ({ ...good })) } : {}),
  }));
  return new Dungeon(rooms, theme, condition, {
    spine: [...layout.spine],
    edges: layout.edges.map(e => ({ ...e })),
    branches: layout.branches.map(b => ({ ...b, rooms: [...b.rooms], consumed: false })),
  });
}

/**
 * The default payload when the editor retypes a room — deterministic,
 * theme-appropriate, no RNG needed.
 */
export function defaultPayloadFor(type, theme, isBoss = false) {
  if (type === ROOM_TYPES.MONSTER) return { monster: applyNature({ ...theme.monsters[0] }) };
  if (type === ROOM_TYPES.BOSS) return { monster: applyNature({ ...theme.bosses[0], isBoss: true }) };
  if (type === ROOM_TYPES.TREASURE) return { gold: 35, mimicChance: 0.18 };
  if (type === ROOM_TYPES.VAULT) return { gold: 100, mimicChance: 0.28 };
  if (type === ROOM_TYPES.TRAP) return { trapDamage: 5, trapType: (theme.trapTypes || ['spike'])[0] };
  if (type === ROOM_TYPES.MATERIALS) return { materials: 2 };
  if (type === ROOM_TYPES.SHOP) {
    return {
      stock: [
        { id: 'draught', name: 'a healing draught', icon: '🧪', price: 12 },
        { id: 'materials', name: 'a bundle of materials', icon: '🌿', price: 9 },
        { id: 'key', name: 'a heavy iron key', icon: '🗝️', price: 22 },
      ],
    };
  }
  if (type === ROOM_TYPES.ALTAR) return { demand: 25 };
  return {};
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

function rollMonster(rng, isBoss, theme, depth = 1, statScale = 1, condition = {}, roomIndex = 0) {
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

  // Elite veterans: roughly one rank-and-file monster in eight has
  // survived other parties, and it shows. Hashed off the room index —
  // no rng spent, so layouts stay sequence-identical.
  if (!isBoss && (roomIndex * 7 + depth * 3) % 8 === 0) {
    monster.elite = true;
    monster.name = `a veteran ${monster.name.replace(/^(a|an|the)\s+/i, '')}`;
    monster.attack = Math.round(monster.attack * 1.3);
    monster.health = Math.round(monster.health * 1.4);
  }

  return monster;
}
