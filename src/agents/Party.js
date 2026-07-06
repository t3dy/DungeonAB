/**
 * Party — the drafted band of adventurers
 *
 * Built from the player's draft pool: characters become the roster,
 * equipment auto-assigns to best-fit members, spells go into the
 * shared grimoire, personalities bias every group decision.
 */

import { CARD_TYPES, CLASSES } from '../game/Cards.js';
import { Adventurer, makeTavernVolunteer } from './Adventurer.js';

export class Party {
  constructor(pool) {
    // Roster from drafted character cards. The same hero card can
    // be opened in two packs — duplicates get ordinals ("the Second"),
    // as is traditional in adventuring families.
    const nameCounts = {};
    this.members = pool
      .filter(c => c.type === CARD_TYPES.CHARACTER)
      .map(c => {
        const adventurer = new Adventurer(c);
        nameCounts[c.name] = (nameCounts[c.name] || 0) + 1;
        if (nameCounts[c.name] > 1) {
          const ordinals = ['', 'the Second', 'the Third', 'the Fourth', 'the Fifth', 'the Umpteenth'];
          const ord = ordinals[Math.min(nameCounts[c.name] - 1, 5)];
          adventurer.name = `${c.name}, ${ord}`;
        }
        return adventurer;
      });

    // No dead runs: an empty roster gets Pip
    if (this.members.length === 0) {
      this.members.push(makeTavernVolunteer());
    }

    // Shared grimoire (spell cards; consumed per-use unless a wizard lives)
    this.grimoire = pool.filter(c => c.type === CARD_TYPES.SPELL).map(c => ({ ...c }));

    // Personality archetypes (party-wide)
    this.personalities = pool
      .filter(c => c.type === CARD_TYPES.PERSONALITY)
      .map(c => c.archetype);

    // Auto-assign equipment to best-fit members
    const equipment = pool.filter(c => c.type === CARD_TYPES.EQUIPMENT);
    for (const eq of equipment) {
      this.assignEquipment(eq);
    }

    // Alchemy satchel: materials gathered in the dungeon
    this.materials = 0;
    this.potions = [];

    // Run state
    this.gold = 0;
    this.score = 0;
    this.spellsLearned = 0;
    this.encounterHistory = {};
  }

  /**
   * Equipment goes to the best-fit living member: class match first,
   * then whoever has the fewest pieces
   */
  assignEquipment(eqCard) {
    const living = this.living();
    if (living.length === 0) return;

    let target = null;
    if (eqCard.bestFor) {
      const matches = living.filter(m => m.class === eqCard.bestFor);
      if (matches.length > 0) {
        target = matches.reduce((a, b) => a.equipment.length <= b.equipment.length ? a : b);
      }
    }
    if (!target) {
      target = living.reduce((a, b) => a.equipment.length <= b.equipment.length ? a : b);
    }
    target.equip(eqCard);
  }

  living() {
    return this.members.filter(m => m.isAlive());
  }

  /**
   * Enlist a new adventurer (a town recruit). Duplicate names get an
   * ordinal, same as at draft time. Returns the new member.
   */
  addMember(card) {
    const adventurer = new Adventurer(card);
    const sameName = this.members.filter(m => m.name.startsWith(card.name)).length;
    if (sameName > 0) {
      const ordinals = ['', 'the Second', 'the Third', 'the Fourth', 'the Fifth', 'the Umpteenth'];
      adventurer.name = `${card.name}, ${ordinals[Math.min(sameName, 5)]}`;
    }
    this.members.push(adventurer);
    return adventurer;
  }

  isAlive() {
    return this.living().length > 0;
  }

  size() {
    return this.living().length;
  }

  hasClass(cls) {
    return this.living().some(m => m.class === cls);
  }

  hasPersonality(archetype) {
    return this.personalities.includes(archetype);
  }

  /* -------------------------------------------------------------- */
  /* Aggregate stats — the party fights as a unit                    */
  /* -------------------------------------------------------------- */

  totalAttack() {
    return this.living().reduce((sum, m) => sum + m.attack, 0);
  }

  /**
   * Attack that actually lands in a dungeon fight: corridor frontage.
   * Only about five blades can work at once — the five hardest
   * hitters swing freely, everyone behind contributes a quarter
   * (thrown daggers, shouted advice, the occasional shove).
   */
  combatAttack() {
    const attackers = this.living()
      .map(m => m.attack)
      .sort((a, b) => b - a);
    const front = attackers.slice(0, 5).reduce((s, a) => s + a, 0);
    const rear = attackers.slice(5).reduce((s, a) => s + a, 0);
    return Math.round(front + rear * 0.25);
  }

  totalDefense() {
    return this.living().reduce((sum, m) => sum + m.defense, 0);
  }

