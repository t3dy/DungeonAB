/**
 * EncounterEngine — capability × affordance → options
 *
 * `Party.capabilities()` has existed for a while with a docstring
 * promising it was "used by the encounter engine to evaluate which
 * options unlock." This is that engine.
 *
 * The chain it implements:
 *
 *   CHARACTER → CAPABILITIES → AFFORDANCES → OPTIONS → CHOICE → CONSEQUENCES
 *
 * An encounter is data: a situation that AFFORDS certain things
 * (mechanism, undead, people, substances — the same tag vocabulary
 * `world/RoomFeatures.js` already puts on furniture), and options that
 * REQUIRE certain capabilities. An option appears only where the two
 * intersect. Nothing here ever names a character: a magus matters
 * because of the tags on their card, so anyone who drafts the same
 * capability reaches the same option.
 *
 * This deliberately does NOT replace RoomEncounters' hand-written
 * rooms. It runs alongside them, for rooms that carry an `encounterId`.
 *
 * Definition shape:
 *   {
 *     id, roomType?,                 // roomType routes a whole type here
 *     title, situation,              // the predicament, in prose
 *     affordances: ['mechanism'],    // what the situation offers
 *     options: [{
 *       id, name, desc,
 *       requires: ['tinkering'],     // ALL required ([] = open to anyone)
 *       affordances: ['mechanism'],  // the situation must afford these
 *       when: (party, ctx) => bool,  // any extra non-capability gate
 *       weight: 1.5,                 // decision-weight nudge
 *     }],
 *     resolveOption(optionId, party, ctx) → result
 *   }
 */

import { roomFeatures } from '../world/RoomFeatures.js';

const REGISTRY = new Map();       // id → definition
const BY_ROOM_TYPE = new Map();   // roomType → definition

export function registerEncounter(def) {
  if (!def?.id || !Array.isArray(def.options)) {
    throw new Error('an encounter needs an id and options');
  }
  REGISTRY.set(def.id, def);
  if (def.roomType) BY_ROOM_TYPE.set(def.roomType, def);
  return def;
}

export function getEncounter(id) {
  return REGISTRY.get(id) || null;
}

export function allEncounters() {
  return [...REGISTRY.values()];
}

/** The definition governing a room: a stamped id wins, then the room type. */
export function getEncounterForRoom(room) {
  if (!room) return null;
  if (room.encounterId && REGISTRY.has(room.encounterId)) return REGISTRY.get(room.encounterId);
  return BY_ROOM_TYPE.get(room.type) || null;
}

/* ------------------------------------------------------------------ */
/* Affordances — what a situation offers to interact with              */
/* ------------------------------------------------------------------ */

/** What each room type inherently affords, before features and defs add more. */
export const ROOM_AFFORDANCES = {
  trap: ['mechanism', 'hazard'],
  monster: ['creature'],
  boss: ['creature'],
  treasure: ['valuables', 'container'],
  vault: ['valuables', 'container'],
  library: ['books', 'study'],
  shrine: ['sacred'],
  lab: ['apparatus', 'substances'],
  materials: ['substances'],
  disaster: ['hazard', 'unstable-environment'],
};

/**
 * Everything this situation affords: the room type's own, whatever the
 * room's features tag themselves with (RoomFeatures already speaks this
 * vocabulary — cover, mechanism, hazard, study, undead, loot...), the
 * definition's declared affordances, and what the monster implies.
 */
export function roomAffordances(room, def = null) {
  const set = new Set(ROOM_AFFORDANCES[room?.type] || []);
  for (const a of def?.affordances || []) set.add(a);
  // The furniture is part of the situation
  try {
    for (const feature of roomFeatures(room) || []) {
      for (const tag of feature.tags || []) set.add(tag);
    }
  } catch {
    // A bare room object (tests, town contexts) has no features; fine.
  }
  if (room?.monster) {
    if (room.monster.undead) set.add('undead');
    if (room.monster.bribable) set.add('people');
  }
  return set;
}

