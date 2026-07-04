/**
 * Tests for the MTG-style pack draft engine
 */

import { strict as assert } from 'assert';
import { PackDraft, buildPack, SeededRandom, DRAFT_PERSONAS } from '../src/draft/PackDraft.js';
import { CARD_TYPES } from '../src/game/Cards.js';

describe('Pack construction', () => {
  test('packs have 8 cards with guaranteed coverage', () => {
    const rng = new SeededRandom('pack-test');
    for (let i = 0; i < 10; i++) {
      const pack = buildPack(rng);
      assert.equal(pack.length, 8);
      const chars = pack.filter(c => c.type === CARD_TYPES.CHARACTER);
      const equip = pack.filter(c => c.type === CARD_TYPES.EQUIPMENT);
      const spells = pack.filter(c => c.type === CARD_TYPES.SPELL);
      const pers = pack.filter(c => c.type === CARD_TYPES.PERSONALITY);
      assert.equal(chars.length, 3, 'every pack carries 3 characters');
      assert.equal(equip.length, 2);
      assert.equal(spells.length, 2);
      assert.equal(pers.length, 1);
    }
  });

  test('no duplicate cards within a pack', () => {
    const rng = new SeededRandom('dupe-test');
    const pack = buildPack(rng);
    const ids = pack.map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('same seed builds the same pack', () => {
    const a = buildPack(new SeededRandom('same'));
    const b = buildPack(new SeededRandom('same'));
    assert.deepEqual(a.map(c => c.id), b.map(c => c.id));
  });
});

describe('The draft table', () => {
  test('seats: player + 3 AI personas', () => {
    const draft = new PackDraft('table-1');
    assert.equal(draft.seats.length, 4);
    assert.equal(draft.seats[0].isAI, false);
    assert.ok(draft.seats.slice(1).every(s => s.isAI));
    assert.equal(DRAFT_PERSONAS.length, 3);
  });

  test('a full draft completes with 24 picks per seat', () => {
    const draft = new PackDraft('table-2');
    let safety = 0;
    while (!draft.finished && safety < 100) {
      safety++;
      const pack = draft.getPlayerPack();
      assert.ok(pack.length > 0, 'player pack never empty mid-draft');
      draft.playerPick(pack[0].id); // Player rare-drafts blindly
    }
    assert.ok(draft.finished);
    for (const seat of draft.seats) {
      assert.equal(seat.pool.length, 24, `${seat.name} drafted 24 cards`);
    }
  });

  test('AI drafters build coherent pools (at least one character)', () => {
    const draft = new PackDraft('table-3');
    while (!draft.finished) {
      draft.playerPick(draft.getPlayerPack()[0].id);
    }
    for (const seat of draft.seats.slice(1)) {
      const chars = seat.pool.filter(c => c.type === CARD_TYPES.CHARACTER);
      assert.ok(chars.length >= 1, `${seat.name} drafted at least one character`);
    }
  });

  test('warlord persona leans martial', () => {
    const draft = new PackDraft('table-4');
    while (!draft.finished) {
      // Player always takes personalities/spells, leaving bodies for AIs
      const pack = draft.getPlayerPack();
      const soft = pack.find(c => c.type !== CARD_TYPES.CHARACTER) || pack[0];
      draft.playerPick(soft.id);
    }
    const warlord = draft.seats.find(s => s.id === 'warlord');
    const fighters = warlord.pool.filter(c => c.class === 'fighter');
    const chars = warlord.pool.filter(c => c.type === CARD_TYPES.CHARACTER);
    assert.ok(chars.length >= 2, 'warlord drafts bodies');
    assert.ok(fighters.length >= 1, 'warlord drafts fighters');
  });

  test('picking an invalid card returns null and changes nothing', () => {
    const draft = new PackDraft('table-5');
    const before = draft.getPlayerPack().length;
    assert.equal(draft.playerPick('not-a-card'), null);
    assert.equal(draft.getPlayerPack().length, before);
  });

  test('table summary exposes pick counts for signal reading', () => {
    const draft = new PackDraft('table-6');
    draft.playerPick(draft.getPlayerPack()[0].id);
    const summary = draft.getTableSummary();
    assert.equal(summary.length, 4);
    const totalPicks = summary.reduce((s, seat) =>
      s + seat.counts.characters + seat.counts.equipment + seat.counts.spells + seat.counts.personalities, 0);
    assert.equal(totalPicks, 4, 'one pick per seat after one turn');
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
