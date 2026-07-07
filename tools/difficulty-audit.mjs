// Realistic difficulty curve: player drafts via the balanced persona,
// then plays a full campaign (delving deeper until wipe or a rational
// retire), across all four difficulties.
import { PackDraft, aiPick, DRAFT_PERSONAS } from '../src/draft/PackDraft.js';
import { Campaign } from '../src/game/Campaign.js';
import { SeededRandom } from '../src/draft/PackDraft.js';

const guild = DRAFT_PERSONAS.find(p => p.id === 'guildmaster');
const N = 300;

function draftParty(seed) {
  const d = new PackDraft(seed);
  const rng = new SeededRandom(seed + '-player');
  let guard = 0;
  while (!d.finished && guard++ < 100) {
    const pack = d.getPlayerPack();
    if (!pack || pack.length === 0) break;
    const pick = aiPick(pack, guild, d.seats[0].pool, rng) || pack[0];
    d.playerPick(pick.id);
  }
  return d.seats[0].pool;
}

for (const diff of ['easy', 'medium', 'hard', 'nightmare']) {
  let delve1Win = 0, retired = 0, totalDepth = 0, wipes = 0;
  const depthHist = {};
  for (let i = 0; i < N; i++) {
    const pool = draftParty('curve-' + i);
    const c = new Campaign(pool, { seed: 'curve-' + i, difficulty: diff });
    let depth = 0;
    // Rational player: delve while healthy, retire if a delve nearly wiped them
    while (!c.over && depth < 9) {
      const sim = c.nextDelve();
      let g = 0; while (!sim.gameOver && g++ < 200) sim.tick();
      c.recordDelve(sim);
      depth++;
      if (depth === 1 && sim.victory) delve1Win++;
      if (c.over) { wipes++; break; }
      // retire when survivors thin or after banking a good depth (risk-averse)
      const alive = c.party.living().length;
      if (alive <= Math.ceil(c.party.members.length / 2) || depth >= 4) { c.retire?.(); retired++; break; }
    }
    totalDepth += depth;
    depthHist[depth] = (depthHist[depth] || 0) + 1;
  }
  console.log(`${diff.padEnd(9)} delve-1 win ${(delve1Win/N*100).toFixed(0)}%  avg depth ${(totalDepth/N).toFixed(1)}  campaign wipes ${(wipes/N*100).toFixed(0)}%  depths ${JSON.stringify(depthHist)}`);
}
