/**
 * Drops — what the dead leave behind, in one inspectable place
 *
 * The Bestiary says what a monster is *like*; the drops table says
 * what it's *worth*. Every monster the party actually defeats leaves
 * a signature trophy — never bare coin-and-walk-away. Kinds without
 * an entry fall back by trait, and everything falls back to a generic
 * trophy, so content packs can't create a monster that drops nothing.
 *
 * Drop effects (each reuses an existing party mechanic):
 *   trinket   — auto-assigned equipment with a small stat bonus
 *   coating   — a weapon mod for the hardest hitter (element/venom)
 *   potion    — into the satchel; quaffed when someone's in trouble
 *   materials — alchemy ingredients for the next lab bench
 *   scroll    — a spell into the shared grimoire
 *   gold      — some things only carry what they took from others
 */

const DROPS = {
  // the Old Delve
  'rat-swarm': { effect: 'trinket', name: 'the rat-king\'s knot', icon: '🐀', bonus: { mind: 1 }, text: 'Deep in the tangle: a knot of nine tails, braided by no human hand. Whoever pockets it starts noticing the exits.' },
  'skeleton': { effect: 'trinket', name: 'a femur of surprising balance', icon: '🦴', bonus: { attack: 1 }, text: 'One femur survives the collapse, weighted like it was made for swinging. Perhaps by now it was.' },
  'goblin-gang': { effect: 'gold', name: 'the toll-purse', icon: '💰', gold: 15, text: 'The toll-purse, fat with every honest traveler\'s coin the gang ever squeezed. Repossessed.' },
  'gelatinous': { effect: 'potion', name: 'a jar of restorative ooze', icon: '🫙', potion: { kind: 'restorative-ooze', heal: 6 }, text: 'The clear stuff from its middle, scooped and jarred. Wounds close under it; nobody watches while they do.' },
  'wraith': { effect: 'trinket', name: 'a grave-cold ribbon', icon: '🎗️', bonus: { defense: 1 }, text: 'Where it fell: a ribbon cold as the underside of a stone. Worn at the wrist, blades slide half an inch wide.' },
  'dragon-whelp': { effect: 'coating', name: 'a vial of whelp-fire', icon: '🔥', mod: { name: 'whelp-fire coating', attack: 2, element: 'fire' }, text: 'The fire-gland, drained into a vial with very steady hands. Painted on steel, it remembers what it was for.' },
  'ogre-king': { effect: 'trinket', name: 'the Ogre King\'s smallest crown', icon: '👑', bonus: { defense: 2 }, text: 'The smallest of his stacked crowns fits a human head. It has stopped one axe already — the notch proves it.' },

  // the Ancient Crypt
  'bone-warden': { effect: 'trinket', name: 'a pauldron of century bone', icon: '🦴', bonus: { defense: 1 }, text: 'Its shoulder-piece outlived the rest of it: bone gone hard as kiln brick, straps still good.' },
  'grave-mites': { effect: 'materials', name: 'a handful of grave-amber', icon: '🟠', count: 2, text: 'The mites\' castings, hardened to amber. Herbalists grind it into everything and apologize for nothing.' },
  'barrow-shade': { effect: 'scroll', name: 'the shade\'s last words', icon: '📜', spell: { name: 'Barrow Chill', icon: '❄️', school: 'necromantic', power: 4, use: 'combat', element: 'frost', text: 'Copied from the air where a shade stopped being.' }, text: 'As it thins away it leaves the words it was made from, hanging in the air just long enough to copy.' },
  'hungry-ghoul': { effect: 'coating', name: 'a ghoul\'s paralytic gland', icon: '🐍', mod: { name: 'ghoul-gland venom', attack: 2, venom: true }, text: 'The gland behind its jaw, excised carefully. What slowed its dinners will slow yours.' },
  'shrouded-king': { effect: 'trinket', name: 'the Shroud itself', icon: '👻', bonus: { mind: 2 }, text: 'Folded, the Shroud is only cloth. Worn over the shoulders, it whispers everything dead courtiers noticed.' },
  'abbot-of-worms': { effect: 'scroll', name: 'the Abbot\'s last sermon', icon: '📖', spell: { name: 'Final Benediction', icon: '✨', school: 'liturgical', power: 5, use: 'combat', element: 'holy', text: 'The closing lines of a sermon preached far too long.' }, text: 'His sermon-book is worm-eaten to lace, but the closing benediction survives — and it burns to be said aloud.' },

  // the Cinder Galleries
  'salamander': { effect: 'coating', name: 'a salamander gland', icon: '🦎', mod: { name: 'salamander-gland coating', attack: 2, element: 'fire' }, text: 'The heat-gland comes free whole, still warm. Brushed on a blade, it holds a slow orange smolder.' },
  'cinder-bats': { effect: 'materials', name: 'a pouch of wing-ash', icon: '🦇', count: 2, text: 'Their wings burn down to a fine bright ash the alchemists call phoenix-meal. Two good pinches.' },
  'magma-toad': { effect: 'potion', name: 'a tin of toad-balm', icon: '🧴', potion: { kind: 'toad-balm', heal: 8 }, text: 'The cooling mud off its back, scraped into a tin. It sets warm on a wound and takes the pain with it.' },
  'obsidian-golem': { effect: 'trinket', name: 'an obsidian heart-shard', icon: '🗿', bonus: { defense: 1 }, text: 'A shard off its heart, glass-black and heavier than it looks. Carried close, it takes the edge off a blow.' },
  'cinder-wyrm': { effect: 'coating', name: 'wyrm-fire, bottled', icon: '🐉', mod: { name: 'wyrm-fire coating', attack: 3, element: 'fire' }, text: 'What ran in its veins fills three fingers of a vial. It has not cooled. It is not going to.' },
  'forge-tyrant': { effect: 'trinket', name: 'the Tyrant\'s hammer-head', icon: '🔨', bonus: { attack: 2 }, text: 'The haft burned away with its owner; the head is good metal with standing opinions about being swung.' },

  // the Drowned Athenaeum
  'flying-tomes': { effect: 'scroll', name: 'a page that surrendered', icon: '📄', spell: { name: 'Loose Page', icon: '📄', school: 'found', power: 3, use: 'utility', text: 'A complete working in a fair hand. Finders keepers.' }, text: 'One page breaks formation and glides down: a working, complete, in a fair hand. Finders keepers.' },
  'ink-elemental': { effect: 'materials', name: 'a flask of living ink', icon: '🫧', count: 2, text: 'It settles into the flask willingly, as if it had somewhere worse to be. Alchemists thin it into everything.' },
  'spectral-scribe': { effect: 'trinket', name: 'the scribe\'s quill', icon: '🪶', bonus: { mind: 1 }, text: 'The quill outlasts the hand. It corrects the spelling in whatever pocket it rides in.' },
  'index-wight': { effect: 'trinket', name: 'the master index card', icon: '🗂️', bonus: { mind: 1 }, text: 'Its filing card, still legible: a system for finding anything. Reading it reorganizes you, slightly.' },
  'archivist': { effect: 'scroll', name: 'the Restricted Folio', icon: '📕', spell: { name: 'Restricted Working', icon: '📕', school: 'forbidden', power: 6, use: 'combat', text: 'Nobody was cleared to read this. The margins alone are a weapon.' }, text: 'From under the Archivist\'s arm: the folio no one was ever cleared to read. The margins alone are a weapon.' },
  'grand-errata': { effect: 'trinket', name: 'the dearest correction', icon: '📝', bonus: { mind: 2 }, text: 'The correction slip it guarded most jealously. Whoever carries it is right slightly more often. Measurably.' },

  // the Mad Alchemist's Dungeon
  'sludge-elemental': { effect: 'materials', name: 'reclaimed reagents', icon: '🟢', count: 2, text: 'Half its body was unreacted reagent. Strained through a shirt: two measures, still potent, barely angry.' },
  'potion-rats': { effect: 'potion', name: 'a rat-warmed elixir', icon: '🐀', potion: { kind: 'rat-warmed-elixir', heal: 6 }, text: 'One rat glowed a steadier green than the rest. The vial it swallowed is intact, and it is a healing draught.' },
  'mutant-vine': { effect: 'materials', name: 'clipped mutant cuttings', icon: '🌿', count: 2, text: 'Cuttings, taken with respect and long tongs. They keep trying to grow. Alchemists love that in an ingredient.' },
  'failed-homunculus': { effect: 'trinket', name: 'the homunculus\'s notes', icon: '🧪', bonus: { mind: 1 }, text: 'It kept notes on its own failure, in tiny meticulous handwriting. Peer review would have been kinder.' },
  'mad-alchemist': { effect: 'potion', name: 'the masterwork draught', icon: '⚗️', potion: { kind: 'masterwork-draught', heal: 12 }, text: 'His belt holds one flask he never dared drink: the masterwork. It is exactly as good as he feared it was.' },
  'the-precipitate': { effect: 'materials', name: 'a core of pure precipitate', icon: '🫠', count: 4, text: 'At its center, everything the drains refused had refined itself pure. Four measures, humming faintly.' },

  // the Castle of the Vampire Lord
  'castle-thrall': { effect: 'gold', name: 'the footman\'s wages', icon: '🪙', gold: 12, text: 'His pockets hold a lifetime of unspent wages in old silver. Bloodless, but it spends.' },
  'bat-cloud': { effect: 'materials', name: 'a sheaf of wing-leather', icon: '🦇', count: 1, text: 'Enough fine wing-leather to interest a bookbinder or an alchemist. The party happens to know one of those.' },
  'pale-hound': { effect: 'trinket', name: 'the red velvet collar', icon: '🐺', bonus: { attack: 1 }, text: 'The velvet collar, worked with a name nobody can read. Wearing it lends the wearer the hound\'s certainty.' },
  'crimson-mist': { effect: 'potion', name: 'a phial of settled red', icon: '🌫️', potion: { kind: 'settled-red', heal: 8 }, text: 'What settles out of the mist is best not examined. In a phial it keeps, and it closes wounds like it owes them.' },
  'vampire-lord': { effect: 'trinket', name: 'the Lord\'s signet', icon: '💍', bonus: { mind: 2 }, text: 'His signet ring, older than the castle around it. Doors of good breeding still answer to it.' },
  'the-bride': { effect: 'trinket', name: 'the Bride\'s veil', icon: '👰', bonus: { defense: 2 }, text: 'The veil is older than the Lord and stronger than mail. It has been widowed before and expects to be again.' },

  // the Root Cellar of the Bog Witch
  'jar-imp': { effect: 'trinket', name: 'the imp\'s jar', icon: '🫙', bonus: { mind: 1 }, text: 'The jar that held it, unbroken. Things put inside it stay put — including, faintly, luck.' },
  'pickled-thing': { effect: 'potion', name: 'the pickling liquor', icon: '🥒', potion: { kind: 'pickling-liquor', heal: 6 }, text: 'The brine that kept it lively for a century. One cup, taken nose-shut, mends whatever it touches on the way down.' },
  'root-golem': { effect: 'materials', name: 'a length of heartroot', icon: '🌳', count: 3, text: 'The taproot at its core is heartroot — pound for pound the best base reagent the bog has ever grown.' },
  'bog-toad': { effect: 'coating', name: 'bog-toad milk', icon: '🐸', mod: { name: 'bog-toad milk', attack: 2, venom: true }, text: 'Milked in the traditional way, which nobody discusses. On a blade it makes shallow cuts decisive.' },
  'bog-witch': { effect: 'scroll', name: 'the Witch\'s receipt-book', icon: '🍲', spell: { name: 'the Witch\'s Receipt', icon: '🍲', school: 'kitchen', power: 5, use: 'utility', text: 'Most of her pages were soup. This one is not, and it works.' }, text: 'Her receipt-book, dinner-stained. Most pages are soup. One page is not soup, and it works.' },
  'the-cauldron': { effect: 'potion', name: 'a ladle of the last soup', icon: '🍲', potion: { kind: 'last-soup', heal: 12 }, text: 'What the Cauldron wanted, it seems, was to be wanted. Its final simmer is a mending broth of genuine quality.' },

  // the Ice Caverns of the Mad Pyromancer
  'frost-wisp': { effect: 'coating', name: 'a pinch of wisp-rime', icon: '❄️', mod: { name: 'wisp-rime coating', attack: 2, element: 'frost' }, text: 'The rime it left behind never quite melts. Rubbed along an edge, the metal drinks the cold and keeps it.' },
  'ice-crawler': { effect: 'trinket', name: 'pick-leg greaves', icon: '🕷️', bonus: { defense: 1 }, text: 'Two of its legs, lashed on as shin-guards. Ugly, chitinous, and better than what the front rank had.' },
  'thawed-dead': { effect: 'gold', name: 'a frozen soldier\'s pay', icon: '🪙', gold: 10, text: 'His pay-purse thaws slower than he did. Old coin, honest weight, no further use to the previous owner.' },
  'cinder-imp': { effect: 'coating', name: 'the imp\'s spark', icon: '🔥', mod: { name: 'imp-spark coating', attack: 2, element: 'fire' }, text: 'The spark it wore like a heart goes into a tinderbox willingly. Painted thin, it makes steel argue hotter.' },
  'mad-pyromancer': { effect: 'scroll', name: 'the Exile\'s Working', icon: '🔥', spell: { name: 'the Exile\'s Working', icon: '🔥', school: 'forbidden', power: 6, use: 'combat', element: 'fire', text: 'Exactly as illegal as advertised.' }, text: 'The working that got him exiled, folded eight times against his chest. It is exactly as illegal as advertised.' },
  'glacier-heart': { effect: 'trinket', name: 'a splinter of the Heart', icon: '💠', bonus: { defense: 2 }, text: 'A splinter of the Heart, already frosting the pocket it rides in. Blows land on the wearer like they had second thoughts.' },
};

