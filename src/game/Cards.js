/**
 * Cards — The draftable card pool
 *
 * Four card types, MTG-draft style. Each pack holds a mix; each
 * pick is one card of ANY type. Your party is whatever you drafted:
 * heavy on characters = a big party; heavy on spells = a small,
 * scholarly one.
 */

/* Tactic cards are defined in Tactics.js, beside the tree that gives
 * them meaning, and re-exported here so the draft pool stays one list.
 * Tactics.js deliberately does NOT import back from this file -- see the
 * note on TACTIC_TYPE there. */
import { TACTIC_CARDS } from './Tactics.js';
export { TACTIC_CARDS };

export const CARD_TYPES = {
  CHARACTER: 'character',
  EQUIPMENT: 'equipment',
  SPELL: 'spell',
  PERSONALITY: 'personality',
  // Learned technique, gated by what a party can do rather than by
  // class, and arranged in a small skill tree (game/Tactics.js)
  TACTIC: 'tactic',
};

export const CLASSES = {
  FIGHTER: 'fighter',
  CLERIC: 'cleric',
  WIZARD: 'wizard',
  ROGUE: 'rogue',
  ALCHEMIST: 'alchemist',
};

/* ------------------------------------------------------------------ */
/* Character cards — the Renaissance magi                              */
/*                                                                      */
/* Each magus is a CAPABILITY PACKAGE, not a bespoke power. Roughly     */
/* four tags apiece, chosen for what the historical figure was actually */
/* known for, and every one of them reusable: Dee is the party's        */
/* diviner because he carries `divination`, not because anything checks */
/* for `char-dee`. Draft the same tag on someone else and the same      */
/* options open. `discipline` is flavor — the tradition they work in.   */
/* ------------------------------------------------------------------ */

export const DISCIPLINES = {
  SIGIL: 'sigil', ESCAPE: 'escape', HARMONY: 'harmony', CONJURATION: 'conjuration',
  ASTROLOGY: 'astrology', MEMORY: 'memory', CORRESPONDENCE: 'correspondence',
  ACQUISITION: 'acquisition', CIPHER: 'cipher', TRANSMUTATION: 'transmutation',
  EMBLEM: 'emblem', NUMEROLOGY: 'numerology', NATURAL: 'natural',
};

/* Every character is costed alike at 30 points (health + 2×attack +
 * 2×defense + mind, balance.test.js). A magus is distinguished by the
 * capabilities they bring and where their 30 points sit, never by
 * being worth more than the magus beside them. */
