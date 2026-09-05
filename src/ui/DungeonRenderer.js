/**
 * DungeonRenderer — the delve as a torchlit floorplan (2D fallback)
 *
 * Canvas 2D for machines without WebGL. Rooms are drawn as the actual
 * rectangles DungeonGen laid out — halls long, caverns wide, vaults
 * cramped — joined by corridors along the dungeon's edges. The party
 * stands inside the current room, one icon per adventurer.
 */

export class DungeonRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    // The performance (ui/Choreography.js) animates sprites the 3D
    // renderer owns; here the floorplan just redraws per room, so the
    // beats play in the chronicle and the HUD alone.
    this.supportsBeats = false;
  }
  refit() { if (this.lastState) this.render(this.lastState); }

  render(state) {
    this.lastState = state;
    const ctx = this.ctx;
    const { dungeon, roomIndex, party } = state;

    // Fit canvas to CSS size
    const w = this.canvas.clientWidth || 500;
    const h = this.canvas.clientHeight || 420;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }

    ctx.fillStyle = '#0d0b08';
    ctx.fillRect(0, 0, w, h);

    const rooms = dungeon.rooms;
    // A dungeon has floors now, and they sit on top of each other in
    // plan view. The floorplan shows the one the party is standing on;
    // the rest are drawn when the party gets there.
    const here = rooms[Math.min(roomIndex, rooms.length - 1)];
    const floor = here?.floor || 0;
    const onFloor = r => (r.floor || 0) === floor;
    const visible = rooms.filter(r => onFloor(r) && !(r.secret && !r.discovered));
    if (visible.length === 0) return;

    // Fit the layout to the canvas by its true extent — footprints
    // included, and normalized by the minimum (rooms can sit at
    // negative tile coordinates)
    const pad = 26;
    const minX = Math.min(...visible.map(r => r.x - (r.w || 4) / 2));
    const maxX = Math.max(...visible.map(r => r.x + (r.w || 4) / 2));
    const minY = Math.min(...visible.map(r => r.y - (r.h || 4) / 2));
    const maxY = Math.max(...visible.map(r => r.y + (r.h || 4) / 2));
    const s = Math.min(
      (w - pad * 2) / Math.max(1, maxX - minX),
      (h - pad * 2) / Math.max(1, maxY - minY)
    );
    const px = r => pad + (r.x - minX) * s;
    const py = r => pad + (r.y - minY) * s;
    const current = rooms[Math.min(roomIndex, rooms.length - 1)];

    // Corridors along the real edges (so branches show), skipping the
    // vertical ones — a trapdoor is a hole, not a hallway
    ctx.strokeStyle = '#3a2f1e';
    ctx.lineWidth = Math.max(3, s * 1.4);
    for (const edge of dungeon.edges || []) {
      if (edge.kind === 'trapdoor' || edge.kind === 'stair') continue;
      const ra = rooms[edge.a];
      const rb = rooms[edge.b];
      if (!ra || !rb || !onFloor(ra) || !onFloor(rb)) continue;
      if ((ra.secret && !ra.discovered) || (rb.secret && !rb.discovered)) continue;
      ctx.setLineDash(edge.secret ? [4, 3] : []);
      ctx.beginPath();
      ctx.moveTo(px(ra), py(ra));
      ctx.lineTo(px(rb), py(rb));
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Rooms, drawn at their real size
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      if (!onFloor(room) || (room.secret && !room.discovered)) continue;
      const rw = Math.max(6, (room.w || 4) * s);
      const rh = Math.max(6, (room.h || 4) * s);
      const x = px(room);
      const y = py(room);
      const isCurrent = room === current;
      const isVisited = room.cleared;
      const isBoss = room.type === 'boss';

      // Torchlight glow on the current room
      if (isCurrent) {
        const reach = Math.max(rw, rh);
        const glow = ctx.createRadialGradient(x, y, 4, x, y, reach);
        glow.addColorStop(0, 'rgba(216, 165, 63, 0.45)');
        glow.addColorStop(1, 'rgba(216, 165, 63, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(x - reach, y - reach, reach * 2, reach * 2);
      }

      ctx.fillStyle = isCurrent ? '#2a2213' : isVisited ? '#171310' : '#14110b';
      ctx.strokeStyle = isCurrent ? '#d8a53f' : isBoss ? '#8a3a3a' : '#3a2f1e';
      ctx.lineWidth = isCurrent ? 2.5 : 1.5;
      if (room.shape === 'rotunda') {
        ctx.beginPath();
        ctx.arc(x, y, Math.min(rw, rh) / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(x - rw / 2, y - rh / 2, rw, rh);
        ctx.strokeRect(x - rw / 2, y - rh / 2, rw, rh);
      }

      // Room icon — unknown rooms ahead show as ?
      const known = room.cleared || isCurrent || isBoss
        || (state.knownIdxs ? state.knownIdxs.includes(i) : true);
      ctx.font = `${Math.max(10, Math.min(20, Math.min(rw, rh) * 0.5))}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = isVisited && !isCurrent ? 0.45 : 1;
      // Leave the middle of the current room for the party
      ctx.fillText(known ? room.icon : '❓', x, isCurrent ? y - rh * 0.3 : y);
      ctx.globalAlpha = 1;
    }

    // Which floor this is. Without it, descending looks like the map
    // being redrawn for no reason.
    if (floor > 0 || rooms.some(r => (r.floor || 0) > 0)) {
      ctx.fillStyle = '#8a7a58';
      ctx.font = '12px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(`Floor ${floor + 1}`, 8, 8);
    }

    // The party, standing inside the current room
    if (current && party && !(current.secret && !current.discovered)) {
      const living = party.members.filter(m => m.alive);
      const rw = Math.max(6, (current.w || 4) * s);
      const rh = Math.max(6, (current.h || 4) * s);
      const cx = px(current);
      const cy = py(current) + rh * 0.18;
      ctx.font = `${Math.max(11, Math.min(16, s))}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Two ranks if the room is deep enough to show them
      const perRank = rh > rw ? Math.min(living.length, 2) : Math.min(living.length, 4);
      const spread = Math.min(s * 1.1, rw / Math.max(1, perRank + 0.5));
      living.forEach((m, i) => {
        const rank = Math.floor(i / perRank);
        const inRank = i % perRank;
        const count = Math.min(perRank, living.length - rank * perRank);
        const off = (inRank - (count - 1) / 2) * spread;
        ctx.fillText(m.icon, cx + off, cy + rank * Math.min(s, rh * 0.22));
      });
    }
  }
}
