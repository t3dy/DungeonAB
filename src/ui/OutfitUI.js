/**
 * OutfitUI — the muster before the march
 *
 * The draft decides what the party owns; this decides who carries it.
 * Kit is dealt out by best fit when it is drafted, which is a sensible
 * default and not a decision — the decision is putting the Tower Shield
 * on whoever is holding the door, and handing Fireball to the sharpest
 * mind rather than whoever happened to pick it up.
 *
 * Three things happen here, all of them mechanical:
 *
 *   - **Kit moves.** One piece per slot; a displaced piece goes back to
 *     whoever gave this one up, or waits in the pack (Party.equipTo).
 *   - **Somebody prepares each working.** The named caster's mind sets
 *     its power, so the assignment is worth real damage (Party.mindFor).
 *   - **The player names their own.** A rename and a written history,
 *     both carried through saves and read back in the saga.
 *
 * Drilled tactics are deliberately *not* assignable: they are what the
 * party trained together, and pretending otherwise would be a UI that
 * lies about the mechanic.
 */


const SLOTS = ['weapon', 'armor', 'focus', 'tool', 'boots', 'trinket'];

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

const panel = 'background:#14110b;border:1px solid #3a2f1e;border-radius:6px;padding:0.8rem;';
const label = 'color:#887755;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.04em;';

/**
 * Draw the outfitting screen into `container`.
 *
 * `onChange` is called after every change so the caller can re-render
 * the roster panel beside it; `onDone` closes the screen.
 */
