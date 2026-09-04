/**
 * Party — the drafted band of adventurers
 *
 * Built from the player's draft pool: characters become the roster,
 * equipment auto-assigns to best-fit members, spells go into the
 * shared grimoire, personalities bias every group decision.
 */

import { CARD_TYPES, CLASSES } from '../game/Cards.js';
import { Adventurer, makeTavernVolunteer } from './Adventurer.js';
import { personalityModifiers } from '../game/Personalities.js';

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

/**
 * The light burns down.
 *
 * The resource half of dungeon attrition. A party starts a delve with
 * STARTING_SUPPLY units of oil and spends one on every march; a lantern
 * makes it last twice as long. Run dry and the party is **in the dark**,
 * which costs DARK_TOLL health a room and lets the next thing find them
 * first.
 *
 * This exists because the march was free — a party arrived at the throne
 * holding 90% of its health pool after ten rooms, so every card whose job
 * was to make ordinary rooms safer was optimising a rounding error
 * (DESIGN_DIALOGUE.md §10). A clock gives the trip a cost, and gives the
 * utility workings — Dancing Light above all — something to be good at.
 */
export const STARTING_SUPPLY = 8;
export const DARK_TOLL = 3;

/**
 * How much of a delve the quartermaster's oil actually covers, by
 * difficulty. Provisioning is scaled to the dungeon rather than fixed,
 * because a flat allowance punishes a short easy dungeon and a long
 * nightmare one quite differently — measured, a flat 8 units dropped
 * easy from 99% to 87% while barely touching nightmare.
 *
 * These are fractions of the marches ahead: on easy the party is never
 * benighted, on nightmare it is walking dark for the last third.
 */
