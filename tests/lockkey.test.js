/**
 * Tests for lock-and-key — the PCG book's pattern over our branch
 * rooms: an iron door guarding a vault, its key stashed earlier on
 * the spine, and the rogue's fingers as the fallback plan.
 */

import { strict as assert } from 'assert';
import { generateDungeon, serializeDungeon, dungeonFromLayout, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { Party } from '../src/agents/Party.js';
import { pickLock } from '../src/encounters/RoomEncounters.js';
import { composeKeyFound, composeLockedDoor } from '../src/narrative/Narrator.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, EQUIPMENT_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const fighters = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER);

function findLockedDungeons(count = 1) {
  const found = [];
  for (let s = 0; s < 200 && found.length < count; s++) {
    const d = generateDungeon(`lock-${s}`, 'medium');
    if (d.branches.some(b => b.locked)) found.push(d);
  }
  return found;
}

describe('Locked branches in generation', () => {
  test('locked branches appear across seeds, keys placed before their doors', () => {
    const dungeons = findLockedDungeons(5);
    assert.ok(dungeons.length >= 5, 'locks are not vanishingly rare');
    for (const d of dungeons) {
      for (const b of d.branches.filter(x => x.locked)) {
        assert.ok(!b.secret, 'a door cannot be both hidden and locked');
        assert.ok(b.keyRoom >= 1, 'the key is never at the entrance');
        assert.ok(b.keyRoom < b.junction, 'the key waits before the door');
        assert.ok((d.rooms[b.keyRoom].hasKey || 0) >= 1, 'the key room holds a key');
        const firstEdge = d.edges.find(e => e.a === b.junction && e.b === b.rooms[0]);
        assert.ok(firstEdge?.locked, 'the branch edge carries the lock');
        const last = d.rooms[b.rooms[b.rooms.length - 1]];
        assert.equal(last.type, ROOM_TYPES.VAULT, 'a lock guards riches');
        for (const bi of b.rooms) {
          assert.ok(d.rooms[bi].discovered, 'an iron door is visible, not secret');
        }
      }
    }
  });

  test('a serialized locked dungeon rebuilds with its locks and keys', () => {
    const [d] = findLockedDungeons(1);
    const rebuilt = dungeonFromLayout(serializeDungeon(d));
    const before = d.branches.find(b => b.locked);
    const after = rebuilt.branches.find(b => b.locked);
    assert.ok(after, 'the lock survives the archive');
    assert.equal(after.keyRoom, before.keyRoom);
    assert.equal(rebuilt.rooms[after.keyRoom].hasKey, d.rooms[before.keyRoom].hasKey);
    assert.ok(rebuilt.edges.some(e => e.locked), 'the locked edge survives');
    assert.ok(!rebuilt.rooms[after.keyRoom].keyTaken, 'the key is back in place for a re-delve');
  });
});

describe('Picking the lock', () => {
  test('no rogue, no chance', () => {
    const party = new Party([fighters[0]]);
    assert.equal(pickLock(party, 10), false);
  });

  test('a rogue can do it on a decent roll', () => {
    const party = new Party([byClass('rogue')]);   // Vex, mind 5
    assert.equal(pickLock(party, 6), true, '5 + 6 beats the pins');
    assert.equal(pickLock(party, 3), false, '5 + 3 does not');
  });

  test('Masterwork Lockpicks turn a bad roll into a living', () => {
    const picks = EQUIPMENT_CARDS.find(e => e.id === 'eq-lockpicks');
    const party = new Party([byClass('rogue'), picks]);
    assert.equal(pickLock(party, 1), true, 'mind 7 + 1.5 + 1 clears 9');
  });
});

describe('The narrator has words for iron doors', () => {
  test('every beat has writing', () => {
    assert.ok(composeKeyFound().length > 10);
    for (const how of ['key', 'picked', 'shut']) {
      const line = composeLockedDoor(how);
      assert.ok(line.length > 10, `${how} has a line`);
    }
    assert.notEqual(composeLockedDoor('key'), composeLockedDoor('shut'));
  });
});

describe('Lock-and-key in the crawl', () => {
  /** A hand-built layout: key in room 1, iron door at room 2, vault behind it. */
  const lockedLayout = () => ({
    themeId: 'delve',
    conditionId: 'none',
    rooms: [
      { index: 0, type: 'entrance', x: 0, y: 0, secret: false },
      { index: 1, type: 'treasure', x: 1, y: 0, secret: false, gold: 10, mimicChance: 0, hasKey: 1 },
      { index: 2, type: 'corridor', x: 2, y: 0, secret: false },
      { index: 3, type: 'vault', x: 2, y: 1, secret: false, gold: 100, mimicChance: 0 },
      { index: 4, type: 'boss', x: 3, y: 0, secret: false, monster: { kind: 'whelp', name: 'a tired whelp', icon: '🐉', attack: 1, health: 1, isBoss: true } },
    ],
    spine: [0, 1, 2, 4],
    edges: [
      { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 4 },
      { a: 2, b: 3, locked: true },
    ],
    branches: [{ junction: 2, rooms: [3], secret: false, locked: true, keyRoom: 1, consumed: false }],
  });

  test('the party lifts the key, opens the door, and walks the vault', () => {
    const sim = new Simulator(
      [fighters[0], fighters[1], fighters[2], byClass('cleric')],
      'lockrun', 'easy', { layout: lockedLayout() },
    );
    sim.tick();   // treasure room: cleared either way, key found
    assert.equal(sim.party.keys, 1, 'the key is in hand');

    sim.tick();   // the junction: the key turns
    assert.equal(sim.party.keys, 0, 'the key is spent');
    assert.ok(sim.path.includes(3), 'the vault joins the march');
    assert.ok(sim.dungeon.branches[0].consumed, 'the door stands open');
    assert.ok(sim.lastNarration.aside && sim.lastNarration.aside.includes('🗝️'),
      'the chronicle records the door');

    let guard = 0;
    while (!sim.gameOver && guard++ < 100) sim.tick();
    assert.ok(sim.gameOver && sim.victory, 'the crawl still concludes in victory');
    assert.ok(sim.dungeon.rooms[3].cleared, 'the vault was walked and dealt with');
  });

  test('no key and no rogue leaves the door shut, and the run unstuck', () => {
    const layout = lockedLayout();
    layout.rooms[1].hasKey = 0;   // nobody stashed a key this time
    layout.branches[0].keyRoom = 1;
    const sim = new Simulator(
      [fighters[0], fighters[1], fighters[2], byClass('cleric')],
      'shutrun', 'easy', { layout },
    );
    let guard = 0;
    while (!sim.gameOver && guard++ < 100) sim.tick();
    assert.ok(sim.gameOver && sim.victory, 'a shut door never softlocks the run');
    assert.ok(!sim.path.includes(3), 'the vault keeps its gold');
    assert.ok(sim.party.gold < 100, 'and the party keeps its curiosity');
  });

  test('generated dungeons with locks still conclude', () => {
    const [d] = findLockedDungeons(1);
    const sim = new Simulator(
      [fighters[0], byClass('cleric'), byClass('rogue')],
      'gen-lock', 'easy', { layout: serializeDungeon(d) },
    );
    let guard = 0;
    while (!sim.gameOver && guard++ < 120) sim.tick();
    assert.ok(sim.gameOver, 'the crawl concludes');
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
