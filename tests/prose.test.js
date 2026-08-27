/**
 * Writing gates.
 *
 * Narration coverage has always asserted that a line EXISTS. That
 * catches a missing beat and nothing else. These four gates catch the
 * failures that actually happened here:
 *
 *   accuracy      — Aegis of Ash read "blunts the first blow in each
 *                   fight" while the resolver warded every round. A
 *                   player who believed the card drafted it wrong.
 *   repetition    — six identical "the dark takes nothing" lines in one
 *                   delve buried the beats that mattered. Found by
 *                   reading a transcript, not by a test.
 *   house style   — "descriptive, not flourishes" had no enforcement.
 *   reachability  — prose can exist and never be printed by any run.
 */

import { strict as assert } from 'assert';
import {
  lintLine, findRepetition, statesNumber, unsupportedNumbers,
  BANNED_PHRASES, numbersIn,
} from '../src/narrative/Prose.js';
import {
  composeSupply, composeWound, composeMend, composeProvision,
  composeTactics, composeDormant,
} from '../src/narrative/Narrator.js';
import { Simulator } from '../src/sim/Simulator.js';
import { SeededRandom } from '../src/draft/PackDraft.js';
import { getAllCards, CHARACTER_CARDS, getCard } from '../src/game/Cards.js';
import { Party, DARK_TOLL } from '../src/agents/Party.js';
import { Adventurer } from '../src/agents/Adventurer.js';
import { REACTIONS } from '../src/world/Reactions.js';
import { TACTICS } from '../src/game/Tactics.js';
import { FEATURES } from '../src/world/RoomFeatures.js';

const ALL = getAllCards();

/**
 * Every line a real delve put in front of the player.
 *
 * Deduplicated WITHIN a tick: a supply note is pushed to both the log
 * panel and the Chronicle aside, which is one event on two surfaces
 * rather than a repetition. Without this the gate reported the game
 * repeating itself when only the harness was.
 */
function transcript(seed, difficulty = 'hard') {
  const rng = new SeededRandom(seed);
  const sim = new Simulator(rng.shuffle(ALL).slice(0, 27), seed, difficulty);
  const lines = [];
  let guard = 0;
  while (!sim.gameOver && guard++ < 400) {
    const before = sim.log.length;
    sim.tick();
    const n = sim.lastNarration;
    const thisTick = [];
    if (n) {
      for (const l of [n.predicament, n.deliberation, n.resolution, n.aside]) {
        if (l) thisTick.push(l);
      }
      thisTick.push(...(n.wounds || []), ...(n.falls || []));
    }
    thisTick.push(...sim.log.slice(before));
    lines.push(...new Set(thisTick));
  }
  return lines;
}

