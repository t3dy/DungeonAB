/**
 * Shared test helpers.
 *
 * The one that matters most is `measurable` — see below. Several tests
 * in this repo have silently measured *nothing* because their fixture
 * put both arms of a comparison outside the range where the thing being
 * tested can show up, and a comparison that cannot fail is worse than no
 * test at all: it reports green forever.
 */

import { strict as assert } from 'assert';

/**
 * Assert a fixture is in a regime where the comparison can actually
 * come out either way.
 *
 * Three real failures this guards against, all found the hard way:
 *
 *   - **Saturation.** A steam-vs-pillars test compared damage taken
 *     when the monster killed both parties. Damage saturated at the
 *     health pool, both arms read 52.0, and the difference measured
 *     was zero regardless of what steam did.
 *   - **The floor.** Incoming damage is `max(1, ...)`, so against a
 *     weak monster *no* mitigation shows up in the totals — a cover
 *     test there is measuring the floor, not the cover.
 *   - **The ceiling.** A fight capped at 12 rounds hides anything that
 *     only pays off in round 13.
 *
 * Pass the samples from each arm plus the bounds they must stay inside.
 */
export function measurable(samples, { min, max, label = 'the fixture' }) {
  const values = samples.flat();
  assert.ok(values.length > 0, `${label} produced samples`);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  if (min !== undefined) {
    assert.ok(lo > min,
      `${label} is against the floor (lowest ${lo} <= ${min}) — the comparison cannot show a difference`);
  }
  if (max !== undefined) {
    assert.ok(hi < max,
      `${label} is saturated (highest ${hi} >= ${max}) — the comparison cannot show a difference`);
  }
  return { lo, hi };
}

/**
 * Compare two arms of a measurement, refusing to pass on a fixture
 * that could not have distinguished them.
 *
 * `spread` is how far apart the means must be to count as a real
 * difference rather than noise; it defaults to something generous
 * because combat rolls come from the global Math.random.
 */
export function armsDiffer(a, b, { label = 'the arms', spread = 0, bounds = {} } = {}) {
  measurable([a, b], { ...bounds, label });
  const mean = xs => xs.reduce((s, v) => s + v, 0) / xs.length;
  const ma = mean(a);
  const mb = mean(b);
  assert.ok(Math.abs(ma - mb) > spread,
    `${label}: ${ma.toFixed(1)} vs ${mb.toFixed(1)} is inside the noise (need > ${spread})`);
  return { a: ma, b: mb, delta: ma - mb };
}

/**
 * Run a fight-shaped trial N times and return the samples.
 * Combat uses the global Math.random, so single runs prove nothing.
 */
export function trials(n, fn) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(fn(i));
  return out;
}

/** Total health standing, the usual thing these tests measure. */
export function partyHealth(party) {
  return party.members.reduce((s, m) => s + Math.max(0, m.health), 0);
}

/** Full health pool — the saturation ceiling for damage-taken tests. */
export function partyPool(party) {
  return party.members.reduce((s, m) => s + m.maxHealth, 0);
}
