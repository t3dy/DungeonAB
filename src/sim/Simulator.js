/**
 * Simulator — the auto-crawl loop
 *
 * The drafted party descends room by room. Each tick: enter the
 * next room, decide (personality-weighted), resolve (gradient),
 * narrate, march on. Clerics mend between rooms; alchemists brew
 * when the dungeon provides.
 */

import { generateDungeon, dungeonFromLayout, ROOM_TYPES } from '../world/DungeonGen.js';
import { Party } from '../agents/Party.js';
import { activeTactics, dormantTactics } from '../game/Tactics.js';
import { personalityModifiers } from '../game/Personalities.js';
import { Chronicle, snapshotState, diffEvents, SALIENCE } from '../narrative/Chronicle.js';
import { CLASSES } from '../game/Cards.js';
import {
  getRoomOptions, decideRoomAction, resolveRoomAction,
  detectSecretDoor, decideDetour, wingAppeal, openLockedWing,
  detectTrapdoor, decideTrapdoor,
} from '../encounters/RoomEncounters.js';
import {
  composePredicament, composeDeliberation, composeResolution, editPreps, composePoint,
  composeWipe, composeVictory, composeFall,
  composeSecretFound, composeDetour, composeTrapdoor, composeKeyFound, composeLockedWing,
  composeSupply, composeWound, composeDormant, composeTactics, composeProvision,
  resetDeliberation,
} from '../narrative/Narrator.js';
import { resetBarks } from '../narrative/Barks.js';

/**
 * Fall lines for a group who died together, each told how many were
 * still standing when they went down.
 *
 * A wipe used to print the same sentence once per body, the last of them
 * announcing that "the survivors march on" with nobody left to march.
 * Deaths are counted down through the group so the last of a party is
 * written as the last of a party (narrative/Narrator.js composeFall).
 */
/**
 * One of several phrasings, avoiding the one used last.
 *
 * Kept here rather than imported because `Narrator.pick` is module-
 * private; the requirement is only that a line firing twice in a delve
 * does not read as a stuck record.
 */
const lastLine = new Map();

/*
 * Cleared per delve. Module state that survives between runs makes the
 * seeded harness non-deterministic: the same case rendered twice picked
 * differently the second time, because this map still remembered the
 * first — which `tests/golden` catches by rendering every case twice.
 */
function resetLines() { lastLine.clear(); }

function pickLine(variants) {
  const key = variants[0];
  const previous = lastLine.get(key);
  const pool = variants.filter(v => v !== previous);
  const chosen = pool[Math.floor(Math.random() * pool.length)] || variants[0];
  lastLine.set(key, chosen);
  return chosen;
}

function fallLines(party, dead) {
  const standing = party.living().length;
  return dead.map((m, i) => composeFall(m, standing + (dead.length - 1 - i)));
}

