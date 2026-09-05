/**
 * MusterUI — the party, mustered, on one screen
 *
 * What used to be two pages — "The Draft Is Done" (every card in the
 * pool, full size, then the rivals, then difficulty, seed and Enter the
 * Dungeon) followed by the muster overlay (one tall card per adventurer,
 * then March) — is one screen. The four who march stand in a row with
 * their kit and their workings; the rest of the pool is a few lines;
 * the kit editor and the rivals' pools fold away under disclosures.
 * Difficulty, seed and March live in the action bar, so nothing here
 * has to be scrolled past to start the delve (SCREENS.md S1).
 *
 * Kit is dealt by best fit when it is drafted, so the default muster is
 * already a decision made well; the editor (ui/OutfitUI.js) is a step
 * back for a player who wants to overrule it, not a step through.
 */

import { renderOutfitting } from './OutfitUI.js';
import { CAPABILITIES } from '../game/Capabilities.js';

const SLOTS = ['weapon', 'armor', 'focus', 'tool', 'boots', 'trinket'];

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function capChips(member) {
  const caps = member.capabilities || [];
  if (!caps.length) return '';
  return `<div class="mm-caps">${caps.map(id => {
    const cap = CAPABILITIES[id];
    return cap ? `<span title="${esc(cap.text)}">${cap.icon} ${esc(cap.name)}</span>` : '';
  }).join('')}</div>`;
}

function memberCard(party, m) {
  const worn = new Map(m.equipment.map(e => [e.slot || 'trinket', e]));
  const kit = SLOTS.filter(s => worn.has(s)).map(s => {
    const p = worn.get(s);
    return `<div><span class="slot">${s}</span> ${esc(p.icon || '')} ${esc(p.name)}</div>`;
  }).join('');
  const workings = party.grimoire.filter(sp => {
    const c = party.casterOf(sp);
    return c && c.uid === m.uid;
  }).map(sp => `<div><span class="slot">working</span> ${esc(sp.icon || '')} ${esc(sp.name)}</div>`).join('');
  return `
    <div class="muster-member">
      <div class="mm-head">
        <span class="mm-icon">${esc(m.icon)}</span>
        <span class="mm-name">${esc(m.name)}</span>
        <span class="mm-class">${esc(m.class)}</span>
      </div>
      <div class="mm-stats">❤️${m.health}/${m.effectiveMax()} ⚔️${m.attack} 🛡️${m.defense} 🧠${m.mind}</div>
      ${capChips(m)}
      <div class="mm-kit">${kit || workings ? kit + workings : '<span class="slot">bare hands, and whatever the dungeon offers</span>'}</div>
    </div>`;
}

/**
 * Draw the muster into `container`.
 *
 *   party  — the drafted Party (kit already dealt)
 *   draft  — the PackDraft, for the rivals' pools; optional
 *   kitOpen — whether the kit editor starts open
 */
export function renderMuster(container, party, { draft = null, kitOpen = false } = {}) {
  container.innerHTML = '';

  const title = document.createElement('div');
  title.className = 'muster-title';
  const n = party.members.length;
  title.innerHTML = `
    <h2>The Party Stands Mustered</h2>
    <p>${n} march${party.reserve.length ? `, ${party.reserve.length} in reserve` : ''} · ${party.grimoire.length} working${party.grimoire.length === 1 ? '' : 's'} in the grimoire · ${party.personalities.length} personalit${party.personalities.length === 1 ? 'y' : 'ies'}. Kit is dealt by best fit; overrule it below, or march.</p>`;
  container.appendChild(title);

  const row = document.createElement('div');
  row.className = 'muster-party';
  row.innerHTML = party.members.map(m => memberCard(party, m)).join('');
  container.appendChild(row);

  // The rest of the pool, in lines rather than cards
  const pool = document.createElement('div');
  pool.className = 'muster-pool';
  const line = (k, items) => items.length
    ? `<div class="pool-row"><span class="k">${k}:</span> ${items.join(' · ')}</div>` : '';
  const unassigned = party.grimoire.filter(sp => !party.casterOf(sp));
  pool.innerHTML = `<div class="panel">
    <h2>The rest of the pool</h2>
    ${line('In reserve', party.reserve.map(m => `${esc(m.icon)} ${esc(m.name)} <span class="k">(${esc(m.class)})</span>`))}
    ${line('In the pack', party.pack.map(p => `${esc(p.icon || '')} ${esc(p.name)}`))}
    ${line('Workings, whoever is sharpest', unassigned.map(sp => `${esc(sp.icon || '')} ${esc(sp.name)}`))}
    ${line('Personalities', party.personalities.map(p => esc(typeof p === 'string' ? p : p.name || p.id || '')))}
    ${party.reserve.length + party.pack.length + unassigned.length + party.personalities.length === 0
      ? '<div class="pool-row"><span class="k">Nothing left over: everything drafted is on somebody.</span></div>' : ''}
  </div>`;
  container.appendChild(pool);

  // The kit editor, folded. Opening it is the step back.
  const kit = document.createElement('details');
  kit.className = 'muster-fold';
  kit.id = 'muster-kit';
  kit.open = kitOpen;
  kit.innerHTML = `<summary>🎒 Change kit, casters and names</summary><div class="fold-body" id="muster-kit-body"></div>`;
  container.appendChild(kit);
  const body = kit.querySelector('#muster-kit-body');
  const drawKit = () => renderOutfitting(body, party, {
    onChange: () => { row.innerHTML = party.members.map(m => memberCard(party, m)).join(''); },
  });
  if (kitOpen) drawKit();
  else kit.addEventListener('toggle', () => { if (kit.open && !body.children.length) drawKit(); }, { once: false });

  // The rivals' pools, folded: the comparison that matters is scores,
  // and that is on the Reckoning
  if (draft?.getTableSummary) {
    const rivals = document.createElement('details');
    rivals.className = 'muster-fold';
    rivals.innerHTML = `<summary>🎲 The rest of the table</summary><div class="fold-body">${draft.getTableSummary()
      .filter(s => s.isAI)
      .map(s => `<div class="rival-row">${s.icon} ${esc(s.name)}: party of ${s.counts.characters}, ${s.counts.equipment} equipment, ${s.counts.spells} spells</div>`)
      .join('')}</div>`;
    container.appendChild(rivals);
  }
}

/** Open the kit editor on the current muster, if there is one. */
export function openKit() {
  const kit = document.getElementById('muster-kit');
  if (!kit) return;
  kit.open = true;
  kit.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
