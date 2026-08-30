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
import { CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, CLASSES } from '../game/Cards.js';
import { costCard } from '../game/Costing.js';
import { TownState } from './TownState.js';
import { Providence } from './Providence.js';
import { readOmens } from './Divination.js';
import { generateDungeon } from '../world/DungeonGen.js';
import { getEncounter, evaluateOptions, resolveEncounterOption } from '../encounters/EncounterEngine.js';
import { offerTownEncounters } from '../encounters/TownEncounters.js';

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

    // The world's two long memories: the town remembers what the party
    // did to it, and Providence remembers what the player said the
    // party was trying to become. Both ride the campaign across depths.
    this.town = new TownState();
    this.providence = new Providence();
  }

  /** The seed of the dungeon at a given depth — one definition, used everywhere. */
  delveSeed(depth = this.depth + 1) {
    return `${this.seed}-depth-${depth}`;
  }

  /**
   * Descend: build the next dungeon's simulator around the same
   * party. Each depth reuses the campaign seed so a campaign is
   * reproducible end to end.
   */
  nextDelve(theme = undefined) {
    if (this.over) return null;
    this.depth++;
    return new Simulator(this.party, this.delveSeed(this.depth), this.difficulty, {
      depth: this.depth,
      theme,
      condition: this.condition,
      layout: this.depth === 1 ? this.layout : null,   // deeper floors generate fresh
      providence: this.providence,
    });
  }

  /* ---------------------------------------------------------------- */
  /* Divination — read the next descent before committing to it        */
  /* ---------------------------------------------------------------- */

  /**
   * Generate the dungeon the party is ABOUT to enter, and read it.
   * Generation is deterministic from (seed, depth), so previewing costs
   * nothing and changes nothing — nextDelve() rebuilds the same
   * dungeon. A party with no divination gets the blind reading, which
   * is the point: information is a thing you draft for.
   */
  previewNextDelve(theme = undefined) {
    if (this.over) return null;
    const nextDepth = this.depth + 1;
    // An archived layout is the player's own dungeon; nothing to foresee
    if (nextDepth === 1 && this.layout) return null;
    const dungeon = generateDungeon(this.delveSeed(nextDepth), this.difficulty, {
      wantLab: this.party.hasClass(CLASSES.ALCHEMIST),
      theme,
      depth: nextDepth,
      condition: this.condition,
      providence: this.providence,
    });
    return readOmens(this.party, dungeon);
  }

  /* ---------------------------------------------------------------- */
  /* Town encounters — the social half of the loop                     */
  /* ---------------------------------------------------------------- */

  /**
   * The situations this visit puts in front of the party. Stable per
   * (seed, depth), like the hiring board, so the screen doesn't
   * reshuffle on every re-render.
   */
  townOffers() {
    if (this._offerDepth !== this.depth) {
      const rng = new SeededRandom(`${this.seed}-town-${this.depth}`);
      this._offerDepth = this.depth;
      this._townOffers = offerTownEncounters(this.town, rng, {
        count: 2,
        favored: this.providence.favoredEncounters(),
      }).map(def => def.id);
    }
    return this._townOffers.map(id => getEncounter(id)).filter(Boolean);
  }

  /** The context a town encounter reads. */
  townContext() {
    return { type: 'town', town: this.town, party: this.party, depth: this.depth };
  }

  /** The options a town situation currently offers this party. */
  townOptions(encounterId) {
    const def = getEncounter(encounterId);
    if (!def) return [];
    return evaluateOptions(def, this.party, this.townContext());
  }

  /**
   * Take an option in a town situation. Mutates the party and the
   * town's memory. Returns the result, or null if the situation isn't
   * on offer or the option isn't available to this party.
   */
  resolveTownOption(encounterId, optionId) {
    const def = getEncounter(encounterId);
    if (!def) return null;
    if (!this.townOffers().some(d => d.id === encounterId)) return null;
    if (!this.townOptions(encounterId).some(o => o.id === optionId)) return null;

    const result = resolveEncounterOption(def, optionId, this.party, this.townContext());
    if (def.once) this.town.markResolved(def.id);
    this._townOffers = this._townOffers.filter(id => id !== encounterId);

    // Providence notes when the world tested a destiny it arranged
    if (this.providence.favoredEncounters().includes(encounterId)) {
      const destiny = this.providence.destinies[0];
      if (destiny) {
        this.providence.recordTest(destiny.characterId,
          `${def.title} — the world put ${destiny.characterName}'s destiny in their way.`);
      }
    }
    return result;
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
    // Reputation is money: the town charges what it thinks of you
    return Math.ceil(base * rate * this.town.priceMultiplier());
  }

  /** What a potion costs this party, in this town, today. */
  potionCost() {
    return Math.ceil(TOWN_PRICES.potion * this.town.priceMultiplier());
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
    const cost = this.potionCost();
    if (this.party.gold < cost) return false;
    this.party.gold -= cost;
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
    // The guild sets the smith's price, and the guild has an opinion
    return Math.ceil((TOWN_PRICES.forge + (this.depth - 1) * 4) * this.town.priceMultiplier());
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
      town: this.town.summary(),
      providence: this.providence.summary(),
    };
  }
}
