/**
 * Tests for difficulty scaling and corridor frontage
 */

import { strict as assert } from 'assert';
import { generateDungeon, STAT_SCALE, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { Party } from '../src/agents/Party.js';
import { CHARACTER_CARDS } from '../src/game/Cards.js';

function bossOf(dungeon) {
  return dungeon.rooms.find(r => r.type === ROOM_TYPES.BOSS).monster;
}

describe('Difficulty sharpens the monsters', () => {
  test('stat scale rises with difficulty', () => {
    assert.ok(STAT_SCALE.easy < STAT_SCALE.medium);
    assert.ok(STAT_SCALE.medium < STAT_SCALE.hard);
    assert.ok(STAT_SCALE.hard < STAT_SCALE.nightmare);
  });

  test('the same seed breeds meaner bosses on nightmare than easy', () => {
    const easy = bossOf(generateDungeon('scale-test', 'easy'));
    const nightmare = bossOf(generateDungeon('scale-test', 'nightmare'));
    assert.ok(nightmare.health > easy.health, `nightmare boss hp ${nightmare.health} > easy ${easy.health}`);
    assert.ok(nightmare.attack > easy.attack, `nightmare boss atk ${nightmare.attack} > easy ${easy.attack}`);
  });

  test('bosses are flagged as bosses', () => {
    const boss = bossOf(generateDungeon('flag-test', 'medium'));
    assert.equal(boss.isBoss, true);
  });

  test('campaign depth stacks on top of difficulty', () => {
    const shallow = bossOf(generateDungeon('depth-test', 'medium', { depth: 1 }));
    const deep = bossOf(generateDungeon('depth-test', 'medium', { depth: 3 }));
    assert.ok(deep.health > shallow.health);
    assert.ok(deep.attack > shallow.attack);
  });
});

describe('Corridor frontage', () => {
  const fighters = CHARACTER_CARDS.filter(c => c.class === 'fighter');

  test('small parties swing at full strength', () => {
    const party = new Party(CHARACTER_CARDS.slice(0, 4));
    assert.equal(party.combatAttack(), party.totalAttack());
  });

  test('a mob helps less than it thinks: rear ranks contribute a quarter', () => {
    // Build an oversized party by repeating the card pool
    const mob = new Party([
      ...CHARACTER_CARDS, ...CHARACTER_CARDS,
    ]);
    assert.ok(mob.members.length > 10);
    const combat = mob.combatAttack();
    const total = mob.totalAttack();
    assert.ok(combat < total, `frontage ${combat} should be less than mob total ${total}`);
    // Sanity: the front five still count fully
    const attacks = mob.living().map(m => m.attack).sort((a, b) => b - a);
    const front = attacks.slice(0, 5).reduce((s, a) => s + a, 0);
    assert.ok(combat >= front, 'the front rank is never diluted');
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
