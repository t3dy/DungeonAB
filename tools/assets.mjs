#!/usr/bin/env node
/**
 * Asset drift audit — which cards were written for a game that no
 * longer exists?
 *
 * Mechanics move faster than assets. A card is "inert" when it touches
 * none of the systems the game has grown: it still works, but it is not
 * playing the game the rest of the pool is playing. This finds them so
 * a redesign pass has a work-list instead of a hunch.
 *
 * Run: npm run assets
 *
 * It reports rather than fails — inertness is a design signal, not a
 * bug, and some cards are deliberately plain. CLAUDE.md standing rule 9
 * says to run it whenever a mechanic lands.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllCards, CARD_TYPES, CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';
import { Simulator } from '../src/sim/Simulator.js';
import { SeededRandom } from '../src/draft/PackDraft.js';
import { MATTER, hasReaction, REACTIVE_ELEMENTS } from '../src/world/Reactions.js';
import { STANCES } from '../src/game/Personalities.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* The files a card can be "reached by" — where mechanics read cards */
const MECHANIC_SOURCES = [
  'src/encounters/RoomEncounters.js', 'src/agents/Party.js', 'src/agents/Adventurer.js',
  'src/world/RoomFeatures.js', 'src/world/Reactions.js', 'src/game/Drops.js',
  'src/game/Tactics.js', 'src/game/Campaign.js', 'src/game/Personalities.js',
  'src/narrative/Narrator.js', 'src/draft/PackDraft.js',
];

const SRC = MECHANIC_SOURCES
  .map(f => fs.readFileSync(path.join(ROOT, f), 'utf8'))
  .join('\n');

/** Every way a card can be part of a modern system. */
function reach(card) {
  const hooks = [];
  if (card.element) hooks.push('element');
  if (card.aoe) hooks.push('area/reactions');
  if (card.classActions) hooks.push('class-keyed');
  if (card.type === CARD_TYPES.TACTIC) hooks.push('tactic tree');
  if (card.archetype && STANCES[card.archetype]) hooks.push('attrition stance');
  if (card.use === 'heal') hooks.push('mid-fight mending');
  if (SRC.includes(`'${card.id}'`)) hooks.push('named by a mechanic');

  // A character participates through its CLASS, which every system
  // reads -- calling one "inert" because no mechanic names it by id is
  // a heuristic artifact, and a tool that cries wolf gets ignored. What
  // is worth asking about a character is whether its *stat line* has
  // anything to do with the systems: mind now drives spell power, and a
  // trait is a hook a mechanic can hang off.
  if (card.type === CARD_TYPES.CHARACTER) {
    hooks.push(`class:${card.class}`);
    if ((card.stats?.mind ?? 0) >= 6) hooks.push('mind scales workings');
    if (card.trait) hooks.push('trait');
  }
  return hooks;
}

/**
 * The question worth asking about classes: does each one have a reason
 * to exist under the current mechanics, beyond being a stat line?
 */
function classCoverage() {
  const rows = {};
  for (const card of getAllCards()) {
    if (card.type !== CARD_TYPES.CHARACTER) continue;
    rows[card.class] ??= { count: 0, named: false, mind: 0 };
    rows[card.class].count++;
    rows[card.class].mind = Math.max(rows[card.class].mind, card.stats?.mind ?? 0);
    if (SRC.includes(`CLASSES.${card.class.toUpperCase()}`)) rows[card.class].named = true;
  }
  return rows;
}

export function auditAssets() {
  const byType = {};
  for (const card of getAllCards()) {
    const hooks = reach(card);
    (byType[card.type] ??= []).push({ card, hooks });
  }

  const report = { byType, inert: [], matterGaps: [] };
  for (const rows of Object.values(byType)) {
    for (const r of rows) if (r.hooks.length === 0) report.inert.push(r.card);
  }

  const matters = [...new Set(Object.values(MATTER))];
  for (const m of matters) {
    const answered = REACTIVE_ELEMENTS.filter(el => hasReaction(el, m));
    if (answered.length === 0) report.matterGaps.push({ matter: m, answered });
  }
  return report;
}

/**
 * Does a card's promise ever actually happen?
 *
 * "Inert" above is a static question: does any mechanic read this card?
 * The sharper one is dynamic — hand the card to a party, send them
 * down, and see whether the thing the card says it does ever appears in
 * what the player reads. A card that reaches a mechanic in the source
 * and never fires in play is the same failure as a beat with no
 * transcript (tools/census.mjs), one card down.
 *
 * Stat-only cards (a shield that is +3 defence and nothing else) have
 * nothing to say and are excluded rather than flagged: their promise is
 * the number on the card, which the roster already shows.
 */
const PROMISE = /:|when |against |before |every |each |instead|no longer|so a |and the /i;

/** How an archetype refers to itself in the prose (game/Personalities.js). */
const ARCHETYPE_VOICE = {
  brave: 'the Bold', cunning: 'the Cunning', greedy: 'the Covetous',
  scholarly: 'the Scholarly', pious: 'the Devout', reckless: 'the Reckless',
  craven: 'the Craven',
};
const archetypeVoice = a => ARCHETYPE_VOICE[a] || null;

