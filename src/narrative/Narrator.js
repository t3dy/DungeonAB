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
  castle: [
    'The Castle of the Vampire Lord. The doors open themselves, the candles are already lit, and somewhere above, someone is very glad you\'ve come.',
    'The portcullis rises without a hand on the winch. Every window is curtained against a sun that set hours ago. The party is expected.',
  ],
  bogcellar: [
    'The Root Cellar of the Bog Witch. The stairs are slick, the shelves go down farther than cellars should, and every jar turns to watch.',
    'Down past the hanging herbs and into the earth-smell. Something on the third shelf is knocking, politely, from the inside.',
  ],
  icecaverns: [
    'The Ice Caverns of the Mad Pyromancer. The walls are glass-smooth where they melted and refroze, and warm air breathes up from below like the mountain has a fever.',
    'Ice underfoot, scorch marks overhead. The physics of this place gave notice long ago and were not replaced.',
  ],
};

/* Themed hazards — each dungeon's disasters are its own (procgen v2:
   the DISASTER room reads by theme) */
const THEME_DISASTERS = {
  castle: [
    'The candles gutter all at once, and the darkness that follows has weight and direction. The castle is feeding.',
    'Every mirror in the corridor turns to face the party. There are more mirrors than there were.',
  ],
  bogcellar: [
    'A shelf lets go — a hundred jars at once, and not everything that spills stays spilled. The cellar floor begins to digest.',
    'The roots in the walls flex, and the ceiling of packed earth sags like a held breath about to end.',
  ],
  icecaverns: [
    'A vein of old fire meets a wall of older ice. The steam blast is instant, scalding, and very impressed with itself.',
    'The ceiling thaws in one groaning sheet. What refreezes will refreeze sharp; what falls, falls now.',
  ],
  volcanic: [
    'The mountain clears its throat. Lava finds a new opinion about which passages should exist.',
    'A cinder squall rolls up the gallery, and the party breathes through wet cloth and profanity.',
  ],
  crypt: [
    'Every lid in the corridor shifts at once — one knuckle\'s width. The dead are politely making room for more.',
    'The barrow-damp thickens until the torches burn blue. Something below is exhaling.',
  ],
  library: [
    'The stacks lean in. A shelf-quake rains folios, and some of them land arguing.',
    'The flood rises a hand\'s width in a minute, and the books scream quietly the way wet paper does.',
  ],
  madlab: [
    'Something upstream of the drains achieves criticality. The color of the light has no name and wants one.',
    'A retort the size of a wardrobe cracks, and the room\'s weather becomes chemical.',
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
  vault: [
    'A vault. Someone sealed this room and walled over the seal, which raises exactly one question: from which side?',
    'The hidden room is small, dry, and stacked to the beams. Whoever hoarded this never came back for it. The dungeon knows why.',
    'Coin-shine in the dark — a vault, untouched since its owner\'s luck ran out somewhere between here and daylight.',
  ],
};

/* ------------------------------------------------------------------ */
/* Asides — side passages and secret doors (procgen v2)                */
/* ------------------------------------------------------------------ */

const SECRET_FOUND = [
  '🕳️ {finder} taps the wall and the wall answers wrong — hollow. A seam, a catch, and a door that was never meant to be found swings inward.',
  '🕳️ {finder} stops mid-stride: the dust on this stretch of floor has been disturbed from the *inside*. A hidden door gives under one shoulder.',
  '🕳️ A draft where no draft should be. {finder} follows it to a false stone, and the dungeon reluctantly shows its hidden room.',
];

const DETOUR_TAKEN = [
  '🧭 A side passage breathes cold air across the party\'s torches, and curiosity wins the vote.',
  '🧭 There is a way that is forward and a way that is *interesting*. The party takes the interesting one.',
];

const DETOUR_SKIPPED = [
  '🚶 A side passage yawns to one side. The party looks at it, looks at each other, and keeps marching.',
  '🚶 Somewhere down that branching corridor is either treasure or teeth. The party elects not to find out which.',
];

export function composeSecretFound(party) {
  const rogue = party.living().find(m => m.class === CLASSES.ROGUE);
  const finder = rogue ? rogue.name : (party.living()[0]?.name || 'Someone');
  return pick(SECRET_FOUND).replace('{finder}', finder);
}

export function composeDetour(taken) {
  return pick(taken ? DETOUR_TAKEN : DETOUR_SKIPPED);
}

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
  'knock-open': 'open it from across the room, loudly',
  'cause-fear': 'break the thing\'s nerve before it can use its teeth',
  'smoke-bomb': 'let the alchemist spring it from a safe distance',
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
              `⚔️ ${roundsWord[0].toUpperCase() + roundsWord.slice(1)}, and then a silence with ${result.monster} at the bottom of it. The party wins the argument.`,
              `⚔️ Steel does what diplomacy couldn't. ${capitalize(result.monster)} is down, and the room changes ownership.`,
            ])
          : pick([
              `☠️ ${capitalize(result.monster)} was too much. The line broke, and the dungeon collected its due.`,
              `☠️ The party gave everything it had, and ${result.monster} took the rest. The dungeon is very good at arithmetic.`,
            ]));
      }
      break;
    }
    case 'spell-strike': {
      if (!result.spell) {
        bits.push('🔥 The grimoire is bare, so steel must do the whole job.');
      } else if (result.spellEdge === 'weak') {
        bits.push(`🔥 The caster reads the thing and reaches for ${result.spell} — chosen precisely, because this one hates ${result.spellElement}. It lands like an argument won in advance.`);
      } else if (result.spellEdge === 'swarm') {
        bits.push(`🔥 ${result.spell} tears through the packed bodies — a swarm is mostly targets.`);
      } else if (result.spellEdge === 'resisted') {
        bits.push(`🔥 ${result.spell} lands, and the thing shrugs off half of it. The caster files that away for next time.`);
      } else {
        bits.push(`🔥 ${result.spell} lights the room before a blade is drawn — the fight that follows is short and one-sided.`);
      }
      if (result.success) bits.push('The room is won.');
      break;
    }
    case 'sneak':
      bits.push(result.success
        ? pick([
            `🗡️ Single file, breath held, past ${result.monster} — it never knew its luck.`,
            `🗡️ The rogue's route works: over the fallen lintel, behind ${result.monster}, gone. Nobody exhales until the next room.`,
          ])
        : pick([
            `🗡️ A loose stone turns underfoot. ${capitalize(result.monster)} gets one good swipe in before the party scrambles clear.`,
            `🗡️ Halfway past, someone's buckle sings against stone. ${capitalize(result.monster)} charges; the party pays the toll in bruises.`,
          ]));
      break;
    case 'turn-undead':
      bits.push(result.success
        ? '✨ The holy symbol blazes. The dead remember, briefly, that they are dead — and act accordingly.'
        : '✨ The light flickers and fails. Bones do not always listen, and these had opinions.');
      break;
    case 'bribe':
      bits.push(`💰 Fifteen gold changes hands. ${capitalize(result.monster)} counts it twice and waves the party through with something like professional respect.`);
      break;
    case 'cause-fear':
      bits.push(pick([
        `😱 ${result.spell || 'Cause Fear'} lands like a cold hand on the neck. ${capitalize(result.monster)} remembers an appointment elsewhere, urgently.`,
        `😱 One syllable of dread, and ${result.monster} discovers it was never paid enough for this. The room empties at speed.`,
      ]));
      break;
    case 'smoke-bomb':
      bits.push(pick([
        '⚗️ The alchemist lobs a smoking vial from thirty feet, and the trap spends its violence on fog. A material well spent.',
        '⚗️ One concoction, one long arc, one very dead trap. The alchemist accepts the applause with a small bow.',
      ]));
      break;
    case 'knock-open':
      bits.push(result.wasMimic
        ? `🚪 ${result.spell} slams the lid open from across the room — and TEETH snap shut on empty air. The mimic sulks; the party collects ${result.gold} gold at arm's length.${result.consumed ? ' The scroll burns.' : ''}`
        : `🚪 ${result.spell} booms through the chamber and the lock surrenders at range. ${result.gold} gold, no surprises${result.consumed ? '; the scroll burns' : ''} — though everything below now knows precisely where you are.`);
      break;
    case 'flee':
      bits.push(pick([
        '💨 The party falls back in good order — mostly. The dungeon keeps the room, for now.',
        '💨 Retreat, regroup, pretend it was tactics. The room stays hostile behind them.',
      ]));
      break;
    case 'disarm':
      bits.push(result.success
        ? pick([
            '🗝️ A click, a held breath, a slack wire. The rogue pockets the trigger pin as a souvenir.',
            '🗝️ Three pins, one prayer, no explosion. The rogue takes a bow nobody asked for.',
            '🗝️ The mechanism surrenders quietly, the way good work makes things do.',
          ])
        : pick([
            '🗝️ Almost. The mechanism spends itself with a crack, and someone limps for the next few rooms.',
            '🗝️ The wire was a decoy; the real trigger was the floor. The rogue apologizes from the far wall.',
          ]));
      break;
    case 'push-through':
      bits.push(pick([
        `💥 Straight through — it costs ${result.damage} health and nobody's pride survives, but the corridor is behind them.`,
        `💥 Heads down, teeth gritted: ${result.damage} health buys the far side of the room.${result.spotted ? ' The Craven called the tripwire, which is why it was only that much.' : ''}`,
      ]));
      break;
    case 'loot':
      bits.push(result.mimic
        ? pick([
            `🦷 The chest has TEETH. After a horrible interval it is persuaded to be furniture again — ${result.gold} gold richer, several nerves poorer.`,
            `🦷 The lid comes up and so does the tongue. When it's over there are ${result.gold} gold and a new shared silence about chests.`,
          ])
        : pick([
            `💰 ${result.gold} gold, honest and heavy. The bags sing on the walk out.`,
            `💰 ${result.gold} gold counted twice, because counting it once felt too good to trust.`,
            `💰 The hoard is real: ${result.gold} gold, no teeth, no curse anyone's noticed yet.`,
          ]));
      break;
    case 'inspect':
      bits.push(pick([
        `🔍 Poked, prodded, pronounced safe. ${result.gold} gold, collected with dignity intact.`,
        `🔍 Ten careful minutes and a stick sacrificed to science: ${result.gold} gold, no surprises.`,
      ]));
      break;
    case 'leave-it':
      bits.push(pick([
        '🚶 The party walks away from free gold. Somewhere, a mimic sighs.',
        '🚶 Gold left gleaming in the dark. Restraint, or superstition — the ledger doesn\'t care which.',
      ]));
      break;
    case 'study':
      bits.push(pick([
        `📚 ${result.learned} new working${result.learned > 1 ? 's' : ''} copied into the grimoire by candle stub. The stacks keep their silence.`,
        `📚 Dust, patience, and ${result.learned} working${result.learned > 1 ? 's' : ''} the dungeon's last owners won't be needing.`,
      ]));
      break;
    case 'deep-study':
      bits.push(result.success
        ? '🔏 The sealed text opens for the wizard and, crucially, closes again. The party is two workings richer and only slightly haunted.'
        : '🔏 The book bites back. The wizard is thrown across the room trailing smoke and vindication.');
      break;
    case 'rest':
      bits.push(pick([
        `🕯️ Candles, quiet, and ${result.healed} health apiece. The god of small mercies does steady work.`,
        `🕯️ The party kneels badly and means it anyway. ${result.healed} health apiece, no questions asked.`,
        `🕯️ Warm stone, old wax, ${result.healed} health returned. Whoever keeps this shrine keeps it well.`,
      ]));
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

  // Preparation pays, and the chronicle says so by name (the FTL
  // lesson: the encounter must notice how you came equipped)
  for (const prep of result.preps || []) {
    bits.push(prep.text);
  }

  return bits.join(' ');
}

