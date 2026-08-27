/**
 * Tests for positional combat.
 *
 * The renderer has always drawn a party as two ranks with the fighters
 * forward, and Party.takeDamage has always sent blows to them first. So
 * position was half-real: visible, quietly mechanical, never chosen.
 *
 * These defend the two claims that make it a decision. **The room
 * decides the menu** — a passage six tiles by two cannot hold a line
 * abreast — and **every formation on that menu is a trade**, not a
 * ranking with one right answer at the top.
 */

import { strict as assert } from 'assert';
import {
  FORMATIONS, FORMATION_IDS, availableFormations, chooseFormation,
  formationModifiers,
} from '../src/agents/Formation.js';
import { resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { Party } from '../src/agents/Party.js';
import { CHARACTER_CARDS, getCard } from '../src/game/Cards.js';
import { ROOM_TYPES, generateDungeon } from '../src/world/DungeonGen.js';
import { lintLine, numbersIn } from '../src/narrative/Prose.js';
import { armsDiffer, trials, partyHealth, partyPool } from './helpers.js';

const four = () => new Party(CHARACTER_CARDS.slice(0, 4));
const room = (w, h, shape, monster = {}) => ({
  type: ROOM_TYPES.MONSTER, icon: '👹', w, h, shape,
  monster: { name: 'a test brute', attack: 9, health: 80, ...monster },
});

describe('The room decides what the party may do', () => {
  test('a passage permits only a column', () => {
    assert.deepEqual(availableFormations({ w: 6, h: 2, shape: 'passage' }), ['column'],
      'six by two is a corridor, whatever anyone would prefer');
  });

  test('a cell is too small for a wedge, a cavern is not', () => {
    const cell = availableFormations({ w: 4, h: 4, shape: 'cell' });
    const cavern = availableFormations({ w: 12, h: 9, shape: 'cavern' });
    assert.ok(!cell.includes('wedge'), 'no room to drive in');
    assert.ok(cavern.includes('wedge'), 'a boss chamber has room for anything');
    assert.ok(cavern.includes('loose'), 'and room to spread right out');
    assert.ok(!cell.includes('loose'), 'a closet does not');
  });

  test('the narrow dimension is what constrains, not the area', () => {
    // A long thin hall has plenty of floor and no width to use it
    const hall = availableFormations({ w: 16, h: 3, shape: 'hall' });
    assert.deepEqual(hall, ['column'], 'sixteen by three is still a corridor');
  });

  test('there is always something available', () => {
    for (const [w, h] of [[2, 2], [4, 4], [6, 6], [20, 20]]) {
      assert.ok(availableFormations({ w, h }).length > 0, `${w}x${h} permits something`);
    }
  });

  test('real generated rooms all permit at least one formation', () => {
    const dungeon = generateDungeon('formation-seed', 'hard');
    for (const r of dungeon.rooms) {
      assert.ok(availableFormations(r).length > 0,
        `a generated ${r.type} (${r.w}x${r.h}) permits something`);
    }
  });

  test('a room with no geometry takes the ordinary shape', () => {
    // Formation scales incoming by up to a third either way, which is
    // larger than most effects the suite measures. A random pick in a
    // geometry-less fixture turned four comparisons into comparisons
    // against the dice.
    assert.equal(chooseFormation(four(), { monster: {} }), 'line');
    assert.equal(chooseFormation(four(), null), 'line');
  });
});

describe('Every formation is a trade', () => {
  test('each one gives something up for what it gains', () => {
    for (const [id, f] of Object.entries(FORMATIONS)) {
      // Flanking is a gain in its own right: only a line and a wedge
      // leave room to work round the sides, which is what the whole
      // Flanking branch of the tactics tree keys off.
      const gains = (f.incomingMult < 1 ? 1 : 0) + (f.attackMult > 1 ? 1 : 0)
        + (f.frontage > 2 ? 1 : 0) + (f.areaShare < 1 ? 1 : 0)
        + (f.flanking ? 1 : 0);
      const costs = (f.incomingMult > 1 ? 1 : 0) + (f.attackMult < 1 ? 1 : 0)
        + (f.frontage < 2 ? 1 : 0) + (f.areaShare > 1 ? 1 : 0) + (f.flanking ? 0 : 1)
        + (f.incomingMult === 1 && f.attackMult === 1 && f.frontage === 2 ? 1 : 0);
      assert.ok(gains > 0, `${id} is worth choosing`);
      assert.ok(costs > 0, `${id} costs something`);
    }
  });

  test('the baseline is not the worst thing to stand in', () => {
    // Shield Wall at -2 incoming for -1 dealt strictly dominated a plain
    // Line: incoming runs about 5 a round and a party's swing about 20,
    // so flat numbers made defence a 40% gain for a 10% cost. The
    // modifiers are proportional now, and this is the guard on that.
    const line = FORMATIONS.line;
    for (const [id, f] of Object.entries(FORMATIONS)) {
      if (id === 'line') continue;
      const strictlyBetter = f.incomingMult <= line.incomingMult
        && f.attackMult >= line.attackMult
        && f.frontage >= line.frontage
        && (f.flanking || !line.flanking)
        && f.areaShare <= line.areaShare;
      assert.ok(!strictlyBetter, `${id} does not dominate a plain line on every axis`);
    }
  });

  test('the modifiers actually reach the fight', () => {
    // Measured PER ROUND, not per fight. Total damage taken is the wrong
    // instrument here and measuring it disproved the obvious guess: a
    // wedge takes less damage overall than a shield wall against a
    // killable foe, because it ends the fight sooner. Against a
    // *killable* monster offence is defence -- which is exactly the
    // trade the formations exist to offer, and exactly why the totals
    // cannot isolate the modifier.
    const perRound = formation => trials(40, () => {
      const party = four();
      const before = partyHealth(party);
      const r = resolveRoomAction(
        room(12, 9, 'cavern', { attack: 9, health: 9999 }), party, 'fight', { formation },
      );
      return (before - partyHealth(party)) / Math.max(1, r.rounds);
    });
    const wall = perRound('shieldwall');
    const wedge = perRound('wedge');
    const { a, b } = armsDiffer(wall, wedge, {
      label: 'a shield wall against a wedge, per round',
      spread: 0.4,
    });
    assert.ok(a < b,
      `shields take fewer blows a round than a wedge does (${a.toFixed(2)} < ${b.toFixed(2)})`);
  });

  test('a wedge ends a killable fight sooner than a shield wall', () => {
    // The other half of the same trade, and the reason both are worth
    // having: what a wedge buys is rounds.
    const rounds = formation => trials(40, () => resolveRoomAction(
      room(12, 9, 'cavern', { attack: 7, health: 90 }), four(), 'fight', { formation },
    ).rounds);
    const { a, b } = armsDiffer(rounds('wedge'), rounds('shieldwall'), {
      label: 'rounds to kill',
      spread: 0.5,
    });
    assert.ok(a < b, `a wedge is faster (${a.toFixed(1)} < ${b.toFixed(1)} rounds)`);
  });

  test('frontage limits how many can swing', () => {
    const party = four();
    assert.ok(party.combatAttack(1) < party.combatAttack(4),
      'one blade forward is fewer blades than four');
    assert.equal(party.combatAttack(4), party.combatAttack(),
      'a full frontage is the old behaviour exactly');
  });

  test('a column cannot flank, because flanking is a spatial idea', () => {
    assert.equal(FORMATIONS.column.flanking, false);
    assert.equal(FORMATIONS.line.flanking, true);
    assert.equal(FORMATIONS.shieldwall.flanking, false, 'a locked wall does not work round the sides');
  });
});

describe('The party chooses for reasons', () => {
  test('a swarm pushes the party to spread out', () => {
    const cavern = room(12, 9, 'cavern', { trait: 'swarm' });
    const picks = trials(200, () => chooseFormation(four(), cavern));
    const loose = picks.filter(p => p === 'loose').length;
    const plain = trials(200, () => chooseFormation(four(), room(12, 9, 'cavern')))
      .filter(p => p === 'loose').length;
    assert.ok(loose > plain, `spreading beats numbers (${loose} vs ${plain} of 200)`);
  });

  test('a reckless party drives in more often than a craven one', () => {
    const cavern = room(12, 9, 'cavern');
    const wedges = archetype => {
      const cards = [...CHARACTER_CARDS.slice(0, 4), getCard(`pers-${archetype}`)];
      return trials(200, () => chooseFormation(new Party(cards), cavern))
        .filter(p => p === 'wedge').length;
    };
    assert.ok(wedges('reckless') > wedges('craven'),
      'temper reaches the choice of where to stand');
  });

  test('filing up is not a coin-flip in an open room', () => {
    // At frontage 1 a column never killed anything in a cavern across
    // sixty measured fights. It stays available -- holding a door when
    // you are nearly dead is a real thing to do -- but a healthy party
    // in open ground should almost never land on it by accident.
    const picks = trials(300, () => chooseFormation(four(), room(12, 9, 'cavern')));
    const columns = picks.filter(p => p === 'column').length;
    assert.ok(columns < 30, `a healthy party rarely files up in a cavern (${columns}/300)`);
  });

  test('a badly hurt party is willing to hold the door', () => {
    const hurt = four();
    for (const m of hurt.members) m.takeDamage(Math.floor(m.maxHealth * 0.75));
    const picks = trials(300, () => chooseFormation(hurt, room(12, 9, 'cavern')));
    const columns = picks.filter(p => p === 'column').length;
    assert.ok(columns > 20, `nearly dead, filing up is on the table (${columns}/300)`);
  });
});

describe('The player is told where they are standing', () => {
  test('every formation has a tell and an effect, in voice', () => {
    for (const id of FORMATION_IDS) {
      const f = formationModifiers(id, { shape: 'chamber' });
      assert.ok(f.tell.length > 25, `${id} says what the party did`);
      assert.ok(f.effect.length > 25, `${id} says what it costs`);
      assert.ok(f.icon, `${id} has a glyph`);
      assert.deepEqual(lintLine(f.tell, { label: id }), [], `${id}'s tell is in voice`);
      assert.deepEqual(lintLine(f.effect, { label: id }), [], `${id}'s effect line is in voice`);
    }
  });

  test('the tell names the room it was chosen in', () => {
    const inCavern = formationModifiers('loose', { shape: 'cavern' });
    assert.match(inCavern.tell, /cavern/, 'the room is named, not "the room"');
  });

  test('the fight reports the formation to the player', () => {
    const party = four();
    const result = resolveRoomAction(room(12, 9, 'cavern'), party, 'fight', { formation: 'wedge' });
    const line = result.preps.find(p => /wedge/i.test(p.text));
    assert.ok(line, 'the Chronicle says where they stood');
    assert.match(line.text, /🔺/, 'with its glyph');
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
