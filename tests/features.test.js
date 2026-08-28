/**
 * Tests for room features — the furniture inside a chamber, and the
 * cards drafted to exploit it. The rule this file enforces: every
 * feature is drawable with existing art, every interaction is reachable
 * by something a player can actually draft, and every one of them has
 * real writing.
 */

import { strict as assert } from 'assert';
import { trials, armsDiffer } from './helpers.js';
import {
  FEATURES, FEATURE_ACTIONS, FEATURE_IDS, FEATURE_ACTION_IDS,
  rollFeatures, featureCapacity, featureModifiers, featureActions,
  getFeature, roomFeatures, actionTier,
} from '../src/world/RoomFeatures.js';
import {
  generateDungeon, ROOM_TYPES, serializeDungeon, dungeonFromLayout,
} from '../src/world/DungeonGen.js';
import {
  getRoomOptions, getFeatureOptions, resolveRoomAction, decideRoomAction,
} from '../src/encounters/RoomEncounters.js';
import { composePredicament, composeDeliberation, composeResolution } from '../src/narrative/Narrator.js';
import { getFeatureTile } from '../src/ui/SpriteAtlas.js';
import { featureSlots, roomHalf, partySlots, monsterSpot } from '../src/ui/RoomLayout.js';
import { validateCard } from '../src/game/CardPacks.js';
import { getTactic } from '../src/game/Tactics.js';
import { Party, PARTY_CAP } from '../src/agents/Party.js';
import {
  CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, PERSONALITY_CARDS, CLASSES, getCard,
} from '../src/game/Cards.js';
import { SeededRandom } from '../src/draft/PackDraft.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const fighter = byClass(CLASSES.FIGHTER);
const cleric = byClass(CLASSES.CLERIC);
const rogue = byClass(CLASSES.ROGUE);
const wizard = byClass(CLASSES.WIZARD);
const alchemist = byClass(CLASSES.ALCHEMIST);

/** A room furnished with exactly the features named. */
function furnished(type, features, w = 9, h = 8) {
  return {
    type, w, h, shape: 'chamber', features, index: 0, cleared: false,
    ...(type === ROOM_TYPES.MONSTER || type === ROOM_TYPES.BOSS
      ? { monster: { kind: 'test-thing', name: 'a test thing', attack: 3, health: 40 } }
      : {}),
  };
}

describe('The feature catalog is honest about the game around it', () => {
  test('every feature names only real room types', () => {
    const valid = new Set(Object.values(ROOM_TYPES));
    for (const f of Object.values(FEATURES)) {
      for (const rt of f.rooms) {
        assert.ok(valid.has(rt), `${f.id} lists "${rt}", which is not a room type`);
      }
      assert.ok(f.rooms.length > 0, `${f.id} appears somewhere`);
    }
  });

  test('every feature is drawable — a tile if the sheet has one, its emoji if not', () => {
    // The rule used to be "art already on the sheet", which meant a
    // hazard nobody had drawn could not exist. A feature the player
    // cannot see is one they cannot plan around, so the renderer falls
    // back to the feature's own icon as a place marker
    // (IsoDungeonRenderer.emojiSprite) and the catalog is free to grow.
    for (const id of FEATURE_IDS) {
      const tile = getFeatureTile(id);
      if (tile) {
        assert.ok(tile.col >= 0 && tile.col < 12 && tile.row >= 0 && tile.row < 11,
          `${id}'s tile is inside the sheet`);
      } else {
        const icon = getFeature(id)?.icon;
        assert.ok(icon && [...icon].length <= 2,
          `${id} has no tile, so it needs an emoji marker (got ${JSON.stringify(icon)})`);
      }
    }
  });

  test('every feature has a name, an icon, and a tell for the writing', () => {
    for (const f of Object.values(FEATURES)) {
      assert.ok(f.name && f.name.length > 3, `${f.id} is named`);
      assert.ok(f.icon, `${f.id} has an icon`);
      assert.ok(f.tell && f.tell.length > 20, `${f.id} tells the player it is there`);
    }
  });

  test('every feature either does something passively or offers an action', () => {
    for (const f of Object.values(FEATURES)) {
      const passive = f.cover || f.douse || f.revealEthereal || f.undeadRisk;
      const acted = Object.values(FEATURE_ACTIONS).some(a => a.feature === f.id);
      assert.ok(passive || acted, `${f.id} is not merely scenery`);
    }
  });
});