export function firingRates(delves = 30) {
  // A fixed spine of a party, so the only thing that changes between
  // arms is the card under test
  const base = [
    CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER),
    CHARACTER_CARDS.find(c => c.class === CLASSES.CLERIC),
    CHARACTER_CARDS.find(c => c.class === CLASSES.WIZARD),
    CHARACTER_CARDS.find(c => c.class === CLASSES.ROGUE),
  ].filter(Boolean);

  const real = Math.random;
  const stream = new SeededRandom('asset-firing');
  Math.random = () => stream.next();
  const rows = [];
  try {
    for (const card of getAllCards()) {
      if (card.type === CARD_TYPES.CHARACTER) continue;      // always present by definition
      // Only cards that promise something beyond a stat line
      if (!PROMISE.test(card.text || '')) continue;
      let met = 0;
      for (let i = 0; i < delves; i++) {
        const seed = `firing-${card.id}-${i}`;
        const sim = new Simulator([...base, card], seed, i % 2 ? 'hard' : 'medium');
        let guard = 0;
        const lines = [];
        while (!sim.gameOver && guard++ < 300) {
          sim.tick();
          const n = sim.lastNarration;
          if (n) lines.push(n.resolution, n.aside);
          // A prep names its card in `source` and often not in its
          // text — the greatsword's line says "the greatsword", not
          // "the Greatsword of the Vault" — so matching the prose alone
          // read three live cards as dead.
          for (const prep of sim.lastResult?.preps || []) lines.push(prep.source, prep.text);
        }
        lines.push(...sim.log);
        // A personality speaks as its archetype ("the Cunning trimmed
        // the wick"), never as its own name — most of them are *called*
        // their archetype, so only the odd one out looked dead. That is
        // a naming artifact, not a silent card, and a tool that cries
        // wolf gets ignored.
        const names = [card.name];
        if (card.archetype) names.push(archetypeVoice(card.archetype));
        if (lines.some(l => l && names.some(n => n && l.includes(n)))) met++;
      }
      rows.push({ card, rate: met / delves });
    }
  } finally {
    Math.random = real;
  }
  return rows.sort((a, b) => a.rate - b.rate);
}

function main() {
  const { byType, inert, matterGaps } = auditAssets();
  const total = Object.values(byType).reduce((s, r) => s + r.length, 0);

  console.log(`Asset drift — ${total} cards against the current mechanics\n`);
  for (const [type, rows] of Object.entries(byType)) {
    const dead = rows.filter(r => r.hooks.length === 0);
    const pct = ((dead.length / rows.length) * 100).toFixed(0);
    console.log(`${type.padEnd(12)} ${String(rows.length).padStart(3)} cards · ${String(dead.length).padStart(2)} inert (${pct}%)`);
    for (const r of dead) console.log(`   · ${r.card.name}`);
  }

  console.log('\nClass coverage — what each class is for:');
  for (const [cls, r] of Object.entries(classCoverage())) {
    const flag = r.named ? 'read by mechanics' : '⚠ no mechanic asks for it';
    console.log(`  ${cls.padEnd(10)} ${String(r.count).padStart(2)} cards · best mind ${r.mind} · ${flag}`);
  }

  console.log('\nElement coverage — what answers each matter:');
  for (const m of [...new Set(Object.values(MATTER))]) {
    const answered = REACTIVE_ELEMENTS.filter(el => hasReaction(el, m));
    console.log(`  ${m.padEnd(7)} ${answered.length ? answered.join(', ') : '— nothing answers it'}`);
  }

  if (matterGaps.length) {
    console.log(`\n⚠ ${matterGaps.length} matter(s) no element touches: ${matterGaps.map(g => g.matter).join(', ')}`);
  }
  console.log(`\n${inert.length} of ${total} cards touch nothing added since they were written.`);

  /* ---- and how often each promise is actually kept ----------------- */
  const FLOOR = 0.1;
  const firing = firingRates();
  const cold = firing.filter(r => r.rate < FLOOR);
  console.log(`\nPromises kept — how often a drafted card's own writing shows up (${firing.length} cards that promise something):\n`);
  for (const r of firing.slice(0, 14)) {
    console.log(`  ${r.card.name.padEnd(28)} ${(r.rate * 100).toFixed(0).padStart(4)}% of delves${r.rate < FLOOR ? '  ⚠' : ''}`);
  }
  if (firing.length > 14) console.log(`  … ${firing.length - 14} more, all above ${(firing[14].rate * 100).toFixed(0)}%`);
  console.log(cold.length
    ? `\n${cold.length} card${cold.length === 1 ? '' : 's'} whose writing the player almost never sees: ${cold.map(r => r.card.name).join(', ')}`
    : '\nEvery card that promises something keeps it in at least one delve in ten.');
}

if (process.argv[1] && process.argv[1].endsWith('assets.mjs')) main();
