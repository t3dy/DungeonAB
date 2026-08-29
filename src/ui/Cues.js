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

    let shown = 0;
    let stagger = 0;
    for (const event of events) {
      if (event.salience === 'ledger') continue;      // the log's business
      const style = tone(event.field, event.delta);
      if (!style || !event.delta) continue;
      const sign = event.delta > 0 ? '+' : '−';
      this.pop(`${event.icon} ${sign}${style.fmt(Math.abs(event.delta))}`, style.cls, stagger);
      stagger += 90;
      shown++;
      if (shown >= 5) break;      // a screenful of numbers is noise again
    }
    return shown;
  }

  /** One floating cue: rises, fades, removes itself. */
  pop(text, cls = '', delay = 0) {
    if (!this.host) return null;
    const el = document.createElement('div');
    el.className = `cue ${cls}`;
    el.textContent = text;
    // Scatter them so simultaneous cues do not stack into one blur
    el.style.left = `${18 + Math.random() * 44}%`;
    el.style.top = `${34 + Math.random() * 26}%`;
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
