/**
 * ArchiveUI — the Hall of Designs
 *
 * Lists every archived dungeon with a minimap, offers Delve / Edit /
 * Delete. The editor (mixed-initiative, per PCG ch.11) lets the
 * player retype rooms, toggle a branch's secrecy, rename, and save a
 * customized copy — which is delve-able like any layout.
 */

import { archive } from '../game/Archive.js';
import { defaultPayloadFor, DUNGEON_THEMES, ROOM_TYPES } from '../world/DungeonGen.js';

const TYPE_COLORS = {
  entrance: '#8fb8dd', corridor: '#555', monster: '#c84c3c', trap: '#e8724a',
  treasure: '#d8a53f', library: '#b07ae8', shrine: '#e8d48a', lab: '#3cb8a8',
  materials: '#4a8a5c', disaster: '#e05555', boss: '#ff4444', vault: '#ffd75e',
};

const PAYLOAD_KEYS = ['monster', 'gold', 'mimicChance', 'trapDamage', 'materials'];

/** Retype a room in a layout, swapping in a sane default payload. */
export function retypeRoom(layout, roomIndex, newType) {
  const room = layout.rooms.find(r => r.index === roomIndex);
  if (!room || room.type === ROOM_TYPES.ENTRANCE || room.type === ROOM_TYPES.BOSS) return false;
  if (newType === ROOM_TYPES.ENTRANCE || newType === ROOM_TYPES.BOSS) return false;
  for (const k of PAYLOAD_KEYS) delete room[k];
  room.type = newType;
  Object.assign(room, defaultPayloadFor(newType, DUNGEON_THEMES[layout.themeId] || DUNGEON_THEMES.delve));
  return true;
}

/** Toggle a whole branch's secrecy (rooms, branch record, door edge). */
export function setBranchSecret(layout, branchIdx, secret) {
  const branch = layout.branches[branchIdx];
  if (!branch) return false;
  branch.secret = secret;
  for (const idx of branch.rooms) {
    const room = layout.rooms.find(r => r.index === idx);
    if (room) room.secret = secret;
  }
  const door = layout.edges.find(e => e.b === branch.rooms[0]);
  if (door) door.secret = secret;
  return true;
}

export function drawMinimap(canvas, layout) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#0d0b08';
  ctx.fillRect(0, 0, W, H);

  const xs = layout.rooms.map(r => r.x);
  const ys = layout.rooms.map(r => r.y);
  const pad = 12;
  const sx = (W - pad * 2) / Math.max(1, Math.max(...xs) - Math.min(...xs));
  const sy = (H - pad * 2) / Math.max(1, Math.max(...ys) - Math.min(...ys));
  const s = Math.min(sx, sy, 26);
  const px = r => pad + (r.x - Math.min(...xs)) * s;
  const py = r => pad + (r.y - Math.min(...ys)) * s;
  const byIdx = new Map(layout.rooms.map(r => [r.index, r]));

  for (const e of layout.edges) {
    const a = byIdx.get(e.a);
    const b = byIdx.get(e.b);
    if (!a || !b) continue;
    ctx.beginPath();
    ctx.setLineDash(e.secret ? [3, 3] : e.locked ? [5, 2] : []);
    ctx.strokeStyle = e.secret ? '#d8a53f' : e.locked ? '#b89a3e' : '#4a443a';
    ctx.lineWidth = 1.5;
    ctx.moveTo(px(a), py(a));
    ctx.lineTo(px(b), py(b));
    ctx.stroke();
  }
  ctx.setLineDash([]);

  for (const r of layout.rooms) {
    const size = r.type === 'boss' ? 9 : 6;
    ctx.fillStyle = TYPE_COLORS[r.type] || '#777';
    ctx.fillRect(px(r) - size / 2, py(r) - size / 2, size, size);
    if (r.secret) {
      ctx.strokeStyle = '#ffd75e';
      ctx.strokeRect(px(r) - size / 2 - 1.5, py(r) - size / 2 - 1.5, size + 3, size + 3);
    }
  }
}

