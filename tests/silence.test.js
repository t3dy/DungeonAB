/**
 * The silence gate.
 *
 * Standing rule: **no state change is silent.** If a number the player
 * could care about moves, the run's record says so.
 *
 * This exists because hand-placed narration turned out to be
 * *bypassable*. A runtime audit found heroes dying on the march with
 * the Chronicle saying nothing at all — not because anybody forgot to
 * write the line, but because a snapshot was taken three lines too late
 * and the dead were already filtered out before the comparison ran.
 * 47% of wounds went unreported the same way.
 *
 * So the guarantee is structural rather than diligent: tick() wraps its
 * body and diffs state on every exit path, and these tests fail if a
 * field can move without producing an event, or if a field is added
 * without writing to describe it.
 */

import { strict as assert } from 'assert';
import {
  Chronicle, snapshotState, diffEvents, toMarkdown, delveNumeral,
  CHRONICLED_FIELDS, CHRONICLE_VERSION, SALIENCE,
} from '../src/narrative/Chronicle.js';
import { Simulator } from '../src/sim/Simulator.js';
import { SeededRandom } from '../src/draft/PackDraft.js';
import { getAllCards, CHARACTER_CARDS, EQUIPMENT_CARDS } from '../src/game/Cards.js';

const ALL = getAllCards();

describe('Every observable field has writing', () => {
  test('the snapshot and the field table agree, with nothing undescribed', () => {
    const sim = new Simulator(CHARACTER_CARDS.slice(0, 4), 'desc-1', 'medium');
    const snap = snapshotState(sim);
    for (const key of Object.keys(snap)) {
      assert.ok(CHRONICLED_FIELDS.includes(key),
        `${key} is in the snapshot but has no writing in Chronicle.FIELDS`);
    }
    for (const key of CHRONICLED_FIELDS) {
      assert.ok(key in snap, `${key} has writing but is not in the snapshot`);
    }
  });

  test('every field describes both directions, with the number in the line', () => {
    const base = { ...snapshotState(new Simulator(CHARACTER_CARDS.slice(0, 4), 'dir-1', 'medium')) };
    for (const key of CHRONICLED_FIELDS) {
      for (const delta of [3, -3]) {
        const after = { ...base, [key]: (base[key] ?? 0) + delta };
        const [event] = diffEvents(base, after, { turn: 1 });
        assert.ok(event, `${key} moving by ${delta} produces an event`);
        assert.ok(event.described, `${key} has real writing, not the fallback`);
        assert.ok(event.text && event.text.length > 8, `${key} says something (${event.text})`);
        assert.ok(event.icon && event.icon !== '•', `${key} has its own glyph`);
      }
    }
  });

  test('an undescribed field still gets recorded rather than vanishing', () => {
    // The backstop: a mechanic added without writing must show up in the
    // ledger, not disappear. This is what makes silence impossible
    // rather than merely discouraged.
    const events = diffEvents({ mystery: 1 }, { mystery: 4 }, { turn: 2 });
    assert.equal(events.length, 1, 'the unknown field is recorded');
    assert.equal(events[0].described, false, 'and flagged as undescribed');
    assert.match(events[0].text, /rose by 3/, 'with a plain fallback line');
  });

  test('nothing moving produces nothing', () => {
    const snap = snapshotState(new Simulator(CHARACTER_CARDS.slice(0, 4), 'quiet-1', 'easy'));
    assert.deepEqual(diffEvents(snap, { ...snap }, {}), [], 'a quiet tick is quiet');
  });
});

describe('No state change escapes the record', () => {
  test('across many delves, every change that happens is an event', () => {
    // The audit, as a gate. Walks real runs across all four
    // difficulties and asserts the diff caught every field that moved.
    let ticks = 0, changes = 0, missed = 0;
    const undescribed = new Set();
    for (let i = 0; i < 40; i++) {
      const rng = new SeededRandom(`gate-${i}`);
      const pool = rng.shuffle(ALL).slice(0, 27);
      const difficulty = ['easy', 'medium', 'hard', 'nightmare'][i % 4];
      const sim = new Simulator(pool, `gate-${i}`, difficulty);
      let before = snapshotState(sim), guard = 0;
      while (!sim.gameOver && guard++ < 400) {
        sim.tick();
        ticks++;
        const after = snapshotState(sim);
        const moved = Object.keys(after).filter(k => after[k] !== before[k]);
        changes += moved.length;
        const reported = new Set((sim.lastEvents || []).map(e => e.field));
        for (const k of moved) {
          if (!reported.has(k)) missed++;
        }
        for (const e of sim.lastEvents || []) {
          if (e.field && !e.described) undescribed.add(e.field);
        }
        before = after;
      }
    }
    assert.ok(ticks > 200, `the gate actually walked some dungeons (${ticks} ticks)`);
    assert.ok(changes > 500, `and saw plenty of change (${changes})`);
    assert.equal(missed, 0, `every change is recorded (${missed} silent of ${changes})`);
    assert.deepEqual([...undescribed], [], 'and every recorded field has writing');
  });

  test('a wipe is never silent about who fell', () => {
    // The bug that started this: heroes died on the march and the
    // Chronicle said nothing, because the roster was snapshotted after
    // the march had already killed them.
    const wizard = CHARACTER_CARDS.find(c => c.class === 'wizard');
    let wipes = 0, silent = 0;
    for (let i = 0; i < 25; i++) {
      const sim = new Simulator([wizard], `doom-${i}`, 'nightmare');
      let guard = 0, sawFall = false;
      while (!sim.gameOver && guard++ < 60) {
        sim.tick();
        if (sim.lastNarration?.falls?.length) sawFall = true;
      }
      if (!sim.victory) { wipes++; if (!sawFall) silent++; }
    }
    assert.ok(wipes > 10, `enough doomed delves to measure (${wipes})`);
    assert.equal(silent, 0, `no wipe goes unmourned (${silent} of ${wipes} silent)`);
  });
});

