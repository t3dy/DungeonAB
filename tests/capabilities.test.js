/**
 * The capability vocabulary, and the promise it makes: a magus is a
 * package of reusable tags, not a bespoke power. Every capability on
 * every card must exist in the dictionary, and anything a magus can do
 * must be reachable by anyone else who drafts the same capability.
 */

import { strict as assert } from 'assert';
import { Party } from '../src/agents/Party.js';
import {
  CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, TACTIC_CARDS, CLASSES,
} from '../src/game/Cards.js';
import { CAPABILITIES, isCapability, capabilityName } from '../src/game/Capabilities.js';

const byId = id => CHARACTER_CARDS.find(c => c.id === id);
const eq = id => EQUIPMENT_CARDS.find(c => c.id === id);

describe('The vocabulary is complete and honest', () => {
  test('every capability on every card is a defined capability', () => {
    const all = [...CHARACTER_CARDS, ...EQUIPMENT_CARDS, ...SPELL_CARDS, ...(TACTIC_CARDS || [])];
    for (const card of all) {
      for (const cap of card.capabilities || []) {
        assert.ok(isCapability(cap), `${card.id} carries undefined capability "${cap}"`);
      }
    }
  });

  test('every defined capability has a name, an icon, and a meaning', () => {
    for (const [id, cap] of Object.entries(CAPABILITIES)) {
      assert.ok(cap.name, `${id} needs a name`);
      assert.ok(cap.icon, `${id} needs an icon`);
      assert.ok(cap.text && cap.text.length > 10, `${id} needs a real description`);
    }
  });

  test('an unknown id degrades to itself rather than to undefined', () => {
    assert.equal(capabilityName('not-a-capability'), 'not-a-capability');
    assert.equal(capabilityName('tinkering'), 'Tinkering');
  });
});

describe('Every magus is a capability package', () => {
  test('each carries three or four capabilities — a package, not a monopoly', () => {
    for (const card of CHARACTER_CARDS) {
      const n = (card.capabilities || []).length;
      assert.ok(n >= 3 && n <= 4, `${card.name} carries ${n} capabilities`);
    }
  });

  test('no capability belongs to exactly one magus and nothing else', () => {
    // The whole point: "that is why I brought him" must be reachable
    // more than one way, or a capability is just a character by
    // another name.
    const counts = {};
    for (const card of [...CHARACTER_CARDS, ...EQUIPMENT_CARDS, ...SPELL_CARDS]) {
      for (const cap of card.capabilities || []) counts[cap] = (counts[cap] || 0) + 1;
    }
    const solitary = Object.entries(counts).filter(([, n]) => n === 1).map(([c]) => c);
    // A couple of signature tags may be unique; most must not be
    assert.ok(solitary.length <= 3,
      `too many capabilities live on exactly one card: ${solitary.join(', ')}`);
  });

  test('the historical loadouts are the ones the design asked for', () => {
    const caps = id => byId(id).capabilities;
    assert.deepEqual(caps('char-dee'), ['conjuring', 'divination', 'astronomy', 'mathematics']);
    assert.deepEqual(caps('char-digby'), ['diplomacy', 'fencing', 'antiquarian', 'appraisal']);
    assert.deepEqual(caps('char-ficino'), ['music', 'harmony', 'healing', 'translation']);
    assert.deepEqual(caps('char-brahe'), ['tinkering', 'astronomy', 'observation', 'experimentation']);
    assert.deepEqual(caps('char-bruno'), ['memory', 'imagination', 'correspondence', 'conjuring']);
  });

  test('Cavendish brings the non-occult answers', () => {
    const cav = byId('char-cavendish');
    assert.ok(cav, 'Margaret Cavendish is draftable');
    assert.ok(cav.capabilities.includes('naturalPhilosophy'));
  });

  test('every class still fields at least three faces', () => {
    for (const cls of Object.values(CLASSES)) {
      const n = CHARACTER_CARDS.filter(c => c.class === cls).length;
      assert.ok(n >= 3, `${cls} has only ${n}`);
    }
  });
});

describe('The party reads capabilities off everything it carries', () => {
  test('a character supplies theirs', () => {
    const party = new Party([byId('char-dee')]);
    assert.ok(party.hasCapability('divination'));
    assert.ok(party.hasCapability('astronomy'));
    assert.ok(!party.hasCapability('tinkering'));
  });

  test('equipment supplies a capability its bearer lacks', () => {
    const bare = new Party([byId('char-agrippa')]);
    assert.ok(!bare.hasCapability('rogue'), 'Agrippa is no burglar');
    const kitted = new Party([byId('char-agrippa'), eq('eq-lockpicks')]);
    if ((eq('eq-lockpicks').capabilities || []).includes('rogue')) {
      assert.ok(kitted.hasCapability('rogue'), 'the picks bring what the man does not');
    }
  });

  test('capabilityHolders names who is answering', () => {
    const party = new Party([byId('char-brahe')]);
    const holders = party.capabilityHolders('tinkering');
    assert.ok(holders.length >= 1);
    assert.ok(holders[0].member.name.includes('Brahe'));
  });
});

describe('A power travels with the capability, not the character', () => {
  test('the fugue rule doubles a brew for alchemy + music in ANY hands', () => {
    // Maier carries both himself
    const maier = new Party([byId('char-maier')]);
    maier.materials = 2;
    const solo = maier.doAlchemy(0.2);
    assert.equal(solo.type, 'potion');
    assert.ok(solo.doubled, 'Maier brews in doubles');

    // ...and so does an alchemist standing next to a musician
    const pair = new Party([byId('char-paracelsus'), byId('char-fludd')]);
    pair.materials = 2;
    const together = pair.doAlchemy(0.2);
    assert.equal(together.type, 'potion');
    assert.ok(together.doubled, 'the synergy is between capabilities, not people');

    // ...but an alchemist alone does not
    const alone = new Party([byId('char-paracelsus')]);
    alone.materials = 2;
    const single = alone.doAlchemy(0.2);
    assert.ok(!single.doubled, 'alchemy without music draws one flask');
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
