/**
 * Adventurer — one drafted character in the party
 * Stats, class kit, assigned equipment, and personal state.
 */

import { CLASSES } from '../game/Cards.js';

/**
 * Attrition knobs. A blow of a quarter of your maximum health leaves a
 * wound; each wound costs two points off the ceiling healing can reach,
 * and no ceiling falls below a third of the body.
 */
export const WOUND_THRESHOLD = 0.25;
export const WOUND_COST = 2;

/**
 * A stable handle for one body in the party.
 *
 * Not the card id — a party can hold two Sister Benedictas — and not
 * the name, because the player may rename anybody at any time, and a
 * working assigned to "Melchior" must not come unstuck the moment its
 * caster is renamed. Counted per session; saves carry it.
 */
let nextUid = 1;

export class Adventurer {
  constructor(card) {
    this.uid = `adv-${nextUid++}`;
    this.id = card.id;
    // The card an adventurer was drafted from, kept because their
    // capabilities live on it. Party.capabilities() reads
    // `member.card?.capabilities`, so without this the whole capability
    // system reads an empty set and every gated option silently
    // disappears — the optional chaining hides it rather than throwing.
    this.card = card;
    this.name = card.name;
    this.cardName = card.name;      // what the card called them, before any rename
    this.class = card.class;
    this.icon = card.icon;
    this.trait = card.trait || '';

    // Who the player says this is. A drafted card arrives with a name
    // and a trait line; the player may keep them, rename the character,
    // or write their own history. Both travel with the party through
    // saves and both are read back in the saga (narrative/Chronicle.js).
    this.givenName = null;      // set only when the player renames
    this.backstory = '';

    // Base stats from the card
    this.maxHealth = card.stats.health;
    // Scars carried through the delve (see takeDamage)
    this.wounds = 0;
    this.woundBias = 0;      // set by the party's temper (Party.applyTemper)
    this.health = card.stats.health;
    this.baseAttack = card.stats.attack;
    this.baseDefense = card.stats.defense;
    this.baseMind = card.stats.mind;

    // Equipment assigned by the party (slot → card)
    this.equipment = [];

    // Alchemy weapon mods (alchemist-applied)
    this.weaponMods = [];

    this.alive = true;
  }

  /* Effective stats include equipment bonuses and weapon mods */

  get attack() {
    let v = this.baseAttack;
    for (const eq of this.equipment) v += eq.bonus?.attack || 0;
    for (const mod of this.weaponMods) v += mod.attack || 0;
    return v;
  }

  get defense() {
    let v = this.baseDefense;
    for (const eq of this.equipment) v += eq.bonus?.defense || 0;
    return v;
  }

  get mind() {
    let v = this.baseMind;
    for (const eq of this.equipment) v += eq.bonus?.mind || 0;
    return v;
  }

  /**
   * A blow that nearly drops someone leaves a wound: a permanent-for-
   * the-delve dent in what healing can restore.
   *
   * This is the damage half of dungeon attrition. Without it the march
   * is free — measured, a party arrived at the throne holding 90% of
   * its health pool after ten rooms, which is why every card whose job
   * is to make ordinary rooms safer was worthless (DESIGN_DIALOGUE.md
   * §10). Wounds make the trip cumulative: you can heal back to your
   * ceiling, but the ceiling comes down.
   */
  takeDamage(amount) {
    const wasAbove = this.health > this.woundFloor();
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0) { this.alive = false; return; }
    // Crossing a quarter of your body's worth in one blow scars — and
    // the party's temper decides how far that quarter stretches: the
    // Devout tend what opens, the Reckless never stop to bind anything
    // (game/Personalities.js)
    const bar = this.maxHealth * WOUND_THRESHOLD * (1 + (this.woundBias || 0));
    if (wasAbove && amount >= bar) this.wounds++;
  }

  /** The lowest a wounded ceiling can fall — never below a third. */
  woundFloor() {
    return Math.ceil(this.maxHealth / 3);
  }

  /**
   * What healing can actually restore to, after wounds. Each wound
   * costs WOUND_COST of the ceiling, down to the floor.
   */
  effectiveMax() {
    return Math.max(this.woundFloor(), this.maxHealth - this.wounds * WOUND_COST);
  }

  heal(amount) {
    if (!this.alive) return;
    this.health = Math.min(this.effectiveMax(), this.health + amount);
  }

  /** Town, and a shrine tended by a cleric, mend what the delve broke. */
  mendWounds(n = Infinity) {
    this.wounds = Math.max(0, this.wounds - n);
  }

  /**
   * Everything that must survive a save: the card it was built from,
   * plus the marks the delve left on it.
   *
   * Kit is stored WHOLE rather than by id. Ids alone looked tidier and
   * silently lost anything the draft pool has never heard of -- a
   * scroll picked up in a library is filed as `found-sp-fear-1`, and a
   * dead adventurer's belt buckle as `found-buckle`, and neither
   * resolves. On load the id is still preferred when the pool knows it,
   * so rebalances reach saved parties; the stored copy is the fallback,
   * not the default.
   */
  toJSON() {
    return {
      uid: this.uid, id: this.id, name: this.name,
      givenName: this.givenName, backstory: this.backstory,
      health: this.health, wounds: this.wounds, alive: this.alive,
      equipment: this.equipment.map(e => ({ ...e })),
      weaponMods: this.weaponMods.map(w => ({ ...w })),
    };
  }

  /**
   * The player renames a character. An empty name gives the card's own
   * name back rather than leaving a nameless adventurer in the roster.
   */
  rename(name) {
    const trimmed = String(name || '').trim().slice(0, 40);
    this.givenName = trimmed || null;
    this.name = trimmed || this.cardName;
    return this.name;
  }

  /** A line the player wrote about who this is. */
  setBackstory(text) {
    this.backstory = String(text || '').trim().slice(0, 400);
    return this.backstory;
  }

  /** Restore onto a freshly built Adventurer. */
  restore(saved, lookup = () => null) {
    if (!saved) return this;
    this.uid = saved.uid || this.uid;
    this.name = saved.name ?? this.name;
    this.givenName = saved.givenName ?? null;
    this.backstory = saved.backstory || '';
    this.health = Math.min(this.maxHealth, saved.health ?? this.health);
    this.wounds = saved.wounds ?? 0;
    this.alive = saved.alive !== false;
    const rehydrate = c => (c && (lookup(c.id) || c)) || null;
    this.equipment = (saved.equipment || []).map(rehydrate).filter(Boolean);
    this.weaponMods = (saved.weaponMods || []).map(rehydrate).filter(Boolean);
    return this;
  }

  isAlive() {
    return this.alive && this.health > 0;
  }

  equip(card) {
    this.equipment.push(card);
  }

  addWeaponMod(mod) {
    this.weaponMods.push(mod);
  }
}

/**
 * The free commoner granted when a draft ends with zero characters —
 * no dead runs (Boss Monster lesson: gradient outcomes, not brick walls)
 */
export function makeTavernVolunteer() {
  return new Adventurer({
    id: 'char-volunteer',
    name: 'Pip the Tavern Volunteer',
    class: CLASSES.FIGHTER,
    icon: '🍺',
    stats: { health: 10, attack: 2, defense: 1, mind: 2 },
    trait: 'Nobody drafted a hero, so Pip grabbed a stool leg and came along.',
  });
}
