/**
 * Tests for the peddler's stall — in-dungeon shops (Spelunky
 * tradition): need-driven buying, haggling, and the eternally armed
 * peddler.
 */

import { strict as assert } from 'assert';
import { generateDungeon, serializeDungeon, dungeonFromLayout, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { Party } from '../src/agents/Party.js';
import {
  getRoomOptions, resolveRoomAction, buyFromStock, haggleCheck, robCheck,
} from '../src/encounters/RoomEncounters.js';
import { composePredicament, composeResolution, composeDeliberation } from '../src/narrative/Narrator.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, PERSONALITY_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const pers = archetype => PERSONALITY_CARDS.find(p => p.archetype === archetype);
const fighters = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER);

const shopRoom = () => ({
  type: ROOM_TYPES.SHOP, index: 3, cleared: false,
  stock: [
    { id: 'draught', name: 'a healing draught', icon: '🧪', price: 12 },
    { id: 'materials', name: 'a bundle of materials', icon: '🌿', price: 9 },
    { id: 'key', name: 'a heavy iron key', icon: '🗝️', price: 20 },
  ],
});

describe('Shops in generation', () => {
  test('peddlers set up across seeds, always with priced stock', () => {
    let seen = 0;
    for (let s = 0; s < 60; s++) {
      const d = generateDungeon(`shop-${s}`, 'medium');
      for (const r of d.rooms.filter(r => r.type === ROOM_TYPES.SHOP)) {
        seen++;
        assert.equal(r.stock.length, 3, 'three goods on the oilcloth');
        for (const g of r.stock) {
          assert.ok(g.price >= 1 && g.name && g.icon, `${g.id} is a real good`);
        }
      }
    }
    assert.ok(seen >= 5, `shops are not vanishingly rare (${seen} in 60 dungeons)`);
  });

  test('deeper stalls charge a depth tax', () => {
    // Same seed = same rng draws; only the depth differs
    const shallow = generateDungeon('depth-tax', 'medium', { depth: 1 });
    const deep = generateDungeon('depth-tax', 'medium', { depth: 3 });
    const sShop = shallow.rooms.find(r => r.type === ROOM_TYPES.SHOP);
    const dShop = deep.rooms.find(r => r.type === ROOM_TYPES.SHOP);
    if (!sShop || !dShop) return; // this seed built no stall; other tests cover existence
    const s = sShop.stock.find(g => g.id === 'draught');
    const d = dShop.stock.find(g => g.id === 'draught');
    assert.equal(d.price, s.price + 4, 'two floors down adds four gold to a draught');
  });

  test('a re-delved shop is fully restocked', () => {
    const room = shopRoom();
    room.stock[0].sold = true;
    const layout = serializeDungeon({
      rooms: [room], theme: { id: 'delve' }, condition: null,
      spine: [0], edges: [], branches: [],
    });
    assert.ok(!('sold' in layout.rooms[0].stock[0]), 'sold flags stay behind');
    const rebuilt = dungeonFromLayout(layout);
    assert.ok(rebuilt.rooms[0].stock.every(g => !g.sold), 'the shelves are full again');
  });
});

describe('Shop options', () => {
  test('paupers cannot buy, but robbing is always on the table', () => {
    const party = new Party([fighters[0]]);
    const ids = getRoomOptions(shopRoom(), party).map(o => o.id);
    assert.ok(!ids.includes('buy-goods'), 'no coin, no counter service');
    assert.ok(ids.includes('rob-peddler'));
    assert.ok(ids.includes('pass-by'));
  });

  test('coin unlocks buying; a rogue or the Cunning unlock haggling', () => {
    const plain = new Party([fighters[0]]);
    plain.gold = 30;
    const plainIds = getRoomOptions(shopRoom(), plain).map(o => o.id);
    assert.ok(plainIds.includes('buy-goods'));
    assert.ok(!plainIds.includes('haggle-hard'), 'honest fighters pay list price');

    const sly = new Party([fighters[0], pers('cunning')]);
    sly.gold = 30;
    assert.ok(getRoomOptions(shopRoom(), sly).map(o => o.id).includes('haggle-hard'));

    const rogueParty = new Party([byClass('rogue')]);
    rogueParty.gold = 30;
    assert.ok(getRoomOptions(shopRoom(), rogueParty).map(o => o.id).includes('haggle-hard'));
  });
});

