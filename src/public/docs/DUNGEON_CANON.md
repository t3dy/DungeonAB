# The Dungeon Canon — what a dungeon is supposed to have

*An audit, not a wish list. Three traditions are owed something here:
the tabletop dungeon (its structure, legally distinct — no WotC or TSR
property, only the shared furniture of the form), the **public-domain
literary dungeon** (Poe above all), and the **roguelike** (the genre
whose staples `ROGUELIKE_ROADMAP.md` already maps against research in
Shaker/Togelius/Nelson and Garzia).*

*Each row: what the tradition expects, where it came from, and whether
DungeonAB has it. The point of writing it down is that the gaps become
a work-list instead of a hunch — the same reason `npm run assets`
exists.*

---

## 1. Structure — how a dungeon is laid out

| Expected | Source | Status |
|---|---|---|
| Rooms joined by passages, entrance → boss | the form itself | ✅ spine of rooms with real footprints |
| Optional branches off the critical path | Spelunky (PCG ch.3); DCSS branches | ✅ **wings** — themed, 2–4 rooms, with a payoff |
| Secret doors | NetHack, Brogue | ✅ rogue/scholar detection, vault behind |
| Multiple floors, stairs down | Rogue onward; Dante's descending circles | ✅ two or three floors, each meaner |
| A shaft you can fall down | oubliettes; Poe's pit | ✅ trapdoors, now dropping a floor |
| **Lock and key** — a wing sealed, its key elsewhere | PCG ch.3 Fig. 3.5 (a subtree with one entrance is lockable); Zelda-likes | ✅ **v4.3** |
| Mazes and false passages | the Labyrinth; Poe's corridors | ❌ not built |
| Cave layouts dug by an agent, grottos by cellular automata | PCG ch.3 | ❌ not built (roadmap Phase 5) |
| A room sequence with a theme running through it | Poe, *The Masque of the Red Death* — seven coloured rooms | ⚠️ partial: wings are themed, floors are not |

## 2. Furniture — what is in a room

| Expected | Source | Status |
|---|---|---|
| Pillars, rubble, crates to fight around | the form | ✅ cover features |
| Pits to fall in or push things into | Poe, *The Pit and the Pendulum* | ✅ hazard + shove |
| Floor spikes | the form | ✅ hazard + shove |
| A brazier, a font, a spout, an anvil, shelves | the form | ✅ all with interactions |
| A sarcophagus that should not be opened | Poe, *The Premature Burial*; barrow-lore | ✅ pry it, and something may rise |
| A mirror that shows what is really there | folklore | ✅ negates the ethereal |
| **A descending blade on a timer** | Poe, *The Pit and the Pendulum* | ❌ next |
| Contracting walls | Poe, same story | ❌ not built |
| Statues that turn out not to be statues | the form | ❌ not built (mimics exist for chests) |
| An altar for identifying or sacrificing | NetHack | ⚠️ shrines rest and can be desecrated; no identification |

## 3. Threat — what the dungeon does to you

| Expected | Source | Status |
|---|---|---|
| Monsters with readable natures | the form | ✅ armored/ethereal/venomous/swarm/slow, badges + prose |
| Traps of distinct kinds | the form | ✅ spike/fire/poison/alarm |
| A hunger clock forcing you onward | Rogue's food; NetHack | ✅ **the lamp** — oil per march, damage in the dark |
| Wounds that do not heal in the field | ADOM, modern roguelikes | ✅ the wound clock |
| **Wandering monsters drawn by noise and delay** | Rogue onward; the tabletop wandering-monster roll | ❌ next — the noise is already tracked, nothing answers it yet |
| Sleeping or unaware monsters | NetHack, Brogue stealth | ❌ not built (sneak exists, but nothing sleeps) |
| A boss that changes at half health | the form | ✅ boss phases |
| Being trapped and having to escape a timer | Poe | ❌ not built |

## 4. Reward — what you take out

| Expected | Source | Status |
|---|---|---|
| Gold, hoards, a rich hidden vault | the form | ✅ treasure, vaults, mimics |
| Equipment that changes how you play | the form | ✅ slots, class-keyed actions |
| Scrolls and spells learned in the dungeon | the form | ✅ libraries, found scrolls |
| Trophies off the dead | roguelike corpses/loot | ✅ the trophy case |
| **Unidentified items — you find out by using it** | NetHack, DCSS | ❌ next |
| Shops | Spelunky, DCSS | ✅ town quartermaster (v4.2); none in-dungeon |
| Cursed gear that looks like a prize | NetHack | ✅ trap cards |

---

## What v4.3 built

**Lock and key**, finished rather than three things half-done. PCG ch.3
makes the structural argument: a subtree with a single entrance can be
locked and its key placed elsewhere, which turns a branch from *optional
loot* into *a question asked earlier in the dungeon*. Our wings are
exactly those subtrees, so the lock had somewhere to live.

Four ways through a locked door, and the census says all four are used:
the **key** (57 of 95 doors), a **rogue** picking it (17), **Knock**
(5), a **shoulder or a prybar** (4) — and 12 doors that simply stayed
shut. Two of the four are loud, and the noise sets the same `alarmed`
flag a tripped bell does, so the next monster fights forewarned.

The tuning that mattered is worth recording. The first cut guaranteed
solvability by putting the key on the critical path every time — and
because the critical path is *mandatory*, the party walked past the key
by construction: **93 of 98 doors opened with it** and the lock asked
nobody anything. Four locks in ten now have no key in the dungeon at
all. That is what gives the rogue, the prybar and Knock something to
be for, and what makes a shut door a real answer.

## Next, in this order

1. **The pendulum** (Poe). A blade on a timer, in a room that can
   already be used as a weapon (v4.1 hazards).
2. **Wandering monsters.** The oldest answer to the oldest exploit —
   taking your time. The noise is already tracked (`party.alarmed`,
   set by alarms and by forcing a door); nothing answers it yet.
3. **Unidentified finds.** The roguelike decision we have the item
   layer for and none of the doubt.