export class Simulator {
  /**
   * @param draftPool  drafted cards — or a living Party carried over
   *                   from an earlier dungeon (campaign mode)
   */
  constructor(draftPool, seed = 'delve', difficulty = 'medium', opts = {}) {
    this.seed = seed;
    this.difficulty = difficulty;
    this.depth = Math.max(1, opts.depth || 1);

    this.party = draftPool instanceof Party ? draftPool : new Party(draftPool);
    // An archived/edited layout replays exactly; otherwise the seed builds one
    this.dungeon = opts.layout
      ? dungeonFromLayout(opts.layout)
      : generateDungeon(seed, difficulty, {
          wantLab: this.party.hasClass(CLASSES.ALCHEMIST),
          theme: opts.theme,
          depth: this.depth,
          condition: opts.condition,
          providence: opts.providence,
        });
    this.condition = this.dungeon.condition;

    // The march order: the spine to start with. Detours into side
    // branches splice their rooms in as the party discovers and
    // chooses them (procgen v2).
    this.path = this.dungeon.spine.slice();

    // Fill the lamp for the delve ahead. Scaled to the walk rather than
    // fixed, so difficulty decides how much of it is spent in the dark.
    this.party.provision(this.path.length, difficulty);
    this.roomIndex = 0;   // Position along the path (entrance = 0)
    this.turn = 0;
    this.roomsCleared = 0;
    this.gameOver = false;
    this.victory = false;
    this.paused = false;
    this.epitaph = null;
    this.lastNarration = null;
    // Who was walking in front last time we looked, so the prose can
    // say when that changes (narrative/Narrator.js composePoint)
    this.pointName = null;
    this.log = [];
    // Prep lines the resolution's editor cut for length; recordTick
    // files them in the ledger, where complete accounting has always
    // lived (narrative/Narrator.js editPreps)
    this.pendingLedger = [];

    // The chronicle spans the campaign, not the delve: a party that
    // descends again appends a chapter rather than starting over
    // (narrative/Chronicle.js). A caller may hand in the party's
    // existing chronicle to continue the saga.
    this.chronicle = opts.chronicle instanceof Chronicle
      ? opts.chronicle
      : new Chronicle(this.party.members.map(m => m.name).join(', ') || 'the party');
    // A fresh delve starts with nothing said yet: bark history is module
    // state and would otherwise leak from the last run (narrative/Barks.js)
    resetBarks();
    resetDeliberation();
    resetLines();
    this.chronicle.beginDelve({
      seed, difficulty, depth: this.depth,
      theme: this.dungeon.theme?.name || null,
      condition: this.condition && this.condition.id !== 'none' ? this.condition.name : null,
      // Named and described by the player, if they said so at the muster
      // (ui/OutfitUI.js): a history somebody wrote belongs in the saga
      // they are writing it for.
      roster: this.party.members.map(m => `${m.icon} ${m.name} (${m.class})`
        + (m.backstory ? ` — ${m.backstory}` : '')),
    });
    this.stateBefore = snapshotState(this);

    // Say what the party drilled, and warn about anything drafted that
    // cannot fire — a silently dead card reads as a bug (Tactics.js)
    // ...and the saga carries all three, not just the onscreen log. A
    // drafted card that cannot fire is exactly the kind of thing a
    // player reads the record to understand (tools/census.mjs found the
    // idle line reaching the panel and nothing else).
    const packed = composeProvision(this.party.provisionNotes);
    if (packed) { this.log.push(packed); this.chronicle.recordAside(packed); }
    const drilled = composeTactics(activeTactics(this.party));
    if (drilled) { this.log.push(drilled); this.chronicle.recordAside(drilled); }
    for (const idle of dormantTactics(this.party)) {
      const line = composeDormant(idle);
      this.log.push(line);
      this.chronicle.recordAside(line);
    }

    // Score multiplier: difficulty (mirrors SnakeAB progression), then
    // the condition's wager on top — a meaner dungeon pays out more.
    const base = { easy: 1, medium: 1.5, hard: 2, nightmare: 3 }[difficulty] || 1;
    this.scoreMultiplier = base * (1 + (this.condition?.scoreBonus || 0));
  }

  addLog(message) {
    this.log.push(message);
  }

  /**
   * One tick = one room entered, decided, resolved.
   *
   * The body is wrapped rather than inlined so that the state diff runs
   * on EVERY path out of it, including the half-dozen early returns for
   * wipes, venom and the dark. That wrapping is the whole guarantee
   * behind "nothing is silent": a mechanic cannot dodge the record by
   * returning early, because it does not control the exit
   * (narrative/Chronicle.js).
   */
  tick() {
    if (this.paused || this.gameOver) return;
    const logBefore = this.log.length;
    try {
      this._tick();
    } finally {
      this.recordTick(logBefore);
    }
  }

