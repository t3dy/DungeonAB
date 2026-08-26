# Mining Report — 700 tables (2800 games), hard

Overall win rate: **69.7%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Everburning Lantern | equipment | 899 | 10.7 | 79.1% | +13.9 |
| Eyes of the Mouse | spell | 808 | 10.8 | 78.5% | +12.4 |
| Dancing Light | spell | 811 | 10.6 | 78.4% | +12.3 |
| The Scholarly | personality | 834 | 16.4 | 74.7% | +7.2 |
| Blessed Mace | equipment | 896 | 12.7 | 73.9% | +6.2 |
| Quicksilver Daggers | equipment | 870 | 13.0 | 73.7% | +5.8 |
| The Tinkerer | personality | 847 | 15.5 | 73.0% | +4.7 |
| The Craven | personality | 798 | 16.2 | 72.6% | +4.0 |
| Magister Crucible | character | 887 | 11.3 | 72.4% | +4.0 |
| Brother Oswald of the Lantern | character | 957 | 10.3 | 72.0% | +3.5 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Reckless | personality | 847 | 16.0 | 63.2% | -9.3 |
| The Bold | personality | 789 | 16.0 | 65.7% | -5.6 |
| The Vandal | personality | 818 | 15.5 | 65.9% | -5.3 |
| Fireball | spell | 780 | 12.4 | 65.9% | -5.2 |
| Cause Fear | spell | 776 | 13.1 | 66.2% | -4.8 |
| Sylvane of the Nine Candles | character | 841 | 10.7 | 67.2% | -3.6 |
| Frost Lance | spell | 696 | 12.5 | 67.1% | -3.4 |
| Athanor Charm | equipment | 872 | 12.8 | 67.3% | -3.4 |
| Knock | spell | 713 | 12.7 | 67.2% | -3.4 |
| Sunder | spell | 770 | 12.6 | 67.3% | -3.3 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 72.1% | 4.0 |
| guildmaster | 0.70 | 140 | 73.6% | 4.0 |
| warlord | 0.55 | 140 | 70.0% | 4.0 |
| archmage | 0.50 | 140 | 72.9% | 4.0 |
| novice | 0.15 | 140 | 55.0% | 3.3 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 2 | 19 | 57.9% |
| 3 | 65 | 49.2% |
| 4 | 2716 | 70.3% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | — | — | — | — |
| 1 | 103 | 56.3% | — | — |
| 2 | 211 | 68.2% | — | — |
| 3 | 250 | 67.6% | — | — |
| 4 | 355 | 80.8% | 116 | 69.0% |
| 5 | 348 | 73.9% | 227 | 67.0% |
| 6 | 354 | 72.0% | 245 | 68.2% |
| 7 | 242 | 65.7% | 185 | 63.2% |
| 8 | 241 | 66.8% | 204 | 72.1% |
| 9+ | 679 | 66.3% | 1791 | 70.9% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 69.4% | 70.4% | -1.0 |
| cleric | 70.6% | 66.1% | +4.5 |
| wizard | 67.9% | 72.6% | -4.7 |
| rogue | 70.4% | 68.1% | +2.3 |
| alchemist | 71.0% | 66.5% | +4.4 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 834 | 74.7% | +5.0 |
| craven | 798 | 72.6% | +2.9 |
| cunning | 1475 | 72.1% | +2.4 |
| pious | 898 | 70.4% | +0.7 |
| greedy | 827 | 68.8% | -0.9 |
| brave | 789 | 65.7% | -4.0 |
| reckless | 1471 | 65.5% | -4.2 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 204 | 18.6% |
| 1 | 678 | 60.0% |
| 2 | 861 | 73.2% |
| 3 | 682 | 80.5% |
| 4 | 273 | 86.4% |
| 5+ | 102 | 89.2% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 2312 | 99.9% | 0.0 |
| materials:gather | 1993 | 100.0% | 0.0 |
| library:study | 1881 | 100.0% | 0.0 |
| lab:pass-by | 1169 | 100.0% | 0.0 |
| disaster:scatter | 1118 | 50.4% | 0.0 |
| trap:push-through | 1103 | 100.0% | 5.0 |
| shrine:rest | 1078 | 100.0% | 0.0 |
| boss:spell-strike | 1067 | 97.6% | 1.9 |
| monster:fight | 1013 | 99.5% | 1.1 |
| disaster:brace | 974 | 100.0% | 5.4 |
| treasure:loot | 961 | 83.6% | 0.0 |
| monster:flee | 960 | 100.0% | 0.0 |
| monster:sneak | 764 | 88.6% | 0.0 |
| trap:spell-bypass | 738 | 100.0% | 0.0 |
| library:pass-by | 730 | 100.0% | 0.0 |
| shrine:desecrate | 700 | 100.0% | 0.0 |
| disaster:sift-rubble | 643 | 100.0% | 0.0 |
| lab:alchemy | 625 | 100.0% | 0.0 |
| vault:loot | 593 | 68.0% | 0.0 |
| materials:pass-by | 568 | 100.0% | 0.0 |
| shrine:pass-by | 549 | 100.0% | 0.0 |
| trap:disarm | 527 | 92.6% | 0.0 |
| library:deep-study | 477 | 97.5% | 0.0 |
| treasure:inspect | 444 | 100.0% | 0.0 |
| boss:flee | 432 | 100.0% | 0.0 |
| trap:search-around | 378 | 99.5% | 0.0 |
| lab:crack-crates | 376 | 100.0% | 0.0 |
| boss:fight | 368 | 39.9% | 42.7 |
| library:strip-the-shelves | 359 | 100.0% | 0.0 |
| library:bless-the-font | 348 | 100.0% | 0.0 |
| trap:smoke-bomb | 328 | 100.0% | 0.0 |
| boss:fight-from-cover | 281 | 54.8% | 33.8 |
| lab:harvest-spout | 275 | 100.0% | 0.0 |
| vault:inspect | 268 | 100.0% | 0.0 |
| lab:strip-the-shelves | 252 | 100.0% | 0.0 |
| boss:shove-into-pit | 234 | 57.7% | 34.6 |
| monster:turn-undead | 232 | 90.9% | 0.0 |
| materials:sift-rubble | 232 | 100.0% | 0.0 |
| trap:sift-rubble | 228 | 100.0% | 0.0 |
| boss:shove-into-brazier | 227 | 57.7% | 32.7 |
| materials:crack-crates | 216 | 100.0% | 0.0 |
| monster:shove-into-brazier | 201 | 100.0% | 0.1 |
| treasure:knock-open | 199 | 100.0% | 0.0 |
| shrine:bless-the-font | 197 | 100.0% | 0.0 |
| monster:fight-from-cover | 183 | 99.5% | 0.4 |
| library:fill-waterskins | 173 | 100.0% | 0.0 |
| treasure:leave-it | 171 | 100.0% | 0.0 |
| materials:harvest-spout | 169 | 100.0% | 0.0 |
| monster:shove-into-pit | 168 | 100.0% | 0.2 |
| shrine:pry-sarcophagus | 165 | 100.0% | 0.8 |
| monster:sift-rubble | 161 | 100.0% | 0.0 |
| boss:drop-portcullis | 150 | 62.7% | 32.0 |
| monster:crack-crates | 147 | 100.0% | 0.0 |
| treasure:crack-crates | 144 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 127 | 100.0% | 0.9 |
| vault:knock-open | 124 | 100.0% | 0.0 |
| lab:work-the-anvil | 114 | 100.0% | 0.0 |
| monster:drop-portcullis | 110 | 100.0% | 0.3 |
| boss:dark | 108 | 96.3% | 0.3 |
| monster:bless-the-font | 106 | 100.0% | 0.0 |
| vault:leave-it | 104 | 100.0% | 0.0 |
| monster:strip-the-shelves | 104 | 100.0% | 0.0 |
| monster:topple-boulder | 99 | 100.0% | 0.1 |
| treasure:pry-sarcophagus | 97 | 100.0% | 0.6 |
| monster:pry-sarcophagus | 92 | 100.0% | 0.7 |
| boss:turn-undead | 86 | 86.0% | 0.0 |
| shrine:fill-waterskins | 80 | 100.0% | 0.0 |
| monster:harvest-spout | 77 | 100.0% | 0.0 |
| materials:work-the-anvil | 66 | 100.0% | 0.0 |
| corridor:proceed | 59 | 100.0% | 0.0 |
| monster:bribe | 58 | 100.0% | 0.0 |
| monster:cause-fear | 55 | 100.0% | 0.0 |
| monster:fill-waterskins | 54 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 46 | 100.0% | 1.0 |
| boss:bribe | 42 | 100.0% | 0.0 |
| monster:work-the-anvil | 37 | 100.0% | 0.0 |
| vault:strip-the-shelves | 37 | 100.0% | 0.0 |
| monster:dark | 18 | 100.0% | 0.4 |
| library:dark | 10 | 100.0% | 0.2 |
| shrine:dark | 10 | 100.0% | 0.0 |
| trap:dark | 9 | 100.0% | 0.0 |
| treasure:dark | 6 | 83.3% | 0.3 |
| materials:dark | 5 | 80.0% | 0.8 |
| lab:dark | 4 | 100.0% | 0.0 |
| vault:dark | 4 | 100.0% | 0.0 |
| disaster:dark | 3 | 100.0% | 0.0 |
| corridor:bless-the-font | 2 | 100.0% | 0.0 |
| corridor:crack-crates | 2 | 100.0% | 0.0 |
| corridor:fill-waterskins | 1 | 100.0% | 0.0 |
| corridor:sift-rubble | 1 | 100.0% | 0.0 |
| corridor:work-the-anvil | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| ogre-king | 83 | 28.9% | 19.2 |
| the-precipitate | 99 | 25.3% | 15.8 |
| forge-tyrant | 81 | 23.5% | 15.8 |
| mad-alchemist | 72 | 20.8% | 14.9 |
| glacier-heart | 108 | 19.4% | 12.2 |
| vampire-lord | 89 | 19.1% | 14.9 |
| grand-errata | 107 | 17.8% | 10.2 |
| mad-pyromancer | 102 | 17.6% | 10.3 |
| dragon-whelp | 82 | 17.1% | 14.3 |
| the-cauldron | 98 | 16.3% | 12.9 |
| bog-witch | 82 | 15.9% | 14.7 |
| shrouded-king | 78 | 15.4% | 8.0 |
| the-bride | 80 | 12.5% | 10.4 |
| cinder-wyrm | 89 | 12.4% | 10.1 |
| archivist | 91 | 7.7% | 6.9 |
| abbot-of-worms | 94 | 6.4% | 8.7 |
| thawed-dead | 93 | 2.2% | 0.6 |
| magma-toad | 90 | 1.1% | 0.6 |
| index-wight | 95 | 1.1% | 0.7 |
| obsidian-golem | 102 | 1.0% | 2.8 |
| salamander | 114 | 0.9% | 0.6 |
| cinder-bats | 132 | 0.8% | 0.0 |
| mutant-vine | 101 | 0.0% | 0.3 |
| failed-homunculus | 82 | 0.0% | 0.3 |
| barrow-shade | 138 | 0.0% | 0.3 |
| bone-warden | 121 | 0.0% | 0.3 |
| hungry-ghoul | 116 | 0.0% | 0.4 |
| potion-rats | 110 | 0.0% | 0.0 |
| ink-elemental | 99 | 0.0% | 0.2 |
| spectral-scribe | 88 | 0.0% | 0.3 |
| grave-mites | 161 | 0.0% | 0.1 |
| root-golem | 94 | 0.0% | 0.8 |
| bog-toad | 72 | 0.0% | 0.8 |
| bat-cloud | 132 | 0.0% | 0.0 |
| gelatinous | 93 | 0.0% | 0.6 |
| goblin-gang | 67 | 0.0% | 0.2 |
| wraith | 76 | 0.0% | 0.6 |
| skeleton | 81 | 0.0% | 0.1 |
| flying-tomes | 113 | 0.0% | 0.0 |
| cinder-imp | 87 | 0.0% | 0.0 |
| jar-imp | 88 | 0.0% | 0.0 |
| castle-thrall | 93 | 0.0% | 0.2 |
| rat-swarm | 102 | 0.0% | 0.0 |
| pickled-thing | 78 | 0.0% | 0.3 |
| crimson-mist | 110 | 0.0% | 0.2 |
| sludge-elemental | 74 | 0.0% | 0.2 |
| ice-crawler | 112 | 0.0% | 0.2 |
| pale-hound | 123 | 0.0% | 0.1 |
| frost-wisp | 88 | 0.0% | 0.1 |
