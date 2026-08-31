/**
 * Riders — capability tests stamped onto rooms that already have a job.
 *
 * `RIDERS_BY_ROOM` in DungeonGen is plain data, deliberately not read
 * out of the encounter registry: generation must not depend on whether
 * `Encounters.js` happens to have been imported yet, because an empty
 * registry would silently produce dungeons with no riders at all.
 *
 * The cost of holding it twice is that the two can drift. This is the
 * test that says they have not.
 */

import { strict as assert } from 'assert';
import { RIDERS_BY_ROOM, ROOM_TYPES, generateDungeon } from '../src/world/DungeonGen.js';
import { getEncounter, allEncounters, getEncounterForRoom, evaluateOptions } from '../src/encounters/EncounterEngine.js';
import '../src/encounters/Encounters.js';
import { getRoomOptions } from '../src/encounters/RoomEncounters.js';
import { Party } from '../src/agents/Party.js';
import { CHARACTER_CARDS } from '../src/game/Cards.js';

const byId = id => CHARACTER_CARDS.find(c => c.id === id);
const ROOM_TYPE_VALUES = new Set(Object.values(ROOM_TYPES));

describe('The rider table and the encounters agree', () => {
  test('every id in the rider table is a registered encounter', () => {
    for (const [roomType, ids] of Object.entries(RIDERS_BY_ROOM)) {
      for (const id of ids) {
        assert.ok(getEncounter(id), `${roomType} rides unknown encounter "${id}"`);
      }
    }
  });

  test('every room type in the rider table is a real room type', () => {
    for (const roomType of Object.keys(RIDERS_BY_ROOM)) {
      assert.ok(ROOM_TYPE_VALUES.has(roomType), `"${roomType}" is not a room type`);
    }
  });

  test('a rider is only placed on a room its own `rides` declaration allows', () => {
    for (const [roomType, ids] of Object.entries(RIDERS_BY_ROOM)) {
      for (const id of ids) {
        const def = getEncounter(id);
        assert.ok(Array.isArray(def.rides), `${id} is ridden but declares no rides`);
        assert.ok(def.rides.includes(roomType),
          `${id} is placed on ${roomType} but only declares rides: ${def.rides.join(', ')}`);
      }
    }
  });

  test('every encounter that declares rides is actually reachable as a rider', () => {
    for (const def of allEncounters()) {
      if (!def.rides || def.category === 'town') continue;
      const placed = Object.entries(RIDERS_BY_ROOM)
        .filter(([, ids]) => ids.includes(def.id))
        .map(([roomType]) => roomType);
      assert.ok(placed.length > 0,
        `${def.id} declares rides: ${def.rides.join(', ')} but no room type carries it`);
    }
  });
});

describe('A ridden room keeps its own job', () => {
  test('a treasure room stamped with an appraisal test still offers to loot it', () => {
    const party = new Party([byId('char-digby')]);
    const room = {
      type: ROOM_TYPES.TREASURE, encounterId: 'appraiser-test',
      gold: 40, mimicChance: 0, cleared: false, w: 9, h: 8,
    };
    const ids = getRoomOptions(room, party).map(o => o.id);
    assert.ok(ids.includes('loot'), 'the room is still a treasure room');
    assert.ok(ids.includes('appraise-chests'), 'and it also asks the capability question');
  });

  test('a situation room does NOT get a bare escape hatch merged in', () => {
    const party = new Party([byId('char-digby')]);
    const room = {
      type: ROOM_TYPES.SITUATION, encounterId: 'astronomers-chamber',
      cleared: false, w: 10, h: 9,
    };
    const ids = getRoomOptions(room, party).map(o => o.id);
    assert.ok(!ids.includes('proceed'),
      'a situation room is its encounter; `proceed` would skip the examination');
  });
});

describe('Riders reach the player', () => {
  test('generated dungeons carry riders on rooms that already have a job', () => {
    let ridden = 0;
    let dungeonsWithRider = 0;
    for (let i = 0; i < 25; i++) {
      const d = generateDungeon(`rider-${i}`, 'medium');
      const here = d.rooms.filter(r => r.encounterId && r.type !== ROOM_TYPES.SITUATION);
      ridden += here.length;
      if (here.length > 0) dungeonsWithRider++;
    }
    assert.ok(ridden > 0, 'no rider was ever placed');
    assert.ok(dungeonsWithRider >= 12,
      `only ${dungeonsWithRider}/25 dungeons examined the draft through a rider`);
  });

  test('a ridden room never loses its payload', () => {
    for (let i = 0; i < 25; i++) {
      for (const room of generateDungeon(`payload-${i}`, 'medium').rooms) {
        if (!room.encounterId || room.type === ROOM_TYPES.SITUATION) continue;
        if (room.type === ROOM_TYPES.TREASURE || room.type === ROOM_TYPES.VAULT) {
          assert.ok(room.gold > 0, 'a ridden treasure room still holds gold');
        }
        if (room.type === ROOM_TYPES.MONSTER) {
          assert.ok(room.monster, 'a ridden monster room still holds a monster');
        }
        if (room.type === ROOM_TYPES.TRAP) {
          assert.ok(room.trapDamage > 0, 'a ridden trap room still holds a trap');
        }
      }
    }
  });

  test('the same situation is never dealt twice in one dungeon', () => {
    for (let i = 0; i < 25; i++) {
      const ids = generateDungeon(`dupe-${i}`, 'medium').rooms
        .filter(r => r.type === ROOM_TYPES.SITUATION)
        .map(r => r.encounterId);
      assert.equal(new Set(ids).size, ids.length,
        `the same situation appeared twice in dungeon dupe-${i}`);
    }
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
