/**
 * Reactions — what a working does to the room it is loosed in
 *
 * A fireball in a room stacked with crates and barrels should not
 * politely strike only the monster. The room is made of things, those
 * things are made of stuff, and stuff answers to fire, frost, lightning
 * and light in ways a player can predict before they cast.
 *
 * That predictability is the point. Every reaction here is one a person
 * would guess: fire takes wood, lightning runs through standing water,
 * frost puts a brazier out and glazes a floor. Nothing needs a rules
 * lookup, and a drafted spell becomes a different card depending on
 * which room the party is standing in.
 *
 * Built entirely on assets that already exist: the thirteen features in
 * RoomFeatures.js, the four elements already carried by spell cards, and
 * the same Kenney tiles already on screen.
 *
 * Two design rules hold the system together:
 *
 *   1. **A reaction is a trade, not a bonus.** Burning the crates costs
 *      the cover they were giving. Dousing the brazier costs the light.
 *      Freezing the font makes the floor treacherous for everyone.
 *   2. **It reaches other systems.** A blaze is light, so it feeds the
 *      supply clock; dousing the only fire in a room takes light away.
 *      The room, the grimoire and the lantern are one economy.
 */

import { roomFeatures } from './RoomFeatures.js';

/* Feature names are written lowercase ("a brazier still burning") so they
 * read correctly mid-sentence. Any line that opens with one has to lift
 * the first letter itself. */
const up = s => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/**
 * What each feature is physically made of. Kept separate from `tags`,
 * which describe a feature's gameplay role — a font is 'water' matter
 * and its role is a shrine fixture, and those are different questions.
 */
export const MATTER = {
  pillars: 'stone',
  rubble: 'stone',
  boulder: 'stone',
  sarcophagus: 'stone',
  crates: 'wood',
  shelves: 'wood',
  brazier: 'flame',
  font: 'water',
  spout: 'water',
  portcullis: 'metal',
  anvil: 'metal',
  mirror: 'glass',
  pit: 'void',
};

/**
 * element × matter → what happens.
 *
 * Each entry may carry:
 *   damage      one-off damage to the monster
 *   burn        damage to the monster every round for the rest of the fight
 *   cover       change to the party's cover (negative destroys it)
 *   monsterAtk  change to what the monster hits for
 *   light       marches of light this puts into (or takes out of) the lamp
 *   selfHarm    damage the party takes for doing it
 *   consumes    the feature is gone afterwards
 *   text        what the player reads
 */
