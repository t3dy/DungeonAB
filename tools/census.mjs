#!/usr/bin/env node
/**
 * Census — how often each mechanic actually fires.
 *
 * Coverage tests prove a beat *can* happen; `tests/prose.js` proves it
 * appears in some seeded transcript. Neither says how often, and the
 * difference matters: reactions existed and fired in 15% of the fights
 * that could have had one, because the decision layer never looked up.
 * A mechanic nobody meets in fifty delves is not in the game, however
 * green its test is.
 *
 * This walks N delves and counts every mechanic it can see, as a rate
 * per delve and as a share of the delves that met it at all. Anything
 * under the floor is flagged: either the content is unreachable, or
 * the decision layer cannot see it, or it wants deleting.
 *
 *   npm run census            # 600 delves, mixed difficulty
 *   npm run census 500 hard
 */

import { Simulator } from '../src/sim/Simulator.js';
import { SeededRandom } from '../src/draft/PackDraft.js';
import { getAllCards } from '../src/game/Cards.js';

// 200 delves put "cold camp" at 1.0%, 0.5% and 0.0% on three
// consecutive runs, which is noise deciding what looks dead. Six
// hundred costs a second and settles it.
const COUNT = Number(process.argv[2]) || 600;
const DIFFICULTY = process.argv[3] || null;   // null = mixed
/** Below this share of delves, a mechanic is effectively not in the game. */
const FLOOR = 0.05;

/**
 * What to look for. Each probe is a name and a regex over the lines the
 * player actually reads — the beats, the asides and the ledger — so a
 * mechanic that fires without writing counts as not firing, which is
 * the correct answer (rule 8).
 */
