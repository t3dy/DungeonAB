/**
 * Tests for dungeon attrition — the two systems that make the march
 * between rooms cost something.
 *
 * Why they exist: measured, a party used to arrive at the throne
 * holding 90% of its health pool after ten rooms. The whole delve was
 * a formality before the boss, which is why every card whose job was to
 * make ordinary rooms safer measured as a dead card
 * (DESIGN_DIALOGUE.md §10).
 *
 *   1. Supply — the lantern burns down on every march. Run dry and the
 *      dark takes its toll, unless the party has an answer to it.
 *   2. Wounds — a blow worth a quarter of a body leaves a scar that
 *      lowers what healing can restore, so damage accumulates across
 *      the delve instead of washing out between rooms.
 */

import { strict as assert } from 'assert';
import {
  Party, STARTING_SUPPLY, DARK_TOLL, SUPPLY_COVERAGE,
} from '../src/agents/Party.js';
import { Adventurer, WOUND_THRESHOLD, WOUND_COST } from '../src/agents/Adventurer.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const eq = id => EQUIPMENT_CARDS.find(e => e.id === id);
const sp = id => SPELL_CARDS.find(s => s.id === id);
const hp = party => party.members.reduce((s, m) => s + Math.max(0, m.health), 0);

describe('The lantern burns down', () => {
  test('every march costs oil, and the party is warned before it runs out', () => {
    const party = new Party([byClass('fighter')]);
    party.provision(6, 'medium');
    const start = party.supply;
    assert.ok(start > 0, 'the quartermaster fills the lamp');

    party.restStep();
    assert.equal(party.supply, start - 1, 'a march costs a unit');

    // Walk it dry and check the guttering is announced exactly once
    let guttered = 0;
    for (let i = 0; i < start + 2; i++) {
      const note = party.restStep();
      if (note?.kind === 'guttered') guttered++;
    }
    assert.equal(guttered, 1, 'the light goes out once, and says so');
    assert.equal(party.supply, 0, 'and stays out');
  });

  test('a lantern makes the oil last twice as long', () => {
    const bare = new Party([byClass('fighter')]);
    const lit = new Party([byClass('fighter'), eq('eq-lantern')]);
    for (const p of [bare, lit]) p.provision(10, 'medium');

    for (let i = 0; i < 6; i++) { bare.restStep(); lit.restStep(); }
    assert.equal(bare.supply, lit.supply - 3,
      `the lantern burns every other march (bare ${bare.supply}, lantern ${lit.supply})`);
  });

  test('walking in the dark costs blood', () => {
    const party = new Party([byClass('fighter'), byClass('rogue')]);
    party.provision(2, 'medium');
    while (party.supply > 0) party.restStep();

    const before = hp(party);
    const note = party.restStep();
    assert.equal(note.kind, 'dark', 'the dark is what happens now');
    assert.ok(hp(party) < before, 'and it hurts');
    assert.equal(before - hp(party), DARK_TOLL * party.living().length,
      'everyone pays the toll');
  });

  test('a conjured light spares the party, and is spent for the room', () => {
    const party = new Party([byClass('fighter'), sp('sp-light')]);
    party.provision(2, 'medium');
    while (party.supply > 0) party.restStep();

    const before = hp(party);
    const note = party.restStep();
    assert.equal(note.kind, 'conjured', 'Dancing Light carries the march');
    assert.equal(hp(party), before, 'and nobody pays the toll');
  });

  test('eyes that read the dark never pay the toll at all', () => {
    const party = new Party([byClass('fighter'), sp('sp-eyes')]);
    party.provision(2, 'medium');
    while (party.supply > 0) party.restStep();

    const before = hp(party);
    for (let i = 0; i < 3; i++) {
      const note = party.restStep();
      assert.equal(note.kind, 'dark-seen', 'the dark is simply readable');
    }
    assert.equal(hp(party), before, 'across march after march');
  });

  test('provisioning scales to the walk, and difficulty decides the dark', () => {
    const marches = 12;
    const supplyFor = d => {
      const p = new Party([byClass('fighter')]);
      return p.provision(marches, d);
    };
    assert.ok(supplyFor('easy') >= marches,
      'easy is never benighted');
    assert.ok(supplyFor('nightmare') < supplyFor('hard'), 'nightmare is tightest');
    assert.ok(supplyFor('hard') < supplyFor('medium'), 'and hard is tighter than medium');
    for (const d of Object.keys(SUPPLY_COVERAGE)) {
      assert.ok(supplyFor(d) >= 2, `${d} always gets a couple of marches`);
    }
  });

  test('found oil tops the lamp up, but the flask has a brim', () => {
    const party = new Party([byClass('fighter')]);
    party.provision(4, 'medium');
    const taken = party.addSupply(3);
    assert.equal(taken, 3, 'oil found is oil carried');
    assert.ok(party.addSupply(999) < 999, 'you cannot carry a lake');
    assert.ok(party.supply <= STARTING_SUPPLY * 3, 'the brim holds');
  });
});

