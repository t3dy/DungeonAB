/**
 * Personalities — what a party's temper does about the dark and the scars
 *
 * The archetypes have always biased *decisions*: the Bold fight, the
 * Craven slip past, the Covetous never leave treasure. But an asset
 * audit found all nine of them touching none of the systems added since
 * — they had opinions about monsters and none at all about walking in
 * the dark or carrying a wound to the throne, which are now the things
 * a delve is mostly made of.
 *
 * So each temper gets a **stance**: a small, legible modifier to the two
 * attrition clocks, and a line for the Chronicle when it fires. This is
 * where character belongs — the same march costs the Craven more than
 * the Bold, and both of them say why.
 *
 * Deliberately small numbers. A stance is a flavour of the same delve,
 * not a second tactics system.
 */

/**
 * Each stance's line is filed under the clock it moves — `text` for the
 * dark, `supplyText` for the quartermaster, `woundText` for scars — so
 * a line never surfaces under a beat it has nothing to do with.
 *
 * `dark`   — change to what a benighted march costs this party
 * `supply` — change to the oil the quartermaster packs
 * `wound`  — change to how readily a blow leaves a scar, as a share of
 *            the threshold (positive = harder to wound)
 */
export const STANCES = {
  brave: {
    dark: -1,
    text: 'The Bold walk the dark like a road they know. It costs them less than it should.',
    supplyText: null,
  },
  craven: {
    dark: 1, supply: 2,
    text: 'The Craven creep, and the dark takes its time with them.',
    supplyText: 'The Craven packed more oil than anyone thought necessary. Nobody is laughing now.',
  },
  greedy: {
    dark: 1,
    text: 'The Covetous will not leave a room unsearched, even blind. It costs them.',
    supplyText: null,
  },
  cunning: {
    supply: 2,
    text: null,
    supplyText: 'The Cunning trimmed the wick and measured the oil before anyone asked.',
  },
  pious: {
    wound: 0.35,
    text: null,
    woundText: 'The Devout tend what the dungeon opens: fewer blows leave a mark that stays.',
    supplyText: null,
  },
  reckless: {
    wound: -0.25,
    text: null,
    woundText: 'The Reckless do not stop to bind anything, and more of it stays with them.',
    supplyText: null,
  },
  scholarly: {
    supply: 1,
    text: null,
    supplyText: 'The Scholarly read the passage before walking it, and wasted no light doing it.',
  },
};

/** Every archetype that has a stance on the march. */
export const STANCED = Object.keys(STANCES);

/**
 * Fold a party's tempers into one set of modifiers. Multiple
 * personalities stack — a Bold, Craven party is exactly as conflicted as
 * it sounds, and the two cancel.
 */
export function personalityModifiers(party) {
  const mods = { dark: 0, supply: 0, wound: 0, notes: [], supplyNotes: [], woundNotes: [] };
  for (const archetype of party.personalities || []) {
    const stance = STANCES[archetype];
    if (!stance) continue;
    mods.dark += stance.dark || 0;
    mods.supply += stance.supply || 0;
    mods.wound += stance.wound || 0;
    // Each line goes to the clock it actually moves: a wound stance
    // printed under a dark toll reads as a non-sequitur
    if (stance.text) mods.notes.push({ archetype, text: stance.text });
    if (stance.supplyText) mods.supplyNotes.push({ archetype, text: stance.supplyText });
    if (stance.woundText) mods.woundNotes.push({ archetype, text: stance.woundText });
  }
  return mods;
}
