/**
 * Choreography — the room, performed
 *
 * The simulator resolves a whole room in one call and the record of it
 * is complete (rule 7). What the player used to *see* of that record
 * was one frame: the party rebuilt at the new room's slots, one slash
 * sprite for 0.7 s, and the monster gone on the next render. The
 * chronicle narrated three rounds, a mid-fight heal and a boss phase;
 * the picture showed a flash (SCREENS.md §1, PROBLEMS P9).
 *
 * This module turns the record into a performance. `planBeats` is pure:
 * given the state before a tick and the state after, it returns the
 * ordered beats of the room — the march down the corridor, the arrival,
 * the party forming up in the shape the maths chose, the deliberation,
 * each round of a fight, the resolution, the falls, the aside — each
 * with a duration. `Choreographer.play` walks that list against a
 * renderer, a story panel and a HUD, waiting each beat out, so the next
 * tick is not taken until the room has been *seen*.
 *
 * Nothing here simulates. Every number a beat carries was computed by
 * `RoomEncounters.resolveFight` and recorded in `roundLog`; the beats
 * are the same numbers in order, with time attached. The curve, the
 * goldens and the census are untouched (rule 10).
 */

import { frontCount, marchingOrder } from './RoomLayout.js';

/** Base durations at 1.0×, in milliseconds. The speed slider divides. */
export const BEAT_MS = {
  march: 950,
  arrive: 550,
  formup: 380,
  deliberate: 700,
  opening: 420,
  round: 640,
  resolve: 800,
  line: 380,
  wound: 350,
  fall: 650,
  aside: 450,
};

/** Actions whose success leaves the monster dead on the floor. */
export const FALL_ACTIONS = new Set(['fight', 'spell-strike', 'turn-undead', 'cause-fear']);

/**
 * Actions that clear a monster room without killing what is in it: the
 * party gets past, and the monster is still standing when they leave.
 */
export const PASS_ACTIONS = new Set(['sneak', 'bribe', 'parley', 'leave-it', 'flee']);

/**
 * Plan the beats of the room the tick just resolved.
 *
 *   prev  — getState() before the tick (or null on the first)
 *   state — getState() after it
 *
 * Returns [] when nothing was narrated (nothing happened to perform).
 */
