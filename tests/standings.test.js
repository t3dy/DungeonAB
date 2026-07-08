/**
 * Tests for rival standings — the table compared, at last.
 * (DESIGN v1: player + 3 AI drafters, solo runs, scores side by side.)
 */

import { strict as assert } from 'assert';
import { PackDraft } from '../src/draft/PackDraft.js';
import { computeStandings, rivalHighlight } from '../src/game/Standings.js';
import { getCondition } from '../src/game/Conditions.js';

const getConditionIcon = id => getCondition(id).icon;

/** Run a full draft so the AI seats hold real pools. */
function draftedTable(seed) {
  const draft = new PackDraft(seed);
  let guard = 0;
  while (!draft.finished && guard++ < 200) {
    const pack = draft.getPlayerPack();
    if (!pack || pack.length === 0) break;
    draft.playerPick(pack[0].id);
  }
  return draft;
}

describe('Rival standings', () => {
  test('the whole table is scored — the player plus three rivals', () => {
    const draft = draftedTable('stand-1');
    const rows = computeStandings(draft, { score: 500, depth: 1 }, { seed: 'stand-1', difficulty: 'easy' });
    assert.equal(rows.length, 4, 'four seats at the table');
    assert.equal(rows.filter(r => r.isPlayer).length, 1, 'exactly one is the player');
    for (const r of rows) {
      assert.ok(r.name && r.icon, 'every seat has a face');
      assert.ok(typeof r.score === 'number', 'and a score');
      assert.ok(r.depthReached >= 1, 'and reached at least the first floor');
    }
  });

  test('standings are ranked, best score first', () => {
    const draft = draftedTable('stand-2');
    const rows = computeStandings(draft, { score: 999999, depth: 1 }, { seed: 'stand-2', difficulty: 'easy' });
    for (let i = 1; i < rows.length; i++) {
      assert.ok(rows[i - 1].score >= rows[i].score, 'sorted descending by score');
      assert.equal(rows[i].place, i + 1, 'places are numbered');
    }
    assert.ok(rows[0].isPlayer, 'an absurd score takes first');
    assert.equal(rows[0].place, 1);
  });

  test('the player row reflects the real result; rivals earn their own', () => {
    const draft = draftedTable('stand-3');
    const rows = computeStandings(draft, { score: 321, depth: 2 }, { seed: 'stand-3', difficulty: 'medium' });
    const you = rows.find(r => r.isPlayer);
    assert.equal(you.score, 321, 'the player keeps their actual score');
    assert.equal(you.depthReached, 2, 'and their actual depth');
    for (const r of rows.filter(r => !r.isPlayer)) {
      assert.ok(r.score >= 0, 'rivals post a real, non-negative score');
    }
  });

  test('a hex lands on its target rival and is marked in the row', () => {
    const draft = draftedTable('stand-hex');
    const victim = draft.seats.find(s => s.isAI);
    const rows = computeStandings(
      draft,
      { score: 100, depth: 1, hexIcon: '🌑' },
      { seed: 'stand-hex', difficulty: 'easy', hexes: { [victim.id]: 'traps' } },
    );
    const hexedRow = rows.find(r => r.name === victim.name);
    assert.equal(hexedRow.hexIcon, getConditionIcon('traps'), 'the victim wears the hex');
    const cleanRivals = rows.filter(r => !r.isPlayer && r.name !== victim.name);
    assert.ok(cleanRivals.every(r => !r.hexIcon), 'the others delve unhexed');
    assert.equal(rows.find(r => r.isPlayer).hexIcon, '🌑', 'the player wears theirs too');
  });

  test('rivals delve deeper when the player set a higher target', () => {
    const draft = draftedTable('stand-4');
    const shallow = computeStandings(draft, { score: 0, depth: 1 }, { seed: 'stand-4', difficulty: 'easy' });
    const deep = computeStandings(draft, { score: 0, depth: 3 }, { seed: 'stand-4', difficulty: 'easy' });
    const rivalDeep = Math.max(...deep.filter(r => !r.isPlayer).map(r => r.depthReached));
    const rivalShallow = Math.max(...shallow.filter(r => !r.isPlayer).map(r => r.depthReached));
    assert.ok(rivalDeep >= rivalShallow, 'a higher target lets rivals go further');
  });
});

describe('The table delves — rival run highlights (v5 P0.2)', () => {
  test('every rival row carries how its night went', () => {
    const draft = draftedTable('hl-1');
    const rows = computeStandings(draft, { score: 300, depth: 3 }, { seed: 'hl-1', difficulty: 'hard' });
    for (const r of rows.filter(x => !x.isPlayer)) {
      assert.equal(typeof r.wiped, 'boolean', 'wiped flag');
      assert.ok(r.partySize >= 1 && r.survivors <= r.partySize, 'survivors within party');
      assert.ok(r.tally && typeof r.tally === 'object', 'honors carried');
      // MVP present unless the pool was somehow empty
      if (r.partySize > 0) assert.ok(r.mvp && r.mvp.name, 'a standout is named');
    }
  });

  test('a wiped run reads as a fall; a survived run as a bank', () => {
    const wiped = rivalHighlight({ wiped: true, depthReached: 2, survivors: 0, partySize: 4, mvp: { icon: '⚔️', name: 'Brand of the Broken Shield' }, tally: {} });
    assert.ok(/wiped/i.test(wiped) && wiped.includes('Brand'), wiped);

    const banked = rivalHighlight({ wiped: false, depthReached: 3, survivors: 3, partySize: 4, mvp: { icon: '🔮', name: 'Melchior the Moth-Eaten' }, tally: { elites: 2, crits: 5 } });
    assert.ok(/banked/i.test(banked) && banked.includes('3/4') && banked.includes('Melchior'), banked);
    assert.ok(banked.includes('⭐') && banked.includes('✦'), 'honors surface');
  });

  test('a highlight never throws on a sparse row', () => {
    assert.doesNotThrow(() => rivalHighlight({ depthReached: 1 }));
    assert.ok(rivalHighlight({ wiped: false, depthReached: 1 }).length > 0);
  });

  test('the player row gets the same treatment when fed highlight data', () => {
    const draft = draftedTable('hl-2');
    const rows = computeStandings(
      draft,
      { score: 400, depth: 2, wiped: false, survivors: 4, partySize: 5, mvp: { icon: '🗡️', name: 'Vex Threefingers' }, tally: { crits: 4 } },
      { seed: 'hl-2', difficulty: 'medium' },
    );
    const me = rows.find(r => r.isPlayer);
    const hl = rivalHighlight(me);
    assert.ok(hl.includes('Vex') && hl.includes('4/5'), hl);
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
