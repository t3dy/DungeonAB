# Mining Report — 700 tables (2800 games), hard

Overall win rate: **71.4%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.48,"hard":1.71,"nightmare":2.41} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.48 · hard 1.71 · nightmare 2.41.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 866 | 12.9 | 84.4% | +18.9 |
| Bandolier of Knives | equipment | 889 | 13.0 | 77.3% | +8.7 |
| The Cunning | personality | 819 | 16.9 | 76.7% | +7.5 |
| The Scholarly | personality | 834 | 16.6 | 75.5% | +6.0 |
| Greatsword of the Vault | equipment | 773 | 12.2 | 75.0% | +5.1 |
| Dancing Light | spell | 806 | 10.5 | 74.9% | +5.0 |
| Everburning Lantern | equipment | 918 | 10.8 | 74.3% | +4.4 |
| The Devout | personality | 907 | 17.0 | 74.0% | +3.9 |
| Shatter | spell | 753 | 13.0 | 74.1% | +3.8 |
| Holy Symbol of Dawn | equipment | 918 | 10.6 | 73.9% | +3.7 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Vandal | personality | 813 | 17.0 | 64.7% | -9.4 |
| The Reckless | personality | 831 | 16.6 | 66.3% | -7.2 |
| Firewatch | tactic | 607 | 15.2 | 66.1% | -6.8 |
| Ward-Weaving | tactic | 629 | 15.6 | 67.6% | -4.9 |
| Athanor Charm | equipment | 837 | 13.2 | 68.0% | -4.8 |
| Mending Word | spell | 762 | 12.3 | 68.0% | -4.6 |
| Encirclement | tactic | 554 | 15.4 | 67.9% | -4.3 |
| Masterwork Lockpicks | equipment | 866 | 13.3 | 68.4% | -4.3 |
| Sylvane of the Nine Candles | character | 837 | 10.6 | 68.5% | -4.1 |
| Quickening | tactic | 604 | 15.2 | 68.2% | -4.0 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 74.3% | 4.0 |
| guildmaster | 0.70 | 140 | 73.6% | 4.0 |
| warlord | 0.55 | 140 | 78.6% | 4.0 |
| archmage | 0.50 | 140 | 74.3% | 4.0 |
| novice | 0.15 | 140 | 55.7% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 10 | 60.0% |
| 2 | 59 | 49.2% |
| 3 | 56 | 55.4% |
| 4 | 2675 | 72.2% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 49 | 49.0% | — | — |
| 1 | 121 | 66.9% | — | — |
| 2 | 178 | 74.7% | — | — |
| 3 | 215 | 81.4% | — | — |
| 4 | 306 | 75.2% | 97 | 70.1% |
| 5 | 404 | 74.5% | 204 | 69.1% |
| 6 | 374 | 69.8% | 249 | 61.4% |
| 7 | 273 | 66.7% | 248 | 69.4% |
| 8 | 200 | 74.5% | 207 | 63.8% |
| 9+ | 680 | 67.9% | 1759 | 74.3% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 71.4% | 71.2% | +0.3 |
| cleric | 72.4% | 67.6% | +4.8 |
| wizard | 70.3% | 72.9% | -2.6 |
| rogue | 72.7% | 68.4% | +4.4 |
| alchemist | 71.8% | 70.4% | +1.3 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 834 | 75.5% | +4.2 |
| cunning | 1465 | 74.7% | +3.3 |
| pious | 907 | 74.0% | +2.6 |
| craven | 819 | 72.0% | +0.7 |
| greedy | 823 | 69.5% | -1.9 |
| brave | 818 | 68.7% | -2.7 |
| reckless | 1469 | 66.5% | -4.8 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 176 | 21.6% |
| 1 | 641 | 58.5% |
| 2 | 950 | 72.9% |
| 3 | 650 | 84.5% |
| 4 | 267 | 88.8% |
| 5+ | 116 | 91.4% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 2436 | 100.0% | 0.0 |
| materials:gather | 2013 | 100.0% | 0.0 |
| library:study | 1926 | 100.0% | 0.0 |
| lab:pass-by | 1168 | 100.0% | 0.0 |
| boss:spell-strike | 1149 | 97.9% | 2.5 |
| trap:push-through | 1131 | 100.0% | 4.4 |
| disaster:scatter | 1129 | 49.5% | 0.0 |
| shrine:rest | 1101 | 100.0% | 0.0 |
| treasure:loot | 995 | 85.4% | 0.0 |
| monster:flee | 992 | 100.0% | 0.0 |
| disaster:brace | 966 | 100.0% | 5.4 |
| monster:fight | 942 | 99.7% | 1.8 |
| monster:sneak | 842 | 89.0% | 0.0 |
| library:pass-by | 749 | 100.0% | 0.0 |
| trap:spell-bypass | 739 | 100.0% | 0.0 |
| shrine:desecrate | 693 | 100.0% | 0.0 |
| lab:alchemy | 652 | 100.0% | 0.0 |
| disaster:sift-rubble | 644 | 100.0% | 0.0 |
| materials:pass-by | 595 | 100.0% | 0.0 |
| vault:loot | 579 | 72.7% | 0.0 |
| shrine:pass-by | 561 | 100.0% | 0.0 |
| trap:disarm | 516 | 91.5% | 0.0 |
| boss:flee | 477 | 100.0% | 0.0 |
| treasure:inspect | 470 | 100.0% | 0.0 |
| library:deep-study | 464 | 98.5% | 0.0 |
| library:bless-the-font | 397 | 100.0% | 0.0 |
| boss:fight | 388 | 33.5% | 44.4 |
| trap:search-around | 378 | 99.2% | 0.0 |
| library:strip-the-shelves | 341 | 100.0% | 0.0 |
| trap:smoke-bomb | 340 | 100.0% | 0.0 |
| lab:crack-crates | 326 | 100.0% | 0.0 |
| boss:fight-from-cover | 308 | 57.1% | 35.6 |
| vault:inspect | 295 | 100.0% | 0.0 |
| lab:strip-the-shelves | 257 | 100.0% | 0.0 |
| lab:harvest-spout | 249 | 100.0% | 0.0 |
| boss:shove-into-brazier | 245 | 46.9% | 39.2 |
| trap:sift-rubble | 245 | 100.0% | 0.0 |
| treasure:knock-open | 225 | 100.0% | 0.0 |
| monster:turn-undead | 222 | 91.4% | 0.0 |
| materials:sift-rubble | 220 | 100.0% | 0.0 |
| materials:crack-crates | 208 | 100.0% | 0.0 |
| boss:shove-into-pit | 199 | 49.7% | 36.7 |
| monster:fight-from-cover | 199 | 100.0% | 0.5 |
| shrine:bless-the-font | 185 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 182 | 100.0% | 0.5 |
| monster:shove-into-brazier | 181 | 100.0% | 0.4 |
| boss:drop-portcullis | 178 | 59.0% | 34.7 |
| monster:shove-into-pit | 157 | 100.0% | 0.5 |
| monster:sift-rubble | 152 | 100.0% | 0.0 |
| treasure:leave-it | 152 | 100.0% | 0.0 |
| library:fill-waterskins | 147 | 100.0% | 0.0 |
| materials:harvest-spout | 144 | 100.0% | 0.0 |
| vault:knock-open | 131 | 100.0% | 0.0 |
| treasure:crack-crates | 123 | 100.0% | 0.0 |
| monster:crack-crates | 120 | 100.0% | 0.0 |
| monster:topple-boulder | 118 | 100.0% | 0.8 |
| monster:bless-the-font | 115 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 113 | 100.0% | 0.8 |
| monster:strip-the-shelves | 111 | 100.0% | 0.0 |
| monster:drop-portcullis | 110 | 100.0% | 0.5 |
| lab:work-the-anvil | 107 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 105 | 100.0% | 0.7 |
| vault:leave-it | 99 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 93 | 100.0% | 0.6 |
| monster:harvest-spout | 88 | 100.0% | 0.0 |
| boss:turn-undead | 83 | 88.0% | 0.0 |
| monster:fill-waterskins | 72 | 100.0% | 0.0 |
| shrine:fill-waterskins | 65 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 61 | 100.0% | 0.9 |
| monster:bribe | 57 | 100.0% | 0.0 |
| boss:bribe | 57 | 100.0% | 0.0 |
| corridor:proceed | 52 | 100.0% | 0.0 |
| materials:work-the-anvil | 48 | 100.0% | 0.0 |
| vault:strip-the-shelves | 47 | 100.0% | 0.0 |
| monster:work-the-anvil | 42 | 100.0% | 0.0 |
| boss:dark | 39 | 97.4% | 0.5 |
| lab:brew-oil | 35 | 100.0% | 0.0 |
| materials:brew-oil | 27 | 100.0% | 0.0 |
| monster:dark | 8 | 87.5% | 0.3 |
| shrine:dark | 5 | 100.0% | 2.0 |
| corridor:crack-crates | 5 | 100.0% | 0.0 |
| corridor:bless-the-font | 3 | 100.0% | 0.0 |
| vault:dark | 2 | 50.0% | 0.0 |
| trap:dark | 2 | 100.0% | 0.0 |
| treasure:dark | 2 | 50.0% | 0.0 |
| materials:dark | 2 | 100.0% | 1.0 |
| lab:dark | 2 | 100.0% | 0.0 |
| library:dark | 1 | 100.0% | 0.0 |
| corridor:sift-rubble | 1 | 100.0% | 0.0 |
| disaster:dark | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| ogre-king | 90 | 25.6% | 17.7 |
| the-cauldron | 99 | 25.3% | 16.8 |
| glacier-heart | 117 | 24.8% | 14.0 |
| the-precipitate | 104 | 22.1% | 16.9 |
| cinder-wyrm | 106 | 21.7% | 14.7 |
| bog-witch | 83 | 21.7% | 17.2 |
| forge-tyrant | 77 | 20.8% | 12.7 |
| mad-alchemist | 77 | 20.8% | 15.1 |
| grand-errata | 107 | 19.6% | 12.3 |
| vampire-lord | 85 | 17.6% | 14.2 |
| mad-pyromancer | 109 | 17.4% | 11.4 |
| dragon-whelp | 106 | 16.0% | 14.1 |
| shrouded-king | 90 | 12.2% | 7.4 |
| the-bride | 92 | 12.0% | 8.5 |
| archivist | 93 | 8.6% | 8.3 |
| abbot-of-worms | 102 | 6.9% | 8.3 |
| index-wight | 75 | 1.3% | 1.4 |
| obsidian-golem | 101 | 1.0% | 2.6 |
| hungry-ghoul | 124 | 0.8% | 0.8 |
| potion-rats | 98 | 0.0% | 0.1 |
| gelatinous | 94 | 0.0% | 0.8 |
| rat-swarm | 111 | 0.0% | 0.1 |
| mutant-vine | 101 | 0.0% | 0.6 |
| failed-homunculus | 88 | 0.0% | 0.7 |
| barrow-shade | 142 | 0.0% | 0.3 |
| bone-warden | 116 | 0.0% | 0.7 |
| skeleton | 74 | 0.0% | 0.4 |
| ice-crawler | 111 | 0.0% | 0.4 |
| cinder-bats | 119 | 0.0% | 0.1 |
| jar-imp | 82 | 0.0% | 0.0 |
| root-golem | 106 | 0.0% | 0.8 |
| grave-mites | 162 | 0.0% | 0.1 |
| crimson-mist | 123 | 0.0% | 0.8 |
| bat-cloud | 141 | 0.0% | 0.0 |
| goblin-gang | 72 | 0.0% | 0.5 |
| wraith | 81 | 0.0% | 0.8 |
| pale-hound | 119 | 0.0% | 0.6 |
| cinder-imp | 100 | 0.0% | 0.4 |
| magma-toad | 99 | 0.0% | 0.7 |
| thawed-dead | 102 | 0.0% | 0.8 |
| flying-tomes | 101 | 0.0% | 0.0 |
| salamander | 110 | 0.0% | 1.1 |
| castle-thrall | 98 | 0.0% | 0.3 |
| sludge-elemental | 80 | 0.0% | 0.8 |
| spectral-scribe | 79 | 0.0% | 0.4 |
| pickled-thing | 91 | 0.0% | 0.5 |
| frost-wisp | 94 | 0.0% | 0.1 |
| bog-toad | 88 | 0.0% | 0.6 |
| ink-elemental | 96 | 0.0% | 0.5 |
