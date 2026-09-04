# MEASUREMENT — PROPOSALS

`MEASUREMENT.md` is mostly rules rather than defects, so these are
proposals for making the rules stick rather than fixes. Recommendation ★.

---

## For M2 — sample sizes that lie

**★ Option 1: make the tools refuse to report an unsafe bucket.**
`margins` already prints bucket sizes; it should decline to print a
comparison when either bucket is under ~150, or label it
`INSUFFICIENT`. The two false wins in this project were both readable
numbers in a table with no warning attached. *Cost:* a few lines.
*Risk:* none.

**Option 2: print a confidence interval next to every rate.**
More honest and more work to read. *Cost:* small. *Risk:* invites
interpreting σ as significance without a stated test.

---

## For M4 — instruments reporting their own bugs

**★ Option 1: fixtures for every audit check.**
`tests/dramaturg` does this for the poetics and caught two probe bugs;
`tools/audit.mjs` currently has six checks and no fixtures, and two of
them shipped false findings on their first run. A known-good and
known-bad input each. *Cost:* one test file. *Risk:* none.

**Option 2: rely on the habit in M4.** *Cost:* none. *Risk:* the habit
worked twice this session because the numbers were suspiciously round; it
will not always be that obvious.

---

## For M6 — everything measured becomes a target

**★ Option 1: the human reading pass, as the un-optimised channel.**
Detailed in `DRAMATURGISSUESPROPOSAL` D1. Nothing else on this list
substitutes for it, because every automated channel is by construction
optimisable.

**Option 2: hold-out values in the dramaturg.**
Three values nobody is allowed to fix, watched for drift.
*Cost:* small. *Risk:* requires discipline the project has not been
tested on.

---

## For M7 — golden diffs are large

**★ Option 1: separate the RNG streams.**
Prose `pick()` calls draw from the same stream as combat rolls, so adding
one line rewrites a whole golden. A dedicated stream for narration would
make prose diffs show *only* prose changes. *Cost:* moderate; touches the
seeding trick in `bless.mjs` and `Narrator`. *Risk:* one large
re-bless when it lands, then permanently cleaner diffs.
**This is the single change that would most improve review quality.**

**Option 2: accept it, keep the tool's warning.** *Cost:* none. *Risk:*
"read the diff before blessing" gets harder every time, and it is already
a 107-line diff for a three-line change.

---

## For M1 — which tool answers which question

**★ Option 1: one entry point.**
`npm run report` running audit + census + a small margins pass and
emitting a dated markdown summary. The knowledge of which tool answers
what stops being tribal. *Cost:* small wrapper. *Risk:* long runtime
discourages use — keep the margins pass small and let the heavy runs stay
separate.

**Option 2: leave the table in `MEASUREMENT.md`.** *Cost:* none. Adequate
while the tool count is seven.