export function renderOutfitting(container, party, { onChange = () => {}, onDone = null, doneLabel = 'Done' } = {}) {
  const redraw = () => {
    onChange();
    renderOutfitting(container, party, { onChange, onDone, doneLabel });
  };

  container.innerHTML = '';

  const head = document.createElement('div');
  head.innerHTML = `
    <h2 style="color:#d8a53f;font-size:1.3rem;margin-bottom:0.3rem;text-align:center;">🎒 The Muster</h2>
    <div style="text-align:center;color:#887755;margin-bottom:0.9rem;font-size:0.85rem;">
      Who carries what, who prepares which working, and who they are.
    </div>`;
  container.appendChild(head);

  /* ---- One card per adventurer -------------------------------------- */
  const members = [...party.members];
  for (const member of members) {
    const card = document.createElement('div');
    card.className = 'outfit-member';
    card.style.cssText = `${panel}margin-bottom:0.7rem;`;

    const worn = new Map(member.equipment.map(e => [e.slot || 'trinket', e]));
    const slotRows = SLOTS.map(slot => {
      const piece = worn.get(slot);
      return `
        <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;padding:0.15rem 0;">
          <span style="${label}width:3.6rem;flex:none;">${slot}</span>
          <span style="flex:1;color:${piece ? '#e8d9b3' : '#4a443a'};">
            ${piece ? `${esc(piece.icon || '')} ${esc(piece.name)}` : '—'}
          </span>
          ${piece
            ? `<button class="outfit-off" data-card="${esc(piece.id)}"
                 style="font-size:0.68rem;padding:0.15rem 0.4rem;background:#26200f;color:#c8b88a;">take off</button>`
            : ''}
        </div>`;
    }).join('');

    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
        <span style="font-size:1.2rem;">${esc(member.icon)}</span>
        <input class="outfit-name" data-uid="${esc(member.uid)}" value="${esc(member.name)}"
          maxlength="40" aria-label="Name"
          style="flex:1;background:#0f0d09;color:#e8d9b3;border:1px solid #3a2f1e;border-radius:4px;padding:0.3rem 0.45rem;font-family:inherit;font-size:0.92rem;" />
        <span style="color:#887755;font-size:0.78rem;">${esc(member.class)}</span>
        <span style="color:#887755;font-size:0.75rem;">❤️${member.health}/${member.effectiveMax()} ⚔️${member.attack} 🛡️${member.defense} 🧠${member.mind}</span>
      </div>
      <div style="display:flex;gap:0.9rem;flex-wrap:wrap;">
        <div style="flex:1;min-width:190px;">${slotRows}</div>
        <div style="flex:1;min-width:190px;">
          <div style="${label}margin-bottom:0.25rem;">Who they are</div>
          <textarea class="outfit-story" data-uid="${esc(member.uid)}" rows="3" maxlength="400"
            placeholder="${esc(member.trait || 'Write their history, or leave it to the dungeon.')}"
            style="width:100%;background:#0f0d09;color:#c8b88a;border:1px solid #3a2f1e;border-radius:4px;padding:0.35rem;font-family:inherit;font-size:0.76rem;resize:vertical;">${esc(member.backstory)}</textarea>
        </div>
      </div>`;
    container.appendChild(card);
  }

  /* ---- The pack: kit nobody is carrying ------------------------------ */
  const pack = document.createElement('div');
  pack.style.cssText = `${panel}margin-bottom:0.7rem;`;
  const memberOptions = members.map(m => `<option value="${esc(m.name)}">${esc(m.icon)} ${esc(m.name)}</option>`).join('');
  pack.innerHTML = `
    <div style="${label}margin-bottom:0.4rem;">🎒 In the pack — nobody is carrying these</div>
    ${party.pack.length === 0
      ? '<div style="color:#4a443a;font-size:0.8rem;">Nothing. Every piece is in somebody\'s hands.</div>'
      : party.pack.map(piece => `
        <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.8rem;padding:0.2rem 0;">
          <span style="flex:1;color:#e8d9b3;">${esc(piece.icon || '')} ${esc(piece.name)}
            <span style="color:#887755;">· ${esc(piece.slot || 'trinket')}</span></span>
          <select class="outfit-give" data-card="${esc(piece.id)}"
            style="background:#0f0d09;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:4px;font-family:inherit;font-size:0.75rem;">
            <option value="">give to…</option>${memberOptions}
          </select>
        </div>`).join('')}`;
  container.appendChild(pack);

  /* ---- The grimoire: who prepares each working ----------------------- */
  const book = document.createElement('div');
  book.style.cssText = `${panel}margin-bottom:0.7rem;`;
  book.innerHTML = `
    <div style="${label}margin-bottom:0.4rem;">📖 The grimoire — a working is only as good as the mind that prepared it</div>
    ${party.grimoire.length === 0
      ? '<div style="color:#4a443a;font-size:0.8rem;">No workings drafted.</div>'
      : party.grimoire.map(spell => {
        const caster = party.casterOf(spell);
        const power = spell.power + Math.floor(party.mindFor(spell) / 2);
        return `
          <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.8rem;padding:0.2rem 0;">
            <span style="flex:1;color:#e8d9b3;">${esc(spell.icon || '')} ${esc(spell.name)}
              <span style="color:#887755;">· power ${power}</span></span>
            <select class="outfit-caster" data-spell="${esc(spell.id)}"
              style="background:#0f0d09;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:4px;font-family:inherit;font-size:0.75rem;">
              <option value="">whoever is sharpest</option>
              ${members.map(m => `<option value="${esc(m.name)}"${caster && caster.uid === m.uid ? ' selected' : ''}>${esc(m.icon)} ${esc(m.name)} (🧠${m.mind})</option>`).join('')}
            </select>
          </div>`;
      }).join('')}`;
  container.appendChild(book);

  /* ---- Wiring -------------------------------------------------------- */
  container.querySelectorAll('.outfit-off').forEach(btn => {
    btn.addEventListener('click', () => {
      party.unequip(btn.dataset.card);
      redraw();
    });
  });
  container.querySelectorAll('.outfit-give').forEach(sel => {
    sel.addEventListener('change', () => {
      if (!sel.value) return;
      party.equipTo(sel.dataset.card, sel.value);
      redraw();
    });
  });
  container.querySelectorAll('.outfit-caster').forEach(sel => {
    sel.addEventListener('change', () => {
      party.assignCaster(sel.dataset.spell, sel.value || null);
      redraw();
    });
  });
  container.querySelectorAll('.outfit-name').forEach(input => {
    // On blur rather than on every keystroke, or the field redraws
    // under the player's cursor mid-word
    input.addEventListener('change', () => {
      const member = party.members.find(m => m.uid === input.dataset.uid);
      if (member) party.renameMember(member, input.value);
      redraw();
    });
  });
  container.querySelectorAll('.outfit-story').forEach(area => {
    area.addEventListener('change', () => {
      const member = party.members.find(m => m.uid === area.dataset.uid);
      if (member) member.setBackstory(area.value);
      onChange();
    });
  });

  if (onDone) {
    const done = document.createElement('button');
    done.id = 'outfit-done-btn';
    done.textContent = doneLabel;
    done.style.cssText = 'width:100%;margin-top:0.5rem;padding:0.9rem;font-size:1rem;';
    done.addEventListener('click', onDone);
    container.appendChild(done);
  }
}
