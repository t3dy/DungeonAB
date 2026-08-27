# Mining Report — 700 tables (2800 games), hard

Overall win rate: **71.8%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.45,"hard":1.68,"nightmare":2.12} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.45 · hard 1.68 · nightmare 2.12.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Everburning Lantern | equipment | 918 | 10.8 | 78.1% | +9.5 |
| The Scholarly | personality | 834 | 16.6 | 78.2% | +9.2 |
| Dancing Light | spell | 806 | 10.5 | 77.4% | +8.0 |
| The Cunning | personality | 819 | 16.9 | 76.8% | +7.1 |
| The Tinkerer | personality | 836 | 16.4 | 76.3% | +6.5 |
| Winch Hook | equipment | 839 | 13.3 | 76.3% | +6.5 |
| Bandolier of Knives | equipment | 889 | 13.0 | 76.2% | +6.5 |
| Quicksilver Daggers | equipment | 866 | 12.9 | 75.9% | +6.0 |
| Flanking | tactic | 601 | 15.1 | 76.4% | +5.9 |
| Shield Wall | tactic | 624 | 14.9 | 76.0% | +5.4 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Reckless | personality | 831 | 16.6 | 63.7% | -11.5 |
| Firewatch | tactic | 607 | 15.2 | 63.6% | -10.4 |
| Feather Step | spell | 730 | 13.1 | 65.3% | -8.7 |
| The Vandal | personality | 813 | 17.0 | 66.9% | -6.8 |
| The Covetous | personality | 823 | 16.5 | 67.4% | -6.1 |
| Ward-Weaving | tactic | 629 | 15.6 | 67.4% | -5.6 |
| Old Yarrow | character | 807 | 11.1 | 68.0% | -5.2 |
| Grimoire of Low Whispers | equipment | 906 | 13.4 | 68.4% | -4.9 |
| Melchior the Moth-Eaten | character | 828 | 11.0 | 68.6% | -4.5 |
| Balm of Hours | spell | 721 | 11.4 | 68.8% | -4.0 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 79.3% | 4.0 |
| guildmaster | 0.70 | 140 | 75.0% | 4.0 |
| warlord | 0.55 | 140 | 72.9% | 4.0 |
| archmage | 0.50 | 140 | 69.3% | 4.0 |
| novice | 0.15 | 140 | 46.4% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 10 | 30.0% |
| 2 | 59 | 42.4% |
| 3 | 56 | 51.8% |
| 4 | 2675 | 73.0% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 49 | 61.2% | — | — |
| 1 | 121 | 64.5% | — | — |
| 2 | 178 | 78.1% | — | — |
| 3 | 215 | 78.6% | — | — |
| 4 | 306 | 75.5% | 97 | 68.0% |
| 5 | 404 | 75.5% | 204 | 67.2% |
| 6 | 374 | 76.7% | 249 | 64.7% |
| 7 | 273 | 65.2% | 248 | 66.1% |
| 8 | 200 | 68.0% | 207 | 60.9% |
| 9+ | 680 | 67.1% | 1759 | 75.7% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 71.6% | 72.1% | -0.5 |
| cleric | 72.8% | 68.1% | +4.7 |
| wizard | 69.8% | 74.6% | -4.8 |
| rogue | 73.5% | 68.0% | +5.4 |
| alchemist | 72.6% | 69.9% | +2.7 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 834 | 78.2% | +6.4 |
| cunning | 1465 | 75.7% | +3.9 |
| craven | 819 | 73.3% | +1.5 |
| pious | 907 | 72.8% | +1.0 |
| brave | 818 | 69.4% | -2.3 |
| greedy | 823 | 67.4% | -4.3 |
| reckless | 1469 | 66.4% | -5.4 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 176 | 21.0% |
| 1 | 640 | 58.8% |
| 2 | 953 | 72.9% |
| 3 | 649 | 85.5% |
| 4 | 271 | 90.0% |
| 5+ | 111 | 91.9% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 2398 | 100.0% | 0.0 |
| materials:gather | 2007 | 100.0% | 0.0 |
| library:study | 1964 | 100.0% | 0.0 |
| lab:pass-by | 1149 | 100.0% | 0.0 |
| disaster:scatter | 1147 | 48.7% | 0.0 |
| boss:spell-strike | 1110 | 98.2% | 2.3 |
| shrine:rest | 1105 | 100.0% | 0.0 |
| trap:push-through | 1098 | 100.0% | 4.8 |
| monster:flee | 1086 | 100.0% | 0.0 |
| disaster:brace | 981 | 100.0% | 5.4 |
| treasure:loot | 976 | 80.8% | 0.0 |
| monster:fight | 963 | 99.7% | 1.5 |
| monster:sneak | 799 | 89.6% | 0.0 |
| library:pass-by | 717 | 100.0% | 0.0 |
| trap:spell-bypass | 705 | 100.0% | 0.0 |
| shrine:desecrate | 685 | 100.0% | 0.0 |
| lab:alchemy | 630 | 100.0% | 0.0 |
| disaster:sift-rubble | 604 | 100.0% | 0.0 |
| materials:pass-by | 586 | 100.0% | 0.0 |
| trap:disarm | 575 | 89.6% | 0.0 |
| vault:loot | 572 | 70.8% | 0.0 |
| shrine:pass-by | 560 | 100.0% | 0.0 |
| library:deep-study | 476 | 98.3% | 0.0 |
| treasure:inspect | 471 | 100.0% | 0.0 |
| boss:flee | 445 | 100.0% | 0.0 |
| boss:fight | 391 | 34.0% | 45.8 |
| trap:search-around | 372 | 99.7% | 0.0 |
| library:bless-the-font | 365 | 100.0% | 0.0 |
| trap:smoke-bomb | 363 | 100.0% | 0.0 |
| lab:crack-crates | 356 | 100.0% | 0.0 |
| library:strip-the-shelves | 332 | 100.0% | 0.0 |
| vault:inspect | 298 | 100.0% | 0.0 |
| boss:fight-from-cover | 287 | 58.9% | 36.0 |
| lab:harvest-spout | 256 | 100.0% | 0.0 |
| lab:strip-the-shelves | 243 | 100.0% | 0.0 |
| boss:shove-into-pit | 242 | 53.7% | 39.5 |
| boss:shove-into-brazier | 235 | 51.1% | 39.8 |
| monster:turn-undead | 217 | 93.5% | 0.0 |
| treasure:knock-open | 216 | 100.0% | 0.0 |
| trap:sift-rubble | 206 | 100.0% | 0.0 |
| materials:sift-rubble | 205 | 100.0% | 0.0 |
| monster:fight-from-cover | 199 | 100.0% | 0.4 |
| shrine:bless-the-font | 197 | 100.0% | 0.0 |
| materials:crack-crates | 195 | 100.0% | 0.0 |
| monster:shove-into-pit | 182 | 100.0% | 0.3 |
| shrine:pry-sarcophagus | 171 | 100.0% | 0.6 |
| boss:drop-portcullis | 167 | 61.7% | 34.7 |
| monster:shove-into-brazier | 166 | 100.0% | 0.2 |
| library:fill-waterskins | 163 | 100.0% | 0.0 |
| treasure:leave-it | 150 | 100.0% | 0.0 |
| materials:harvest-spout | 150 | 100.0% | 0.0 |
| monster:sift-rubble | 139 | 100.0% | 0.0 |
| vault:knock-open | 135 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 135 | 100.0% | 0.8 |
| monster:crack-crates | 132 | 100.0% | 0.0 |
| treasure:crack-crates | 125 | 100.0% | 0.0 |
| monster:topple-boulder | 123 | 100.0% | 0.3 |
| monster:strip-the-shelves | 115 | 100.0% | 0.0 |
| monster:bless-the-font | 110 | 100.0% | 0.0 |
| monster:drop-portcullis | 108 | 100.0% | 0.2 |
| monster:harvest-spout | 96 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 95 | 100.0% | 0.6 |
| lab:work-the-anvil | 95 | 100.0% | 0.0 |
| boss:turn-undead | 87 | 86.2% | 0.0 |
| monster:pry-sarcophagus | 85 | 100.0% | 0.7 |
| vault:leave-it | 84 | 100.0% | 0.0 |
| shrine:fill-waterskins | 67 | 100.0% | 0.0 |
| materials:work-the-anvil | 59 | 100.0% | 0.0 |
| monster:fill-waterskins | 56 | 100.0% | 0.0 |
| monster:bribe | 55 | 100.0% | 0.0 |
| corridor:proceed | 52 | 100.0% | 0.0 |
| boss:bribe | 48 | 100.0% | 0.0 |
| lab:brew-oil | 47 | 100.0% | 0.0 |
| vault:strip-the-shelves | 46 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 40 | 100.0% | 1.2 |
| boss:dark | 40 | 97.5% | 0.0 |
| monster:work-the-anvil | 37 | 100.0% | 0.0 |
| materials:brew-oil | 25 | 100.0% | 0.0 |
| monster:dark | 15 | 93.3% | 0.0 |
| corridor:crack-crates | 6 | 100.0% | 0.0 |
| trap:dark | 4 | 100.0% | 0.0 |
| vault:dark | 3 | 100.0% | 0.0 |
| corridor:bless-the-font | 3 | 100.0% | 0.0 |
| materials:dark | 3 | 100.0% | 0.0 |
| library:dark | 3 | 100.0% | 0.0 |
| treasure:dark | 3 | 100.0% | 0.0 |
| lab:dark | 3 | 100.0% | 1.7 |
| shrine:dark | 2 | 100.0% | 1.5 |
| disaster:dark | 1 | 0.0% | 0.0 |
| corridor:sift-rubble | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| the-precipitate | 94 | 31.9% | 22.4 |
| bog-witch | 81 | 27.2% | 17.7 |
| forge-tyrant | 71 | 25.4% | 14.5 |
| cinder-wyrm | 104 | 25.0% | 16.9 |
| mad-pyromancer | 115 | 23.5% | 12.6 |
| dragon-whelp | 104 | 20.2% | 15.5 |
| the-cauldron | 96 | 19.8% | 17.7 |
| ogre-king | 81 | 18.5% | 13.4 |
| glacier-heart | 106 | 17.9% | 11.0 |
| grand-errata | 102 | 14.7% | 11.0 |
| mad-alchemist | 89 | 14.6% | 15.1 |
| archivist | 100 | 13.0% | 9.9 |
| shrouded-king | 85 | 12.9% | 10.2 |
| the-bride | 87 | 12.6% | 9.7 |
| vampire-lord | 90 | 10.0% | 10.9 |
| abbot-of-worms | 96 | 9.4% | 9.8 |
| index-wight | 70 | 1.4% | 0.6 |
| bog-toad | 88 | 1.1% | 1.0 |
| thawed-dead | 96 | 1.0% | 0.5 |
| hungry-ghoul | 103 | 1.0% | 0.9 |
| potion-rats | 106 | 0.0% | 0.0 |
| mutant-vine | 108 | 0.0% | 0.3 |
| wraith | 92 | 0.0% | 0.5 |
| rat-swarm | 92 | 0.0% | 0.1 |
| failed-homunculus | 84 | 0.0% | 0.1 |
| barrow-shade | 148 | 0.0% | 0.4 |
| skeleton | 88 | 0.0% | 0.6 |
| ink-elemental | 83 | 0.0% | 0.3 |
| spectral-scribe | 83 | 0.0% | 0.4 |
| ice-crawler | 110 | 0.0% | 0.1 |
| cinder-imp | 96 | 0.0% | 0.2 |
| cinder-bats | 120 | 0.0% | 0.0 |
| root-golem | 116 | 0.0% | 1.4 |
| grave-mites | 179 | 0.0% | 0.0 |
| bat-cloud | 145 | 0.0% | 0.0 |
| bone-warden | 135 | 0.0% | 0.3 |
| gelatinous | 102 | 0.0% | 0.6 |
| goblin-gang | 74 | 0.0% | 0.2 |
| flying-tomes | 100 | 0.0% | 0.0 |
| salamander | 105 | 0.0% | 1.1 |
| jar-imp | 83 | 0.0% | 0.1 |
| magma-toad | 86 | 0.0% | 0.9 |
| obsidian-golem | 99 | 0.0% | 2.1 |
| crimson-mist | 121 | 0.0% | 0.3 |
| pale-hound | 110 | 0.0% | 0.5 |
| pickled-thing | 95 | 0.0% | 0.8 |
| castle-thrall | 83 | 0.0% | 0.3 |
| sludge-elemental | 80 | 0.0% | 0.6 |
| frost-wisp | 81 | 0.0% | 0.0 |
