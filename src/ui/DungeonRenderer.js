/**
 * DungeonRenderer — the delve as a torchlit map
 *
 * Canvas 2D: the room chain drawn as connected chambers descending
 * the winding path DungeonGen laid out. Cleared rooms dim; the
 * current room glows; the party stands as a cluster of class icons.
 * (Isometric Three.js port planned — this is the readable v1.)
 */

export class DungeonRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
  }

  render(state) {
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

    // Scale the winding layout to the canvas
    const maxX = Math.max(...rooms.map(r => r.x));
    const maxY = Math.max(...rooms.map(r => r.y));
    const pad = 40;
    const sx = (w - pad * 2) / Math.max(1, maxX);
    const sy = (h - pad * 2) / Math.max(1, maxY);
    const px = r => pad + r.x * sx;
    const py = r => pad + r.y * sy;

    // Corridors between consecutive rooms
    ctx.strokeStyle = '#3a2f1e';
    ctx.lineWidth = 6;
    ctx.beginPath();
    for (let i = 0; i < rooms.length - 1; i++) {
      ctx.moveTo(px(rooms[i]), py(rooms[i]));
      ctx.lineTo(px(rooms[i + 1]), py(rooms[i + 1]));
    }
    ctx.stroke();

    // Rooms
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const x = px(room);
      const y = py(room);
      const isCurrent = i === roomIndex;
      const isVisited = i < roomIndex || room.cleared;
      const isBoss = room.type === 'boss';
      const radius = isBoss ? 20 : 14;

      // Torchlight glow on the current room
      if (isCurrent) {
        const glow = ctx.createRadialGradient(x, y, 4, x, y, 44);
        glow.addColorStop(0, 'rgba(216, 165, 63, 0.5)');
        glow.addColorStop(1, 'rgba(216, 165, 63, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(x - 44, y - 44, 88, 88);
      }

      ctx.fillStyle = isCurrent ? '#2a2213' : isVisited ? '#171310' : '#14110b';
      ctx.strokeStyle = isCurrent ? '#d8a53f' : isBoss ? '#8a3a3a' : '#3a2f1e';
      ctx.lineWidth = isCurrent ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Room icon — unknown rooms ahead show as ?
      const known = i <= roomIndex + 1 || isBoss;
      ctx.font = `${isBoss ? 18 : 13}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = isVisited && !isCurrent ? 0.45 : 1;
      ctx.fillText(known ? room.icon : '❓', x, y);
      ctx.globalAlpha = 1;
    }

    // The party: a cluster of living class icons at the current room
    const current = rooms[Math.min(roomIndex, rooms.length - 1)];
    if (current && party) {
      const living = party.members.filter(m => m.alive);
      const cx = px(current);
      const cy = py(current) - 26;
      ctx.font = '13px serif';
      const spread = Math.min(14, 44 / Math.max(1, living.length));
      living.forEach((m, i) => {
        const off = (i - (living.length - 1) / 2) * spread;
        ctx.fillText(m.icon, cx + off, cy);
      });
    }
  }
}
