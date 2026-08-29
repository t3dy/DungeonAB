/**
 * Tests for the cue layer — the numbers that float over the map.
 *
 * A playtester asked for this in one sentence: *"when you lose life a
 * -X heart displays... it'd be more satisfying to have visuals
 * associated, and then I could go read the log if I wanted more
 * details."* The cues are not a second bookkeeping system: they read
 * `Chronicle.diffEvents`, which standing rule 7 guarantees carries one
 * record per observable change. So the thing worth testing is the
 * *selection* — what floats, what stays in the log, and whether the
 * number a cue shows is the number the mechanic applied.
 */

import { strict as assert } from 'assert';
// Imported rather than taken from the globals the other suites rely on:
// node --test only installs those under conditions that are not worth
// depending on, and this file did not get them.
import { describe, test } from 'node:test';
import { selectCues } from '../src/ui/Cues.js';
import { diffEvents, SALIENCE, CHRONICLED_FIELDS } from '../src/narrative/Chronicle.js';

describe('What floats over the map', () => {
  test('a cue states the number the diff recorded, and no other', () => {
    const events = diffEvents({ health: 40, gold: 10 }, { health: 31, gold: 64 });
    const cues = selectCues(events);
    const health = cues.find(c => c.field === 'health');
    const gold = cues.find(c => c.field === 'gold');
    assert.ok(health, 'health lost floats');
    assert.match(health.text, /−9\b/, `nine damage, not ${health.text}`);
    assert.ok(gold, 'gold gained floats');
    assert.match(gold.text, /\+54\b/, `fifty-four gold, not ${gold.text}`);
  });

  test('ledger changes stay in the ledger', () => {
    // The whole point of salience: the log records every step taken,
    // and a floating "+1 door" on every march would be noise.
    const before = {};
    const after = {};
    for (const key of CHRONICLED_FIELDS) { before[key] = 0; after[key] = 3; }
    const events = diffEvents(before, after);
    const ledger = events.filter(e => e.salience === SALIENCE.LEDGER);
    assert.ok(ledger.length > 0, 'some fields are ledger-only');
    const floated = new Set(selectCues(events).map(c => c.field));
    for (const e of ledger) {
      assert.ok(!floated.has(e.field), `${e.field} is ledger writing, not a cue`);
    }
  });

  test('a change of nothing shows nothing', () => {
    assert.deepEqual(selectCues(diffEvents({ gold: 7 }, { gold: 7 })), []);
    assert.deepEqual(selectCues([]), []);
    assert.deepEqual(selectCues(null), []);
  });

  test('a loud tick is capped, so the map stays readable', () => {
    // Everything moves at once in a bad boss round; five numbers is a
    // glance, twelve is a wall.
    const before = { health: 60, wounds: 0, gold: 0, supply: 9, potions: 0,
      materials: 0, trophies: 0, keys: 0, grimoire: 0, score: 0 };
    const after = { health: 20, wounds: 3, gold: 90, supply: 4, potions: 2,
      materials: 5, trophies: 2, keys: 1, grimoire: 3, score: 400 };
    const cues = selectCues(diffEvents(before, after));
    assert.ok(cues.length > 0, 'a loud tick still says something');
    assert.ok(cues.length <= 5, `capped at five, got ${cues.length}`);
  });

  test('every field that floats is one the Chronicle actually writes', () => {
    // Rule 7's other direction: a cue for a field the Chronicle has no
    // writing for would be a number on screen that the saved run cannot
    // explain afterwards.
    const before = {};
    const after = {};
    for (const key of CHRONICLED_FIELDS) { before[key] = 0; after[key] = 5; }
    for (const cue of selectCues(diffEvents(before, after))) {
      assert.ok(CHRONICLED_FIELDS.includes(cue.field),
        `${cue.field} has Chronicle writing`);
    }
  });
});