export const REACTIONS = {
  fire: {
    wood: {
      id: 'blaze', icon: '🔥',
      burn: 3, cover: -1, light: 2, consumes: true,
      text: f => `The fire takes ${f} and does not stop at the monster. The room burns: 3 damage a round while it lasts, the cover burns away with it, and 2 marches of light to burn by.`,
    },
    water: {
      id: 'steam', icon: '♨️',
      cover: 1, monsterAtk: -2, selfHarm: 1,
      text: f => `The working hits ${f} and the room fills with scalding steam. The monster is fighting half-blind: -2 to what it hits for, and the fog is cover — but nobody in a boiling room gets off clean, and the party takes 1.`,
    },
    flame: {
      id: 'flare', icon: '💥',
      damage: 6, light: 1, consumes: true,
      text: f => `${up(f)} takes the working like a bellows and erupts: 6 damage, and the flare throws a march of light down the passage. It burns its fuel doing it — the bracket is cold afterwards.`,
    },
    metal: {
      id: 'searing', icon: '🌡️',
      damage: 2,
      text: f => `${up(f)} glows and spits where the working lands: 2 damage to whatever is near it.`,
    },
    void: {
      id: 'updraft', icon: '🌋',
      damage: 3, cover: -1,
      text: f => `The fire finds ${f} and the shaft draws like a chimney: 3 damage in the updraft, and nothing to shelter behind while it roars.`,
    },
  },
  shock: {
    water: {
      id: 'conduction', icon: '⚡',
      damage: 7, selfHarm: 1,
      text: f => `The water in ${f} carries the working across the whole floor: 7 damage — and the party is standing on the same floor, for 1 back.`,
    },
    metal: {
      id: 'arc', icon: '⚡',
      damage: 4,
      text: f => `The working finds ${f} and arcs off it into everything nearby: 4 extra damage.`,
    },
    glass: {
      id: 'shiver', icon: '🪞',
      damage: 2, consumes: true,
      text: f => `${up(f)} shivers, flashes and comes apart: 2 damage in flying silver.`,
    },
    void: {
      id: 'earthing', icon: '🕳️',
      monsterAtk: -2, selfHarm: 1,
      text: f => `The working earths itself down ${f}, and the whole floor jumps: the monster fights off-balance for 2 less, and everyone who felt it takes 1.`,
    },
  },
  frost: {
    water: {
      id: 'glaze', icon: '🧊',
      monsterAtk: -3, selfHarm: 1,
      text: f => `${up(f)} freezes and the glaze spreads across the floor. The monster cannot keep its feet: -3 to what it hits for. Neither can the party, quite: 1 damage.`,
    },
    flame: {
      id: 'douse', icon: '💨',
      cover: 1, light: -2, consumes: true,
      text: f => `The working puts ${f} out. Smoke to fight behind, and 2 marches of light gone with it.`,
    },
    stone: {
      id: 'brittle', icon: '❄️',
      damage: 2,
      text: f => `Frost gets into ${f} and cracks it apart: 2 damage in splinters of cold stone.`,
    },
    void: {
      id: 'rime-bridge', icon: '🧊',
      cover: 2, selfHarm: 1,
      text: f => `Frost sheets across ${f} until it will bear weight — a bridge to fight from, and a bad place to slip: 2 cover, 1 damage.`,
    },
  },
  holy: {
    stone: {
      id: 'consecrate', icon: '🌟',
      damage: 3, undeadQuelled: true,
      text: f => `The light soaks into ${f}. Whatever was going to rise out of it stays put, and the working bites for 3.`,
    },
    glass: {
      id: 'kindled-glass', icon: '🪞',
      revealEthereal: true, damage: 2,
      text: f => `${up(f)} catches the light and throws it everywhere at once: 2 damage, and nothing in the room can hide behind being half-there.`,
    },
    water: {
      id: 'blessing', icon: '⛲',
      heal: 4,
      text: f => `The working settles into ${f} and stays there. The party drinks: 4 healed.`,
    },
  },
};

/** Is this working the kind that touches the whole room? */
export function isAreaWorking(spell) {
  return !!spell && (spell.aoe === true);
}

/**
 * Everything that answers `spell` in `room`.
 *
 * Only area workings reach the furniture — a bolt is a bolt, and a
 * player who wants the room to catch should have to draft for it.
 * Returns [] for a single-target working, an elementless one, or a bare
 * room, so callers never need to special-case.
 */
export function reactionsFor(spell, room) {
  if (!isAreaWorking(spell) || !spell.element) return [];
  const table = REACTIONS[spell.element];
  if (!table) return [];

  const out = [];
  for (const feature of roomFeatures(room)) {
    const matter = MATTER[feature.id];
    const reaction = table[matter];
    if (!reaction) continue;
    out.push({
      ...reaction,
      feature: feature.id,
      featureName: feature.name,
      matter,
      element: spell.element,
      text: reaction.text(feature.name),
    });
  }
  return out;
}

/**
 * Fold a list of reactions into one set of combat modifiers, so the
 * fight resolver has a single object to read rather than a list to
 * interpret.
 */
export function foldReactions(reactions) {
  const total = {
    damage: 0, burn: 0, cover: 0, monsterAtk: 0,
    light: 0, selfHarm: 0, heal: 0,
    undeadQuelled: false, revealEthereal: false,
    consumed: [], notes: [],
  };
  for (const r of reactions) {
    total.damage += r.damage || 0;
    total.burn += r.burn || 0;
    total.cover += r.cover || 0;
    total.monsterAtk += r.monsterAtk || 0;
    total.light += r.light || 0;
    total.selfHarm += r.selfHarm || 0;
    total.heal += r.heal || 0;
    if (r.undeadQuelled) total.undeadQuelled = true;
    if (r.revealEthereal) total.revealEthereal = true;
    if (r.consumes) total.consumed.push(r.feature);
    total.notes.push({ source: r.featureName, text: `${r.icon} ${r.text}` });
  }
  return total;
}

/** Every element that has any reaction written for it. */
export const REACTIVE_ELEMENTS = Object.keys(REACTIONS);

/** For tests and the card editor: does this pairing do anything? */
export function hasReaction(element, matter) {
  return !!REACTIONS[element]?.[matter];
}