/* ------------------------------------------------------------------ */
/* Option evaluation — the intersection                                */
/* ------------------------------------------------------------------ */

/**
 * Evaluate a definition against a party and a context (a room, or a
 * town context). Returns available options in the same {id,name,desc}
 * shape RoomEncounters uses, so personality weighting, the Narrator,
 * and the UI all keep working — each carrying `unlockedBy` provenance
 * for the debug trace and the button label.
 */
export function evaluateOptions(def, party, ctx) {
  const partyCaps = party.capabilities();
  const afforded = roomAffordances(ctx, def);
  const available = [];
  const gatedOut = [];

  for (const opt of def.options) {
    const requires = opt.requires || [];
    const missingCaps = requires.filter(c => !partyCaps.has(c));
    const missingAffordances = (opt.affordances || []).filter(a => !afforded.has(a));
    const whenOk = opt.when ? !!opt.when(party, ctx) : true;

    if (missingCaps.length === 0 && missingAffordances.length === 0 && whenOk) {
      available.push({
        id: opt.id,
        name: opt.name,
        desc: opt.desc,
        weight: opt.weight,
        unlockedBy: requires.map(cap => ({
          capability: cap,
          holders: party.capabilityHolders(cap).map(h =>
            h.source === 'character' ? h.member.name : `${h.member.name} (${h.equipment?.name || h.source})`),
        })),
      });
    } else {
      gatedOut.push({
        id: opt.id, missingCaps, missingAffordances, conditionBlocked: !whenOk,
      });
    }
  }

  recordTrace({
    kind: 'evaluate',
    encounterId: def.id,
    roomType: ctx?.type || null,
    capabilitiesPresent: [...partyCaps],
    affordances: [...afforded],
    available: available.map(o => ({ id: o.id, unlockedBy: o.unlockedBy })),
    gatedOut,
  });

  return available;
}

/** Resolve an option through the definition's own resolver, tracing the choice. */
export function resolveEncounterOption(def, optionId, party, ctx) {
  const result = def.resolveOption(optionId, party, ctx);
  recordTrace({
    kind: 'resolve',
    encounterId: def.id,
    roomType: ctx?.type || null,
    optionId,
    success: result?.success !== false,
  });
  return result;
}

/* ------------------------------------------------------------------ */
/* Debug trace — which capabilities created which options              */
/* ------------------------------------------------------------------ */

const TRACE_LIMIT = 400;
let TRACE = [];

export function recordTrace(entry) {
  TRACE.push({ ...entry, at: TRACE.length });
  if (TRACE.length > TRACE_LIMIT) TRACE = TRACE.slice(-TRACE_LIMIT);
}

export function getEncounterTrace() {
  return TRACE.slice();
}

export function clearEncounterTrace() {
  TRACE = [];
}

/**
 * "How often did Tinkering create a meaningful opportunity this run,
 * and how often was it actually taken?" — the balancing question, as a
 * per-capability rollup of the trace.
 */
export function capabilityUsageSummary() {
  const summary = {};
  const bump = (cap, key) => {
    summary[cap] = summary[cap] || { optionsUnlocked: 0, chosen: 0 };
    summary[cap][key]++;
  };
  const unlockers = new Map();   // `${encounterId}:${optionId}` → caps
  for (const entry of TRACE) {
    if (entry.kind === 'evaluate') {
      for (const opt of entry.available) {
        const caps = opt.unlockedBy.map(u => u.capability);
        if (caps.length) unlockers.set(`${entry.encounterId}:${opt.id}`, caps);
        for (const cap of caps) bump(cap, 'optionsUnlocked');
      }
    } else if (entry.kind === 'resolve') {
      for (const cap of unlockers.get(`${entry.encounterId}:${entry.optionId}`) || []) {
        bump(cap, 'chosen');
      }
    }
  }
  return summary;
}