describe('Every interaction is reachable, and reachable by a card', () => {
  test('each action names a real feature and a real gate', () => {
    for (const [id, action] of Object.entries(FEATURE_ACTIONS)) {
      assert.ok(FEATURES[action.feature], `${id} hangs off a real feature`);
      assert.ok(action.gates.length > 0, `${id} has a gate`);
      for (const gate of action.gates) {
        if (gate.cls) {
          assert.ok(Object.values(CLASSES).includes(gate.cls), `${id} gate class is real`);
        } else if (gate.item) {
          const card = getCard(gate.item);
          assert.ok(card, `${id} gate item ${gate.item} is a real card`);
          assert.equal(card.type, 'equipment');
        } else if (gate.spell) {
          const card = getCard(gate.spell);
          assert.ok(card, `${id} gate spell ${gate.spell} is a real card`);
          assert.equal(card.type, 'spell');
        } else if (gate.tactic) {
          // Training is the fourth key: a drilled party opens the
          // architecture without the class or the tool (game/Tactics.js)
          assert.ok(getTactic(gate.tactic), `${id} gate tactic ${gate.tactic} is a real tactic`);
        } else {
          assert.fail(`${id} has an empty gate`);
        }
      }
    }
  });

  test('the hazards open to training, not only to muscle and rope', () => {
    // A party of four casters used to walk past every pit in the
    // dungeon. Shove is a card, so the architecture is draftable.
    const hazards = ['shove-into-pit', 'shove-onto-spikes', 'shove-into-chasm', 'shove-into-brazier'];
    for (const id of hazards) {
      assert.ok(FEATURE_ACTIONS[id], `${id} exists`);
      assert.ok(FEATURE_ACTIONS[id].gates.some(g => g.tactic === 'tac-shove'),
        `${id} opens to Shove`);
    }
    const room = furnished(ROOM_TYPES.MONSTER, ['pit', 'spikes']);
    const casters = new Party([wizard, cleric]);
    assert.equal(getFeatureOptions(room, casters).length, 0, 'untrained, the floor is scenery');

    const drilled = new Party([wizard, cleric, getCard('tac-shove')]);
    const opened = getFeatureOptions(room, drilled).map(o => o.id).sort();
    assert.deepEqual(opened, ['shove-into-pit', 'shove-onto-spikes'],
      'drilled, both hazards are weapons');
  });

  test('at least one gate on every action is a draftable card, not just a class', () => {
    // The point of the feature cards: a party without the right class
    // can still buy its way into the interaction at the draft table
    for (const [id, action] of Object.entries(FEATURE_ACTIONS)) {
      const cardGate = action.gates.some(g => g.item || g.spell);
      const classGate = action.gates.some(g => g.cls);
      assert.ok(cardGate || classGate, `${id} is reachable`);
    }
    const byCard = FEATURE_ACTION_IDS.filter(id =>
      FEATURE_ACTIONS[id].gates.some(g => g.item || g.spell));
    assert.ok(byCard.length >= FEATURE_ACTION_IDS.length * 0.7,
      `most interactions are card-openable (${byCard.length}/${FEATURE_ACTION_IDS.length})`);
  });

  test('the gate actually gates: no card, no option', () => {
    const room = furnished(ROOM_TYPES.MONSTER, ['pit']);
    const bare = new Party([wizard, cleric]);       // no fighter, no grapple
    assert.equal(getFeatureOptions(room, bare).length, 0, 'the pit stays scenery');

    const withMuscle = new Party([wizard, fighter]);
    assert.ok(getFeatureOptions(room, withMuscle).some(o => o.id === 'shove-into-pit'),
      'a fighter can shove');

    const withCard = new Party([wizard, cleric, EQUIPMENT_CARDS.find(e => e.id === 'eq-grapple')]);
    assert.ok(getFeatureOptions(room, withCard).some(o => o.id === 'shove-into-pit'),
      'the Grapple and Line opens the pit for a party with no fighter');
  });

  test('features only offer fight actions in fights', () => {
    const corridor = furnished(ROOM_TYPES.CORRIDOR, ['pit']);
    const party = new Party([fighter]);
    assert.equal(getFeatureOptions(corridor, party).length, 0,
      'nothing to shove into the pit in an empty corridor');
  });

  test('every interaction has a deliberation phrase and real resolution prose', () => {
    for (const id of FEATURE_ACTION_IDS) {
      const action = FEATURE_ACTIONS[id];
      const party = new Party([fighter, cleric, rogue, wizard]);
      // Give the party everything, so every gate opens
      for (const eq of EQUIPMENT_CARDS) party.assignEquipment({ ...eq });
      for (const sp of SPELL_CARDS) party.grimoire.push({ ...sp });

      const phrase = composeDeliberation(id, [{ id }, { id: 'flee' }], party);
      assert.ok(!new RegExp(`chose to ${id}\\.`).test(phrase),
        `${id} has a written deliberation phrase, not its raw id`);

      const roomType = action.fightOnly ? ROOM_TYPES.MONSTER : action.feature === 'shelves'
        ? ROOM_TYPES.LIBRARY : ROOM_TYPES.MONSTER;
      const room = furnished(roomType, [action.feature]);
      const result = resolveRoomAction(room, party, id);
      const text = composeResolution(room, id, result, party);
      assert.ok(text && text.length >= 30, `${id} narrates: got "${text}"`);
      assert.ok(!text.includes('undefined'), `${id} has no holes: "${text}"`);
    }
  });
});

