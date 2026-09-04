# CONTENT REACH

What players actually meet, versus what has been built. Standing rule 12:
*a mechanic nobody meets is not in the game*, however well it is
implemented, tested and written.

Source: `npm run census` (600 delves) and `npm run simulate` (120
transcripts). All figures below are from a run on this branch.

The distinction the census exists to draw: **"nobody is offered this" is
a generation problem; "nobody wants this" is a decision-layer problem.**
They have opposite fixes and look identical from the outside.

---

## R1. Six mechanics reach under 5% of delves

```
cold camp                    0.2%   ← effectively one delve, not a rate
bribe                        2.8%
locked wing refused          <5%
cornered (no third retreat)  <5%
lamp oil cooked              <5%
turn undead                  <5%
```

**`turn undead` is a whole class's signature move.** A cleric's most
recognisable act reaches fewer than one delve in twenty. When it *is*
offered it is taken 22 times in 315 (7.0%) — so this is both problems at
once: rarely offered, and rarely wanted when it is.

`cold camp` at 0.2% is below the noise floor the census itself declares.
It is built, tested, written, and has effectively never happened.

---

## R2. The capability situations are starved of appearances

Options in the hand-written v6 situations are offered in single digits
across 600 delves:

| option | offered | taken |
|---|---|---|
| `recognize-model` | 7 | 1 |
| `correct-orrery` | 9 | 3 |
| `divine-instability` | 13 | 5 |
| `translate-claim` | 13 | 3 |
| `repair-gears` | 14 | 1 |
| `read-correspondences` | 15 | 4 |

Not a decision problem — the take rates are healthy (14–38%). These
options are simply almost never on a menu, because situation rooms occur
1.03 times a delve and there are fourteen encounters to draw from.

Riders raised total capability tests to 2.75 a delve, but riders attach
to *other* room types; the true situation rooms, which get the full
three-beat treatment, stayed rare (`SIMULATIONFINDINGS.md` S4).

---

## R3. `flee` is offered 1600 times and taken 125

7.8%. The most-offered decision in the game is one the party almost never
wants. That is arguably correct — fleeing should be a last resort — but
it sits just above the 3% floor `tests/prose` enforces, and it is a lot
of menu real estate for an option that is nearly always noise.

Compare `descend` (69.9%) and `rope-down` (61.1%), which are decisions the
party genuinely makes.

---

## R4. Fallbacks are a recurring reach problem, now table-driven

Three separate fallbacks fell under the floor as skilled options improved
(`SIMULATIONFINDINGS.md` S8). Each was fixed by giving the blunt answer
weight from party state rather than by making it cheaper.

Current holdings in `BLUNT_ANSWERS` (`RoomEncounters.js`): eight options.
`endure-discord` now sits at 26.2%, `smash-wall` 34.4%, `hurry-past`
28.6% — all healthy.

The mechanism works. It needs extending by hand on every change that
alters option availability or weighting, which is the maintenance cost of
the current design.

---

## R5. What the census cannot see

- **Town encounters** are not walked by the census at all; their reach is
  unmeasured.
- **Riders** are counted as their host room type, so a capability test on
  a treasure room reads as `treasure`.
- **Prose beats without a decision** (asides, supply lines, the point-man
  line) have no offer/take ratio and are invisible here. The dramaturg's
  corpus is the only instrument that sees them.
