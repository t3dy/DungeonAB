/**
 * Tests for cave layouts — the agent digger (Cinder Galleries, the
 * Bog Cellar) and the curling grotto (Ice Caverns), per PCG ch.3.
 */

import { strict as assert } from 'assert';
import { generateDungeon, DUNGEON_THEMES } from '../src/world/DungeonGen.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const fighters = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER);

describe('Cave walkers', () => {
  test('the cave themes declare their mode; built dungeons stay winding', () => {
    assert.equal(DUNGEON_THEMES.volcanic.layoutMode, 'digger');
    assert.equal(DUNGEON_THEMES.bogcellar.layoutMode, 'digger');
    assert.equal(DUNGEON_THEMES.icecaverns.layoutMode, 'grotto');
    assert.equal(DUNGEON_THEMES.delve.layoutMode, undefined);
    assert.equal(DUNGEON_THEMES.castle.layoutMode, undefined);
  });

  test('built dungeons only ever step right or down; caves double back', () => {
    let caveBends = 0;
    for (let s = 0; s < 20; s++) {
      const built = generateDungeon(`bend-${s}`, 'medium', { theme: 'delve', floors: 1 });
      for (let i = 1; i < built.spine.length; i++) {
        const a = built.rooms[built.spine[i - 1]];
        const b = built.rooms[built.spine[i]];
        assert.ok(b.x >= a.x && b.y >= a.y, 'the Old Delve descends politely');
      }
      const cave = generateDungeon(`bend-${s}`, 'medium', { theme: 'volcanic', floors: 1 });
      for (let i = 1; i < cave.spine.length; i++) {
        const a = cave.rooms[cave.spine[i - 1]];
        const b = cave.rooms[cave.spine[i]];
        if (b.x < a.x || b.y < a.y) caveBends++;
      }
    }
    assert.ok(caveBends >= 5, `lava tubes wander back on themselves (${caveBends} bends in 20 caves)`);
  });

  test('cave spines stay adjacent — every step is one cell', () => {
    for (const theme of ['volcanic', 'icecaverns', 'bogcellar']) {
      for (let s = 0; s < 15; s++) {
        const d = generateDungeon(`adj-${theme}-${s}`, 'hard', { theme });
        for (let i = 1; i < d.spine.length; i++) {
          const a = d.rooms[d.spine[i - 1]];
          const b = d.rooms[d.spine[i]];
          if ((a.floor || 0) !== (b.floor || 0)) continue;   // stairs teleport to the next band
          const dist = Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
          // The boxed-in fallback tunnels east farther; everything else is one step
          assert.ok(dist >= 1 && (dist === 1 || b.y === a.y), `${theme}-${s}: steps are cells or eastward tunnels`);
        }
      }
    }
  });

  test('caves never re-dig a cell, and respect their floor bands', () => {
    for (const theme of ['volcanic', 'icecaverns', 'bogcellar']) {
      for (let s = 0; s < 15; s++) {
        const d = generateDungeon(`cell-${theme}-${s}`, 'hard', { theme });
        const cells = d.rooms.map(r => `${r.x},${r.y}`);
        assert.equal(new Set(cells).size, cells.length, `${theme}-${s}: unique cells`);
        for (const r of d.rooms) {
          const band = (r.floor || 0) * 12;
          assert.ok(r.y >= band - 1 && r.y <= band + 11,
            `${theme}-${s}: room ${r.index} stays in its stratum (y=${r.y}, floor ${r.floor})`);
        }
      }
    }
  });

  test('the same seed digs the same cave', () => {
    const a = generateDungeon('same-cave', 'medium', { theme: 'volcanic' });
    const b = generateDungeon('same-cave', 'medium', { theme: 'volcanic' });
    assert.deepEqual(a.rooms.map(r => [r.x, r.y]), b.rooms.map(r => [r.x, r.y]));
  });

  test('a hard two-floor cave crawl still concludes', () => {
    for (const theme of ['volcanic', 'icecaverns']) {
      const sim = new Simulator(
        [fighters[0], fighters[1], fighters[2], byClass('cleric'), byClass('rogue'), byClass('wizard')],
        `cave-run-${theme}`, 'hard', { theme },
      );
      let guard = 0;
      while (!sim.gameOver && guard++ < 120) sim.tick();
      assert.ok(sim.gameOver, `${theme} concludes`);
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
