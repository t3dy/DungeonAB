# MEASUREMENT

How to measure this game without fooling yourself. Every rule below was
learned by being fooled, usually more than once, and each says which
mistake produced it.

Read this before quoting a number, and before concluding a change worked.

---

## M1. Which tool answers which question

| question | tool | n |
|---|---|---|
| does the draft pay off? | `npm run margins` | 600 games |
| do the transcripts read well? | `npm run simulate` | 120 delves |
| does anyone meet this mechanic? | `npm run census` | 600 delves |
| is the difficulty curve intact? | `npm run bench` / `tests/balance-gate` | 700 |
| what does one card contribute? | `npm run card <id>` | — |
| are the structures still in sync? | `npm run audit` | static |

`npm test` is a **gate** — a failure means something broke. `npm run
audit` is an **instrument** — a finding usually means something is
unfinished. Do not conflate them.

---

## M2. Several hundred delves, or say nothing

Two claims were reported as successes and then evaporated:

| claim | at n≈150 | at n≈500 |
|---|---|---|
| party size differentiates | 67% vs 100% | flat ~90% |
| breadth wins at `hard` | 64% vs 80% | 68.1% vs 71.6%, 0.8σ |

Both were bucket comparisons on a few dozen games per bucket. **A
draft-shape or party-shape bucket needs several hundred delves.** When a
promising gap appears, re-run at n≥500 *before* writing it down.

---

## M3. Know which variables are controlled before you measure them

Win rate is held to 99/88/71/45 by `npm run calibrate` and gated by
`tests/balance-gate`. Three sessions measured draft quality against it
and read the flat result as a design failure. It was a tautology: the
machinery exists to prevent exactly that variable from moving.

**Before measuring X against Y, ask what is actively holding Y still.**

(Unresolved caveat: `margins` now shows a six-point win-rate spread
between narrow and broad drafts, which the clean version of this rule
says should not exist. See `PERPLEXITIES.md` Q1.)

---

## M4. An instrument that cannot be wrong is not measuring anything

Four instruments in this project have reported confident findings that
were their own bugs:

- `protagonist` probe: 100% of delves "name nobody" — the roster parser
  never stripped the icon off `"✨ Simon Forman (cleric)"`
- `rationing` probe: 100% fail — it asked whether a room had *any* beat
  (always true) instead of whether one stood out
- audit state-contract check: all 21 fields "unsaved" — `String.split`
  cuts at every occurrence and the `toJSON` body contains `m.toJSON()`
- audit prose check: 39 town options "missing phrases" — town options
  never needed them

**When a new check reports a large or round number, suspect the check.**
`tests/dramaturg` now requires every probe to fire both ways against
fixtures and forbids any probe that fails every real delve.

---

## M5. Measure the mediator, not just the outcome

The `wayIn` access lever looked like a failure: payoff flat across draft
quality (0.17 vs 0.19). Measuring the mediating variable explained it —
grants *were* draft-sensitive (1.10 vs 1.44), but opportunity saturated
at ~0.8 addressable doors a delve, so extra readings had nothing to buy.

Without that middle measurement the conclusion would have been "the lever
does not work" rather than "the lever is opportunity-bound", which have
completely different fixes.

---

## M6. Anything you measure becomes a target within the hour

The dramaturg's nine values were written to judge logs and became the
acceptance gate for narrative work in the same session, moving 96%→21%
and 85%→64% because they were pushed there.

That is not a reason to stop measuring. It is a reason to keep at least
one channel that is **not** an optimisation target — currently that would
be a person reading transcripts, which has not happened
(`DRAMATURGISSUES.md` D6).

---

## M7. Read the golden diff, and know why it is large

`npm run bless` rewrites frozen transcripts. Any new `pick()` call shifts
the whole seeded RNG stream, so one added line can rewrite most of a
golden — 107 insertions for a three-line change.

The tool prints *"a golden re-blessed unread tests nothing"* and means it.
Large diffs are expected; unread ones are how prose regressions ship.

---

## M8. Report the residue

Every measured claim in this project's documents states what it did *not*
fix. `mortalityEarned` went 85%→64% and the residue is deaths in wipes.
Score discrimination doubled and is still r=0.124. The habit exists
because a claim without a residue reads as finished, and none of these
are.
