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
import { Campaign } from '../src/game/Campaign.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);

/** In-memory localStorage stand-in */
function fakeStorage() {
  const m = new Map();
  return { getItem: k => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) };
}

describe('Layouts as data', () => {
  test('serialize → rebuild is exact (rooms, edges, secrets)', () => {
    const d = generateDungeon('arch-1', 'medium', { theme: 'crypt', condition: 'traps' });
    const layout = serializeDungeon(d);
    const rebuilt = dungeonFromLayout(layout);

    assert.deepEqual(
      rebuilt.rooms.map(r => [r.type, r.x, r.y, !!r.secret]),
      d.rooms.map(r => [r.type, r.x, r.y, !!r.secret]),
    );
    assert.deepEqual(rebuilt.edges, d.edges);
    assert.deepEqual(rebuilt.spine, d.spine);
    assert.equal(rebuilt.theme.id, 'crypt');
    assert.equal(rebuilt.condition.id, 'traps');
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

  test('the simulator and campaign replay a layout exactly', () => {
    const original = generateDungeon('arch-4', 'medium', { theme: 'library' });
    const layout = serializeDungeon(original);

    const sim = new Simulator([fighter], 'ignored-seed', 'medium', { layout });
    assert.deepEqual(sim.dungeon.rooms.map(r => r.type), original.rooms.map(r => r.type));

    const campaign = new Campaign([fighter], { seed: 'c', layout });
    const d1 = campaign.nextDelve();
    assert.deepEqual(d1.dungeon.rooms.map(r => r.type), original.rooms.map(r => r.type), 'depth 1 replays the design');
  });

  test('retyping a room gets a sane default payload', () => {
    const theme = DUNGEON_THEMES.crypt;
    assert.ok(defaultPayloadFor(ROOM_TYPES.MONSTER, theme).monster.name);
    assert.ok(defaultPayloadFor(ROOM_TYPES.BOSS, theme).monster.isBoss);
    assert.ok(defaultPayloadFor(ROOM_TYPES.VAULT, theme).gold > defaultPayloadFor(ROOM_TYPES.TREASURE, theme).gold);
    assert.deepEqual(defaultPayloadFor(ROOM_TYPES.SHRINE, theme), {});
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
    const layout = serializeDungeon(generateDungeon('arch-6', 'easy', { theme: 'crypt' }));
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