/* ------------------------------------------------------------------ */
/* Falls — a hero's death is a beat, not a footnote                    */
/* ------------------------------------------------------------------ */

const DEATH_LINES = {
  [CLASSES.FIGHTER]: [
    '— shield still up, the door held one last time.',
    '— facing the thing, which was always the plan.',
    '— and the back rank learns, all at once, what the front rank was for.',
  ],
  [CLASSES.CLERIC]: [
    '— mid-blessing, the lantern light going out last of all.',
    '— hands still warm from a mending that wasn\'t their own.',
    '— and whatever was listening to their prayers hears the silence.',
  ],
  [CLASSES.WIZARD]: [
    '— the unfinished syllable hanging in the air like smoke.',
    '— annotating the fatal error to the very end.',
    '— and the grimoire is suddenly just a book.',
  ],
  [CLASSES.ROGUE]: [
    '— two steps short of a shadow that would have held them.',
    '— and everyone\'s spare coin, it is later discovered, goes with them.',
    '— having checked everything in the room for traps except the obvious.',
  ],
  [CLASSES.ALCHEMIST]: [
    '— the satchel breaking open in a small, private rainbow.',
    '— mid-measurement. The reaction, at least, completes.',
    '— leaving notes that end, as their master\'s always did, mid-sentence.',
  ],
};

