/**
 * Tests for monster drops — every defeated monster leaves something
 * interesting behind. Coverage rule: every kind in every theme has a
 * signature drop (never the generic trophy), and unknown DLC kinds
 * still drop via trait fallback, so nothing can drop nothing.
 */

import { strict as assert } from 'assert';
import { Party } from '../src/agents/Party.js';
import { dropFor, claimDrop, registerDrops, DROP_EFFECTS } from '../src/game/Drops.js';
import { resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { composeResolution } from '../src/narrative/Narrator.js';
import { ROOM_TYPES, DUNGEON_THEMES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';
import { installAlchemyPack } from '../src/packs/alchemyPack.js';

installAlchemyPack({ enabled: false }); // register the pack's kinds + drops

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);
const cleric = CHARACTER_CARDS.find(c => c.class === CLASSES.CLERIC);

const GENERIC = dropFor({ kind: 'no-such-kind', trait: null });

function allThemedMonsters() {
  const out = [];
  for (const theme of Object.values(DUNGEON_THEMES)) {
    for (const m of [...theme.monsters, ...theme.bosses]) out.push(m);
  }
  return out;
}

/** A snapshot of everything a drop could touch. */
function partyWealth(party) {
  return party.gold
    + party.materials
    + party.potions.length
    + party.grimoire.length
    + party.living().reduce((s, m) => s + m.equipment.length + m.weaponMods.length, 0);
}

describe('Drop coverage — the writing rule', () => {
  test('every kind in every theme has a signature drop, not the generic', () => {
    for (const monster of allThemedMonsters()) {
      const drop = dropFor({ kind: monster.kind });
      assert.ok(drop, `${monster.kind} drops something`);
      assert.notEqual(drop, GENERIC, `${monster.kind} has its own signature drop`);
      assert.ok(drop.name && drop.icon && drop.text, `${monster.kind}'s drop has name, icon, and writing`);
      assert.ok(DROP_EFFECTS.includes(drop.effect), `${monster.kind}'s drop effect "${drop.effect}" is in the vocabulary`);
    }
  });

  test('every signature drop actually changes the party when claimed', () => {
    for (const monster of allThemedMonsters()) {
      const party = new Party([fighter]);
      const before = partyWealth(party);
      const entry = claimDrop(party, monster);
      assert.ok(partyWealth(party) > before, `${monster.kind}'s drop (${entry.drop.effect}) enriches the party`);
      assert.equal(entry.find, 'drop');
      assert.ok(entry.text.length > 20, `${monster.kind}'s chronicle entry is written, not stubbed`);
    }
  });

  test('unknown kinds fall back by trait, then to the generic trophy', () => {
    const venomFallback = dropFor({ kind: 'dlc-mystery', trait: 'venomous' });
    assert.equal(venomFallback.effect, 'coating', 'a venomous unknown drops its venom');

    const bare = dropFor({ kind: 'dlc-mystery' });
    assert.equal(bare, GENERIC, 'a traitless unknown gets the generic trophy');

    const party = new Party([fighter]);
    const entry = claimDrop(party, { kind: 'dlc-mystery', name: 'a nameless horror' });
    assert.ok(entry.text.includes('nameless horror drops'), 'the chronicle names the monster');
    assert.ok(!entry.text.includes('{monster}'), 'no raw placeholder leaks into the chronicle');
  });
});

describe('Drops in combat — the dead always pay', () => {
  test('a won fight always yields the monster\'s drop', () => {
    const party = new Party([fighter]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { kind: 'goblin-gang', name: 'a goblin toll-gang', attack: 2, health: 4 } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.equal(result.success, true);
    assert.ok(result.drop, 'the kill carries a drop');
    assert.equal(result.drop.name, 'the toll-purse');
    assert.ok(result.preps.some(p => p.find === 'drop'), 'the drop enters the chronicle');
    assert.equal(party.gold, 15, 'the toll-purse pays out');
  });

  test('a lost fight drops nothing', () => {
    const party = new Party([fighter]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { kind: 'goblin-gang', name: 'a goblin toll-gang', attack: 50, health: 9999 } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.equal(result.success, false);
    assert.equal(result.drop, null, 'no corpse looted by the dead');
  });

  test('fleeing leaves the drop unclaimed', () => {
    const party = new Party([fighter]);
    const before = partyWealth(party);
    const room = { type: ROOM_TYPES.MONSTER, monster: { kind: 'wraith', name: 'a cold-eyed wraith', attack: 8, health: 12 } };
    const result = resolveRoomAction(room, party, 'flee');
    assert.equal(result.retreated, true);
    assert.equal(result.drop, undefined);
    assert.equal(partyWealth(party), before, 'nothing gained on the run');
  });

  test('a coating drop lands on the hardest hitter\'s blade', () => {
    const party = new Party([fighter, cleric]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { kind: 'salamander', name: 'a salamander', attack: 2, health: 3 } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.equal(result.success, true);
    const striker = party.living().reduce((a, b) => a.attack >= b.attack ? a : b);
    assert.ok(striker.weaponMods.some(m => m.name === 'salamander-gland coating'), 'the gland coats the striker');
    assert.equal(striker.class, CLASSES.FIGHTER);
  });

  test('turning the undead still yields their grave-goods', () => {
    const realRandom = Math.random;
    Math.random = () => 0.99; // the cleric's word carries
    try {
      const party = new Party([fighter, cleric]);
      const room = { type: ROOM_TYPES.MONSTER, monster: { kind: 'skeleton', name: 'a rattling skeleton patrol', attack: 6, health: 14, undead: true } };
      const result = resolveRoomAction(room, party, 'turn-undead');
      assert.equal(result.success, true);
      assert.ok(result.drop, 'the dust settles around the drop');
      assert.equal(result.drop.name, 'a femur of surprising balance');
    } finally {
      Math.random = realRandom;
    }
  });

  test('a boss drops its signature trophy on top of the hoard find', () => {
    const party = new Party([fighter]);
    const room = { type: ROOM_TYPES.BOSS, monster: { kind: 'ogre-king', name: 'the Ogre King Under the Stair', icon: '👹', attack: 2, health: 4, isBoss: true } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.equal(result.success, true);
    assert.equal(result.drop.name, 'the Ogre King\'s smallest crown');
    const crowned = party.living().some(m => m.equipment.some(e => e.name === 'the Ogre King\'s smallest crown'));
    assert.ok(crowned, 'the crown is worn, not just listed');
    assert.ok(result.preps.filter(p => p.find).length >= 2, 'the hoard find and the trophy both make the chronicle');
  });

  test('the narrator reports the drop: what, what it does, who has it', () => {
    const party = new Party([fighter]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { kind: 'wraith', name: 'a cold-eyed wraith', attack: 1, health: 2, undead: true } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.equal(result.success, true);
    const text = composeResolution(room, 'fight', result, party);
    assert.ok(text.includes('drops a grave-cold ribbon'), 'the drop is named in the story panel');
    assert.ok(text.includes('+1 defense'), 'its effect is stated');
    assert.ok(text.includes(party.members[0].name), 'the wearer is named');
  });
});

describe('Pack-registered drops (DLC parity)', () => {
  test('the alchemy pack\'s kinds all have signature drops', () => {
    for (const kind of ['green-lion', 'ouroboros', 'caput-corvi', 'winged-wingless', 'rebis', 'philosophers-dragon']) {
      const drop = dropFor({ kind });
      assert.notEqual(drop, GENERIC, `${kind} has a registered drop`);
    }
  });

  test('registerDrops lets a pack claim a new kind', () => {
    registerDrops({ 'test-kind': { effect: 'materials', name: 'test dust', icon: '✨', count: 5, text: 'Dust of the test kind, settling.' } });
    const party = new Party([fighter]);
    claimDrop(party, { kind: 'test-kind', name: 'a test monster' });
    assert.equal(party.materials, 5);
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
