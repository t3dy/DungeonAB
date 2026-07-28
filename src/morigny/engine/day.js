/**
 * MORIGNY — the day builder: one seeded liturgical day for the slice.
 * All eight offices appear (coverage-tested); Matins and Compline are
 * played in full recitation; Terce–None compress into the daylight stage.
 */

import { SeededRandom } from '../../draft/PackDraft.js';
import { HOUR_ORDER } from '../data/hours.js';

/** Ordered stages of the slice day. kind drives the UI scene. */
export function buildDay(seed) {
  const stages = [
    { id: 'matins', kind: 'office-full', hourId: 'matins', procedureSlot: true },
    { id: 'lauds', kind: 'office-brief', hourId: 'lauds' },
    { id: 'prime', kind: 'chapter', hourId: 'prime' },
    { id: 'daylight', kind: 'daylight', hourIds: ['terce', 'sext', 'none'] },
    { id: 'vespers', kind: 'office-brief', hourId: 'vespers' },
    { id: 'compline', kind: 'office-full', hourId: 'compline' },
    { id: 'night', kind: 'night' },
    { id: 'dream', kind: 'dream' },
    { id: 'reckoning', kind: 'reckoning' },
  ];
  return { seed, stages };
}

/** Every stage's hours, flattened, for legality checks. */
export function dayHourIds(day) {
  return day.stages.flatMap(s => (s.hourIds ? s.hourIds : s.hourId ? [s.hourId] : []));
}

/** All eight offices present, in canonical order. */
export function dayIsLegal(day) {
  const ids = dayHourIds(day);
  return ids.length === HOUR_ORDER.length && ids.every((id, i) => id === HOUR_ORDER[i]);
}

/** Deterministic per-stage RNG streams: same seed, same day, same margins. */
export function stageRng(day, stageId) {
  return new SeededRandom(`${day.seed}-${stageId}`);
}
