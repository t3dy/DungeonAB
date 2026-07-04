/**
 * Cards — The draftable card pool
 *
 * Four card types, MTG-draft style. Each pack holds a mix; each
 * pick is one card of ANY type. Your party is whatever you drafted:
 * heavy on characters = a big party; heavy on spells = a small,
 * scholarly one.
 */

export const CARD_TYPES = {
  CHARACTER: 'character',
  EQUIPMENT: 'equipment',
  SPELL: 'spell',
  PERSONALITY: 'personality',
};

export const CLASSES = {
  FIGHTER: 'fighter',
  CLERIC: 'cleric',
  WIZARD: 'wizard',
  ROGUE: 'rogue',
  ALCHEMIST: 'alchemist',
};

/* ------------------------------------------------------------------ */
/* Character cards — named adventurers, several per class              */
/* ------------------------------------------------------------------ */

export const CHARACTER_CARDS = [
  // Fighters — front line, high health, taunt
  { id: 'char-brand', type: CARD_TYPES.CHARACTER, class: CLASSES.FIGHTER, name: 'Brand of the Broken Shield', icon: '⚔️', stats: { health: 18, attack: 5, defense: 4, mind: 2 }, trait: 'Holds the door: takes hits meant for the back rank.' },
  { id: 'char-ursula', type: CARD_TYPES.CHARACTER, class: CLASSES.FIGHTER, name: 'Ursula Ironknee', icon: '⚔️', stats: { health: 20, attack: 4, defense: 5, mind: 2 }, trait: 'Unmovable. Refuses to fall while anyone stands behind her.' },
  { id: 'char-kestrel', type: CARD_TYPES.CHARACTER, class: CLASSES.FIGHTER, name: 'Kestrel Quickblade', icon: '⚔️', stats: { health: 15, attack: 6, defense: 3, mind: 3 }, trait: 'Strikes first in every fight.' },

  // Clerics — healing, undead turning
  { id: 'char-benedicta', type: CARD_TYPES.CHARACTER, class: CLASSES.CLERIC, name: 'Sister Benedicta', icon: '✨', stats: { health: 13, attack: 2, defense: 3, mind: 5 }, trait: 'Mends wounds between rooms; turns the restless dead.' },
  { id: 'char-oswald', type: CARD_TYPES.CHARACTER, class: CLASSES.CLERIC, name: 'Brother Oswald of the Lantern', icon: '✨', stats: { health: 14, attack: 3, defense: 3, mind: 4 }, trait: 'His lantern light steadies the whole party\'s nerve.' },

  // Wizards — spell power, fragile
  { id: 'char-melchior', type: CARD_TYPES.CHARACTER, class: CLASSES.WIZARD, name: 'Melchior the Moth-Eaten', icon: '🔮', stats: { health: 9, attack: 2, defense: 1, mind: 7 }, trait: 'Doubles the power of any spell the party casts.' },
  { id: 'char-sylvane', type: CARD_TYPES.CHARACTER, class: CLASSES.WIZARD, name: 'Sylvane of the Nine Candles', icon: '🔮', stats: { health: 10, attack: 3, defense: 2, mind: 6 }, trait: 'Reads sealed doors and cursed scripts aloud, safely. Usually.' },

  // Rogues — traps, locks, scouting, treasure
  { id: 'char-vex', type: CARD_TYPES.CHARACTER, class: CLASSES.ROGUE, name: 'Vex Threefingers', icon: '🗡️', stats: { health: 11, attack: 4, defense: 2, mind: 5 }, trait: 'Disarms traps and picks locks; finds the hidden coin.' },
  { id: 'char-mouse', type: CARD_TYPES.CHARACTER, class: CLASSES.ROGUE, name: 'The Mouse', icon: '🗡️', stats: { health: 10, attack: 5, defense: 2, mind: 4 }, trait: 'Scouts one room ahead. Nobody has ever seen The Mouse first.' },

  // Alchemists — potions, weapon mods, labs
  { id: 'char-paracelsus', type: CARD_TYPES.CHARACTER, class: CLASSES.ALCHEMIST, name: 'Paracelsus the Lesser', icon: '⚗️', stats: { health: 12, attack: 3, defense: 2, mind: 6 }, trait: 'Brews potions and mods weapons at any lab bench he finds.' },
  { id: 'char-perenelle', type: CARD_TYPES.CHARACTER, class: CLASSES.ALCHEMIST, name: 'Perenelle of the Green Lion', icon: '⚗️', stats: { health: 11, attack: 2, defense: 3, mind: 6 }, trait: 'Distills two potions from every lab instead of one.' },
];

/* ------------------------------------------------------------------ */
/* Equipment cards — assigned to best-fit party member                 */
/* ------------------------------------------------------------------ */

