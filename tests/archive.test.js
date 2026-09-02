/**
 * Tests for the Dungeon Archive — designs kept after the game,
 * re-enterable and editable.
 */

import { strict as assert } from 'assert';
import {
  generateDungeon, serializeDungeon, dungeonFromLayout, defaultPayloadFor,
  DUNGEON_THEMES, ROOM_TYPES,
} from '../src/world/DungeonGen.js';
import { ArchiveManager } from '../src/game/Archive.js';
import { Simulator } from '../src/sim/Simulator.js';
import { retypeRoom } from '../src/ui/ArchiveUI.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);

/** In-memory localStorage stand-in */
function fakeStorage() {
  const m = new Map();
  return { getItem: k => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) };
}

describe('Layouts as data', () => {
  test('serialize → rebuild is exact (rooms, edges, secrets)', () => {
    const d = generateDungeon('arch-1', 'medium', { theme: 'castle', condition: 'traps' });
    const layout = serializeDungeon(d);
    const rebuilt = dungeonFromLayout(layout);

    assert.deepEqual(
      rebuilt.rooms.map(r => [r.type, r.x, r.y, !!r.secret]),
      d.rooms.map(r => [r.type, r.x, r.y, !!r.secret]),
    );
    assert.deepEqual(rebuilt.edges, d.edges);
    assert.deepEqual(rebuilt.spine, d.spine);
    assert.equal(rebuilt.theme.id, 'castle');
    assert.equal(rebuilt.condition.id, 'traps');
  });

  test('no field of a room is lost in the round trip', () => {
    // The enumerated check above only compares the fields somebody
    // thought to list, which is how trapType, and later floor, wing and
    // descendsTo, all went missing from archived dungeons. This one
    // compares everything and names what it does not expect to survive.
    const RESET = new Set(['cleared', 'discovered', 'visits', 'fled', 'icon']);
    const missing = new Set();
    for (const seed of ['rt-1', 'rt-2', 'rt-3', 'rt-4', 'rt-5', 'rt-6']) {
      const d = generateDungeon(seed, 'hard', { depth: 3 });
      const rebuilt = dungeonFromLayout(serializeDungeon(d));
      d.rooms.forEach((room, i) => {
        const back = rebuilt.rooms[i];
        for (const [key, value] of Object.entries(room)) {
          if (RESET.has(key) || value === undefined) continue;
          const same = JSON.stringify(back[key]) === JSON.stringify(value);
          if (!same) missing.add(`${room.type}.${key} (${JSON.stringify(value)} → ${JSON.stringify(back[key])})`);
        }
      });
    }
    assert.deepEqual([...missing].sort(), [],
      `the archive drops room fields: ${[...missing].join('; ')}`);
  });

  test('an archived dungeon keeps its floors', () => {
    const d = generateDungeon('arch-floors', 'hard', { depth: 3 });
    const rebuilt = dungeonFromLayout(serializeDungeon(d));
    const floors = rs => rs.map(r => r.floor || 0);
    assert.deepEqual(floors(rebuilt.rooms), floors(d.rooms), 'every room keeps its floor');
    const boss = rebuilt.rooms.find(r => r.type === 'boss');
    assert.equal(boss.floor, Math.max(...floors(rebuilt.rooms)), 'the boss is still at the bottom');
    const stairs = rebuilt.rooms.filter(r => r.type === 'stairs');
    assert.ok(stairs.every(r => r.descendsTo === (r.floor || 0) + 1), 'stairs still know where they go');
  });

  test('the editor cannot retype away the structure', () => {
    // Two kinds of room the player does not get to redecorate: the
    // way in and the throne room (v8: stairs went with the floors).
    const layout = serializeDungeon(generateDungeon('arch-retype', 'hard'));
    const find = type => layout.rooms.find(r => r.type === type);

    assert.equal(retypeRoom(layout, find('entrance').index, 'monster'), false, 'not the entrance');
    assert.equal(retypeRoom(layout, find('boss').index, 'corridor'), false, 'nor the boss');

    const ordinary = layout.rooms.find(r => !['entrance', 'boss'].includes(r.type));
    assert.equal(retypeRoom(layout, ordinary.index, 'treasure'), true, 'an ordinary room still retypes');
    assert.equal(layout.rooms.find(r => r.index === ordinary.index).type, 'treasure');
  });

  test('rebuilding resets the run state: sealed secrets, uncleared rooms', () => {
    const d = generateDungeon('arch-2', 'medium', { theme: 'delve' });
    // Simulate a played-through dungeon
    for (const r of d.rooms) { r.cleared = true; if (r.secret) r.discovered = true; }
    const rebuilt = dungeonFromLayout(serializeDungeon(d));
    assert.ok(rebuilt.rooms.every(r => !r.cleared), 'rooms uncleared');
    assert.ok(rebuilt.rooms.filter(r => r.secret).every(r => !r.discovered), 'secrets resealed');
    assert.ok(rebuilt.branches.every(b => !b.consumed), 'branches fresh');
  });

  test('a layout survives JSON (the storage round trip)', () => {
    const d = generateDungeon('arch-3', 'hard', { theme: 'madlab' });
    const layout = JSON.parse(JSON.stringify(serializeDungeon(d)));
    const rebuilt = dungeonFromLayout(layout);
    assert.equal(rebuilt.rooms.length, d.rooms.length);
  });

  test('the simulator replays a layout exactly', () => {
    const original = generateDungeon('arch-4', 'medium', { theme: 'icecaverns' });
    const layout = serializeDungeon(original);

    const sim = new Simulator([fighter], 'ignored-seed', 'medium', { layout });
    assert.deepEqual(sim.dungeon.rooms.map(r => r.type), original.rooms.map(r => r.type));
  });

  test('retyping a room gets a sane default payload', () => {
    const theme = DUNGEON_THEMES.castle;
    assert.ok(defaultPayloadFor(ROOM_TYPES.MONSTER, theme).monster.name);
    assert.ok(defaultPayloadFor(ROOM_TYPES.BOSS, theme).monster.isBoss);
    assert.ok(defaultPayloadFor(ROOM_TYPES.VAULT, theme).gold > defaultPayloadFor(ROOM_TYPES.TREASURE, theme).gold);
    // A retyped room also takes its new function's footprint, so a
    // corridor promoted to a shrine is shaped like a shrine
    const shrine = defaultPayloadFor(ROOM_TYPES.SHRINE, theme);
    assert.ok(shrine.w > 0 && shrine.h > 0 && shrine.shape, 'geometry comes with the type');
    const bossFloor = defaultPayloadFor(ROOM_TYPES.BOSS, theme);
    const vaultFloor = defaultPayloadFor(ROOM_TYPES.VAULT, theme);
    assert.ok(bossFloor.w * bossFloor.h > vaultFloor.w * vaultFloor.h,
      'a boss chamber dwarfs a vault');
  });
});

