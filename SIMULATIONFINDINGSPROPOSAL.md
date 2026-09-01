# SIMULATION FINDINGS — PROPOSALS

Ranked options per finding in `SIMULATIONFINDINGS.md`. Recommendation ★.

---

## For S1 — win rate is controlled, except it moved six points

**★ Option 1: resolve the contradiction before building on either story.**
Run `npm run calibrate` and a fresh `npm run bench`, then measure win
rate by draft breadth at n≥1000. Either the calibration holds only the
population mean (in which case draft *can* move individual win rate and
three sessions of framing needs revising) or something recent leaked into
survivability. *Cost:* two tool runs and an hour of reading. This is the
highest-value single measurement outstanding.

**Option 2: assume the leak and hunt it.**
Bisect the recent changes for one that improved survivability — the
gradient-gate change is the obvious suspect, since improvising now
*fails* where it previously would not have been offered.

---

## For S3/S4 — the gate is fixed, the room budget is not

**★ Option 1: shrink the draft-insensitive score sources.**
Score is dominated by monsters killed, rooms cleared and gold — none of
which the draft touches. Rather than adding more draft-sensitive bonuses
on top (which is what the mastery band did, to r=0.124), reduce the base
so the sensitive part is a larger share. *Cost:* a calibration pass and a
re-bless. *Risk:* touches the curve; must be done with `npm run bench`.

**Option 2: more situation rooms via a longer spine.**
Raise `FLOOR_SPINE` so the budget is bigger rather than differently
sliced. *Cost:* changes run length, supply pressure and the curve at
once. *Risk:* high — supply is the other clock and it is tuned.

**Option 3: accept 2.75 tests a delve and author more riders.**
Riders cost no room budget. Fourteen encounters ride eight room types;
more encounters means more distinct tests without touching generation.
*Cost:* content work only. *Risk:* none. **Best value per unit of risk if
S1 turns out to need attention first.**

---

## For S5 — effects reach the player rarely

**★ Option 1: stop gating rewards behind two rare things.**
`wayIn` needs a situation answered *and* a sealed door. Anything with two
gates compounds into invisibility. Audit each new effect for how many
gates precede it; one is the budget. *Cost:* a habit.

**Option 2: give surplus readings a sink.**
Unspent `wayIn` converts at delve end (renown, or a town favour). Fixes
the saturation directly. *Cost:* small. *Risk:* turns an access mechanic
into a margins mechanic, which is a design change, not a fix.

---

## For S6 — prose accumulates without an editor

Done (three-slot budget). **★ Remaining option: apply the same lens
elsewhere.** The predicament beat concatenates room features the same way
resolutions concatenated preps — a heavily-furnished room lists every
feature in one sentence. Nobody has measured it. *Cost:* one measurement.

---

## For S8 — fallbacks die on every rebalance

**★ Option 1: derive the blunt answer's weight instead of tabling it.**
Its pull scales with how many skilled options sit beside it on the menu,
so it self-corrects when availability changes. Removes the recurring hand
edit. *Cost:* moderate; replaces `BLUNT_ANSWERS`. *Risk:* needs care not
to make the blunt answer dominant in option-rich rooms.

**Option 2: keep the table, add a census gate.**
Fail the suite when any option drops under the floor, rather than
noticing via `tests/prose` after the fact. *Cost:* small. Complements
Option 1 rather than competing.