describe('Wounds do not wash out between rooms', () => {
  const dummy = () => new Adventurer(CHARACTER_CARDS.find(c => c.class === 'fighter'));

  test('a heavy blow scars; a scratch does not', () => {
    const scratched = dummy();
    scratched.takeDamage(Math.floor(scratched.maxHealth * WOUND_THRESHOLD) - 1);
    assert.equal(scratched.wounds, 0, 'a glancing hit leaves nothing');

    const scarred = dummy();
    scarred.takeDamage(Math.ceil(scarred.maxHealth * WOUND_THRESHOLD));
    assert.equal(scarred.wounds, 1, 'a real blow leaves a wound');
  });

  test('a wound lowers what healing can reach', () => {
    const m = dummy();
    const full = m.maxHealth;
    m.takeDamage(Math.ceil(full * WOUND_THRESHOLD));
    m.heal(999);
    assert.equal(m.effectiveMax(), full - WOUND_COST, 'the ceiling comes down');
    assert.equal(m.health, full - WOUND_COST, 'and healing stops there');
    assert.ok(m.health < full, 'so full health is no longer available');
  });

  test('the ceiling never falls below a third of the body', () => {
    const m = dummy();
    for (let i = 0; i < 40; i++) m.wounds++;
    assert.equal(m.effectiveMax(), m.woundFloor(), 'the floor holds');
    assert.ok(m.woundFloor() >= Math.ceil(m.maxHealth / 3), 'and it is a third');
  });

  test('town mends what the delve broke', () => {
    const m = dummy();
    m.takeDamage(Math.ceil(m.maxHealth * WOUND_THRESHOLD));
    assert.equal(m.wounds, 1);
    m.mendWounds();
    m.heal(999);
    assert.equal(m.health, m.maxHealth, 'the surgeon sets what the march bandaged');
  });
});

describe('The march actually costs something now', () => {
  test('a party arrives at the throne meaningfully spent', () => {
    // The measurement that motivated all of this: before attrition the
    // party reached the boss at ~90% of its health pool. It should now
    // arrive worn, but still standing often enough to have a fight.
    const bodies = CHARACTER_CARDS.slice(0, 4);
    const kit = EQUIPMENT_CARDS.slice(0, 5);
    let carried = 0, pool = 0, reached = 0;
    const N = 60;
    for (let i = 0; i < N; i++) {
      const sim = new Simulator([...bodies, ...kit], `attr-${i}`, 'hard');
      let guard = 0, atThrone = null;
      while (!sim.gameOver && guard++ < 400) {
        const pre = hp(sim.party);
        sim.tick();
        if (sim.getState().narration?.room === 'boss' && atThrone === null) atThrone = pre;
      }
      if (atThrone !== null) {
        carried += atThrone;
        pool += sim.party.members.reduce((s, m) => s + m.maxHealth, 0);
        reached++;
      }
    }
    assert.ok(reached > N * 0.5, `most parties still reach the throne (${reached}/${N})`);
    const share = carried / pool;
    assert.ok(share < 0.85, `the march is no longer free (arrived at ${(share * 100).toFixed(0)}% of pool)`);
    assert.ok(share > 0.25, `but it is survivable (${(share * 100).toFixed(0)}%)`);
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
