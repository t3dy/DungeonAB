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
import { SeededRandom } from '../draft/PackDraft.js';
import { CHARACTER_CARDS } from '../game/Cards.js';

export const TOWN_PRICES = {
  healPerHp: 2,     // gold per missing health point
  potion: 15,       // a healing draught, corked and honest
  piousDiscount: 0.75, // temples like the Devout
  forge: 20,        // the smith's fee, before depth
  forgeMod: { name: "smith's edge", attack: 2 }, // what sharpening buys
};

/** The gold a recruit asks for, by their worth and how deep you are. */
export function hireCost(card, depth = 1) {
  const s = card.stats;
  const worth = s.health + s.attack * 2 + s.defense * 2 + s.mind;
  return Math.round((12 + worth) * (1 + 0.15 * (depth - 1)));
}

export class Campaign {
  constructor(draftPool, { seed = 'campaign', difficulty = 'medium', condition = 'none' } = {}) {
    this.party = draftPool instanceof Party ? draftPool : new Party(draftPool);
    this.seed = seed;
    this.difficulty = difficulty;
    this.condition = condition;   // the wager, applied to every delve

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
      condition: this.condition,
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

  /* ---------------------------------------------------------------- */
  /* The hiring board — replace the fallen, or just grow bolder        */
  /* ---------------------------------------------------------------- */

  /**
   * Two adventurers looking for work, priced for the current depth.
   * Deterministic per (seed, depth) and stable across re-renders, so
   * the board doesn't reshuffle every time the town screen redraws.
   */
  recruitOffers() {
    if (this._recruitDepth !== this.depth) {
      const rng = new SeededRandom(`${this.seed}-hire-${this.depth}`);
      const shuffled = rng.shuffle(CHARACTER_CARDS);
      this._recruitDepth = this.depth;
      this._recruitOffers = shuffled.slice(0, 2).map(card => ({
        card,
        cost: hireCost(card, this.depth),
      }));
    }
    return this._recruitOffers.filter(o => o); // holes left by hires
  }

  /**
   * Hire a candidate from the board. Returns the new member, or null
   * if unaffordable / not on offer.
   */
  recruit(cardId) {
    const offers = this.recruitOffers();
    const idx = offers.findIndex(o => o && o.card.id === cardId);
    if (idx === -1) return null;
    const { card, cost } = offers[idx];
    if (this.party.gold < cost) return null;
    this.party.gold -= cost;
    const member = this.party.addMember(card);
    // Remove from the board (mark the slot spent)
    const realIdx = this._recruitOffers.findIndex(o => o && o.card.id === cardId);
    this._recruitOffers[realIdx] = null;
    return member;
  }

  /* ---------------------------------------------------------------- */
  /* The blacksmith — sharpen a weapon (safe per-adventurer mod)       */
  /* ---------------------------------------------------------------- */

  forgeCost() {
    return TOWN_PRICES.forge + (this.depth - 1) * 4;
  }

  /**
   * Sharpen the hardest hitter's weapon: a permanent +attack mod that
   * rides on the adventurer (never touches shared card definitions).
   * Returns { target, mod } or null if unaffordable / no one to arm.
   */
  forge() {
    const cost = this.forgeCost();
    const living = this.party.living();
    if (living.length === 0 || this.party.gold < cost) return null;
    this.party.gold -= cost;
    const target = living.reduce((a, b) => (a.attack >= b.attack ? a : b));
    const mod = { ...TOWN_PRICES.forgeMod };
    target.addWeaponMod(mod);
    return { target: target.name, mod };
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
