/**
 * Tactics — a skill tree of learned technique, gated by capability
 *
 * The design constraint that shapes everything here: **a tactic is
 * gated by what a party can DO, not by what class it is.** Every class
 * swings at something, so anyone benefits from Flanking. Anything with
 * a working in the grimoire benefits from Concentration. A tactic that
 * read "fighters only" would be a worse card and a smaller decision —
 * it would collapse into the class it names, and the draft already has
 * class cards for that.
 *
 * So gates are predicates over the party's *capabilities*:
 *
 *   attack   — anyone alive (universal; the baseline branch)
 *   cast     — a working in the shared grimoire, whoever put it there
 *   room     — anyone; technique for using the furniture
 *   march    — anyone; technique for staying down here longer
 *
 * The second structural idea is the **tree**. A tier-2 tactic is a dead
 * card without its prerequisite, which makes tactics the first card type
 * where a pick's value depends on a pick you already made. That is a
 * real draft tension and a real skill test: the Prodigy should take the
 * root before the branch, and reading a tier-2 card early is exactly the
 * kind of trap a Novice falls for.
 *
 * Branches are deliberately stronger than roots. A root is a safe pick
 * that always works; a branch is a conditional one that is a blank
 * without its root, so it has to pay more or nobody would ever complete
 * a tree. Measured, the first cut had that backwards -- two unrelated
 * roots beat every complete branch (+9.4 win points against +1.8 to
 * +7.4), which meant the tree created no decision at all.
 *
 * Tactics deliberately reach the systems built around them — positional
 * pressure, room reactions, the supply clock and wounds — so that a
 * skill tree is how a player buys the ability to exploit the rest of the
 * game on purpose.
 */

/* Cards.js re-exports TACTIC_CARDS so the draft pool is one list, which
 * makes importing CARD_TYPES from here a cycle ("Cannot access
 * CARD_TYPES before initialization"). The type is written as a literal
 * instead, and tests/tactics.test.js asserts it still matches
 * CARD_TYPES.TACTIC so the two can never drift. Same treatment as the
 * room-type literals in world/RoomFeatures.js. */
const TACTIC_TYPE = 'tactic';

/** What a party can do, read off the party rather than off its classes. */
export const CAPABILITIES = {
  attack: party => party.living().length > 0,
  cast: party => party.grimoire.length > 0,
  room: () => true,
  march: () => true,
};

/**
 * The tree. `requires` names a prerequisite tactic id; a tactic whose
 * prerequisite is absent does nothing at all.
 *
 * Effects are declarative so the fight resolver reads one folded object
 * (see tacticModifiers) and the writing stays in one place.
 */
