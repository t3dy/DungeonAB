/**
 * RoomFeatures — what's actually *in* a room
 *
 * A room used to be one type and one decision. Now a chamber can hold
 * several features: pillars to fight behind, a brazier to shove things
 * into, a pit in the floor, a sarcophagus nobody should open. Features
 * do three jobs:
 *
 *   1. **Passive modifiers** — cover blunts incoming damage, a mirror
 *      robs the ethereal of their advantage, an open sarcophagus is a
 *      risk you carry into the fight.
 *   2. **Interactions** — extra options in the room, each gated by a
 *      class or a drafted card. A pit is scenery until someone brings
 *      a grappling line, or a fighter strong enough to shove.
 *   3. **Writing** — every feature is named in the predicament and
 *      reported plainly when used (house style: actor, action, number).
 *
 * Every feature is drawn with art already in the Tiny Dungeon sheet
 * (see SpriteAtlas.FEATURE_TILES) — no new assets required.
 *
 * The gates are the point: this table is where drafted cards stop
 * being stat sticks and start being keys to the architecture.
 */

import { CLASSES } from '../game/Cards.js';

/*
 * Room types are written as literals here rather than imported from
 * DungeonGen: the generator imports this module to furnish its rooms,
 * so importing back would be a cycle. `tests/features.test.js` asserts
 * every literal below is a real ROOM_TYPES value, which keeps the
 * shortcut honest.
 */

/**
 * The catalog. `rooms` lists the room types a feature can furnish;
 * `weight` biases the roll; `tags` are for writing and future terrain.
 */
export const FEATURES = {
  pillars: {
    id: 'pillars', name: 'a row of squat pillars', icon: '🏛️',
    tile: { col: 6, row: 0 },
    rooms: ['monster', 'boss', 'corridor', 'library', 'shrine'],
    weight: 3, tags: ['cover'],
    cover: 1,
    tell: 'Pillars break the room into aisles — something to fight behind.',
  },
  rubble: {
    id: 'rubble', name: 'a fall of rubble', icon: '🪨',
    tile: { col: 0, row: 1 },
    rooms: ['monster', 'corridor', 'disaster', 'trap', 'materials'],
    weight: 3, tags: ['cover', 'materials'],
    cover: 1,
    tell: 'Half the ceiling is on the floor, in pieces worth stepping around.',
  },
  crates: {
    id: 'crates', name: 'stacked crates and barrels', icon: '📦',
    tile: { col: 1, row: 6 },
    rooms: ['treasure', 'materials', 'corridor', 'monster', 'lab'],
    weight: 2.5, tags: ['cover', 'loot'],
    cover: 1,
    tell: 'Somebody stacked supplies here and never came back for them.',
  },
  brazier: {
    id: 'brazier', name: 'a brazier still burning', icon: '🔥',
    tile: { col: 5, row: 2 },
    rooms: ['monster', 'boss', 'shrine', 'library', 'lab'],
    weight: 2.5, tags: ['fire', 'light'],
    tell: 'A brazier burns in its bracket — nobody has been here to feed it, and it burns anyway.',
  },
  pit: {
    id: 'pit', name: 'an open pit', icon: '🕳️',
    tile: { col: 9, row: 0 },
    rooms: ['monster', 'boss', 'trap', 'corridor', 'disaster'],
    weight: 2, tags: ['hazard'],
    tell: 'A pit takes up a third of the floor. The bottom is not visible.',
  },
  boulder: {
    id: 'boulder', name: 'a boulder on a bad slope', icon: '⚪',
    tile: { col: 6, row: 8 },
    rooms: ['monster', 'corridor', 'disaster', 'materials'],
    weight: 1.5, tags: ['hazard'],
    tell: 'A boulder sits at the top of a slope, held by a wedge of rotten timber.',
  },
  sarcophagus: {
    id: 'sarcophagus', name: 'a stone sarcophagus', icon: '⚰️',
    tile: { col: 6, row: 4 },
    rooms: ['monster', 'shrine', 'treasure', 'vault', 'boss'],
    weight: 2, tags: ['undead', 'loot'],
    undeadRisk: true,
    tell: 'A sarcophagus stands against the wall with its lid slightly wrong.',
  },
  font: {
    id: 'font', name: 'a stone font of still water', icon: '⛲',
    tile: { col: 8, row: 2 },
    rooms: ['shrine', 'monster', 'corridor', 'library'],
    weight: 2, tags: ['water'],
    douse: true,
    tell: 'A font holds water that has been still a long time and is somehow clean.',
  },
  spout: {
    id: 'spout', name: 'a gargoyle spout, dripping', icon: '🗿',
    tile: { col: 8, row: 1 },
    rooms: ['lab', 'materials', 'corridor', 'monster'],
    weight: 1.8, tags: ['alchemy'],
    tell: 'A gargoyle spout drips something that is not water into a stained channel.',
  },
  portcullis: {
    id: 'portcullis', name: 'a raised portcullis', icon: '🚧',
    tile: { col: 5, row: 3 },
    rooms: ['monster', 'boss', 'corridor', 'vault'],
    weight: 1.8, tags: ['mechanism'],
    tell: 'A portcullis hangs raised above the passage, on a chain that still turns.',
  },
  anvil: {
    id: 'anvil', name: 'a cold anvil', icon: '🔨',
    tile: { col: 2, row: 6 },
    rooms: ['lab', 'materials', 'corridor', 'monster'],
    weight: 1.5, tags: ['forge'],
    tell: 'An anvil sits under a dead forge, still true.',
  },
  shelves: {
    id: 'shelves', name: 'sagging shelves', icon: '📚',
    tile: { col: 3, row: 6 },
    rooms: ['library', 'lab', 'vault', 'monster'],
    weight: 2, tags: ['study', 'flammable'],
    tell: 'Shelves sag under books nobody has audited in a century.',
  },
  mirror: {
    id: 'mirror', name: 'a tall silvered mirror', icon: '🪞',
    tile: { col: 5, row: 8 },
    rooms: ['monster', 'boss', 'treasure', 'shrine'],
    weight: 1.2, tags: ['reveal'],
    revealEthereal: true,
    tell: 'A silvered mirror leans against the wall, and it shows the room more honestly than the room does.',
  },
};