  /**
   * Diff the run's observable state and hand every change to the
   * chronicle, along with the room's prose. Called by tick() on every
   * exit path.
   */
  recordTick(logBefore = this.log.length) {
    const after = snapshotState(this);
    const events = diffEvents(this.stateBefore, after, {
      turn: this.turn,
      room: this.lastNarration?.room || null,
    });
    // Lines the tick pushed straight to the log (supply, march deaths)
    // are beats in their own right and belong in the record too
    for (const text of this.log.slice(logBefore)) {
      events.push({
        turn: this.turn, room: this.lastNarration?.room || null, field: null,
        icon: '·', text, salience: SALIENCE.BEAT, described: true,
      });
    }
    // Preps the resolution's editor folded: recorded whole, read by
    // whoever opens the ledger — the two-layer bargain the Chronicle
    // was built on
    for (const text of this.pendingLedger.splice(0)) {
      events.push({
        turn: this.turn, room: this.lastNarration?.room || null, field: null,
        icon: '🎒', text, salience: SALIENCE.LEDGER, described: true,
      });
    }
    this.stateBefore = after;
    this.lastEvents = events;
    if (this.lastNarration) this.chronicle.recordRoom(this.lastNarration, events);
    else if (events.length) for (const e of events) this.chronicle.recordAside(e.text, e.salience);
  }

