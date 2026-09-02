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
import { allEncounters } from '../src/encounters/EncounterEngine.js';
import '../src/encounters/Encounters.js';

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

  /*
   * No capability sits on more than two magi, and no kit card duplicates
   * one another's.
   *
   * This replaced a set of pinned per-magus loadouts, and it is the rule
   * those loadouts were an instance of. Measured, the pinned version had
   * every capability on four or five of the sixteen: a drafted party held
   * a median 19 of 28, `knowledge` was on 99% of parties, and an option
   * 99% of parties can take is flavour rather than a decision — so the
   * dungeon could not tell a good draft from a bad one at any difficulty
   * (DESIGN_DIALOGUE.md §N). Capping ownership put 23 of the 28 into the
   * 40-70% band, where drafting one is a real choice.
   *
   * The cost was taking documented attributes off real people: Dee keeps
   * the scrying and loses astronomy to Brahe and Forman, who have the
   * better claim on it in this pool. A tag now marks who you would
   * definitively ask, not everyone who was competent.
   */
  test('no capability is common enough to stop being a decision', () => {
    const byCap = {};
    for (const c of CHARACTER_CARDS) {
      for (const k of c.capabilities || []) (byCap[k] = byCap[k] || []).push(c.id);
    }
    // Alchemy carries three because three cards' printed text promises
    // brewing — Paracelsus brews at any bench, Cortese's recipes work,
    // and Maier draws "two flasks where others draw one", which is the
    // fugue rule and needs alchemy AND music in the same pair of hands.
    // A promise on a card is a contract with the player; the cap is a
    // heuristic for scarcity, and the contract outranks it.
    const ALLOWED = { alchemy: 3 };
    for (const [cap, owners] of Object.entries(byCap)) {
      const max = ALLOWED[cap] || 2;
      assert.ok(owners.length <= max,
        `${cap} is on ${owners.length} magi (${owners.join(', ')}) — max ${max}`);
    }
    const byKit = {};
    for (const e of EQUIPMENT_CARDS) {
      for (const k of e.capabilities || []) (byKit[k] = byKit[k] || []).push(e.id);
    }
    for (const [cap, items] of Object.entries(byKit)) {
      assert.ok(items.length <= 1,
        `${cap} is on ${items.length} items (${items.join(', ')}) — kit patches a gap, it does not top up`);
    }
  });

  test('every magus is still a recognisable specialist', () => {
    for (const c of CHARACTER_CARDS) {
      const n = (c.capabilities || []).length;
      assert.ok(n >= 3 && n <= 4, `${c.name} carries ${n} capabilities, wanted 3-4`);
    }
    // The signatures each figure is least replaceable for
    const has = (id, cap) => byId(id).capabilities.includes(cap);
    assert.ok(has('char-dee', 'divination'), 'Dee still scries');
    assert.ok(has('char-brahe', 'astronomy'), 'Brahe still observes the heavens');
    assert.ok(has('char-paracelsus', 'alchemy'), 'Paracelsus still works the bench');
    assert.ok(has('char-bruno', 'memory'), 'Bruno still holds the memory palace');
    assert.ok(has('char-pico', 'syncretism'), 'Pico still reconciles the traditions');
    assert.ok(has('char-cavendish', 'naturalPhilosophy'), 'Cavendish still answers without the occult');
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

describe('Every capability can answer something', () => {
  test('no capability in the vocabulary goes unasked by every encounter', () => {
    // A tag nothing ever asks for is a line on a card that never pays
    // (v6 §22: every meaningful investment should eventually have an
    // opportunity to answer a question). This is the guard that turns a
    // dead capability into a failing test rather than a quiet dead end.
    const asked = new Set();
    for (const def of allEncounters()) {
      for (const opt of def.options) {
        for (const cap of opt.requires || []) asked.add(cap);
      }
    }
    const never = Object.keys(CAPABILITIES).filter(c => !asked.has(c));
    assert.deepEqual(never, [],
      `nothing in the game asks for: ${never.join(', ')}`);
  });

  test('every capability an encounter asks for is one a card can supply', () => {
    const suppliable = new Set(
      [...CHARACTER_CARDS, ...EQUIPMENT_CARDS, ...SPELL_CARDS]
        .flatMap(c => c.capabilities || []));
    for (const def of allEncounters()) {
      for (const opt of def.options) {
        for (const cap of opt.requires || []) {
          assert.ok(suppliable.has(cap),
            `${def.id}/${opt.id} asks for "${cap}", which no card grants`);
        }
      }
    }
  });
});

describe('The party reads capabilities off everything it carries', () => {
  test('a character supplies theirs', () => {
    const party = new Party([byId('char-dee')]);
    assert.ok(party.hasCapability('divination'));
    assert.ok(party.hasCapability('mathematics'));
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
