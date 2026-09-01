/**
 * Tests for the saga shelf: saving a run, reading it later, and sending
 * the same party back down.
 *
 * The claim being defended is that a saved run is more than a souvenir.
 * The party comes off the shelf carrying its scars, its trophies, its
 * grimoire and whatever technique it has drilled, and the chronicle
 * keeps being written rather than starting over.
 */

import { strict as assert } from 'assert';
import { ChronicleLibrary, chronicleFilename } from '../src/game/Chronicles.js';
import { Chronicle } from '../src/narrative/Chronicle.js';
import { Simulator } from '../src/sim/Simulator.js';
import { Party } from '../src/agents/Party.js';
import {
  CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, getCard,
} from '../src/game/Cards.js';

/* A storage that behaves like localStorage without a browser */
const memory = () => {
  const d = {};
  return {
    getItem: k => (k in d ? d[k] : null),
    setItem: (k, v) => { d[k] = String(v); },
    removeItem: k => { delete d[k]; },
  };
};

const POOL = [
  ...CHARACTER_CARDS.slice(0, 4), ...EQUIPMENT_CARDS.slice(0, 3),
  SPELL_CARDS.find(s => s.id === 'sp-firebolt'), getCard('eq-tower-shield'),
];

function delve(seed, difficulty = 'easy', opts = {}) {
  const sim = new Simulator(opts.party || POOL, seed, difficulty, opts);
  let g = 0;
  while (!sim.gameOver && g++ < 400) sim.tick();
  return sim;
}

describe('A run can be put on the shelf and found again', () => {
  test('saving records enough to list it without opening it', () => {
    const lib = new ChronicleLibrary(memory());
    const sim = delve('shelf-1');
    const rec = lib.save({ chronicle: sim.getChronicle(), party: sim.party, difficulty: 'easy' });

    const listed = lib.list();
    assert.equal(listed.length, 1);
    assert.equal(listed[0].id, rec.id);
    assert.equal(listed[0].delves, 1);
    assert.equal(listed[0].difficulty, 'easy');
    assert.equal(typeof listed[0].victory, 'boolean');
    assert.ok(listed[0].partyName.length > 0, 'the shelf knows whose saga it is');
  });

  test('it survives being reloaded from storage', () => {
    const store = memory();
    const sim = delve('reload-1');
    new ChronicleLibrary(store).save({ chronicle: sim.getChronicle(), party: sim.party });

    const reopened = new ChronicleLibrary(store);
    assert.equal(reopened.list().length, 1, 'the shelf is still there after a refresh');
    assert.ok(reopened.get(reopened.list()[0].id).chronicle.delves.length > 0);
  });

  test('saving the same saga twice overwrites rather than duplicating', () => {
    const lib = new ChronicleLibrary(memory());
    const first = delve('over-1');
    const rec = lib.save({ chronicle: first.getChronicle(), party: first.party });
    lib.save({ id: rec.id, chronicle: first.getChronicle(), party: first.party });
    assert.equal(lib.list().length, 1, 'one party, one shelf entry');
  });

  test('a missing saga is a null, not a crash', () => {
    const lib = new ChronicleLibrary(memory());
    assert.equal(lib.get('nope'), null);
    assert.equal(lib.resume('nope'), null);
    assert.equal(lib.exportJSON('nope'), null);
    assert.equal(lib.exportMarkdown('nope'), null);
    assert.equal(lib.remove('nope'), false);
  });

  test('a shelf with no storage still works in memory', () => {
    const lib = new ChronicleLibrary(null);
    const sim = delve('nostore-1');
    lib.save({ chronicle: sim.getChronicle(), party: sim.party });
    assert.equal(lib.list().length, 1, 'private mode does not lose the run');
  });
});

