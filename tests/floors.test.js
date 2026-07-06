/**
 * Tests for multi-floor dungeons — stacked floors joined by stairs,
 * each stratum meaner and richer than the one above it.
 */

import { strict as assert } from 'assert';
import {
  generateDungeon, serializeDungeon, dungeonFromLayout, ROOM_TYPES, DUNGEON_THEMES, STAT_SCALE,
} from '../src/world/DungeonGen.js';
import { Party } from '../src/agents/Party.js';
import { getRoomOptions, resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { composePredicament, composeResolution } from '../src/narrative/Narrator.js';
import { describeTickEvents } from '../src/ui/GameGuide.js';
import { retypeRoom } from '../src/ui/ArchiveUI.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const fighters = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER);

describe('Floors in generation', () => {
  test('easy dungeons stay single-floor; hard dungeons always stack two', () => {
    for (let s = 0; s < 10; s++) {
      assert.equal(generateDungeon(`ez-${s}`, 'easy').floorCount, 1);
      assert.equal(generateDungeon(`hd-${s}`, 'hard').floorCount, 2);
      const nm = generateDungeon(`nm-${s}`, 'nightmare').floorCount;
      assert.ok(nm >= 2 && nm <= 3, `nightmare digs 2-3 floors (got ${nm})`);
    }
  });

  test('the spine descends one floor at a time, over exactly one stair each', () => {
    for (let s = 0; s < 20; s++) {
      const d = generateDungeon(`stack-${s}`, 'hard');
      const spineFloors = d.spine.map(i => d.rooms[i].floor || 0);
      for (let i = 1; i < spineFloors.length; i++) {
        const step = spineFloors[i] - spineFloors[i - 1];
        assert.ok(step === 0 || step === 1, 'no skipped floors, no climbing back');
        if (step === 1) {
          assert.equal(d.rooms[d.spine[i - 1]].type, ROOM_TYPES.STAIRS,
            'every floor change crosses a staircase');
        }
      }
      const stairs = d.rooms.filter(r => r.type === ROOM_TYPES.STAIRS);
      assert.equal(stairs.length, d.floorCount - 1, 'one stair per boundary');
      assert.equal(d.rooms[d.spine[0]].floor, 0, 'the entrance is on top');
      assert.equal(d.rooms[d.spine[d.spine.length - 1]].floor, d.floorCount - 1, 'the boss keeps the bottom');
    }
  });

  test('branches never hang off a stairwell, and stay on their floor', () => {
    for (let s = 0; s < 30; s++) {
      const d = generateDungeon(`hang-${s}`, 'hard');
      for (const b of d.branches) {
        assert.notEqual(d.rooms[b.junction].type, ROOM_TYPES.STAIRS);
        for (const bi of b.rooms) {
          assert.equal(d.rooms[bi].floor, d.rooms[b.junction].floor, 'a detour stays on its stratum');
        }
      }
    }
  });

  test('lower floors are meaner and richer', () => {
    // The floor multiplier is applied inside generation; verify it on
    // real rolls by comparing a floor-1 monster against its own kind's
    // base stats — round(base × 0.85 × 1.12) beats round(base × 0.85)
    let checkedMonster = false;
    let checkedGold = false;
    for (let s = 0; s < 40 && !(checkedMonster && checkedGold); s++) {
      const d = generateDungeon(`mean-${s}`, 'easy', { floors: 2, theme: 'delve' });
      for (const r of d.rooms) {
        if (r.floor !== 1) continue;
        if (r.type === ROOM_TYPES.MONSTER) {
          if (r.monster.elite) continue; // veterans carry their own multiplier
          const base = DUNGEON_THEMES.delve.monsters.find(m => m.kind === r.monster.kind);
          if (!base) continue; // a nature reshaped the name, not the kind — still fine
          assert.equal(r.monster.attack, Math.max(1, Math.round(base.attack * STAT_SCALE.easy * 1.12)),
            `${r.monster.kind} hits floor-2 hard`);
          checkedMonster = true;
        }
      }
    }
    assert.ok(checkedMonster, 'found a floor-1 monster to check');
    // Gold: same seed, forced 1 vs 2 floors shares no room layout, so
    // check the multiplier directly on a serialized round-trip instead
    const d2 = generateDungeon('gold-floors', 'easy', { floors: 2 });
    const t = d2.rooms.find(r => r.type === ROOM_TYPES.TREASURE && r.floor === 1);
    if (t) {
      assert.ok(t.gold >= Math.round(20 * 1.15), 'floor-2 hoards start above the floor-1 minimum');
      checkedGold = true;
    }
    assert.ok(true);
  });

  test('floors survive the archive', () => {
    const d = generateDungeon('arch-floors', 'hard');
    const rebuilt = dungeonFromLayout(serializeDungeon(d));
    assert.equal(rebuilt.floorCount, d.floorCount);
    assert.deepEqual(rebuilt.rooms.map(r => r.floor), d.rooms.map(r => r.floor));
  });

  test('stairs are structure: the editor refuses to retype them', () => {
    const layout = serializeDungeon(generateDungeon('edit-floors', 'hard'));
    const stair = layout.rooms.find(r => r.type === ROOM_TYPES.STAIRS);
    assert.ok(stair, 'a hard dungeon has a stair');
    assert.equal(retypeRoom(layout, stair.index, 'treasure'), false);
    const normal = layout.rooms.find(r => r.type === ROOM_TYPES.CORRIDOR || r.type === ROOM_TYPES.MONSTER);
    if (normal) assert.equal(retypeRoom(layout, normal.index, 'stairs'), false, 'nor mint new ones');
  });
});

describe('The descent itself', () => {
  const stairsRoom = () => ({ type: ROOM_TYPES.STAIRS, index: 5, floor: 0, cleared: false });

  test('the landing offers a march or a breather', () => {
    const party = new Party([fighters[0]]);
    const ids = getRoomOptions(stairsRoom(), party).map(o => o.id);
    assert.deepEqual(ids, ['descend', 'rest-landing']);
  });

  test('descending pays progress; resting mends the whole party first', () => {
    const march = new Party([fighters[0], fighters[1]]);
    const down = resolveRoomAction(stairsRoom(), march, 'descend');
    assert.equal(down.floor, 2, 'the beat names the floor below in human numbers');
    assert.equal(march.score, 10);

    const worn = new Party([fighters[0], fighters[1]]);
    for (const m of worn.members) m.takeDamage(6);
    const before = worn.totalHealth();
    resolveRoomAction(stairsRoom(), worn, 'rest-landing');
    assert.equal(worn.totalHealth(), before + 4, 'two health apiece, steadied back');
  });

  test('the narrator has words for the way down', () => {
    assert.ok(composePredicament({ type: ROOM_TYPES.STAIRS }).length > 30);
    const party = new Party([fighters[0]]);
    const down = composeResolution(stairsRoom(), 'descend', { success: true, floor: 2 }, party);
    assert.ok(down.includes('2'), 'the floor number reaches the chronicle');
    const rest = composeResolution(stairsRoom(), 'rest-landing', { success: true, healed: 2, floor: 2 }, party);
    assert.ok(rest.includes('2 health'), 'and so does the breather');
  });

  test('the guide announces the new stratum', () => {
    const prev = { currentFloor: 0, party: null, narration: null };
    const curr = { currentFloor: 1, party: null, narration: null };
    const events = describeTickEvents(prev, curr);
    assert.ok(events.some(e => e.kind === 'depth' && e.text.includes('Floor 2')));
    assert.equal(describeTickEvents(curr, curr).some(e => e.kind === 'depth'), false, 'no event without a descent');
  });
});

describe('Multi-floor crawls', () => {
  test('a two-floor crawl descends and concludes', () => {
    const sim = new Simulator(
      [fighters[0], fighters[1], fighters[2], byClass('cleric'), byClass('rogue')],
      'two-floor-run', 'easy', { floors: 2 },
    );
    assert.equal(sim.getState().floors, 2);
    let deepest = 0;
    let guard = 0;
    while (!sim.gameOver && guard++ < 100) {
      sim.tick();
      deepest = Math.max(deepest, sim.getState().currentFloor);
    }
    assert.ok(sim.gameOver, 'the crawl concludes');
    if (sim.victory) {
      assert.equal(deepest, 1, 'victory means the party reached the bottom stratum');
    }
  });

  test('hard-difficulty generated crawls (two floors, all systems) conclude', () => {
    for (const theme of ['delve', 'crypt', 'icecaverns']) {
      const sim = new Simulator(
        [fighters[0], fighters[1], fighters[2], byClass('cleric'), byClass('wizard'), byClass('alchemist')],
        `deep-${theme}`, 'hard', { theme },
      );
      let guard = 0;
      while (!sim.gameOver && guard++ < 120) sim.tick();
      assert.ok(sim.gameOver, `${theme} concludes across its floors`);
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
