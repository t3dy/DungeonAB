/**
 * Narrator — the party's tale, told room by room
 *
 * Three beats per room (adapted from SnakeAB's proven pattern):
 *   1. Predicament — what the room holds
 *   2. Deliberation — who argued for what, and why the party chose
 *   3. Resolution — how it went, in gold, blood, and glory
 */

import { ROOM_TYPES } from '../world/DungeonGen.js';
import { CLASSES } from '../game/Cards.js';
import { getBark } from './Barks.js';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ------------------------------------------------------------------ */
/* Predicaments per room type                                          */
/* ------------------------------------------------------------------ */

/* Themed arrivals — the dungeon introduces itself at the door */
const THEME_ENTRANCES = {
  delve: [
    'The dungeon door stands open, which is never a good sign. Cold air breathes up from below, smelling of wet stone and old ambition.',
    'Torchlight ends three steps past the threshold. Somewhere below, something drips in a rhythm that is almost, but not quite, patient.',
  ],
  crypt: [
    'The Ancient Crypt. The lintel is carved with names, and the names are carved with claw marks. Down the party goes, past generations of the politely furious dead.',
    'Grave-cold rolls up the crypt stairs to meet them. Somewhere below, stone lids are not staying put.',
  ],
  volcanic: [
    'The Cinder Galleries breathe out heat like a sleeping forge. The walls glow faintly at the seams, and the floor is warm through good boots.',
    'Down into the mountain\'s throat. The air shimmers, the torches are redundant, and something below is keeping the fires fed.',
  ],
  library: [
    'The Drowned Athenaeum. Water-stained shelves climb out of sight, and the silence has the specific weight of a librarian\'s attention.',
    'Past the flooded card catalogue and down. Every book in the dark is closed. The party tries not to think about what opens them.',
  ],
  madlab: [
    'The Mad Alchemist\'s Dungeon. The welcome mat is a chalk circle, half-scrubbed. The smell is sulfur, roses, and a third thing nobody names aloud.',
    'Glassware glints in the dark below — miles of it, still bubbling. The experiments did not stop when the alchemist did.',
  ],
};

const PREDICAMENTS = {
  entrance: THEME_ENTRANCES.delve,
  corridor: [
    'A long corridor, scarred by the claws and cart-wheels of every expedition that came before. Most of them came back. Most.',
    'The passage narrows until the fighters walk sideways and the wizard complains about the acoustics.',
  ],
  monster: [
    'Something is waiting in this room, and it has heard you coming since the entrance hall.',
    'Eyes in the dark — the reflective kind, the patient kind. The room smells of den.',
  ],
  trap: [
    'The floor here is too clean. Nothing in a dungeon is clean by accident.',
    'The rogue holds up a fist. Everyone stops. There — a seam in the flagstones, thin as a lie.',
  ],
  treasure: [
    'A chest squats in the lamplight, brass-bound and altogether too inviting. The last hands to touch it left in a hurry, or not at all.',
    'Coins spill from a split sack across the floor — the classic bait, arranged by someone who understands adventurers deeply.',
  ],
  library: [
    'Shelves climb into the dark, sagging under grimoires, ledgers, and one book that is very clearly breathing.',
    'A library, miraculously dry. The dust here is a hundred years deep and lettered in three dead languages.',
  ],
  shrine: [
    'A small shrine glows at the corridor\'s elbow — candles that no one lights, burning anyway. The stone floor is warm here.',
    'An altar of some patient, forgiving god. The kneeling-groove in the stone is deep; many desperate parties came this way.',
  ],
  lab: [
    'An alchemist\'s laboratory, abandoned mid-experiment: the alembic still holds something green, and the notes end mid-sentence.',
    'Benches of glassware, a cold athanor, jars labeled in a hurried hand — a working lab, waiting for working hands.',
  ],
  materials: [
    'Herbs hang from the ceiling in dusty bundles; salts and quicksilver sit in labeled jars. A gatherer\'s dream, a satchel\'s burden.',
    'The room is thick with dried simples and mineral blooms — everything a bench-worker could want, free for the pocketing.',
  ],
  disaster: [
    'The ceiling groans. Dust sifts down in slow curtains. The dungeon is about to have an opinion.',
    'Water is coming in somewhere — fast, cold, and rising past the ankle before anyone finishes swearing.',
  ],
  boss: [
    'The final chamber. The air itself is heavier here, and the thing at its center has been expecting visitors far better armed than you.',
    'Every dungeon keeps its worst for last. The door swings wide on the proof.',
  ],
};

