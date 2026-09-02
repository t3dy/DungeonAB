/**
 * Tests for dungeon structure (procgen v3) — trapdoors as vertical
 * shortcuts, and the room-interior layout that has to fit a capped
 * party of four inside a real room with space to fight.
 */

import { strict as assert } from 'assert';
import {
  generateDungeon, ROOM_TYPES, ROOM_SHAPES, COMBAT_FLOOR, geometryFallback,
  serializeDungeon, dungeonFromLayout,
} from '../src/world/DungeonGen.js';
import { detectTrapdoor, decideTrapdoor } from '../src/encounters/RoomEncounters.js';
import { composeTrapdoor } from '../src/narrative/Narrator.js';
import { roomHalf, roomAxis, monsterSpot, partySlots, wallSpans, doorMap } from '../src/ui/RoomLayout.js';
import { Party, PARTY_CAP } from '../src/agents/Party.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);
const cleric = CHARACTER_CARDS.find(c => c.class === CLASSES.CLERIC);
const rogue = CHARACTER_CARDS.find(c => c.class === CLASSES.ROGUE);
const wizard = CHARACTER_CARDS.find(c => c.class === CLASSES.WIZARD);

/* Every footprint the generator can produce, at both orientations */
function everyShape() {
  const rooms = [];
  for (const type of Object.values(ROOM_TYPES)) {
    const g = geometryFallback(type);
    rooms.push({ type, ...g });
    rooms.push({ type, w: g.h, h: g.w, shape: g.shape });
  }
  return rooms;
}

describe('Rooms are built for what happens in them', () => {
  test('a fighting room seats four adventurers inside its walls', () => {
    for (const room of everyShape()) {
      const { hx, hz } = roomHalf(room);
      const slots = partySlots(room, 0, 0, PARTY_CAP, true);
      assert.equal(slots.length, PARTY_CAP);
      for (const { mx, mz } of slots) {
        assert.ok(Math.abs(mx) <= hx - 0.15,
          `${room.type} ${room.w}x${room.h}: member at x=${mx.toFixed(2)} is inside the wall (hx ${hx})`);
        assert.ok(Math.abs(mz) <= hz - 0.15,
          `${room.type} ${room.w}x${room.h}: member at z=${mz.toFixed(2)} is inside the wall (hz ${hz})`);
      }
    }
  });

  test('nobody stands on top of anybody', () => {
    for (const room of everyShape()) {
      const slots = partySlots(room, 0, 0, PARTY_CAP, true);
      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          const d = Math.hypot(slots[i].mx - slots[j].mx, slots[i].mz - slots[j].mz);
          assert.ok(d >= 0.7,
            `${room.type} ${room.w}x${room.h}: members ${i} and ${j} are ${d.toFixed(2)} apart`);
        }
      }
    }
  });

  test('the monster holds the far end; the party squares up across the room', () => {
    for (const room of everyShape()) {
      if (room.type !== ROOM_TYPES.MONSTER && room.type !== ROOM_TYPES.BOSS) continue;
      const { mx, mz } = monsterSpot(room, 0, 0);
      const slots = partySlots(room, 0, 0, PARTY_CAP, true);
      for (const s of slots) {
        const d = Math.hypot(s.mx - mx, s.mz - mz);
        assert.ok(d >= 1.5,
          `${room.type} ${room.w}x${room.h}: a member stands ${d.toFixed(2)} from the monster`);
      }
      // And the two sides face each other along the room's long axis
      const { axis } = roomAxis(room);
      const key = axis === 'x' ? 'mx' : 'mz';
      assert.ok(slots.every(s => s[key] < (axis === 'x' ? mx : mz)),
        `${room.type}: the party is on its own side of the room`);
    }
  });

  test('a party stands closer together when nothing is trying to kill it', () => {
    const room = { type: ROOM_TYPES.MONSTER, w: 8, h: 6, shape: ROOM_SHAPES.CHAMBER };
    const braced = partySlots(room, 0, 0, PARTY_CAP, true);
    const idle = partySlots(room, 0, 0, PARTY_CAP, false);
    const depth = slots => Math.min(...slots.map(s => s.mx));
    assert.ok(depth(braced) < depth(idle),
      'facing a monster pushes the party back to its own end');
  });

  test('walls open for a doorway and stay solid without one', () => {
    assert.deepEqual(wallSpans(6, 0), [[-3, 3]], 'a blank wall is one span');
    const withDoor = wallSpans(6, 1);
    assert.equal(withDoor.length, 2, 'a door splits the wall');
    const solid = withDoor.reduce((s, [a, b]) => s + (b - a), 0);
    assert.ok(solid < 6, 'the doorway is a real gap');
    // A wall no wider than the doorway is all doorway
    assert.equal(wallSpans(1.5, 1).length, 0);
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
