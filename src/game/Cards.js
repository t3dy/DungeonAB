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

  // Second wave — one more face per class, for wider tables
  { id: 'char-gunnhild', type: CARD_TYPES.CHARACTER, class: CLASSES.FIGHTER, name: 'Gunnhild Half-Door', icon: '⚔️', stats: { health: 17, attack: 5, defense: 5, mind: 1 }, trait: 'Got her name blocking one. Has never explained which half.' },
  { id: 'char-ash', type: CARD_TYPES.CHARACTER, class: CLASSES.CLERIC, name: 'Canoness Ash', icon: '✨', stats: { health: 12, attack: 3, defense: 2, mind: 6 }, trait: 'Buried three orders of her own sisters. The dead listen when she talks.' },
  { id: 'char-yarrow', type: CARD_TYPES.CHARACTER, class: CLASSES.WIZARD, name: 'Old Yarrow', icon: '🔮', stats: { health: 11, attack: 2, defense: 2, mind: 6 }, trait: 'Forgot more magic than most learn. Occasionally remembers it mid-fight.' },
  { id: 'char-silin', type: CARD_TYPES.CHARACTER, class: CLASSES.ROGUE, name: 'Silin the Debt', icon: '🗡️', stats: { health: 12, attack: 4, defense: 3, mind: 4 }, trait: 'Owes everyone. Pays in doors opened and knives thrown.' },
  { id: 'char-crucible', type: CARD_TYPES.CHARACTER, class: CLASSES.ALCHEMIST, name: 'Magister Crucible', icon: '⚗️', stats: { health: 13, attack: 3, defense: 3, mind: 5 }, trait: 'Expelled from three academies. Each explosion taught him something.' },
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
  { id: 'eq-warded-buckler', type: CARD_TYPES.EQUIPMENT, name: 'Warded Buckler', icon: '🛡️', slot: 'armor', bonus: { defense: 2, mind: 1 }, bestFor: CLASSES.CLERIC, text: 'The prayers are etched on the inside, where they matter.' },
  { id: 'eq-quicksilver-daggers', type: CARD_TYPES.EQUIPMENT, name: 'Quicksilver Daggers', icon: '🗡️', slot: 'weapon', bonus: { attack: 3 }, bestFor: CLASSES.ROGUE, text: 'They land before the argument starts.' },
  { id: 'eq-athanor-charm', type: CARD_TYPES.EQUIPMENT, name: 'Athanor Charm', icon: '🔥', slot: 'tool', bonus: { mind: 2 }, bestFor: CLASSES.ALCHEMIST, text: 'A furnace in miniature, always exactly warm enough.' },

  // Class-keyed items: the same item is a different miracle in
  // different hands. (Megabase: a wand gives a fighter a fireball;
  // a wizard gets meteors.)
  {
    id: 'eq-wand-embers', type: CARD_TYPES.EQUIPMENT, name: 'Wand of Embers', icon: '🪄',
    slot: 'focus', bonus: { mind: 1 }, bestFor: CLASSES.WIZARD,
    text: 'Warm to any hand. What comes out depends on whose.',
    classActions: {
      [CLASSES.FIGHTER]: { name: 'Ember Shot', opening: 4 },
      [CLASSES.WIZARD]: { name: 'Meteor Fall', opening: 8 },
      [CLASSES.CLERIC]: { name: 'Flame Ward', ward: 1 },
      [CLASSES.ROGUE]: { name: 'Smoke Veil', ward: 1 },
      [CLASSES.ALCHEMIST]: { name: 'Accelerant Charge', opening: 5 },
    },
  },
  {
    id: 'eq-holy-symbol', type: CARD_TYPES.EQUIPMENT, name: 'Holy Symbol of Dawn', icon: '☀️',
    slot: 'focus', bonus: { mind: 1 }, bestFor: CLASSES.CLERIC,
    text: 'Protection for most. Authority for some. A bad idea for one.',
    classActions: {
      [CLASSES.FIGHTER]: { name: 'Shield of Faith', ward: 1 },
      [CLASSES.ROGUE]: { name: 'Veil of Shadows', ward: 1 },
      [CLASSES.CLERIC]: { name: 'Radiant Smite', opening: 3, vsUndead: 6 },
      [CLASSES.WIZARD]: { name: 'Animate Corpse', summonAttack: 3 },
      [CLASSES.ALCHEMIST]: { name: 'Blessed Reagents', opening: 2 },
    },
  },

  // Trap cards: cursed gear with hidden upsides. They look like
  // mistakes in the pack and play like gambles at the table.
  {
    id: 'eq-cursed-blade', type: CARD_TYPES.EQUIPMENT, name: 'Blade of the Adder', icon: '🐍',
    slot: 'weapon', bonus: { attack: 4, defense: -2 }, bestFor: CLASSES.FIGHTER, cursed: true,
    text: 'It whispers where to cut. It is usually right. It never says about what.',
  },
  {
    id: 'eq-haunted-armor', type: CARD_TYPES.EQUIPMENT, name: 'Haunted Armor', icon: '👻',
    slot: 'armor', bonus: { defense: 3, mind: -1 }, bestFor: CLASSES.FIGHTER, cursed: true,
    text: 'A chill down the spine — but the resident ghost hates monsters more than it hates you.',
    classActions: {
      [CLASSES.FIGHTER]: { name: 'The Ghost Objects', summonAttack: 1 },
      [CLASSES.CLERIC]: { name: 'The Ghost Objects', summonAttack: 1 },
      [CLASSES.WIZARD]: { name: 'The Ghost Objects', summonAttack: 1 },
      [CLASSES.ROGUE]: { name: 'The Ghost Objects', summonAttack: 1 },
      [CLASSES.ALCHEMIST]: { name: 'The Ghost Objects', summonAttack: 1 },
    },
  },
];

