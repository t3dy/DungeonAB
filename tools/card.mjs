#!/usr/bin/env node
/**
 * Design-time card measurement — what is this card actually worth?
 *
 * The static cost model (game/Costing.js) is a *screen*: cheap, runs in
 * a test, and good at spotting a card far from its peers. It is not an
 * oracle, and it should not be trusted as one — it currently ranks a
 * Greatsword above Haunted Armor when measurement says the opposite,
 * because the marginal value of attack diminishes against a party's
 * total in a way no static weight captures.
 *
 * This is the arbiter. It drops the card into real delves and reports
 * the win points it adds.
 *
 * Usage:
 *   npm run card eq-haunted-armor
 *   npm run card tac-flanking sp-fireball        (several at once)
 *   npm run card eq-greatsword --n 800 --difficulty hard
 *
 * The default fixture is chosen to sit in a MEASURABLE regime: a
 * baseline near 45% on medium, because a card cannot show its worth
 * against a party that never wins or never loses. Testing on hard with a
 * thin party puts the baseline at 7% and every card reads as +1.
 */

import { Simulator } from '../src/sim/Simulator.js';
import {
  CHARACTER_CARDS, EQUIPMENT_CARDS, getCard,
} from '../src/game/Cards.js';
import { getTactic } from '../src/game/Tactics.js';
import { costCard } from '../src/game/Costing.js';

/* A party that wins about half the time: room to move either way */
const BASE = [...CHARACTER_CARDS.slice(0, 4), ...EQUIPMENT_CARDS.slice(4, 9)];

export function winRate(extra, { difficulty = 'medium', n = 500, seedPrefix = 'card' } = {}) {
  let wins = 0;
  for (let i = 0; i < n; i++) {
    const sim = new Simulator([...BASE, ...extra], `${seedPrefix}-${i}`, difficulty);
    let guard = 0;
    while (!sim.gameOver && guard++ < 400) sim.tick();
    if (sim.getRunResult().victory) wins++;
  }
  return (wins / n) * 100;
}

/**
 * What one card adds. A tier-two tactic is measured WITH its root,
 * since alone it is a blank by design and would report as worthless.
 */
export function measureCard(id, opts = {}) {
  const card = getCard(id);
  if (!card) return { id, error: 'no such card' };

  const extra = [card];
  let note = null;
  const tactic = getTactic(id);
  if (tactic?.requires) {
    const root = getCard(tactic.requires);
    if (root) {
      extra.unshift(root);
      note = `measured with its root, ${root.name}`;
    }
  }

  const baseline = winRate([], opts);
  const withCard = winRate(extra, opts);
  return {
    id, name: card.name, type: card.type,
    baseline, withCard,
    delta: withCard - baseline,
    modelCost: costCard(card).total,
    note,
  };
}

function main() {
  const args = process.argv.slice(2);
  // Anything after a --flag is that flag's value, not a card id.
  // Without this, `npm run card x -- --n 300` reported "300: no such card".
  const flagValues = new Set();
  args.forEach((a, i) => { if (a.startsWith('--')) flagValues.add(args[i + 1]); });
  const ids = args.filter(a => !a.startsWith('--') && !flagValues.has(a));
  const flag = (name, fallback) => {
    const at = args.indexOf(`--${name}`);
    return at >= 0 ? args[at + 1] : fallback;
  };
  const opts = {
    difficulty: flag('difficulty', 'medium'),
    n: parseInt(flag('n', '500'), 10),
  };

  if (ids.length === 0) {
    console.error('Usage: npm run card <card-id> [more-ids] [--n 500] [--difficulty medium]');
    process.exit(1);
  }

  console.log(`Measuring on ${opts.difficulty}, ${opts.n} delves an arm.\n`);
  console.log('card                          win %   contribution   model');
  for (const id of ids) {
    const r = measureCard(id, opts);
    if (r.error) { console.log(`${id.padEnd(28)} ${r.error}`); continue; }
    const sign = r.delta >= 0 ? '+' : '';
    console.log(
      `${r.name.padEnd(28)} ${r.withCard.toFixed(1).padStart(5)}   ${(sign + r.delta.toFixed(1)).padStart(12)}   ${r.modelCost.toFixed(0).padStart(5)}`
      + (r.note ? `\n  ${r.note}` : ''),
    );
  }
  console.log(`\nbaseline (no card): ${winRate([], opts).toFixed(1)}%`);
  console.log('Contribution is the number that decides. The model column only screens.');
}

if (process.argv[1] && process.argv[1].endsWith('card.mjs')) main();
