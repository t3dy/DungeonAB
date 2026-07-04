/**
 * RoomEncounters — options and outcomes per room type
 *
 * Adapted from SnakeAB's encounter engine: options are gated by
 * party composition (classes present, spells held), decisions are
 * weighted by personality archetypes, outcomes are gradient.
 */

import { CLASSES } from '../game/Cards.js';
import { ROOM_TYPES } from '../world/DungeonGen.js';

function roll() {
  return Math.random() * 10;
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
      return opts;
    }

    case ROOM_TYPES.TREASURE: {
      return [
        { id: 'loot', name: 'Loot It All', desc: 'Everything shiny goes in the bags' },
        { id: 'inspect', name: 'Inspect First', desc: 'Check for mimics and curses' },
        { id: 'leave-it', name: 'Leave It', desc: 'Some gold is bait' },
      ];
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

      // Auto-battle: rounds of party attack vs monster attack
      let rounds = 0;
      while (monsterHealth > 0 && party.isAlive() && rounds < 12) {
        rounds++;
        monsterHealth -= Math.max(1, party.totalAttack() + Math.floor(roll() / 3));
        if (monsterHealth <= 0) break;
        const incoming = Math.max(1, monster.attack - Math.floor(party.totalDefense() / 3));
        party.takeDamage(incoming);
        partyDamageTaken += incoming;
        party.quaffIfNeeded();
      }

      const won = monsterHealth <= 0 && party.isAlive();
      if (won) {
        const bounty = monster.isBoss ? 100 : 25;
        party.addScore(bounty);
        room.cleared = true;
      }
      party.recordEncounter('fight', won);
      return { success: won, rounds, damage: partyDamageTaken, monster: monster.name };
    }

    case 'spell-strike': {
      const spell = party.castSpell('combat');
      const monster = room.monster;
      if (spell) {
        monster.health = Math.max(1, monster.health - spell.effectivePower);
      }
      // Then fight the softened monster
      const result = resolveRoomAction(room, party, 'fight');
      result.spell = spell ? spell.name : null;
      return result;
    }

    case 'sneak': {
      const rogueMind = Math.max(...party.living().filter(m => m.class === CLASSES.ROGUE).map(m => m.mind));
      const ok = rogueMind + roll() > 9;
      if (ok) {
        party.addScore(15);
        room.cleared = true;
      } else {
        party.takeDamage(Math.ceil(room.monster.attack / 2));
      }
      party.recordEncounter('sneak', ok);
      return { success: ok, monster: room.monster.name };
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
      const ok = rogueMind + roll() > 8;
      if (ok) {
        party.addScore(20);
        room.cleared = true;
      } else {
        party.takeDamage(Math.ceil(room.trapDamage / 2));
        room.cleared = true; // Sprung either way
      }
      party.recordEncounter('disarm', ok);
      return { success: ok };
    }

    case 'push-through': {
      party.takeDamage(room.trapDamage || 3);
      room.cleared = true;
      return { success: true, damage: room.trapDamage || 3 };
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
      return { success: true, gold: room.gold || 20 };
    }

    case 'inspect': {
      // Safe but slower: slightly less gold (someone else's leavings)
      const gold = Math.floor((room.gold || 20) * 0.8);
      party.addGold(gold);
      room.cleared = true;
      return { success: true, gold, careful: true };
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
      const ok = wizardMind + roll() > 9;
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
      return { success: ok };
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
      return { success: true, damage: dmg };
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
