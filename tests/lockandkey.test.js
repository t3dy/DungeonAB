/**
 * Lock and key.
 *
 * The structural trick the roadmap's own research names next
 * (Shaker/Togelius/Nelson, *PCG in Games* ch.3, Fig. 3.5): a subtree
 * with a single entrance can be locked and its key placed elsewhere,
 * which turns a branch from optional loot into a question the dungeon
 * asked earlier.
 *
 * The invariant that matters is **solvability**. A key placed behind
 * its own door is the one arrangement that can never be opened, and it
 * is exactly the arrangement a careless generator produces.
 */

import { strict as assert } from 'assert';
import { generateDungeon, serializeDungeon, dungeonFromLayout } from '../src/world/DungeonGen.js';
import { openLockedWing } from '../src/encounters/RoomEncounters.js';
import { composeLockedWing, composeKeyFound } from '../src/narrative/Narrator.js';
import { lintLine } from '../src/narrative/Prose.js';
import { Party } from '../src/agents/Party.js';
import { CHARACTER_CARDS, CLASSES, getCard } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const fighter = byClass(CLASSES.FIGHTER);
const rogue = byClass(CLASSES.ROGUE);
const wizard = byClass(CLASSES.WIZARD);
const cleric = byClass(CLASSES.CLERIC);

const SEEDS = Array.from({ length: 80 }, (_, i) => `lk-${i}`);

describe('A locked wing is always openable', () => {
  test('a key that exists is never behind the door it opens', () => {
    let locked = 0;
    let keyed = 0;
    for (const seed of SEEDS) {
      const d = generateDungeon(seed, 'hard', { depth: 2 });
      for (const wing of d.branches.filter(b => b.locked)) {
        locked++;
        if (wing.keyRoom === null) continue;      // no key in this dungeon at all
        keyed++;
        const room = d.rooms[wing.keyRoom];
        assert.ok(room, `${seed}: the key room exists`);
        assert.equal(room.key?.wing, wing.wing, `${seed}: it holds this wing's key`);
        assert.ok(d.spine.includes(wing.keyRoom), `${seed}: the key is on the critical path`);
        assert.ok(wing.keyRoom < wing.junction,
          `${seed}: the key (room ${wing.keyRoom}) comes before its door (room ${wing.junction})`);
        assert.ok(!wing.rooms.includes(wing.keyRoom),
          `${seed}: the key is not inside the wing it unlocks`);
      }
    }
    assert.ok(locked >= 5, `locked wings actually generate (${locked} across ${SEEDS.length} seeds)`);
    assert.ok(keyed >= 3 && keyed < locked,
      `some locks have a key and some have none (${keyed} keyed of ${locked} locked)`);
  });

  test('a lock the key cannot answer is a lock worth having', () => {
    // With a key on the critical path every time, 93 of 98 doors opened
    // with it: the party walks past the key by construction, so the
    // lock asked nobody anything. Four in ten locks have no key in the
    // dungeon at all, which is what gives the rogue, the prybar and
    // Knock something to be for.
    let keyless = 0;
    let total = 0;
    for (const seed of SEEDS) {
      for (const wing of generateDungeon(seed, 'hard', { depth: 2 }).branches.filter(b => b.locked)) {
        total++;
        if (wing.keyRoom === null) keyless++;
      }
    }
    const share = keyless / Math.max(1, total);
    assert.ok(share > 0.15 && share < 0.7,
      `keyless locks are common but not the rule (${(share * 100).toFixed(0)}% of ${total})`);
  });

  test('a secret wing is never also locked — one hidden door is enough', () => {
    for (const seed of SEEDS) {
      for (const wing of generateDungeon(seed, 'medium', { depth: 2 }).branches) {
        assert.ok(!(wing.secret && wing.locked), `${seed}: ${wing.name} is hidden or locked, not both`);
      }
    }
  });

  test('the lock survives the archive, key and all', () => {
    // A replayed dungeon that locks a wing whose key no longer exists
    // is a dungeon with a room nobody can reach (tests/archive covers
    // the field-level conservation; this covers what it means).
    for (const seed of SEEDS.slice(0, 30)) {
      const back = dungeonFromLayout(serializeDungeon(generateDungeon(seed, 'hard', { depth: 2 })));
      for (const wing of back.branches.filter(b => b.locked && b.keyRoom !== null)) {
        assert.equal(back.rooms[wing.keyRoom]?.key?.wing, wing.wing,
          `${seed}: the replayed dungeon still contains the key to ${wing.name}`);
      }
    }
  });
});

