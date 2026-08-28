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
  stairs: '#7a7f8a',
};

const PAYLOAD_KEYS = ['monster', 'gold', 'mimicChance', 'trapDamage', 'materials'];

/** Retype a room in a layout, swapping in a sane default payload. */
export function retypeRoom(layout, roomIndex, newType) {
  const room = layout.rooms.find(r => r.index === roomIndex);
  // The entrance, the throne room and the stairs are structure, not
  // furniture: retyping a stair leaves a floor with no way down
  const FIXED = [ROOM_TYPES.ENTRANCE, ROOM_TYPES.BOSS, ROOM_TYPES.STAIRS];
  if (!room || FIXED.includes(room.type)) return false;
  if (FIXED.includes(newType)) return false;
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

  // Fit by true extent: room footprints, not just their centers
  const wOf = r => r.w || 4;
  const hOf = r => r.h || 4;
  const floorOf = r => r.floor || 0;

  // Floors sit on top of each other in the dungeon and would draw as one
  // illegible pile, so the archive lays their plans out side by side —
  // floor 1, then floor 2, then floor 3, left to right.
  const floors = [...new Set(layout.rooms.map(floorOf))].sort((a, b) => a - b);
  // Each plan is drawn from its own origin, or the lower floors trail
  // off down the canvas: floor 2's spine starts where floor 1's ended.
  const box = f => {
    const rs = layout.rooms.filter(r => floorOf(r) === f);
    return {
      x0: Math.min(...rs.map(r => r.x - wOf(r) / 2)),
      y0: Math.min(...rs.map(r => r.y - hOf(r) / 2)),
      w: Math.max(...rs.map(r => r.x + wOf(r) / 2)) - Math.min(...rs.map(r => r.x - wOf(r) / 2)),
      h: Math.max(...rs.map(r => r.y + hOf(r) / 2)) - Math.min(...rs.map(r => r.y - hOf(r) / 2)),
    };
  };
  const boxes = new Map(floors.map(f => [f, box(f)]));
  const cellW = Math.max(...floors.map(f => boxes.get(f).w));
  const cellH = Math.max(...floors.map(f => boxes.get(f).h));
  const stride = cellW + 4;
  const colOf = r => floors.indexOf(floorOf(r));
  const xOf = r => (r.x - boxes.get(floorOf(r)).x0) + colOf(r) * stride;
  const yOf = r => r.y - boxes.get(floorOf(r)).y0;

  const minX = 0;
  const maxX = floors.length * stride - 4;
  const minY = 0;
  const maxY = cellH;
  const pad = 10;
  // Room for the floor labels along the top when there is more than one
  const top = floors.length > 1 ? 14 : pad;
  const s = Math.min(
    (W - pad * 2) / Math.max(1, maxX - minX),
    (H - top - pad) / Math.max(1, maxY - minY)
  );
  const px = r => pad + (xOf(r) - minX) * s;
  const py = r => top + (yOf(r) - minY) * s;
  const byIdx = new Map(layout.rooms.map(r => [r.index, r]));

  for (const e of layout.edges) {
    const a = byIdx.get(e.a);
    const b = byIdx.get(e.b);
    if (!a || !b) continue;
    // A trapdoor is a vertical shortcut, not a corridor: dotted red.
    // A stair joins two plans, so it is drawn faintly between them.
    const isShaft = e.kind === 'trapdoor';
    const isStair = e.kind === 'stair';
    ctx.beginPath();
    ctx.setLineDash(isShaft ? [1, 3] : isStair ? [2, 2] : e.secret ? [3, 3] : []);
    ctx.strokeStyle = isShaft ? '#c85a3c' : isStair ? '#7a7f8a' : e.secret ? '#d8a53f' : '#4a443a';
    ctx.lineWidth = isShaft ? 1 : 1.5;
    ctx.moveTo(px(a), py(a));
    ctx.lineTo(px(b), py(b));
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Rooms at their real footprints — a boss cavern dwarfs a vault
  for (const r of layout.rooms) {
    const rw = Math.max(3, wOf(r) * s);
    const rh = Math.max(3, hOf(r) * s);
    ctx.fillStyle = TYPE_COLORS[r.type] || '#777';
    if (r.shape === 'rotunda') {
      ctx.beginPath();
      ctx.arc(px(r), py(r), Math.min(rw, rh) / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(px(r) - rw / 2, py(r) - rh / 2, rw, rh);
    }
    if (r.secret) {
      ctx.strokeStyle = '#ffd75e';
      ctx.lineWidth = 1;
      ctx.strokeRect(px(r) - rw / 2 - 1.5, py(r) - rh / 2 - 1.5, rw + 3, rh + 3);
    }
  }

  // Say which plan is which, when there is more than one
  if (floors.length > 1) {
    ctx.fillStyle = '#8a7a58';
    ctx.font = '9px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    floors.forEach((f, i) => {
      ctx.fillText(`Floor ${f + 1}`, pad + i * stride * s, 2);
    });
  }

  // Trapdoor mouths, marked in the room that holds them
  for (const t of layout.trapdoors || []) {
    const room = byIdx.get(t.from);
    if (!room) continue;
    ctx.fillStyle = t.secret ? '#6a3a2a' : '#111';
    ctx.strokeStyle = '#c85a3c';
    ctx.lineWidth = 1;
    const size = Math.max(3, s * 1.4);
    ctx.fillRect(px(room) - size / 2, py(room) - size / 2, size, size);
    ctx.strokeRect(px(room) - size / 2, py(room) - size / 2, size, size);
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
            ${entry.layout.rooms.length} rooms · ${entry.layout.branches.filter(b => b.secret).length} secret ·
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
      const label = branch.name || 'A side passage';
      row.innerHTML = `<input type="checkbox" ${branch.secret ? 'checked' : ''} />
        ${label[0].toUpperCase()}${label.slice(1)} off room #${branch.junction}
        (${branch.rooms.length} room${branch.rooms.length > 1 ? 's' : ''}) is secret`;
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
