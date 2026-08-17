# Mining Report — 700 tables (2800 games), hard

Overall win rate: **80.0%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Haunted Armor | equipment | 827 | 10.5 | 94.0% | +19.8 |
| Greatsword of the Vault | equipment | 833 | 12.4 | 93.5% | +19.2 |
| Ironwood Prybar | equipment | 774 | 12.3 | 92.9% | +17.8 |
| Field Smith's Kit | equipment | 819 | 12.6 | 92.3% | +17.3 |
| Tower Shield | equipment | 812 | 12.5 | 92.1% | +17.0 |
| Blessed Mace | equipment | 849 | 12.8 | 91.8% | +16.8 |
| Ursula Ironknee | character | 846 | 11.0 | 91.7% | +16.8 |
| Bandolier of Knives | equipment | 818 | 12.6 | 91.4% | +16.1 |
| Quicksilver Daggers | equipment | 861 | 12.7 | 91.2% | +16.1 |
| Blade of the Adder | equipment | 866 | 13.5 | 90.8% | +15.5 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Dancing Light | spell | 783 | 12.4 | 63.5% | -23.0 |
| Melchior the Moth-Eaten | character | 867 | 10.8 | 64.8% | -22.0 |
| Feather Step | spell | 787 | 12.3 | 64.8% | -21.2 |
| Cause Fear | spell | 813 | 12.2 | 65.1% | -21.1 |
| Purify the Font | spell | 760 | 11.9 | 65.4% | -20.1 |
| Sylvane of the Nine Candles | character | 871 | 11.1 | 66.4% | -19.8 |
| Firebolt | spell | 816 | 13.0 | 66.1% | -19.7 |
| Shatter | spell | 799 | 12.2 | 66.0% | -19.7 |
| Aegis of Ash | spell | 814 | 12.7 | 66.1% | -19.7 |
| Kindle | spell | 833 | 12.6 | 67.0% | -18.6 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 85.0% | 4.0 |
| guildmaster | 0.70 | 140 | 83.6% | 4.0 |
| warlord | 0.55 | 140 | 92.1% | 4.0 |
| archmage | 0.50 | 140 | 60.0% | 4.0 |
| novice | 0.15 | 140 | 85.0% | 3.4 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 2 | 12 | 25.0% |
| 3 | 61 | 85.2% |
| 4 | 2727 | 80.2% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 86.7% | 60.9% | +25.8 |
| cleric | 80.3% | 79.3% | +1.0 |
| wizard | 72.5% | 93.8% | -21.3 |
| rogue | 84.0% | 71.0% | +13.0 |
| alchemist | 79.9% | 80.4% | -0.5 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| cunning | 1473 | 82.3% | +2.2 |
| brave | 848 | 81.8% | +1.8 |
| pious | 850 | 81.1% | +1.0 |
| craven | 870 | 80.6% | +0.5 |
| scholarly | 805 | 79.3% | -0.8 |
| greedy | 875 | 78.3% | -1.8 |
| reckless | 1435 | 77.8% | -2.3 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 186 | 38.2% |
| 1 | 744 | 73.9% |
| 2 | 889 | 82.1% |
| 3 | 612 | 89.4% |
| 4 | 288 | 93.1% |
| 5+ | 81 | 92.6% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| materials:gather | 2032 | 100.0% | 0.0 |
| library:study | 1856 | 100.0% | 0.0 |
| monster:flee | 1520 | 100.0% | 0.0 |
| monster:spell-strike | 1448 | 99.9% | 0.3 |
| monster:fight | 1409 | 99.6% | 1.0 |
| lab:pass-by | 1183 | 100.0% | 0.0 |
| disaster:scatter | 1153 | 48.6% | 0.0 |
| trap:push-through | 1095 | 100.0% | 4.9 |
| shrine:rest | 1041 | 100.0% | 0.0 |
| disaster:brace | 976 | 100.0% | 5.4 |
| treasure:loot | 910 | 81.5% | 0.0 |
| monster:sneak | 895 | 85.4% | 0.0 |
| library:pass-by | 758 | 100.0% | 0.0 |
| boss:spell-strike | 731 | 71.4% | 25.7 |
| shrine:desecrate | 686 | 100.0% | 0.0 |
| boss:flee | 659 | 100.0% | 0.0 |
| lab:alchemy | 640 | 100.0% | 0.0 |
| trap:spell-bypass | 613 | 100.0% | 0.0 |
| shrine:pass-by | 611 | 100.0% | 0.0 |
| boss:fight | 600 | 70.0% | 25.5 |
| disaster:sift-rubble | 594 | 100.0% | 0.0 |
| trap:disarm | 575 | 88.7% | 0.0 |
| materials:pass-by | 554 | 100.0% | 0.0 |
| vault:loot | 523 | 74.4% | 0.0 |
| treasure:inspect | 473 | 100.0% | 0.0 |
| library:deep-study | 470 | 86.6% | 0.0 |
| trap:search-around | 434 | 96.1% | 0.0 |
| lab:crack-crates | 370 | 100.0% | 0.0 |
| library:bless-the-font | 358 | 100.0% | 0.0 |
| library:strip-the-shelves | 346 | 100.0% | 0.0 |
| boss:fight-from-cover | 333 | 85.9% | 17.6 |
| trap:smoke-bomb | 328 | 100.0% | 0.0 |
| boss:shove-into-brazier | 300 | 84.0% | 19.2 |
| boss:shove-into-pit | 272 | 88.2% | 16.5 |
| lab:strip-the-shelves | 262 | 100.0% | 0.0 |
| trap:sift-rubble | 262 | 100.0% | 0.0 |
| vault:inspect | 253 | 100.0% | 0.0 |
| monster:turn-undead | 250 | 91.2% | 0.0 |
| lab:harvest-spout | 246 | 100.0% | 0.0 |
| monster:shove-into-brazier | 229 | 100.0% | 0.1 |
| monster:fight-from-cover | 225 | 100.0% | 0.2 |
| materials:sift-rubble | 214 | 100.0% | 0.0 |
| boss:drop-portcullis | 213 | 87.3% | 15.5 |
| treasure:knock-open | 211 | 100.0% | 0.0 |
| materials:crack-crates | 201 | 100.0% | 0.0 |
| shrine:bless-the-font | 188 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 186 | 100.0% | 0.7 |
| boss:pry-sarcophagus | 178 | 100.0% | 0.7 |
| monster:cause-fear | 167 | 100.0% | 0.0 |
| monster:sift-rubble | 158 | 100.0% | 0.0 |
| monster:shove-into-pit | 156 | 100.0% | 0.2 |
| materials:harvest-spout | 155 | 100.0% | 0.0 |
| library:fill-waterskins | 152 | 100.0% | 0.0 |
| treasure:crack-crates | 141 | 100.0% | 0.0 |
| monster:topple-boulder | 133 | 100.0% | 0.0 |
| monster:crack-crates | 132 | 100.0% | 0.0 |
| monster:bless-the-font | 130 | 100.0% | 0.0 |
| monster:drop-portcullis | 127 | 100.0% | 0.0 |
| monster:strip-the-shelves | 125 | 100.0% | 0.0 |
| treasure:leave-it | 116 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 102 | 100.0% | 1.1 |
| boss:turn-undead | 102 | 78.4% | 0.0 |
| treasure:pry-sarcophagus | 95 | 100.0% | 0.8 |
| vault:leave-it | 92 | 100.0% | 0.0 |
| lab:work-the-anvil | 85 | 100.0% | 0.0 |
| vault:knock-open | 85 | 100.0% | 0.0 |
| monster:harvest-spout | 82 | 100.0% | 0.0 |
| boss:bribe | 66 | 100.0% | 0.0 |
| shrine:fill-waterskins | 65 | 100.0% | 0.0 |
| corridor:proceed | 60 | 100.0% | 0.0 |
| monster:work-the-anvil | 55 | 100.0% | 0.0 |
| monster:bribe | 51 | 100.0% | 0.0 |
| monster:fill-waterskins | 45 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 42 | 100.0% | 1.2 |
| materials:work-the-anvil | 41 | 100.0% | 0.0 |
| vault:strip-the-shelves | 39 | 100.0% | 0.0 |
| corridor:bless-the-font | 3 | 100.0% | 0.0 |
| corridor:fill-waterskins | 1 | 100.0% | 0.0 |
| corridor:harvest-spout | 1 | 100.0% | 0.0 |
| corridor:crack-crates | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| forge-tyrant | 60 | 55.0% | 35.1 |
| ogre-king | 70 | 45.7% | 34.7 |
| the-precipitate | 106 | 42.5% | 32.1 |
| vampire-lord | 79 | 35.4% | 28.3 |
| grand-errata | 99 | 34.3% | 27.7 |
| glacier-heart | 98 | 31.6% | 26.4 |
| the-cauldron | 84 | 29.8% | 27.7 |
| bog-witch | 76 | 27.6% | 24.6 |
| cinder-wyrm | 99 | 27.3% | 25.6 |
| mad-pyromancer | 92 | 27.2% | 22.6 |
| shrouded-king | 73 | 26.0% | 22.0 |
| dragon-whelp | 94 | 21.3% | 22.7 |
| abbot-of-worms | 68 | 17.6% | 17.4 |
| the-bride | 86 | 16.3% | 23.6 |
| archivist | 74 | 16.2% | 19.6 |
| mad-alchemist | 73 | 15.1% | 18.9 |
| obsidian-golem | 95 | 2.1% | 3.9 |
| spectral-scribe | 68 | 1.5% | 0.9 |
| bog-toad | 77 | 1.3% | 1.4 |
| magma-toad | 82 | 1.2% | 0.9 |
| castle-thrall | 91 | 1.1% | 0.5 |
| crimson-mist | 99 | 1.0% | 0.9 |
| wraith | 67 | 0.0% | 0.5 |
| mutant-vine | 93 | 0.0% | 0.6 |
| failed-homunculus | 84 | 0.0% | 0.5 |
| bone-warden | 97 | 0.0% | 0.8 |
| potion-rats | 85 | 0.0% | 0.0 |
| skeleton | 75 | 0.0% | 0.4 |
| ink-elemental | 89 | 0.0% | 0.5 |
| ice-crawler | 106 | 0.0% | 0.2 |
| cinder-bats | 106 | 0.0% | 0.0 |
| root-golem | 84 | 0.0% | 1.4 |
| frost-wisp | 68 | 0.0% | 0.0 |
| grave-mites | 136 | 0.0% | 0.0 |
| hungry-ghoul | 96 | 0.0% | 0.6 |
| barrow-shade | 113 | 0.0% | 0.3 |
| bat-cloud | 104 | 0.0% | 0.0 |
| goblin-gang | 71 | 0.0% | 0.5 |
| gelatinous | 84 | 0.0% | 1.0 |
| cinder-imp | 81 | 0.0% | 0.3 |
| salamander | 92 | 0.0% | 0.7 |
| jar-imp | 66 | 0.0% | 0.0 |
| flying-tomes | 88 | 0.0% | 0.0 |
| sludge-elemental | 73 | 0.0% | 1.1 |
| pickled-thing | 75 | 0.0% | 0.6 |
| pale-hound | 101 | 0.0% | 0.8 |
| index-wight | 69 | 0.0% | 0.6 |
| rat-swarm | 79 | 0.0% | 0.1 |
| thawed-dead | 63 | 0.0% | 0.6 |