/* ------------------------------------------------------------------ */
/* Spell cards — party-wide magic; wizards amplify, anyone may hold    */
/* ------------------------------------------------------------------ */

export const SPELL_CARDS = [
  { id: 'sp-firebolt', type: CARD_TYPES.SPELL, name: 'Firebolt', icon: '🔥', school: 'evocation', element: 'fire', power: 4, use: 'combat', text: 'Opens combat with 4 damage before blades are drawn.' },
  { id: 'sp-mend', type: CARD_TYPES.SPELL, name: 'Mending Word', icon: '💚', school: 'restoration', power: 5, use: 'heal', text: 'Restores 5 health to the most wounded companion.' },
  { id: 'sp-knock', type: CARD_TYPES.SPELL, name: 'Knock', icon: '🚪', school: 'transmutation', power: 3, use: 'utility', text: 'Opens any lock. Loudly.' },
  { id: 'sp-shield', type: CARD_TYPES.SPELL, name: 'Aegis of Ash', icon: '🛡️', school: 'abjuration', power: 3, use: 'combat', text: 'Blunts the first blow in each fight.' },
  { id: 'sp-light', type: CARD_TYPES.SPELL, name: 'Dancing Light', icon: '💡', school: 'evocation', power: 2, use: 'utility', text: 'Reveals traps and ambushes in the next room.' },
  { id: 'sp-fear', type: CARD_TYPES.SPELL, name: 'Cause Fear', icon: '😱', school: 'necromancy', power: 4, use: 'combat', text: 'Weak monsters flee before the fight begins.' },
  { id: 'sp-chain', type: CARD_TYPES.SPELL, name: 'Chain Lightning', icon: '⚡', school: 'evocation', element: 'shock', power: 5, use: 'combat', text: 'Arcs from foe to foe until it runs out of foes or enthusiasm.' },
  { id: 'sp-frost', type: CARD_TYPES.SPELL, name: 'Frost Lance', icon: '❄️', school: 'evocation', element: 'frost', power: 5, use: 'combat', text: 'Cold, precise, and deeply personal.' },
  { id: 'sp-sunder', type: CARD_TYPES.SPELL, name: 'Sunder', icon: '💢', school: 'transmutation', power: 4, use: 'combat', text: 'Armor remembers being ore. This spell reminds it.' },
  { id: 'sp-radiance', type: CARD_TYPES.SPELL, name: 'Radiant Lance', icon: '🌟', school: 'theurgy', element: 'holy', power: 4, use: 'combat', text: 'A line of noon driven through whatever the dark is wearing.' },
  { id: 'sp-balm', type: CARD_TYPES.SPELL, name: 'Balm of Hours', icon: '🌾', school: 'restoration', power: 6, use: 'heal', text: 'Borrows healing from a quieter week and spends it now.' },
  { id: 'sp-eyes', type: CARD_TYPES.SPELL, name: 'Eyes of the Mouse', icon: '👁️', school: 'divination', power: 2, use: 'utility', text: 'See what the small and cautious see. It is a lot.' },
  { id: 'sp-feather', type: CARD_TYPES.SPELL, name: 'Feather Step', icon: '🪶', school: 'transmutation', power: 3, use: 'utility', text: 'The floor agrees to pretend nobody is on it.' },
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
  // Trap personality (Megabase): looks like a liability, spots what
  // the brave walk into. Cowards notice tripwires.
  { id: 'pers-craven', type: CARD_TYPES.PERSONALITY, name: 'The Craven', icon: '🐔', archetype: 'craven', trap: true, text: 'Avoids every fight it can. Notices every exit — and every tripwire.' },
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
