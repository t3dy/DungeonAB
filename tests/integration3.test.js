/**
 * Tests for the v3 integration layer — the deep systems must be
 * visible: monsters tell their natures, the party plans around them,
 * afflictions surface in the state, and every theme has a palette.
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'node:fs';
import { composePredicament } from '../src/narrative/Narrator.js';
import { natureAdjustments, resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { Party } from '../src/agents/Party.js';
import { Simulator } from '../src/sim/Simulator.js';
import { ROOM_TYPES, DUNGEON_THEMES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, SPELL_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const sp = id => SPELL_CARDS.find(s => s.id === id);

describe('Monsters tell their natures (the writing reads the Bestiary)', () => {
  test('every trait has a tell in the predicament', () => {
    for (const trait of ['armored', 'ethereal', 'venomous', 'swarm', 'slow']) {
      const text = composePredicament({
        type: ROOM_TYPES.MONSTER,
        monster: { name: 'a test thing', trait },
      });
      assert.ok(text.length > 80, `${trait}: the tell lengthens the passage`);
    }
    // Distinct traits read differently
    const armored = composePredicament({ type: ROOM_TYPES.MONSTER, monster: { name: 'a test thing', trait: 'armored' } });
    assert.ok(armored.includes('Plate') || armored.includes('mean it'), 'the armor shows');
  });

  test('weaknesses show — and the undead will not look at the cleric', () => {
    const fiery = composePredicament({ type: ROOM_TYPES.MONSTER, monster: { name: 'a mite', weak: ['fire'] } });
    assert.ok(fiery.includes('torches'), 'fire-shy');
    const dead = composePredicament({ type: ROOM_TYPES.MONSTER, monster: { name: 'a shade', undead: true } });
    assert.ok(dead.includes('cleric'), 'holy-shy');
  });

  test('trap kinds show to those who look down', () => {
    for (const [type, hint] of [['fire', 'Scorch'], ['poison', 'beetles'], ['alarm', 'bell']]) {
      const text = composePredicament({ type: ROOM_TYPES.TRAP, trapType: type });
      assert.ok(text.includes(hint), `${type} traps telegraph (${hint})`);
    }
  });
});

describe('The party plans around natures', () => {
  test('steel is a bad plan against the ethereal — without faith', () => {
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a shade', trait: 'ethereal' } };
    const faithless = natureAdjustments(new Party([byClass('fighter'), byClass('rogue')]), room);
    assert.ok(faithless.fight < 0 && faithless.sneak > 0, 'avoid the unhittable');
    const faithful = natureAdjustments(new Party([byClass('fighter'), byClass('cleric')]), room);
    assert.ok(!faithful.fight, 'with a cleric, steel is fine');
  });

  test('a caster holding the weakness wants to use it', () => {
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a salamander', weak: ['frost'], resist: ['fire'] } };
    const cold = natureAdjustments(new Party([byClass('wizard'), sp('sp-frost')]), room);
    assert.ok(cold['spell-strike'] >= 2, 'the frost begs to be cast');
    const wrong = natureAdjustments(new Party([byClass('wizard'), sp('sp-firebolt')]), room);
    assert.ok(!wrong['spell-strike'], 'a resisted element earns no eagerness');
  });

  test('swarms invite the fireball; the armored invite magic generally', () => {
    const swarm = natureAdjustments(new Party([byClass('fighter')]), { monster: { trait: 'swarm' } });
    assert.ok(swarm['spell-strike'] >= 2);
    const tank = natureAdjustments(new Party([byClass('fighter')]), { monster: { trait: 'armored' } });
    assert.ok(tank['spell-strike'] > 0 && tank.fight < 0);
  });

  test('empty rooms adjust nothing', () => {
    assert.deepEqual(natureAdjustments(new Party([byClass('fighter')]), { type: 'shrine' }), {});
  });
});

describe('Afflictions surface in the state', () => {
  test('venom and alarms are visible to the UI', () => {
    const sim = new Simulator([byClass('fighter')], 'ui-afflict', 'easy', { theme: 'delve' });
    sim.party.poisonLinger = 2;
    sim.party.alarmed = true;
    const state = sim.getState();
    assert.equal(state.party.poisonLinger, 2);
    assert.equal(state.party.alarmed, true);
  });

  test('the strike\'s element rides the narration for the FX', () => {
    const party = new Party([byClass('wizard'), sp('sp-frost')]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a salamander', attack: 1, health: 8, weak: ['frost'] } };
    const result = resolveRoomAction(room, party, 'spell-strike');
    assert.equal(result.spellElement, 'frost');
  });
});

describe('Every theme wears its own colors', () => {
  test('the palette table covers every registered theme (and the DLC)', () => {
    // The palette map lives in the renderer module (not headless-importable)
    const src = readFileSync(new URL('../src/ui/IsoDungeonRenderer.js', import.meta.url), 'utf8');
    for (const id of [...Object.keys(DUNGEON_THEMES), 'athanor']) {
      assert.ok(new RegExp(`\\b${id}: \\{ plat:`).test(src), `${id} has a palette`);
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
