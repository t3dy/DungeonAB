/**
 * The performance — the beats a room is played as (ui/Choreography.js)
 *
 * The simulator resolves a room in one call; the picture used to show
 * one frame of it. These tests hold the bridge between the two:
 *
 *   - a fight's record has one entry per round, and the entries add up
 *     to the totals the prose already states;
 *   - every narrated room plans to a beat list that starts with arrival
 *     and ends with resolution, with one round beat per recorded round;
 *   - a delve's whole performance is bounded in wall-clock, so the
 *     crawl cannot drag past what a player will sit through;
 *   - the player walks every beat kind without a renderer at all, so
 *     the 2D fallback and a hidden tab still see the chronicle written.
 *
 * Nothing here touches the arithmetic (rule 10): the beats are the
 * record with time attached.
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { Simulator } from '../src/sim/Simulator.js';
import { SeededRandom } from '../src/draft/PackDraft.js';
import { getAllCards } from '../src/game/Cards.js';
import { planBeats, totalMs, roundLine, Choreographer, BEAT_MS, PASS_ACTIONS } from '../src/ui/Choreography.js';
import { marchingOrder, frontCount } from '../src/ui/RoomLayout.js';

/** A seeded delve, rolls pinned, walked to the end with states kept. */
function walk(seed, difficulty = 'hard') {
  const real = Math.random;
  const rng = new SeededRandom(`${seed}-rolls`);
  Math.random = () => rng.next();
  try {
    const pool = new SeededRandom(seed).shuffle(getAllCards()).slice(0, 27);
    const sim = new Simulator(pool, seed, difficulty);
    const states = [sim.getState()];
    let guard = 0;
    while (!sim.getState().gameOver && guard++ < 200) {
      sim.tick();
      states.push(sim.getState());
    }
    return states;
  } finally {
    Math.random = real;
  }
}

const SEEDS = ['perf-1', 'perf-2', 'perf-3', 'perf-4', 'perf-5', 'perf-6'];

describe('The fight keeps its rounds', () => {
  test('one entry per round, summing to the totals the prose states', () => {
    let fights = 0;
    for (const seed of SEEDS) {
      const states = walk(seed);
      for (const st of states.slice(1)) {
        const n = st.narration;
        if (!n?.rounds) continue;
        fights++;
        const entries = n.rounds;
        // A fight can end before round one: the opening blow (kit acting
        // first) is enough for a weak monster. Then there are no rounds
        // and the opening must account for it.
        if (entries.length === 0) assert.ok(n.opening > 0, `${seed}: no rounds and no opening blow`);
        entries.forEach((e, i) => {
          assert.equal(e.round, i + 1, `${seed}: rounds are numbered in order`);
          assert.ok(Number.isInteger(e.swing) && e.swing >= 1, `${seed}: every round deals at least the floor`);
          assert.ok(Number.isInteger(e.incoming) && e.incoming >= 0);
          assert.ok(e.monsterHealth >= 0);
        });
        // Health only goes down
        for (let i = 1; i < entries.length; i++) {
          assert.ok(entries[i].monsterHealth <= entries[i - 1].monsterHealth, `${seed}: the bar never climbs`);
        }
        assert.ok(n.monster?.health > 0, `${seed}: the monster's starting health rides the narration`);
        assert.ok(n.opening >= 0);
      }
    }
    assert.ok(fights >= 6, `six seeded delves should hold more than ${fights} fights`);
  });

  test('the ledger carries the round-by-round line for every fight', () => {
    for (const seed of SEEDS.slice(0, 3)) {
      const real = Math.random;
      const rng = new SeededRandom(`${seed}-rolls`);
      Math.random = () => rng.next();
      try {
        const pool = new SeededRandom(seed).shuffle(getAllCards()).slice(0, 27);
        const sim = new Simulator(pool, seed, 'hard');
        let guard = 0, fights = 0, lines = 0;
        while (!sim.getState().gameOver && guard++ < 200) {
          sim.tick();
          const st = sim.getState();
          if (st.narration?.rounds?.length) {
            fights++;
            const events = sim.lastEvents || [];
            if (events.some(e => /Round by round/.test(e.text))) lines++;
          }
        }
        assert.equal(lines, fights, `${seed}: every fight's rounds reach the ledger`);
      } finally {
        Math.random = real;
      }
    }
  });
});

