/**
 * Tests for the card pool — wider tables, valid cards, and the
 * Craven trap personality (cowards notice tripwires).
 */

import { strict as assert } from 'assert';
import {
  getAllCards, CARD_TYPES, CLASSES,
  CHARACTER_CARDS, SPELL_CARDS, PERSONALITY_CARDS,
} from '../src/game/Cards.js';
import { Party } from '../src/agents/Party.js';
import { resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { scoreCard, DRAFT_PERSONAS } from '../src/draft/PackDraft.js';

describe('Card pool integrity', () => {
  test('every card id is unique', () => {
    const ids = getAllCards().map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('every class has at least three faces', () => {
    for (const cls of Object.values(CLASSES)) {
      const count = CHARACTER_CARDS.filter(c => c.class === cls).length;
      assert.ok(count >= 3, `${cls} has ${count} characters`);
    }
  });

  test('spells stay within known use types, and each type is represented', () => {
    const uses = new Set(SPELL_CARDS.map(s => s.use));
    for (const use of uses) {
      assert.ok(['combat', 'heal', 'utility'].includes(use), `${use} is a known use`);
    }
    for (const wanted of ['combat', 'heal', 'utility']) {
      assert.ok(uses.has(wanted), `some spell is ${wanted}`);
    }
    assert.ok(SPELL_CARDS.length >= 12, 'the grimoire shelf is stocked');
  });

  test('every card has a name, an icon, and flavor or a trait', () => {
    for (const card of getAllCards()) {
      assert.ok(card.name && card.icon, `${card.id} has a face`);
      assert.ok(card.text || card.trait, `${card.id} has writing on it`);
      assert.ok(Object.values(CARD_TYPES).includes(card.type), `${card.id} has a real type`);
    }
  });
});

describe('The Craven — trap personality', () => {
  const craven = PERSONALITY_CARDS.find(c => c.archetype === 'craven');
  const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);

  test('the Craven exists and is marked as a trap pick', () => {
    assert.ok(craven, 'The Craven is in the pool');
    assert.equal(craven.trap, true);
  });

  test('a craven party takes less trap damage (cowards notice tripwires)', () => {
    const room = () => ({ type: ROOM_TYPES.TRAP, trapDamage: 5 });
    const plain = new Party([fighter]);
    const wary = new Party([fighter, craven]);
    const plainResult = resolveRoomAction(room(), plain, 'push-through');
    const waryResult = resolveRoomAction(room(), wary, 'push-through');
    assert.equal(plainResult.damage, 5);
    assert.equal(waryResult.damage, 4, 'the tripwire was noticed');
    assert.equal(waryResult.spotted, true);
  });

  test('AI drafters flinch from trap personalities', () => {
    const guildmaster = DRAFT_PERSONAS.find(p => p.id === 'guildmaster');
    const bold = PERSONALITY_CARDS.find(c => c.archetype === 'brave');
    const flatRng = { next: () => 0 };
    const boldScore = scoreCard(bold, guildmaster, [fighter], flatRng);
    const cravenScore = scoreCard(craven, guildmaster, [fighter], flatRng);
    assert.ok(cravenScore < boldScore,
      `the Craven reads as a liability (${cravenScore} < ${boldScore})`);
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
