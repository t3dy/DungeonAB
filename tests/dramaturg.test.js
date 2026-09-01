/**
 * The dramaturg has to be checkable.
 *
 * A critic that always says the same thing is worse than no critic, and
 * this module has already produced two of those: a protagonist probe
 * that reported "nobody is named" in 100% of delves because it never
 * stripped the icon off a roster entry, and a rationing probe that
 * reported failure everywhere because it asked whether a room carried
 * any beat (always yes) rather than whether one room stood above the
 * others. Both read as devastating findings about the writing. Both
 * were findings about the probe.
 *
 * So: every probe must be shown to fire in both directions on
 * hand-built logs, and none may return a constant over the real corpus.
 * This is CLAUDE.md rule 11 applied to a reader rather than to a
 * mechanic.
 */

import { strict as assert } from 'assert';
import {
  POETICS, POSITIONS, INTERESTS, readDelve, critique, bestLine, repetitionAcross,
} from '../src/narrative/Dramaturg.js';
import { Simulator } from '../src/sim/Simulator.js';
import { SeededRandom } from '../src/draft/PackDraft.js';
import { getAllCards } from '../src/game/Cards.js';

/* A minimal delve, shaped exactly like Chronicle records one. */
const room = (turn, over = {}) => ({
  turn, room: 'monster', icon: '👹', action: 'fight',
  predicament: 'A monster holds the room.',
  deliberation: 'The party chose to stand and fight.',
  resolution: 'The monster dies.',
  aside: null, falls: [], wounds: [], events: [],
  ...over,
});

const delve = (over = {}) => ({
  number: 1, theme: 'the Old Delve', difficulty: 'medium', seed: 't',
  roster: ['⚔️ Tycho Brahe (fighter)', '🔮 Giordano Bruno (wizard)'],
  rooms: [room(1), room(2), room(3), room(4)],
  events: [],
  outcome: { victory: true, epitaph: 'They came back up.', roomsCleared: 4, survivors: 2 },
  ...over,
});

/** Run one real delve, the way tools/simulate.mjs does. */
function realDelve(seed, difficulty = 'medium') {
  const real = Math.random;
  const rng = new SeededRandom(`${seed}-rolls`);
  Math.random = () => rng.next();
  try {
    const pool = new SeededRandom(seed).shuffle(getAllCards()).slice(0, 27);
    const sim = new Simulator(pool, seed, difficulty);
    let guard = 0;
    while (!sim.gameOver && guard++ < 400) sim.tick();
    return sim.getChronicle().delves[0];
  } finally {
    Math.random = real;
  }
}

describe('The poetics is well formed', () => {
  test('every value states itself, argues for itself, and names a mechanism', () => {
    for (const [id, v] of Object.entries(POETICS)) {
      assert.equal(v.id, id, `${id} disagrees with its own key`);
      assert.ok(v.statement?.length > 10, `${id} needs a statement`);
      assert.ok(v.because?.length > 40, `${id} needs an argument, not a slogan`);
      assert.ok(v.mechanisms?.length >= 1, `${id} names no mechanism that could serve it`);
      assert.equal(typeof v.probe, 'function', `${id} has no probe`);
    }
  });

  test('every position says what would change its mind', () => {
    for (const p of POSITIONS) {
      assert.ok(p.claim && p.because && p.refutedBy,
        `${p.id} is a preference wearing a lab coat`);
    }
  });

  test('the interests are questions', () => {
    assert.ok(INTERESTS.length >= 3);
    for (const i of INTERESTS) assert.ok(i.question.endsWith('?'), `${i.id} is not a question`);
  });
});

