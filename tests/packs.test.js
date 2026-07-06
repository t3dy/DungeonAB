/**
 * Tests for content packs — the card editor's registry and the
 * 17th-Century Alchemy Pack (the reference DLC).
 */

import { strict as assert } from 'assert';
import {
  registerPack, setPackEnabled, listPacks, pooledCards, validateCard, validatePack, _resetPacks,
} from '../src/game/CardPacks.js';
import { buildPack, SeededRandom } from '../src/draft/PackDraft.js';
import { ALCHEMY_PACK, ATHANOR_THEME, installAlchemyPack } from '../src/packs/alchemyPack.js';
import { generateDungeon, DUNGEON_THEMES } from '../src/world/DungeonGen.js';
import { getMonsterTile, ATLAS } from '../src/ui/SpriteAtlas.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, CARD_TYPES, CLASSES } from '../src/game/Cards.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);

describe('Card validation (the editor\'s rules)', () => {
  test('a fair character passes; an overstuffed one fails the budget', () => {
    const fair = { id: 'x1', type: 'character', class: 'fighter', name: 'Test Knight', stats: { health: 16, attack: 5, defense: 3, mind: 2 } };
    assert.deepEqual(validateCard(fair), []);
    const stuffed = { ...fair, id: 'x2', stats: { health: 30, attack: 9, defense: 9, mind: 9 } };
    assert.ok(validateCard(stuffed).some(p => p.includes('budget')));
  });

  test('equipment needs bonuses within budget; spells stay in power band', () => {
    assert.deepEqual(validateCard({ id: 'e1', type: 'equipment', name: 'Fine Blade', bonus: { attack: 3 } }), []);
    assert.ok(validateCard({ id: 'e2', type: 'equipment', name: 'God Sword', bonus: { attack: 9 } }).length > 0);
    assert.deepEqual(validateCard({ id: 's1', type: 'spell', name: 'Spark', use: 'combat', power: 4 }), []);
    assert.ok(validateCard({ id: 's2', type: 'spell', name: 'Nuke', use: 'combat', power: 40 }).length > 0);
  });

  test('custom personalities must reuse a proven archetype (barks stay covered)', () => {
    assert.deepEqual(validateCard({ id: 'p1', type: 'personality', name: 'The Curious', archetype: 'scholarly' }), []);
    assert.ok(validateCard({ id: 'p2', type: 'personality', name: 'The Weird', archetype: 'sleepy' }).length > 0);
  });
});

describe('The pack registry', () => {
  test('enabled packs join the draft pool; disabled ones leave it', () => {
    _resetPacks();
    const before = pooledCards(CARD_TYPES.CHARACTER).length;
    registerPack({
      id: 'test-pack', name: 'Test Pack',
      cards: [{ id: 'tp-1', type: 'character', class: 'rogue', name: 'Pack Rogue', stats: { health: 12, attack: 4, defense: 2, mind: 4 } }],
    });
    assert.equal(pooledCards(CARD_TYPES.CHARACTER).length, before + 1);
    setPackEnabled('test-pack', false);
    assert.equal(pooledCards(CARD_TYPES.CHARACTER).length, before);
    _resetPacks();
  });

  test('an invalid pack is refused loudly', () => {
    _resetPacks();
    assert.throws(() => registerPack({ id: 'bad', name: 'Bad', cards: [{ id: 'b1', type: 'spell', name: 'Broken', use: 'combat', power: 99 }] }));
    _resetPacks();
  });

  test('draft packs still guarantee coverage with packs enabled', () => {
    _resetPacks();
    installAlchemyPack();
    const rng = new SeededRandom('pack-draft');
    const pack = buildPack(rng);
    assert.equal(pack.length, 8);
    assert.equal(pack.filter(c => c.type === 'character').length, 3, 'coverage holds');
    _resetPacks();
  });
});

describe('The 17th-Century Alchemy Pack', () => {
  test('the pack itself validates', () => {
    assert.deepEqual(validatePack(ALCHEMY_PACK), []);
  });

  test('installing registers the Hermetic Athanor theme', () => {
    _resetPacks();
    installAlchemyPack();
    assert.ok(DUNGEON_THEMES.athanor, 'the theme exists');
    assert.equal(DUNGEON_THEMES.athanor.name, 'the Hermetic Athanor');
    _resetPacks();
  });

  test('the Athanor generates playable dungeons full of emblem monsters', () => {
    installAlchemyPack();
    const kinds = new Set([...ATHANOR_THEME.monsters, ...ATHANOR_THEME.bosses].map(m => m.kind));
    const d = generateDungeon('athanor-run', 'medium', { theme: 'athanor' });
    assert.equal(d.theme.id, 'athanor');
    for (const r of d.rooms.filter(r => r.monster)) {
      assert.ok(kinds.has(r.monster.kind), `${r.monster.kind} is an emblem creature`);
    }
    // And a party can crawl it to a conclusion
    const sim = new Simulator([fighter], 'athanor-sim', 'easy', { theme: 'athanor' });
    let guard = 0;
    while (!sim.gameOver && guard++ < 80) sim.tick();
    assert.ok(sim.gameOver, 'the Work concludes');
  });

  test('every emblem monster wears an actual engraving', () => {
    installAlchemyPack();
    for (const m of [...ATHANOR_THEME.monsters, ...ATHANOR_THEME.bosses]) {
      const t = getMonsterTile(m.kind);
      assert.ok(t.img && t.img.includes('emblems/'), `${m.kind} wears the Atalanta Fugiens plate`);
    }
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