export const EQUIPMENT_CARDS = [
  { id: 'eq-tower-shield', type: CARD_TYPES.EQUIPMENT, name: 'Tower Shield', icon: '🛡️', slot: 'armor', bonus: { defense: 3 }, bestFor: CLASSES.FIGHTER, text: 'A wall with a handle.' },
  { id: 'eq-greatsword', type: CARD_TYPES.EQUIPMENT, name: 'Greatsword of the Vault', icon: '🗡️', slot: 'weapon', bonus: { attack: 3 }, bestFor: CLASSES.FIGHTER, text: 'Found in a vault. Wants to go back.' },
  { id: 'eq-blessed-mace', type: CARD_TYPES.EQUIPMENT, name: 'Blessed Mace', icon: '🔨', slot: 'weapon', bonus: { attack: 2, mind: 1 }, bestFor: CLASSES.CLERIC, text: 'Persuasion, sanctified.' },
  { id: 'eq-grimoire', type: CARD_TYPES.EQUIPMENT, name: 'Grimoire of Low Whispers', icon: '📖', slot: 'focus', bonus: { mind: 3 }, bestFor: CLASSES.WIZARD, text: 'The margins argue with the text.' },
  { id: 'eq-lockpicks', type: CARD_TYPES.EQUIPMENT, name: 'Masterwork Lockpicks', icon: '🗝️', slot: 'tool', bonus: { mind: 2 }, bestFor: CLASSES.ROGUE, text: 'Every door is a suggestion.' },
  { id: 'eq-alembic', type: CARD_TYPES.EQUIPMENT, name: 'Portable Alembic', icon: '⚗️', slot: 'tool', bonus: { mind: 2 }, bestFor: CLASSES.ALCHEMIST, text: 'A lab that fits in a satchel. Labs found in the dungeon work better.' },
  { id: 'eq-chainmail', type: CARD_TYPES.EQUIPMENT, name: 'Dwarven Chainmail', icon: '🥋', slot: 'armor', bonus: { defense: 2 }, bestFor: null, text: 'Fits anyone brave enough to wear it.' },
  { id: 'eq-boots', type: CARD_TYPES.EQUIPMENT, name: 'Boots of the Quiet Step', icon: '👢', slot: 'boots', bonus: { defense: 1, mind: 1 }, bestFor: CLASSES.ROGUE, text: 'The floorboards never learn your name.' },
  { id: 'eq-lantern', type: CARD_TYPES.EQUIPMENT, name: 'Everburning Lantern', icon: '🏮', slot: 'tool', bonus: { mind: 1, defense: 1 }, bestFor: CLASSES.CLERIC, text: 'Reveals hazards one room ahead.' },
  { id: 'eq-throwing-knives', type: CARD_TYPES.EQUIPMENT, name: 'Bandolier of Knives', icon: '🔪', slot: 'weapon', bonus: { attack: 2 }, bestFor: CLASSES.ROGUE, text: 'Six answers to most questions.' },
];

/* ------------------------------------------------------------------ */
/* Spell cards — party-wide magic; wizards amplify, anyone may hold    */
/* ------------------------------------------------------------------ */

export const SPELL_CARDS = [
  { id: 'sp-firebolt', type: CARD_TYPES.SPELL, name: 'Firebolt', icon: '🔥', school: 'evocation', power: 4, use: 'combat', text: 'Opens combat with 4 damage before blades are drawn.' },
  { id: 'sp-mend', type: CARD_TYPES.SPELL, name: 'Mending Word', icon: '💚', school: 'restoration', power: 5, use: 'heal', text: 'Restores 5 health to the most wounded companion.' },
  { id: 'sp-knock', type: CARD_TYPES.SPELL, name: 'Knock', icon: '🚪', school: 'transmutation', power: 3, use: 'utility', text: 'Opens any lock. Loudly.' },
  { id: 'sp-shield', type: CARD_TYPES.SPELL, name: 'Aegis of Ash', icon: '🛡️', school: 'abjuration', power: 3, use: 'combat', text: 'Blunts the first blow in each fight.' },
  { id: 'sp-light', type: CARD_TYPES.SPELL, name: 'Dancing Light', icon: '💡', school: 'evocation', power: 2, use: 'utility', text: 'Reveals traps and ambushes in the next room.' },
  { id: 'sp-fear', type: CARD_TYPES.SPELL, name: 'Cause Fear', icon: '😱', school: 'necromancy', power: 4, use: 'combat', text: 'Weak monsters flee before the fight begins.' },
];

/* ------------------------------------------------------------------ */
/* Personality cards — archetypes that bias the party's decisions      */
/* ------------------------------------------------------------------ */

export const PERSONALITY_CARDS = [
  { id: 'pers-brave', type: CARD_TYPES.PERSONALITY, name: 'The Bold', icon: '🦁', archetype: 'brave', text: 'Fights before fleeing; opens the ominous door.' },
  { id: 'pers-cunning', type: CARD_TYPES.PERSONALITY, name: 'The Cunning', icon: '🦊', archetype: 'cunning', text: 'Prefers the trap disarmed, the guard bribed, the fight skipped.' },
  { id: 'pers-greedy', type: CARD_TYPES.PERSONALITY, name: 'The Covetous', icon: '💰', archetype: 'greedy', text: 'Never leaves treasure behind. Never.' },
  { id: 'pers-scholarly', type: CARD_TYPES.PERSONALITY, name: 'The Scholarly', icon: '📚', archetype: 'scholarly', text: 'Reads everything; lingers in libraries; learns extra spells.' },
  { id: 'pers-pious', type: CARD_TYPES.PERSONALITY, name: 'The Devout', icon: '🕯️', archetype: 'pious', text: 'Rests at shrines; heals more; abhors desecration.' },
  { id: 'pers-reckless', type: CARD_TYPES.PERSONALITY, name: 'The Reckless', icon: '💥', archetype: 'reckless', text: 'Rushes in. Sometimes that works. Gloriously.' },
];

/**
 * The full card pool
 */
export function getAllCards() {
  return [
    ...CHARACTER_CARDS,
    ...EQUIPMENT_CARDS,
    ...SPELL_CARDS,
    ...PERSONALITY_CARDS,
  ];
}

/**
 * Look up any card by id
 */
export function getCard(id) {
  return getAllCards().find(c => c.id === id) || null;
}