export const TACTICS = [
  /* ---- The Line: everyone swings at something ---- */
  {
    id: 'tac-flanking', name: 'Flanking', icon: '⚔️', branch: 'line', tier: 1,
    capability: 'attack',
    text: 'When the party has the numbers, it uses them: +1 damage a round while at least three still stand.',
    effect: { flankDamage: 1, flankMin: 3 },
  },
  {
    id: 'tac-encircle', name: 'Encirclement', icon: '🌀', branch: 'line', tier: 2,
    capability: 'attack', requires: 'tac-flanking',
    text: 'Flanking becomes a circle: +3 a round instead of +1, and the thing in the middle swings 2 weaker.',
    effect: { flankDamage: 2, monsterAtk: -2 },
  },
  {
    id: 'tac-shieldwall', name: 'Shield Wall', icon: '🛡️', branch: 'line', tier: 1,
    capability: 'attack',
    text: 'The party closes ranks: 1 less damage a round, whatever it is standing behind.',
    effect: { cover: 1 },
  },
  {
    id: 'tac-focusfire', name: 'Focused Fire', icon: '🎯', branch: 'line', tier: 2,
    capability: 'attack', requires: 'tac-shieldwall',
    text: 'Everyone hits the same thing in the same place: +1 damage a round, and +4 against anything armoured.',
    effect: { flankDamage: 1, vsArmored: 3 },
  },

  /* ---- The Working: anything with a grimoire ---- */
  {
    id: 'tac-concentration', name: 'Concentration', icon: '🧠', branch: 'working', tier: 1,
    capability: 'cast',
    text: 'A loosed working is held rather than let go: it keeps its full force each round instead of half.',
    effect: { sustainFull: true },
  },
  {
    id: 'tac-widening', name: 'Widening', icon: '💠', branch: 'working', tier: 2,
    capability: 'cast', requires: 'tac-concentration',
    text: 'The working is let out wide: every combat spell becomes an area working, and the room answers it.',
    effect: { allSpellsArea: true },
  },
  {
    id: 'tac-quickening', name: 'Quickening', icon: '⏱️', branch: 'working', tier: 1,
    capability: 'cast',
    text: 'One more working goes off before blades are drawn, in every room, not just at the throne.',
    effect: { extraCast: 1 },
  },
  {
    id: 'tac-wardweaving', name: 'Ward-Weaving', icon: '🕸️', branch: 'working', tier: 2,
    capability: 'cast', requires: 'tac-quickening',
    text: 'Every working leaves a ward behind it: 2 less damage a round for each spell loosed this fight.',
    effect: { wardPerCast: 2 },
  },

  /* ---- The Room: technique for the furniture ---- */
  {
    id: 'tac-improvised', name: 'Improvised Arms', icon: '🔧', branch: 'room', tier: 1,
    capability: 'room',
    text: 'The party fights with whatever the room left lying about: +5 to any opening made from the furniture.',
    effect: { featureOpener: 5 },
  },
  {
    id: 'tac-firewatch', name: 'Firewatch', icon: '🧯', branch: 'room', tier: 2,
    capability: 'room', requires: 'tac-improvised',
    text: 'A party that sets the room alight knows where the fire will go: it takes nothing back from its own reactions, holds 1 more of the room as cover, and reads a flame trap for 3 less damage.',
    // "No self-harm from reactions" alone was too narrow a trigger --
    // measured, the branch was actively worse than not taking it (56.9%
    // against 66.6% orphaned), which makes it a trap card rather than a
    // commitment. Reading flame traps is the same knowledge and fires
    // far more often.
    effect: { noSelfHarm: true, fireTrapSoak: 3, cover: 1 },
  },

  /* ---- The March: technique for staying down here ---- */
  {
    id: 'tac-rationing', name: 'Rationing', icon: '🕯️', branch: 'march', tier: 1,
    capability: 'march',
    text: 'The lamp is trimmed and the oil is measured: one more march of light before the dark.',
    // Measured at +2 this was worth +13.8 win points alone -- more than
    // four times any other tactic -- because the supply clock is the
    // dominant threat on hard and a card that answers it directly runs
    // away with the type. At +1 it sits with Shield Wall and Flanking.
    effect: { supply: 1 },
  },
  {
    id: 'tac-coldcamp', name: 'Cold Camp', icon: '🏕️', branch: 'march', tier: 2,
    capability: 'march', requires: 'tac-rationing',
    text: 'No fire, no smell of food, watches kept: a camp at the stairhead costs one supply instead of two, and nothing climbs the stair into it.',
    // The stairhead camp is the one place the party can choose to stop
    // (world/DungeonGen.js floors). Unwatched it costs 2 supply and is
    // interrupted about a third of the time for 4-7 damage; this makes
    // the stop cheap and safe. It fires once or twice a delve, which is
    // why it is a tier 2 sibling of Field Surgery rather than a tier 1.
    effect: { campSupply: 1, campWatched: true },
  },
  {
    id: 'tac-fieldsurgery', name: 'Field Surgery', icon: '✚', branch: 'march', tier: 2,
    capability: 'march', requires: 'tac-rationing',
    text: 'Somebody learned to set a break on the road: two wounds close at every shrine, not only in town.',
    // Stacking another point of supply on top of Rationing's put the
    // march branch at +15.2 win points -- it re-introduced exactly the
    // outlier that cutting Rationing to +1 was meant to remove.
    effect: { mendAtShrine: 2 },
  },
];

