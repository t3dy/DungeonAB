# The Asset Pass

**Run this whenever a mechanic lands.** Mechanics move faster than
assets, and the gap is invisible until something measures it.

```bash
npm run assets     # the work-list: which cards touch nothing new
npm test           # tests/assets.test.js is the gate
```

## Why this exists

After a session that added element/feature reactions, two attrition
clocks, sustained workings and a tactics tree, an audit found **all nine
personality cards touching none of them**. They had opinions about
monsters and none at all about walking in the dark or carrying a scar to
the throne — which is now most of what a delve is made of. The cards
still worked. They were just playing an older game than everything
around them.

Nobody had done anything wrong. There was simply no moment in the
workflow that asked the question.

## The questions

For each mechanic that just landed, walk the pool and ask:

1. **Which existing cards should obviously interact with this?**
   Not "could be made to" — *should*, in a way a player would guess
   before reading the card. A Portable Alembic cooking a material down
   into lamp oil is obvious the moment there is a supply clock. An
   Everburning Lantern that does not care about oil is a card that has
   stopped making sense.

2. **Which cards now read as lies?** Card text written for the old
   mechanics is worse than silence, because a player believes it. When
   Aegis of Ash started blunting every round, "blunts the first blow"
   became wrong and had to change.

3. **What has nothing to answer it?** The reaction table had no entry
   for `void`, so a pit — one of thirteen features — was inert against
   every element. `npm run assets` prints matter coverage for exactly
   this.

4. **Does the decision layer know?** Content the party cannot see does
   not exist. Reactions fired in 15% of eligible rooms until the party
   learned to read the room, then 30%. Ask whether the AI has any reason
   to use the thing.

5. **Does it say anything?** Standing rule 7: a state change with no
   line is a bug. A new interaction needs prose, a `Chronicle` field if
   it moves state, and a place in the salience order.

## What a good redesign looks like

**Give it a job, do not give it numbers.** Dancing Light went from the
worst card in the game (−15.4) to one of the best (+6.3) with **no
change to its power** — the supply clock simply gave it something to do.
Buffing it instead would have cost a difficulty re-sweep and taught us
nothing.

**Keep the fiction leading.** The best hooks were the ones the fiction
already implied: fire takes wood, an alembic cooks oil, dwarven mail
takes the worst of a blow. Nothing here needed inventing, only noticing.

**Make it a trade where it is strong.** The Craven pay more for the dark
*and* pack more oil. The Covetous will not leave a room unsearched even
blind, and it costs them.

## Afterwards

- Re-measure. Every asset pass so far has moved the difficulty curve
  enough to need a `STAT_SCALE` sweep. The target is 88 / 71 / 45.
- Check the pilots. A changed economy makes the draft AI's evaluator
  stale, and a stale evaluator reads exactly like a balance problem
  (DESIGN_DIALOGUE.md §10).
- Record what you found in DESIGN_DIALOGUE.md, including what the
  measurement said when it disagreed with you.