export const CHARACTER_CARDS = [
  // Fighters — front line, high health
  { id: 'char-agrippa', type: CARD_TYPES.CHARACTER, class: CLASSES.FIGHTER, discipline: DISCIPLINES.SIGIL, name: 'Cornelius Agrippa', icon: '⚔️', stats: { health: 14, attack: 4, defense: 3, mind: 2 }, trait: 'A soldier\'s occult philosophy: everything answers to something else, and he will argue the point with anyone who says otherwise.', capabilities: ['correspondence', 'debate', 'telepathy'] },
  { id: 'char-sendivogius', type: CARD_TYPES.CHARACTER, class: CLASSES.FIGHTER, discipline: DISCIPLINES.ESCAPE, name: 'Michael Sendivogius', icon: '⚔️', stats: { health: 13, attack: 4, defense: 4, mind: 1 }, trait: 'Has talked and cut his way out of worse than this dungeon. Twice out of the same castle.', capabilities: ['tactics', 'diplomacy', 'rogue', 'fencing'] },
  { id: 'char-brahe', type: CARD_TYPES.CHARACTER, class: CLASSES.FIGHTER, discipline: DISCIPLINES.ASTROLOGY, name: 'Tycho Brahe', icon: '⚔️', stats: { health: 13, attack: 5, defense: 2, mind: 3 }, trait: 'As quick to duel over a star-chart as to draw one. The false nose has never slowed his sword arm.', capabilities: ['astronomy', 'observation', 'navigation', 'tinkering'] },
  { id: 'char-napier', type: CARD_TYPES.CHARACTER, class: CLASSES.FIGHTER, discipline: DISCIPLINES.NUMEROLOGY, name: 'John Napier', icon: '⚔️', stats: { health: 15, attack: 3, defense: 3, mind: 3 }, trait: 'The Laird of Merchiston defends his own estate. The neighbours whisper of a black familiar; he keeps better numbers.', capabilities: ['tactics', 'mathematics', 'tinkering'] },

  // Clerics — healing, undead turning
  { id: 'char-ficino', type: CARD_TYPES.CHARACTER, class: CLASSES.CLERIC, discipline: DISCIPLINES.HARMONY, name: 'Marsilio Ficino', icon: '✨', stats: { health: 14, attack: 2, defense: 3, mind: 6 }, trait: 'Sings the wounded steady with astral harmony; a shrine under his hand mends deeper.', capabilities: ['music', 'harmony', 'healing'] },
  { id: 'char-dee', type: CARD_TYPES.CHARACTER, class: CLASSES.CLERIC, discipline: DISCIPLINES.CONJURATION, name: 'John Dee', icon: '✨', stats: { health: 13, attack: 2, defense: 3, mind: 7 }, trait: 'Would rather question the restless dead than destroy them — and they usually answer.', capabilities: ['conjuring', 'mathematics', 'divination', 'navigation'] },
  { id: 'char-forman', type: CARD_TYPES.CHARACTER, class: CLASSES.CLERIC, discipline: DISCIPLINES.ASTROLOGY, name: 'Simon Forman', icon: '✨', stats: { health: 14, attack: 3, defense: 2, mind: 6 }, trait: 'Reads a wound by the stars it was struck under. His remedies run stronger for it.', capabilities: ['astronomy', 'medicine', 'healing'] },

  // Wizards — spell power, fragile
  { id: 'char-bruno', type: CARD_TYPES.CHARACTER, class: CLASSES.WIZARD, discipline: DISCIPLINES.MEMORY, name: 'Giordano Bruno', icon: '🔮', stats: { health: 12, attack: 2, defense: 2, mind: 10 }, trait: 'His memory palace has room for one more working than anyone else\'s head.', capabilities: ['conjuring', 'imagination', 'memory'] },
  { id: 'char-pico', type: CARD_TYPES.CHARACTER, class: CLASSES.WIZARD, discipline: DISCIPLINES.CORRESPONDENCE, name: 'Pico della Mirandola', icon: '🔮', stats: { health: 13, attack: 2, defense: 2, mind: 9 }, trait: 'Finds the thread joining every school of magic, and pulls it.', capabilities: ['knowledge', 'translation', 'debate', 'syncretism'] },
  { id: 'char-cavendish', type: CARD_TYPES.CHARACTER, class: CLASSES.WIZARD, discipline: DISCIPLINES.NATURAL, name: 'Margaret Cavendish', icon: '🔮', stats: { health: 12, attack: 2, defense: 3, mind: 8 }, trait: 'Trusts the microscope as much as the grimoire — a non-occult answer for half the dungeon\'s magical problems.', capabilities: ['experimentation', 'observation', 'imagination', 'naturalPhilosophy'] },

  // Rogues — traps, locks, scouting, treasure
  { id: 'char-digby', type: CARD_TYPES.CHARACTER, class: CLASSES.ROGUE, discipline: DISCIPLINES.ACQUISITION, name: 'Kenelm Digby', icon: '🗡️', stats: { health: 12, attack: 4, defense: 2, mind: 6 }, trait: 'Courtier, privateer, and collector: a pirate\'s eye for what is actually worth taking.', capabilities: ['appraisal', 'diplomacy', 'rogue', 'fencing'] },
  { id: 'char-trithemius', type: CARD_TYPES.CHARACTER, class: CLASSES.ROGUE, discipline: DISCIPLINES.CIPHER, name: 'Johannes Trithemius', icon: '🗡️', stats: { health: 11, attack: 4, defense: 3, mind: 5 }, trait: 'Buried ciphers in mechanisms long before anyone thought to look there. Alarms he passes stay silent.', capabilities: ['knowledge', 'translation', 'memory', 'telepathy'] },
  { id: 'char-fludd', type: CARD_TYPES.CHARACTER, class: CLASSES.ROGUE, discipline: DISCIPLINES.ASTROLOGY, name: 'Robert Fludd', icon: '🗡️', stats: { health: 11, attack: 5, defense: 2, mind: 5 }, trait: 'Tuned the whole cosmos to one monochord. Knows what a room will do before he is in it, and what a hoard is worth before he touches it.', capabilities: ['harmony', 'appraisal', 'divination'] },

  // Alchemists — potions, weapon mods, labs
  { id: 'char-paracelsus', type: CARD_TYPES.CHARACTER, class: CLASSES.ALCHEMIST, discipline: DISCIPLINES.TRANSMUTATION, name: 'Paracelsus', icon: '⚗️', stats: { health: 13, attack: 3, defense: 2, mind: 7 }, trait: 'Brews at any bench he finds, and has burned down three academies\' worth of orthodoxy doing it.', capabilities: ['alchemy', 'medicine', 'naturalPhilosophy'] },
  { id: 'char-maier', type: CARD_TYPES.CHARACTER, class: CLASSES.ALCHEMIST, discipline: DISCIPLINES.EMBLEM, name: 'Michael Maier', icon: '⚗️', stats: { health: 12, attack: 2, defense: 3, mind: 8 }, trait: 'Sets the Work to music: fifty emblems, fifty fugues, and two flasks where others draw one.', capabilities: ['alchemy', 'correspondence', 'music', 'syncretism'] },
  { id: 'char-cortese', type: CARD_TYPES.CHARACTER, class: CLASSES.ALCHEMIST, discipline: DISCIPLINES.TRANSMUTATION, name: 'Isabella Cortese', icon: '⚗️', stats: { health: 13, attack: 3, defense: 3, mind: 5 }, trait: 'Her book of secrets went through edition after edition because the recipes in it actually work.', capabilities: ['alchemy', 'experimentation', 'antiquarian'] },
];

