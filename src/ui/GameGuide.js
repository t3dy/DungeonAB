/**
 * GameGuide — onscreen help and event messaging
 *
 * Two jobs, both pure and testable:
 *   1. ROOM_HELP — a one-line explanation of each room type, shown
 *      the first time the party walks into one.
 *   2. describeTickEvents — diff two simulator states and surface the
 *      notable things that just happened, so the player is never left
 *      wondering what changed.
 *
 * On what belongs in a toast (v4.4). Numbers float over the map now
 * (ui/Cues.js), read straight off the Chronicle diff, and a toast that
 * repeats one is the thing a playtester was complaining about when they
 * said the game was *"a little text heavy"* — the windfall of gold and
 * the count of spells learned were being said twice, once as ✨ +54 and
 * once as a sentence. A toast is for what a floating number cannot
 * carry: a **name** (which trophy), or an event with no number at all
 * (a hero falls, the boss chamber opens).
 */

import { ROOM_TYPES } from '../world/DungeonGen.js';

/**
 * The first-visit tell: one line, on the screen, while the party is
 * standing in the room.
 *
 * `ROOM_HELP` below is the reference — it belongs in the How to Play
 * card, where a player has chosen to read. Putting the same paragraph
 * on the map was most of what a playtester meant by *"a little text
 * heavy"*: three of them covered the delve they were trying to watch.
 * The tell says what the room is for in a glance; the paragraph is a
 * click away and stays exact.
 */
export const ROOM_TELL = {
  [ROOM_TYPES.ENTRANCE]: 'The way in.',
  [ROOM_TYPES.CORRIDOR]: 'Passage — a breath between dangers.',
  [ROOM_TYPES.MONSTER]: 'Something holds this room. Fight it, slip past it, or talk.',
  [ROOM_TYPES.TRAP]: 'A trap. Disarm it, go around, or take the hit.',
  [ROOM_TYPES.TREASURE]: 'Treasure — or a mimic wearing its shape.',
  [ROOM_TYPES.LIBRARY]: 'Shelves. The party can leave knowing a working it did not.',
  [ROOM_TYPES.SHRINE]: 'A shrine. Rest here, or strip the gold and answer for it.',
  [ROOM_TYPES.LAB]: 'A bench. With materials, something can be brewed.',
  [ROOM_TYPES.MATERIALS]: 'Herbs and salts, if anyone gathers them.',
  [ROOM_TYPES.DISASTER]: 'The dungeon itself turns on them.',
  [ROOM_TYPES.BOSS]: 'The boss chamber. Everything drafted, tested at once.',
  [ROOM_TYPES.STAIRS]: 'A stair down. Meaner below, and no way back up.',
  [ROOM_TYPES.VAULT]: 'A vault behind a secret door. Nobody was meant to find this.',
};

/* First-visit explanations — what this kind of room means for the party */
export const ROOM_HELP = {
  [ROOM_TYPES.ENTRANCE]: 'The way in. The party gathers its nerve.',
  [ROOM_TYPES.CORRIDOR]: 'Just passage — a breath between dangers.',
  [ROOM_TYPES.MONSTER]: 'A monster. The party may fight, flee, sneak past (rogue), turn undead (cleric), bribe, or open with a spell — and a spell opening keeps working through the fight. Every slain monster drops a trophy worth carrying.',
  [ROOM_TYPES.TRAP]: 'A trap. Rogues disarm it; the bold shove through and take the hit.',
  [ROOM_TYPES.TREASURE]: 'Treasure — and maybe a mimic. Loot it, inspect first, or leave the bait.',
  [ROOM_TYPES.LIBRARY]: 'A library. The party can learn a spell; wizards risk the sealed texts for more.',
  [ROOM_TYPES.SHRINE]: 'A shrine. Rest to heal — or pry off the gold leaf and let the dungeon remember it.',
  [ROOM_TYPES.LAB]: 'An alchemist\'s bench. With materials, brew a potion or coat a weapon.',
  [ROOM_TYPES.MATERIALS]: 'Herbs and salts — raw materials for alchemy, if you gather them.',
  [ROOM_TYPES.DISASTER]: 'The dungeon itself turns hostile. Brace together, or scatter and pray.',
  [ROOM_TYPES.BOSS]: 'The boss chamber. Everything you drafted, tested at once — and the party looses every prepared working it has kept for this.',
  [ROOM_TYPES.STAIRS]: 'A stair down. The floor below is meaner than this one, and there is no way back up.',
  [ROOM_TYPES.VAULT]: 'A vault — riches hidden behind a secret door. Rogues and scholars find these.',
};

