#!/usr/bin/env node
/**
 * Audit — the measurable half of the project's own documentation.
 *
 * The .md files in the root carry judgement: what is wrong, what it
 * means, what to do about it. Judgement goes stale slowly and honestly.
 * *Facts* go stale fast and silently, which is how a document ends up
 * confidently describing a game that no longer exists.
 *
 * So the facts live here and are regenerated:
 *
 *   npm run audit            # the report
 *   npm run audit --json     # machine-readable, for a doc build
 *
 * Every check answers a question some document asks. When a check goes
 * green for good, delete it; when a new class of drift bites twice,
 * add one. This file is the accumulated list of ways this codebase has
 * actually been found wrong, which is a more useful thing than a
 * generic linter.
 *
 * Exits 0 always: this is an instrument, not a gate. The gates are in
 * `npm test`, where a failure means someone broke something. A finding
 * here usually means someone has not finished something.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');

/** The live source. Never `src/public`, which holds frozen minified builds. */
const LIVE_DIRS = ['src/agents', 'src/game', 'src/narrative', 'src/encounters',
  'src/world', 'src/sim', 'src/ui', 'src/draft'];

function liveFiles() {
  const out = [];
  const walk = d => {
    const abs = path.join(ROOT, d);
    if (!fs.existsSync(abs)) return;
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(d, e.name));
      else if (e.name.endsWith('.js')) out.push(path.join(d, e.name));
    }
  };
  LIVE_DIRS.forEach(walk);
  out.push('src/main.js');
  return out.filter(f => fs.existsSync(path.join(ROOT, f)));
}

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const testFiles = () => fs.readdirSync(path.join(ROOT, 'tests'))
  .filter(f => f.endsWith('.js')).map(f => `tests/${f}`);
const toolFiles = () => fs.readdirSync(path.join(ROOT, 'tools'))
  .filter(f => f.endsWith('.js') || f.endsWith('.mjs')).map(f => `tools/${f}`);

/* ------------------------------------------------------------------ */
/* 1. Exports nothing imports                                          */
/* ------------------------------------------------------------------ */

/*
 * Counts real `import { X }` bindings rather than word occurrences, so
 * a symbol only mentioned in a comment does not look used. Intra-file
 * use is deliberately NOT counted as use: an export nobody imports is
 * either dead or is public API with no consumer, and both want knowing.
 */
function deadExports() {
  const files = [...liveFiles(), ...testFiles(), ...toolFiles()];
  const imported = new Set();
  for (const f of files) {
    const src = read(f);
    for (const m of src.matchAll(/import\s*\{([^}]+)\}\s*from/g)) {
      for (const part of m[1].split(',')) {
        imported.add(part.trim().split(/\s+as\s+/)[0].trim());
      }
    }
  }
  const dead = [];
  for (const f of liveFiles()) {
    for (const m of read(f).matchAll(/^export\s+(?:async\s+)?(?:function|const|class)\s+([A-Za-z_$][\w$]*)/gm)) {
      if (!imported.has(m[1])) dead.push({ file: f, symbol: m[1] });
    }
  }
  return dead;
}

/* ------------------------------------------------------------------ */
/* 2. Party properties written but never read (the recurring bug class) */
/* ------------------------------------------------------------------ */

/*
 * Four times now this project has shipped a field that was set and
 * never consulted, with narration promising an effect that never
 * happened: starBlessed and forewarned (7 writes, 0 reads), opt.weight,
 * and reserve members lending capabilities. Each read as a mechanic and
 * was a no-op.
 *
 * Heuristic and deliberately noisy: it looks for `party.X =` across the
 * codebase and asks whether any file reads `party.X` (or `this.X` in
 * Party.js) other than to assign it.
 */
