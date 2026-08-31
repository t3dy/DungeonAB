# Handoff — what the v6 session left in the tree

Written 2026-08-31 by the v6 session, for whoever commits the v7 work.

Both sessions were working in the same directory on `main`, so this
tree contains **two workstreams mixed together**. v6.0 is already
committed, pushed and deployed (`a67bbbd`, `0fbc87c`); everything
uncommitted below this line is v7's work plus the additions listed
here. This note exists so those additions get reviewed rather than
absorbed silently.

## What the v6 session added on top of v7's foundation

These were written *after* v7's rider system appeared in the tree, and
they depend on it, so they belong to v7's line now rather than v6's.

**Five encounters, closing the capability gap.** Nothing in the game
asked for `conjuring`, `fencing`, `mathematics`, `navigation` or
`telepathy` — five tags on cards that could never pay. Each now has a
home, and all five are exercised in play (verified: 30 delves, all 14
encounters met, zero errors).

| Encounter | Rides | Closes |
|---|---|---|
| The Armour That Follows | monster, corridor | conjuring |
| The Duellist's Challenge | corridor, monster | fencing |
| The Chessboard Floor | trap, corridor | mathematics |
| The Cartographer's Ghost | library, corridor | navigation |
| The Party Is Cut in Half | disaster, corridor | telepathy |

`The Party Is Cut in Half` carries a `['telepathy', 'tactics']` option
worth more than either alone — the two-capability synergy the design
asks for. `compute-epicycles` was also added to the Astronomer's
Chamber so `mathematics` has a second home rather than one fragile one.

**`tests/riders.test.js`** — the drift guard `DungeonGen`'s own comment
promised ("`tests/riders` holds this against the encounters' own `rides`
declarations") but which did not exist yet. It holds `RIDERS_BY_ROOM`
against each encounter's `rides`, checks a ridden room keeps its own
payload and options, and checks a situation is never dealt twice in one
dungeon.

**A capability-coverage gate** in `tests/capabilities.test.js`: a tag
nothing ever asks for now fails loudly instead of dying quietly. (The
rest of that file is v7's rework and is better than what it replaced.)

**A dead option, fixed.** `tests/prose` measured `hurry-past` offered 45
times and taken once. On a *ridden* room it duplicates the room's own
exit while being strictly worse, so a riding definition now drops its
bare fallback — `onlyWhenOwned` in `EncounterEngine.js`, filtered in
`RoomEncounters.js`. A SITUATION room still keeps its fallback, because
there the encounter is the whole room.

**Deliberation phrases** in `Narrator.js` for every new option id, and
re-blessed goldens.

## One open decision for v7

`tests/capabilities.test.js` has **one failing test**: *"the fugue rule
doubles a brew for alchemy + music in ANY hands."*

The v7 ownership cap (max two magi per capability) took `alchemy` off
Maier, so he now carries `music` without it. The fugue rule in
`Party.doAlchemy()` — alchemy and music held together draw two flasks —
was written specifically so Maier alone still reproduced his v5
signature of two potions from every lab. He no longer does; he needs an
alchemist standing beside him.

That may be exactly what you want (it makes the rule a pure synergy,
which is more in the spirit of v6 than a restored solo power). But it
removes a character's printed identity as a side effect of a balance
change, so it should be a decision rather than a red test. Either:

- accept it, and update that test to assert the pairing rather than
  Maier solo; or
- give Maier `alchemy` back and drop one of his other tags, if the
  Atalanta Fugiens joke — the Work set to music, two voices, two flasks
  — is worth a slot.

Everything else in the suite is green.

## For next time

Two sessions sharing one working tree on one branch is what caused the
tangle: v7 edits landed mid-edit under the v6 session, and neither
could tell the other's uncommitted work from committed work. A worktree
per session avoids it entirely:

```bash
git worktree add ../DungeonAB-v7 -b v7
```
