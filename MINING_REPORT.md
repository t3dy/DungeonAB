# Mining Report — 700 tables (2800 games), hard

Overall win rate: **69.0%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.59,"hard":1.87,"nightmare":2.6} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.59 · hard 1.87 · nightmare 2.6.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 866 | 12.9 | 87.6% | +27.0 |
| The Scholarly | personality | 834 | 16.6 | 75.5% | +9.3 |
| The Mouse | character | 929 | 11.5 | 73.3% | +6.4 |
| Dancing Light | spell | 806 | 10.5 | 73.6% | +6.4 |
| Bandolier of Knives | equipment | 889 | 13.0 | 72.6% | +5.2 |
| The Devout | personality | 907 | 17.0 | 72.4% | +5.1 |
| Everburning Lantern | equipment | 918 | 10.8 | 72.3% | +5.0 |
| Vex Threefingers | character | 889 | 11.7 | 72.2% | +4.7 |
| Canoness Ash | character | 922 | 10.2 | 71.9% | +4.3 |
| Silin the Debt | character | 872 | 11.0 | 71.9% | +4.2 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Vandal | personality | 813 | 17.0 | 62.6% | -9.0 |
| The Reckless | personality | 831 | 16.6 | 63.2% | -8.3 |
| Firewatch | tactic | 607 | 15.2 | 63.8% | -6.7 |
| The Bold | personality | 818 | 16.8 | 65.3% | -5.3 |
| Athanor Charm | equipment | 837 | 13.2 | 65.4% | -5.2 |
| Field Surgery | tactic | 613 | 15.5 | 65.3% | -4.8 |
| Ward-Weaving | tactic | 629 | 15.6 | 65.7% | -4.3 |
| Grimoire of Low Whispers | equipment | 906 | 13.4 | 66.2% | -4.1 |
| Concentration | tactic | 631 | 15.1 | 65.9% | -4.0 |
| Kindle | spell | 736 | 13.2 | 66.2% | -3.8 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 71.4% | 4.0 |
| guildmaster | 0.70 | 140 | 67.9% | 4.0 |
| warlord | 0.55 | 140 | 72.1% | 4.0 |
| archmage | 0.50 | 140 | 68.6% | 4.0 |
| novice | 0.15 | 140 | 52.1% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 10 | 40.0% |
| 2 | 59 | 45.8% |
| 3 | 56 | 57.1% |
| 4 | 2675 | 69.9% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 49 | 57.1% | — | — |
| 1 | 121 | 73.6% | — | — |
| 2 | 178 | 70.8% | — | — |
| 3 | 215 | 70.7% | — | — |
| 4 | 306 | 69.3% | 97 | 72.2% |
| 5 | 404 | 73.8% | 204 | 62.3% |
| 6 | 374 | 71.1% | 249 | 57.4% |
| 7 | 273 | 68.5% | 248 | 68.5% |
| 8 | 200 | 64.0% | 207 | 61.8% |
| 9+ | 680 | 65.6% | 1759 | 72.3% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 68.0% | 71.4% | -3.4 |
| cleric | 70.3% | 64.6% | +5.7 |
| wizard | 67.5% | 71.2% | -3.6 |
| rogue | 71.2% | 64.3% | +6.8 |
| alchemist | 69.0% | 69.0% | +0.0 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 834 | 75.5% | +6.5 |
| pious | 907 | 72.4% | +3.4 |
| cunning | 1465 | 71.3% | +2.3 |
| craven | 819 | 69.7% | +0.7 |
| greedy | 823 | 66.8% | -2.2 |
| brave | 818 | 65.3% | -3.7 |
| reckless | 1469 | 63.8% | -5.2 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 198 | 12.6% |
| 1 | 657 | 57.1% |
| 2 | 925 | 73.5% |
| 3 | 662 | 82.2% |
| 4 | 263 | 87.8% |
| 5+ | 95 | 81.1% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 2404 | 99.9% | 0.0 |
| materials:gather | 2009 | 100.0% | 0.0 |
| library:study | 1881 | 100.0% | 0.0 |
| disaster:scatter | 1140 | 50.4% | 0.0 |
| boss:spell-strike | 1122 | 96.3% | 2.7 |
| lab:pass-by | 1110 | 100.0% | 0.0 |
| trap:push-through | 1088 | 100.0% | 4.3 |
| shrine:rest | 1086 | 100.0% | 0.0 |
| monster:flee | 987 | 100.0% | 0.0 |
| treasure:loot | 935 | 82.1% | 0.0 |
| disaster:brace | 934 | 100.0% | 5.4 |
| monster:fight | 925 | 99.4% | 1.9 |
| monster:sneak | 846 | 90.8% | 0.0 |
| library:pass-by | 768 | 100.0% | 0.0 |
| trap:spell-bypass | 750 | 100.0% | 0.0 |
| shrine:desecrate | 679 | 100.0% | 0.0 |
| lab:alchemy | 662 | 100.0% | 0.0 |
| disaster:sift-rubble | 641 | 100.0% | 0.0 |
| shrine:pass-by | 627 | 100.0% | 0.0 |
| materials:pass-by | 602 | 100.0% | 0.0 |
| vault:loot | 567 | 72.5% | 0.0 |
| trap:disarm | 518 | 89.6% | 0.0 |
| treasure:inspect | 492 | 100.0% | 0.0 |
| library:deep-study | 478 | 98.1% | 0.0 |
| boss:flee | 458 | 100.0% | 0.0 |
| trap:search-around | 385 | 99.0% | 0.0 |
| boss:fight | 370 | 29.2% | 46.2 |
| library:strip-the-shelves | 368 | 100.0% | 0.0 |
| lab:crack-crates | 366 | 100.0% | 0.0 |
| library:bless-the-font | 341 | 100.0% | 0.0 |
| trap:smoke-bomb | 339 | 100.0% | 0.0 |
| boss:fight-from-cover | 324 | 54.6% | 35.9 |
| vault:inspect | 306 | 100.0% | 0.0 |
| lab:harvest-spout | 259 | 100.0% | 0.0 |
| boss:shove-into-brazier | 251 | 44.2% | 39.6 |
| trap:sift-rubble | 249 | 100.0% | 0.0 |
| lab:strip-the-shelves | 242 | 100.0% | 0.0 |
| monster:turn-undead | 224 | 92.0% | 0.0 |
| boss:shove-into-pit | 222 | 50.5% | 37.0 |
| monster:fight-from-cover | 207 | 100.0% | 0.3 |
| materials:sift-rubble | 207 | 100.0% | 0.0 |
| materials:crack-crates | 201 | 100.0% | 0.0 |
| treasure:knock-open | 201 | 100.0% | 0.0 |
| monster:shove-into-brazier | 195 | 99.5% | 0.4 |
| shrine:pry-sarcophagus | 179 | 100.0% | 0.7 |
| boss:drop-portcullis | 175 | 53.1% | 35.1 |
| shrine:bless-the-font | 166 | 100.0% | 0.0 |
| monster:shove-into-pit | 161 | 100.0% | 0.4 |
| materials:harvest-spout | 149 | 100.0% | 0.0 |
| vault:knock-open | 148 | 100.0% | 0.0 |
| treasure:crack-crates | 142 | 100.0% | 0.0 |
| monster:sift-rubble | 136 | 100.0% | 0.0 |
| treasure:leave-it | 136 | 100.0% | 0.0 |
| library:fill-waterskins | 134 | 100.0% | 0.0 |
| monster:crack-crates | 129 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 118 | 100.0% | 0.8 |
| monster:strip-the-shelves | 118 | 100.0% | 0.0 |
| lab:work-the-anvil | 110 | 100.0% | 0.0 |
| monster:topple-boulder | 102 | 98.0% | 0.6 |
| vault:leave-it | 98 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 95 | 100.0% | 0.7 |
| monster:bless-the-font | 95 | 100.0% | 0.0 |
| boss:turn-undead | 95 | 83.2% | 0.0 |
| monster:drop-portcullis | 90 | 100.0% | 0.2 |
| monster:pry-sarcophagus | 90 | 100.0% | 0.8 |
| monster:harvest-spout | 88 | 100.0% | 0.0 |
| shrine:fill-waterskins | 64 | 100.0% | 0.0 |
| monster:fill-waterskins | 58 | 100.0% | 0.0 |
| materials:work-the-anvil | 55 | 100.0% | 0.0 |
| corridor:proceed | 53 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 51 | 100.0% | 0.7 |
| monster:bribe | 46 | 100.0% | 0.0 |
| boss:bribe | 45 | 100.0% | 0.0 |
| boss:dark | 42 | 97.6% | 0.2 |
| lab:brew-oil | 42 | 100.0% | 0.0 |
| monster:work-the-anvil | 39 | 100.0% | 0.0 |
| vault:strip-the-shelves | 34 | 100.0% | 0.0 |
| materials:brew-oil | 29 | 100.0% | 0.0 |
| corridor:crack-crates | 6 | 100.0% | 0.0 |
| monster:dark | 4 | 100.0% | 0.0 |
| shrine:dark | 3 | 100.0% | 0.0 |
| vault:dark | 2 | 100.0% | 0.0 |
| corridor:bless-the-font | 2 | 100.0% | 0.0 |
| lab:dark | 2 | 50.0% | 0.0 |
| treasure:dark | 2 | 100.0% | 0.0 |
| materials:dark | 2 | 100.0% | 0.0 |
| corridor:fill-waterskins | 1 | 100.0% | 0.0 |
| disaster:dark | 1 | 100.0% | 0.0 |
| library:dark | 1 | 0.0% | 0.0 |
| corridor:sift-rubble | 1 | 100.0% | 0.0 |
| trap:dark | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| bog-witch | 94 | 27.7% | 18.1 |
| mad-alchemist | 76 | 27.6% | 18.1 |
| the-cauldron | 95 | 27.4% | 17.4 |
| forge-tyrant | 80 | 26.3% | 15.4 |
| cinder-wyrm | 113 | 24.8% | 14.5 |
| shrouded-king | 88 | 22.7% | 13.9 |
| ogre-king | 90 | 21.1% | 15.8 |
| mad-pyromancer | 100 | 21.0% | 13.8 |
| glacier-heart | 105 | 21.0% | 11.8 |
| the-precipitate | 106 | 20.8% | 14.5 |
| vampire-lord | 92 | 18.5% | 13.1 |
| dragon-whelp | 93 | 18.3% | 13.4 |
| grand-errata | 110 | 14.5% | 10.1 |
| abbot-of-worms | 89 | 12.4% | 10.5 |
| archivist | 88 | 11.4% | 8.6 |
| the-bride | 73 | 8.2% | 6.7 |
| spectral-scribe | 74 | 2.7% | 0.7 |
| obsidian-golem | 95 | 2.1% | 2.7 |
| goblin-gang | 74 | 1.4% | 0.7 |
| failed-homunculus | 90 | 1.1% | 0.5 |
| bog-toad | 93 | 1.1% | 1.2 |
| sludge-elemental | 95 | 1.1% | 1.0 |
| bone-warden | 131 | 0.8% | 1.0 |
| wraith | 88 | 0.0% | 0.8 |
| gelatinous | 87 | 0.0% | 0.9 |
| mutant-vine | 93 | 0.0% | 0.5 |
| barrow-shade | 125 | 0.0% | 0.5 |
| hungry-ghoul | 117 | 0.0% | 0.4 |
| potion-rats | 96 | 0.0% | 0.1 |
| skeleton | 83 | 0.0% | 0.7 |
| ink-elemental | 101 | 0.0% | 0.3 |
| ice-crawler | 113 | 0.0% | 0.2 |
| cinder-imp | 112 | 0.0% | 0.4 |
| cinder-bats | 122 | 0.0% | 0.0 |
| root-golem | 111 | 0.0% | 1.2 |
| thawed-dead | 94 | 0.0% | 0.4 |
| frost-wisp | 94 | 0.0% | 0.1 |
| crimson-mist | 111 | 0.0% | 0.4 |
| bat-cloud | 121 | 0.0% | 0.0 |
| pale-hound | 110 | 0.0% | 0.3 |
| magma-toad | 89 | 0.0% | 0.9 |
| flying-tomes | 91 | 0.0% | 0.0 |
| rat-swarm | 99 | 0.0% | 0.0 |
| castle-thrall | 89 | 0.0% | 0.2 |
| grave-mites | 160 | 0.0% | 0.1 |
| jar-imp | 85 | 0.0% | 0.1 |
| pickled-thing | 88 | 0.0% | 0.4 |
| index-wight | 88 | 0.0% | 1.1 |
| salamander | 110 | 0.0% | 1.1 |
