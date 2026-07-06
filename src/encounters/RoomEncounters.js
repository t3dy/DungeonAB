/**
 * RoomEncounters — options and outcomes per room type
 *
 * Adapted from SnakeAB's encounter engine: options are gated by
 * party composition (classes present, spells held), decisions are
 * weighted by personality archetypes, outcomes are gradient.
 */

import { CLASSES, SPELL_CARDS } from '../game/Cards.js';
import { ROOM_TYPES } from '../world/DungeonGen.js';
import { elementMult } from '../game/Bestiary.js';

function roll() {
  return Math.random() * 10;
}

/* ------------------------------------------------------------------ */
/* Preparation — what the drafted kit unlocks and improves             */
/* (FTL's lesson: the encounter should notice how you came equipped)   */
/* ------------------------------------------------------------------ */

export function hasItem(party, itemId) {
  return party.living().some(m => m.equipment.some(e => e.id === itemId));
}

export function hasSpell(party, spellId) {
  return party.grimoire.some(s => s.id === spellId);
}

/**
 * Every kit-driven modifier in one inspectable place, so effects and
 * their narration can never drift apart.
 */
export function getPreparationBonuses(party) {
  const b = {
    sneak: 0, disarm: 0, deepStudy: 0, secretDoor: 0, trapSoak: 0,
    cleanInspect: false,
    notes: {},   // bonus key → the card that earned it (for the writing)
  };
  if (hasItem(party, 'eq-boots')) {
    b.sneak += 1.5;
    b.notes.sneak = 'Boots of the Quiet Step';
  }
  if (hasSpell(party, 'sp-light')) {
    b.sneak += 1;
    b.notes.sneakLight = 'Dancing Light';
  }
  if (hasItem(party, 'eq-lockpicks')) {
    b.disarm += 1.5;
    b.cleanInspect = true;
    b.notes.disarm = 'Masterwork Lockpicks';
    b.notes.cleanInspect = 'Masterwork Lockpicks';
  }
  if (party.hasPersonality('cunning')) {
    b.cleanInspect = true;
    b.notes.cleanInspect = b.notes.cleanInspect || 'the Cunning';
  }
  if (hasItem(party, 'eq-grimoire')) {
    b.deepStudy += 1.5;
    b.notes.deepStudy = 'the Grimoire of Low Whispers';
  }
  if (hasItem(party, 'eq-lantern')) {
    b.secretDoor += 2;
    b.trapSoak += 1;
    b.notes.secretDoor = 'the Everburning Lantern';
    b.notes.trapSoak = 'the Everburning Lantern';
  }
  return b;
}

/* ------------------------------------------------------------------ */
/* Option definitions per room type                                    */
/* ------------------------------------------------------------------ */

