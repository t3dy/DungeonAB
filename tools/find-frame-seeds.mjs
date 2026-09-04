#!/usr/bin/env node
/**
 * Find one seed per theme for the capture fixtures (ui/Frames.js).
 *
 * A fixture that names a theme it does not actually generate is worse
 * than no fixture: the sweep looks complete and photographs the same
 * dungeon three times. This walks seeds until each of the three living
 * themes has one, and prints them ready to paste.
 *
 *   node tools/find-frame-seeds.mjs
 */
import { generateDungeon, DUNGEON_THEMES } from '../src/world/DungeonGen.js';
import { installAlchemyPack } from '../src/packs/alchemyPack.js';

// `DUNGEON_THEMES` is not the theme roster — it is the roster *before
// packs*. `registerTheme()` mutates it at load, and the alchemy pack is
// on by default (`main.js`: enabled unless the player turned it off),
// which is how the Hermetic Athanor gets into a game whose built-in
// themes are delve, castle and icecaverns. A sweep that skips the
// install walks a different seed→theme mapping than the browser does,
// and every fixture it produces names the wrong place.
installAlchemyPack({ enabled: true });

const living = Object.keys(DUNGEON_THEMES);
const found = Object.fromEntries(living.map(id => [id, null]));

for (let i = 1; i <= 600 && Object.values(found).some(v => !v); i++) {
  const seed = `frames-${String(i).padStart(2, '0')}`;
  let d;
  try { d = generateDungeon(seed, 'normal'); } catch (e) { continue; }
  const id = d.theme?.id;
  if (id && id in found && !found[id]) {
    found[id] = { seed, rooms: d.rooms.length, name: d.theme.name };
  }
}

console.log(`themes in play: ${living.join(', ')}\n`);
for (const [id, hit] of Object.entries(found)) {
  console.log(hit
    ? `  ${id.padEnd(12)} ${hit.seed}  (${hit.rooms} rooms — ${hit.name})`
    : `  ${id.padEnd(12)} NOT FOUND in 600 seeds`);
}
