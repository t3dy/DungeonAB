# Mining Report — 700 tables (2800 games), hard

Overall win rate: **71.2%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Haunted Armor | equipment | 827 | 10.5 | 82.0% | +15.3 |
| Winch Hook | equipment | 808 | 12.4 | 81.3% | +14.2 |
| Bandolier of Knives | equipment | 818 | 12.6 | 81.1% | +13.9 |
| Blessed Mace | equipment | 849 | 12.8 | 79.5% | +11.9 |
| Silvered Hand-Mirror | equipment | 860 | 12.8 | 78.8% | +11.0 |
| Everburning Lantern | equipment | 838 | 12.8 | 78.8% | +10.8 |
| Grapple and Line | equipment | 836 | 12.5 | 78.5% | +10.3 |
| Greatsword of the Vault | equipment | 833 | 12.4 | 78.3% | +10.0 |
| Wand of Embers | equipment | 812 | 10.6 | 78.0% | +9.5 |
| Ironwood Prybar | equipment | 774 | 12.3 | 78.0% | +9.4 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Sunder | spell | 788 | 12.3 | 59.4% | -16.5 |
| Kindle | spell | 833 | 12.6 | 61.5% | -13.9 |
| Dancing Light | spell | 783 | 12.4 | 61.3% | -13.8 |
| Old Yarrow | character | 831 | 10.9 | 62.2% | -12.8 |
| Shatter | spell | 799 | 12.2 | 62.5% | -12.3 |
| Mending Word | spell | 842 | 11.3 | 62.7% | -12.2 |
| Eyes of the Mouse | spell | 804 | 12.4 | 62.7% | -12.0 |
| Chain Lightning | spell | 814 | 12.1 | 62.8% | -11.9 |
| Firebolt | spell | 816 | 13.0 | 63.0% | -11.6 |
| Frost Lance | spell | 797 | 12.4 | 63.0% | -11.5 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 77.1% | 4.0 |
| guildmaster | 0.70 | 140 | 74.3% | 4.0 |
| warlord | 0.55 | 140 | 77.1% | 4.0 |
| archmage | 0.50 | 140 | 58.6% | 4.0 |
| novice | 0.15 | 140 | 65.7% | 3.4 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 2 | 12 | 50.0% |
| 3 | 61 | 63.9% |
| 4 | 2727 | 71.5% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 343 | 85.7% | 61 | 47.5% |
| 1 | 348 | 76.4% | 145 | 49.0% |
| 2 | 296 | 84.5% | 193 | 53.4% |
| 3 | 199 | 78.4% | 188 | 52.7% |
| 4 | 149 | 79.2% | 135 | 59.3% |
| 5 | 144 | 77.8% | 102 | 69.6% |
| 6 | 123 | 71.5% | 83 | 61.4% |
| 7 | 109 | 78.9% | 95 | 60.0% |
| 8 | 124 | 71.0% | 115 | 74.8% |
| 9+ | 965 | 55.5% | 1683 | 80.0% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 72.4% | 67.8% | +4.6 |
| cleric | 72.7% | 66.0% | +6.7 |
| wizard | 65.6% | 81.5% | -15.9 |
| rogue | 74.1% | 64.8% | +9.3 |
| alchemist | 70.6% | 72.7% | -2.1 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 805 | 77.4% | +6.2 |
| craven | 870 | 75.1% | +3.8 |
| cunning | 1473 | 74.2% | +3.0 |
| pious | 850 | 72.1% | +0.9 |
| greedy | 875 | 70.4% | -0.8 |
| brave | 848 | 67.8% | -3.4 |
| reckless | 1435 | 65.9% | -5.4 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 225 | 30.2% |
| 1 | 737 | 62.1% |
| 2 | 863 | 72.7% |
| 3 | 608 | 83.7% |
| 4 | 270 | 89.6% |
| 5+ | 97 | 92.8% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| materials:gather | 2048 | 100.0% | 0.0 |
| library:study | 1881 | 100.0% | 0.0 |
| monster:spell-strike | 1637 | 99.9% | 0.0 |
| monster:flee | 1473 | 100.0% | 0.0 |
| monster:fight | 1351 | 99.9% | 1.9 |
| disaster:scatter | 1192 | 49.8% | 0.0 |
| lab:pass-by | 1136 | 100.0% | 0.0 |
| trap:push-through | 1106 | 100.0% | 4.9 |
| shrine:rest | 1027 | 100.0% | 0.0 |
| treasure:loot | 965 | 83.1% | 0.0 |
| monster:sneak | 950 | 88.3% | 0.0 |
| disaster:brace | 909 | 100.0% | 5.4 |
| library:pass-by | 785 | 100.0% | 0.0 |
| boss:spell-strike | 735 | 98.9% | 3.8 |
| boss:flee | 697 | 100.0% | 0.0 |
| shrine:desecrate | 695 | 100.0% | 0.0 |
| lab:alchemy | 665 | 100.0% | 0.0 |
| trap:spell-bypass | 655 | 100.0% | 0.0 |
| boss:fight | 624 | 40.5% | 46.7 |
| disaster:sift-rubble | 620 | 100.0% | 0.0 |
| shrine:pass-by | 618 | 100.0% | 0.0 |
| trap:disarm | 599 | 89.5% | 0.0 |
| materials:pass-by | 574 | 100.0% | 0.0 |
| vault:loot | 569 | 75.0% | 0.0 |
| treasure:inspect | 501 | 100.0% | 0.0 |
| library:deep-study | 457 | 97.4% | 0.0 |
| trap:search-around | 405 | 99.0% | 0.0 |
| library:strip-the-shelves | 352 | 100.0% | 0.0 |
| lab:crack-crates | 352 | 100.0% | 0.0 |
| boss:fight-from-cover | 350 | 62.6% | 35.6 |
| trap:smoke-bomb | 341 | 100.0% | 0.0 |
| library:bless-the-font | 327 | 100.0% | 0.0 |
| boss:shove-into-brazier | 324 | 59.3% | 39.0 |
| vault:inspect | 313 | 100.0% | 0.0 |
| lab:strip-the-shelves | 287 | 100.0% | 0.0 |
| monster:turn-undead | 270 | 88.9% | 0.0 |
| lab:harvest-spout | 269 | 100.0% | 0.0 |
| boss:shove-into-pit | 263 | 64.3% | 35.3 |
| materials:sift-rubble | 244 | 100.0% | 0.0 |
| monster:fight-from-cover | 243 | 100.0% | 0.7 |
| trap:sift-rubble | 217 | 100.0% | 0.0 |
| monster:shove-into-brazier | 215 | 100.0% | 0.4 |
| monster:shove-into-pit | 195 | 100.0% | 0.6 |
| shrine:bless-the-font | 192 | 100.0% | 0.0 |
| treasure:knock-open | 191 | 100.0% | 0.0 |
| materials:crack-crates | 188 | 100.0% | 0.0 |
| boss:drop-portcullis | 177 | 66.7% | 34.1 |
| monster:sift-rubble | 173 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 173 | 100.0% | 0.7 |
| materials:harvest-spout | 169 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 165 | 100.0% | 1.0 |
| library:fill-waterskins | 157 | 100.0% | 0.0 |
| monster:crack-crates | 147 | 100.0% | 0.0 |
| treasure:leave-it | 142 | 100.0% | 0.0 |
| treasure:crack-crates | 129 | 100.0% | 0.0 |
| monster:topple-boulder | 122 | 100.0% | 0.2 |
| vault:knock-open | 117 | 100.0% | 0.0 |
| monster:drop-portcullis | 114 | 100.0% | 0.8 |
| monster:strip-the-shelves | 109 | 100.0% | 0.0 |
| boss:turn-undead | 107 | 81.3% | 0.0 |
| monster:bless-the-font | 105 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 104 | 100.0% | 0.6 |
| vault:leave-it | 102 | 100.0% | 0.0 |
| monster:harvest-spout | 94 | 100.0% | 0.0 |
| shrine:fill-waterskins | 94 | 100.0% | 0.0 |
| lab:work-the-anvil | 93 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 93 | 100.0% | 0.9 |
| monster:bribe | 60 | 100.0% | 0.0 |
| corridor:proceed | 59 | 100.0% | 0.0 |
| monster:fill-waterskins | 56 | 100.0% | 0.0 |
| boss:bribe | 54 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 47 | 100.0% | 1.2 |
| materials:work-the-anvil | 45 | 100.0% | 0.0 |
| monster:work-the-anvil | 42 | 100.0% | 0.0 |
| vault:strip-the-shelves | 34 | 100.0% | 0.0 |
| corridor:bless-the-font | 2 | 100.0% | 0.0 |
| corridor:crack-crates | 2 | 100.0% | 0.0 |
| corridor:harvest-spout | 1 | 100.0% | 0.0 |
| corridor:work-the-anvil | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| forge-tyrant | 81 | 39.5% | 28.8 |
| cinder-wyrm | 93 | 38.7% | 29.0 |
| ogre-king | 77 | 36.4% | 27.8 |
| the-precipitate | 100 | 32.0% | 25.2 |
| mad-pyromancer | 100 | 32.0% | 25.2 |
| vampire-lord | 74 | 28.4% | 22.2 |
| grand-errata | 83 | 27.7% | 22.0 |
| glacier-heart | 98 | 27.6% | 24.1 |
| dragon-whelp | 94 | 26.6% | 24.7 |
| the-cauldron | 87 | 26.4% | 22.0 |
| bog-witch | 80 | 26.3% | 23.4 |
| mad-alchemist | 77 | 24.7% | 22.9 |
| the-bride | 78 | 21.8% | 20.8 |
| archivist | 75 | 21.3% | 18.3 |
| shrouded-king | 89 | 20.2% | 19.7 |
| abbot-of-worms | 73 | 12.3% | 16.6 |
| castle-thrall | 83 | 1.2% | 0.9 |
| magma-toad | 93 | 1.1% | 1.7 |
| rat-swarm | 95 | 0.0% | 0.1 |
| mutant-vine | 99 | 0.0% | 0.7 |
| barrow-shade | 122 | 0.0% | 0.8 |
| bone-warden | 114 | 0.0% | 0.9 |
| hungry-ghoul | 98 | 0.0% | 0.8 |
| potion-rats | 95 | 0.0% | 0.1 |
| failed-homunculus | 77 | 0.0% | 1.0 |
| skeleton | 61 | 0.0% | 1.0 |
| gelatinous | 80 | 0.0% | 1.1 |
| goblin-gang | 66 | 0.0% | 0.7 |
| ink-elemental | 81 | 0.0% | 0.9 |
| ice-crawler | 103 | 0.0% | 0.8 |
| thawed-dead | 72 | 0.0% | 1.4 |
| cinder-imp | 88 | 0.0% | 0.4 |
| cinder-bats | 113 | 0.0% | 0.0 |
| grave-mites | 162 | 0.0% | 0.0 |
| root-golem | 94 | 0.0% | 1.6 |
| obsidian-golem | 88 | 0.0% | 5.2 |
| bat-cloud | 110 | 0.0% | 0.1 |
| wraith | 72 | 0.0% | 0.5 |
| pale-hound | 102 | 0.0% | 1.2 |
| flying-tomes | 90 | 0.0% | 0.0 |
| salamander | 90 | 0.0% | 1.4 |
| bog-toad | 79 | 0.0% | 1.0 |
| jar-imp | 85 | 0.0% | 0.1 |
| spectral-scribe | 62 | 0.0% | 1.2 |
| index-wight | 86 | 0.0% | 1.8 |
| frost-wisp | 76 | 0.0% | 0.1 |
| crimson-mist | 113 | 0.0% | 1.1 |
| sludge-elemental | 73 | 0.0% | 1.3 |
| pickled-thing | 66 | 0.0% | 0.8 |
