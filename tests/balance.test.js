/**
 * Tests for difficulty scaling and corridor frontage
 */

import { strict as assert } from 'assert';
import { generateDungeon, STAT_SCALE, DEPTH_SCALE, ROOM_TYPES } from '../src/world/DungeonGen.js';
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

describe('Depth escalation is difficulty-aware (the second lever)', () => {
  test('the per-depth rate rises with difficulty', () => {
    const order = ['easy', 'medium', 'hard', 'nightmare'];
    for (let i = 1; i < order.length; i++) {
      assert.ok(DEPTH_SCALE[order[i]].atk > DEPTH_SCALE[order[i - 1]].atk, `${order[i]} atk steeper`);
      assert.ok(DEPTH_SCALE[order[i]].hp > DEPTH_SCALE[order[i - 1]].hp, `${order[i]} hp steeper`);
    }
  });

  test('at depth 1 the tiers differ ONLY by STAT_SCALE — the card audit is safe', () => {
    // Same seed → same monster roster and rolls; depth-1 depthRates is
    // ×0, so a tier's depth-1 stats must equal the base × its STAT_SCALE.
    // The easy:hard health ratio must therefore be exactly STAT_SCALE.easy:hard.
    const bossAt = diff => bossOf(generateDungeon('audit-safe', diff, { depth: 1, theme: 'delve', floors: 1 }));
    const easy = bossAt('easy');
    const hard = bossAt('hard');
    // Both scale the same base by their STAT_SCALE only (rounding aside)
    const expected = STAT_SCALE.hard / STAT_SCALE.easy;
    const got = hard.health / easy.health;
    assert.ok(Math.abs(got - expected) < 0.08, `depth-1 ratio is pure STAT_SCALE (${got.toFixed(2)} ≈ ${expected.toFixed(2)})`);
  });

  test('by campaign depth, a meaner tier outclimbs a gentler one', () => {
    // Same seed and depth; only the tier's escalation rate differs.
    const avgStat = (diff, depth) => {
      const d = generateDungeon('climb', diff, { depth, theme: 'delve', floors: 1 });
      const ms = d.rooms.filter(r => r.monster).map(r => r.monster);
      return ms.reduce((s, m) => s + m.attack + m.health, 0) / ms.length;
    };
    // Deep, the ordering by difficulty is strict
    assert.ok(avgStat('medium', 5) > avgStat('easy', 5), 'medium outclimbs easy by depth 5');
    assert.ok(avgStat('hard', 5) > avgStat('medium', 5), 'hard outclimbs medium by depth 5');
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