function unreadPartyFields() {
  const files = liveFiles();
  const writes = new Map();
  for (const f of files) {
    for (const m of read(f).matchAll(/\bparty\.([a-zA-Z_$][\w$]*)\s*=(?!=)/g)) {
      if (!writes.has(m[1])) writes.set(m[1], new Set());
      writes.get(m[1]).add(f);
    }
  }
  const findings = [];
  for (const [field, wroteIn] of writes) {
    let reads = 0;
    for (const f of files) {
      const src = read(f);
      // any mention not immediately followed by a single '='
      for (const m of src.matchAll(new RegExp(`\\bparty\\.${field}\\b(\\s*=(?!=))?`, 'g'))) {
        if (!m[1]) reads++;
      }
      if (f.endsWith('Party.js')) {
        for (const m of src.matchAll(new RegExp(`\\bthis\\.${field}\\b(\\s*=(?!=))?`, 'g'))) {
          if (!m[1]) reads++;
        }
      }
    }
    if (reads === 0) findings.push({ field, writtenIn: [...wroteIn] });
  }
  return findings;
}

/* ------------------------------------------------------------------ */
/* 3. The three-way state contract                                     */
/* ------------------------------------------------------------------ */

/*
 * A party's state has to agree in three places, and only one pair is
 * covered by a test:
 *
 *   snapshotState()  — what the Chronicle diffs   (tests/silence gates
 *   Chronicle FIELDS — what each change reads as   this pair)
 *   Party.toJSON()   — what survives a save        (nothing gates this)
 *
 * A field missing from the third is invisible until somebody builds a
 * resume feature, at which point it is a silent data-loss bug.
 */
