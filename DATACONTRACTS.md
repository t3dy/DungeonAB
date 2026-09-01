# DATA CONTRACTS

Places where two or more structures must agree, what enforces each
agreement, and which ones are held together by hand. Every entry marked
UNGATED has broken before or will.

`npm run audit` checks the mechanical ones.

---

## C1. snapshot / FIELDS / save — two thirds gated

Party state must agree in three places:

| structure | purpose | enforced by |
|---|---|---|
| `Chronicle.snapshotState()` | what the ledger diffs each tick | — |
| `Chronicle.FIELDS` | how each change is written | **`tests/silence`** |
| `Party.toJSON()` | what survives a save | **UNGATED** |

The first pair is the strongest rule in the project (standing rule 7: no
state change is silent). Add a field to the snapshot without writing for
it and the suite fails.

The **third is unenforced**, and currently vacuous: nothing restores a
party (`ARCHITECTURE.md` A2). `npm run audit` reports genuine gaps after
excusing per-member fields (saved through `members[]`), run state
(`roomsCleared`, `floor`), and one rename (`poison` ↔ `poisonLinger`).
Current status: **none**.

Trap for the next session: four transient flags (`starBlessed`,
`forewarned`, `forcedFormation`, `foundByReading`) are in *neither* the
snapshot nor the save, because they are consumed within a delve. But
`TownEncounters` sets two of them **in town, intending them to cross into
the delve** — the exact boundary a save would cut.

---

## C2. `CARRY_MARKERS` ↔ the prose it matches — UNGATED, broken twice

`Dramaturg.CARRY_MARKERS` is eleven phrases matched against transcript
text to detect continuity. It is hand-synced with the writing and has
broken both times the writing changed:

- shortening the forced-formation line orphaned `came through the last room`
- the venom aside was a real carry the probe was never taught

`npm run audit` now reports markers that no prose in the codebase
contains, which catches the first kind. It cannot catch the second — a
carry that exists and has no marker.

**Rule: change a carry's writing, change its marker in the same commit.**

---

## C3. `rides` declarations ↔ `RIDERS_BY_ROOM` — GATED

Each encounter declares `rides: ['treasure', 'vault']`; `DungeonGen`
holds `RIDERS_BY_ROOM` as plain data (deliberately *not* read from the
engine, so generation never depends on import order — an empty registry
would silently produce dungeons with no riders at all).

Both directions checked by `tests/riders` and by `npm run audit`.
Currently clean.

---

## C4. Option ids ↔ `OPTION_PHRASES` — GATED for the dungeon only

Every dungeon option needs a phrase for the deliberation beat ("they
might have chosen to force the door"). `tests/prose` gates it.

**Town options are exempt and must stay exempt**: they are chosen by the
player, so there is no deliberation, and their outcome prose is the
`narrative` string on the result. The first version of the audit reported
all 39 as findings; none were.

---

## C5. Card promises ↔ what the code does — GATED, with an escape hatch

`tests/assets` holds two rules: a card's promised effect must exist, and
its writing must reach the player in at least one delve in ten.

This is the strongest content contract in the project and it has real
teeth — it is what forced `alchemy` to a documented three-owner exception
during the scarcity rebalance, because three cards' printed text promised
brewing and a promise outranks a balance cap.

The escape hatch is that exceptions are declared in the test
(`ALLOWED = { alchemy: 3 }`). Two exceptions exist across the suite. A
third should prompt asking whether the rule is right.

---

## C6. Mastery bands ↔ the numbers the prose states — GATED by design

The gradient-gate band (`EncounterEngine.MASTERY`) is **additive** and
narrated in its own sentence, specifically so it never contradicts an
encounter's own claims. Each of the 86 gated options states its own
figures ("+40 gold, +25 score"); scaling those silently would make every
one of those sentences a lie, which `tests/prose` gates and which is the
Aegis of Ash failure (standing rule 13).

This is a contract enforced by *architecture* rather than by a test: the
shape of the feature makes the violation impossible. Prefer this where it
is available.

---

## C7. `MINING_REPORT.md` ↔ the constants it was measured against — GATED, stale

The benchmark stamps the `STAT_SCALE` it ran against, so a stale report
fails rather than quietly describing a different game.

`STAT_SCALE` has not changed, so the gate passes. But the **mastery band
adds up to ~50 renown a delve** on a ~390 baseline and the report predates
it. Nothing reads score, so nothing failed and nothing checked
(`BALANCEISSUES.md` B7). The stamp guards the constant, not the outcome.
