/**
 * Tests for class-keyed equipment — the same item is a different
 * miracle in different hands. (Megabase: a wand gives a fighter a
 * fireball; a wizard gets meteors.)
 */

import { strict as assert } from 'assert';
import { Party } from '../src/agents/Party.js';
import { resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { composeResolution } from '../src/narrative/Narrator.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, EQUIPMENT_CARDS, CLASSES } from '../src/game/Cards.js';
import { scoreCard, DRAFT_PERSONAS } from '../src/draft/PackDraft.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);
const fighter2 = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER)[1];
const fighter3 = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER)[2];
const wizard = CHARACTER_CARDS.find(c => c.class === CLASSES.WIZARD);
const cleric = CHARACTER_CARDS.find(c => c.class === CLASSES.CLERIC);
const wand = EQUIPMENT_CARDS.find(e => e.id === 'eq-wand-embers');
const symbol = EQUIPMENT_CARDS.find(e => e.id === 'eq-holy-symbol');

describe('Class-keyed item actions', () => {
  test('every classActions item covers all five classes', () => {
    for (const eq of EQUIPMENT_CARDS.filter(e => e.classActions)) {
      for (const cls of Object.values(CLASSES)) {
        assert.ok(eq.classActions[cls]?.name, `${eq.name} has an action for ${cls}`);
      }
    }
  });

  test('the wand is Ember Shot in a fighter\'s hand', () => {
    const party = new Party([fighter, wand]);
    const actions = party.combatItemActions();
    assert.equal(actions.length, 1);
    assert.equal(actions[0].name, 'Ember Shot');
    assert.equal(actions[0].opening, 4);
  });

  test('the wand prefers the wizard, and becomes Meteor Fall', () => {
    const party = new Party([fighter, wizard, wand]);
    const actions = party.combatItemActions();
    assert.equal(actions.length, 1);
    assert.equal(actions[0].name, 'Meteor Fall');
    assert.equal(actions[0].opening, 8);
  });

  test('a wizard holding the holy symbol animates corpses', () => {
    const party = new Party([wizard, symbol]);
    // bestFor is cleric, but with no cleric it lands on the wizard
    const actions = party.combatItemActions();
    assert.equal(actions[0].name, 'Animate Corpse');
    assert.equal(actions[0].summonAttack, 3);
  });

  test('dead hands hold no items', () => {
    const party = new Party([fighter, wand]);
    party.members[0].takeDamage(999);
    assert.equal(party.combatItemActions().length, 0);
  });
});

describe('Class-keyed items in combat', () => {
  test('a Meteor Fall ends a small fight before round one', () => {
    const party = new Party([wizard, wand]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a goblin sentry', attack: 3, health: 8 } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.equal(result.success, true);
    assert.equal(result.rounds, 0, 'the meteor did all the work');
    assert.equal(result.damage, 0, 'nobody swung back');
    assert.ok(result.itemActions.some(a => a.name === 'Meteor Fall'));
  });

  test('Radiant Smite hits the undead far harder', () => {
    const undeadRoom = () => ({ type: ROOM_TYPES.MONSTER, monster: { name: 'a bone warden', attack: 3, health: 9, undead: true } });
    const livingRoom = () => ({ type: ROOM_TYPES.MONSTER, monster: { name: 'a bandit', attack: 3, health: 9 } });

    const vsUndead = resolveRoomAction(undeadRoom(), new Party([cleric, symbol]), 'fight');
    assert.equal(vsUndead.rounds, 0, '3 + 6 vs undead ends it outright');

    const vsLiving = resolveRoomAction(livingRoom(), new Party([cleric, symbol]), 'fight');
    assert.ok(vsLiving.rounds >= 1, 'a mere 3 opening leaves work to do');
  });

  test('a ward blunts every round of incoming damage', () => {
    // Three fighters against an unkillable wall: the fight runs the
    // full 12 rounds with everyone surviving, so damage taken is a
    // clean per-round comparison. (Attack 6 keeps the party alive.)
    const bigMonster = () => ({ type: ROOM_TYPES.MONSTER, monster: { name: 'the wall of teeth', attack: 6, health: 999 } });

    const unwarded = new Party([fighter, fighter2, fighter3]);
    const warded = new Party([fighter, fighter2, fighter3, symbol]); // fighter gets Shield of Faith (ward 1)

    const plain = resolveRoomAction(bigMonster(), unwarded, 'fight');
    const shielded = resolveRoomAction(bigMonster(), warded, 'fight');

    assert.equal(plain.rounds, 12);
    assert.equal(shielded.rounds, 12);
    assert.ok(shielded.damage < plain.damage,
      `ward reduced damage (${shielded.damage} < ${plain.damage})`);
  });

  test('the narrator credits the item that opened the fight', () => {
    const party = new Party([wizard, wand]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a goblin sentry', attack: 3, health: 8 } };
    const result = resolveRoomAction(room, party, 'fight');
    const text = composeResolution(room, 'fight', result, party);
    assert.ok(text.includes('Wand of Embers'), 'item is named');
    assert.ok(text.includes('Meteor Fall'), 'action is named');
  });
});

describe('Trap cards — cursed gear with hidden upsides', () => {
  const cursedBlade = EQUIPMENT_CARDS.find(e => e.id === 'eq-cursed-blade');
  const hauntedArmor = EQUIPMENT_CARDS.find(e => e.id === 'eq-haunted-armor');

  test('the Blade of the Adder trades defense for teeth', () => {
    const bare = new Party([fighter]).members[0];
    const armed = new Party([fighter, cursedBlade]).members[0];
    assert.equal(armed.attack, bare.attack + 4, 'the whisper is worth +4');
    assert.equal(armed.defense, bare.defense - 2, 'and costs -2 to hear');
  });

  test('the Haunted Armor\'s ghost fights alongside any class', () => {
    for (const character of [fighter, wizard, cleric]) {
      const party = new Party([character, hauntedArmor]);
      const actions = party.combatItemActions();
      assert.ok(actions.some(a => a.name === 'The Ghost Objects' && a.summonAttack === 1),
        `the ghost objects for a ${character.class}`);
    }
  });

  test('AI drafters flinch from the curse (trap picks wheel to the player)', () => {
    const warlord = DRAFT_PERSONAS.find(p => p.id === 'warlord');
    const greatsword = EQUIPMENT_CARDS.find(e => e.id === 'eq-greatsword');
    const pool = [fighter]; // both items are bestFor a fighter the AI has
    const flatRng = { next: () => 0 };
    const cleanScore = scoreCard(greatsword, warlord, pool, flatRng);
    const cursedScore = scoreCard(cursedBlade, warlord, pool, flatRng);
    assert.ok(cursedScore < cleanScore,
      `the curse reads as a downside to the AI (${cursedScore} < ${cleanScore})`);
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
