# A leaner, meaner DungeonAB — proposal

Written against `v7.0-prototype` (tagged, suite 47/47, verified playable
end to end). Nothing here is done; this is an argument for what to
remove.

**The state being cut from:** 17,427 lines of source, 83 cards across 5
types, 28 capabilities, 14 declarative encounters plus hand-written room
types, 8 themes, and roughly 28 distinct systems.

---

## The test I am applying

The pitch is three words: **Draft. Delve. Watch.** Its one genuinely
unusual proposition is that *the draft decides what story you get*.

So every system gets one question:

> Does this make a draft pick matter, or make the transcript worth
> reading?

Anything that does neither is fat, however well built. Several things
below are well built.

---

## What the measurements say is already not paying

From `npm run census` (600 delves), share of delves that ever meet it:

| mechanic | reach |
|---|---|
| cold camp | **1.0%** |
| locked wing refused | **1.2%** |
| bribe | **1.3%** |
| cornered (no third retreat) | **2.0%** |
| lamp oil cooked | **2.0%** |
| turn undead | **4.7%** |
| stairhead camp | 5.3% |
| trap disarmed | 9.7% |
| alchemy brewed | 13.2% |
| key found | 11.5% |

And from `npm run margins` / `npm run card`:

- draft breadth explains **~1.5%** of score variance (r = 0.124)
- trophies correlate **negatively** with draft quality (r = −0.077)
- the Everburning Lantern is worth **+35 win-rate points** at medium —
  one card is a tax every draft must pay
- easy and medium sit at 99% and 88%: for two of four difficulties,
  **losing is nearly impossible**

The pattern: a great many systems, each reaching a small slice, none of
them deciding much.

---

## Cut list

### 1. The town, entirely — ~1,150 lines

`TownEncounters.js` (541) + `Campaign.js` (411) + `TownState.js` (204).
Standing with factions, suppliers, recruits, a smith, 8 town encounters
with 39 options.

It is a second game bolted to the first, it shares the encounter
resolver (which already leaked a dungeon resource into a tavern —
`BUGS.md` B1), and **the census cannot even see it** because no tool
walks it. It is unmeasured content between the parts anyone came for.

*Keep instead:* the delve ends, you read the chronicle, you draft again.

### 2. Providence and Divination — ~350 lines

A player-authored destiny that leans world generation, plus pre-delve
omens. Beautiful, and the omens are *information before commitment* in a
game where the party crawls **on its own** — the player cannot act on
what they learn. It informs a decision that does not exist.

### 3. The tactics tree — 292 lines + 15 cards

A whole third draft axis (after characters and equipment) with a
prerequisite tree. `pinning` reaches 11.3% of delves. It competes for
picks with the two axes that carry the game's identity.

*Keep instead:* fold the two or three tactics that visibly change a
fight into equipment cards.

### 4. Alchemy as a resource loop — ~13% reach

Materials → potions and weapon coatings, with lab rooms, a materials
room type, and an alchemist class built around it. `alchemy brewed`
reaches 13.2% of delves.

This one hurts, because the Renaissance framing wants alchemy. *Keep the
alchemists*, cut the **inventory loop** — let alchemy be a capability
that answers encounters, like every other capability, rather than a
parallel economy with its own rooms and currency.

### 5. Lock-and-key wings — moderate reach, high machinery

Keys, locked wings, four ways through a door, secret doors, `wayIn`
readings. `locked wing opened` 20.8%, `key found` 11.5%, `locked wing
refused` 1.2%.

*Keep instead:* branches that are simply **open or hidden**. One roll,
one decision, no key economy.

### 6. Multi-floor dungeons, stairs, trapdoors

Three floors, stair rooms, trapdoors that drop you past rooms. It makes
delves long, and length is what dilutes each room's importance.

*Keep instead:* one floor, 8–10 rooms, every one of them mattering.

### 7. Conditions/wagers, and 8 themes → 3

Wagers are a modifier layer the player barely sees. Eight themes each
need monsters, disasters, tells and identity rooms — three well-drawn
ones beat eight thin ones.

### 8. Ship-time tooling out of the game bundle

`Dramaturg.js` (809), `ArchiveUI` (281), `CardEditorUI` (231). Excellent,
and they are **development instruments**, not the game. They stay in the
repo and leave the shipped build.

---

## What survives, and gets sharper

| survives | why | how it changes |
|---|---|---|
| The pack draft | it *is* the game's first half | pool 83 → ~40 cards |
| Characters + capabilities | "who you brought" is the whole proposition | 28 capabilities → ~12 |
| Capability-gated encounters, graded by depth | the draft paying out, visibly | the one system to *grow* |
| Formations | a real per-fight trade, already priced | unchanged |
| Wounds + supply | the two clocks that make a delve cumulative | unchanged |
| The Chronicle, two layers | the product surface | unchanged |
| Personalities | they give the party a voice | **derived from drafted characters**, not a card type |

**Target: ~7,000 lines, ~40 cards, 12 capabilities, one floor, no town.**
Roughly 60% of the code gone.

---

## And the "meaner" half, which matters more than the cuts

Leaner alone just makes a small version of a game where losing is rare.
Three changes make it *mean*:

1. **Two difficulties, both dangerous.** Easy at 99% and medium at 88%
   mean two of four modes have no stakes. Make the default ~65% and the
   hard mode ~35%.
2. **No tax cards.** One card being worth +35 points means every draft
   is really 26 picks and one requirement. Either the supply clock gets
   several answers or it stops being lethal.
3. **Death is the memory.** With no town to heal at, a lost magus is
   lost. The draft's stakes become legible immediately.

---

## What this costs

- Roughly **6,000 lines deleted**, including work from this session
  (`wayIn`, town riders, parts of the mastery band).
- Several documented systems in `DESIGN.md` and the Megabase chats stop
  being true.
- The Renaissance framing thins: no town means no patrons, no
  booksellers, no public debates — some of the best writing in the
  project.
- `tests/` shrinks with it; a few gates lose their subject.

I would do it on a branch from the tag, not in place. `v7.0-prototype`
stays the reference.

---

## The question this all turns on

Two coherent lean games live inside the current one, and **they want
opposite cuts**:

**A. A draft game.** The pleasure is the pick; the delve is the
resolution, like watching a machine you built run. Wants: sharp
asymmetric cards, short delves, hard failure, tight readable transcripts.
Cut encounter *variety* to make each card legible.

**B. A story generator.** The pleasure is the transcript; the draft is
the seed. Wants: many encounters, rich rooms, forward-reaching
consequences, characters who accrue history. Cut *card* complexity to
make room for narrative systems.

Everything above assumes something in between, which is what the game
currently is — and being in between is arguably why the draft explains
1.5% of outcomes while 28 systems each reach 15% of delves.

**Which one is it?** That answer changes half the cut list.
