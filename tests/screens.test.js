/**
 * The frame — screens and the action bar (ui/Screens.js, src/index.html)
 *
 * SCREENS.md S1: every screen renders into its own section and owns a
 * group in a fixed action bar, and the primary action lives in the bar.
 * This holds the markup to that contract without a browser: each screen
 * the router knows has a section and a bar group, each primary action
 * id exists inside its group, and the controls main.js wires exist.
 * The measured half — March visible without scrolling at 1366×768 — was
 * verified in the browser on 2026-09-04 (SCREENS.md, "What was built").
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCREENS, BAR_PRIMARY, showScreen, currentScreen } from '../src/ui/Screens.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(HERE, '../src/index.html'), 'utf8');

/** The bar group for one screen, as markup. */
function barGroup(id) {
  const open = `<div class="bar-for" data-screen="${id}">`;
  const at = html.indexOf(open);
  if (at < 0) return null;
  const rest = html.slice(at + open.length);
  const next = rest.indexOf('<div class="bar-for"');
  const foot = rest.indexOf('</footer>');
  const stop = [next, foot].filter(i => i >= 0).sort((a, b) => a - b)[0];
  return stop === undefined ? rest : rest.slice(0, stop);
}

describe('Every screen has a section and a bar group', () => {
  for (const id of SCREENS) {
    test(`${id}: a section and a bar group exist`, () => {
      assert.ok(html.includes(`<section id="screen-${id}" class="screen">`), `section for ${id}`);
      assert.ok(barGroup(id) !== null, `bar group for ${id}`);
    });
  }

  test('each primary action sits inside its own bar group, never in the scroll', () => {
    for (const [id, btn] of Object.entries(BAR_PRIMARY)) {
      if (!btn) continue;
      const group = barGroup(id);
      assert.ok(group.includes(`id="${btn}"`), `${id}: ${btn} is in the bar`);
      // …and nowhere else
      const count = html.split(`id="${btn}"`).length - 1;
      assert.equal(count, 1, `${btn} appears once`);
    }
  });

  test('the delve bar carries the controls main.js wires', () => {
    const group = barGroup('delve');
    for (const id of ['pause-btn', 'step-btn', 'speed-slider', 'speed-label', 'results-btn', 'beat-hint']) {
      assert.ok(group.includes(`id="${id}"`), id);
    }
    const muster = barGroup('muster');
    for (const id of ['difficulty-select', 'seed-input', 'march-btn', 'muster-kit-btn']) {
      assert.ok(muster.includes(`id="${id}"`), id);
    }
    const reck = barGroup('reckoning');
    for (const id of ['again-btn', 'read-btn', 'chron-md-btn', 'chron-json-btn']) {
      assert.ok(reck.includes(`id="${id}"`), id);
    }
  });

  test('the delve screen is the picture and the chronicle, nothing else scrolling', () => {
    assert.ok(html.includes('<canvas id="game-canvas"'));
    assert.ok(html.includes('<div id="hud">'), 'the roster is a HUD over the canvas');
    assert.ok(html.includes('<aside id="chronicle-col">'), 'the chronicle is a column beside it');
    // The old scrolling column is gone
    assert.ok(!html.includes('id="ui-container"'));
    assert.ok(!html.includes('id="gameover-display"'), 'no borrowed results modal');
  });
});

describe('The router', () => {
  test('knows four screens and refuses a fifth', () => {
    assert.deepEqual(SCREENS, ['table', 'muster', 'delve', 'reckoning']);
    assert.throws(() => showScreen('town'), /Unknown screen/);
  });

  test('tracks the current screen without a document', () => {
    showScreen('muster');
    assert.equal(currentScreen(), 'muster');
    showScreen('delve');
    assert.equal(currentScreen(), 'delve');
  });
});