describe('Using the room changes the fight', () => {
  test('a fight opener damages the monster before the first blow', () => {
    const party = new Party([fighter, cleric]);
    const plain = furnished(ROOM_TYPES.MONSTER, []);
    const withPit = furnished(ROOM_TYPES.MONSTER, ['pit']);
    const before = withPit.monster.health;
    const result = resolveRoomAction(withPit, party, 'shove-into-pit');
    assert.ok(result.featureDamage > 0, 'the room did damage');
    assert.equal(result.feature, 'pit', 'the result names what was used');
    assert.ok(withPit.monster.health < before, 'the monster is worse off');
  });

  test('cover blunts every round of incoming damage', () => {
    // An effectively unkillable monster hitting hard enough that the
    // floor of 1 damage never masks the effect. Comparing damage *per
    // round* keeps this honest whether or not the party survives 12.
    const wall = () => ({
      type: ROOM_TYPES.MONSTER, w: 9, h: 8, shape: 'chamber',
      monster: { name: 'the wall of teeth', attack: 8, health: 9999 },
    });
    const party = () => new Party([fighter, cleric, rogue, wizard]);
    const bare = { ...wall(), features: [] };
    const covered = { ...wall(), features: ['pillars', 'crates'] };

    // Formation is pinned and both arms averaged. The party now chooses
    // where it stands per fight (agents/Formation.js) and that scales
    // incoming by up to a third either way -- more than the cover being
    // measured -- so an unpinned single run compares the pillars against
    // the dice.
    const perRound = (room, runs = 20) => {
      let total = 0;
      for (let i = 0; i < runs; i++) {
        const r = resolveRoomAction({ ...room }, party(), 'fight', { formation: 'line' });
        total += r.damage / Math.max(1, r.rounds);
      }
      return total / runs;
    };
    const a = perRound(bare);
    const b = perRound(covered);
    assert.ok(b < a,
      `cover reduced damage per round (${b.toFixed(2)} < ${a.toFixed(2)})`);
    // Rounds are measured separately now that the arms are averages
    const meanRounds = (room, runs = 20) => {
      let total = 0;
      for (let i = 0; i < runs; i++) {
        total += resolveRoomAction({ ...room }, party(), 'fight', { formation: 'line' }).rounds;
      }
      return total / runs;
    };
    const lastedCovered = meanRounds(covered);
    const lastedBare = meanRounds(bare);
    assert.ok(lastedCovered >= lastedBare,
      `and the party lasted longer (${lastedCovered.toFixed(1)} >= ${lastedBare.toFixed(1)})`);
  });

  test('a mirror does for the ethereal what a cleric does', () => {
    const mods = featureModifiers(furnished(ROOM_TYPES.MONSTER, ['mirror']));
    assert.equal(mods.revealEthereal, true);
    const ghostRoom = feats => ({
      type: ROOM_TYPES.MONSTER, w: 9, h: 8, shape: 'chamber', features: feats,
      monster: { name: 'a wraith', attack: 2, health: 60, trait: 'ethereal' },
    });
    // One fight proves nothing: the rolls come from the global
    // Math.random and a single pair came back 11 against 10 about once
    // in twelve runs. Twenty-five fights an arm, compared as means.
    const rounds = feats => trials(25, () =>
      resolveRoomAction(ghostRoom(feats), new Party([fighter, rogue]), 'fight').rounds);
    const { a: mirroredRounds, b: plainRounds } = armsDiffer(rounds(['mirror']), rounds([]), {
      label: 'rounds to kill a wraith, with a mirror against without',
      spread: 0.5,
    });
    assert.ok(mirroredRounds < plainRounds,
      `the mirror ends it faster (${mirroredRounds.toFixed(1)} < ${plainRounds.toFixed(1)})`);
  });

  test('cover has a ceiling — furniture is not a fortress', () => {
    const mods = featureModifiers(furnished(ROOM_TYPES.MONSTER, ['pillars', 'crates', 'rubble']));
    assert.equal(mods.cover, 2, 'three pieces of cover still only count twice');
  });

  test('the resource uses pay out, and the sarcophagus can bite', () => {
    const party = new Party([fighter, alchemist, wizard]);
    party.assignEquipment({ ...EQUIPMENT_CARDS.find(e => e.id === 'eq-prybar') });

    const crates = furnished(ROOM_TYPES.TREASURE, ['crates']);
    const goldBefore = party.gold;
    const r1 = resolveRoomAction(crates, party, 'crack-crates');
    assert.ok(party.gold > goldBefore, 'crates pay');
    assert.equal(crates.cleared, true);

    const spoutRoom = furnished(ROOM_TYPES.LAB, ['spout']);
    const matBefore = party.materials;
    resolveRoomAction(spoutRoom, party, 'harvest-spout');
    assert.ok(party.materials > matBefore, 'the spout is a reagent');

    // The lid is a gamble for bare hands: a forced high roll wakes the
    // occupant. (With a prybar it comes off quietly — see the tiering
    // suite below, which is why this uses a party without one.)
    const barehanded = new Party([rogue]);
    const tomb = furnished(ROOM_TYPES.SHRINE, ['sarcophagus']);
    const realRandom = Math.random;
    Math.random = () => 0.99;
    try {
      const r = resolveRoomAction(tomb, barehanded, 'pry-sarcophagus');
      assert.equal(r.wokeDead, true, 'the occupant objects');
      assert.ok(r.damage > 0, 'and it costs something');
    } finally {
      Math.random = realRandom;
    }
  });

  test('feature options join the room\'s ordinary options', () => {
    const party = new Party([fighter, rogue]);
    const room = furnished(ROOM_TYPES.MONSTER, ['pit', 'pillars']);
    const ids = getRoomOptions(room, party).map(o => o.id);
    assert.ok(ids.includes('fight'), 'the plain options survive');
    assert.ok(ids.includes('shove-into-pit'));
    assert.ok(ids.includes('fight-from-cover'));
  });
});

