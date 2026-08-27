# Mining Report — 700 tables (2800 games), hard

Overall win rate: **69.4%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.19,"hard":1.45,"nightmare":1.97} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.19 · hard 1.45 · nightmare 1.97.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 862 | 13.0 | 86.2% | +24.2 |
| Bandolier of Knives | equipment | 902 | 12.9 | 75.6% | +9.1 |
| The Cunning | personality | 829 | 16.7 | 73.9% | +6.4 |
| Everburning Lantern | equipment | 939 | 10.7 | 73.6% | +6.3 |
| Silin the Debt | character | 907 | 11.2 | 73.5% | +6.1 |
| Blessed Mace | equipment | 916 | 13.1 | 73.4% | +5.8 |
| The Mouse | character | 894 | 11.3 | 73.3% | +5.6 |
| Feather Step | spell | 720 | 12.9 | 73.6% | +5.6 |
| Eyes of the Mouse | spell | 777 | 10.9 | 73.4% | +5.4 |
| The Tinkerer | personality | 844 | 16.7 | 73.1% | +5.3 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Vandal | personality | 792 | 17.2 | 63.0% | -9.0 |
| Frost Lance | spell | 789 | 12.7 | 63.1% | -8.8 |
| Balm of Hours | spell | 752 | 11.8 | 64.2% | -7.1 |
| Firewatch | tactic | 566 | 15.2 | 64.1% | -6.6 |
| The Reckless | personality | 835 | 16.4 | 64.9% | -6.4 |
| Ward-Weaving | tactic | 550 | 15.2 | 64.5% | -6.1 |
| Cause Fear | spell | 759 | 13.4 | 65.3% | -5.6 |
| Knock | spell | 744 | 13.0 | 66.0% | -4.7 |
| Widening | tactic | 576 | 15.0 | 66.0% | -4.4 |
| Chain Lightning | spell | 726 | 12.7 | 66.3% | -4.3 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 67.1% | 4.0 |
| guildmaster | 0.70 | 140 | 68.6% | 4.0 |
| warlord | 0.55 | 140 | 67.1% | 4.0 |
| archmage | 0.50 | 140 | 70.7% | 4.0 |
| novice | 0.15 | 140 | 48.6% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 16 | 18.8% |
| 2 | 49 | 53.1% |
| 3 | 57 | 54.4% |
| 4 | 2678 | 70.4% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 31 | 61.3% | — | — |
| 1 | 119 | 66.4% | — | — |
| 2 | 186 | 71.0% | — | — |
| 3 | 225 | 77.3% | 32 | 50.0% |
| 4 | 333 | 71.8% | 93 | 63.4% |
| 5 | 386 | 72.8% | 196 | 64.3% |
| 6 | 380 | 69.2% | 274 | 65.7% |
| 7 | 247 | 71.3% | 226 | 62.8% |
| 8 | 229 | 65.9% | 207 | 68.6% |
| 9+ | 664 | 64.8% | 1766 | 72.2% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 69.2% | 70.0% | -0.9 |
| cleric | 70.7% | 65.1% | +5.6 |
| wizard | 69.1% | 69.9% | -0.8 |
| rogue | 71.0% | 66.1% | +4.8 |
| alchemist | 69.3% | 69.7% | -0.5 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| cunning | 1470 | 72.8% | +3.4 |
| craven | 832 | 72.5% | +3.0 |
| scholarly | 837 | 72.3% | +2.9 |
| pious | 872 | 70.1% | +0.6 |
| brave | 814 | 67.4% | -2.0 |
| greedy | 839 | 66.7% | -2.7 |
| reckless | 1443 | 65.0% | -4.4 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 273 | 21.2% |
| 1 | 884 | 62.6% |
| 2 | 932 | 78.3% |
| 3 | 444 | 85.1% |
| 4 | 194 | 81.4% |
| 5+ | 73 | 91.8% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 1969 | 100.0% | 0.0 |
| library:study | 1817 | 100.0% | 0.0 |
| materials:gather | 1785 | 100.0% | 0.0 |
| stairs:descend | 1688 | 100.0% | 0.0 |
| lab:pass-by | 1149 | 100.0% | 0.0 |
| shrine:rest | 1104 | 100.0% | 0.0 |
| boss:spell-strike | 1093 | 98.3% | 2.5 |
| trap:push-through | 1045 | 100.0% | 4.4 |
| monster:fight | 768 | 99.5% | 1.2 |
| shrine:desecrate | 756 | 100.0% | 0.0 |
| disaster:scatter | 736 | 46.1% | 0.0 |
| trap:spell-bypass | 724 | 100.0% | 0.0 |
| library:pass-by | 720 | 100.0% | 0.0 |
| monster:flee | 668 | 100.0% | 2.4 |
| monster:sneak | 653 | 89.7% | 0.0 |
| disaster:brace | 617 | 100.0% | 5.4 |
| shrine:pass-by | 612 | 100.0% | 0.0 |
| treasure:loot | 590 | 84.6% | 0.0 |
| lab:alchemy | 588 | 100.0% | 0.0 |
| vault:loot | 562 | 74.0% | 0.0 |
| trap:disarm | 529 | 90.5% | 0.0 |
| materials:pass-by | 491 | 100.0% | 0.0 |
| library:deep-study | 429 | 98.8% | 0.0 |
| stairs:rope-down | 428 | 100.0% | 0.0 |
| boss:flee | 388 | 100.0% | 2.4 |
| disaster:sift-rubble | 369 | 100.0% | 0.0 |
| library:bless-the-font | 366 | 100.0% | 0.0 |
| lab:crack-crates | 363 | 100.0% | 0.0 |
| boss:fight | 358 | 33.0% | 44.8 |
| trap:search-around | 358 | 99.2% | 0.0 |
| library:strip-the-shelves | 308 | 100.0% | 0.0 |
| lab:harvest-spout | 304 | 100.0% | 0.0 |
| vault:inspect | 291 | 100.0% | 0.0 |
| trap:smoke-bomb | 283 | 100.0% | 0.0 |
| treasure:inspect | 281 | 100.0% | 0.0 |
| boss:fight-from-cover | 268 | 56.0% | 37.3 |
| corridor:proceed | 266 | 100.0% | 0.0 |
| boss:shove-into-brazier | 242 | 44.6% | 41.0 |
| trap:sift-rubble | 238 | 100.0% | 0.0 |
| lab:strip-the-shelves | 235 | 100.0% | 0.0 |
| boss:shove-into-pit | 219 | 50.7% | 39.8 |
| materials:sift-rubble | 213 | 100.0% | 0.0 |
| shrine:bless-the-font | 195 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 188 | 100.0% | 0.9 |
| monster:turn-undead | 188 | 92.0% | 0.0 |
| monster:fight-from-cover | 180 | 100.0% | 0.4 |
| materials:crack-crates | 164 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 161 | 100.0% | 0.6 |
| boss:drop-portcullis | 160 | 53.8% | 36.3 |
| monster:shove-into-brazier | 147 | 99.3% | 0.5 |
| materials:harvest-spout | 139 | 100.0% | 0.0 |
| library:fill-waterskins | 125 | 100.0% | 0.0 |
| monster:sift-rubble | 124 | 100.0% | 0.0 |
| monster:shove-into-pit | 123 | 100.0% | 0.5 |
| treasure:knock-open | 120 | 100.0% | 0.0 |
| vault:knock-open | 117 | 100.0% | 0.0 |
| lab:work-the-anvil | 98 | 100.0% | 0.0 |
| treasure:crack-crates | 97 | 100.0% | 0.0 |
| vault:leave-it | 94 | 100.0% | 0.0 |
| stairs:camp-stair | 87 | 100.0% | 2.9 |
| monster:drop-portcullis | 86 | 100.0% | 0.2 |
| monster:crack-crates | 84 | 100.0% | 0.0 |
| monster:topple-boulder | 82 | 100.0% | 0.2 |
| monster:strip-the-shelves | 81 | 100.0% | 0.0 |
| boss:turn-undead | 80 | 95.0% | 0.0 |
| monster:harvest-spout | 78 | 100.0% | 0.0 |
| shrine:fill-waterskins | 77 | 100.0% | 0.0 |
| treasure:leave-it | 76 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 73 | 100.0% | 0.9 |
| monster:bless-the-font | 69 | 100.0% | 0.0 |
| materials:work-the-anvil | 63 | 100.0% | 0.0 |
| boss:dark | 59 | 96.6% | 0.7 |
| boss:bribe | 58 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 50 | 100.0% | 1.0 |
| vault:strip-the-shelves | 41 | 100.0% | 0.0 |
| monster:work-the-anvil | 38 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 37 | 100.0% | 0.6 |
| lab:brew-oil | 34 | 100.0% | 0.0 |
| materials:brew-oil | 30 | 100.0% | 0.0 |
| monster:bribe | 28 | 100.0% | 0.0 |
| monster:fill-waterskins | 27 | 100.0% | 0.0 |
| corridor:crack-crates | 24 | 100.0% | 0.0 |
| monster:cause-fear | 24 | 100.0% | 0.0 |
| monster:dark | 24 | 91.7% | 0.7 |
| corridor:sift-rubble | 17 | 100.0% | 0.0 |
| corridor:harvest-spout | 11 | 100.0% | 0.0 |
| corridor:bless-the-font | 9 | 100.0% | 0.0 |
| library:dark | 8 | 100.0% | 0.9 |
| materials:dark | 6 | 83.3% | 0.3 |
| trap:dark | 6 | 100.0% | 0.0 |
| shrine:dark | 6 | 66.7% | 0.0 |
| disaster:dark | 6 | 100.0% | 0.0 |
| corridor:work-the-anvil | 4 | 100.0% | 0.0 |
| corridor:fill-waterskins | 4 | 100.0% | 0.0 |
| lab:dark | 4 | 100.0% | 0.0 |
| vault:dark | 3 | 100.0% | 0.0 |
| corridor:dark | 3 | 100.0% | 0.0 |
| treasure:dark | 2 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| mad-alchemist | 86 | 25.6% | 19.8 |
| mad-pyromancer | 95 | 25.3% | 15.0 |
| bog-witch | 73 | 21.9% | 17.1 |
| the-cauldron | 96 | 21.9% | 15.4 |
| grand-errata | 99 | 20.2% | 12.3 |
| forge-tyrant | 93 | 19.4% | 12.6 |
| the-precipitate | 92 | 18.5% | 12.0 |
| dragon-whelp | 92 | 18.5% | 10.7 |
| ogre-king | 83 | 18.1% | 14.6 |
| cinder-wyrm | 82 | 17.1% | 11.5 |
| vampire-lord | 103 | 15.5% | 12.4 |
| archivist | 98 | 15.3% | 13.4 |
| abbot-of-worms | 83 | 14.5% | 11.3 |
| the-bride | 84 | 14.3% | 10.1 |
| shrouded-king | 93 | 10.8% | 7.6 |
| glacier-heart | 99 | 10.1% | 11.6 |
| skeleton | 69 | 1.4% | 0.4 |
| failed-homunculus | 76 | 1.3% | 0.4 |
| obsidian-golem | 82 | 1.2% | 1.6 |
| gelatinous | 86 | 1.2% | 0.6 |
| mutant-vine | 87 | 0.0% | 0.6 |
| barrow-shade | 102 | 0.0% | 0.3 |
| potion-rats | 93 | 0.0% | 0.1 |
| ink-elemental | 93 | 0.0% | 0.4 |
| spectral-scribe | 65 | 0.0% | 0.2 |
| ice-crawler | 99 | 0.0% | 0.3 |
| frost-wisp | 81 | 0.0% | 0.1 |
| cinder-bats | 96 | 0.0% | 0.0 |
| root-golem | 82 | 0.0% | 0.9 |
| bat-cloud | 96 | 0.0% | 0.0 |
| goblin-gang | 61 | 0.0% | 0.3 |
| wraith | 66 | 0.0% | 0.5 |
| sludge-elemental | 53 | 0.0% | 0.4 |
| crimson-mist | 91 | 0.0% | 0.5 |
| thawed-dead | 74 | 0.0% | 0.6 |
| flying-tomes | 91 | 0.0% | 0.0 |
| salamander | 102 | 0.0% | 0.5 |
| magma-toad | 75 | 0.0% | 0.2 |
| bone-warden | 86 | 0.0% | 0.4 |
| grave-mites | 122 | 0.0% | 0.0 |
| rat-swarm | 75 | 0.0% | 0.1 |
| cinder-imp | 90 | 0.0% | 0.2 |
| index-wight | 71 | 0.0% | 0.9 |
| hungry-ghoul | 95 | 0.0% | 0.3 |
| castle-thrall | 80 | 0.0% | 0.3 |
| jar-imp | 75 | 0.0% | 0.2 |
| pickled-thing | 80 | 0.0% | 0.6 |
| bog-toad | 58 | 0.0% | 0.0 |
| pale-hound | 85 | 0.0% | 0.1 |
