#!/usr/bin/env node
/**
 * Simulate delves and publish each one as a page.
 *
 * `npm run bench` already walks hundreds of delves and reports numbers.
 * This walks them and keeps the *stories*, because the question here is
 * not whether the party won but whether what happened was worth reading
 * — and that question cannot be answered from an aggregate. Somebody
 * has to read the transcripts, so the transcripts need somewhere to
 * live (`/logs/` on the site) and something to be read against
 * (narrative/Dramaturg.js).
 *
 *   npm run simulate               # 40 delves across all difficulties
 *   npm run simulate 200           # a bigger corpus
 *   npm run simulate 60 hard       # one difficulty only
 *
 * Output: src/public/logs/index.html plus one page per delve. Vite
 * copies src/public verbatim, so these ship at /logs/ on the site.
 *
 * Every run is seeded and Math.random is pinned for the duration, so a
 * page is reproducible: the seed printed on it regenerates that exact
 * delve. A log nobody can regenerate is an anecdote.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Simulator } from '../src/sim/Simulator.js';
import { SeededRandom } from '../src/draft/PackDraft.js';
import { getAllCards } from '../src/game/Cards.js';
import {
  readDelve, critique, bestLine, repetitionAcross, POSITIONS, INTERESTS, POETICS,
} from '../src/narrative/Dramaturg.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '../src/public/logs');

const DIFFICULTIES = ['easy', 'medium', 'hard', 'nightmare'];

/* ------------------------------------------------------------------ */
/* Running                                                             */
/* ------------------------------------------------------------------ */

/** One delve, with Math.random pinned so the seed reproduces it. */
function runDelve(seed, difficulty) {
  const real = Math.random;
  const rng = new SeededRandom(`${seed}-rolls`);
  Math.random = () => rng.next();
  try {
    const pool = new SeededRandom(seed).shuffle(getAllCards()).slice(0, 27);
    const sim = new Simulator(pool, seed, difficulty);
    let guard = 0;
    while (!sim.gameOver && guard++ < 400) sim.tick();
    return sim.getChronicle();
  } finally {
    Math.random = real;
  }
}

/* ------------------------------------------------------------------ */
/* Page furniture                                                      */
/* ------------------------------------------------------------------ */

const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const CSS = `
:root{--ink:#e6ddc8;--dim:#8d8069;--gold:#d8a53f;--bg:#0b0a08;--panel:#14110c;
      --line:#332a1c;--good:#6f9e5a;--bad:#b8523f;--warn:#b4863a}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font-family:'Iowan Old Style',Georgia,serif;
     line-height:1.6;padding:2rem 1.25rem 5rem}
.wrap{max-width:52rem;margin:0 auto}
.wide{max-width:70rem}
a{color:var(--gold)}
h1{font-size:1.7rem;color:var(--gold);margin-bottom:.3rem;letter-spacing:.01em}
h2{font-size:1.15rem;color:var(--gold);margin:2.2rem 0 .7rem;
   border-bottom:1px solid var(--line);padding-bottom:.3rem}
h3{font-size:1rem;color:var(--ink);margin:1.6rem 0 .4rem}
p{margin:.55rem 0}
.sub{color:var(--dim);font-size:.9rem;margin-bottom:1.6rem}
.mono{font-family:ui-monospace,'Courier New',monospace}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:4px;
       padding:1rem 1.15rem;margin:1rem 0}
.meta{color:var(--dim);font-size:.85rem}
.scroll{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:.9rem;margin-top:.6rem}
th,td{text-align:left;padding:.42rem .5rem;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--dim);font-weight:normal;font-size:.8rem;text-transform:uppercase;letter-spacing:.06em}
tr:hover td{background:#181409}
.pass{color:var(--good)} .fail{color:var(--bad)} .na{color:var(--dim)}
.pill{display:inline-block;padding:.05rem .45rem;border:1px solid var(--line);
      border-radius:999px;font-size:.75rem;color:var(--dim)}
.room{border-left:2px solid var(--line);padding:.1rem 0 .1rem 1rem;margin:1.4rem 0}
.room .beat{margin:.5rem 0}
.room .delib{color:#c9bda2;font-style:italic}
.aside{color:var(--dim);font-style:italic}
.fell{color:var(--bad)}
.hurt{color:var(--warn)}
.quote{border-left:3px solid var(--gold);padding-left:.9rem;color:#efe6d0;font-size:1.02rem}
.back{display:inline-block;margin-bottom:1.4rem;font-size:.85rem}
.bar{height:6px;background:#241d12;border-radius:3px;overflow:hidden;min-width:5rem}
.bar > i{display:block;height:100%;background:var(--gold)}
.note{color:var(--dim);font-size:.85rem}
code{font-family:ui-monospace,'Courier New',monospace;font-size:.85em;color:#c2a86a}
`;

