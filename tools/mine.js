/**
 * mine.js — 17lands-style data mining for DungeonAB
 *
 * Simulates full draft tables (four AI-piloted seats, real personas,
 * real pack passing), runs every drafted pool through a dungeon, and
 * aggregates the game logs into pick-and-play statistics:
 *
 *   ATA     — average taken at (pick position across all drafts)
 *   WR-in   — win rate of runs where the card was in the pool
 *   IWD     — improvement when drafted: WR-in minus WR-out
 *   curves  — party-size and class-presence win curves
 *   tables  — per-room decision success, monster lethality,
 *             personality deltas, trophy-count buckets
 *
 * Usage:  node tools/mine.js [tables] [difficulty] [out.md]
 *         npm run mine            (500 tables, medium)
 *
 * Caveats (same family as 17lands'): pools are AI-drafted, so card
 * stats are conditioned on the personas' preferences; IWD is
 * correlational, not causal. Sample widely before trusting deltas.
 */

import { PackDraft, PILOT_PERSONAS, aiPick } from '../src/draft/PackDraft.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CARD_TYPES, CLASSES, getAllCards } from '../src/game/Cards.js';

/* ------------------------------------------------------------------ */
/* Simulation                                                          */
/* ------------------------------------------------------------------ */

/**
 * Draft a full table with AI in every seat. Seat 0 rotates through
 * every pilot persona — including the skill tiers (Prodigy/Novice) —
 * so the aggregate measures skill expression: whether better
 * evaluation actually wins more.
 */
export function draftTable(tableIndex) {
  const draft = new PackDraft(`mine-${tableIndex}`);
  const pilot = PILOT_PERSONAS[tableIndex % PILOT_PERSONAS.length];
  draft.pilot = pilot;
  let guard = 0;
  while (!draft.finished && guard++ < 200) {
    const pack = draft.getPlayerPack();
    if (!pack || pack.length === 0) break;
    const card = aiPick(pack, pilot, draft.seats[0].pool, draft.rng) || pack[0];
    draft.playerPick(card.id);
  }
  return draft;
}

/** Run one drafted pool through a dungeon, logging every decision. */
export function playGame(pool, seed, difficulty) {
  const sim = new Simulator(pool.map(c => ({ ...c })), seed, difficulty);
  const decisions = [];
  let guard = 0;
  while (!sim.gameOver && guard++ < 300) {
    // Peek the room the party is about to enter (kind/type for the log)
    const peek = sim.dungeon.getRoom(sim.path[sim.roomIndex + 1]);
    sim.tick();
    const n = sim.lastNarration;
    const r = sim.lastResult;
    if (n && r && n.action !== 'linger') {
      decisions.push({
        room: n.room,
        action: n.action,
        monsterKind: peek?.monster?.kind || null,
        trapType: peek?.trapType || null,
        success: r.success !== false,
        damage: r.damage || 0,
        dropEffect: r.drop?.effect || null,
      });
    }
  }
  const result = sim.getRunResult();
  return {
    victory: result.victory,
    score: result.score,
    roomsCleared: result.roomsCleared,
    survivors: result.survivors,
    partySize: result.partySize,
    trophies: result.trophies,
    theme: sim.dungeon.theme.id,
    decisions,
  };
}

/** Simulate `tables` full tables; returns one game record per seat. */
export function simulate({ tables = 100, difficulty = 'medium' } = {}) {
  const games = [];
  for (let t = 0; t < tables; t++) {
    const draft = draftTable(t);
    for (let s = 0; s < draft.seats.length; s++) {
      const seat = draft.seats[s];
      const picks = draft.log
        .filter(e => e.seat === s)
        .map(e => ({ cardId: e.card.id, takenAt: e.round * 8 + e.pick + 1 }));
      const game = playGame(seat.pool, `mine-${t}-seat-${s}`, difficulty);
      const pilotId = s === 0 ? draft.pilot.id : seat.id;
      games.push({ table: t, seat: s, pilotId, poolIds: seat.pool.map(c => c.id), picks, ...game });
    }
  }
  return games;
}

/* ------------------------------------------------------------------ */
/* Aggregation                                                         */
/* ------------------------------------------------------------------ */

const pct = x => `${(100 * x).toFixed(1)}%`;
const delta = x => `${x >= 0 ? '+' : ''}${(100 * x).toFixed(1)}`;

