/**
 * CardEditorUI — the player's card workshop
 *
 * Create cards under the stat budgets, collect them in "My Cards"
 * (a content pack like any other), toggle packs in and out of the
 * draft, and export/import packs as JSON.
 */

import {
  registerPack, setPackEnabled, listPacks, validateCard, validatePack, BUDGETS,
} from '../game/CardPacks.js';
import { CLASSES, PERSONALITY_CARDS } from '../game/Cards.js';

const CUSTOM_KEY = 'dungeonab_custom_cards';
const IMPORT_KEY = 'dungeonab_imported_packs';
const PREFS_KEY = 'dungeonab_pack_prefs';

const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* full */ } },
};

function customPack(cards) {
  return { id: 'my-cards', name: 'My Cards', description: 'Cards from the workshop.', cards };
}

/** Register saved custom cards + imported packs, honoring saved toggles. Call at boot. */
export function loadPlayerPacks() {
  const prefs = store.get(PREFS_KEY, {});
  const custom = store.get(CUSTOM_KEY, []);
  if (custom.length) registerPack(customPack(custom), { enabled: prefs['my-cards'] !== false });
  for (const pack of store.get(IMPORT_KEY, [])) {
    try { registerPack(pack, { enabled: prefs[pack.id] !== false }); } catch (e) { /* stale import */ }
  }
  return prefs;
}

