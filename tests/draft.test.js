/**
 * Tests for the MTG-style pack draft engine
 */

import { strict as assert } from 'assert';
import {
  PackDraft, buildPack, SeededRandom, DRAFT_PERSONAS,
  PACK_SIZES, TARGET_POOL, roundsForPackSize,
} from '../src/draft/PackDraft.js';
import { CARD_TYPES } from '../src/game/Cards.js';

describe('Difficulty is density, not scarcity', () => {
  test('every difficulty drafts the same size pool', () => {
    // The player's rule, in a test: *"difficulty controls choice
    // density, not whether certain cards are accessible."* A nightmare
    // drafter sees three cards at a time instead of six, twice as
    // often, and still fields a full party. When this drifted — three
    // rounds at every size — nightmare's win rate fell to 6% against a
    // 45% target and the only fix the calibrator could find was making
    // nightmare monsters weaker than easy's.
    const pools = [];
    for (const [difficulty, size] of Object.entries(PACK_SIZES)) {
      const draft = new PackDraft(`density-${difficulty}`, null, size);
      let guard = 0;
      while (!draft.finished && guard++ < 400) {
        const pack = draft.getPlayerPack();
        if (!pack || pack.length === 0) break;
        draft.playerPick(pack[0].id);
      }
      assert.ok(draft.finished, `the ${difficulty} draft completes`);
      const pool = draft.seats[0].pool.length;
      assert.equal(pool, size * draft.numRounds, `${difficulty}: packs drained`);
      assert.ok(Math.abs(pool - TARGET_POOL) <= 1,
        `${difficulty} drafts ${pool}, within a card of ${TARGET_POOL}`);
      pools.push(pool);
    }
    assert.ok(Math.max(...pools) - Math.min(...pools) <= 1,
      `no difficulty is starved: ${pools.join('/')}`);
  });

  test('the rounds answer the pack size', () => {
    // PACK_SIZES runs easy → nightmare, so the packs shrink and the
    // rounds must climb to keep the pool whole.
    let previous = 0;
    for (const size of Object.values(PACK_SIZES)) {
      const rounds = roundsForPackSize(size);
      assert.ok(rounds >= previous, `${size}-card packs: ${rounds} rounds, not fewer`);
      previous = rounds;
    }
    // A caller that names its own rounds still gets them
    assert.equal(new PackDraft('explicit', 2, PACK_SIZES.medium).numRounds, 2);
  });
});

describe('Pack construction', () => {
  test('a pack is the size the difficulty says, with guaranteed coverage', () => {
    // Difficulty controls *choice density*, not which cards exist:
    // easy 6, medium 5, hard 4, nightmare 3 (PACK_SIZES).
    const rng = new SeededRandom('pack-test');
    for (const [difficulty, size] of Object.entries(PACK_SIZES)) {
      for (let i = 0; i < 6; i++) {
        assert.equal(buildPack(rng, size, i).length, size,
          `a ${difficulty} pack holds ${size}`);
      }
    }

    // ...and no card type becomes unreachable as the pack shrinks. A
    // fixed recipe filled a nightmare pack with characters and gear
    // and silently made tactics undraftable at that difficulty.
    for (const [difficulty, size] of Object.entries(PACK_SIZES)) {
      const seen = new Set();
      const spin = new SeededRandom(`reach-${difficulty}`);
      for (let i = 0; i < 60; i++) for (const c of buildPack(spin, size, i)) seen.add(c.type);
      for (const type of Object.values(CARD_TYPES)) {
        assert.ok(seen.has(type), `${type} is still reachable at ${difficulty} (${size} cards)`);
      }
    }

    for (let i = 0; i < 10; i++) {
      const pack = buildPack(rng, PACK_SIZES.medium, i);
      assert.equal(pack.length, PACK_SIZES.medium);
      const chars = pack.filter(c => c.type === CARD_TYPES.CHARACTER);
      const equip = pack.filter(c => c.type === CARD_TYPES.EQUIPMENT);
      const spells = pack.filter(c => c.type === CARD_TYPES.SPELL);
      const pers = pack.filter(c => c.type === CARD_TYPES.PERSONALITY);
      const tactics = pack.filter(c => c.type === CARD_TYPES.TACTIC);
      // Two characters is the guaranteed-coverage floor (CLAUDE.md):
      // enough that no draft is dead, few enough that a four-strong
      // party (Party.PARTY_CAP) isn't force-fed adventurers it can
      // never field. The freed slot went to equipment.
      // Two characters is the guaranteed-coverage floor at every pack
      // size (CLAUDE.md 3): enough that no draft is dead, few enough
      // that a four-strong party (Party.PARTY_CAP) isn't force-fed
      // adventurers it can never field.
      assert.equal(chars.length, 2, 'every pack carries exactly 2 characters');
      // The rest of a medium pack: one weapon-or-gear, one working, and
      // a rotating slot that keeps every type reachable.
      assert.ok(equip.length >= 1, 'and something to carry');
      assert.ok(spells.length >= 1, 'and something to cast');
      assert.equal(chars.length + equip.length + spells.length + pers.length + tactics.length,
        PACK_SIZES.medium, 'and nothing else');
    }
  });

  test('no duplicate cards within a pack', () => {
    const rng = new SeededRandom('dupe-test');
    const pack = buildPack(rng, PACK_SIZES.easy);
    const ids = pack.map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('same seed builds the same pack', () => {
    const a = buildPack(new SeededRandom('same'), PACK_SIZES.medium, 0);
    const b = buildPack(new SeededRandom('same'), PACK_SIZES.medium, 0);
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

  test('a full draft completes with packSize x rounds picks per seat', () => {
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
      const pool = draft.packSize * draft.numRounds;
      assert.equal(seat.pool.length, pool, `${seat.name} drafted ${pool} cards`);
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