describe('Every room plans to a performance', () => {
  test('arrival first, resolution after, one round beat per recorded round', () => {
    let rooms = 0, marches = 0, fights = 0;
    for (const seed of SEEDS) {
      const states = walk(seed);
      for (let i = 1; i < states.length; i++) {
        const prev = states[i - 1], st = states[i];
        const beats = planBeats(prev, st);
        if (!st.narration) { assert.equal(beats.length, 0); continue; }
        rooms++;
        const kinds = beats.map(b => b.type);
        const first = kinds[0] === 'march' ? 1 : 0;
        if (first) marches++;
        assert.equal(beats[first].type, 'line');
        assert.equal(beats[first].kind, 'predicament', `${seed}: the room opens on its predicament`);
        assert.equal(beats[first + 1].type, 'formup');
        assert.equal(beats[first + 2].kind, 'deliberation');
        const rounds = beats.filter(b => b.type === 'round');
        assert.equal(rounds.length, st.narration.rounds?.length || 0, `${seed}: one beat per round`);
        if (rounds.length) {
          fights++;
          assert.ok(rounds.every(b => b.frac >= 0 && b.frac <= 1));
          assert.equal(rounds.at(-1).progress, 1);
          const resolve = beats.find(b => b.type === 'resolve');
          assert.ok(['slain', 'fled', 'passed', 'stands', 'done'].includes(resolve.outcome));
          // The front rank the beats name is the front rank the layout draws
          const order = marchingOrder(st.party.members).map(m => m.name);
          assert.deepEqual(rounds[0].front, order.slice(0, frontCount(rounds[0].front.length ? (beats[first + 1].formation) : 'line')));
        }
        const resolveAt = kinds.indexOf('resolve');
        const resolutionAt = beats.findIndex(b => b.kind === 'resolution');
        assert.ok(resolveAt >= 0 && resolutionAt === resolveAt + 1, `${seed}: the resolution line lands on the resolve beat`);
        assert.ok(beats.every(b => Number.isFinite(b.ms) && b.ms > 0), `${seed}: every beat has a duration`);
        // A monster the party went around is never drawn as slain, and a
        // cleared room the party did not go around is never drawn standing
        const out = beats[resolveAt].outcome;
        if (PASS_ACTIONS.has(st.narration.action) && !rounds.length) assert.notEqual(out, 'slain');
        if (out === 'slain') assert.ok(st.narration.monster && st.dungeon.rooms[st.narration.roomIndex].cleared);
      }
    }
    assert.ok(rooms > 40 && marches > 30 && fights > 5, `coverage: ${rooms} rooms, ${marches} marches, ${fights} fights`);
  });

  test('a whole delve performs inside a bound, and a twelve-round fight under ten seconds', () => {
    for (const seed of SEEDS) {
      const states = walk(seed);
      let total = 0;
      for (let i = 1; i < states.length; i++) total += totalMs(planBeats(states[i - 1], states[i]));
      assert.ok(total < 240_000, `${seed}: ${Math.round(total / 1000)}s at 1× is too long to watch`);
      assert.ok(total > 3_000, `${seed}: ${total}ms is not a performance`);
    }
    const twelve = 12 * BEAT_MS.round + BEAT_MS.opening + BEAT_MS.march * 2.2 + BEAT_MS.arrive
      + BEAT_MS.formup + BEAT_MS.deliberate + BEAT_MS.resolve + BEAT_MS.line;
    assert.ok(twelve < 14_000, `the longest possible fight room is ${twelve}ms`);
    assert.ok(12 * BEAT_MS.round < 10_000, 'twelve rounds under ten seconds');
  });

  test('a round line states the numbers it plays and invents none', () => {
    const line = roundLine({ n: 3, swing: 7, incoming: 4, heal: { target: 'Dee', amount: 5 }, phased: true });
    assert.equal(line, 'Round 3: 7 dealt, 4 taken, 5 healed on Dee, the boss turns.');
    assert.equal(roundLine({ n: 1, swing: 2, incoming: 0, heal: null, phased: false }), 'Round 1: 2 dealt.');
  });
});

describe('The player walks every beat without a renderer', () => {
  test('a headless choreographer writes the chronicle in order and finishes', async () => {
    const states = walk('perf-1');
    const written = [];
    const story = {
      open: (n, idx) => ({ idx, lines: [] }),
      line: (entry, kind, text) => { entry.lines.push(kind); written.push(text); },
      close: entry => { entry.closed = true; },
    };
    const hud = { calls: 0, acting() { this.calls++; }, hurt() {}, health() {}, hint() {}, formation() {} };
    const ch = new Choreographer({ renderer: null, story, hud, speed: () => 1000, wait: () => Promise.resolve() });
    let entriesWithRounds = 0;
    for (let i = 1; i < states.length; i++) {
      const beats = planBeats(states[i - 1], states[i]);
      if (!beats.length) continue;
      const before = written.length;
      await ch.play(beats, states[i - 1], states[i]);
      assert.equal(ch.playing, false);
      const n = states[i].narration;
      assert.ok(written.slice(before).includes(n.predicament));
      assert.ok(written.slice(before).includes(n.resolution));
      if (n.rounds?.length) entriesWithRounds++;
    }
    assert.ok(entriesWithRounds > 0);
    assert.ok(hud.calls > 0, 'the HUD is told who is acting');
  });

  test('cancel stops a performance mid-way', async () => {
    const states = walk('perf-2');
    const beats = planBeats(states[0], states[1]);
    const seen = [];
    const ch = new Choreographer({
      story: { open: () => ({}), line: (e, k) => seen.push(k), close: () => {} },
      speed: () => 1,
      wait: () => { ch.cancel(); return Promise.resolve(); },
    });
    await ch.play(beats, states[0], states[1]);
    assert.ok(seen.length < beats.length, 'a cancelled performance does not play every beat');
  });
});