export function aggregate(games, cardIndex) {
  const total = games.length;
  const totalWins = games.filter(g => g.victory).length;

  // Per-card: games/wins with the card in the pool, and pick position
  const cards = new Map();
  for (const g of games) {
    const seen = new Set(g.poolIds);
    for (const id of seen) {
      if (!cards.has(id)) cards.set(id, { games: 0, wins: 0, takenAtSum: 0, picks: 0 });
      const c = cards.get(id);
      c.games++;
      if (g.victory) c.wins++;
    }
    for (const p of g.picks) {
      const c = cards.get(p.cardId);
      if (c) { c.takenAtSum += p.takenAt; c.picks++; }
    }
  }
  const cardRows = [...cards.entries()].map(([id, c]) => {
    const wrIn = c.wins / c.games;
    const gamesOut = total - c.games;
    const wrOut = gamesOut > 0 ? (totalWins - c.wins) / gamesOut : wrIn;
    const card = cardIndex.get(id);
    return {
      id,
      name: card?.name || id,
      type: card?.type || '?',
      games: c.games,
      ata: c.picks ? c.takenAtSum / c.picks : NaN,
      wrIn,
      iwd: wrIn - wrOut,
    };
  });

  // Party-size and class-presence win curves
  const bySize = new Map();
  const byClass = new Map(Object.values(CLASSES).map(c => [c, { with: [0, 0], without: [0, 0] }]));
  const byArchetype = new Map();
  const byTrophies = new Map();
  for (const g of games) {
    const size = g.partySize;
    if (!bySize.has(size)) bySize.set(size, [0, 0]);
    bySize.get(size)[0]++; if (g.victory) bySize.get(size)[1]++;

    const pool = g.poolIds.map(id => cardIndex.get(id)).filter(Boolean);
    const classes = new Set(pool.filter(c => c.type === CARD_TYPES.CHARACTER).map(c => c.class));
    for (const [cls, rec] of byClass) {
      const side = classes.has(cls) ? rec.with : rec.without;
      side[0]++; if (g.victory) side[1]++;
    }
    for (const a of new Set(pool.filter(c => c.type === CARD_TYPES.PERSONALITY).map(c => c.archetype))) {
      if (!byArchetype.has(a)) byArchetype.set(a, [0, 0]);
      byArchetype.get(a)[0]++; if (g.victory) byArchetype.get(a)[1]++;
    }
    const bucket = Math.min(g.trophies, 5);
    if (!byTrophies.has(bucket)) byTrophies.set(bucket, [0, 0]);
    byTrophies.get(bucket)[0]++; if (g.victory) byTrophies.get(bucket)[1]++;
  }

  // Skill expression: seat-0 pilots rotate through every persona tier
  const byPilot = new Map();
  for (const g of games.filter(g => g.seat === 0)) {
    if (!byPilot.has(g.pilotId)) byPilot.set(g.pilotId, { games: 0, wins: 0, bodies: 0 });
    const p = byPilot.get(g.pilotId);
    p.games++; if (g.victory) p.wins++;
    p.bodies += g.partySize;
  }

  // Decision tables
  const byAction = new Map();       // `${room}:${action}` → {n, ok, dmg}
  const byMonster = new Map();      // kind → {fights, losses, dmg}
  for (const g of games) {
    for (const d of g.decisions) {
      const key = `${d.room}:${d.action}`;
      if (!byAction.has(key)) byAction.set(key, { n: 0, ok: 0, dmg: 0 });
      const a = byAction.get(key);
      a.n++; if (d.success) a.ok++; a.dmg += d.damage;

      if (d.monsterKind && (d.action === 'fight' || d.action === 'spell-strike')) {
        if (!byMonster.has(d.monsterKind)) byMonster.set(d.monsterKind, { fights: 0, losses: 0, dmg: 0 });
        const m = byMonster.get(d.monsterKind);
        m.fights++; if (!d.success) m.losses++; m.dmg += d.damage;
      }
    }
  }

  return { total, totalWins, cardRows, bySize, byClass, byArchetype, byTrophies, byPilot, byAction, byMonster };
}

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */

