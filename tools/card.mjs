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
 * Fixtures are chosen per difficulty to sit in a MEASURABLE regime,
 * because a card cannot show its worth against a party that never wins
 * or never loses. There is one fixture per difficulty rather than one
 * overall: at a 4.7x spread in monster scale, no single party is
 * beatable-but-winnable at both ends. See BASE_BY_DIFFICULTY, and
 * `tests/cardfixture.test.js`, which fails if any of them drifts out of
 * the band.
 */

import { Simulator } from '../src/sim/Simulator.js';
import {
  CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, getCard,
} from '../src/game/Cards.js';
import { costCard } from '../src/game/Costing.js';

/*
 * A base party that can actually be moved — one per difficulty.
 *
 * There used to be a single fixture with the comment "a party that wins
 * about half the time: room to move either way". Measured on 2026-09-01
 * it won **98.7% / 92.0% / 17.7% / 0.3%** across easy/medium/hard/
 * nightmare. At the top there was nothing left to win and at the bottom
 * nothing to save, so every card measured as worth roughly zero at both
 * ends — not because the cards are worthless but because a saturated
 * number cannot move. That is standing rule 11 (a comparison that
 * cannot fail is worse than no test) broken inside the tool standing
 * rule 10 relies on to price cards.
 *
 * The fixtures below were searched for by measurement and all sit
 * between 35% and 65%, where a card has room to help or hurt. They are
 * deliberately different SHAPES — a lone magus on easy, a fully kitted
 * party with a grimoire on nightmare — because that is what it takes to
 * be beatable-but-winnable at each end of a 4.7x monster-scale spread.
 *
 * Re-measure these whenever STAT_SCALE moves. A fixture that has drifted
 * out of its band reports confident zeroes.
 */
const BASE_BY_DIFFICULTY = {
  easy: () => [...CHARACTER_CARDS.slice(0, 2)],                                   // re-fit for v8
  medium: () => [...CHARACTER_CARDS.slice(0, 4)],                                 // ~48%
  hard: () => [...CHARACTER_CARDS.slice(0, 4), ...EQUIPMENT_CARDS.slice(0, 7)],   // re-fit v8.1
  nightmare: () => [                                                              // ~35%
    ...CHARACTER_CARDS.slice(0, 4),
    ...EQUIPMENT_CARDS.slice(0, 9),
    ...SPELL_CARDS.slice(0, 6),
  ],
};

/** The band a fixture must stay inside to be able to measure anything. */
export const MEASURABLE = { lo: 25, hi: 75 };

/**
 * The base for a difficulty, minus anything being measured — a fixture
 * that already holds the card under test reports it as worth nothing.
 */
export function baseFor(difficulty, excludeIds = []) {
  const make = BASE_BY_DIFFICULTY[difficulty] || BASE_BY_DIFFICULTY.medium;
  const drop = new Set(excludeIds);
  return make().filter(c => !drop.has(c.id));
}

export function winRate(extra, { difficulty = 'medium', n = 500, seedPrefix = 'card' } = {}) {
  const base = baseFor(difficulty, extra.map(c => c?.id).filter(Boolean));
  let wins = 0;
  for (let i = 0; i < n; i++) {
    const sim = new Simulator([...base, ...extra], `${seedPrefix}-${i}`, difficulty);
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
  const note = null;

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

  // What this sample can and cannot resolve. Two arms of n delves at a
  // win rate near p have a 95% band of 1.96*sqrt(2p(1-p)/n) on the
  // difference — at the default 500 that is about six points, which is
  // wide enough to read a dead card as a good one. Pinning measured
  // +7.0, -2.0, +4.8, +0.2 and +3.8 on five consecutive 500-delve runs
  // before a 2500-delve pair settled it at about +3.
  const band = 1.96 * Math.sqrt(2 * 0.25 / opts.n) * 100;
  console.log(`Measuring on ${opts.difficulty}, ${opts.n} delves an arm.`);
  console.log(`Anything inside ±${band.toFixed(1)} points is noise at this sample`
    + (band > 4 ? ' — raise it with --n for a conditional card.\n' : '.\n'));
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
  console.log(`Contribution is the number that decides, when it clears ±${band.toFixed(1)}.`);
  console.log('The model column only screens.');
}

if (process.argv[1] && process.argv[1].endsWith('card.mjs')) main();
