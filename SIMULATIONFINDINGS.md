# SIMULATION FINDINGS

What running the game thousands of times has actually taught, as opposed
to what reading the code suggests. Kept because several of these
contradicted a confident belief held five minutes earlier, and because
two of them were believed, acted on, and then found to be noise.

Tools: `npm run margins` (draft payoff, n=600), `npm run simulate`
(transcripts + dramaturg), `npm run census` (mechanic reach, 600 delves),
`npm run bench` (the curve), `npm run audit` (static facts).

---

## S1. Win rate is a controlled variable and cannot show draft quality

The curve is 99/88/71/45. `npm run calibrate` searches constants to hold
it; `tests/balance-gate` fails if it drifts. **Three sessions were spent
measuring whether the dungeon "grades the draft" by win rate before this
was noticed.**

Every such measurement came back flat (~90% across every party shape at
medium) and was read as a design failure. It was a tautology.

Caveat that undermines the clean version: `npm run margins` now shows
narrow drafts at 87.4% and broad at 93.4%. Six points is not flat. Either
the calibration holds only the population mean, or something recent leaked
into survivability. Unresolved — `PERPLEXITIES.md` Q1.

---

## S2. Two "successes" were noise that vanished at scale

| claim | at n≈150 | at n≈500 |
|---|---|---|
| party size differentiates outcomes | 67% vs 100% | flat ~90% |
| capability breadth wins at `hard` | 64% vs 80% | 68.1% vs 71.6% (0.8σ) |

Both were reported as wins before the larger run. **A draft-shape or
party-shape bucket needs several hundred delves.** This is now the first
line of `BALANCEISSUES.md` and the reason `npm run margins` defaults to
n=600.

---

## S3. The bottleneck was never where it looked

Three separate interventions to make the dungeon grade the draft — more
situations, bigger consequences, better option weights — all produced no
movement. The measurement that explained it:

```
of situations met:      narrow draft   broad draft
  OFFERED a capability      93%           100%
  TOOK one                  75%            82%
```

**A gate 93% of narrow parties pass is not a gate.** Everything
downstream was capped by that seven-point gap, so no amount of tuning
below it could ever exceed it. The fix had to be upstream, at what an
option asks for (gradient gates, DESIGN_DIALOGUE §Q).

---

## S4. The room budget is zero-sum and fully allocated

A spine is ~11 weighted picks, four already spent on guarantees. Every
attempt to buy more situation rooms cost something a test protects:

- a 3-situation guarantee stripped the Ice Caverns from 1.0 disasters a
  delve to 0.25 (guarantees eat the most over-represented type, which is
  a theme's identity rooms by construction)
- excluding theme-boosted types fixed that and dropped the Greatsword's
  promised writing to 0% of delves, under the 10% floor
- weight 4.5 bought situations with monsters; weight 6 squeezed every
  type onto its guarantee floor until the castle and the plain delve held
  the same rooms

The escape was **riders**: capability tests attached to rooms that already
have a job, 1.03 → 2.75 tests a delve at zero room cost.

---

## S5. Effects reach the player far less often than they read

Measured reach, per delve:

| thing | frequency |
|---|---|
| situation rooms | 1.03 (0.80 reached before the run ends) |
| branches | 1.42 (secret 0.68, locked 0.33, keyless-locked 0.13) |
| wired continuity carries | ~1.0 between all six of them |
| `wayIn` opportunities | ~0.8, against 1.10–1.44 readings earned |

Anything gated behind two of these compounds into near-invisibility. The
`wayIn` lever is the cautionary case: fully wired, well narrated, pays in
20% of delves, and **cannot** discriminate between drafts because it
saturates against opportunity.

---

## S6. Prose accumulates without an editor

Before the concision pass, resolution lengths:

| room | median | max |
|---|---|---|
| boss | 1113 | 2290 |
| monster | 561 | 1429 |
| all rooms | 90 | 2290 |

The median room was 90 characters and the median *boss* room — the
climax — was 1113. Every ward, cover bonus, tactic, coating and drop
appended its own well-written sentence. **Nobody wrote that paragraph; it
accumulated.** After a three-slot budget: boss median 393, max 642.

---

## S7. Six mechanics are met by under 5% of delves

From `npm run census` at 600 delves: locked wing refused, cold camp,
cornered (no third retreat), lamp oil cooked, bribe, **turn undead**.

The last is a whole class's signature move. See `CONTENTREACH.md`.

---

## S8. Fallback options die every time skilled options get better

Three times, each caught by `tests/prose` as "offered 40+, taken <3%":
honouring `opt.weight` killed `push-past-duellist`; adjacency killed
`put-it-down` and `endure-discord`.

The blunt answer is not a fallback in the design sense — it is what a
party in trouble *wants*. It needs weight from party state (hurt, or
fresh and reckless), and that is now a table (`BLUNT_ANSWERS`) which will
need extending on the next such change.