  bestMind() {
    return Math.max(0, ...this.living().map(m => m.mind));
  }

  totalHealth() {
    return this.living().reduce((sum, m) => sum + m.health, 0);
  }

  totalMaxHealth() {
    return this.members.reduce((sum, m) => sum + m.maxHealth, 0);
  }

  /**
   * Class-keyed item actions: the same item does different work in
   * different hands. Each living member contributes the action their
   * class unlocks on each classActions item they carry.
   */
  combatItemActions() {
    const actions = [];
    for (const member of this.living()) {
      for (const eq of member.equipment) {
        const action = eq.classActions?.[member.class];
        if (action) {
          actions.push({ member: member.name, item: eq.name, ...action });
        }
      }
    }
    return actions;
  }

  /**
   * Fighters hold the door: the front rank absorbs damage fully,
   * and it only spills to the back rank over a fallen fighter
   */
  takeDamage(amount) {
    let remaining = amount;
    const order = [
      ...this.living().filter(m => m.class === CLASSES.FIGHTER),
      ...this.living().filter(m => m.class !== CLASSES.FIGHTER),
    ];
    for (const member of order) {
      if (remaining <= 0) break;
      const absorbed = Math.min(remaining, member.health);
      member.takeDamage(absorbed);
      remaining -= absorbed;
    }
  }

  /**
   * Heal the most wounded first (cleric triage)
   */
  healParty(amount) {
    const wounded = this.living()
      .filter(m => m.health < m.maxHealth)
      .sort((a, b) => (a.health / a.maxHealth) - (b.health / b.maxHealth));
    if (wounded.length === 0) return;
    wounded[0].heal(amount);
  }

  /**
   * Between-room recovery: clerics mend as the party walks
   */
  restStep() {
    if (this.hasClass(CLASSES.CLERIC)) {
      this.healParty(1);
    }
  }

  /**
   * Poison is patient: venom taken last room works now. A living
   * cleric draws it in time. Returns { damage } | { cured } | null.
   */
  applyLinger() {
    if (!this.poisonLinger) return null;
    const dmg = this.poisonLinger;
    this.poisonLinger = 0;
    if (this.hasClass(CLASSES.CLERIC)) return { cured: true };
    this.takeDamage(dmg);
    return { damage: dmg };
  }

  /**
   * Cast a spell from the grimoire — by use, or a specific spell by
   * id. Scroll-casting consumes the card; a living wizard makes the
   * grimoire reusable (and stronger).
   */
  castSpell(use, spellId = null) {
    const idx = spellId
      ? this.grimoire.findIndex(s => s.id === spellId)
      : this.grimoire.findIndex(s => s.use === use);
    if (idx === -1) return null;
    const spell = this.grimoire[idx];
    const hasWizard = this.hasClass(CLASSES.WIZARD);
    const power = spell.power + (hasWizard ? 2 : 0);
    if (!hasWizard) {
      this.grimoire.splice(idx, 1); // Scroll burns
    }
    return { ...spell, effectivePower: power, consumed: !hasWizard };
  }

  /**
   * Alchemy at a lab: brew a potion or mod a weapon (needs materials)
   */
  doAlchemy(rngValue = Math.random()) {
    if (!this.hasClass(CLASSES.ALCHEMIST) || this.materials <= 0) return null;

    this.materials--;

    // Perenelle's trait: some alchemists work in doubles
    const doubler = this.living().some(m => m.id === 'char-perenelle');

    if (rngValue < 0.5) {
      const potion = { kind: 'healing-draught', heal: 6 };
      this.potions.push(potion);
      if (doubler) this.potions.push({ ...potion });
      return { type: 'potion', potion, doubled: doubler };
    } else {
      // Weapon mod goes to the hardest hitter
      const striker = this.living().reduce((a, b) => a.attack >= b.attack ? a : b);
      const mod = rngValue < 0.75
        ? { name: 'fire coating', attack: 2 }
        : { name: 'venom coating', attack: 3 };
      striker.addWeaponMod(mod);
      return { type: 'weapon-mod', mod, target: striker.name };
    }
  }

  /**
   * Quaff stored potions when badly hurt (auto-battler instinct)
   */
  quaffIfNeeded() {
    if (this.potions.length === 0) return false;
    const hurt = this.living().find(m => m.health / m.maxHealth <= 0.4);
    if (!hurt) return false;
    const potion = this.potions.shift();
    hurt.heal(potion.heal);
    return true;
  }

  recordEncounter(key, success) {
    if (!this.encounterHistory[key]) this.encounterHistory[key] = { wins: 0, losses: 0 };
    this.encounterHistory[key][success ? 'wins' : 'losses']++;
  }

  addScore(points) {
    this.score += points;
  }

  addGold(amount) {
    this.gold += amount;
    this.score += amount;
  }
}
