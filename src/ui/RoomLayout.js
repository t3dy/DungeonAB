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
/**
 * How many stand in the front rank, by formation. The drawing has to
 * agree with the maths: a column really is one blade forward, and a
 * wedge really is three (agents/Formation.js `frontage`).
 */
const FRONT_BY_FORMATION = {
  column: 1, line: 2, shieldwall: 2, wedge: 3, loose: 2,
};

export function partySlots(room, x, z, n, facingMonster, formation = 'line') {
  const { axis, far, wide } = roomAxis(room);
  // Stand off the far wall; square up when there's something to fight
  const back = facingMonster ? -Math.max(0.7, far * 0.42) : -Math.max(0.2, far * 0.12);
  const frontCount = Math.min(n, FRONT_BY_FORMATION[formation] ?? 2);
  // Loose order really does stand apart, and a shield wall really does
  // lock up: the spacing is the same fact the areaShare modifier prices
  const spread = formation === 'loose' ? 1.6 : formation === 'shieldwall' ? 0.7 : 1;
  const rankGap = Math.min(1.25, Math.max(0.75, wide * 0.45)) * spread;
  const fileGap = Math.min(1.3, Math.max(0.8, wide * 0.7)) * spread;

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
 * Where the furniture stands. Features line the room's edges — along
 * the long walls and in the corners — leaving the middle clear for the
 * party's ranks and the monster's end (partySlots / monsterSpot).
 * Deterministic: the same room always furnishes the same way.
 */
export function featureSlots(room, x = 0, z = 0, count = 0) {
  const { hx, hz } = roomHalf(room);
  const { axis } = roomAxis(room);
  const inset = 0.75;
  // Along the short walls, offset back toward the party's end so the
  // furniture frames the fight instead of standing in it
  const lateral = Math.max(0.6, (axis === 'x' ? hz : hx) - inset);
  const depth = Math.max(0.6, (axis === 'x' ? hx : hz) - inset);

  const candidates = axis === 'x'
    ? [
        { mx: x - depth * 0.15, mz: z - lateral },
        { mx: x - depth * 0.15, mz: z + lateral },
        { mx: x - depth * 0.8, mz: z - lateral * 0.55 },
        { mx: x - depth * 0.8, mz: z + lateral * 0.55 },
      ]
    : [
        { mx: x - lateral, mz: z - depth * 0.15 },
        { mx: x + lateral, mz: z - depth * 0.15 },
        { mx: x - lateral * 0.55, mz: z - depth * 0.8 },
        { mx: x + lateral * 0.55, mz: z - depth * 0.8 },
      ];
  return candidates.slice(0, Math.max(0, count));
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
