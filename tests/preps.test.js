/**
 * Tests for the preparation-effects layer (the FTL lesson: the
 * encounter must notice how you came equipped) and for narration
 * robustness — every option the game can generate must have a
 * deliberation phrase and a resolution passage, and every
 * preparation effect must be named in the prose.
 */

import { strict as assert } from 'assert';
import {
  getRoomOptions, resolveRoomAction, getPreparationBonuses, detectSecretDoor,
} from '../src/encounters/RoomEncounters.js';
import { composeDeliberation, composeResolution } from '../src/narrative/Narrator.js';
import { Party } from '../src/agents/Party.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, PERSONALITY_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const eq = id => EQUIPMENT_CARDS.find(e => e.id === id);
const sp = id => SPELL_CARDS.find(s => s.id === id);
const pers = a => PERSONALITY_CARDS.find(c => c.archetype === a);

describe('Preparation bonuses (one inspectable place)', () => {
  test('the kit earns exactly what its card text promises', () => {
    const bare = getPreparationBonuses(new Party([byClass('fighter')]));
    assert.equal(bare.sneak + bare.disarm + bare.deepStudy + bare.secretDoor + bare.trapSoak, 0);
    assert.equal(bare.cleanInspect, false);

    const loaded = getPreparationBonuses(new Party([
      byClass('rogue'), byClass('wizard'), byClass('cleric'),
      eq('eq-boots'), eq('eq-lockpicks'), eq('eq-grimoire'), eq('eq-lantern'),
      sp('sp-light'),
    ]));
    assert.equal(loaded.sneak, 2.5, 'boots + dancing light');
    assert.equal(loaded.disarm, 1.5, 'lockpicks');
    assert.equal(loaded.deepStudy, 1.5, 'the whispering grimoire');
    assert.equal(loaded.secretDoor, 2, 'the lantern');
    assert.equal(loaded.trapSoak, 1, 'the lantern');
    assert.equal(loaded.cleanInspect, true);
    assert.ok(Object.keys(loaded.notes).length >= 5, 'every bonus names its card');
  });

  test('the lantern finds doors a bare party walks past', () => {
    const rogueParty = cards => new Party([byClass('rogue'), ...cards]);
    const midRoll = 6;   // rogue mind 5 + 6 = 11: not enough bare
    assert.equal(detectSecretDoor(rogueParty([]), midRoll), false);
    assert.equal(detectSecretDoor(rogueParty([eq('eq-lantern')]), midRoll), true, '+2 from the lantern');
  });
});

describe('Preparation-gated options', () => {
  test('Knock unlocks opening chests at range; without it, no such option', () => {
    const room = { type: ROOM_TYPES.TREASURE, gold: 30, mimicChance: 0.2 };
    const withKnock = new Party([byClass('fighter'), sp('sp-knock')]);
    const without = new Party([byClass('fighter')]);
    assert.ok(getRoomOptions(room, withKnock).some(o => o.id === 'knock-open'));
    assert.ok(!getRoomOptions(room, without).some(o => o.id === 'knock-open'));
  });

  test('Cause Fear routs the weak but is useless against bosses and bruisers', () => {
    const party = new Party([byClass('fighter'), sp('sp-fear')]);
    const weak = { type: ROOM_TYPES.MONSTER, monster: { name: 'a nervous thing', attack: 4, health: 10 } };
    const bruiser = { type: ROOM_TYPES.MONSTER, monster: { name: 'a wall of meat', attack: 8, health: 30 } };
    const boss = { type: ROOM_TYPES.BOSS, monster: { name: 'the End', attack: 12, health: 10, isBoss: true } };
    assert.ok(getRoomOptions(weak, party).some(o => o.id === 'cause-fear'));
    assert.ok(!getRoomOptions(bruiser, party).some(o => o.id === 'cause-fear'));
    assert.ok(!getRoomOptions(boss, party).some(o => o.id === 'cause-fear'));
  });

  test('the smoke option exists only with an alchemist AND a material to spend', () => {
    const trap = { type: ROOM_TYPES.TRAP, trapDamage: 5 };
    const stocked = new Party([byClass('alchemist')]);
    stocked.materials = 1;
    const broke = new Party([byClass('alchemist')]);
    assert.ok(getRoomOptions(trap, stocked).some(o => o.id === 'smoke-bomb'));
    assert.ok(!getRoomOptions(trap, broke).some(o => o.id === 'smoke-bomb'));
  });
});

