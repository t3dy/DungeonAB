/**
 * DungeonAB — application entry point
 * Draft at the table → delve the dungeon → read the chronicle.
 */

import { PackDraft } from './draft/PackDraft.js';
import { DraftUI } from './ui/DraftUI.js';
import { DungeonRenderer } from './ui/DungeonRenderer.js';
import { IsoDungeonRenderer } from './ui/IsoDungeonRenderer.js';
import { captureRequest, autoDraft, tickToRoom, markReady } from './ui/Frames.js';
import { renderOutfitting } from './ui/OutfitUI.js';
import { Simulator } from './sim/Simulator.js';
import { Party, PARTY_CAP } from './agents/Party.js';
import { progression, DIFFICULTIES } from './game/Progression.js';
import { computeStandings } from './game/Standings.js';
import { SeededRandom } from './draft/PackDraft.js';
import { archive } from './game/Archive.js';
import { serializeDungeon } from './world/DungeonGen.js';
import { setupArchive } from './ui/ArchiveUI.js';
import { setupCardEditor, loadPlayerPacks } from './ui/CardEditorUI.js';
import { installAlchemyPack } from './packs/alchemyPack.js';
import { ROOM_HELP, CARD_TYPE_HELP, ATTRITION_HELP, describeTickEvents } from './ui/GameGuide.js';
import { composeMend } from './narrative/Narrator.js';
import { ChronicleLibrary, chronicleFilename } from './game/Chronicles.js';
import { FORMATIONS } from './agents/Formation.js';

/* Where the party is standing, for the party panel */
const FORMATION_GLYPH = Object.fromEntries(
  Object.entries(FORMATIONS).map(([id, f]) => [id, f.icon]));
const FORMATION_LABEL = Object.fromEntries(
  Object.entries(FORMATIONS).map(([id, f]) => [id, f.name]));
import { toMarkdown } from './narrative/Chronicle.js';
import { CAPABILITIES } from './game/Capabilities.js';
import { getEncounterTrace, clearEncounterTrace, capabilityUsageSummary } from './encounters/EncounterEngine.js';

// Developer visibility for the capability system, from the console:
//   v6debug.summary() — per-capability optionsUnlocked / chosen
//   v6debug.trace()   — every evaluation, including why options were hidden
//   v6debug.clear()
window.v6debug = { trace: getEncounterTrace, summary: capabilityUsageSummary, clear: clearEncounterTrace };

/* The shelf the party's saga is kept on (game/Chronicles.js) */
const chronicles = new ChronicleLibrary();

/**
 * Hand the player a file. The viewer sandbox blocks nothing here — this
 * is the game's own page — but the object URL is revoked either way so a
 * long session does not leak blobs.
 */
