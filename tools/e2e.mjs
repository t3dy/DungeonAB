#!/usr/bin/env node
/**
 * End-to-end: drive the real game in a real browser.
 *
 * This exists because the browser caught two bugs the unit suite could
 * not, both of them integration-shaped:
 *
 *   - **Duplicate tactics stacked.** Three Quickenings meant three extra
 *     workings a room. Every unit test used distinct cards, so nothing
 *     exercised the case; the party panel showing the same chip three
 *     times is what gave it away.
 *   - **The saga was only saved when the campaign ended.** A player who
 *     shut the tab in town lost the whole story. No unit test knows what
 *     a tab is.
 *
 * Kept out of `npm test` because it needs a dev server and takes about a
 * minute. Run it before shipping UI or flow changes:
 *
 *   npm run e2e
 *
 * It starts and stops its own server.
 */

import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const URL_BASE = 'http://localhost:5175/';
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

/* Playwright lives with the toolchain, not in the project's deps */
const PLAYWRIGHT = '/opt/node22/lib/node_modules/playwright/index.mjs';

const checks = [];
function check(name, ok, detail = '') {
  checks.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail && !ok ? `\n    ${detail}` : ''}`);
}

async function waitForServer(ms = 20000) {
  const started = Date.now();
  while (Date.now() - started < ms) {
    try {
      execSync(`curl -sf --noproxy localhost -o /dev/null ${URL_BASE}`, { stdio: 'ignore' });
      return true;
    } catch { await new Promise(r => setTimeout(r, 400)); }
  }
  return false;
}

/** Draft a whole pool, preferring a card type if asked. */
async function draft(page, prefer = null) {
  for (let i = 0; i < 60; i++) {
    const cards = page.locator('.draft-card');
    let n = 0;
    try {
      await cards.first().waitFor({ state: 'visible', timeout: 1500 });
      n = await cards.count();
    } catch { break; }
    let pick = 0;
    if (prefer) {
      for (let j = 0; j < n; j++) {
        const t = await cards.nth(j).locator('.card-type').innerText().catch(() => '');
        if (new RegExp(prefer, 'i').test(t)) { pick = j; break; }
        if (i < 4 && /character/i.test(t)) pick = j;
      }
    }
    await cards.nth(pick).click().catch(() => {});
    await page.waitForTimeout(90);
  }
}

async function run() {
  const { chromium } = await import(PLAYWRIGHT);
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: ['--use-angle=swiftshader', '--no-sandbox'],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => {
    if (m.type() === 'error' && !/favicon/.test(m.text())) errors.push(m.text());
  });

  await page.goto(URL_BASE, { waitUntil: 'networkidle' });

  /* The help overlay explains the game before it starts */
  const help = await page.evaluate(() => document.querySelector('#help-overlay')?.innerText || '');
  check('help explains the draft, the clocks, the tactics and the floors',
    /Only four adventurers march/.test(help)
    && /delve wears you down/.test(help)
    && /Tactic/.test(help)
    && /A dungeon goes down/.test(help)
    && /wings/.test(help), 'help text is missing a section');
  await page.click('#help-close-btn').catch(() => {});

  /* Draft, favouring tactics so the tree and its idle state show up */
  await draft(page, 'tactic');
  await page.selectOption('#difficulty-select', 'hard').catch(() => {});
  await page.getByRole('button', { name: /Enter the Dungeon/i }).click({ timeout: 3000 }).catch(() => {});

  /* The muster: kit, workings, and who they are (ui/OutfitUI.js) */
  await page.locator('.outfit-member').first().waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
  const mustered = await page.locator('.outfit-member').count();
  const nameField = page.locator('.outfit-name').first();
  const bornAs = await nameField.inputValue().catch(() => '');
  await nameField.fill('Hilda One-Eye').catch(() => {});
  await nameField.press('Tab').catch(() => {});
  await page.locator('.outfit-story').first().fill('Lost the eye to a door, not a monster.').catch(() => {});
  await page.locator('.outfit-story').first().press('Tab').catch(() => {});
  await page.waitForTimeout(200);
  const renamed = await page.locator('.outfit-name').first().inputValue().catch(() => '');
  await page.locator('#outfit-done-btn').click().catch(() => {});
  await page.locator('.member-hp').first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  const rosterText = await page.locator('#party-roster').innerText().catch(() => '');
  // A draft that spends its picks on tactics can field a party of one,
  // so the count is checked against the roster rather than a guess
  const marching = await page.locator('.member-hp').count();
  check('the muster lists everyone who marches, and takes a new name',
    mustered === marching && bornAs.length > 0 && renamed === 'Hilda One-Eye',
    `muster listed ${mustered}, ${marching} marched; name "${bornAs}" -> "${renamed}"`);
  check('the name the player gave reaches the roster', /Hilda One-Eye/.test(rosterText),
    rosterText.slice(0, 120));
  check('a delve starts and the roster renders',
    (await page.locator('.member-hp').count()) > 0);

  /* A drafted tactic is never shown twice: the duplicate-stacking bug */
  const chips = await page.locator('.tactic-chip').allInnerTexts().catch(() => []);
  const names = chips.map(c => c.replace(/ · idle$/, '').trim());
  check('no tactic is listed twice (duplicates do not stack)',
    names.length === new Set(names).size,
    `chips: ${names.join(' | ')}`);

  /* The accordion: panels fold, and the choice survives a reload */
  const chronicleHead = page.locator('[data-panel="chronicle"] .panel-head');
  if (await chronicleHead.count()) {
    await chronicleHead.click();
    await page.waitForTimeout(150);
    const folded = await page.locator('[data-panel="chronicle"].collapsed').count();
    check('a panel folds when its header is clicked', folded === 1);
    await chronicleHead.click();
    await page.waitForTimeout(150);
    check('and unfolds again',
      (await page.locator('[data-panel="chronicle"].collapsed').count()) === 0);
  } else {
    check('the panels have headers to fold', false, 'no [data-panel] .panel-head found');
  }

  /* Watch the delve to its end, collecting what the player reads */
  let sawTown = false;
  let townChecked = false;
  for (let t = 0; t < 80; t++) {
    await page.waitForTimeout(600);
    const body = await page.evaluate(() => document.body.innerText);
    if (/The chronicle is kept/i.test(body)) sawTown = true;
    if (sawTown && !townChecked) {
      townChecked = true;
      check('the town sells kit and offers the muster again',
        /quartermaster/i.test(body) && /The Muster/.test(body),
        'the town screen offered neither a shop nor the muster');
    }
    if (await page.locator('#gameover-display.active').count()) break;
  }
  const body = await page.evaluate(() => document.body.innerText);

  check('the oil readout is live', /Oil:/.test(body));
  check('the Chronicle carries the delve', (await page.locator('.story-entry').count()) > 2);

  /* v4.4: the delve is watchable, not only readable */
  check('the story runs terse by default, so the panel is skimmable',
    (await page.locator('.story-entry.terse').count()) > 0,
    'every entry rendered in full — the terse default is not applying');
  check('a room heading opens that room in full',
    await (async () => {
      // An element handle, not a locator: a locator would re-resolve
      // after the click and answer about a different entry entirely
      const entry = await page.locator('.story-entry.terse').first().elementHandle();
      if (!entry) return false;
      await entry.$eval('.story-room', el => el.click());
      await page.waitForTimeout(150);
      return (await entry.evaluate(el => el.classList.contains('terse'))) === false;
    })());
  check('clicking a room on the map opens that room\'s log',
    await page.evaluate(() => {
      const entry = document.querySelector('.story-entry[data-room]');
      if (!entry) return false;
      const index = Number(entry.dataset.room);
      // Straight at the renderer's hook: the raycast itself needs a real
      // pointer over a floor, which a headless click cannot promise
      const hit = window.dungeonAB?.renderer?.onRoomClick;
      if (typeof hit !== 'function') return false;
      hit(index);
      return entry.classList.contains('focused');
    }),
    'the renderer has no onRoomClick, or it did not reach the panel');
  check('the cue layer is mounted over the map',
    (await page.locator('#cue-layer').count()) === 1);
  check('the saga is kept at the end of a delve, not only the campaign',
    sawTown || /Find it under/i.test(body),
    'no save confirmation appeared in town or at the end');

  /* The saga reaches the shelf and can be read back */
  await page.locator('#gameover-display').evaluate(el => el.classList.remove('active')).catch(() => {});
  await page.click('#records-btn').catch(() => {});
  await page.waitForTimeout(600);
  const sagas = await page.locator('.saga-row').count();
  check('the saga is on the shelf', sagas > 0);

  if (sagas > 0) {
    await page.locator('[data-read]').first().click();
    await page.waitForTimeout(500);
    const doc = await page.locator('.saga-doc').innerText().catch(() => '');
    check('the saga can be read back in the app', doc.length > 400);
    check('the reader says whether the party can go again',
      /can delve again|did not come back|still standing/i.test(
        await page.locator('#records-body').innerText().catch(() => '')));
  }

  check('no page errors anywhere in the run', errors.length === 0, errors.slice(0, 3).join(' | '));

  await browser.close();
  return checks.every(c => c.ok);
}

async function main() {
  console.log('Starting the dev server…');
  const server = spawn('npm', ['run', 'dev'], { cwd: ROOT, stdio: 'ignore', detached: true });
  let ok = false;
  try {
    if (!await waitForServer()) {
      console.error('The dev server never came up.');
      process.exitCode = 1;
      return;
    }
    console.log('Driving the game…\n');
    ok = await run();
  } finally {
    try { process.kill(-server.pid); } catch { /* already gone */ }
  }
  const failed = checks.filter(c => !c.ok);
  console.log(`\n${checks.length - failed.length}/${checks.length} checks passed.`);
  if (!ok) process.exitCode = 1;
}

main();
