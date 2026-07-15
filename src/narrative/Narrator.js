/**
 * Narrator — the party's log, told room by room
 *
 * Three beats per room (adapted from SnakeAB's proven pattern):
 *   1. Predicament — what the room holds, stated plainly
 *   2. Deliberation — the options, who argued, what was chosen
 *   3. Resolution — what happened, with the numbers
 *
 * House style: descriptive, not literary. Say who did what and what
 * it cost — "the fighter strikes the goblin" — and let the numbers
 * carry the drama. Barks (spoken dialogue) are the one exception.
 */

import { ROOM_TYPES } from '../world/DungeonGen.js';
import { CLASSES } from '../game/Cards.js';
import { getBark } from './Barks.js';

/* ------------------------------------------------------------------ */
/* Predicaments per room type                                          */
/* ------------------------------------------------------------------ */

/* Themed arrivals — what this dungeon is, stated at the door */
const THEME_ENTRANCES = {
  delve: 'The party enters the Old Delve: rats, skeletons, and goblin toll-gangs between here and the boss.',
  crypt: 'The party enters the Ancient Crypt. Most monsters here are undead — holy damage and a cleric\'s turning work well.',
  volcanic: 'The party enters the Cinder Galleries. Fire traps hit harder here, and most monsters resist fire but hate frost.',
  library: 'The party enters the Drowned Athenaeum. Extra libraries to study in; several of its monsters burn easily.',
  madlab: 'The party enters the Mad Alchemist\'s Dungeon. A lab is guaranteed, materials are common, and much of what lives here is venomous.',
  castle: 'The party enters the Castle of the Vampire Lord. Treasure is plentiful; most of the household is undead or ethereal.',
  bogcellar: 'The party enters the Root Cellar of the Bog Witch. Poison traps and venomous monsters, with a stillroom lab guaranteed.',
  icecaverns: 'The party enters the Ice Caverns of the Mad Pyromancer. Disasters are frequent, and fire and frost weaknesses run through everything.',
};

/* Themed disasters — what actually goes wrong, per dungeon */
const THEME_DISASTERS = {
  castle: 'The candles go out: the castle itself attacks the party in the dark.',
  bogcellar: 'A shelf of jars breaks over the party; what spills is corrosive and moving.',
  icecaverns: 'A fire vent meets the cavern ice: a scalding steam blast fills the room.',
  volcanic: 'Lava surges into the passage; the party must get clear before it closes the way.',
  crypt: 'The tomb lids open at once and the dead press in from every side.',
  library: 'The stacks collapse and the floodwater rises; falling shelves and water both do damage.',
  madlab: 'An unattended reaction runs out of control and fills the room with caustic vapor.',
};

const PREDICAMENTS = {
  entrance: ['The party gathers at the dungeon entrance and starts down.'],
  corridor: ['A connecting corridor. Nothing blocks the way; the party moves through.'],
  monster: ['A monster holds the room. The party must decide how to get past it.'],
  trap: ['A trap blocks the corridor. The party must disarm it, avoid it, or take the hit.'],
  treasure: ['A treasure chest sits in the room. It may hold gold; it may be a mimic.'],
  library: ['A library. The party can study here to learn spells.'],
  shrine: ['A shrine. Resting here heals the party; the gold leaf on the altar could be stripped instead.'],
  lab: ['An alchemy lab with a working bench. An alchemist with materials can brew or coat weapons here.'],
  materials: ['A room of herbs, salts, and quicksilver — alchemy materials, free to gather.'],
  disaster: ['The dungeon itself turns hostile. The party must brace together or scatter.'],
  boss: ['The boss chamber. Killing what waits here clears the dungeon.'],
  vault: ['A hidden vault, stacked with treasure. Vaults always hold something beyond coin.'],
};

/* ------------------------------------------------------------------ */
/* Asides — side passages and secret doors (procgen v2)                */
/* ------------------------------------------------------------------ */

export function composeSecretFound(party) {
  const rogue = party.living().find(m => m.class === CLASSES.ROGUE);
  const finder = rogue ? rogue.name : (party.living()[0]?.name || 'Someone');
  return `🕳️ ${finder} finds a hidden door. A secret side branch joins the party's route.`;
}

