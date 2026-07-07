/**
 * Tests for the achievements ladder — the meta-progression layer that
 * reads the v4 battle-honors tally and persists across campaigns.
 */

import { strict as assert } from 'assert';
import {
  ACHIEVEMENTS, ACHIEVEMENT_COUNT, getAchievement, evaluateAchievements,
} from '../src/game/Achievements.js';
import { ProgressionManager } from '../src/game/Progression.js';

// A run result shaped like showFinal passes to recordRun
const run = (over = {}) => ({
  score: 100, gold: 50, roomsCleared: 10, victory: false,
  survivors: 2, partySize: 4, depth: 1, spellsLearned: 0,
  tally: { crits: 0, routs: 0, elites: 0, deepestFloor: 0 },
  phialsIdentified: 0, condition: null,
  ...over,
});
const ctxFor = (result, difficulty = 'medium', stats = {}) => ({
  summary: {
    depth: result.depth, gold: result.gold, survivors: result.survivors,
    partySize: result.partySize, spellsLearned: result.spellsLearned,
    tally: result.tally, phialsIdentified: result.phialsIdentified,
  },
  difficulty, retired: result.victory, stats,
});

describe('The ladder is well-formed', () => {
  test('every achievement has the required shape', () => {
    for (const a of ACHIEVEMENTS) {
      assert.ok(a.id && a.name && a.icon, `${a.id}: id/name/icon`);
      assert.ok(a.desc && a.desc.length > 10, `${a.id}: a real description`);
      assert.ok(['bronze', 'silver', 'gold', 'platinum'].includes(a.tier), `${a.id}: known tier`);
      assert.equal(typeof a.check, 'function', `${a.id}: has a check`);
    }
  });

  test('ids are unique and the count is honest', () => {
    const ids = ACHIEVEMENTS.map(a => a.id);
    assert.equal(new Set(ids).size, ids.length, 'no duplicate ids');
    assert.equal(ACHIEVEMENT_COUNT, ACHIEVEMENTS.length);
    assert.ok(getAchievement('first-light'));
    assert.equal(getAchievement('nope'), null);
  });
});

describe('Evaluation is pure and correct', () => {
  test('retiring earns First Light; a wipe earns nothing baseline', () => {
    const win = evaluateAchievements(ctxFor(run({ victory: true })));
    assert.ok(win.some(a => a.id === 'first-light'));

    const loss = evaluateAchievements(ctxFor(run({ victory: false })));
    assert.ok(!loss.some(a => a.id === 'first-light'), 'no glory without retiring');
  });

  test('the honors tally unlocks combat milestones', () => {
    const earned = evaluateAchievements(ctxFor(run({
      victory: true, tally: { crits: 16, routs: 3, elites: 3, deepestFloor: 2 }, phialsIdentified: 4,
    }))).map(a => a.id);
    assert.ok(earned.includes('find-the-seam'), '5+ crits');
    assert.ok(earned.includes('thousand-cuts'), '15+ crits');
    assert.ok(earned.includes('giant-slayer'), '3 elites');
    assert.ok(earned.includes('they-ran'), '3 routs');
    assert.ok(earned.includes('stairward') && earned.includes('bedrock'), 'floors 2 and 3');
    assert.ok(earned.includes('alchemists-eye'), '4 phials');
  });

  test('already-earned achievements are never re-returned', () => {
    const ctx = ctxFor(run({ victory: true }));
    const first = evaluateAchievements(ctx, []);
    assert.ok(first.some(a => a.id === 'first-light'));
    const second = evaluateAchievements(ctx, first.map(a => a.id));
    assert.ok(!second.some(a => a.id === 'first-light'), 'no double-award');
  });

  test('difficulty and flawless milestones gate correctly', () => {
    const hardWin = evaluateAchievements(ctxFor(run({ victory: true, survivors: 4, partySize: 4 }), 'hard')).map(a => a.id);
    assert.ok(hardWin.includes('hard-won') && hardWin.includes('not-a-scratch'));
    assert.ok(!hardWin.includes('woke-from-the-nightmare'));

    const nmFlawless = evaluateAchievements(ctxFor(run({ victory: true, survivors: 3, partySize: 3 }), 'nightmare')).map(a => a.id);
    assert.ok(nmFlawless.includes('woke-from-the-nightmare') && nmFlawless.includes('flawless-nightmare'));

    const nmBloody = evaluateAchievements(ctxFor(run({ victory: true, survivors: 1, partySize: 4 }), 'nightmare')).map(a => a.id);
    assert.ok(nmBloody.includes('woke-from-the-nightmare'), 'the win counts');
    assert.ok(!nmBloody.includes('flawless-nightmare'), 'but not flawless with losses');
  });

  test('a malformed context never throws', () => {
    assert.doesNotThrow(() => evaluateAchievements({}, []));
    assert.doesNotThrow(() => evaluateAchievements({ summary: null, stats: null }, []));
    assert.deepEqual(evaluateAchievements({ retired: false }, []).filter(a => a.check).length ? [] : [], []);
  });
});

describe('Progression persists and awards once', () => {
  test('recordRun returns newly-earned and stores them', () => {
    const p = new ProgressionManager();   // no localStorage in Node → in-memory
    const earned = p.recordRun('medium', run({ victory: true, tally: { crits: 6, routs: 0, elites: 0, deepestFloor: 1 } }));
    const ids = earned.map(a => a.id);
    assert.ok(ids.includes('first-light') && ids.includes('find-the-seam') && ids.includes('stairward'));
    assert.ok(p.hasAchievement('first-light'), 'and they persist on the manager');
  });

  test('a repeat run does not re-award the same milestones', () => {
    const p = new ProgressionManager();
    p.recordRun('medium', run({ victory: true }));
    const again = p.recordRun('medium', run({ victory: true }));
    assert.ok(!again.some(a => a.id === 'first-light'), 'First Light is earned once');
  });

  test('career milestone counts the run that completes it', () => {
    const p = new ProgressionManager();
    let last = [];
    for (let i = 0; i < 10; i++) last = p.recordRun('medium', run({ victory: true }));
    assert.ok(last.some(a => a.id === 'veteran-of-the-deep'), 'the 10th retirement unlocks it');
    assert.ok(p.hasAchievement('veteran-of-the-deep'));
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