describe('Buying by need', () => {
  test('a bleeding party buys the draught first', () => {
    const party = new Party([fighters[0]]);
    party.gold = 14;
    party.members[0].takeDamage(8);
    const bought = buyFromStock(party, shopRoom());
    assert.equal(bought[0].id, 'draught');
    assert.equal(party.potions.length, 1);
    assert.equal(party.gold, 14 - 12);
  });

  test('an alchemist at full health feeds the bench, then eyes the key', () => {
    const party = new Party([byClass('alchemist')]);
    party.gold = 100;
    const bought = buyFromStock(party, shopRoom());
    assert.deepEqual(bought.map(g => g.id), ['materials', 'key'], 'materials, then the key');
    assert.equal(party.materials, 2);
    assert.equal(party.keys, 1);
  });

  test('two purchases at most — the peddler does not stock for armies', () => {
    const party = new Party([byClass('alchemist')]);
    party.gold = 1000;
    party.members[0].takeDamage(5);
    assert.equal(buyFromStock(party, shopRoom()).length, 2);
  });

  test('a haggled discount really discounts', () => {
    const full = new Party([fighters[0]]);
    full.gold = 50;
    full.members[0].takeDamage(8);
    buyFromStock(full, shopRoom(), 1);

    const cheap = new Party([fighters[0]]);
    cheap.gold = 50;
    cheap.members[0].takeDamage(8);
    buyFromStock(cheap, shopRoom(), 0.7);

    assert.ok(cheap.gold > full.gold, `30% off leaves more coin (${cheap.gold} > ${full.gold})`);
  });
});

describe('Haggling and robbery checks', () => {
  test('a sharp mind haggles; a dull one pays list', () => {
    const sly = new Party([byClass('wizard'), pers('cunning')]);   // mind 7 + 1.5
    assert.equal(haggleCheck(sly, 1), true);
    const dull = new Party([fighters[0]]);                          // mind 2
    assert.equal(haggleCheck(dull, 6), false);
    assert.equal(haggleCheck(dull, 8), true, 'even Brand gets lucky');
  });

  test('robbery is hard, and harder without a rogue', () => {
    const rogueParty = new Party([byClass('rogue')]);   // mind 5 + 2
    assert.equal(robCheck(rogueParty, 5), true);
    assert.equal(robCheck(rogueParty, 3), false);
    const honest = new Party([fighters[0]]);            // mind 2, no edge
    assert.equal(robCheck(honest, 9), false, '11 is out of reach for mind 2 + 9');
  });

  test('a failed robbery hurts, alarms, and empties the stall', () => {
    // Loop the gradient until both outcomes have shown themselves
    let sawFail = null;
    let sawWin = null;
    for (let i = 0; i < 200 && (!sawFail || !sawWin); i++) {
      const party = new Party([byClass('rogue')]);
      const room = shopRoom();
      const result = resolveRoomAction(room, party, 'rob-peddler');
      if (result.success) {
        sawWin = { result, party };
      } else {
        sawFail = { result, party, room };
      }
    }
    assert.ok(sawWin && sawFail, 'the gradient has both faces');
    assert.ok(sawWin.result.stolen.length > 0 && sawWin.party.gold > 0, 'a heist pays');
    assert.ok(sawFail.party.alarmed, 'word travels');
    assert.ok(sawFail.party.totalHealth() < sawFail.party.totalMaxHealth(), 'the crossbow is real');
    assert.ok(sawFail.room.stock.every(g => g.sold), 'the stall packs up');
  });
});

describe('The narrator minds the store', () => {
  test('the stall has predicaments, and every action has prose', () => {
    assert.ok(composePredicament({ type: ROOM_TYPES.SHOP }).length > 30);

    const party = new Party([fighters[0]]);
    party.gold = 50;
    party.members[0].takeDamage(8);
    const room = shopRoom();
    const result = resolveRoomAction(room, party, 'buy-goods');
    const text = composeResolution(room, 'buy-goods', result, party);
    assert.ok(text.includes('healing draught'), 'the goods are named');
    assert.ok(text.includes('12g'), 'and priced');

    const robText = composeResolution(room, 'rob-peddler', { success: false, damage: 6, alarmed: true }, party);
    assert.ok(robText.length > 40 && robText.includes('armed'));

    const options = getRoomOptions(room, party);
    assert.ok(composeDeliberation('buy-goods', options, party).includes('peddler'));
  });
});

describe('Shops in the crawl', () => {
  test('a crawl through a shop room concludes without incident', () => {
    const layout = {
      themeId: 'delve', conditionId: 'none',
      rooms: [
        { index: 0, type: 'entrance', x: 0, y: 0, secret: false },
        { index: 1, type: 'treasure', x: 1, y: 0, secret: false, gold: 40, mimicChance: 0 },
        { index: 2, type: 'shop', x: 2, y: 0, secret: false, stock: shopRoom().stock },
        { index: 3, type: 'boss', x: 3, y: 0, secret: false, monster: { kind: 'whelp', name: 'a tired whelp', icon: '🐉', attack: 1, health: 1, isBoss: true } },
      ],
      spine: [0, 1, 2, 3],
      edges: [{ a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }],
      branches: [],
    };
    const sim = new Simulator(
      [fighters[0], fighters[1], byClass('cleric')],
      'shoprun', 'easy', { layout },
    );
    let guard = 0;
    while (!sim.gameOver && guard++ < 60) sim.tick();
    assert.ok(sim.gameOver && sim.victory, 'commerce does not stop the crawl');
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
