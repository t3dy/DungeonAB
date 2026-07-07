/**
 * Tests for the balance-audit tuning pass: traits honored literally,
 * dead cards given real hooks, trap personalities given their upside.
 * (Findings from the paired-seed simulation harness, 2026-07.)
 */

import { strict as assert } from 'assert';
import { Party } from '../src/agents/Party.js';
import { resolveRoomAction, getPreparationBonuses, detectSecretDoor } from '../src/encounters/RoomEncounters.js';
import { composeResolution } from '../src/narrative/Narrator.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, PERSONALITY_CARDS, CLASSES } from '../src/game/Cards.js';

const by = id => [...CHARACTER_CARDS, ...EQUIPMENT_CARDS, ...SPELL_CARDS, ...PERSONALITY_CARDS].find(c => c.id === id);
const fighters = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER);

describe('Traits honored literally', () => {
  test('Melchior doubles the working; lesser wizards add two', () => {
    const firebolt = { ...by('sp-firebolt') };   // power 4
    const melchior = new Party([by('char-melchior'), firebolt]);
    assert.equal(melchior.castSpell('combat').effectivePower, 8, 'doubled, as the card promises');

    const sylvane = new Party([by('char-sylvane'), { ...by('sp-firebolt') }]);
    assert.equal(sylvane.castSpell('combat').effectivePower, 6, 'the flat +2 for the rest of the guild');
  });

  test('a dead Melchior doubles nothing', () => {
    const party = new Party([by('char-melchior'), fighters[0], { ...by('sp-firebolt') }]);
    party.members[0].takeDamage(999);
    assert.equal(party.castSpell('combat').effectivePower, 4, 'the scroll burns at list price');
  });
});

describe('Dead tools revived', () => {
  test('the Athanor Charm sets a working coat one notch deeper', () => {
    const arm = withCharm => {
      const pool = [fighters[0], by('char-paracelsus')];
      if (withCharm) pool.push(by('eq-athanor-charm'));
      const party = new Party(pool);
      party.members[0].addWeaponMod({ name: 'fire coating', attack: 2, element: 'fire' });
      return party;
    };
    assert.equal(arm(false).coatingBonusVs({ weak: ['fire'] }).bonus, 2);
    const charmed = arm(true).coatingBonusVs({ weak: ['fire'] });
    assert.equal(charmed.bonus, 3, 'the furnace pays');
    assert.ok(charmed.notes.includes('Athanor Charm'), 'and gets the credit');
    assert.equal(arm(true).coatingBonusVs({ resist: ['fire'] }).bonus, 0, 'no coat, no notch');
  });

  test('the Portable Alembic gathers one bundle further', () => {
    const room = () => ({ type: ROOM_TYPES.MATERIALS, cleared: false, materials: 2 });
    const bare = new Party([by('char-paracelsus')]);
    resolveRoomAction(room(), bare, 'gather');
    assert.equal(bare.materials, 2);

    const kitted = new Party([by('char-paracelsus'), by('eq-alembic')]);
    const result = resolveRoomAction(room(), kitted, 'gather');
    assert.equal(kitted.materials, 3, 'one further');
    assert.ok(result.preps.some(p => p.text.includes('Alembic')), 'named in the chronicle');
  });

  test('utility spells now prepare the party too', () => {
    const eyes = new Party([fighters[0], { ...by('sp-eyes') }]);
    assert.equal(getPreparationBonuses(eyes).secretDoor, 1, 'the Mouse sees the seams');
    assert.ok(detectSecretDoor(eyes, 10) && !detectSecretDoor(new Party([fighters[0]]), 10),
      'and it moves the search');

    const feather = new Party([fighters[0], { ...by('sp-feather') }]);
    assert.equal(getPreparationBonuses(feather).trapSoak, 1, 'light feet trip fewer plates');
  });
});

describe('Trap personalities get their upside', () => {
  test('a craven retreat costs half the hide', () => {
    const room = () => ({ type: ROOM_TYPES.MONSTER, cleared: false, monster: { name: 'a wall of teeth', attack: 5, health: 999 } });
    const plain = new Party([fighters[0]]);
    resolveRoomAction(room(), plain, 'flee');
    assert.equal(plain.totalHealth(), plain.totalMaxHealth() - 2, 'ordinary retreats bleed');

    const craven = new Party([fighters[0], by('pers-craven')]);
    const result = resolveRoomAction(room(), craven, 'flee');
    assert.equal(craven.totalHealth(), craven.totalMaxHealth() - 1, 'the exit was memorized');
    assert.ok(result.clean);
    assert.ok(composeResolution(room(), 'flee', result, craven).includes('memorized'));
  });

  test('the Athanor Charm heats the vial a point hotter', () => {
    const wall = () => ({ type: ROOM_TYPES.MONSTER, index: 1, cleared: false, monster: { name: 'the wall', attack: 2, health: 999 } });
    const stocked = pool => {
      const p = new Party(pool.map(c => ({ ...c })));
      p.materials = 1;
      return p;
    };
    const plain = resolveRoomAction(wall(), stocked([by('char-paracelsus'), fighters[0]]), 'fight');
    assert.ok(plain.combatLog[0].events.some(e => e.kind === 'vial' && e.amount === 3));
    const hot = resolveRoomAction(wall(), stocked([by('char-paracelsus'), fighters[0], by('eq-athanor-charm')]), 'fight');
    assert.ok(hot.combatLog[0].events.some(e => e.kind === 'vial' && e.amount === 4), 'the furnace pays again');
  });

  test('reckless fury is worth about a point a round', () => {
    const wall = () => ({ type: ROOM_TYPES.MONSTER, index: 1, cleared: false, monster: { name: 'the wall', attack: 2, health: 999 } });
    const dealtOf = pool => {
      let total = 0;
      for (let i = 0; i < 40; i++) {
        const r = resolveRoomAction(wall(), new Party(pool.map(c => ({ ...c }))), 'fight');
        total += r.combatLog.flatMap(e => e.events)
          .filter(e => e.kind === 'hero-hit').reduce((s, e) => s + e.amount, 0);
      }
      return total;
    };
    const plain = dealtOf([fighters[0], fighters[1]]);
    const furious = dealtOf([fighters[0], fighters[1], by('pers-reckless')]);
    assert.ok(furious > plain + 200, `fury shows in the arithmetic (${furious} > ${plain} + 200)`);
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