  _tick() {

    this.turn++;
    this.roomIndex++;

    const roomIdx = this.path[this.roomIndex];
    const room = roomIdx !== undefined ? this.dungeon.getRoom(roomIdx) : null;
    if (!room) {
      // Walked off the end without a boss?? Treat as victory.
      this.finish(true);
      return;
    }

    // Snapshot the roster BEFORE anything in this tick can touch it.
    //
    // restStep() burns the lamp, and the dark takes health and leaves
    // scars — so capturing after it meant anyone the march killed or
    // wounded was already excluded from the comparison and never got a
    // line. A silence audit found 47% of wounds unreported and, worse,
    // heroes dying with the Chronicle saying nothing at all.
    const rosterBefore = this.party.living();
    const woundsBefore = new Map(this.party.members.map(m => [m.name, m.wounds]));

    // Between-room recovery, and the lantern burning down with it
    const supplyNote = this.party.restStep();
    const supplyLine = composeSupply(supplyNote);
    if (supplyLine) this.addLog(supplyLine);
    if (!this.party.isAlive()) {
      // The dark finished what the dungeon started
      this.lastNarration = {
        room: room.type, icon: room.icon, roomIndex: roomIdx, action: 'dark',
        predicament: composePredicament(room, this.dungeon.theme),
        deliberation: 'There is no light left to decide anything by.',
        resolution: supplyLine + ' The last of the party does not get up.',
        falls: fallLines(this.party, this.party.members.filter(m => !m.isAlive())),
        aside: null,
      };
      this.finish(false);
      return;
    }

    // Anyone the march itself took, before a single decision is made.
    // Captured HERE, not after the room resolves — otherwise everyone
    // the room kills is misread as a march death and filtered out of
    // the room's own report.
    const marchDeadList = rosterBefore.filter(m => !m.isAlive());
    const marchDead = new Set(marchDeadList.map(m => m.name));
    const marchFalls = fallLines(this.party, marchDeadList);
    for (const line of marchFalls) this.addLog(line);

    // Poison taken last room works now (the venomous are patient)
    const livingBefore = rosterBefore;
    const linger = this.party.applyLinger();
    if (linger && !this.party.isAlive()) {
      // The venom finishes what the fight started
      this.lastNarration = {
        room: room.type, icon: room.icon, roomIndex: roomIdx, action: 'linger',
        predicament: composePredicament(room, this.dungeon.theme),
        deliberation: 'The lingering venom acts before anything can be decided.',
        resolution: `🐍 The venom carried from the last fight deals ${linger.damage} damage, and the last of the party falls.`,
        falls: fallLines(this.party, livingBefore.filter(m => !m.isAlive())),
        aside: null,
      };
      this.finish(false);
      return;
    }

    // How many times the party has stood here. A fled room is walked
    // back into, and reading the same three beats six times running is
    // how that looked before anyone counted (tests/prose.test.js).
    room.visits = (room.visits || 0) + 1;

    // The room, decided and resolved
    const predicament = composePredicament(room, this.dungeon.theme);
    const options = getRoomOptions(room, this.party);
    const chosen = decideRoomAction(room, this.party);
    /*
     * Who is walking in front, said before the room that will test it.
     *
     * Computed here rather than after the resolution because the point
     * man must be named BEFORE the blow lands — a name introduced in
     * the same room it dies in is exactly the failure this addresses
     * (narrative/Dramaturg.js, mortalityEarned at 85%).
     */
    const DANGEROUS = new Set([ROOM_TYPES.MONSTER, ROOM_TYPES.BOSS, ROOM_TYPES.TRAP, ROOM_TYPES.DISASTER]);
    let pointLine = null;
    if (DANGEROUS.has(room.type)) {
      const point = this.party.pointMan();
      if (point && point.name !== this.pointName) {
        // A change of point is nearly always a succession: whoever was
        // in front is dead. Name the predecessor when there was one.
        pointLine = composePoint(point, { succeeding: this.pointName });
        this.pointName = point.name;
      }
    }

    const result = resolveRoomAction(room, this.party, chosen);
    this.lastResult = result;   // structured outcome, for analytics/mining

    // The editor's pass: the resolution prose keeps the preps worth a
    // sentence (carries, card promises, the two best generics) and the
    // rest go to the ledger whole. The mechanics already applied every
    // one of them — this cuts nothing but column inches.
    // A capability answered the room, and what it taught is worth a
    // line: an earned advantage the player never reads is a dead
    // declaration, whatever the ledger says. Situations often carry no
    // preps at all, so this makes the array rather than assuming it.
    /*
     * How much the party brought to bear, said in its own sentence with
     * its own number (encounters/EncounterEngine.js MASTERY). Additive
     * and separately stated, because the encounter's own line already
     * claimed its own figures and quietly changing them would make
     * every one of those lines a lie.
     */
    if (result.mastery) {
      const m = result.mastery;
      result.preps = result.preps || [];
      result.preps.push({
        source: 'the reckoning',
        // Variants because these fire twice in a good delve and read as
        // a stuck record otherwise — the failure this session spent an
        // afternoon fixing elsewhere, reintroduced by the fix.
        text: m.score < 0
          ? pickLine([
              `🎓 Done by people who do something near it: ${-m.score} renown less than a clean job.`,
              `🎓 Near enough to the discipline to try, not near enough to be paid for it: ${-m.score} renown short.`,
              `🎓 Nobody here is the person you would send. It shows, by ${-m.score} renown.`,
            ])
          : m.depth >= 3
            ? pickLine([
                `🎓 Three disciplines on one problem, none of them guessing: +${m.score} renown.`,
                `🎓 Everything this asks for, the party happens to have brought: +${m.score} renown.`,
                `🎓 It is answered from three directions at once and stays answered: +${m.score} renown.`,
              ])
            : pickLine([
                `🎓 A second pair of hands that knows what it sees: +${m.score} renown.`,
                `🎓 Somebody checks the work who is qualified to: +${m.score} renown.`,
                `🎓 Not done alone, and better for it: +${m.score} renown.`,
              ]),
      });
    }

    if (result.taughtWayIn) {
      result.preps = result.preps || [];
      result.preps.push({
        source: 'the reading',
        text: pickLine([
          '🗝️ And the shape of the place gives itself away: something sealed below will open to this.',
          '🗝️ Whoever built this had habits, and the party has just learned one of them.',
          '🗝️ The trick of the place is understood now. Somewhere below is a door that does not know that yet.',
        ]),
      });
    }

    if (result.preps?.length) {
      // Lead lines the composer prints outside the preps array are card
      // promises too, and spend the same budget (Narrator.js editPreps)
      const reserved = (result.spell ? 1 : 0)
        + (result.itemActions?.some(a => a.opening || a.vsUndead || a.summonAttack) ? 1 : 0);
      const edited = editPreps(result.preps, reserved);
      if (edited.folded.length) {
        this.pendingLedger.push(...edited.folded.map(p => p.text));
        result.preps = edited.inline;
        result.foldedPreps = edited.folded.length;
      }
    }
    // Where the party stood, so the renderer can draw what the maths did
    if (result.formation) this.lastFormation = result.formation;

    // Anyone who walked in alive and didn't walk out. The march's own
    // dead were reported above, so they are excluded rather than counted
    // twice (marchDead is captured before the room, not after).
    const fallen = livingBefore.filter(m => !m.isAlive() && !marchDead.has(m.name));

    if (result.success !== false || room.cleared) this.roomsCleared++;

    this.lastNarration = {
      turn: this.turn,
      room: room.type,
      icon: room.icon,
      roomIndex: roomIdx,          // array index, for the renderer's effects
      action: chosen,
      // Everything the party could have done here. The deliberation
      // prints two of them; the record keeps all of them, which is what
      // tools/census.mjs reads to tell an option nobody is offered from
      // an option nobody takes.
      offered: options.map(o => o.id),
      spellElement: result.spellElement || null,   // colors the strike FX
      predicament,
      deliberation: composeDeliberation(chosen, options, this.party),
      resolution: composeResolution(room, chosen, result, this.party),
      falls: [...marchFalls, ...fallLines(this.party, fallen)],
      wounds: this.party.members
        .filter(m => m.isAlive() && m.wounds > (woundsBefore.get(m.name) ?? 0))
        .map(m => composeWound(m, personalityModifiers(this.party).woundNotes)),
      supply: this.party.supply,
      aside: [
        pointLine,
        linger
          ? (linger.cured
              ? '🐍 The cleric cures the lingering venom on the march: no damage taken.'
              : `🐍 The venom carried from the last room acts: ${linger.damage} damage taken on the march.`)
          : supplyLine,
      ].filter(Boolean).join(' ') || null,
    };

    // A key on a hook, a belt, or a body. Finding it is not a decision
    // — carrying it to the right door is (world/DungeonGen.js).
    if (room.key && this.party.isAlive()) {
      const took = this.party.takeKey(room.key);
      if (took) {
        const finder = this.party.living()[0]?.name || 'Somebody';
        this.lastNarration.aside = [this.lastNarration.aside, composeKeyFound(took, finder)]
          .filter(Boolean).join(' ');
        this.addLog(`🗝️ ${took.name} found.`);
      }
    }

    // A side passage? Secret doors must be noticed first; open ones
    // are a party vote. Taking one splices its rooms into the march.
    const branch = this.party.isAlive() ? this.dungeon.branchAt(roomIdx) : null;
    if (branch) {
      if (branch.secret) {
        if (detectSecretDoor(this.party)) {
          branch.consumed = true;
          for (const bi of branch.rooms) this.dungeon.rooms[bi].discovered = true;
          this.path.splice(this.roomIndex + 1, 0, ...branch.rooms);
          this.lastNarration.aside = [this.lastNarration.aside, composeSecretFound(this.party, branch)].filter(Boolean).join(' ');
          this.addLog('🕳️ A hidden door!');
        }
        // Unnoticed secrets stay secret — the branch may be found on a retreat pass
      } else if (branch.locked) {
        // Lock and key: the wing was sealed and the key was somewhere
        // back up the spine. Four ways through, and two of them are loud
        // (RoomEncounters.openLockedWing).
        branch.consumed = true;
        const opened = openLockedWing(this.party, branch.wing);
        if (opened.noisy) this.party.alarmed = true;   // the dungeon heard that
        if (opened.opened) {
          const going = decideDetour(this.party, undefined, branch.wing);
          if (going) this.path.splice(this.roomIndex + 1, 0, ...branch.rooms);
          const appeal = wingAppeal(this.party, branch.wing);
          this.lastNarration.aside = [
            this.lastNarration.aside,
            composeLockedWing(branch, opened),
            composeDetour(going, branch, going ? appeal.advocate : null),
          ].filter(Boolean).join(' ');
        } else {
          this.lastNarration.aside = [
            this.lastNarration.aside,
            composeLockedWing(branch, opened),
          ].filter(Boolean).join(' ');
        }
      } else {
        branch.consumed = true;
        const going = decideDetour(this.party, undefined, branch.wing);
        if (going) this.path.splice(this.roomIndex + 1, 0, ...branch.rooms);
        const appeal = wingAppeal(this.party, branch.wing);
        this.lastNarration.aside = [
          this.lastNarration.aside,
          composeDetour(going, branch, going ? appeal.advocate : null),
        ].filter(Boolean).join(' ');
      }
    }

    // A shaft in the floor: a shortcut that skips rooms for a fall.
    // Hidden ones must be spotted or they spot you.
    const trapdoor = this.party.isAlive() ? this.dungeon.trapdoorAt(roomIdx) : null;
    if (trapdoor) this.resolveTrapdoor(trapdoor);

    this.addLog(`${room.icon} Room ${this.roomIndex}: ${room.type} — ${chosen}`);

    // Retreating from a fight backs the party up a room to try again
    if (result.retreated) {
      this.roomIndex--;
    }

    // Death check
    if (!this.party.isAlive()) {
      this.finish(false);
      return;
    }

    // Boss down = victory
    if (room.type === ROOM_TYPES.BOSS && room.cleared) {
      this.party.addScore(Math.round(100 * this.scoreMultiplier));
      this.finish(true);
    }
  }

