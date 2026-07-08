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
import { getCondition, combineConditions } from './Conditions.js';

/**
 * Run one seat's pool through up to `targetDepth` dungeons, headless,
 * and return how the night went — not just the score, but whether they
 * wiped, who came back, the standout hero, and their battle honors.
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
  return {
    score: campaign.party.score,
    depthReached,
    wiped: campaign.over,
    survivors: campaign.party.living().length,
    partySize: campaign.party.members.length,
    mvp: pickMvp(campaign.party),
    tally: { ...(campaign.tally || {}) },
  };
}

/** The standout: the living hero who hit hardest, or the last to fall. */
function pickMvp(party) {
  const living = party.living();
  const pool = living.length ? living : party.members;
  if (!pool.length) return null;
  const best = pool.reduce((a, b) =>
    (b.attack > a.attack || (b.attack === a.attack && b.health > a.health)) ? b : a);
  return { name: best.name, class: best.class, icon: best.icon };
}

const firstName = n => String(n || '').split(/[ ,]/)[0];

/**
 * One evocative line on how a seat's night went. Pure — reads a
 * standings row (enriched by runRival, or the player's own summary).
 */
export function rivalHighlight(row) {
  const mvp = row.mvp ? `${row.mvp.icon} ${firstName(row.mvp.name)}` : null;
  const floors = n => `${n} ${n === 1 ? 'floor' : 'floors'}`;
  const honors = [];
  if (row.tally?.elites > 0) honors.push(`${row.tally.elites}⭐`);
  if (row.tally?.crits >= 3) honors.push(`${row.tally.crits}✦`);
  const honorTag = honors.length ? ` · ${honors.join(' ')}` : '';

  if (row.wiped) {
    return `💀 wiped at ${floors(row.depthReached)}${mvp ? ` — ${mvp} fell last` : ''}${honorTag}`;
  }
  const back = (row.survivors != null && row.partySize != null)
    ? ` · ${row.survivors}/${row.partySize} back` : '';
  return `🏆 banked ${floors(row.depthReached)}${back}${mvp ? ` · ${mvp} shone` : ''}${honorTag}`;
}

/**
 * Build the final table standings.
 *
 * @param draft   the PackDraft (its AI seats hold drafted pools)
 * @param player  the human result: { score, depth }
 * @param opts    { seed, difficulty, condition, hexes } — condition is
 *                the table's shared wager; hexes maps a seat id to a
 *                condition id laid on that rival's run
 * @returns sorted array of { name, icon, score, depthReached, isPlayer, place, hexIcon }
 */
export function computeStandings(draft, player, opts = {}) {
  const { seed = 'table', difficulty = 'medium', condition = 'none', hexes = {} } = opts;
  const targetDepth = Math.max(1, player.depth || 1);

  const rows = [];

  // The rivals actually delve their drafts — hexed where hexed
  for (const seat of draft.seats.filter(s => s.isAI)) {
    const hex = hexes[seat.id] ? getCondition(hexes[seat.id]) : null;
    const seatCondition = hex ? combineConditions(condition, hex) : condition;
    const result = runRival(seat.pool, {
      seed: `${seed}-rival-${seat.id}`,
      difficulty,
      condition: seatCondition,
      targetDepth,
    });
    rows.push({
      name: seat.name, icon: seat.icon, isPlayer: false,
      hexIcon: hex && hex.id !== 'none' ? hex.icon : null,
      ...result,
    });
  }

  // The player's real run (hexIcon shows the hex a rival laid on them).
  // Their highlight fields, when passed, get the same treatment.
  rows.push({
    name: 'You', icon: '🗡️', isPlayer: true,
    score: player.score, depthReached: targetDepth,
    hexIcon: player.hexIcon || null,
    wiped: player.wiped != null ? player.wiped : undefined,
    survivors: player.survivors, partySize: player.partySize,
    mvp: player.mvp || null, tally: player.tally || null,
  });

  // Rank by score, then by how deep they got
  rows.sort((a, b) => b.score - a.score || b.depthReached - a.depthReached);
  rows.forEach((r, i) => { r.place = i + 1; });

  return rows;
}
