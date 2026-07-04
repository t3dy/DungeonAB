/**
 * Tests for the bark system — personality × class dialogue.
 * The Megabase rule under test: every archetype speaks differently
 * through every class, and nobody is ever speechless.
 */

import { strict as assert } from 'assert';
import { getBark, getAllBarks } from '../src/narrative/Barks.js';
import { CLASSES, CHARACTER_CARDS, PERSONALITY_CARDS } from '../src/game/Cards.js';
import { Party } from '../src/agents/Party.js';
import { composeDeliberation } from '../src/narrative/Narrator.js';

const ALL_CLASSES = Object.values(CLASSES);
const ALL_ARCHETYPES = PERSONALITY_CARDS.map(c => c.archetype);

describe('Bark coverage', () => {
  test('every class × archetype combination has at least 2 lines', () => {
    const table = getAllBarks();
    for (const cls of ALL_CLASSES) {
      assert.ok(table[cls], `${cls} has a bark table`);
      for (const archetype of ALL_ARCHETYPES) {
        const lines = table[cls][archetype];
        assert.ok(Array.isArray(lines) && lines.length >= 2,
          `${cls} × ${archetype} has ≥2 barks`);
        for (const line of lines) {
          assert.ok(line.length > 5, `${cls} × ${archetype} lines are real writing`);
        }
      }
    }
  });

  test('every class has a generic fallback voice', () => {
    const table = getAllBarks();
    for (const cls of ALL_CLASSES) {
      assert.ok(table[cls].generic?.length >= 2, `${cls} has generic barks`);
    }
  });

  test('same archetype, different class, different line (the Megabase rule)', () => {
    const table = getAllBarks();
    for (const archetype of ALL_ARCHETYPES) {
      const fighterLines = new Set(table[CLASSES.FIGHTER][archetype]);
      for (const line of table[CLASSES.WIZARD][archetype]) {
        assert.ok(!fighterLines.has(line),
          `${archetype}: fighter and wizard do not share the line "${line}"`);
      }
    }
  });
});

describe('Bark selection', () => {
  test('selection draws from the drafted archetype', () => {
    const table = getAllBarks();
    const recklessLines = table[CLASSES.WIZARD].reckless;
    const line = getBark(CLASSES.WIZARD, ['reckless'], () => 0);
    assert.ok(recklessLines.includes(line));
  });

  test('multiple drafted personalities pool their lines', () => {
    const table = getAllBarks();
    const pool = [...table[CLASSES.ROGUE].brave, ...table[CLASSES.ROGUE].greedy];
    // rng sweeps the pool: every returned line must come from the union
    for (const r of [0, 0.3, 0.6, 0.99]) {
      const line = getBark(CLASSES.ROGUE, ['brave', 'greedy'], () => r);
      assert.ok(pool.includes(line));
    }
  });

  test('no drafted personality falls back to the class generic', () => {
    const table = getAllBarks();
    const line = getBark(CLASSES.CLERIC, [], () => 0);
    assert.ok(table[CLASSES.CLERIC].generic.includes(line));
  });

  test('an unknown archetype is survivable (falls back, never crashes)', () => {
    const line = getBark(CLASSES.FIGHTER, ['sleepy'], () => 0);
    assert.ok(typeof line === 'string' && line.length > 0);
  });

  test('an unknown class returns null rather than throwing', () => {
    assert.equal(getBark('bard', ['brave']), null);
  });

  test('nobody repeats their best line back-to-back', () => {
    // With rng pinned to 0, only the no-repeat memory can vary the line
    const first = getBark(CLASSES.WIZARD, ['scholarly'], () => 0);
    const second = getBark(CLASSES.WIZARD, ['scholarly'], () => 0);
    assert.notEqual(first, second, 'the echo is still in the room');
  });
});

describe('Barks in the deliberation beat', () => {
  test('the class advocate speaks an in-character line', () => {
    const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);
    const brave = PERSONALITY_CARDS.find(c => c.archetype === 'brave');
    const party = new Party([fighter, brave]);
    const options = [{ id: 'fight' }, { id: 'flee' }];
    const text = composeDeliberation('fight', options, party);
    assert.ok(text.includes('made the case'), 'advocate is named');
    assert.ok(text.includes('"'), 'advocate actually speaks');
  });

  test('deliberation still works with no personalities drafted', () => {
    const rogue = CHARACTER_CARDS.find(c => c.class === CLASSES.ROGUE);
    const party = new Party([rogue]);
    const options = [{ id: 'disarm' }, { id: 'push-through' }];
    const text = composeDeliberation('disarm', options, party);
    assert.ok(text.includes('chose to'));
    assert.ok(text.includes('"'), 'generic class voice speaks');
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
