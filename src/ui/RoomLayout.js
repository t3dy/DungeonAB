/**
 * RoomLayout — where things stand inside a room
 *
 * Pure geometry shared by the renderers (procgen v3). A room is a
 * footprint in tiles; this module answers the questions the drawing
 * code asks about it: which way is it long, where does the monster
 * stand, where does each adventurer stand, and where do the walls
 * break for a doorway.
 *
 * No THREE, no DOM — so the thing the player actually needs to be
 * true ("the whole party fits in the room, with space to fight") is
 * testable without a graphics context.
 */

/** One dungeon tile = one world unit = roughly one adventurer's floor. */
export const TILE = 1.0;
export const DOOR_W = 1.8;      // doorway gap, wide enough to read as a way in

/** A room's world-space half extents. */
export function roomHalf(room) {
  return { hx: (room.w || 4) * TILE / 2, hz: (room.h || 4) * TILE / 2 };
}

/**
 * A room's long axis and its extents. Fights stage along it: the
 * monster holds one end, the party forms up at the other.
 */
export function roomAxis(room) {
  const { hx, hz } = roomHalf(room);
  return hx >= hz ? { axis: 'x', far: hx, wide: hz } : { axis: 'z', far: hz, wide: hx };
}

/**
 * Where the monster stands: down the room's long axis, leaving the
 * party the other end. Big chambers genuinely separate the two sides.
 */
export function monsterSpot(room, x = 0, z = 0) {
  const { axis, far } = roomAxis(room);
  const push = Math.max(0.8, far * 0.45);
  return axis === 'x' ? { mx: x + push, mz: z } : { mx: x, mz: z + push };
}

/**
 * Marching order laid out inside the room, not crowded onto a point.
 * Two ranks: the front one takes the hits (Party.takeDamage puts
 * fighters there), the back one stands off it. Slots sit about a tile
 * apart and inside the walls, so a capped party of four reads as four
 * people in a room with room to swing (Party.PARTY_CAP).
 */
export function partySlots(room, x, z, n, facingMonster) {
  const { axis, far, wide } = roomAxis(room);
  // Stand off the far wall; square up when there's something to fight
  const back = facingMonster ? -Math.max(0.7, far * 0.42) : -Math.max(0.2, far * 0.12);
  const frontCount = Math.min(n, 2);
  const rankGap = Math.min(1.25, Math.max(0.75, wide * 0.45));
  const fileGap = Math.min(1.3, Math.max(0.8, wide * 0.7));

  const slots = [];
  for (let i = 0; i < n; i++) {
    const rank = i < frontCount ? 0 : 1;              // 0 = front
    const inRank = rank === 0 ? i : i - frontCount;
    const rankSize = rank === 0 ? frontCount : n - frontCount;
    const lateral = (inRank - (rankSize - 1) / 2) * fileGap;
    const depth = back + rank * -rankGap;
    slots.push(axis === 'x'
      ? { mx: x + depth, mz: z + lateral }
      : { mx: x + lateral, mz: z + depth });
  }
  return slots;
}

/**
 * One wall's solid spans along a side, broken by a doorway when a
 * passage meets it. Local coordinates, centered on the wall.
 */
export function wallSpans(length, doorCount) {
  if (doorCount === 0) return [[-length / 2, length / 2]];
  const half = DOOR_W / 2;
  const spans = [];
  if (-length / 2 < -half) spans.push([-length / 2, -half]);
  if (half < length / 2) spans.push([half, length / 2]);
  return spans;
}

/**
 * Which wall does each room's doorway belong in? Derived from the
 * dungeon's edges: the direction to the neighbour picks the side.
 * Trapdoor edges are vertical, so they open no wall — they show as a
 * shaft in the floor instead.
 */
export function doorMap(rooms, edgeList, isHidden = () => false) {
  const doors = new Map();
  const add = (idx, side, secret) => {
    if (!doors.has(idx)) doors.set(idx, []);
    doors.get(idx).push({ side, secret });
  };
  for (const edge of edgeList) {
    if (edge.kind === 'trapdoor') continue;
    const ra = rooms[edge.a];
    const rb = rooms[edge.b];
    if (!ra || !rb || isHidden(ra) || isHidden(rb)) continue;
    const dx = rb.x - ra.x;
    const dz = rb.y - ra.y;
    // Rooms are placed by axis moves, so one delta dominates
    if (Math.abs(dx) >= Math.abs(dz)) {
      add(edge.a, dx > 0 ? 'east' : 'west', edge.secret);
      add(edge.b, dx > 0 ? 'west' : 'east', edge.secret);
    } else {
      add(edge.a, dz > 0 ? 'south' : 'north', edge.secret);
      add(edge.b, dz > 0 ? 'north' : 'south', edge.secret);
    }
  }
  return doors;
}
