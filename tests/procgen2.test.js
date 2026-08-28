/**
 * Tests for procgen v2/v3 — the Spelunky-style critical path with
 * branches, secret doors and vaults (per Shaker/Togelius/Nelson ch.3
 * and the roguelike canon: NetHack secret corridors, DCSS optional
 * branches), now with real room footprints: halls, chambers, caverns,
 * rotundas and cells that must tile the plane without overlapping.
 */

import { strict as assert } from 'assert';
import {
  generateDungeon, ROOM_TYPES, ROOM_SHAPES, COMBAT_FLOOR,
} from '../src/world/DungeonGen.js';

const ROOM_SHAPES_LIST = Object.values(ROOM_SHAPES);
import {
  detectSecretDoor, decideDetour, decideRoomAction, wingAppeal,
} from '../src/encounters/RoomEncounters.js';
import { Simulator } from '../src/sim/Simulator.js';
import { Party } from '../src/agents/Party.js';
import { CHARACTER_CARDS, PERSONALITY_CARDS, CLASSES } from '../src/game/Cards.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);
const rogue = CHARACTER_CARDS.find(c => c.class === CLASSES.ROGUE);
const greedy = PERSONALITY_CARDS.find(c => c.archetype === 'greedy');
const craven = PERSONALITY_CARDS.find(c => c.archetype === 'craven');
const scholar = PERSONALITY_CARDS.find(c => c.archetype === 'scholarly');
const reckless = PERSONALITY_CARDS.find(c => c.archetype === 'reckless');
const alchemist = CHARACTER_CARDS.find(c => c.class === CLASSES.ALCHEMIST);

const SEEDS = ['pg-1', 'pg-2', 'pg-3', 'pg-4', 'pg-5', 'pg-6', 'pg-7', 'pg-8'];

