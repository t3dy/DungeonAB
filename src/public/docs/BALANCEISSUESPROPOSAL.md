# BALANCE ISSUES — PROPOSALS

Ranked options per measured problem in `BALANCEISSUES.md`.
Recommendation ★. Every proposal here should be verified with
`npm run margins` at n≥600 after landing — see `MEASUREMENT.md` M2.

---

## For B1 — draft breadth explains ~1.5% of score variance (r=0.124)

**★ Option 1: shrink the draft-insensitive score sources.**
Score is dominated by monsters killed, rooms cleared and gold — none of
which the draft touches. Every attempt so far has *added* draft-sensitive
bonuses on top (the mastery band took r from 0.084 to 0.124); reducing the
insensitive base makes the sensitive part a larger share of the same
total. *Cost:* a calibration pass and a re-bless. *Risk:* touches the
curve — must be done with `npm run bench`, and interacts with B7.

**Option 2: keep adding sensitive sources.**
Cheaper per step and demonstrably works, but the returns are small and
each addition inflates total score further (B7).

**Option 3: accept r≈0.12 as the design.**
Defensible if the intent is that the draft is *one* of several inputs.
Requires saying so in `DESIGN.md`, because three sessions have assumed
otherwise.

---

## For B2 — trophies correlate negatively with draft quality (r=−0.077)

**★ Option 1: leave the mechanic, fix the scoreboard.**
A good draft talks past fights a bad draft must win; collecting fewer
trophies is *correct fiction*. The defect is that trophies feed score, so
the game penalises skilled play on one currency for succeeding on
another. Decouple: keep trophies as a record, stop scoring them — or
score the *avoided* fight equivalently. *Cost:* small. *Risk:* trophies
become purely decorative unless they retain another use (they are kit).

**Option 2: award a trophy-equivalent for a talked-down monster.**
Preserves the currency and rewards the capability route.
*Cost:* small, plus writing. *Risk:* dilutes what a trophy means.

---

## For B3 — rooms cleared is flat-to-negative (r=−0.029)

**★ Option 1: fix B2 first and re-measure.**
The same fight-avoidance almost certainly drives both. Two symptoms, one
cause; do not treat them separately until the shared cause is ruled out.
*Cost:* one measurement after B2.

**Option 2: make access visibly additive.**
Wings opened by `wayIn` splice rooms into the path, so they *should*
raise the count. They are drowned at 20% reach (P4). Fixing the
saturation may surface this without touching anything else.

---

## For B4 — the "controlled variable" moved six points

**★ The S1 measurement.** This is the same outstanding item as
`SIMULATIONFINDINGSPROPOSAL` S1 and `PERPLEXITIESPROPOSAL` Q1, and it
blocks confident interpretation of B1–B3. Do it first.

---

## For B5 — situations starved at ~1.03 per delve

**★ Option 1: more riders** (`CONTENTREACHPROPOSAL` R2 Option 1). Zero
room-budget cost, and the ridden room types are not saturated.

**Option 2: let the true situations ride as well.**
A `rides` declaration each would multiply their appearances immediately.
*Cost:* trivial. *Risk:* a whole-room encounter may read oddly attached
to a treasure room — this needs reading, not measuring.

**Do not** buy situations from `TYPE_WEIGHTS`. Three separate attempts
each broke something a test protects (§N).

---

## For B6 — `wayIn` oversupplied ~50% against its sinks

**★ Give surplus readings a sink** (`PROBLEMSPROPOSAL` P4 Option 1).
The alternative — more sealed content — costs room budget.

---

## For B7 — score inflation unreconciled

**★ Option 1: `npm run bench`, read the drift, re-stamp.**
One command. Outstanding since the mastery band landed. Interacts with
B1 Option 1, so run it *before* any score rebalance rather than after.

**Option 2: extend the benchmark stamp to a score baseline.**
Would have caught this. *Cost:* small. *Risk:* another thing that goes
stale and fails builds benignly — only worth it if score baselines start
mattering, which B1 Option 1 would make true.

---

## For B8 — nightmare read 39% against a 45% target

**★ Option 1: `npm run calibrate` and trust it over the hint.**
The 39% came from n=160, which is exactly the sample size this project
has twice been fooled by. Do not tune on it. *Cost:* one tool run.
