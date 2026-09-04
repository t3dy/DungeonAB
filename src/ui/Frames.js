/**
 * Frames — the fixed-view capture harness (dev tool)
 *
 * The project measures mechanics (`audit`), balance (`calibrate`),
 * reach (`census`), assets (`assets`), prose (`prose.test.js`) and the
 * critic itself (`Dramaturg`). It has never measured the *picture*.
 * `tests/sprites.test.js` proves every monster maps to a tile in
 * bounds; nothing anywhere renders a frame and looks at it. That is why
 * the renderer sat byte-identical from v4.1 to v8.1 without anyone
 * noticing — see GRAPHICS.md §1.
 *
 * This is the missing instrument, at its smallest useful size: a URL
 * that puts the game in a *reproducible* place so two builds can be
 * photographed from the same spot.
 *
 *   ?capture=1&draftSeed=frames&seed=frames-01&room=3&theme=castle
 *
 * Everything is seeded and every step is synchronous — the draft picks
 * first-card-in-pack rather than by wall-clock, the muster is skipped,
 * and the simulator is ticked in a loop rather than on a timer. Two runs
 * of the same URL put the same party in the same chamber, so a
 * difference in the image is a difference in the renderer.
 *
 * `window.__frameReady` flips true when the scene is settled, and
 * `window.__frameInfo` carries what was actually captured, so a capture
 * script never has to guess whether the page is done.
 *
 * Dev-only: `captureRequest()` returns null unless `capture` is in the
 * query string, and main.js does nothing differently when it does.
 */

/** Fixtures worth photographing — themes × the rooms that differ visually. */
export const FIXTURES = [
  { label: 'delve-early', seed: 'frames-01', theme: 'delve', room: 2 },
  { label: 'delve-fight', seed: 'frames-01', theme: 'delve', room: 5 },
  { label: 'delve-boss', seed: 'frames-01', theme: 'delve', room: 9 },
  { label: 'castle', seed: 'frames-02', theme: 'castle', room: 4 },
  { label: 'icecaverns', seed: 'frames-03', theme: 'icecaverns', room: 4 },
];

/**
 * The capture request encoded in the URL, or null for a normal session.
 */
export function captureRequest(search) {
  const query = search ?? (typeof window !== 'undefined' ? window.location.search : '');
  const p = new URLSearchParams(query);
  if (!p.has('capture')) return null;

  const room = parseInt(p.get('room') ?? '2', 10);
  return {
    draftSeed: p.get('draftSeed') || 'frames',
    seed: p.get('seed') || 'frames-01',
    difficulty: p.get('difficulty') || 'normal',
    room: Number.isFinite(room) ? Math.max(0, room) : 2,
    label: p.get('label') || '',
  };
}

/**
 * Draft a whole party without a human: take the first card in the pack
 * every time. Deterministic given the seed, and it exercises the same
 * `playerPick` path the UI does — a capture that drafted through a back
 * door would be photographing a party the game cannot produce.
 */
export function autoDraft(draft) {
  let guard = 0;
  while (!draft.finished && guard++ < 200) {
    const pack = draft.getPlayerPack();
    if (!pack || pack.length === 0) break;
    if (!draft.playerPick(pack[0].id)) break;
  }
  // `getPlayerPool()` returns the pool bucketed by card type; `Party`
  // wants the flat list, which is what DraftUI hands it too.
  return draft.getPlayerPool().all;
}

/**
 * Walk the simulator to a room synchronously. No timers, so the frame
 * does not depend on how fast the machine ran.
 */
export function tickToRoom(sim, room) {
  let guard = 0;
  while (guard++ < 400) {
    const state = sim.getState();
    // `roomIndex` is progress along the path; `currentRoomIndex` is the
    // room's index in the array, which does not increase monotonically.
    if (state.roomIndex >= room || state.gameOver) break;
    sim.tick();
  }
  return sim.getState();
}

/**
 * Publish what was captured, so a screenshot can be labelled with the
 * scene it actually shows rather than the one that was asked for.
 */
export function markReady(state, req) {
  if (typeof window === 'undefined') return;
  window.__frameInfo = {
    label: req.label,
    draftSeed: req.draftSeed,
    seed: req.seed,
    difficulty: req.difficulty,
    wantedRoom: req.room,
    room: state.roomIndex ?? 0,
    roomType: state.dungeon?.rooms?.[state.currentRoomIndex ?? 0]?.type ?? null,
    theme: state.theme?.id ?? null,
    gameOver: !!state.gameOver,
    rooms: state.dungeon?.rooms?.length ?? 0,
    party: (state.party?.members ?? []).map(m => m.class),
  };
  window.__frameReady = true;
  console.log('[frames] ready', window.__frameInfo);
}
