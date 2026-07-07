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
import { elixirDef } from '../game/Elixirs.js';

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
    sneak: 0, disarm: 0, deepStudy: 0, secretDoor: 0, trapSoak: 0, gather: 0,
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
  if (hasItem(party, 'eq-alembic')) {
    b.gather += 1;
    b.notes.gather = 'the Portable Alembic';
  }
  if (hasSpell(party, 'sp-eyes')) {
    b.secretDoor += 1;
    b.notes.secretDoorEyes = 'Eyes of the Mouse';
  }
  if (hasSpell(party, 'sp-feather')) {
    b.trapSoak += 1;
    b.notes.trapSoak = b.notes.trapSoak || 'Feather Step';
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

    case ROOM_TYPES.SHOP: {
      const cheapest = Math.min(...(room.stock || []).filter(g => !g.sold).map(g => g.price), Infinity);
      const opts = [
        { id: 'rob-peddler', name: 'Rob the Peddler', desc: 'The peddler is armed. They always are.' },
        { id: 'pass-by', name: 'Window-Shop and Walk', desc: 'The satchel stays light, the coin stays heavy' },
      ];
      if (party.gold >= cheapest) {
        opts.unshift({ id: 'buy-goods', name: 'Buy What\'s Needed', desc: 'Honest coin for honest goods' });
        if (party.hasClass(CLASSES.ROGUE) || party.hasPersonality('cunning')) {
          opts.splice(1, 0, { id: 'haggle-hard', name: 'Haggle Hard', desc: 'The same goods for less, if the tongue is quick' });
        }
      }
      return opts;
    }

    case ROOM_TYPES.STAIRS: {
      return [
        { id: 'descend', name: 'Descend', desc: 'Down the worn steps, torches first' },
        { id: 'rest-landing', name: 'Rest on the Landing', desc: 'Catch breath at the threshold, then down' },
      ];
    }

    case ROOM_TYPES.ALTAR: {
      const opts = [
        { id: 'pray-quietly', name: 'Pray Quietly', desc: 'Costs nothing; small gods hear small prayers' },
        { id: 'pass-by', name: 'Keep Marching', desc: 'Gods keep their own hours' },
      ];
      if (party.gold > 0) {
        opts.unshift({ id: 'offer-gold', name: 'Make an Offering', desc: 'Gold on the stone; the god weighs it' });
      }
      // Blood is only offered by someone sturdy enough to spare it
      if (party.living().some(m => m.health > 8)) {
        opts.splice(opts.length - 1, 0, { id: 'offer-blood', name: 'Offer Blood', desc: 'Five health for a keener edge, forever' });
      }
      return opts;
    }

    default:
      return [{ id: 'proceed', name: 'Proceed', desc: 'Onward and downward' }];
  }
}

/* ------------------------------------------------------------------ */
/* Personality weighting — archetypes bias the party's choice          */
/* ------------------------------------------------------------------ */

const PERSONALITY_WEIGHTS = {
  brave: { fight: 3, 'push-through': 2, brace: 2, flee: -2, 'leave-it': -1, 'offer-blood': 2, descend: 1 },
  cunning: { sneak: 3, disarm: 3, bribe: 2, inspect: 2, 'spell-bypass': 2, fight: -1, 'haggle-hard': 3, 'offer-gold': -1 },
  greedy: { loot: 4, desecrate: 2, gather: 2, 'leave-it': -3, bribe: -2, 'rob-peddler': 3, 'offer-gold': -3 },
  scholarly: { study: 3, 'deep-study': 3, 'spell-strike': 2, 'spell-bypass': 2 },
  pious: { rest: 3, 'turn-undead': 3, desecrate: -5, 'offer-gold': 2, 'pray-quietly': 3, 'rob-peddler': -5, 'offer-blood': -1 },
  reckless: { fight: 2, 'push-through': 3, loot: 2, inspect: -2, 'search-around': -2, 'rob-peddler': 2, 'offer-blood': 3, descend: 2 },
  craven: { flee: 3, sneak: 2, disarm: 2, 'search-around': 2, inspect: 1, scatter: 2, fight: -2, 'push-through': -2, brace: -1, 'cause-fear': 3, 'smoke-bomb': 2, 'knock-open': 1, 'rob-peddler': -3, 'offer-blood': -2, 'buy-goods': 1, 'rest-landing': 2 },
};

