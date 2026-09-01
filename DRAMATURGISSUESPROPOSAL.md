# DRAMATURG ISSUES — PROPOSALS

Ranked options per entry in `DRAMATURGISSUES.md`. Recommendation ★.

---

## For D1/D6 — it is an optimisation target and no human has read the corpus

**★ Option 1: a stratified reading pass, ten transcripts.**
Take the best-scoring, worst-scoring and three median logs from
`/logs/`, read them end to end, and record — in prose — which ones you
would tell someone about and why. Then compare against the dramaturg's
ranking. This is the only experiment that can validate or refute the
poetics, it costs an hour, and everything else here is downstream of it.
*Risk:* it may show the poetics is measuring the wrong things, which is
the point.

**Option 2: a second, independent critic.**
A different set of values (pacing, voice consistency, surprise) built
without reference to the first, agreeing or disagreeing. *Cost:* a whole
module. *Risk:* two instruments optimised against instead of one.

**Option 3: hold-out values.**
Keep three values that are never optimised toward and watch whether they
drift when the others are pushed. Cheap early warning for Goodhart.
*Cost:* small. *Risk:* requires the discipline not to fix them.

---

## For D3 — probes string-match prose that moves

**★ Option 1: prefer structure where structure exists.**
`reversal` should read `events[].field === 'health'` rather than grep for
`/damage|explodes/`; `specificity` can read whether the resolver returned
numbers. Convert the probes that have a structural signal; leave the ones
that genuinely judge prose (`roadNotTaken`) as text matching.
*Cost:* moderate, per probe. *Risk:* none — strictly more reliable.

**Option 2: emit markers from the mechanics.**
A carry sets `result.carriedFrom = turn`, and `continuity` counts that
instead of matching eleven phrases. Kills `DATACONTRACTS.md` C2 outright.
*Cost:* touching every forward-reaching effect. *Risk:* low; would be my
choice if continuity work continues.

**Option 3: keep matching, keep the audit check.** *Cost:* none. Already
in place; catches orphaned markers but not untaught carries.

---

## For D4 — concision's caps have been raised twice

**★ Option 1: freeze the caps and treat a third raise as a design smell.**
Write the current three thresholds down as a contract with a date, and
require that any future raise be argued in `DESIGN_DIALOGUE` rather than
edited in. *Cost:* none. *Risk:* none.

**Option 2: measure the budget instead of the output.**
Assert that `editPreps` folded whatever exceeded the budget — a direct
test of the editor — and drop the character caps entirely. Tests the
mechanism rather than a proxy for it. *Cost:* small. *Risk:* stops
catching prose that is long for reasons other than preps.

---

## For D5 — mortalityEarned fails a delve for one anonymous death

**★ Option 1: report both numbers, change neither.**
The probe keeps its strict per-delve verdict; the corpus summary also
prints the aggregate (68% of deaths are of somebody met). The headline
stops overstating without the test being weakened.
*Cost:* a few lines in `critique()`.

**Option 2: exempt total-party-kills.**
A wipe is a structural edge case. *Risk:* this is scoring the test to the
result, which this project has refused elsewhere. Not recommended without
a stronger argument than convenience.