/**
 * Interactions: the extra options a feature offers, and what unlocks
 * them. A gate is any of `cls` (a living class), `item` (a drafted
 * equipment id), or `spell` (a grimoire id) — any one is enough to get
 * the option at all.
 *
 * **Tools upgrade, they don't merely unlock.** A fighter can shove a
 * monster into a pit with their hands; a party with the Grapple and
 * Line does it better and without leaning over the edge. So most
 * actions carry a `tool` block: the stronger numbers that apply when
 * an item or spell opened the option rather than a bare class.
 *
 * This exists because the first cut gated purely on presence, and a
 * controlled A/B showed the tools were redundant — a party holding
 * four classes already opened eleven of thirteen interactions, so the
 * cards were worth only their stat lines. Measure, then design.
 *
 * `openerDamage` interactions happen in a fight: use the room against
 * the monster, then swing. Everything else is a standalone action.
 */
export const FEATURE_ACTIONS = {
  'shove-into-pit': {
    feature: 'pit', name: 'Shove It In', desc: 'Put the pit between you and it',
    gates: [{ cls: CLASSES.FIGHTER }, { item: 'eq-grapple' }],
    fightOnly: true, openerDamage: 5,
    // Roped and braced, you can put your weight into it and not follow
    tool: { openerDamage: 12 },
    weights: { reckless: 3, brave: 2, cunning: 2 },
  },
  'topple-boulder': {
    feature: 'boulder', name: 'Topple the Boulder', desc: 'Gravity does the first round',
    gates: [{ cls: CLASSES.FIGHTER }, { spell: 'sp-shatter' }],
    fightOnly: true, openerDamage: 5,
    // Shatter drops the whole slope, not one stone
    tool: { openerDamage: 13 },
    weights: { reckless: 3, brave: 1.5 },
  },
  'shove-into-brazier': {
    feature: 'brazier', name: 'Shove It Into the Fire', desc: 'The brazier is right there',
    gates: [{ cls: CLASSES.FIGHTER }, { item: 'eq-tinderbox' }, { spell: 'sp-kindle' }],
    fightOnly: true, openerDamage: 4, element: 'fire',
    // With an accelerant the brazier stops being a brazier
    tool: { openerDamage: 11 },
    weights: { reckless: 2.5, cunning: 1 },
  },
  'drop-portcullis': {
    feature: 'portcullis', name: 'Drop the Portcullis', desc: 'Cut the room in half on top of it',
    gates: [{ cls: CLASSES.ROGUE }, { item: 'eq-winch-hook' }],
    fightOnly: true, openerDamage: 6,
    // The hook releases the whole chain at once, from cover
    tool: { openerDamage: 14 },
    weights: { cunning: 3, craven: 2, scholarly: 1 },
  },
  'fight-from-cover': {
    feature: 'pillars', name: 'Fight From the Pillars', desc: 'Make it come to you, one aisle at a time',
    gates: [{ cls: CLASSES.ROGUE }, { cls: CLASSES.FIGHTER }, { item: 'eq-tower-shield' }],
    fightOnly: true, openerDamage: 3, extraCover: 1,
    // A shield wall across an aisle is a different proposition
    tool: { openerDamage: 4, extraCover: 3 },
    weights: { cunning: 2, craven: 2.5, brave: -1 },
  },
  'pry-sarcophagus': {
    feature: 'sarcophagus', name: 'Pry the Lid', desc: 'Grave goods, and whatever else',
    gates: [{ item: 'eq-prybar' }, { cls: CLASSES.ROGUE }],
    gold: 20, wakesDead: true,
    // Proper leverage opens it cleanly: more of the goods, and the lid
    // comes off in one piece instead of three noisy ones
    tool: { gold: 55, quiet: true },
    weights: { greedy: 3.5, reckless: 2, pious: -3 },
  },
  'bless-the-font': {
    feature: 'font', name: 'Bless the Font', desc: 'Clean water, said over',
    gates: [{ cls: CLASSES.CLERIC }, { spell: 'sp-purify' }],
    heal: 5,
    tool: { heal: 12 },
    weights: { pious: 3.5, scholarly: 1 },
  },
  'fill-waterskins': {
    feature: 'font', name: 'Fill the Waterskins', desc: 'Cold water, and a wash for the wounds',
    gates: [{ item: 'eq-waterskin' }],
    heal: 3, curesLinger: true,
    weights: { cunning: 2, craven: 1.5 },
  },
  'harvest-spout': {
    feature: 'spout', name: 'Harvest the Drip', desc: 'Whatever that is, it is a reagent',
    gates: [{ cls: CLASSES.ALCHEMIST }, { item: 'eq-waterskin' }],
    materials: 1,
    // Something to put it in changes how much you can take
    tool: { materials: 3 },
    weights: { greedy: 2, scholarly: 2 },
  },
  'sift-rubble': {
    feature: 'rubble', name: 'Sift the Rubble', desc: 'Salts and oddments in the broken stone',
    gates: [{ cls: CLASSES.ALCHEMIST }, { item: 'eq-prybar' }],
    materials: 1, gold: 5,
    // Levering the slabs up reaches what is under them
    tool: { materials: 2, gold: 25 },
    weights: { greedy: 2.5, scholarly: 1 },
  },
  'crack-crates': {
    feature: 'crates', name: 'Crack the Crates', desc: 'Somebody else\'s supplies',
    gates: [{ item: 'eq-prybar' }, { cls: CLASSES.ROGUE }],
    gold: 12, materials: 1,
    // A prybar opens every crate in the stack, not just the loose one
    tool: { gold: 40, materials: 2 },
    weights: { greedy: 3.5, reckless: 1 },
  },
  'work-the-anvil': {
    feature: 'anvil', name: 'Work the Anvil', desc: 'Put an edge back on something',
    // Tool-only: an anvil without hammer, file and flux is a heavy table
    gates: [{ item: 'eq-smiths-kit' }],
    weaponMod: { name: 'anvil-set edge', attack: 3 },
    weights: { brave: 2, cunning: 1.5, scholarly: 1 },
  },
  'strip-the-shelves': {
    feature: 'shelves', name: 'Strip the Shelves', desc: 'A working, if the damp left one',
    gates: [{ cls: CLASSES.WIZARD }, { item: 'eq-grimoire' }],
    spell: { name: 'Shelf-Found Working', icon: '📜', school: 'found', power: 3, use: 'combat' },
    // A grimoire to copy into means taking the good pages, not one page
    tool: { spell: { name: 'Shelf-Found Working', icon: '📜', school: 'found', power: 5, use: 'combat' }, extraSpell: true },
    weights: { scholarly: 3.5, greedy: 1 },
  },
};