const PROBES = [
  ['fight resolved', /kills? .* in \d+ round|is dead before the party closes|never gets a round/],
  ['retreat', /The party retreats|gives ground|back out again|fall back, paying/],
  ['cornered (no third retreat)', /no backing out this time/],
  ['spell opener', /opens the fight|The caster opens with/],
  ['spell sustained', /The working holds/],
  ['boss unleash', /looses everything it has/],
  ['healing mid-fight', /heals \d+ (as|the moment)|mending while it holds|Mending Word/],
  ['turn undead', /turns the undead/],
  ['sneak past', /leads the party past .* unseen|The sneak fails/],
  ['bribe', /pays \d+ gold and .* lets them pass/],
  ['trap disarmed', /disarms the trap/],
  ['trap sprung', /pushes through the trap|trap springs/],
  ['element reaction', /The working hits|The fire takes|Frost gets into|fire finds|sheets across/],
  ['feature opener', /shove|topple|drop the portcullis|into the pit|boulder/i],
  ['formation chosen', /drives in as a wedge|Shields lock|closes ranks|fight spread out|single file/],
  ['cover from furniture', /less damage per round|fights from behind/],
  ['supply low', /oil for \d+ more|wick is well down|checks the reservoir/],
  ['supply guttered', /last of the oil|flame stands up|lantern dies/],
  ['marching in the dark', /gropes through the dark|march by touch|dark is telling|walks in the dark/],
  ['wound taken', /wound that will not close|ceiling drops|opened up badly|is as whole as they get/],
  ['hero falls', /falls\b|is dead|does not get up/],
  ['stair descended', /goes down the stair|ropes down the shaft beside/],
  ['stairhead camp', /makes camp at the stairhead/],
  ['cold camp', /No fire and a watch kept/],
  ['trapdoor taken', /ropes down the shaft and lands|floor gives way/],
  ['trapdoor refused', /leaves it shut/],
  ['wing taken', /turns off into the/],
  ['wing declined', /looks into the .* and keeps/],
  ['secret door found', /finds a hidden door/],
  ['spell learned', /learns \d+ spell|spells learned|learns nothing/],
  ['alchemy brewed', /brews a healing draught|applies .* to .*'s weapon/],
  ['lamp oil cooked', /becomes light to march by/],
  ['shrine rest', /rests at the shrine/],
  ['shrine desecrated', /strips \d+ gold of leaf/],
  ['disaster braced', /braces together and rides it out/],
  ['disaster scattered', /party scatters/],
  ['mimic', /mimic/i],
  ['trophy taken', /drops? (a|an|the)/],
  ['drop equipped', /now worn by/],
  ['vault opened', /vault/i],
  ['tactic idle', /drafted but idle/],
];

function transcript(sim) {
  const lines = [];
  const saga = sim.getChronicle().toJSON();
  for (const delve of saga.delves || []) {
    // Delve-level asides (what the party packed, what it drilled, what
    // it drafted and cannot use) sit outside any room
    for (const e of delve.events || []) lines.push(typeof e === 'string' ? e : e?.text);
    for (const ch of delve.rooms || []) {
      lines.push(ch.predicament, ch.deliberation, ch.resolution, ch.aside);
      for (const f of ch.falls || []) lines.push(f);
      for (const w of ch.wounds || []) lines.push(w);
      for (const e of ch.events || []) lines.push(typeof e === 'string' ? e : e?.text);
    }
  }
  return lines.filter(Boolean);
}

const DIFFICULTIES = ['easy', 'medium', 'hard', 'nightmare'];
const met = new Map(PROBES.map(([name]) => [name, 0]));
const fires = new Map(PROBES.map(([name]) => [name, 0]));
let rooms = 0;

// The other half of the question. A beat that never appears is either
// an option nobody is ever offered or an option nobody ever takes, and
// those want opposite fixes: the first is generation, the second is the
// decision layer. Counting both separates them.
const offered = new Map();
const chosen = new Map();
const bump = (map, key) => map.set(key, (map.get(key) || 0) + 1);

for (let i = 0; i < COUNT; i++) {
  const seed = `census-${i}`;
  const difficulty = DIFFICULTY || DIFFICULTIES[i % DIFFICULTIES.length];
  const pool = new SeededRandom(seed).shuffle(getAllCards()).slice(0, 27);
  const sim = new Simulator(pool, seed, difficulty);
  let guard = 0;
  while (!sim.gameOver && guard++ < 400) {
    sim.tick();
    // The room reports what it put in front of the party and what the
    // party did with it (Simulator.lastNarration)
    const n = sim.lastNarration;
    if (n?.action) {
      for (const id of n.offered || []) bump(offered, id);
      bump(chosen, n.action);
    }
  }
  rooms += sim.roomsCleared;

  const lines = transcript(sim);
  for (const [name, rx] of PROBES) {
    const hits = lines.filter(l => rx.test(l)).length;
    if (hits > 0) { met.set(name, met.get(name) + 1); fires.set(name, fires.get(name) + hits); }
  }
}

const rows = PROBES.map(([name]) => ({
  name,
  share: met.get(name) / COUNT,
  perDelve: fires.get(name) / COUNT,
})).sort((a, b) => a.share - b.share);

console.log(`\nMechanic census — ${COUNT} delves (${DIFFICULTY || 'mixed'}), ${(rooms / COUNT).toFixed(1)} rooms a delve\n`);
console.log('mechanic'.padEnd(30), 'delves that met it'.padStart(19), 'times a delve'.padStart(15));
for (const r of rows) {
  const flag = r.share < FLOOR ? '  ⚠' : '';
  console.log(
    r.name.padEnd(30),
    `${(r.share * 100).toFixed(1)}%`.padStart(19),
    r.perDelve.toFixed(2).padStart(15),
    flag,
  );
}

/* ---- Options: offered against taken ------------------------------- */

const ids = [...new Set([...offered.keys(), ...chosen.keys()])];
const optRows = ids.map(id => ({
  id,
  offered: offered.get(id) || 0,
  chosen: chosen.get(id) || 0,
})).map(r => ({ ...r, rate: r.offered ? r.chosen / r.offered : 0 }))
  .sort((a, b) => a.rate - b.rate);

console.log('\nOptions — offered against taken\n');
console.log('option'.padEnd(22), 'offered'.padStart(10), 'taken'.padStart(8), 'taken when offered'.padStart(20));
for (const r of optRows) {
  const dead = r.offered > 20 && r.rate < 0.02;
  console.log(
    r.id.padEnd(22),
    String(r.offered).padStart(10),
    String(r.chosen).padStart(8),
    `${(r.rate * 100).toFixed(1)}%`.padStart(20),
    dead ? '  ⚠ offered and never taken' : '',
  );
}
const neverOffered = PROBES.length && ids.length ? [] : [];

const cold = rows.filter(r => r.share < FLOOR);
console.log(cold.length
  ? `\n${cold.length} mechanic${cold.length === 1 ? '' : 's'} below ${FLOOR * 100}% of delves: ${cold.map(r => r.name).join(', ')}`
    + `\n(at ${COUNT} delves, anything under ${(100 / COUNT).toFixed(1)}% is one delve and not a rate)`
    + '\nEither the content is unreachable, the decision layer cannot see it, or it wants cutting.'
  : `\nEvery mechanic is met in at least ${FLOOR * 100}% of delves.`);