/* Preparation-gated options are attractive to those who'd use them */
const PREP_OPTION_WEIGHTS = {
  'knock-open': { base: 1.5, cunning: 2, scholarly: 1 },
  'cause-fear': { base: 1.5, cunning: 1 },
  'smoke-bomb': { base: 1.5, cunning: 2 },
};

/**
 * The party reads the monster's nature and weighs its options like
 * people who intend to live: steel is a bad plan against the
 * ethereal (without faith), spells shine against the armored and
 * the swarming, and nobody rushes the venomous without a cleric.
 * Pure — returns weight deltas keyed by option id.
 */
export function natureAdjustments(party, room) {
  const m = room?.monster;
  if (!m) return {};
  const adj = {};
  const add = (id, v) => { adj[id] = (adj[id] || 0) + v; };

  if (m.trait === 'ethereal' && !party.hasClass(CLASSES.CLERIC)) {
    add('fight', -2);
    add('sneak', 2);
    add('spell-strike', 2);
  }
  if (m.trait === 'armored') {
    add('spell-strike', 1.5);
    add('fight', -0.5);
  }
  if (m.trait === 'venomous' && !party.hasClass(CLASSES.CLERIC)) {
    add('sneak', 1.5);
    add('cause-fear', 1.5);
    add('fight', -1);
  }
  if (m.trait === 'swarm') {
    add('spell-strike', 2);
  }
  // A caster holding the foe's weakness knows it — and wants to use it
  const combatSpells = party.grimoire.filter(s => s.use === 'combat');
  if (combatSpells.some(s => elementMult(s, m) > 1)) {
    add('spell-strike', 2);
  }
  return adj;
}

