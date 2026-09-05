/**
 * DraftUI — the draft table
 *
 * Shows the current pack as a card grid; one click = one pick.
 * The AI seats pick simultaneously and their last picks are shown
 * (signal reading). The growing pool is summarized below. When the
 * packs run dry: Enter the Dungeon.
 */

import { CARD_TYPES } from '../game/Cards.js';
import { CAPABILITIES } from '../game/Capabilities.js';

/**
 * What a card lets the party ATTEMPT, printed on the card at draft
 * time. A capability is the thing a situation will ask for by name, so
 * a drafter has to be able to read it before they commit the pick.
 */
export function capabilityChips(card) {
  const caps = card.capabilities || [];
  if (caps.length === 0) return '';
  const chips = caps.map(id => {
    const cap = CAPABILITIES[id];
    if (!cap) return '';
    return `<span style="color:#9fc4a8;border:1px solid #3a4a3e;border-radius:3px;padding:0 0.3rem;" title="${cap.text}">${cap.icon} ${cap.name}</span>`;
  }).join('');
  return `<div class="card-caps" style="margin-top:0.3rem;font-size:0.68rem;display:flex;gap:0.3rem;flex-wrap:wrap;">${chips}</div>`;
}

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

    // The packs have run dry: the Muster screen takes it from here
    // (ui/MusterUI.js). No "draft complete" page — the pool is shown
    // there, mustered, with March in the action bar.
    if (this.draft.finished) {
      if (!this.completed) {
        this.completed = true;
        this.onComplete({ pool: this.draft.getPlayerPool().all });
      }
      return;
    }

    const round = this.draft.round + 1;
    const pick = this.draft.pickInRound + 1;
    const dir = this.draft.passDirection() === 1 ? '→ passing left' : '← passing right';

    const status = document.getElementById('bar-draft-status');
    if (status) status.textContent = `Pack ${round} of ${this.draft.numRounds} · Pick ${pick} · ${dir}`;

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

    const ELEMENT_CHIPS = {
      fire: '<span style="color:#ff8a3c;">🔥 fire</span>',
      frost: '<span style="color:#7ec8ff;">❄️ frost</span>',
      shock: '<span style="color:#ffe95e;">⚡ shock</span>',
      holy: '<span style="color:#ffe9a0;">🌟 holy</span>',
    };

    let stats = '';
    if (card.type === CARD_TYPES.CHARACTER) {
      stats = `<div class="card-stats">❤️${card.stats.health} ⚔️${card.stats.attack} 🛡️${card.stats.defense} 🧠${card.stats.mind}</div>`;
    } else if (card.type === CARD_TYPES.EQUIPMENT) {
      const bits = Object.entries(card.bonus).map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${k}`).join(', ');
      const keyed = card.classActions
        ? ` · <span style="color:#d8a53f;" title="${Object.entries(card.classActions).map(([c, a]) => `${c}: ${a.name}`).join(' · ')}">✦ different in every hand</span>`
        : '';
      stats = `<div class="card-stats">${bits}${card.bestFor ? ` · best: ${card.bestFor}` : ''}${keyed}</div>`;
    } else if (card.type === CARD_TYPES.SPELL) {
      const chip = ELEMENT_CHIPS[card.element] ? ` · ${ELEMENT_CHIPS[card.element]}` : '';
      stats = `<div class="card-stats">power ${card.power} · ${card.use}${chip}</div>`;
    }

    const cursedTag = card.cursed ? ' <span style="color:#e05555;">· CURSED</span>' : '';
    el.innerHTML = `
      <div class="card-type type-${card.type}">${card.type}${card.class ? ' · ' + card.class : ''}${cursedTag}</div>
      <div class="card-name">${card.icon} ${card.name}</div>
      <div class="card-text">${card.trait || card.text || ''}</div>
      ${stats}
      ${capabilityChips(card)}
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


}