export function composeDetour(taken) {
  return taken
    ? '🧭 The party takes the side passage; its rooms join the route.'
    : '🚶 The party passes the side passage by and keeps to the main route.';
}

/* ------------------------------------------------------------------ */
/* Deliberation — options, advocate, choice                            */
/* ------------------------------------------------------------------ */

const OPTION_PHRASES = {
  fight: 'stand and fight',
  flee: 'fall back',
  sneak: 'sneak past',
  'turn-undead': 'turn the undead',
  bribe: 'pay the toll',
  'spell-strike': 'open with a combat spell',
  disarm: 'disarm the trap',
  'push-through': 'push through and take the hit',
  'search-around': 'search for a way around',
  'spell-bypass': 'bypass it with a utility spell',
  loot: 'loot the treasure',
  inspect: 'inspect it first',
  'leave-it': 'leave it alone',
  study: 'study the shelves',
  'deep-study': 'read the sealed texts',
  rest: 'rest and heal',
  desecrate: 'strip the gold leaf',
  'pass-by': 'move on',
  proceed: 'move on',
  alchemy: 'work the lab bench',
  gather: 'gather the materials',
  brace: 'brace together',
  scatter: 'scatter and regroup',
  'knock-open': 'open it with Knock',
  'cause-fear': 'cast Cause Fear',
  'smoke-bomb': 'spring it with a smoke bomb',
};

const ARCHETYPE_VOICES = {
  brave: 'the Bold voted to meet it head-on',
  cunning: 'the Cunning picked the safer angle',
  greedy: 'the Covetous wanted the payout',
  scholarly: 'the Scholarly wanted the knowledge',
  pious: 'the Devout called it the right thing to do',
  reckless: 'the Reckless did not wait for a vote',
  craven: 'the Craven pushed for the safest option',
};

const CLASS_ADVOCATES = {
  fight: CLASSES.FIGHTER,
  sneak: CLASSES.ROGUE,
  disarm: CLASSES.ROGUE,
  'turn-undead': CLASSES.CLERIC,
  rest: CLASSES.CLERIC,
  'deep-study': CLASSES.WIZARD,
  'spell-strike': CLASSES.WIZARD,
  'spell-bypass': CLASSES.WIZARD,
  alchemy: CLASSES.ALCHEMIST,
  gather: CLASSES.ALCHEMIST,
};

export function composeDeliberation(chosenId, options, party) {
  const chosenPhrase = OPTION_PHRASES[chosenId] || chosenId;
  const rejected = options
    .filter(o => o.id !== chosenId)
    .slice(0, 2)
    .map(o => OPTION_PHRASES[o.id] || o.id);

  // Who argued for this? A class advocate if one lives, else personality
  let voice = null;
  const advocateClass = CLASS_ADVOCATES[chosenId];
  if (advocateClass && party.hasClass(advocateClass)) {
    const advocate = party.living().find(m => m.class === advocateClass);
    const bark = getBark(advocate.class, party.personalities);
    voice = bark
      ? `${advocate.name} made the case: "${bark}"`
      : `${advocate.name} made the case`;
  } else {
    for (const archetype of party.personalities) {
      if (ARCHETYPE_VOICES[archetype]) {
        voice = ARCHETYPE_VOICES[archetype];
        break;
      }
    }
  }
  if (!voice) voice = 'nobody argued';

  // A quoted bark carries its own terminal punctuation; adding a
  // period after the closing quote doubles it
  const sep = voice.endsWith('"') ? '' : '.';

  if (rejected.length === 0) {
    return `There was only one option: the party chose to ${chosenPhrase}.`;
  }
  const rejectedText = rejected.length === 2 ? `${rejected[0]}, or ${rejected[1]}` : rejected[0];
  return `They might have chosen to ${rejectedText} — ${voice}${sep} The party chose to ${chosenPhrase}.`;
}

/* ------------------------------------------------------------------ */
/* Resolutions — what happened, with the numbers                       */
/* ------------------------------------------------------------------ */