export function getRoomOptions(room, party) {
  switch (room.type) {
    case ROOM_TYPES.MONSTER:
    case ROOM_TYPES.BOSS: {
      const opts = [
        { id: 'fight', name: 'Fight', desc: 'Steel and teamwork' },
        { id: 'flee', name: 'Fall Back', desc: 'Retreat and try the fight later, worn down' },
      ];
      if (party.hasClass(CLASSES.ROGUE) && !room.monster?.isBoss) {
        opts.push({ id: 'sneak', name: 'Sneak Past', desc: 'The rogue leads a silent detour' });
      }
      if (party.hasClass(CLASSES.CLERIC) && room.monster?.undead) {
        opts.push({ id: 'turn-undead', name: 'Turn Undead', desc: 'The cleric raises the holy symbol' });
      }
      if (room.monster?.bribable && party.gold >= 15) {
        opts.push({ id: 'bribe', name: 'Pay the Toll', desc: 'Gold buys passage (15g)' });
      }
      if (party.grimoire.some(s => s.use === 'combat')) {
        opts.push({ id: 'spell-strike', name: 'Open with Magic', desc: 'Lead with a combat spell' });
      }
      // Cause Fear routs the weak-hearted — worthless against bosses
      if (hasSpell(party, 'sp-fear') && !room.monster?.isBoss && (room.monster?.health || 99) <= 14) {
        opts.push({ id: 'cause-fear', name: 'Cause Fear', desc: 'Send the weak thing running' });
      }
      return opts;
    }

    case ROOM_TYPES.TRAP: {
      const opts = [
        { id: 'push-through', name: 'Push Through', desc: 'Take the hit, keep marching' },
        { id: 'search-around', name: 'Search for a Way Around', desc: 'Slow but safe-ish' },
      ];
      if (party.hasClass(CLASSES.ROGUE)) {
        opts.unshift({ id: 'disarm', name: 'Disarm It', desc: 'The rogue\'s fingers know this work' });
      }
      if (party.grimoire.some(s => s.use === 'utility')) {
        opts.push({ id: 'spell-bypass', name: 'Magic It Open', desc: 'A utility spell solves this' });
      }
      // The alchemist can spend a material on a smoke concoction that
      // springs the trap from a safe distance
      if (party.hasClass(CLASSES.ALCHEMIST) && party.materials >= 1) {
        opts.push({ id: 'smoke-bomb', name: 'Alchemist\'s Smoke', desc: 'Spend a material; spring it from afar' });
      }
      return opts;
    }

    case ROOM_TYPES.TREASURE:
    case ROOM_TYPES.VAULT: {
      const opts = [
        { id: 'loot', name: 'Loot It All', desc: 'Everything shiny goes in the bags' },
        { id: 'inspect', name: 'Inspect First', desc: 'Check for mimics and curses' },
        { id: 'leave-it', name: 'Leave It', desc: 'Some gold is bait' },
      ];
      // Knock opens any lock. Loudly. No mimic gets the drop on you
      // from across the room — but everything below hears it.
      if (hasSpell(party, 'sp-knock')) {
        opts.unshift({ id: 'knock-open', name: 'Cast Knock', desc: 'Open it from across the room. Loudly.' });
      }
      return opts;
    }

    case ROOM_TYPES.LIBRARY: {
      const opts = [
        { id: 'study', name: 'Study the Shelves', desc: 'Learn a spell from the stacks' },
        { id: 'pass-by', name: 'Pass Through', desc: 'Books do not fill bellies' },
      ];
      if (party.hasClass(CLASSES.WIZARD)) {
        opts.unshift({ id: 'deep-study', name: 'Read the Sealed Texts', desc: 'The wizard risks the dangerous books' });
      }
      return opts;
    }

    case ROOM_TYPES.SHRINE: {
      return [
        { id: 'rest', name: 'Rest and Pray', desc: 'Heal the wounded' },
        { id: 'desecrate', name: 'Pry Out the Gold Leaf', desc: 'Profitable. Blasphemous.' },
        { id: 'pass-by', name: 'Keep Moving', desc: 'No time for candles' },
      ];
    }

    case ROOM_TYPES.LAB: {
      const opts = [{ id: 'pass-by', name: 'Move On', desc: 'Glassware and regret' }];
      if (party.hasClass(CLASSES.ALCHEMIST) && party.materials > 0) {
        opts.unshift({ id: 'alchemy', name: 'Work the Bench', desc: 'Brew a potion or mod a weapon' });
      }
      return opts;
    }

    case ROOM_TYPES.MATERIALS: {
      return [
        { id: 'gather', name: 'Gather Materials', desc: 'Herbs, salts, quicksilver' },
        { id: 'pass-by', name: 'Leave Them', desc: 'The satchel stays light' },
      ];
    }

    case ROOM_TYPES.DISASTER: {
      return [
        { id: 'brace', name: 'Brace and Endure', desc: 'Shields up, heads down' },
        { id: 'scatter', name: 'Scatter and Regroup', desc: 'Every hero for themselves' },
      ];
    }

    default:
      return [{ id: 'proceed', name: 'Proceed', desc: 'Onward and downward' }];
  }
}

/* ------------------------------------------------------------------ */
/* Personality weighting — archetypes bias the party's choice          */
/* ------------------------------------------------------------------ */

