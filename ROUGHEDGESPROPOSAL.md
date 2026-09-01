# ROUGH EDGES — PROPOSALS

Ranked options per entry in `ROUGHEDGES.md`. Recommendation ★.
These are cheap; several are one-liners. Grouped by whether they pay off
immediately or only prevent a future loss.

---

## Worth doing next time the area is touched

### R1 — the committed log corpus dominates every diff (2.2 MB, 121 files)

**★ Option 1: commit a sample, generate the rest.**
Keep ten representative transcripts under version control (best, worst,
median, one wipe, one per difficulty) and gitignore the remainder,
generating the full corpus in CI or on demand. Diffs become readable;
`/logs/` on the deployed site still gets everything.
*Cost:* a build step. *Risk:* the deployed corpus and the committed
sample can diverge — mitigate by generating both from one seed list.

**Option 2: gitignore the whole corpus.** Cleanest diffs, but `/logs/`
then only exists after someone runs the tool, which breaks the "browsable
on the site" property that justified building it.

**Option 3: keep it.** The pages *are* the deliverable. Acceptable if
reviewers learn to filter — but it has already buried three-line source
changes under 125-file commits.

### R7 — golden diffs are large for small changes

**★ Separate the RNG streams** — `MEASUREMENTPROPOSAL` M7 Option 1.
Prose `pick()` currently draws from the same stream as combat, so one new
line rewrites a whole golden. This is the single change that would most
improve review quality, and "read the diff before blessing" is already
strained at 107 lines for a three-line change.

### R9 — `resolveEncounterOption` recomputes what the caller knew

**★ Pass `depth` and `improvised` through from `evaluateOptions`.**
The function already accepts `opts.depth` and nothing supplies it, so
there are two implementations of one rule that can drift.
*Cost:* one call site in `RoomEncounters.resolveRoomAction`.

### R8 — `addScore` does not clamp

**★ Move the floor into `addScore` itself.**
The guard against negative running score currently lives at the mastery
call site, so the next subtractive effect must remember to write its own.
*Cost:* one line, plus checking no caller relies on going negative.

---

## Habits and conventions, no code

### R2 — `grep -rn src/` hits frozen minified builds

**★ Use the `LIVE_DIRS` convention**, now recorded in `tools/audit.mjs`
and `ROUGHEDGES.md`. Not worth restructuring the tree
(`ARCHITECTUREPROPOSAL` A6).

### R3 — `CARRY_MARKERS` hand-synced, broken twice

**★ Emit markers from the mechanics** — `DATACONTRACTSPROPOSAL` C2
Option 1. Retires the contract instead of policing it, and closes a
dramaturg issue (D3) at the same time.

### R6 — three manual steps after a narrative change

**★ Option 1: one `npm run report` wrapper** (`MEASUREMENTPROPOSAL` M1).
Forgetting `bless` fails the suite; forgetting `simulate` leaves the
published corpus describing a game that no longer exists, **silently** —
that asymmetry is the whole argument.

**Option 2: a note in `CLAUDE.md`.** Free; relies on memory, which is
what a fresh session lacks.

### R11 — fixtures break on pool changes

**★ Keep the rule, keep it visible: fix the fixture party, never the
rule.** Already written into `ROUGHEDGES.md` and observed twice this
session under pressure. No code change.

---

## Low priority

### R4 — emoji vocabulary collisions (🛡️ means four things)

**★ Option 1: a lint over the icon table.**
Each icon maps to one semantic class; flag reuse across classes.
*Cost:* small, and purely a reading improvement. Only visible in
transcripts, which is where the reading pass would surface it anyway.

### R5 — dramaturg probes are heuristic string matching

**★ Prefer structure where it exists** — `DRAMATURGISSUESPROPOSAL` D3.

### R10 — `tests/features.test.js` flaked once

**★ Leave it; note the date.** Not reproduced in five subsequent runs. If
it recurs, it is real and the two runs bracket the change that caused it.

### R12 — log page URLs are not permalinks

**★ Option 1: key the filename on the seed** (`delve-log-medium-7.html`)
rather than corpus position. Stable across regeneration, and the seed is
already printed on the page as the reproduction key.
*Cost:* one line in `tools/simulate.mjs`. *Risk:* none — and it makes the
corpus linkable from these documents, which none of them currently do.
