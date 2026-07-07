/**
 * Tests for combat engine v2 — the blow-by-blow exchange log, class
 * signature moves, backstab crits, morale routs, and elite veterans.
 */

import { strict as assert } from 'assert';
import { generateDungeon, ROOM_TYPES, DUNGEON_THEMES } from '../src/world/DungeonGen.js';
import { Party } from '../src/agents/Party.js';
import { resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { composeResolution } from '../src/narrative/Narrator.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, SPELL_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const fighters = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER);
const combatSpell = SPELL_CARDS.find(s => s.use === 'combat');

const monsterRoom = m => ({ type: ROOM_TYPES.MONSTER, index: 3, cleared: false, monster: m });
const wall = (extra = {}) => ({ name: 'the wall of teeth', attack: 4, health: 999, ...extra });

describe('The exchange log', () => {
  test('every round is logged, and the arithmetic is honest', () => {
    const party = new Party([fighters[0], fighters[1], byClass('cleric')]);
    const result = resolveRoomAction(monsterRoom(wall()), party, 'fight');
    assert.equal(result.rounds, 12, 'the wall outlasts the cap');
    const roundEntries = result.combatLog.filter(e => e.round >= 1);
    assert.equal(roundEntries.length, 12, 'one entry per round');

    let prevHp = result.monsterMaxHealth;
    for (const entry of result.combatLog) {
      const dealt = entry.events
        .filter(e => ['hero-hit', 'opening', 'cantrip', 'vial'].includes(e.kind))
        .reduce((s, e) => s + e.amount, 0);
      assert.ok(dealt > 0 || entry.events.length > 0, 'no empty beats');
      if (entry.monsterHp > 0) {
        assert.equal(prevHp - entry.monsterHp, dealt,
          `round ${entry.round}: the log's damage matches the bar's drop`);
      }
      prevHp = entry.monsterHp;
    }
  });

  test('hits are attributed to named heroes, hardest hitter first', () => {
    const party = new Party([fighters[0], byClass('wizard')]);
    const result = resolveRoomAction(monsterRoom(wall()), party, 'fight');
    const hits = result.combatLog[0].events.filter(e => e.kind === 'hero-hit');
    assert.ok(hits.length >= 1);
    assert.ok(hits.every(h => h.name && h.amount >= 0), 'every blow has a name and a number');
    assert.equal(hits[0].name, party.members[0].name, 'the fighter swings first');
  });

  test('the monster hits back on the log too, and the fx payload carries it all', () => {
    const layout = {
      themeId: 'delve', conditionId: 'none',
      rooms: [
        { index: 0, type: 'entrance', x: 0, y: 0, secret: false },
        { index: 1, type: 'monster', x: 1, y: 0, secret: false, monster: { kind: 'skeleton', name: 'a rattling skeleton patrol', attack: 3, health: 30 } },
        { index: 2, type: 'boss', x: 2, y: 0, secret: false, monster: { kind: 'whelp', name: 'a tired whelp', attack: 1, health: 1, isBoss: true } },
      ],
      spine: [0, 1, 2],
      edges: [{ a: 0, b: 1 }, { a: 1, b: 2 }],
      branches: [],
    };
    // Loop until the party's dice choose an actual fight
    for (let i = 0; i < 50; i++) {
      const sim = new Simulator([fighters[0], fighters[1]], `fx-${i}`, 'easy', { layout: JSON.parse(JSON.stringify(layout)) });
      sim.tick();
      if (sim.lastNarration?.action === 'fight' && sim.lastNarration.fx?.combatLog) {
        const fx = sim.lastNarration.fx;
        assert.equal(fx.monsterKind, 'skeleton');
        assert.equal(fx.monsterMaxHealth, 30);
        assert.ok(fx.combatLog.some(r => r.events.some(e => e.kind === 'monster-hit')),
          'the counter-blows are on the log');
        return;
      }
    }
    assert.fail('fifty parties and nobody picked a fight');
  });
});

describe('Class signature moves', () => {
  test('a wizard chips in a cantrip every round — grimoire required', () => {
    const armed = new Party([byClass('wizard'), { ...combatSpell }]);
    const withSpell = resolveRoomAction(monsterRoom(wall()), armed, 'fight');
    for (const entry of withSpell.combatLog.filter(e => e.round >= 1)) {
      assert.ok(entry.events.some(e => e.kind === 'cantrip' && e.amount === 2),
        `round ${entry.round} has the cantrip chip`);
    }

    const unarmed = new Party([byClass('wizard')]);
    const bare = resolveRoomAction(monsterRoom(wall()), unarmed, 'fight');
    assert.ok(!bare.combatLog.some(e => e.events.some(ev => ev.kind === 'cantrip')),
      'no grimoire, no cantrips');
  });

  test('the alchemist opens round one with a vial when the satchel has anything in it', () => {
    const stocked = new Party([byClass('alchemist'), fighters[0]]);
    stocked.materials = 1;
    const result = resolveRoomAction(monsterRoom(wall()), stocked, 'fight');
    const r1 = result.combatLog.find(e => e.round === 1);
    assert.ok(r1.events.some(e => e.kind === 'vial' && e.amount === 3));
    assert.equal(stocked.materials, 1, 'residue, not stock — nothing is consumed');
    assert.ok(!result.combatLog.find(e => e.round === 2)?.events.some(e => e.kind === 'vial'),
      'one vial per fight');

    const empty = new Party([byClass('alchemist'), fighters[0]]);
    const dry = resolveRoomAction(monsterRoom(wall()), empty, 'fight');
    assert.ok(!dry.combatLog.some(e => e.events.some(ev => ev.kind === 'vial')),
      'an empty satchel throws nothing');
  });

  test('the cleric works the line every third exchange', () => {
    const party = new Party([fighters[0], fighters[1], fighters[2], byClass('cleric')]);
    const result = resolveRoomAction(monsterRoom(wall({ attack: 5 })), party, 'fight');
    const triageRounds = result.combatLog
      .filter(e => e.events.some(ev => ev.kind === 'triage'))
      .map(e => e.round);
    assert.ok(triageRounds.length >= 3, `triage happened (rounds ${triageRounds})`);
    assert.ok(triageRounds.every(r => r % 3 === 0), 'on the third, sixth, ninth...');
  });

  test('rogue backstabs land double and are marked as crits', () => {
    for (let i = 0; i < 300; i++) {
      const party = new Party([byClass('rogue'), fighters[0]]);
      const result = resolveRoomAction(monsterRoom(wall()), party, 'fight');
      const critEvents = result.combatLog.flatMap(e => e.events).filter(e => e.crit);
      assert.equal(result.crits, critEvents.length, 'the counter matches the log');
      if (critEvents.length > 0) {
        assert.ok(critEvents.every(e => e.amount % 2 === 0 && e.amount > 0), 'a backstab is the share, twice');
        const text = composeResolution(monsterRoom(wall()), 'fight', { ...result, success: true }, party);
        assert.ok(text.includes('seam'), 'the chronicle salutes the backstab');
        return;
      }
    }
    assert.fail('300 fights and the rogue never found a seam');
  });
});

describe('Morale and routs', () => {
  test('a beaten mercenary runs, for half the bounty', () => {
    for (let i = 0; i < 200; i++) {
      const party = new Party([fighters[0], fighters[1], fighters[2]]);
      const room = monsterRoom({ name: 'a goblin toll-gang', attack: 2, health: 26, bribable: true });
      const result = resolveRoomAction(room, party, 'fight');
      if (result.routed) {
        assert.equal(result.success, true, 'a rout is a win');
        assert.ok(room.cleared, 'the room empties');
        assert.equal(party.score, 12, 'half of 25, floored');
        assert.ok(result.combatLog[result.combatLog.length - 1].events.some(e => e.kind === 'rout'));
        const text = composeResolution(room, 'fight', result, party);
        assert.ok(text.includes('run') || text.includes('nerve'), 'the chronicle records the flight');
        return;
      }
    }
    assert.fail('200 goblin gangs and not one lost its nerve');
  });

  test('the dead never rout — nothing left to fear with', () => {
    for (let i = 0; i < 120; i++) {
      const party = new Party([fighters[0], fighters[1], fighters[2]]);
      const result = resolveRoomAction(
        monsterRoom({ name: 'a bone warden', attack: 2, health: 26, undead: true }), party, 'fight');
      assert.ok(!result.routed, 'bones hold the line');
    }
  });

  test('bosses never rout either', () => {
    for (let i = 0; i < 120; i++) {
      const party = new Party([fighters[0], fighters[1], fighters[2]]);
      const result = resolveRoomAction(
        monsterRoom({ name: 'the Ogre King', attack: 2, health: 30, isBoss: true, bribable: true }), party, 'fight');
      assert.ok(!result.routed, 'a king dies on the throne');
    }
  });
});

describe('Elite veterans', () => {
  test('one in eight, marked, renamed, and harder', () => {
    let elites = 0;
    let plain = 0;
    for (let s = 0; s < 30; s++) {
      const d = generateDungeon(`vet-${s}`, 'medium', { theme: 'delve', floors: 1 });
      for (const r of d.rooms.filter(r => r.type === ROOM_TYPES.MONSTER)) {
        if (r.monster.elite) {
          elites++;
          assert.ok(r.monster.name.startsWith('a veteran '), r.monster.name);
          const base = DUNGEON_THEMES.delve.monsters.find(m => m.kind === r.monster.kind);
          if (base) assert.ok(r.monster.attack > base.attack, 'a veteran hits harder than the recruit');
        } else {
          plain++;
        }
      }
    }
    assert.ok(elites >= 5, `veterans exist (${elites} among ${elites + plain})`);
    assert.ok(plain > elites * 3, 'and stay rare');
  });

  test('elites are deterministic per layout — same seed, same veterans', () => {
    const a = generateDungeon('vet-det', 'medium');
    const b = generateDungeon('vet-det', 'medium');
    assert.deepEqual(
      a.rooms.map(r => !!r.monster?.elite),
      b.rooms.map(r => !!r.monster?.elite),
    );
  });

  test('a veteran pays a veteran\'s bounty', () => {
    for (let i = 0; i < 100; i++) {
      const party = new Party([fighters[0], fighters[1], fighters[2], byClass('cleric')]);
      const room = monsterRoom({ name: 'a veteran wall', attack: 2, health: 18, elite: true, undead: true });
      const result = resolveRoomAction(room, party, 'fight');
      if (result.success && !result.routed) {
        assert.equal(party.score, 40, 'elite bounty, full rate');
        return;
      }
    }
    assert.fail('the veteran never fell');
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
