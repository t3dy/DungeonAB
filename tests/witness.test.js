import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The witness contract (docs/PLAYTHROUGH_WITNESS_ARCHITECTURE.md). These pin the
// properties a scholarly witness must have; they are cheap and they catch the
// regressions that would quietly ruin a published document.

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const publish = readFileSync(new URL('../api/publish.mjs', import.meta.url), 'utf8');
const witness = readFileSync(new URL('../api/witness.mjs', import.meta.url), 'utf8');

test('narrated prose is captured into the event record', () => {
  assert.match(main, /journal\.narrative/, 'log() must append to journal.narrative');
  assert.match(main, /journal && !journal\.sealed/, 'sealed journals must stop accepting lines');
});

test('the record is sealed before publishing chatter is logged', () => {
  const i = main.indexOf('journal.sealed = true');
  const j = main.indexOf("log('Copying the witness out");
  assert.ok(i > 0 && j > i, 'seal must precede the publish log line');
});

test('publish mints two hands and stores only hashes', () => {
  assert.match(publish, /playerKey/); assert.match(publish, /scholarKey/);
  assert.match(publish, /keys: \{ player: hash\(playerKey\), scholar: hash\(scholarKey\) \}/);
  assert.ok(!/keys: \{ player: playerKey/.test(publish), 'raw keys must never be stored');
});

test('publish initialises empty editorial layers and reserves descent', () => {
  for (const f of ['revisions: []', 'marginalia: []', 'preface:', 'parent:']) {
    assert.ok(publish.includes(f), `payload missing ${f}`);
  }
});

test('the read endpoint strips key hashes and reports the hand', () => {
  assert.match(witness, /delete doc\.keys/);
  assert.match(witness, /hand = 'scholar'/); assert.match(witness, /hand = 'player'/);
});