/* ------------------------------------------------------------------ */
/* Generation                                                          */
/* ------------------------------------------------------------------ */

/** How many features a room of this size can hold without clutter. */
export function featureCapacity(room) {
  const area = (room.w || 4) * (room.h || 4);
  if (area < 18) return 0;          // a cell is furniture enough
  if (area < 32) return 1;
  if (area < 56) return 2;
  return 3;
}

/**
 * Furnish a room. Deterministic given the rng; respects the room's
 * type and floor space. Returns an array of feature ids.
 */
export function rollFeatures(room, rng, theme = null) {
  const capacity = featureCapacity(room);
  if (capacity === 0) return [];

  const eligible = Object.values(FEATURES)
    .filter(f => f.rooms.includes(room.type));
  if (eligible.length === 0) return [];

  const chosen = [];
  for (let i = 0; i < capacity; i++) {
    // Each slot has a real chance of staying empty — a bare room is a
    // legitimate room, and clutter everywhere reads as noise
    if (rng.next() < 0.32) continue;
    const pool = eligible.filter(f => !chosen.includes(f.id));
    if (pool.length === 0) break;
    const total = pool.reduce((s, f) => s + f.weight, 0);
    let roll = rng.next() * total;
    for (const f of pool) {
      roll -= f.weight;
      if (roll <= 0) { chosen.push(f.id); break; }
    }
  }
  return chosen;
}

