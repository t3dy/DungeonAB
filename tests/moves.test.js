/**
 * Tests for monster signature moves — breath, drain, hex, crush —
 * the Bestiary's answer to the party's class moves.
 */

import { strict as assert } from 'assert';
import { applyNature } from '../src/game/Bestiary.js';
import { Party } from '../src/agents/Party.js';
import { resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { composeResolution } from '../src/narrative/Narrator.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';
import { DUNGEON_THEMES } from '../src/world/DungeonGen.js';

const fighters = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER);
const MOVE_KINDS = ['breath', 'drain', 'hex', 'crush'];

const roomFor = monster => ({ type: ROOM_TYPES.MONSTER, index: 3, cleared: false, monster });
const kindWall = (kind, extra = {}) =>
  applyNature({ kind, name: 'the test subject', attack: 4, health: 999, ...extra });

describe('The move table', () => {
  test('every declared move is well-formed', () => {
    let seen = 0;
    for (const theme of Object.values(DUNGEON_THEMES)) {
      for (const m of [...theme.monsters, ...theme.bosses]) {
        const natured = applyNature({ ...m });
        if (!natured.move) continue;
        seen++;
        assert.ok(MOVE_KINDS.includes(natured.move.kind), `${m.kind}: known move kind`);
        assert.ok(natured.move.name?.length > 2, `${m.kind}: the move has a name`);
        assert.ok(natured.move.every >= 2, `${m.kind}: never every round`);
        if (natured.move.kind === 'breath') assert.ok(natured.move.element, `${m.kind}: breath has an element`);
      }
    }
    assert.ok(seen >= 15, `the bestiary fights with more than teeth (${seen} moves)`);
  });

  test('kindless monsters have no moves — old tests and custom foes are safe', () => {
    const plain = applyNature({ name: 'a wall of teeth', attack: 4, health: 999 });
    assert.equal(plain.move, undefined);
  });
});

describe('Moves in the exchange', () => {
  test('breath fires on schedule, harder than the plain blow', () => {
    const party = new Party([fighters[0], fighters[1], fighters[2]]);
    const result = resolveRoomAction(roomFor(kindWall('cinder-wyrm')), party, 'fight');
    const moves = result.combatLog.filter(e => e.events.some(ev => ev.kind === 'monster-move'));
    assert.ok(moves.length >= 3, `Forge Breath fired (${moves.length} times in 12 rounds)`);
    for (const entry of moves) {
      assert.equal(entry.round % 3, 0, 'every third exchange');
      const mv = entry.events.find(ev => ev.kind === 'monster-move');
      assert.equal(mv.element, 'fire');
      const plain = result.combatLog.find(e => e.events.some(ev => ev.kind === 'monster-hit'));
      const plainHit = plain.events.find(ev => ev.kind === 'monster-hit');
      assert.ok(mv.amount > plainHit.amount, `the breath outdoes the bite (${mv.amount} > ${plainHit.amount})`);
    }
  });

  test('a drain feeds the thing — the log and the bar both say so', () => {
    const party = new Party([fighters[0], fighters[1], fighters[2]]);
    const result = resolveRoomAction(roomFor(kindWall('vampire-lord', { isBoss: false })), party, 'fight');
    const drains = result.combatLog.flatMap(e => e.events).filter(ev => ev.kind === 'drain');
    assert.ok(drains.length >= 1, 'the Lord drinks');
    // The honest-arithmetic invariant, drain-aware: hp drop = dealt − fed
    let prevHp = result.monsterMaxHealth;
    for (const entry of result.combatLog) {
      const dealt = entry.events
        .filter(e => ['hero-hit', 'opening', 'cantrip', 'vial'].includes(e.kind))
        .reduce((s, e) => s + e.amount, 0);
      const fed = entry.events.filter(e => e.kind === 'drain').reduce((s, e) => s + e.amount, 0);
      if (entry.monsterHp > 0) {
        assert.equal(prevHp - entry.monsterHp, dealt - fed, `round ${entry.round} balances`);
      }
      prevHp = entry.monsterHp;
    }
  });

  test('a hex makes every later swing land lighter, on average', () => {
    let hexed = 0;
    let plain = 0;
    for (let i = 0; i < 40; i++) {
      const hexParty = new Party([fighters[0], fighters[1], fighters[2]]);
      const hexResult = resolveRoomAction(roomFor(kindWall('bog-witch')), hexParty, 'fight');
      hexed += hexResult.combatLog.flatMap(e => e.events)
        .filter(e => e.kind === 'hero-hit').reduce((s, e) => s + e.amount, 0);

      const plainParty = new Party([fighters[0], fighters[1], fighters[2]]);
      const plainResult = resolveRoomAction(roomFor(applyNature({ name: 'a wall', attack: 4, health: 999 })), plainParty, 'fight');
      plain += plainResult.combatLog.flatMap(e => e.events)
        .filter(e => e.kind === 'hero-hit').reduce((s, e) => s + e.amount, 0);
    }
    assert.ok(hexed < plain, `the Long Recipe weighs the swords down (${hexed} < ${plain})`);
  });

  test('the chronicle gets the move\'s beat, once', () => {
    const party = new Party([fighters[0], fighters[1], fighters[2]]);
    const room = roomFor(kindWall('ogre-king', { isBoss: false }));
    const result = resolveRoomAction(room, party, 'fight');
    const movePreps = result.preps.filter(p => p.text.includes('Overhead Smash'));
    assert.equal(movePreps.length, 1, 'first fire narrates; repeats stay in the ticker');
    const text = composeResolution(room, 'fight', result, party);
    assert.ok(text.includes('Overhead Smash'), 'the resolution carries it');
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