describe('Four ways through a locked door, and two of them are loud', () => {
  const wing = { wing: 'crypt', name: 'the burial wing', door: 'a barred grille', keyName: "the sexton's key" };

  test('the key opens it quietly', () => {
    const party = new Party([wizard, cleric]);
    party.takeKey({ wing: 'crypt', name: "the sexton's key" });
    const out = openLockedWing(party, 'crypt', 1);   // the worst roll there is
    assert.deepEqual({ opened: out.opened, how: out.how, noisy: out.noisy },
      { opened: true, how: 'key', noisy: false }, 'a key needs no luck at all');
  });

  test('a rogue picks it, a scholar does not', () => {
    const withRogue = new Party([rogue, getCard('eq-lockpicks')]);
    const noRogue = new Party([wizard, cleric]);
    assert.equal(openLockedWing(withRogue, 'crypt', 6).opened, true, 'picks and a rogue');
    assert.equal(openLockedWing(noRogue, 'crypt', 6).opened, false, 'two scholars and no ideas');
  });

  test('Knock and muscle both work, and both are heard', () => {
    const caster = new Party([wizard, getCard('sp-knock')]);
    const knocked = openLockedWing(caster, 'crypt', 5);
    assert.equal(knocked.opened, true);
    assert.equal(knocked.noisy, true, 'Knock has always said it is loud');

    const muscle = new Party([fighter, getCard('eq-prybar')]);
    const forced = openLockedWing(muscle, 'crypt', 8);
    assert.equal(forced.opened, true);
    assert.equal(forced.noisy, true, 'a shoulder to a door is not quiet');
  });

  test('every outcome has writing, and it says which way they got in', () => {
    const cases = [
      { opened: true, how: 'key', noisy: false },
      { opened: true, how: 'picked', noisy: false },
      { opened: true, how: 'knock', noisy: true, source: 'Knock' },
      // Shouldering a door costs health, and the line states the number
      // the resolver applied — so the fixture carries it too, exactly as
      // openLockedWing produces it (asserted just below).
      { opened: true, how: 'forced', noisy: true, lever: true },
      { opened: true, how: 'forced', noisy: true, lever: false, damage: 2 },
      { opened: false, how: null, noisy: false },
    ];
    const seen = new Set();
    for (const outcome of cases) {
      const line = composeLockedWing(wing, outcome);
      assert.ok(line && line.length > 30, `${outcome.how || 'shut'} narrates`);
      assert.ok(!line.includes('undefined'), `${outcome.how || 'shut'} has no holes: ${line}`);
      assert.deepEqual(lintLine(line), [], `${outcome.how || 'shut'} is in voice`);
      seen.add(line);
    }
    assert.equal(seen.size, cases.length, 'each way in reads differently from the others');

    // ...and the fixtures are the real thing: forcing a door bare-handed
    // really does report damage, so the line above is not describing a
    // shape the resolver never produces.
    const shoulder = new Party([fighter]);
    const bare = openLockedWing(shoulder, 'crypt', 10);
    if (bare.opened && bare.how === 'forced') {
      assert.equal(typeof bare.damage, 'number', 'a bare-handed force reports what it cost');
      assert.ok(bare.damage > 0, 'and it costs something');
    }

    const found = composeKeyFound({ wing: 'crypt', name: "the sexton's key" }, 'Vex');
    assert.match(found, /sexton's key/, 'the key is named when it is found');
    assert.deepEqual(lintLine(found), []);
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
