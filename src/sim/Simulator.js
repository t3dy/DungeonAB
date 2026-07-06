/**
 * Simulator — the auto-crawl loop
 *
 * The drafted party descends room by room. Each tick: enter the
 * next room, decide (personality-weighted), resolve (gradient),
 * narrate, march on. Clerics mend between rooms; alchemists brew
 * when the dungeon provides.
 */

import { generateDungeon, ROOM_TYPES } from '../world/DungeonGen.js';
import { Party } from '../agents/Party.js';
import { CLASSES } from '../game/Cards.js';
import {
  getRoomOptions, decideRoomAction, resolveRoomAction,
} from '../encounters/RoomEncounters.js';
import {
  composePredicament, composeDeliberation, composeResolution,
  composeWipe, composeVictory, composeFall,
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
    this.dungeon = generateDungeon(seed, difficulty, {
      wantLab: this.party.hasClass(CLASSES.ALCHEMIST),
      theme: opts.theme,
      depth: this.depth,
      condition: opts.condition,
    });
    this.condition = this.dungeon.condition;

    this.roomIndex = 0;   // Currently at the entrance
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

    const room = this.dungeon.getRoom(this.roomIndex);
    if (!room) {
      // Walked off the end without a boss?? Treat as victory.
      this.finish(true);
      return;
    }

    // Between-room recovery
    this.party.restStep();

    // The room, decided and resolved
    const predicament = composePredicament(room, this.dungeon.theme);
    const options = getRoomOptions(room, this.party);
    const chosen = decideRoomAction(room, this.party);
    const livingBefore = this.party.living();
    const result = resolveRoomAction(room, this.party, chosen);

    // Anyone who walked in alive and didn't walk out gets their beat
    const fallen = livingBefore.filter(m => !m.isAlive());

    if (result.success !== false || room.cleared) this.roomsCleared++;

    this.lastNarration = {
      room: room.type,
      icon: room.icon,
      roomIndex: this.roomIndex,   // where it happened (pre-retreat)
      action: chosen,              // for the renderer's effects
      predicament,
      deliberation: composeDeliberation(chosen, options, this.party),
      resolution: composeResolution(room, chosen, result, this.party),
      falls: fallen.map(m => composeFall(m)),
    };

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
    return {
      turn: this.turn,
      roomIndex: this.roomIndex,
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
        potions: this.party.potions.length,
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
      epitaph: this.epitaph,
    };
  }

  setPaused(paused) {
    this.paused = paused;
  }
}
