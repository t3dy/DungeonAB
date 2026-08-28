#!/usr/bin/env node
/**
 * Scaffold a new card so the standing rules are followed by construction.
 *
 * Every rule this project has was learned by breaking it. A new card
 * needs card text that states its numbers (rule 12), a cost inside its
 * type's distribution (rule 10), an entry in the Chronicle if it moves
 * state (rule 7), and a test (rule 2). Remembering four rules at 2am is
 * how cards ship half-wired — the personalities went nine-for-nine inert
 * that way, and nobody did anything wrong.
 *
 *   npm run new-card -- --type equipment --name "Lantern of Ash"
 *   npm run new-card -- --type tactic --name Bracing --branch line
 *
 * It prints a stub, a costing verdict, and the test to paste. It writes
 * nothing: a generator that edits the pool would need to guess where a
 * card belongs, and guessing wrong in a source file is worse than
 * pasting.
 */

import { costEffects, costOutliers, EFFECT_SCALING, FLAG_WORTH } from '../src/game/Costing.js';
import { getAllCards } from '../src/game/Cards.js';
import { BRANCHES } from '../src/game/Tactics.js';

const TYPES = ['character', 'equipment', 'spell', 'personality', 'tactic'];

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Where this type's costs currently sit, so a stub can be sanity-checked. */
function bandFor(type) {
  const { types } = costOutliers(getAllCards());
  return types[type] || null;
}

const STUBS = {
  equipment: (name, id) => `  { id: 'eq-${id}', type: CARD_TYPES.EQUIPMENT, name: '${name}', icon: '🗡️',
    slot: 'weapon', bonus: { attack: 1 }, bestFor: null,
    text: 'What it is, then what it does and by how much.' },`,
  spell: (name, id) => `  { id: 'sp-${id}', type: CARD_TYPES.SPELL, name: '${name}', icon: '✨',
    school: 'evocation', element: 'fire', power: 4, use: 'combat', aoe: false,
    text: 'What it does, with its number in the line.' },`,
  character: (name, id) => `  { id: 'char-${id}', type: CARD_TYPES.CHARACTER, name: '${name}', icon: '⚔️',
    class: CLASSES.FIGHTER, stats: { health: 12, attack: 4, defense: 3, mind: 4 },
    text: 'Who they are in one line.' },`,
  personality: (name, id) => `  { id: 'pers-${id}', type: CARD_TYPES.PERSONALITY, name: '${name}', icon: '🎭',
    archetype: 'brave',
    text: 'How they decide, and what their stance on the march costs or saves.' },`,
  tactic: (name, id, branch) => `  {
    id: 'tac-${id}', name: '${name}', icon: '🎯', branch: '${branch}', tier: 1,
    capability: 'attack',
    text: 'What it does, with the number in the line.',
    effect: { flankDamage: 1 },
  },`,
};

function main() {
  const args = process.argv.slice(2);
  const flag = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
  const type = flag('type');
  const name = flag('name');
  const branch = flag('branch', 'line');

  if (!type || !name || !TYPES.includes(type)) {
    console.error(`Usage: npm run new-card -- --type <${TYPES.join('|')}> --name "Card Name" [--branch ${Object.keys(BRANCHES).join('|')}]`);
    process.exit(1);
  }

  const id = slug(name);
  const band = bandFor(type);

  console.log(`\n── 1. The card ${type === 'tactic' ? '(src/game/Tactics.js, in TACTICS)' : '(src/game/Cards.js)'}\n`);
  console.log(STUBS[type](name, id, branch));

  console.log(`\n── 2. Costing (rule 10)\n`);
  if (band) {
    console.log(`  ${type} cards currently sit at mean ${band.mean.toFixed(0)}, sd ${band.sd.toFixed(0)}, range ${band.min.toFixed(0)}–${band.max.toFixed(0)}.`);
    console.log(`  Stay inside about ${Math.max(0, band.mean - 2.5 * band.sd).toFixed(0)}–${(band.mean + 2.5 * band.sd).toFixed(0)} or the outlier test will ask you to justify it.`);
  }
  console.log(`  Every effect key must be in Costing.EFFECT_SCALING or FLAG_WORTH, or nothing`);
  console.log(`  can price it. Known keys: ${Object.keys(EFFECT_SCALING).slice(0, 8).join(', ')}…`);
  console.log(`  Remember per-round beats one-shot by roughly ${'12×'}: a point of cover is not a point of damage.`);
  console.log(`\n  Then measure it for real:  npm run card ${type === 'tactic' ? 'tac-' : type === 'spell' ? 'sp-' : 'eq-'}${id}`);

  console.log(`\n── 3. Writing (rule 12)\n`);
  console.log(`  The text must state every number the effect applies, and invent none.`);
  console.log(`  House style: descriptive, not flourishes. tests/prose.test.js checks both.`);
  console.log(`  If the card moves observable state, it needs a field in`);
  console.log(`  Chronicle.snapshotState and an entry in Chronicle.FIELDS (rule 7).`);

  console.log(`\n── 4. The test to paste (rule 2)\n`);
  console.log(`  test('${name} does what its card says', () => {`);
  console.log(`    const card = getCard('${type === 'tactic' ? 'tac-' : type === 'spell' ? 'sp-' : 'eq-'}${id}');`);
  console.log(`    assert.ok(card, 'the card is in the pool');`);
  console.log(`    assert.deepEqual(validateCard(card), [], 'it is a legal card');`);
  console.log(`    // Then assert the mechanic, in a regime where it can show:`);
  console.log(`    // armsDiffer(withCard, without, { label: '${name}', bounds: { max: pool } });`);
  console.log(`  });`);

  console.log(`\n── 5. Afterwards\n`);
  console.log(`  npm test          the gates`);
  console.log(`  npm run assets    is anything else now inert, or newly interacting?`);
  console.log(`  npm run calibrate did this move the curve?`);
  console.log(`  npm run bless     read the golden diff before re-blessing\n`);
}

main();
