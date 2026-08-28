/**
 * Coverage tests for the attrition writing.
 *
 * Standing rule 6: the story panel is a product surface. Every state
 * these two clocks can put the player in must have prose, that prose
 * must carry the number the player needs to act on, and a delve that
 * fires the same beat five times must not print the same sentence five
 * times.
 */

import { strict as assert } from 'assert';
import { composeSupply, composeWound, composeMend } from '../src/narrative/Narrator.js';
import { Party, DARK_TOLL } from '../src/agents/Party.js';
import { Adventurer, WOUND_THRESHOLD } from '../src/agents/Adventurer.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const sp = id => SPELL_CARDS.find(s => s.id === id);

/* Every kind Party.burnSupply can return */
const SUPPLY_KINDS = ['low', 'guttered', 'conjured', 'dark-seen', 'dark'];

describe('Every state of the supply clock has writing', () => {
  test('each kind composes a line, and none of them is empty', () => {
    for (const kind of SUPPLY_KINDS) {
      const note = {
        kind, supply: 2, damage: DARK_TOLL, full: DARK_TOLL, darkMarches: 1,
        source: 'Dancing Light',
      };
      const line = composeSupply(note);
      assert.ok(line, `${kind} has prose`);
      assert.ok(line.length > 20, `${kind} says something (${line})`);
      assert.match(line, /^\p{Emoji}/u, `${kind} opens with its glyph`);
    }
  });

  test('a quiet march says nothing at all', () => {
    assert.equal(composeSupply(null), null, 'no note, no line');
    assert.equal(composeSupply({ kind: 'nonsense' }), null, 'unknown kinds stay silent');
  });

  test('the lines carry the number the player has to act on', () => {
    assert.match(composeSupply({ kind: 'low', supply: 1 }), /\b1\b/, 'oil remaining');
    assert.match(composeSupply({ kind: 'low', supply: 1 }), /march\b/, 'and singular for one');
    assert.match(composeSupply({ kind: 'low', supply: 2 }), /marches/, 'plural for more');
    assert.match(composeSupply({ kind: 'dark', damage: DARK_TOLL, darkMarches: 1 }),
      new RegExp(`\\b${DARK_TOLL}\\b`), 'the toll is named');
  });

  test('the light cards name what saved the march, and what it was worth', () => {
    // Both cards spare the toll outright, so the prose has to show the
    // damage that did NOT happen -- otherwise the pick reads as if it
    // did nothing at all.
    const conjured = composeSupply({ kind: 'conjured', source: 'Dancing Light', full: DARK_TOLL });
    assert.match(conjured, /Dancing Light/, 'credit where it is due');

    // Across the variants, the toll spared is stated at least sometimes,
    // and no variant ever claims damage was taken
    const seen = new Set();
    for (let i = 0; i < 60; i++) {
      seen.add(composeSupply({ kind: 'conjured', source: 'Dancing Light', full: DARK_TOLL }));
      seen.add(composeSupply({ kind: 'dark-seen', full: DARK_TOLL }));
    }
    const quantified = [...seen].filter(l => new RegExp(`\\b${DARK_TOLL}\\b`).test(l));
    assert.ok(quantified.length >= 2,
      'the damage avoided is named in more than one variant');
    for (const l of seen) {
      assert.doesNotMatch(l, /damage to everyone|pays for it/,
        `a spared march never reads as a paid one (${l})`);
    }
  });

  test('the dark escalates instead of repeating itself', () => {
    const lines = [1, 2, 3, 4].map(n =>
      composeSupply({ kind: 'dark', damage: DARK_TOLL, darkMarches: n }));
    assert.equal(new Set(lines).size, 4, 'four benighted marches read four ways');
    for (const l of lines) {
      assert.match(l, new RegExp(`\\b${DARK_TOLL}\\b`), 'and every one still states the cost');
    }
    // Past the written escalation it holds at the last, worst line
    const far = composeSupply({ kind: 'dark', damage: DARK_TOLL, darkMarches: 9 });
    assert.equal(far, lines[3], 'a long dark stays at its bleakest');
  });

  test('the repeatable beats have more than one way of being said', () => {
    for (const kind of ['low', 'guttered', 'conjured', 'dark-seen']) {
      const seen = new Set();
      for (let i = 0; i < 60; i++) {
        seen.add(composeSupply({ kind, supply: 2, source: 'Dancing Light', damage: 2, full: 3 }));
      }
      assert.ok(seen.size > 1, `${kind} does not repeat one sentence (${seen.size} variants)`);
    }
  });
});

