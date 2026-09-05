/**
 * Screens — the frame every screen fits into
 *
 * Four screens: the Table (the draft), the Muster (the party, mustered,
 * with the kit and the rest of the pool), the Delve (the picture and the
 * chronicle beside it) and the Reckoning (the score, and the table's).
 * Each renders into its own `<section class="screen">` in `main`, and
 * each owns a group in the action bar at the bottom of the viewport
 * (`<div class="bar-for" data-screen="…">`), which is where its primary
 * action lives. The bar is fixed to the frame, not to the content, so
 * the button that starts the delve can never be scrolled past.
 *
 * Why this exists: before it, five surfaces used three mechanisms —
 * containers toggled by id, a results modal borrowed for the muster, a
 * modal for help — and each put its button at the end of its own
 * content. At 1366×768 that was two and a half screens of scrolling to
 * find Enter the Dungeon and two more to find March (SCREENS.md §2).
 *
 * No DOM at import time, so the module can be required by tests without
 * a document.
 */

export const SCREENS = ['table', 'muster', 'delve', 'reckoning'];

let current = null;
const listeners = new Set();

/** Show one screen and its bar group; hide the rest. Idempotent. */
export function showScreen(id) {
  if (!SCREENS.includes(id)) throw new Error(`Unknown screen: ${id}`);
  if (typeof document === 'undefined') { current = id; return id; }
  for (const s of SCREENS) {
    const el = document.getElementById(`screen-${s}`);
    if (el) el.classList.toggle('active', s === id);
  }
  document.querySelectorAll('#action-bar .bar-for').forEach(g => {
    g.classList.toggle('active', g.dataset.screen === id);
  });
  // The stat strip belongs to a delve in progress and nothing else
  const strip = document.getElementById('stat-strip');
  if (strip) strip.hidden = id !== 'delve';
  document.body.dataset.screen = id;
  const prev = current;
  current = id;
  for (const fn of listeners) fn(id, prev);
  return id;
}

export function currentScreen() {
  return current;
}

/** Be told when the screen changes (the renderer resizes on 'delve'). */
export function onScreenChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * The bar's per-screen contract, as data — so a test can assert that
 * every screen names a primary action and the markup carries it.
 */
export const BAR_PRIMARY = {
  table: null,                 // the pick is the action; it is in the body
  muster: 'march-btn',
  delve: 'pause-btn',
  reckoning: 'again-btn',
};