const PERSONALITY_WEIGHTS = {
  brave: { fight: 3, 'push-through': 2, brace: 2, flee: -2, 'leave-it': -1 },
  cunning: { sneak: 3, disarm: 3, bribe: 2, inspect: 2, 'spell-bypass': 2, fight: -1 },
  greedy: { loot: 4, desecrate: 2, gather: 2, 'leave-it': -3, bribe: -2 },
  scholarly: { study: 3, 'deep-study': 3, 'spell-strike': 2, 'spell-bypass': 2 },
  pious: { rest: 3, 'turn-undead': 3, desecrate: -5 },
  reckless: { fight: 2, 'push-through': 3, loot: 2, inspect: -2, 'search-around': -2 },
  craven: { flee: 3, sneak: 2, disarm: 2, 'search-around': 2, inspect: 1, scatter: 2, fight: -2, 'push-through': -2, brace: -1, 'cause-fear': 3, 'smoke-bomb': 2, 'knock-open': 1 },
};

/* Preparation-gated options are attractive to those who'd use them */
const PREP_OPTION_WEIGHTS = {
  'knock-open': { base: 1.5, cunning: 2, scholarly: 1 },
  'cause-fear': { base: 1.5, cunning: 1 },
  'smoke-bomb': { base: 1.5, cunning: 2 },
};

export function decideRoomAction(room, party) {
  const options = getRoomOptions(room, party);
  if (options.length === 0) return null;
  if (options.length === 1) return options[0].id;

  const weights = options.map(opt => {
    let w = 1.0;
    for (const archetype of party.personalities) {
      const table = PERSONALITY_WEIGHTS[archetype];
      if (table && table[opt.id] !== undefined) w += table[opt.id];
    }

    // Instincts independent of personality
    if (opt.id === 'alchemy') w += 3;                       // Benches get used
    if (opt.id === 'gather') w += 2;                        // Satchels get filled
    const prep = PREP_OPTION_WEIGHTS[opt.id];
    if (prep) {
      w += prep.base;
      for (const archetype of party.personalities) {
        if (prep[archetype]) w += prep[archetype];
      }
    }
    if (opt.id === 'rest' && party.totalHealth() / party.totalMaxHealth() < 0.6) w += 3;
    if (opt.id === 'fight' && party.totalHealth() / party.totalMaxHealth() < 0.3) w -= 2;
    if (opt.id === 'flee' && party.totalHealth() / party.totalMaxHealth() < 0.3) w += 2;
    if (opt.id === 'study') w += 1;                         // Spells are score

    return { opt, w: Math.max(0.1, w) };
  });

  const total = weights.reduce((s, x) => s + x.w, 0);
  let r = Math.random() * total;
  for (const { opt, w } of weights) {
    r -= w;
    if (r <= 0) return opt.id;
  }
  return options[0].id;
}

/* ------------------------------------------------------------------ */
/* Finds — treasure is more than coin                                  */
/* ------------------------------------------------------------------ */

const TRINKETS = [
  { id: 'found-charm', type: 'equipment', name: 'a tarnished luck-charm', icon: '🍀', slot: 'trinket', bonus: { mind: 1 }, bestFor: null, text: 'Somebody\'s luck ran out holding it. Perhaps it recharges.' },
  { id: 'found-buckle', type: 'equipment', name: 'a dead adventurer\'s belt buckle', icon: '🔩', slot: 'trinket', bonus: { defense: 1 }, bestFor: null, text: 'Sturdy. Its last owner was not.' },
  { id: 'found-whetstone', type: 'equipment', name: 'a whetstone of surprising opinion', icon: '🪨', slot: 'trinket', bonus: { attack: 1 }, bestFor: null, text: 'It hums when it works. Nobody asks what the tune is.' },
];

/**
 * Roll a bonus find: a potion, materials, a spell scroll, or a
 * trinket. Vaults and boss hoards always hold one. Returns a prep
 * entry (source + chronicle text) or null.
 */
