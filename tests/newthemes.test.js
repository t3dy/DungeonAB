/**
 * Tests for the three new theme designs — each theme's identity
 * features must actually be true of the dungeons it generates.
 * (Generic furnishing/arrival/tile coverage is enforced by
 * themes.test.js and sprites.test.js automatically.)
 */

import { strict as assert } from 'assert';
import { generateDungeon, DUNGEON_THEMES, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { composePredicament } from '../src/narrative/Narrator.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);
const cleric = CHARACTER_CARDS.find(c => c.class === CLASSES.CLERIC);
const SEEDS = ['nt-1', 'nt-2', 'nt-3', 'nt-4', 'nt-5'];

const count = (d, type) => d.rooms.filter(r => r.type === type).length;

describe('the Castle of the Vampire Lord', () => {
  test('the roster is a cleric\'s feast — almost all undead', () => {
    const t = DUNGEON_THEMES.castle;
    const undead = t.monsters.filter(m => m.undead).length;
    assert.ok(undead >= 3, `${undead}/4 monsters undead`);
    assert.ok(t.bosses.every(b => b.undead), 'both bosses are undead');
  });

  test('treasure-rich, shrine-poor (the chapels are desecrated)', () => {
    let treasure = 0;
    let shrines = 0;
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'medium', { theme: 'castle' });
      treasure += count(d, ROOM_TYPES.TREASURE) + count(d, ROOM_TYPES.VAULT);
      shrines += count(d, ROOM_TYPES.SHRINE);
    }
    assert.ok(treasure / SEEDS.length >= 1.5, `the Lord hoards (${treasure} treasure rooms over 5 delves)`);
    assert.ok(shrines <= SEEDS.length + 2, `shrines stay scarce (${shrines} across 5 delves; 1 guaranteed each)`);
  });

  test('the thrall can be paid off — old habits of service', () => {
    assert.ok(DUNGEON_THEMES.castle.monsters.find(m => m.kind === 'castle-thrall').bribable);
  });
});

describe('the Root Cellar of the Bog Witch', () => {
  test('the stillroom always works and the shelves drip with reagents', () => {
    assert.equal(DUNGEON_THEMES.bogcellar.alwaysLab, true);
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'medium', { theme: 'bogcellar' });
      assert.ok(count(d, ROOM_TYPES.LAB) >= 1, `${seed}: the stillroom is there`);
      assert.ok(count(d, ROOM_TYPES.MATERIALS) >= 1, `${seed}: reagents on the shelves`);
    }
  });

  test('the rot bites: traps carry the theme bonus', () => {
    const d = generateDungeon('nt-rot', 'medium', { theme: 'bogcellar' });
    for (const trap of d.rooms.filter(r => r.trapDamage)) {
      assert.ok(trap.trapDamage >= 5, `rot-trap ${trap.trapDamage} ≥ base+1`);
    }
  });

  test('the witch respects a bargain', () => {
    assert.ok(DUNGEON_THEMES.bogcellar.bosses.find(b => b.kind === 'bog-witch').bribable);
  });
});

describe('the Ice Caverns of the Mad Pyromancer', () => {
  test('the caverns keep failing: disasters everywhere, worst traps in the game', () => {
    assert.equal(DUNGEON_THEMES.icecaverns.trapBonus, 2, 'flash-melt traps');
    let disasters = 0;
    for (const seed of [...SEEDS, 'nt-6', 'nt-7', 'nt-8']) {
      disasters += count(generateDungeon(seed, 'medium', { theme: 'icecaverns' }), ROOM_TYPES.DISASTER);
    }
    assert.ok(disasters >= 8, `steam and thaw are constant (${disasters} disasters across 8 delves)`);
  });

  test('fire and ice share the roster', () => {
    const kinds = DUNGEON_THEMES.icecaverns.monsters.map(m => m.kind);
    assert.ok(kinds.includes('frost-wisp') && kinds.includes('cinder-imp'), 'both elements present');
  });
});

describe('Every new theme, end to end', () => {
  for (const id of ['castle', 'bogcellar', 'icecaverns']) {
    test(`${id}: themed disasters read in the theme's own voice, and a party crawls it out`, () => {
      const theme = DUNGEON_THEMES[id];
      // Disaster narration is theme-specific (not the generic pool)
      const texts = new Set();
      for (let i = 0; i < 12; i++) texts.add(composePredicament({ type: ROOM_TYPES.DISASTER }, theme));
      const generic = new Set();
      for (let i = 0; i < 12; i++) generic.add(composePredicament({ type: ROOM_TYPES.DISASTER }, null));
      for (const t of texts) assert.ok(!generic.has(t), `${id}: "${t.slice(0, 40)}…" is themed`);

      // And the theme is playable end to end
      const sim = new Simulator([fighter, cleric], `${id}-run`, 'easy', { theme: id });
      let guard = 0;
      while (!sim.gameOver && guard++ < 80) sim.tick();
      assert.ok(sim.gameOver, `${id}: the delve concludes`);
    });
  }
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
