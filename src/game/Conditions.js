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