describe('The spatial layout', () => {
  test('the spine still runs entrance → boss', () => {
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'medium', { theme: 'delve' });
      assert.equal(d.rooms[d.spine[0]].type, ROOM_TYPES.ENTRANCE);
      assert.equal(d.rooms[d.spine[d.spine.length - 1]].type, ROOM_TYPES.BOSS);
    }
  });

  test('every edge connects two real rooms; every room is reachable', () => {
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'medium', { theme: 'crypt' });
      const adj = new Map(d.rooms.map((_, i) => [i, []]));
      for (const e of d.edges) {
        assert.ok(d.rooms[e.a] && d.rooms[e.b], `${seed}: edge ${e.a}-${e.b} is real`);
        adj.get(e.a).push(e.b);
        adj.get(e.b).push(e.a);
      }
      // BFS from the entrance touches everything (secrets included)
      const seen = new Set([0]);
      const queue = [0];
      while (queue.length) {
        for (const n of adj.get(queue.shift())) {
          if (!seen.has(n)) { seen.add(n); queue.push(n); }
        }
      }
      assert.equal(seen.size, d.rooms.length, `${seed}: no orphaned rooms`);
    }
  });

  test('room footprints never overlap on the same floor', () => {
    // Rooms are rectangles now (procgen v3), not grid cells, so cell
    // identity proves nothing — this has to be real intersection math.
    // Floors stack, so two rooms may share x/y if they are on different
    // levels — a stairhead sits directly above the room you land in.
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'hard', { theme: 'volcanic' });
      for (let i = 0; i < d.rooms.length; i++) {
        for (let j = i + 1; j < d.rooms.length; j++) {
          const a = d.rooms[i];
          const b = d.rooms[j];
          if ((a.floor || 0) !== (b.floor || 0)) continue;
          const apart = Math.abs(a.x - b.x) * 2 >= a.w + b.w
                     || Math.abs(a.y - b.y) * 2 >= a.h + b.h;
          assert.ok(apart,
            `${seed}: floor ${a.floor || 0}: ${a.type}(${a.w}x${a.h}@${a.x},${a.y}) overlaps ${b.type}(${b.w}x${b.h}@${b.x},${b.y})`);
        }
      }
    }
  });

  test('every room is big enough for what happens in it', () => {
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'medium');
      for (const room of d.rooms) {
        assert.ok(room.w >= 2 && room.h >= 2, `${room.type} has a real footprint`);
        assert.ok(ROOM_SHAPES_LIST.includes(room.shape), `${room.type} has a known shape (${room.shape})`);
        // A fight needs floor for four adventurers and a monster
        if (room.type === ROOM_TYPES.MONSTER || room.type === ROOM_TYPES.BOSS) {
          const long = Math.max(room.w, room.h);
          const short = Math.min(room.w, room.h);
          assert.ok(long >= COMBAT_FLOOR.w && short >= COMBAT_FLOOR.h,
            `${room.type} ${room.w}x${room.h} fits a fight`);
        }
      }
      // The boss chamber is the biggest room in the dungeon
      const boss = d.rooms.find(r => r.type === ROOM_TYPES.BOSS);
      const biggest = Math.max(...d.rooms.map(r => r.w * r.h));
      assert.equal(boss.w * boss.h, biggest, `${seed}: the boss gets the great hall`);
    }
  });

  test('the map stays compact enough to draw', () => {
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'medium');
      const xs = d.rooms.map(r => r.x);
      const ys = d.rooms.map(r => r.y);
      const spanX = Math.max(...xs) - Math.min(...xs);
      const spanY = Math.max(...ys) - Math.min(...ys);
      // A straight line of rooms is neither a dungeon nor renderable
      const ratio = Math.max(spanX, spanY) / Math.max(1, Math.min(spanX, spanY));
      assert.ok(ratio < 4, `${seed}: layout is not a corridor (${spanX.toFixed(0)}x${spanY.toFixed(0)})`);
    }
  });

  test('branches exist, hang off the spine, and stay off the critical path', () => {
    let sawBranch = false;
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'medium', { theme: 'delve' });
      for (const b of d.branches) {
        sawBranch = true;
        assert.ok(d.spine.includes(b.junction), 'junction sits on the spine');
        for (const idx of b.rooms) {
          assert.ok(!d.spine.includes(idx), 'branch rooms are optional');
        }
      }
    }
    assert.ok(sawBranch, 'across eight seeds, some dungeon branched');
  });

  test('secret branches hide a vault and start undiscovered', () => {
    let sawSecret = false;
    for (const seed of [...SEEDS, 'pg-9', 'pg-10', 'pg-11', 'pg-12']) {
      const d = generateDungeon(seed, 'medium', { theme: 'delve' });
      for (const b of d.branches.filter(b => b.secret)) {
        sawSecret = true;
        const last = d.rooms[b.rooms[b.rooms.length - 1]];
        assert.equal(last.type, ROOM_TYPES.VAULT, `${seed}: the secret ends in a vault`);
        for (const idx of b.rooms) {
          assert.equal(d.rooms[idx].discovered, false, 'starts behind the wall');
        }
        const doorEdge = d.edges.find(e => e.b === b.rooms[0]);
        assert.ok(doorEdge.secret, 'the first edge is the hidden door');
      }
    }
    assert.ok(sawSecret, 'across twelve seeds, some dungeon kept a secret');
  });

  test('vaults pay like vaults', () => {
    for (const seed of [...SEEDS, 'pg-9', 'pg-10', 'pg-11', 'pg-12']) {
      const d = generateDungeon(seed, 'medium', { theme: 'delve' });
      for (const r of d.rooms.filter(r => r.type === ROOM_TYPES.VAULT)) {
        assert.ok(r.gold >= 60, `${seed}: vault gold ${r.gold} is worth the search`);
      }
    }
  });

  test('same seed, same layout — branches, secrets and all', () => {
    const a = generateDungeon('pg-det', 'medium', { theme: 'delve' });
    const b = generateDungeon('pg-det', 'medium', { theme: 'delve' });
    assert.deepEqual(
      a.rooms.map(r => [r.type, r.x, r.y, r.w, r.h, r.shape, !!r.secret]),
      b.rooms.map(r => [r.type, r.x, r.y, r.w, r.h, r.shape, !!r.secret]),
    );
    assert.deepEqual(a.edges, b.edges);
    assert.deepEqual(a.trapdoors, b.trapdoors);
  });
});

