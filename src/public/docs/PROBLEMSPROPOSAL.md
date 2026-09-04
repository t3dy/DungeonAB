# PROBLEMS — PROPOSALS

Ranked options per entry in `PROBLEMS.md`. Recommendation ★.

---

## For P1 — shared resolver leaks between town and dungeon

See `BUGSPROPOSAL.md` B1 / `ARCHITECTUREPROPOSAL.md` A1.
**★ Declared effect scope** — one place to look, and the next
dungeon-shaped effect fails loudly instead of leaking.

---

## For P2 — deaths in wipes are deaths of strangers

**★ Option 1: give the back rank a pre-fight line of its own.**
The point-man line names whoever stands in front; nothing names the
people behind. A rationed "who is doing what" beat on the first dangerous
room of each floor — the wizard readying a working, the cleric counting
doses — would introduce them before the wipe.
*Cost:* writing plus a rationing rule. *Risk:* padding if it fires too
often; once a floor is the budget.

**Option 2: name the dying in the wipe itself.**
`composeWipe` names each fallen with one clause. *Cost:* small.
*Risk:* meets the letter of the probe (they get a line) while missing its
point, which is that they should have been met *earlier*.

**Option 3: accept it and report the aggregate.**
68% of deaths are already of somebody met — see
`DRAMATURGISSUESPROPOSAL` D5. *Cost:* none.

---

## For P3 — continuity needs sources, not plumbing

**★ Option 1: make existing carries fire more often.**
`forewarned` needs a trap after it; `starBlessed` needs a fight. Both are
two-gate effects (`SIMULATIONFINDINGS.md` S5). Widening the class of room
each applies to raises continuity with no new content.
*Cost:* small. **Cheapest real movement on the dramaturg's worst value.**

**Option 2: author two or three new forward-reaching effects.**
Candidates that fit the fiction and reuse existing systems: a monster
that follows into the next room (the alarm already models "the dungeon
heard that"); a debt owed to something that let the party past
(`monster-grievance` already ends in a bargain); a theft the dungeon
notices later (`desecrated` already exists as a flag).
*Cost:* content plus wiring both ends. *Risk:* the dead-declaration class
— **wire the consumption first, then the grant.**

---

## For P4 — access levers are opportunity-bound

**★ Option 1: give surplus readings a sink.**
Unspent `wayIn` converts at delve end. Fixes the saturation directly.
*Cost:* small. *Risk:* turns an access mechanic into a margins mechanic,
which is a design change rather than a fix — worth naming as such.

**Option 2: raise the addressable population.**
More sealed content costs room budget, which is zero-sum. Not recommended
before the S1 measurement.

---

## For P5 — fallbacks die on every rebalance

**★ Derive the weight rather than table it** —
`SIMULATIONFINDINGSPROPOSAL` S8 Option 1, with the census gate from
Option 2 as a companion so the next occurrence fails the suite rather
than being noticed after the fact.

---

## For P6 — six mechanics under 5% of delves

**★ See `CONTENTREACHPROPOSAL.md` R1.** Diagnose offered-versus-wanted
before touching anything. `turn undead` is the one worth the time: it is a
whole class's signature move.

---

## For P7 — score inflation unreconciled with the benchmark

**★ Run `npm run bench` and read the drift.** One command, outstanding
since the mastery band landed. Nothing reads score, so nothing failed and
nothing checked.