/* ------------------------------------------------------------------ */
/* Equipment cards — assigned to best-fit party member                 */
/* ------------------------------------------------------------------ */

export const EQUIPMENT_CARDS = [
  { id: 'eq-tower-shield', type: CARD_TYPES.EQUIPMENT, name: 'Tower Shield', icon: '🛡️', slot: 'armor', bonus: { defense: 3 }, bestFor: CLASSES.FIGHTER, text: 'A wall with a handle.', capabilities: ['tactics'] },
  { id: 'eq-greatsword', type: CARD_TYPES.EQUIPMENT, name: 'Greatsword of the Vault', icon: '🗡️', slot: 'weapon', bonus: { attack: 3 }, bestFor: CLASSES.FIGHTER, text: 'Found in a vault. Wants to go back. Long enough to take a whole swarm at once: 3 more damage a round against anything that comes in numbers.', capabilities: ['tinkering'] },
  { id: 'eq-blessed-mace', type: CARD_TYPES.EQUIPMENT, name: 'Blessed Mace', icon: '🔨', slot: 'weapon', bonus: { attack: 2, mind: 1 }, bestFor: CLASSES.CLERIC, text: 'Persuasion, sanctified. Consecrates a room as it swings: nothing climbs out of the sarcophagus while it is in hand.', capabilities: ['diplomacy'] },
  { id: 'eq-grimoire', type: CARD_TYPES.EQUIPMENT, name: 'Grimoire of Low Whispers', icon: '📖', slot: 'focus', bonus: { mind: 3 }, bestFor: CLASSES.WIZARD, text: 'The margins argue with the text.', capabilities: ['knowledge', 'correspondence', 'memory'] },
  { id: 'eq-lockpicks', type: CARD_TYPES.EQUIPMENT, name: 'Masterwork Lockpicks', icon: '🗝️', slot: 'tool', bonus: { mind: 2 }, bestFor: CLASSES.ROGUE, text: 'Every door is a suggestion.', capabilities: ['rogue'] },
  { id: 'eq-alembic', type: CARD_TYPES.EQUIPMENT, name: 'Portable Alembic', icon: '⚗️', slot: 'tool', bonus: { mind: 2 }, bestFor: CLASSES.ALCHEMIST, text: 'A lab that fits in a satchel. Labs found in the dungeon work better, and a material can be cooked down into two marches of lamp oil.', capabilities: ['alchemy', 'experimentation'] },
  { id: 'eq-chainmail', type: CARD_TYPES.EQUIPMENT, name: 'Dwarven Chainmail', icon: '🥋', slot: 'armor', bonus: { defense: 2 }, bestFor: null, text: 'Fits anyone brave enough to wear it. Takes the worst of a blow, so fewer of them leave a lasting scar.' },
  { id: 'eq-boots', type: CARD_TYPES.EQUIPMENT, name: 'Boots of the Quiet Step', icon: '👢', slot: 'boots', bonus: { defense: 1, mind: 1 }, bestFor: CLASSES.ROGUE, text: 'The floorboards never learn your name.' },
  { id: 'eq-lantern', type: CARD_TYPES.EQUIPMENT, name: 'Everburning Lantern', icon: '🏮', slot: 'tool', bonus: { mind: 1, defense: 1 }, bestFor: CLASSES.CLERIC, text: 'Reveals hazards one room ahead, and sips its oil: the party burns supply every other march instead of every one.', capabilities: ['observation', 'navigation'] },
  { id: 'eq-throwing-knives', type: CARD_TYPES.EQUIPMENT, name: 'Bandolier of Knives', icon: '🔪', slot: 'weapon', bonus: { attack: 2 }, bestFor: CLASSES.ROGUE, text: 'Six answers to most questions, and they arrive before the asking: 4 damage thrown before the first round.', capabilities: ['fencing'] },
  { id: 'eq-warded-buckler', type: CARD_TYPES.EQUIPMENT, name: 'Warded Buckler', icon: '🛡️', slot: 'armor', bonus: { defense: 2, mind: 1 }, bestFor: CLASSES.CLERIC, text: 'The prayers are etched on the inside, where they matter. Whatever the party sets off in a room, half of it does not come back on them.' },
  { id: 'eq-quicksilver-daggers', type: CARD_TYPES.EQUIPMENT, name: 'Quicksilver Daggers', icon: '🗡️', slot: 'weapon', bonus: { attack: 3 }, bestFor: CLASSES.ROGUE, text: 'They land before the argument starts: the party takes no damage in the first round of a fight.' },
  { id: 'eq-athanor-charm', type: CARD_TYPES.EQUIPMENT, name: 'Athanor Charm', icon: '🔥', slot: 'tool', bonus: { mind: 2 }, bestFor: CLASSES.ALCHEMIST, text: 'A furnace in miniature, always exactly warm enough. Anything the party sets alight burns 2 harder for the rest of the fight.' },

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
    capabilities: ['harmony', 'healing'],
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

  // Room-feature tools: gear whose value is the architecture, not the
  // stat line. A prybar is +1 attack and a key to every sarcophagus,
  // crate and rubble pile in the dungeon; a grapple turns any pit into
  // a weapon. These are the cards that make a furnished room worth
  // reading before you pick (see world/RoomFeatures.js FEATURE_ACTIONS).
  {
    id: 'eq-prybar', type: CARD_TYPES.EQUIPMENT, name: 'Ironwood Prybar', icon: '🪝',
    slot: 'tool', bonus: { attack: 1, defense: 1 }, bestFor: CLASSES.FIGHTER,
    text: 'Opens sarcophagi, crates and rubble. Doubles as an argument.',
  },
  {
    id: 'eq-grapple', type: CARD_TYPES.EQUIPMENT, name: 'Grapple and Line', icon: '🪢',
    slot: 'tool', bonus: { mind: 1, defense: 1 }, bestFor: CLASSES.ROGUE,
    text: 'Forty feet of good rope. Pits become options; a shaft becomes a stairway.',
  },
  {
    id: 'eq-tinderbox', type: CARD_TYPES.EQUIPMENT, name: 'Alchemist\'s Tinderbox', icon: '🔥',
    slot: 'tool', bonus: { attack: 1, mind: 1 }, bestFor: CLASSES.ALCHEMIST,
    text: 'Lights braziers, shelves, and anything else the room has generously left flammable.',
  },
  {
    id: 'eq-winch-hook', type: CARD_TYPES.EQUIPMENT, name: 'Winch Hook', icon: '⚓',
    slot: 'tool', bonus: { attack: 2 }, bestFor: CLASSES.ROGUE,
    text: 'For chains, cranks and portcullises. Whatever the dungeon raised can be dropped.',
  },
  {
    id: 'eq-smiths-kit', type: CARD_TYPES.EQUIPMENT, name: 'Field Smith\'s Kit', icon: '🔨',
    slot: 'tool', bonus: { attack: 1, defense: 1 }, bestFor: CLASSES.FIGHTER,
    text: 'Hammer, file, flux. Useless in a corridor; worth a sword at an anvil.',
  },
  {
    id: 'eq-waterskin', type: CARD_TYPES.EQUIPMENT, name: 'Great Waterskin', icon: '🫗',
    slot: 'tool', bonus: { defense: 1, mind: 1 }, bestFor: null,
    text: 'Holds four days. Wounds get washed, venom gets flushed, fonts get emptied.',
  },
  {
    id: 'eq-silvered-mirror', type: CARD_TYPES.EQUIPMENT, name: 'Silvered Hand-Mirror', icon: '🪞',
    capabilities: ['antiquarian'],
    slot: 'focus', bonus: { mind: 2 }, bestFor: CLASSES.CLERIC,
    text: 'Shows what is standing there rather than what wants to be seen.',
  },

  // Trap cards: cursed gear with hidden upsides. They look like
  // mistakes in the pack and play like gambles at the table.
  {
    id: 'eq-cursed-blade', type: CARD_TYPES.EQUIPMENT, name: 'Blade of the Adder', icon: '🐍',
    slot: 'weapon', bonus: { attack: 4, defense: -2 }, bestFor: CLASSES.FIGHTER, cursed: true,
    text: 'It whispers where to cut. It is usually right. It never says about what. Its bearer has lived with venom long enough that the party shrugs off the venomous.',
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
  { id: 'sp-firebolt', type: CARD_TYPES.SPELL, name: 'Firebolt', icon: '🔥', school: 'evocation', element: 'fire', power: 4, use: 'combat', text: 'Opens combat with 4 damage before blades are drawn, and goes on burning while the fight lasts.' },
  { id: 'sp-mend', type: CARD_TYPES.SPELL, name: 'Mending Word', icon: '💚', school: 'restoration', power: 5, use: 'heal', text: 'Restores 5 health to the most wounded companion the moment the fight turns against them, then keeps mending while it holds.' },
  { id: 'sp-knock', type: CARD_TYPES.SPELL, name: 'Knock', icon: '🚪', school: 'transmutation', power: 3, use: 'utility', text: 'Opens any lock. Loudly.' },
  { id: 'sp-shield', type: CARD_TYPES.SPELL, name: 'Aegis of Ash', icon: '🛡️', school: 'abjuration', power: 3, use: 'combat', text: 'Blunts every blow of the fight, not just the first.' },
  { id: 'sp-light', type: CARD_TYPES.SPELL, name: 'Dancing Light', icon: '💡', school: 'evocation', power: 2, use: 'utility', text: 'Reveals traps and ambushes in the next room — and once the oil is gone, carries the party through a march of dark for free.' },
  { id: 'sp-fear', type: CARD_TYPES.SPELL, name: 'Cause Fear', icon: '😱', school: 'necromancy', power: 4, use: 'combat', text: 'Weak monsters flee before the fight begins.' },
  { id: 'sp-chain', type: CARD_TYPES.SPELL, name: 'Chain Lightning', icon: '⚡', school: 'evocation', element: 'shock', power: 5, use: 'combat', aoe: true, text: 'Arcs from foe to foe until it runs out of foes or enthusiasm — and through anything wet or metal on the way.' },
  { id: 'sp-frost', type: CARD_TYPES.SPELL, name: 'Frost Lance', icon: '❄️', school: 'evocation', element: 'frost', power: 5, use: 'combat', text: 'Cold, precise, and deeply personal.' },
  { id: 'sp-sunder', type: CARD_TYPES.SPELL, name: 'Sunder', icon: '💢', school: 'transmutation', power: 4, use: 'combat', text: 'Armor remembers being ore. This spell reminds it, and plate stops turning blows for the rest of the fight.' },
  { id: 'sp-radiance', type: CARD_TYPES.SPELL, name: 'Radiant Lance', icon: '🌟', school: 'theurgy', element: 'holy', power: 4, use: 'combat', text: 'A line of noon driven through whatever the dark is wearing.' },
  { id: 'sp-balm', type: CARD_TYPES.SPELL, name: 'Balm of Hours', icon: '🌾', school: 'restoration', power: 6, use: 'heal', text: 'Borrows healing from a quieter week and spends it mid-fight, then goes on spending.' },
  { id: 'sp-eyes', type: CARD_TYPES.SPELL, name: 'Eyes of the Mouse', icon: '👁️', school: 'divination', power: 2, use: 'utility', text: 'See what the small and cautious see. It is a lot, and it is just as much in the dark: the party never pays what the dark charges.', capabilities: ['divination', 'telepathy'] },
  { id: 'sp-feather', type: CARD_TYPES.SPELL, name: 'Feather Step', icon: '🪶', school: 'transmutation', power: 3, use: 'utility', text: 'The floor agrees to pretend nobody is on it: 3 less damage from anything underfoot, and no stumbling in the dark.' },

  // Workings that read the room: each one turns a piece of a furnished
  // chamber into a weapon or a resource (world/RoomFeatures.js)
  { id: 'sp-shatter', type: CARD_TYPES.SPELL, name: 'Shatter', icon: '🪨', school: 'transmutation', element: 'frost', power: 4, use: 'combat', aoe: true, text: 'Stone remembers being loose, and cold reminds it. Pillars, boulders and bad ceilings all listen.' },
  { id: 'sp-kindle', type: CARD_TYPES.SPELL, name: 'Kindle', icon: '🕯️', school: 'evocation', element: 'fire', power: 3, use: 'combat', aoe: true, text: 'Lights any fire in the room from across it — braziers, crates, shelves, and whatever is standing near one.' },
  { id: 'sp-fireball', type: CARD_TYPES.SPELL, name: 'Fireball', icon: '🔥', school: 'evocation', element: 'fire', power: 5, use: 'combat', aoe: true, text: 'It does not stop at the monster. Whatever else in the room will burn, burns.' },
  { id: 'sp-hoarfrost', type: CARD_TYPES.SPELL, name: 'Hoarfrost', icon: '🧊', school: 'evocation', element: 'frost', power: 4, use: 'combat', aoe: true, text: 'The cold goes everywhere at once: into the water, into the fire, into the cracks in the stone.' },
  { id: 'sp-dawnbreak', type: CARD_TYPES.SPELL, name: 'Dawnbreak', icon: '🌟', school: 'theurgy', element: 'holy', power: 4, use: 'combat', aoe: true, text: 'Noon, indoors, all at once. Old stone and old glass both answer it.', capabilities: ['syncretism'] },
  { id: 'sp-purify', type: CARD_TYPES.SPELL, name: 'Purify the Font', icon: '⛲', school: 'theurgy', power: 4, use: 'heal', text: 'Still water, said over and made willing — poured out when someone is failing, and again each round after. Best where the dungeon left a font.', capabilities: ['debate', 'healing'] },
];

/* ------------------------------------------------------------------ */
/* Personality cards — archetypes that bias the party's decisions      */
/* ------------------------------------------------------------------ */

export const PERSONALITY_CARDS = [
  { id: 'pers-brave', type: CARD_TYPES.PERSONALITY, name: 'The Bold', icon: '🦁', archetype: 'brave', text: 'Fights before fleeing; opens the ominous door. Walks the dark like a road it knows: 1 less damage a march.' },
  { id: 'pers-cunning', type: CARD_TYPES.PERSONALITY, name: 'The Cunning', icon: '🦊', archetype: 'cunning', text: 'Prefers the trap disarmed, the guard bribed, the fight skipped. Trims the wick without being asked: 2 more marches of oil.' },
  { id: 'pers-greedy', type: CARD_TYPES.PERSONALITY, name: 'The Covetous', icon: '💰', archetype: 'greedy', text: 'Never leaves treasure behind. Never — not even blind, which costs it 1 more damage a march in the dark.' },
  { id: 'pers-scholarly', type: CARD_TYPES.PERSONALITY, name: 'The Scholarly', icon: '📚', archetype: 'scholarly', text: 'Reads everything; lingers in libraries; learns extra spells. Wastes no light doing it: 1 more march of oil.' },
  { id: 'pers-pious', type: CARD_TYPES.PERSONALITY, name: 'The Devout', icon: '🕯️', archetype: 'pious', text: 'Rests at shrines; heals more; abhors desecration. Tends what the dungeon opens, so fewer blows leave a lasting scar.' },
  { id: 'pers-reckless', type: CARD_TYPES.PERSONALITY, name: 'The Reckless', icon: '💥', archetype: 'reckless', text: 'Rushes in. Sometimes that works. Gloriously. Never stops to bind anything, so more of it stays as scars.' },
  // Trap personality (Megabase): looks like a liability, spots what
  // the brave walk into. Cowards notice tripwires.
  { id: 'pers-craven', type: CARD_TYPES.PERSONALITY, name: 'The Craven', icon: '🐔', archetype: 'craven', trap: true, text: 'Avoids every fight it can. Notices every exit — and every tripwire. Skipped fights pay no spoils. Creeps in the dark and pays 1 more for it, but packed 2 marches of spare oil.' },

  // Feature-forward personalities. Both reuse a proven archetype (the
  // alchemy pack's Hermetic set the precedent) so the barks and
  // deliberation voices stay fully covered per class — the new name is
  // a new *lens* on the same decision weights.
  { id: 'pers-tinkerer', type: CARD_TYPES.PERSONALITY, name: 'The Tinkerer', icon: '🔧', archetype: 'cunning', text: 'Touches everything in the room: the chain, the lid, the lever. Uses the architecture as a weapon.' },
  { id: 'pers-vandal', type: CARD_TYPES.PERSONALITY, name: 'The Vandal', icon: '🪓', archetype: 'reckless', text: 'If a thing in the room can be toppled, burned, or dropped on someone, it will be.' },
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
    ...TACTIC_CARDS,
  ];
}

/**
 * Look up any card by id
 */
export function getCard(id) {
  return getAllCards().find(c => c.id === id) || null;
}
