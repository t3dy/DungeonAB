# BUGS — PROPOSALS

Ranked options per defect in `BUGS.md`. Recommendation marked ★.

---

## For B1 — effects leak between town and dungeon

**★ Option 1: declare scope on the effect, not the call site.**
Give side effects a `scope: 'delve' | 'campaign'` and have
`resolveEncounterOption` refuse out-of-scope grants. One place to look,
and the next dungeon-shaped effect fails loudly instead of leaking.
*Cost:* small refactor of the grant block. *Risk:* none identified.

**Option 2: two resolvers over a shared core.**
`resolveDelveOption` / `resolveTownOption` wrapping a common evaluator.
Structurally clearest, and makes the mastery-in-town question explicit
rather than inherited. *Cost:* moderate; two call sites and their tests.

**Option 3: leave the patch and add a test.**
Assert town grants no `wayIn`. *Cost:* minutes. *Risk:* catches this
instance only — the class stays open, which is what filed it as P1.

---

## For B2 — the save is write-only

**★ Option 1: decide it is an archive, and make the code say so.**
Delete `Party.restore`, rename `toJSON` to something like
`toArchiveRecord`, and document that a campaign lives only in memory.
Removes a phantom feature and shrinks the surface.
*Cost:* small. *Risk:* forecloses resume; reversible from git.

**Option 2: finish the resume.**
Wire `Party.restore` into a "continue saga" path, add the four transient
flags to the round trip, and gate the contract in `tests/archive` the way
dungeon layouts already are. *Cost:* real feature work plus UI. *Risk:*
the transient flags are exactly the fiddly part (`DATACONTRACTS.md` C1).

**Option 3: leave it.** *Cost:* none. *Risk:* the next person adds a
field to `toJSON` believing it matters. Only acceptable alongside a
comment in `Party.toJSON` saying it is archive-only.

---

## For B3 — predicates that mutate

**★ Option 1: rename to say what they do.**
`detectSecretDoor` → `attemptSecretDoor`, `openLockedWing` →
`attemptLockedWing`. Zero behaviour change; the two tests calling them as
predicates immediately read as suspicious. *Cost:* trivial.

**Option 2: split pure from effectful.**
`canSpotSecretDoor(party, roll)` and `spendReadingOnDoor(party)`. Cleanest
and makes both testable in isolation. *Cost:* moderate; changes the
Simulator call sites.

---

## For B4 — uninitialised transient flags

**★ Option 1: declare them in the constructor with a comment.**
`this.starBlessed = false;` etc., grouped and labelled "consumed within a
delve; deliberately not saved". Makes the intent explicit and the audit's
excuse list unnecessary. *Cost:* minutes.

**Option 2: fold them into one `this.pending = {}` bag.**
One place, obviously transient, trivially serialisable if B2 Option 2
ever lands. *Cost:* small refactor across four consumers.

---

## For B5 — instruments reporting their own bugs

**★ Option 1: adopt the rule as a habit, not a feature.**
Already written into `MEASUREMENT.md` M4. When a check reports a large or
round number, verify by hand before believing it. *Cost:* none.

**Option 2: give every audit check a fixture.**
A tiny known-good and known-bad input per check, asserted in
`tests/audit.test.js`. This is what `tests/dramaturg` does for the
poetics, and it caught two probe bugs. *Cost:* a test file. *Risk:* none;
this is the durable version of Option 1 and would be my choice if the
audit tool grows past its current six checks.