  /**
   * Resolve a trapdoor in the current room's floor. Found shafts are a
   * choice (skip rooms, take the fall, lose the loot between); unfound
   * ones are an accident that costs the same rooms and more damage.
   * Splices the skipped rooms out of the march.
   */
  resolveTrapdoor(trapdoor) {
    trapdoor.consumed = true;

    const toPos = this.path.indexOf(trapdoor.to);
    const skipped = toPos - this.roomIndex - 1;
    if (toPos <= this.roomIndex || skipped <= 0) return;   // the route already passed it

    // A shaft that goes through the floor says so: the party lands on
    // the next level down, and the stair it skipped stays unused.
    const fromFloor = this.dungeon.rooms[trapdoor.from]?.floor || 0;
    const toFloor = this.dungeon.rooms[trapdoor.to]?.floor || 0;
    const floorsDropped = Math.max(0, toFloor - fromFloor);

    const found = !trapdoor.secret || detectTrapdoor(this.party);
    let outcome;
    if (found) {
      outcome = decideTrapdoor(this.party) ? 'descend' : 'refused';
    } else {
      outcome = 'fell';
    }

    if (outcome === 'refused') {
      this.lastNarration.aside = [
        this.lastNarration.aside,
        composeTrapdoor({ outcome, finder: this.trapdoorFinder() }),
      ].filter(Boolean).join(' ');
      return;
    }

    // Roped down deliberately is half the drop; falling is the whole one
    const damage = outcome === 'descend'
      ? Math.max(1, Math.ceil(trapdoor.fall / 2))
      : trapdoor.fall;
    const livingBefore = this.party.living();
    this.party.takeDamage(damage);

    this.path.splice(this.roomIndex + 1, skipped);
    for (const idx of this.dungeon.rooms.map((_, i) => i)) {
      if (idx === trapdoor.to) this.dungeon.rooms[idx].discovered = true;
    }

    this.lastNarration.aside = [
      this.lastNarration.aside,
      composeTrapdoor({ outcome, rooms: skipped, damage, floors: floorsDropped, finder: this.trapdoorFinder() }),
    ].filter(Boolean).join(' ');
    this.lastNarration.falls = [
      ...(this.lastNarration.falls || []),
      ...fallLines(this.party, livingBefore.filter(m => !m.isAlive())),
    ];
    this.addLog(`🕳️ Trapdoor: ${skipped} room${skipped === 1 ? '' : 's'} skipped, ${damage} damage.`);

    if (!this.party.isAlive()) this.finish(false);
  }