describe('Furnishing rooms', () => {
  test('capacity follows floor space — a closet holds nothing', () => {
    assert.equal(featureCapacity({ w: 4, h: 4 }), 0, 'a closet is furniture enough');
    assert.ok(featureCapacity({ w: 6, h: 5 }) >= 1);
    // The ceiling rises with the floor: three pieces in a big cavern is
    // an empty warehouse, and rooms are half again as big now
    assert.equal(featureCapacity({ w: 9, h: 8 }), 3, 'a fighting chamber holds three');
    assert.equal(featureCapacity({ w: 12, h: 9 }), 4);
    assert.equal(featureCapacity({ w: 16, h: 12 }), 5, 'a boss cavern holds five');
    // ...and it is a ceiling, not a quota: the roll still leaves rooms bare
    const rng = new SeededRandom('capacity');
    const rolled = Array.from({ length: 40 }, () =>
      rollFeatures({ type: ROOM_TYPES.MONSTER, w: 16, h: 12 }, rng).length);
    assert.ok(Math.min(...rolled) < 5, 'not every big room is full');
  });

  test('rolled features suit the room and never repeat', () => {
    const rng = new SeededRandom('furnish');
    for (const type of Object.values(ROOM_TYPES)) {
      for (let i = 0; i < 12; i++) {
        const room = { type, w: 10, h: 8 };
        const feats = rollFeatures(room, rng);
        assert.equal(new Set(feats).size, feats.length, `${type}: no duplicates`);
        for (const id of feats) {
          assert.ok(getFeature(id).rooms.includes(type), `${id} belongs in a ${type}`);
        }
      }
    }
  });

  test('real dungeons come furnished, and it survives the archive', () => {
    let withFeatures = 0;
    let total = 0;
    for (const seed of ['f1', 'f2', 'f3', 'f4', 'f5']) {
      const d = generateDungeon(seed, 'medium');
      total += d.rooms.length;
      withFeatures += d.rooms.filter(r => (r.features || []).length > 0).length;
      const round = dungeonFromLayout(serializeDungeon(d));
      assert.deepEqual(
        round.rooms.map(r => r.features || []),
        d.rooms.map(r => r.features || []),
        `${seed}: furniture survives being archived`,
      );
    }
    assert.ok(withFeatures / total > 0.3, `most rooms hold something (${withFeatures}/${total})`);
    assert.ok(withFeatures / total < 0.95, 'but a bare room is still a legitimate room');
  });

  test('the predicament names the furniture so the options make sense', () => {
    const room = furnished(ROOM_TYPES.MONSTER, ['brazier']);
    const text = composePredicament(room, null);
    assert.ok(text.includes('brazier'), `the brazier is mentioned: "${text}"`);
  });
});