export function decideRoomAction(room, party) {
  const options = getRoomOptions(room, party);
  if (options.length === 0) return null;
  if (options.length === 1) return options[0].id;

  const nature = natureAdjustments(party, room);
  const weights = options.map(opt => {
    let w = 1.0;
    for (const archetype of party.personalities) {
      const table = PERSONALITY_WEIGHTS[archetype];
      if (table && table[opt.id] !== undefined) w += table[opt.id];
    }

    // Instincts independent of personality
    if (opt.id === 'alchemy') w += 3;                       // Benches get used
    if (opt.id === 'gather') w += 2;                        // Satchels get filled
    // A stall is most tempting to the hurt and the under-supplied
    if (opt.id === 'buy-goods' || opt.id === 'haggle-hard') {
      w += 2;
      if (party.totalHealth() / party.totalMaxHealth() < 0.6) w += 2;
      if (party.hasClass(CLASSES.ALCHEMIST) && party.materials === 0) w += 1;
    }
    if (opt.id === 'rob-peddler') w -= 1;                   // Most people aren't bandits
    // Rich parties tithe more easily; the poisoned pray harder
    if (opt.id === 'offer-gold' && party.gold >= (room.demand || 20)) w += 2;
    if (opt.id === 'pray-quietly' && (party.poisonLinger || 0) > 0) w += 2;
    // A battered party lingers on the landing before going deeper
    if (opt.id === 'rest-landing' && party.totalHealth() / party.totalMaxHealth() < 0.5) w += 3;
    const prep = PREP_OPTION_WEIGHTS[opt.id];
    if (prep) {
      w += prep.base;
      for (const archetype of party.personalities) {
        if (prep[archetype]) w += prep[archetype];
      }
    }
    // The monster's nature argues for and against certain plans
    if (nature[opt.id]) w += nature[opt.id];
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
/* Boss phases — at half health, the fight changes                     */
/* ------------------------------------------------------------------ */

const BOSS_PHASE_LINES = {
  'vampire-lord': '🩸 Half-spent, the Lord stops apologizing. The temperature of the room drops with his manners.',
  'the-bride': '🩸 The Bride lets the Lord\'s name fall from her like a shawl, and what remains is far older.',
  'bog-witch': '🍲 The Witch stops smiling like a hostess and starts smiling like a cook.',
  'mad-pyromancer': '🔥 Bleeding, the Pyromancer remembers why he was exiled, and shares the memory generously.',
  'mad-alchemist': '⚗️ The Alchemist drinks something from his own belt that no committee ever approved.',
  'rebis': '👑 The Rebis turns its second face forward. That one has been resting.',
  'shrouded-king': '👑 The Shroud comes off. It was never a shroud.',
  'glacier-heart': '💠 The Heart cracks down its center, and both halves are angrier.',
};
const BOSS_PHASE_GENERIC = [
  '💢 Half-dead, the thing stops playing with its food.',
  '💢 Wounded past its patience, it becomes what the warnings were about.',
];

function bossPhaseLine(monster) {
  return BOSS_PHASE_LINES[monster.kind] || BOSS_PHASE_GENERIC[monster.health % BOSS_PHASE_GENERIC.length];
}

/* Signature moves get their beat the first time they fire */
const MOVE_LINES = {
  breath: m => `🔥 ${m.move.name}: the thing draws breath and the corridor becomes weather. Shields help less than the party hoped.`,
  drain: m => `🩸 ${m.move.name} — the blow doesn't just hurt, it *feeds*. The party watches its own warmth close the thing's wounds.`,
  hex: m => `🧿 ${m.move.name}: it mutters something backwards, and every sword in the party grows a little heavier.`,
  crush: m => `💢 ${m.move.name} — it stops swiping and starts slamming. That one came through the shields.`,
};

function monsterMoveLine(monster, move) {
  const line = MOVE_LINES[move.kind];
  return line ? line({ move }) : `💢 ${move.name} — the thing has more than teeth, and now the party knows it.`;
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
 * Roll a bonus find: a potion, materials, a spell scroll, a trinket,
 * or an unlabeled phial. Vaults and boss hoards always hold one.
 * Returns a prep entry (source + chronicle text) or null.
 */
export function rollFind(party, always = false, rollValue = Math.random()) {
  if (!always && rollValue > 0.35) return null;
  const kind = Math.floor((always ? rollValue : rollValue / 0.35) * 5) % 5;

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
  if (kind === 3) {
    const trinket = TRINKETS[Math.floor(rollValue * 991) % TRINKETS.length];
    party.assignEquipment({ ...trinket, id: `${trinket.id}-${Date.now().toString(36)}` });
    return { source: trinket.name, find: 'trinket', text: `🍀 Among the coins, ${trinket.name} — claimed, worn, already working.` };
  }
  // An unlabeled phial — someone's experiment, still corked
  const phial = party.makePhial(rollValue);
  return resolvePhialFind(party, phial, (rollValue * 977) % 1);
}

/**
 * The identification beat (NetHack quaff-test tradition). An unknown
 * phial gets named by whoever can name it: the party's lore, the
 * alchemist's nose, a scholar's memory — or a reckless volunteer's
 * stomach. Whatever isn't identified is pocketed unknown. Mutates the
 * party; returns a prep entry for the chronicle. Pass rollValue to
 * make it deterministic.
 */
export function resolvePhialFind(party, phial, rollValue = Math.random()) {
  const known = party.knowsPhial(phial);
  if (known) {
    const def = elixirDef(known);
    party.phials.push(phial);
    return {
      source: def.name, find: 'phial',
      text: `${def.icon} A ${phial.appearance} phial — known stock by now: ${def.name}. Into the satchel it goes.`,
    };
  }

  const alchemist = party.living().find(m => m.class === CLASSES.ALCHEMIST);
  if (alchemist) {
    const def = party.learnPhial(phial);
    party.phials.push(phial);
    return {
      source: alchemist.name, find: 'phial',
      text: `⚗️ ${alchemist.name} uncorks the ${phial.appearance} phial, wafts once, and names it without drinking: ${def.name}.`,
    };
  }

  if (party.hasPersonality('scholarly') && rollValue < 0.5) {
    const def = party.learnPhial(phial);
    party.phials.push(phial);
    return {
      source: 'the Scholarly', find: 'phial',
      text: `📖 The Scholarly memory produces a treatise page, word for word: ${phial.appearance} means ${def.name}.`,
    };
  }

  if (party.hasPersonality('reckless') || party.hasPersonality('brave')) {
    const { def, taster } = party.drinkPhial(phial);
    const verdict = def.good
      ? `and the news is good: ${def.name} works from the inside out.`
      : `and regrets it at once — ${def.name}, learned the hard way.`;
    return {
      source: taster.name, find: 'phial',
      text: `${def.icon} Nobody can name the ${phial.appearance} phial, so ${taster.name} quaff-tests it, ${verdict}`,
    };
  }

  party.phials.push(phial);
  return {
    source: 'the hoard', find: 'phial',
    text: `🧪 A ${phial.appearance} phial, unlabeled. The party pockets the mystery for someone braver to solve.`,
  };
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
 * Can the party pick a locked branch door? Rogues' work (with a real
 * bonus from Masterwork Lockpicks); everyone else is just rattling
 * the handle. Pure — pass the roll.
 */
export function pickLock(party, rollValue = roll()) {
  const rogues = party.living().filter(m => m.class === CLASSES.ROGUE);
  if (rogues.length === 0) return false;
  const fingers = Math.max(...rogues.map(m => m.mind));
  return fingers + getPreparationBonuses(party).disarm + rollValue > 9;
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
/* The peddler and the altar (Phase 5: shops and offerings)            */
/* ------------------------------------------------------------------ */

/**
 * The party shops by need: mending first if anyone bleeds, the bench
 * fed if an alchemist marches, an iron key for whatever door is
 * sulking ahead. At most two purchases — the peddler doesn't stock
 * for armies. Mutates the party and marks stock sold; returns the
 * bought goods with the prices actually paid.
 */
export function buyFromStock(party, room, discountMult = 1) {
  const stock = room.stock || [];
  const price = g => Math.max(1, Math.round(g.price * discountMult));

  const wants = [];
  if (party.totalHealth() / party.totalMaxHealth() < 0.85) wants.push('draught');
  if (party.hasClass(CLASSES.ALCHEMIST)) wants.push('materials');
  wants.push('key', 'draught', 'materials');

  const bought = [];
  for (const id of wants) {
    if (bought.length >= 2) break;
    const good = stock.find(g => g.id === id && !g.sold);
    if (!good || party.gold < price(good)) continue;
    party.gold -= price(good);
    good.sold = true;
    if (id === 'draught') party.potions.push({ kind: 'healing-draught', heal: 6 });
    if (id === 'materials') party.materials += 2;
    if (id === 'key') party.keys = (party.keys || 0) + 1;
    bought.push({ ...good, paid: price(good) });
  }
  return bought;
}

/**
 * Does the haggling land? Quick tongues (cunning) and quick fingers
 * (a rogue's mind) knock the prices down. Pure — pass the roll.
 */
export function haggleCheck(party, rollValue = roll()) {
  const edge = party.hasPersonality('cunning') ? 1.5 : 0;
  return party.bestMind() + edge + rollValue > 9;
}

/**
 * Robbing the peddler. The peddler is armed. They always are.
 * Pure — pass the roll.
 */
export function robCheck(party, rollValue = roll()) {
  const rogueEdge = party.hasClass(CLASSES.ROGUE) ? 2 : 0;
  return party.bestMind() + rogueEdge + rollValue > 11;
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
      // An altar's warding blessing blunts every round, like a shield
      ward += party.blessedWard || 0;
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

      // An elemental coating on someone's blade bites deeper into
      // flesh that hates its element (the alchemist's bench pays off)
      const coating = party.coatingBonusVs(monster);
      if (coating.bonus > 0) {
        preps.push({ source: coating.notes.join(' + '), text: `⚗️ The ${coating.notes.join(' and ')} meets flesh that hates it — every stroke bites deeper.` });
      }

      // Auto-battle: rounds of party attack vs monster attack.
      // Corridor frontage: only ~5 blades work at once, so a mob
      // of drafted heroes helps less than it thinks it does.
      // Bosses turn the fight at half health. Every exchange is
      // logged — the chronicle and the renderer replay it blow by blow.
      const maxHealth = monster.health;   // pre-opening: the bar starts honest
      const combatLog = [];
      if (opening > 0) {
        const opener = itemActions.find(a => a.opening || a.vsUndead);
        combatLog.push({
          round: 0,
          events: [{ kind: 'opening', name: opener?.member, item: opener?.item, amount: opening }],
          monsterHp: Math.max(0, monsterHealth),
        });
      }

      let rounds = 0;
      let phased = false;
      let routed = false;
      let crits = 0;
      let hexPenalty = 0;   // a muttered working makes every sword heavier
      let moveSeen = false;
      while (monsterHealth > 0 && party.isAlive() && rounds < 12) {
        rounds++;
        const events = [];

        // The party's aggregate swing, attributed blade by blade so
        // the chronicle knows whose hit was whose. The Reckless commit
        // — fury is worth a point a round, which is the whole appeal.
        const fury = party.hasPersonality('reckless') ? 1 : 0;
        let swing = Math.max(1, Math.round((party.combatAttack() + summon + coating.bonus + fury + Math.floor(roll() / 3)) * etherealMult) - armorShave - hexPenalty);
        const baseSwing = swing;   // shares split the base; crits stack on top
        const front = party.living().slice().sort((a, b) => b.attack - a.attack).slice(0, 5);
        const attackSum = front.reduce((s, m) => s + m.attack, 0) || 1;
        let attributed = 0;
        front.forEach((m, i) => {
          let share = i === front.length - 1
            ? Math.max(0, baseSwing - attributed)
            : Math.max(0, Math.round(baseSwing * m.attack / attackSum));
          attributed += share;
          // A rogue's backstab: the same blade, twice, in the seam
          if (m.class === CLASSES.ROGUE && share > 0 && roll() > 7.5) {
            swing += share;
            crits++;
            events.push({ kind: 'hero-hit', name: m.name, amount: share * 2, crit: true });
          } else if (share > 0) {
            events.push({ kind: 'hero-hit', name: m.name, amount: share });
          }
        });
        // The wizard chips in a cantrip between real workings
        if (party.grimoire.some(s => s.use === 'combat')) {
          const wizard = party.living().find(m => m.class === CLASSES.WIZARD);
          if (wizard) {
            swing += 2;
            events.push({ kind: 'cantrip', name: wizard.name, amount: 2 });
          }
        }
        // The alchemist opens with a fizzing vial scraped from the
        // satchel — hotter off the Athanor Charm's miniature furnace
        if (rounds === 1 && party.materials >= 1) {
          const alch = party.living().find(m => m.class === CLASSES.ALCHEMIST);
          if (alch) {
            const vial = 3 + (hasItem(party, 'eq-athanor-charm') ? 1 : 0);
            swing += vial;
            events.push({ kind: 'vial', name: alch.name, amount: vial });
          }
        }

        monsterHealth -= swing;
        if (monsterHealth <= 0) {
          combatLog.push({ round: rounds, events, monsterHp: 0 });
          break;
        }

        // Morale: the badly hurt and the mercenary lose their nerve.
        // Bosses never run; the dead have nothing left to fear with.
        const nerve = monster.bribable ? 0.4 : 0.25;
        if (!monster.isBoss && !monster.undead && monsterHealth <= maxHealth * nerve && roll() > 6) {
          routed = true;
          events.push({ kind: 'rout' });
          combatLog.push({ round: rounds, events, monsterHp: Math.max(0, monsterHealth) });
          break;
        }

        if (monster.isBoss && !phased && monsterHealth <= monster.health / 2) {
          phased = true;
          monsterAtk += 2;
          preps.push({ source: monster.name, text: bossPhaseLine(monster) });
          events.push({ kind: 'phase' });
        }
        // The slow strike last: no incoming damage on the first round
        if (monster.trait === 'slow' && rounds === 1) {
          combatLog.push({ round: rounds, events, monsterHp: Math.max(0, monsterHealth) });
          continue;
        }
        // Signature moves (Bestiary): every N rounds the thing fights
        // with more than teeth — breath washes, drains feed, hexes
        // weigh down the party's swords, crushes come through shields
        const move = monster.move;
        if (move && rounds % move.every === 0) {
          const dmg = Math.max(1, monsterAtk + (move.bonus || 0) - Math.floor(party.totalDefense() / 3) - ward);
          party.takeDamage(dmg);
          partyDamageTaken += dmg;
          events.push({ kind: 'monster-move', move: move.kind, name: move.name, amount: dmg, element: move.element || null });
          if (move.kind === 'drain') {
            const fed = Math.ceil(dmg / 2);
            monsterHealth = Math.min(maxHealth, monsterHealth + fed);
            events.push({ kind: 'drain', amount: fed });
          }
          if (move.kind === 'hex') {
            hexPenalty = Math.min(2, hexPenalty + 1);
          }
          if (!moveSeen) {
            moveSeen = true;
            preps.push({ source: monster.name, text: monsterMoveLine(monster, move) });
          }
        } else {
          const incoming = Math.max(1, monsterAtk - Math.floor(party.totalDefense() / 3) - ward);
          party.takeDamage(incoming);
          partyDamageTaken += incoming;
          events.push({ kind: 'monster-hit', amount: incoming });
        }
        // The cleric works the line mid-fight, every third exchange
        if (rounds % 3 === 0 && party.isAlive() && party.hasClass(CLASSES.CLERIC)) {
          party.healParty(2);
          events.push({ kind: 'triage', amount: 2 });
        }
        party.quaffIfNeeded();
        combatLog.push({ round: rounds, events, monsterHp: Math.max(0, monsterHealth) });
      }

      const won = (monsterHealth <= 0 || routed) && party.isAlive();
      if (won) {
        const bounty = monster.isBoss ? 100 : monster.elite ? 40 : 25;
        party.addScore(routed ? Math.floor(bounty / 2) : bounty);
        room.cleared = true;
        // The venomous leave something behind — unless they fled with it
        if (monster.trait === 'venomous' && !routed) {
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
      return {
        success: won, rounds, damage: partyDamageTaken, monster: monster.name,
        itemActions, preps, bossPhased: phased,
        combatLog, crits, routed,
        monsterMaxHealth: maxHealth, monsterKind: monster.kind, elite: !!monster.elite,
      };
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
      // Gradient: you escape, but worn — and the room stays hot.
      // The Craven's other upside: they had the exit memorized, so a
      // craven party's retreat costs half as much hide.
      const craven = party.hasPersonality('craven');
      party.takeDamage(craven ? 1 : 2);
      return { success: true, retreated: true, monster: room.monster.name, clean: craven };
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
      const prep = getPreparationBonuses(party);
      const got = (room.materials || 1) + prep.gather;
      party.materials += got;
      party.addScore(5);
      room.cleared = true;
      const preps = prep.gather > 0
        ? [{ source: prep.notes.gather, text: `⚗️ ${prep.notes.gather} takes a cutting of everything — one bundle more than bare hands would carry.` }]
        : [];
      return { success: true, materials: got, preps };
    }

    /* Shop */
    case 'buy-goods': {
      const bought = buyFromStock(party, room, 1);
      room.cleared = true;
      party.recordEncounter('buy-goods', bought.length > 0);
      return { success: bought.length > 0, bought, goldLeft: party.gold };
    }

    case 'haggle-hard': {
      const haggled = haggleCheck(party);
      // A failed haggle stings the pride, not the purse: full price
      const bought = buyFromStock(party, room, haggled ? 0.7 : 1);
      if (haggled && bought.length > 0) party.addScore(10);
      room.cleared = true;
      party.recordEncounter('haggle-hard', haggled);
      return { success: bought.length > 0, haggled, bought, goldLeft: party.gold };
    }

    case 'rob-peddler': {
      const ok = robCheck(party);
      room.cleared = true;
      if (ok) {
        // Grab what isn't nailed down: two goods and the till
        const stolen = [];
        for (const good of (room.stock || []).filter(g => !g.sold).slice(0, 2)) {
          good.sold = true;
          if (good.id === 'draught') party.potions.push({ kind: 'healing-draught', heal: 6 });
          if (good.id === 'materials') party.materials += 2;
          if (good.id === 'key') party.keys = (party.keys || 0) + 1;
          stolen.push({ ...good });
        }
        const till = 15;
        party.addGold(till);
        party.recordEncounter('rob-peddler', true);
        return { success: true, stolen, gold: till };
      }
      // The crossbow under the counter, and word travels fast down here
      party.takeDamage(6);
      party.alarmed = true;
      for (const good of room.stock || []) good.sold = true; // the stall packs up
      party.recordEncounter('rob-peddler', false);
      return { success: false, damage: 6, alarmed: true };
    }

    /* Altar */
    case 'offer-gold': {
      const demand = room.demand || 20;
      room.cleared = true;
      // A desecrating party's coin is refused — the god remembers the
      // pried-off leaf, and won't touch what those hands held
      if (party.desecrated) {
        party.recordEncounter('offer-gold', false);
        return { success: false, refused: true, demand };
      }
      const paid = Math.min(party.gold, demand);
      party.gold -= paid;
      let boon = null;
      if (paid >= demand) {
        // The god weighs the coin and pays in kind
        const boons = ['mending', 'warding', 'keen-edge'];
        boon = boons[(room.index + paid) % boons.length];
        if (boon === 'mending') {
          for (const m of party.living()) m.heal(5);
        } else if (boon === 'warding') {
          party.blessedWard = (party.blessedWard || 0) + 1;
        } else {
          const strikers = party.living().sort((a, b) => b.attack - a.attack).slice(0, 2);
          for (const m of strikers) m.baseAttack += 1;
        }
        party.addScore(15);
      } else if (paid >= demand / 2) {
        // A light purse gets a light blessing
        party.healParty(4);
        boon = 'small-mercy';
      }
      party.recordEncounter('offer-gold', !!boon);
      return { success: !!boon, paid, demand, boon };
    }

    case 'offer-blood': {
      const volunteer = party.living()
        .filter(m => m.health > 8)
        .reduce((a, b) => a.health >= b.health ? a : b);
      volunteer.takeDamage(5);
      volunteer.baseAttack += 2;
      party.addScore(10);
      room.cleared = true;
      party.recordEncounter('offer-blood', true);
      return { success: true, volunteer: volunteer.name, damage: 5 };
    }

    case 'pray-quietly': {
      const pious = party.hasPersonality('pious');
      const cleansed = (party.poisonLinger || 0) > 0;
      party.poisonLinger = 0;   // small gods draw venom for free
      const healed = pious ? 4 : 2;
      party.healParty(healed);
      room.cleared = true;
      return { success: true, healed, cleansed, pious };
    }

    /* Stairs — the way down to the next floor */
    case 'descend': {
      party.addScore(10);   // going deeper is progress, and progress pays
      room.cleared = true;
      return { success: true, floor: (room.floor || 0) + 2 };   // human-numbered: floor 2, 3...
    }

    case 'rest-landing': {
      // A breather at the threshold: the whole party steadies itself
      for (const m of party.living()) m.heal(2);
      party.addScore(10);
      room.cleared = true;
      return { success: true, healed: 2, floor: (room.floor || 0) + 2 };
    }

    /* Disaster */
    case 'brace': {
      const dmg = (party.desecrated ? 8 : 5);
      party.takeDamage(Math.max(1, dmg - Math.floor(party.totalDefense() / 4) - (party.blessedWard || 0)));
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
