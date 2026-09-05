# ARCHITECTURE

How the pieces fit, where the seams are, and which of them leak. Written
for a session arriving cold: the layering below is mostly good and worth
preserving, so the entries are about the places it does not hold.

Facts here are regenerable with `npm run audit`.

---

## The shape, briefly

```
draft/PackDraft      MTG-style pack draft, AI drafters, seeded
   ↓ pool
game/Cards           the card pool; capabilities live on cards
game/Capabilities    the tag dictionary + AFFINITIES (adjacency graph)
   ↓
agents/Party         who is here, what they can do, damage order
agents/Adventurer    one body: stats, kit, wounds
agents/Formation     where they stand, priced per fight
   ↓
world/DungeonGen     seeded room graph, themes, wings, riders
encounters/EncounterEngine   declarative situations: gate → depth → resolve
encounters/RoomEncounters    hand-written rooms + the fight resolver
   ↓
sim/Simulator        the tick loop; owns the seam to narration
narrative/Narrator   three beats per room; the prose editor
narrative/Chronicle  two layers: a ledger that misses nothing,
                     prose somebody curated
narrative/Dramaturg  reads finished transcripts against a poetics
```

**The load-bearing idea:** capabilities are tags on cards, and *nothing
checks for a character id*. Draft the same tag on somebody else and the
same options open. Every rule in `encounters/` reads tags generically.

**The second load-bearing idea:** the Chronicle's two layers. The ledger
is produced by diffing a full state snapshot each tick, so a mechanic
cannot dodge the record by returning early. The prose is curated on top.
This exists because hand-placed narration proved bypassable — heroes were
dying on the march with the Chronicle silent.

---

## A1. Town and dungeon share one resolver, and effects leak

`Campaign.resolveTownOption` and `RoomEncounters.resolveRoomAction` both
call `EncounterEngine.resolveEncounterOption`. Sharing is *right* — a
capability should mean the same thing in both worlds — but every side
effect written for one world silently applies to the other.

Found in practice: the town astrologer granted `wayIn`, a reading of a
dungeon's construction, in a tavern (`BUGS.md` B1). Patched with
`ctx?.type !== 'town'`.

Still unscoped: the **mastery band** applies in town by inheritance
rather than by decision. Improvising at a town negotiation costs renown
exactly as improvising at a sealed door does, and nobody chose that.

There is no declared notion of an effect's *scope*. The next
dungeon-shaped side effect will leak the same way.

---

## A2. The persistence layer is write-only

`Chronicles.save()` serialises `party.toJSON()` into localStorage.
**`Party.restore()` has zero callers** (`npm run audit`).

So:
- a refresh loses an in-progress campaign; there is no resume
- `Adventurer.restore`'s id-preferring rehydration — carefully written to
  survive rebalances, with a stored-copy fallback for items the pool has
  never heard of — runs only in tests
- the archive is a **read-only shelf of finished sagas**; `list()` reads
  `party.members[].alive` for display and nothing else

This may be the intended product. But the code is shaped like a save file
that does not work, and the state-contract check in `npm run audit`
exists to police a round trip that never happens.

The related `tests/archive` suite *does* cover a real round trip — of
**dungeon layouts**, not parties — and it is good: it has caught four
fields in four sessions (trapType, floor, wing, key).

---

## A3. Predicates that mutate

`detectSecretDoor(party)` reads as a question and spends a resource:
decrements `wayIn`, sets `foundByReading`. `openLockedWing(party, wing)`
does the same. Both are called from `Simulator` exactly once each, paired
with the narration that clears the flag, so the app path is correct.

Two existing tests call `detectSecretDoor` as a pure predicate and pass
only because their fixtures have `wayIn === 0`.

The pattern is load-bearing enough to want a name: these are
*attempt* functions, not *can* functions, and nothing in the naming says
so.

---

## A4. `Simulator` is where narration meets mechanics, and it is thickening

`Simulator._tick` now does: point-man tracking, prep editing, mastery
line composition, `wayIn` line composition, key pickup, branch splicing,
locked-wing opening, trapdoors, supply, and the three-beat assembly.

Each addition was individually reasonable and the file is becoming the
place where every cross-cutting concern lands, because it is the only
place that can see both the mechanical result and the narrative context.

No bug yet. But the prep-editing block, the mastery line and the `wayIn`
line are all *narration policy* living in the simulator rather than in
`Narrator.js`, purely because they need `result` before it is composed.

---

## A5. Thirty exported symbols nothing imports

`npm run audit` lists them. A fair number are deliberate public API with
no consumer yet (`registerTheme`, `registerNatures`, `registerMonsterTiles`
are extension points). Others look like genuine leftovers
(`ProgressionManager`, `biasValue`, `drawMinimap`, `capabilityChips`).

Nobody has walked the list. Doing so is cheap and would shrink the
surface a future session has to reason about.

---

## A6. `src/public/v1|v2|v3` are frozen minified builds inside the source tree

They are committed deliberately (versioned archives, served at `/v1/` etc.
per `DEPLOY_STATE.md`) but they live under `src/`, so every naive
`grep -rn ... src/` hits minified Three.js. One search this session
returned 344 KB of bundle.

Always scope searches to the live directories, listed in
`tools/audit.mjs` as `LIVE_DIRS`.

## The frame and the performance (v9.0, 2026-09-04)

Two modules sit between the simulator and the page now, and neither
touches a number.

**`ui/Screens.js`** is the frame: four screens as sections under one
header and one fixed action bar, each screen owning a bar group. Every
primary action is in the bar (`BAR_PRIMARY`), which is the whole reason
it exists — see SCREENS.md §2 for the two-and-a-half-screen scroll it
replaced. `main.js` no longer toggles containers by id; it calls
`showScreen`.

**`ui/Choreography.js`** is the performance. `planBeats(prev, state)`
is pure: from two states it returns the ordered beats of the room with
durations. `Choreographer.play` walks them against three optional
surfaces — the renderer, the story panel, the HUD — and `main.js`
`advanceRoom` awaits it before the next tick. The data it plays is
`narration.rounds`, recorded by `RoomEncounters.resolveFight` as
`roundLog` and also filed in the ledger, so the ledger, the prose and
the picture are three readings of one record.

**Where the seam leaks.** The renderer's actors are keyed by *name*, so
a rename mid-delve (there is none today) would orphan a sprite. The
performance reads `state.dungeon`, which is the live object, so
"was this room cleared before this tick" has to be inferred from the
previous narration rather than read (`roomWasClearedBefore`). And the
chosen action's *outcome* for the picture is a classification of action
ids (`PASS_ACTIONS`) rather than a field the resolver sets — a new
"get past it" action must be added there or it will be drawn as a kill.