/**
 * Trait fallbacks: a kind without a signature drop still leaves
 * something its nature explains. Texts may use {monster}.
 */
const TRAIT_DROPS = {
  swarm: { effect: 'materials', name: 'a residue of the swarm', icon: '🧫', count: 1, text: 'What {monster} leaves behind scrapes up into a measure of the residue alchemists are always asking about.' },
  armored: { effect: 'trinket', name: 'a plate of scavenged armor', icon: '🛡️', bonus: { defense: 1 }, text: 'A plate off {monster} comes away intact, and the straps of the last owner\'s gear fit it well enough.' },
  ethereal: { effect: 'materials', name: 'a wisp of ectoplasm', icon: '👻', count: 1, text: 'Where {monster} stopped being, something silver settles into the jar. The alchemists have a word for it and a price.' },
  venomous: { effect: 'coating', name: 'a harvested venom sac', icon: '🐍', mod: { name: 'harvested venom', attack: 1, venom: true }, text: 'The venom sac of {monster}, drawn whole. Its grudge outlives it, and now works for the party.' },
  slow: { effect: 'trinket', name: 'a ponderous hide', icon: '🥾', bonus: { defense: 1 }, text: 'The hide of {monster} cuts into something between a cloak and a wall. Slower now, but so is everything hitting you.' },
};

