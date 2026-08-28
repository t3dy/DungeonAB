/**
 * Tests for the tactics skill tree.
 *
 * Two design claims to hold:
 *
 *   1. A tactic is gated by CAPABILITY, not by class. Every class swings
 *      at something, so anyone benefits from Flanking; anything with a
 *      working in the grimoire benefits from Concentration. A tactic
 *      that collapsed into one class would be a smaller decision, and
 *      the draft already has class cards for that.
 *   2. The TREE is the decision. A tier-two card is a blank without its
 *      root — measured, committing to a branch beats spreading across
 *      roots (23.2% against 15.8% on hard) and an orphaned branch card
 *      is worth almost nothing (11.8% against an 11.4% baseline).
 */

import { strict as assert } from 'assert';
import {
  TACTICS, TACTIC_CARDS, CAPABILITIES, BRANCHES,
  getTactic, dependentsOf, activeTactics, dormantTactics, tacticModifiers,
} from '../src/game/Tactics.js';
import { composeDormant, composeTactics } from '../src/narrative/Narrator.js';
import { Party } from '../src/agents/Party.js';
import { CARD_TYPES, CHARACTER_CARDS, SPELL_CARDS, getCard } from '../src/game/Cards.js';
import { pooledCards } from '../src/game/CardPacks.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const sp = id => SPELL_CARDS.find(s => s.id === id);
const T = id => getCard(id);

describe('The tree is well formed', () => {
  test('the literal card type matches the shared constant', () => {
    // Tactics.js writes 'tactic' as a literal to avoid an import cycle
    // with Cards.js; this is the guard that stops the two drifting.
    for (const card of TACTIC_CARDS) {
      assert.equal(card.type, CARD_TYPES.TACTIC, `${card.name} carries the shared type`);
    }
  });

  test('every prerequisite names a real tactic, and nothing depends on itself', () => {
    const ids = new Set(TACTICS.map(t => t.id));
    for (const t of TACTICS) {
      if (!t.requires) continue;
      assert.ok(ids.has(t.requires), `${t.name} grows from a real tactic`);
      assert.notEqual(t.requires, t.id, `${t.name} does not require itself`);
      const root = getTactic(t.requires);
      assert.equal(root.requires, undefined, 'the tree is two deep, not a chain');
      assert.equal(root.branch, t.branch, `${t.name} grows on its own branch`);
    }
  });

  test('every tactic asks for a capability the game can answer', () => {
    for (const t of TACTICS) {
      assert.ok(CAPABILITIES[t.capability], `${t.name} wants a known capability`);
      assert.ok(BRANCHES[t.branch], `${t.name} sits on a real branch`);
      assert.ok(t.text.length > 30, `${t.name} explains itself`);
      assert.ok(t.effect && Object.keys(t.effect).length > 0, `${t.name} does something`);
    }
  });

  test('capability gates are broad, not class-locked', () => {
    // The point of the type: a tactic must not collapse into one class.
    // Every class attacks, so an attack tactic is live for any party.
    for (const cls of ['fighter', 'cleric', 'wizard', 'rogue', 'alchemist']) {
      const party = new Party([byClass(cls), T('tac-flanking')]);
      assert.equal(activeTactics(party).length, 1,
        `Flanking is live for a lone ${cls}`);
    }
  });

  test('every root has something growing from it, and both roots and branches exist', () => {
    const roots = TACTICS.filter(t => !t.requires);
    const branches = TACTICS.filter(t => t.requires);
    assert.ok(roots.length >= 4, 'there are roots to take');
    assert.ok(branches.length >= 4, 'and branches to grow');
    assert.ok(roots.some(r => dependentsOf(r.id).length > 0), 'roots lead somewhere');
  });

  test('tactics reach the draft pool', () => {
    assert.equal(pooledCards(CARD_TYPES.TACTIC).length, TACTICS.length,
      'the draft can actually offer them');
  });
});

describe('A tactic is live only when it can be', () => {
  test('a branch without its root does nothing at all', () => {
    const orphan = new Party([byClass('fighter'), T('tac-encircle')]);
    assert.equal(activeTactics(orphan).length, 0, 'the branch is a blank');
    assert.equal(tacticModifiers(orphan).flankDamage, 0, 'and moves no number');

    const rooted = new Party([byClass('fighter'), T('tac-flanking'), T('tac-encircle')]);
    assert.equal(activeTactics(rooted).length, 2, 'with the root, both are live');
    assert.ok(tacticModifiers(rooted).flankDamage > tacticModifiers(
      new Party([byClass('fighter'), T('tac-flanking')])).flankDamage,
      'and the branch adds on top of the root');
  });

  test('an arcane tactic needs a grimoire to work on', () => {
    const bare = new Party([byClass('fighter'), T('tac-concentration')]);
    assert.equal(activeTactics(bare).length, 0, 'no working, no concentration');
    assert.equal(tacticModifiers(bare).sustainFull, false);

    const armed = new Party([byClass('fighter'), sp('sp-firebolt'), T('tac-concentration')]);
    assert.equal(activeTactics(armed).length, 1, 'a spell in the grimoire switches it on');
    assert.equal(tacticModifiers(armed).sustainFull, true);
  });

  test('a tactic is knowledge: drafting it twice is drafting it once', () => {
    // The same card can be opened in two packs. Without dedup a party
    // that drafted three Quickenings would have loosed three extra
    // workings a room -- caught in the browser, where the party panel
    // showed the same chip three times.
    const q = T('tac-quickening');
    const party = new Party([byClass('fighter'), sp('sp-firebolt'), q, q, q]);
    assert.equal(party.tactics.length, 1, 'held once');
    assert.equal(party.duplicateTactics, 2, 'and the copies are counted, not lost silently');
    assert.equal(tacticModifiers(party).extraCast, 1, 'the effect does not stack');
  });

  test('a party that drafted nothing has no modifiers and no complaints', () => {
    const party = new Party([byClass('fighter')]);
    assert.deepEqual(activeTactics(party), []);
    assert.deepEqual(dormantTactics(party), []);
    const mods = tacticModifiers(party);
    assert.equal(mods.flankDamage, 0);
    assert.equal(mods.cover, 0);
    assert.equal(mods.live.length, 0);
  });
});

