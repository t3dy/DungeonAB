/**
 * Divination — the information economy (v6)
 *
 * Divination is not a combat buff. It buys the party a look at what
 * the next descent will ask of them, so the player can answer it in
 * town before committing:
 *
 *   information → prediction → investment → test
 *
 * The reading's clarity scales with what the party actually brought.
 * A party with no divination gets tavern rumor; a party with
 * Divination, Astronomy, and Observation gets counts, hazard kinds,
 * and a straight answer about which capabilities the dungeon will
 * reward. What it never gets is the outcome — only the question.
 */

import { CAPABILITIES } from './Capabilities.js';
import { ROOM_TYPES } from '../world/DungeonGen.js';
import { getEncounterForRoom } from '../encounters/EncounterEngine.js';

/** How clear the sight is, by what the party carries. */
export function clarityOf(party) {
  let clarity = 0;
  if (party.hasCapability('divination')) clarity += 2;
  if (party.hasCapability('astronomy')) clarity += 1;
  if (party.hasCapability('observation')) clarity += 1;
  if (party.hasCapability('memory')) clarity += 1;   // remembers the shape of places like this
  return clarity;
}

/**
 * What each room type asks of a party — the vocabulary a reading
 * speaks in. Keyed to capabilities so a reading is directly
 * actionable: "mechanisms" means "bring Tinkering."
 */
const ROOM_DEMANDS = {
  [ROOM_TYPES.MONSTER]: { tag: 'creatures', capabilities: ['tactics', 'conjuring'] },
  [ROOM_TYPES.BOSS]: { tag: 'a guardian', capabilities: ['tactics'] },
  [ROOM_TYPES.TRAP]: { tag: 'mechanisms', capabilities: ['tinkering', 'rogue'] },
  [ROOM_TYPES.TREASURE]: { tag: 'hoards', capabilities: ['appraisal'] },
  [ROOM_TYPES.VAULT]: { tag: 'a sealed vault', capabilities: ['appraisal', 'rogue'] },
  [ROOM_TYPES.LIBRARY]: { tag: 'books', capabilities: ['knowledge', 'antiquarian', 'memory'] },
  [ROOM_TYPES.SHRINE]: { tag: 'sacred ground', capabilities: ['healing', 'harmony'] },
  [ROOM_TYPES.LAB]: { tag: 'apparatus', capabilities: ['alchemy', 'experimentation'] },
  [ROOM_TYPES.MATERIALS]: { tag: 'raw substances', capabilities: ['alchemy'] },
  [ROOM_TYPES.DISASTER]: { tag: 'unstable ground', capabilities: ['tactics', 'naturalPhilosophy'] },
  [ROOM_TYPES.STAIRS]: { tag: 'a way down', capabilities: ['navigation'] },
};

/** What a stamped encounter asks for, beyond its room type. */
function encounterDemands(room) {
  const def = getEncounterForRoom(room);
  if (!def || !def.options) return [];
  return [...new Set(def.options.flatMap(o => o.requires || []))];
}

/**
 * Read the omens over a dungeon the party has not yet entered.
 *
 * @param party    the party as it stands (its capabilities set clarity)
 * @param dungeon  a generated Dungeon (deterministic from the seed, so
 *                 previewing it does not change what the party will meet)
 * @returns {{ clarity, blind, headline, lines, demands, answered, unanswered }}
 */
export function readOmens(party, dungeon) {
  const clarity = clarityOf(party);
  const rooms = dungeon?.rooms || [];

  if (clarity === 0) {
    return {
      clarity: 0,
      blind: true,
      headline: 'Nobody in the party reads what is coming.',
      lines: ['🕯️ The descent is made blind: whatever the dungeon asks, it will ask without warning.'],
      demands: [],
      answered: [],
      unanswered: [],
    };
  }

  // Count what the dungeon holds, and what each holding demands
  const counts = {};
  const demandSet = new Set();
  for (const room of rooms) {
    if (room.type === ROOM_TYPES.ENTRANCE || room.type === ROOM_TYPES.CORRIDOR) {
      // A corridor is nothing — unless a situation has been placed in it
      for (const cap of encounterDemands(room)) demandSet.add(cap);
      if (room.encounterId) counts['situations'] = (counts['situations'] || 0) + 1;
      continue;
    }
    const demand = ROOM_DEMANDS[room.type];
    if (!demand) continue;
    counts[demand.tag] = (counts[demand.tag] || 0) + 1;
    for (const cap of demand.capabilities) demandSet.add(cap);
    for (const cap of encounterDemands(room)) demandSet.add(cap);
  }

  const partyCaps = party.capabilities();
  const demands = [...demandSet];
  const answered = demands.filter(c => partyCaps.has(c));
  const unanswered = demands.filter(c => !partyCaps.has(c));

  const lines = [];

  // Clarity 2+: the shape of the place, named but not numbered
  const present = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (present.length > 0) {
    const named = clarity >= 3
      ? present.map(([tag, n]) => `${n}× ${tag}`).join(', ')
      : present.slice(0, 3).map(([tag]) => tag).join(', ');
    lines.push(`🔮 The descent holds ${named}.`);
  }

  // Clarity 3+: the hazards' actual kinds
  if (clarity >= 3) {
    const trapKinds = [...new Set(rooms.filter(r => r.trapType).map(r => r.trapType))];
    if (trapKinds.length) lines.push(`⚠️ Snares run to ${trapKinds.join(' and ')}.`);
    const undead = rooms.filter(r => r.monster?.undead).length;
    if (undead > 0) lines.push(`💀 ${undead} of what waits there is already dead.`);
  }

  // Clarity 4+: the guardian, named
  if (clarity >= 4) {
    const boss = rooms.find(r => r.type === ROOM_TYPES.BOSS)?.monster;
    if (boss) lines.push(`🐉 At the bottom: ${boss.name} (attack ${boss.attack}, health ${boss.health}).`);
  }

  // The actionable half — what the party can answer, and what it cannot
  if (unanswered.length > 0) {
    const names = unanswered.map(c => CAPABILITIES[c]?.name || c);
    lines.push(`❓ Nothing the party carries answers: ${names.join(', ')}.`);
  }
  if (answered.length > 0 && clarity >= 3) {
    const names = answered.map(c => CAPABILITIES[c]?.name || c);
    lines.push(`✅ The party is already equipped for: ${names.join(', ')}.`);
  }

  const headline = clarity >= 4
    ? 'The figure is drawn clean: the descent is legible end to end.'
    : clarity >= 3
      ? 'The reading comes through clearly enough to plan around.'
      : 'The reading is partial — shapes, not particulars.';

  return { clarity, blind: false, headline, lines, demands, answered, unanswered };
}
