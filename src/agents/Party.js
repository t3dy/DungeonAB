/**
 * Party — the drafted band of adventurers
 *
 * Built from the player's draft pool: characters become the roster,
 * equipment auto-assigns to best-fit members, spells go into the
 * shared grimoire, personalities bias every group decision.
 */

import { CARD_TYPES, CLASSES } from '../game/Cards.js';
import { Adventurer, makeTavernVolunteer } from './Adventurer.js';

/**
 * A delving party is four adventurers. Not five, not ten.
 *
 * The measured reason (see AUDIT.md D1, MINING_REPORT.md): a body was
 * worth more than any item at every difficulty, so "draft every
 * character" dominated every other line and the draft solved itself.
 * A hard cap turns "how many bodies?" into "which four?" — and makes
 * the kit picks that fill out the remaining 20 draft slots matter.
 *
 * Characters drafted beyond the fourth become the reserve: they wait
 * in town and can take a fallen adventurer's place between dungeons,
 * so a fifth pick is insurance rather than a dead card.
 */
export const PARTY_CAP = 4;

export class Party {
  constructor(pool) {
    // Roster from drafted character cards. The same hero card can
    // be opened in two packs — duplicates get ordinals ("the Second"),
    // as is traditional in adventuring families.
    const nameCounts = {};
    const drafted = pool
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

    // The first four in draft order march; the rest wait in town.
    // Draft order is the player's own stated priority, so the cap
    // rewards taking the adventurer you actually want first.
    this.members = drafted.slice(0, PARTY_CAP);
    this.reserve = drafted.slice(PARTY_CAP);

    // No dead runs: an empty roster gets Pip
    if (this.members.length === 0) {
      this.members.push(makeTavernVolunteer());
    }

    // Shared grimoire. Drafted spells are prepared workings: reusable,
    // but a given working is spent for the room once cast (castSpell)
    this.grimoire = pool
      .filter(c => c.type === CARD_TYPES.SPELL)
      .map(c => ({ ...c, source: 'prepared' }));

    // Which workings have been spent in the current room (cleared on
    // the march between rooms by restStep)
    this.castThisRoom = new Set();

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

    // The trophy case: every monster drop claimed, remembered by
    // name (Drops.js). Persists across campaign depths with the party.
    this.trophies = [];

    // Run state
    this.gold = 0;
    this.score = 0;
    this.spellsLearned = 0;
    this.encounterHistory = {};
  }

  /**
   * Equipment goes to the best-fit living member: class match first,
   * then whoever has the fewest pieces. Returns the wearer.
   */
  assignEquipment(eqCard) {
    const living = this.living();
    if (living.length === 0) return null;

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
    return target;
  }

  living() {
    return this.members.filter(m => m.isAlive());
  }

  /**
   * Enlist a new adventurer (a town recruit). Duplicate names get an
   * ordinal, same as at draft time. A full party sends them to the
   * reserve instead of marching five. Returns the new adventurer.
   */
  addMember(card) {
    const adventurer = new Adventurer(card);
    const sameName = [...this.members, ...this.reserve]
      .filter(m => m.name.startsWith(card.name)).length;
    if (sameName > 0) {
      const ordinals = ['', 'the Second', 'the Third', 'the Fourth', 'the Fifth', 'the Umpteenth'];
      adventurer.name = `${card.name}, ${ordinals[Math.min(sameName, 5)]}`;
    }
    if (this.living().length >= PARTY_CAP) this.reserve.push(adventurer);
    else this.members.push(adventurer);
    return adventurer;
  }

  /** Is this adventurer waiting in town rather than marching? */
  isBenched(member) {
    return this.reserve.includes(member);
  }

