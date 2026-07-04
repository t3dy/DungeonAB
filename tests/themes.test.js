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

  test('the crypt is where the undead live (so to speak)', () => {
    const crypt = DUNGEON_THEMES.crypt;
    const undead = crypt.monsters.filter(m => m.undead).length;
    assert.ok(undead >= crypt.monsters.length / 2, 'the crypt roster is mostly undead');
    assert.ok(crypt.bosses.every(b => b.undead), 'crypt bosses are undead — clerics feast');
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
    const d = generateDungeon('any-seed', 'medium', { theme: 'volcanic' });
    assert.equal(d.theme.id, 'volcanic');
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

  test('the mad lab always has a lab, alchemist or no', () => {
    for (const seed of ['ml1', 'ml2', 'ml3', 'ml4', 'ml5']) {
      const d = generateDungeon(seed, 'medium', { theme: 'madlab' });
      const types = d.rooms.map(r => r.type);
      assert.ok(types.includes(ROOM_TYPES.LAB), `${seed}: the lab is the point`);
      assert.ok(types.includes(ROOM_TYPES.MATERIALS), `${seed}: with materials to work`);
    }
  });

  test('the athenaeum guarantees two libraries', () => {
    for (const seed of ['ath1', 'ath2', 'ath3']) {
      const d = generateDungeon(seed, 'medium', { theme: 'library' });
      const libs = d.rooms.filter(r => r.type === ROOM_TYPES.LIBRARY).length;
      assert.ok(libs >= 2, `${seed}: ${libs} libraries`);
    }
  });

  test('volcanic traps bite harder', () => {
    const d = generateDungeon('hot-seed', 'medium', { theme: 'volcanic' });
    for (const trap of d.rooms.filter(r => r.type === ROOM_TYPES.TRAP)) {
      assert.ok(trap.trapDamage >= 6, 'fire traps start at 6');
    }
  });

  test('every theme still runs entrance → boss with core guarantees', () => {
    for (const themeId of Object.keys(DUNGEON_THEMES)) {
      const d = generateDungeon(`shape-${themeId}`, 'medium', { theme: themeId });
      assert.equal(d.rooms[0].type, ROOM_TYPES.ENTRANCE);
      assert.equal(d.rooms[d.rooms.length - 1].type, ROOM_TYPES.BOSS);
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
    const sim = new Simulator([fighter], 'epitaph-seed', 'easy', { theme: 'crypt' });
    const text = composeWipe(sim.party, 3, sim.dungeon.theme);
    assert.ok(text.includes('the Ancient Crypt'), 'died somewhere specific');
  });

  test('the simulator exposes the theme to the UI', () => {
    const fighter = CHARACTER_CARDS.find(c => c.class === 'fighter');
    const sim = new Simulator([fighter], 'ui-seed', 'easy', { theme: 'madlab' });
    const state = sim.getState();
    assert.equal(state.theme.id, 'madlab');
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
