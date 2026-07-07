/**
 * Achievements — earned honors that persist across campaigns
 *
 * The roguelike's meta-progression layer: each campaign's result is
 * checked against a ladder of milestones, most of them reading the v4
 * battle-honors tally (crits, routs, veterans felled, floors reached,
 * phials identified). Pure and data-driven — a definition list plus a
 * stateless evaluator, so the whole thing is trivially testable and
 * the UI just renders what it's handed.
 *
 * Each achievement's `check(ctx)` reads a run context:
 *   { summary, difficulty, retired, stats }
 * where summary is Campaign.getSummary() (depth, gold, survivors,
 * partySize, spellsLearned, tally{crits,routs,elites,deepestFloor},
 * phialsIdentified), and stats is progression.getStats() AFTER this
 * run is folded in (so career milestones see the latest totals).
 */

export const ACHIEVEMENTS = [
  // First steps
  { id: 'first-light', name: 'First Light', icon: '🌅', tier: 'bronze',
    desc: 'Retire from a campaign with the score banked.',
    check: c => c.retired },
  { id: 'not-a-scratch', name: 'Not a Scratch', icon: '🛡️', tier: 'silver',
    desc: 'Retire with the whole party still standing.',
    check: c => c.retired && c.summary.partySize >= 2 && c.summary.survivors === c.summary.partySize },

  // Going deep (campaign depth + multi-floor)
  { id: 'deep-delver', name: 'Deep Delver', icon: '⛏️', tier: 'bronze',
    desc: 'Reach campaign depth 5.',
    check: c => c.summary.depth >= 5 },
  { id: 'into-the-abyss', name: 'Into the Abyss', icon: '🕳️', tier: 'gold',
    desc: 'Reach campaign depth 8.',
    check: c => c.summary.depth >= 8 },
  { id: 'stairward', name: 'Stairward', icon: '🪜', tier: 'bronze',
    desc: 'Descend a stairwell to a dungeon\'s second floor.',
    check: c => (c.summary.tally?.deepestFloor || 0) >= 1 },
  { id: 'bedrock', name: 'Bedrock', icon: '🪨', tier: 'silver',
    desc: 'Reach a third floor — the deepest the dungeons dig.',
    check: c => (c.summary.tally?.deepestFloor || 0) >= 2 },

  // Combat prowess (the honors tally)
  { id: 'find-the-seam', name: 'Find the Seam', icon: '🗡️', tier: 'bronze',
    desc: 'Land 5 backstab crits in one campaign.',
    check: c => (c.summary.tally?.crits || 0) >= 5 },
  { id: 'thousand-cuts', name: 'Death of a Thousand Cuts', icon: '✦', tier: 'gold',
    desc: 'Land 15 backstab crits in one campaign.',
    check: c => (c.summary.tally?.crits || 0) >= 15 },
  { id: 'giant-slayer', name: 'Giant-Slayer', icon: '⭐', tier: 'silver',
    desc: 'Fell 3 elite veterans in one campaign.',
    check: c => (c.summary.tally?.elites || 0) >= 3 },
  { id: 'they-ran', name: 'They Ran', icon: '💨', tier: 'bronze',
    desc: 'Break the nerve of 3 foes in one campaign.',
    check: c => (c.summary.tally?.routs || 0) >= 3 },

  // Systems mastery
  { id: 'alchemists-eye', name: "The Alchemist's Eye", icon: '🧪', tier: 'silver',
    desc: 'Identify 4 unlabeled phials in one campaign.',
    check: c => (c.summary.phialsIdentified || 0) >= 4 },
  { id: 'well-read', name: 'Well-Read', icon: '📚', tier: 'bronze',
    desc: 'Learn 6 spells in one campaign.',
    check: c => (c.summary.spellsLearned || 0) >= 6 },
  { id: 'dragons-hoard', name: "Dragon's Hoard", icon: '💰', tier: 'silver',
    desc: 'Bank 300 gold in one campaign.',
    check: c => (c.summary.gold || 0) >= 300 },

  // Difficulty milestones
  { id: 'hard-won', name: 'Hard-Won', icon: '⛰️', tier: 'silver',
    desc: 'Retire from a Hard campaign.',
    check: c => c.retired && c.difficulty === 'hard' },
  { id: 'woke-from-the-nightmare', name: 'Woke From the Nightmare', icon: '💀', tier: 'gold',
    desc: 'Retire from a Nightmare campaign.',
    check: c => c.retired && c.difficulty === 'nightmare' },
  { id: 'flawless-nightmare', name: 'The Nightmare Blinked First', icon: '👑', tier: 'platinum',
    desc: 'Retire from a Nightmare campaign with the whole party alive.',
    check: c => c.retired && c.difficulty === 'nightmare' && c.summary.partySize >= 2 && c.summary.survivors === c.summary.partySize },

  // Career
  { id: 'veteran-of-the-deep', name: 'Veteran of the Deep', icon: '🎖️', tier: 'gold',
    desc: 'Retire from 10 campaigns.',
    check: c => (c.stats?.totalVictories || 0) >= 10 },
];

export const ACHIEVEMENT_COUNT = ACHIEVEMENTS.length;

/** Look up an achievement definition by id. */
export function getAchievement(id) {
  return ACHIEVEMENTS.find(a => a.id === id) || null;
}

/**
 * Evaluate a run context against the ladder. Pure: returns the
 * achievement objects newly earned this run (not already in
 * `earnedIds`), in definition order. Never mutates.
 */
export function evaluateAchievements(ctx, earnedIds = []) {
  const earned = new Set(earnedIds);
  const newly = [];
  for (const a of ACHIEVEMENTS) {
    if (!earned.has(a.id) && safeCheck(a, ctx)) newly.push(a);
  }
  return newly;
}

// A malformed run context must never crash the end-of-run screen
function safeCheck(a, ctx) {
  try {
    return !!a.check(ctx);
  } catch {
    return false;
  }
}
