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
import { CLASSES } from '../game/Cards.js';
import {
  getRoomOptions, decideRoomAction, resolveRoomAction,
  detectSecretDoor, decideDetour,
} from '../encounters/RoomEncounters.js';
import {
  composePredicament, composeDeliberation, composeResolution,
  composeWipe, composeVictory, composeFall,
  composeSecretFound, composeDetour,
} from '../narrative/Narrator.js';

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
        });
    this.condition = this.dungeon.condition;

    // The march order: the spine to start with. Detours into side
    // branches splice their rooms in as the party discovers and
    // chooses them (procgen v2).
    this.path = this.dungeon.spine.slice();
    this.roomIndex = 0;   // Position along the path (entrance = 0)
    this.turn = 0;
    this.roomsCleared = 0;
    this.gameOver = false;
    this.victory = false;
    this.paused = false;
    this.epitaph = null;
    this.lastNarration = null;
    this.log = [];

    // Score multiplier: difficulty (mirrors SnakeAB progression), then
    // the condition's wager on top — a meaner dungeon pays out more.
    const base = { easy: 1, medium: 1.5, hard: 2, nightmare: 3 }[difficulty] || 1;
    this.scoreMultiplier = base * (1 + (this.condition?.scoreBonus || 0));
  }

  addLog(message) {
    this.log.push(message);
  }

  /**
   * One tick = one room entered, decided, resolved
   */
  tick() {
    if (this.paused || this.gameOver) return;

    this.turn++;
    this.roomIndex++;

    const roomIdx = this.path[this.roomIndex];
    const room = roomIdx !== undefined ? this.dungeon.getRoom(roomIdx) : null;
    if (!room) {
      // Walked off the end without a boss?? Treat as victory.
      this.finish(true);
      return;
    }

    // Between-room recovery
    this.party.restStep();

    // Poison taken last room works now (the venomous are patient)
    const livingBefore = this.party.living();
    const linger = this.party.applyLinger();
    if (linger && !this.party.isAlive()) {
      // The venom finishes what the fight started
      this.lastNarration = {
        room: room.type, icon: room.icon, roomIndex: roomIdx, action: 'linger',
        predicament: composePredicament(room, this.dungeon.theme),
        deliberation: 'The lingering venom acts before anything can be decided.',
        resolution: `🐍 The venom carried from the last fight deals ${linger.damage} damage, and the last of the party falls.`,
        falls: livingBefore.filter(m => !m.isAlive()).map(m => composeFall(m)),
        aside: null,
      };
      this.finish(false);
      return;
    }

    // The room, decided and resolved
    const predicament = composePredicament(room, this.dungeon.theme);
    const options = getRoomOptions(room, this.party);
    const chosen = decideRoomAction(room, this.party);
    const result = resolveRoomAction(room, this.party, chosen);
    this.lastResult = result;   // structured outcome, for analytics/mining

    // Anyone who walked in alive and didn't walk out gets their beat
    const fallen = livingBefore.filter(m => !m.isAlive());

    if (result.success !== false || room.cleared) this.roomsCleared++;

    this.lastNarration = {
      room: room.type,
      icon: room.icon,
      roomIndex: roomIdx,          // array index, for the renderer's effects
      action: chosen,
      spellElement: result.spellElement || null,   // colors the strike FX
      predicament,
      deliberation: composeDeliberation(chosen, options, this.party),
      resolution: composeResolution(room, chosen, result, this.party),
      falls: fallen.map(m => composeFall(m)),
      aside: linger
        ? (linger.cured
            ? '🐍 The cleric cures the lingering venom on the march: no damage taken.'
            : `🐍 The venom carried from the last room acts: ${linger.damage} damage taken on the march.`)
        : null,
    };

    // A side passage? Secret doors must be noticed first; open ones
    // are a party vote. Taking one splices its rooms into the march.
    const branch = this.party.isAlive() ? this.dungeon.branchAt(roomIdx) : null;
    if (branch) {
      if (branch.secret) {
        if (detectSecretDoor(this.party)) {
          branch.consumed = true;
          for (const bi of branch.rooms) this.dungeon.rooms[bi].discovered = true;
          this.path.splice(this.roomIndex + 1, 0, ...branch.rooms);
          this.lastNarration.aside = [this.lastNarration.aside, composeSecretFound(this.party)].filter(Boolean).join(' ');
          this.addLog('🕳️ A hidden door!');
        }
        // Unnoticed secrets stay secret — the branch may be found on a retreat pass
      } else {
        branch.consumed = true;
        const going = decideDetour(this.party);
        if (going) this.path.splice(this.roomIndex + 1, 0, ...branch.rooms);
        this.lastNarration.aside = [this.lastNarration.aside, composeDetour(going)].filter(Boolean).join(' ');
      }
    }

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

  finish(victory) {
    this.gameOver = true;
    this.victory = victory;
    this.epitaph = victory
      ? composeVictory(this.party, this.roomsCleared, this.dungeon.theme)
      : composeWipe(this.party, this.roomsCleared, this.dungeon.theme);
    this.addLog(victory ? '🏆 The dungeon is beaten!' : '☠️ The party has fallen.');
  }

  getState() {
    const clampedPos = Math.min(this.roomIndex, this.path.length - 1);
    return {
      turn: this.turn,
      roomIndex: this.roomIndex,
      currentRoomIndex: this.path[clampedPos],           // array index for the renderer
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
          equipment: m.equipment.map(e => e.name),
          weaponMods: m.weaponMods.map(w => w.name),
        })),
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
      },
      gameOver: this.gameOver,
      victory: this.victory,
      epitaph: this.epitaph,
      narration: this.lastNarration,
      log: this.log.slice(-12),
    };
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
