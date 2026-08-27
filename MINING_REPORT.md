# Mining Report — 700 tables (2800 games), hard

Overall win rate: **70.3%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.19,"hard":1.45,"nightmare":1.97} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.19 · hard 1.45 · nightmare 1.97.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 866 | 12.9 | 84.9% | +21.1 |
| Bandolier of Knives | equipment | 889 | 13.0 | 75.6% | +7.7 |
| Everburning Lantern | equipment | 918 | 10.8 | 75.4% | +7.5 |
| The Cunning | personality | 819 | 16.9 | 75.3% | +7.1 |
| Dancing Light | spell | 806 | 10.5 | 74.8% | +6.3 |
| The Mouse | character | 929 | 11.5 | 74.5% | +6.2 |
| The Scholarly | personality | 834 | 16.6 | 74.3% | +5.7 |
| The Craven | personality | 819 | 17.3 | 73.9% | +5.0 |
| Warded Buckler | equipment | 860 | 12.4 | 73.6% | +4.7 |
| Ursula Ironknee | character | 791 | 10.6 | 73.3% | +4.2 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Reckless | personality | 831 | 16.6 | 64.3% | -8.6 |
| Field Surgery | tactic | 613 | 15.5 | 64.3% | -7.7 |
| Portable Alembic | equipment | 850 | 12.9 | 65.2% | -7.4 |
| The Covetous | personality | 823 | 16.5 | 65.2% | -7.2 |
| Athanor Charm | equipment | 837 | 13.2 | 65.6% | -6.7 |
| The Vandal | personality | 813 | 17.0 | 65.6% | -6.7 |
| Chain Lightning | spell | 787 | 12.6 | 67.0% | -4.7 |
| Mending Word | spell | 762 | 12.3 | 67.2% | -4.3 |
| Melchior the Moth-Eaten | character | 828 | 11.0 | 67.4% | -4.2 |
| Balm of Hours | spell | 721 | 11.4 | 67.4% | -3.9 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 70.0% | 4.0 |
| guildmaster | 0.70 | 140 | 72.9% | 4.0 |
| warlord | 0.55 | 140 | 72.9% | 4.0 |
| archmage | 0.50 | 140 | 62.1% | 4.0 |
| novice | 0.15 | 140 | 54.3% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 10 | 30.0% |
| 2 | 59 | 61.0% |
| 3 | 56 | 53.6% |
| 4 | 2675 | 71.0% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 49 | 65.3% | — | — |
| 1 | 121 | 71.1% | — | — |
| 2 | 178 | 69.7% | — | — |
| 3 | 215 | 76.3% | — | — |
| 4 | 306 | 74.5% | 97 | 67.0% |
| 5 | 404 | 70.3% | 204 | 69.1% |
| 6 | 374 | 69.8% | 249 | 68.3% |
| 7 | 273 | 74.0% | 248 | 68.1% |
| 8 | 200 | 66.5% | 207 | 59.4% |
| 9+ | 680 | 66.9% | 1759 | 72.9% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 70.2% | 70.6% | -0.3 |
| cleric | 70.9% | 68.3% | +2.7 |
| wizard | 69.7% | 71.2% | -1.5 |
| rogue | 72.4% | 65.9% | +6.5 |
| alchemist | 70.7% | 69.4% | +1.3 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 834 | 74.3% | +4.0 |
| craven | 819 | 73.9% | +3.5 |
| cunning | 1465 | 73.8% | +3.5 |
| pious | 907 | 73.0% | +2.7 |
| brave | 818 | 68.8% | -1.5 |
| reckless | 1469 | 65.6% | -4.7 |
| greedy | 823 | 65.2% | -5.1 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 251 | 20.7% |
| 1 | 853 | 61.2% |
| 2 | 1013 | 79.7% |
| 3 | 451 | 85.6% |
| 4 | 164 | 86.6% |
| 5+ | 68 | 88.2% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 1933 | 99.8% | 0.0 |
| materials:gather | 1761 | 100.0% | 0.0 |
| library:study | 1748 | 100.0% | 0.0 |
| stairs:descend | 1695 | 100.0% | 0.0 |
| shrine:rest | 1149 | 100.0% | 0.0 |
| lab:pass-by | 1117 | 100.0% | 0.0 |
| boss:spell-strike | 1089 | 98.8% | 2.4 |
| trap:push-through | 1045 | 100.0% | 4.4 |
| monster:flee | 856 | 100.0% | 0.0 |
| monster:fight | 755 | 99.3% | 1.5 |
| disaster:scatter | 744 | 46.4% | 0.0 |
| shrine:desecrate | 721 | 100.0% | 0.0 |
| trap:spell-bypass | 698 | 100.0% | 0.0 |
| library:pass-by | 694 | 100.0% | 0.0 |
| disaster:brace | 655 | 100.0% | 5.4 |
| monster:sneak | 652 | 88.8% | 0.0 |
| shrine:pass-by | 652 | 100.0% | 0.0 |
| treasure:loot | 615 | 81.3% | 0.0 |
| lab:alchemy | 602 | 100.0% | 0.0 |
| vault:loot | 553 | 68.9% | 0.0 |
| materials:pass-by | 506 | 100.0% | 0.0 |
| trap:disarm | 486 | 91.8% | 0.0 |
| boss:flee | 479 | 100.0% | 0.0 |
| library:deep-study | 438 | 97.3% | 0.0 |
| disaster:sift-rubble | 395 | 100.0% | 0.0 |
| stairs:camp-stair | 368 | 100.0% | 2.9 |
| trap:search-around | 363 | 99.7% | 0.0 |
| stairs:rope-down | 362 | 100.0% | 0.0 |
| library:bless-the-font | 360 | 100.0% | 0.0 |
| boss:fight | 352 | 34.7% | 45.1 |
| lab:crack-crates | 313 | 100.0% | 0.0 |
| trap:smoke-bomb | 306 | 100.0% | 0.0 |
| vault:inspect | 302 | 100.0% | 0.0 |
| library:strip-the-shelves | 288 | 100.0% | 0.0 |
| boss:fight-from-cover | 288 | 53.1% | 38.4 |
| lab:strip-the-shelves | 276 | 100.0% | 0.0 |
| treasure:inspect | 267 | 100.0% | 0.0 |
| lab:harvest-spout | 260 | 100.0% | 0.0 |
| boss:shove-into-brazier | 257 | 48.6% | 39.2 |
| corridor:proceed | 245 | 100.0% | 0.0 |
| trap:sift-rubble | 231 | 100.0% | 0.0 |
| boss:shove-into-pit | 224 | 53.6% | 37.5 |
| materials:sift-rubble | 221 | 100.0% | 0.0 |
| monster:turn-undead | 191 | 93.2% | 0.0 |
| shrine:bless-the-font | 187 | 100.0% | 0.0 |
| materials:crack-crates | 179 | 100.0% | 0.0 |
| monster:fight-from-cover | 175 | 99.4% | 0.5 |
| shrine:pry-sarcophagus | 175 | 100.0% | 0.7 |
| monster:shove-into-brazier | 164 | 100.0% | 0.4 |
| boss:drop-portcullis | 154 | 51.3% | 36.3 |
| boss:pry-sarcophagus | 148 | 100.0% | 0.8 |
| monster:shove-into-pit | 143 | 100.0% | 0.3 |
| library:fill-waterskins | 143 | 100.0% | 0.0 |
| materials:harvest-spout | 133 | 100.0% | 0.0 |
| vault:knock-open | 129 | 100.0% | 0.0 |
| treasure:knock-open | 124 | 100.0% | 0.0 |
| monster:sift-rubble | 108 | 100.0% | 0.0 |
| lab:work-the-anvil | 105 | 100.0% | 0.0 |
| monster:crack-crates | 98 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 97 | 100.0% | 0.5 |
| boss:turn-undead | 95 | 89.5% | 0.0 |
| treasure:crack-crates | 90 | 100.0% | 0.0 |
| vault:leave-it | 86 | 100.0% | 0.0 |
| monster:drop-portcullis | 84 | 100.0% | 0.3 |
| monster:harvest-spout | 81 | 100.0% | 0.0 |
| monster:bless-the-font | 80 | 100.0% | 0.0 |
| shrine:fill-waterskins | 78 | 100.0% | 0.0 |
| monster:strip-the-shelves | 78 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 69 | 100.0% | 0.8 |
| treasure:leave-it | 69 | 100.0% | 0.0 |
| monster:topple-boulder | 68 | 100.0% | 0.2 |
| materials:work-the-anvil | 59 | 100.0% | 0.0 |
| boss:bribe | 56 | 100.0% | 0.0 |
| boss:dark | 51 | 98.0% | 0.1 |
| vault:strip-the-shelves | 48 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 45 | 100.0% | 0.8 |
| lab:brew-oil | 41 | 100.0% | 0.0 |
| monster:bribe | 37 | 100.0% | 0.0 |
| monster:fill-waterskins | 31 | 100.0% | 0.0 |
| monster:work-the-anvil | 31 | 100.0% | 0.0 |
| materials:brew-oil | 25 | 100.0% | 0.0 |
| monster:cause-fear | 20 | 100.0% | 0.0 |
| corridor:crack-crates | 20 | 100.0% | 0.0 |
| monster:dark | 14 | 100.0% | 0.4 |
| shrine:dark | 13 | 100.0% | 0.5 |
| corridor:sift-rubble | 12 | 100.0% | 0.0 |
| corridor:bless-the-font | 11 | 100.0% | 0.0 |
| corridor:harvest-spout | 10 | 100.0% | 0.0 |
| trap:dark | 7 | 100.0% | 0.0 |
| corridor:fill-waterskins | 6 | 100.0% | 0.0 |
| library:dark | 6 | 100.0% | 0.0 |
| materials:dark | 5 | 100.0% | 0.0 |
| lab:dark | 5 | 100.0% | 0.4 |
| vault:dark | 5 | 100.0% | 0.0 |
| treasure:dark | 5 | 100.0% | 0.0 |
| disaster:dark | 4 | 100.0% | 0.5 |
| corridor:work-the-anvil | 3 | 100.0% | 0.0 |
| corridor:dark | 1 | 100.0% | 0.0 |
| stairs:dark | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| the-cauldron | 90 | 24.4% | 19.1 |
| forge-tyrant | 78 | 24.4% | 17.7 |
| ogre-king | 90 | 22.2% | 17.6 |
| glacier-heart | 109 | 20.2% | 13.8 |
| mad-alchemist | 86 | 18.6% | 15.1 |
| the-precipitate | 87 | 18.4% | 16.7 |
| mad-pyromancer | 103 | 17.5% | 11.9 |
| grand-errata | 89 | 16.9% | 10.0 |
| bog-witch | 72 | 16.7% | 13.3 |
| shrouded-king | 93 | 16.1% | 11.3 |
| vampire-lord | 107 | 15.9% | 11.0 |
| cinder-wyrm | 88 | 12.5% | 9.3 |
| dragon-whelp | 89 | 12.4% | 9.8 |
| the-bride | 92 | 12.0% | 8.6 |
| archivist | 93 | 11.8% | 11.5 |
| abbot-of-worms | 75 | 9.3% | 9.1 |
| obsidian-golem | 87 | 2.3% | 3.3 |
| thawed-dead | 66 | 1.5% | 0.8 |
| bog-toad | 74 | 1.4% | 0.5 |
| salamander | 76 | 1.3% | 0.4 |
| ink-elemental | 80 | 1.3% | 0.5 |
| cinder-imp | 88 | 1.1% | 0.3 |
| cinder-bats | 90 | 1.1% | 0.0 |
| mutant-vine | 85 | 0.0% | 0.5 |
| failed-homunculus | 62 | 0.0% | 0.4 |
| barrow-shade | 105 | 0.0% | 0.5 |
| potion-rats | 96 | 0.0% | 0.0 |
| ice-crawler | 93 | 0.0% | 0.1 |
| pickled-thing | 82 | 0.0% | 0.7 |
| index-wight | 65 | 0.0% | 1.3 |
| crimson-mist | 100 | 0.0% | 0.3 |
| gelatinous | 89 | 0.0% | 0.4 |
| wraith | 64 | 0.0% | 0.6 |
| goblin-gang | 78 | 0.0% | 0.2 |
| sludge-elemental | 58 | 0.0% | 0.5 |
| rat-swarm | 78 | 0.0% | 0.1 |
| root-golem | 86 | 0.0% | 0.6 |
| frost-wisp | 75 | 0.0% | 0.1 |
| spectral-scribe | 56 | 0.0% | 0.1 |
| flying-tomes | 64 | 0.0% | 0.1 |
| bone-warden | 91 | 0.0% | 0.4 |
| skeleton | 64 | 0.0% | 0.4 |
| bat-cloud | 87 | 0.0% | 0.0 |
| magma-toad | 77 | 0.0% | 0.7 |
| castle-thrall | 85 | 0.0% | 0.4 |
| grave-mites | 125 | 0.0% | 0.0 |
| hungry-ghoul | 93 | 0.0% | 0.4 |
| jar-imp | 81 | 0.0% | 0.1 |
| pale-hound | 88 | 0.0% | 0.3 |
