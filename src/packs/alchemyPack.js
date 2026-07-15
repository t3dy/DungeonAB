/**
 * The 17th-Century Alchemy Pack — the first DLC theme pack
 *
 * Monsters drawn from the alchemical emblem tradition (Michael
 * Maier's Atalanta Fugiens, 1617): the Green Lion who devours the
 * sun, the Ouroboros, the Rebis, the Raven's Head of the nigredo.
 * Characters and gear from the era's laboratories and courts.
 *
 * This module is also the reference content pack: it registers cards
 * into the draft pool, a whole dungeon theme into the generator, and
 * sprite tiles for its monsters — without touching any base data.
 */

import { registerPack } from '../game/CardPacks.js';
import { registerTheme } from '../world/DungeonGen.js';
import { registerMonsterTiles } from '../ui/SpriteAtlas.js';
import { registerNatures } from '../game/Bestiary.js';
import { registerDrops } from '../game/Drops.js';

export const ALCHEMY_PACK = {
  id: 'alchemy-17c',
  name: '17th-Century Alchemy Pack',
  description: 'Emblem monsters and laboratory gear from the age of Maier and Sendivogius.',
  cards: [
    // Characters — historical alchemists at the bench
    {
      id: 'a17-sendivogius', type: 'character', class: 'alchemist',
      name: 'Michael Sendivogius', icon: '🜍',
      stats: { health: 12, attack: 3, defense: 2, mind: 6 },
      trait: 'Distilled the aerial nitre before anyone had a name for air.',
    },
    {
      id: 'a17-soror', type: 'character', class: 'cleric',
      name: 'The Soror Mystica', icon: '🜋',
      stats: { health: 13, attack: 2, defense: 3, mind: 5 },
      trait: 'The Work needs two. She keeps the vigil, and the vigil keeps the party.',
    },
    {
      id: 'a17-maier', type: 'character', class: 'wizard',
      name: 'Count Michael Maier', icon: '🜚',
      stats: { health: 10, attack: 2, defense: 2, mind: 7 },
      trait: 'Reads emblems the way others read maps. The dungeon is fifty fugues deep.',
    },
    // Equipment — the laboratory carried into the dark
    {
      id: 'a17-athanor', type: 'equipment', name: 'Court Athanor', icon: '🜂',
      slot: 'tool', bonus: { mind: 2 }, bestFor: 'alchemist',
      text: 'The slow furnace. Patience, made of brick.',
    },
    {
      id: 'a17-pelican', type: 'equipment', name: 'Pelican Vessel', icon: '🜄',
      slot: 'tool', bonus: { mind: 1, defense: 1 }, bestFor: 'alchemist',
      text: 'Circulation without loss: what wounds the flask feeds the work.',
    },
    {
      id: 'a17-vitriol', type: 'equipment', name: 'Flask of Vitriol', icon: '🜖',
      slot: 'weapon', bonus: { attack: 3 }, bestFor: 'alchemist',
      text: 'Visita Interiora Terrae — or throw it, and something else will.',
    },
    // Spells — the operations of the Work
    {
      id: 'a17-solve', type: 'spell', name: 'Solve et Coagula', icon: '☿',
      school: 'transmutation', power: 5, use: 'combat',
      text: 'Dissolve the fixed; fix the volatile. Monsters count as the fixed.',
    },
    {
      id: 'a17-aurum', type: 'spell', name: 'Aurum Potabile', icon: '🜚',
      school: 'restoration', power: 6, use: 'heal',
      text: 'Drinkable gold. The court physician swears by it; the court treasurer weeps.',
    },
    {
      id: 'a17-projection', type: 'spell', name: 'Powder of Projection', icon: '✨',
      school: 'transmutation', power: 3, use: 'utility',
      text: 'A pinch turns the lock\'s iron to something more agreeable.',
    },
    // Personality — new name, proven archetype (keeps the barks covered)
    {
      id: 'a17-hermetic', type: 'personality', name: 'The Hermetic', icon: '🜁',
      archetype: 'scholarly',
      text: 'As above, so below; as in the library, so in the crypt. Reads everything twice.',
    },
  ],
};

