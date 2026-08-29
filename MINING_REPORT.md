# Mining Report — 700 tables (2800 games), hard

Overall win rate: **72.1%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.19,"hard":1.44,"nightmare":1.83} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.19 · hard 1.44 · nightmare 1.83.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 838 | 12.8 | 88.2% | +22.9 |
| Bandolier of Knives | equipment | 855 | 12.9 | 77.8% | +8.1 |
| Everburning Lantern | equipment | 970 | 10.6 | 77.1% | +7.6 |
| The Tinkerer | personality | 829 | 16.5 | 77.3% | +7.4 |
| Wand of Embers | equipment | 892 | 10.8 | 75.9% | +5.5 |
| Blessed Mace | equipment | 855 | 12.9 | 75.7% | +5.1 |
| The Mouse | character | 889 | 11.1 | 75.5% | +4.9 |
| Improvised Arms | tactic | 497 | 15.1 | 76.1% | +4.8 |
| The Scholarly | personality | 828 | 17.2 | 75.4% | +4.6 |
| Winch Hook | equipment | 904 | 13.2 | 75.2% | +4.5 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Reckless | personality | 822 | 16.7 | 66.8% | -7.6 |
| Balm of Hours | spell | 728 | 11.6 | 67.4% | -6.3 |
| The Vandal | personality | 799 | 16.9 | 67.7% | -6.2 |
| Melchior the Moth-Eaten | character | 814 | 11.3 | 67.9% | -5.9 |
| Old Yarrow | character | 858 | 10.7 | 68.3% | -5.5 |
| Sylvane of the Nine Candles | character | 845 | 10.7 | 68.3% | -5.5 |
| Cause Fear | spell | 755 | 13.0 | 68.2% | -5.4 |
| Focused Fire | tactic | 497 | 15.5 | 67.8% | -5.3 |
| Encirclement | tactic | 503 | 15.2 | 68.2% | -4.8 |
| Radiant Lance | spell | 742 | 12.9 | 68.7% | -4.6 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 79.3% | 4.0 |
| guildmaster | 0.70 | 140 | 73.6% | 4.0 |
| warlord | 0.55 | 140 | 73.6% | 4.0 |
| archmage | 0.50 | 140 | 69.3% | 4.0 |
| novice | 0.15 | 140 | 61.4% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 15 | 33.3% |
| 2 | 54 | 61.1% |
| 3 | 55 | 65.5% |
| 4 | 2676 | 72.7% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 32 | 78.1% | — | — |
| 1 | 138 | 70.3% | — | — |
| 2 | 176 | 80.7% | — | — |
| 3 | 232 | 74.6% | — | — |
| 4 | 290 | 75.2% | 108 | 60.2% |
| 5 | 376 | 77.1% | 215 | 61.4% |
| 6 | 409 | 76.0% | 254 | 58.7% |
| 7 | 259 | 72.6% | 222 | 68.0% |
| 8 | 229 | 69.4% | 228 | 71.5% |
| 9+ | 659 | 63.3% | 1753 | 76.9% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 72.6% | 71.2% | +1.3 |
| cleric | 72.6% | 70.4% | +2.3 |
| wizard | 70.0% | 75.6% | -5.7 |
| rogue | 73.9% | 68.5% | +5.4 |
| alchemist | 72.5% | 71.3% | +1.2 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 828 | 75.4% | +3.2 |
| cunning | 1493 | 75.2% | +3.1 |
| craven | 833 | 74.9% | +2.8 |
| pious | 852 | 71.2% | -0.9 |
| greedy | 821 | 70.2% | -2.0 |
| brave | 800 | 69.8% | -2.4 |
| reckless | 1427 | 68.0% | -4.2 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 265 | 20.0% |
| 1 | 869 | 65.8% |
| 2 | 931 | 80.2% |
| 3 | 504 | 88.1% |
| 4 | 168 | 89.3% |
| 5+ | 63 | 85.7% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 1638 | 99.9% | 0.0 |
| stairs:descend | 1636 | 100.0% | 0.0 |
| library:study | 1504 | 100.0% | 0.0 |
| materials:gather | 1453 | 100.0% | 0.0 |
| trap:push-through | 998 | 100.0% | 4.3 |
| shrine:rest | 957 | 100.0% | 0.0 |
| boss:spell-strike | 897 | 98.3% | 2.3 |
| lab:pass-by | 738 | 100.0% | 0.0 |
| trap:spell-bypass | 665 | 100.0% | 0.0 |
| disaster:scatter | 661 | 47.4% | 0.0 |
| library:pass-by | 577 | 100.0% | 0.0 |
| library:bless-the-font | 577 | 100.0% | 0.0 |
| shrine:desecrate | 555 | 100.0% | 0.0 |
| disaster:brace | 554 | 100.0% | 5.3 |
| monster:fight | 528 | 99.8% | 1.3 |
| shrine:pass-by | 507 | 100.0% | 0.0 |
| lab:crack-crates | 502 | 100.0% | 0.0 |
| monster:sneak | 500 | 88.8% | 0.0 |
| library:strip-the-shelves | 500 | 100.0% | 0.0 |
| trap:disarm | 492 | 91.3% | 0.0 |
| lab:alchemy | 490 | 100.0% | 0.0 |
| monster:flee | 486 | 100.0% | 2.3 |
| disaster:sift-rubble | 460 | 100.0% | 0.0 |
| treasure:loot | 459 | 83.4% | 0.0 |
| stairs:rope-down | 454 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 409 | 100.0% | 0.7 |
| vault:loot | 397 | 72.5% | 0.0 |
| lab:strip-the-shelves | 387 | 100.0% | 0.0 |
| lab:harvest-spout | 381 | 100.0% | 0.0 |
| materials:pass-by | 378 | 100.0% | 0.0 |
| shrine:bless-the-font | 363 | 100.0% | 0.0 |
| library:deep-study | 359 | 97.5% | 0.0 |
| materials:sift-rubble | 359 | 100.0% | 0.0 |
| trap:search-around | 335 | 99.1% | 0.0 |
| trap:sift-rubble | 323 | 100.0% | 0.0 |
| materials:crack-crates | 313 | 100.0% | 0.0 |
| trap:smoke-bomb | 308 | 100.0% | 0.0 |
| boss:flee | 280 | 100.0% | 2.3 |
| boss:fight | 266 | 34.6% | 45.4 |
| boss:fight-from-cover | 261 | 55.2% | 37.5 |
| materials:harvest-spout | 248 | 100.0% | 0.0 |
| boss:shove-into-brazier | 245 | 57.1% | 35.3 |
| corridor:proceed | 240 | 100.0% | 0.0 |
| library:fill-waterskins | 238 | 100.0% | 0.0 |
| vault:inspect | 225 | 100.0% | 0.0 |
| boss:shove-into-pit | 220 | 65.0% | 30.9 |
| boss:shove-onto-spikes | 220 | 68.2% | 30.8 |
| treasure:inspect | 216 | 100.0% | 0.0 |
| monster:fight-from-cover | 211 | 99.5% | 0.5 |
| monster:shove-into-brazier | 209 | 99.5% | 0.1 |
| monster:shove-into-pit | 185 | 100.0% | 0.0 |
| boss:shove-into-chasm | 174 | 69.5% | 27.2 |
| monster:shove-onto-spikes | 174 | 100.0% | 0.1 |
| treasure:crack-crates | 170 | 100.0% | 0.0 |
| boss:drop-portcullis | 159 | 62.3% | 31.6 |
| monster:sift-rubble | 153 | 100.0% | 0.0 |
| shrine:fill-waterskins | 147 | 100.0% | 0.0 |
| lab:work-the-anvil | 145 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 143 | 100.0% | 0.8 |
| monster:crack-crates | 141 | 100.0% | 0.0 |
| monster:shove-into-chasm | 139 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 139 | 100.0% | 0.7 |
| vault:pry-sarcophagus | 129 | 100.0% | 1.1 |
| stairs:camp-stair | 120 | 100.0% | 3.0 |
| monster:turn-undead | 120 | 93.3% | 0.0 |
| monster:drop-portcullis | 115 | 100.0% | 0.1 |
| monster:topple-boulder | 110 | 100.0% | 0.3 |
| monster:harvest-spout | 110 | 100.0% | 0.0 |
| monster:bless-the-font | 108 | 100.0% | 0.0 |
| treasure:leave-it | 105 | 100.0% | 0.0 |
| vault:strip-the-shelves | 104 | 100.0% | 0.0 |
| treasure:knock-open | 103 | 100.0% | 0.0 |
| materials:work-the-anvil | 102 | 100.0% | 0.0 |
| monster:strip-the-shelves | 99 | 100.0% | 0.0 |
| vault:knock-open | 96 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 94 | 100.0% | 0.9 |
| vault:leave-it | 93 | 100.0% | 0.0 |
| boss:turn-undead | 70 | 80.0% | 0.0 |
| materials:brew-oil | 49 | 100.0% | 0.0 |
| monster:fill-waterskins | 49 | 100.0% | 0.0 |
| lab:brew-oil | 45 | 100.0% | 0.0 |
| monster:work-the-anvil | 43 | 100.0% | 0.0 |
| boss:bribe | 43 | 100.0% | 0.0 |
| boss:dark | 31 | 93.5% | 0.7 |
| monster:bribe | 27 | 100.0% | 0.0 |
| monster:cause-fear | 23 | 100.0% | 0.0 |
| corridor:sift-rubble | 18 | 100.0% | 0.0 |
| corridor:bless-the-font | 13 | 100.0% | 0.0 |
| corridor:crack-crates | 13 | 100.0% | 0.0 |
| monster:dark | 12 | 91.7% | 0.7 |
| corridor:harvest-spout | 10 | 100.0% | 0.0 |
| lab:dark | 9 | 100.0% | 0.0 |
| library:dark | 8 | 100.0% | 0.0 |
| vault:dark | 6 | 83.3% | 0.8 |
| shrine:dark | 6 | 100.0% | 0.0 |
| materials:dark | 6 | 100.0% | 0.0 |
| trap:dark | 5 | 100.0% | 0.0 |
| disaster:dark | 5 | 100.0% | 0.0 |
| corridor:work-the-anvil | 3 | 100.0% | 0.0 |
| treasure:dark | 1 | 100.0% | 0.0 |
| corridor:fill-waterskins | 1 | 100.0% | 0.0 |
| stairs:dark | 1 | 100.0% | 4.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| cinder-wyrm | 74 | 28.4% | 19.4 |
| dragon-whelp | 72 | 25.0% | 18.9 |
| ogre-king | 59 | 23.7% | 16.2 |
| forge-tyrant | 64 | 21.9% | 12.1 |
| the-precipitate | 76 | 18.4% | 13.1 |
| mad-pyromancer | 76 | 18.4% | 12.2 |
| archivist | 85 | 16.5% | 11.0 |
| mad-alchemist | 69 | 15.9% | 12.6 |
| glacier-heart | 96 | 15.6% | 10.6 |
| bog-witch | 55 | 14.5% | 12.8 |
| vampire-lord | 74 | 13.5% | 9.2 |
| the-cauldron | 77 | 11.7% | 11.4 |
| grand-errata | 70 | 11.4% | 10.3 |
| abbot-of-worms | 66 | 9.1% | 8.8 |
| shrouded-king | 80 | 8.8% | 9.3 |
| the-bride | 70 | 8.6% | 7.4 |
| cinder-imp | 62 | 1.6% | 0.3 |
| obsidian-golem | 76 | 1.3% | 2.8 |
| mutant-vine | 64 | 0.0% | 0.3 |
| failed-homunculus | 50 | 0.0% | 0.3 |
| potion-rats | 73 | 0.0% | 0.2 |
| skeleton | 56 | 0.0% | 0.2 |
| goblin-gang | 53 | 0.0% | 0.0 |
| spectral-scribe | 56 | 0.0% | 0.4 |
| ice-crawler | 89 | 0.0% | 0.1 |
| cinder-bats | 77 | 0.0% | 0.0 |
| jar-imp | 57 | 0.0% | 0.0 |
| pickled-thing | 47 | 0.0% | 0.2 |
| root-golem | 68 | 0.0% | 0.7 |
| salamander | 77 | 0.0% | 1.1 |
| crimson-mist | 73 | 0.0% | 0.1 |
| barrow-shade | 94 | 0.0% | 0.4 |
| hungry-ghoul | 63 | 0.0% | 0.3 |
| gelatinous | 58 | 0.0% | 0.2 |
| wraith | 51 | 0.0% | 0.3 |
| thawed-dead | 53 | 0.0% | 0.5 |
| flying-tomes | 60 | 0.0% | 0.0 |
| magma-toad | 79 | 0.0% | 0.4 |
| bone-warden | 86 | 0.0% | 0.4 |
| bat-cloud | 81 | 0.0% | 0.0 |
| frost-wisp | 65 | 0.0% | 0.0 |
| index-wight | 52 | 0.0% | 0.8 |
| pale-hound | 65 | 0.0% | 0.0 |
| sludge-elemental | 44 | 0.0% | 0.1 |
| ink-elemental | 64 | 0.0% | 0.0 |
| bog-toad | 50 | 0.0% | 0.1 |
| grave-mites | 114 | 0.0% | 0.0 |
| castle-thrall | 60 | 0.0% | 0.4 |
| rat-swarm | 49 | 0.0% | 0.0 |