describe('The same party goes down again', () => {
  test('scars, purse, grimoire and technique all survive the trip', () => {
    const lib = new ChronicleLibrary(memory());
    const sim = delve('carry-1');
    // Mark the party so there is something to lose
    sim.party.gold = 77;
    sim.party.members[0].wounds = 2;
    sim.party.trophies.push({ name: 'a test tooth', icon: '🦷' });
    const rec = lib.save({ chronicle: sim.getChronicle(), party: sim.party });

    const back = lib.resume(rec.id);
    assert.equal(back.party.gold, 77, 'the purse comes back');
    assert.equal(back.party.members[0].wounds, 2, 'and so do the scars');
    assert.equal(back.party.trophies.length, sim.party.trophies.length, 'and the trophy case');
    assert.equal(back.party.grimoire.length, sim.party.grimoire.length, 'and the grimoire');
    assert.deepEqual(
      back.party.members.map(m => m.name), sim.party.members.map(m => m.name),
      'and the same people, in the same order',
    );
  });

  test('a scroll found in the dungeon is not lost on the way to the shelf', () => {
    // Found cards carry synthetic ids (`found-sp-fear-1`, `found-buckle`)
    // that the draft pool has never heard of. Storing kit by id alone
    // dropped them on load without a word -- silent data loss in the
    // save system, of exactly the kind this project has a rule against.
    const lib = new ChronicleLibrary(memory());
    const sim = delve('found-1');
    sim.party.grimoire.push({
      id: 'found-sp-fear-9', name: 'a half-burned scroll', use: 'combat',
      power: 4, source: 'found',
    });
    sim.party.members[0].equip({
      id: 'found-buckle', type: 'equipment', name: "a dead adventurer's buckle",
      bonus: { defense: 1 },
    });
    const rec = lib.save({ chronicle: sim.getChronicle(), party: sim.party });
    const back = lib.resume(rec.id);

    const scroll = back.party.grimoire.find(s => s.id === 'found-sp-fear-9');
    assert.ok(scroll, 'the found scroll survives');
    assert.equal(scroll.source, 'found', 'still knowing it will burn');
    assert.equal(scroll.name, 'a half-burned scroll', 'and what it is called');

    const buckle = back.party.members
      .flatMap(m => m.equipment).find(e => e.id === 'found-buckle');
    assert.ok(buckle, 'and so does kit taken off the dead');
    assert.equal(buckle.bonus.defense, 1, 'with what it was worth');
  });

  test('a second delve appends a chapter instead of starting over', () => {
    const lib = new ChronicleLibrary(memory());
    const first = delve('append-1');
    const rec = lib.save({ chronicle: first.getChronicle(), party: first.party });

    const back = lib.resume(rec.id);
    if (!back.continuable) return;    // wiped on the first trip; covered below
    const second = delve('append-2', 'easy', { party: back.party, chronicle: back.chronicle, depth: 2 });
    lib.save({ id: rec.id, chronicle: second.getChronicle(), party: second.party });

    const saga = lib.get(rec.id).chronicle;
    assert.equal(saga.delves.length, 2, 'two chapters, one saga');
    assert.equal(saga.delves[1].number, 2);
    assert.equal(saga.delves[1].depth, 2, 'and it went deeper');
    assert.equal(lib.list().length, 1, 'still one entry on the shelf');
  });

  test('a party that did not come back cannot be sent down again', () => {
    // Letting a wiped party march produced a delve that ended on its
    // first tick and appended an empty chapter -- a silent no-op exactly
    // where the player most needs telling.
    const lib = new ChronicleLibrary(memory());
    const wizard = CHARACTER_CARDS.find(c => c.class === 'wizard');
    let checked = false;
    for (let i = 0; i < 12 && !checked; i++) {
      const sim = delve(`dead-${i}`, 'nightmare', { party: [wizard] });
      if (sim.party.living().length > 0) continue;
      const rec = lib.save({ chronicle: sim.getChronicle(), party: sim.party });
      const back = lib.resume(rec.id);
      assert.equal(back.continuable, false, 'the dead do not delve');
      assert.ok(back.reason, 'and the player is told why');
      assert.match(back.reason, /read/, 'and told the story is still readable');
      checked = true;
    }
    assert.ok(checked, 'a doomed wizard obliged');
  });
});

describe('A saga can leave the browser', () => {
  test('it exports as JSON and comes back intact', () => {
    const lib = new ChronicleLibrary(memory());
    const sim = delve('port-1');
    const rec = lib.save({ chronicle: sim.getChronicle(), party: sim.party });

    const json = lib.exportJSON(rec.id);
    assert.ok(json.length > 200, 'there is something in the file');

    const other = new ChronicleLibrary(memory());
    const result = other.importJSON(json);
    assert.equal(result.ok, true);
    assert.equal(
      result.record.chronicle.delves.length,
      lib.get(rec.id).chronicle.delves.length,
      'the whole saga made the trip',
    );
  });

  test('an import lands under a new id, so it never overwrites a run', () => {
    const lib = new ChronicleLibrary(memory());
    const sim = delve('dupe-1');
    const rec = lib.save({ chronicle: sim.getChronicle(), party: sim.party });
    const again = lib.importJSON(lib.exportJSON(rec.id));
    assert.equal(again.ok, true);
    assert.notEqual(again.record.id, rec.id, 'a fresh id');
    assert.equal(lib.list().length, 2, 'and both are on the shelf');
  });

  test('junk is refused with something a person can read', () => {
    const lib = new ChronicleLibrary(memory());
    assert.match(lib.importJSON('not json at all').error, /not readable/);
    assert.match(lib.importJSON('{"hello":1}').error, /does not hold a chronicle/);
    assert.match(
      lib.importJSON(JSON.stringify({ version: 999, chronicle: { delves: [] } })).error,
      /newer version/,
    );
  });

  test('it exports as a document, with the ledger optional', () => {
    const lib = new ChronicleLibrary(memory());
    const sim = delve('doc-1');
    const rec = lib.save({ chronicle: sim.getChronicle(), party: sim.party });

    const md = lib.exportMarkdown(rec.id);
    assert.match(md, /^# The Chronicle of /);
    assert.ok(!md.includes('undefined'));
    const full = lib.exportMarkdown(rec.id, { ledger: true });
    assert.ok(full.length > md.length, 'the ledger can be opened');
  });

  test('the filename is one a person would recognise', () => {
    const c = new Chronicle('Brand of the Broken Shield, Ursula Ironknee');
    c.beginDelve({ seed: 'x' });
    const name = chronicleFilename(c);
    assert.match(name, /^chronicle-brand-of-the-broken-shield-delve-1\.md$/);
    assert.match(chronicleFilename(c, 'json'), /\.json$/);
    assert.match(chronicleFilename(new Chronicle('')), /^chronicle-party-/, 'and it survives a nameless party');
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
