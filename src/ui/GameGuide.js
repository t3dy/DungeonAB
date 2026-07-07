/**
 * GameGuide — onscreen help and event messaging
 *
 * Two jobs, both pure and testable:
 *   1. ROOM_HELP — a one-line explanation of each room type, shown
 *      the first time the party walks into one.
 *   2. describeTickEvents — diff two simulator states and surface the
 *      notable things that just happened (a hero falls, the boss
 *      chamber opens, a spell is learned, a windfall of gold), so the
 *      player is never left wondering what changed.
 */

import { ROOM_TYPES } from '../world/DungeonGen.js';

/* First-visit explanations — what this kind of room means for the party */
export const ROOM_HELP = {
  [ROOM_TYPES.ENTRANCE]: 'The way in. The party gathers its nerve.',
  [ROOM_TYPES.CORRIDOR]: 'Just passage — a breath between dangers.',
  [ROOM_TYPES.MONSTER]: 'A monster. The party may fight, flee, sneak past (rogue), turn undead (cleric), bribe, or open with a spell.',
  [ROOM_TYPES.TRAP]: 'A trap. Rogues disarm it; the bold shove through and take the hit.',
  [ROOM_TYPES.TREASURE]: 'Treasure — and maybe a mimic. Loot it, inspect first, or leave the bait.',
  [ROOM_TYPES.LIBRARY]: 'A library. The party can learn a spell; wizards risk the sealed texts for more.',
  [ROOM_TYPES.SHRINE]: 'A shrine. Rest to heal — or pry off the gold leaf and let the dungeon remember it.',
  [ROOM_TYPES.LAB]: 'An alchemist\'s bench. With materials, brew a potion or coat a weapon.',
  [ROOM_TYPES.MATERIALS]: 'Herbs and salts — raw materials for alchemy, if you gather them.',
  [ROOM_TYPES.DISASTER]: 'The dungeon itself turns hostile. Brace together, or scatter and pray.',
  [ROOM_TYPES.BOSS]: 'The boss chamber. Everything you drafted, tested at once.',
  [ROOM_TYPES.VAULT]: 'A vault — riches behind a secret or locked door. Rogues find the hidden ones and pick the locks; iron keys wait in earlier rooms.',
  [ROOM_TYPES.SHOP]: 'A peddler\'s stall. Buy draughts, materials, or an iron key — haggle with a quick tongue, or rob at your peril: the peddler is armed.',
  [ROOM_TYPES.ALTAR]: 'An old altar. Offer gold for a lasting boon, blood for a keener edge, or pray free for small mercies. Desecrators get nothing.',
  [ROOM_TYPES.STAIRS]: 'A stairwell down. The next floor hits harder and pays better; a worn party may rest on the landing first.',
};

/**
 * A one-line legend of what the four draft card types do.
 */
export const CARD_TYPE_HELP = [
  { type: 'character', label: 'Character', text: 'A named hero of one of five classes. Party size = however many you draft.' },
  { type: 'equipment', label: 'Equipment', text: 'Auto-assigns to the best-fit member. Some items do different things per class.' },
  { type: 'spell', label: 'Spell', text: 'Shared grimoire. A scroll burns after one cast — unless a wizard makes it repeatable.' },
  { type: 'personality', label: 'Personality', text: 'Biases the whole party\'s decisions. Some look weak but hide an upside.' },
];

/**
 * The player-facing rundown of the controls.
 */
export const CONTROL_HELP = [
  { key: 'Pause / Resume', text: 'Freeze the delve to read the story, or let it run.' },
  { key: 'Step', text: 'Advance exactly one room, then pause — for savoring a run beat by beat.' },
  { key: 'Speed', text: 'How fast the party crawls, from a slow 0.25× to a brisk 4×.' },
];

/**
 * Compare the previous and current simulator states and return the
 * notable events between them, most urgent first. Each event is
 * { icon, text, kind } where kind ∈ death | boss | spell | gold | depth.
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

  // The grimoire grows
  if (prevParty && currParty && currParty.spellsLearned > prevParty.spellsLearned) {
    const n = currParty.spellsLearned - prevParty.spellsLearned;
    events.push({ icon: '📖', kind: 'spell', text: `The grimoire grows: ${n} new working${n > 1 ? 's' : ''} learned.` });
  }

  // A windfall of gold (small pickups stay quiet)
  if (prevParty && currParty) {
    const gained = currParty.gold - prevParty.gold;
    if (gained >= 25) {
      events.push({ icon: '💰', kind: 'gold', text: `A windfall: +${gained} gold.` });
    }
  }

  // The party goes down a floor (multi-floor dungeons)
  if (prev && (curr.currentFloor || 0) > (prev.currentFloor || 0)) {
    events.push({ icon: '🪜', kind: 'depth', text: `Floor ${curr.currentFloor + 1} — deeper, meaner, richer.` });
  }

  // An iron key changes hands (lock-and-key)
  if (prevParty && currParty && (currParty.keys || 0) > (prevParty.keys || 0)) {
    events.push({ icon: '🗝️', kind: 'key', text: 'An iron key — somewhere ahead, a door is waiting for it.' });
  }

  // Phial lore is earned (item identification)
  if (prevParty && currParty && (currParty.elixirLore || 0) > (prevParty.elixirLore || 0)) {
    events.push({ icon: '🧪', kind: 'lore', text: 'A phial identified — every future one of its color is known on sight.' });
  }

  // A veteran is put down (combat v2 elites) — rare, worth a flag
  const fx = curr.narration?.fx;
  if (fx?.elite && fx.won) {
    events.push({ icon: '⭐', kind: 'elite', text: `A veteran falls — ${fx.monsterName || 'a scarred survivor'}, harder-won and worth the extra.` });
  }

  // A boss reaching for its signature move is a beat; rank-and-file
  // moves stay in the ticker where they don't spam the toast layer
  if (fx?.move && currRoom === ROOM_TYPES.BOSS) {
    events.push({ icon: '💢', kind: 'move', text: `${fx.move} — the boss fights with more than teeth.` });
  }

  return events;
}
