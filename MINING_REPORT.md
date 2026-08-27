# Mining Report — 700 tables (2800 games), hard

Overall win rate: **70.8%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.19,"hard":1.45,"nightmare":1.97} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.19 · hard 1.45 · nightmare 1.97.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 862 | 13.0 | 84.8% | +20.2 |
| Bandolier of Knives | equipment | 902 | 12.9 | 76.6% | +8.5 |
| The Cunning | personality | 829 | 16.7 | 76.7% | +8.4 |
| Dancing Light | spell | 797 | 10.9 | 75.9% | +7.1 |
| Eyes of the Mouse | spell | 777 | 10.9 | 75.9% | +7.1 |
| Blessed Mace | equipment | 916 | 13.1 | 75.5% | +7.0 |
| The Craven | personality | 832 | 17.2 | 74.9% | +5.8 |
| The Scholarly | personality | 837 | 16.8 | 74.7% | +5.5 |
| Everburning Lantern | equipment | 939 | 10.7 | 74.2% | +5.1 |
| The Devout | personality | 872 | 17.0 | 74.1% | +4.7 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Reckless | personality | 835 | 16.4 | 62.9% | -11.3 |
| Balm of Hours | spell | 752 | 11.8 | 62.6% | -11.2 |
| The Vandal | personality | 792 | 17.2 | 64.9% | -8.3 |
| Firewatch | tactic | 566 | 15.2 | 65.7% | -6.4 |
| The Bold | personality | 814 | 16.6 | 67.0% | -5.5 |
| Knock | spell | 744 | 13.0 | 66.9% | -5.3 |
| Mending Word | spell | 751 | 11.8 | 67.1% | -5.1 |
| Focused Fire | tactic | 564 | 15.2 | 66.8% | -5.0 |
| Ward-Weaving | tactic | 550 | 15.2 | 67.1% | -4.6 |
| Cause Fear | spell | 759 | 13.4 | 67.7% | -4.3 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 74.3% | 4.0 |
| guildmaster | 0.70 | 140 | 74.3% | 4.0 |
| warlord | 0.55 | 140 | 72.1% | 4.0 |
| archmage | 0.50 | 140 | 67.1% | 4.0 |
| novice | 0.15 | 140 | 52.9% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 16 | 31.3% |
| 2 | 49 | 53.1% |
| 3 | 57 | 59.6% |
| 4 | 2678 | 71.6% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 31 | 64.5% | — | — |
| 1 | 119 | 72.3% | — | — |
| 2 | 186 | 72.0% | — | — |
| 3 | 225 | 79.1% | 32 | 56.3% |
| 4 | 333 | 74.5% | 93 | 65.6% |
| 5 | 386 | 68.4% | 196 | 59.7% |
| 6 | 380 | 71.6% | 274 | 68.2% |
| 7 | 247 | 75.3% | 226 | 67.3% |
| 8 | 229 | 69.0% | 207 | 71.0% |
| 9+ | 664 | 65.8% | 1766 | 73.4% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 70.5% | 71.5% | -0.9 |
| cleric | 72.3% | 65.7% | +6.5 |
| wizard | 70.3% | 71.7% | -1.4 |
| rogue | 71.9% | 68.4% | +3.5 |
| alchemist | 70.5% | 71.6% | -1.1 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| cunning | 1470 | 75.2% | +4.4 |
| craven | 832 | 74.9% | +4.1 |
| scholarly | 837 | 74.7% | +3.9 |
| pious | 872 | 74.1% | +3.3 |
| greedy | 839 | 69.1% | -1.7 |
| brave | 814 | 67.0% | -3.9 |
| reckless | 1443 | 64.7% | -6.1 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 265 | 23.0% |
| 1 | 887 | 59.9% |
| 2 | 910 | 82.1% |
| 3 | 482 | 85.7% |
| 4 | 190 | 89.5% |
| 5+ | 66 | 92.4% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 1939 | 99.8% | 0.0 |
| library:study | 1833 | 100.0% | 0.0 |
| materials:gather | 1765 | 100.0% | 0.0 |
| stairs:descend | 1591 | 100.0% | 0.0 |
| boss:spell-strike | 1116 | 98.1% | 2.5 |
| lab:pass-by | 1115 | 100.0% | 0.0 |
| shrine:rest | 1114 | 100.0% | 0.0 |
| trap:push-through | 1002 | 100.0% | 4.3 |
| monster:fight | 786 | 99.7% | 1.2 |
| disaster:scatter | 771 | 45.4% | 0.0 |
| shrine:desecrate | 723 | 100.0% | 0.0 |
| trap:spell-bypass | 722 | 100.0% | 0.0 |
| library:pass-by | 686 | 100.0% | 0.0 |
| monster:sneak | 641 | 88.0% | 0.0 |
| monster:flee | 639 | 100.0% | 2.4 |
| shrine:pass-by | 631 | 100.0% | 0.0 |
| disaster:brace | 597 | 100.0% | 5.4 |
| lab:alchemy | 586 | 100.0% | 0.0 |
| treasure:loot | 549 | 80.1% | 0.0 |
| vault:loot | 544 | 72.6% | 0.0 |
| trap:disarm | 505 | 90.3% | 0.0 |
| materials:pass-by | 505 | 100.0% | 0.0 |
| stairs:rope-down | 441 | 100.0% | 0.0 |
| library:deep-study | 430 | 97.0% | 0.0 |
| trap:search-around | 372 | 98.9% | 0.0 |
| boss:fight | 371 | 33.4% | 45.5 |
| boss:flee | 366 | 100.0% | 2.4 |
| lab:crack-crates | 364 | 100.0% | 0.0 |
| library:bless-the-font | 345 | 100.0% | 0.0 |
| disaster:sift-rubble | 339 | 100.0% | 0.0 |
| library:strip-the-shelves | 309 | 100.0% | 0.0 |
| trap:smoke-bomb | 301 | 100.0% | 0.0 |
| lab:harvest-spout | 300 | 100.0% | 0.0 |
| vault:inspect | 286 | 100.0% | 0.0 |
| treasure:inspect | 284 | 100.0% | 0.0 |
| boss:fight-from-cover | 272 | 57.7% | 38.8 |
| corridor:proceed | 271 | 100.0% | 0.0 |
| lab:strip-the-shelves | 244 | 100.0% | 0.0 |
| boss:shove-into-brazier | 239 | 50.6% | 38.2 |
| trap:sift-rubble | 229 | 100.0% | 0.0 |
| boss:shove-into-pit | 228 | 52.6% | 37.7 |
| materials:sift-rubble | 216 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 209 | 100.0% | 0.9 |
| materials:crack-crates | 189 | 100.0% | 0.0 |
| monster:turn-undead | 173 | 91.9% | 0.0 |
| monster:fight-from-cover | 171 | 100.0% | 0.3 |
| shrine:bless-the-font | 169 | 100.0% | 0.0 |
| boss:drop-portcullis | 158 | 55.7% | 33.2 |
| monster:shove-into-brazier | 152 | 100.0% | 0.2 |
| treasure:knock-open | 142 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 140 | 100.0% | 0.7 |
| materials:harvest-spout | 139 | 100.0% | 0.0 |
| stairs:camp-stair | 137 | 100.0% | 2.5 |
| library:fill-waterskins | 123 | 100.0% | 0.0 |
| vault:knock-open | 122 | 100.0% | 0.0 |
| monster:shove-into-pit | 113 | 100.0% | 0.2 |
| monster:sift-rubble | 109 | 100.0% | 0.0 |
| monster:crack-crates | 101 | 100.0% | 0.0 |
| vault:leave-it | 100 | 100.0% | 0.0 |
| treasure:crack-crates | 98 | 100.0% | 0.0 |
| lab:work-the-anvil | 93 | 100.0% | 0.0 |
| monster:topple-boulder | 92 | 100.0% | 0.2 |
| monster:pry-sarcophagus | 84 | 100.0% | 0.8 |
| boss:turn-undead | 82 | 84.1% | 0.0 |
| monster:drop-portcullis | 81 | 100.0% | 0.3 |
| monster:harvest-spout | 81 | 100.0% | 0.0 |
| monster:strip-the-shelves | 79 | 100.0% | 0.0 |
| shrine:fill-waterskins | 77 | 100.0% | 0.0 |
| monster:bless-the-font | 71 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 70 | 100.0% | 0.9 |
| treasure:leave-it | 69 | 100.0% | 0.0 |
| boss:bribe | 63 | 100.0% | 0.0 |
| lab:brew-oil | 55 | 100.0% | 0.0 |
| materials:work-the-anvil | 52 | 100.0% | 0.0 |
| boss:dark | 48 | 93.8% | 0.5 |
| vault:strip-the-shelves | 41 | 100.0% | 0.0 |
| monster:work-the-anvil | 39 | 100.0% | 0.0 |
| monster:fill-waterskins | 37 | 100.0% | 0.0 |
| materials:brew-oil | 35 | 100.0% | 0.0 |
| monster:bribe | 32 | 100.0% | 0.0 |
| monster:cause-fear | 29 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 28 | 100.0% | 0.7 |
| corridor:crack-crates | 19 | 100.0% | 0.0 |
| corridor:sift-rubble | 18 | 100.0% | 0.0 |
| monster:dark | 14 | 100.0% | 1.4 |
| corridor:harvest-spout | 12 | 100.0% | 0.0 |
| shrine:dark | 8 | 100.0% | 0.9 |
| library:dark | 8 | 100.0% | 0.5 |
| materials:dark | 7 | 100.0% | 0.0 |
| trap:dark | 7 | 100.0% | 0.0 |
| vault:dark | 6 | 100.0% | 0.0 |
| disaster:dark | 5 | 100.0% | 0.0 |
| corridor:bless-the-font | 5 | 100.0% | 0.0 |
| lab:dark | 5 | 100.0% | 0.0 |
| corridor:work-the-anvil | 4 | 100.0% | 0.0 |
| treasure:dark | 3 | 100.0% | 0.0 |
| corridor:fill-waterskins | 2 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| the-cauldron | 94 | 25.5% | 17.9 |
| dragon-whelp | 84 | 25.0% | 16.6 |
| mad-pyromancer | 99 | 24.2% | 15.9 |
| bog-witch | 74 | 23.0% | 15.0 |
| vampire-lord | 88 | 21.6% | 16.0 |
| forge-tyrant | 89 | 20.2% | 13.0 |
| mad-alchemist | 92 | 19.6% | 12.4 |
| cinder-wyrm | 94 | 19.1% | 13.1 |
| shrouded-king | 95 | 17.9% | 10.9 |
| archivist | 109 | 16.5% | 13.9 |
| the-precipitate | 100 | 16.0% | 11.9 |
| the-bride | 94 | 14.9% | 11.8 |
| ogre-king | 84 | 14.3% | 11.6 |
| glacier-heart | 104 | 13.5% | 12.8 |
| grand-errata | 94 | 10.6% | 9.0 |
| abbot-of-worms | 93 | 8.6% | 10.7 |
| obsidian-golem | 93 | 3.2% | 2.2 |
| wraith | 50 | 2.0% | 0.3 |
| failed-homunculus | 64 | 1.6% | 0.7 |
| root-golem | 89 | 1.1% | 1.0 |
| mutant-vine | 79 | 0.0% | 0.7 |
| barrow-shade | 100 | 0.0% | 0.3 |
| potion-rats | 87 | 0.0% | 0.1 |
| rat-swarm | 80 | 0.0% | 0.1 |
| ink-elemental | 84 | 0.0% | 0.6 |
| spectral-scribe | 78 | 0.0% | 0.2 |
| ice-crawler | 93 | 0.0% | 0.4 |
| cinder-bats | 87 | 0.0% | 0.0 |
| pickled-thing | 67 | 0.0% | 0.4 |
| frost-wisp | 74 | 0.0% | 0.0 |
| jar-imp | 78 | 0.0% | 0.0 |
| bog-toad | 78 | 0.0% | 0.3 |
| crimson-mist | 89 | 0.0% | 0.5 |
| bone-warden | 97 | 0.0% | 0.2 |
| goblin-gang | 63 | 0.0% | 0.3 |
| sludge-elemental | 55 | 0.0% | 0.9 |
| pale-hound | 93 | 0.0% | 0.1 |
| thawed-dead | 76 | 0.0% | 0.1 |
| salamander | 97 | 0.0% | 0.4 |
| magma-toad | 79 | 0.0% | 0.4 |
| grave-mites | 116 | 0.0% | 0.0 |
| gelatinous | 80 | 0.0% | 0.4 |
| bat-cloud | 103 | 0.0% | 0.0 |
| cinder-imp | 99 | 0.0% | 0.1 |
| flying-tomes | 86 | 0.0% | 0.2 |
| index-wight | 79 | 0.0% | 0.5 |
| hungry-ghoul | 86 | 0.0% | 0.4 |
| castle-thrall | 84 | 0.0% | 0.4 |
| skeleton | 62 | 0.0% | 0.5 |