const page = (title, body, wide = false) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ctext y='26' font-size='26'%3E%F0%9F%93%9C%3C/text%3E%3C/svg%3E">
<style>${CSS}</style></head>
<body><div class="wrap${wide ? ' wide' : ''}">${body}</div></body></html>`;

const mark = p => p === null
  ? '<span class="na">n/a</span>'
  : (p ? '<span class="pass">met</span>' : '<span class="fail">missed</span>');

/* ------------------------------------------------------------------ */
/* One delve's page                                                    */
/* ------------------------------------------------------------------ */

function delvePage(delve, reading, file) {
  const o = delve.outcome || {};
  const rooms = delve.rooms.map(r => `
    <div class="room">
      <div class="meta">${esc(r.icon || '')} Room ${r.turn}${r.room ? ` — ${esc(r.room)}` : ''}</div>
      ${r.predicament ? `<p class="beat">${esc(r.predicament)}</p>` : ''}
      ${r.deliberation ? `<p class="beat delib">${esc(r.deliberation)}</p>` : ''}
      ${r.resolution ? `<p class="beat">${esc(r.resolution)}</p>` : ''}
      ${r.aside ? `<p class="aside">${esc(r.aside)}</p>` : ''}
      ${r.wounds.map(w => `<p class="hurt">${esc(w)}</p>`).join('')}
      ${r.falls.map(f => `<p class="fell">${esc(f)}</p>`).join('')}
    </div>`).join('');

  const findings = reading.findings.map(f => `
    <tr>
      <td>${mark(f.pass)}</td>
      <td>${esc(f.statement)}</td>
      <td class="note">${esc(f.note)}</td>
    </tr>`).join('');

  const line = bestLine(delve);

  return page(`Delve ${delve.number} — ${delve.theme || 'a delve'}`, `
    <a class="back" href="./index.html">← all logs</a>
    <h1>${esc(delve.theme || `Delve ${delve.number}`)}</h1>
    <p class="sub">
      ${esc(delve.difficulty || '')} · ${delve.rooms.length} rooms ·
      ${o.victory ? 'came back' : 'did not come back'} ·
      <span class="mono">seed ${esc(delve.seed || '—')}</span>
    </p>

    ${delve.roster?.length ? `<p class="meta">Who went down: ${esc(delve.roster.join(', '))}</p>` : ''}

    ${line ? `<div class="panel"><p class="quote">${esc(line)}</p>
      <p class="note" style="margin-top:.6rem">The line this delve would be retold by.</p></div>` : ''}

    <h2>The dramaturg reads it</h2>
    <div class="panel">
      <p class="note">${reading.findings.filter(f => f.pass).length} of
        ${reading.findings.filter(f => f.pass !== null).length} values met.
        A reading, not a grade — the score exists to sort ${''}logs, not to judge them.</p>
      <table><thead><tr><th></th><th>Value</th><th>What the log shows</th></tr></thead>
      <tbody>${findings}</tbody></table>
    </div>

    <h2>The transcript</h2>
    ${rooms}

    ${o.epitaph ? `<h2>${o.victory ? 'The way out' : 'The end of it'}</h2>
      <p>${esc(o.epitaph)}</p>` : ''}
    <p class="meta" style="margin-top:1rem">
      Rooms cleared ${o.roomsCleared ?? 0} · Score ${o.score ?? 0} ·
      Gold ${o.gold ?? 0} · Trophies ${o.trophies ?? 0} · Survivors ${o.survivors ?? 0}
    </p>
    <p class="note" style="margin-top:2rem">Regenerate this exact delve:
      <code>npm run simulate -- --seed ${esc(delve.seed || '')}</code></p>
  `);
}

/* ------------------------------------------------------------------ */
/* The index                                                           */
/* ------------------------------------------------------------------ */

function indexPage(entries, crit, rep) {
  const rows = entries
    .slice()
    .sort((a, b) => a.reading.score - b.reading.score)
    .map(e => `
      <tr>
        <td class="meta">${e.delve.number}</td>
        <td><a href="./${esc(e.file)}">${esc(e.delve.theme || 'a delve')}</a></td>
        <td class="meta">${esc(e.delve.difficulty)}</td>
        <td class="meta">${e.delve.rooms.length}</td>
        <td class="${e.delve.outcome?.victory ? 'pass' : 'fail'}">${e.delve.outcome?.victory ? 'out' : 'lost'}</td>
        <td class="meta">${esc(e.protagonist || '—')}</td>
        <td><div class="bar"><i style="width:${Math.round(e.reading.score * 100)}%"></i></div></td>
        <td class="note">${esc(e.reading.failures.map(f => f.value).join(', ') || '—')}</td>
      </tr>`).join('');

  const systemic = crit.systemic.length ? crit.systemic.map(s => `
    <div class="panel">
      <h3><span class="fail">${Math.round(s.failRate * 100)}% of delves miss this</span> — ${esc(s.statement)}</h3>
      <p class="note">${esc(s.examples.join(' · '))}</p>
      <p class="note" style="margin-top:.5rem">Mechanics that could serve it:
        ${s.mechanisms.map(m => `<code>${esc(m)}</code>`).join(', ')}</p>
    </div>`).join('')
    : '<div class="panel"><p class="pass">No value is missed by a fifth of the corpus.</p></div>';

  const healthy = crit.healthy.map(h =>
    `<tr><td class="pass">${Math.round((1 - h.failRate) * 100)}%</td><td>${esc(h.statement)}</td></tr>`).join('');

  const positions = POSITIONS.map(p => `
    <div class="panel">
      <h3>${esc(p.claim)}</h3>
      <p>${esc(p.because)}</p>
      <p class="note" style="margin-top:.5rem"><em>Would change its mind:</em> ${esc(p.refutedBy)}</p>
    </div>`).join('');

  return page('Delve logs — the dramaturg\'s desk', `
    <h1>Delve logs</h1>
    <p class="sub">${crit.corpus} simulated delves, each one readable, each one reproducible from its
      seed. Read against the house poetics in <code>src/narrative/Dramaturg.js</code>.</p>

    <div class="panel">
      <p class="note">Sorted worst-reading first, because the interesting log is the one that
        failed. The bar is the share of the poetics a delve met — a sorting key, not a verdict.</p>
    </div>

    <h2>What the corpus says about the mechanics</h2>
    <p>One log missing a value is a log. A fifth of them missing the same value is a mechanic.</p>
    ${systemic}

    ${healthy ? `<h3>Holding up</h3><table><tbody>${healthy}</tbody></table>` : ''}

    <h2>Repetition across delves</h2>
    <div class="panel">
      <p>${rep.lines} lines of prose, ${rep.distinct} of them distinct
        (<strong>${Math.round(rep.reuseRate * 100)}%</strong> reused).</p>
      <p class="note" style="margin-top:.5rem">A reader reads one delve closely and a saga loosely,
        so the sentence they are sure they have seen before is the tell. Most reused:</p>
      <table><tbody>${rep.shared.slice(0, 8).map(s =>
        `<tr><td class="meta">${s.runs}×</td><td class="note">${esc(s.line.slice(0, 120))}</td></tr>`).join('')}</tbody></table>
    </div>

    <h2>The logs</h2>
    <div class="scroll"><table>
      <thead><tr><th>#</th><th>Delve</th><th>Difficulty</th><th>Rooms</th><th>End</th>
        <th>About whom</th><th>Poetics</th><th>Missed</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>

    <h2>What is being asked of every log</h2>
    <div class="panel"><ol style="padding-left:1.2rem">
      ${INTERESTS.map(i => `<li style="margin:.3rem 0">${esc(i.question)}</li>`).join('')}
    </ol></div>

    <h2>Positions</h2>
    <p>Contestable on purpose. A position nothing could refute is a preference wearing a lab coat.</p>
    ${positions}
  `, true);
}

/* ------------------------------------------------------------------ */

function main() {
  const args = process.argv.slice(2);
  const count = Number(args.find(a => /^\d+$/.test(a))) || 40;
  const only = args.find(a => DIFFICULTIES.includes(a));
  const difficulties = only ? [only] : DIFFICULTIES;

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const entries = [];
  const chronicles = [];
  for (let i = 0; i < count; i++) {
    const difficulty = difficulties[i % difficulties.length];
    const seed = `log-${difficulty}-${i}`;
    const chronicle = runDelve(seed, difficulty);
    chronicles.push(chronicle);
    for (const delve of chronicle.delves) {
      delve.seed = delve.seed || seed;
      delve.difficulty = delve.difficulty || difficulty;
      // Every run is its own chronicle, so every delve calls itself
      // Delve I. Renumber across the corpus or the dramaturg's examples
      // all read "delve 1: …" and name nothing.
      delve.number = entries.length + 1;
      const reading = readDelve(delve);
      const file = `delve-${String(entries.length + 1).padStart(4, '0')}.html`;
      const protagonist = reading.findings.find(f => f.value === 'protagonist')?.evidence || null;
      entries.push({ delve, reading, file, protagonist });
      fs.writeFileSync(path.join(OUT, file), delvePage(delve, reading, file));
    }
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/${count} delves`);
  }

  const readings = entries.map(e => e.reading);
  const crit = critique(readings);
  const rep = repetitionAcross(chronicles);
  fs.writeFileSync(path.join(OUT, 'index.html'), indexPage(entries, crit, rep));

  console.log(`\n${entries.length} logs written to src/public/logs/  →  /logs/ on the site\n`);
  console.log('The dramaturg says:');
  if (crit.systemic.length === 0) {
    console.log('  no value is missed by a fifth of the corpus.');
  }
  for (const s of crit.systemic) {
    console.log(`  ${String(Math.round(s.failRate * 100)).padStart(3)}% miss  ${s.statement}`);
    console.log(`             → ${s.mechanisms.join(', ')}`);
  }
  console.log(`\n  prose reuse across delves: ${Math.round(rep.reuseRate * 100)}%`);
}

if (process.argv[1] && process.argv[1].endsWith('simulate.mjs')) main();
