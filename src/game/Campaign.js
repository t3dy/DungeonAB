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
import { CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS } from '../game/Cards.js';
import { costCard } from '../game/Costing.js';

export const TOWN_PRICES = {
  healPerHp: 2,     // gold per missing health point
  potion: 15,       // a healing draught, corked and honest
  piousDiscount: 0.75, // temples like the Devout
  forge: 20,        // the smith's fee, before depth
  forgeMod: { name: "smith's edge", attack: 2 }, // what sharpening buys
  // What the quartermaster charges, mapped off what a card is worth.
  // Priced against the rest of the town: a party leaves a delve with a
  // median of 67 gold, a hire asks 42, and a full heal is about 7
  // because wounds do not mend for coin. So kit runs 35-140 and a town
  // visit buys roughly one thing.
  //
  // Not a flat multiple of the cost model: its totals run 2.5 to 60,
  // because a per-round effect is worth twelve times a one-shot, and a
  // flat markup priced Fireball at 388 gold and the lockpicks at 22.
  // The curve compresses that into a range a purse can reach.
  shopBase: 35,
  shopPerWorth: 1.8,
};

/**
 * What the quartermaster asks for a piece of kit.
 *
 * Priced off the cost model rather than by hand, so a shop stocking a
 * new card charges for what the card actually does (game/Costing.js) —
 * and deepens with the campaign, because a shop this far down is the
 * only shop there is.
 */
export function shopPrice(card, depth = 1) {
  const worth = Math.max(1, costCard(card).total);
  const price = TOWN_PRICES.shopBase + worth * TOWN_PRICES.shopPerWorth;
  return Math.round(price * (1 + 0.12 * (depth - 1)));
}

/** The gold a recruit asks for, by their worth and how deep you are. */
export function hireCost(card, depth = 1) {
  const s = card.stats;
  const worth = s.health + s.attack * 2 + s.defense * 2 + s.mind;
  return Math.round((12 + worth) * (1 + 0.15 * (depth - 1)));
}

export class Campaign {
  constructor(draftPool, { seed = 'campaign', difficulty = 'medium', condition = 'none', layout = null } = {}) {
    this.party = draftPool instanceof Party ? draftPool : new Party(draftPool);
    this.seed = seed;
    this.difficulty = difficulty;
    this.condition = condition;   // the wager, applied to every delve
    this.layout = layout;         // an archived/edited dungeon for depth 1

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
      layout: this.depth === 1 ? this.layout : null,   // deeper floors generate fresh
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
    // Town is where the delve's scars are actually worked out: the
    // surgeon sets what the march only bandaged, so wounds clear before
    // the healing is applied (Adventurer.mendWounds).
    const scarred = this.party.living().filter(m => m.wounds > 0);
    const mended = {
      wounds: scarred.reduce((sum, m) => sum + m.wounds, 0),
      names: scarred.map(m => m.name),
    };
    for (const m of this.party.living()) {
      m.mendWounds();
      m.heal(m.maxHealth);
    }
    return { healed, cost, mended };
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
  /* The quartermaster — a shop with a stock, not a vending machine    */
  /* ---------------------------------------------------------------- */

  /**
   * Three pieces of kit for sale, priced by what they do and how deep
   * the campaign has gone. Deterministic per (seed, depth) and stable
   * across re-renders, and it never offers what the party already
   * carries: a second Tower Shield is not a shop, it is a bug.
   */
  shopOffers() {
    if (this._shopDepth !== this.depth) {
      const rng = new SeededRandom(`${this.seed}-shop-${this.depth}`);
      const held = new Set([
        ...this.party.members.flatMap(m => m.equipment.map(e => e.id)),
        ...this.party.reserve.flatMap(m => m.equipment.map(e => e.id)),
        ...this.party.pack.map(e => e.id),
        ...this.party.grimoire.map(s => s.id),
      ]);
      const stock = [...EQUIPMENT_CARDS, ...SPELL_CARDS]
        .filter(c => !held.has(c.id) && !c.cursed);
      this._shopOffers = rng.shuffle(stock).slice(0, 3).map(card => ({
        card,
        price: shopPrice(card, Math.max(1, this.depth)),
      }));
      this._shopDepth = this.depth;
    }
    return this._shopOffers.filter(o => o);
  }

  /**
   * Buy one. Equipment goes to a named member if the caller says so,
   * and to best fit otherwise; a working joins the grimoire. Returns
   * { card, price, wearer } or null when the purse says no.
   */
  buyFromShop(cardId, memberName = null) {
    const offers = this.shopOffers();
    const offer = offers.find(o => o.card.id === cardId);
    if (!offer || this.party.gold < offer.price) return null;

    this.party.gold -= offer.price;
    const card = { ...offer.card };
    let wearer = null;
    if (card.type === 'spell') {
      this.party.grimoire.push({ ...card, source: 'bought' });
    } else if (memberName) {
      this.party.pack.push(card);
      wearer = this.party.equipTo(card.id, memberName)?.to || null;
      if (!wearer) wearer = this.party.assignEquipment(card);
    } else {
      wearer = this.party.assignEquipment(card);
    }
    const at = this._shopOffers.findIndex(o => o && o.card.id === cardId);
    this._shopOffers[at] = null;      // sold: the shop had one
    return { card, price: offer.price, wearer };
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
   * Call up a reserve adventurer to fill a dead one's place. Free —
   * they were drafted and have been waiting in town. Returns the
   * promoted adventurer, or null if the party is full or empty-benched.
   */
  callUpReserve() {
    return this.party.promoteReserve();
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
      trophies: this.party.trophies.length,
      retired: this.retired,
      over: this.over,
    };
  }
}
