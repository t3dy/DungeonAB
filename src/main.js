/**
 * DungeonAB — application entry point
 * Draft at the table → delve the dungeon → read the chronicle.
 */

import { PackDraft } from './draft/PackDraft.js';
import { DraftUI } from './ui/DraftUI.js';
import { DungeonRenderer } from './ui/DungeonRenderer.js';
import { IsoDungeonRenderer } from './ui/IsoDungeonRenderer.js';
import { Campaign, TOWN_PRICES } from './game/Campaign.js';
import { composeTownInterlude } from './narrative/Narrator.js';
import { progression, DIFFICULTIES } from './game/Progression.js';
import { getCondition, combineConditions, DUNGEON_CONDITIONS } from './game/Conditions.js';
import { computeStandings } from './game/Standings.js';
import { SeededRandom } from './draft/PackDraft.js';
import { archive } from './game/Archive.js';
import { serializeDungeon } from './world/DungeonGen.js';
import { setupArchive } from './ui/ArchiveUI.js';
import { setupCardEditor, loadPlayerPacks } from './ui/CardEditorUI.js';
import { installAlchemyPack } from './packs/alchemyPack.js';
import { ROOM_HELP, CARD_TYPE_HELP, describeTickEvents } from './ui/GameGuide.js';

const HELP_SEEN_KEY = 'dungeonab_help_seen';

const appState = {
  draft: null,
  draftUI: null,
  campaign: null,
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

  setupHelp();
  setupRecords();
  setupCardEditor();
  setupArchive({
    onDelve: (entry) => {
      appState.pendingReplay = entry;
      showToast('🗺️', `Design loaded: "${entry.name}". Draft a party, then delve it.`, 'room');
      startNewDraft();
    },
  });
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

/* -------------------------------------------------------------- */
/* How-to-play overlay                                             */
/* -------------------------------------------------------------- */

function setupHelp() {
  const overlay = document.getElementById('help-overlay');
  const openBtn = document.getElementById('help-btn');
  const closeBtn = document.getElementById('help-close-btn');

  // Populate the card-type legend from the single source of truth
  document.getElementById('help-card-legend').innerHTML = CARD_TYPE_HELP
    .map(h => `<dt>${h.label}</dt><dd>${h.text}</dd>`).join('');

  const open = () => overlay.classList.add('active');
  const close = () => {
    overlay.classList.remove('active');
    try { localStorage.setItem(HELP_SEEN_KEY, '1'); } catch (e) { /* private mode */ }
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  // First-time visitors get the rules before their first pack
  let seen = false;
  try { seen = localStorage.getItem(HELP_SEEN_KEY) === '1'; } catch (e) { /* private mode */ }
  if (!seen) open();
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
          const cond = r.condition ? getCondition(r.condition) : null;
          const outcome = r.victory ? '🏆' : '☠️';
          const condTag = cond && cond.id !== 'none' ? ` · ${cond.icon}` : '';
          return `<div class="records-run">
            <span>${outcome} ${diff.icon} depth ${r.depth || 1} · ${r.roomsCleared} rooms${condTag}</span>
            <span class="rr-score">${r.score}</span>
          </div>`;
        }).join('')
      : '<div class="records-empty">No campaigns yet. The Hall awaits its first name.</div>';

    body.innerHTML =
      (bestRows ? `<dl class="records-best">${bestRows}</dl>` : '') +
      career +
      `<div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">Recent campaigns</div>` +
      runRows;
  };

  const open = () => { render(); overlay.classList.add('active'); };
  const close = () => overlay.classList.remove('active');

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
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
  while (stack.children.length > 4) stack.removeChild(stack.firstChild);
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