export function setupArchive({ onDelve }) {
  const overlay = document.getElementById('archive-overlay');
  const body = document.getElementById('archive-body');
  const openBtn = document.getElementById('archive-btn');
  const closeBtn = document.getElementById('archive-close-btn');

  const esc = t => { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; };

  const renderList = () => {
    const entries = archive.list();
    body.innerHTML = entries.length ? '' :
      '<div class="records-empty">No dungeons archived yet. Finish a delve and its design is kept here.</div>';

    for (const entry of entries) {
      const item = document.createElement('div');
      item.className = 'arch-item';
      const oc = entry.outcome || {};
      item.innerHTML = `
        <canvas width="150" height="96"></canvas>
        <div style="flex:1;min-width:0;">
          <div style="color:#d8a53f;font-weight:bold;">${entry.custom ? '✏️ ' : ''}${esc(entry.name || 'Unnamed delve')}</div>
          <div style="color:#887755;font-size:0.72rem;">
            ${oc.victory === true ? '🏆' : oc.victory === false ? '☠️' : '📐'}
            ${entry.layout.rooms.length} rooms · ${entry.layout.branches.filter(b => b.secret).length} secret · ${entry.layout.branches.filter(b => b.locked).length} locked ·
            ${new Date(entry.date).toLocaleDateString()}
          </div>
          <div style="display:flex;gap:0.35rem;margin-top:0.4rem;flex-wrap:wrap;">
            <button data-act="delve" style="font-size:0.72rem;padding:0.3rem 0.6rem;">⚔️ Delve</button>
            <button data-act="edit" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a2213;color:#d8a53f;">✏️ Edit</button>
            <button data-act="del" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a1515;color:#e08080;">🗑️</button>
          </div>
        </div>
      `;
      drawMinimap(item.querySelector('canvas'), entry.layout);
      item.querySelector('[data-act="delve"]').addEventListener('click', () => {
        overlay.classList.remove('active');
        onDelve(entry);
      });
      item.querySelector('[data-act="edit"]').addEventListener('click', () => renderEditor(entry));
      item.querySelector('[data-act="del"]').addEventListener('click', () => { archive.remove(entry.id); renderList(); });
      body.appendChild(item);
    }
  };

  const renderEditor = (entry) => {
    // Deep copy: the editor works on a draft until saved
    const layout = JSON.parse(JSON.stringify(entry.layout));
    const editableTypes = Object.values(ROOM_TYPES).filter(t => t !== 'entrance' && t !== 'boss');

    body.innerHTML = `
      <div style="display:flex;gap:0.6rem;align-items:center;margin-bottom:0.6rem;">
        <button id="arch-back" style="font-size:0.75rem;padding:0.3rem 0.6rem;background:#2a2213;color:#d8a53f;">← Back</button>
        <input id="arch-name" value="${entry.name ? entry.name.replace(/"/g, '&quot;') : 'My design'}"
          style="flex:1;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;" />
      </div>
      <canvas id="arch-edit-map" width="330" height="170" style="width:100%;border:1px solid #3a2f1e;border-radius:4px;"></canvas>
      <div id="arch-rooms" style="max-height:220px;overflow-y:auto;margin-top:0.6rem;font-size:0.78rem;"></div>
      <div id="arch-branches" style="margin-top:0.5rem;font-size:0.78rem;"></div>
      <button id="arch-save" style="width:100%;margin-top:0.8rem;padding:0.7rem;">💾 Save as My Design</button>
      <button id="arch-delve-now" style="width:100%;margin-top:0.4rem;padding:0.7rem;background:#1a2617;color:#a8d5b0;">⚔️ Delve This Design</button>
    `;

    const map = document.getElementById('arch-edit-map');
    const redraw = () => drawMinimap(map, layout);

    const roomsDiv = document.getElementById('arch-rooms');
    for (const room of layout.rooms) {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:0.5rem;align-items:center;padding:0.15rem 0;border-bottom:1px dashed #2a2318;';
      const locked = room.type === 'entrance' || room.type === 'boss';
      row.innerHTML = `
        <span style="width:1.6rem;color:#665;">#${room.index}</span>
        <span style="width:0.9rem;">${room.secret ? '🕳️' : ''}</span>
        ${locked
          ? `<span style="color:#887755;">${room.type} (fixed)</span>`
          : `<select data-idx="${room.index}" style="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:3px;font-family:inherit;font-size:0.75rem;">
              ${editableTypes.map(t => `<option value="${t}"${t === room.type ? ' selected' : ''}>${t}</option>`).join('')}
            </select>`}
      `;
      row.querySelector('select')?.addEventListener('change', e => {
        retypeRoom(layout, room.index, e.target.value);
        redraw();
      });
      roomsDiv.appendChild(row);
    }

    const branchesDiv = document.getElementById('arch-branches');
    layout.branches.forEach((branch, bi) => {
      const row = document.createElement('label');
      row.style.cssText = 'display:flex;gap:0.4rem;align-items:center;color:#b8a888;';
      row.innerHTML = `<input type="checkbox" ${branch.secret ? 'checked' : ''} />
        Branch off room #${branch.junction} (${branch.rooms.length} room${branch.rooms.length > 1 ? 's' : ''}) is secret`;
      row.querySelector('input').addEventListener('change', e => {
        setBranchSecret(layout, bi, e.target.checked);
        redraw();
      });
      branchesDiv.appendChild(row);
    });

    document.getElementById('arch-back').addEventListener('click', renderList);
    document.getElementById('arch-save').addEventListener('click', () => {
      const name = document.getElementById('arch-name').value.trim() || 'My design';
      archive.save({ name, layout, custom: true, seed: entry.seed, outcome: {} });
      renderList();
    });
    document.getElementById('arch-delve-now').addEventListener('click', () => {
      const name = document.getElementById('arch-name').value.trim() || 'My design';
      overlay.classList.remove('active');
      onDelve({ name, layout });
    });

    redraw();
  };

  openBtn.addEventListener('click', () => { renderList(); overlay.classList.add('active'); });
  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
}
