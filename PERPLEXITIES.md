# PERPLEXITIES

Questions this project keeps running into that are not bugs and do not
have obvious answers. Kept because each one has already caused work to be
done twice, and because several of them are the actual design of the game
rather than obstacles to it.

Companions: `PROBLEMS.md`, `BALANCEISSUES.md`, `ROUGHEDGES.md`.

---

## Q1. If the difficulty curve is calibrated flat, what is win rate for?

The curve is 99/88/71/45. `npm run calibrate` searches constants to hold
it; `tests/balance-gate` fails if it drifts. So win rate is a **controlled
variable** — the machinery actively prevents anything, including draft
quality, from moving it.

Three sessions were spent measuring whether the dungeon "grades the
draft" by win rate before this was noticed. It cannot, by construction.

But then: **what is difficulty selecting for?** If a bad draft and a good
draft both win 88% of the time at medium, difficulty is not a measure of
the party — it is a measure of the dungeon's willingness to kill anybody
at all. And the margins meter now shows narrow parties at 87.4% against
broad at 93.4%, a six-point spread that the "controlled variable" framing
says should not exist.

So either the control is looser than believed, or the calibration target
is a population average that individual drafts are free to depart from —
which would mean the whole "win rate can't show draft quality" conclusion
is *directionally* right and *literally* wrong. Unresolved.

---

## Q2. Can a protagonist be discovered, or does it have to be assigned?

The house position is that the protagonist should emerge from uneven
outcomes, never be designated (a designated viewpoint makes the other
three luggage). `Party.pointMan()` was built on that principle and it
worked — `protagonist` left the dramaturg's systemic list.

But what it actually did was *find a mechanically privileged role* — the
person blows land on first — and name it. That is one step away from
assignment. The delve is now reliably "about" whoever is standing in
front, which is a fighter, which means it is structurally rarely about
the wizard.

Is that emergence, or is it assignment with extra steps? And is a saga
where the fighter is always the subject better or worse than one with an
authored rotating viewpoint?

---

## Q3. Every metric I build immediately becomes a target

The dramaturg was written to judge logs. Within one session its nine
values became the acceptance gate for narrative work, and changes were
made *specifically* to move its numbers — concision 96% → 21%, mortality
85% → 64%.

That is Goodhart's law operating in about forty minutes. The numbers went
where they were pushed. Whether the *logs* got better is a separate claim
that nobody has independently checked, because the only reader is the
thing being optimised against.

The mitigation so far is that each probe must fire both ways on fixtures
and cannot fail every real delve. That catches broken probes. It does not
catch a probe that is working correctly and measuring the wrong thing.

**Nobody has read fifty of these transcripts as a reader.** Until
somebody does, the poetics is a hypothesis with a test suite.

---

## Q4. If adjacency opens the door, what is a capability?

A capability was "this character knows how to interact with this category
of problem" — a discrete competence. Adjacency (§Q) made it a position on
a graph: a mathematician with a sense of direction may attempt an orrery
badly, because astronomy's neighbours are mathematics, divination and
navigation.

That is better play. But it dissolves the thing the tag was supposed to
name. If two neighbours substitute for the real thing, then `astronomy`
is not a competence, it is a *coordinate*, and the card text promising
astronomy is promising something fuzzier than it says.

Related and unresolved: the mastery band applies in **town** as well as
the dungeon. Should improvising at a town negotiation cost renown the
same way improvising at a sealed door does? It currently does, by
inheritance rather than decision.

---

## Q5. Prose reuse across delves sits at 45%. Is that bad?

Measured across 120 transcripts: 45% of prose lines have appeared in a
previous delve. The most-repeated is the stair descent, in 70 of 120.

A room type has to introduce itself, so *some* repetition is a template
doing its job, not a defect. But the house position is that repetition
*between* delves costs more than repetition *inside* one, because a
reader reads one delve closely and a saga loosely — and the sentence they
are sure they have seen before is what makes a generated game feel like a
machine.

Nobody knows what number is right. 45% may be fine. 45% may be why the
second delve feels flat. There is no experiment currently designed that
would tell the difference.

---

## Q6. If the prose is complete, the ledger is dead weight

The Chronicle's two-layer design says: the ledger records everything so
nothing can move silently, and the prose curates what is worth reading.
The house position is that a log needing its ledger to be understood has
failed as prose.

The concision editor (§O) now *moves* prep lines into the ledger when the
resolution runs long — up to eight of them in a heavy boss fight. So the
ledger is now the destination for real content, not just an audit trail.

Which raises: does anybody open it? If the prose is genuinely complete,
those eight folded lines are unread forever and the mechanics they
describe are invisible — the "unmet is unbuilt" problem, one layer down.
If the prose is *not* complete, the fold is hiding things that mattered.

---

## Q7. The magi are research claims and balance targets at once

The scarcity rebalance took documented attributes off real historical
figures because the pool needed it: Dee lost astronomy to Brahe and
Forman, Agrippa lost alchemy and knowledge. The rule adopted was "a tag
marks who you would *definitively* ask, not everyone competent."

That is a defensible abstraction. It is also a claim about intellectual
history being made by a balance pass, in a project whose whole appeal is
that the history is real. Two card traits had to be rewritten because
they described capabilities their magus no longer had.

Nobody has decided where the line is. Alchemy already has a documented
exception (three owners) because three cards' printed text promised
brewing — a promise outranked the cap. How many such exceptions before
the cap is decoration?
