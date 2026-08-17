# Mining Report — 500 tables (2000 games), hard

Overall win rate: **73.5%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Haunted Armor | equipment | 778 | 10.9 | 86.5% | +21.3 |
| Greatsword of the Vault | equipment | 739 | 12.2 | 86.1% | +19.9 |
| Tower Shield | equipment | 748 | 12.4 | 86.0% | +19.9 |
| Blessed Mace | equipment | 780 | 12.7 | 85.6% | +19.9 |
| Quicksilver Daggers | equipment | 765 | 12.7 | 85.6% | +19.6 |
| Bandolier of Knives | equipment | 743 | 12.3 | 85.5% | +19.0 |
| Blade of the Adder | equipment | 777 | 13.4 | 84.7% | +18.3 |
| Wand of Embers | equipment | 824 | 10.6 | 83.1% | +16.4 |
| Holy Symbol of Dawn | equipment | 797 | 10.6 | 83.2% | +16.1 |
| Brand of the Broken Shield | character | 646 | 11.1 | 84.4% | +16.0 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Knock | spell | 667 | 12.6 | 57.6% | -23.9 |
| Eyes of the Mouse | spell | 687 | 12.6 | 58.4% | -23.0 |
| Melchior the Moth-Eaten | character | 611 | 10.7 | 57.9% | -22.4 |
| Dancing Light | spell | 663 | 12.5 | 58.8% | -22.0 |
| Cause Fear | spell | 684 | 12.4 | 59.5% | -21.3 |
| Aegis of Ash | spell | 671 | 12.1 | 59.6% | -20.9 |
| Old Yarrow | character | 639 | 11.5 | 59.5% | -20.6 |
| Firebolt | spell | 659 | 12.8 | 60.4% | -19.5 |
| Mending Word | spell | 646 | 11.6 | 60.4% | -19.4 |
| Radiant Lance | spell | 657 | 12.6 | 61.0% | -18.6 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 100 | 85.0% | 4.0 |
| guildmaster | 0.70 | 100 | 82.0% | 4.0 |
| warlord | 0.55 | 100 | 89.0% | 4.0 |
| archmage | 0.50 | 100 | 55.0% | 4.0 |
| novice | 0.15 | 100 | 73.0% | 3.4 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 2 | 10 | 30.0% |
| 3 | 40 | 57.5% |
| 4 | 1950 | 74.1% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 80.8% | 51.4% | +29.4 |
| cleric | 74.4% | 70.4% | +4.1 |
| wizard | 66.3% | 86.8% | -20.5 |
| rogue | 76.5% | 66.9% | +9.6 |
| alchemist | 73.8% | 72.8% | +1.1 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 740 | 78.8% | +5.3 |
| pious | 768 | 75.7% | +2.2 |
| cunning | 758 | 74.3% | +0.8 |
| brave | 737 | 74.1% | +0.6 |
| greedy | 745 | 71.9% | -1.6 |
| reckless | 705 | 71.6% | -1.9 |
| craven | 727 | 69.2% | -4.3 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 142 | 17.6% |
| 1 | 436 | 61.9% |
| 2 | 574 | 75.4% |
| 3 | 471 | 84.3% |
| 4 | 267 | 90.6% |
| 5+ | 110 | 93.6% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:flee | 2275 | 100.0% | 0.0 |
| boss:flee | 2206 | 100.0% | 0.0 |
| materials:gather | 1828 | 100.0% | 0.0 |
| library:study | 1698 | 100.0% | 0.0 |
| monster:spell-strike | 1612 | 99.7% | 0.3 |
| lab:pass-by | 1528 | 100.0% | 0.0 |
| monster:fight | 1402 | 99.7% | 0.8 |
| disaster:scatter | 1081 | 50.9% | 0.0 |
| boss:spell-strike | 985 | 71.8% | 23.5 |
| shrine:rest | 965 | 100.0% | 0.0 |
| disaster:brace | 823 | 100.0% | 5.4 |
| monster:sneak | 821 | 88.1% | 0.0 |
| treasure:loot | 764 | 81.7% | 0.0 |
| boss:fight | 754 | 73.2% | 23.9 |
| trap:push-through | 754 | 100.0% | 4.7 |
| library:pass-by | 678 | 100.0% | 0.0 |
| shrine:desecrate | 545 | 100.0% | 0.0 |
| trap:spell-bypass | 539 | 100.0% | 0.0 |
| lab:alchemy | 520 | 100.0% | 0.0 |
| materials:pass-by | 491 | 100.0% | 0.0 |
| shrine:pass-by | 473 | 100.0% | 0.0 |
| library:deep-study | 462 | 90.7% | 0.0 |
| trap:search-around | 457 | 98.0% | 0.0 |
| vault:loot | 428 | 73.6% | 0.0 |
| treasure:inspect | 418 | 100.0% | 0.0 |
| trap:disarm | 401 | 85.8% | 0.0 |
| monster:turn-undead | 275 | 91.3% | 0.0 |
| vault:inspect | 236 | 100.0% | 0.0 |
| treasure:knock-open | 196 | 100.0% | 0.0 |
| trap:smoke-bomb | 186 | 100.0% | 0.0 |
| monster:cause-fear | 166 | 100.0% | 0.0 |
| boss:turn-undead | 162 | 80.2% | 0.0 |
| treasure:leave-it | 103 | 100.0% | 0.0 |
| vault:knock-open | 99 | 100.0% | 0.0 |
| boss:bribe | 65 | 100.0% | 0.0 |
| vault:leave-it | 64 | 100.0% | 0.0 |
| corridor:proceed | 48 | 100.0% | 0.0 |
| monster:bribe | 40 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| ogre-king | 92 | 44.6% | 32.7 |
| the-precipitate | 125 | 40.8% | 31.7 |
| forge-tyrant | 89 | 39.3% | 31.7 |
| vampire-lord | 101 | 37.6% | 28.1 |
| glacier-heart | 124 | 37.1% | 25.4 |
| grand-errata | 124 | 29.0% | 25.8 |
| the-bride | 90 | 28.9% | 23.5 |
| the-cauldron | 116 | 28.4% | 24.5 |
| cinder-wyrm | 124 | 26.6% | 22.6 |
| shrouded-king | 90 | 24.4% | 18.8 |
| mad-pyromancer | 126 | 23.8% | 20.5 |
| archivist | 94 | 21.3% | 20.8 |
| mad-alchemist | 107 | 20.6% | 20.6 |
| dragon-whelp | 119 | 16.0% | 20.3 |
| abbot-of-worms | 113 | 13.3% | 15.1 |
| bog-witch | 105 | 12.4% | 17.7 |
| obsidian-golem | 103 | 2.9% | 4.2 |
| wraith | 71 | 1.4% | 1.1 |
| thawed-dead | 77 | 1.3% | 0.5 |
| frost-wisp | 79 | 1.3% | 0.2 |
| root-golem | 102 | 1.0% | 1.0 |
| hungry-ghoul | 111 | 0.9% | 0.4 |
| bone-warden | 121 | 0.8% | 1.0 |
| mutant-vine | 97 | 0.0% | 0.5 |
| potion-rats | 96 | 0.0% | 0.2 |
| sludge-elemental | 88 | 0.0% | 0.8 |
| failed-homunculus | 84 | 0.0% | 0.2 |
| barrow-shade | 105 | 0.0% | 0.4 |
| gelatinous | 94 | 0.0% | 1.3 |
| ink-elemental | 90 | 0.0% | 0.4 |
| spectral-scribe | 59 | 0.0% | 0.7 |
| index-wight | 87 | 0.0% | 0.5 |
| ice-crawler | 118 | 0.0% | 0.3 |
| cinder-imp | 78 | 0.0% | 0.1 |
| cinder-bats | 100 | 0.0% | 0.1 |
| jar-imp | 87 | 0.0% | 0.0 |
| pickled-thing | 69 | 0.0% | 0.2 |
| magma-toad | 90 | 0.0% | 0.7 |
| goblin-gang | 79 | 0.0% | 0.2 |
| pale-hound | 95 | 0.0% | 0.2 |
| rat-swarm | 82 | 0.0% | 0.1 |
| flying-tomes | 84 | 0.0% | 0.0 |
| crimson-mist | 92 | 0.0% | 0.2 |
| bog-toad | 87 | 0.0% | 0.7 |
| salamander | 106 | 0.0% | 0.6 |
| grave-mites | 131 | 0.0% | 0.0 |
| bat-cloud | 118 | 0.0% | 0.0 |
| skeleton | 59 | 0.0% | 0.3 |
| castle-thrall | 75 | 0.0% | 0.6 |
