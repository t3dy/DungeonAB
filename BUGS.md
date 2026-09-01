# BUGS

Defects: things that do the wrong thing, as opposed to things that are
unfinished (`PROBLEMS.md`) or unresolved (`PERPLEXITIES.md`).

Written for a session with no memory of this one. Every entry says how it
was found, because the finding method usually generalises — three of the
five below came from the same audit sweep and would never have surfaced
from reading code.

Run `npm run audit` before trusting any "fixed" claim here.

---

## B1. Town consultations granted a dungeon resource — FIXED

**Severity: fiction break + free resource. Found by: direct probe during
doc audit.**

Town encounters and dungeon situations share `resolveEncounterOption`.
The `wayIn` grant (a reading of how *this dungeon* is built) fired on any
successful capability option — including the **town astrologer**, in a
tavern, before the delve existed. The party banked a way past a sealed
door in a crypt nobody had walked into.

```
town options: read-the-figure, deepen-the-reading, pay-and-listen, wave-him-off
after:        { score: 0, wayIn: 1 }   ← before the fix
```

Fixed by gating the grant on `ctx?.type !== 'town'`
(`EncounterEngine.js`). **The class is still open** — see `ARCHITECTURE.md`
A1; nothing structurally stops the next dungeon-shaped effect leaking
into town, and the mastery band still applies there by inheritance rather
than decision.

---

## B2. `Party.restore()` has zero callers — OPEN

**Severity: the save is write-only. Found by: `npm run audit`.**

`Chronicles.save()` serialises the party into localStorage. Nothing ever
deserialises it back into a playable party: `Party.restore` is called
from exactly one place, `Party.js` itself, restoring *members* inside a
party that was never itself restored.

Consequences:
- a browser refresh loses an in-progress campaign entirely
- `Adventurer.restore`'s careful id-preferring rehydration logic is
  exercised only by tests
- adding `wayIn` to `toJSON` (this session) was harmless and pointless

The archive is a **read-only shelf of finished sagas**, not a save file.
That may be the intent — but the code is shaped like a save file that
does not work, which is the worst of both. See `ARCHITECTURE.md` A2.

---

## B3. `detectSecretDoor` is a predicate that mutates — OPEN

**Severity: latent. Found by: reviewing my own change.**

It reads as a question and answers by spending resources:

```js
if (party.wayIn > 0) { party.wayIn--; party.foundByReading = true; return true; }
```

Two tests already call it as a pure predicate
(`preps.test.js`, `procgen2.test.js`). They pass only because their
fixtures have `wayIn === 0`. A future test that gives a party a reading
and asks twice whether it spots a door will get different answers and no
obvious reason why.

The paired flag (`foundByReading`, set here and cleared in
`composeSecretFound`) is correct in the one app path that exists, and
would go stale if anything ever called the detector without narrating the
result.

---

## B4. Transient combat flags are never initialised — OPEN, cosmetic

**Severity: low. Found by: `npm run audit` state contract check.**

`starBlessed`, `forewarned`, `forcedFormation`, `foundByReading` are
created by assignment wherever they are first set, never declared in the
`Party` constructor. They therefore read as `undefined` rather than
`false` before first use, and do not appear in `toJSON`.

Harmless today because B2 means nothing restores a party mid-delve. It
becomes a real data-loss bug the moment a resume feature exists — and
notably `TownEncounters.js` sets `forewarned` and `starBlessed` in town,
intending them to carry *into* the next delve, which is exactly the
boundary a save would cross.

---

## B5. Two audit checks reported findings that did not exist — FIXED

**Severity: meta, and the most important entry here.**

The first run of `npm run audit` confidently reported:
- **all 21** state fields missing from the save (`String.split` cuts at
  every occurrence, and `toJSON`'s body contains `m.toJSON()`, so the
  parser captured 57 characters)
- **39** town options with no prose (town options are player-chosen and
  have no deliberation beat; they were never supposed to have phrases)

Both were fixed by teaching the checks what legitimate looks like. This
is the same failure the dramaturg shipped twice (`PERPLEXITIES.md` Q3):
**an instrument that cannot be wrong is not measuring anything.** When a
new check reports a large number, suspect the check first.