export const SUPPLY_COVERAGE = { easy: 1.1, medium: 0.85, hard: 0.7, nightmare: 0.55 };

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

    // A temper decides how readily a blow leaves a scar. Pushed onto the
    // bodies because they are what takes the damage, and an Adventurer
    // has no way to ask the party it belongs to.
    this.applyTemper();

    // Auto-assign equipment to best-fit members
    const equipment = pool.filter(c => c.type === CARD_TYPES.EQUIPMENT);
    for (const eq of equipment) {
      this.assignEquipment(eq);
    }

    // Kit nobody is carrying right now — displaced by an outfitting
    // swap, or bought in town and not yet handed to anybody
    this.pack = [];

    // The lantern's reserve, spent on the march (see restStep)
    this.supply = STARTING_SUPPLY;
    this.marches = 0;

    // Potions found in hoards and on the dead; drunk when it matters
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
    // Kit can change how readily its wearer scars, and equipment is
    // assigned after the temper is first applied
    if (this.personalities) this.applyTemper();
    return target;
  }

  /* ---------------------------------------------------------------- */
  /* Outfitting — the player's hand on the kit                        */
  /* ---------------------------------------------------------------- */

  /**
   * Move a piece of equipment to a named member.
   *
   * The draft assigns kit by best fit, which is a sensible default and
   * not a decision. This is the decision: the player can put the Tower
   * Shield on whoever is holding the door. A member carries one piece
   * per slot, so moving a weapon onto someone who has one hands theirs
   * back to the pack rather than silently stacking.
   *
   * Returns { moved, from, to, displaced } or null if nothing moved.
   */
  equipTo(cardId, memberName) {
    const target = [...this.members, ...this.reserve].find(m => m.name === memberName);
    if (!target) return null;
    let from = null;
    let card = null;
    for (const m of [...this.members, ...this.reserve]) {
      const at = m.equipment.findIndex(e => e.id === cardId);
      if (at >= 0) { from = m; card = m.equipment[at]; break; }
    }
    // Not on anybody: it may be in the pack
    if (!card) {
      const at = this.pack.findIndex(e => e.id === cardId);
      if (at < 0) return null;
      card = this.pack[at];
    }
    if (from === target) return { moved: card, from: target, to: target, displaced: null };

    // The slot it wants, freed on the way in
    let displaced = null;
    if (card.slot) {
      const clash = target.equipment.findIndex(e => e.slot === card.slot);
      if (clash >= 0) displaced = target.equipment.splice(clash, 1)[0];
    }
    if (from) from.equipment = from.equipment.filter(e => e.id !== cardId);
    else this.pack = this.pack.filter(e => e.id !== cardId);
    target.equip(card);
    // A displaced piece goes back to whoever gave this one up, if they
    // have the slot free; otherwise it waits in the pack
    if (displaced) {
      const free = from && !from.equipment.some(e => e.slot === displaced.slot);
      if (free) from.equip(displaced);
      else this.pack.push(displaced);
    }
    this.applyTemper();
    return { moved: card, from, to: target, displaced };
  }

  /** Take a piece off and leave it with the pack. */
  unequip(cardId) {
    for (const m of [...this.members, ...this.reserve]) {
      const at = m.equipment.findIndex(e => e.id === cardId);
      if (at >= 0) {
        const [card] = m.equipment.splice(at, 1);
        this.pack.push(card);
        this.applyTemper();
        return card;
      }
    }
    return null;
  }

  /**
   * Say who prepares a working.
   *
   * A grimoire is the party's, but somebody has to have studied the
   * thing. The named caster's mind sets the working's power, so putting
   * Fireball in the wizard's hands is worth more than leaving it with
   * the fighter — and it is a decision the player can now make.
   */
  assignCaster(spellId, memberName) {
    const spell = this.grimoire.find(s => s.id === spellId);
    if (!spell) return null;
    if (!memberName) { delete spell.casterUid; delete spell.casterName; return spell; }
    const caster = this.members.find(m => m.name === memberName || m.uid === memberName);
    if (!caster) return null;
    // Held by the body, not by the name: renaming a caster must not
    // quietly hand their working back to the party (tests/outfitting).
    spell.casterUid = caster.uid;
    spell.casterName = caster.name;
    return spell;
  }

  /** Who prepares this working, if anybody living does. */
  casterOf(spell) {
    if (!spell?.casterUid) return null;
    return this.living().find(m => m.uid === spell.casterUid) || null;
  }

  /**
   * Rename a member and keep everything that pointed at them pointing
   * at them — the grimoire's display names, chiefly.
   */
  renameMember(member, name) {
    if (!member) return null;
    const renamed = member.rename(name);
    for (const spell of this.grimoire) {
      if (spell.casterUid === member.uid) spell.casterName = renamed;
    }
    return renamed;
  }

  /**
   * The mind that powers a working: its named caster while they live,
   * the sharpest mind in the party otherwise. A dead caster must not
   * quietly turn the grimoire off.
   */
  mindFor(spell) {
    const caster = this.casterOf(spell);
    return caster ? caster.mind : this.bestMind();
  }

  /**
   * The whole band, saveable.
   *
   * This is what makes "the same party delves again" mean something:
   * wounds, trophies, learned workings, drilled technique and the
   * contents of the purse all survive the trip to town and back.
   * Cards are stored by id and rehydrated, so a save stays valid across
   * rebalances (Chronicles.js).
   */
  toJSON() {
    return {
      members: this.members.map(m => m.toJSON()),
      reserve: this.reserve.map(m => m.toJSON()),
      grimoire: this.grimoire.map(s => ({ ...s })),
      personalities: [...this.personalities],
      trophies: this.trophies.map(t => ({ ...t })),
      gold: this.gold,
      score: this.score,
      potions: this.potions.map(x => ({ ...x })),
      pack: this.pack.map(e => ({ ...e })),
      supply: this.supply,
      spellsLearned: this.spellsLearned,
      poisonLinger: this.poisonLinger || 0,
      alarmed: !!this.alarmed,
      desecrated: !!this.desecrated,
    };
  }

  /**
   * Rebuild a party from a save. `lookup` resolves a card id to a card
   * (getCard from the pool); anything it cannot resolve is dropped
   * rather than crashing the load.
   */
  static fromJSON(saved, lookup) {
    const cards = [];
    for (const m of saved.members || []) {
      const card = lookup(m.id);
      if (card) cards.push(card);
    }
    for (const m of saved.reserve || []) {
      const card = lookup(m.id);
      if (card) cards.push(card);
    }
    const party = new Party(cards);

    // Reapply the marks of previous delves
    const all = [...party.members, ...party.reserve];
    const savedAll = [...(saved.members || []), ...(saved.reserve || [])];
    all.forEach((m, i) => m.restore(savedAll[i], lookup));

    // Prefer the pool's copy so rebalances reach saved parties, but keep
    // the stored one for anything the pool never had -- found scrolls
    // carry synthetic ids and used to vanish on load without a word.
    const rehydrate = c => (c && { ...(lookup(c.id) || {}), ...c });
    party.grimoire = (saved.grimoire || []).map(rehydrate).filter(Boolean);
    party.personalities = [...(saved.personalities || [])];
    party.trophies = (saved.trophies || []).map(t => ({ ...t }));
    party.gold = saved.gold || 0;
    party.score = saved.score || 0;
    party.potions = (saved.potions || []).map(x => ({ ...x }));
    party.pack = (saved.pack || []).map(rehydrate).filter(Boolean);
    party.supply = saved.supply ?? party.supply;
    party.spellsLearned = saved.spellsLearned || 0;
    party.poisonLinger = saved.poisonLinger || 0;
    party.alarmed = !!saved.alarmed;
    party.desecrated = !!saved.desecrated;
    return party;
  }

  /**
   * Push the party's temper onto its members. Called at muster and
   * whenever the roster changes, so a personality drafted late still
   * reaches the bodies.
   */
  applyTemper() {
    const bias = personalityModifiers(this).wound;
    for (const m of [...this.members, ...this.reserve]) {
      // Armour stacks on temper: dwarven mail takes the worst of a blow,
      // so fewer of them cross the line into a lasting scar
      const armoured = 0;
      m.woundBias = bias + armoured;
    }
    return bias;
  }

  /**
   * All capabilities possessed by the party — from its people, their
   * equipment, and the workings in the shared grimoire. Used by the
   * encounter engine to evaluate which options unlock.
   *
   * The grimoire counts because a capability is a thing the party can
   * DO, and a party that carries Eyes of the Mouse can scry whether or
   * not anyone in it was born a diviner. That is the whole point of a
   * capability rather than a class: it can be drafted onto a party that
   * lacks the person for it.
   */
  capabilities() {
    const caps = new Set();
    // Only the people who are actually here. A magus waiting out the
    // delve in the tavern cannot read the orrery, and neither can one
    // lying in room four — so the reserve does not count, and the dead
    // stop counting the moment they fall.
    //
    // This is a correctness point first and a balance one second, but
    // the balance is large: counting the bench, a drafted pool held a
    // median 19 of the 28 capabilities and `knowledge` was on 99% of
    // parties, so a capability gate gated nothing and the draft could
    // not be graded (DESIGN_DIALOGUE.md §N). It also gives losing a
    // specialist a consequence past the stat line: when the diviner
    // falls, the party stops being able to ask.
    for (const member of this.living()) {
      const memberCaps = member.card?.capabilities || [];
      for (const cap of memberCaps) caps.add(cap);
      for (const eq of member.equipment) {
        const eqCaps = eq.capabilities || [];
        for (const cap of eqCaps) caps.add(cap);
      }
    }
    for (const eq of this.pack || []) {
      for (const cap of eq.capabilities || []) caps.add(cap);
    }
    for (const spell of this.grimoire || []) {
      for (const cap of spell.capabilities || []) caps.add(cap);
    }
    return caps;
  }

  /**
   * Does the party possess this capability?
   */
  hasCapability(capId) {
    return this.capabilities().has(capId);
  }

  /**
   * Who holds this capability, and from what source?
   * Returns array of { member, source, holder } where source is 'character' or 'equipment'.
   */
  capabilityHolders(capId) {
    const holders = [];
    // The same roster `capabilities()` reads: whoever is here and alive.
    // These two must agree, or the writing credits an option to somebody
    // who is not in the room.
    for (const member of this.living()) {
      const memberCaps = member.card?.capabilities || [];
      if (memberCaps.includes(capId)) {
        holders.push({ member, source: 'character' });
      }
      for (const eq of member.equipment) {
        if ((eq.capabilities || []).includes(capId)) {
          holders.push({ member, source: 'equipment', equipment: eq });
        }
      }
    }
    // A working in the grimoire answers for the whole party, so it is
    // credited to the party rather than to any one pair of hands
    for (const spell of this.grimoire || []) {
      if ((spell.capabilities || []).includes(capId)) {
        holders.push({ member: { name: 'the grimoire' }, source: 'spell', equipment: spell });
      }
    }
    return holders;
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
  /**
   * What the party swings for.
   *
   * `frontage` is how many can reach the enemy at once — set by the
   * formation the room allowed (agents/Formation.js). Anyone behind the
   * frontage still contributes, but at a quarter: they are reaching past
   * somebody. Filing up a corridor really does mean one blade forward.
   */
  combatAttack(frontage = PARTY_CAP) {
    const reach = Math.max(1, Math.min(frontage, PARTY_CAP));
    const attackers = this.living()
      .map(m => m.attack)
      .sort((a, b) => b - a);
    const front = attackers.slice(0, reach).reduce((s, a) => s + a, 0);
    const rear = attackers.slice(reach).reduce((s, a) => s + a, 0);
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
  /**
   * Who is standing in front. Fighters first, in draft order — the same
   * order `takeDamage` sends blows down, so this is not a label but a
   * description of who is actually being hit.
   *
   * It exists to be narrated. Measured over 120 transcripts, 85% of
   * deaths were of somebody the reader had never met, because only the
   * magus who argued for a plan ever got a line (narrative/Dramaturg.js
   * mortalityEarned). The party's most exposed member was structurally
   * anonymous until the sentence that killed them.
   */
  pointMan() {
    return this.damageOrder()[0] || null;
  }

  /** The order blows land in: fighters first, then everyone else. */
  damageOrder() {
    return [
      ...this.living().filter(m => m.class === CLASSES.FIGHTER),
      ...this.living().filter(m => m.class !== CLASSES.FIGHTER),
    ];
  }

  takeDamage(amount) {
    let remaining = amount;
    const order = this.damageOrder();
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
   * Spend a march's worth of oil. A lantern doubles what a unit buys,
   * so the party with one burns on every *other* march.
   *
   * Returns a *data* note when something changed — the light guttering,
   * or the dark taking its toll — and null on a quiet march. The prose
   * for each kind lives in Narrator.composeSupply, so the writing can be
   * varied and coverage-tested in one place rather than hard-coded here
   * (the story panel is a product surface: CLAUDE.md standing rule 6).
   */
  burnSupply() {
    this.marches++;
    const lantern = this.living().some(m => m.equipment.some(e => e.id === 'eq-lantern'));
    const burns = !lantern || this.marches % 2 === 0;

    if (this.supply > 0) {
      if (!burns) return null;
      this.supply--;
      if (this.supply === 0) return { kind: 'guttered', supply: 0 };
      if (this.supply <= 2) return { kind: 'low', supply: this.supply };
      return null;
    }

    // Out of oil. Two cards answer the dark, and they are already
    // differentiated by cost rather than by effect:
    //
    //   Dancing Light is a prepared working, so lighting the march
    //   *spends it for the room* — it cannot also be revealing traps.
    //
    //   Eyes of the Mouse is passive and costs nothing to keep up.
    //
    // Both spare the toll. That measured at +6.3 and +7.4
    // improvement-when-drafted — balanced, with the passive card
    // correctly slightly ahead. Two attempts to "fix" the redundancy by
    // splitting their power (halving one, then laddering 3→2→1) both
    // measured worse: +21 against −3.5, then +6.8 against −6.5. Two
    // answers to one threat, priced differently, is the design.
    //
    // A covered march is announced once and then goes quiet. The
    // Chronicle carries news, not steady state: a party holding Dancing
    // Light is out of oil for the rest of the delve, and printing "the
    // dark takes nothing" on all six remaining marches buries the lines
    // that do matter. An unmitigated dark still reports every time,
    // because damage is being taken every time.
    const announce = kind => {
      const first = this.darkCovered !== kind;
      this.darkCovered = kind;
      return first;
    };

    const lit = this.castSpell('utility', 'sp-light');
    if (lit) {
      return announce('conjured')
        ? { kind: 'conjured', supply: 0, full: DARK_TOLL, source: lit.name }
        : null;
    }
    // Feather Step's card says "no stumbling in the dark", and the dark
    // costs a party precisely by making it stumble
    const feather = this.castSpell('utility', 'sp-feather');
    if (feather) {
      // Its own beat, not the conjured-light one: Feather Step makes no
      // light at all, it just stops the party walking into things
      return announce('sure-footed')
        ? { kind: 'sure-footed', supply: 0, full: DARK_TOLL, source: feather.name }
        : null;
    }
    if (this.canSeeInDark()) {
      // Name the working that saved them. Feather Step's lines have
      // always said which card carried the party through the dark and
      // these did not, so a player who drafted Eyes of the Mouse could
      // not tell it was doing anything (tools/assets.mjs firing rates).
      const seen = this.grimoire.find(sp => sp.id === 'sp-eyes');
      return announce('dark-seen')
        ? { kind: 'dark-seen', supply: 0, full: DARK_TOLL, source: seen?.name || 'night-sight' }
        : null;
    }
    this.darkCovered = null;

    // The party's temper decides what the dark costs it: the Bold walk
    // it like a road, the Craven creep and pay for creeping
    const temper = personalityModifiers(this);
    const toll = Math.max(1, DARK_TOLL + temper.dark);
    for (const m of this.living()) m.takeDamage(toll);
    this.darkMarches = (this.darkMarches || 0) + 1;
    return {
      kind: 'dark', supply: 0, damage: toll, full: DARK_TOLL,
      temper: temper.notes, darkMarches: this.darkMarches,
    };
  }

  /** Eyes of the Mouse, or a rogue's night sense, reads the dark. */
  canSeeInDark() {
    return this.grimoire.some(sp => sp.id === 'sp-eyes');
  }

  /**
   * Fill the lamp for the delve ahead: enough oil to cover the
   * difficulty's share of the marches between here and the throne.
   */
  provision(marches, difficulty = 'medium') {
    const share = SUPPLY_COVERAGE[difficulty] ?? SUPPLY_COVERAGE.medium;
    // Rationing is learned technique, not more oil: the same lamp,
    // trimmed and measured (game/Tactics.js)
    const rationed = 0;
    // ...and so does the party's temper: the Craven overpack, the
    // Cunning ration without being told (game/Personalities.js)
    const temper = personalityModifiers(this);
    this.supply = Math.max(2, Math.round(marches * share) + rationed + temper.supply);
    this.provisionNotes = temper.supplyNotes;
    this.marches = 0;
    return this.supply;
  }

  /** Oil found, brewed, or bought. Returns how much was actually taken. */
  addSupply(n) {
    const before = this.supply;
    this.supply = Math.min(STARTING_SUPPLY * 3, this.supply + n);
    return this.supply - before;
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
    return this.burnSupply();
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
    const power = spell.power + Math.floor(this.mindFor(spell) / 2) + (hasWizard ? 2 : 0);
    const burns = spell.source === 'found';
    if (burns) {
      this.grimoire.splice(idx, 1);      // a sealed scroll is one cast
    } else {
      this.castThisRoom.add(spell.id);   // prepared: spent for this room
    }
    return { ...spell, effectivePower: power, consumed: burns };
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