describe('The chronicle is a saveable, continuable document', () => {
  const run = (seed, chronicle) => {
    const pool = [...CHARACTER_CARDS.slice(0, 4), ...EQUIPMENT_CARDS.slice(0, 3)];
    const sim = new Simulator(pool, seed, 'medium', chronicle ? { chronicle } : {});
    let g = 0;
    while (!sim.gameOver && g++ < 400) sim.tick();
    return sim;
  };

  test('a delve records its rooms, its events, and how it ended', () => {
    const sim = run('save-1');
    const c = sim.getChronicle();
    assert.equal(c.delves.length, 1);
    const d = c.delves[0];
    assert.ok(d.rooms.length > 3, 'the rooms are there');
    assert.ok(d.events.length > 10, 'and the ledger under them');
    assert.ok(d.outcome, 'and the ending');
    assert.equal(typeof d.outcome.victory, 'boolean');
    assert.ok(d.roster.length > 0, 'and who went down');
  });

  test('the same party descending again appends a chapter', () => {
    const first = run('saga-1');
    const chronicle = first.getChronicle();
    const second = run('saga-2', chronicle);
    const c = second.getChronicle();
    assert.equal(c.delves.length, 2, 'one saga, two delves');
    assert.equal(c.delves[0].number, 1);
    assert.equal(c.delves[1].number, 2);
    assert.ok(c.allEvents().length > c.delves[0].events.length,
      'the record grows rather than restarting');
  });

  test('it survives a round trip through JSON', () => {
    const c = run('json-1').getChronicle();
    const restored = Chronicle.fromJSON(JSON.parse(JSON.stringify(c.toJSON())));
    assert.equal(restored.version, CHRONICLE_VERSION);
    assert.equal(restored.partyName, c.partyName);
    assert.equal(restored.delves.length, c.delves.length);
    assert.equal(restored.allEvents().length, c.allEvents().length);
    assert.equal(restored.delves[0].rooms.length, c.delves[0].rooms.length);
  });

  test('it renders as a document a person can read', () => {
    const c = run('md-1').getChronicle();
    const md = toMarkdown(c);
    assert.match(md, /^# The Chronicle of /, 'it has a title');
    assert.match(md, /## Delve I/, 'and a numbered chapter');
    assert.match(md, /Who went down/, 'and a roster');
    assert.ok(md.length > 1500, 'and actual substance');
    assert.ok(!md.includes('undefined'), 'and no holes in it');
    assert.ok(!md.includes('[object Object]'), 'and nothing unrendered');

    const withLedger = toMarkdown(c, { ledger: true });
    assert.ok(withLedger.length > md.length, 'the ledger can be opened');
    assert.match(withLedger, /<details><summary>Ledger<\/summary>/);
  });

  test('an empty chronicle renders without breaking', () => {
    const empty = new Chronicle('nobody');
    assert.match(toMarkdown(empty), /Nothing has happened yet/);
    assert.deepEqual(empty.allEvents(), []);
  });

  test('delves are numbered in a way a reader recognises', () => {
    assert.equal(delveNumeral(1), 'I');
    assert.equal(delveNumeral(4), 'IV');
    assert.equal(delveNumeral(9), 'IX');
    assert.equal(delveNumeral(25), '25', 'and it degrades gracefully');
  });

  test('salience sorts the story from the ledger', () => {
    const c = run('sal-1').getChronicle();
    const beats = c.beats();
    const all = c.allEvents();
    assert.ok(beats.length > 0, 'some events are story');
    assert.ok(beats.length < all.length, 'and some are only record');
    for (const b of beats) assert.equal(b.salience, SALIENCE.BEAT);
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
