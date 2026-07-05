/**
 * Conditions — the wager the player lays on the dungeon
 *
 * The original pillar (Megabase, the very first ask): you draft not
 * only the party but "the conditions the characters will face." Here
 * that's a pre-delve choice — a risk/reward modifier that makes the
 * dungeon meaner in exchange for a fatter score. Effects are
 * declarative so DungeonGen and the Simulator can read them without
 * knowing the specific condition.
 *
 * Effect fields (all optional):
 *   scoreBonus         added to the run's score multiplier (the reward)
 *   weightTweaks       merged into room-type generation weights
 *   trapBonus          extra trap damage, stacks with the theme's
 *   goldMult           multiplier on treasure gold
 *   monsterAttackMult  non-boss monster attack scaling
 *   monsterHealthMult  non-boss monster health scaling
 *   bossAttackMult     boss attack scaling
 *   bossHealthMult     boss health scaling
 */

export const DUNGEON_CONDITIONS = {
  none: {
    id: 'none', name: 'Standard Delve', icon: '🗺️',
    text: 'No wager. The dungeon as the dungeon intends.',
    scoreBonus: 0,
  },
  swarms: {
    id: 'swarms', name: 'Monster Swarms', icon: '🐝',
    text: 'The halls run thick with the weak and the many — more fights, thinner foes, more score.',
    scoreBonus: 0.25,
    weightTweaks: { monster: 2, corridor: -0.3 },
    monsterHealthMult: 0.7,
  },
  traps: {
    id: 'traps', name: 'Trap-Dense', icon: '🪤',
    text: 'Every flagstone is a question. More traps, and they bite deeper.',
    scoreBonus: 0.25,
    weightTweaks: { trap: 2 },
    trapBonus: 2,
  },
  darkpact: {
    id: 'darkpact', name: 'Dark Pact', icon: '🩸',
    text: 'The dungeon\'s malice sharpens its teeth — and gilds its hoard.',
    scoreBonus: 0.3,
    monsterAttackMult: 1.25,
    goldMult: 1.5,
  },
  nightfall: {
    id: 'nightfall', name: 'Endless Night', icon: '🌑',
    text: 'No light reaches here. The dungeon itself turns hostile more often.',
    scoreBonus: 0.3,
    weightTweaks: { disaster: 1.5, treasure: -0.3 },
  },
  throne: {
    id: 'throne', name: 'The Long Throne', icon: '👑',
    text: 'Fewer rooms, one horror. The boss has grown fat on patience.',
    scoreBonus: 0.35,
    weightTweaks: { monster: -1, treasure: 0.5 },
    bossAttackMult: 1.4,
    bossHealthMult: 1.4,
  },
};

/** Look up a condition by id, defaulting to the harmless Standard Delve. */
export function getCondition(id) {
  return DUNGEON_CONDITIONS[id] || DUNGEON_CONDITIONS.none;
}

/**
 * Compose two conditions into one (a wager plus a rival's hex).
 * Bonuses sum, multipliers multiply, weight tweaks add — so stacking
 * is meaner AND pays more, never a silent overwrite. Standard Delve
 * is the identity: combining with it returns the other side.
 */
export function combineConditions(a, b) {
  const left = (a && typeof a === 'object') ? a : getCondition(a);
  const right = (b && typeof b === 'object') ? b : getCondition(b);
  if (left.id === 'none') return right;
  if (right.id === 'none') return left;

  const weightTweaks = { ...(left.weightTweaks || {}) };
  for (const [type, tweak] of Object.entries(right.weightTweaks || {})) {
    weightTweaks[type] = (weightTweaks[type] || 0) + tweak;
  }

  const mult = key => (left[key] || 1) * (right[key] || 1);
  const combined = {
    id: `${left.id}+${right.id}`,
    name: `${left.name} + ${right.name}`,
    icon: `${left.icon}${right.icon}`,
    text: `${left.text} ${right.text}`,
    scoreBonus: (left.scoreBonus || 0) + (right.scoreBonus || 0),
    weightTweaks,
    trapBonus: (left.trapBonus || 0) + (right.trapBonus || 0),
  };
  for (const key of ['goldMult', 'monsterAttackMult', 'monsterHealthMult', 'bossAttackMult', 'bossHealthMult']) {
    const v = mult(key);
    if (v !== 1) combined[key] = v;
  }
  return combined;
}