export function rollFind(party, always = false, rollValue = Math.random()) {
  if (!always && rollValue > 0.35) return null;
  const kind = Math.floor((always ? rollValue : rollValue / 0.35) * 4) % 4;

  if (kind === 0) {
    party.potions.push({ kind: 'healing-draught', heal: 6 });
    return { source: 'the hoard', find: 'potion', text: '🧪 Tucked behind the coin: a healing draught, still corked, still honest.' };
  }
  if (kind === 1) {
    party.materials += 2;
    return { source: 'the hoard', find: 'materials', text: '🌿 Two bundles of rare simples, wrapped in oilcloth by careful, vanished hands.' };
  }
  if (kind === 2) {
    const scroll = SPELL_CARDS[Math.floor(rollValue * 997) % SPELL_CARDS.length];
    party.grimoire.push({ ...scroll, id: `found-${scroll.id}-${party.grimoire.length}` });
    return { source: scroll.name, find: 'scroll', text: `📜 A scroll of ${scroll.name}, sealed with someone's ring. The grimoire grows.` };
  }
  const trinket = TRINKETS[Math.floor(rollValue * 991) % TRINKETS.length];
  party.assignEquipment({ ...trinket, id: `${trinket.id}-${Date.now().toString(36)}` });
  return { source: trinket.name, find: 'trinket', text: `🍀 Among the coins, ${trinket.name} — claimed, worn, already working.` };
}

/* ------------------------------------------------------------------ */
/* Side passages and secret doors (procgen v2)                         */
/* ------------------------------------------------------------------ */

/**
 * Does the party notice the hidden door? Rogues have the eyes for it
 * (NetHack search tradition); scholars read the architecture; the
 * Craven has already memorized every wall. Pure — pass the roll.
 */
export function detectSecretDoor(party, rollValue = roll()) {
  const rogues = party.living().filter(m => m.class === CLASSES.ROGUE);
  const eyes = rogues.length > 0
    ? Math.max(...rogues.map(m => m.mind))
    : Math.floor(party.bestMind() / 2);
  let bonus = 0;
  if (party.hasPersonality('scholarly')) bonus += 1;
  if (party.hasPersonality('craven')) bonus += 1;   // counts the exits, finds the extra one
  bonus += getPreparationBonuses(party).secretDoor; // the lantern throws the seam's shadow
  return eyes + bonus + rollValue > 11;
}

/**
 * Does the party take the side passage? The Covetous smell gold; the
 * Craven wants no part of optional danger. Pure — pass the roll.
 */
export function decideDetour(party, rollValue = roll()) {
  let w = 4;   // idle curiosity baseline
  if (party.hasPersonality('greedy')) w += 3;
  if (party.hasPersonality('scholarly')) w += 2;
  if (party.hasPersonality('reckless')) w += 2;
  if (party.hasPersonality('craven')) w -= 3;
  // Battered parties press for the exit
  if (party.totalHealth() / party.totalMaxHealth() < 0.35) w -= 3;
  return rollValue < w;
}

/* ------------------------------------------------------------------ */
/* Resolution — gradient outcomes                                      */
/* ------------------------------------------------------------------ */

/**
 * Resolve a chosen action in a room. Mutates the party.
 * Returns { success, text, gold, damage, learned, ... }
 */
