# Mining Report — 700 tables (2800 games), hard

Overall win rate: **70.5%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Everburning Lantern | equipment | 947 | 11.0 | 82.7% | +18.4 |
| Eyes of the Mouse | spell | 950 | 10.8 | 78.1% | +11.5 |
| Dancing Light | spell | 908 | 10.7 | 77.0% | +9.6 |
| Quicksilver Daggers | equipment | 881 | 13.0 | 76.4% | +8.6 |
| The Scholarly | personality | 807 | 16.1 | 76.0% | +7.7 |
| Blessed Mace | equipment | 883 | 12.9 | 75.0% | +6.5 |
| Silin the Debt | character | 867 | 10.8 | 74.9% | +6.3 |
| Aegis of Ash | spell | 879 | 13.1 | 74.6% | +6.0 |
| Haunted Armor | equipment | 849 | 10.7 | 73.9% | +4.8 |
| Winch Hook | equipment | 857 | 12.7 | 73.5% | +4.3 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| The Reckless | personality | 797 | 15.9 | 64.6% | -8.2 |
| Melchior the Moth-Eaten | character | 848 | 10.4 | 65.0% | -7.9 |
| Old Yarrow | character | 800 | 10.5 | 65.1% | -7.5 |
| Chain Lightning | spell | 868 | 12.5 | 66.0% | -6.5 |
| Feather Step | spell | 842 | 12.6 | 66.5% | -5.7 |
| Kestrel Quickblade | character | 848 | 10.4 | 67.5% | -4.4 |
| Sunder | spell | 833 | 12.6 | 67.7% | -4.0 |
| Grimoire of Low Whispers | equipment | 889 | 13.0 | 67.8% | -3.9 |
| Purify the Font | spell | 829 | 12.2 | 67.8% | -3.8 |
| Radiant Lance | spell | 882 | 12.9 | 67.9% | -3.8 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 81.4% | 4.0 |
| guildmaster | 0.70 | 140 | 67.9% | 4.0 |
| warlord | 0.55 | 140 | 77.1% | 4.0 |
| archmage | 0.50 | 140 | 66.4% | 4.0 |
| novice | 0.15 | 140 | 55.7% | 3.2 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 1 | 0.0% |
| 2 | 19 | 42.1% |
| 3 | 67 | 49.3% |
| 4 | 2713 | 71.2% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | — | — | — | — |
| 1 | 114 | 65.8% | — | — |
| 2 | 208 | 63.9% | — | — |
| 3 | 218 | 78.0% | 32 | 46.9% |
| 4 | 321 | 79.1% | 113 | 65.5% |
| 5 | 394 | 76.1% | 200 | 64.0% |
| 6 | 359 | 72.4% | 219 | 66.7% |
| 7 | 253 | 71.5% | 212 | 72.2% |
| 8 | 243 | 65.8% | 243 | 63.0% |
| 9+ | 664 | 63.9% | 1771 | 73.5% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 69.6% | 72.8% | -3.2 |
| cleric | 71.9% | 65.4% | +6.4 |
| wizard | 67.8% | 74.9% | -7.1 |
| rogue | 72.8% | 65.5% | +7.3 |
| alchemist | 70.6% | 70.3% | +0.2 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 807 | 76.0% | +5.5 |
| craven | 870 | 73.0% | +2.5 |
| pious | 849 | 71.5% | +1.0 |
| cunning | 1470 | 71.4% | +0.9 |
| greedy | 874 | 68.4% | -2.1 |
| brave | 851 | 68.2% | -2.3 |
| reckless | 1432 | 67.1% | -3.4 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 201 | 24.4% |
| 1 | 732 | 60.7% |
| 2 | 898 | 72.3% |
| 3 | 623 | 83.6% |
| 4 | 254 | 88.6% |
| 5+ | 92 | 93.5% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| materials:gather | 2023 | 100.0% | 0.0 |
| library:study | 1902 | 100.0% | 0.0 |
| monster:spell-strike | 1735 | 99.8% | 0.0 |
| monster:fight | 1321 | 99.6% | 1.1 |
| monster:flee | 1158 | 100.0% | 0.0 |
| lab:pass-by | 1155 | 100.0% | 0.0 |
| disaster:scatter | 1109 | 48.5% | 0.0 |
| trap:push-through | 1070 | 100.0% | 4.9 |
| shrine:rest | 1054 | 100.0% | 0.0 |
| disaster:brace | 986 | 100.0% | 5.4 |
| treasure:loot | 917 | 84.2% | 0.0 |
| monster:sneak | 873 | 89.6% | 0.0 |
| boss:spell-strike | 794 | 96.3% | 2.5 |
| trap:spell-bypass | 731 | 100.0% | 0.0 |
| library:pass-by | 723 | 100.0% | 0.0 |
| shrine:desecrate | 711 | 100.0% | 0.0 |
| lab:alchemy | 651 | 100.0% | 0.0 |
| disaster:sift-rubble | 648 | 100.0% | 0.0 |
| boss:flee | 622 | 100.0% | 0.0 |
| shrine:pass-by | 576 | 100.0% | 0.0 |
| materials:pass-by | 572 | 100.0% | 0.0 |
| trap:disarm | 548 | 92.7% | 0.0 |
| vault:loot | 544 | 72.6% | 0.0 |
| library:deep-study | 498 | 98.8% | 0.0 |
| boss:fight | 495 | 47.7% | 40.6 |
| treasure:inspect | 465 | 100.0% | 0.0 |
| trap:search-around | 385 | 97.9% | 0.0 |
| lab:crack-crates | 366 | 100.0% | 0.0 |
| library:bless-the-font | 358 | 100.0% | 0.0 |
| trap:smoke-bomb | 346 | 100.0% | 0.0 |
| library:strip-the-shelves | 330 | 100.0% | 0.0 |
| boss:fight-from-cover | 320 | 67.5% | 30.0 |
| vault:inspect | 297 | 100.0% | 0.0 |
| boss:shove-into-brazier | 290 | 62.4% | 29.5 |
| lab:strip-the-shelves | 259 | 100.0% | 0.0 |
| lab:harvest-spout | 259 | 100.0% | 0.0 |
| boss:shove-into-pit | 258 | 64.7% | 32.6 |
| monster:turn-undead | 254 | 91.7% | 0.0 |
| trap:sift-rubble | 243 | 100.0% | 0.0 |
| treasure:knock-open | 237 | 100.0% | 0.0 |
| materials:sift-rubble | 225 | 100.0% | 0.0 |
| monster:fight-from-cover | 222 | 100.0% | 0.3 |
| materials:crack-crates | 197 | 100.0% | 0.0 |
| monster:shove-into-brazier | 193 | 99.0% | 0.2 |
| shrine:bless-the-font | 184 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 183 | 100.0% | 0.7 |
| monster:shove-into-pit | 182 | 100.0% | 0.2 |
| library:fill-waterskins | 178 | 100.0% | 0.0 |
| boss:drop-portcullis | 176 | 75.0% | 27.6 |
| materials:harvest-spout | 164 | 100.0% | 0.0 |
| treasure:leave-it | 152 | 100.0% | 0.0 |
| monster:crack-crates | 148 | 100.0% | 0.0 |
| monster:sift-rubble | 146 | 100.0% | 0.0 |
| vault:knock-open | 139 | 100.0% | 0.0 |
| monster:drop-portcullis | 136 | 100.0% | 0.1 |
| boss:pry-sarcophagus | 134 | 100.0% | 0.8 |
| treasure:crack-crates | 123 | 100.0% | 0.0 |
| monster:strip-the-shelves | 112 | 100.0% | 0.0 |
| monster:topple-boulder | 110 | 100.0% | 0.1 |
| monster:bless-the-font | 104 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 102 | 100.0% | 0.7 |
| lab:work-the-anvil | 94 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 94 | 100.0% | 0.9 |
| boss:turn-undead | 93 | 86.0% | 0.0 |
| shrine:fill-waterskins | 86 | 100.0% | 0.0 |
| vault:leave-it | 86 | 100.0% | 0.0 |
| monster:cause-fear | 84 | 100.0% | 0.0 |
| monster:harvest-spout | 83 | 100.0% | 0.0 |
| boss:dark | 83 | 97.6% | 0.0 |
| corridor:proceed | 59 | 100.0% | 0.0 |
| boss:bribe | 57 | 100.0% | 0.0 |
| materials:work-the-anvil | 53 | 100.0% | 0.0 |
| monster:fill-waterskins | 52 | 100.0% | 0.0 |
| monster:bribe | 47 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 46 | 100.0% | 0.8 |
| monster:work-the-anvil | 44 | 100.0% | 0.0 |
| vault:strip-the-shelves | 38 | 100.0% | 0.0 |
| monster:dark | 23 | 95.7% | 0.2 |
| lab:dark | 10 | 100.0% | 0.0 |
| library:dark | 8 | 100.0% | 0.6 |
| vault:dark | 5 | 100.0% | 0.0 |
| shrine:dark | 4 | 75.0% | 0.0 |
| treasure:dark | 4 | 100.0% | 0.0 |
| disaster:dark | 4 | 75.0% | 0.0 |
| materials:dark | 3 | 100.0% | 7.3 |
| trap:dark | 3 | 100.0% | 0.0 |
| corridor:crack-crates | 3 | 100.0% | 0.0 |
| corridor:fill-waterskins | 2 | 100.0% | 0.0 |
| corridor:bless-the-font | 2 | 100.0% | 0.0 |
| corridor:work-the-anvil | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| forge-tyrant | 62 | 32.3% | 16.7 |
| cinder-wyrm | 86 | 31.4% | 23.8 |
| ogre-king | 67 | 26.9% | 20.6 |
| the-precipitate | 102 | 25.5% | 18.9 |
| mad-pyromancer | 91 | 25.3% | 16.8 |
| bog-witch | 59 | 23.7% | 20.5 |
| dragon-whelp | 93 | 23.7% | 16.7 |
| grand-errata | 87 | 23.0% | 17.0 |
| glacier-heart | 95 | 21.1% | 14.7 |
| mad-alchemist | 78 | 20.5% | 16.3 |
| the-cauldron | 74 | 20.3% | 15.1 |
| archivist | 81 | 19.8% | 16.6 |
| abbot-of-worms | 75 | 17.3% | 14.9 |
| the-bride | 75 | 17.3% | 17.3 |
| vampire-lord | 77 | 16.9% | 17.7 |
| shrouded-king | 87 | 13.8% | 11.8 |
| spectral-scribe | 67 | 1.5% | 1.0 |
| wraith | 71 | 1.4% | 0.5 |
| pickled-thing | 76 | 1.3% | 0.7 |
| ink-elemental | 81 | 1.2% | 0.3 |
| root-golem | 96 | 1.0% | 1.2 |
| mutant-vine | 96 | 1.0% | 0.5 |
| ice-crawler | 114 | 0.9% | 0.3 |
| bone-warden | 118 | 0.8% | 0.6 |
| barrow-shade | 133 | 0.0% | 0.5 |
| hungry-ghoul | 105 | 0.0% | 0.7 |
| failed-homunculus | 89 | 0.0% | 0.2 |
| skeleton | 77 | 0.0% | 0.2 |
| goblin-gang | 76 | 0.0% | 0.2 |
| cinder-bats | 122 | 0.0% | 0.0 |
| thawed-dead | 81 | 0.0% | 0.6 |
| grave-mites | 141 | 0.0% | 0.0 |
| magma-toad | 81 | 0.0% | 1.0 |
| bog-toad | 74 | 0.0% | 1.1 |
| crimson-mist | 101 | 0.0% | 0.3 |
| bat-cloud | 114 | 0.0% | 0.0 |
| potion-rats | 90 | 0.0% | 0.0 |
| gelatinous | 76 | 0.0% | 0.6 |
| pale-hound | 106 | 0.0% | 0.5 |
| cinder-imp | 96 | 0.0% | 0.2 |
| flying-tomes | 96 | 0.0% | 0.1 |
| salamander | 88 | 0.0% | 0.8 |
| obsidian-golem | 95 | 0.0% | 2.0 |
| jar-imp | 80 | 0.0% | 0.0 |
| sludge-elemental | 83 | 0.0% | 0.7 |
| castle-thrall | 77 | 0.0% | 0.6 |
| frost-wisp | 71 | 0.0% | 0.0 |
| index-wight | 73 | 0.0% | 0.8 |
| rat-swarm | 112 | 0.0% | 0.0 |
