# Mining Report — 700 tables (2800 games), hard

Overall win rate: **71.9%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Everburning Lantern | equipment | 918 | 10.8 | 81.4% | +14.1 |
| Eyes of the Mouse | spell | 805 | 10.7 | 81.0% | +12.8 |
| Dancing Light | spell | 806 | 10.5 | 80.4% | +11.9 |
| The Scholarly | personality | 834 | 16.6 | 78.3% | +9.1 |
| Blessed Mace | equipment | 892 | 12.7 | 76.8% | +7.2 |
| Flanking | tactic | 601 | 15.1 | 77.0% | +6.6 |
| Shatter | spell | 753 | 13.0 | 75.7% | +5.2 |
| Canoness Ash | character | 922 | 10.2 | 75.4% | +5.2 |
| Brother Oswald of the Lantern | character | 914 | 10.8 | 75.1% | +4.7 |
| Bandolier of Knives | equipment | 889 | 13.0 | 74.9% | +4.4 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Firewatch | tactic | 607 | 15.2 | 65.4% | -8.3 |
| Field Surgery | tactic | 613 | 15.5 | 66.6% | -6.8 |
| Ward-Weaving | tactic | 629 | 15.6 | 66.9% | -6.4 |
| Widening | tactic | 630 | 15.3 | 67.3% | -5.9 |
| Feather Step | spell | 730 | 13.1 | 67.5% | -5.9 |
| Mending Word | spell | 762 | 12.3 | 67.8% | -5.6 |
| Masterwork Lockpicks | equipment | 866 | 13.3 | 68.4% | -5.1 |
| Frost Lance | spell | 735 | 12.4 | 68.2% | -5.1 |
| Balm of Hours | spell | 721 | 11.4 | 68.2% | -4.9 |
| The Reckless | personality | 831 | 16.6 | 68.7% | -4.5 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 75.7% | 4.0 |
| guildmaster | 0.70 | 140 | 80.7% | 4.0 |
| warlord | 0.55 | 140 | 68.6% | 4.0 |
| archmage | 0.50 | 140 | 72.9% | 4.0 |
| novice | 0.15 | 140 | 39.3% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 10 | 40.0% |
| 2 | 59 | 33.9% |
| 3 | 56 | 44.6% |
| 4 | 2675 | 73.4% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 49 | 69.4% | — | — |
| 1 | 121 | 66.1% | — | — |
| 2 | 178 | 72.5% | — | — |
| 3 | 215 | 75.8% | — | — |
| 4 | 306 | 74.2% | 97 | 64.9% |
| 5 | 404 | 74.8% | 204 | 67.2% |
| 6 | 374 | 73.0% | 249 | 70.7% |
| 7 | 273 | 69.2% | 248 | 68.1% |
| 8 | 200 | 69.0% | 207 | 59.9% |
| 9+ | 680 | 70.3% | 1759 | 74.9% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 72.4% | 70.7% | +1.7 |
| cleric | 74.0% | 64.8% | +9.2 |
| wizard | 71.6% | 72.3% | -0.7 |
| rogue | 72.8% | 70.0% | +2.8 |
| alchemist | 73.2% | 69.1% | +4.1 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 834 | 78.3% | +6.4 |
| cunning | 1465 | 74.1% | +2.2 |
| pious | 907 | 73.2% | +1.3 |
| craven | 819 | 71.1% | -0.8 |
| greedy | 823 | 69.5% | -2.4 |
| brave | 818 | 69.2% | -2.7 |
| reckless | 1469 | 68.7% | -3.2 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 200 | 20.0% |
| 1 | 648 | 59.7% |
| 2 | 909 | 76.9% |
| 3 | 665 | 82.6% |
| 4 | 274 | 88.0% |
| 5+ | 104 | 93.3% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 2392 | 99.9% | 0.0 |
| materials:gather | 2038 | 100.0% | 0.0 |
| library:study | 1953 | 100.0% | 0.0 |
| lab:pass-by | 1164 | 100.0% | 0.0 |
| disaster:scatter | 1103 | 50.5% | 0.0 |
| trap:push-through | 1090 | 100.0% | 4.8 |
| shrine:rest | 1089 | 100.0% | 0.0 |
| boss:spell-strike | 1078 | 97.2% | 1.9 |
| monster:flee | 1056 | 100.0% | 0.0 |
| treasure:loot | 998 | 83.2% | 0.0 |
| disaster:brace | 973 | 100.0% | 5.4 |
| monster:fight | 948 | 99.7% | 1.3 |
| monster:sneak | 847 | 91.6% | 0.0 |
| library:pass-by | 738 | 100.0% | 0.0 |
| trap:spell-bypass | 726 | 100.0% | 0.0 |
| shrine:desecrate | 695 | 100.0% | 0.0 |
| disaster:sift-rubble | 668 | 100.0% | 0.0 |
| lab:alchemy | 652 | 100.0% | 0.0 |
| shrine:pass-by | 587 | 100.0% | 0.0 |
| materials:pass-by | 578 | 100.0% | 0.0 |
| vault:loot | 542 | 71.0% | 0.0 |
| trap:disarm | 539 | 92.0% | 0.0 |
| boss:flee | 526 | 100.0% | 0.0 |
| treasure:inspect | 464 | 100.0% | 0.0 |
| library:deep-study | 460 | 98.0% | 0.0 |
| library:bless-the-font | 380 | 100.0% | 0.0 |
| boss:fight | 372 | 42.7% | 42.0 |
| trap:search-around | 367 | 99.5% | 0.0 |
| lab:crack-crates | 358 | 100.0% | 0.0 |
| trap:smoke-bomb | 346 | 100.0% | 0.0 |
| library:strip-the-shelves | 345 | 100.0% | 0.0 |
| vault:inspect | 309 | 100.0% | 0.0 |
| boss:fight-from-cover | 278 | 60.8% | 30.5 |
| lab:harvest-spout | 274 | 100.0% | 0.0 |
| boss:shove-into-brazier | 249 | 61.8% | 32.5 |
| lab:strip-the-shelves | 236 | 100.0% | 0.0 |
| boss:shove-into-pit | 236 | 62.3% | 31.4 |
| trap:sift-rubble | 227 | 100.0% | 0.0 |
| materials:sift-rubble | 219 | 100.0% | 0.0 |
| monster:fight-from-cover | 199 | 100.0% | 0.3 |
| monster:turn-undead | 198 | 94.9% | 0.0 |
| treasure:knock-open | 197 | 100.0% | 0.0 |
| materials:crack-crates | 193 | 100.0% | 0.0 |
| monster:shove-into-pit | 181 | 100.0% | 0.2 |
| shrine:bless-the-font | 176 | 100.0% | 0.0 |
| monster:shove-into-brazier | 166 | 99.4% | 0.4 |
| shrine:pry-sarcophagus | 166 | 100.0% | 0.9 |
| materials:harvest-spout | 164 | 100.0% | 0.0 |
| treasure:crack-crates | 156 | 100.0% | 0.0 |
| monster:sift-rubble | 151 | 100.0% | 0.0 |
| library:fill-waterskins | 146 | 100.0% | 0.0 |
| treasure:leave-it | 143 | 100.0% | 0.0 |
| monster:crack-crates | 130 | 100.0% | 0.0 |
| vault:knock-open | 128 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 125 | 100.0% | 0.7 |
| boss:drop-portcullis | 121 | 68.6% | 30.0 |
| monster:topple-boulder | 109 | 100.0% | 0.2 |
| monster:bless-the-font | 107 | 100.0% | 0.0 |
| vault:leave-it | 105 | 100.0% | 0.0 |
| boss:dark | 105 | 98.1% | 0.2 |
| monster:drop-portcullis | 98 | 100.0% | 0.1 |
| monster:harvest-spout | 97 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 97 | 100.0% | 0.8 |
| monster:strip-the-shelves | 96 | 100.0% | 0.0 |
| lab:work-the-anvil | 95 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 94 | 100.0% | 0.7 |
| boss:turn-undead | 82 | 84.1% | 0.0 |
| monster:fill-waterskins | 59 | 100.0% | 0.0 |
| shrine:fill-waterskins | 56 | 100.0% | 0.0 |
| materials:work-the-anvil | 56 | 100.0% | 0.0 |
| boss:bribe | 54 | 100.0% | 0.0 |
| corridor:proceed | 51 | 100.0% | 0.0 |
| monster:bribe | 47 | 100.0% | 0.0 |
| vault:strip-the-shelves | 45 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 42 | 100.0% | 0.8 |
| monster:work-the-anvil | 32 | 100.0% | 0.0 |
| monster:dark | 21 | 100.0% | 0.2 |
| trap:dark | 7 | 85.7% | 0.0 |
| materials:dark | 6 | 100.0% | 1.0 |
| corridor:crack-crates | 6 | 100.0% | 0.0 |
| disaster:dark | 5 | 80.0% | 1.4 |
| library:dark | 4 | 100.0% | 0.0 |
| shrine:dark | 4 | 100.0% | 0.0 |
| vault:dark | 3 | 100.0% | 0.0 |
| lab:dark | 3 | 100.0% | 2.7 |
| corridor:bless-the-font | 2 | 100.0% | 0.0 |
| treasure:dark | 2 | 100.0% | 0.0 |
| corridor:fill-waterskins | 1 | 100.0% | 0.0 |
| corridor:sift-rubble | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| forge-tyrant | 69 | 33.3% | 20.7 |
| cinder-wyrm | 109 | 25.7% | 17.0 |
| ogre-king | 86 | 23.3% | 15.2 |
| glacier-heart | 102 | 20.6% | 11.9 |
| the-precipitate | 107 | 19.6% | 12.5 |
| the-cauldron | 94 | 18.1% | 13.3 |
| vampire-lord | 95 | 17.9% | 13.3 |
| bog-witch | 81 | 17.3% | 11.4 |
| mad-pyromancer | 93 | 17.2% | 11.5 |
| shrouded-king | 88 | 13.6% | 10.5 |
| archivist | 96 | 12.5% | 9.3 |
| dragon-whelp | 88 | 11.4% | 14.4 |
| grand-errata | 96 | 10.4% | 6.9 |
| mad-alchemist | 80 | 10.0% | 11.7 |
| the-bride | 80 | 8.8% | 6.7 |
| abbot-of-worms | 86 | 8.1% | 9.0 |
| wraith | 74 | 1.4% | 0.4 |
| spectral-scribe | 74 | 1.4% | 0.4 |
| thawed-dead | 100 | 1.0% | 0.5 |
| obsidian-golem | 102 | 1.0% | 1.6 |
| bone-warden | 116 | 0.9% | 0.9 |
| mutant-vine | 112 | 0.0% | 0.6 |
| gelatinous | 98 | 0.0% | 0.6 |
| rat-swarm | 99 | 0.0% | 0.0 |
| failed-homunculus | 84 | 0.0% | 0.3 |
| hungry-ghoul | 112 | 0.0% | 0.6 |
| potion-rats | 103 | 0.0% | 0.0 |
| skeleton | 84 | 0.0% | 0.6 |
| ink-elemental | 87 | 0.0% | 0.4 |
| ice-crawler | 116 | 0.0% | 0.2 |
| cinder-imp | 95 | 0.0% | 0.1 |
| cinder-bats | 134 | 0.0% | 0.1 |
| jar-imp | 84 | 0.0% | 0.1 |
| root-golem | 97 | 0.0% | 0.9 |
| frost-wisp | 89 | 0.0% | 0.0 |
| barrow-shade | 136 | 0.0% | 0.3 |
| crimson-mist | 124 | 0.0% | 0.4 |
| bat-cloud | 135 | 0.0% | 0.0 |
| goblin-gang | 74 | 0.0% | 0.1 |
| magma-toad | 96 | 0.0% | 0.6 |
| salamander | 117 | 0.0% | 0.7 |
| pale-hound | 113 | 0.0% | 0.1 |
| flying-tomes | 89 | 0.0% | 0.0 |
| index-wight | 75 | 0.0% | 0.8 |
| castle-thrall | 93 | 0.0% | 0.1 |
| sludge-elemental | 81 | 0.0% | 0.3 |
| grave-mites | 170 | 0.0% | 0.1 |
| pickled-thing | 82 | 0.0% | 0.7 |
| bog-toad | 95 | 0.0% | 0.6 |
