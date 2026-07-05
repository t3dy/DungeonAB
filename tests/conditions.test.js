/**
 * Tests for dungeon conditions — the player's wager on the delve.
 * (Megabase, the original ask: draft the conditions the party faces.)
 * A condition should visibly reshape the dungeon and pay out more.
 */

import { strict as assert } from 'assert';
import { DUNGEON_CONDITIONS, getCondition } from '../src/game/Conditions.js';
import { generateDungeon, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { Simulator } from '../src/sim/Simulator.js';
import { Campaign } from '../src/game/Campaign.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);

// Average non-boss monster attack/health across a dungeon
function monsterAvg(d) {
  const ms = d.rooms.filter(r => r.monster && !r.monster.isBoss).map(r => r.monster);
  if (!ms.length) return { atk: 0, hp: 0 };
  return {
    atk: ms.reduce((s, m) => s + m.attack, 0) / ms.length,
    hp: ms.reduce((s, m) => s + m.health, 0) / ms.length,
  };
}

describe('Condition definitions', () => {
  test('every condition is well-formed', () => {
    for (const c of Object.values(DUNGEON_CONDITIONS)) {
      assert.ok(c.id && c.name && c.icon && c.text, `${c.id} has an identity`);
      assert.ok(typeof c.scoreBonus === 'number', `${c.id} declares a score bonus`);
    }
  });

  test('the Standard Delve is a true no-op', () => {
    const none = getCondition('none');
    assert.equal(none.scoreBonus, 0);
    assert.ok(!none.weightTweaks && !none.monsterAttackMult && !none.goldMult);
  });

  test('an unknown id falls back to Standard Delve', () => {
    assert.equal(getCondition('nonsense').id, 'none');
    assert.equal(getCondition(undefined).id, 'none');
  });

  test('every wagered condition rewards more score than the standard', () => {
    for (const c of Object.values(DUNGEON_CONDITIONS)) {
      if (c.id !== 'none') assert.ok(c.scoreBonus > 0, `${c.id} pays a premium`);
    }
  });
});

describe('Conditions reshape generation', () => {
  test('Dark Pact sharpens monsters and gilds the hoard', () => {
    const plain = generateDungeon('cond-seed', 'medium', { theme: 'delve' });
    const pact = generateDungeon('cond-seed', 'medium', { theme: 'delve', condition: 'darkpact' });
    assert.ok(monsterAvg(pact).atk > monsterAvg(plain).atk, 'monsters hit harder');

    const plainGold = plain.rooms.filter(r => r.gold).map(r => r.gold);
    const pactGold = pact.rooms.filter(r => r.gold).map(r => r.gold);
    if (plainGold.length && pactGold.length) {
      assert.ok(pactGold[0] > plainGold[0], 'treasure pays more');
    }
  });

  test('Monster Swarms thins the foes but multiplies the fights', () => {
    const plain = generateDungeon('swarm-seed', 'medium', { theme: 'delve' });
    const swarm = generateDungeon('swarm-seed', 'medium', { theme: 'delve', condition: 'swarms' });
    assert.ok(monsterAvg(swarm).hp < monsterAvg(plain).hp, 'individually weaker');
    const count = d => d.rooms.filter(r => r.type === ROOM_TYPES.MONSTER).length;
    assert.ok(count(swarm) >= count(plain), 'but more of them');
  });

  test('Trap-Dense deepens the bite', () => {
    const trapped = generateDungeon('trap-seed', 'medium', { theme: 'delve', condition: 'traps' });
    const plain = generateDungeon('trap-seed', 'medium', { theme: 'delve' });
    const maxTrap = d => Math.max(0, ...d.rooms.filter(r => r.trapDamage).map(r => r.trapDamage));
    if (maxTrap(plain) > 0) assert.ok(maxTrap(trapped) > maxTrap(plain));
  });

  test('the Long Throne fattens the boss', () => {
    const plain = generateDungeon('throne-seed', 'medium', { theme: 'delve' });
    const throne = generateDungeon('throne-seed', 'medium', { theme: 'delve', condition: 'throne' });
    const boss = d => d.rooms.find(r => r.type === ROOM_TYPES.BOSS).monster;
    assert.ok(boss(throne).health > boss(plain).health, 'the horror has grown');
  });

  test('conditions never break traversability (entrance → boss, guarantees hold)', () => {
    for (const id of Object.keys(DUNGEON_CONDITIONS)) {
      const d = generateDungeon(`trav-${id}`, 'hard', { theme: 'crypt', condition: id });
      assert.equal(d.rooms[0].type, ROOM_TYPES.ENTRANCE);
      assert.equal(d.rooms[d.rooms.length - 1].type, ROOM_TYPES.BOSS);
      assert.ok(d.rooms.some(r => r.type === ROOM_TYPES.LIBRARY), `${id}: still a library`);
      assert.ok(d.rooms.some(r => r.type === ROOM_TYPES.SHRINE), `${id}: still a shrine`);
    }
  });
});

describe('Conditions in the run', () => {
  test('the simulator carries the wager and pays a bigger multiplier', () => {
    const plain = new Simulator([fighter], 'run-seed', 'medium', { theme: 'delve' });
    const wagered = new Simulator([fighter], 'run-seed', 'medium', { theme: 'delve', condition: 'throne' });
    assert.ok(wagered.scoreMultiplier > plain.scoreMultiplier, 'the wager sweetens the payout');
    assert.equal(wagered.getState().condition.id, 'throne', 'exposed to the UI');
  });

  test('a standard delve exposes no condition to the UI', () => {
    const sim = new Simulator([fighter], 'run-plain', 'medium', { theme: 'delve', condition: 'none' });
    assert.equal(sim.getState().condition, null);
  });

  test('the campaign applies its condition to every depth', () => {
    const campaign = new Campaign([fighter], { seed: 'camp-cond', condition: 'traps' });
    const d1 = campaign.nextDelve('delve');
    assert.equal(d1.condition.id, 'traps');
    d1.victory = true; campaign.recordDelve(d1);
    const d2 = campaign.nextDelve('delve');
    assert.equal(d2.condition.id, 'traps', 'the wager rides the whole campaign');
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
