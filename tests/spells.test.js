/**
 * Tests for the grimoire's weight in a fight.
 *
 * Two mechanics, both added because measurement said the arcane package
 * was a dead card type (DESIGN_DIALOGUE.md §8):
 *
 *   1. A loosed working keeps a share of its force for the rest of the
 *      fight (SPELL_SUSTAIN_SHARE), so spells scale with fight length
 *      the way a weapon bonus always did.
 *   2. Against a boss the party looses every prepared working, so the
 *      second and third spell in a grimoire are live cards in the one
 *      fight that decides the run.
 */

import { strict as assert } from 'assert';
import {
  resolveRoomAction, getRoomOptions, SPELL_SUSTAIN_SHARE,
} from '../src/encounters/RoomEncounters.js';
import { Party } from '../src/agents/Party.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, SPELL_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const sp = id => SPELL_CARDS.find(s => s.id === id);
const COMBAT = SPELL_CARDS.filter(s => s.use === 'combat');

/* A wall of meat: enough health that the fight lasts, so per-round
 * effects have somewhere to show up. Fresh object per call — the
 * resolver mutates monster.health. */
const bruiser = (over = {}) => ({
  type: ROOM_TYPES.MONSTER,
  monster: { name: 'a wall of meat', attack: 3, health: 90, ...over },
});
const throne = (over = {}) => ({
  type: ROOM_TYPES.BOSS,
  monster: { name: 'the Test King', attack: 3, health: 200, isBoss: true, ...over },
});

describe('A working holds', () => {
  test('the sustain is a share of the burst, not a replacement for it', () => {
    assert.ok(SPELL_SUSTAIN_SHARE > 0, 'a working carries past the opening');
    assert.ok(SPELL_SUSTAIN_SHARE <= 1, 'it never exceeds the burst it came from');
  });

  test('a spell-strike tells the player the working is still up', () => {
    const party = new Party([byClass('fighter'), byClass('rogue'), sp('sp-firebolt')]);
    const result = resolveRoomAction(bruiser(), party, 'spell-strike');
    const held = result.preps.find(p => /working holds/.test(p.text));
    assert.ok(held, 'the held working is named in the prose, not just the maths');
    assert.match(held.text, /every round/, 'and says what it does');
    assert.match(held.source, /Firebolt/, 'and which working it was');
  });

  test('a plain fight carries no sustain — the grimoire has to be spent', () => {
    const party = new Party([byClass('fighter'), byClass('rogue'), sp('sp-firebolt')]);
    const result = resolveRoomAction(bruiser(), party, 'fight');
    assert.ok(!result.preps.some(p => /working holds/.test(p.text)),
      'holding a spell is not the same as casting it');
  });

  test('a stronger working holds harder', () => {
    // Same bodies, same wall of meat, 40 trials each: the higher-power
    // spell must land more total damage across the fight. Combat rolls
    // are random, so compare means rather than single runs.
    const meanDamage = spellId => {
      let total = 0;
      const trials = 40;
      for (let i = 0; i < trials; i++) {
        const party = new Party([byClass('fighter'), sp(spellId)]);
        const room = bruiser();
        resolveRoomAction(room, party, 'spell-strike');
        total += 90 - room.monster.health;
      }
      return total / trials;
    };
    const weak = meanDamage('sp-shield');    // power 3
    const strong = meanDamage('sp-chain');   // power 5
    assert.ok(strong > weak,
      `the stronger working does more over the fight (${strong.toFixed(1)} > ${weak.toFixed(1)})`);
  });
});

describe('At the throne the party holds nothing back', () => {
  test('an ordinary room rations the grimoire; a boss empties it', () => {
    const three = () => [byClass('fighter'), byClass('rogue'),
      sp('sp-firebolt'), sp('sp-frost'), sp('sp-chain')];

    const ordinary = new Party(three());
    const inRoom = resolveRoomAction(bruiser(), ordinary, 'spell-strike');
    assert.equal(inRoom.spellsCast.length, 1,
      'one working in an ordinary room — no wizard to double it');

    const atBoss = new Party(three());
    const inThrone = resolveRoomAction(throne(), atBoss, 'spell-strike');
    assert.equal(inThrone.spellsCast.length, 3,
      'every prepared working goes off at the boss');
    assert.equal(new Set(inThrone.spellsCast).size, 3,
      'and they are three different workings, not one cast thrice');
  });

  test('a wizard still opens an ordinary fight with two', () => {
    const party = new Party([byClass('wizard'), byClass('fighter'),
      sp('sp-firebolt'), sp('sp-frost')]);
    const result = resolveRoomAction(bruiser(), party, 'spell-strike');
    assert.equal(result.spellsCast.length, 2, 'the wizard is why you spend a body slot');
  });

  test('the boss unleash needs no wizard, and never casts what was not prepared', () => {
    const party = new Party([byClass('fighter'), byClass('rogue'), sp('sp-firebolt')]);
    const result = resolveRoomAction(throne(), party, 'spell-strike');
    assert.equal(result.spellsCast.length, 1, 'a grimoire of one looses one');
  });

  test('utility and healing workings are not spent as strikes', () => {
    const party = new Party([byClass('fighter'),
      sp('sp-firebolt'), sp('sp-knock'), sp('sp-light')]);
    const result = resolveRoomAction(throne(), party, 'spell-strike');
    assert.deepEqual(result.spellsCast, ['Firebolt'],
      'only combat workings are loosed at the foe');
  });

  test('the option only appears when there is something to loose', () => {
    const bare = new Party([byClass('fighter')]);
    const armed = new Party([byClass('fighter'), sp('sp-firebolt')]);
    const has = party => getRoomOptions(throne(), party).some(o => o.id === 'spell-strike');
    assert.equal(has(bare), false, 'no grimoire, no offer');
    assert.equal(has(armed), true, 'a prepared working is an option');
  });

  test('emptying the grimoire at the boss beats rationing it', () => {
    // The point of the change: a three-spell party must fare better at
    // the throne than the same party casting once. Measured over trials
    // because combat rolls are random.
    const meanLeft = n => {
      let total = 0;
      const trials = 40;
      for (let i = 0; i < trials; i++) {
        const spells = COMBAT.slice(0, n).map(s => sp(s.id));
        const party = new Party([byClass('fighter'), byClass('rogue'), ...spells]);
        const room = throne();
        resolveRoomAction(room, party, 'spell-strike');
        total += room.monster.health;
      }
      return total / trials;
    };
    const one = meanLeft(1);
    const three = meanLeft(3);
    assert.ok(three < one,
      `three workings leave the King worse off than one (${three.toFixed(1)} < ${one.toFixed(1)})`);
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