function startDelve({ pool, difficulty, seed, condition, hexTarget, hexCondition }) {
  console.log(`Campaign begins: difficulty=${difficulty}, seed=${seed}, condition=${condition}`);

  const draftContainer = document.getElementById('draft-container');
  draftContainer.innerHTML = '';
  draftContainer.style.display = 'none';
  document.getElementById('world-container').style.display = 'flex';
  document.getElementById('ui-container').style.display = 'flex';

  // The hex exchange (Megabase v2 variant): the player may have laid a
  // hex on a rival; one seeded rival lays one back. Telegraphed, and
  // the hex's score premium is the victim's to keep — take-that with
  // counterplay, not a cliff.
  const hexRng = new SeededRandom(`${seed}-hexes`);
  const rivals = appState.draft.seats.filter(s => s.isAI);
  const hexer = hexRng.pick(rivals);
  const hexIds = Object.keys(DUNGEON_CONDITIONS).filter(id => id !== 'none');
  const hexOnPlayer = getCondition(hexRng.pick(hexIds));
  appState.sabotage = {
    tableWager: condition,
    byPlayer: hexCondition && hexCondition !== 'none' ? { seatId: hexTarget, conditionId: hexCondition } : null,
    onPlayer: { rivalName: hexer.name, rivalIcon: hexer.icon, condition: hexOnPlayer },
  };

  const playerCondition = combineConditions(getCondition(condition), hexOnPlayer);

  // An archived/edited design replays as depth 1 of this campaign
  const replay = appState.pendingReplay || null;
  appState.pendingReplay = null;
  if (replay) showToast('🗺️', `Delving the archived design: "${replay.name}"`, 'room');

  appState.campaign = new Campaign(pool, {
    seed, difficulty, condition: playerCondition,
    layout: replay ? replay.layout : null,
  });
  appState.difficulty = difficulty;
  appState.runRecorded = false;
  appState.standings = null;            // recomputed when this campaign ends
  appState.seenRoomTypes = new Set();   // explain each room once per campaign

  showToast(hexer.icon, `${hexer.name} hexes your run: ${hexOnPlayer.name}. Its score premium is yours to keep.`, 'death');
  if (appState.sabotage.byPlayer) {
    const laid = getCondition(hexCondition);
    const victim = rivals.find(s => s.id === hexTarget);
    showToast(laid.icon, `Your hex — ${laid.name} — settles over ${victim?.name || 'a rival'}'s run.`, 'boss');
  }

  beginDelve(appState.campaign.nextDelve());
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
  resetStory(state.theme, state.depth, state.condition);
  if (state.condition) {
    showToast(state.condition.icon, `Wager: ${state.condition.name}. ${state.condition.text}`, 'boss');
  }
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
    appState.renderer.playEffect?.(state.narration.action, state.narration.roomIndex, state.narration.spellElement, state.narration.fx);
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
  const floorTag = (state.floors || 1) > 1 ? ` · Floor ${(state.currentFloor || 0) + 1}/${state.floors}` : '';
  document.getElementById('room-count').textContent = `${state.roomIndex} / ${(state.pathLength || state.dungeon.length) - 1}${floorTag}`;
  document.getElementById('gold-count').textContent = state.party.gold;
  document.getElementById('score-count').textContent = state.party.score;
  document.getElementById('materials-count').textContent = state.party.materials;
  document.getElementById('potions-count').textContent = state.party.potions;
  document.getElementById('phials-count').textContent = state.party.phials || 0;
  document.getElementById('keys-count').textContent = state.party.keys || 0;

  // Afflictions the party carries between rooms
  const badges = [];
  if (state.party.poisonLinger > 0) badges.push('🐍 venom working');
  if (state.party.alarmed) badges.push('🔔 alarm raised');
  if (state.party.blessedWard > 0) badges.push('⚖️ warded');
  document.getElementById('status-badges').textContent = badges.join(' · ');

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

/** First name only — the ticker has no room for epithets. */
function shortName(name) {
  return String(name || '').split(/[ ,]/)[0];
}

function appendStory(narration, roomIndex) {
  const panel = document.getElementById('story-panel');
  const empty = panel.querySelector('.story-empty');
  if (empty) empty.remove();

  const fallLines = (narration.falls || [])
    .map(f => `<div class="story-fall">${escapeHtml(f)}</div>`)
    .join('');
  const asideLine = narration.aside
    ? `<div class="story-aside">${escapeHtml(narration.aside)}</div>`
    : '';

  // The blow-by-blow, one muted line: who hit, for how much, who ran
  const log = narration.fx?.combatLog;
  const roundsLine = log?.length
    ? `<div class="story-rounds">⚔ ${log.map(r =>
        r.events.map(ev =>
          ev.kind === 'hero-hit' ? `${escapeHtml(shortName(ev.name))} ${ev.crit ? '✦' : ''}${ev.amount}`
          : ev.kind === 'opening' ? `${escapeHtml(shortName(ev.name || 'item'))}!${ev.amount}`
          : ev.kind === 'cantrip' ? `✨${ev.amount}`
          : ev.kind === 'vial' ? `⚗${ev.amount}`
          : ev.kind === 'monster-hit' ? `<span class="hit-back">-${ev.amount}</span>`
          : ev.kind === 'triage' ? `<span class="hit-heal">+${ev.amount}</span>`
          : ev.kind === 'phase' ? '💢'
          : ev.kind === 'rout' ? '💨flees!'
          : ''
        ).filter(Boolean).join(' ')
      ).join(' · ')}</div>`
    : '';

  const entry = document.createElement('div');
  entry.className = 'story-entry';
  entry.innerHTML = `
    <div class="story-room">${narration.icon} Room ${roomIndex} — ${narration.room}</div>
    <div class="story-predicament">${escapeHtml(narration.predicament)}</div>
    <div class="story-deliberation">${escapeHtml(narration.deliberation)}</div>
    <div class="story-resolution">${escapeHtml(narration.resolution)}</div>
    ${roundsLine}
    ${fallLines}
    ${asideLine}
  `;
  panel.appendChild(entry);
  while (panel.children.length > 14) panel.removeChild(panel.firstChild);
  panel.scrollTop = panel.scrollHeight;
}

function resetStory(theme = null, depth = 1, condition = null) {
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

  appState.campaign.recordDelve(appState.simulator);

  // Every finished dungeon's design joins the archive
  archive.save({
    name: `${state.theme.name} — depth ${state.depth}`,
    layout: serializeDungeon(appState.simulator.dungeon),
    seed: appState.simulator.seed,
    outcome: { victory: state.victory, score: state.party.score, depth: state.depth },
  });

  if (state.victory && !appState.campaign.over) {
    showTown(state);
  } else {
    showFinal(state);
  }
}

/**
 * The town between dungeons: heal for gold, stock potions, then
 * choose — deeper, or out with the score
 */
function showTown(state) {
  const campaign = appState.campaign;
  const result = appState.simulator.getRunResult();
  const display = document.getElementById('gameover-display');

  // The interlude joins the chronicle
  appendStory({
    room: 'town', icon: '🏘️',
    predicament: composeTownInterlude(campaign.party, campaign.depth),
    deliberation: '', resolution: '',
  }, `— after depth ${campaign.depth}`);

  const render = () => {
    const healCost = campaign.healCost();
    const missing = campaign.missingHealth();
    const gold = campaign.party.gold;
    const pious = campaign.party.hasPersonality('pious');

    display.innerHTML = `
      <h2 style="color:#3ddc84;font-size:1.35rem;margin-bottom:0.5rem;text-align:center;">
        🏘️ The Town Between
      </h2>
      <div style="text-align:center;color:#887755;margin-bottom:1rem;">Depth ${campaign.depth} cleared — the road down continues</div>
      <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid #3ddc84;border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
        ${escapeHtml(result.epitaph || '')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
        <span style="color:#887755;">Campaign score</span><strong style="color:#d8a53f;text-align:right;">${campaign.party.score}</strong>
        <span style="color:#887755;">Gold</span><strong style="text-align:right;">${gold}</strong>
        <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${campaign.party.living().length} / ${campaign.party.members.length}</strong>
        <span style="color:#887755;">Potions</span><strong style="text-align:right;">${campaign.party.potions.length}</strong>
      </div>
    `;

    const btn = (label, enabled, onClick, style = '') => {
      const b = document.createElement('button');
      b.textContent = label;
      b.disabled = !enabled;
      b.style.cssText = `width:100%;margin-top:0.5rem;padding:0.8rem;font-size:0.95rem;${style}${enabled ? '' : 'opacity:0.45;cursor:default;'}`;
      b.addEventListener('click', onClick);
      display.appendChild(b);
      return b;
    };

    btn(
      missing === 0 ? '💤 Everyone Is Rested' : `🛏️ Rest & Heal All — ${healCost}g${pious ? ' (temple rate)' : ''}`,
      missing > 0 && gold >= healCost,
      () => { campaign.healAll(); render(); },
    );
    btn(
      `🧪 Buy a Healing Draught — ${TOWN_PRICES.potion}g`,
      gold >= TOWN_PRICES.potion,
      () => { campaign.buyPotion(); render(); },
    );

    // The hiring board — replace the fallen, or just field a bigger band
    const label = document.createElement('div');
    label.style.cssText = 'margin-top:1rem;color:#887755;font-size:0.78rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;';
    label.textContent = '🪧 The hiring board — adventurers looking for work:';
    display.appendChild(label);

    for (const offer of campaign.recruitOffers()) {
      const s = offer.card.stats;
      btn(
        `${offer.card.icon} Hire ${offer.card.name} (${offer.card.class}) — ${offer.cost}g`,
        gold >= offer.cost,
        () => {
          const m = campaign.recruit(offer.card.id);
          if (m) showToast(offer.card.icon, `${m.name} joins the party.`, 'room');
          render();
        },
        `font-size:0.82rem;padding:0.6rem;background:#1a2617;color:#a8d5b0;`,
      ).title = `❤️${s.health} ⚔️${s.attack} 🛡️${s.defense} 🧠${s.mind}`;
    }

    // The blacksmith — sharpen the hardest hitter's weapon
    const forgeCost = campaign.forgeCost();
    const striker = campaign.party.living().reduce((a, b) => (a.attack >= b.attack ? a : b));
    btn(
      `🔨 Sharpen ${striker.name}'s weapon (+${TOWN_PRICES.forgeMod.attack} atk) — ${forgeCost}g`,
      gold >= forgeCost,
      () => {
        const r = campaign.forge();
        if (r) showToast('🔨', `The smith sets ${TOWN_PRICES.forgeMod.name} to ${r.target}'s blade.`, 'room');
        render();
      },
      `font-size:0.82rem;padding:0.6rem;background:#26200f;color:#e0c88a;`,
    );

    btn(
      `⛏️ Delve Deeper — depth ${campaign.depth + 1} awaits`,
      true,
      () => {
        display.classList.remove('active');
        beginDelve(campaign.nextDelve());
      },
      'margin-top:1.25rem;font-size:1rem;padding:0.9rem;',
    );
    btn(
      '🏡 Retire & Bank the Score',
      true,
      () => {
        campaign.retire();
        showFinal(appState.simulator.getState());
      },
      'background:#2a2213;color:#d8a53f;',
    );

    // Keep the side panels (roster, gold) in step with town purchases
    updateUI(appState.simulator.getState());
  };

  render();
  display.classList.add('active');
}

/**
 * The campaign's last page: a wipe, or a retirement with the loot
 */
function showFinal(state) {
  const campaign = appState.campaign;
  const summary = campaign.getSummary();
  const result = appState.simulator.getRunResult();
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
      condition: appState.campaign.condition !== 'none' ? appState.campaign.condition : null,
    });
  }
  const best = progression.bestScores[appState.difficulty] || 0;
  const isNewBest = summary.score >= best && summary.score > 0;
  const stats = progression.getStats();

  // The rivals finally delve their drafts — compare scores at the table.
  // The player's hex lands on its target; the hex laid on the player is
  // already baked into their real run.
  if (!appState.standings && appState.draft) {
    const sab = appState.sabotage || {};
    appState.standings = computeStandings(
      appState.draft,
      { score: summary.score, depth: summary.depth, hexIcon: sab.onPlayer?.condition?.icon || null },
      {
        seed: campaign.seed,
        difficulty: campaign.difficulty,
        condition: sab.tableWager ?? campaign.condition,
        hexes: sab.byPlayer ? { [sab.byPlayer.seatId]: sab.byPlayer.conditionId } : {},
      },
    );
  }
  const standingsRows = (appState.standings || []).map(r => `
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.28rem 0;border-bottom:1px dashed #2a2318;${r.isPlayer ? 'color:#d8a53f;font-weight:bold;' : 'color:#b0a080;'}">
      <span style="width:1.6rem;">${placeLabel(r.place)}</span>
      <span>${r.icon} ${escapeHtml(r.name)}${r.hexIcon ? ` <span title="hexed">${r.hexIcon}</span>` : ''}</span>
      <span style="margin-left:auto;">${r.score} <span style="color:#776;font-size:0.82em;">· depth ${r.depthReached}</span></span>
    </div>`).join('');

  const display = document.getElementById('gameover-display');

  display.innerHTML = `
    <h2 style="color:${retired ? '#3ddc84' : '#e05555'};font-size:1.35rem;margin-bottom:1rem;text-align:center;">
      ${retired ? '🏆 Retired in Glory' : '☠️ The Campaign Ends in the Dark'}
    </h2>
    <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid ${retired ? '#3ddc84' : '#aa5544'};border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
      ${escapeHtml(result.epitaph || '')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
      <span style="color:#887755;">Campaign score</span><strong style="color:#d8a53f;text-align:right;">${summary.score}${isNewBest ? ' ⭐ New Best!' : ''}</strong>
      <span style="color:#887755;">Depth reached</span><strong style="text-align:right;">${summary.depth}</strong>
      <span style="color:#887755;">Gold</span><strong style="text-align:right;">${summary.gold}</strong>
      <span style="color:#887755;">Rooms conquered</span><strong style="text-align:right;">${summary.roomsCleared}</strong>
      <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${summary.survivors} / ${summary.partySize}</strong>
      <span style="color:#887755;">Spells learned</span><strong style="text-align:right;">${summary.spellsLearned}</strong>
      <span style="color:#887755;">Best on ${appState.difficulty}</span><strong style="text-align:right;">${Math.max(best, summary.score)}</strong>
      <span style="color:#887755;">Career</span><strong style="text-align:right;">${stats.totalVictories} retirements / ${stats.totalRuns} campaigns</strong>
    </div>
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

  display.classList.add('active');
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
