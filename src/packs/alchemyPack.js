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

/* Emblem monsters wear the closest Tiny Dungeon faces */
const ALCHEMY_TILES = {
  'green-lion': { col: 0, row: 9 },          // the green slime — verdant and hungry
  'ouroboros': { col: 2, row: 10 },          // coiled many-legged thing
  'caput-corvi': { col: 0, row: 10 },        // the black bat-bird
  'winged-wingless': { col: 0, row: 10 },
  'rebis': { col: 3, row: 9 },               // the crowned hooded figure
  'philosophers-dragon': { col: 2, row: 9 }, // the red crawler
};

let installed = false;

/** Install the pack: cards into the draft, theme into the world, tiles into the atlas. */
export function installAlchemyPack({ enabled = true } = {}) {
  if (installed) return;
  installed = true;
  registerPack(ALCHEMY_PACK, { enabled });
  registerTheme(ATHANOR_THEME);
  registerMonsterTiles(ALCHEMY_TILES);
}
