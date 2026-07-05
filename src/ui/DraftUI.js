/**
 * DraftUI — the draft table
 *
 * Shows the current pack as a card grid; one click = one pick.
 * The AI seats pick simultaneously and their last picks are shown
 * (signal reading). The growing pool is summarized below. When the
 * packs run dry: Enter the Dungeon.
 */

import { CARD_TYPES } from '../game/Cards.js';
import { DUNGEON_CONDITIONS } from '../game/Conditions.js';

export class DraftUI {
  constructor(draft, onComplete) {
    this.draft = draft;
    this.onComplete = onComplete;
    this.lastAiPicks = [];
    this.selection = { seed: '', difficulty: 'medium' };
  }

  render() {
    const container = document.getElementById('draft-container');
    container.innerHTML = '';
    container.style.display = 'block';

    if (this.draft.finished) {
      this.renderDraftComplete(container);
      return;
    }

    const round = this.draft.round + 1;
    const pick = this.draft.pickInRound + 1;
    const dir = this.draft.passDirection() === 1 ? '→ passing left' : '← passing right';

    const title = document.createElement('div');
    title.style.cssText = 'text-align:center;margin-bottom:1rem;';
    title.innerHTML = `
      <div style="color:#d8a53f;font-size:1.1rem;font-weight:bold;">Pack ${round} of ${this.draft.numRounds} — Pick ${pick}</div>
      <div style="color:#887755;font-size:0.8rem;">${dir} · click ONE card to draft it, then the pack passes on</div>
      <div style="font-size:0.72rem;margin-top:0.4rem;display:flex;gap:0.9rem;justify-content:center;flex-wrap:wrap;">
        <span class="type-character">● Character</span>
        <span class="type-equipment">● Equipment</span>
        <span class="type-spell">● Spell</span>
        <span class="type-personality">● Personality</span>
      </div>
    `;
    container.appendChild(title);

    // The pack
    const grid = document.createElement('div');
    grid.className = 'pack-grid';
    for (const card of this.draft.getPlayerPack()) {
      grid.appendChild(this.renderCard(card, () => this.pick(card.id)));
    }
    container.appendChild(grid);

    // What the table did last pick (signal reading)
    if (this.lastAiPicks.length > 0) {
      const table = document.createElement('div');
      table.className = 'panel';
      table.style.cssText = 'margin-top:1rem;';
      table.innerHTML = `<h2>The Table's Last Picks</h2>` + this.lastAiPicks
        .map(p => `<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${p.icon} ${p.seat} took <strong style="color:#c8b088;">${p.card.icon} ${p.card.name}</strong></div>`)
        .join('');
      container.appendChild(table);
    }

    // The pool so far
    this.renderPool(container);
  }

  renderCard(card, onClick) {
    const el = document.createElement('div');
    el.className = 'draft-card';

    let stats = '';
    if (card.type === CARD_TYPES.CHARACTER) {
      stats = `<div class="card-stats">❤️${card.stats.health} ⚔️${card.stats.attack} 🛡️${card.stats.defense} 🧠${card.stats.mind}</div>`;
    } else if (card.type === CARD_TYPES.EQUIPMENT) {
      const bits = Object.entries(card.bonus).map(([k, v]) => `+${v} ${k}`).join(', ');
      stats = `<div class="card-stats">${bits}${card.bestFor ? ` · best: ${card.bestFor}` : ''}</div>`;
    } else if (card.type === CARD_TYPES.SPELL) {
      stats = `<div class="card-stats">power ${card.power} · ${card.school}</div>`;
    }

    el.innerHTML = `
      <div class="card-type type-${card.type}">${card.type}${card.class ? ' · ' + card.class : ''}</div>
      <div class="card-name">${card.icon} ${card.name}</div>
      <div class="card-text">${card.trait || card.text || ''}</div>
      ${stats}
    `;
    el.addEventListener('click', onClick);
    return el;
  }

  pick(cardId) {
    const result = this.draft.playerPick(cardId);
    if (result) {
      this.lastAiPicks = result.aiPicks;
    }
    this.render();
  }

  renderPool(container) {
    const pool = this.draft.getPlayerPool();
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.style.cssText = 'margin-top:1rem;';

    const section = (label, cards) => cards.length
      ? `<div style="margin-bottom:0.4rem;"><span style="color:#887755;font-size:0.72rem;">${label}:</span> ${cards.map(c => `${c.icon} ${c.name}`).join(' · ')}</div>`
      : '';

    panel.innerHTML = `
      <h2>Your Pool (${pool.all.length} cards)</h2>
      <div style="font-size:0.78rem;line-height:1.6;">
        ${section('Party', pool.characters) || '<div style="color:#775544;font-size:0.75rem;">⚠️ No characters yet — a party of zero gets Pip the Tavern Volunteer</div>'}
        ${section('Equipment', pool.equipment)}
        ${section('Grimoire', pool.spells)}
        ${section('Personalities', pool.personalities)}
      </div>
    `;
    container.appendChild(panel);
  }

