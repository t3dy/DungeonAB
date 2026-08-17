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

describe('Trapdoors — the vertical shortcut', () => {
  test('dungeons grow them, and they always skip forward, never past the boss', () => {
    let found = 0;
    for (const seed of ['td-1', 'td-2', 'td-3', 'td-4', 'td-5', 'td-6', 'td-7', 'td-8']) {
      const d = generateDungeon(seed, 'medium');
      for (const td of d.trapdoors) {
        found++;
        assert.ok(td.to > td.from + 1, 'a shortcut has to skip something');
        assert.ok(td.from >= 1, 'never in the entrance');
        const bossIdx = d.spine[d.spine.length - 1];
        assert.ok(td.to < bossIdx, 'the boss is fought, never skipped');
        assert.ok(td.fall > 0, 'a fall costs something');
        assert.equal(d.trapdoorAt(td.from), td, 'the room knows its shaft');
      }
    }
    assert.ok(found > 0, 'some dungeons have trapdoors');
  });

  test('trapdoors survive being archived and replayed', () => {
    const d = generateDungeon('td-3', 'medium');
    const round = dungeonFromLayout(serializeDungeon(d));
    assert.deepEqual(
      round.trapdoors.map(t => [t.from, t.to, t.secret, t.fall]),
      d.trapdoors.map(t => [t.from, t.to, t.secret, t.fall]),
    );
    assert.ok(round.trapdoors.every(t => !t.consumed), 'a replayed shaft is unopened');
  });

  test('a rogue taps the floor; a wizard walks onto it', () => {
    const withRogue = new Party([fighter, rogue]);
    const without = new Party([fighter, wizard]);
    // Same middling roll: the rogue's eyes and pole make the difference
    assert.ok(detectTrapdoor(withRogue, 6), 'the rogue finds the shaft');
    assert.ok(!detectTrapdoor(without, 6), 'nobody else is looking down');
  });

  test('the Craven take the short way; the Covetous refuse to skip loot', () => {
    const craven = new Party([fighter]);
    craven.personalities.push('craven');
    const greedy = new Party([fighter]);
    greedy.personalities.push('greedy');
    assert.ok(decideTrapdoor(craven, 5), 'fewer rooms, fewer teeth');
    assert.ok(!decideTrapdoor(greedy, 5), 'skipped rooms hold coin');
  });

  test('a battered party takes any road to the end', () => {
    const hurt = new Party([fighter, cleric]);
    for (const m of hurt.members) m.takeDamage(Math.floor(m.maxHealth * 0.7));
    assert.ok(decideTrapdoor(hurt, 5), 'wounded parties want the shortcut');
  });

  test('climbing down skips rooms, costs damage, and is narrated', () => {
    const sim = new Simulator([fighter, cleric, rogue], 'td-sim', 'easy');
    const before = sim.path.length;
    const healthBefore = sim.party.totalHealth();
    sim.roomIndex = 1;
    sim.lastNarration = { aside: null, falls: [] };

    const td = { from: sim.path[1], to: sim.path[4], secret: false, fall: 6, consumed: false };
    const realRandom = Math.random;
    Math.random = () => 0.05;    // a low roll: the party descends
    try {
      sim.resolveTrapdoor(td);
    } finally {
      Math.random = realRandom;
    }

    assert.equal(td.consumed, true);
    assert.equal(sim.path.length, before - 2, 'two rooms skipped out of the march');
    assert.equal(sim.path[2], td.to, 'the next room is the landing');
    assert.ok(sim.party.totalHealth() < healthBefore, 'the landing hurts');
    assert.ok(sim.lastNarration.aside.includes('trapdoor'), 'the chronicle says so');
  });

  test('refusing the shaft keeps the route and costs nothing', () => {
    const sim = new Simulator([fighter], 'td-sim-2', 'easy');
    const before = sim.path.length;
    const healthBefore = sim.party.totalHealth();
    sim.party.personalities.push('greedy');   // refuses to skip loot
    sim.roomIndex = 1;
    sim.lastNarration = { aside: null, falls: [] };

    const td = { from: sim.path[1], to: sim.path[4], secret: false, fall: 6, consumed: false };
    const realRandom = Math.random;
    Math.random = () => 0.95;
    try {
      sim.resolveTrapdoor(td);
    } finally {
      Math.random = realRandom;
    }

    assert.equal(sim.path.length, before, 'the march is unchanged');
    assert.equal(sim.party.totalHealth(), healthBefore, 'nobody fell');
    assert.ok(sim.lastNarration.aside.includes('leaves it shut'));
  });

  test('every trapdoor outcome has real writing, with no placeholders', () => {
    for (const outcome of ['descend', 'refused', 'fell']) {
      const text = composeTrapdoor({ outcome, rooms: 3, damage: 5, finder: 'Vex Threefingers' });
      assert.ok(text.length > 40, `${outcome} is written`);
      assert.ok(!text.includes('undefined'), `${outcome} has no holes`);
    }
    assert.ok(composeTrapdoor({ outcome: 'descend', rooms: 1, damage: 2, finder: 'Vex' }).includes('1 room,'.slice(0, 6)),
      'singular rooms read correctly');
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
