/**
 * Tests for element × room-feature reactions.
 *
 * The premise: a fireball loosed in a room stacked with crates should
 * not politely strike only the monster. The room is made of things,
 * those things are made of stuff, and stuff answers to fire, frost,
 * lightning and light in ways a player can predict before casting.
 *
 * Two invariants matter as much as the numbers:
 *   - a reaction is a TRADE, not a free bonus, and
 *   - every reaction the game can produce has writing.
 */

import { strict as assert } from 'assert';
import {
  REACTIONS, MATTER, REACTIVE_ELEMENTS, reactionsFor, foldReactions,
  isAreaWorking, hasReaction,
} from '../src/world/Reactions.js';
import { FEATURES } from '../src/world/RoomFeatures.js';
import { resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { Party } from '../src/agents/Party.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, SPELL_CARDS } from '../src/game/Cards.js';
import { validateCard, BUDGETS } from '../src/game/CardPacks.js';
import { armsDiffer, trials, partyHealth, partyPool } from './helpers.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const sp = id => SPELL_CARDS.find(s => s.id === id);
const AREA = SPELL_CARDS.filter(s => s.aoe);

const roomWith = (features, monster = {}) => ({
  type: ROOM_TYPES.MONSTER, icon: '👹', features,
  monster: { name: 'a cave troll', attack: 6, health: 80, ...monster },
});

describe('The table is complete and made of real things', () => {
  test('every feature is made of something, and only of known matter', () => {
    const matters = new Set(Object.values(MATTER));
    for (const id of Object.keys(FEATURES)) {
      assert.ok(MATTER[id], `${id} is made of something`);
    }
    for (const [id, m] of Object.entries(MATTER)) {
      assert.ok(FEATURES[id], `${id} is a real feature`);
      assert.ok(matters.has(m), `${m} is a known matter`);
    }
  });

  test('every reaction has writing, and the writing names its cost or gain', () => {
    for (const [element, byMatter] of Object.entries(REACTIONS)) {
      for (const [matter, r] of Object.entries(byMatter)) {
        assert.ok(r.id, `${element}/${matter} has an id`);
        assert.ok(r.icon, `${element}/${matter} has a glyph`);
        const text = r.text('a stone font of still water');
        assert.ok(text.length > 40, `${element}/${matter} says something real`);
        assert.match(text, /[.!]$/, `${element}/${matter} is a finished sentence`);
        // Every reaction moves at least one number the player can feel
        const moves = ['damage', 'burn', 'cover', 'monsterAtk', 'light', 'selfHarm', 'heal']
          .some(k => r[k]) || r.undeadQuelled || r.revealEthereal;
        assert.ok(moves, `${element}/${matter} actually does something`);
      }
    }
  });

  test('each element that reacts has more than one thing to react with', () => {
    for (const el of REACTIVE_ELEMENTS) {
      assert.ok(Object.keys(REACTIONS[el]).length >= 3,
        `${el} reads the room in at least three ways`);
    }
  });

  test('a reaction is a trade, not a free bonus', () => {
    // Anything that consumes a feature, or hands out a big number, must
    // also take something away. Burning the crates costs their cover;
    // dousing the brazier costs the light.
    for (const [element, byMatter] of Object.entries(REACTIONS)) {
      for (const [matter, r] of Object.entries(byMatter)) {
        const gain = (r.damage || 0) + (r.burn || 0) * 3 + (r.heal || 0)
          + Math.max(0, r.cover || 0) * 3 + Math.abs(Math.min(0, r.monsterAtk || 0)) * 2
          + Math.max(0, r.light || 0);
        const cost = (r.selfHarm || 0) * 3 + Math.abs(Math.min(0, r.cover || 0)) * 3
          + Math.abs(Math.min(0, r.light || 0)) + (r.consumes ? 2 : 0);
        if (gain >= 7) {
          assert.ok(cost > 0,
            `${element}/${matter} gains a lot (${gain}) and must give something back`);
        }
      }
    }
  });
});

describe('Only an area working reaches the furniture', () => {
  test('a bolt is a bolt', () => {
    const single = sp('sp-firebolt');
    assert.equal(isAreaWorking(single), false, 'Firebolt is single-target');
    assert.deepEqual(reactionsFor(single, roomWith(['crates'])), [],
      'and it leaves the crates alone');
  });

  test('an area working takes the room with it', () => {
    const rs = reactionsFor(sp('sp-fireball'), roomWith(['crates']));
    assert.equal(rs.length, 1, 'the crates answer');
    assert.equal(rs[0].id, 'blaze');
    assert.match(rs[0].text, /crates/, 'and the prose names what caught');
  });

  test('an elementless working, or a bare room, reacts with nothing', () => {
    assert.deepEqual(reactionsFor({ aoe: true }, roomWith(['crates'])), []);
    assert.deepEqual(reactionsFor(sp('sp-fireball'), roomWith([])), []);
    assert.deepEqual(reactionsFor(sp('sp-fireball'), { type: 'monster' }), []);
    assert.deepEqual(reactionsFor(null, roomWith(['crates'])), []);
  });

  test('every area working in the pool can find something to react with', () => {
    assert.ok(AREA.length >= 4, `the pool has area workings (${AREA.length})`);
    for (const spell of AREA) {
      assert.ok(spell.element, `${spell.name} carries an element`);
      const anywhere = Object.keys(MATTER).some(id => hasReaction(spell.element, MATTER[id]));
      assert.ok(anywhere, `${spell.name} answers to something in the dungeon`);
    }
  });

  test('the new area workings are legal cards inside the budget', () => {
    for (const spell of AREA) {
      assert.deepEqual(validateCard(spell), [], `${spell.name} is a legal card`);
      assert.ok(spell.power <= BUDGETS.spell.maxPower, `${spell.name} is inside the cap`);
    }
  });
});

describe('The fold gives the fight one thing to read', () => {
  test('reactions add up, and name every feature that answered', () => {
    const rs = reactionsFor(sp('sp-fireball'), roomWith(['crates', 'font', 'brazier']));
    assert.equal(rs.length, 3, 'wood, water and flame all answer fire');
    const f = foldReactions(rs);
    assert.ok(f.damage > 0, 'the flare lands');
    assert.ok(f.burn > 0, 'the blaze keeps burning');
    assert.ok(f.light > 0, 'and there is light to march by');
    // Fire spends what it burns: the crates and the brazier's fuel both
    assert.deepEqual(f.consumed.sort(), ['brazier', 'crates'],
      'fire spends what it burns');
    assert.equal(f.notes.length, 3, 'and each one is narrated');
    for (const n of f.notes) assert.ok(n.text && n.source, 'with a source and a line');
  });

  test('an empty fold is harmless', () => {
    const f = foldReactions([]);
    assert.equal(f.damage, 0);
    assert.equal(f.notes.length, 0);
    assert.deepEqual(f.consumed, []);
  });
});

describe('The room actually changes when it reacts', () => {
  test('burning the crates removes them, and the cover with them', () => {
    const party = new Party([byClass('fighter'), byClass('wizard'), sp('sp-fireball')]);
    const room = roomWith(['crates']);
    const result = resolveRoomAction(room, party, 'spell-strike');
    assert.ok(!room.features.includes('crates'), 'the crates burned away');
    assert.ok(result.preps.some(p => /fire takes/i.test(p.text)),
      'and the Chronicle says so');
  });

  test('a blaze is light: it feeds the lamp', () => {
    const party = new Party([byClass('fighter'), sp('sp-fireball')]);
    party.provision(6, 'hard');
    party.supply = 1;
    resolveRoomAction(roomWith(['crates']), party, 'spell-strike');
    assert.ok(party.supply > 1,
      `a burning room is light to march by (${party.supply})`);
  });

  test('dousing the brazier takes light away', () => {
    const party = new Party([byClass('fighter'), sp('sp-hoarfrost')]);
    party.provision(8, 'medium');
    const before = party.supply;
    resolveRoomAction(roomWith(['brazier']), party, 'spell-strike');
    assert.ok(party.supply < before,
      `the room got darker (${before} → ${party.supply})`);
  });

  test('lightning in standing water hurts the party too', () => {
    const party = new Party([byClass('fighter'), byClass('rogue'), sp('sp-chain')]);
    const hp = () => party.members.reduce((s, m) => s + Math.max(0, m.health), 0);
    // Compare against the same fight in a dry room
    const wet = [];
    const dry = [];
    for (let i = 0; i < 30; i++) {
      const a = new Party([byClass('fighter'), byClass('rogue'), sp('sp-chain')]);
      resolveRoomAction(roomWith(['font'], { attack: 1, health: 200 }), a, 'spell-strike');
      wet.push(a.members.reduce((s, m) => s + Math.max(0, m.health), 0));
      const b = new Party([byClass('fighter'), byClass('rogue'), sp('sp-chain')]);
      resolveRoomAction(roomWith(['pillars'], { attack: 1, health: 200 }), b, 'spell-strike');
      dry.push(b.members.reduce((s, m) => s + Math.max(0, m.health), 0));
    }
    const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
    assert.ok(mean(wet) < mean(dry),
      `standing on the floor you electrified costs something (${mean(wet).toFixed(1)} < ${mean(dry).toFixed(1)})`);
  });

  test('steam trades a scald for cover and a half-blind monster', () => {
    // Asserted on the modifiers rather than on a simulated fight. The
    // fight's incoming damage is floored at 1, so against a weak monster
    // *no* mitigation shows up in the totals while the scald still
    // costs -- a stochastic test there measures the damage floor, not
    // the design. Steam is deliberately good against big hitters and bad
    // against chip damage; this pins the trade itself.
    const f = foldReactions(reactionsFor(sp('sp-fireball'), roomWith(['font'])));
    assert.ok(f.cover > 0, 'the fog is something to fight behind');
    assert.ok(f.monsterAtk < 0, 'and the monster cannot see to swing');
    assert.ok(f.selfHarm > 0, 'but a boiling room scalds the party too');
    assert.match(f.notes[0].text, /steam/i, 'and the Chronicle explains the trade');
  });

  test('the monster attack modifier actually reaches the fight', () => {
    // Sized deliberately: hard enough that mitigation clears the
    // `max(1, ...)` damage floor, soft enough that the party survives
    // and totals do not saturate at the health pool. armsDiffer refuses
    // to pass on a fixture outside that band -- an earlier version of
    // this test compared 52.0 against 52.0 (both arms wiped) and would
    // have reported green whatever the mechanic did.
    let pool = 0;
    const hurt = features => trials(40, () => {
      const party = new Party([
        byClass('fighter'), byClass('cleric'), byClass('rogue'), byClass('wizard'),
        sp('sp-hoarfrost'),
      ]);
      pool = partyPool(party);
      const before = partyHealth(party);
      // Formation is pinned: the party now picks one per fight
      // (agents/Formation.js) and a random pick would confound the thing
      // being measured -- a wedge takes a third more damage than a line
      // whatever the room's frost is doing.
      resolveRoomAction(roomWith(features, { attack: 6, health: 400 }), party, 'spell-strike',
        { formation: 'line' });
      return before - partyHealth(party);
    });

    const glazed = hurt(['font']);     // Hoarfrost freezes it: -3 to the monster
    const bare = hurt(['anvil']);      // nothing frost answers
    const { a, b } = armsDiffer(glazed, bare, {
      label: 'a frozen floor against bare stone',
      spread: 2,
      bounds: { min: 0, max: pool },
    });
    assert.ok(a < b, `the glaze costs the monster more than it costs the party (${a.toFixed(1)} < ${b.toFixed(1)})`);
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
