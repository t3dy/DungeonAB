/**
 * Campaign — the long game
 *
 * From the Megabase procgen chat: "Surviving teams carry their
 * equipment over to a progressively harder dungeon, after resting
 * and spending gold in town." The Party object persists across
 * dungeons — equipment, grimoire, potions, gold, score, scars.
 * The town heals for coin; the next dungeon is always meaner.
 */

import { Party } from '../agents/Party.js';
import { Simulator } from '../sim/Simulator.js';

export const TOWN_PRICES = {
  healPerHp: 2,     // gold per missing health point
  potion: 15,       // a healing draught, corked and honest
  piousDiscount: 0.75, // temples like the Devout
};

export class Campaign {
  constructor(draftPool, { seed = 'campaign', difficulty = 'medium' } = {}) {
    this.party = draftPool instanceof Party ? draftPool : new Party(draftPool);
    this.seed = seed;
    this.difficulty = difficulty;

    this.depth = 0;          // Incremented by each delve
    this.roomsCleared = 0;   // Cumulative across dungeons
    this.over = false;
    this.retired = false;
  }

  /**
   * Descend: build the next dungeon's simulator around the same
   * party. Each depth reuses the campaign seed so a campaign is
   * reproducible end to end.
   */
  nextDelve(theme = undefined) {
    if (this.over) return null;
    this.depth++;
    return new Simulator(this.party, `${this.seed}-depth-${this.depth}`, this.difficulty, {
      depth: this.depth,
      theme,
    });
  }

  /**
   * Bank a finished delve's rooms; wipe ends the campaign
   */
  recordDelve(sim) {
    this.roomsCleared += sim.roomsCleared;
    if (!sim.victory) this.over = true;
  }

  /* ---------------------------------------------------------------- */
  /* Town services — between dungeons, gold does the healing           */
  /* ---------------------------------------------------------------- */

  missingHealth() {
    return this.party.living()
      .reduce((sum, m) => sum + (m.maxHealth - m.health), 0);
  }

  healCost() {
    const base = this.missingHealth() * TOWN_PRICES.healPerHp;
    const rate = this.party.hasPersonality('pious') ? TOWN_PRICES.piousDiscount : 1;
    return Math.ceil(base * rate);
  }

  /**
   * Full heal for the living, if the purse allows.
   * Returns { healed, cost } or null if unaffordable / unneeded.
   */
  healAll() {
    const cost = this.healCost();
    const healed = this.missingHealth();
    if (healed === 0 || this.party.gold < cost) return null;
    this.party.gold -= cost;
    for (const m of this.party.living()) m.heal(m.maxHealth);
    return { healed, cost };
  }

  /**
   * Buy a healing draught for the satchel.
   * Returns true if bought.
   */
  buyPotion() {
    if (this.party.gold < TOWN_PRICES.potion) return false;
    this.party.gold -= TOWN_PRICES.potion;
    this.party.potions.push({ kind: 'healing-draught', heal: 6 });
    return true;
  }

  /**
   * Walk away with the score. Retiring is the campaign's victory.
   */
  retire() {
    this.over = true;
    this.retired = true;
  }

  getSummary() {
    return {
      depth: this.depth,
      score: this.party.score,
      gold: this.party.gold,
      roomsCleared: this.roomsCleared,
      survivors: this.party.living().length,
      partySize: this.party.members.length,
      spellsLearned: this.party.spellsLearned,
      retired: this.retired,
      over: this.over,
    };
  }
}
