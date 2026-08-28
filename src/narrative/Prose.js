/**
 * Prose — checks on the writing itself, not just its existence
 *
 * Narration coverage has always asserted that a line *exists*. That
 * catches a missing beat and nothing else. Three failures it cannot
 * see, all of which have actually happened here:
 *
 *   - **The line lies.** Aegis of Ash read "blunts the first blow in
 *     each fight" for a long time while the resolver warded *every*
 *     round. A player who believed the card drafted it wrong.
 *   - **The line repeats.** Six identical "the dark takes nothing"
 *     lines in one delve buried the beats that mattered. Found by
 *     reading a transcript, not by a test.
 *   - **The line is out of voice.** The house style is descriptive —
 *     "the fighter strikes the goblin", not flourishes — and nothing
 *     enforced it across sessions.
 *
 * These are lint-shaped rather than pass/fail-shaped: they return
 * findings, and the tests decide which findings are errors.
 */

/**
 * Small numbers are better written as words, and the house style does
 * write them that way -- "two wounds close at every shrine" reads
 * better than "2 wounds". A gate that only understood digits would
 * force the prose to be robotic to satisfy the test, which is the
 * wrong way round.
 */
const NUMBER_WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  a: 1, an: 1,
};

/** Every number a line claims, as integers — digits or words. */
export function numbersIn(text) {
  const s = String(text);
  const digits = (s.match(/\d+/g) || []).map(Number);
  const words = [];
  for (const [word, value] of Object.entries(NUMBER_WORDS)) {
    // "a"/"an" only count in front of a noun the mechanics use, or
    // every article in the prose would read as a claim of one
    const rx = word.length <= 2
      ? new RegExp(`\\b${word}\\s+(?:march|wound|working|round|point|damage)`, 'i')
      : new RegExp(`\\b${word}\\b`, 'i');
    if (rx.test(s)) words.push(value);
  }
  return [...digits, ...words];
}

/**
 * Does this line state the number the mechanic actually applied?
 *
 * `applied` may be a single value or several (a line can legitimately
 * mention a ceiling and a heal). Lines that state no number at all are
 * fine — plenty of beats are qualitative.
 */
export function statesNumber(text, applied) {
  const wanted = (Array.isArray(applied) ? applied : [applied])
    .filter(n => Number.isFinite(n));
  if (wanted.length === 0) return true;
  const found = numbersIn(text);
  if (found.length === 0) return false;
  return wanted.every(n => found.includes(n));
}

/**
 * Numbers a line claims that the mechanic never applied.
 *
 * The Aegis case: the text said "first blow", the code warded every
 * round. Here we look for a stated figure with no counterpart in what
 * happened.
 */
export function unsupportedNumbers(text, applied) {
  const allowed = new Set((Array.isArray(applied) ? applied : [applied])
    .filter(n => Number.isFinite(n)));
  // Small numbers inside ordinary prose ("a second wound", "1 more
  // march") are usually the mechanic's own; anything above this is a
  // claim worth backing up.
  return numbersIn(text).filter(n => n > 1 && !allowed.has(n));
}

/* ------------------------------------------------------------------ */
/* House style                                                         */
/* ------------------------------------------------------------------ */

/**
 * Phrases the house style has ruled out. The brief was explicit:
 * *less literary, more descriptive — instead of flavour-text
 * flourishes just say the fighter strikes the goblin.*
 *
 * Each entry says what to write instead, because a lint that only says
 * "no" teaches nobody.
 */
export const BANNED_PHRASES = [
  { rx: /\bnary a\b/i, why: 'archaic filler; say what happened instead' },
  { rx: /\blo,? and behold\b/i, why: 'a flourish standing in for what happened' },
  { rx: /\blittle did (?:they|he|she|it) know\b/i, why: 'narrator winking at the reader' },
  { rx: /\bfate would have it\b/i, why: 'flourish standing in for a cause' },
  { rx: /\bwith a mighty\b/i, why: 'say what the blow did, not how mighty it was' },
  { rx: /\bepic\b/i, why: 'tells the reader to be impressed' },
  { rx: /\blegendary\b/i, why: 'tells the reader to be impressed' },
  { rx: /\bunspeakable\b/i, why: 'then do not speak of it — describe it' },
  { rx: /\bindescribable\b/i, why: 'the line\'s whole job is to describe it' },
  { rx: /\bawe-inspiring\b/i, why: 'tells the reader what to feel' },
  { rx: /!{2,}/, why: 'one exclamation mark is already a lot' },
  { rx: /\b(?:very|really|extremely|incredibly) \w+/i, why: 'intensifier doing a verb\'s job' },
];

/** Lines longer than this are usually two lines wearing a coat. */
export const MAX_SENTENCE_WORDS = 45;

/**
 * Lint one line. Returns findings; an empty array is a clean line.
 */
export function lintLine(text, { label = 'line' } = {}) {
  const findings = [];
  const s = String(text || '');
  if (!s.trim()) return [{ label, kind: 'empty', text: s, why: 'no words' }];

  for (const { rx, why } of BANNED_PHRASES) {
    const m = s.match(rx);
    if (m) findings.push({ label, kind: 'style', text: s, match: m[0], why });
  }

  // Sentence length, measured per sentence rather than per line, since
  // a beat is often two or three sentences on purpose
  for (const sentence of s.split(/(?<=[.!?])\s+/)) {
    const words = sentence.trim().split(/\s+/).filter(Boolean).length;
    if (words > MAX_SENTENCE_WORDS) {
      findings.push({
        label, kind: 'length', text: sentence, words,
        why: `${words} words in one sentence; the house style is plainer than that`,
      });
    }
  }
  return findings;
}

/**
 * Repetition across a run.
 *
 * Returns lines printed more than `limit` times, and any line printed
 * twice in a row. Consecutive repeats read worse than scattered ones,
 * so they are reported separately.
 */
export function findRepetition(lines, { limit = 3 } = {}) {
  const counts = new Map();
  const consecutive = [];
  let previous = null;
  for (const raw of lines) {
    const line = String(raw || '').trim();
    if (!line) continue;
    counts.set(line, (counts.get(line) || 0) + 1);
    if (line === previous) consecutive.push(line);
    previous = line;
  }
  const overused = [...counts.entries()]
    .filter(([, n]) => n > limit)
    .map(([line, n]) => ({ line, count: n }));
  return { overused, consecutive: [...new Set(consecutive)] };
}