/* The pack's dungeon theme: a laboratory-cathedral of the Great Work */
export const ATHANOR_THEME = {
  id: 'athanor', name: 'the Hermetic Athanor', icon: '🜂',
  tagline: 'Fifty emblems deep, the Work continues whether or not anyone tends it.',
  weightTweaks: { lab: 2, library: 1, materials: 1, shrine: -0.3 },
  alwaysLab: true,
  monsters: [
    { kind: 'green-lion', name: 'the Green Lion, hungry for the sun', icon: '🦁', attack: 7, health: 15, undead: false },
    { kind: 'ouroboros', name: 'an ouroboros too busy to notice you', icon: '🐍', attack: 5, health: 18, undead: false, slow: true },
    { kind: 'caput-corvi', name: 'the Raven\'s Head, black as the nigredo', icon: '🐦‍⬛', attack: 6, health: 11, undead: true },
    { kind: 'winged-wingless', name: 'two birds, one winged, one not, quarrelling', icon: '🕊️', attack: 5, health: 10, undead: false },
  ],
  bosses: [
    { kind: 'rebis', name: 'the Rebis, crowned twice and patient', icon: '👑', attack: 12, health: 36, undead: false },
    { kind: 'philosophers-dragon', name: 'the Dragon that devours its own tail and yours', icon: '🐉', attack: 13, health: 34, undead: false },
  ],
};

/* Emblem monsters wear the actual engravings — extractions from the
   Atalanta Fugiens plates (1617, public domain; processed in the
   EmblemRoguelike project) */
const ALCHEMY_TILES = {
  'green-lion': { img: new URL('../assets/emblems/green-lion.png', import.meta.url).href },
  'ouroboros': { img: new URL('../assets/emblems/ouroboros.png', import.meta.url).href },
  'caput-corvi': { img: new URL('../assets/emblems/caput-corvi.png', import.meta.url).href },
  'winged-wingless': { img: new URL('../assets/emblems/winged-wingless.png', import.meta.url).href },
  'rebis': { img: new URL('../assets/emblems/rebis.png', import.meta.url).href },
  'philosophers-dragon': { img: new URL('../assets/emblems/philosophers-dragon.png', import.meta.url).href },
};

let installed = false;

/** Install the pack: cards into the draft, theme into the world, tiles into the atlas. */
export function installAlchemyPack({ enabled = true } = {}) {
  if (installed) return;
  installed = true;
  registerPack(ALCHEMY_PACK, { enabled });
  registerTheme(ATHANOR_THEME);
  registerMonsterTiles(ALCHEMY_TILES);
  registerNatures({
    'green-lion': { trait: 'venomous' },                    // vitriol in the bite
    'ouroboros': { trait: 'armored' },                      // scales all the way around
    'caput-corvi': { trait: 'swarm' },                      // the nigredo comes in flocks
    'winged-wingless': { trait: 'swarm' },
    'rebis': { trait: 'armored' },                          // crowned twice, mailed twice
    'philosophers-dragon': { resist: ['fire'], weak: ['frost'] },
  });
  registerDrops({
    'green-lion': { effect: 'coating', name: 'green vitriol', icon: '🦁', mod: { name: 'green vitriol', attack: 2, venom: true }, text: 'Its bite distills to green vitriol. What dissolves the sun does not hesitate at flesh.' },
    'ouroboros': { effect: 'potion', name: 'the shed of the ouroboros', icon: '🐍', potion: { kind: 'ouroboros-shed', heal: 8 }, text: 'It sheds as it dies, as it always does. The shed skin, steeped, turns endings back into beginnings.' },
    'caput-corvi': { effect: 'materials', name: 'nigredo feathers', icon: '🐦‍⬛', count: 2, text: 'Feathers black past black: the nigredo itself. Every great work begins with exactly this.' },
    'winged-wingless': { effect: 'trinket', name: 'the settled feather', icon: '🕊️', bonus: { mind: 1 }, text: 'One feather, from whichever bird was right. Held, it makes both sides of any argument audible.' },
    'rebis': { effect: 'trinket', name: 'the double crown', icon: '👑', bonus: { attack: 1, mind: 1 }, text: 'Both crowns, fused where the two heads met. Wearing it, the head does two kinds of thinking at once.' },
    'philosophers-dragon': { effect: 'coating', name: 'the dragon\'s mercury', icon: '🐉', mod: { name: 'burning mercury', attack: 3, element: 'fire' }, text: 'What it kept swallowing, tail after tail: quicksilver that burns. On a blade it is an unfair argument.' },
  });
}