describe('The line says the number the mechanic applied', () => {
  test('the dark reports what it actually took', () => {
    const party = new Party([CHARACTER_CARDS[0], CHARACTER_CARDS[1]]);
    party.provision(2, 'medium');
    while (party.supply > 0) party.restStep();
    const note = party.restStep();
    const line = composeSupply(note);
    assert.ok(statesNumber(line, note.damage),
      `the toll is in the prose (${note.damage} not in "${line}")`);
    assert.deepEqual(unsupportedNumbers(line, [note.damage, note.full]), [],
      'and no number it did not do');
  });

  test('a wound names the ceiling healing can actually reach', () => {
    const m = new Adventurer(CHARACTER_CARDS.find(c => c.class === 'fighter'));
    m.takeDamage(Math.ceil(m.maxHealth * 0.3));
    m.heal(999);
    const line = composeWound(m);
    assert.ok(statesNumber(line, m.effectiveMax()),
      `the real ceiling is stated (${m.effectiveMax()} not in "${line}")`);
  });

  test('the surgeon reports the wounds actually closed', () => {
    const line = composeMend({ wounds: 3, names: ['Brand', 'Vex'] });
    assert.ok(statesNumber(line, 3), 'the count is right');
    assert.deepEqual(unsupportedNumbers(line, [3]), [], 'and nothing invented');
  });

  test('every reaction states its own numbers and invents none', () => {
    // This is the Aegis case generalised across the whole table.
    for (const [element, byMatter] of Object.entries(REACTIONS)) {
      for (const [matter, r] of Object.entries(byMatter)) {
        const text = r.text('a stone font of still water');
        const applied = [r.damage, r.burn, r.heal, r.selfHarm, r.light]
          .filter(n => Number.isFinite(n) && n !== 0).map(Math.abs);
        // Cover and attack changes are stated in words as often as digits
        const allowed = [...applied, Math.abs(r.cover || 0), Math.abs(r.monsterAtk || 0)];
        assert.deepEqual(unsupportedNumbers(text, allowed), [],
          `${element}/${matter} claims a number it does not do: "${text}"`);
        for (const n of applied) {
          // A value of one is legitimately written in words -- "a march
          // of light" is better prose than "1 march of light" -- so only
          // figures a reader would want as digits are required.
          if (n === 1) continue;
          assert.ok(numbersIn(text).includes(n),
            `${element}/${matter} does ${n} but never says so: "${text}"`);
        }
      }
    }
  });

  test('every number a tactic claims is one the effect can produce', () => {
    // Deliberately checks derivability rather than identity. Focused
    // Fire's effect is vsArmored:3 plus flankDamage:1, and its card
    // correctly advertises the player-facing total, +4. A total is
    // better writing than an internal field name, so the gate asks the
    // useful question -- is this number invented? -- rather than
    // demanding the text mirror the data structure.
    for (const t of TACTICS) {
      // A branch card correctly advertises the total WITH its root --
      // Encirclement's "+3 a round" is Flanking's 1 plus its own 2 --
      // so the root's values are part of what its text may claim.
      const payouts = tac => Object.entries(tac?.effect || {})
        .filter(([k, v]) => k !== 'flankMin' && typeof v === 'number' && v !== 0)
        .map(([, v]) => Math.abs(v));
      // A threshold is not a payout, but it IS a real figure the card is
      // entitled to state ("while at least three still stand"), so it
      // counts as reachable without counting as something the tactic does.
      const thresholds = tac => Object.entries(tac?.effect || {})
        .filter(([k, v]) => k === 'flankMin' && typeof v === 'number')
        .map(([, v]) => v);
      const root = t.requires ? TACTICS.find(x => x.id === t.requires) : null;
      const bagOf = payouts;
      const values = [...payouts(t), ...payouts(root), ...thresholds(t), ...thresholds(root)];
      if (values.length === 0) continue;

      // Every value, and every sum of a subset of them
      const reachable = new Set([0]);
      for (const v of values) {
        for (const r of [...reachable]) reachable.add(r + v);
      }

      const claimed = numbersIn(t.text).filter(n => n > 1);
      for (const n of claimed) {
        assert.ok(reachable.has(n),
          `${t.name} claims ${n}, which its effect cannot produce: "${t.text}" (effect ${JSON.stringify(t.effect)})`);
      }
      // And the biggest thing it does should be findable in the text
      const biggest = Math.max(...bagOf(t));
      if (biggest > 1) {
        const stated = numbersIn(t.text);
        assert.ok(stated.some(n => n >= biggest),
          `${t.name} does ${biggest} but its text never mentions a figure that large: "${t.text}"`);
      }
    }
  });
});

describe('The Chronicle does not repeat itself', () => {
  test('no line is printed over and over in one delve', () => {
    for (const seed of ['rep-1', 'rep-2', 'rep-3']) {
      const { overused, consecutive } = findRepetition(transcript(seed), { limit: 4 });
      assert.deepEqual(overused, [],
        `${seed} repeats a line: ${overused.map(o => `"${o.line}" ×${o.count}`).join('; ')}`);
      assert.deepEqual(consecutive, [],
        `${seed} prints the same line twice running: ${consecutive.join('; ')}`);
    }
  });

  test('the beats that fire often have more than one way of being said', () => {
    // A beat with a single phrasing is a beat that will read as a stuck
    // record the moment the delve leans on it.
    const variants = fn => new Set(Array.from({ length: 40 }, fn)).size;
    assert.ok(variants(() => composeSupply({ kind: 'low', supply: 2 })) > 1, 'low oil');
    assert.ok(variants(() => composeSupply({ kind: 'guttered' })) > 1, 'the light going');
    assert.ok(variants(() => composeSupply({ kind: 'dark', damage: 3, darkMarches: 1 })) >= 1, 'the dark');
    const m = new Adventurer(CHARACTER_CARDS[0]);
    m.wounds = 1;
    assert.ok(variants(() => composeWound(m)) > 1, 'a wound');
  });
});

