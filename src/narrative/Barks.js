/**
 * Barks — what the party actually says
 *
 * The Megabase rule: the same archetype expresses differently per
 * class. A Reckless fighter charges; a Reckless wizard overchannels.
 * Barks are keyed [class][archetype], with a generic per-class
 * fallback for parties that drafted no personalities at all.
 */

import { CLASSES } from '../game/Cards.js';

/* [class][archetype] → lines. 'generic' is the no-personality voice. */
const BARKS = {
  [CLASSES.FIGHTER]: {
    brave: [
      'Stand back — this is the part I\'m for.',
      'If it bleeds on me, that\'s how I know it\'s working.',
    ],
    cunning: [
      'A fight you skip counts double.',
      'I hit hardest from the side nobody\'s watching.',
    ],
    greedy: [
      'The sword\'s just how I open lockboxes.',
      'Danger pay. Emphasis on pay.',
    ],
    scholarly: [
      'I read a treatise on this maneuver. Chapter three. Brace.',
      'Footwork is just grammar for the body.',
    ],
    pious: [
      'My shield has a saint on it. She\'s watching. Form up.',
      'The body is a temple. Mine\'s a fortress.',
    ],
    reckless: [
      'Plan? I\'m the plan.',
      'Last one in buys the ale!',
    ],
    craven: [
      'I\'ll guard the rear. Someone has to. Far back.',
      'My shield works best with me behind it and everything else very far away.',
    ],
    generic: [
      'Behind me.',
      'This is the job.',
    ],
  },

  [CLASSES.CLERIC]: {
    brave: [
      'Faith walks in front. So do I.',
      'The light goes first. I merely follow it, loudly.',
    ],
    cunning: [
      'Grace favors the well-prepared.',
      'The god helps those who check for tripwires.',
    ],
    greedy: [
      'Tithes flow both directions, technically.',
      'The god counts. So do I.',
    ],
    scholarly: [
      'The liturgy has a verse for this. Several, actually.',
      'The commentaries disagree. I don\'t.',
    ],
    pious: [
      'We are exactly where we are meant to be. Regrettably.',
      'Candles first. Then courage.',
    ],
    reckless: [
      'The god forgives. That\'s the whole strategy.',
      'Heal fast, ask later.',
    ],
    craven: [
      'I have a strong feeling we should be elsewhere. Call it prophecy.',
      'The god counsels prudence. Loudly. Through me. Right now.',
    ],
    generic: [
      'Steady. All of you, steady.',
      'Wounds after. Walking now.',
    ],
  },

  [CLASSES.WIZARD]: {
    brave: [
      'I did not memorize this spell to whisper it.',
      'Range is a suggestion. Watch.',
    ],
    cunning: [
      'There\'s a cheaper way to do this. There always is.',
      'Why duel what you can outwit?',
    ],
    greedy: [
      'Knowledge is treasure, but treasure is also treasure.',
      'Transmutation started as a hobby. It\'s a livelihood now.',
    ],
    scholarly: [
      'Fundamentals of Sorcery, volume three, page ninety: this exact mistake.',
      'Fascinating. Everyone stand behind me while I annotate.',
    ],
    pious: [
      'Magic is prayer with better handwriting.',
      'I asked permission for this spell. Twice.',
    ],
    reckless: [
      'Overchannel? I call it generous casting.',
      'The safety margin is where the good magic lives.',
    ],
    craven: [
      'I know a spell for this. It\'s called leaving.',
      'I did not survive the academy by standing in the open.',
    ],
    generic: [
      'Allow me.',
      'This will only take a syllable.',
    ],
  },

  [CLASSES.ROGUE]: {
    brave: [
      'Quietly is for people with time.',
      'I\'ll scout it — from inside.',
    ],
    cunning: [
      'Every door is a suggestion.',
      'Doors, guards, promises — all pickable.',
    ],
    greedy: [
      'It isn\'t stealing if the owner\'s a skeleton.',
      'My fingers itch. That means gold, or a rash.',
    ],
    scholarly: [
      'The lock\'s a three-pin Herrengrave. The book was wrong about them. I\'m not.',
      'I\'ve studied every trap in the codex. This one\'s new. Wonderful.',
    ],
    pious: [
      'Even locks answer to providence. I just expedite.',
      'I confess in advance. Saves time.',
    ],
    reckless: [
      'Traps are just puzzles with stakes.',
      'I disarm faster when it\'s already ticking.',
    ],
    craven: [
      'There\'s a wire there. I noticed it while planning my retreat.',
      'I\'ve counted the exits. There are three. I love them all.',
    ],
    generic: [
      'Give me a moment, and don\'t watch.',
      'Nobody move. Especially the floor.',
    ],
  },

  [CLASSES.ALCHEMIST]: {
    brave: [
      'I\'ve drunk worse than whatever that is.',
      'Every explosion is a lesson. Class is in session.',
    ],
    cunning: [
      'Measure twice, pour once.',
      'Add nothing until you know what it does. Then add plenty.',
    ],
    greedy: [
      'Gold in, gold out — that\'s the whole science.',
      'Everything in this room fits in my satchel if I believe.',
    ],
    scholarly: [
      'The notes end mid-sentence. I intend to finish them.',
      'Peer review can wait. The flask can\'t.',
    ],
    pious: [
      'The Work is a devotion. The explosions are incidental.',
      'As above, so below. Mind the fumes between.',
    ],
    reckless: [
      'Shake it and see.',
      'If it smokes, it works. If it screams, it works better.',
    ],
    craven: [
      'I keep my hazards bottled, thank you.',
      'Run first. The reaction can finish without us.',
    ],
    generic: [
      'I have something for this. Probably.',
      'Don\'t breathe in until I say.',
    ],
  },
};

/* Nobody repeats their best line while the echo is still in the room */
const RECENT_LIMIT = 4;
let recentBarks = [];

/**
 * A line for this speaker: their class voice, filtered through the
 * party's drafted personalities. Multiple archetypes pool their lines
 * (a Bold-and-Covetous party fighter may say either); no drafted
 * personality falls back to the class generic. Recently spoken lines
 * are avoided when the pool allows. Never returns null for a real class.
 */
export function getBark(cls, personalities = [], rng = Math.random) {
  const classTable = BARKS[cls];
  if (!classTable) return null;

  const pool = [];
  for (const archetype of personalities) {
    if (classTable[archetype]) pool.push(...classTable[archetype]);
  }
  if (pool.length === 0) pool.push(...classTable.generic);

  const fresh = pool.filter(line => !recentBarks.includes(line));
  const candidates = fresh.length > 0 ? fresh : pool;
  const line = candidates[Math.floor(rng() * candidates.length)];

  recentBarks.push(line);
  if (recentBarks.length > RECENT_LIMIT) recentBarks.shift();

  return line;
}

/** For coverage tests: the raw table. */
export function getAllBarks() {
  return BARKS;
}