export function renderReport(agg, { tables, difficulty, minSample } = {}) {
  minSample = minSample ?? Math.min(40, Math.max(3, Math.floor(agg.total / 4)));
  const L = [];
  L.push(`# Mining Report — ${tables} tables (${agg.total} games), ${difficulty}`);
  L.push('');
  L.push(`Overall win rate: **${pct(agg.totalWins / agg.total)}**. AI-piloted drafts`);
  L.push(`(personas rotate through seat 0), one delve per pool. IWD is`);
  L.push(`correlational — see caveats in tools/mine.js.`);

  const eligible = agg.cardRows.filter(r => r.games >= minSample).sort((a, b) => b.iwd - a.iwd);
  const cardTable = rows => {
    const out = ['| Card | Type | Games | ATA | WR-in | IWD |', '|---|---|---|---|---|---|'];
    for (const r of rows) {
      out.push(`| ${r.name} | ${r.type} | ${r.games} | ${r.ata.toFixed(1)} | ${pct(r.wrIn)} | ${delta(r.iwd)} |`);
    }
    return out;
  };
  L.push('', `## Cards by improvement-when-drafted (min ${minSample} games)`, '');
  L.push('### Top 10', '', ...cardTable(eligible.slice(0, 10)));
  L.push('', '### Bottom 10', '', ...cardTable(eligible.slice(-10).reverse()));

  L.push('', '## Skill expression — seat-0 pilot win rates', '',
    'The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice',
    '(.15, shiny-chasing, body-blind). The spread between these rows is',
    'the format\'s measured skill ceiling.', '',
    '| Pilot | Skill | Games | Win % | Avg bodies drafted |', '|---|---|---|---|---|');
  const pilotSkill = new Map(PILOT_PERSONAS.map(p => [p.id, p.skill ?? 0.5]));
  for (const [id, p] of [...agg.byPilot.entries()].sort((a, b) => (pilotSkill.get(b[0]) ?? 0) - (pilotSkill.get(a[0]) ?? 0))) {
    L.push(`| ${id} | ${(pilotSkill.get(id) ?? 0.5).toFixed(2)} | ${p.games} | ${pct(p.wins / p.games)} | ${(p.bodies / p.games).toFixed(1)} |`);
  }

  L.push('', '## Party-size win curve', '', '| Characters | Games | Win % |', '|---|---|---|');
  for (const [size, [n, w]] of [...agg.bySize.entries()].sort((a, b) => a[0] - b[0])) {
    L.push(`| ${size} | ${n} | ${pct(w / n)} |`);
  }

  L.push('', '## Class presence', '', '| Class | WR with | WR without | Delta |', '|---|---|---|---|');
  for (const [cls, rec] of agg.byClass) {
    const [nw, ww] = rec.with, [no, wo] = rec.without;
    if (nw === 0 || no === 0) continue;
    L.push(`| ${cls} | ${pct(ww / nw)} | ${pct(wo / no)} | ${delta(ww / nw - wo / no)} |`);
  }

  L.push('', '## Personality presence', '', '| Archetype | Games | WR with | Delta vs field |', '|---|---|---|---|');
  const fieldWR = agg.totalWins / agg.total;
  for (const [a, [n, w]] of [...agg.byArchetype.entries()].sort((x, y) => y[1][1] / y[1][0] - x[1][1] / x[1][0])) {
    L.push(`| ${a} | ${n} | ${pct(w / n)} | ${delta(w / n - fieldWR)} |`);
  }

  L.push('', '## Trophies claimed vs winning', '', '| Trophies | Games | Win % |', '|---|---|---|');
  for (const [b, [n, w]] of [...agg.byTrophies.entries()].sort((a, c) => a[0] - c[0])) {
    L.push(`| ${b === 5 ? '5+' : b} | ${n} | ${pct(w / n)} |`);
  }

  L.push('', '## Decision outcomes by room and action', '', '| Room:Action | N | Success | Avg damage |', '|---|---|---|---|');
  for (const [key, a] of [...agg.byAction.entries()].sort((x, y) => y[1].n - x[1].n)) {
    L.push(`| ${key} | ${a.n} | ${pct(a.ok / a.n)} | ${(a.dmg / a.n).toFixed(1)} |`);
  }

  L.push('', '## Monster lethality (fights + spell-strikes)', '', '| Kind | Fights | Party loss % | Avg damage |', '|---|---|---|---|');
  for (const [kind, m] of [...agg.byMonster.entries()].sort((x, y) => y[1].losses / y[1].fights - x[1].losses / x[1].fights)) {
    if (m.fights < 20) continue;
    L.push(`| ${kind} | ${m.fights} | ${pct(m.losses / m.fights)} | ${(m.dmg / m.fights).toFixed(1)} |`);
  }

  return L.join('\n') + '\n';
}

/** One call does it all; returns { games, agg, report }. */
export function runMining({ tables = 500, difficulty = 'medium' } = {}) {
  const cardIndex = new Map(getAllCards().map(c => [c.id, c]));
  const games = simulate({ tables, difficulty });
  const agg = aggregate(games, cardIndex);
  const report = renderReport(agg, { tables, difficulty });
  return { games, agg, report };
}

/* ------------------------------------------------------------------ */
/* CLI                                                                 */
/* ------------------------------------------------------------------ */

async function main() {
  const tables = parseInt(process.argv[2] || '500', 10);
  const difficulty = process.argv[3] || 'medium';
  const outPath = process.argv[4] || 'MINING_REPORT.md';

  console.error(`Mining ${tables} tables (${tables * 4} games) on ${difficulty}…`);
  const t0 = Date.now();
  const { report } = runMining({ tables, difficulty });

  const { writeFileSync } = await import('fs');
  writeFileSync(outPath, report);
  console.error(`Done in ${((Date.now() - t0) / 1000).toFixed(1)}s → ${outPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
