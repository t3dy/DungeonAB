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
import { getEncounter } from '../encounters/EncounterEngine.js';
import { CLASSES, getAllCards } from '../game/Cards.js';
import { getBark } from './Barks.js';
import { roomFeatures, getFeature, FEATURE_ACTIONS } from '../world/RoomFeatures.js';

/* ------------------------------------------------------------------ */
/* Predicaments per room type                                          */
/* ------------------------------------------------------------------ */

/* Themed arrivals — what this dungeon is, stated at the door */
const THEME_ENTRANCES = {
  delve: 'The party enters the Old Delve: rats, skeletons, and goblin toll-gangs between here and the boss.',
  castle: 'The party enters the Castle of the Vampire Lord. Treasure is plentiful; most of the household is undead or ethereal.',
  icecaverns: 'The party enters the Ice Caverns of the Mad Pyromancer. Disasters are frequent, and fire and frost weaknesses run through everything.',
};

/* Themed disasters — what actually goes wrong, per dungeon */
const THEME_DISASTERS = {
  castle: 'The candles go out: the castle itself attacks the party in the dark.',
  icecaverns: 'A fire vent meets the cavern ice: a scalding steam blast fills the room.',
};

const PREDICAMENTS = {
  entrance: ['The party gathers at the dungeon entrance and starts down.'],
  corridor: ['A connecting corridor. Nothing blocks the way; the party moves through.'],
  stairs: [
    'A stair cut into the rock, going down. Cold air comes up it.',
    'The floor ends at a stairwell. Whatever is below has been waiting longer.',
    'Steps down, worn in the middle by traffic that stopped a long time ago.',
  ],
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

export function composeSecretFound(party, wing = null) {
  const rogue = party.living().find(m => m.class === CLASSES.ROGUE);
  const finder = rogue ? rogue.name : (party.living()[0]?.name || 'Someone');
  const behind = wing?.tell ? ` Behind it: ${wing.tell}.` : '';
  return `🕳️ ${finder} finds a hidden door into ${wing?.name || 'a side passage'}.${behind} Its rooms join the route.`;
}

export function composeDetour(taken, wing = null, advocate = null) {
  const name = wing?.name || 'the side passage';
  const tell = wing?.tell ? ` — ${wing.tell}` : '';
  // Who wanted it, when somebody in particular did (RoomEncounters
  // wingAppeal): a detour with a reason reads as a decision
  const aside = wing?.tell ? ` (${wing.tell})` : '';
  if (!taken) return `🚶 The party looks into ${name}${aside} and keeps to the main route.`;
  // With a reason, the reason leads and the tell stands down: an
  // advocate usually names the same thing the tell describes, and
  // printing both says the weapon rack twice.
  if (advocate) {
    return `🧭 ${advocate[0].toUpperCase()}${advocate.slice(1)}: the party turns off into ${name}. Its rooms join the route.`;
  }
  return `🧭 The party turns off into ${name}${tell}. Its rooms join the route.`;
}

/**
 * A shaft in the floor. Three outcomes, all reported plainly: found
 * and climbed, found and refused, or blundered into.
 */
export function composeTrapdoor({ outcome, rooms, damage, floors = 0, finder }) {
  // A shaft that goes through the floor lands the party a level down,
  // past the stair; one that does not is a shortcut along this one.
  const landing = floors > 0 ? ` on ${floorName(floors)}` : '';
  if (outcome === 'descend') {
    return `🕳️ ${finder} finds a trapdoor in the floor. The party ropes down the shaft and lands${landing}, skipping ${rooms} room${rooms === 1 ? '' : 's'} ahead and taking ${damage} damage.`;
  }
  if (outcome === 'refused') {
    return `🕳️ ${finder} finds a trapdoor in the floor. The party leaves it shut: the rooms it skips hold loot as well as danger.`;
  }
  if (outcome === 'fell') {
    return `🕳️ The floor gives way — a hidden trapdoor. The party lands${landing || ' further down the same level'}, ${rooms} room${rooms === 1 ? '' : 's'} past where they were, taking ${damage} damage, and the rooms between go unlooted.`;
  }
  return '';
}

/* ------------------------------------------------------------------ */
/* Deliberation — options, advocate, choice                            */
/* ------------------------------------------------------------------ */

/** For the writing gate: every option id the prose knows how to name. */
export function phrasedOptions() {
  return Object.keys(OPTION_PHRASES);
}

const OPTION_PHRASES = {
  // The Armour That Follows
  'commune-armour': 'speak with whatever wears the armour',
  'name-the-owner': 'name the armour by its heraldry',
  'strip-insignia': 'strip the insignia off it',
  'read-its-gait': 'read its movement and walk around it',
  'put-it-down': 'put the armour down',
  // The Duellist's Challenge
  'accept-duel': 'accept the duel',
  'negotiate-terms': 'negotiate the terms',
  'recognize-style': 'recognize his school',
  'make-it-a-melee': 'make it a team fight',
  'push-past-duellist': 'push past him',
  // The Chessboard Floor
  'solve-progression': 'solve the progression',
  'read-the-dust': 'read the dust',
  'divine-safe-square': 'ask which square is safe',
  'cross-in-order': 'cross in order',
  'walk-it': 'just walk it',
  // The Cartographer's Ghost
  'read-the-plan': 'read the place itself',
  'reconstruct-his-rounds': 'reconstruct his rounds',
  'question-the-ghost': 'question the ghost gently',
  'ask-where-it-lies': 'scry for the map',
  'leave-cartographer': 'leave him looking for it',
  // The Party Is Cut in Half
  'linked-plan': 'pass a plan through the stone',
  'link-minds': 'speak mind to mind',
  'send-a-messenger': 'send something under the slab',
  'signal-by-sound': 'signal by sound',
  'work-the-slab': 'work the slab',
  'shout-through-it': 'shout through it',
  // Capability-engine situations (encounters/Encounters.js)
  'repair-gears': 'repair the gears',
  'correct-orrery': 'correct the orrery',
  'divine-instability': 'divine the unstable motion',
  'recognize-model': 'recognize the cosmological model',
  'steady-ground': 'hold the stationary floor',
  'compute-epicycles': 'compute the orrery’s epicycles',
  'hurry-through': 'hurry through the turning room',
  'read-correspondences': 'read the correspondences',
  'planetary-sequence': 'work the planetary sequence',
  'material-symbolism': 'read the metals',
  'reconcile-traditions': 'reconcile the traditions',
  'divine-sequence': 'divine the opening order',
  'force-the-door': 'force the door',
  'leave-sealed': 'leave it sealed',
  'negotiate-grievance': 'negotiate with it',
  'translate-claim': 'answer it in its own tongue',
  'identify-artifact': 'identify the disputed thing',
  'investigate-claim': 'investigate its claim',
  'slip-past-grievance': 'slip past it',
  'fight-grievance': 'fight it',
  'appraise-chests': 'appraise the three chests',
  'knowledge-mark': 'read the maker\'s mark',
  'observation-pick': 'pick the chest that was opened before',
  'guess-heavy': 'take the heaviest chest',
  'experiment-rebuild': 'experiment with the assembly',
  'alchemy-bypass': 'dissolve the lock',
  'tinkering-solve': 'understand the mechanism and fix it',
  'take-detour': 'take one of the side passages',
  'heal-directly': 'bring the fever down',
  'medicine-diagnose': 'diagnose and treat the fever',
  'naturalphil-remedy': 'apply a natural remedy',
  'reconstruct-memory': 'reconstruct the mosaic from memory',
  'imagine-solution': 'imagine what the image should be',
  'knowledge-pattern': 'recognize the mosaic',
  'smash-wall': 'break through the wall',
  'music-harmony': 'sing the third harmony',
  'harmony-attune': 'attune the resonances',
  'correspondence-solve': 'link the three frequencies',
  'endure-discord': 'endure the discord',
  'observe-closely': 'observe every detail',
  'search-methodical': 'search the room methodically',
  'divine-presence': 'divine what is hidden here',
  'hurry-past': 'move along',
  'brew-oil': 'cook a material down into lamp oil',
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
  descend: 'take the stair down',
  'rope-down': 'rope down the shaft beside it',
  'camp-stair': 'camp at the stairhead first',
  // Using the room itself (world/RoomFeatures.js FEATURE_ACTIONS)
  'shove-into-pit': 'shove it into the pit',
  'shove-onto-spikes': 'put it onto the floor spikes',
  'shove-into-chasm': 'put it down the crack in the floor',
  'topple-boulder': 'topple the boulder onto it',
  'shove-into-brazier': 'shove it into the brazier',
  'drop-portcullis': 'drop the portcullis on it',
  'fight-from-cover': 'fight from behind the pillars',
  'pry-sarcophagus': 'pry the sarcophagus open',
  'bless-the-font': 'bless the font and drink',
  'fill-waterskins': 'fill the waterskins',
  'harvest-spout': 'harvest the spout',
  'sift-rubble': 'sift the rubble',
  'crack-crates': 'crack the crates open',
  'work-the-anvil': 'put an edge back on at the anvil',
  'strip-the-shelves': 'strip the shelves',
};

/**
 * Who argued for it, when no class advocate speaks up. One line per
 * archetype meant a party of one temper printed the same sentence in
 * every room it entered — a delve of six identical deliberations, which
 * tests/prose.js counts as a repetition and a reader counts as a stuck
 * record. Several each, so the same party argues in different words.
 */
/**
 * Rotates which magus speaks when no class owns the decision, so the
 * same mouth does not argue for everything. Reset per delve alongside
 * the bark history (`resetBarks`), which is module state for the same
 * reason.
 */
let deliberationTurn = 0;
export function resetDeliberation() { deliberationTurn = 0; }

const ARCHETYPE_VOICES = {
  brave: [
    'the Bold voted to meet it head-on',
    'the Bold saw no reason to be careful about it',
    'the Bold wanted it settled here',
  ],
  cunning: [
    'the Cunning picked the safer angle',
    'the Cunning looked for the way that costs least',
    'the Cunning had already worked out the odds',
  ],
  greedy: [
    'the Covetous wanted the payout',
    'the Covetous counted what was in the room first',
    'the Covetous refused to leave anything behind',
  ],
  scholarly: [
    'the Scholarly wanted the knowledge',
    'the Scholarly wanted a closer look before anything else',
    'the Scholarly argued from what the books say about this',
  ],
  pious: [
    'the Devout called it the right thing to do',
    'the Devout said the god would want it this way',
    'the Devout would not hear of the other options',
  ],
  reckless: [
    'the Reckless did not wait for a vote',
    'the Reckless were already moving',
    'the Reckless settled it by going first',
  ],
  craven: [
    'the Craven pushed for the safest option',
    'the Craven wanted no part of the alternative',
    'the Craven argued for whatever kept a door behind them',
  ],
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

  /*
   * Who argued for this — and it should be a person wherever one can be
   * found.
   *
   * Read as a reader, the archetype voice was the worst thing in the
   * corpus: "the Reckless were already moving" six times in nine rooms,
   * "the Cunning picked the safer angle" five times in eight. Three
   * variants per archetype were not enough, and more would not have
   * fixed it, because every one of them opens "the <Archetype>" and so
   * they read as one sentence however the tail differs. A party of one
   * temper narrated its whole delve in a single voice belonging to
   * nobody.
   *
   * Meanwhile the class path was producing the best lines in the game —
   * "Margaret Cavendish made the case: 'Fundamentals of Sorcery, volume
   * three, page ninety: this exact mistake.'" — and only fired when the
   * option happened to be in `CLASS_ADVOCATES`.
   *
   * So: a class advocate first, then ANY living magus with something to
   * say, and the archetype abstraction only when nobody is left to say
   * it. Naming people also feeds the two values the reading pass and
   * the dramaturg both want — a delve about somebody, and deaths of
   * somebody the reader had met.
   */
  let voice = null;
  const advocateClass = CLASS_ADVOCATES[chosenId];
  const speak = (m) => {
    const bark = getBark(m.class, party.personalities);
    return bark ? `${m.name} made the case: "${bark}"` : null;
  };

  if (advocateClass && party.hasClass(advocateClass)) {
    const advocate = party.living().find(m => m.class === advocateClass);
    voice = speak(advocate) || `${advocate.name} made the case`;
  }
  // No class owns this decision: let somebody in the party own it
  // anyway. Rotated by turn so it is not always the same mouth.
  if (!voice) {
    const living = party.living();
    for (let i = 0; i < living.length && !voice; i++) {
      voice = speak(living[(deliberationTurn + i) % living.length]);
    }
  }
  deliberationTurn++;
  if (!voice) {
    for (const archetype of party.personalities) {
      if (ARCHETYPE_VOICES[archetype]) {
        voice = pick(ARCHETYPE_VOICES[archetype]);
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

/**
 * Using the room: what the furniture did, with the number. Fight
 * openers report the damage and then hand off to the ordinary fight
 * lines; resource uses report what came out of the room.
 */
function composeFeatureUse(optionId, result) {
  const action = FEATURE_ACTIONS[optionId];
  const feature = getFeature(action.feature);
  const icon = feature?.icon || '🧱';
  const name = feature?.name || 'the furniture';

  if (action.fightOnly) {
    const dealt = result.featureDamage ?? action.openerDamage;
    switch (optionId) {
      case 'shove-into-pit':
        return `${icon} The party shoves the monster into ${name}: ${dealt} damage, and it has to climb back out.`;
      case 'shove-onto-spikes':
        return `${icon} The party drives the monster back onto ${name}: ${dealt} damage, and it has to pull itself off them.`;
      case 'shove-into-chasm':
        return `${icon} The party works the monster to the edge and puts it into ${name}: ${dealt} damage on the way down.`;
      case 'topple-boulder':
        return `${icon} The party topples ${name} down the slope onto the monster: ${dealt} damage.`;
      case 'shove-into-brazier':
        return `${icon} The party drives the monster into ${name}: ${dealt} fire damage.`;
      case 'drop-portcullis':
        return `${icon} The winch lets go and ${name} comes down across the monster: ${dealt} damage.`;
      case 'fight-from-cover':
        return `${icon} The party backs into ${name} and makes the monster come down one aisle at a time: ${dealt} damage as it closes.`;
      default:
        return `${icon} The party turns ${name} against the monster: ${dealt} damage.`;
    }
  }

  const parts = [];
  if (optionId === 'pry-sarcophagus') parts.push(`${icon} The party pries the lid off ${name}`);
  else if (optionId === 'bless-the-font') parts.push(`${icon} The cleric says the words over ${name} and the party drinks`);
  else if (optionId === 'fill-waterskins') parts.push(`${icon} The party fills its waterskins at ${name}`);
  else if (optionId === 'harvest-spout') parts.push(`${icon} The alchemist bottles what drips from ${name}`);
  else if (optionId === 'sift-rubble') parts.push(`${icon} The party sifts ${name}`);
  else if (optionId === 'crack-crates') parts.push(`${icon} The party cracks open ${name}`);
  else if (optionId === 'work-the-anvil') parts.push(`${icon} The party works ${name}`);
  else if (optionId === 'strip-the-shelves') parts.push(`${icon} The wizard strips ${name}`);
  else parts.push(`${icon} The party uses ${name}`);

  const gains = [];
  if (result.gold) gains.push(`${result.gold} gold`);
  if (result.materials) gains.push(`${result.materials} material${result.materials === 1 ? '' : 's'}`);
  if (result.healed) gains.push(`${result.healed} health healed`);
  if (result.spell) gains.push(`a scroll of ${result.spell} for the grimoire`);
  if (result.weaponMod) gains.push(`${result.weaponMod.name} on ${result.weaponMod.target}'s weapon (+${result.weaponMod.attack} attack)`);
  if (result.curedLinger) gains.push('the lingering venom flushed out');

  return `${parts[0]}: ${gains.length ? gains.join(', ') : 'nothing worth carrying'}.`;
}

/**
 * How a fight ended.
 *
 * A monster can die to the openers -- thrown knives, a loosed working,
 * the room itself -- before a single round is fought. "kills it in 0
 * rounds" reads as a bug rather than a rout, which is what it is. Found
 * by reading a golden diff.
 */
function killLine(result) {
  if (!result.rounds) {
    return `⚔️ ${capitalize(result.monster)} is dead before the party closes: it never gets a round.`;
  }
  return `⚔️ The party kills ${result.monster} in ${result.rounds} round${result.rounds === 1 ? '' : 's'}, taking ${result.damage} damage.`;
}

/**
 * Floors have names in the party's mouth, not indices. The generator
 * counts from zero; the writing counts from the door.
 */
const FLOOR_NAMES = ['the entrance level', 'the second floor', 'the third floor', 'the fourth floor'];
export function floorName(floor) {
  return FLOOR_NAMES[floor] || 'the floor below';
}

/**
 * The plain walk between one room and the next. This used to be a
 * single sentence, which meant a long dungeon printed it ten times
 * (tests/prose.js finds exactly that).
 */
const PROCEED_LINES = [
  'The party moves on to the next room.',
  'Nothing here needs doing. The party walks on.',
  'The party crosses the room and takes the far door.',
  'There is nothing to fight and nothing to take. The party keeps going.',
  'The party files through and leaves the room behind.',
];

/* ------------------------------------------------------------------ */
/* The editor — a resolution has a budget                              */
/* ------------------------------------------------------------------ */

/*
 * This is the failure a generated game arrives at by addition. Every
 * ward, cover bonus, tactic and coating pushes its own prep line, each
 * individually correct and in voice — and measured over 120 transcripts,
 * the median BOSS resolution ran 1113 characters, with the actual event
 * buried in the middle (narrative/Dramaturg.js, `concision`). Nobody
 * wrote that paragraph. It accumulated.
 *
 * So the resolution gets an editor. Three classes of prep line, in
 * priority order:
 *
 *   carries  — a consequence arriving from an earlier room (a stance
 *              held, a favourable aspect, a tripped alarm). Always
 *              inline: continuity is the point of these lines, and a
 *              callback the reader never reads is not a callback.
 *   cards    — a line fulfilling a drafted card's promise, matched by
 *              source name against the card pool. Two slots: a card
 *              visibly working is why anyone drafts one (the Eyes of
 *              the Mouse lesson, CLAUDE.md rule 9).
 *   generic  — terrain cover, formation, footwork. Two slots, first
 *              come; the formation tell is pushed first by the resolver
 *              and so survives when the room is quiet.
 *
 * Everything past the budget folds into one clause, and the Simulator
 * files the folded lines in the ledger — which has been the place for
 * complete accounting since the Chronicle was two layers.
 */
const CARD_NAMES = new Set(getAllCards().map(c => c.name.toLowerCase()));
const CARRY_SOURCES = new Set([
  'the room before this one', 'the corrected heavens', 'the warning', 'the alarm',
]);
// One budget, not two pools: the approved policy (2026-08-31) is
// "outcome plus the two or three most consequential preparations, cards
// first" — and a first draft with separate card and generic budgets
// quietly summed to five, which measured out at a 683-character median
// boss resolution. Three total, with card lines outranking generic
// ones rather than drawing from their own pool: a fight where three
// drafted cards fire shows all three and no terrain; a quiet fight
// keeps its formation tell. Carries ride free — a callback the reader
// never reads is not a callback.
const PREP_BUDGET = 3;

/**
 * @param reserved  card lines the composer will print that do not live
 *                  in the preps array — a spell-strike opening, an item
 *                  lead ("🪄 … uses the Haunted Armor"). They are card
 *                  promises too, and they spend the same budget; without
 *                  this, spell-strike fights ran ~150 characters past
 *                  every other fight for carrying a fourth card line.
 */
export function editPreps(preps = [], reserved = 0) {
  const budget = Math.max(2, PREP_BUDGET - reserved);
  const inline = [];
  const rest = [];
  for (const p of preps) {
    const source = String(p.source || '').toLowerCase();
    if (CARRY_SOURCES.has(source)) { inline.push(p); continue; }
    const isCard = CARD_NAMES.has(source) || CARD_NAMES.has(source.replace(/^the /, ''));
    rest.push({ p, isCard });
  }
  // Cards outrank generics; order of play holds within each class
  const ranked = [...rest.filter(x => x.isCard), ...rest.filter(x => !x.isCard)];
  const kept = new Set(ranked.slice(0, budget).map(x => x.p));
  const folded = [];
  for (const { p } of rest) (kept.has(p) ? inline : folded).push(p);
  return { inline, folded };
}

/** The clause standing in for everything the editor cut. */
function foldClause(n) {
  return `🎒 ${n} more preparation${n === 1 ? ' holds' : 's hold'} besides — the ledger keeps ${n === 1 ? 'it' : 'them'}.`;
}

/**
 * Who bore the fight, when it is worth a line. The resolver measures
 * health lost per member (mechanically true — blows go to the front
 * rank first), and the line prints only when the brunt is a real blow:
 * rationing, and it is exactly the hard fights, where people die, that
 * clear the bar — so the fallen have been named before they fall.
 */
function bruntLine(result) {
  const b = result.brunt;
  if (!b || !result.rounds || b.lost < 4 || b.lost > result.damage) return null;
  return pick([
    `🩸 ${b.name} takes the worst of it: ${b.lost} of the party's ${result.damage}.`,
    `🩸 Most of that lands on ${b.name} — ${b.lost} of the ${result.damage} taken.`,
    `🩸 It is ${b.name} standing in front of it: ${b.lost} of the ${result.damage} the party takes.`,
  ]);
}

export function composeResolution(room, optionId, result, party) {
  const bits = [];

  // A capability-engine situation carries its own resolution line
  if (result?.narrative) {
    bits.push(result.narrative);
    for (const prep of result.preps || []) bits.push(prep.text);
    if (result.foldedPreps) bits.push(foldClause(result.foldedPreps));
    return bits.join(' ');
  }

  // The room's furniture, used (world/RoomFeatures.js)
  if (FEATURE_ACTIONS[optionId]) {
    bits.push(composeFeatureUse(optionId, result));
    const action = FEATURE_ACTIONS[optionId];
    if (action.fightOnly) {
      // Then the fight itself, on the ordinary lines
      bits.push(result.success
        ? (result.rounds === 0
            ? `⚔️ ${capitalize(result.monster)} is finished before it can strike back.`
            : killLine(result))
        : `☠️ Even so, ${result.monster} beats the party down.`);
      const brunt = bruntLine(result);
      if (brunt) bits.push(brunt);
    }
    for (const prep of result.preps || []) bits.push(prep.text);
    if (result.foldedPreps) bits.push(foldClause(result.foldedPreps));
    return bits.join(' ');
  }

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
        bits.push(killLine(result));
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
        bits.push(killLine(result));
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
      // A party can flee the same room repeatedly, so the retreat has to
      // read differently each time or the Chronicle stutters
      bits.push(pick(RETREAT_LINES)(result.fled || 1, result.damage ?? 2));
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
    case 'brew-oil':
      // The preps carry the numbers; this is the beat itself
      bits.push('⚗️ The alembic goes on the bench and a bundle of materials becomes light to march by.');
      break;
    case 'brace':
      bits.push(`🌋 The party braces together and rides it out: ${result.damage} damage taken.`);
      break;
    case 'scatter':
      bits.push(result.success
        ? '🌋 The party scatters; nearly everyone finds cover. Minimal damage.'
        : `🌋 The party scatters; ${result.hurt} member${result.hurt === 1 ? '' : 's'} guessed wrong and took 3 damage each.`);
      break;
    /* Stairs down — the floor below is meaner than this one */
    case 'descend':
      bits.push(`\u{1FA9C} The party goes down the stair to ${floorName(room.descendsTo)}, ${result.supplySpent === 1 ? 'burning a march of oil on the climb' : 'and the lamp is already out'}.`);
      break;
    case 'rope-down':
      bits.push(`\u{1FA9C} The party ropes down the shaft beside the stair and lands on ${floorName(room.descendsTo)}.`);
      break;
    case 'camp-stair': {
      const set = result.mended ? ` A night off their feet sets one of ${result.mended}'s wounds.` : '';
      bits.push(result.interrupted
        ? `\u{1F3D5}\uFE0F The party makes camp at the stairhead and something climbs the stair into it: ${result.healed} healed each, ${result.damage} damage taken, and ${floorName(room.descendsTo)} still to go.${set}`
        : `\u{1F3D5}\uFE0F The party makes camp at the stairhead and eats before the climb: ${result.healed} healed each, then down to ${floorName(room.descendsTo)}.${set}`);
      break;
    }

    default:
      bits.push(pick(PROCEED_LINES));
  }

  // Whoever bore the fight is named — spell-strike and the other
  // delegating options carry `brunt` through from the fight resolver,
  // so this covers every road into a fight, not just 'fight'.
  const brunt = bruntLine(result);
  if (brunt) bits.push(brunt);

  // Preparation pays, and the log says so by name (the FTL lesson:
  // the encounter must notice how you came equipped)
  for (const prep of result.preps || []) {
    bits.push(prep.text);
  }
  if (result.foldedPreps) bits.push(foldClause(result.foldedPreps));

  return bits.join(' ');
}

/**
 * Who walks in front, said once when it is first true and again
 * whenever it changes.
 *
 * The party has always had a point man — `Party.takeDamage` sends every
 * blow to the fighters first — and the prose has never named them. So
 * the most exposed member of the party was anonymous until the line
 * that killed them: 85% of deaths were of somebody the reader had not
 * met (narrative/Dramaturg.js, mortalityEarned).
 *
 * Rationed to the moments it means something: the first dangerous room,
 * and every time the order changes underneath. A change is nearly
 * always somebody dying, which makes the replacement's first line and
 * their predecessor's last fall in the same breath — the succession is
 * the drama, and it was already happening silently in the arithmetic.
 */
export function composePoint(member, { succeeding = null } = {}) {
  if (!member) return null;
  if (succeeding) {
    return pick([
      `🛡️ With ${succeeding} down, ${member.name} takes the front. The next thing through the door meets them first.`,
      `🛡️ Somebody has to stand where ${succeeding} was standing. ${member.name} moves up.`,
      `🛡️ ${member.name} steps into the gap ${succeeding} left, and the party re-forms behind them.`,
    ]);
  }
  return pick([
    `🛡️ ${member.name} walks in front, which is where the blows land first.`,
    `🛡️ The order settles with ${member.name} at the head of it: whatever comes, comes to them.`,
    `🛡️ ${member.name} takes the front of the march, and the rest fall in behind.`,
  ]);
}

/* ------------------------------------------------------------------ */
/* Falls — a hero's death is reported by name                          */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Attrition — the two clocks, reported as they tick                   */
/* ------------------------------------------------------------------ */

/*
 * House style, same as everywhere else in this file: say what happened
 * and what it cost. No flourishes standing in for information — a line
 * the player cannot act on is a line that should not be here.
 *
 * Variety matters more for these than for room writing, because a delve
 * fires them five or six times. The dark in particular escalates: the
 * first benighted march reads differently from the fourth, so a long
 * walk in the dark tells a story instead of repeating a sentence.
 */
const SUPPLY_LINES = {
  low: [
    n => `🕯️ The lantern is burning low: oil for ${n} more ${n === 1 ? 'march' : 'marches'}.`,
    n => `🕯️ The wick is well down the oil. ${n} more ${n === 1 ? 'march' : 'marches'} of light, then none.`,
    n => `🕯️ Someone checks the reservoir and does not like the answer: oil for ${n} more ${n === 1 ? 'march' : 'marches'}.`,
  ],
  guttered: [
    () => '🕯️ The last of the oil goes. From here the party walks in the dark.',
    () => '🕯️ The flame stands up, thins, and is gone. The party is out of oil.',
    () => '🕯️ The lantern dies with the party still under the hill. No more light to carry.',
  ],
  conjured: [
    (name, full) => `💡 ${name} carries the march instead of oil: none of the ${full} damage the dark would have taken.`,
    (name, full) => `💡 No oil left, so ${name} does the work — light enough to walk by, and ${full} damage nobody pays.`,
    (name, full) => `💡 ${name} kindles in the empty air and the party walks on seeing. The dark takes nothing.`,
  ],
  'sure-footed': [
    (name, full) => `🪶 ${name} takes the party's weight off the floor: they walk the dark without walking into it, and pay none of the usual ${full}.`,
    (name, full) => `🪶 No light, but no stumbling either — ${name} carries them through blind and whole, ${full} damage unpaid.`,
    (name, full) => `🪶 ${name} means the floor never tells them what they hit. Nothing does: ${full} damage avoided.`,
  ],
  'dark-seen': [
    (name, full) => `👁️ ${name} makes the dark no trouble: the party walks on, ${full} damage unpaid.`,
    (name, full) => `👁️ ${name} reads the black like a page, and the march costs nothing.`,
    (name, full) => `👁️ ${name} leads them through whole — none of the usual ${full} damage.`,
  ],
};

/* The dark gets worse the longer it lasts — the player should feel the
 * clock running, not read the same sentence four times. */
const DARK_LINES = [
  d => `🌑 The party gropes through the dark and pays for it: ${d} damage to everyone.`,
  d => `🌑 Another march by touch alone. Walls, edges, and things underfoot take ${d} from each of them.`,
  d => `🌑 The dark is telling now. Everyone is bleeding somewhere they cannot see: ${d} damage each.`,
  d => `🌑 They have stopped calling it a march. ${d} damage to everyone, again, and the hill goes on.`,
];

/**
 * One march's worth of the supply clock, as prose.
 * Takes the data note from Party.burnSupply.
 */
export function composeSupply(note) {
  if (!note) return null;
  if (note.kind === 'dark') {
    const n = Math.max(1, note.darkMarches || 1);
    const line = DARK_LINES[Math.min(n, DARK_LINES.length) - 1];
    // A temper that changed what the dark charges says so the first
    // time it does, so the player can tell a Craven delve from a Bold
    // one rather than just reading a different number
    const temper = n === 1 && note.temper?.length
      ? ' ' + note.temper.map(t => t.text).join(' ')
      : '';
    return line(note.damage) + temper;
  }
  const pool = SUPPLY_LINES[note.kind];
  if (!pool) return null;
  if (note.kind === 'conjured' || note.kind === 'sure-footed' || note.kind === 'dark-seen') {
    return pick(pool)(note.source, note.full);
  }
  return pick(pool)(note.supply);
}

const WOUND_LINES = [
  (n, c) => `✚ ${n} takes a wound that will not close down here. Healing can bring them back to ${c}, no further, until town.`,
  (n, c) => `✚ That one leaves a mark on ${n}. Their ceiling drops to ${c} for the rest of the delve.`,
  (n, c) => `✚ ${n} is opened up badly enough that the delve will keep it: ${c} is as whole as they get until town.`,
];

const DEEP_WOUND_LINES = [
  (n, c, w) => `✚ ${n} is wounded again — ${w} scars now, and nothing can heal them past ${c} before town.`,
  (n, c, w) => `✚ ${w} wounds on ${n}, and the ceiling with them: ${c}, and no more.`,
];

/**
 * What the party's temper did to the quartermaster's list, said once at
 * the mouth of the dungeon. Silent when no temper had an opinion.
 */
export function composeProvision(notes) {
  if (!notes || notes.length === 0) return null;
  return '🕯️ ' + notes.map(n => n.text).join(' ');
}

/**
 * A newly taken wound, named for the player.
 *
 * Wounds used to happen in silence — the health bar's ceiling quietly
 * dropped and the Chronicle never said why. A mechanic the player cannot
 * see is a mechanic they cannot plan around.
 */
export function composeWound(member, temperNotes = null) {
  const ceiling = member.effectiveMax ? member.effectiveMax() : member.maxHealth;
  const line = member.wounds > 1
    ? pick(DEEP_WOUND_LINES)(member.name, ceiling, member.wounds)
    : pick(WOUND_LINES)(member.name, ceiling);
  // The temper that changed how readily this party scars says so on the
  // first wound of the delve, and then stops explaining itself
  if (temperNotes?.length && member.wounds === 1) {
    return `${line} ${temperNotes.map(t => t.text).join(' ')}`;
  }
  return line;
}

/**
 * The surgeon's bill, reported when town clears the delve's scars.
 */
export function composeMend(mended) {
  if (!mended || mended.wounds === 0) return null;
  const who = mended.names.length === 1
    ? mended.names[0]
    : `${mended.names.slice(0, -1).join(', ')} and ${mended.names[mended.names.length - 1]}`;
  return `✚ The town surgeon sets what the march only bandaged: ${mended.wounds} wound${mended.wounds === 1 ? '' : 's'} closed on ${who}, and full health is theirs again.`;
}

/**
 * A drafted tactic that is doing nothing, and why.
 *
 * The tree's whole design is that a tier-two card is a blank without
 * its root — which is only a fair decision if the player is *told*.
 * A silently dead card reads as a bug.
 */
export function composeDormant(entry) {
  if (!entry) return null;
  const { tactic, reason, missing, capability } = entry;
  if (reason === 'requires') {
    return `${tactic.icon} ${tactic.name} is drafted but idle: it grows out of ${missing.name}, and nobody in this party has learned that.`;
  }
  const need = {
    cast: 'a working in the grimoire to use it on',
    attack: 'somebody still standing',
  }[capability] || 'something this party does not have';
  return `${tactic.icon} ${tactic.name} is drafted but idle: it wants ${need}.`;
}

/** The technique the party actually brought, named once at the start. */
export function composeTactics(live) {
  if (!live || live.length === 0) return null;
  const names = live.map(t => `${t.icon} ${t.name}`).join(', ');
  return `The party has drilled: ${names}.`;
}

/**
 * A death, reported by name.
 *
 * `remaining` is how many are still standing AFTER this fall, and it is
 * not decoration: read as a reader, a wipe printed four identical lines
 * ending "the survivors march on" — when the fourth had left nobody to
 * march. The prose stated something untrue at the most consequential
 * moment in the delve (standing rule 13: a line states what the
 * mechanic did and invents nothing).
 *
 * Four deaths in one room also read as one death copied four times, so
 * the last of a party is written as the last of a party.
 */
export function composeFall(member, remaining = null) {
  const who = `☠️ ${member.name} falls. The party's ${member.class} is dead`;
  if (remaining === null) return `${who}.`;
  if (remaining <= 0) return `${who}, and there is nobody left to carry them out.`;
  if (remaining === 1) return `${who}; one of them is still standing.`;
  return `${who}; the ${remaining} still standing march on.`;
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

/**
 * Coming back to a room the party already ran from.
 *
 * A retreat leaves the room hostile and the party walks back into it,
 * so a stubborn or a craven band can meet the same monster half a dozen
 * times. Repeating the room's first-sight description each time reads
 * as a stuck record; these say what is actually different, which is
 * that everyone involved has met before.
 */
const RETREAT_LINES = [
  (n, dmg) => (n > 1
    ? `💨 They back out again and it follows further this time: ${dmg} damage on the way.`
    : `💨 The party retreats, taking ${dmg} damage on the way out. The room stays hostile; they will have to try it again.`),
  (n, dmg) => (n > 1
    ? `💨 Out through the same door a second time, ${dmg} damage the toll. There is no third.`
    : `💨 The party gives ground, ${dmg} damage on the way out, and the room keeps what it was holding.`),
  (n, dmg) => (n > 1
    ? `💨 Another retreat, and it costs ${dmg} this time. The room is winning this by attrition.`
    : `💨 They fall back, paying ${dmg} for the room they do not take.`),
];

const RETURN_LINES = [
  n => `They are back. ${n === 2 ? 'The room has not improved.' : `This is the ${n}${n === 3 ? 'rd' : 'th'} time, and it knows them now.`}`,
  n => `The same room again${n > 3 ? ', and the party is running out of ways to describe it' : ''}. Whatever is in it has had time to think.`,
  n => `Back through the same door, for the ${n === 2 ? 'second' : n === 3 ? 'third' : `${n}th`} time. Nothing here has forgotten them.`,
];

export function composePredicament(room, theme = null) {
  // A stamped situation states its own predicament
  if (room?.encounterId && !room.visits) {
    const def = getEncounter(room.encounterId);
    if (def?.situation) return def.situation;
  }
  // A return visit gets its own opening rather than the room's
  // first-sight description over again
  // A room the party has already backed out of twice does not offer a
  // third exit: the fight is happening (RoomEncounters, CORNERED_AT)
  if (room?.fled >= 2 && !room.cleared) {
    return `They are back, and there is no backing out this time: ${room.monster?.name || 'it'} is between them and the door.`
      + monsterTells(room.monster);
  }
  if (room?.visits > 1 && !room.cleared) {
    return pick(RETURN_LINES)(room.visits) + monsterTells(room.monster);
  }
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
    return lead + monsterTells(m) + featureTells(room);
  }
  if (room.type === ROOM_TYPES.TRAP && room.trapType && TRAP_TELLS[room.trapType]) {
    return `${pick(PREDICAMENTS.trap)} ${TRAP_TELLS[room.trapType]}${featureTells(room)}`;
  }
  const pool = PREDICAMENTS[room.type] || PREDICAMENTS.corridor;
  return pick(pool) + featureTells(room);
}

/**
 * What the room is furnished with, named so the player can see why an
 * option exists. Each feature states its own tell (RoomFeatures).
 *
 * Two of them, not five.
 *
 * Read as a reader, this was the resolution's accumulation problem in
 * the predicament beat: a monster room opened with a brazier, pillars, a
 * sarcophagus and a pit listed in one paragraph before the fight was
 * mentioned, and the same four pieces of furniture recurred across
 * rooms, so a dungeon read as one room redecorated. The tells are each
 * well written and there were simply too many.
 *
 * Two is enough to explain the options the room offers — and the ones
 * that get named are the ones the party can *act* on, since a tell whose
 * whole job is to justify an option should not be cut in favour of
 * scenery.
 */
const FEATURE_TELL_BUDGET = 2;

function featureTells(room) {
  const features = roomFeatures(room);
  if (features.length === 0) return '';
  const actionable = features.filter(f => FEATURE_ACTIONS[f.action] || f.action);
  const ranked = [...actionable, ...features.filter(f => !actionable.includes(f))];
  return ' ' + ranked.slice(0, FEATURE_TELL_BUDGET).map(f => f.tell).join(' ');
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