/* ------------------------------------------------------------------ */
/* Deliberation — the party argues in character                        */
/* ------------------------------------------------------------------ */

const OPTION_PHRASES = {
  fight: 'draw steel and settle it',
  flee: 'fall back and live to try again',
  sneak: 'follow the rogue the quiet way',
  'turn-undead': 'let the cleric\'s light do the arguing',
  bribe: 'pay the toll like honest travelers',
  'spell-strike': 'open with the grimoire',
  disarm: 'trust the rogue\'s fingers',
  'push-through': 'grit teeth and push through',
  'search-around': 'find another way',
  'spell-bypass': 'let magic solve it',
  loot: 'take everything that glitters',
  inspect: 'poke it with a stick first, as tradition demands',
  'leave-it': 'walk away from the shine',
  study: 'raid the shelves for spells',
  'deep-study': 'let the wizard open the sealed texts',
  rest: 'kneel and take the shrine\'s mercy',
  desecrate: 'pry the gold leaf off the altar',
  'pass-by': 'keep marching',
  proceed: 'press on',
  alchemy: 'set the alchemist to the bench',
  gather: 'fill the satchel',
  brace: 'lock shields and endure',
  scatter: 'scatter and pray',
};

const ARCHETYPE_VOICES = {
  brave: 'the Bold blood in the party carried the vote',
  cunning: 'the Cunning heads prevailed, as they usually do',
  greedy: 'the Covetous streak would not be argued down',
  scholarly: 'the Scholarly bent won out — knowledge is the only treasure that walks out on its own legs',
  pious: 'the Devout among them spoke, quietly, and that settled it',
  reckless: 'the Reckless howled loudest, and the Reckless got their way',
  craven: 'the Craven voice had already counted the exits, and the counting was persuasive',
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
  if (!voice) voice = 'instinct and tired feet decided';

  // A quoted bark carries its own terminal punctuation; adding a
  // period after the closing quote doubles it
  const sep = voice.endsWith('"') ? '' : '.';

  if (rejected.length === 0) {
    return `There was only one road: the party chose to ${chosenPhrase}.`;
  }
  const rejectedText = rejected.length === 2 ? `${rejected[0]}, or ${rejected[1]}` : rejected[0];
  return `They might have chosen to ${rejectedText} — but ${voice}${sep} The party chose to ${chosenPhrase}.`;
}

/* ------------------------------------------------------------------ */
/* Resolutions                                                         */
/* ------------------------------------------------------------------ */

