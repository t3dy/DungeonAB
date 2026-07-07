/**
 * Tests for draft signals (v5 P0) — reading the table: rival
 * appetites, and which cards the next drafter will grab if you pass.
 */

import { strict as assert } from 'assert';
import { PackDraft, scoreCard, DRAFT_PERSONAS } from '../src/draft/PackDraft.js';
import { describeAppetite, recipientThreats, isCoveted } from '../src/draft/DraftSignals.js';
import { CHARACTER_CARDS, SPELL_CARDS, CARD_TYPES, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const FLAT = { next: () => 0 };
const seatWith = (personaId, pool = []) => ({
  id: personaId, persona: DRAFT_PERSONAS.find(p => p.id === personaId), pool, isAI: true,
  icon: '🤖', name: personaId,
});

describe('The pack passes to a known seat', () => {
  test('nextRecipientSeat matches where the pack actually lands', () => {
    // Round 0 is even (passes left → seat 1); verify against the real rotation
    const d = new PackDraft('recip-seed');
    const recipient = d.nextRecipientSeat();
    assert.ok(recipient && recipient.isAI, 'an AI receives it');
    assert.equal(recipient, d.seats[1], 'even round → seat 1');

    const pack = d.getPlayerPack();
    const pickId = pack[0].id;
    const leftover = pack.slice(1).map(c => c.id).sort();
    d.playerPick(pickId);
    // After the pick+rotation, the recipient holds the player's leftover pack
    const landed = d.seats[1].pool; // no — pool is picks; the PACK is in d.packs
    const nowHeld = d.packs[1].map(c => c.id).sort();
    assert.deepEqual(nowHeld, leftover, 'the passed pack is the player\'s leftover');
    assert.ok(landed !== undefined);
  });

  test('odd rounds pass the other way, to the last seat', () => {
    const d = new PackDraft('recip-seed-2');
    // Drain round 0 so we land on round 1 (odd)
    let guard = 0;
    while (d.round === 0 && guard++ < 20) d.playerPick(d.getPlayerPack()[0].id);
    if (d.finished) return;
    assert.equal(d.passDirection(), -1, 'round 1 passes right');
    assert.equal(d.nextRecipientSeat(), d.seats[d.seats.length - 1], 'odd round → last seat');
  });

  test('a finished draft has no recipient', () => {
    const d = new PackDraft('short');
    let guard = 0;
    while (!d.finished && guard++ < 200) {
      const pack = d.getPlayerPack();
      if (!pack || !pack.length) break;
      d.playerPick(pack[0].id);
    }
    assert.equal(d.nextRecipientSeat(), null);
  });
});

describe('Appetites read the persona and the pool', () => {
  test('a bodyless rival is urgently hunting a hero', () => {
    const a = describeAppetite(seatWith('warlord', []));
    assert.ok(a.urgent);
    assert.ok(/hero/i.test(a.text));
  });

  test('the Archmage reads as spell-hungry, more so with a wizard', () => {
    const noWiz = describeAppetite(seatWith('archmage', [byClass('fighter')]));
    assert.ok(/spell|caster/i.test(noWiz.text), noWiz.text);

    const withWiz = describeAppetite(seatWith('archmage', [byClass('wizard')]));
    assert.ok(/spell/i.test(withWiz.text) && /wizard|burn/i.test(withWiz.text), withWiz.text);
  });

  test('a healerless band of two flags the gap', () => {
    const a = describeAppetite(seatWith('warlord', [byClass('fighter'), byClass('rogue')]));
    assert.ok(/healer/i.test(a.text), a.text);
  });

  test('appetite never throws and always returns text', () => {
    for (const p of DRAFT_PERSONAS) {
      for (const pool of [[], [byClass('fighter')], CHARACTER_CARDS.slice(0, 5)]) {
        const a = describeAppetite(seatWith(p.id, pool));
        assert.ok(typeof a.text === 'string' && a.text.length > 0);
      }
    }
  });
});

describe('Coveted cards are the recipient\'s real top picks', () => {
  test('the flagged cards are exactly what the recipient would draft', () => {
    const d = new PackDraft('covet-seed');
    const threats = recipientThreats(d);
    assert.ok(threats && threats.cardIds.size >= 1, 'something is at stake');
    assert.equal(threats.seat, d.seats[1], 'the round-0 recipient');

    // The single highest-scoring card (flat rng) must be flagged
    const pack = d.getPlayerPack();
    const ranked = pack
      .map(c => ({ id: c.id, s: scoreCard(c, threats.seat.persona, threats.seat.pool, FLAT) }))
      .sort((a, b) => b.s - a.s);
    assert.ok(threats.cardIds.has(ranked[0].id), 'the recipient\'s #1 is flagged');
    assert.ok(isCoveted(threats, ranked[0].id));
    // A clearly-worst card should not be flagged
    assert.ok(!threats.cardIds.has(ranked[ranked.length - 1].id), 'the dregs are not');
  });

  test('the Warlord covets a greatsword over a spell scroll', () => {
    // Hand-built pack so the prediction is unambiguous
    const pack = [
      { ...(CHARACTER_CARDS.find(c => c.id === 'char-brand')) },
      SPELL_CARDS.find(s => s.id === 'sp-firebolt'),
      { id: 'eq-greatsword', type: CARD_TYPES.EQUIPMENT, name: 'Greatsword', icon: '🗡️', bonus: { attack: 3 }, bestFor: CLASSES.FIGHTER },
    ];
    const warlord = seatWith('warlord', [byClass('fighter')]);
    const fakeDraft = {
      nextRecipientSeat: () => warlord,
      getPlayerPack: () => pack,
    };
    const threats = recipientThreats(fakeDraft);
    // The Warlord (fighters/weapons) should not covet the lone firebolt
    assert.ok(!threats.cardIds.has('sp-firebolt'), 'the Warlord passes the scroll');
    assert.ok(threats.cardIds.has('eq-greatsword') || threats.cardIds.has('char-brand'),
      'it wants the steel or the body');
  });

  test('no threats when the pack is down to one card', () => {
    const warlord = seatWith('warlord', []);
    const one = recipientThreats({ nextRecipientSeat: () => warlord, getPlayerPack: () => [SPELL_CARDS[0]] });
    assert.equal(one, null);
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