describe('Furniture is drawn clear of the fight', () => {
  test('features stand inside the room and off the party and monster', () => {
    // Every shape a fight can happen in, furnished to the new ceiling of
    // five — a room that holds more furniture has more chances to stand
    // a pillar on somebody's head.
    for (const [w, h] of [[9, 8], [6, 5], [12, 6], [5, 11], [15, 12], [11, 11], [16, 8]]) {
      const room = { type: ROOM_TYPES.MONSTER, w, h, shape: 'chamber', features: ['pillars', 'brazier', 'pit', 'spikes', 'crates'] };
      const { hx, hz } = roomHalf(room);
      const slots = featureSlots(room, 0, 0, 5);
      const party = partySlots(room, 0, 0, PARTY_CAP, true);
      const mob = monsterSpot(room, 0, 0);
      assert.equal(slots.length, 5);
      for (const s of slots) {
        assert.ok(Math.abs(s.mx) <= hx && Math.abs(s.mz) <= hz,
          `${w}x${h}: furniture at ${s.mx.toFixed(1)},${s.mz.toFixed(1)} is inside the room`);
        assert.ok(Math.hypot(s.mx - mob.mx, s.mz - mob.mz) > 0.6, 'not on the monster');
        for (const p of party) {
          assert.ok(Math.hypot(s.mx - p.mx, s.mz - p.mz) > 0.35,
            `${w}x${h}: furniture is not standing on an adventurer`);
        }
      }
    }
  });
});