const DEATH_CODAS = [
  'The party does not stop. Stopping is for the surface.',
  'Someone closes their eyes for them. There is no time for more.',
  'The delve grows quieter by exactly one voice.',
  'What can be carried of theirs is carried on. The rest is mourned at marching pace.',
];

/**
 * A fallen hero's line in the chronicle: their class writes the
 * death, the party writes the grief.
 */
export function composeFall(member) {
  const lines = DEATH_LINES[member.class] || DEATH_LINES[CLASSES.FIGHTER];
  return `☠️ ${member.name} falls ${pick(lines)} ${pick(DEATH_CODAS)}`;
}

/* ------------------------------------------------------------------ */
/* Endings                                                             */
/* ------------------------------------------------------------------ */

const WIPE_EPITAPHS = [
  'The dungeon goes quiet again, the way it always does. The next party will find good gear, lightly used, and a warning nobody will heed.',
  'They were brave, or greedy, or both — the dungeon does not distinguish and does not care. The torches burn down. The dark files its claim.',
  'Above ground, the tavern keeps their tab open a decent interval, then wipes the slate. The dungeon keeps better records.',
  'No one sees them fall who lives to say so. The story ends the way the honest ones do: mid-sentence, underground.',
];

const VICTORY_CODAS = [
  'Up the long stair and out into weather — sunlight, absurd and wonderful, on faces that have earned it. The tavern will not believe a word, and every word is true.',
  'The boss\'s hoard divides beautifully. Someone proposes retirement. Everyone laughs. They will all be back within the month.',
  'They come up singing something unprintable and out of tune, and the town forgives it instantly, because look what they\'re carrying.',
  'The last door closes behind them and becomes, in the telling, three times as heavy and guarded by twice as much. Every victory improves with altitude.',
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
  // Each theme's disasters are its own brand of trouble
  if (room.type === ROOM_TYPES.DISASTER && theme && THEME_DISASTERS[theme.id]) {
    return pick(THEME_DISASTERS[theme.id]);
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
