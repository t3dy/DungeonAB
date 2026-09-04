# BALANCE ISSUES

Measured numbers that look wrong, with how they were measured so they can
be re-measured. Nothing here is an impression.

**Standing rule, learned twice the hard way:** a party-shape or
draft-breadth bucket needs several hundred delves before it says
anything. Two separate "wins" in this project were noise at n≈150 that
vanished at n≈500. Default to `npm run margins` (n=600) and treat
anything smaller as a hint.

Tools: `npm run margins` (draft payoff), `npm run bench` (the curve),
`npm run census` (mechanic reach), `npm run calibrate` (constants),
`npm run simulate` (transcripts + the dramaturg's read).

---

## B1. Draft breadth barely moves score, and that is the headline number

`npm run margins 150 medium`, n=600, quartile split on capability breadth:

| | narrow | broad | pearson r |
|---|---|---|---|
| score | 386.9 | 420.3 | **0.124** |
| survivors | 2.9 | 3.3 | 0.151 |
| trophies | 1.8 | 1.6 | **-0.077** |
| rooms cleared | 11.1 | 10.8 | -0.029 |
| vaults reached | 0.4 | 0.5 | 0.074 |

r = 0.124 is the *improved* figure — it was 0.084 before gradient gates
(§Q), and on wider-spread random pools the gap reads +16%. But an r of
0.12 means capability breadth explains ~1.5% of score variance. The
overwhelming majority of a party's renown comes from sources the draft
does not touch (monsters killed, rooms cleared, gold found).

**The lever that would actually work has not been tried:** making the
draft-insensitive score sources smaller, rather than adding more
draft-sensitive ones on top.

---

## B2. Trophies correlate *negatively* with draft quality

r = **-0.077**, narrow 1.8 vs broad 1.6. Better drafts collect fewer
trophies.

Almost certainly because trophies drop from kills, and a party that
answers situations with capabilities *avoids* fights that a narrow party
has to fight. So the good draft is being penalised on one currency for
being good on another.

Not obviously wrong as fiction. Definitely wrong as a scoreboard, since
trophies feed score.

---

## B3. Rooms cleared is flat-to-negative (r = -0.029)

Broad drafts clear 10.8 rooms against narrow 11.1. The access levers
(`wayIn` opening wings, deducing secret doors) were supposed to make good
drafts see *more* dungeon. They do, occasionally — 20% of delves — but
the effect is swamped, and possibly inverted by the same fight-avoidance
as B2.

The design decision was "margins **and** content access". Access is
currently not measurable in the aggregate.

---

## B4. The "controlled variable" moved six points

Win rate at medium: narrow 87.4%, broad 93.4%.

The whole framing of the draft-payoff work is that win rate is calibrated
flat and therefore cannot express draft quality. A six-point spread
contradicts that, or at least complicates it (see PERPLEXITIES Q1). Either
the calibration holds only the population mean, or the gradient-gate
change leaked into survivability.

Worth resolving before any further conclusions are drawn from "win rate
can't show it."

---

## B5. Situations are content-starved at ~1.03 per delve

Situations are where the capability engine examines the draft. A delve
holds 1.03 and a run reaches ~0.80 of them. Fourteen encounters are
written; a given party meets one.

Every attempt to raise this cost something a test protects (§N):
- a 3-situation guarantee stripped the Ice Caverns from 1.0 disasters a
  delve to 0.25
- excluding theme-boosted rooms fixed that and cost the Greatsword its
  swarms (promised writing on 0% of delves, floor is 10%)
- weight 4.5 bought situations with monsters; weight 6 flattened every
  theme into every other theme

The **rider** system (§O) sidesteps this — capability tests ride rooms
that already have a job, reaching 2.75 tests a delve at zero room cost —
but true situation rooms remain rare, and only they get the full
three-beat treatment.

---

## B6. The access levers have almost nothing to open

Per delve: 1.42 branches, of which 0.68 secret, 0.33 locked (0.13 of
those keyless), 0.41 open.

`wayIn` addresses the secret + keyless-locked population: **~0.8
opportunities a delve**, against 1.10–1.44 readings earned. The resource
is oversupplied relative to its sinks by roughly 50%, which is why
spending is flat across draft quality (0.17 vs 0.19).

---

## B7. Score inflation from mastery is unmeasured against the benchmark

The mastery band pays up to +25 per situation. `MINING_REPORT.md` and the
calibration constants predate it. `tests/balance-gate` reads win rate, not
score, so nothing failed and nothing checked.

`npm run bench` has not been re-run since. The report's `STAT_SCALE`
stamp is still valid (that constant did not change), so the gate will not
catch a score baseline that has quietly moved.

---

## B8. Nightmare measured 39% against a 45% target

From a difficulty sweep at n=160: easy/medium/hard/nightmare came out
89/73/39. The target curve is 99/88/71/45.

Medium and hard sit close. Nightmare read six points low, on a sample too
small to be conclusive — which is exactly the size of sample this project
has twice been fooled by. `npm run calibrate` is the tool; it has not been
run since the gradient-gate change.