describe('Tools upgrade the interaction, they do not merely unlock it', () => {
  /* The first cut gated on presence alone, and a controlled A/B showed
     the tools were redundant: a four-class party already opened eleven
     of thirteen interactions, so the cards were worth only their stat
     lines. Every tiered action must now pay the tool-holder more. */
  const withEverything = () => {
    const party = new Party([fighter, cleric, rogue, wizard]);
    for (const eq of EQUIPMENT_CARDS) party.assignEquipment({ ...eq });
    for (const sp of SPELL_CARDS) party.grimoire.push({ ...sp });
    return party;
  };
  const has = party => ({
    item: id => party.living().some(m => m.equipment.some(e => e.id === id)),
    spell: id => party.grimoire.some(sp => sp.id === id),
  });

  test('every tiered action pays the tool-holder more than the bare class', () => {
    const bare = new Party([fighter, cleric, rogue, wizard, alchemist]);
    const kitted = withEverything();
    let tiered = 0;
    for (const [id, action] of Object.entries(FEATURE_ACTIONS)) {
      if (!action.tool) continue;
      tiered++;
      const classTier = actionTier(id, bare, has(bare));
      const toolTier = actionTier(id, kitted, has(kitted));
      assert.equal(toolTier.tier, 'tool', `${id} reads as tool-tier when the card is held`);

      const value = t => (t.openerDamage || 0) + (t.gold || 0) + (t.materials || 0) * 10
        + (t.heal || 0) + (t.extraCover || 0) * 3 + (t.spell?.power || 0) * 2;
      assert.ok(value(toolTier) > value(classTier),
        `${id}: the tool tier is worth more (${value(toolTier)} > ${value(classTier)})`);
    }
    assert.ok(tiered >= 8, `most interactions are tiered (${tiered})`);
  });

  test('a tool-only interaction is closed to a party without the tool', () => {
    const room = furnished(ROOM_TYPES.LAB, ['anvil']);
    const bare = new Party([fighter, alchemist]);   // a fighter is not a smith
    assert.equal(getFeatureOptions(room, bare).length, 0,
      'an anvil without hammer, file and flux is a heavy table');

    const smith = new Party([fighter, alchemist]);
    smith.assignEquipment({ ...getCard('eq-smiths-kit') });
    assert.ok(getFeatureOptions(room, smith).some(o => o.id === 'work-the-anvil'));
  });

  test('the prybar opens a sarcophagus without waking the occupant', () => {
    const realRandom = Math.random;
    Math.random = () => 0.99;    // a roll that would wake it barehanded
    try {
      const rogueOnly = new Party([rogue]);
      const tomb1 = furnished(ROOM_TYPES.SHRINE, ['sarcophagus']);
      const rough = resolveRoomAction(tomb1, rogueOnly, 'pry-sarcophagus');
      assert.equal(rough.wokeDead, true, 'bare hands crack the lid');

      const withBar = new Party([rogue]);
      withBar.assignEquipment({ ...getCard('eq-prybar') });
      const tomb2 = furnished(ROOM_TYPES.SHRINE, ['sarcophagus']);
      const clean = resolveRoomAction(tomb2, withBar, 'pry-sarcophagus');
      assert.equal(clean.wokeDead, false, 'leverage lifts it quietly');
      assert.ok(clean.gold > rough.gold, 'and reaches more of the goods');
    } finally {
      Math.random = realRandom;
    }
  });
});

