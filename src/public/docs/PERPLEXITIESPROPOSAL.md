# PERPLEXITIES — PROPOSALS

These are open questions rather than defects, so most entries propose
*the experiment that would settle it* rather than a fix.
Recommendation ★.

---

## For Q1 — what is win rate for, if it is calibrated flat?

**★ Option 1: measure it properly and settle the contradiction.**
`SIMULATIONFINDINGSPROPOSAL` S1. Three sessions of framing rest on "win
rate is a controlled variable", and `npm run margins` contradicts it by
six points (87.4% narrow / 93.4% broad). Nothing else in this file is as
cheap or as load-bearing. *Cost:* two tool runs at n≥1000.

**Option 2: redefine the calibration target explicitly.**
Write down whether 99/88/71/45 is a population mean that individual
drafts may vary around, or a ceiling on variance. The tools would then
measure against a stated intent rather than an assumed one.
*Cost:* a paragraph in `DESIGN.md` — but only after Option 1.

---

## For Q2 — discovered protagonist, or assignment with extra steps?

**★ Option 1: check whether the subject is always a fighter.**
Directly measurable over `/logs/`: how often is the most-named magus a
fighter? If it is 90%, "discovered" is a thin claim and the honest
description is "the saga is about whoever stands in front".
*Cost:* one measurement.

**Option 2: give the back rank its own spotlight events.**
The caster who ends a fight, the diviner whose warning paid. Makes the
subject vary by *what happened* rather than by role.
*Cost:* content plus rationing. Depends on Option 1's answer.

---

## For Q3 — everything measured becomes a target

**★ The human reading pass** (`DRAMATURGISSUESPROPOSAL` D1). This is the
same recommendation arriving from a third direction, which is itself an
argument for doing it before more narrative work.

---

## For Q4 — if adjacency opens the door, what is a capability?

**★ Option 1: write the answer down and let it constrain the table.**
A capability is a *position in a space of competences*, and `AFFINITIES`
is the metric on that space. Accepting that means card text should stop
implying exclusivity, and the affinity table becomes a design surface
needing the same care as the cards.
*Cost:* a decision plus a card-text pass. *Risk:* none — it makes
explicit what the code already does.

**Option 2: restrict adjacency per option.**
Some problems admit no substitute; an `exact: true` flag would let an
option refuse improvisers. *Cost:* small. *Risk:* reintroduces binary
gates piecemeal, which is precisely what the gradient change removed.

**Sub-question that needs deciding either way:** should the mastery band
apply in town? It currently does, by inheritance rather than by choice.

---

## For Q5 — is 45% prose reuse bad?

**★ Option 1: separate template reuse from repetition.**
The stair line appears in 70 of 120 delves and *should* — a room type has
to introduce itself. Measure reuse excluding predicaments, which are
templates by design; the remaining figure is the one that means
something. *Cost:* a small change to `repetitionAcross`.

**Option 2: set a target and tune to it.** Not recommended until Option 1
says what the real number is — the current 45% is measuring the wrong
population.

---

## For Q6 — if the prose is complete, the ledger is dead weight

**★ Option 1: decide what the fold is for.**
The concision editor now moves real content into the ledger — up to eight
lines in a heavy fight. Either those lines matter, and something should
surface them, or they do not, and they could be dropped entirely.
*Cost:* a decision. Note that "recorded but never read" is exactly the
state standing rule 12 calls *not in the game*.

---

## For Q7 — the magi are research claims and balance targets at once

**★ Option 1: separate the two layers in the data.**
A card carries `historical: [...]` — what the figure was actually known
for, never touched by balance — alongside `capabilities: [...]`, what the
game reads. The first documents the second's departures instead of hiding
them, and trait text can be checked against it.
*Cost:* moderate. *Risk:* none, and it would have caught both traits that
had to be rewritten after the scarcity pass.

**Option 2: one layer, plus a changelog.**
Every departure from the record noted in `DESIGN_DIALOGUE`.
*Cost:* a habit. *Risk:* habits lapse — the two broken traits were found
by an audit, not by anyone remembering.
