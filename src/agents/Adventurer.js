/**
 * Adventurer — one drafted character in the party
 * Stats, class kit, assigned equipment, and personal state.
 */

import { CLASSES } from '../game/Cards.js';

export class Adventurer {
  constructor(card) {
    this.id = card.id;
    this.name = card.name;
    this.class = card.class;
    this.icon = card.icon;
    this.trait = card.trait || '';

    // Base stats from the card
    this.maxHealth = card.stats.health;
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

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0) this.alive = false;
  }

  heal(amount) {
    if (!this.alive) return;
    this.health = Math.min(this.maxHealth, this.health + amount);
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