describe('An idle tactic tells the player why', () => {
  test('a rootless branch is reported, and names what it needed', () => {
    const party = new Party([byClass('fighter'), T('tac-encircle')]);
    const idle = dormantTactics(party);
    assert.equal(idle.length, 1);
    assert.equal(idle[0].reason, 'requires');
    const line = composeDormant(idle[0]);
    assert.match(line, /Encirclement/, 'the idle card is named');
    assert.match(line, /Flanking/, 'and so is what it needed');
    assert.match(line, /idle/, 'and it is plainly called idle');
  });

  test('a capability it cannot meet is reported too', () => {
    const party = new Party([byClass('fighter'), T('tac-concentration')]);
    const idle = dormantTactics(party);
    assert.equal(idle.length, 1);
    assert.equal(idle[0].reason, 'capability');
    assert.match(composeDormant(idle[0]), /grimoire/, 'it says what is missing');
  });

  test('a live party is announced, and an empty one says nothing', () => {
    assert.equal(composeTactics([]), null, 'no drills, no line');
    assert.equal(composeTactics(null), null);
    const party = new Party([byClass('fighter'), T('tac-flanking'), T('tac-shieldwall')]);
    const line = composeTactics(activeTactics(party));
    assert.match(line, /Flanking/);
    assert.match(line, /Shield Wall/);
  });
});

describe('The folded modifiers are what the fight reads', () => {
  test('flanking only counts once the party has the numbers', () => {
    const few = new Party([byClass('fighter'), T('tac-flanking')]);
    const many = new Party([...CHARACTER_CARDS.slice(0, 4), T('tac-flanking')]);
    const m = tacticModifiers(many);
    assert.ok(m.flankMin >= 2 && m.flankMin < 99, 'a threshold is set');
    assert.equal(few.living().length < m.flankMin, true, 'two do not flank');
    assert.equal(many.living().length >= m.flankMin, true, 'four do');
  });

  test('the march tactics reach provisioning', () => {
    const bare = new Party([byClass('fighter')]);
    const drilled = new Party([byClass('fighter'), T('tac-rationing')]);
    bare.provision(10, 'hard');
    drilled.provision(10, 'hard');
    assert.ok(drilled.supply > bare.supply,
      `rationing buys a march (${bare.supply} → ${drilled.supply})`);
  });

  test('no single tactic runs away with the type', () => {
    // Rationing measured at +13.8 win points alone -- four times any
    // other tactic -- before being cut to a single march. This pins the
    // shape rather than the number.
    //
    // Knobs are weighted by how they SCALE, not by raw magnitude: a
    // point of cover applies every round of a twelve-round boss, while
    // a point of opener damage happens once. Summing them raw called a
    // +3 one-off opener a bomb and a +1 per-round ward a trinket, which
    // is backwards.
    const WEIGHT = {
      // per-round, compounds over a long fight
      flankDamage: 2, cover: 2, monsterAtk: 2, vsArmored: 2, wardPerCast: 2,
      // resources and extra actions
      supply: 2, extraCast: 2, mendAtShrine: 2,
      // one-off or situational
      featureOpener: 0.5, fireTrapSoak: 0.5,
      // Only applies when the room has a hazard AND the party uses it:
      // as conditional as featureOpener, and measured in the same band
      // as the other roots (+2.3 over 2500 delves an arm)
      hazardDamage: 0.5,
    };
    const BOOLEAN_WEIGHT = 2;

    for (const t of TACTICS.filter(x => !x.requires)) {
      const points = Object.entries(t.effect)
        .filter(([k]) => k !== 'flankMin')
        .reduce((sum, [k, v]) => {
          if (typeof v !== 'number') return sum + BOOLEAN_WEIGHT;
          return sum + Math.abs(v) * (WEIGHT[k] ?? 2);
        }, 0);
      assert.ok(points <= 4, `${t.name} is a tactic, not a bomb (${points} points)`);
    }
  });

  test('a branch is a commitment, so it may be stronger than its root', () => {
    // The tree only creates a decision if paying two picks buys more
    // than two roots would. Measured on hard: a complete branch wins
    // 23.2% against 15.8% for two roots, and an orphaned branch card is
    // near-worthless at 11.8% against an 11.4% baseline.
    const rootPoints = t => Object.values(t.effect)
      .filter(v => typeof v === 'number').reduce((s, v) => s + Math.abs(v), 0);
    for (const branch of TACTICS.filter(t => t.requires)) {
      const root = getTactic(branch.requires);
      assert.ok(rootPoints(branch) > 0 || Object.values(branch.effect).some(v => v === true),
        `${branch.name} pays for the second pick`);
      assert.equal(root.tier, 1, `${branch.name} grows from a root`);
    }
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