export function composeResolution(room, optionId, result, party) {
  const bits = [];

  switch (optionId) {
    case 'fight': {
      const leadAction = result.itemActions?.find(a => a.opening || a.vsUndead || a.summonAttack);
      if (leadAction) {
        const detail = leadAction.opening
          ? `${leadAction.opening}${leadAction.vsUndead && room.monster?.undead ? ` (+${leadAction.vsUndead} vs undead)` : ''} damage before round one`
          : leadAction.summonAttack
            ? `a summon adding ${leadAction.summonAttack} attack each round`
            : 'its effect';
        bits.push(`🪄 ${leadAction.member} uses the ${leadAction.item} — ${leadAction.name}: ${detail}.`);
      }
      if (result.success && result.rounds === 0) {
        bits.push(`⚔️ ${capitalize(result.monster)} is killed before it can strike back. The party takes no damage.`);
      } else if (result.success) {
        bits.push(`⚔️ The party kills ${result.monster} in ${result.rounds} round${result.rounds === 1 ? '' : 's'}, taking ${result.damage} damage.`);
      } else {
        bits.push(`☠️ ${capitalize(result.monster)} is too strong: the party is beaten down over ${result.rounds} round${result.rounds === 1 ? '' : 's'}.`);
      }
      break;
    }
    case 'spell-strike': {
      if (!result.spell) {
        bits.push('🔥 No combat spell was available, so the party fights with weapons alone.');
      } else if (result.spellEdge === 'weak') {
        bits.push(`🔥 The caster opens with ${result.spell}, chosen precisely for the monster's ${result.spellElement} weakness: spell damage ×1.5.`);
      } else if (result.spellEdge === 'swarm') {
        bits.push(`🔥 ${result.spell} opens the fight; against a swarm the spell hits ×1.5.`);
      } else if (result.spellEdge === 'resisted') {
        bits.push(`🔥 ${result.spell} opens the fight, but the monster resists the element: spell damage ×0.5.`);
      } else {
        bits.push(`🔥 ${result.spell} opens the fight, softening the monster before the first blow.`);
      }
      if (result.success && result.rounds !== undefined) {
        bits.push(`⚔️ The party kills ${result.monster} in ${result.rounds} round${result.rounds === 1 ? '' : 's'}, taking ${result.damage} damage.`);
      } else if (!result.success) {
        bits.push(`☠️ Even softened, ${result.monster} beats the party down.`);
      }
      break;
    }
    case 'sneak':
      bits.push(result.success
        ? `🗡️ The rogue leads the party past ${result.monster} unseen. No damage taken; +15 score.`
        : `🗡️ The sneak fails: ${result.monster} notices and lands a blow before the party scrambles clear.`);
      break;
    case 'turn-undead':
      bits.push(result.success
        ? `✨ The cleric turns the undead: ${result.monster} crumbles. +30 score.`
        : `✨ The turning fails: ${result.monster} attacks while the cleric recovers.`);
      break;
    case 'bribe':
      bits.push(`💰 The party pays ${result.goldSpent || 15} gold and ${result.monster} lets them pass. No fight.`);
      break;
    case 'cause-fear':
      bits.push(`😱 ${result.spell || 'Cause Fear'} routs ${result.monster}: the room clears without a fight. +20 score.`);
      break;
    case 'smoke-bomb':
      bits.push('⚗️ The alchemist spends 1 material on a smoke concoction and springs the trap from a safe distance. No damage taken.');
      break;
    case 'knock-open':
      bits.push(result.wasMimic
        ? `🚪 ${result.spell} opens the chest from across the room — it was a mimic, and it springs at nothing. ${result.gold} gold taken safely.${result.consumed ? ' The scroll is consumed.' : ''}`
        : `🚪 ${result.spell} opens the lock at range: ${result.gold} gold taken.${result.consumed ? ' The scroll is consumed.' : ''} The noise carries through the dungeon.`);
      break;
    case 'flee':
      bits.push('💨 The party retreats, taking 2 damage on the way out. The room stays hostile; they will have to try it again.');
      break;
    case 'disarm':
      bits.push(result.success
        ? '🗝️ The rogue disarms the trap. No damage taken; +20 score.'
        : '🗝️ The disarm fails: the trap springs for half damage.');
      break;
    case 'push-through':
      bits.push(`💥 The party pushes through the trap, taking ${result.damage} damage.${result.spotted ? ' The Craven spotted the tripwire first: 1 less damage.' : ''}`);
      break;
    case 'loot':
      bits.push(result.mimic
        ? `🦷 The chest is a mimic. It bites for 5 damage before the party kills it, recovering ${result.gold} gold.`
        : `💰 The party loots the chest: ${result.gold} gold.`);
      break;
    case 'inspect':
      bits.push(`🔍 The party checks for mimics and curses first, then takes ${result.gold} gold safely.`);
      break;
    case 'leave-it':
      bits.push('🚶 The party leaves the treasure untouched and moves on.');
      break;
    case 'study':
      bits.push(`📚 The party studies the shelves and learns ${result.learned} spell${result.learned > 1 ? 's' : ''}.`);
      break;
    case 'deep-study':
      bits.push(result.success
        ? '🔏 The wizard reads the sealed texts: 2 spells learned, including a forbidden working. +50 score.'
        : '🔏 The sealed text backfires: the wizard takes 4 damage and learns nothing.');
      break;
    case 'rest':
      bits.push(`🕯️ The party rests at the shrine: ${result.healed} health healed per member.`);
      break;
    case 'desecrate':
      bits.push('⛏️ The party strips 30 gold of leaf from the altar. The next disaster will hit harder for it.');
      break;
    case 'alchemy': {
      const a = result.alchemy;
      if (!a) {
        bits.push('⚗️ The bench is usable but the satchel is empty: no materials, nothing brewed.');
      } else if (a.type === 'potion') {
        bits.push(`⚗️ The alchemist spends 1 material and brews a healing draught (heals 6)${a.doubled ? ' — two, in fact; Perenelle works in doubles' : ''}.`);
      } else {
        bits.push(`⚗️ The alchemist spends 1 material and applies ${a.mod.name} to ${a.target}'s weapon: +${a.mod.attack} attack.`);
      }
      break;
    }
    case 'gather':
      bits.push(`🌿 The party gathers ${result.materials} bundle${result.materials > 1 ? 's' : ''} of alchemy materials.`);
      break;
    case 'brace':
      bits.push(`🌋 The party braces together and rides it out: ${result.damage} damage taken.`);
      break;
    case 'scatter':
      bits.push(result.success
        ? '🌋 The party scatters; nearly everyone finds cover. Minimal damage.'
        : `🌋 The party scatters; ${result.hurt} member${result.hurt === 1 ? '' : 's'} guessed wrong and took 3 damage each.`);
      break;
    default:
      bits.push('The party moves on to the next room.');
  }

  // Preparation pays, and the log says so by name (the FTL lesson:
  // the encounter must notice how you came equipped)
  for (const prep of result.preps || []) {
    bits.push(prep.text);
  }

  return bits.join(' ');
}