describe('The Chronicle carries news, not steady state', () => {
  test('a covered march is announced once, then goes quiet', () => {
    // A party holding Dancing Light is out of oil for the rest of the
    // delve. Printing "the dark takes nothing" on every remaining march
    // buries the lines that do matter.
    const party = new Party([byClass('fighter'), sp('sp-light')]);
    party.provision(2, 'medium');
    while (party.supply > 0) party.restStep();

    const first = party.restStep();
    assert.equal(first?.kind, 'conjured', 'the first covered march is news');
    for (let i = 0; i < 5; i++) {
      assert.equal(party.restStep(), null, 'and the rest are not');
    }
  });

  test('an unmitigated dark reports every march, because it costs every march', () => {
    const party = new Party([byClass('fighter'), byClass('rogue')]);
    party.provision(2, 'medium');
    while (party.supply > 0) party.restStep();

    const lines = [];
    for (let i = 0; i < 4; i++) {
      const note = party.restStep();
      assert.equal(note.kind, 'dark', 'every benighted march is reported');
      assert.equal(note.damage, DARK_TOLL, 'and states its cost');
      lines.push(composeSupply(note));
    }
    assert.equal(new Set(lines).size, 4, 'and reads differently as it wears on');
  });
});

describe('A wound is told to the player, not just to the health bar', () => {
  const wounded = (n = 1) => {
    const m = new Adventurer(CHARACTER_CARDS.find(c => c.class === 'fighter'));
    for (let i = 0; i < n; i++) m.takeDamage(Math.ceil(m.maxHealth * WOUND_THRESHOLD));
    m.heal(999);
    return m;
  };

  test('the line names who, and the ceiling they are stuck with', () => {
    const m = wounded();
    const line = composeWound(m);
    assert.match(line, new RegExp(m.name), 'the wounded is named');
    assert.match(line, new RegExp(`\\b${m.effectiveMax()}\\b`), 'and the new ceiling is stated');
    // However it is phrased, the player must learn how long it lasts
    assert.match(line, /town|rest of the delve/, 'and how long they are stuck with it');
  });

  test('a second wound reads differently from the first, and counts them', () => {
    const once = new Set();
    const twice = new Set();
    for (let i = 0; i < 40; i++) {
      once.add(composeWound(wounded(1)));
      twice.add(composeWound(wounded(2)));
    }
    assert.ok(once.size > 1, 'the first wound has variants');
    assert.ok(twice.size > 1, 'so does the second');
    for (const l of twice) assert.match(l, /\b2\b/, 'a repeat wound says how many there are now');
    assert.equal([...once].filter(l => twice.has(l)).length, 0,
      'and the two cases never share a sentence');
  });

  test('the surgeon reports the bill, or says nothing', () => {
    assert.equal(composeMend(null), null, 'no news is no line');
    assert.equal(composeMend({ wounds: 0, names: [] }), null, 'an unscarred party is not congratulated');

    const one = composeMend({ wounds: 1, names: ['Brand'] });
    assert.match(one, /Brand/);
    assert.match(one, /1 wound\b/, 'singular reads right');

    const many = composeMend({ wounds: 3, names: ['Brand', 'Ursula', 'Vex'] });
    assert.match(many, /3 wounds/, 'plural reads right');
    assert.match(many, /Brand, Ursula and Vex/, 'and the list is written, not comma-jammed');
  });
});

describe('The Chronicle actually carries it during a delve', () => {
  test('a run in the dark produces supply prose and wound prose', () => {
    const bodies = CHARACTER_CARDS.slice(0, 4);
    const kit = EQUIPMENT_CARDS.slice(0, 4);
    let sawSupply = false, sawWound = false, sawDark = false;
    for (let i = 0; i < 40 && !(sawSupply && sawWound && sawDark); i++) {
      const sim = new Simulator([...bodies, ...kit], `prose-${i}`, 'hard');
      let guard = 0;
      while (!sim.gameOver && guard++ < 400) {
        sim.tick();
        const n = sim.getState().narration;
        if (n?.wounds?.length) sawWound = true;
        if (n?.aside && /oil|dark|lantern|wick|flame/i.test(n.aside)) sawSupply = true;
      }
      if (sim.log.some(l => /dark/i.test(l))) sawDark = true;
    }
    assert.ok(sawSupply, 'the supply clock reaches the Chronicle');
    assert.ok(sawWound, 'and so do wounds');
    assert.ok(sawDark, 'and the log records the dark');
  });

  test('narration carries a wounds array on every room, even a quiet one', () => {
    const sim = new Simulator(CHARACTER_CARDS.slice(0, 4), 'prose-shape', 'easy');
    let guard = 0;
    while (!sim.gameOver && guard++ < 60) {
      sim.tick();
      const n = sim.getState().narration;
      if (n && n.action !== 'linger' && n.action !== 'dark') {
        assert.ok(Array.isArray(n.wounds), 'the field is always there for the UI to map over');
      }
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