export function composeResolution(room, optionId, result, party) {
  const bits = [];

  switch (optionId) {
    case 'fight': {
      const leadAction = result.itemActions?.find(a => a.opening || a.vsUndead || a.summonAttack);
      if (leadAction) {
        bits.push(`🪄 ${leadAction.member}'s ${leadAction.item} answers first — ${leadAction.name}.`);
      }
      if (result.success && result.rounds === 0) {
        bits.push(`⚔️ ${capitalize(result.monster)} is over before it begins. The party steps around what's left.`);
      } else {
        const roundsWord = `${result.rounds} bloody round${result.rounds === 1 ? '' : 's'}`;
        bits.push(result.success
          ? pick([
              `⚔️ ${capitalize(result.monster)} falls after ${roundsWord}. The party stands, breathing hard, in possession of the field.`,
              `⚔️ It takes ${roundsWord} and costs ${result.damage} health in bruises and worse, but ${result.monster} will trouble no one again.`,
            ])
          : `☠️ ${capitalize(result.monster)} was too much. The line broke, and the dungeon collected its due.`);
      }
      break;
    }
    case 'spell-strike':
      bits.push(result.spell
        ? `🔥 ${result.spell} lights the room before a blade is drawn — the fight that follows is short and one-sided.`
        : '🔥 The grimoire is bare, so steel must do the whole job.');
      if (result.success) bits.push('The room is won.');
      break;
    case 'sneak':
      bits.push(result.success
        ? `🗡️ Single file, breath held, past ${result.monster} — it never knew its luck.`
        : `🗡️ A loose stone turns underfoot. ${capitalize(result.monster)} gets one good swipe in before the party scrambles clear.`);
      break;
    case 'turn-undead':
      bits.push(result.success
        ? '✨ The holy symbol blazes. The dead remember, briefly, that they are dead — and act accordingly.'
        : '✨ The light flickers and fails. Bones do not always listen, and these had opinions.');
      break;
    case 'bribe':
      bits.push(`💰 Fifteen gold changes hands. ${capitalize(result.monster)} counts it twice and waves the party through with something like professional respect.`);
      break;
    case 'flee':
      bits.push('💨 The party falls back in good order — mostly. The dungeon keeps the room, for now.');
      break;
    case 'disarm':
      bits.push(result.success
        ? '🗝️ A click, a held breath, a slack wire. The rogue pockets the trigger pin as a souvenir.'
        : '🗝️ Almost. The mechanism spends itself with a crack, and someone limps for the next few rooms.');
      break;
    case 'push-through':
      bits.push(`💥 Straight through — it costs ${result.damage} health and nobody\'s pride survives, but the corridor is behind them.`);
      break;
    case 'loot':
      bits.push(result.mimic
        ? `🦷 The chest has TEETH. After a horrible interval it is persuaded to be furniture again — ${result.gold} gold richer, several nerves poorer.`
        : `💰 ${result.gold} gold, honest and heavy. The bags sing on the walk out.`);
      break;
    case 'inspect':
      bits.push(`🔍 Poked, prodded, pronounced safe. ${result.gold} gold, collected with dignity intact.`);
      break;
    case 'leave-it':
      bits.push('🚶 The party walks away from free gold. Somewhere, a mimic sighs.');
      break;
    case 'study':
      bits.push(`📚 ${result.learned} new working${result.learned > 1 ? 's' : ''} copied into the grimoire by candle stub. The stacks keep their silence.`);
      break;
    case 'deep-study':
      bits.push(result.success
        ? '🔏 The sealed text opens for the wizard and, crucially, closes again. The party is two workings richer and only slightly haunted.'
        : '🔏 The book bites back. The wizard is thrown across the room trailing smoke and vindication.');
      break;
    case 'rest':
      bits.push(`🕯️ Candles, quiet, and ${result.healed} health apiece. The god of small mercies does steady work.`);
      break;
    case 'desecrate':
      bits.push('⛏️ Thirty gold in scraped-off leaf. The silence afterward has a texture to it. The dungeon takes notes.');
      break;
    case 'alchemy': {
      const a = result.alchemy;
      if (!a) {
        bits.push('⚗️ The bench is willing but the satchel is empty — no materials, no miracles.');
      } else if (a.type === 'potion') {
        bits.push(`⚗️ Glass sings, something turns gold at the bottom of the flask: a healing draught${a.doubled ? ' — two, in fact; Perenelle works in doubles' : ''}, corked and pocketed.`);
      } else {
        bits.push(`⚗️ The alchemist paints ${a.mod.name} down the edge of ${a.target}'s weapon. It hisses. Everyone takes one respectful step back.`);
      }
      break;
    }
    case 'gather': {
      const coda = party.hasClass(CLASSES.ALCHEMIST)
        ? 'The alchemist hums approvingly at everything.'
        : 'Nobody is sure what half of it does, but weight is weight.';
      bits.push(`🌿 ${result.materials} bundle${result.materials > 1 ? 's' : ''} of herbs and salts go into the satchel. ${coda}`);
      break;
    }
    case 'brace':
      bits.push(`🌋 Shields up, heads down — the dungeon does its worst (${result.damage} damage's worth) and the party is still there when the dust settles.`);
      break;
    case 'scatter':
      bits.push(result.success
        ? '🌋 Everyone runs their own way and nearly everyone guesses right. The regrouping is sheepish but intact.'
        : `🌋 Scattering was a theory. ${result.hurt} of the party guessed wrong, and the bruises will remember.`);
      break;
    default:
      bits.push('The party presses on, deeper and down.');
  }

  return bits.join(' ');
}

