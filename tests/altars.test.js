/**
 * Tests for altars — offerings for boons (DCSS tradition): gold on
 * the stone, blood for an edge, free prayers for small mercies, and
 * a god that remembers desecrators.
 */

import { strict as assert } from 'assert';
import { generateDungeon, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { Party } from '../src/agents/Party.js';
import { getRoomOptions, resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { composePredicament, composeResolution } from '../src/narrative/Narrator.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, PERSONALITY_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const pers = archetype => PERSONALITY_CARDS.find(p => p.archetype === archetype);
const fighters = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER);

const altarRoom = (index = 0, demand = 20) => ({
  type: ROOM_TYPES.ALTAR, index, cleared: false, demand,
});

describe('Altars in generation', () => {
  test('altars appear across seeds, each with a stated demand', () => {
    let seen = 0;
    for (let s = 0; s < 60; s++) {
      const d = generateDungeon(`altar-${s}`, 'medium');
      for (const r of d.rooms.filter(r => r.type === ROOM_TYPES.ALTAR)) {
        seen++;
        assert.ok(r.demand >= 15 && r.demand <= 30, `a depth-1 god wants 15-30 (got ${r.demand})`);
      }
    }
    assert.ok(seen >= 5, `altars are not vanishingly rare (${seen} in 60 dungeons)`);
  });

  test('the options fit the purse and the pulse', () => {
    const broke = new Party([fighters[0]]);
    const brokeIds = getRoomOptions(altarRoom(), broke).map(o => o.id);
    assert.ok(!brokeIds.includes('offer-gold'), 'no coin, no offering');
    assert.ok(brokeIds.includes('offer-blood'), 'blood is always legal tender');
    assert.ok(brokeIds.includes('pray-quietly'));

    const rich = new Party([fighters[0]]);
    rich.gold = 100;
    assert.ok(getRoomOptions(altarRoom(), rich).map(o => o.id).includes('offer-gold'));

    const bled = new Party([fighters[0]]);
    bled.members[0].takeDamage(bled.members[0].maxHealth - 5);   // 5 health left
    assert.ok(!getRoomOptions(altarRoom(), bled).map(o => o.id).includes('offer-blood'),
      'nobody that hurt volunteers a vein');
  });
});

describe('Offerings and boons', () => {
  test('a full offering buys a boon, chosen by stone and sum', () => {
    // (index + paid) % 3 picks the boon: 0 mending, 1 warding, 2 keen-edge
    const mendParty = new Party([fighters[0]]);
    mendParty.gold = 50;
    mendParty.members[0].takeDamage(10);
    const mend = resolveRoomAction(altarRoom(1, 20), mendParty, 'offer-gold');
    assert.equal(mend.boon, 'mending');
    assert.equal(mendParty.gold, 30, 'the god keeps exactly the demand');
    assert.ok(mendParty.members[0].health > mendParty.members[0].maxHealth - 10, 'wounds close');

    const wardParty = new Party([fighters[0]]);
    wardParty.gold = 50;
    const ward = resolveRoomAction(altarRoom(2, 20), wardParty, 'offer-gold');
    assert.equal(ward.boon, 'warding');
    assert.equal(wardParty.blessedWard, 1);

    const edgeParty = new Party([fighters[0], fighters[1]]);
    edgeParty.gold = 50;
    const before = edgeParty.members.map(m => m.attack);
    const edge = resolveRoomAction(altarRoom(0, 20), edgeParty, 'offer-gold');
    assert.equal(edge.boon, 'keen-edge');
    assert.equal(edgeParty.members[0].attack, before[0] + 1, 'the front rank comes off the stone keener');
    assert.equal(edgeParty.members[1].attack, before[1] + 1);
  });

  test('a light purse gets a small mercy; an insulting one gets nothing', () => {
    const light = new Party([fighters[0]]);
    light.gold = 12;
    light.members[0].takeDamage(10);
    const mercy = resolveRoomAction(altarRoom(0, 20), light, 'offer-gold');
    assert.equal(mercy.boon, 'small-mercy');
    assert.equal(light.gold, 0, 'the god keeps the light purse too');

    const stingy = new Party([fighters[0]]);
    stingy.gold = 5;
    const nothing = resolveRoomAction(altarRoom(0, 20), stingy, 'offer-gold');
    assert.equal(nothing.boon, null);
    assert.equal(stingy.gold, 0, 'insulting offerings are kept anyway. Gods are like that down here.');
  });

  test('the god refuses a desecrator\'s coin', () => {
    const party = new Party([fighters[0]]);
    party.gold = 100;
    party.desecrated = true;
    const result = resolveRoomAction(altarRoom(0, 20), party, 'offer-gold');
    assert.equal(result.refused, true);
    assert.equal(party.gold, 100, 'the coin comes back cold');
    assert.ok(!party.blessedWard, 'and no boon with it');
  });

  test('blood buys a permanent edge from the sturdiest volunteer', () => {
    const party = new Party([fighters[0], byClass('wizard')]);
    const tank = party.members[0];   // 18 health beats the wizard's 9
    const atkBefore = tank.attack;
    const result = resolveRoomAction(altarRoom(), party, 'offer-blood');
    assert.equal(result.volunteer, tank.name);
    assert.equal(tank.health, tank.maxHealth - 5);
    assert.equal(tank.attack, atkBefore + 2);
  });

  test('a quiet prayer cleanses venom and mends a little', () => {
    const party = new Party([fighters[0]]);
    party.poisonLinger = 3;
    party.members[0].takeDamage(6);
    const result = resolveRoomAction(altarRoom(), party, 'pray-quietly');
    assert.equal(result.cleansed, true);
    assert.equal(party.poisonLinger, 0, 'small gods draw venom for free');
    assert.equal(result.healed, 2);

    const devout = new Party([fighters[0], pers('pious')]);
    devout.members[0].takeDamage(6);
    assert.equal(resolveRoomAction(altarRoom(), devout, 'pray-quietly').healed, 4,
      'the Devout are heard more clearly');
  });

  test('the warding blessing blunts every round of a fight', () => {
    const wall = () => ({ type: ROOM_TYPES.MONSTER, monster: { name: 'the wall of teeth', attack: 6, health: 999 } });
    const roster = () => [fighters[0], fighters[1], fighters[2]];

    const plain = new Party(roster());
    const plainResult = resolveRoomAction(wall(), plain, 'fight');

    const blessed = new Party(roster());
    blessed.blessedWard = 1;
    const blessedResult = resolveRoomAction(wall(), blessed, 'fight');

    assert.equal(plainResult.rounds, 12);
    assert.equal(blessedResult.rounds, 12);
    assert.ok(blessedResult.damage < plainResult.damage,
      `the ward held (${blessedResult.damage} < ${plainResult.damage})`);
  });
});

describe('The narrator keeps the liturgy', () => {
  test('altars have predicaments and every outcome has prose', () => {
    assert.ok(composePredicament({ type: ROOM_TYPES.ALTAR }).length > 30);
    const party = new Party([fighters[0]]);
    const room = altarRoom();
    for (const [result, marker] of [
      [{ refused: true }, 'gold leaf'],
      [{ paid: 20, boon: 'mending' }, 'wounds'],
      [{ paid: 20, boon: 'warding' }, 'shield'],
      [{ paid: 20, boon: 'keen-edge' }, 'keener'],
      [{ paid: 10, boon: 'small-mercy' }, 'mercies'],
      [{ paid: 5, boon: null }, 'insulting'],
    ]) {
      const text = composeResolution(room, 'offer-gold', result, party);
      assert.ok(text.includes(marker), `offer-gold/${result.boon || (result.refused ? 'refused' : 'nothing')} reads right`);
    }
    assert.ok(composeResolution(room, 'offer-blood', { volunteer: 'Brand', damage: 5 }, party).includes('Brand'));
    assert.ok(composeResolution(room, 'pray-quietly', { healed: 2, cleansed: true }, party).includes('venom'));
  });
});

describe('Altars in the crawl', () => {
  test('full generated crawls with shops and altars live still conclude', () => {
    for (const theme of ['crypt', 'madlab', 'delve']) {
      const sim = new Simulator(
        [fighters[0], byClass('cleric'), byClass('rogue'), pers('pious')],
        `altar-crawl-${theme}`, 'easy', { theme },
      );
      let guard = 0;
      while (!sim.gameOver && guard++ < 80) sim.tick();
      assert.ok(sim.gameOver, `${theme} concludes with the new rooms in play`);
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