/**
 * A one-line legend of what the four draft card types do.
 */
export const CARD_TYPE_HELP = [
  { type: 'character', label: 'Character', text: 'A named hero of one of five classes. Four march — the rest wait in town as reserves, ready to replace the dead.' },
  { type: 'equipment', label: 'Equipment', text: 'Auto-assigns to the best-fit member. Some items do different things per class.' },
  { type: 'spell', label: 'Spell', text: 'A prepared working in the shared grimoire: reusable, but spent for the room once cast. Power scales with the party\'s sharpest mind, and a loosed working keeps working for the rest of the fight — combat workings go on biting, healing ones go on mending, and a heal fires the moment someone is failing rather than after the dust settles. A wizard amplifies it and opens ordinary fights with two — and at the boss the party looses every working it has. Scrolls found in the dungeon still burn.' },
  { type: 'tactic', label: 'Tactic', text: 'Learned technique, gated by what the party can DO rather than by class — everyone swings at something, so anyone benefits from Flanking. Tactics form a small tree: a tier-two card does nothing without the tier-one it grows from.' },
  { type: 'personality', label: 'Personality', text: 'Biases the whole party\'s decisions. Some look weak but hide an upside.' },
];

/**
 * The player-facing rundown of the controls.
 */
/**
 * The two attrition clocks, in one line each — the systems that make the
 * march between rooms cost something rather than being a formality
 * before the boss.
 */
export const ATTRITION_HELP = [
  { key: 'Oil 🏮', text: 'The lamp burns a unit every march. Run dry and the whole party takes damage every room it walks in the dark. An Everburning Lantern makes it last twice as long; Dancing Light and Eyes of the Mouse answer the dark outright.' },
  { key: 'Wounds ✚', text: 'A blow worth a quarter of a body leaves a scar, and healing can no longer reach past it — the hatched part of the health bar. Wounds only mend in town, so the delve accumulates.' },
];

export const CONTROL_HELP = [
  { key: 'Pause / Resume', text: 'Freeze the delve to read the story, or let it run.' },
  { key: 'Step', text: 'Advance exactly one room, then pause — for savoring a run beat by beat.' },
  { key: 'Speed', text: 'How fast the party crawls, from a slow 0.25× to a brisk 4×.' },
];

/**
 * Compare the previous and current simulator states and return the
 * notable events between them, most urgent first. Each event is
 * { icon, text, kind } where kind ∈ death | boss | spell | gold |
 * trophy | depth.
 *
 * Pure: reads the two state snapshots, never mutates them.
 */
export function describeTickEvents(prev, curr) {
  const events = [];
  if (!curr) return events;

  const prevParty = prev?.party;
  const currParty = curr.party;

  // A hero falls — the loudest thing that can happen
  if (prevParty && currParty) {
    for (const member of currParty.members) {
      const before = prevParty.members.find(m => m.name === member.name);
      if (before && before.alive && !member.alive) {
        events.push({ icon: '☠️', kind: 'death', text: `${member.name} has fallen.` });
      }
    }
  }

  // The boss chamber opens
  const prevRoom = prev?.narration?.room;
  const currRoom = curr.narration?.room;
  if (currRoom === ROOM_TYPES.BOSS && prevRoom !== ROOM_TYPES.BOSS) {
    events.push({ icon: '🐉', kind: 'boss', text: 'The boss chamber — everything you drafted, tested at once.' });
  }

  // A trophy claimed from a kill (Drops) — the cue can only float 🏆+1,
  // and the whole point of a trophy is which one it is
  if (prevParty?.trophies && currParty?.trophies?.length > prevParty.trophies.length) {
    const latest = currParty.trophies[currParty.trophies.length - 1];
    events.push({ icon: latest.icon, kind: 'trophy', text: `Claimed from the kill: ${latest.name}.` });
  }

  return events;
}