/* ------------------------------------------------------------------ */
/* Falls — a hero's death is reported by name                          */
/* ------------------------------------------------------------------ */

export function composeFall(member) {
  return `☠️ ${member.name} falls. The party's ${member.class} is dead; the survivors march on.`;
}

/* ------------------------------------------------------------------ */
/* Endings                                                             */
/* ------------------------------------------------------------------ */

/**
 * The spoils, reported at the ending: how many trophies, and the
 * latest claimed (on a victory that is usually the boss's).
 */
function trophyLine(party, victory) {
  const trophies = party.trophies || [];
  if (trophies.length === 0) return '';
  const latest = trophies[trophies.length - 1];
  return victory
    ? ` Trophies carried out: ${trophies.length} (latest: ${latest.icon} ${latest.name}).`
    : ` Trophies lost with them: ${trophies.length} (latest: ${latest.icon} ${latest.name}).`;
}

export function composeWipe(party, roomsCleared, theme = null) {
  const fallen = party.members.map(m => m.name).join(', ');
  const where = theme ? ` in ${theme.name}` : '';
  return `The party is wiped out${where}. The dead: ${fallen}. Rooms cleared: ${roomsCleared}.${trophyLine(party, false)}`;
}

export function composeVictory(party, roomsCleared, theme = null) {
  const survivors = party.living().map(m => m.name).join(', ');
  const where = theme ? `${theme.name} is cleared` : 'The dungeon is cleared';
  return `${where}: the boss is dead and the party walks out. Survivors: ${survivors}. Rooms cleared: ${roomsCleared}.${trophyLine(party, true)}`;
}