function stateContract() {
  // CRLF-normalised, and sliced with indexOf rather than split: the
  // body of `toJSON()` contains `m.toJSON()`, and String.split cuts at
  // EVERY occurrence, so the naive version captured 57 characters and
  // confidently reported that all 21 fields were unsaved. An audit that
  // invents findings is worse than no audit.
  const norm = s => s.replace(/\r\n/g, '\n');
  const chron = norm(read('src/narrative/Chronicle.js'));
  const party = norm(read('src/agents/Party.js'));

  const after = (src, marker, end) => {
    const i = src.indexOf(marker);
    if (i < 0) return '';
    const from = i + marker.length;
    const j = src.indexOf(end, from);
    return src.slice(from, j < 0 ? src.length : j);
  };

  const snapBlock = after(chron, 'export function snapshotState', '\n}');
  const snapshot = new Set([...snapBlock.matchAll(/^\s{4}([a-zA-Z_$][\w$]*):/gm)].map(m => m[1]));
  const fieldsBlock = after(chron, 'const FIELDS = {', '\n};');
  const fields = new Set([...fieldsBlock.matchAll(/^\s{2}([a-zA-Z_$][\w$]*):\s*\{/gm)].map(m => m[1]));
  const jsonBlock = after(party, '  toJSON() {', '\n  }');
  const saved = new Set([...jsonBlock.matchAll(/^\s{6}([a-zA-Z_$][\w$]*):/gm)].map(m => m[1]));
  /*
   * Three legitimate reasons a snapshot field is absent from toJSON,
   * spelled out so the check reports gaps rather than vocabulary:
   *   - it lives on the members, saved through `members[].toJSON()`
   *   - it is simulator state, not party state, and belongs to the run
   *   - it is saved under a different name
   * Anything left over is a field the save genuinely drops.
   */
  const PER_MEMBER = new Set(['living', 'health', 'wounds', 'equipment', 'weaponMods']);
  const SIM_STATE = new Set(['roomsCleared', 'floor']);
  const RENAMED = { poison: 'poisonLinger' };
  const genuinelyUnsaved = [...snapshot].filter(k =>
    !saved.has(k) && !PER_MEMBER.has(k) && !SIM_STATE.has(k)
    && !(RENAMED[k] && saved.has(RENAMED[k])));

  return {
    snapshot: [...snapshot],
    inSnapshotNotFields: [...snapshot].filter(k => !fields.has(k)),
    inFieldsNotSnapshot: [...fields].filter(k => !snapshot.has(k)),
    inSnapshotNotSaved: genuinelyUnsaved,
    excused: { perMember: [...PER_MEMBER], simState: [...SIM_STATE], renamed: RENAMED },
  };
}

/* ------------------------------------------------------------------ */
/* 4. Hand-synced tables that have broken before                       */
/* ------------------------------------------------------------------ */

async function tableDrift() {
  const engine = await import('../src/encounters/EncounterEngine.js');
  await import('../src/encounters/Encounters.js');
  await import('../src/encounters/TownEncounters.js');
  const gen = await import('../src/world/DungeonGen.js');
  const narrator = await import('../src/narrative/Narrator.js');
  const dram = await import('../src/narrative/Dramaturg.js');

  const out = { riderDrift: [], missingPhrases: [], orphanMarkers: [] };

  // rides declarations vs the generation table
  const table = gen.RIDERS_BY_ROOM || {};
  for (const def of engine.allEncounters()) {
    for (const t of def.rides || []) {
      if (!(table[t] || []).includes(def.id)) out.riderDrift.push(`${def.id} declares rides:${t}, table omits it`);
    }
  }
  for (const [t, ids] of Object.entries(table)) {
    for (const id of ids) {
      const def = engine.allEncounters().find(d => d.id === id);
      if (!def) out.riderDrift.push(`table lists unknown encounter ${id}`);
      else if (!(def.rides || []).includes(t)) out.riderDrift.push(`table rides ${id} on ${t}, encounter does not declare it`);
    }
  }

  /*
   * Every DUNGEON option needs a phrase for the deliberation beat
   * ("they might have chosen to force the door"). Town options are
   * chosen by the player, so there is no deliberation to narrate and
   * their outcome prose is the `narrative` string on the result — which
   * is why all 39 of them appeared as findings in the first run of this
   * check and none of them were.
   */
  const phrased = new Set(narrator.phrasedOptions());
  for (const def of engine.allEncounters()) {
    if (def.id.startsWith('town-')) continue;
    for (const o of def.options) if (!phrased.has(o.id)) out.missingPhrases.push(`${def.id}/${o.id}`);
  }

  // carry markers that no prose in the codebase contains
  const prose = liveFiles().map(read).join('\n').toLowerCase();
  for (const marker of dram.CARRY_MARKERS || []) {
    if (!prose.includes(marker.toLowerCase())) out.orphanMarkers.push(marker);
  }
  return out;
}

/* ------------------------------------------------------------------ */

async function main() {
  const json = process.argv.includes('--json');
  const dead = deadExports();
  const unread = unreadPartyFields();
  const contract = stateContract();
  const drift = await tableDrift();

  const report = { dead, unread, contract, drift, at: new Date().toISOString() };
  if (json) { console.log(JSON.stringify(report, null, 2)); return; }

  const h = s => console.log(`\n${s}\n${'─'.repeat(s.length)}`);

  h('Exports nothing imports');
  if (!dead.length) console.log('  none');
  for (const d of dead) console.log(`  ${d.file.padEnd(34)} ${d.symbol}`);
  console.log(`  (${dead.length}; some are deliberate public API with no consumer yet)`);

  h('Party fields written and never read');
  if (!unread.length) console.log('  none — the dead-declaration class is clear');
  for (const u of unread) console.log(`  ${u.field.padEnd(20)} written in ${u.writtenIn.join(', ')}`);

  h('State contract: snapshot / FIELDS / save');
  const c = contract;
  console.log(`  snapshotState carries ${c.snapshot.length} fields`);
  console.log(`  in snapshot, no FIELDS entry : ${c.inSnapshotNotFields.join(', ') || 'none (tests/silence gates this)'}`);
  console.log(`  in FIELDS, not snapshotted   : ${c.inFieldsNotSnapshot.join(', ') || 'none'}`);
  console.log(`  in snapshot, genuinely unsaved: ${c.inSnapshotNotSaved.join(', ') || 'none'}`);
  console.log(`    (excused: ${c.excused.perMember.join('/')} save via members[]; `
    + `${c.excused.simState.join('/')} are run state, not party state)`);
  console.log('    ^ nothing gates this pair, and Party.restore() has no callers — see ARCHITECTURE.md');

  h('Hand-synced tables');
  console.log(`  rider drift      : ${drift.riderDrift.join('; ') || 'clean'}`);
  console.log(`  options w/o prose: ${drift.missingPhrases.join(', ') || 'clean'}`);
  console.log(`  orphan carry markers (no prose contains them): ${drift.orphanMarkers.join(' | ') || 'clean'}`);

  console.log('\nThis is an instrument, not a gate. See PROBLEMS.md and its siblings for what the findings mean.\n');
}

main();