  /**
   * Fill a dead adventurer's place from the reserve (town only —
   * nobody joins mid-dungeon). The fallen stay on the roster for the
   * chronicle; the cap counts the living. Returns the promoted
   * adventurer, or null if there's no room or nobody waiting.
   */
  promoteReserve() {
    if (this.reserve.length === 0) return null;
    if (this.living().length >= PARTY_CAP) return null;
    const recruit = this.reserve.shift();
    this.members.push(recruit);
    return recruit;
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
   * Attack that actually lands in a dungeon fight. Frontage used to be
   * the brake on mob drafts (only five blades could work at once);
   * PARTY_CAP now does that job at the draft table, so a capped party
   * all swings — and the rooms are built with the floor space for it
   * (DungeonGen COMBAT_FLOOR). Anyone over the cap (a promoted
   * reserve mid-run can't happen, but be safe) trails at a quarter.
   */
  combatAttack() {
    const attackers = this.living()
      .map(m => m.attack)
      .sort((a, b) => b - a);
    const front = attackers.slice(0, PARTY_CAP).reduce((s, a) => s + a, 0);
    const rear = attackers.slice(PARTY_CAP).reduce((s, a) => s + a, 0);
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
   * Elemental weapon coatings bite deeper into flesh that hates
   * their element (+2 per matching coating); venom coatings sicken
   * anything that still has blood (+1). Returns { bonus, notes }.
   */
  coatingBonusVs(monster) {
    let bonus = 0;
    const notes = new Set();
    for (const member of this.living()) {
      for (const mod of member.weaponMods) {
        if (mod.element && (
          (monster.weak || []).includes(mod.element) ||
          (mod.element === 'holy' && monster.undead)
        )) {
          bonus += 2;
          notes.add(mod.name);
        } else if (mod.venom && !monster.undead) {
          bonus += 1;
          notes.add(mod.name);
        }
      }
    }
    return { bonus, notes: [...notes] };
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
    // On the march, prepared workings are made ready again
    this.castThisRoom.clear();
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
  /**
   * Cast from the shared grimoire.
   *
   * Two kinds of magic, and the difference is where it came from:
   *   **prepared** workings — drafted cards, library study, pages taken
   *     off a dungeon shelf — are yours. Reusable, but a given working
   *     can only be cast once per room; it needs re-preparing after.
   *   **found scrolls** — out of a hoard or off a corpse — burn on the
   *     one cast, as sealed scrolls always have.
   *
   * A wizard amplifies everything by +2 power, which is the class's
   * whole job (DESIGN.md). The wizard used to *also* be the only way to
   * stop a drafted spell burning, and that tax measured brutally: a
   * spell card was worth 14 win points less than an equipment card,
   * and paying a body slot for the wizard cost another 17 (see
   * DESIGN_DIALOGUE.md §8). A drafted card should not be single-use
   * when every equipment card is permanent.
   */
  castSpell(use, spellId = null) {
    const usable = s => (spellId ? s.id === spellId : s.use === use)
      && !this.castThisRoom.has(s.id);
    const idx = this.grimoire.findIndex(usable);
    if (idx === -1) return null;
    const spell = this.grimoire[idx];
    // Power scales with the sharpest mind in the party, and a wizard
    // adds their amplification on top. Before this, `mind` bought
    // almost nothing a fight cared about — which is why the wizard was
    // a 24-point body in a pool whose fighters are 38-point bodies, and
    // why every spell in the game measured 15-20 win points behind an
    // equipment card (DESIGN_DIALOGUE.md §8).
    const hasWizard = this.hasClass(CLASSES.WIZARD);
    const power = spell.power + Math.floor(this.bestMind() / 2) + (hasWizard ? 2 : 0);
    const burns = spell.source === 'found';
    if (burns) {
      this.grimoire.splice(idx, 1);      // a sealed scroll is one cast
    } else {
      this.castThisRoom.add(spell.id);   // prepared: spent for this room
    }
    return { ...spell, effectivePower: power, consumed: burns };
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
      // Weapon mod goes to the hardest hitter. Coatings carry their
      // element — worth double against flesh that hates it.
      const striker = this.living().reduce((a, b) => a.attack >= b.attack ? a : b);
      const mod = rngValue < 0.75
        ? { name: 'fire coating', attack: 2, element: 'fire' }
        : { name: 'venom coating', attack: 3, venom: true };
      striker.addWeaponMod(mod);
      return { type: 'weapon-mod', mod, target: striker.name };
    }
  }

  /**
   * Loose a prepared healing working mid-fight, on the same instinct
   * that quaffs a potion.
   *
   * The reason this exists: healing used to be applied *after* the
   * fight, gated on the party still being alive — so the one situation
   * a healing spell is drafted for was the one situation it could never
   * fire in. Measured, 87% of runs by a party holding three healing
   * workings ended with the party dead and a working still prepared in
   * the grimoire, at a 13% win rate against 38% for three equipment
   * cards (DESIGN_DIALOGUE.md §9).
   *
   * Tried before the potion because a prepared working comes back next
   * room and a potion does not: spend the renewable resource first.
   *
   * Returns the cast working (for narration) or null.
   */
  castHealIfNeeded() {
    const hurt = this.living().find(m => m.health / m.maxHealth <= 0.4);
    if (!hurt) return null;
    const heal = this.castSpell('heal');
    if (!heal) return null;
    hurt.heal(heal.effectivePower);
    return { spell: heal, target: hurt };
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
