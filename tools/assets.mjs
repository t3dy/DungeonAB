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
import { getAllCards, CARD_TYPES } from '../src/game/Cards.js';
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
}

if (process.argv[1] && process.argv[1].endsWith('assets.mjs')) main();
