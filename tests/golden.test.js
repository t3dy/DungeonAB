/**
 * Golden chronicles.
 *
 * Each case freezes a seeded delve's whole story — every beat, every
 * ledger line — so that a change to a mechanic or a line shows up as a
 * readable diff in review. Prose changes are easy to make by accident
 * and nearly impossible to spot in a code diff; this is the only test
 * here that would notice a beat quietly getting worse.
 *
 * `npm run bless` rewrites them. Read the diff before you do: a golden
 * re-blessed without being read has stopped testing anything.
 */

import { strict as assert } from 'assert';
import fs from 'fs';
import { CASES, renderCase, goldenPath } from '../tools/bless.mjs';

describe('A seeded delve tells the same story every time', () => {
  test('the same case rendered twice is identical', () => {
    // Combat rolls come from the global Math.random, so a delve is not
    // reproducible on its own; the harness pins it. If this fails, the
    // pinning has sprung a leak and every golden below is noise.
    const once = renderCase(CASES[0]);
    const twice = renderCase(CASES[0]);
    assert.equal(once, twice, 'the seeded harness is deterministic');
  });

  test('pinning Math.random is undone afterwards', () => {
    const before = Math.random;
    renderCase(CASES[0]);
    assert.equal(Math.random, before, 'the real Math.random is restored');
  });

  for (const c of CASES) {
    test(`${c.name} matches its golden`, () => {
      const file = goldenPath(c.name);
      assert.ok(fs.existsSync(file), `${c.name} has a golden — run \`npm run bless\``);
      const expected = fs.readFileSync(file, 'utf8');
      const actual = renderCase(c);
      if (actual === expected) return;

      // A whole-document diff is unreadable in a test failure, so point
      // at the first line that moved and say how to look at the rest.
      const a = actual.split('\n');
      const e = expected.split('\n');
      let at = 0;
      while (at < a.length && at < e.length && a[at] === e[at]) at++;
      assert.fail(
        `${c.name} no longer matches its golden at line ${at + 1}:\n`
        + `  golden: ${JSON.stringify(e[at] ?? '(end of file)')}\n`
        + `  now:    ${JSON.stringify(a[at] ?? '(end of file)')}\n`
        + `If the change is intended, run \`npm run bless\` and read the diff.`,
      );
    });
  }
});

describe('The goldens are worth having', () => {
  test('they cover a range of outcomes, not three of the same delve', () => {
    const texts = CASES.map(c => fs.readFileSync(goldenPath(c.name), 'utf8'));
    assert.equal(new Set(texts).size, texts.length, 'three different stories');
    const outcomes = texts.map(t => /🏆 The way out/.test(t));
    assert.ok(new Set(outcomes).size > 1,
      'at least one victory and one defeat are frozen, not three of a kind');
  });

  test('each one is a real delve with real prose in it', () => {
    for (const c of CASES) {
      const text = fs.readFileSync(goldenPath(c.name), 'utf8');
      assert.ok(text.length > 1500, `${c.name} has substance`);
      assert.match(text, /^# The Chronicle of /, `${c.name} is a chronicle`);
      assert.match(text, /### .* Room \d+/, `${c.name} walked some rooms`);
      assert.match(text, /<details><summary>Ledger<\/summary>/, `${c.name} froze its ledger too`);
      assert.ok(!text.includes('undefined'), `${c.name} has no holes`);
      assert.ok(!text.includes('[object Object]'), `${c.name} renders everything`);
      assert.ok(!text.includes('NaN'), `${c.name} has no broken arithmetic`);
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