/* ------------------------------------------------------------------ */
/* The town between — campaign interludes                              */
/* ------------------------------------------------------------------ */

export function composeTownInterlude(party, depth) {
  return `The party returns to town after depth ${depth}. Healing, potions, recruits, and the smith are all paid for in gold. The next dungeon waits at depth ${depth + 1}, and it will be harder: stronger monsters, deadlier traps, richer hoards.`;
}

/* ------------------------------------------------------------------ */
/* Predicament composition                                             */
/* ------------------------------------------------------------------ */

export function composePredicament(room, theme = null) {
  if (room.type === ROOM_TYPES.ENTRANCE && theme && THEME_ENTRANCES[theme.id]) {
    return THEME_ENTRANCES[theme.id];
  }
  // Each theme's disasters are its own kind of trouble
  if (room.type === ROOM_TYPES.DISASTER && theme && THEME_DISASTERS[theme.id]) {
    return `${THEME_DISASTERS[theme.id]} The party must brace together or scatter.`;
  }
  // Name the foe when we have one, with its numbers when we have them
  if ((room.type === ROOM_TYPES.BOSS || room.type === ROOM_TYPES.MONSTER) && room.monster) {
    const m = room.monster;
    const stats = m.attack != null && m.health != null ? ` (attack ${m.attack}, health ${m.health})` : '';
    const lead = room.type === ROOM_TYPES.BOSS
      ? `The boss chamber. ${capitalize(m.name)} waits at its center${stats}; killing it clears the dungeon.`
      : `${capitalize(m.name)} holds the room${stats}. The party must decide how to get past it.`;
    return lead + monsterTells(m);
  }
  if (room.type === ROOM_TYPES.TRAP && room.trapType && TRAP_TELLS[room.trapType]) {
    return `${pick(PREDICAMENTS.trap)} ${TRAP_TELLS[room.trapType]}`;
  }
  const pool = PREDICAMENTS[room.type] || PREDICAMENTS.corridor;
  return pick(pool);
}

/* The monster's nature, stated as facts the party can plan around */
const TRAIT_TELLS = {
  armored: 'Plate and chitin cover it: the party\'s blows do 2 less damage each round.',
  ethereal: 'It is ethereal: weapons do only 60% damage unless a cleric blesses the blades.',
  venomous: 'It is venomous: even a won fight leaves poison working, unless a cleric cures it.',
  swarm: 'It is a swarm: spell openings hit it ×1.5.',
  slow: 'It is slow: the party strikes first and takes no damage in round one.',
};

const WEAK_TELLS = {
  fire: 'It keeps clear of the torches: weak to fire (fire damage ×1.5).',
  frost: 'It flinches from the cold: weak to frost (frost damage ×1.5).',
  shock: 'Its hairs stand on end: weak to shock (shock damage ×1.5).',
  holy: 'It will not face the cleric: undead take holy damage ×1.5.',
};

function monsterTells(monster) {
  const tells = [];
  if (monster.trait && TRAIT_TELLS[monster.trait]) tells.push(TRAIT_TELLS[monster.trait]);
  const weakness = monster.undead ? 'holy' : (monster.weak || [])[0];
  if (weakness && WEAK_TELLS[weakness]) tells.push(WEAK_TELLS[weakness]);
  return tells.length ? ' ' + tells.join(' ') : '';
}

/* And a trap's kind shows, to those who look down */
const TRAP_TELLS = {
  fire: 'Scorch marks fan out from a seam in the floor: a fire trap. A frost spell can blunt it.',
  poison: 'Dead beetles ring one tile: a poison trap. Light damage now, lingering venom later unless a cleric cures it.',
  alarm: 'A tripwire runs up the wall to a bell: an alarm trap. Little damage, but the next monster will be warned (+2 attack).',
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