  /** Who spotted the shaft — the rogue if there is one. */
  trapdoorFinder() {
    const rogue = this.party.living().find(m => m.class === CLASSES.ROGUE);
    return rogue ? rogue.name : (this.party.living()[0]?.name || 'Someone');
  }

  finish(victory) {
    this.gameOver = true;
    this.victory = victory;
    this.epitaph = victory
      ? composeVictory(this.party, this.roomsCleared, this.dungeon.theme)
      : composeWipe(this.party, this.roomsCleared, this.dungeon.theme);
    this.addLog(victory ? '🏆 The dungeon is beaten!' : '☠️ The party has fallen.');

    // Close the chapter with the tally the ending is read against
    this.chronicle.endDelve({
      victory,
      epitaph: this.epitaph,
      roomsCleared: this.roomsCleared,
      score: this.party.score,
      gold: this.party.gold,
      trophies: this.party.trophies.length,
      survivors: this.party.living().length,
      turns: this.turn,
    });
  }

  getState() {
    const clampedPos = Math.min(this.roomIndex, this.path.length - 1);
    return {
      turn: this.turn,
      roomIndex: this.roomIndex,
      currentRoomIndex: this.path[clampedPos],           // array index for the renderer
      floor: this.dungeon.rooms[this.path[clampedPos]]?.floor || 0,
      pathLength: this.path.length,
      knownIdxs: [...this.path.slice(0, this.roomIndex + 2), this.dungeon.spine[this.dungeon.spine.length - 1]],
      dungeon: this.dungeon,
      depth: this.depth,
      theme: {
        id: this.dungeon.theme.id,
        name: this.dungeon.theme.name,
        icon: this.dungeon.theme.icon,
        tagline: this.dungeon.theme.tagline,
      },
      condition: this.condition && this.condition.id !== 'none'
        ? { id: this.condition.id, name: this.condition.name, icon: this.condition.icon, text: this.condition.text }
        : null,
      party: {
        members: this.party.members.map(m => ({
          name: m.name, class: m.class, icon: m.icon,
          health: m.health, maxHealth: m.maxHealth,
          attack: m.attack, defense: m.defense, mind: m.mind,
          alive: m.isAlive(),
          wounds: m.wounds,
          effectiveMax: m.effectiveMax(),
          equipment: m.equipment.map(e => e.name),
          weaponMods: m.weaponMods.map(w => w.name),
        })),
        // Drafted beyond the cap of four: they wait in town (PARTY_CAP)
        reserve: this.party.reserve.map(m => ({
          name: m.name, class: m.class, icon: m.icon,
        })),
        supply: this.party.supply,
        gold: this.party.gold,
        score: this.party.score,
        materials: this.party.materials,
        poisonLinger: this.party.poisonLinger || 0,
        alarmed: !!this.party.alarmed,
        potions: this.party.potions.length,
        trophies: this.party.trophies.map(t => ({ name: t.name, icon: t.icon })),
        grimoire: this.party.grimoire.map(s => s.name),
        spellsLearned: this.party.spellsLearned,
        personalities: this.party.personalities,
        formation: this.lastFormation || 'line',
        tactics: activeTactics(this.party).map(t => ({ name: t.name, icon: t.icon })),
        dormantTactics: dormantTactics(this.party).map(d => composeDormant(d)),
      },
      gameOver: this.gameOver,
      victory: this.victory,
      epitaph: this.epitaph,
      narration: this.lastNarration,
      log: this.log.slice(-12),
    };
  }

  /** The saga so far, for saving, exporting, or reading later. */
  getChronicle() {
    return this.chronicle;
  }

  getRunResult() {
    return {
      score: this.party.score,
      gold: this.party.gold,
      roomsCleared: this.roomsCleared,
      turns: this.turn,
      victory: this.victory,
      survivors: this.party.living().length,
      partySize: this.party.members.length,
      spellsLearned: this.party.spellsLearned,
      trophies: this.party.trophies.length,
      epitaph: this.epitaph,
    };
  }

  setPaused(paused) {
    this.paused = paused;
  }
}