export function setupCardEditor() {
  const overlay = document.getElementById('cards-overlay');
  const body = document.getElementById('cards-body');
  document.getElementById('cards-btn').addEventListener('click', () => { render(); overlay.classList.add('active'); });
  document.getElementById('cards-close-btn').addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });

  const inputCss = 'background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.35rem;border-radius:4px;font-family:inherit;font-size:0.8rem;';
  const esc = t => { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; };

  function saveCustom(cards) {
    store.set(CUSTOM_KEY, cards);
    if (cards.length) registerPack(customPack(cards));   // re-register replaces
  }

  function render() {
    const custom = store.get(CUSTOM_KEY, []);
    const prefs = store.get(PREFS_KEY, {});

    body.innerHTML = `
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;">Forge a card</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;font-size:0.8rem;">
        <select id="ce-type" style="${inputCss}">
          <option value="character">Character</option>
          <option value="equipment">Equipment</option>
          <option value="spell">Spell</option>
          <option value="personality">Personality</option>
        </select>
        <input id="ce-name" placeholder="Name" style="${inputCss}" />
        <input id="ce-icon" placeholder="Icon (emoji)" style="${inputCss}" />
        <input id="ce-text" placeholder="Flavor text" style="${inputCss}" />
      </div>
      <div id="ce-fields" style="margin-top:0.4rem;"></div>
      <div id="ce-problems" style="color:#e08080;font-size:0.72rem;margin-top:0.3rem;"></div>
      <button id="ce-create" style="width:100%;margin-top:0.5rem;padding:0.55rem;">➕ Add to My Cards</button>

      <div style="color:#d8a53f;font-size:0.85rem;margin:0.9rem 0 0.3rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;">
        My Cards (${custom.length})</div>
      <div id="ce-list" style="max-height:130px;overflow-y:auto;font-size:0.76rem;"></div>

      <div style="color:#d8a53f;font-size:0.85rem;margin:0.9rem 0 0.3rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;">
        Content packs in the draft</div>
      <div id="ce-packs" style="font-size:0.78rem;"></div>

      <div style="display:flex;gap:0.4rem;margin-top:0.8rem;">
        <button id="ce-export" style="flex:1;font-size:0.75rem;padding:0.4rem;background:#2a2213;color:#d8a53f;">⬇ Export My Cards</button>
        <button id="ce-import" style="flex:1;font-size:0.75rem;padding:0.4rem;background:#2a2213;color:#d8a53f;">⬆ Import Pack JSON</button>
      </div>
      <textarea id="ce-io" placeholder="Pack JSON appears/goes here" rows="3"
        style="width:100%;margin-top:0.4rem;${inputCss}"></textarea>
    `;

    const fields = document.getElementById('ce-fields');
    const typeSel = document.getElementById('ce-type');
    const renderFields = () => {
      const t = typeSel.value;
      if (t === 'character') {
        fields.innerHTML = `
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0.3rem;font-size:0.75rem;">
            <select id="ce-class" style="${inputCss}">${Object.values(CLASSES).map(c => `<option>${c}</option>`).join('')}</select>
            <input id="ce-hp" type="number" value="14" title="health" style="${inputCss}" />
            <input id="ce-atk" type="number" value="4" title="attack" style="${inputCss}" />
            <input id="ce-def" type="number" value="3" title="defense" style="${inputCss}" />
            <input id="ce-mind" type="number" value="3" title="mind" style="${inputCss}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">class · health · attack · defense · mind — budget: health + 2×atk + 2×def + mind ≤ ${BUDGETS.character.statTotal}</div>`;
      } else if (t === 'equipment') {
        fields.innerHTML = `
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.3rem;font-size:0.75rem;">
            <input id="ce-eatk" type="number" value="0" title="+attack" style="${inputCss}" />
            <input id="ce-edef" type="number" value="0" title="+defense" style="${inputCss}" />
            <input id="ce-emind" type="number" value="2" title="+mind" style="${inputCss}" />
            <select id="ce-best" style="${inputCss}"><option value="">any class</option>${Object.values(CLASSES).map(c => `<option>${c}</option>`).join('')}</select>
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">+attack · +defense · +mind · best-fit — net bonus ≤ ${BUDGETS.equipment.bonusTotal}</div>`;
      } else if (t === 'spell') {
        fields.innerHTML = `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem;font-size:0.75rem;">
            <select id="ce-use" style="${inputCss}"><option>combat</option><option>heal</option><option>utility</option></select>
            <input id="ce-power" type="number" value="4" title="power" style="${inputCss}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">use · power (1–${BUDGETS.spell.maxPower})</div>`;
      } else {
        fields.innerHTML = `
          <select id="ce-arch" style="${inputCss};width:100%;">${PERSONALITY_CARDS.map(c => `<option value="${c.archetype}">${c.archetype} (like ${c.name})</option>`).join('')}</select>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">your name and flavor, a proven archetype's behavior</div>`;
      }
    };
    typeSel.addEventListener('change', renderFields);
    renderFields();

    document.getElementById('ce-create').addEventListener('click', () => {
      const t = typeSel.value;
      const card = {
        id: `my-${Date.now().toString(36)}`,
        type: t,
        name: document.getElementById('ce-name').value.trim(),
        icon: document.getElementById('ce-icon').value.trim() || '🎴',
        text: document.getElementById('ce-text').value.trim() || undefined,
      };
      if (t === 'character') {
        card.class = document.getElementById('ce-class').value;
        card.stats = {
          health: +document.getElementById('ce-hp').value,
          attack: +document.getElementById('ce-atk').value,
          defense: +document.getElementById('ce-def').value,
          mind: +document.getElementById('ce-mind').value,
        };
        card.trait = card.text;
      } else if (t === 'equipment') {
        card.bonus = {};
        const a = +document.getElementById('ce-eatk').value;
        const d = +document.getElementById('ce-edef').value;
        const m = +document.getElementById('ce-emind').value;
        if (a) card.bonus.attack = a;
        if (d) card.bonus.defense = d;
        if (m) card.bonus.mind = m;
        card.slot = 'tool';
        card.bestFor = document.getElementById('ce-best').value || null;
      } else if (t === 'spell') {
        card.use = document.getElementById('ce-use').value;
        card.power = +document.getElementById('ce-power').value;
        card.school = 'homebrew';
      } else {
        card.archetype = document.getElementById('ce-arch').value;
      }

      const problems = validateCard(card);
      if (problems.length) {
        document.getElementById('ce-problems').textContent = problems.join(' · ');
        return;
      }
      const cards = store.get(CUSTOM_KEY, []);
      cards.push(card);
      saveCustom(cards);
      render();
    });

    // My Cards list
    const list = document.getElementById('ce-list');
    list.innerHTML = custom.length ? '' : '<div class="records-empty">The forge is cold. Make something.</div>';
    custom.forEach((card, i) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:0.4rem;align-items:baseline;padding:0.15rem 0;border-bottom:1px dashed #2a2318;';
      row.innerHTML = `<span>${esc(card.icon)} ${esc(card.name)}</span>
        <span style="color:#665;">${card.type}${card.class ? ' · ' + card.class : ''}</span>
        <button data-i="${i}" style="margin-left:auto;font-size:0.68rem;padding:0.15rem 0.4rem;background:#2a1515;color:#e08080;">✕</button>`;
      row.querySelector('button').addEventListener('click', () => {
        const cards = store.get(CUSTOM_KEY, []);
        cards.splice(i, 1);
        saveCustom(cards);
        render();
      });
      list.appendChild(row);
    });

    // Pack toggles
    const packsDiv = document.getElementById('ce-packs');
    for (const p of listPacks()) {
      const row = document.createElement('label');
      row.style.cssText = 'display:flex;gap:0.4rem;align-items:center;color:#b8a888;padding:0.12rem 0;';
      row.innerHTML = `<input type="checkbox" ${p.enabled ? 'checked' : ''} />
        <span>${esc(p.name)} <span style="color:#665;">(${p.cards} cards)</span></span>`;
      row.querySelector('input').addEventListener('change', e => {
        setPackEnabled(p.id, e.target.checked);
        const prefs = store.get(PREFS_KEY, {});
        prefs[p.id] = e.target.checked;
        store.set(PREFS_KEY, prefs);
      });
      packsDiv.appendChild(row);
    }

    // Export / import
    const io = document.getElementById('ce-io');
    document.getElementById('ce-export').addEventListener('click', () => {
      io.value = JSON.stringify(customPack(store.get(CUSTOM_KEY, [])), null, 1);
    });
    document.getElementById('ce-import').addEventListener('click', () => {
      try {
        const pack = JSON.parse(io.value);
        const problems = validatePack(pack);
        if (problems.length) throw new Error(problems.join('; '));
        registerPack(pack);
        const imports = store.get(IMPORT_KEY, []).filter(p => p.id !== pack.id);
        imports.push(pack);
        store.set(IMPORT_KEY, imports);
        io.value = `✓ "${pack.name}" imported (${pack.cards.length} cards)`;
        render();
      } catch (e) {
        io.value = `✗ ${e.message}`;
      }
    });
  }
}