export function planBeats(prev, state) {
  const n = state?.narration;
  if (!n || n.roomIndex === undefined || n.roomIndex === null) return [];
  const rooms = state.dungeon?.rooms || [];
  const to = n.roomIndex;
  const room = rooms[to];
  const from = prev?.currentRoomIndex ?? null;

  const monsterRoom = !!room && (room.type === 'monster' || room.type === 'boss');
  // A monster the party met on arrival: the room holds it on screen
  // until the resolution says what became of it.
  const held = monsterRoom && !!n.monster && !(prev && roomWasClearedBefore(prev, to));
  // A fight happened if the resolver recorded rounds — including none,
  // when the opening blow (items acting before round one) settled it.
  const fought = Array.isArray(n.rounds);
  const formation = n.formation || state.party?.formation || 'line';
  const order = marchingOrder(state.party?.members || []);
  const front = order.slice(0, frontCount(formation)).map(m => m.name);

  const beats = [];
  if (from !== null && from !== to) {
    // A long passage takes longer to walk. Rooms are placed in tile
    // coordinates; a spliced-in wing can be a long way off, and a fixed
    // duration made that read as a teleport (60 units in under a second).
    const a = rooms[from], b = rooms[to];
    const dist = a && b ? Math.hypot((b.x || 0) - (a.x || 0), (b.y || 0) - (a.y || 0)) : 8;
    const stretch = Math.min(2.2, Math.max(0.7, dist / 8));
    beats.push({ type: 'march', from, to, ms: Math.round(BEAT_MS.march * stretch) });
  }
  beats.push({ type: 'line', kind: 'predicament', text: n.predicament, room: to, hold: held, ms: BEAT_MS.arrive });
  beats.push({ type: 'formup', room: to, formation, facing: held, front, ms: BEAT_MS.formup });
  beats.push({ type: 'line', kind: 'deliberation', text: n.deliberation, ms: BEAT_MS.deliberate });

  if (fought) {
    const max = Math.max(1, n.monster?.health || 1);
    if (n.opening > 0) {
      beats.push({
        type: 'opening', room: to, amount: n.opening,
        frac: Math.max(0, max - n.opening) / max, ms: BEAT_MS.opening,
      });
    }
    n.rounds.forEach((r, i) => {
      beats.push({
        type: 'round', room: to, n: r.round,
        swing: r.swing, incoming: r.incoming || 0,
        heal: r.heal || null, mend: r.mend || 0, phased: !!r.phased,
        frac: Math.max(0, r.monsterHealth) / max,
        progress: (i + 1) / n.rounds.length,
        front, ms: BEAT_MS.round,
      });
    });
  }

  let outcome = 'done';
  if (n.retreated) outcome = 'fled';
  // A cleared monster room is a dead monster unless the party went
  // around it: a fight, a turning, a hazard shoved onto it, a sarcophagus
  // dropped on it — the prose says it is dead, so it falls.
  else if (held && room.cleared && PASS_ACTIONS.has(n.action) && !fought) outcome = 'passed';
  else if (held && room.cleared) outcome = 'slain';
  else if (held) outcome = 'stands';
  beats.push({
    type: 'resolve', room: to, action: n.action, element: n.spellElement || null,
    outcome, back: state.currentRoomIndex, formation, front, ms: BEAT_MS.resolve,
  });
  beats.push({ type: 'line', kind: 'resolution', text: n.resolution, ms: BEAT_MS.line });
  for (const w of n.wounds || []) beats.push({ type: 'line', kind: 'wound', text: w, ms: BEAT_MS.wound });

  const dead = (state.party?.members || [])
    .filter(m => !m.alive && (!prev || prev.party?.members?.some(p => p.name === m.name && p.alive)))
    .map(m => m.name);
  if (dead.length || n.falls?.length) {
    beats.push({ type: 'falls', names: dead, lines: n.falls || [], ms: BEAT_MS.fall });
  }
  if (n.aside) beats.push({ type: 'line', kind: 'aside', text: n.aside, ms: BEAT_MS.aside });
  return beats;
}

/** Was this room already cleared when the previous state was taken? */
function roomWasClearedBefore(prev, idx) {
  // `dungeon` is the live object, so the previous state's rooms already
  // show the new flags; the honest signal is the previous narration
  // having cleared this same room.
  return prev?.narration?.roomIndex === idx && prev?.narration?.success && !prev?.narration?.retreated
    && prev?.narration?.monster && FALL_ACTIONS.has(prev.narration.action);
}

/** Total wall-clock of a beat list at a speed. */
export function totalMs(beats, speed = 1) {
  return beats.reduce((s, b) => s + b.ms, 0) / Math.max(0.25, speed);
}

/** One round, as the story panel reads it while the beat plays. */
export function roundLine(b) {
  const bits = [`Round ${b.n}: ${b.swing} dealt`];
  if (b.incoming) bits.push(`${b.incoming} taken`);
  if (b.heal) bits.push(`${b.heal.amount} healed on ${b.heal.target}`);
  if (b.phased) bits.push('the boss turns');
  return bits.join(', ') + '.';
}

const defaultWait = ms => new Promise(r => setTimeout(r, ms));

/**
 * Plays a beat list against the surfaces.
 *
 *   renderer — IsoDungeonRenderer (every call optional: the 2D fallback
 *              has none of them and the beats still pace the story)
 *   story    — { open(narration, roomIndex) → entry, line(entry, kind, text), close(entry) }
 *   hud      — { acting(names), hurt(names), health(name, hp), hint(text), formation(id) }
 *   speed    — () => multiplier
 */
export class Choreographer {
  constructor({ renderer = null, story = null, hud = null, speed = () => 1, wait = defaultWait } = {}) {
    this.renderer = renderer;
    this.story = story;
    this.hud = hud;
    this.speed = speed;
    this.wait = wait;
    this.playing = false;
    this.token = 0;
  }