describe('Every probe can fire in both directions', () => {
  test('protagonist: reads a name in the prose, and notices when there is none', () => {
    const named = delve({
      rooms: [
        room(1, { resolution: 'Tycho Brahe takes the first blow.' }),
        room(2, { resolution: 'Tycho Brahe holds the door.' }),
        room(3), room(4),
      ],
    });
    assert.equal(POETICS.protagonist.probe(named).pass, true);
    assert.equal(POETICS.protagonist.probe(named).evidence, 'Tycho Brahe');
    // The bug that started this file: an icon on the roster entry
    assert.equal(POETICS.protagonist.probe(delve()).pass, false);
  });

  test('continuity: counts rooms that answer an earlier one', () => {
    const carried = delve({
      rooms: [
        room(1), room(2),
        room(3, { resolution: 'This is the snare the party was told about: half damage.' }),
        room(4, { predicament: 'The party came through the last room already in this shape.' }),
      ],
    });
    assert.equal(POETICS.continuity.probe(carried).pass, true);
    assert.equal(POETICS.continuity.probe(delve()).pass, false);
  });

  test('reversal: notices a cost, and notices a delve without one', () => {
    const hurt = delve({ rooms: [room(1), room(2), room(3, { wounds: ['Brahe is wounded.'] }), room(4)] });
    assert.equal(POETICS.reversal.probe(hurt).pass, true);
    assert.equal(POETICS.reversal.probe(delve()).pass, false);
  });

  test('rationing: a peak beats a flat profile', () => {
    const beats = n => ({ events: Array.from({ length: n }, () => ({ salience: 'beat', field: 'trophies', text: 'x' })) });
    const peaked = delve({ rooms: [room(1, beats(1)), room(2, beats(1)), room(3, beats(1)), room(4, beats(6))] });
    const flat = delve({ rooms: [room(1, beats(2)), room(2, beats(2)), room(3, beats(2)), room(4, beats(2))] });
    assert.equal(POETICS.rationing.probe(peaked).pass, true);
    assert.equal(POETICS.rationing.probe(flat).pass, false);
  });

  test('roadNotTaken: alternatives named, or a rail', () => {
    const chosen = delve({
      rooms: [1, 2, 3, 4].map(t => room(t, {
        deliberation: 'They might have chosen to fall back — the party chose to fight.',
      })),
    });
    assert.equal(POETICS.roadNotTaken.probe(chosen).pass, true);
    assert.equal(POETICS.roadNotTaken.probe(delve()).pass, false);
  });

  test('mortalityEarned: abstains when nobody dies, and catches an unmet death', () => {
    assert.equal(POETICS.mortalityEarned.probe(delve()).pass, null, 'no deaths means no verdict');
    const cold = delve({
      rooms: [room(1), room(2), room(3), room(4, { falls: ['☠️ Tycho Brahe falls.'] })],
    });
    assert.equal(POETICS.mortalityEarned.probe(cold).pass, false);
    const met = delve({
      rooms: [
        room(1, { resolution: 'Tycho Brahe leads.' }), room(2), room(3),
        room(4, { falls: ['☠️ Tycho Brahe falls.'] }),
      ],
    });
    assert.equal(POETICS.mortalityEarned.probe(met).pass, true);
  });

  /* The three values written FROM the reading pass, fixtured like the rest. */

  test('freshVoices: people arguing, versus one borrowed temper', () => {
    const said = v => ({ deliberation: `They might have chosen to flee — ${v}. The party chose to fight.` });
    const peopled = delve({
      rooms: [
        room(1, said('Tycho Brahe made the case: "so"')),
        room(2, said('Giordano Bruno made the case: "so"')),
        room(3, said('Tycho Brahe made the case: "so"')),
        room(4, said('Giordano Bruno made the case: "so"')),
      ],
    });
    assert.equal(POETICS.freshVoices.probe(peopled).pass, true);
    const oneVoice = delve({
      rooms: [1, 2, 3, 4].map(t => room(t, said('the Reckless were already moving'))),
    });
    assert.equal(POETICS.freshVoices.probe(oneVoice).pass, false,
      'a party that argues only in its own temper is the corpus\'s worst fault');
  });

  test('freshLines: an effect line said twice is caught', () => {
    const twice = delve({
      rooms: [
        room(1, { resolution: 'It opens. 🎓 A second pair of hands: +10 renown.' }),
        room(2), room(3),
        room(4, { resolution: 'It opens. 🎓 A second pair of hands: +10 renown.' }),
      ],
    });
    assert.equal(POETICS.freshLines.probe(twice).pass, false);
    const varied = delve({
      rooms: [
        room(1, { resolution: 'It opens. 🎓 A second pair of hands: +10 renown.' }),
        room(2), room(3),
        room(4, { resolution: 'It opens. 🎓 Somebody checks the work: +10 renown.' }),
      ],
    });
    assert.equal(POETICS.freshLines.probe(varied).pass, true);
  });

  test('climax: a boss that acts, versus one that evaporates', () => {
    const fought = delve({
      rooms: [room(1), room(2), room(3),
        room(4, { room: 'boss', resolution: 'The party kills it in 5 rounds, taking 40 damage.' })],
    });
    assert.equal(POETICS.climax.probe(fought).pass, true);
    const evaporated = delve({
      rooms: [room(1), room(2), room(3),
        room(4, { room: 'boss', resolution: 'It is dead before the party closes: it never gets a round.' })],
    });
    assert.equal(POETICS.climax.probe(evaporated).pass, false);
    assert.equal(POETICS.climax.probe(delve()).pass, null, 'no throne room, no verdict');
  });

  test('specificity: numbers in the resolutions', () => {
    const numeric = delve({ rooms: [1, 2, 3, 4].map(t => room(t, { resolution: 'The party takes 4 damage.' })) });
    assert.equal(POETICS.specificity.probe(numeric).pass, true);
    assert.equal(POETICS.specificity.probe(delve()).pass, false);
  });

  test('shape: a back-loaded delve rises, a front-loaded one does not', () => {
    const hp = n => ({ events: Array.from({ length: n }, () => ({ field: 'health', salience: 'notable', text: 'x' })) });
    const rising = delve({ rooms: [room(1, hp(0)), room(2, hp(0)), room(3, hp(2)), room(4, hp(3))] });
    const falling = delve({ rooms: [room(1, hp(3)), room(2, hp(2)), room(3, hp(0)), room(4, hp(0))] });
    assert.equal(POETICS.shape.probe(rising).pass, true);
    assert.equal(POETICS.shape.probe(falling).pass, false);
  });

  test('closure: an ending with a sentence on it', () => {
    assert.equal(POETICS.closure.probe(delve()).pass, true);
    assert.equal(POETICS.closure.probe(delve({ outcome: null })).pass, false);
    assert.equal(POETICS.closure.probe(delve({ outcome: { victory: true } })).pass, false);
  });
});

