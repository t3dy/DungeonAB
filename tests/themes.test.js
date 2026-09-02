/**
 * Tests for themed dungeons — every delve has a face.
 * (Megabase goal: multiple dungeon types, incl. the Dungeon of
 * the Mad Alchemist.)
 */

import { strict as assert } from 'assert';
import { generateDungeon, DUNGEON_THEMES, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { composePredicament, composeWipe } from '../src/narrative/Narrator.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS } from '../src/game/Cards.js';

describe('Theme definitions', () => {
  test('every theme is fully furnished', () => {
    for (const theme of Object.values(DUNGEON_THEMES)) {
      assert.ok(theme.name && theme.icon && theme.tagline, `${theme.id} has an identity`);
      assert.ok(theme.monsters.length >= 3, `${theme.id} has a monster roster`);
      assert.ok(theme.bosses.length >= 1, `${theme.id} has at least one boss`);
      for (const m of [...theme.monsters, ...theme.bosses]) {
        assert.ok(m.name && m.attack > 0 && m.health > 0, `${theme.id}: ${m.kind} is a real monster`);
      }
    }
  });

  test('the castle is where the undead live (so to speak)', () => {
    const castle = DUNGEON_THEMES.castle;
    const undead = castle.monsters.filter(m => m.undead).length;
    assert.ok(undead >= castle.monsters.length / 2, 'the castle roster is mostly undead');
    assert.ok(castle.bosses.every(b => b.undead), 'castle bosses are undead — clerics feast');
  });
});

describe('Themed generation', () => {
  test('the seed decides the theme, deterministically', () => {
    const a = generateDungeon('theme-seed-1', 'medium');
    const b = generateDungeon('theme-seed-1', 'medium');
    assert.equal(a.theme.id, b.theme.id);
    assert.deepEqual(a.rooms.map(r => r.type), b.rooms.map(r => r.type));
  });

  test('a forced theme is honored', () => {
    const d = generateDungeon('any-seed', 'medium', { theme: 'icecaverns' });
    assert.equal(d.theme.id, 'icecaverns');
  });

  test('different seeds reach every theme eventually', () => {
    const seen = new Set();
    for (let i = 0; i < 60; i++) {
      seen.add(generateDungeon(`variety-${i}`, 'medium').theme.id);
    }
    assert.equal(seen.size, Object.keys(DUNGEON_THEMES).length, `all themes appear (got ${[...seen]})`);
  });

  test('themed dungeons draw monsters from their own roster', () => {
    for (const themeId of Object.keys(DUNGEON_THEMES)) {
      const theme = DUNGEON_THEMES[themeId];
      const kinds = new Set([...theme.monsters, ...theme.bosses].map(m => m.kind));
      const d = generateDungeon(`roster-${themeId}`, 'hard', { theme: themeId });
      for (const room of d.rooms.filter(r => r.monster)) {
        assert.ok(kinds.has(room.monster.kind),
          `${themeId}: ${room.monster.kind} belongs to the theme`);
      }
    }
  });




  test('every theme still runs entrance → boss with core guarantees', () => {
    for (const themeId of Object.keys(DUNGEON_THEMES)) {
      const d = generateDungeon(`shape-${themeId}`, 'medium', { theme: themeId });
      assert.equal(d.rooms[0].type, ROOM_TYPES.ENTRANCE);
      assert.equal(d.rooms[d.spine[d.spine.length - 1]].type, ROOM_TYPES.BOSS);
      const types = d.rooms.map(r => r.type);
      assert.ok(types.includes(ROOM_TYPES.LIBRARY), `${themeId} has a library`);
      assert.ok(types.includes(ROOM_TYPES.SHRINE), `${themeId} has a shrine`);
    }
  });
});

describe('Themes in the narration', () => {
  test('every theme has its own arrival', () => {
    const arrivals = new Set();
    for (const theme of Object.values(DUNGEON_THEMES)) {
      const text = composePredicament({ type: ROOM_TYPES.ENTRANCE }, theme);
      assert.ok(text.length > 40, `${theme.id} arrival is real writing`);
      arrivals.add(text);
    }
    assert.equal(arrivals.size, Object.keys(DUNGEON_THEMES).length, 'arrivals are distinct');
  });

  test('the epitaph names the place of death', () => {
    const fighter = CHARACTER_CARDS.find(c => c.class === 'fighter');
    const sim = new Simulator([fighter], 'epitaph-seed', 'easy', { theme: 'castle' });
    const text = composeWipe(sim.party, 3, sim.dungeon.theme);
    assert.ok(text.includes('the Castle of the Vampire Lord'), 'died somewhere specific');
  });

  test('the simulator exposes the theme to the UI', () => {
    const fighter = CHARACTER_CARDS.find(c => c.class === 'fighter');
    const sim = new Simulator([fighter], 'ui-seed', 'easy', { theme: 'icecaverns' });
    const state = sim.getState();
    assert.equal(state.theme.id, 'icecaverns');
    assert.ok(state.theme.name && state.theme.icon && state.theme.tagline);
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