  /** Abandon the current performance (a new delve, a new draft). */
  cancel() {
    this.token++;
  }

  async play(beats, prev, state) {
    const token = ++this.token;
    const r = this.renderer;
    const hud = this.hud;
    const story = this.story;
    this.playing = true;
    let entry = null;

    // The HUD bars walk from where the party was to where it ends up,
    // one step per round, so the numbers move when the blows land.
    const before = new Map((prev?.party?.members || []).map(m => [m.name, m.health]));
    const after = new Map((state?.party?.members || []).map(m => [m.name, m.health]));

    try {
      for (const b of beats) {
        if (token !== this.token) return;
        const ms = b.ms / Math.max(0.25, this.speed());
        switch (b.type) {
          case 'march':
            hud?.hint?.('the party marches on');
            r?.marchParty?.(b.from, b.to, ms);
            break;

          case 'line':
            if (b.kind === 'predicament') {
              entry = story?.open?.(state.narration, state.roomIndex) ?? null;
              if (b.hold) r?.holdRoom?.(b.room);
            }
            story?.line?.(entry, b.kind, b.text);
            if (b.kind === 'deliberation') hud?.hint?.('deciding');
            break;

          case 'formup':
            hud?.formation?.(b.formation);
            hud?.hint?.(b.facing ? 'forming up' : '');
            r?.placeParty?.(b.room, b.facing, b.formation, { ms });
            // The eye comes in on a fight: aimed between the ranks and
            // the thing they face, not at the room's centre (SCREENS.md S5)
            if (b.facing) r?.aimFight?.(b.room);
            break;

          case 'opening':
            hud?.hint?.('the opening blow');
            r?.monsterHit?.(b.room, b.frac, `−${b.amount}`);
            story?.line?.(entry, 'round', `Before the first round: ${b.amount} from the opening.`);
            break;

          case 'round': {
            hud?.hint?.(`round ${b.n}`);
            hud?.acting?.(b.front);
            r?.lungeFront?.(b.room, b.front, ms * 0.5);
            await this.wait(ms * 0.22);
            if (token !== this.token) return;
            r?.monsterHit?.(b.room, b.frac, `−${b.swing}`, b.phased);
            story?.line?.(entry, 'round', roundLine(b));
            if (b.heal) r?.healActor?.(b.heal.target, `+${b.heal.amount}`);
            await this.wait(ms * 0.3);
            if (token !== this.token) return;
            if (b.incoming > 0) {
              r?.monsterStrike?.(b.room, b.front, `−${b.incoming}`, ms * 0.4);
              hud?.hurt?.(b.front);
            }
            for (const [name, hp0] of before) {
              const hp1 = after.get(name);
              if (hp1 === undefined) continue;
              hud?.health?.(name, Math.round(hp0 + (hp1 - hp0) * b.progress));
            }
            await this.wait(ms * 0.48);
            hud?.acting?.([]);
            hud?.hurt?.([]);
            r?.settle?.();
            continue;
          }

          case 'resolve':
            hud?.hint?.('');
            r?.releaseAim?.();
            r?.playEffect?.(b.action, b.room, b.element);
            if (b.outcome === 'slain') r?.monsterFall?.(b.room, ms);
            else if (b.outcome === 'passed') r?.monsterFade?.(b.room, ms);
            else if (b.outcome === 'fled') {
              r?.releaseHold?.();
              r?.marchParty?.(b.room, b.back, ms, { flee: true });
            }
            else if (b.outcome === 'stands') r?.releaseHold?.();
            break;

          case 'falls':
            for (const name of b.names) r?.dropActor?.(name, ms);
            for (const text of b.lines) story?.line?.(entry, 'fall', text);
            break;
        }
        await this.wait(ms);
        if (token !== this.token) return;
        r?.settle?.();
      }
      // Everything lands where the state says it is
      for (const [name, hp] of after) hud?.health?.(name, hp);
    } finally {
      if (token === this.token) {
        this.playing = false;
        story?.close?.(entry);
        hud?.hint?.('');
      }
    }
  }
}