  renderDraftComplete(container) {
    const pool = this.draft.getPlayerPool();

    const title = document.createElement('div');
    title.style.cssText = 'text-align:center;margin-bottom:1.25rem;';
    title.innerHTML = `
      <div style="color:#d8a53f;font-size:1.2rem;font-weight:bold;">The Draft Is Done</div>
      <div style="color:#887755;font-size:0.85rem;">Party of ${Math.max(1, pool.characters.length)} · ${pool.equipment.length} equipment · ${pool.spells.length} spells · ${pool.personalities.length} personalities</div>
    `;
    container.appendChild(title);

    // Final pool, full cards
    const grid = document.createElement('div');
    grid.className = 'pack-grid';
    for (const card of pool.all) {
      const el = this.renderCard(card, () => {});
      el.style.cursor = 'default';
      grid.appendChild(el);
    }
    container.appendChild(grid);

    // Rival pools summary
    const rivals = document.createElement('div');
    rivals.className = 'panel';
    rivals.style.cssText = 'margin-top:1rem;';
    rivals.innerHTML = `<h2>The Rest of the Table</h2>` + this.draft.getTableSummary()
      .filter(s => s.isAI)
      .map(s => `<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${s.icon} ${s.name}: party of ${s.counts.characters}, ${s.counts.equipment} equipment, ${s.counts.spells} spells</div>`)
      .join('');
    container.appendChild(rivals);

    // Difficulty + seed + go
    const setup = document.createElement('div');
    setup.className = 'panel';
    setup.style.cssText = 'margin-top:1rem;';
    const conditionOptions = Object.values(DUNGEON_CONDITIONS)
      .map(c => `<option value="${c.id}"${c.id === 'none' ? ' selected' : ''}>${c.icon} ${c.name}${c.scoreBonus ? ` (+${Math.round(c.scoreBonus * 100)}% score)` : ''}</option>`)
      .join('');

    setup.innerHTML = `
      <h2>The Delve</h2>
      <div style="display:flex;gap:0.75rem;align-items:center;flex-wrap:wrap;font-size:0.85rem;">
        <label>Difficulty
          <select id="difficulty-select" style="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
            <option value="easy">Easy</option>
            <option value="medium" selected>Medium</option>
            <option value="hard">Hard</option>
            <option value="nightmare">Nightmare</option>
          </select>
        </label>
        <label style="flex:1;">Seed
          <input id="seed-input" type="text" placeholder="blank = random dungeon" style="width:100%;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;" />
        </label>
      </div>
      <div style="margin-top:0.7rem;font-size:0.85rem;">
        <label style="display:block;">Dungeon Condition — a wager for a bigger score
          <select id="condition-select" style="width:100%;margin-top:0.3rem;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
            ${conditionOptions}
          </select>
        </label>
        <div id="condition-hint" style="margin-top:0.35rem;font-size:0.75rem;color:#887755;font-style:italic;line-height:1.4;"></div>
      </div>
      <div style="margin-top:0.9rem;font-size:0.85rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;">
        <div style="color:#e8724a;margin-bottom:0.35rem;">🩸 Lay a Hex — curse a rival's run</div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
          <label style="flex:1;min-width:140px;">Rival
            <select id="hex-target-select" style="width:100%;margin-top:0.3rem;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
              ${this.draft.seats.filter(s => s.isAI).map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('')}
            </select>
          </label>
          <label style="flex:1;min-width:140px;">Hex
            <select id="hex-condition-select" style="width:100%;margin-top:0.3rem;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
              <option value="none" selected>No hex — stay civil</option>
              ${Object.values(DUNGEON_CONDITIONS).filter(c => c.id !== 'none').map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('')}
            </select>
          </label>
        </div>
        <div style="margin-top:0.35rem;font-size:0.72rem;color:#887755;font-style:italic;">Fair warning: the table hexes back. One rival will curse your run — but its score premium is yours to keep.</div>
      </div>
    `;
    container.appendChild(setup);

    // Live flavor for the chosen wager
    const condSelect = setup.querySelector('#condition-select');
    const condHint = setup.querySelector('#condition-hint');
    const updateHint = () => { condHint.textContent = DUNGEON_CONDITIONS[condSelect.value]?.text || ''; };
    condSelect.addEventListener('change', updateHint);
    updateHint();

    const goBtn = document.createElement('button');
    goBtn.textContent = '🏰 Enter the Dungeon';
    goBtn.style.cssText = 'width:100%;margin-top:1rem;padding:1rem;font-size:1rem;';
    goBtn.addEventListener('click', () => {
      const difficulty = document.getElementById('difficulty-select').value;
      const seed = document.getElementById('seed-input').value.trim() || `delve-${Date.now().toString(36)}`;
      const condition = document.getElementById('condition-select').value;
      const hexTarget = document.getElementById('hex-target-select').value;
      const hexCondition = document.getElementById('hex-condition-select').value;
      this.onComplete({ pool: pool.all, difficulty, seed, condition, hexTarget, hexCondition });
    });
    container.appendChild(goBtn);
  }
}
