/**
 * Standings — how the player placed against the table
 *
 * DESIGN v1: "player + 3 AI drafters, solo dungeon runs, compare
 * scores at the table." The rivals drafted real pools; here they
 * actually delve them. Each AI seat runs a headless mini-campaign
 * (same difficulty and wager as the player, its own dungeons, up to
 * the depth the player attempted) and the scores line up side by side.
 */

import { Campaign } from './Campaign.js';

/**
 * Run one seat's pool through up to `targetDepth` dungeons, headless,
 * and return { score, depthReached }.
 */
function runRival(pool, { seed, difficulty, condition, targetDepth }) {
  const campaign = new Campaign(pool.map(c => ({ ...c })), { seed, difficulty, condition });
  let depthReached = 0;
  for (let d = 0; d < targetDepth; d++) {
    const sim = campaign.nextDelve();
    if (!sim) break;
    let guard = 0;
    while (!sim.gameOver && guard++ < 500) sim.tick();
    campaign.recordDelve(sim);
    depthReached++;
    if (campaign.over) break; // a wipe ends the rival's night
  }
  return { score: campaign.party.score, depthReached };
}

/**
 * Build the final table standings.
 *
 * @param draft   the PackDraft (its AI seats hold drafted pools)
 * @param player  the human result: { score, depth }
 * @param opts    { seed, difficulty, condition } shared across the table
 * @returns sorted array of { name, icon, score, depthReached, isPlayer, place }
 */
export function computeStandings(draft, player, opts = {}) {
  const { seed = 'table', difficulty = 'medium', condition = 'none' } = opts;
  const targetDepth = Math.max(1, player.depth || 1);

  const rows = [];

  // The rivals actually delve their drafts
  for (const seat of draft.seats.filter(s => s.isAI)) {
    const result = runRival(seat.pool, {
      seed: `${seed}-rival-${seat.id}`,
      difficulty,
      condition,
      targetDepth,
    });
    rows.push({ name: seat.name, icon: seat.icon, isPlayer: false, ...result });
  }

  // The player's real run
  rows.push({
    name: 'You', icon: '🗡️', isPlayer: true,
    score: player.score, depthReached: targetDepth,
  });

  // Rank by score, then by how deep they got
  rows.sort((a, b) => b.score - a.score || b.depthReached - a.depthReached);
  rows.forEach((r, i) => { r.place = i + 1; });

  return rows;
}
