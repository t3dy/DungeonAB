/**
 * Tests for dungeon conditions — the player's wager on the delve.
 * (Megabase, the original ask: draft the conditions the party faces.)
 * A condition should visibly reshape the dungeon and pay out more.
 */

import { strict as assert } from 'assert';
import { DUNGEON_CONDITIONS, getCondition, combineConditions } from '../src/game/Conditions.js';
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

describe('Combining conditions (a wager plus a hex)', () => {
  test('Standard Delve is the identity on both sides', () => {
    assert.equal(combineConditions('none', 'traps').id, 'traps');
    assert.equal(combineConditions('traps', 'none').id, 'traps');
    assert.equal(combineConditions('none', 'none').id, 'none');
  });

  test('bonuses sum, multipliers multiply, weights add', () => {
    const combo = combineConditions('traps', 'darkpact');
    assert.equal(combo.scoreBonus, getCondition('traps').scoreBonus + getCondition('darkpact').scoreBonus);
    assert.equal(combo.trapBonus, getCondition('traps').trapBonus);
    assert.equal(combo.goldMult, getCondition('darkpact').goldMult);
    assert.equal(combo.monsterAttackMult, getCondition('darkpact').monsterAttackMult);
    assert.equal(combo.weightTweaks.trap, getCondition('traps').weightTweaks.trap);
    assert.ok(combo.name.includes('Trap-Dense') && combo.name.includes('Dark Pact'));
  });

  test('a combined condition flows through generation (both effects land)', () => {
    // Summed over several seeds so single-layout variance can't flake it
    const combined = combineConditions('traps', 'darkpact');
    let plainTrap = 0;
    let comboTrap = 0;
    let plainAtk = 0;
    let comboAtk = 0;
    for (const seed of ['combo-1', 'combo-2', 'combo-3', 'combo-4', 'combo-5']) {
      const plain = generateDungeon(seed, 'medium', { theme: 'delve' });
      const combo = generateDungeon(seed, 'medium', { theme: 'delve', condition: combined });
      plainTrap += Math.max(0, ...plain.rooms.filter(r => r.trapDamage).map(r => r.trapDamage));
      comboTrap += Math.max(0, ...combo.rooms.filter(r => r.trapDamage).map(r => r.trapDamage));
      plainAtk += monsterAvg(plain).atk;
      comboAtk += monsterAvg(combo).atk;
    }
    assert.ok(comboTrap > plainTrap, `the hex's traps bite (${comboTrap} > ${plainTrap})`);
    assert.ok(comboAtk > plainAtk, `the wager's monsters hit (${comboAtk} > ${plainAtk})`);
  });

  test('a combined condition pays its combined premium in the run', () => {
    const combo = combineConditions('traps', 'darkpact');
    const sim = new Simulator([fighter], 'combo-run', 'medium', { theme: 'delve', condition: combo });
    const plain = new Simulator([fighter], 'combo-run', 'medium', { theme: 'delve' });
    const expected = plain.scoreMultiplier * (1 + combo.scoreBonus);
    assert.ok(Math.abs(sim.scoreMultiplier - expected) < 1e-9, 'premium sums into the multiplier');
    assert.ok(sim.getState().condition.name.includes('+') || sim.getState().condition.name.includes(' + '), 'the UI sees the combined name');
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
      assert.equal(d.rooms[d.spine[d.spine.length - 1]].type, ROOM_TYPES.BOSS);
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
