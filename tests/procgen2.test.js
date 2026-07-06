/**
 * Tests for procgen v2 — the Spelunky-style critical path with
 * branches, secret doors, and vaults (per Shaker/Togelius/Nelson
 * ch.3 and the roguelike canon: NetHack secret corridors, DCSS
 * optional branches).
 */

import { strict as assert } from 'assert';
import { generateDungeon, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { detectSecretDoor, decideDetour } from '../src/encounters/RoomEncounters.js';
import { Simulator } from '../src/sim/Simulator.js';
import { Party } from '../src/agents/Party.js';
import { CHARACTER_CARDS, PERSONALITY_CARDS, CLASSES } from '../src/game/Cards.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);
const rogue = CHARACTER_CARDS.find(c => c.class === CLASSES.ROGUE);
const greedy = PERSONALITY_CARDS.find(c => c.archetype === 'greedy');
const craven = PERSONALITY_CARDS.find(c => c.archetype === 'craven');

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

  test('rooms never overlap on the grid', () => {
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'hard', { theme: 'volcanic' });
      const cells = d.rooms.map(r => `${r.x},${r.y}`);
      assert.equal(new Set(cells).size, cells.length, `${seed}: unique cells`);
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
      a.rooms.map(r => [r.type, r.x, r.y, !!r.secret]),
      b.rooms.map(r => [r.type, r.x, r.y, !!r.secret]),
    );
    assert.deepEqual(a.edges, b.edges);
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
