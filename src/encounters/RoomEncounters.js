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
import { claimDrop, bonusText } from '../game/Drops.js';
import {
  FEATURE_ACTIONS, featureActions, featureModifiers, featureActionWeights,
  isFeatureAction, getFeature, roomFeatures, actionTier,
} from '../world/RoomFeatures.js';
import { reactionsFor, foldReactions } from '../world/Reactions.js';
import { tacticModifiers, activeTactics } from '../game/Tactics.js';
import { chooseFormation, formationModifiers } from '../agents/Formation.js';

function roll() {
  return Math.random() * 10;
}

/**
 * A loosed working does not stop working.
 *
 * Measured, this is the whole reason the arcane package lost. In a
 * controlled A/B — identical bodies and seeds, three equipment cards
 * against three combat spells — both arms reached the boss ~100% of the
 * time, and the entire 30-point win gap was the boss chamber itself:
 * 34.8 damage taken with equipment against 42.9 with spells. A +2
 * weapon is +2 for all twelve rounds of a boss fight; a one-shot burst
 * off a large health pool is a rounding error, and the spell arm's
 * fights ran longer, so it bled more. Equipment scaled with fight
 * length and spells did not scale at all.
 *
 * So a combat working now keeps a share of its force for the rest of
 * the fight: the fire goes on burning, the frost goes on biting. That
 * is the same shape Aegis of Ash always had — a ward that blunts
 * *every* round — which is exactly why it was the least-bad spell in
 * the pool (DESIGN_DIALOGUE.md §8).
 */
export const SPELL_SUSTAIN_SHARE = 0.5;

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

/**
 * The room's furniture, as options. A pit is scenery until somebody
 * brings a line or the muscle to shove; a sarcophagus is a wall until
 * somebody drafted a prybar. This is where room features and drafted
 * cards meet (world/RoomFeatures.js).
 */
export function getFeatureOptions(room, party) {
  return featureActions(room, party, {
    item: id => hasItem(party, id),
    spell: id => hasSpell(party, id),
    tactic: id => activeTactics(party).some(t => t.id === id),
  });
}

/**
 * Can the party cook a material down into lamp oil?
 *
 * The alembic's answer to the supply clock. It used to want a materials
 * room and three marches of oil or fewer, and the coincidence of those
 * with the card in the pack meant tools/census.mjs saw it fire in under
 * one delve in twenty-five. A lab bench is the obvious other place to
 * do it, and five marches is still running low.
 */
export function canBrewOil(party) {
  return hasItem(party, 'eq-alembic') && party.materials > 0 && party.supply <= 5;
}

export function getRoomOptions(room, party) {
  return [...baseRoomOptions(room, party), ...getFeatureOptions(room, party)];
}

