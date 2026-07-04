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
  constructor(rooms) {
    this.rooms = rooms; // Array of room objects in order
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
 * @param opts        { wantLab: bool } — guarantee a lab when the
 *                    party drafted an alchemist
 */
export function generateDungeon(seed, difficulty = 'medium', opts = {}) {
  const rng = new SeededRandom(seed);
  const weights = TYPE_WEIGHTS[difficulty] || TYPE_WEIGHTS.medium;

  const spineLength = 8 + Math.floor(rng.next() * 4); // 8-11 rooms between entrance and boss
  const rooms = [];

  rooms.push(makeRoom(0, ROOM_TYPES.ENTRANCE, rng));

  for (let i = 1; i <= spineLength; i++) {
    const type = weightedPick(rng, weights);
    rooms.push(makeRoom(i, type, rng));
  }

  // Guarantees: at least one library and one shrine; a lab if wanted
  ensureRoomType(rooms, ROOM_TYPES.LIBRARY, rng);
  ensureRoomType(rooms, ROOM_TYPES.SHRINE, rng);
  if (opts.wantLab) {
    ensureRoomType(rooms, ROOM_TYPES.LAB, rng);
    // A lab without materials is glassware and regret
    ensureRoomType(rooms, ROOM_TYPES.MATERIALS, rng, 1);
  }

  rooms.push(makeRoom(rooms.length, ROOM_TYPES.BOSS, rng));

  // Depth positions for the renderer (a winding descent)
  let x = 0;
  let y = 0;
  for (const room of rooms) {
    room.x = x;
    room.y = y;
    if (rng.next() < 0.5) x += 1; else y += 1;
  }

  return new Dungeon(rooms);
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

function ensureRoomType(rooms, type, rng, minCount = 1) {
  const have = rooms.filter(r => r.type === type).length;
  let need = minCount - have;

  while (need > 0) {
    const convertible = rooms.filter(r => !PROTECTED_TYPES.has(r.type));
    if (convertible.length === 0) break;
    const target = rng.pick(convertible);
    const replacement = makeRoom(target.index, type, rng);
    replacement.x = target.x;
    replacement.y = target.y;
    rooms[rooms.indexOf(target)] = replacement;
    need--;
  }
}

function makeRoom(index, type, rng) {
  const room = {
    index,
    type,
    icon: ROOM_ICONS[type] || '⬛',
    cleared: false,
  };

  // Per-type payloads
  if (type === ROOM_TYPES.MONSTER) {
    room.monster = rollMonster(rng, false);
  }
  if (type === ROOM_TYPES.BOSS) {
    room.monster = rollMonster(rng, true);
  }
  if (type === ROOM_TYPES.TREASURE) {
    room.gold = 20 + Math.floor(rng.next() * 40);
    room.mimicChance = 0.18;
  }
  if (type === ROOM_TYPES.TRAP) {
    room.trapDamage = 4 + Math.floor(rng.next() * 4);
  }
  if (type === ROOM_TYPES.MATERIALS) {
    room.materials = 1 + Math.floor(rng.next() * 2);
  }

  return room;
}

const MONSTERS = [
  { kind: 'rat-swarm', name: 'a chittering rat swarm', icon: '🐀', attack: 4, health: 10, undead: false },
  { kind: 'skeleton', name: 'a rattling skeleton patrol', icon: '💀', attack: 6, health: 14, undead: true },
  { kind: 'goblin-gang', name: 'a goblin toll-gang', icon: '👺', attack: 5, health: 12, undead: false, bribable: true },
  { kind: 'gelatinous', name: 'a gelatinous horror', icon: '🟩', attack: 5, health: 18, undead: false, slow: true },
  { kind: 'wraith', name: 'a cold-eyed wraith', icon: '👻', attack: 8, health: 12, undead: true },
];

const BOSSES = [
  { kind: 'dragon-whelp', name: 'the Dragon Whelp of the Deep Vault', icon: '🐉', attack: 12, health: 34, undead: false },
  { kind: 'lich', name: 'the Lich of the Last Library', icon: '☠️', attack: 10, health: 30, undead: true },
  { kind: 'ogre-king', name: 'the Ogre King Under the Stair', icon: '👹', attack: 14, health: 38, undead: false, bribable: true },
];

function rollMonster(rng, isBoss) {
  const pool = isBoss ? BOSSES : MONSTERS;
  return { ...rng.pick(pool) };
}