export function resolveRoomAction(room, party, optionId) {
  switch (optionId) {
    /* Combat */
    case 'fight': {
      const monster = room.monster;
      let monsterHealth = monster.health;
      let partyDamageTaken = 0;

      // Class-keyed items act first: openings land before round one,
      // wards blunt every round, summons swing alongside the party
      const itemActions = party.combatItemActions();
      let opening = 0, ward = 0, summon = 0;
      for (const a of itemActions) {
        opening += a.opening || 0;
        if (monster.undead) opening += a.vsUndead || 0;
        ward += a.ward || 0;
        summon += a.summonAttack || 0;
      }
      monsterHealth -= opening;

      // Natures shape the fight (see Bestiary): the armored shave
      // blows; the ethereal ignore steel unless faith gives the
      // blades conviction; the forewarned (a tripped alarm) hit harder
      const preps = [];
      const armorShave = monster.trait === 'armored' ? 2 : 0;
      const etherealMult = monster.trait === 'ethereal' && !party.hasClass(CLASSES.CLERIC) ? 0.6 : 1;
      if (monster.trait === 'ethereal') {
        preps.push(party.hasClass(CLASSES.CLERIC)
          ? { source: 'the cleric', text: '✨ Steel alone would pass through it — but the cleric\'s murmured litany gives every blade conviction.' }
          : { source: monster.name, text: '👻 Half the party\'s blows pass through it like an opinion through a committee.' });
      }
      let monsterAtk = monster.attack;
      if (party.alarmed) {
        monsterAtk += 2;
        party.alarmed = false;
        preps.push({ source: 'the alarm', text: '🔔 The tripped alarm did its work: the thing was waiting, braced and delighted.' });
      }

      // Auto-battle: rounds of party attack vs monster attack.
      // Corridor frontage: only ~5 blades work at once, so a mob
      // of drafted heroes helps less than it thinks it does.
      let rounds = 0;
      while (monsterHealth > 0 && party.isAlive() && rounds < 12) {
        rounds++;
        const swing = Math.max(1, Math.round((party.combatAttack() + summon + Math.floor(roll() / 3)) * etherealMult) - armorShave);
        monsterHealth -= swing;
        if (monsterHealth <= 0) break;
        // The slow strike last: no incoming damage on the first round
        if (monster.trait === 'slow' && rounds === 1) continue;
        const incoming = Math.max(1, monsterAtk - Math.floor(party.totalDefense() / 3) - ward);
        party.takeDamage(incoming);
        partyDamageTaken += incoming;
        party.quaffIfNeeded();
      }

      const won = monsterHealth <= 0 && party.isAlive();
      if (won) {
        const bounty = monster.isBoss ? 100 : 25;
        party.addScore(bounty);
        room.cleared = true;
        // The venomous leave something behind, win or no win
        if (monster.trait === 'venomous') {
          if (party.hasClass(CLASSES.CLERIC)) {
            preps.push({ source: 'the cleric', text: '🐍 Venom in three sets of scratches — drawn, hissing, into the cleric\'s salt bowl before it can work.' });
          } else {
            party.poisonLinger = (party.poisonLinger || 0) + 2;
            preps.push({ source: monster.name, text: '🐍 The thing is dead, but its venom is patient. Someone will feel this a room from now.' });
          }
        }
        // A boss's hoard always holds more than coin
        if (monster.isBoss) {
          const find = rollFind(party, true);
          if (find) preps.push(find);
        }
        // The Reckless make it look good, and the chroniclers pay for it
        if (party.hasPersonality('reckless')) {
          party.addScore(5);
          preps.push({ source: 'the Reckless', text: '💥 The Reckless insisted on doing it with style. The chronicle pays extra for style.' });
        }
      }
      // A drafted healing spell finally earns its keep after a bloody fight
      if (party.isAlive() && partyDamageTaken >= 6) {
        const heal = party.castSpell('heal');
        if (heal) {
          party.healParty(heal.effectivePower);
          preps.push({ source: heal.name, text: `💚 ${heal.name} closes the worst of the wounds before they set (${heal.effectivePower} healed${heal.consumed ? '; the scroll burns' : ''}).` });
        }
      }
      party.recordEncounter('fight', won);
      return { success: won, rounds, damage: partyDamageTaken, monster: monster.name, itemActions, preps };
    }

    case 'cause-fear': {
      // Weak hearts break at range: the fear spell routs the room
      const spell = party.castSpell('combat', 'sp-fear');
      party.addScore(20);
      room.cleared = true;
      party.recordEncounter('cause-fear', true);
      return { success: true, monster: room.monster.name, spell: spell ? spell.name : 'Cause Fear' };
    }

    case 'spell-strike': {
      const monster = room.monster;
      // The caster reads the foe and reaches for the right working:
      // the spell whose element bites hardest (Bestiary weaknesses;
      // swarms take spell openings half again as hard)
      const combatSpells = party.grimoire.filter(s => s.use === 'combat');
      let best = null;
      let bestDmg = -1;
      for (const s of combatSpells) {
        const dmg = s.power * elementMult(s, monster);
        if (dmg > bestDmg) { bestDmg = dmg; best = s; }
      }
      const spell = best ? party.castSpell('combat', best.id) : null;
      let spellEdge = null;
      if (spell) {
        const mult = elementMult(spell, monster) * (monster.trait === 'swarm' ? 1.5 : 1);
        if (elementMult(spell, monster) > 1) spellEdge = 'weak';
        else if (elementMult(spell, monster) < 1) spellEdge = 'resisted';
        if (monster.trait === 'swarm') spellEdge = spellEdge || 'swarm';
        monster.health = Math.max(1, monster.health - Math.round(spell.effectivePower * mult));
      }
      // Then fight the softened monster
      const result = resolveRoomAction(room, party, 'fight');
      result.spell = spell ? spell.name : null;
      result.spellEdge = spellEdge;
      result.spellElement = spell?.element || null;
      return result;
    }

    case 'sneak': {
      const rogueMind = Math.max(...party.living().filter(m => m.class === CLASSES.ROGUE).map(m => m.mind));
      // A craven party has already memorized the quiet ways out
      const cravenEdge = party.hasPersonality('craven') ? 1 : 0;
      const prep = getPreparationBonuses(party);
      const preps = [];
      if (prep.notes.sneak) preps.push({ source: prep.notes.sneak, text: `👢 The ${prep.notes.sneak} never let the floorboards learn a name.` });
      if (prep.notes.sneakLight) preps.push({ source: prep.notes.sneakLight, text: '💡 Dancing Light had already shown where the watcher watched.' });
      const ok = rogueMind + cravenEdge + prep.sneak + roll() > 9;
      if (ok) {
        party.addScore(15);
        room.cleared = true;
      } else {
        party.takeDamage(Math.ceil(room.monster.attack / 2));
      }
      party.recordEncounter('sneak', ok);
      return { success: ok, monster: room.monster.name, preps: ok ? preps : [] };
    }

    case 'turn-undead': {
      const clericMind = Math.max(...party.living().filter(m => m.class === CLASSES.CLERIC).map(m => m.mind));
      const ok = clericMind + roll() > 8;
      if (ok) {
        party.addScore(30);
        room.cleared = true;
      } else {
        party.takeDamage(room.monster.attack);
      }
      party.recordEncounter('turn-undead', ok);
      return { success: ok, monster: room.monster.name };
    }

    case 'bribe': {
      party.gold -= 15;
      party.addScore(5);
      room.cleared = true;
      return { success: true, goldSpent: 15, monster: room.monster.name };
    }

    case 'flee': {
      // Gradient: you escape, but worn — and the room stays hot
      party.takeDamage(2);
      return { success: true, retreated: true, monster: room.monster.name };
    }

    /* Traps */
    case 'disarm': {
      const rogueMind = Math.max(...party.living().filter(m => m.class === CLASSES.ROGUE).map(m => m.mind));
      const prep = getPreparationBonuses(party);
      const preps = [];
      if (prep.notes.disarm) preps.push({ source: prep.notes.disarm, text: '🗝️ The Masterwork Lockpicks treated the mechanism as a lock, and every door is a suggestion.' });
      const ok = rogueMind + prep.disarm + roll() > 8;
      if (ok) {
        party.addScore(20);
        room.cleared = true;
      } else {
        party.takeDamage(Math.ceil(room.trapDamage / 2));
        room.cleared = true; // Sprung either way
      }
      party.recordEncounter('disarm', ok);
      return { success: ok, preps: ok ? preps : [] };
    }

    case 'push-through': {
      // The Craven's hidden upside: cowards notice tripwires, and
      // the party steps a little truer for the warning
      const spotter = party.hasPersonality('craven') ? 1 : 0;
      const prep = getPreparationBonuses(party);
      const preps = [];
      if (prep.trapSoak > 0) preps.push({ source: prep.notes.trapSoak, text: '🏮 The Everburning Lantern showed the plates before the boots found them.' });

      // The trap's kind decides what pushing through costs (Bestiary
      // for rooms, as it were): fire burns unless frost answers it,
      // poison is patient, an alarm mostly just *tells on you*
      const trapType = room.trapType || 'spike';
      let dmg = Math.max(1, (room.trapDamage || 3) - spotter - prep.trapSoak);
      if (trapType === 'fire') {
        if (hasSpell(party, 'sp-frost')) {
          dmg = Math.max(1, dmg - 2);
          preps.push({ source: 'Frost Lance', text: '❄️ Frost Lance meets the jet of flame halfway, and the corridor fills with warm rain instead.' });
        } else {
          dmg += 1;
        }
      } else if (trapType === 'poison') {
        dmg = Math.max(1, Math.ceil(dmg / 2));
        if (party.hasClass(CLASSES.CLERIC)) {
          preps.push({ source: 'the cleric', text: '🐍 The needles bite, but the cleric draws the venom before it can settle in.' });
        } else {
          party.poisonLinger = (party.poisonLinger || 0) + 2;
          preps.push({ source: 'the trap', text: '🐍 The needles barely sting. That is what worries the ones who know poison.' });
        }
      } else if (trapType === 'alarm') {
        dmg = Math.min(dmg, 2);
        party.alarmed = true;
        preps.push({ source: 'the alarm', text: '🔔 Bells. Bells all the way down. Everything ahead now knows the party\'s pace and number.' });
      }

      party.takeDamage(dmg);
      room.cleared = true;
      return { success: true, damage: dmg, spotted: spotter > 0, trapType, preps };
    }

    case 'smoke-bomb': {
      // A material spent from a safe distance beats bravery every time
      party.materials -= 1;
      party.addScore(15);
      room.cleared = true;
      party.recordEncounter('smoke-bomb', true);
      return { success: true, materialsLeft: party.materials };
    }

    case 'search-around': {
      const ok = party.bestMind() + roll() > 8;
      if (!ok) party.takeDamage(Math.ceil((room.trapDamage || 3) / 2));
      room.cleared = true;
      return { success: ok };
    }

    case 'spell-bypass': {
      const spell = party.castSpell('utility');
      room.cleared = true;
      party.addScore(10);
      return { success: true, spell: spell ? spell.name : null };
    }

    /* Treasure */
    case 'loot': {
      const mimic = Math.random() < (room.mimicChance || 0);
      if (mimic) {
        party.takeDamage(5);
        party.addGold(Math.floor((room.gold || 20) / 2));
        room.cleared = true;
        return { success: false, mimic: true, gold: Math.floor((room.gold || 20) / 2) };
      }
      party.addGold(room.gold || 20);
      room.cleared = true;
      // Hoards hold more than coin — vaults always do
      const preps = [];
      const find = rollFind(party, room.type === ROOM_TYPES.VAULT);
      if (find) preps.push(find);
      return { success: true, gold: room.gold || 20, preps };
    }

    case 'inspect': {
      // Safe but slower: slightly less gold (someone else's leavings)
      // — unless practiced fingers or a cunning eye lose nothing
      const prep = getPreparationBonuses(party);
      const preps = [];
      let gold = Math.floor((room.gold || 20) * 0.8);
      if (prep.cleanInspect) {
        gold = room.gold || 20;
        preps.push({ source: prep.notes.cleanInspect, text: `🔍 ${prep.notes.cleanInspect === 'the Cunning' ? 'The Cunning eye misses nothing, and nothing is left behind' : 'The Masterwork Lockpicks open the false bottom too'} — the full hoard, safely.` });
      }
      party.addGold(gold);
      room.cleared = true;
      const find = rollFind(party, room.type === ROOM_TYPES.VAULT);
      if (find) preps.push(find);
      return { success: true, gold, careful: true, preps };
    }

    case 'knock-open': {
      // Knock opens any lock. Loudly. The mimic springs at range,
      // the coin is honest, and everything below now knows you're here.
      const spell = party.castSpell('utility', 'sp-knock');
      const gold = room.gold || 20;
      party.addGold(gold);
      room.cleared = true;
      party.recordEncounter('knock-open', true);
      return {
        success: true, gold, spell: spell ? spell.name : 'Knock',
        consumed: spell ? spell.consumed : false,
        wasMimic: Math.random() < (room.mimicChance || 0),
      };
    }

    case 'leave-it': {
      room.cleared = true;
      return { success: true, gold: 0 };
    }

    /* Library */
    case 'study': {
      const learned = party.hasPersonality('scholarly') ? 2 : 1;
      party.spellsLearned += learned;
      party.addScore(learned * 20);
      // Learning adds a real spell to the grimoire
      for (let i = 0; i < learned; i++) {
        party.grimoire.push({
          id: `learned-${Date.now()}-${i}`, name: 'Found Cantrip', icon: '📜',
          school: 'found', power: 3, use: Math.random() < 0.5 ? 'combat' : 'utility',
          text: 'Copied from the stacks.',
        });
      }
      room.cleared = true;
      return { success: true, learned };
    }

    case 'deep-study': {
      const wizardMind = Math.max(...party.living().filter(m => m.class === CLASSES.WIZARD).map(m => m.mind));
      const prep = getPreparationBonuses(party);
      const preps = prep.deepStudy > 0
        ? [{ source: prep.notes.deepStudy, text: '📖 The Grimoire of Low Whispers argued with the sealed text in its own language, and won.' }]
        : [];
      const ok = wizardMind + prep.deepStudy + roll() > 9;
      if (ok) {
        party.spellsLearned += 2;
        party.addScore(50);
        party.grimoire.push({
          id: `sealed-${Date.now()}`, name: 'Sealed Working', icon: '🔏',
          school: 'forbidden', power: 6, use: 'combat', text: 'The margins screamed. The wizard did not.',
        });
      } else {
        party.takeDamage(4);
      }
      room.cleared = true;
      party.recordEncounter('deep-study', ok);
      return { success: ok, preps: ok ? preps : [] };
    }

    /* Shrine */
    case 'rest': {
      const bonus = party.hasPersonality('pious') ? 4 : 0;
      for (const m of party.living()) m.heal(5 + bonus);
      room.cleared = true;
      return { success: true, healed: 5 + bonus };
    }

    case 'desecrate': {
      party.addGold(30);
      // The dungeon remembers: next disaster hits harder (gradient, not instant karma)
      party.desecrated = true;
      room.cleared = true;
      return { success: true, gold: 30, ominous: true };
    }

    /* Lab */
    case 'alchemy': {
      const result = party.doAlchemy();
      room.cleared = true;
      party.addScore(25);
      return { success: true, alchemy: result };
    }

    /* Materials */
    case 'gather': {
      party.materials += room.materials || 1;
      party.addScore(5);
      room.cleared = true;
      return { success: true, materials: room.materials || 1 };
    }

    /* Disaster */
    case 'brace': {
      const dmg = (party.desecrated ? 8 : 5);
      party.takeDamage(Math.max(1, dmg - Math.floor(party.totalDefense() / 4)));
      room.cleared = true;
      // A healing working steadies the line as the dust settles
      const preps = [];
      const heal = party.castSpell('heal');
      if (heal) {
        party.healParty(heal.effectivePower);
        preps.push({ source: heal.name, text: `💚 ${heal.name} knits the party back together while the dungeon finishes its tantrum.` });
      }
      return { success: true, damage: dmg, preps };
    }

    case 'scatter': {
      // Each member saves individually — gradient chaos
      let hurt = 0;
      for (const m of party.living()) {
        if (roll() < 4) {
          m.takeDamage(3);
          hurt++;
        }
      }
      room.cleared = true;
      return { success: hurt <= 1, hurt };
    }

    /* Default */
    case 'pass-by':
    case 'proceed':
    default: {
      room.cleared = true;
      return { success: true };
    }
  }
}
