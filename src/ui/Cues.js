/**
 * Cues — what the delve looks like, so it does not have to be read
 *
 * A playtester put it exactly right: *"when you lose life a -X heart
 * displays... it'd be more satisfying to have visuals associated, and
 * then I could go read the log if I wanted more details."* The game was
 * text-heavy because every consequence arrived as a sentence.
 *
 * The cues are not a second bookkeeping system. `Chronicle.diffEvents`
 * already produces, every tick, one record per observable change —
 * `{ field, delta, icon, salience }` — and standing rule 7 guarantees
 * nothing can move without appearing there. So the cue layer reads that
 * diff and nothing else, which means **a new mechanic gets a floating
 * number for free**, and cannot be added without one.
 *
 * Salience decides what floats: BEAT and NOTABLE changes get a cue,
 * LEDGER ones stay in the log where they belong.
 */

/** More than a handful of numbers at once is noise again. */
const MAX_CUES = 5;

/** Fields worth a number over the map, and how to phrase the number. */
const CUE_STYLE = {
  health: { good: false, fmt: n => `${n}`, cls: 'cue-hurt' },
  wounds: { good: false, fmt: n => `${n}`, cls: 'cue-wound' },
  living: { good: false, fmt: n => `${n}`, cls: 'cue-death' },
  gold: { good: true, fmt: n => `${n}`, cls: 'cue-gold' },
  supply: { good: true, fmt: n => `${n}`, cls: 'cue-supply' },
  equipment: { good: true, fmt: n => `${n}`, cls: 'cue-gear' },
  potions: { good: true, fmt: n => `${n}`, cls: 'cue-gear' },
  materials: { good: true, fmt: n => `${n}`, cls: 'cue-gear' },
  trophies: { good: true, fmt: n => `${n}`, cls: 'cue-gear' },
  keys: { good: true, fmt: n => `${n}`, cls: 'cue-gear' },
  grimoire: { good: true, fmt: n => `${n}`, cls: 'cue-magic' },
  spellsLearned: { good: true, fmt: n => `${n}`, cls: 'cue-magic' },
  score: { good: true, fmt: n => `${n}`, cls: 'cue-score' },
  floor: { good: false, fmt: n => `${n}`, cls: 'cue-floor' },
};

/** Health and deaths read as losses even when the number rises. */
function tone(field, delta) {
  const style = CUE_STYLE[field];
  if (!style) return null;
  const gain = delta > 0;
  return { ...style, gain };
}

/**
 * Which of a tick's changes float, and what each one reads as.
 *
 * Separate from the drawing so the decision can be tested without a
 * browser: what floats is a design question (numbers over the map,
 * ledger lines in the log), and the DOM is only how it is shown.
 *
 * Collected as a batch rather than popped one at a time, because the
 * cues of one tick have to know how many of them there are or they land
 * on top of each other — the first cut scattered them at random and two
 * cues in one tick read as a single garbled number over the map.
 */
export function selectCues(events) {
  const batch = [];
  for (const event of events || []) {
    if (event.salience === 'ledger') continue;        // the log's business
    const style = tone(event.field, event.delta);
    if (!style || !event.delta) continue;
    const sign = event.delta > 0 ? '+' : '−';
    batch.push({
      field: event.field,
      text: `${event.icon} ${sign}${style.fmt(Math.abs(event.delta))}`,
      cls: style.cls,
    });
    if (batch.length >= MAX_CUES) break;   // a screenful of numbers is noise again
  }
  return batch;
}

export class CueLayer {
  /**
   * @param hostId  id of the element the cues float over (the canvas's
   *                positioned wrapper)
   */
  constructor(hostId = 'cue-layer') {
    this.host = document.getElementById(hostId);
    this.queue = [];
    this.lastTurn = -1;
  }

  /**
   * Show one tick's worth of change. `events` is `sim.lastEvents`.
   * Repeated calls for the same turn are ignored, because the render
   * loop runs far more often than the sim ticks.
   */
  showTick(events, turn) {
    if (!this.host || !events || turn === this.lastTurn) return 0;
    this.lastTurn = turn;

    const batch = selectCues(events);
    batch.forEach((cue, i) => this.pop(cue.text, cue.cls, i * 90, i, batch.length));
    return batch.length;
  }

  /**
   * One floating cue: rises, fades, removes itself.
   *
   * `lane` of `lanes` places it. Cues from one tick are dealt into
   * stacked rows around the middle of the map so that five of them read
   * as a list rather than a smear, and each row is nudged sideways by
   * its lane so a repeated cue does not trace the same path twice.
   */
  pop(text, cls = '', delay = 0, lane = 0, lanes = 1) {
    if (!this.host) return null;
    const el = document.createElement('div');
    el.className = `cue ${cls}`;
    el.textContent = text;
    const spread = Math.min(lanes, MAX_CUES);
    const row = spread > 1 ? lane / (spread - 1) : 0.5;   // 0…1 down the stack
    el.style.top = `${30 + row * 30}%`;
    el.style.left = `${34 + (lane % 2 ? 1 : -1) * 9}%`;
    el.style.animationDelay = `${delay}ms`;
    this.host.appendChild(el);
    setTimeout(() => el.remove(), 1500 + delay);
    return el;
  }

  clear() {
    if (this.host) this.host.innerHTML = '';
    this.lastTurn = -1;
  }
}