/** Look up a feature (unknown ids are ignored rather than fatal). */
export function getFeature(id) {
  return FEATURES[id] || null;
}

/** A room's features, resolved and filtered to the known ones. */
export function roomFeatures(room) {
  return (room?.features || []).map(getFeature).filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* Passive modifiers — what the room does without being asked          */
/* ------------------------------------------------------------------ */

/**
 * Everything the furniture changes about a fight, in one inspectable
 * place (the same discipline as getPreparationBonuses): each effect
 * carries the note that explains it, so the mechanics and the writing
 * can't drift apart.
 */
export function featureModifiers(room) {
  const mods = { cover: 0, douse: false, revealEthereal: false, undeadRisk: false, notes: [] };
  for (const f of roomFeatures(room)) {
    if (f.cover) {
      mods.cover += f.cover;
      mods.notes.push({ feature: f.id, text: `🧱 The party fights from behind ${f.name}: ${f.cover} less damage per round.` });
    }
    if (f.douse) mods.douse = true;
    if (f.revealEthereal) {
      mods.revealEthereal = true;
      mods.notes.push({ feature: f.id, text: `🪞 ${capitalize(f.name)} shows the ethereal where it truly stands: weapons do full damage.` });
    }
    if (f.undeadRisk) mods.undeadRisk = true;
  }
  // Cover has a ceiling: past two pieces of furniture you're just hiding
  mods.cover = Math.min(mods.cover, 2);
  return mods;
}

/* ------------------------------------------------------------------ */
/* Interactions — which options this room's furniture offers           */
/* ------------------------------------------------------------------ */

/** Does the party hold what this gate wants? */
function gateOpen(gate, party, has) {
  if (gate.cls) return party.hasClass(gate.cls);
  if (gate.item) return has.item(gate.item);
  if (gate.spell) return has.spell(gate.spell);
  return false;
}

/**
 * The feature-driven options available in this room. `has` supplies
 * the item/spell lookups (RoomEncounters passes its own, so this
 * module needs no knowledge of how a party stores its kit).
 * Returns [{ id, name, desc, feature, key }].
 */
export function featureActions(room, party, has) {
  const present = new Set(room?.features || []);
  const isFight = room?.type === 'monster' || room?.type === 'boss';
  const out = [];
  for (const [key, action] of Object.entries(FEATURE_ACTIONS)) {
    if (!present.has(action.feature)) continue;
    if (action.fightOnly && !isFight) continue;
    if (!action.gates.some(g => gateOpen(g, party, has))) continue;
    // Which gate opened it — the writing credits the card or the class
    const opener = action.gates.find(g => gateOpen(g, party, has));
    out.push({
      id: key, name: action.name, desc: action.desc,
      feature: action.feature,
      opener: opener.item || opener.spell || opener.cls,
    });
  }
  return out;
}

/**
 * Which tier is this party working at? A drafted item or spell gets the
 * `tool` numbers; a bare class gets the modest ones. Returns the action
 * merged with its tool block when a tool opened it, so callers read one
 * flat object.
 */
export function actionTier(optionId, party, has) {
  const action = FEATURE_ACTIONS[optionId];
  if (!action) return null;
  const byTool = action.gates.some(g => (g.item || g.spell) && gateOpen(g, party, has));
  if (byTool && action.tool) {
    return { ...action, ...action.tool, tier: 'tool' };
  }
  return { ...action, tier: byTool ? 'tool' : 'class' };
}

/** Personality weights for a feature action (used by decideRoomAction). */
export function featureActionWeights(optionId) {
  return FEATURE_ACTIONS[optionId]?.weights || null;
}

export function isFeatureAction(optionId) {
  return Object.prototype.hasOwnProperty.call(FEATURE_ACTIONS, optionId);
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/** For tests and the writing: the vocabulary. */
export const FEATURE_IDS = Object.keys(FEATURES);
export const FEATURE_ACTION_IDS = Object.keys(FEATURE_ACTIONS);
