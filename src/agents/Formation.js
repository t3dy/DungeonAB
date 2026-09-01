/**
 * Formation — where the party stands, and what the room allows
 *
 * The renderer has always drawn a party as two ranks with the fighters
 * forward, and `Party.takeDamage` has always sent blows to the fighters
 * first. So position was already half-real: visible, and quietly
 * mechanical, but never a decision anybody made.
 *
 * This makes it one, and ties it to the thing rooms already have and
 * nothing yet used — their **shape**. A passage six tiles by two cannot
 * hold a line abreast; a boss cavern fourteen by eleven can hold
 * anything. So the room decides what is on the menu, and the party
 * decides from that menu. Two systems that already existed, meeting.
 *
 * The trade in every formation is the same one a real fight has: how
 * many of you can reach the enemy, against how many of you it can
 * reach. A column brings one blade and takes one blade. A wedge brings
 * everything and takes everything.
 */

/** How much floor a formation needs, in tiles. */
const fits = (room, minWide, minArea = 0) => {
  const w = room?.w ?? 6;
  const h = room?.h ?? 6;
  const wide = Math.min(w, h);      // the narrow dimension is the constraint
  return wide >= minWide && w * h >= minArea;
};

/**
 * The formations, in the order a party considers them.
 *
 * `frontage` is how many can swing at once — the corridor-fight rule
 * this game has had since the party cap, now made spatial.
 */
export const FORMATIONS = {
  column: {
    id: 'column', name: 'Column', icon: '⏸️',
    fits: () => true,                        // you can always file up
    frontage: 1,
    incomingMult: 0.55,                      // only one thing can reach you
    attackMult: 1,                           // the frontage already costs the swing
    flanking: false,
    areaShare: 0.8,
    tell: room => `The ${room} is too tight to spread out: the party files up, one blade forward.`,
    effect: 'One blade forward and one thing able to reach it: nearly half the damage a round, and only the front rank swinging.',
  },
  line: {
    id: 'line', name: 'Line', icon: '➖',
    fits: room => fits(room, 4),
    frontage: 2,
    incomingMult: 1,
    attackMult: 1,
    flanking: true,
    areaShare: 1,
    tell: () => 'The party spreads into a line, two forward and two behind.',
    effect: 'The ordinary shape of a fight, and the one that leaves room to work round the sides.',
  },
  shieldwall: {
    id: 'shieldwall', name: 'Shield Wall', icon: '🛡️',
    fits: room => fits(room, 4),
    frontage: 2,
    incomingMult: 0.7,
    attackMult: 0.75,
    flanking: false,
    areaShare: 1.25,                         // packed tight; a blast catches everyone
    tell: () => 'Shields lock along the front rank and the party stops trying to win quickly.',
    effect: 'A third less damage a round and a quarter less dealt — but packed tight, so anything with a blast radius hurts more.',
  },
  wedge: {
    id: 'wedge', name: 'Wedge', icon: '🔺',
    fits: room => fits(room, 5, 30),
    frontage: 3,
    incomingMult: 1.3,
    attackMult: 1.2,
    flanking: true,
    areaShare: 1,
    tell: () => 'The party drives in as a wedge, everything committed forward.',
    effect: 'A fifth more damage dealt, a third more taken, and three of them swinging instead of two.',
  },
  loose: {
    id: 'loose', name: 'Loose Order', icon: '🌐',
    fits: room => fits(room, 6, 48),
    frontage: 2,
    incomingMult: 0.85,
    attackMult: 0.85,
    flanking: false,
    areaShare: 0.5,                          // spread out; a blast finds one of you
    tell: room => `There is room enough in the ${room} to fight spread out, well apart.`,
    effect: 'A little less given and a little less taken, and only half of any blast reaches the party.',
  },
};

/*
 * Modifiers are proportional rather than flat, and that is the whole
 * reason this reads as a set of choices instead of one right answer.
 *
 * Measured with flat numbers: incoming runs about 5 a round and a
 * party's swing about 20, so "-2 damage taken, -2 damage dealt" is a
 * 40% defensive gain for a 10% offensive cost. Shield Wall strictly
 * dominated a plain Line, which made the baseline formation the worst
 * thing a party could stand in. Percentages cost what they look like
 * they cost.
 */

export const FORMATION_IDS = Object.keys(FORMATIONS);

/** Which formations this room's floor actually permits. */
export function availableFormations(room) {
  return FORMATION_IDS.filter(id => FORMATIONS[id].fits(room));
}

/**
 * What the party chooses, given the room, the foe and its own temper.
 *
 * Weighted rather than optimal: this is the same deliberation the rest
 * of the game runs on, and a Reckless party committing to a wedge
 * against something that will kill them for it is a story.
 */
export function chooseFormation(party, room, rng = Math.random) {
  // A room that does not describe its own shape cannot constrain where
  // anyone stands, so the party takes the ordinary shape of a fight.
  //
  // This matters well beyond tidiness: formation scales incoming damage
  // by up to a third either way, which is larger than most of the
  // effects the test suite measures. A randomly chosen formation in a
  // geometry-less fixture turned four separate comparisons into
  // comparisons against the dice.
  if (!room || !room.w || !room.h) return 'line';

  const options = availableFormations(room);
  const weights = {};
  for (const id of options) weights[id] = 1;

  // Filing up is the right answer to a doorway and the wrong answer to
  // an open floor: at frontage 1 a column never killed anything in a
  // cavern across sixty measured fights. It stays available -- holding a
  // door is a real thing to do when you are nearly dead -- but it stops
  // being a coin-flip the party might just land on.
  const hurt = party.living().length > 0
    && party.members.reduce((s, m) => s + Math.max(0, m.health), 0)
      / party.members.reduce((s, m) => s + m.maxHealth, 0) < 0.4;
  if (options.length > 1) weights.column = hurt ? 2 : 0.15;

  const monster = room?.monster;

  // The foe shapes the choice
  if (monster?.trait === 'swarm' && weights.loose) weights.loose += 3;   // spread beats numbers
  if (monster?.isBoss && weights.shieldwall) weights.shieldwall += 2;
  if (monster && monster.attack >= 12 && weights.shieldwall) weights.shieldwall += 2;
  if (monster && monster.health <= 12 && weights.wedge) weights.wedge += 2;

  // So does the party's temper
  if (party.hasPersonality?.('brave') && weights.wedge) weights.wedge += 2.5;
  if (party.hasPersonality?.('reckless') && weights.wedge) weights.wedge += 3;
  if (party.hasPersonality?.('craven') && weights.shieldwall) weights.shieldwall += 3;
  if (party.hasPersonality?.('cunning') && weights.loose) weights.loose += 2;

  // A thin party cannot afford a wedge
  if (party.living().length <= 2 && weights.wedge) weights.wedge *= 0.3;

  const total = Object.values(weights).reduce((s, v) => s + v, 0);
  let roll = rng() * total;
  for (const [id, w] of Object.entries(weights)) {
    roll -= w;
    if (roll <= 0) return id;
  }
  return options[options.length - 1] || 'line';
}

/**
 * The modifiers a formation contributes, folded for the fight resolver.
 * `shapeName` is the room's own word for itself, for the writing.
 */
export function formationModifiers(id, room) {
  const f = FORMATIONS[id] || FORMATIONS.line;
  return {
    id: f.id,
    name: f.name,
    icon: f.icon,
    frontage: f.frontage,
    incomingMult: f.incomingMult,
    attackMult: f.attackMult,
    flanking: f.flanking,
    areaShare: f.areaShare,
    tell: f.tell(room?.shape || 'room'),
    effect: f.effect,
  };
}