/* ------------------------------------------------------------------ */
/* Endings                                                             */
/* ------------------------------------------------------------------ */

const WIPE_EPITAPHS = [
  'The dungeon goes quiet again, the way it always does. The next party will find good gear, lightly used, and a warning nobody will heed.',
  'They were brave, or greedy, or both — the dungeon does not distinguish and does not care. The torches burn down. The dark files its claim.',
];

const VICTORY_CODAS = [
  'Up the long stair and out into weather — sunlight, absurd and wonderful, on faces that have earned it. The tavern will not believe a word, and every word is true.',
  'The boss\'s hoard divides beautifully. Someone proposes retirement. Everyone laughs. They will all be back within the month.',
];

/* ------------------------------------------------------------------ */
/* The town between — campaign interludes                              */
/* ------------------------------------------------------------------ */

const TOWN_INTERLUDES = [
  'The town takes the party in the way towns do: ale first, questions later, prices adjusted for visible wounds. Somewhere below, the next dungeon is already rearranging itself.',
  'Lamplight, real bread, a bed that is not stone. The innkeeper chalks the party\'s tab with professional optimism — heroes flush with dungeon gold rarely haggle.',
  'The temple takes donations, the apothecary takes more, and by morning the whole town knows what came crawling out of the dark with full pockets.',
];

export function composeTownInterlude(party, depth) {
  const line = pick(TOWN_INTERLUDES);
  const next = `Rumor already speaks of what waits at depth ${depth + 1}, and rumor sounds impressed.`;
  return `${line} ${next}`;
}

export function composePredicament(room, theme = null) {
  if (room.type === ROOM_TYPES.ENTRANCE && theme && THEME_ENTRANCES[theme.id]) {
    return pick(THEME_ENTRANCES[theme.id]);
  }
  // Name the foe when we have one — a boss earns a dramatic entrance,
  // a monster a specific one. (The generic pools remain the fallback.)
  if (room.type === ROOM_TYPES.BOSS && room.monster) {
    return pick([
      `The final chamber. ${capitalize(room.monster.name)} waits at its heart, and it has been expecting visitors far better armed than you.`,
      `Every dungeon keeps its worst for last. The door swings wide on ${room.monster.name}.`,
      `${capitalize(room.monster.name)} fills the last room the way weather fills a sky. There is no going around this one.`,
    ]);
  }
  if (room.type === ROOM_TYPES.MONSTER && room.monster) {
    return pick([
      `${capitalize(room.monster.name)} holds the room, and it heard the party coming since the entrance hall.`,
      `The room is not empty: ${room.monster.name}, between the party and the way down.`,
      `${capitalize(room.monster.name)} rises out of the dark. The smell of it arrives first.`,
    ]);
  }
  const pool = PREDICAMENTS[room.type] || PREDICAMENTS.corridor;
  return pick(pool);
}

export function composeWipe(party, roomsCleared, theme = null) {
  const fallen = party.members.map(m => m.name).join(', ');
  const where = theme ? ` in ${theme.name}` : '';
  return `${pick(WIPE_EPITAPHS)} Here ended${where}: ${fallen}. Rooms conquered: ${roomsCleared}.`;
}

export function composeVictory(party, roomsCleared, theme = null) {
  const survivors = party.living().map(m => m.name).join(', ');
  const where = theme ? ` of ${theme.name}` : '';
  return `${pick(VICTORY_CODAS)} Walked out${where}: ${survivors}. Rooms conquered: ${roomsCleared}.`;
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
