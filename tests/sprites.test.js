/**
 * Tests for the sprite atlas — the art never has a hole in it.
 * Every class, every monster in every theme's roster, and every
 * dressed room type must map to a real tile on the sheet.
 */

import { strict as assert } from 'assert';
import {
  ATLAS, FX_TILES, getClassTile, getMonsterTile, getRoomProp, getAllMappedTiles,
} from '../src/ui/SpriteAtlas.js';
import { CLASSES } from '../src/game/Cards.js';
import { DUNGEON_THEMES, ROOM_TYPES } from '../src/world/DungeonGen.js';

const inBounds = t => t && t.col >= 0 && t.col < ATLAS.cols && t.row >= 0 && t.row < ATLAS.rows;

describe('Sprite atlas coverage', () => {
  test('every class has a face on the sheet', () => {
    for (const cls of Object.values(CLASSES)) {
      assert.ok(inBounds(getClassTile(cls)), `${cls} has a sprite`);
    }
  });

  test('every monster in every theme roster has a sprite', () => {
    for (const theme of Object.values(DUNGEON_THEMES)) {
      for (const m of [...theme.monsters, ...theme.bosses]) {
        assert.ok(inBounds(getMonsterTile(m.kind)), `${theme.id}: ${m.kind} has a sprite`);
      }
    }
  });

  test('an unknown monster kind falls back rather than vanishing', () => {
    assert.ok(inBounds(getMonsterTile('never-heard-of-it')));
  });

  test('dressed rooms have props; a looted chest opens', () => {
    for (const type of ['treasure', 'trap', 'library', 'shrine', 'lab', 'materials', 'entrance']) {
      assert.ok(inBounds(getRoomProp({ type })), `${type} has a prop`);
    }
    const closed = getRoomProp({ type: ROOM_TYPES.TREASURE, cleared: false });
    const open = getRoomProp({ type: ROOM_TYPES.TREASURE, cleared: true });
    assert.notDeepEqual(closed, open, 'looting changes the chest');
  });

  test('undressed rooms return null and keep their emoji', () => {
    for (const type of [ROOM_TYPES.CORRIDOR, ROOM_TYPES.MONSTER, ROOM_TYPES.BOSS, ROOM_TYPES.DISASTER]) {
      assert.equal(getRoomProp({ type }), null, `${type} keeps the emoji`);
    }
  });

  test('every mapped tile lives inside the 12×11 sheet', () => {
    for (const t of getAllMappedTiles()) {
      assert.ok(inBounds(t), `tile (${t.col},${t.row}) is on the sheet`);
    }
    assert.ok(Object.values(FX_TILES).every(inBounds));
  });
});

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(`  ${err.message}`);
    throw err;
  }
}

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}
