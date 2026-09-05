/**
 * DungeonAB — application entry point
 * Draft at the table → muster → delve the dungeon → the reckoning.
 *
 * Four screens in one frame (ui/Screens.js): the Table, the Muster,
 * the Delve and the Reckoning. Each renders into its own section and
 * owns a group in the action bar, so the button that starts the delve
 * is never at the end of a scroll (SCREENS.md S1). The delve is
 * performed rather than shown: every room the simulator resolves is
 * played back as beats before the next tick (ui/Choreography.js).
 */

import { PackDraft } from './draft/PackDraft.js';
import { DraftUI } from './ui/DraftUI.js';
import { DungeonRenderer } from './ui/DungeonRenderer.js';
import { IsoDungeonRenderer } from './ui/IsoDungeonRenderer.js';
import { captureRequest, autoDraft, tickToRoom, markReady } from './ui/Frames.js';
import { renderMuster, openKit } from './ui/MusterUI.js';
import { showScreen, currentScreen, onScreenChange } from './ui/Screens.js';
import { planBeats, Choreographer } from './ui/Choreography.js';
import { Simulator } from './sim/Simulator.js';
import { Party } from './agents/Party.js';
import { progression, DIFFICULTIES } from './game/Progression.js';
import { computeStandings } from './game/Standings.js';
import { archive } from './game/Archive.js';
import { serializeDungeon } from './world/DungeonGen.js';
import { setupArchive } from './ui/ArchiveUI.js';
import { setupCardEditor, loadPlayerPacks } from './ui/CardEditorUI.js';
import { installAlchemyPack } from './packs/alchemyPack.js';
import { ROOM_HELP, CARD_TYPE_HELP, ATTRITION_HELP, describeTickEvents } from './ui/GameGuide.js';
import { ChronicleLibrary, chronicleFilename } from './game/Chronicles.js';
import { FORMATIONS } from './agents/Formation.js';
import { toMarkdown } from './narrative/Chronicle.js';
import { getEncounterTrace, clearEncounterTrace, capabilityUsageSummary } from './encounters/EncounterEngine.js';

/* Where the party is standing, for the HUD */
const FORMATION_GLYPH = Object.fromEntries(
  Object.entries(FORMATIONS).map(([id, f]) => [id, f.icon]));
const FORMATION_LABEL = Object.fromEntries(
  Object.entries(FORMATIONS).map(([id, f]) => [id, f.name]));

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
 * Write the run to the shelf. Called at the end of every delve, so a
 * refresh never costs the story. Returns the stored record, or null.
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
  party: null,
  simulator: null,
  renderer: null,
  choreographer: null,
  gameRunning: false,
  paused: false,
  performing: false,
  delveToken: 0,          // a new delve or draft invalidates the old loop
  speedMultiplier: 1,
  prevState: null,        // last tick's state, for event diffing
  seenRoomTypes: null,    // room types explained this run
  savedRecord: null,      // the shelf record of the finished delve
};