describe('Secret doors and detours', () => {
  test('a rogue notices what a fighter walks past', () => {
    const withRogue = new Party([fighter, rogue]);
    const noRogue = new Party([fighter]);
    const midRoll = 7;
    assert.equal(detectSecretDoor(withRogue, midRoll), true, 'the rogue\'s eyes catch the seam');
    assert.equal(detectSecretDoor(noRogue, midRoll), false, 'the fighter sees a wall');
  });

  test('the Covetous take the side passage; the Craven declines', () => {
    const covetous = new Party([fighter, greedy]);
    const timid = new Party([fighter, craven]);
    const midRoll = 5;
    assert.equal(decideDetour(covetous, midRoll), true, 'gold has a smell');
    assert.equal(decideDetour(timid, midRoll), false, 'optional danger is still danger');
  });

  test('a battered party presses for the exit', () => {
    const whole = new Party([fighter, greedy]);
    const battered = new Party([fighter, greedy]);
    battered.members[0].takeDamage(Math.ceil(battered.members[0].maxHealth * 0.8));
    // Greedy threshold is 7 whole, 4 battered: a roll of 5 splits them
    assert.equal(decideDetour(whole, 5), true, 'whole, greed wins');
    assert.equal(decideDetour(battered, 5), false, 'battered, wounds argue for the door');
  });

  test('a wing is chosen for what is in it', () => {
    // A wing has a theme and a payoff. A party that cannot see either is
    // choosing between two anonymous side passages, which is the
    // reactions failure over again: content the decision layer cannot
    // read does not exist.
    const bookish = new Party([fighter, scholar]);
    const plain = new Party([fighter]);
    // The archive is worth 4 to the Scholarly: a roll that splits them
    assert.equal(decideDetour(bookish, 8, 'archive'), true, 'the shelves are the point');
    assert.equal(decideDetour(plain, 8, 'archive'), false, 'to anyone else it is more dungeon');

    const brewer = new Party([alchemist]);
    assert.ok(wingAppeal(brewer, 'works').weight > wingAppeal(plain, 'works').weight,
      'the alchemist wants the bench');
    assert.ok(wingAppeal(plain, 'sump').weight < 0, 'nobody volunteers for the flooded wing');

    // And the party says who wanted it, or the reason is invisible
    assert.ok(wingAppeal(bookish, 'archive').advocate, 'somebody argued for it, by name');
  });

  test('the stairhead reads how much the party has left', () => {
    // Two thousand rolls an arm, because this is a weighted pick and one
    // decision proves nothing.
    const campRate = (hpShare, supply, extra = []) => {
      const party = new Party([fighter, rogue, ...extra]);
      party.supply = supply;
      for (const m of party.members) m.health = Math.max(1, Math.round(m.maxHealth * hpShare));
      const room = { type: ROOM_TYPES.STAIRS, descendsTo: 1, w: 5, h: 5, features: [] };
      let camps = 0;
      for (let i = 0; i < 2000; i++) if (decideRoomAction({ ...room }, party) === 'camp-stair') camps++;
      return camps / 2000;
    };

    const fresh = campRate(0.95, 8);
    const battered = campRate(0.3, 8);
    assert.ok(battered - fresh > 0.4,
      `a battered party stops and a fresh one does not (${(battered * 100).toFixed(0)}% vs ${(fresh * 100).toFixed(0)}%)`);

    const dry = campRate(0.3, 1);
    assert.ok(dry < battered - 0.1,
      `camping without oil to spare is worse than pressing on (${(dry * 100).toFixed(0)}% vs ${(battered * 100).toFixed(0)}%)`);

    const bold = campRate(0.3, 8, [reckless]);
    assert.ok(bold < battered - 0.1,
      `the Reckless argue against stopping (${(bold * 100).toFixed(0)}% vs ${(battered * 100).toFixed(0)}%)`);
  });

  test('a greedy party with a rogue eventually walks a branch', () => {
    let detoured = false;
    for (const seed of [...SEEDS, 'pg-13', 'pg-14', 'pg-15', 'pg-16']) {
      const sim = new Simulator([fighter, rogue, greedy], seed, 'easy');
      const spineLen = sim.dungeon.spine.length;
      let guard = 0;
      while (!sim.gameOver && guard++ < 80) sim.tick();
      if (sim.path.length > spineLen) { detoured = true; break; }
    }
    assert.ok(detoured, 'across many delves, the party explored at least one branch');
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
