# Mining Report — 500 tables (2000 games), nightmare

Overall win rate: **96.0%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Gunnhild Half-Door | character | 755 | 11.3 | 98.8% | +4.5 |
| The Mouse | character | 835 | 11.7 | 98.6% | +4.4 |
| Boots of the Quiet Step | equipment | 559 | 12.2 | 98.9% | +4.1 |
| Bandolier of Knives | equipment | 550 | 11.7 | 98.7% | +3.8 |
| Kestrel Quickblade | character | 798 | 11.5 | 98.2% | +3.7 |
| Greatsword of the Vault | equipment | 527 | 12.0 | 98.7% | +3.6 |
| Brand of the Broken Shield | character | 798 | 11.9 | 98.1% | +3.5 |
| Ursula Ironknee | character | 725 | 11.8 | 98.2% | +3.5 |
| Silin the Debt | character | 873 | 12.0 | 97.9% | +3.4 |
| Portable Alembic | equipment | 526 | 12.5 | 98.1% | +2.8 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Cause Fear | spell | 705 | 12.2 | 92.9% | -4.8 |
| Balm of Hours | spell | 673 | 11.6 | 92.9% | -4.7 |
| Melchior the Moth-Eaten | character | 770 | 11.5 | 93.1% | -4.7 |
| Old Yarrow | character | 765 | 12.2 | 93.6% | -3.9 |
| Sylvane of the Nine Candles | character | 782 | 12.0 | 93.7% | -3.7 |
| Firebolt | spell | 683 | 12.8 | 93.6% | -3.7 |
| Feather Step | spell | 680 | 12.6 | 93.7% | -3.5 |
| Aegis of Ash | spell | 701 | 12.1 | 93.7% | -3.5 |
| Chain Lightning | spell | 682 | 12.2 | 94.0% | -3.1 |
| Radiant Lance | spell | 678 | 12.5 | 94.2% | -2.7 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 100 | 98.0% | 8.6 |
| guildmaster | 0.70 | 100 | 100.0% | 8.7 |
| warlord | 0.55 | 100 | 100.0% | 9.7 |
| archmage | 0.50 | 100 | 97.0% | 8.8 |
| novice | 0.15 | 100 | 81.0% | 6.0 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 3 | 1 | 0.0% |
| 4 | 3 | 33.3% |
| 5 | 25 | 64.0% |
| 6 | 44 | 84.1% |
| 7 | 76 | 85.5% |
| 8 | 455 | 93.0% |
| 9 | 715 | 98.6% |
| 10 | 515 | 98.6% |
| 11 | 153 | 99.3% |
| 12 | 13 | 100.0% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 98.1% | 89.5% | +8.7 |
| cleric | 96.6% | 89.9% | +6.7 |
| wizard | 94.9% | 98.3% | -3.3 |
| rogue | 97.7% | 89.8% | +7.9 |
| alchemist | 96.3% | 95.0% | +1.3 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| cunning | 761 | 97.5% | +1.5 |
| scholarly | 740 | 97.0% | +1.0 |
| pious | 758 | 96.4% | +0.4 |
| brave | 733 | 96.3% | +0.3 |
| reckless | 705 | 95.6% | -0.4 |
| greedy | 734 | 95.2% | -0.8 |
| craven | 729 | 94.8% | -1.2 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 43 | 58.1% |
| 1 | 348 | 94.3% |
| 2 | 558 | 97.5% |
| 3 | 594 | 96.5% |
| 4 | 334 | 98.5% |
| 5+ | 123 | 98.4% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| boss:flee | 2201 | 100.0% | 0.0 |
| materials:gather | 2000 | 100.0% | 0.0 |
| monster:flee | 1775 | 100.0% | 0.0 |
| library:study | 1669 | 100.0% | 0.0 |
| monster:spell-strike | 1651 | 100.0% | 0.3 |
| lab:pass-by | 1457 | 100.0% | 0.0 |
| disaster:scatter | 1446 | 6.6% | 0.0 |
| monster:fight | 1423 | 99.9% | 0.6 |
| monster:sneak | 1236 | 77.8% | 0.0 |
| disaster:brace | 1144 | 100.0% | 5.4 |
| shrine:rest | 1005 | 100.0% | 0.0 |
| boss:spell-strike | 995 | 94.7% | 24.5 |
| boss:fight | 753 | 96.9% | 22.9 |
| trap:push-through | 701 | 100.0% | 4.8 |
| lab:alchemy | 675 | 100.0% | 0.0 |
| library:pass-by | 636 | 100.0% | 0.0 |
| library:deep-study | 592 | 83.8% | 0.0 |
| treasure:loot | 573 | 83.4% | 0.0 |
| trap:disarm | 570 | 78.9% | 0.0 |
| shrine:desecrate | 567 | 100.0% | 0.0 |
| trap:spell-bypass | 528 | 100.0% | 0.0 |
| materials:pass-by | 519 | 100.0% | 0.0 |
| shrine:pass-by | 480 | 100.0% | 0.0 |
| trap:search-around | 408 | 95.8% | 0.0 |
| vault:loot | 403 | 71.5% | 0.0 |
| monster:turn-undead | 391 | 83.1% | 0.0 |
| treasure:inspect | 324 | 100.0% | 0.0 |
| trap:smoke-bomb | 277 | 100.0% | 0.0 |
| boss:turn-undead | 232 | 69.0% | 0.0 |
| vault:inspect | 217 | 100.0% | 0.0 |
| treasure:knock-open | 170 | 100.0% | 0.0 |
| vault:knock-open | 116 | 100.0% | 0.0 |
| treasure:leave-it | 83 | 100.0% | 0.0 |
| vault:leave-it | 66 | 100.0% | 0.0 |
| boss:bribe | 52 | 100.0% | 0.0 |
| monster:bribe | 39 | 100.0% | 0.0 |
| corridor:proceed | 8 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| ogre-king | 97 | 13.4% | 39.5 |
| the-precipitate | 128 | 10.9% | 34.5 |
| forge-tyrant | 101 | 7.9% | 32.9 |
| glacier-heart | 139 | 7.9% | 26.5 |
| cinder-wyrm | 121 | 6.6% | 22.6 |
| vampire-lord | 90 | 5.6% | 26.3 |
| dragon-whelp | 128 | 3.9% | 21.0 |
| the-cauldron | 120 | 2.5% | 26.1 |
| archivist | 87 | 2.3% | 17.9 |
| shrouded-king | 99 | 2.0% | 17.1 |
| grand-errata | 131 | 1.5% | 23.4 |
| abbot-of-worms | 86 | 1.2% | 15.7 |
| mad-alchemist | 114 | 0.9% | 17.4 |
| mad-pyromancer | 115 | 0.9% | 19.7 |
| grave-mites | 156 | 0.6% | 0.0 |
| mutant-vine | 106 | 0.0% | 0.4 |
| failed-homunculus | 78 | 0.0% | 0.3 |
| hungry-ghoul | 101 | 0.0% | 0.6 |
| barrow-shade | 106 | 0.0% | 0.1 |
| sludge-elemental | 91 | 0.0% | 0.5 |
| gelatinous | 96 | 0.0% | 0.7 |
| spectral-scribe | 72 | 0.0% | 0.4 |
| frost-wisp | 108 | 0.0% | 0.0 |
| ice-crawler | 114 | 0.0% | 0.1 |
| magma-toad | 93 | 0.0% | 0.5 |
| salamander | 85 | 0.0% | 0.5 |
| bog-witch | 105 | 0.0% | 17.4 |
| cinder-imp | 109 | 0.0% | 0.1 |
| obsidian-golem | 113 | 0.0% | 3.6 |
| cinder-bats | 116 | 0.0% | 0.0 |
| root-golem | 86 | 0.0% | 1.6 |
| bog-toad | 94 | 0.0% | 0.4 |
| pale-hound | 85 | 0.0% | 0.2 |
| castle-thrall | 75 | 0.0% | 0.1 |
| the-bride | 87 | 0.0% | 19.1 |
| wraith | 83 | 0.0% | 0.9 |
| rat-swarm | 91 | 0.0% | 0.0 |
| skeleton | 59 | 0.0% | 0.4 |
| bat-cloud | 104 | 0.0% | 0.0 |
| flying-tomes | 96 | 0.0% | 0.0 |
| thawed-dead | 95 | 0.0% | 0.3 |
| pickled-thing | 75 | 0.0% | 0.3 |
| bone-warden | 103 | 0.0% | 0.4 |
| potion-rats | 81 | 0.0% | 0.0 |
| index-wight | 79 | 0.0% | 0.9 |
| jar-imp | 92 | 0.0% | 0.0 |
| ink-elemental | 93 | 0.0% | 0.1 |
| crimson-mist | 71 | 0.0% | 0.7 |
| goblin-gang | 68 | 0.0% | 0.2 |
