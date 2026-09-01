/**
 * Standings — how the player placed against the table
 *
 * DESIGN v1: "player + 3 AI drafters, solo dungeon runs, compare
 * scores at the table." The rivals drafted real pools; here they
 * actually delve them. Each AI seat runs a headless mini-campaign
 * (same difficulty and wager as the player, its own dungeons, up to
 * the depth the player attempted) and the scores line up side by side.
 */

import { Simulator } from '../sim/Simulator.js';

/**
 * Run one seat's pool through its dungeon, headless, and return
 * { score, depthReached }. One draft, one delve (v8): the rivals play
 * the same game the player does.
 */
function runRival(pool, { seed, difficulty }) {
  const sim = new Simulator(pool.map(c => ({ ...c })), seed, difficulty);
  let guard = 0;
  while (!sim.gameOver && guard++ < 500) sim.tick();
  return { score: sim.party.score, depthReached: 1 };
}

/**
 * Build the final table standings.
 *
 * @param draft   the PackDraft (its AI seats hold drafted pools)
 * @param player  the human result: { score, depth }
 * @param opts    { seed, difficulty, condition, hexes } — condition is
 *                the table's shared wager; hexes maps a seat id to a
 *                condition id laid on that rival's run
 * @returns sorted array of { name, icon, score, depthReached, isPlayer, place }
 */
export function computeStandings(draft, player, opts = {}) {
  const { seed = 'table', difficulty = 'medium' } = opts;

  const rows = [];

  // The rivals actually delve their drafts
  for (const seat of draft.seats.filter(s => s.isAI)) {
    const result = runRival(seat.pool, {
      seed: `${seed}-rival-${seat.id}`,
      difficulty,
    });
    rows.push({ name: seat.name, icon: seat.icon, isPlayer: false, ...result });
  }

  // The player's real run
  rows.push({
    name: 'You', icon: '🗡️', isPlayer: true,
    score: player.score, depthReached: 1,
  });

  // Rank by score, then by how deep they got
  rows.sort((a, b) => b.score - a.score || b.depthReached - a.depthReached);
  rows.forEach((r, i) => { r.place = i + 1; });

  return rows;
}
