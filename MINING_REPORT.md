# Mining Report — 700 tables (2800 games), hard

Overall win rate: **70.2%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 861 | 12.7 | 81.4% | +16.2 |
| Bandolier of Knives | equipment | 818 | 12.6 | 81.5% | +16.0 |
| Winch Hook | equipment | 808 | 12.4 | 80.0% | +13.7 |
| Haunted Armor | equipment | 827 | 10.5 | 79.7% | +13.4 |
| Blessed Mace | equipment | 849 | 12.8 | 78.8% | +12.3 |
| Blade of the Adder | equipment | 866 | 13.5 | 78.3% | +11.7 |
| Greatsword of the Vault | equipment | 833 | 12.4 | 78.4% | +11.6 |
| Wand of Embers | equipment | 812 | 10.6 | 78.1% | +11.1 |
| Tower Shield | equipment | 812 | 12.5 | 78.0% | +10.9 |
| Ironwood Prybar | equipment | 774 | 12.3 | 78.0% | +10.8 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Mending Word | spell | 842 | 11.3 | 57.2% | -18.5 |
| Kindle | spell | 833 | 12.6 | 58.5% | -16.7 |
| Dancing Light | spell | 783 | 12.4 | 58.9% | -15.7 |
| Balm of Hours | spell | 834 | 11.5 | 59.6% | -15.1 |
| Cause Fear | spell | 813 | 12.2 | 59.5% | -15.1 |
| Sunder | spell | 788 | 12.3 | 59.5% | -14.9 |
| Feather Step | spell | 787 | 12.3 | 59.7% | -14.6 |
| Melchior the Moth-Eaten | character | 867 | 10.8 | 60.2% | -14.5 |
| Chain Lightning | spell | 814 | 12.1 | 60.0% | -14.5 |
| Eyes of the Mouse | spell | 804 | 12.4 | 60.0% | -14.4 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 78.6% | 4.0 |
| guildmaster | 0.70 | 140 | 65.0% | 4.0 |
| warlord | 0.55 | 140 | 84.3% | 4.0 |
| archmage | 0.50 | 140 | 47.9% | 4.0 |
| novice | 0.15 | 140 | 60.0% | 3.4 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 2 | 12 | 33.3% |
| 3 | 61 | 49.2% |
| 4 | 2727 | 70.8% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 72.5% | 63.7% | +8.8 |
| cleric | 71.4% | 66.0% | +5.4 |
| wizard | 64.4% | 80.9% | -16.5 |
| rogue | 73.1% | 63.8% | +9.2 |
| alchemist | 69.5% | 71.9% | -2.4 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 805 | 76.6% | +6.4 |
| craven | 870 | 73.4% | +3.2 |
| pious | 850 | 71.4% | +1.2 |
| cunning | 1473 | 71.3% | +1.1 |
| greedy | 875 | 70.1% | -0.2 |
| brave | 848 | 68.2% | -2.1 |
| reckless | 1435 | 65.5% | -4.7 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 245 | 21.2% |
| 1 | 727 | 61.6% |
| 2 | 885 | 74.5% |
| 3 | 619 | 83.0% |
| 4 | 240 | 90.8% |
| 5+ | 84 | 89.3% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| materials:gather | 2054 | 100.0% | 0.0 |
| library:study | 1882 | 100.0% | 0.0 |
| monster:spell-strike | 1540 | 99.9% | 0.0 |
| monster:flee | 1483 | 100.0% | 0.0 |
| monster:fight | 1328 | 99.4% | 1.9 |
| lab:pass-by | 1148 | 100.0% | 0.0 |
| disaster:scatter | 1131 | 50.7% | 0.0 |
| trap:push-through | 1086 | 100.0% | 4.9 |
| shrine:rest | 1051 | 100.0% | 0.0 |
| monster:sneak | 962 | 87.6% | 0.0 |
| disaster:brace | 950 | 100.0% | 5.4 |
| treasure:loot | 945 | 83.1% | 0.0 |
| library:pass-by | 794 | 100.0% | 0.0 |
| boss:spell-strike | 760 | 98.4% | 3.8 |
| shrine:desecrate | 731 | 100.0% | 0.0 |
| boss:flee | 673 | 100.0% | 0.0 |
| trap:spell-bypass | 672 | 100.0% | 0.0 |
| lab:alchemy | 659 | 100.0% | 0.0 |
| disaster:sift-rubble | 645 | 100.0% | 0.0 |
| boss:fight | 595 | 40.5% | 43.4 |
| vault:loot | 589 | 70.5% | 0.0 |
| shrine:pass-by | 571 | 100.0% | 0.0 |
| materials:pass-by | 564 | 100.0% | 0.0 |
| trap:disarm | 554 | 91.0% | 0.0 |
| library:deep-study | 497 | 97.8% | 0.0 |
| treasure:inspect | 481 | 100.0% | 0.0 |
| trap:search-around | 429 | 99.1% | 0.0 |
| lab:crack-crates | 348 | 100.0% | 0.0 |
| library:strip-the-shelves | 342 | 100.0% | 0.0 |
| library:bless-the-font | 342 | 100.0% | 0.0 |
| boss:fight-from-cover | 330 | 57.9% | 35.6 |
| boss:shove-into-brazier | 325 | 50.5% | 38.7 |
| trap:smoke-bomb | 321 | 100.0% | 0.0 |
| vault:inspect | 304 | 100.0% | 0.0 |
| lab:strip-the-shelves | 277 | 100.0% | 0.0 |
| lab:harvest-spout | 272 | 100.0% | 0.0 |
| boss:shove-into-pit | 264 | 65.5% | 33.3 |
| monster:turn-undead | 258 | 91.9% | 0.0 |
| monster:fight-from-cover | 256 | 100.0% | 0.5 |
| trap:sift-rubble | 246 | 100.0% | 0.0 |
| monster:shove-into-brazier | 231 | 100.0% | 0.4 |
| materials:sift-rubble | 216 | 100.0% | 0.0 |
| materials:crack-crates | 205 | 100.0% | 0.0 |
| boss:drop-portcullis | 190 | 67.9% | 31.6 |
| shrine:bless-the-font | 190 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 188 | 100.0% | 0.9 |
| treasure:knock-open | 179 | 100.0% | 0.0 |
| monster:shove-into-pit | 177 | 100.0% | 0.4 |
| materials:harvest-spout | 176 | 100.0% | 0.0 |
| monster:sift-rubble | 173 | 100.0% | 0.0 |
| library:fill-waterskins | 161 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 156 | 100.0% | 1.0 |
| treasure:leave-it | 153 | 100.0% | 0.0 |
| monster:crack-crates | 153 | 100.0% | 0.0 |
| monster:drop-portcullis | 135 | 99.3% | 0.5 |
| treasure:crack-crates | 129 | 100.0% | 0.0 |
| monster:topple-boulder | 128 | 100.0% | 0.3 |
| monster:bless-the-font | 117 | 100.0% | 0.0 |
| monster:strip-the-shelves | 113 | 100.0% | 0.0 |
| boss:turn-undead | 106 | 84.9% | 0.0 |
| monster:harvest-spout | 105 | 100.0% | 0.0 |
| vault:knock-open | 104 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 102 | 100.0% | 0.9 |
| monster:pry-sarcophagus | 98 | 100.0% | 0.9 |
| lab:work-the-anvil | 95 | 100.0% | 0.0 |
| vault:leave-it | 89 | 100.0% | 0.0 |
| monster:cause-fear | 74 | 100.0% | 0.0 |
| shrine:fill-waterskins | 70 | 100.0% | 0.0 |
| boss:bribe | 66 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 61 | 100.0% | 0.9 |
| monster:bribe | 61 | 100.0% | 0.0 |
| corridor:proceed | 61 | 100.0% | 0.0 |
| monster:fill-waterskins | 52 | 100.0% | 0.0 |
| materials:work-the-anvil | 51 | 100.0% | 0.0 |
| vault:strip-the-shelves | 47 | 100.0% | 0.0 |
| monster:work-the-anvil | 42 | 100.0% | 0.0 |
| corridor:bless-the-font | 3 | 100.0% | 0.0 |
| corridor:crack-crates | 3 | 100.0% | 0.0 |
| corridor:harvest-spout | 1 | 100.0% | 0.0 |
| corridor:work-the-anvil | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| cinder-wyrm | 90 | 38.9% | 25.0 |
| forge-tyrant | 73 | 38.4% | 25.4 |
| the-cauldron | 95 | 36.8% | 24.8 |
| the-precipitate | 93 | 35.5% | 24.7 |
| bog-witch | 75 | 32.0% | 24.1 |
| ogre-king | 81 | 29.6% | 22.6 |
| vampire-lord | 84 | 27.4% | 22.9 |
| glacier-heart | 97 | 26.8% | 21.5 |
| mad-pyromancer | 94 | 24.5% | 19.9 |
| archivist | 78 | 23.1% | 19.1 |
| dragon-whelp | 101 | 22.8% | 20.7 |
| shrouded-king | 84 | 22.6% | 18.6 |
| mad-alchemist | 74 | 20.3% | 20.7 |
| grand-errata | 93 | 17.2% | 15.3 |
| the-bride | 77 | 16.9% | 16.8 |
| abbot-of-worms | 66 | 16.7% | 14.8 |
| obsidian-golem | 94 | 4.3% | 5.8 |
| magma-toad | 75 | 1.3% | 1.4 |
| gelatinous | 81 | 1.2% | 1.1 |
| cinder-imp | 89 | 1.1% | 1.0 |
| ice-crawler | 105 | 1.0% | 0.6 |
| barrow-shade | 119 | 0.8% | 0.9 |
| rat-swarm | 89 | 0.0% | 0.1 |
| mutant-vine | 89 | 0.0% | 0.6 |
| hungry-ghoul | 111 | 0.0% | 1.0 |
| failed-homunculus | 75 | 0.0% | 0.7 |
| skeleton | 64 | 0.0% | 0.5 |
| ink-elemental | 79 | 0.0% | 0.8 |
| spectral-scribe | 57 | 0.0% | 0.8 |
| cinder-bats | 108 | 0.0% | 0.0 |
| jar-imp | 73 | 0.0% | 0.4 |
| thawed-dead | 77 | 0.0% | 0.7 |
| frost-wisp | 77 | 0.0% | 0.1 |
| grave-mites | 133 | 0.0% | 0.1 |
| bog-toad | 81 | 0.0% | 1.7 |
| crimson-mist | 99 | 0.0% | 1.1 |
| bone-warden | 111 | 0.0% | 0.8 |
| goblin-gang | 69 | 0.0% | 0.6 |
| potion-rats | 94 | 0.0% | 0.1 |
| pale-hound | 87 | 0.0% | 1.2 |
| flying-tomes | 81 | 0.0% | 0.2 |
| salamander | 84 | 0.0% | 1.0 |
| bat-cloud | 98 | 0.0% | 0.1 |
| wraith | 71 | 0.0% | 1.0 |
| root-golem | 98 | 0.0% | 1.7 |
| index-wight | 83 | 0.0% | 0.9 |
| castle-thrall | 77 | 0.0% | 0.9 |
| pickled-thing | 65 | 0.0% | 1.2 |
| sludge-elemental | 75 | 0.0% | 1.0 |
