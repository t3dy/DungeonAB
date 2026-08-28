# Mining Report — 700 tables (2800 games), hard

Overall win rate: **71.0%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.19,"hard":1.44,"nightmare":1.83} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.19 · hard 1.44 · nightmare 1.83.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 838 | 12.8 | 85.7% | +21.0 |
| Bandolier of Knives | equipment | 855 | 12.9 | 76.8% | +8.4 |
| Everburning Lantern | equipment | 970 | 10.6 | 76.4% | +8.2 |
| The Mouse | character | 889 | 11.1 | 76.2% | +7.6 |
| Winch Hook | equipment | 904 | 13.2 | 75.2% | +6.2 |
| The Scholarly | personality | 828 | 17.2 | 75.4% | +6.2 |
| The Tinkerer | personality | 829 | 16.5 | 75.2% | +5.9 |
| Aegis of Ash | spell | 752 | 12.7 | 75.0% | +5.5 |
| Blessed Mace | equipment | 855 | 12.9 | 74.7% | +5.4 |
| Shield Wall | tactic | 498 | 15.5 | 75.1% | +5.0 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Vandal | personality | 799 | 16.9 | 65.3% | -7.9 |
| Old Yarrow | character | 858 | 10.7 | 66.2% | -6.9 |
| Field Surgery | tactic | 501 | 14.9 | 65.7% | -6.5 |
| Sylvane of the Nine Candles | character | 845 | 10.7 | 66.5% | -6.4 |
| Athanor Charm | equipment | 808 | 13.2 | 66.7% | -6.0 |
| Encirclement | tactic | 503 | 15.2 | 66.2% | -5.8 |
| Cause Fear | spell | 755 | 13.0 | 67.3% | -5.1 |
| Chain Lightning | spell | 719 | 12.6 | 67.3% | -5.0 |
| The Reckless | personality | 822 | 16.7 | 67.5% | -4.9 |
| Fireball | spell | 776 | 12.4 | 67.5% | -4.8 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 75.7% | 4.0 |
| guildmaster | 0.70 | 140 | 72.1% | 4.0 |
| warlord | 0.55 | 140 | 77.9% | 4.0 |
| archmage | 0.50 | 140 | 75.0% | 4.0 |
| novice | 0.15 | 140 | 50.0% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 15 | 20.0% |
| 2 | 54 | 35.2% |
| 3 | 55 | 61.8% |
| 4 | 2676 | 72.2% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 32 | 81.3% | — | — |
| 1 | 138 | 66.7% | — | — |
| 2 | 176 | 76.7% | — | — |
| 3 | 232 | 73.7% | — | — |
| 4 | 290 | 73.1% | 108 | 60.2% |
| 5 | 376 | 74.7% | 215 | 62.8% |
| 6 | 409 | 75.8% | 254 | 60.6% |
| 7 | 259 | 70.7% | 222 | 65.8% |
| 8 | 229 | 69.9% | 228 | 72.8% |
| 9+ | 659 | 63.4% | 1753 | 74.8% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 71.8% | 69.1% | +2.7 |
| cleric | 72.4% | 66.0% | +6.4 |
| wizard | 69.1% | 74.0% | -4.9 |
| rogue | 73.6% | 65.7% | +7.9 |
| alchemist | 71.7% | 69.4% | +2.4 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 828 | 75.4% | +4.4 |
| cunning | 1493 | 74.2% | +3.2 |
| craven | 833 | 73.0% | +2.0 |
| pious | 852 | 71.6% | +0.6 |
| greedy | 821 | 69.1% | -1.9 |
| brave | 800 | 68.3% | -2.7 |
| reckless | 1427 | 67.8% | -3.2 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 266 | 19.5% |
| 1 | 866 | 64.5% |
| 2 | 969 | 80.1% |
| 3 | 482 | 84.9% |
| 4 | 158 | 89.9% |
| 5+ | 59 | 84.7% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| stairs:descend | 1598 | 100.0% | 0.0 |
| library:study | 1569 | 100.0% | 0.0 |
| monster:spell-strike | 1567 | 99.9% | 0.0 |
| materials:gather | 1453 | 100.0% | 0.0 |
| trap:push-through | 954 | 100.0% | 4.4 |
| shrine:rest | 937 | 100.0% | 0.0 |
| boss:spell-strike | 898 | 98.2% | 1.9 |
| lab:pass-by | 756 | 100.0% | 0.0 |
| trap:spell-bypass | 673 | 100.0% | 0.0 |
| disaster:scatter | 670 | 49.9% | 0.0 |
| shrine:desecrate | 611 | 100.0% | 0.0 |
| library:bless-the-font | 591 | 100.0% | 0.0 |
| monster:fight | 578 | 99.8% | 1.4 |
| library:pass-by | 542 | 100.0% | 0.0 |
| disaster:brace | 532 | 100.0% | 5.3 |
| lab:alchemy | 521 | 100.0% | 0.0 |
| monster:sneak | 509 | 87.2% | 0.0 |
| shrine:pass-by | 503 | 100.0% | 0.0 |
| library:strip-the-shelves | 503 | 100.0% | 0.0 |
| trap:disarm | 490 | 92.4% | 0.0 |
| lab:crack-crates | 481 | 100.0% | 0.0 |
| treasure:loot | 474 | 81.6% | 0.0 |
| disaster:sift-rubble | 463 | 100.0% | 0.0 |
| monster:flee | 457 | 100.0% | 2.3 |
| stairs:rope-down | 449 | 100.0% | 0.0 |
| materials:pass-by | 430 | 100.0% | 0.0 |
| vault:loot | 385 | 72.2% | 0.0 |
| trap:search-around | 381 | 99.0% | 0.0 |
| shrine:pry-sarcophagus | 379 | 100.0% | 0.9 |
| lab:harvest-spout | 377 | 100.0% | 0.0 |
| materials:sift-rubble | 376 | 100.0% | 0.0 |
| lab:strip-the-shelves | 375 | 100.0% | 0.0 |
| shrine:bless-the-font | 347 | 100.0% | 0.0 |
| library:deep-study | 347 | 98.8% | 0.0 |
| trap:sift-rubble | 335 | 100.0% | 0.0 |
| trap:smoke-bomb | 303 | 100.0% | 0.0 |
| materials:crack-crates | 295 | 100.0% | 0.0 |
| boss:flee | 281 | 100.0% | 2.3 |
| boss:shove-into-brazier | 278 | 57.9% | 33.1 |
| boss:fight-from-cover | 269 | 53.9% | 36.6 |
| materials:harvest-spout | 264 | 100.0% | 0.0 |
| corridor:proceed | 244 | 100.0% | 0.0 |
| boss:fight | 244 | 36.1% | 45.0 |
| treasure:inspect | 237 | 100.0% | 0.0 |
| vault:inspect | 233 | 100.0% | 0.0 |
| library:fill-waterskins | 228 | 100.0% | 0.0 |
| boss:shove-into-pit | 223 | 62.3% | 31.8 |
| monster:fight-from-cover | 223 | 99.6% | 0.6 |
| boss:shove-onto-spikes | 213 | 62.0% | 32.3 |
| monster:shove-into-brazier | 188 | 100.0% | 0.0 |
| monster:shove-onto-spikes | 186 | 100.0% | 0.1 |
| monster:sift-rubble | 181 | 100.0% | 0.0 |
| monster:shove-into-pit | 180 | 100.0% | 0.0 |
| boss:shove-into-chasm | 162 | 74.7% | 26.9 |
| boss:drop-portcullis | 161 | 62.7% | 33.5 |
| shrine:fill-waterskins | 156 | 100.0% | 0.0 |
| treasure:crack-crates | 153 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 149 | 100.0% | 0.7 |
| monster:crack-crates | 140 | 100.0% | 0.0 |
| lab:work-the-anvil | 135 | 100.0% | 0.0 |
| stairs:camp-stair | 134 | 100.0% | 2.8 |
| monster:shove-into-chasm | 132 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 126 | 100.0% | 1.0 |
| monster:turn-undead | 121 | 91.7% | 0.0 |
| vault:pry-sarcophagus | 118 | 100.0% | 0.8 |
| monster:topple-boulder | 117 | 100.0% | 0.5 |
| monster:bless-the-font | 117 | 100.0% | 0.0 |
| treasure:knock-open | 113 | 100.0% | 0.0 |
| materials:work-the-anvil | 111 | 100.0% | 0.0 |
| vault:leave-it | 110 | 100.0% | 0.0 |
| vault:strip-the-shelves | 110 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 103 | 100.0% | 0.9 |
| vault:knock-open | 100 | 100.0% | 0.0 |
| monster:strip-the-shelves | 98 | 100.0% | 0.0 |
| monster:drop-portcullis | 94 | 100.0% | 0.3 |
| treasure:leave-it | 84 | 100.0% | 0.0 |
| monster:harvest-spout | 75 | 100.0% | 0.0 |
| boss:turn-undead | 58 | 86.2% | 0.0 |
| lab:brew-oil | 56 | 100.0% | 0.0 |
| monster:fill-waterskins | 51 | 100.0% | 0.0 |
| boss:dark | 45 | 97.8% | 0.6 |
| monster:work-the-anvil | 45 | 100.0% | 0.0 |
| materials:brew-oil | 44 | 100.0% | 0.0 |
| boss:bribe | 39 | 100.0% | 0.0 |
| monster:bribe | 27 | 100.0% | 0.0 |
| corridor:sift-rubble | 26 | 100.0% | 0.0 |
| monster:cause-fear | 24 | 100.0% | 0.0 |
| monster:dark | 24 | 100.0% | 0.6 |
| corridor:crack-crates | 20 | 100.0% | 0.0 |
| corridor:bless-the-font | 14 | 100.0% | 0.0 |
| corridor:harvest-spout | 11 | 100.0% | 0.0 |
| library:dark | 9 | 88.9% | 0.6 |
| trap:dark | 9 | 100.0% | 0.0 |
| materials:dark | 6 | 100.0% | 0.0 |
| corridor:work-the-anvil | 6 | 100.0% | 0.0 |
| vault:dark | 6 | 100.0% | 0.0 |
| lab:dark | 5 | 100.0% | 0.0 |
| shrine:dark | 3 | 66.7% | 0.0 |
| treasure:dark | 2 | 100.0% | 0.0 |
| corridor:fill-waterskins | 2 | 100.0% | 0.0 |
| disaster:dark | 2 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| the-precipitate | 77 | 23.4% | 16.4 |
| forge-tyrant | 64 | 21.9% | 16.1 |
| cinder-wyrm | 71 | 21.1% | 14.7 |
| the-cauldron | 67 | 19.4% | 14.4 |
| the-bride | 74 | 18.9% | 11.5 |
| ogre-king | 55 | 18.2% | 11.9 |
| mad-pyromancer | 73 | 17.8% | 12.8 |
| dragon-whelp | 76 | 15.8% | 12.0 |
| abbot-of-worms | 72 | 15.3% | 9.6 |
| mad-alchemist | 59 | 15.3% | 10.9 |
| bog-witch | 66 | 15.2% | 12.0 |
| vampire-lord | 76 | 13.2% | 9.4 |
| glacier-heart | 84 | 9.5% | 9.3 |
| archivist | 73 | 8.2% | 8.4 |
| grand-errata | 81 | 6.2% | 4.4 |
| shrouded-king | 74 | 5.4% | 6.1 |
| hungry-ghoul | 60 | 1.7% | 0.6 |
| obsidian-golem | 71 | 1.4% | 3.0 |
| mutant-vine | 59 | 0.0% | 0.2 |
| skeleton | 48 | 0.0% | 0.5 |
| ink-elemental | 57 | 0.0% | 0.1 |
| spectral-scribe | 52 | 0.0% | 0.1 |
| pickled-thing | 44 | 0.0% | 0.3 |
| frost-wisp | 60 | 0.0% | 0.1 |
| ice-crawler | 84 | 0.0% | 0.1 |
| root-golem | 83 | 0.0% | 0.9 |
| jar-imp | 63 | 0.0% | 0.0 |
| cinder-bats | 82 | 0.0% | 0.0 |
| barrow-shade | 79 | 0.0% | 0.1 |
| wraith | 48 | 0.0% | 0.6 |
| sludge-elemental | 48 | 0.0% | 0.1 |
| gelatinous | 66 | 0.0% | 0.2 |
| goblin-gang | 46 | 0.0% | 0.3 |
| flying-tomes | 64 | 0.0% | 0.0 |
| thawed-dead | 63 | 0.0% | 0.7 |
| crimson-mist | 76 | 0.0% | 0.7 |
| salamander | 62 | 0.0% | 0.8 |
| magma-toad | 64 | 0.0% | 0.4 |
| grave-mites | 113 | 0.0% | 0.0 |
| failed-homunculus | 62 | 0.0% | 0.7 |
| bat-cloud | 89 | 0.0% | 0.0 |
| cinder-imp | 57 | 0.0% | 0.1 |
| pale-hound | 69 | 0.0% | 0.3 |
| potion-rats | 59 | 0.0% | 0.2 |
| index-wight | 57 | 0.0% | 0.5 |
| bone-warden | 84 | 0.0% | 0.5 |
| bog-toad | 56 | 0.0% | 0.2 |
| castle-thrall | 70 | 0.0% | 0.3 |
| rat-swarm | 50 | 0.0% | 0.1 |