function baseRoomOptions(room, party) {
  switch (room.type) {
    case ROOM_TYPES.MONSTER:
    case ROOM_TYPES.BOSS: {
      // Twice is a retreat; a third time is a rout, and the room does
      // not allow one — whatever is in it is between them and the door.
      const CORNERED_AT = 2;
      const opts = [{ id: 'fight', name: 'Fight', desc: 'Steel and teamwork' }];
      if ((room.fled || 0) < CORNERED_AT) {
        opts.push({
          id: 'flee', name: 'Fall Back',
          desc: `Retreat and try the fight later, worn down: ${2 * ((room.fled || 0) + 1)} damage`,
        });
      }
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
      // The alembic turns the bench on the supply clock: a material
      // cooked down into light. Only worth offering when the lamp
      // actually needs it, or the party will brew oil it cannot carry.
      if (canBrewOil(party)) {
        opts.unshift({ id: 'brew-oil', name: 'Cook Down Lamp Oil', desc: 'A material becomes two marches of light' });
      }
      return opts;
    }

    case ROOM_TYPES.MATERIALS: {
      const opts = [
        { id: 'gather', name: 'Gather Materials', desc: 'Herbs, salts, quicksilver' },
        { id: 'pass-by', name: 'Leave Them', desc: 'The satchel stays light' },
      ];
      if (canBrewOil(party)) {
        opts.push({ id: 'brew-oil', name: 'Cook Down Lamp Oil', desc: 'A material becomes two marches of light' });
      }
      return opts;
    }

    case ROOM_TYPES.STAIRS: {
      // The stairhead is the one place in a dungeon where stopping is
      // sensible: it is behind you if the floor above went badly, and
      // ahead of you it only gets worse. So the choice here is what to
      // spend before going down.
      const opts = [
        { id: 'descend', name: 'Go Down', desc: 'A long climb by lamplight: 1 supply' },
      ];
      if (hasItem(party, 'eq-grapple')) {
        opts.push({ id: 'rope-down', name: 'Rope Down the Well', desc: 'Straight down the shaft beside the stair: no supply spent' });
      }
      // Offered to the hurt and to the wounded. A party reaches the
      // stair at 96% health on average (tools/census.mjs), so a camp
      // that only healed was a choice nobody had a reason to make: what
      // it is really for is the wound the delve would otherwise keep.
      const hurt = party.living().some(m => m.health < m.effectiveMax());
      const wounded = party.living().some(m => m.wounds > 0);
      if (hurt || wounded) {
        opts.push({
          id: 'camp-stair', name: 'Camp at the Stairhead',
          desc: 'Sleep and eat before the next floor: 2 supply for 6 healed each and a wound set, and something may find you',
        });
      }
      return opts;
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
  brave: { fight: 3, 'push-through': 2, brace: 2, flee: -2, 'leave-it': -1, 'camp-stair': -1 },
  cunning: { sneak: 3, disarm: 3, bribe: 2, inspect: 2, 'spell-bypass': 2, fight: -1, 'rope-down': 2 },
  // Monsters always drop (Drops.js), so to the Covetous every fight
  // is a payday — and sneaking past one is leaving money on the floor
  greedy: { loot: 4, desecrate: 2, gather: 2, fight: 1, sneak: -1, 'leave-it': -3, bribe: -2, 'camp-stair': -1 },
  scholarly: { study: 3, 'deep-study': 3, 'spell-strike': 2, 'spell-bypass': 2 },
  pious: { rest: 3, 'turn-undead': 3, desecrate: -5, 'camp-stair': 2 },
  reckless: { fight: 2, 'push-through': 3, loot: 2, inspect: -2, 'search-around': -2, 'camp-stair': -3, descend: 2 },
  craven: { flee: 3, sneak: 2, disarm: 2, 'search-around': 2, inspect: 1, scatter: 2, fight: -2, 'push-through': -2, brace: -1, 'cause-fear': 3, 'smoke-bomb': 2, 'knock-open': 1, 'camp-stair': 3 },
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
  // The party reads the room, not just the monster. A caster holding
  // fire, standing in front of a stack of dry crates, can see what is
  // about to happen — and so can the player. Without this the reactions
  // existed but almost never fired: 55% of fight rooms held something
  // the party's elements could touch and a reaction landed in 15% of
  // them, because nobody thought to look up (Reactions.js).
  const areaHeld = party.grimoire.filter(sp => sp.use === 'combat' && sp.aoe);
  const roomAnswers = areaHeld.some(sp => reactionsFor(sp, room).length > 0);
  if (roomAnswers) {
    add('spell-strike', 3);
    add('fight', -1);
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
    const prep = PREP_OPTION_WEIGHTS[opt.id];
    if (prep) {
      w += prep.base;
      for (const archetype of party.personalities) {
        if (prep[archetype]) w += prep[archetype];
      }
    }
    // Using the room is its own temptation, and each archetype has
    // opinions about which piece of furniture to reach for
    const featWeights = featureActionWeights(opt.id);
    if (featWeights) {
      w += 1.2;                                  // furniture invites use
      for (const archetype of party.personalities) {
        if (featWeights[archetype]) w += featWeights[archetype];
      }
    }
    // The monster's nature argues for and against certain plans
    if (nature[opt.id]) w += nature[opt.id];
    if (opt.id === 'rest' && party.totalHealth() / party.totalMaxHealth() < 0.6) w += 3;

    // The stairhead. A party decides whether to stop by how much it has
    // left, not by temperament alone — without this the choice was a
    // coin flip and a party at 20% health walked down as often as a
    // party at 95%, which is a decision layer that cannot see the
    // mechanic (the reactions lesson again).
    if (opt.id === 'camp-stair') {
      const share = party.totalHealth() / party.totalMaxHealth();
      if (share < 0.5) w += 5;
      else if (share < 0.75) w += 2;
      else w -= 2;                            // barely scratched: not worth the oil
      // A wound is the other reason to stop, and it does not care how
      // full the health bars look: nothing else down here closes one
      if (party.living().some(m => m.wounds > 0)) w += 3;
      // Camping burns oil, and camping without oil to spare is how a
      // party ends up marching the next floor in the dark. Cold Camp
      // halves the bill, so it does not fear the lamp the same way.
      const camped = tacticModifiers(party);
      if (party.supply <= (camped.campSupply ? 2 : 4)) w -= 4;
    }
    // A rope down the shaft costs nothing at all, so it wins on the
    // oil unless somebody wants the stop
    if (opt.id === 'rope-down') w += party.supply <= 3 ? 3 : 1.5;
    if (opt.id === 'fight' && party.totalHealth() / party.totalMaxHealth() < 0.3) w -= 2;
    if (opt.id === 'flee' && party.totalHealth() / party.totalMaxHealth() < 0.3) w += 2;
    if (opt.id === 'study') w += 1;                         // Spells are score
    // Leaving a hoard alone is a real answer when the party has nothing
    // left to survive a mimic with. Without this it was offered a
    // hundred times a sweep and taken three (tools/census.mjs): the
    // option existed and the party had no state in which it wanted it.
    if (opt.id === 'leave-it') {
      const share = party.totalHealth() / party.totalMaxHealth();
      if (share < 0.4) w += 4;
      else if (share < 0.65) w += 1.5;
      if (party.supply === 0) w += 1.5;      // no light to fight a mimic by
    }

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

function bossPhaseLine(monster) {
  return `💢 At half health, ${monster.name} turns fierce: attack +2 for the rest of the fight.`;
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
    return { source: 'the hoard', find: 'potion', text: '🧪 Also in the hoard: a healing draught (heals 6), added to the satchel.' };
  }
  if (kind === 1) {
    party.materials += 2;
    return { source: 'the hoard', find: 'materials', text: '🌿 Also in the hoard: 2 alchemy materials.' };
  }
  if (kind === 2) {
    const scroll = SPELL_CARDS[Math.floor(rollValue * 997) % SPELL_CARDS.length];
    // A sealed scroll out of a hoard is one cast and gone
    party.grimoire.push({ ...scroll, id: `found-${scroll.id}-${party.grimoire.length}`, source: 'found' });
    return { source: scroll.name, find: 'scroll', text: `📜 Also in the hoard: a scroll of ${scroll.name}, added to the grimoire.` };
  }
  const trinket = TRINKETS[Math.floor(rollValue * 991) % TRINKETS.length];
  const wearer = party.assignEquipment({ ...trinket, id: party.mintId(trinket.id) });
  return { source: trinket.name, find: 'trinket', text: `🍀 Also in the hoard: ${trinket.name} (${bonusText(trinket.bonus)}), now worn by ${wearer?.name || 'no one'}.` };
}

/* ------------------------------------------------------------------ */
/* Feature actions — using the room itself                             */
/* ------------------------------------------------------------------ */

/**
 * Resolve a feature interaction. In a fight the furniture is a weapon:
 * damage the monster with the room, then swing (the same shape as
 * spell-strike). Outside a fight it's a resource: gold, materials, a
 * spell, a weapon edge, a wash for the wounds.
 *
 * Mutates the party and the room. Returns a result carrying `feature`
 * so the narration can name what was used.
 */
export function resolveFeatureAction(room, party, optionId, options = {}) {
  // A drafted tool does the job better than bare hands (RoomFeatures
  // actionTier): the class opens the option, the card upgrades it
  const action = actionTier(optionId, party, {
    item: id => hasItem(party, id),
    spell: id => hasSpell(party, id),
    tactic: id => activeTactics(party).some(t => t.id === id),
  });
  const feature = getFeature(action.feature);
  const preps = [];

  /* The room as a weapon: an opener, then the ordinary fight */
  if (action.fightOnly) {
    const monster = room.monster;
    // Improvised Arms: technique for using what the room left lying about
    const tac = tacticModifiers(party);
    const improvised = tac.featureOpener;
    // Pinning: a monster put somewhere stays put a moment longer, and
    // the room keeps working on it. Only where the room is a hazard —
    // there is nothing to pin a monster against in a row of pillars.
    const hazard = (feature?.tags || []).includes('hazard') ? tac.hazardDamage : 0;
    const opener = action.openerDamage + improvised + hazard;
    const dealt = Math.min(opener, Math.max(0, monster.health - 1));
    monster.health = Math.max(1, monster.health - opener);
    if (improvised) {
      preps.push({
        source: 'improvised arms',
        text: `🔧 The party knows how to swing what the room left lying about: +${improvised} to the opening.`,
      });
    }
    if (hazard) {
      preps.push({
        source: 'pinning',
        text: `📌 They do not let it climb straight back out: ${hazard} more damage from the room.`,
      });
    }
    const result = resolveRoomAction(room, party, 'fight', {
      formation: options?.formation,
      extraCover: action.extraCover || 0,
    });
    result.preps = [...preps, ...(result.preps || [])];
    result.feature = action.feature;
    result.featureAction = optionId;
    result.featureDamage = dealt;
    result.featureTier = action.tier;
    result.spellElement = action.element || null;
    return result;
  }

  /* The room as a resource */
  const result = {
    success: true, feature: action.feature, featureAction: optionId,
    featureTier: action.tier, preps,
  };

  if (action.gold) {
    party.addGold(action.gold);
    result.gold = action.gold;
  }
  if (action.materials) {
    party.materials += action.materials;
    result.materials = action.materials;
  }
  if (action.heal) {
    party.healParty(action.heal);
    result.healed = action.heal;
  }
  if (action.curesLinger && party.poisonLinger > 0) {
    party.poisonLinger = 0;
    result.curedLinger = true;
    preps.push({ source: 'the Great Waterskin', text: '🫗 The venom is flushed out with clean water before it can act again.' });
  }
  if (action.weaponMod) {
    const striker = party.living().reduce((a, b) => (a.attack >= b.attack ? a : b));
    striker.addWeaponMod({ ...action.weaponMod });
    result.weaponMod = { ...action.weaponMod, target: striker.name };
  }
  if (action.spell) {
    const spell = { ...action.spell, id: `feature-${optionId}-${party.grimoire.length}`, source: 'prepared', text: 'Taken off a dungeon shelf.' };
    party.grimoire.push(spell);
    result.spell = spell.name;
    // A grimoire to copy into means taking two good pages, not one
    if (action.extraSpell) {
      const second = { ...action.spell, id: `feature-${optionId}-${party.grimoire.length}`, use: 'utility', source: 'prepared', text: 'Taken off a dungeon shelf.' };
      party.grimoire.push(second);
      result.extraSpell = true;
    }
  }
  // Prying a sarcophagus is a gamble: sometimes the occupant objects
  if (action.wakesDead) {
    // Proper leverage lifts the lid instead of cracking it
    const woke = !action.quiet && roll() > 6.5;
    result.wokeDead = woke;
    if (woke) {
      const dmg = 4;
      party.takeDamage(dmg);
      result.damage = dmg;
      preps.push({ source: feature.name, text: `⚰️ The occupant objects: ${dmg} damage before it is put back down.` });
    }
  }

  room.cleared = true;
  party.recordEncounter(optionId, true);
  return result;
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
 * Does the party spot the shaft under the rubble before standing on
 * it? Rogues have the eyes and the pole; a lantern helps. Pure.
 */
export function detectTrapdoor(party, rollValue = roll()) {
  const rogues = party.living().filter(m => m.class === CLASSES.ROGUE);
  const eyes = rogues.length > 0
    ? Math.max(...rogues.map(m => m.mind)) + 2      // tapping the floor ahead is the job
    : Math.floor(party.bestMind() / 2);
  let bonus = getPreparationBonuses(party).secretDoor;   // the lantern shows the seam
  if (party.hasPersonality('craven')) bonus += 1;        // watches the floor, always
  if (party.hasPersonality('reckless')) bonus -= 1;      // strides on ahead
  return eyes + bonus + rollValue > 11;
}

/**
 * Does the party climb down a shaft they've found? It skips rooms —
 * their danger and their loot both — for a drop and a hard landing.
 * The Craven take the short way; the Covetous refuse to skip treasure;
 * a battered party takes any road to the end. Pure — pass the roll.
 */
export function decideTrapdoor(party, rollValue = roll()) {
  let w = 3.5;                                           // a shortcut is tempting
  if (party.hasPersonality('craven')) w += 3;            // fewer rooms, fewer teeth
  if (party.hasPersonality('cunning')) w += 1.5;
  if (party.hasPersonality('greedy')) w -= 3;            // skipped rooms hold coin
  if (party.hasPersonality('brave')) w -= 2;             // we walk in the front door
  if (party.hasPersonality('scholarly')) w -= 1;         // there is more to read this way
  // Hurt parties want the boss sooner and the corridors fewer
  if (party.totalHealth() / party.totalMaxHealth() < 0.5) w += 3;
  return rollValue < w;
}

/**
 * Does the party take the side passage? The Covetous smell gold; the
 * Craven wants no part of optional danger. Pure — pass the roll.
 */
/**
 * What a party wants out of each wing (world/DungeonGen.js WINGS).
 *
 * A wing has a theme and a payoff, and a party that cannot see either
 * is choosing between two anonymous side passages. The Covetous walk
 * toward coin, the Scholarly toward books, an alchemist toward a
 * workshop — and nobody volunteers for the flooded wing.
 *
 * Returns { weight, advocate } — the advocate is a whole clause, so
 * the writing can print it as its own sentence.
 */
export function wingAppeal(party, wing) {
  if (!wing) return { weight: 0, advocate: null };
  const has = a => party.hasPersonality(a);
  const cls = c => party.hasClass(c);
  switch (wing) {
    case 'crypt':
      if (has('greedy')) return { weight: 3, advocate: 'the Covetous wanted what gets buried with people' };
      if (has('pious')) return { weight: 2, advocate: 'the Devout did not like leaving the dead untended' };
      return { weight: 0, advocate: null };
    case 'works':
      if (cls(CLASSES.ALCHEMIST)) return { weight: 4, advocate: 'the alchemist wanted the bench' };
      if (has('scholarly')) return { weight: 2, advocate: 'the Scholarly wanted to see what was being made down there' };
      return { weight: 0, advocate: null };
    case 'archive':
      if (has('scholarly')) return { weight: 4, advocate: 'the Scholarly wanted the shelves' };
      if (cls(CLASSES.WIZARD)) return { weight: 3, advocate: 'the wizard reads everything, on principle' };
      return { weight: 0, advocate: null };
    case 'barracks':
      if (has('greedy')) return { weight: 3, advocate: 'the Covetous wanted the weapon rack' };
      if (has('brave')) return { weight: 2, advocate: 'the Bold wanted whatever was garrisoned there' };
      return { weight: 0, advocate: null };
    case 'sump':
      // Nobody wants the flooded wing. It pays, and it is still wet.
      return { weight: has('greedy') ? 1 : -2, advocate: null };
    default:
      return { weight: 0, advocate: null };
  }
}

/**
 * A locked wing: what opens it, and what that costs.
 *
 * Lock and key is the oldest structural trick in the form (PCG ch.3
 * Fig. 3.5): a branch with one entrance, sealed, its key placed on the
 * spine before the door. Four ways through, in the order the party
 * would try them — and only one of them is quiet.
 *
 * Returns { opened, how, noisy } so the writing can say which.
 */
export function openLockedWing(party, wing, rollValue = roll()) {
  if (party.hasKey(wing)) return { opened: true, how: 'key', noisy: false };

  // A rogue with picks, or a rogue with patience
  const rogues = party.living().filter(m => m.class === CLASSES.ROGUE);
  if (rogues.length > 0) {
    const mind = Math.max(...rogues.map(m => m.mind));
    const picks = getPreparationBonuses(party).disarm;   // the lockpicks help here too
    if (mind + picks + rollValue > 9) return { opened: true, how: 'picked', noisy: false };
  }
  // Knock opens any lock. Loudly — the card has always said so.
  if (hasSpell(party, 'sp-knock')) {
    const knock = party.castSpell('utility', 'sp-knock');
    if (knock) return { opened: true, how: 'knock', noisy: true, source: knock.name };
  }
  // Muscle, a prybar, or both. A door is not a monster: shouldering it
  // hurts, everything below hears it, and it does not always work.
  //
  // Measured at a threshold of 12 the lock refused 0.3% of parties,
  // which is a gate that is not a gate (tools/census.mjs). A wing you
  // can always get into is a wing that was never locked.
  const strongest = Math.max(0, ...party.living().map(m => m.attack));
  const lever = hasItem(party, 'eq-prybar') ? 4 : 0;
  if (strongest + lever + rollValue > 15) {
    const hurt = lever ? 0 : 2;      // levered off its hinges, or shouldered
    if (hurt) party.takeDamage(hurt);
    return { opened: true, how: 'forced', noisy: true, lever: lever > 0, damage: hurt };
  }
  return { opened: false, how: null, noisy: false };
}

export function decideDetour(party, rollValue = roll(), wing = null) {
  let w = 4;   // idle curiosity baseline
  if (party.hasPersonality('greedy')) w += 3;
  if (party.hasPersonality('scholarly')) w += 2;
  if (party.hasPersonality('reckless')) w += 2;
  if (party.hasPersonality('craven')) w -= 3;
  // Battered parties press for the exit
  if (party.totalHealth() / party.totalMaxHealth() < 0.35) w -= 3;
  // ...and what is down there is part of the argument
  w += wingAppeal(party, wing).weight;
  return rollValue < w;
}

/* ------------------------------------------------------------------ */
/* Resolution — gradient outcomes                                      */
/* ------------------------------------------------------------------ */

/**
 * Resolve a chosen action in a room. Mutates the party.
 * Returns { success, text, gold, damage, learned, ... }
 */
export function resolveRoomAction(room, party, optionId, options = null) {
  // Feature actions (world/RoomFeatures.js) are dispatched separately:
  // the room's furniture is its own family of outcomes
  if (isFeatureAction(optionId)) {
    return resolveFeatureAction(room, party, optionId, options);
  }
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
      // Sunder is the answer to plate, and its card has always said so:
      // armour remembers being ore, and stops turning blows
      const sundered = monster.trait === 'armored' && hasSpell(party, 'sp-sunder')
        ? party.castSpell('combat', 'sp-sunder') : null;
      const armorShave = (monster.trait === 'armored' && !sundered) ? 2 : 0;
      if (sundered) {
        preps.push({ source: sundered.name, text: `💢 ${sundered.name} reminds the plate it was ore: it stops turning blows for the rest of the fight.` });
      }

      // A greatsword is the wrong weapon for one foe and the right one
      // for forty
      const cleaves = monster.trait === 'swarm' && hasItem(party, 'eq-greatsword') ? 3 : 0;
      if (cleaves) {
        preps.push({ source: 'the Greatsword of the Vault', text: `🗡️ The greatsword takes a whole rank of them at a stroke: ${cleaves} more damage a round.` });
      }

      // Thrown before anyone closes
      const thrown = hasItem(party, 'eq-throwing-knives') ? 4 : 0;
      if (thrown) {
        monsterHealth -= thrown;
        preps.push({ source: 'the Bandolier of Knives', text: `🔪 Six knives arrive before the party does: ${thrown} damage before the first round.` });
      }

      // Quicksilver daggers land first, so nothing lands back that round
      const quicksilver = hasItem(party, 'eq-quicksilver-daggers');
      if (quicksilver) {
        preps.push({ source: 'the Quicksilver Daggers', text: '🗡️ The daggers land before the argument starts: nothing comes back in the first round.' });
      }

      // A prepared ward goes up before the first blow — which is what
      // Aegis of Ash's card text has always claimed, and what the fight
      // resolver never implemented (ward came only from items)
      const aegis = hasSpell(party, 'sp-shield') ? party.castSpell('combat', 'sp-shield') : null;
      if (aegis) {
        ward += 2;
        preps.push({ source: aegis.name, text: `🛡️ ${aegis.name} goes up before the first blow: 2 less damage every round.` });
      }

      // The room fights too: cover blunts every round, a mirror robs
      // the ethereal of its advantage (world/RoomFeatures.js)
      const roomMods = featureModifiers(room);
      // A blessed mace consecrates as it swings: whatever the room was
      // going to let out of its sarcophagus stays where it is
      if (roomMods.undeadRisk && hasItem(party, 'eq-blessed-mace')) {
        roomMods.undeadRisk = false;
        roomMods.notes.push({
          feature: 'sarcophagus',
          text: '🔨 The Blessed Mace sanctifies the room between swings: whatever was stirring in the stone settles.',
        });
      }
      const cover = (roomMods.cover || 0) + (options?.extraCover || 0);
      const mirrorInHand = hasItem(party, 'eq-silvered-mirror');
      const blessed = party.hasClass(CLASSES.CLERIC) || roomMods.revealEthereal
        || mirrorInHand || !!options?.forceRevealEthereal;
      if (monster.trait === 'ethereal' && mirrorInHand && !roomMods.revealEthereal) {
        preps.push({ source: 'the Silvered Hand-Mirror', text: '🪞 The Silvered Hand-Mirror catches the ethereal thing where it truly stands: weapons do full damage.' });
      }
      const etherealMult = monster.trait === 'ethereal' && !blessed ? 0.6 : 1;
      for (const note of roomMods.notes) preps.push({ source: note.feature, text: note.text });
      if (options?.extraCover) {
        preps.push({ source: 'the pillars', text: `🏛️ Fighting from the aisles: ${options.extraCover} less damage per round on top of the cover.` });
      }
      if (monster.trait === 'ethereal' && !roomMods.revealEthereal) {
        preps.push(party.hasClass(CLASSES.CLERIC)
          ? { source: 'the cleric', text: '✨ The cleric blesses the blades: the ethereal monster takes full weapon damage.' }
          : { source: monster.name, text: '👻 The monster is ethereal and the party\'s blows pass through it: weapon damage ×0.6 (no cleric to bless the blades).' });
      }
      // What an area working did to the room, if one was loosed here
      for (const note of options?.reactionNotes || []) preps.push(note);

      // Where the party stands, and what this room's floor allowed it to
      // choose (agents/Formation.js). A passage six by two permits one
      // shape; a boss cavern permits all of them.
      const form = formationModifiers(
        options?.formation || chooseFormation(party, room), room,
      );
      preps.push({
        source: form.name,
        text: `${form.icon} ${form.tell} ${form.effect}`,
      });

      // Learned technique (game/Tactics.js). Gated by capability, not
      // class: every class swings at something, so the whole party
      // fights better for a tactic any one of them could have taught.
      const tac = tacticModifiers(party);
      // Flanking is a spatial idea: it needs a formation with the room
      // to work round the sides. A column cannot flank anything.
      const flanking = tac.flankDamage > 0
        && party.living().length >= tac.flankMin
        && form.flanking;
      if (flanking) {
        preps.push({
          source: 'the party\'s footwork',
          text: `⚔️ The party has the numbers and uses them: +${tac.flankDamage} damage a round.`,
        });
      }
      const armorEdge = (monster.trait === 'armored' && tac.vsArmored) ? tac.vsArmored : 0;
      if (armorEdge) {
        preps.push({
          source: 'focused fire',
          text: `🎯 Everyone strikes the same seam in the plate: +${armorEdge} damage a round.`,
        });
      }
      if (tac.cover) {
        preps.push({ source: 'the shield wall', text: `🛡️ The party closes ranks: ${tac.cover} less damage a round.` });
      }
      const castWard = tac.wardPerCast * (options?.castsThisFight || 0);
      if (castWard) {
        preps.push({ source: 'ward-weaving', text: `🕸️ Every working leaves a ward behind it: ${castWard} less damage a round.` });
      }

      let monsterAtk = Math.max(1, monster.attack + (options?.monsterAtkMod || 0)
        + (tac.monsterAtk || 0));
      if (party.alarmed) {
        monsterAtk += 2;
        party.alarmed = false;
        preps.push({ source: 'the alarm', text: '🔔 The alarm tripped earlier warned it: the monster attacks with +2 this fight.' });
      }

      // An elemental coating on someone's blade bites deeper into
      // flesh that hates its element (the alchemist's bench pays off)
      // A working loosed at the top of the fight goes on biting
      // (spell-strike passes its share down; see SPELL_SUSTAIN_SHARE)
      const spellSustain = options?.spellSustain || 0;
      if (spellSustain > 0) {
        preps.push({
          source: options.spellSustainSource || 'the working',
          text: `✨ The working holds: +${spellSustain} damage every round while the fight lasts.`,
        });
      }

      const coating = party.coatingBonusVs(monster);
      if (coating.bonus > 0) {
        preps.push({ source: coating.notes.join(' + '), text: `⚗️ The ${coating.notes.join(' and ')} exploits the monster's weakness: +${coating.bonus} damage per round.` });
      }

      // Auto-battle: rounds of party attack vs monster attack.
      // Corridor frontage: only ~5 blades work at once, so a mob
      // of drafted heroes helps less than it thinks it does.
      // Bosses turn the fight at half health.
      let rounds = 0;
      let phased = false;
      // A healing working holds too — the same rule as a combat working
      // (SPELL_SUSTAIN_SHARE), for the same measured reason: flat
      // one-shot value cannot compete with a shield that mitigates
      // every round of a twelve-round boss.
      let mend = 0;
      while (monsterHealth > 0 && party.isAlive() && rounds < 12) {
        rounds++;
        const tactical = (flanking ? tac.flankDamage : 0) + armorEdge + cleaves;
        const swing = Math.max(1, Math.round((party.combatAttack(form.frontage) + summon + coating.bonus + spellSustain + tactical + Math.floor(roll() / 3)) * etherealMult * form.attackMult) - armorShave);
        monsterHealth -= swing;
        if (monsterHealth <= 0) break;
        if (monster.isBoss && !phased && monsterHealth <= monster.health / 2) {
          phased = true;
          monsterAtk += 2;
          preps.push({ source: monster.name, text: bossPhaseLine(monster) });
        }
        if (mend > 0) party.healParty(mend);
        // The slow strike last, and so does anything the quicksilver
        // daggers got in front of: no incoming damage on the first round
        if ((monster.trait === 'slow' || quicksilver) && rounds === 1) continue;
        const incoming = Math.max(1, Math.round((monsterAtk - Math.floor(party.totalDefense() / 3) - ward - cover - tac.cover - castWard) * form.incomingMult));
        party.takeDamage(incoming);
        partyDamageTaken += incoming;
        // Mend the badly hurt while the fight is still on — a working
        // spent after the fight is a working that never saved anybody
        const mid = party.castHealIfNeeded();
        if (mid) {
          const holds = Math.round(mid.spell.effectivePower * SPELL_SUSTAIN_SHARE);
          mend += holds;
          preps.push({
            source: mid.spell.name,
            text: `💚 ${mid.spell.name} closes ${mid.target.name}'s wounds mid-fight: ${mid.spell.effectivePower} healed in round ${rounds}, then ${holds} a round while it holds${mid.spell.consumed ? ' (the scroll is consumed)' : ''}.`,
          });
        }
        party.quaffIfNeeded();
      }

      // A fight the openers ended never ran a round, so anything that
      // promised to happen "every round" did not happen at all. Saying
      // it anyway is the same class of lie as a card that overstates its
      // effect (found by reading a golden diff).
      if (rounds === 0) {
        const perRound = /every round|a round while|less damage a round|damage a round/i;
        for (let i = preps.length - 1; i >= 0; i--) {
          if (perRound.test(preps[i].text || '')) preps.splice(i, 1);
        }
      }

      const won = monsterHealth <= 0 && party.isAlive();
      let drop = null;
      if (won) {
        const bounty = monster.isBoss ? 100 : 25;
        party.addScore(bounty);
        room.cleared = true;
        // The dead always leave something interesting behind (Drops)
        const claimed = claimDrop(party, monster);
        drop = claimed.drop;
        preps.push(claimed);
        // The venomous leave something behind, win or no win
        if (monster.trait === 'venomous') {
          if (hasItem(party, 'eq-cursed-blade')) {
            // Whoever carries the adder's blade has been living with
            // venom for a while. The party takes none of it.
            preps.push({ source: 'the Blade of the Adder', text: '🐍 The Blade of the Adder has taught its bearer what venom tastes like: the party shrugs this off.' });
          } else if (party.hasClass(CLASSES.CLERIC)) {
            preps.push({ source: 'the cleric', text: '🐍 The monster was venomous, but the cleric cures the poison before it can act.' });
          } else {
            party.poisonLinger = (party.poisonLinger || 0) + 2;
            preps.push({ source: monster.name, text: '🐍 The monster was venomous: the party will take 2 poison damage next room (no cleric to cure it).' });
          }
        }
        // A boss's hoard always holds more than coin
        if (monster.isBoss) {
          const find = rollFind(party, true);
          if (find) preps.push(find);
        }
        // The Reckless make it look good, and the scorers pay for it
        if (party.hasPersonality('reckless')) {
          party.addScore(5);
          preps.push({ source: 'the Reckless', text: '💥 The Reckless finish the fight with style: +5 score.' });
        }
      }
      // Anything still prepared tops the party up before the march.
      // The working that mattered was already loosed mid-fight above.
      if (party.isAlive() && partyDamageTaken >= 6) {
        const heal = party.castSpell('heal');
        if (heal) {
          party.healParty(heal.effectivePower);
          preps.push({ source: heal.name, text: `💚 ${heal.name} heals ${heal.effectivePower} after the fight${heal.consumed ? ' (the scroll is consumed)' : ''}.` });
        }
      }
      party.recordEncounter('fight', won);
      return { success: won, rounds, damage: partyDamageTaken, monster: monster.name, itemActions, preps, drop, bossPhased: phased, formation: form.id };
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
      // How many workings the party can loose before blades are drawn.
      // One for anybody; a wizard opens with two, which is the reason
      // to spend one of four body slots on the class.
      //
      // This used to be a flat one cast, and it made the second and
      // third spell in a grimoire nearly dead cards: equipment scales
      // linearly with picks, spells did not scale at all. Measured, a
      // three-spell pool lost 26 win points to three equipment while
      // one spell lost 9.6 (DESIGN_DIALOGUE.md §8).
      // Against a boss the party holds nothing back: every prepared
      // working goes off. Ordinary rooms still ration them, so a
      // grimoire is a reserve you spend down toward the throne rather
      // than a battery that fires the same way everywhere.
      //
      // This is where it matters. Instrumented, ~100% of A/B runs in
      // both arms reached the boss and the boss chamber accounted for
      // *all* of the win-rate difference. Under the old flat cast the
      // second and third spell in a grimoire were dead cards in the one
      // fight that decides the run.
      const reactions = [];
      const tac = tacticModifiers(party);
      const combatHeld = party.grimoire.filter(sp => sp.use === 'combat').length;
      const casts = monster.isBoss
        ? Math.max(1, combatHeld)
        : 1 + (party.hasClass(CLASSES.WIZARD) ? 1 : 0) + tac.extraCast;
      const spellsCast = [];
      let spellEdge = null;
      let sustain = 0;

      // The help has always promised that the party empties the
      // grimoire in the boss chamber, and no transcript ever said it
      // happened: the mechanic shipped without its line, which
      // tools/census.mjs finds by asking how often each beat is read.


      for (let c = 0; c < casts; c++) {
        // The caster reads the foe and reaches for the right working:
        // the spell whose element bites hardest (Bestiary weaknesses;
        // swarms take spell openings half again as hard)
        // Skip anything already loosed this room, or the second cast
        // re-picks the same working and castSpell refuses it
        const combatSpells = party.grimoire.filter(
          sp => sp.use === 'combat' && !party.castThisRoom.has(sp.id),
        );
        let best = null;
        let bestDmg = -1;
        for (const sp of combatSpells) {
          const dmg = sp.power * elementMult(sp, monster);
          if (dmg > bestDmg) { bestDmg = dmg; best = sp; }
        }
        const spell = best ? party.castSpell('combat', best.id) : null;
        if (!spell) break;                    // nothing left prepared

        const mult = elementMult(spell, monster) * (monster.trait === 'swarm' ? 1.5 : 1);
        if (elementMult(spell, monster) > 1) spellEdge = spellEdge || 'weak';
        else if (elementMult(spell, monster) < 1) spellEdge = spellEdge || 'resisted';
        if (monster.trait === 'swarm') spellEdge = spellEdge || 'swarm';
        const burst = Math.round(spell.effectivePower * mult);
        monster.health = Math.max(1, monster.health - burst);
        // ...and it keeps working for the rest of the fight
        // Concentration holds the working at full force instead of half
        sustain += Math.round(burst * (tac.sustainFull ? 1 : SPELL_SUSTAIN_SHARE));
        spellsCast.push(spell);

        // The room answers. An area working does not stop at the
        // monster: fire takes the crates, lightning runs through the
        // font, frost puts the brazier out (Reactions.js).
        // Widening lets every working out wide, so the room answers
        // anything, not only the spells printed as area workings
        const wide = tac.allSpellsArea ? { ...spell, aoe: true } : spell;
        for (const r of reactionsFor(wide, room)) reactions.push(r);
      }

      // What the room did, folded into one set of modifiers
      // The help has always promised that the party empties the grimoire
      // in the boss chamber, and no transcript ever said it happened:
      // the mechanic shipped without its line (tools/census.mjs asks how
      // often each beat is actually read). Counted after the casting, so
      // the number is what was loosed rather than what was held.
      const unleash = (monster.isBoss && spellsCast.length > 1)
        ? [{
          source: 'the boss chamber',
          text: `✨ Nothing is held back for later: the party looses everything it has, ${spellsCast.length} workings in the one fight that matters.`,
        }]
        : [];

      const room_ = foldReactions(reactions);
      if (room_.damage) monster.health = Math.max(1, monster.health - room_.damage);
      if (room_.heal) party.healParty(room_.heal);
      // A warded buckler turns aside half of what the party sets off;
      // an athanor charm makes anything they light burn harder
      if (room_.selfHarm && hasItem(party, 'eq-warded-buckler')) {
        room_.selfHarm = Math.floor(room_.selfHarm / 2);
        room_.notes.push({ source: 'the Warded Buckler', text: '🛡️ The prayers on the inside of the buckler turn aside half of what the party set off.' });
      }
      if (room_.burn > 0 && hasItem(party, 'eq-athanor-charm')) {
        room_.burn += 2;
        room_.notes.push({ source: 'the Athanor Charm', text: '🔥 The athanor charm feeds the blaze: 2 more damage a round while it burns.' });
      }

      // Firewatch: a party that sets the room alight stands clear of it
      if (room_.selfHarm && !tac.noSelfHarm) {
        for (const m of party.living()) m.takeDamage(room_.selfHarm);
      } else if (room_.selfHarm && tac.noSelfHarm) {
        room_.notes.push({ source: 'firewatch', text: '🧯 The party set it off and stood well clear: none of it comes back on them.' });
      }
      // A blaze is light to march by; a doused brazier takes light away
      if (room_.light > 0) party.addSupply(room_.light);
      else if (room_.light < 0) party.supply = Math.max(0, party.supply + room_.light);
      // Burnt crates are gone, and so is the cover they gave
      for (const id of room_.consumed) {
        room.features = (room.features || []).filter(f => f !== id);
      }

      // Then fight the softened monster, with the workings still up
      const result = resolveRoomAction(room, party, 'fight', {
        // Carry the caller's formation through: spell-strike delegates to
        // the fight, and building a fresh options bag silently dropped it
        formation: options?.formation,
        spellSustain: sustain + room_.burn,
        spellSustainSource: spellsCast.map(sp => sp.name).join(' + ') || null,
        extraCover: room_.cover,
        castsThisFight: spellsCast.length,
        monsterAtkMod: room_.monsterAtk,
        forceRevealEthereal: room_.revealEthereal,
        // The unleash line leads: it explains why what follows is three
        // workings rather than one
        reactionNotes: [...unleash, ...room_.notes],
      });
      result.spell = spellsCast[0]?.name || null;
      result.spellsCast = spellsCast.map(sp => sp.name);
      result.spellEdge = spellEdge;
      result.spellElement = spellsCast[0]?.element || null;
      return result;
    }

    case 'sneak': {
      const rogueMind = Math.max(...party.living().filter(m => m.class === CLASSES.ROGUE).map(m => m.mind));
      // A craven party has already memorized the quiet ways out
      const cravenEdge = party.hasPersonality('craven') ? 1 : 0;
      const prep = getPreparationBonuses(party);
      const preps = [];
      if (prep.notes.sneak) preps.push({ source: prep.notes.sneak, text: `👢 The ${prep.notes.sneak} add +1.5 to the sneak roll.` });
      if (prep.notes.sneakLight) preps.push({ source: prep.notes.sneakLight, text: '💡 Dancing Light revealed the watcher\'s position: +1 to the sneak roll.' });
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
      const preps = [];
      let drop = null;
      if (ok) {
        party.addScore(30);
        room.cleared = true;
        // Turned to dust, but the dust settles around its grave-goods
        const claimed = claimDrop(party, room.monster);
        drop = claimed.drop;
        preps.push(claimed);
      } else {
        party.takeDamage(room.monster.attack);
      }
      party.recordEncounter('turn-undead', ok);
      return { success: ok, monster: room.monster.name, preps, drop };
    }

    case 'bribe': {
      party.gold -= 15;
      party.addScore(5);
      room.cleared = true;
      return { success: true, goldSpent: 15, monster: room.monster.name };
    }

    case 'flee': {
      // Gradient: you escape, but worn — and the room stays hot. Each
      // retreat from the same room costs more than the last: the thing
      // in it has seen this before and follows further each time.
      room.fled = (room.fled || 0) + 1;
      const cost = 2 * room.fled;
      party.takeDamage(cost);
      return { success: true, retreated: true, damage: cost, fled: room.fled, monster: room.monster.name };
    }

    /* Traps */
    case 'disarm': {
      const rogueMind = Math.max(...party.living().filter(m => m.class === CLASSES.ROGUE).map(m => m.mind));
      const prep = getPreparationBonuses(party);
      const preps = [];
      if (prep.notes.disarm) preps.push({ source: prep.notes.disarm, text: '🗝️ The Masterwork Lockpicks add +1.5 to the disarm roll.' });
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
      if (prep.trapSoak > 0) preps.push({ source: prep.notes.trapSoak, text: '🏮 The Everburning Lantern showed the pressure plates: 1 less damage.' });

      // The trap's kind decides what pushing through costs (Bestiary
      // for rooms, as it were): fire burns unless frost answers it,
      // poison is patient, an alarm mostly just *tells on you*
      const trapType = room.trapType || 'spike';
      // Feather Step: the floor agrees to pretend nobody is on it
      const feather = hasSpell(party, 'sp-feather') ? party.castSpell('utility', 'sp-feather') : null;
      if (feather) {
        preps.push({ source: feather.name, text: `🪶 ${feather.name} takes the party's weight off the floor: 3 less damage from anything underfoot.` });
      }
      let dmg = Math.max(1, (room.trapDamage || 3) - spotter - prep.trapSoak - (feather ? 3 : 0));
      if (trapType === 'fire') {
        // Firewatch is knowledge about where fire goes, and a flame trap
        // is the commonest place to use it (game/Tactics.js)
        const watched = tacticModifiers(party).fireTrapSoak;
        if (watched) {
          dmg = Math.max(1, dmg - watched);
          preps.push({ source: 'firewatch', text: `🧯 The party reads the jet before it fires and is not standing there: ${watched} less damage.` });
        } else if (hasSpell(party, 'sp-frost')) {
          dmg = Math.max(1, dmg - 2);
          preps.push({ source: 'Frost Lance', text: '❄️ Frost Lance counters the flame jet: 2 less damage.' });
        } else {
          dmg += 1;
        }
      } else if (trapType === 'poison') {
        dmg = Math.max(1, Math.ceil(dmg / 2));
        if (party.hasClass(CLASSES.CLERIC)) {
          preps.push({ source: 'the cleric', text: '🐍 The needles hit, but the cleric cures the venom on the spot.' });
        } else {
          party.poisonLinger = (party.poisonLinger || 0) + 2;
          preps.push({ source: 'the trap', text: '🐍 Poison needles: the party will take 2 poison damage next room (no cleric to cure it).' });
        }
      } else if (trapType === 'alarm') {
        dmg = Math.min(dmg, 2);
        party.alarmed = true;
        preps.push({ source: 'the alarm', text: '🔔 The alarm rings through the dungeon: the next monster will attack with +2.' });
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
        preps.push({ source: prep.notes.cleanInspect, text: `🔍 ${prep.notes.cleanInspect === 'the Cunning' ? 'The Cunning eye' : 'The Masterwork Lockpicks'} found everything: the full gold taken, nothing missed.` });
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
          id: party.mintId('learned'), name: 'Found Cantrip', icon: '📜',
          school: 'found', power: 3, use: Math.random() < 0.5 ? 'combat' : 'utility',
          // Copied into the grimoire by hand, so it is prepared, not sealed
          source: 'prepared', text: 'Copied from the stacks.',
        });
      }
      room.cleared = true;
      return { success: true, learned };
    }

    case 'deep-study': {
      const wizardMind = Math.max(...party.living().filter(m => m.class === CLASSES.WIZARD).map(m => m.mind));
      const prep = getPreparationBonuses(party);
      const preps = prep.deepStudy > 0
        ? [{ source: prep.notes.deepStudy, text: '📖 The Grimoire of Low Whispers adds +1.5 to the reading roll.' }]
        : [];
      const ok = wizardMind + prep.deepStudy + roll() > 9;
      if (ok) {
        party.spellsLearned += 2;
        party.addScore(50);
        party.grimoire.push({
          id: party.mintId('sealed'), name: 'Sealed Working', icon: '🔏',
          school: 'forbidden', power: 6, use: 'combat', source: 'prepared',
          text: 'The margins screamed. The wizard did not.',
        });
      } else {
        party.takeDamage(4);
      }
      room.cleared = true;
      party.recordEncounter('deep-study', ok);
      return { success: ok, preps: ok ? preps : [] };
    }

    /* Shrine */
    case 'brew-oil': {
      // The alchemist's answer to the supply clock: a material cooked
      // down into light. Ties the bench to the lamp.
      party.materials -= 1;
      const gained = party.addSupply(2);
      room.cleared = true;
      return {
        success: true,
        preps: [{ source: 'the Portable Alembic', text: `⚗️ A material goes into the alembic and comes out as lamp oil: ${gained} more march${gained === 1 ? '' : 'es'} of light.` }],
      };
    }

    case 'rest': {
      const bonus = party.hasPersonality('pious') ? 4 : 0;
      // Field Surgery: somebody learned to set a break on the road, so a
      // shrine closes a wound the delve would otherwise keep until town
      const mend = tacticModifiers(party).mendAtShrine;
      const mended = [];
      if (mend) {
        for (const m of party.living()) {
          if (m.wounds > 0) { m.mendWounds(mend); mended.push(m.name); }
        }
      }
      for (const m of party.living()) m.heal(5 + bonus);
      room.cleared = true;
      const preps = mended.length
        ? [{ source: 'field surgery', text: `✚ Somebody sets what the march only bandaged: a wound closed on ${mended.join(', ')} without waiting for town.` }]
        : [];
      return { success: true, healed: 5 + bonus, mended, preps };
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

    /* Stairs — the floor below is meaner than this one */
    case 'descend': {
      const spent = Math.min(1, party.supply);
      party.supply -= spent;
      room.cleared = true;
      return { success: true, descended: true, supplySpent: spent };
    }

    case 'rope-down': {
      room.cleared = true;
      return {
        success: true, descended: true, supplySpent: 0,
        preps: [{ source: 'the Grapple and Line', text: '🪢 The line goes down the shaft beside the stair: the party descends without burning a march of oil.' }],
      };
    }

    case 'camp-stair': {
      // A cold camp is cheaper and nobody finds it (game/Tactics.js)
      const tac = tacticModifiers(party);
      const cost = tac.campSupply ? Math.max(1, 2 - tac.campSupply) : 2;
      const spent = Math.min(cost, party.supply);
      party.supply -= spent;
      const CAMP_HEAL = 6;
      let healed = 0;
      for (const m of party.living()) {
        const before = m.health;
        m.heal(CAMP_HEAL);
        healed += m.health - before;
      }
      // A night's sleep sets what the march only bandaged. One wound,
      // from whoever is carrying the most of them — the only place
      // besides a shrine with Field Surgery that a wound closes before
      // town, and the reason to stop when nobody is bleeding.
      const worst = party.living()
        .filter(m => m.wounds > 0)
        .sort((a, b) => b.wounds - a.wounds)[0] || null;
      if (worst) worst.mendWounds(1);
      // A camp is a fire and a smell of food at the top of a stair that
      // something else also uses
      const found = !tac.campWatched && roll() >= 5;
      let damage = 0;
      if (found) {
        damage = 4 + Math.floor(roll() / 2);
        party.takeDamage(damage);
      }
      room.cleared = true;
      const preps = tac.campWatched
        ? [{ source: 'Cold Camp', text: `🏕️ No fire and a watch kept: the camp costs ${spent} supply and nothing finds it.` }]
        : [];
      return {
        success: true, descended: true, camped: true,
        healed: CAMP_HEAL, healedTotal: healed, mended: worst?.name || null,
        supplySpent: spent, damage, interrupted: found, preps,
      };
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
        preps.push({ source: heal.name, text: `💚 ${heal.name} heals ${heal.effectivePower} as the dust settles.` });
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