describe('The archive', () => {
  test('saves, lists, fetches, and deletes designs', () => {
    const a = new ArchiveManager(fakeStorage());
    const layout = serializeDungeon(generateDungeon('arch-5', 'easy', { theme: 'delve' }));
    const rec = a.save({ name: 'First Delve', layout, seed: 'arch-5', outcome: { victory: true, score: 300 } });
    assert.ok(rec.id && rec.date);
    assert.equal(a.list().length, 1);
    assert.equal(a.get(rec.id).name, 'First Delve');
    assert.ok(a.remove(rec.id));
    assert.equal(a.list().length, 0);
  });

  test('persists through storage and reloads', () => {
    const storage = fakeStorage();
    const a = new ArchiveManager(storage);
    const layout = serializeDungeon(generateDungeon('arch-6', 'easy', { theme: 'castle' }));
    a.save({ name: 'Kept', layout, seed: 'arch-6', outcome: {} });
    const b = new ArchiveManager(storage);   // a fresh session
    assert.equal(b.list().length, 1);
    assert.equal(b.list()[0].name, 'Kept');
  });

  test('caps at 30 but protects player-made designs', () => {
    const a = new ArchiveManager(fakeStorage());
    const layout = serializeDungeon(generateDungeon('arch-7', 'easy', { theme: 'delve' }));
    const custom = a.save({ name: 'My Design', layout, custom: true, outcome: {} });
    for (let i = 0; i < 35; i++) a.save({ name: `run ${i}`, layout, outcome: {} });
    assert.ok(a.list().length <= 30, 'capped');
    assert.ok(a.get(custom.id), 'the player\'s design survived the trim');
  });

  test('the editor updates a design in place', () => {
    const a = new ArchiveManager(fakeStorage());
    const layout = serializeDungeon(generateDungeon('arch-8', 'easy', { theme: 'delve' }));
    const rec = a.save({ name: 'Draft', layout, outcome: {} });
    a.update(rec.id, { name: 'Renamed', custom: true });
    assert.equal(a.get(rec.id).name, 'Renamed');
    assert.equal(a.get(rec.id).custom, true);
  });
});

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(`  ${err.message}`);
    throw err;
  }
}

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}
