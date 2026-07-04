/**
 * DungeonAB — application entry point
 * Draft at the table → delve the dungeon → read the chronicle.
 */

import { PackDraft } from './draft/PackDraft.js';
import { DraftUI } from './ui/DraftUI.js';
import { DungeonRenderer } from './ui/DungeonRenderer.js';
import { IsoDungeonRenderer } from './ui/IsoDungeonRenderer.js';
import { Simulator } from './sim/Simulator.js';
import { progression } from './game/Progression.js';

const appState = {
  draft: null,
  draftUI: null,
  simulator: null,
  renderer: null,
  gameRunning: false,
  lastTickTime: 0,
  speedMultiplier: 1,
};

function init() {
  console.log('⚔️ DungeonAB initializing…');
  startNewDraft();

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

function startNewDraft() {
  appState.draft = new PackDraft(`table-${Date.now().toString(36)}`);
  appState.draftUI = new DraftUI(appState.draft, startDelve);
  appState.draftUI.render();

  document.getElementById('world-container').style.display = 'none';
  document.getElementById('ui-container').style.display = 'none';
}

function startDelve({ pool, difficulty, seed }) {
  console.log(`Entering the dungeon: difficulty=${difficulty}, seed=${seed}`);

  const draftContainer = document.getElementById('draft-container');
  draftContainer.innerHTML = '';
  draftContainer.style.display = 'none';
  document.getElementById('world-container').style.display = 'flex';
  document.getElementById('ui-container').style.display = 'flex';

  appState.simulator = new Simulator(pool, seed, difficulty);
  appState.difficulty = difficulty;
  appState.runRecorded = false;

  // Torchlit isometric 3D, with the 2D map as a WebGL fallback
  if (!appState.renderer) {
    try {
      appState.renderer = new IsoDungeonRenderer('game-canvas');
    } catch (e) {
      console.warn('WebGL unavailable, using 2D map renderer:', e);
      appState.renderer = new DungeonRenderer('game-canvas');
    }
  }

  resetStory();
  document.getElementById('pause-btn').disabled = false;
  document.getElementById('step-btn').disabled = false;
  document.getElementById('pause-btn').textContent = 'Pause';

  const state = appState.simulator.getState();
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
  }

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
  document.getElementById('room-count').textContent = `${state.roomIndex} / ${state.dungeon.length - 1}`;
  document.getElementById('gold-count').textContent = state.party.gold;
  document.getElementById('score-count').textContent = state.party.score;
  document.getElementById('materials-count').textContent = state.party.materials;
  document.getElementById('potions-count').textContent = state.party.potions;

  // Roster
  const roster = document.getElementById('party-roster');
  roster.innerHTML = state.party.members.map(m => {
    const pct = Math.round((m.health / m.maxHealth) * 100);
    const barColor = pct > 60 ? '#3ddc84' : pct > 30 ? '#d8a53f' : '#e05555';
    const kit = [...m.equipment, ...m.weaponMods].join(', ');
    return `
      <div class="member-row ${m.alive ? '' : 'member-dead'}">
        <span>${m.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${m.name} <span style="color:#665;font-size:0.7rem;">(${m.class})</span></div>
          ${kit ? `<div style="color:#556;font-size:0.68rem;">${kit}</div>` : ''}
        </span>
        <span class="hp-bar"><span class="hp-fill" style="width:${pct}%;background:${barColor};"></span></span>
        <span class="member-hp" style="color:${barColor};">${m.health}</span>
      </div>
    `;
  }).join('');

  // Log
  const log = document.getElementById('debug-log');
  log.innerHTML = state.log.map(e => `<div class="log-entry">${escapeHtml(e)}</div>`).join('');
  log.scrollTop = log.scrollHeight;
}

function appendStory(narration, roomIndex) {
  const panel = document.getElementById('story-panel');
  const empty = panel.querySelector('.story-empty');
  if (empty) empty.remove();

  const entry = document.createElement('div');
  entry.className = 'story-entry';
  entry.innerHTML = `
    <div class="story-room">${narration.icon} Room ${roomIndex} — ${narration.room}</div>
    <div class="story-predicament">${escapeHtml(narration.predicament)}</div>
    <div class="story-deliberation">${escapeHtml(narration.deliberation)}</div>
    <div class="story-resolution">${escapeHtml(narration.resolution)}</div>
  `;
  panel.appendChild(entry);
  while (panel.children.length > 14) panel.removeChild(panel.firstChild);
  panel.scrollTop = panel.scrollHeight;
}

function resetStory() {
  document.getElementById('story-panel').innerHTML =
    '<div class="story-empty">The chronicle of this delve is not yet written…</div>';
}

function endGame(state) {
  appState.gameRunning = false;
  document.getElementById('pause-btn').disabled = true;
  document.getElementById('step-btn').disabled = true;

  const result = appState.simulator.getRunResult();

  // Record the run once
  if (!appState.runRecorded) {
    appState.runRecorded = true;
    progression.recordRun(appState.difficulty, result);
  }
  const best = progression.bestScores[appState.difficulty] || 0;
  const isNewBest = result.score >= best && result.score > 0;
  const stats = progression.getStats();

  const display = document.getElementById('gameover-display');

  display.innerHTML = `
    <h2 style="color:${state.victory ? '#3ddc84' : '#e05555'};font-size:1.35rem;margin-bottom:1rem;text-align:center;">
      ${state.victory ? '🏆 The Dungeon Is Beaten!' : '☠️ The Party Has Fallen'}
    </h2>
    <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid ${state.victory ? '#3ddc84' : '#aa5544'};border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
      ${escapeHtml(result.epitaph || '')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
      <span style="color:#887755;">Score</span><strong style="color:#d8a53f;text-align:right;">${result.score}${isNewBest ? ' ⭐ New Best!' : ''}</strong>
      <span style="color:#887755;">Gold</span><strong style="text-align:right;">${result.gold}</strong>
      <span style="color:#887755;">Rooms conquered</span><strong style="text-align:right;">${result.roomsCleared}</strong>
      <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${result.survivors} / ${result.partySize}</strong>
      <span style="color:#887755;">Spells learned</span><strong style="text-align:right;">${result.spellsLearned}</strong>
      <span style="color:#887755;">Best on ${appState.difficulty}</span><strong style="text-align:right;">${Math.max(best, result.score)}</strong>
      <span style="color:#887755;">Career</span><strong style="text-align:right;">${stats.totalVictories} wins / ${stats.totalRuns} delves</strong>
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

  display.classList.add('active');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

window.addEventListener('DOMContentLoaded', init);