describe('The reading is honest about the real corpus', () => {
  const seeds = ['dr-1', 'dr-2', 'dr-3', 'dr-4', 'dr-5', 'dr-6'];
  const delves = seeds.map((s, i) => realDelve(s, i % 2 ? 'hard' : 'medium'));
  const readings = delves.map(readDelve);

  test('a real delve reads without throwing, and every finding is legible', () => {
    for (const r of readings) {
      assert.ok(r.findings.length === Object.keys(POETICS).length);
      for (const f of r.findings) {
        assert.ok(f.statement && f.note, `${f.value} produced a finding with no note`);
        assert.ok(f.pass === true || f.pass === false || f.pass === null);
      }
      assert.ok(r.score >= 0 && r.score <= 1);
    }
  });

  /*
   * The guard that matters, and it is one-sided on purpose.
   *
   * A probe that says `false` on every real delve is the signature of
   * this module's bug class: it is looking for something it can never
   * find, and it reports that absence as a devastating fact about the
   * writing. Both early bugs looked exactly like this — "nobody is
   * named" and "no room is rationed", at 100%.
   *
   * A probe that says `true` on every delve is NOT the same thing. It
   * usually means the game reliably meets that value, which is the
   * outcome the value was written to encourage; on a six-delve corpus
   * it is barely evidence either way. The capacity to fail is proved
   * against fixtures above, which is where it can be proved properly.
   */
  /*
   * `concision` genuinely does fail every delve, and it is allowed to
   * say so because the failure was confirmed away from the probe:
   * across 665 resolutions from 60 delves, the median is 90 characters
   * but the 90th percentile is 884 and the longest is 2290 — and the
   * median BOSS resolution is 1113. Every delve has a boss, so every
   * delve has a wall of concatenated preps in the place where its
   * climax should be. The probe is reading that correctly.
   *
   * An entry here needs that kind of independent measurement, not a
   * red test and a shrug. It is the same bargain as `ALLOWED` in
   * tests/capabilities.test.js: an exception is allowed to exist, and
   * has to say why in public.
   */
  const UNIVERSAL = {
    concision: 'confirmed by direct measurement: boss resolutions run a median 1113 characters',
  };

  test('no probe finds fault with every single real delve', () => {
    for (const value of Object.keys(POETICS)) {
      const verdicts = readings
        .map(r => r.findings.find(f => f.value === value).pass)
        .filter(v => v !== null);
      if (verdicts.length < 3) continue;          // too few to conclude
      if (UNIVERSAL[value]) continue;
      assert.ok(verdicts.some(v => v === true),
        `${value} failed all ${verdicts.length} real delves — either the mechanic is `
        + 'entirely absent or, far likelier, the probe cannot see it (both of this '
        + "module's early bugs looked precisely like this). If it is genuinely "
        + 'universal, measure it independently and add it to UNIVERSAL with the evidence.');
    }
  });

  test('critique separates the systemic from the incidental', () => {
    const c = critique(readings);
    assert.equal(c.corpus, readings.length);
    for (const row of c.all) {
      assert.ok(row.failRate >= 0 && row.failRate <= 1);
      assert.ok(row.mechanisms.length >= 1, `${row.value} names nothing to change`);
    }
    // Every value lands on exactly one side of the threshold
    assert.equal(c.systemic.length + c.healthy.length, c.all.length);
  });

  test('a delve offers a line worth repeating', () => {
    for (const d of delves) {
      const line = bestLine(d);
      assert.ok(line === null || line.length > 10, 'a retelling line should be a sentence');
    }
  });

  test('repetition across runs is measured, and is not total', () => {
    const rep = repetitionAcross(delves.map(d => ({ delves: [d] })));
    assert.ok(rep.lines > 0 && rep.distinct > 0);
    assert.ok(rep.reuseRate >= 0 && rep.reuseRate < 0.9,
      `prose reuse across delves is ${Math.round(rep.reuseRate * 100)}% — the saga reads as one delve`);
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