/** Card-shaped for the draft: tactics are drafted like anything else. */
export const TACTIC_CARDS = TACTICS.map(t => ({
  id: t.id,
  type: TACTIC_TYPE,
  name: t.name,
  icon: t.icon,
  branch: t.branch,
  tier: t.tier,
  capability: t.capability,
  requires: t.requires || null,
  text: t.text,
}));

export function getTactic(id) {
  return TACTICS.find(t => t.id === id) || null;
}

/** Every tactic that needs this one first. */
export function dependentsOf(id) {
  return TACTICS.filter(t => t.requires === id);
}

/**
 * Which of the party's drafted tactics are actually live.
 *
 * A tactic is live when the party has the capability it asks for *and*
 * holds its prerequisite. A tier-2 card drafted without its root is a
 * blank — deliberately, because that is the decision the tree exists to
 * create.
 */
export function activeTactics(party) {
  const held = new Set((party.tactics || []).map(t => t.id));
  return (party.tactics || []).filter(t => {
    const def = getTactic(t.id);
    if (!def) return false;
    const can = CAPABILITIES[def.capability];
    if (can && !can(party)) return false;
    if (def.requires && !held.has(def.requires)) return false;
    return true;
  });
}

/** The ones drafted but doing nothing, and why — for the writing. */
export function dormantTactics(party) {
  const held = new Set((party.tactics || []).map(t => t.id));
  const out = [];
  for (const t of party.tactics || []) {
    const def = getTactic(t.id);
    if (!def) continue;
    if (def.requires && !held.has(def.requires)) {
      out.push({ tactic: def, reason: 'requires', missing: getTactic(def.requires) });
    } else if (CAPABILITIES[def.capability] && !CAPABILITIES[def.capability](party)) {
      out.push({ tactic: def, reason: 'capability', capability: def.capability });
    }
  }
  return out;
}

/**
 * Fold every live tactic into one set of modifiers, so the fight
 * resolver reads a single object rather than interpreting a list.
 */
export function tacticModifiers(party) {
  const mods = {
    flankDamage: 0, flankMin: 99, cover: 0, monsterAtk: 0, vsArmored: 0,
    extraCast: 0, wardPerCast: 0, featureOpener: 0, supply: 0, mendAtShrine: 0,
    fireTrapSoak: 0, campSupply: 0,
    sustainFull: false, allSpellsArea: false, noSelfHarm: false, campWatched: false,
    live: [],
  };
  for (const t of activeTactics(party)) {
    const def = getTactic(t.id);
    const e = def.effect || {};
    mods.flankDamage += e.flankDamage || 0;
    if (e.flankMin) mods.flankMin = Math.min(mods.flankMin, e.flankMin);
    mods.cover += e.cover || 0;
    mods.monsterAtk += e.monsterAtk || 0;
    mods.vsArmored += e.vsArmored || 0;
    mods.extraCast += e.extraCast || 0;
    mods.wardPerCast += e.wardPerCast || 0;
    mods.featureOpener += e.featureOpener || 0;
    mods.supply += e.supply || 0;
    mods.mendAtShrine += e.mendAtShrine || 0;
    mods.fireTrapSoak += e.fireTrapSoak || 0;
    mods.campSupply += e.campSupply || 0;
    if (e.campWatched) mods.campWatched = true;
    if (e.sustainFull) mods.sustainFull = true;
    if (e.allSpellsArea) mods.allSpellsArea = true;
    if (e.noSelfHarm) mods.noSelfHarm = true;
    mods.live.push(def);
  }
  // Encirclement's flank bonus only counts once the party has the numbers
  if (mods.flankDamage > 0 && mods.flankMin === 99) mods.flankMin = 3;
  return mods;
}

/** The branches, for the UI and the card browser. */
export const BRANCHES = {
  line: { id: 'line', name: 'The Line', icon: '⚔️', text: 'Technique for anyone who swings at something — which is everyone.' },
  working: { id: 'working', name: 'The Working', icon: '🧠', text: 'Technique for anything with a working in the grimoire, whoever put it there.' },
  room: { id: 'room', name: 'The Room', icon: '🔧', text: 'Technique for turning the furniture into a weapon.' },
  march: { id: 'march', name: 'The March', icon: '🕯️', text: 'Technique for staying down here longer than the oil should allow.' },
};