function offerDownload(filename, text, mime = 'text/markdown') {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Write the run to the shelf. Called at the end of every delve and
 * again when the campaign closes, so a refresh never costs the story.
 * Returns the stored record, or null if there is nothing to save.
 */
function saveChronicle() {
  const sim = appState.simulator;
  if (!sim?.getChronicle) return null;
  try {
    const record = chronicles.save({
      id: appState.sagaId || null,
      chronicle: sim.getChronicle(),
      party: sim.party,
      difficulty: appState.difficulty,
    });
    appState.sagaId = record.id;
    return record;
  } catch (e) {
    return null;   // a full shelf must never cost the player their run
  }
}

const HELP_SEEN_KEY = 'dungeonab_help_seen';

const appState = {
  draft: null,
  draftUI: null,
  simulator: null,
  renderer: null,
  gameRunning: false,
  lastTickTime: 0,
  speedMultiplier: 1,
  prevState: null,        // last tick's state, for event diffing
  seenRoomTypes: null,    // room types explained this campaign
};

function init() {
  console.log('⚔️ DungeonAB initializing…');

  // Content packs first — the draft pool is built from them
  const prefs = loadPlayerPacks();
  installAlchemyPack({ enabled: prefs['alchemy-17c'] !== false });

  // A capture URL puts the game in a reproducible place instead of a
  // fresh draft, so two builds can be photographed from the same spot
  // (ui/Frames.js). Absent `?capture`, nothing below changes.
  const capture = captureRequest();

  setupHelp({ autoOpen: !capture });
  setupRecords();
  setupCardEditor();
  setupArchive({
    onDelve: (entry) => {
      appState.pendingReplay = entry;
      showToast('🗺️', `Design loaded: "${entry.name}". Draft a party, then delve it.`, 'room');
      startNewDraft();
    },
  });
  if (capture) runCapture(capture); else startNewDraft();

  document.getElementById('hub-btn').addEventListener('click', () => { window.location.href = 'hub/'; });
  document.getElementById('pause-btn').addEventListener('click', togglePause);
  document.getElementById('step-btn').addEventListener('click', stepGame);
  document.getElementById('speed-slider').addEventListener('input', e => {
    appState.speedMultiplier = parseFloat(e.target.value);
    document.getElementById('speed-label').textContent = `${appState.speedMultiplier.toFixed(1)}x`;
  });
  document.getElementById('show-results-btn').addEventListener('click', () => {
    document.getElementById('show-results-btn').classList.remove('active');
    document.getElementById('gameover-display').classList.add('active');
  });
}

/* -------------------------------------------------------------- */
/* How-to-play overlay                                             */
/* -------------------------------------------------------------- */

function setupHelp({ autoOpen = true } = {}) {
  const overlay = document.getElementById('help-overlay');
  const openBtn = document.getElementById('help-btn');
  const closeBtn = document.getElementById('help-close-btn');

  // Populate the card-type legend from the single source of truth
  document.getElementById('help-card-legend').innerHTML = CARD_TYPE_HELP
    .map(h => `<dt>${h.label}</dt><dd>${h.text}</dd>`).join('');

  // ...and the two attrition clocks from theirs
  document.getElementById('help-attrition-legend').innerHTML = ATTRITION_HELP
    .map(h => `<dt>${h.key}</dt><dd>${h.text}</dd>`).join('');

  const open = () => overlay.classList.add('active');
  const close = () => {
    overlay.classList.remove('active');
    try { localStorage.setItem(HELP_SEEN_KEY, '1'); } catch (e) { /* private mode */ }
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  // First-time visitors get the rules before their first pack — but a
  // capture is photographing the dungeon, not the onboarding.
  let seen = false;
  try { seen = localStorage.getItem(HELP_SEEN_KEY) === '1'; } catch (e) { /* private mode */ }
  if (!seen && autoOpen) open();
}

/* -------------------------------------------------------------- */
/* Hall of Records — best scores and past campaigns               */
/* -------------------------------------------------------------- */

function setupRecords() {
  const overlay = document.getElementById('records-overlay');
  const openBtn = document.getElementById('records-btn');
  const closeBtn = document.getElementById('records-close-btn');

  const render = () => {
    const body = document.getElementById('records-body');
    const stats = progression.getStats();
    const runs = progression.getRecentRuns(10);

    // Best score per difficulty that has one
    const bestRows = Object.values(DIFFICULTIES)
      .filter(d => progression.bestScores[d.id])
      .map(d => `<dt>${d.icon} ${d.name}</dt><dd>${progression.bestScores[d.id]}</dd>`)
      .join('');

    const career = `<div style="color:#887755;font-size:0.8rem;margin-bottom:0.9rem;">
      ${stats.totalVictories} retirements across ${stats.totalRuns} campaigns · average score ${stats.avgScore}</div>`;

    const runRows = runs.length
      ? runs.map(r => {
          const diff = DIFFICULTIES[(r.difficulty || '').toUpperCase()] || { icon: '•' };
          const cond = null;
          const outcome = r.victory ? '🏆' : '☠️';
          const condTag = cond && cond.id !== 'none' ? ` · ${cond.icon}` : '';
          return `<div class="records-run">
            <span>${outcome} ${diff.icon} depth ${r.depth || 1} · ${r.roomsCleared} rooms${condTag}</span>
            <span class="rr-score">${r.score}</span>
          </div>`;
        }).join('')
      : '<div class="records-empty">No campaigns yet. The Hall awaits its first name.</div>';

    // The shelf of sagas: every party whose story was kept, readable
    // again and — if anyone came back — continuable (game/Chronicles.js)
    const sagas = chronicles.list();
    const sagaRows = sagas.length
      ? sagas.map(sg => {
          const when = new Date(sg.date).toLocaleDateString();
          const state = sg.alive ? '<span style="color:#3ddc84;">still standing</span>'
            : '<span style="color:#8a6a5a;">did not come back</span>';
          return `<div class="saga-row" data-saga="${sg.id}">
            <div style="flex:1;min-width:0;">
              <div style="color:#c0b090;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(sg.partyName.split(',')[0])}${sg.partyName.includes(',') ? ' &amp; co.' : ''}</div>
              <div style="color:#665;font-size:0.68rem;">${sg.delves} delve${sg.delves > 1 ? 's' : ''} · ${state} · ${when}</div>
            </div>
            <button data-read="${sg.id}" title="Read the saga">📖</button>
            <button data-save="${sg.id}" title="Download the save file">💾</button>
            <button data-drop="${sg.id}" title="Forget this saga">🗑️</button>
          </div>`;
        }).join('')
      : '<div class="records-empty">No sagas kept yet. Finish a delve and the story is written down.</div>';

    body.innerHTML =
      (bestRows ? `<dl class="records-best">${bestRows}</dl>` : '') +
      career +
      `<div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">📜 Sagas kept</div>` +
      sagaRows +
      `<div style="display:flex;gap:0.4rem;margin:0.5rem 0 1rem;">
         <button id="saga-import-btn" style="flex:1;font-size:0.75rem;padding:0.4rem;">📂 Load a save file</button>
       </div>
       <input id="saga-import-input" type="file" accept="application/json,.json" style="display:none;">` +
      `<div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">Recent campaigns</div>` +
      runRows;

    body.querySelectorAll('[data-read]').forEach(btn => {
      btn.addEventListener('click', () => showSaga(btn.dataset.read));
    });
    body.querySelectorAll('[data-save]').forEach(btn => {
      btn.addEventListener('click', () => {
        const rec = chronicles.get(btn.dataset.save);
        offerDownload(`chronicle-${rec.partyName.split(',')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`,
          chronicles.exportJSON(btn.dataset.save), 'application/json');
      });
    });
    body.querySelectorAll('[data-drop]').forEach(btn => {
      btn.addEventListener('click', () => {
        const rec = chronicles.get(btn.dataset.drop);
        const who = rec?.partyName.split(',')[0] || 'this saga';
        // Forgetting a saga is not undoable, so it is asked for plainly
        if (window.confirm(`Forget the chronicle of ${who}? The story cannot be recovered.`)) {
          chronicles.remove(btn.dataset.drop);
          render();
        }
      });
    });
    const importBtn = body.querySelector('#saga-import-btn');
    const importInput = body.querySelector('#saga-import-input');
    if (importBtn && importInput) {
      importBtn.addEventListener('click', () => importInput.click());
      importInput.addEventListener('change', async () => {
        const file = importInput.files?.[0];
        if (!file) return;
        const result = chronicles.importJSON(await file.text());
        if (result.ok) {
          showToast('📂', `${result.record.partyName.split(',')[0]}'s saga is on the shelf.`);
          render();
        } else {
          showToast('⚠️', result.error);
        }
      });
    }
  };

  /**
   * Read a kept saga. The whole document, rendered from the same
   * Markdown the download hands over, so what the player reads onscreen
   * and what they keep on disk are the same story.
   */
  const showSaga = (id) => {
    const resumed = chronicles.resume(id);
    if (!resumed) return;
    const body = document.getElementById('records-body');
    const md = chronicles.exportMarkdown(id, { ledger: true });
    body.innerHTML = `
      <button id="saga-back" style="font-size:0.75rem;padding:0.35rem 0.7rem;margin-bottom:0.6rem;">← Back to the Hall</button>
      <div style="color:${resumed.continuable ? '#3ddc84' : '#8a6a5a'};font-size:0.75rem;margin-bottom:0.6rem;">
        ${resumed.continuable
          ? `${resumed.standing} still standing${resumed.bench ? ` · ${resumed.bench} in reserve` : ''} — this party can delve again.`
          : escapeHtml(resumed.reason || 'This saga is finished.')}
      </div>
      <div class="saga-doc">${renderChronicleHtml(md)}</div>
      <button id="saga-download" style="width:100%;margin-top:0.7rem;padding:0.6rem;font-size:0.8rem;">📖 Download this chronicle</button>`;
    body.querySelector('#saga-back').addEventListener('click', render);
    body.querySelector('#saga-download').addEventListener('click', () => {
      offerDownload(`chronicle-${resumed.chronicle.partyName.split(',')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`, md);
    });
  };

  const open = () => { render(); overlay.classList.add('active'); };
  const close = () => overlay.classList.remove('active');

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
}

/**
 * Just enough Markdown for a chronicle: headings, list items, emphasis
 * and the foldable ledger. Everything is escaped first, so a party name
 * can never smuggle markup into the page.
 */
function renderChronicleHtml(md) {
  return escapeHtml(md)
    .replace(/^### (.*)$/gm, '<h4>$1</h4>')
    .replace(/^## (.*)$/gm, '<h3>$1</h3>')
    .replace(/^# (.*)$/gm, '<h2>$1</h2>')
    .replace(/^- (.*)$/gm, '<li>$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/&lt;details&gt;&lt;summary&gt;Ledger&lt;\/summary&gt;/g, '<details><summary>Ledger</summary>')
    .replace(/&lt;\/details&gt;/g, '</details>')
    .split('\n\n').map(p => (/^<(h\d|li|details)/.test(p.trim()) ? p : `<p>${p}</p>`)).join('');
}

/* -------------------------------------------------------------- */
/* Event toasts — brief onscreen flags for notable moments        */
/* -------------------------------------------------------------- */

function showToast(icon, text, kind = '') {
  const stack = document.getElementById('toast-stack');
  const toast = document.createElement('div');
  toast.className = `toast${kind ? ' toast-' + kind : ''}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${escapeHtml(text)}</span>`;
  stack.appendChild(toast);

  // Fade and remove; keep the stack from overflowing
  setTimeout(() => {
    toast.classList.add('fade');
    setTimeout(() => toast.remove(), 500);
  }, 3600);
  while (stack.children.length > 3) stack.removeChild(stack.firstChild);
}

/**
 * Surface what just happened: notable state changes, plus a one-time
 * explanation the first time the party enters each kind of room.
 */
function announceEvents(prevState, state) {
  const roomType = state.narration?.room;
  if (roomType && appState.seenRoomTypes && !appState.seenRoomTypes.has(roomType) && ROOM_HELP[roomType]) {
    appState.seenRoomTypes.add(roomType);
    showToast(state.narration.icon || 'ℹ️', ROOM_HELP[roomType], 'room');
  }
  for (const ev of describeTickEvents(prevState, state)) {
    showToast(ev.icon, ev.text, ev.kind);
  }
}

function startNewDraft() {
  appState.draft = new PackDraft(`table-${Date.now().toString(36)}`);
  appState.draftUI = new DraftUI(appState.draft, startDelve);
  appState.draftUI.render();

  document.getElementById('world-container').style.display = 'none';
  document.getElementById('ui-container').style.display = 'none';
}

/**
 * Capture mode (dev): draft, march and stop, all seeded and all
 * synchronous, then flag the page ready for a screenshot. See
 * ui/Frames.js and GRAPHICS.md §G1.
 */
function runCapture(req) {
  console.log('[frames] capture', req);
  const draft = new PackDraft(req.draftSeed);
  const pool = autoDraft(draft);

  document.getElementById('draft-container').style.display = 'none';
  startDelve({
    pool, difficulty: req.difficulty, seed: req.seed, skipMuster: true,
    onReady: (sim) => {
      appState.gameRunning = false;              // no timer; we step by hand
      const state = tickToRoom(sim, req.room);
      appState.renderer.render(state);
      // render() eases the camera toward the room; a capture wants it
      // there, not on its way (IsoDungeonRenderer.snapCamera).
      appState.renderer.snapCamera?.();
      updateUI(state);
      markReady(state, req);
    },
  });
}

function startDelve({ pool, difficulty, seed, skipMuster = false, onReady = null }) {
  console.log(`Delve begins: difficulty=${difficulty}, seed=${seed}`);

  const draftContainer = document.getElementById('draft-container');
  draftContainer.innerHTML = '';
  draftContainer.style.display = 'none';
  document.getElementById('world-container').style.display = 'flex';
  document.getElementById('ui-container').style.display = 'flex';

  // An archived/edited design replays instead of a generated dungeon
  const replay = appState.pendingReplay || null;
  appState.pendingReplay = null;
  if (replay) showToast('🗺️', `Delving the archived design: "${replay.name}"`, 'room');

  // One draft, one dungeon (v8): the party is built here, mustered, and
  // marched. There is no town and no second descent — the delve is the
  // run, and what it costs is what it cost.
  const party = new Party(pool);
  appState.difficulty = difficulty;
  appState.runRecorded = false;
  appState.standings = null;            // recomputed when the run ends
  appState.seenRoomTypes = new Set();   // explain each room once per run

  // The muster: kit is dealt out by best fit, and this is where the
  // player overrules that, says who prepares which working, and names
  // their own (ui/OutfitUI.js). Skippable in one click.
  const march = () => {
    const sim = new Simulator(party, seed, difficulty, {
      layout: replay ? replay.layout : null,
    });
    beginDelve(sim);
    if (onReady) onReady(sim);
  };
  if (skipMuster) march(); else showMuster(party, '⛏️ March on the Dungeon', march);
}

/**
 * The outfitting screen, over the same panel the town uses.
 */
function showMuster(party, doneLabel, onDone) {
  const display = document.getElementById('gameover-display');
  display.innerHTML = '';
  const body = document.createElement('div');
  display.appendChild(body);
  renderOutfitting(body, party, {
    doneLabel,
    onChange: () => {
      if (appState.simulator) updateUI(appState.simulator.getState());
    },
    onDone: () => {
      display.classList.remove('active');
      display.innerHTML = '';
      onDone();
    },
  });
  display.classList.add('active');
}

/**
 * Run one dungeon of the campaign — depth 1 or depth 9, same loop
 */
function beginDelve(sim) {
  appState.simulator = sim;

  // Torchlit isometric 3D, with the 2D map as a WebGL fallback
  if (!appState.renderer) {
    try {
      appState.renderer = new IsoDungeonRenderer('game-canvas');
    } catch (e) {
      console.warn('WebGL unavailable, using 2D map renderer:', e);
      appState.renderer = new DungeonRenderer('game-canvas');
    }
  }

  const state = sim.getState();
  appState.prevState = state;   // baseline for event diffing this delve
  resetStory(state.theme);
  document.getElementById('pause-btn').disabled = false;
  document.getElementById('step-btn').disabled = false;
  document.getElementById('pause-btn').textContent = 'Pause';
  appState.renderer.render(state);
  updateUI(state);

  appState.gameRunning = true;
  appState.lastTickTime = performance.now();
  mainLoop();
}

function mainLoop() {
  if (!appState.gameRunning) return;

  const now = performance.now();
  const tickInterval = 1400 / appState.speedMultiplier;

  if (now - appState.lastTickTime >= tickInterval) {
    appState.lastTickTime = now;
    appState.simulator.tick();
    const ended = processTickResult();
    if (ended) return;
  }

  requestAnimationFrame(mainLoop);
}

function processTickResult() {
  const state = appState.simulator.getState();
  appState.renderer.render(state);
  updateUI(state);

  if (state.narration) {
    appendStory(state.narration, state.roomIndex);
    announceEvents(appState.prevState, state);
    // Spell bursts, sword slashes, gold glints — over the room it happened in
    appState.renderer.playEffect?.(state.narration.action, state.narration.roomIndex, state.narration.spellElement);
    // Secret doors and side passages get an onscreen flag too
    if (state.narration.aside) {
      const icon = state.narration.aside.startsWith('🕳️') ? '🕳️' : '🧭';
      showToast(icon, state.narration.aside.replace(/^[^ ]+ /, ''), 'room');
    }
  }
  appState.prevState = state;

  if (state.gameOver) {
    endGame(state);
    return true;
  }
  return false;
}

function stepGame() {
  if (!appState.simulator || !appState.gameRunning) return;
  appState.simulator.tick();
  processTickResult();
}

function togglePause() {
  if (!appState.simulator) return;
  const paused = !appState.simulator.paused;
  appState.simulator.setPaused(paused);
  document.getElementById('pause-btn').textContent = paused ? 'Resume' : 'Pause';
  if (!paused) {
    appState.lastTickTime = performance.now();
  }
}

function updateUI(state) {
  document.getElementById('room-count').textContent = `${state.roomIndex} / ${(state.pathLength || state.dungeon.length) - 1}`;
  // How deep they are. The floor the party stands on is the one thing
  // the panel could not say when floors landed (world/DungeonGen.js).
  const floors = Math.max(...(state.dungeon.rooms || []).map(r => (r.floor || 0) + 1), 1);
  const floorEl = document.getElementById('floor-count');
  floorEl.textContent = `${(state.floor || 0) + 1} / ${floors}`;
  floorEl.style.color = (state.floor || 0) + 1 === floors ? '#d88a3f' : '#9aa3b0';
  document.getElementById('gold-count').textContent = state.party.gold;
  document.getElementById('score-count').textContent = state.party.score;
  // The lamp. Amber while it lasts, red once the party is in the dark.
  const supplyEl = document.getElementById('supply-count');
  const supply = state.party.supply ?? 0;
  supplyEl.textContent = supply === 0 ? 'dark' : supply;
  supplyEl.style.color = supply === 0 ? '#e05555' : (supply <= 2 ? '#d8a53f' : '#e8c07a');
  supplyEl.title = supply === 0
    ? 'The oil is gone. Every march in the dark costs the whole party health.'
    : `Oil for ${supply} more march${supply === 1 ? '' : 'es'}.`;
  document.getElementById('potions-count').textContent = state.party.potions;
  // The trophy case: count onscreen, the full inventory on hover
  const trophyEl = document.getElementById('trophies-count');
  const trophies = state.party.trophies || [];
  trophyEl.textContent = trophies.length;
  trophyEl.title = trophies.map(t => `${t.icon} ${t.name}`).join('\n');

  // Afflictions the party carries between rooms
  const badges = [];
  if (state.party.poisonLinger > 0) badges.push('🐍 venom working');
  if (state.party.alarmed) badges.push('🔔 alarm raised');
  document.getElementById('status-badges').textContent = badges.join(' · ');

  // Roster (the four who march; reserves listed under them)
  const roster = document.getElementById('party-roster');
  const reserveRows = (state.party.reserve || []).map(r => `
      <div class="member-row" style="opacity:0.5;">
        <span>${r.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${r.name} <span style="color:#665;font-size:0.7rem;">(${r.class})</span></div>
          <div style="color:#556;font-size:0.68rem;">in reserve — waits in town for a place in the four</div>
        </span>
      </div>`).join('');
  roster.innerHTML = state.party.members.map(m => {
    const pct = Math.round((m.health / m.maxHealth) * 100);
    const barColor = pct > 60 ? '#3ddc84' : pct > 30 ? '#d8a53f' : '#e05555';
    const kit = [...m.equipment, ...m.weaponMods].join(', ');
    // Wounds close off the top of the bar: healing cannot reach past
    // the scar until town (Adventurer.effectiveMax)
    const ceiling = m.effectiveMax ?? m.maxHealth;
    const scarPct = Math.max(0, Math.round(((m.maxHealth - ceiling) / m.maxHealth) * 100));
    const scar = scarPct > 0
      ? `<span class="hp-scar" style="position:absolute;right:0;top:0;bottom:0;width:${scarPct}%;background:repeating-linear-gradient(45deg,#5a2a2a,#5a2a2a 2px,#3a1c1c 2px,#3a1c1c 4px);"></span>`
      : '';
    const scarNote = m.wounds
      ? `<span title="${m.wounds} wound${m.wounds === 1 ? '' : 's'} — healing cannot pass ${ceiling} until town" style="color:#c76;font-size:0.68rem;">${'✚'.repeat(Math.min(m.wounds, 4))}</span>`
      : '';
    return `
      <div class="member-row ${m.alive ? '' : 'member-dead'}">
        <span>${m.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${m.name} <span style="color:#665;font-size:0.7rem;">(${m.class})</span></div>
          ${kit ? `<div style="color:#556;font-size:0.68rem;">${kit}</div>` : ''}
        </span>
        ${scarNote}
        <span class="hp-bar" style="position:relative;overflow:hidden;"><span class="hp-fill" style="width:${pct}%;background:${barColor};"></span>${scar}</span>
        <span class="member-hp" style="color:${barColor};">${m.health}</span>
      </div>
    `;
  }).join('') + reserveRows;

  // Where the party is standing right now (agents/Formation.js). The
  // chip sits with the drills because it is the same kind of fact: a
  // choice the party made that the player should be able to see.
  const formationChip = state.party.formation && state.party.formation !== 'line'
    ? `<span class="tactic-chip" title="The room allowed this shape, and the party took it">${FORMATION_GLYPH[state.party.formation] || ''} ${escapeHtml(FORMATION_LABEL[state.party.formation] || '')}</span>`
    : '';

  // Drilled technique, and anything drafted that cannot fire. An idle
  // tactic is shown dashed with its reason on hover, because a silently
  // dead card reads as a bug (game/Tactics.js).
  const tacticsEl = document.getElementById('party-tactics');
  const live = state.party.tactics || [];
  const idle = state.party.dormantTactics || [];
  tacticsEl.innerHTML = [
    formationChip,
    ...live.map(t => `<span class="tactic-chip">${t.icon} ${escapeHtml(t.name)}</span>`),
    ...idle.map(text => {
      const name = (text.match(/^\S+\s(.+?) is drafted/) || [])[1] || 'A tactic';
      return `<span class="tactic-chip idle" title="${escapeHtml(text)}">${escapeHtml(name)} · idle</span>`;
    }),
  ].join('');

  // Log
  const log = document.getElementById('debug-log');
  log.innerHTML = state.log.map(e => `<div class="log-entry">${escapeHtml(e)}</div>`).join('');
  log.scrollTop = log.scrollHeight;
}

function appendStory(narration, roomIndex) {
  const panel = document.getElementById('story-panel');
  const empty = panel.querySelector('.story-empty');
  if (empty) empty.remove();

  const fallLines = (narration.falls || [])
    .map(f => `<div class="story-fall">${escapeHtml(f)}</div>`)
    .join('');
  // Wounds sit between the outcome and the deaths: worse than a scratch,
  // short of a fall (Narrator.composeWound)
  const woundLines = (narration.wounds || [])
    .map(w => `<div class="story-wound">${escapeHtml(w)}</div>`)
    .join('');
  const asideLine = narration.aside
    ? `<div class="story-aside">${escapeHtml(narration.aside)}</div>`
    : '';

  const entry = document.createElement('div');
  entry.className = 'story-entry';
  entry.innerHTML = `
    <div class="story-room">${narration.icon} Room ${roomIndex} — ${narration.room}</div>
    <div class="story-predicament">${escapeHtml(narration.predicament)}</div>
    <div class="story-deliberation">${escapeHtml(narration.deliberation)}</div>
    <div class="story-resolution">${escapeHtml(narration.resolution)}</div>
    ${woundLines}
    ${fallLines}
    ${asideLine}
  `;
  panel.appendChild(entry);
  while (panel.children.length > 14) panel.removeChild(panel.firstChild);
  panel.scrollTop = panel.scrollHeight;
}

function resetStory(theme = null) {
  const depth = 1, condition = null;
  const depthBadge = depth > 1 ? ` — Depth ${depth}` : '';
  const conditionLine = condition
    ? `<div style="margin-top:0.4rem;font-size:0.8rem;color:#e8724a;">${condition.icon} Wager — ${escapeHtml(condition.name)}</div>`
    : '';
  const banner = theme
    ? `<div class="story-entry" style="border-left:3px solid #d8a53f;">
         <div class="story-room" style="font-size:1rem;">${theme.icon} ${escapeHtml(theme.name)}${depthBadge}</div>
         <div class="story-predicament" style="font-style:italic;">${escapeHtml(theme.tagline)}</div>
         ${conditionLine}
       </div>`
    : '';
  document.getElementById('story-panel').innerHTML =
    banner + '<div class="story-empty">The chronicle of this delve is not yet written…</div>';
}

function endGame(state) {
  appState.gameRunning = false;
  document.getElementById('pause-btn').disabled = true;
  document.getElementById('step-btn').disabled = true;

  // Every finished dungeon's design joins the archive
  archive.save({
    name: `${state.theme.name} — depth ${state.depth}`,
    layout: serializeDungeon(appState.simulator.dungeon),
    seed: appState.simulator.seed,
    outcome: { victory: state.victory, score: state.party.score, depth: state.depth },
  });

  // The saga goes on the shelf at the end of EVERY delve, not only when
  // the campaign closes. A player who shuts the tab in town used to lose
  // the whole story, which is the same silence problem one layer up.
  saveChronicle();

  showFinal(state);
}

/**
 * The campaign's last page: a wipe, or a retirement with the loot
 */
function showFinal(state) {
  const result = appState.simulator.getRunResult();
  const summary = { ...result, depth: 1, retired: result.victory };
  const retired = summary.retired;

  // Record the campaign once
  if (!appState.runRecorded) {
    appState.runRecorded = true;
    progression.recordRun(appState.difficulty, {
      score: summary.score,
      gold: summary.gold,
      roomsCleared: summary.roomsCleared,
      victory: retired,
      survivors: summary.survivors,
      partySize: summary.partySize,
      depth: summary.depth,
    });
  }
  const best = progression.bestScores[appState.difficulty] || 0;
  const isNewBest = summary.score >= best && summary.score > 0;
  const stats = progression.getStats();

  // The rivals finally delve their drafts — compare scores at the table.
  // The player's hex lands on its target; the hex laid on the player is
  // already baked into their real run.
  if (!appState.standings && appState.draft) {
    appState.standings = computeStandings(
      appState.draft,
      { score: summary.score, depth: summary.depth },
      { seed: appState.simulator.seed, difficulty: appState.difficulty },
    );
  }
  const standingsRows = (appState.standings || []).map(r => `
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.28rem 0;border-bottom:1px dashed #2a2318;${r.isPlayer ? 'color:#d8a53f;font-weight:bold;' : 'color:#b0a080;'}">
      <span style="width:1.6rem;">${placeLabel(r.place)}</span>
      <span>${r.icon} ${escapeHtml(r.name)}</span>
      <span style="margin-left:auto;">${r.score} <span style="color:#776;font-size:0.82em;">· depth ${r.depthReached}</span></span>
    </div>`).join('');

  const display = document.getElementById('gameover-display');

  display.innerHTML = `
    <h2 style="color:${retired ? '#3ddc84' : '#e05555'};font-size:1.35rem;margin-bottom:1rem;text-align:center;">
      ${retired ? '🏆 Out of the Dungeon, Alive' : '☠️ The Run Ends in the Dark'}
    </h2>
    <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid ${retired ? '#3ddc84' : '#aa5544'};border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
      ${escapeHtml(result.epitaph || '')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
      <span style="color:#887755;">Score</span><strong style="color:#d8a53f;text-align:right;">${summary.score}${isNewBest ? ' ⭐ New Best!' : ''}</strong>
      <span style="color:#887755;">Gold</span><strong style="text-align:right;">${summary.gold}</strong>
      <span style="color:#887755;">Rooms conquered</span><strong style="text-align:right;">${summary.roomsCleared}</strong>
      <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${summary.survivors} / ${summary.partySize}</strong>
      <span style="color:#887755;">Spells learned</span><strong style="text-align:right;">${summary.spellsLearned}</strong>
      <span style="color:#887755;">Trophies claimed</span><strong style="text-align:right;">${summary.trophies}</strong>
      <span style="color:#887755;">Best on ${appState.difficulty}</span><strong style="text-align:right;">${Math.max(best, summary.score)}</strong>
      <span style="color:#887755;">Career</span><strong style="text-align:right;">${stats.totalVictories} escapes / ${stats.totalRuns} runs</strong>
    </div>
    ${trophyCaseHtml(appState.simulator.party.trophies, retired)}
    <div style="margin-top:1.25rem;">
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;border-top:1px solid #3a2f1e;padding-top:0.8rem;">🎲 At the Table — how the draft played out</div>
      ${standingsRows}
    </div>
  `;

  const againBtn = document.createElement('button');
  againBtn.textContent = '🃏 Draft a New Party';
  againBtn.style.cssText = 'width:100%;margin-top:1.5rem;padding:0.9rem;font-size:1rem;';
  againBtn.addEventListener('click', () => {
    display.classList.remove('active');
    document.getElementById('show-results-btn').classList.remove('active');
    startNewDraft();
  });
  display.appendChild(againBtn);

  const storyBtn = document.createElement('button');
  storyBtn.textContent = '📖 Read the Chronicle';
  storyBtn.style.cssText = 'width:100%;margin-top:0.5rem;padding:0.7rem;font-size:0.9rem;background:#2a2213;color:#d8a53f;';
  storyBtn.addEventListener('click', () => {
    display.classList.remove('active');
    document.getElementById('show-results-btn').classList.add('active');
  });
  display.appendChild(storyBtn);

  // The saga goes on the shelf whether they won or not, and can be
  // carried out of the browser (game/Chronicles.js)
  const saved = saveChronicle();
  if (saved) {
    const chronicle = appState.simulator.getChronicle();
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:0.5rem;margin-top:0.5rem;';

    const mdBtn = document.createElement('button');
    mdBtn.textContent = '📖 Download the chronicle';
    mdBtn.title = 'The whole saga as a document you can read';
    mdBtn.style.cssText = 'flex:1;padding:0.7rem;font-size:0.82rem;background:#221c14;color:#c0b090;';
    mdBtn.addEventListener('click', () => {
      offerDownload(chronicleFilename(chronicle, 'md'), toMarkdown(chronicle, { ledger: true }));
    });

    const jsonBtn = document.createElement('button');
    jsonBtn.textContent = '💾 Save file';
    jsonBtn.title = 'A save you can keep, share, or load back in to delve again with this party';
    jsonBtn.style.cssText = 'flex:1;padding:0.7rem;font-size:0.82rem;background:#221c14;color:#c0b090;';
    jsonBtn.addEventListener('click', () => {
      offerDownload(chronicleFilename(chronicle, 'json'),
        chronicles.exportJSON(saved.id), 'application/json');
    });

    row.append(mdBtn, jsonBtn);
    display.appendChild(row);

    const note = document.createElement('div');
    note.style.cssText = 'margin-top:0.4rem;font-size:0.7rem;color:#776;text-align:center;';
    note.textContent = `Saved as "${saved.partyName.split(',')[0]}" — delve ${saved.delves}. Find it under 🏛️ Records.`;
    display.appendChild(note);
  }

  display.classList.add('active');
}

/**
 * The trophy case, laid out on the campaign's last page: what the
 * dead of the dungeon paid, newest first. Wipes show it too — an
 * inventory of everything the dark just took back.
 */
function trophyCaseHtml(trophies, retired) {
  if (!trophies || trophies.length === 0) return '';
  const shown = trophies.slice(-10).reverse();
  const more = trophies.length - shown.length;
  const rows = shown.map(t => `
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.22rem 0;border-bottom:1px dashed #2a2318;color:#b0a080;font-size:0.85rem;">
      <span>${t.icon}</span>
      <span style="flex:1;">${escapeHtml(t.name)}</span>
      <span style="color:#776;font-size:0.78em;">from ${escapeHtml(t.from)}</span>
    </div>`).join('');
  return `
    <div style="margin-top:1.25rem;">
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;border-top:1px solid #3a2f1e;padding-top:0.8rem;">
        🏆 The Trophy Case — ${retired ? 'what came up with them' : 'what the dark took back'}
      </div>
      ${rows}
      ${more > 0 ? `<div style="color:#776;font-size:0.78rem;padding-top:0.3rem;">… and ${more} more, further down the chronicle.</div>` : ''}
    </div>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function placeLabel(place) {
  return ['🥇', '🥈', '🥉'][place - 1] || `${place}.`;
}

window.addEventListener('DOMContentLoaded', init);