const wait = ms => new Promise(r => setTimeout(r, ms));

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

  // The action bar. Every screen's primary action is wired once, here.
  document.getElementById('hub-btn').addEventListener('click', () => { window.location.href = 'hub/'; });
  document.getElementById('march-btn').addEventListener('click', marchFromMuster);
  document.getElementById('muster-kit-btn').addEventListener('click', openKit);
  document.getElementById('pause-btn').addEventListener('click', togglePause);
  document.getElementById('step-btn').addEventListener('click', stepGame);
  document.getElementById('speed-slider').addEventListener('input', e => {
    appState.speedMultiplier = parseFloat(e.target.value);
    document.getElementById('speed-label').textContent = `${appState.speedMultiplier.toFixed(1)}x`;
  });
  document.getElementById('results-btn').addEventListener('click', () => showScreen('reckoning'));
  document.getElementById('read-btn').addEventListener('click', () => showScreen('delve'));
  document.getElementById('again-btn').addEventListener('click', startNewDraft);
  document.getElementById('chron-md-btn').addEventListener('click', () => {
    const chronicle = appState.simulator?.getChronicle?.();
    if (chronicle) offerDownload(chronicleFilename(chronicle, 'md'), toMarkdown(chronicle, { ledger: true }));
  });
  document.getElementById('chron-json-btn').addEventListener('click', () => {
    const chronicle = appState.simulator?.getChronicle?.();
    if (chronicle && appState.savedRecord) {
      offerDownload(chronicleFilename(chronicle, 'json'), chronicles.exportJSON(appState.savedRecord.id), 'application/json');
    }
  });

  // The canvas fills whatever the grid gives it; re-fit when that changes
  window.addEventListener('resize', () => appState.renderer?.refit?.());
  onScreenChange(id => { if (id === 'delve') requestAnimationFrame(() => appState.renderer?.refit?.()); });

  if (capture) runCapture(capture); else startNewDraft();
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
          const outcome = r.victory ? '🏆' : '☠️';
          return `<div class="records-run">
            <span>${outcome} ${diff.icon} depth ${r.depth || 1} · ${r.roomsCleared} rooms</span>
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

/* -------------------------------------------------------------- */
/* The Table                                                       */
/* -------------------------------------------------------------- */

function startNewDraft() {
  appState.delveToken++;               // any delve still running stops
  appState.choreographer?.cancel();
  appState.gameRunning = false;
  appState.draft = new PackDraft(`table-${Date.now().toString(36)}`);
  appState.draftUI = new DraftUI(appState.draft, enterMuster);
  showScreen('table');
  appState.draftUI.render();
}

/* -------------------------------------------------------------- */
/* The Muster                                                      */
/* -------------------------------------------------------------- */

/**
 * The packs have run dry: the party is built, kit dealt by best fit,
 * and shown mustered with March in the bar (ui/MusterUI.js).
 */
function enterMuster({ pool }) {
  appState.party = new Party(pool);
  renderMuster(document.getElementById('muster-container'), appState.party, { draft: appState.draft });
  document.getElementById('seed-input').value = '';
  showScreen('muster');
}

function marchFromMuster() {
  if (!appState.party) return;
  const difficulty = document.getElementById('difficulty-select').value;
  const seed = document.getElementById('seed-input').value.trim() || `delve-${Date.now().toString(36)}`;
  startDelve({ party: appState.party, difficulty, seed });
}

/* -------------------------------------------------------------- */
/* Capture mode (dev)                                              */
/* -------------------------------------------------------------- */

/**
 * Draft, march and stop, all seeded and all synchronous, then flag the
 * page ready for a screenshot. See ui/Frames.js and GRAPHICS.md §G1.
 */
function runCapture(req) {
  console.log('[frames] capture', req);
  const draft = new PackDraft(req.draftSeed);
  const pool = autoDraft(draft);
  const party = new Party(pool);
  startDelve({
    party, difficulty: req.difficulty, seed: req.seed,
    onReady: (sim) => {
      appState.gameRunning = false;              // no loop; we step by hand
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

/* -------------------------------------------------------------- */
/* The Delve                                                       */
/* -------------------------------------------------------------- */

function startDelve({ party, difficulty, seed, onReady = null }) {
  console.log(`Delve begins: difficulty=${difficulty}, seed=${seed}`);

  // An archived/edited design replays instead of a generated dungeon
  const replay = appState.pendingReplay || null;
  appState.pendingReplay = null;

  appState.difficulty = difficulty;
  appState.runRecorded = false;
  appState.standings = null;            // recomputed when the run ends
  appState.seenRoomTypes = new Set();   // explain each room once per run
  appState.savedRecord = null;
  appState.sagaId = null;

  const sim = new Simulator(party, seed, difficulty, {
    layout: replay ? replay.layout : null,
  });
  showScreen('delve');
  if (replay) showToast('🗺️', `Delving the archived design: "${replay.name}"`, 'room');
  beginDelve(sim, { autoplay: !onReady });
  if (onReady) onReady(sim);
}

function beginDelve(sim, { autoplay = true } = {}) {
  appState.simulator = sim;
  appState.choreographer?.cancel();

  // Torchlit isometric 3D, with the 2D map as a WebGL fallback
  if (!appState.renderer) {
    try {
      appState.renderer = new IsoDungeonRenderer('game-canvas');
    } catch (e) {
      console.warn('WebGL unavailable, using 2D map renderer:', e);
      appState.renderer = new DungeonRenderer('game-canvas');
    }
  }
  appState.choreographer = new Choreographer({
    renderer: appState.renderer,
    story,
    hud,
    speed: () => appState.speedMultiplier,
  });

  const state = sim.getState();
  appState.prevState = state;   // baseline for event diffing this delve
  resetStory(state.theme);
  document.getElementById('pause-btn').disabled = false;
  document.getElementById('step-btn').disabled = false;
  document.getElementById('pause-btn').textContent = 'Pause';
  document.getElementById('results-btn').hidden = true;
  appState.paused = false;
  sim.setPaused(false);
  appState.renderer.refit?.();
  appState.renderer.render(state);
  updateUI(state);

  if (autoplay) {
    appState.gameRunning = true;
    runLoop(++appState.delveToken);
  }
}

/**
 * The loop: tick, perform, tick, perform. The next room is not taken
 * until the last one has been seen through — that is the whole change
 * from the 1400 ms slideshow (SCREENS.md S3).
 */
async function runLoop(token) {
  await wait(500);
  while (appState.gameRunning && token === appState.delveToken) {
    if (appState.paused) { await wait(120); continue; }
    const ended = await advanceRoom(token);
    if (ended) return;
    await wait(360 / Math.max(0.25, appState.speedMultiplier));
  }
}

/** One room: tick the simulator, then perform what it resolved. */
async function advanceRoom(token) {
  if (appState.performing) return false;
  appState.performing = true;
  try {
    const sim = appState.simulator;
    const prev = appState.prevState;
    sim.tick();
    const state = sim.getState();
    const beats = planBeats(prev, state);
    const hold = beats.find(b => b.type === 'line' && b.hold)?.room ?? null;
    appState.renderer.render(state, { perform: true, hold });
    updateStats(state);
    await appState.choreographer.play(beats, prev, state);
    if (token !== appState.delveToken) return true;
    appState.renderer.releaseAim?.();
    updateUI(state);
    announceEvents(prev, state);
    appState.prevState = state;
    if (state.gameOver) {
      endGame(state);
      return true;
    }
    return false;
  } finally {
    appState.performing = false;
  }
}

function stepGame() {
  if (!appState.simulator || appState.performing || appState.simulator.gameOver) return;
  if (!appState.paused) togglePause();
  appState.simulator.setPaused(false);
  advanceRoom(appState.delveToken).then(() => {
    if (appState.simulator && !appState.simulator.gameOver) appState.simulator.setPaused(appState.paused);
  });
}

function togglePause() {
  if (!appState.simulator) return;
  appState.paused = !appState.paused;
  appState.simulator.setPaused(appState.paused);
  document.getElementById('pause-btn').textContent = appState.paused ? 'Resume' : 'Pause';
}

/* -------------------------------------------------------------- */
/* The header strip and the HUD                                    */
/* -------------------------------------------------------------- */

function updateStats(state) {
  document.getElementById('room-count').textContent = `${state.roomIndex} / ${(state.pathLength || state.dungeon.length) - 1}`;
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
}

function updateUI(state) {
  updateStats(state);

  // The HUD strip over the picture: the four who march, and the reserve
  const roster = document.getElementById('party-roster');
  const reserveRows = (state.party.reserve || []).map(r =>
    `<span class="hud-reserve" title="In reserve — steps up the moment someone falls">${r.icon} ${escapeHtml(r.name)} · reserve</span>`).join('');
  roster.innerHTML = state.party.members.map(m => {
    const pct = Math.round((m.health / m.maxHealth) * 100);
    const barColor = pct > 60 ? '#3ddc84' : pct > 30 ? '#d8a53f' : '#e05555';
    const kit = [...m.equipment, ...m.weaponMods].join(', ');
    // Wounds close off the top of the bar: healing cannot reach past
    // the scar (Adventurer.effectiveMax)
    const ceiling = m.effectiveMax ?? m.maxHealth;
    const scarPct = Math.max(0, Math.round(((m.maxHealth - ceiling) / m.maxHealth) * 100));
    const scar = scarPct > 0
      ? `<span class="hp-scar" style="position:absolute;right:0;top:0;bottom:0;width:${scarPct}%;background:repeating-linear-gradient(45deg,#5a2a2a,#5a2a2a 2px,#3a1c1c 2px,#3a1c1c 4px);"></span>`
      : '';
    const scarNote = m.wounds
      ? `<span title="${m.wounds} wound${m.wounds === 1 ? '' : 's'} — healing cannot pass ${ceiling}" style="color:#c76;font-size:0.68rem;">${'✚'.repeat(Math.min(m.wounds, 4))}</span>`
      : '';
    return `
      <div class="hud-member ${m.alive ? '' : 'member-dead'}" data-name="${escapeHtml(m.name)}" data-max="${m.maxHealth}" title="${escapeHtml(kit || 'bare hands')}">
        <span class="hud-icon">${m.icon}</span>
        <span class="hud-body">
          <span class="hud-name">${escapeHtml(m.name)} <small>${m.class}</small></span>
          <span class="hp-bar"><span class="hp-fill" style="width:${pct}%;background:${barColor};"></span>${scar}</span>
        </span>
        ${scarNote}
        <span class="hud-hp" style="color:${barColor};">${m.health}</span>
      </div>
    `;
  }).join('') + reserveRows;

  // Where the party is standing right now (agents/Formation.js)
  hud.formation(state.party.formation);

  // Log
  const log = document.getElementById('debug-log');
  log.innerHTML = state.log.map(e => `<div class="log-entry">${escapeHtml(e)}</div>`).join('');
  log.scrollTop = log.scrollHeight;
}

/**
 * The HUD, as the performance drives it: who is swinging, who is hit,
 * and health that moves when the blow lands rather than at the end.
 */
const hud = {
  acting(names) {
    document.querySelectorAll('.hud-member').forEach(el => {
      el.classList.toggle('acting', names.includes(el.dataset.name));
    });
  },
  hurt(names) {
    document.querySelectorAll('.hud-member').forEach(el => {
      el.classList.toggle('hurt', names.includes(el.dataset.name));
    });
  },
  health(name, hp) {
    const el = document.querySelector(`.hud-member[data-name="${CSS.escape(name)}"]`);
    if (!el) return;
    const max = parseInt(el.dataset.max, 10) || 1;
    const pct = Math.max(0, Math.round((hp / max) * 100));
    const color = pct > 60 ? '#3ddc84' : pct > 30 ? '#d8a53f' : '#e05555';
    const fill = el.querySelector('.hp-fill');
    if (fill) { fill.style.width = `${pct}%`; fill.style.background = color; }
    const num = el.querySelector('.hud-hp');
    if (num) { num.textContent = Math.max(0, hp); num.style.color = color; }
  },
  hint(text) {
    const el = document.getElementById('beat-hint');
    if (el) el.textContent = text ? `· ${text}` : '';
  },
  formation(id) {
    const el = document.getElementById('party-tactics');
    if (!el) return;
    el.innerHTML = id && id !== 'line'
      ? `<span class="tactic-chip" title="The room allowed this shape, and the party took it">${FORMATION_GLYPH[id] || ''} ${escapeHtml(FORMATION_LABEL[id] || '')}</span>`
      : '';
  },
};

/* -------------------------------------------------------------- */
/* The Chronicle column                                            */
/* -------------------------------------------------------------- */

/**
 * The story panel, written a line at a time as the beats play, so the
 * prose and the picture agree on when a thing happened.
 */
const story = {
  open(narration, roomIndex) {
    const panel = document.getElementById('story-panel');
    const empty = panel.querySelector('.story-empty');
    if (empty) empty.remove();
    const entry = document.createElement('div');
    entry.className = 'story-entry live';
    entry.innerHTML = `<div class="story-room">${narration.icon} Room ${roomIndex} — ${escapeHtml(narration.room)}</div>`;
    panel.appendChild(entry);
    while (panel.children.length > 16) panel.removeChild(panel.firstChild);
    panel.scrollTop = panel.scrollHeight;
    return entry;
  },
  line(entry, kind, text) {
    if (!entry || !text) return;
    const div = document.createElement('div');
    div.className = `story-${kind} story-line`;
    div.textContent = text;
    entry.appendChild(div);
    const panel = document.getElementById('story-panel');
    panel.scrollTop = panel.scrollHeight;
  },
  close(entry) {
    if (entry) entry.classList.remove('live');
  },
};

function resetStory(theme = null) {
  const banner = theme
    ? `<div class="story-entry" style="border-left:3px solid #d8a53f;padding-left:0.5rem;">
         <div class="story-room" style="font-size:1rem;">${theme.icon} ${escapeHtml(theme.name)}</div>
         <div class="story-predicament" style="font-style:italic;">${escapeHtml(theme.tagline)}</div>
       </div>`
    : '';
  document.getElementById('story-panel').innerHTML =
    banner + '<div class="story-empty">The chronicle of this delve is not yet written…</div>';
  document.getElementById('chronicle-theme').textContent = theme ? `${theme.icon} ${theme.name}` : '';
}

/* -------------------------------------------------------------- */
/* The Reckoning                                                   */
/* -------------------------------------------------------------- */

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

  // The saga goes on the shelf at the end of EVERY delve. A player who
  // shuts the tab used to lose the whole story, which is the same
  // silence problem one layer up.
  appState.savedRecord = saveChronicle();

  showFinal(state);
}

/**
 * The delve's last page: a wipe, or a retirement with the loot
 */
function showFinal(state) {
  const result = appState.simulator.getRunResult();
  const summary = { ...result, depth: 1, retired: result.victory };
  const retired = summary.retired;

  // Record the run once
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

  const saved = appState.savedRecord;
  const body = document.getElementById('reckoning-body');
  body.innerHTML = `
    <div class="reck-card">
      <h2 style="color:${retired ? '#3ddc84' : '#e05555'};font-size:1.35rem;margin-bottom:1rem;text-align:center;">
        ${retired ? '🏆 Out of the Dungeon, Alive' : '☠️ The Run Ends in the Dark'}
      </h2>
      <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid ${retired ? '#3ddc84' : '#aa5544'};border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
        ${escapeHtml(result.epitaph || '')}
      </div>
      <div class="reck-grid">
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
      ${saved ? `<div class="reck-note">Saved as "${escapeHtml(saved.partyName.split(',')[0])}" — delve ${saved.delves}. Find it under 🏛️ Records.</div>` : ''}
    </div>
  `;

  document.getElementById('chron-json-btn').hidden = !saved;
  document.getElementById('results-btn').hidden = false;
  showScreen('reckoning');
}

/**
 * The trophy case, laid out on the last page: what the dead of the
 * dungeon paid, newest first. Wipes show it too — an inventory of
 * everything the dark just took back.
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