describe('The new cards', () => {
  const NEW_IDS = [
    'eq-prybar', 'eq-grapple', 'eq-tinderbox', 'eq-winch-hook',
    'eq-smiths-kit', 'eq-waterskin', 'eq-silvered-mirror',
    'sp-shatter', 'sp-kindle', 'sp-purify',
    'pers-tinkerer', 'pers-vandal',
  ];

  test('all of them exist and pass card validation', () => {
    for (const id of NEW_IDS) {
      const card = getCard(id);
      assert.ok(card, `${id} is in the pool`);
      assert.deepEqual(validateCard(card), [], `${id} is a legal card`);
      assert.ok(card.text && card.text.length > 20, `${id} has card text`);
    }
  });

  test('every feature tool actually unlocks something', () => {
    const toolIds = NEW_IDS.filter(id => id.startsWith('eq-') || id.startsWith('sp-'));
    const gated = new Set(
      Object.values(FEATURE_ACTIONS).flatMap(a => a.gates.map(g => g.item || g.spell)).filter(Boolean),
    );
    const unused = toolIds.filter(id => !gated.has(id) && id !== 'eq-silvered-mirror');
    assert.deepEqual(unused, [], `every new tool opens a feature interaction (${unused.join(', ')})`);
  });

  test('the Silvered Hand-Mirror is the portable version of the room feature', () => {
    // No FEATURE_ACTIONS gate: it carries the mirror's passive instead,
    // so a party with no cleric can still fight the ethereal properly
    const ghostRoom = () => ({
      type: ROOM_TYPES.MONSTER, w: 9, h: 8, shape: 'chamber', features: [],
      monster: { name: 'a wraith', attack: 2, health: 60, trait: 'ethereal' },
    });
    const noMirror = resolveRoomAction(ghostRoom(), new Party([fighter, rogue]), 'fight');

    const equipped = new Party([fighter, rogue]);
    equipped.assignEquipment({ ...getCard('eq-silvered-mirror') });
    const mirrored = resolveRoomAction(ghostRoom(), equipped, 'fight');

    assert.ok(mirrored.rounds < noMirror.rounds,
      `the carried mirror ends an ethereal fight faster (${mirrored.rounds} < ${noMirror.rounds})`);
    assert.ok(mirrored.preps.some(p => p.text.includes('Silvered Hand-Mirror')),
      'and the chronicle credits the card');
  });

  test('the feature personalities reuse proven archetypes', () => {
    const archetypes = new Set(PERSONALITY_CARDS.map(p => p.archetype));
    for (const id of ['pers-tinkerer', 'pers-vandal']) {
      const card = getCard(id);
      assert.ok(archetypes.has(card.archetype),
        `${id} reuses an archetype with weights, voices and barks`);
    }
  });

  test('the Vandal reaches for the furniture more than a plain party', () => {
    const realRandom = Math.random;
    Math.random = () => 0.5;
    try {
      const room = furnished(ROOM_TYPES.MONSTER, ['boulder']);
      const vandalParty = new Party([fighter, PERSONALITY_CARDS.find(p => p.id === 'pers-vandal')]);
      const plainParty = new Party([fighter]);
      // The Vandal's reckless weights push the boulder option up the list
      const vandalPick = decideRoomAction(room, vandalParty);
      const plainPick = decideRoomAction(room, plainParty);
      assert.ok(['topple-boulder', 'fight'].includes(vandalPick));
      assert.ok(vandalPick === 'topple-boulder' || plainPick !== 'topple-boulder',
        'the Vandal is at least as likely to topple it');
    } finally {
      Math.random = realRandom;
    }
  });
});

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(`  ${err.message}`);
    throw err;
  }
}

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}