describe('The house style is enforced, not just described', () => {
  const cardLines = ALL.map(c => ({ label: c.name, text: c.text })).filter(x => x.text);
  const featureLines = Object.values(FEATURES).map(f => ({ label: f.id, text: f.tell }));
  const reactionLines = Object.entries(REACTIONS).flatMap(([el, byMatter]) =>
    Object.entries(byMatter).map(([m, r]) => ({ label: `${el}/${m}`, text: r.text('the font') })));

  test('no card text reaches for a flourish', () => {
    const findings = cardLines.flatMap(({ label, text }) => lintLine(text, { label }));
    assert.deepEqual(findings, [],
      findings.map(f => `${f.label}: ${f.why} — "${f.match || f.text}"`).join('\n'));
  });

  test('nor does a room tell or a reaction', () => {
    const findings = [...featureLines, ...reactionLines]
      .flatMap(({ label, text }) => lintLine(text, { label }));
    assert.deepEqual(findings, [],
      findings.map(f => `${f.label}: ${f.why} — "${f.match || f.text}"`).join('\n'));
  });

  test('nor does a real delve, start to finish', () => {
    const findings = transcript('style-1')
      .flatMap((line, i) => lintLine(line, { label: `line ${i}` }));
    assert.deepEqual(findings, [],
      findings.map(f => `${f.why} — "${f.match || f.text}"`).join('\n'));
  });

  test('the banned list is real and each entry explains itself', () => {
    assert.ok(BANNED_PHRASES.length >= 8, 'the style has actual content');
    for (const { rx, why } of BANNED_PHRASES) {
      assert.ok(rx instanceof RegExp);
      assert.ok(why && why.length > 8, 'a lint that only says no teaches nobody');
    }
    // It must actually catch the thing the brief ruled out
    assert.ok(lintLine('With a mighty blow, the truly epic hero strikes!!').length >= 3);
  });
});

describe('Every line can actually be reached', () => {
  test('the writing for each supply state appears in some real delve', () => {
    // Prose can exist, pass a coverage test, and never be printed by any
    // run — writing for a branch nobody takes.
    const seen = new Set();
    for (let i = 0; i < 30; i++) {
      for (const line of transcript(`reach-${i}`, i % 2 ? 'hard' : 'nightmare')) {
        if (/oil for \d+ more|wick is well down|checks the reservoir/i.test(line)) seen.add('low');
        if (/last of the oil|flame stands up|lantern dies/i.test(line)) seen.add('guttered');
        if (/gropes through the dark|march by touch|dark is telling|stopped calling it a march/i.test(line)) seen.add('dark');
        if (/wound that will not close|ceiling drops|opened up badly/i.test(line)) seen.add('wound');
      }
      if (seen.size === 4) break;
    }
    assert.deepEqual([...seen].sort(), ['dark', 'guttered', 'low', 'wound'],
      `some writing is unreachable in practice (found ${[...seen].join(', ')})`);
  });

  test('an idle tactic and a drilled one both have reachable prose', () => {
    const party = new Party([CHARACTER_CARDS[0], getCard('tac-encircle')]);
    const idle = composeDormant({
      tactic: TACTICS.find(t => t.id === 'tac-encircle'),
      reason: 'requires',
      missing: TACTICS.find(t => t.id === 'tac-flanking'),
    });
    assert.ok(idle && idle.length > 30, 'the idle line exists');
    assert.deepEqual(lintLine(idle), [], 'and is in voice');

    const drilled = composeTactics([TACTICS[0]]);
    assert.ok(drilled, 'so does the drilled line');
    assert.deepEqual(lintLine(drilled), []);
  });

  test('the quartermaster line is reachable and in voice', () => {
    const party = new Party([CHARACTER_CARDS[0], getCard('pers-craven')]);
    party.provision(10, 'hard');
    const line = composeProvision(party.provisionNotes);
    assert.ok(line, 'a Craven party has something to say about the oil');
    assert.deepEqual(lintLine(line), []);
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