describe('Preparation-driven outcomes', () => {
  test('Knock takes the full hoard safely and burns the scroll (no wizard)', () => {
    const party = new Party([byClass('fighter'), sp('sp-knock')]);
    const room = { type: ROOM_TYPES.TREASURE, gold: 40, mimicChance: 1 };  // certain mimic!
    const result = resolveRoomAction(room, party, 'knock-open');
    assert.equal(result.gold, 40, 'full gold, at range');
    assert.equal(party.gold, 40);
    assert.equal(result.consumed, true, 'the scroll burns');
    assert.equal(party.grimoire.length, 0);
    assert.ok(party.isAlive() && party.totalHealth() === party.totalMaxHealth(), 'the mimic bit only air');
  });

  test('the smoke concoction spends a material and nobody bleeds', () => {
    const party = new Party([byClass('alchemist')]);
    party.materials = 2;
    const hp = party.totalHealth();
    const result = resolveRoomAction({ type: ROOM_TYPES.TRAP, trapDamage: 7 }, party, 'smoke-bomb');
    assert.equal(result.success, true);
    assert.equal(party.materials, 1, 'one material spent');
    assert.equal(party.totalHealth(), hp, 'no blood');
  });

  test('Cause Fear clears the room bloodlessly and burns the fear scroll specifically', () => {
    const party = new Party([byClass('fighter'), sp('sp-firebolt'), sp('sp-fear')]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a nervous thing', attack: 4, health: 10 } };
    const result = resolveRoomAction(room, party, 'cause-fear');
    assert.equal(result.success, true);
    assert.equal(room.cleared, true);
    assert.ok(!party.grimoire.some(s => s.id === 'sp-fear'), 'fear is spent');
    assert.ok(party.grimoire.some(s => s.id === 'sp-firebolt'), 'the firebolt is NOT the scroll that burned');
  });

  test('a drafted healing spell finally fires after a bloody fight', () => {
    const party = new Party([
      byClass('fighter'), CHARACTER_CARDS.filter(c => c.class === 'fighter')[1],
      CHARACTER_CARDS.filter(c => c.class === 'fighter')[2], sp('sp-mend'),
    ]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a grinder', attack: 8, health: 60 } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.ok(result.damage >= 6, `a long fight hurts (${result.damage})`);
    assert.ok(result.preps.some(p => p.source === 'Mending Word'), 'the mend is credited');
    assert.equal(party.grimoire.length, 0, 'the scroll burned in the field');
  });

  test('practiced fingers inspect without leaving a coin behind', () => {
    const plain = new Party([byClass('fighter')]);
    const picks = new Party([byClass('rogue'), eq('eq-lockpicks')]);
    const room = () => ({ type: ROOM_TYPES.TREASURE, gold: 30, mimicChance: 0 });
    assert.equal(resolveRoomAction(room(), plain, 'inspect').gold, 24, '80% for the unpracticed');
    const result = resolveRoomAction(room(), picks, 'inspect');
    assert.equal(result.gold, 30, 'the full hoard');
    assert.ok(result.preps.length > 0, 'and the picks get the credit');
  });

  test('the Reckless win with style, and the chronicle pays for it', () => {
    const party = new Party([byClass('fighter'), pers('reckless')]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a pushover', attack: 1, health: 3 } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.ok(result.success);
    assert.ok(result.preps.some(p => p.source === 'the Reckless'));
    assert.ok(party.score >= 30, '25 bounty + 5 swagger');
  });
});

describe('Narration robustness — writing for every eventuality', () => {
  // A party that unlocks every option the game can offer
  const maxParty = () => {
    const p = new Party([
      byClass('fighter'), byClass('cleric'), byClass('wizard'), byClass('rogue'), byClass('alchemist'),
      sp('sp-firebolt'), sp('sp-mend'), sp('sp-knock'), sp('sp-light'), sp('sp-fear'),
    ]);
    p.gold = 50;
    p.materials = 3;
    return p;
  };

  const ALL_ROOMS = [
    { type: ROOM_TYPES.MONSTER, monster: { name: 'a test shade', attack: 4, health: 10, undead: true, bribable: true } },
    { type: ROOM_TYPES.BOSS, monster: { name: 'the Test King', attack: 10, health: 30, isBoss: true, bribable: true } },
    { type: ROOM_TYPES.TRAP, trapDamage: 5 },
    { type: ROOM_TYPES.TREASURE, gold: 30, mimicChance: 0.2 },
    { type: ROOM_TYPES.VAULT, gold: 90, mimicChance: 0.28 },
    { type: ROOM_TYPES.LIBRARY },
    { type: ROOM_TYPES.SHRINE },
    { type: ROOM_TYPES.LAB },
    { type: ROOM_TYPES.MATERIALS, materials: 2 },
    { type: ROOM_TYPES.DISASTER },
    { type: ROOM_TYPES.CORRIDOR },
    { type: ROOM_TYPES.ENTRANCE },
  ];

  const collectIds = () => {
    const ids = new Set();
    for (const room of ALL_ROOMS) {
      for (const o of getRoomOptions(room, maxParty())) ids.add(o.id);
    }
    return [...ids];
  };

  test('every option the game can generate has a deliberation phrase', () => {
    const ids = collectIds();
    assert.ok(ids.length >= 20, `a rich option space (${ids.length} options)`);
    for (const id of ids) {
      const text = composeDeliberation(id, [{ id }, { id: 'flee' }], maxParty());
      assert.ok(!new RegExp(`chose to ${id}\\.`).test(text),
        `"${id}" has real phrasing, not its raw id`);
    }
  });

  test('every action id resolves to real prose, success or failure', () => {
    const stub = ok => ({
      success: ok, monster: 'a test shade', rounds: 2, damage: 4, gold: 25,
      learned: 1, healed: 5, materials: 2, hurt: 1, spell: 'Test Working',
      mimic: false, wasMimic: false, consumed: true, alchemy: null,
      retreated: false, goldSpent: 15, spotted: false, itemActions: [], preps: [],
    });
    for (const id of collectIds()) {
      for (const ok of [true, false]) {
        const text = composeResolution({ type: 'monster' }, id, stub(ok), maxParty());
        assert.ok(text && text.length >= 20, `${id} (${ok ? 'success' : 'failure'}) narrates: got "${text}"`);
      }
    }
  });

  test('preparation effects are woven into the prose by name', () => {
    const result = { success: true, gold: 10, preps: [{ source: 'Test Card', text: '✨ The Test Card did the impossible thing.' }] };
    const text = composeResolution({ type: 'treasure' }, 'loot', result, maxParty());
    assert.ok(text.includes('The Test Card did the impossible thing'), 'the card is credited in the chronicle');
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
