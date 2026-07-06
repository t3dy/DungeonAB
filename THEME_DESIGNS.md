# DungeonAB — Theme Designs

Every dungeon theme is a *design*: a distinct identity expressed through
room-mix features, hazards, a monster roster, and its own writing
(arrival passage + themed disasters). Themes plug into the generator via
`DUNGEON_THEMES` (or `registerTheme()` for packs) — see
`ROGUELIKE_ROADMAP.md` for the architecture.

## Design levers

| Lever | Field | What it expresses |
|---|---|---|
| Room mix | `weightTweaks` | What the place is *for* (a witch's cellar drips reagents; a castle hoards treasure) |
| Hazard bite | `trapBonus` | How the environment itself hurts |
| Identity guarantees | `alwaysLab`, `minLibraries` | The rooms the theme can't exist without |
| Roster | `monsters` / `bosses` | Who lives here (undead flags feed cleric play; `bribable` feeds gold play; `slow` flavors) |
| Voice | `THEME_ENTRANCES`, `THEME_DISASTERS` (Narrator) | Arrival and catastrophe, in the theme's own register |

## The Eight Themes

### ⛏️ the Old Delve
*A classic hole in the ground, wronged by generations of management.*
Baseline mix; the tutorial voice of the dungeon. Rats, skeletons,
a bribable goblin toll-gang; the Dragon Whelp or the Ogre King at the bottom.

### ⚰️ the Ancient Crypt
*The dead were buried with their grudges. Both kept.*
**Features:** monster-heavy, extra shrines (funerary chapels), lean treasure.
**Counter-play:** clerics feast — the roster is mostly undead, both bosses are.
**Hazard:** coffin lids shifting in unison; barrow-damp that burns torches blue.

### 🌋 the Cinder Galleries
*The mountain is not dormant. The mountain is patient.*
**Features:** disasters common, traps +2 (fire), scarce shrines.
**Hazard:** lava re-routing corridors; cinder squalls.
**Roster:** salamanders, cinder bats, magma toads, obsidian golems; the Cinder Wyrm / Forge Tyrant.

### 📚 the Drowned Athenaeum
*Knowledge wants to be free. It has been waiting a long time.*
**Features:** two libraries guaranteed (scholars feast), fewer monsters.
**Hazard:** shelf-quakes; rising floodwater that makes books scream quietly.
**Roster:** flying tomes, ink elementals, spectral scribes; the Archivist / the Grand Errata.

### ⚗️ the Mad Alchemist's Dungeon
*The experiments continued after the funding stopped. And after the alchemist did.*
**Features:** always a lab, materials everywhere — the alchemist class's home turf.
**Hazard:** chemical weather; things achieving criticality upstream of the drains.
**Roster:** sludge, potion-rats, textbook vines, a peer-review-failed homunculus; the Mad Alchemist / the Precipitate.

### 🦇 the Castle of the Vampire Lord *(new)*
*The invitation was in your dreams. The exit clause was not.*
**Features:** treasure-rich (the Lord's centuries of hoarding), a real
library (his study), **desecrated chapels** — shrines are scarce, so
healing must come from clerics, potions, and nerve. Monster-forward.
**Counter-play:** the roster is almost all undead — clerics turn the
tide; the thrall footman is *bribable* (old habits of service).
**Hazard:** candles guttering in unison while the castle feeds; mirror
corridors that multiply.
**Roster:** thrall footman, castle bat-clouds, the pale hound in the
red velvet collar, the crimson mist that pours under doors.
**Bosses:** **the Vampire Lord**, apologizing for the hour; or **the
Bride**, who was here long before the Lord.

### 🧹 the Root Cellar of the Bog Witch *(new)*
*Everything down here is pickled, potted, or patient. Some of it is all three.*
**Features:** **materials everywhere** (the shelves drip with reagents)
and **her stillroom always works** (`alwaysLab`) — the alchemist's
richest hunting ground; lean treasure (witches don't keep coin), and
the rot in the timbers bites (+1 trap).
**Counter-play:** two slow bruisers (root golem, bog toad) reward
sneak-and-run parties; the jar imp and the Witch herself are bribable —
she respects a bargain.
**Hazard:** shelves letting go a hundred jars at once; the packed-earth
ceiling sagging like a held breath.
**Roster:** the imp still angry about the jar, a pickled thing that
finished pickling, the taproot golem, the smokehouse-sized bog toad.
**Bosses:** **the Bog Witch**, delighted to have company for dinner; or
**the Cauldron, which learned to want**.

### 🧊 the Ice Caverns of the Mad Pyromancer *(new)*
*He moved here so the fires couldn't spread. The fires found other ambitions.*
**Features:** the fire-and-ice contradiction IS the dungeon —
**disasters everywhere** (steam bursts, ceiling thaw) and the **worst
traps in the game** (+2: flash-melted floors refreeze with edges).
Shrines froze over; the library burned, ironically.
**Counter-play:** high hazard, modest monsters — a tough, brace-ready
party out-endures it; the Craven's trap-sense shines here.
**Hazard:** old fire meeting older ice — instant scalding steam; sheets
of ceiling thawing and falling *now*.
**Roster:** singed frost wisps, ice crawlers with pick-shaped legs, the
thawed dead (steaming gently), cinder imps wearing snowballs as armor.
**Bosses:** **the Mad Pyromancer**, delighted someone flammable came; or
**the Glacier's Heart**, half-melted and wholly furious.

### 🜂 the Hermetic Athanor *(DLC — 17th-Century Alchemy Pack)*
*Fifty emblems deep, the Work continues whether or not anyone tends it.*
Lab-and-library dense; roster drawn from the Atalanta Fugiens emblems
(the Green Lion, the Ouroboros, the Raven's Head; the Rebis and the
tail-devouring Dragon as bosses).

## Adding a theme (checklist)
1. Entry in `DUNGEON_THEMES` (or a pack calling `registerTheme`) —
   id, name, icon, tagline, weightTweaks, optional trapBonus /
   alwaysLab / minLibraries, ≥3 monsters, ≥1 boss.
2. Sprite tiles for every new `kind` in `SpriteAtlas` (or
   `registerMonsterTiles` from a pack).
3. Arrival lines in `THEME_ENTRANCES` and hazard lines in
   `THEME_DISASTERS` (Narrator).
4. The generic test suites enforce the rest: roster furnishing,
   distinct arrivals, tile coverage, traversability, seed determinism.
