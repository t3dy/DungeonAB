# Mining Report — 700 tables (2800 games), hard

Overall win rate: **70.5%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.19,"hard":1.45,"nightmare":1.97} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.19 · hard 1.45 · nightmare 1.97.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 862 | 13.0 | 84.6% | +20.3 |
| The Cunning | personality | 829 | 16.7 | 76.6% | +8.7 |
| Bandolier of Knives | equipment | 902 | 12.9 | 76.3% | +8.5 |
| Winch Hook | equipment | 836 | 13.3 | 75.5% | +7.1 |
| Everburning Lantern | equipment | 939 | 10.7 | 74.9% | +6.6 |
| Eyes of the Mouse | spell | 777 | 10.9 | 74.6% | +5.7 |
| Feather Step | spell | 720 | 12.9 | 74.6% | +5.5 |
| The Craven | personality | 832 | 17.2 | 74.3% | +5.4 |
| Blessed Mace | equipment | 916 | 13.1 | 73.8% | +4.9 |
| Dancing Light | spell | 797 | 10.9 | 73.9% | +4.8 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Vandal | personality | 792 | 17.2 | 64.8% | -8.0 |
| The Reckless | personality | 835 | 16.4 | 65.3% | -7.5 |
| Balm of Hours | spell | 752 | 11.8 | 65.6% | -6.8 |
| Knock | spell | 744 | 13.0 | 66.1% | -6.0 |
| Firewatch | tactic | 566 | 15.2 | 65.9% | -5.8 |
| Field Surgery | tactic | 535 | 15.7 | 66.4% | -5.1 |
| Frost Lance | spell | 789 | 12.7 | 67.3% | -4.5 |
| Sylvane of the Nine Candles | character | 835 | 10.9 | 67.4% | -4.4 |
| Chain Lightning | spell | 726 | 12.7 | 67.4% | -4.2 |
| Ward-Weaving | tactic | 550 | 15.2 | 67.1% | -4.2 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 66.4% | 4.0 |
| guildmaster | 0.70 | 140 | 68.6% | 4.0 |
| warlord | 0.55 | 140 | 73.6% | 4.0 |
| archmage | 0.50 | 140 | 65.7% | 4.0 |
| novice | 0.15 | 140 | 52.9% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 16 | 25.0% |
| 2 | 49 | 49.0% |
| 3 | 57 | 66.7% |
| 4 | 2678 | 71.2% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 31 | 41.9% | — | — |
| 1 | 119 | 72.3% | — | — |
| 2 | 186 | 71.5% | — | — |
| 3 | 225 | 78.2% | 32 | 50.0% |
| 4 | 333 | 74.5% | 93 | 60.2% |
| 5 | 386 | 73.3% | 196 | 67.3% |
| 6 | 380 | 71.6% | 274 | 65.3% |
| 7 | 247 | 73.3% | 226 | 61.1% |
| 8 | 229 | 68.1% | 207 | 68.1% |
| 9+ | 664 | 64.2% | 1766 | 74.1% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 70.0% | 71.7% | -1.7 |
| cleric | 72.1% | 64.9% | +7.1 |
| wizard | 70.6% | 70.3% | +0.4 |
| rogue | 71.7% | 67.8% | +3.9 |
| alchemist | 69.6% | 72.5% | -2.9 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| craven | 832 | 74.3% | +3.8 |
| scholarly | 837 | 73.5% | +3.0 |
| cunning | 1470 | 73.4% | +2.9 |
| greedy | 839 | 69.8% | -0.7 |
| pious | 872 | 69.2% | -1.3 |
| brave | 814 | 68.4% | -2.1 |
| reckless | 1443 | 65.7% | -4.8 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 277 | 22.4% |
| 1 | 852 | 61.2% |
| 2 | 935 | 81.0% |
| 3 | 498 | 85.9% |
| 4 | 169 | 87.0% |
| 5+ | 69 | 85.5% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 1966 | 99.9% | 0.0 |
| library:study | 1791 | 100.0% | 0.0 |
| materials:gather | 1716 | 100.0% | 0.0 |
| stairs:descend | 1612 | 100.0% | 0.0 |
| shrine:rest | 1117 | 100.0% | 0.0 |
| boss:spell-strike | 1097 | 97.5% | 2.5 |
| lab:pass-by | 1079 | 100.0% | 0.0 |
| trap:push-through | 1001 | 100.0% | 4.2 |
| monster:fight | 773 | 99.5% | 1.4 |
| disaster:scatter | 748 | 49.7% | 0.0 |
| shrine:desecrate | 742 | 100.0% | 0.0 |
| library:pass-by | 739 | 100.0% | 0.0 |
| trap:spell-bypass | 738 | 100.0% | 0.0 |
| monster:sneak | 672 | 88.1% | 0.0 |
| monster:flee | 665 | 100.0% | 2.4 |
| shrine:pass-by | 633 | 100.0% | 0.0 |
| disaster:brace | 608 | 100.0% | 5.4 |
| lab:alchemy | 592 | 100.0% | 0.0 |
| vault:loot | 584 | 72.4% | 0.0 |
| treasure:loot | 566 | 82.7% | 0.0 |
| materials:pass-by | 523 | 100.0% | 0.0 |
| trap:disarm | 520 | 90.8% | 0.0 |
| library:deep-study | 425 | 98.4% | 0.0 |
| stairs:rope-down | 417 | 100.0% | 0.0 |
| boss:flee | 402 | 100.0% | 2.4 |
| trap:search-around | 374 | 98.7% | 0.0 |
| lab:crack-crates | 361 | 100.0% | 0.0 |
| boss:fight | 353 | 34.0% | 44.9 |
| disaster:sift-rubble | 348 | 100.0% | 0.0 |
| library:bless-the-font | 341 | 100.0% | 0.0 |
| library:strip-the-shelves | 330 | 100.0% | 0.0 |
| trap:smoke-bomb | 312 | 100.0% | 0.0 |
| lab:harvest-spout | 308 | 100.0% | 0.0 |
| corridor:proceed | 288 | 100.0% | 0.0 |
| vault:inspect | 281 | 100.0% | 0.0 |
| boss:fight-from-cover | 279 | 58.4% | 37.1 |
| treasure:inspect | 276 | 100.0% | 0.0 |
| boss:shove-into-brazier | 259 | 51.4% | 37.3 |
| lab:strip-the-shelves | 239 | 100.0% | 0.0 |
| trap:sift-rubble | 215 | 100.0% | 0.0 |
| materials:sift-rubble | 214 | 100.0% | 0.0 |
| boss:shove-into-pit | 210 | 50.0% | 39.0 |
| shrine:pry-sarcophagus | 187 | 100.0% | 0.9 |
| shrine:bless-the-font | 181 | 100.0% | 0.0 |
| monster:turn-undead | 179 | 95.0% | 0.0 |
| materials:crack-crates | 178 | 100.0% | 0.0 |
| boss:drop-portcullis | 154 | 54.5% | 37.6 |
| monster:fight-from-cover | 154 | 100.0% | 0.3 |
| monster:shove-into-brazier | 146 | 99.3% | 0.2 |
| library:fill-waterskins | 144 | 100.0% | 0.0 |
| materials:harvest-spout | 142 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 139 | 100.0% | 0.6 |
| treasure:knock-open | 128 | 100.0% | 0.0 |
| stairs:camp-stair | 121 | 100.0% | 2.7 |
| vault:knock-open | 119 | 100.0% | 0.0 |
| monster:shove-into-pit | 113 | 100.0% | 0.2 |
| lab:work-the-anvil | 107 | 100.0% | 0.0 |
| boss:turn-undead | 107 | 86.9% | 0.0 |
| monster:crack-crates | 103 | 100.0% | 0.0 |
| monster:drop-portcullis | 101 | 100.0% | 0.2 |
| treasure:crack-crates | 99 | 100.0% | 0.0 |
| monster:sift-rubble | 97 | 100.0% | 0.0 |
| monster:strip-the-shelves | 90 | 100.0% | 0.0 |
| shrine:fill-waterskins | 90 | 100.0% | 0.0 |
| vault:leave-it | 88 | 100.0% | 0.0 |
| monster:bless-the-font | 81 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 79 | 100.0% | 0.8 |
| monster:harvest-spout | 77 | 100.0% | 0.0 |
| monster:topple-boulder | 74 | 100.0% | 0.3 |
| treasure:leave-it | 68 | 100.0% | 0.0 |
| boss:bribe | 60 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 58 | 100.0% | 1.3 |
| lab:brew-oil | 56 | 100.0% | 0.0 |
| materials:brew-oil | 50 | 100.0% | 0.0 |
| materials:work-the-anvil | 46 | 100.0% | 0.0 |
| boss:dark | 42 | 97.6% | 0.9 |
| vault:strip-the-shelves | 41 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 37 | 100.0% | 0.6 |
| monster:bribe | 35 | 100.0% | 0.0 |
| monster:work-the-anvil | 31 | 100.0% | 0.0 |
| monster:fill-waterskins | 28 | 100.0% | 0.0 |
| monster:cause-fear | 25 | 100.0% | 0.0 |
| monster:dark | 21 | 95.2% | 1.0 |
| corridor:harvest-spout | 18 | 100.0% | 0.0 |
| corridor:crack-crates | 15 | 100.0% | 0.0 |
| library:dark | 15 | 100.0% | 0.0 |
| corridor:sift-rubble | 13 | 100.0% | 0.0 |
| corridor:bless-the-font | 11 | 100.0% | 0.0 |
| trap:dark | 9 | 100.0% | 0.0 |
| shrine:dark | 8 | 100.0% | 0.0 |
| vault:dark | 6 | 100.0% | 0.0 |
| corridor:work-the-anvil | 5 | 100.0% | 0.0 |
| materials:dark | 4 | 100.0% | 0.0 |
| treasure:dark | 4 | 100.0% | 0.0 |
| corridor:fill-waterskins | 3 | 100.0% | 0.0 |
| disaster:dark | 3 | 100.0% | 0.0 |
| lab:dark | 2 | 50.0% | 0.0 |
| corridor:dark | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| forge-tyrant | 90 | 27.8% | 16.2 |
| the-cauldron | 96 | 26.0% | 18.0 |
| ogre-king | 91 | 24.2% | 17.2 |
| the-precipitate | 92 | 20.7% | 14.3 |
| mad-pyromancer | 102 | 19.6% | 13.2 |
| bog-witch | 78 | 19.2% | 14.6 |
| vampire-lord | 94 | 17.0% | 12.9 |
| grand-errata | 91 | 16.5% | 13.5 |
| mad-alchemist | 86 | 16.3% | 13.8 |
| abbot-of-worms | 84 | 15.5% | 10.7 |
| cinder-wyrm | 98 | 15.3% | 11.3 |
| the-bride | 92 | 15.2% | 10.0 |
| dragon-whelp | 86 | 15.1% | 13.5 |
| archivist | 87 | 13.8% | 8.7 |
| shrouded-king | 79 | 12.7% | 7.4 |
| glacier-heart | 104 | 11.5% | 9.5 |
| gelatinous | 75 | 2.7% | 0.4 |
| jar-imp | 74 | 1.4% | 0.1 |
| thawed-dead | 75 | 1.3% | 0.3 |
| index-wight | 76 | 1.3% | 0.6 |
| barrow-shade | 99 | 1.0% | 0.3 |
| mutant-vine | 84 | 0.0% | 0.4 |
| failed-homunculus | 71 | 0.0% | 0.2 |
| skeleton | 61 | 0.0% | 0.4 |
| rat-swarm | 82 | 0.0% | 0.0 |
| ink-elemental | 93 | 0.0% | 0.3 |
| spectral-scribe | 79 | 0.0% | 0.5 |
| ice-crawler | 93 | 0.0% | 0.3 |
| obsidian-golem | 81 | 0.0% | 1.9 |
| root-golem | 97 | 0.0% | 1.2 |
| bog-toad | 70 | 0.0% | 0.5 |
| crimson-mist | 87 | 0.0% | 0.5 |
| sludge-elemental | 66 | 0.0% | 0.7 |
| goblin-gang | 71 | 0.0% | 0.2 |
| wraith | 59 | 0.0% | 0.7 |
| flying-tomes | 95 | 0.0% | 0.2 |
| salamander | 92 | 0.0% | 1.0 |
| magma-toad | 74 | 0.0% | 0.3 |
| grave-mites | 114 | 0.0% | 0.0 |
| pale-hound | 90 | 0.0% | 0.4 |
| bat-cloud | 93 | 0.0% | 0.2 |
| potion-rats | 95 | 0.0% | 0.1 |
| cinder-bats | 92 | 0.0% | 0.1 |
| cinder-imp | 93 | 0.0% | 0.1 |
| hungry-ghoul | 95 | 0.0% | 0.1 |
| bone-warden | 97 | 0.0% | 0.3 |
| pickled-thing | 74 | 0.0% | 0.4 |
| frost-wisp | 68 | 0.0% | 0.0 |
| castle-thrall | 74 | 0.0% | 0.7 |