/** No monster drops nothing — the floor under every fallback. */
const GENERIC_DROP = {
  effect: 'trinket', name: 'a trophy of the kill', icon: '🏆', bonus: { attack: 1 },
  text: 'Cut from {monster}: a trophy with enough menace left in it to lend some. The chroniclers will want to sketch it.',
};

/** Content packs register signature drops for their own kinds (DLC). */
export function registerDrops(map) {
  Object.assign(DROPS, map);
}

/**
 * The drop a defeated monster leaves. Always returns one:
 * signature by kind, else by trait, else the generic trophy.
 * Pure — nothing is applied to the party here.
 */
export function dropFor(monster) {
  return DROPS[monster?.kind] || TRAIT_DROPS[monster?.trait] || GENERIC_DROP;
}

let dropCounter = 0;

/**
 * Apply a defeated monster's drop to the party and return a
 * chronicle entry ({ source, find, drop, text }) for the narration.
 * Mutates the party the same way the loot tables do.
 */
export function claimDrop(party, monster) {
  const drop = dropFor(monster);
  dropCounter++;

  switch (drop.effect) {
    case 'trinket':
      party.assignEquipment({
        id: `drop-${monster?.kind || 'unknown'}-${dropCounter}`, type: 'equipment',
        name: drop.name, icon: drop.icon, slot: 'trinket', bonus: { ...drop.bonus }, bestFor: null,
        text: drop.text,
      });
      break;
    case 'coating': {
      // Onto the hardest hitter's blade, like the alchemist's bench
      const striker = party.living().reduce((a, b) => a.attack >= b.attack ? a : b);
      striker.addWeaponMod({ ...drop.mod });
      break;
    }
    case 'potion':
      party.potions.push({ ...drop.potion });
      break;
    case 'materials':
      party.materials += drop.count;
      break;
    case 'scroll':
      party.grimoire.push({ ...drop.spell, id: `drop-${monster?.kind || 'unknown'}-${dropCounter}` });
      break;
    case 'gold':
      party.addGold(drop.gold);
      break;
  }

  const text = drop.text.replace('{monster}', monster?.name || 'the fallen thing');
  return {
    source: drop.name,
    find: 'drop',
    drop: { name: drop.name, icon: drop.icon, effect: drop.effect },
    text: `${drop.icon} ${text}`,
  };
}

/** For tests and the writing: the effect vocabulary. */
export const DROP_EFFECTS = ['trinket', 'coating', 'potion', 'materials', 'scroll', 'gold'];
