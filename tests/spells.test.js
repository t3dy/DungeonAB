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
import { composeResolution } from '../src/narrative/Narrator.js';
import { Party } from '../src/agents/Party.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, SPELL_CARDS, CLASSES } from '../src/game/Cards.js';
import { armsDiffer, trials, partyHealth, partyPool } from './helpers.js';

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

describe('A healing working fires when it is needed, not after', () => {
  /* The defect this covers: healing used to be applied after the fight
   * and gated on the party still being alive, so the one situation a
   * heal is drafted for was the one situation it could never fire in.
   * Measured, 87% of runs by a party holding three healing workings
   * ended with the party dead and a working still prepared. */

  test('a hurt party looses the working mid-fight, and the prose says which round', () => {
    const party = new Party([byClass('fighter'), byClass('cleric'), sp('sp-mend')]);
    // Hurt someone past the threshold before the fight starts
    party.members[0].takeDamage(Math.ceil(party.members[0].maxHealth * 0.75));
    const result = resolveRoomAction(bruiser(), party, 'fight');
    const line = result.preps.find(pr => /mid-fight/.test(pr.text));
    assert.ok(line, 'the working is loosed during the fight');
    assert.match(line.text, /round \d+/, 'and the prose names the round it happened in');
    assert.match(line.text, /a round while it holds/, 'and that it goes on mending');
  });

  test('the working is not spent while everyone is healthy', () => {
    const party = new Party([byClass('fighter'), sp('sp-mend')]);
    assert.equal(party.castHealIfNeeded(), null, 'nothing to mend, nothing spent');
    assert.equal(party.grimoire.length, 1, 'and the working is still prepared');
  });

  test('a badly hurt companion is mended, and the working goes on the cooldown', () => {
    const party = new Party([byClass('fighter'), byClass('rogue'), sp('sp-mend')]);
    const victim = party.members[0];
    victim.takeDamage(Math.ceil(victim.maxHealth * 0.8));
    const low = victim.health;

    const cast = party.castHealIfNeeded();
    assert.ok(cast, 'the working fires for someone under the threshold');
    assert.equal(cast.target.name, victim.name, 'on the one who needed it');
    assert.ok(victim.health > low, `and it actually heals (${low} → ${victim.health})`);

    // Prepared, so still in the grimoire — but spent for this room
    assert.equal(party.grimoire.length, 1, 'a prepared working is not consumed');
    assert.equal(party.castHealIfNeeded(), null, 'but it cannot fire twice in a room');
    party.restStep();
    victim.takeDamage(victim.health - 1);
    assert.ok(party.castHealIfNeeded(), 'and it is ready again on the march');
  });

  test('the renewable resource is spent before the consumable one', () => {
    // A prepared working comes back next room; a potion does not. The
    // party should reach for the working first.
    const party = new Party([byClass('fighter'), sp('sp-mend')]);
    party.potions.push({ name: 'a test draught', heal: 5 });
    const victim = party.members[0];
    victim.takeDamage(Math.ceil(victim.maxHealth * 0.8));

    resolveRoomAction(bruiser({ attack: 1, health: 40 }), party, 'fight');
    assert.equal(party.potions.length, 1, 'the potion is still in the pack');
  });

  test('the mend reaches the Chronicle even in a fight the party loses', () => {
    // This is the whole point of the fix, and the case the old
    // post-fight heal could never reach: the working fires *during* a
    // losing fight, and the player reads about it.
    const party = new Party([byClass('fighter'), byClass('cleric'), sp('sp-mend')]);
    party.members[0].takeDamage(Math.ceil(party.members[0].maxHealth * 0.75));
    const room = bruiser({ attack: 6, health: 90 });
    const result = resolveRoomAction(room, party, 'fight');
    assert.equal(result.success, false, 'a wall of meat this big wins');
    const prose = composeResolution(room, 'fight', result, party);
    assert.match(prose, /mid-fight/,
      'the mend is narrated even though the party lost');
  });

  test('holding a heal beats holding nothing when the blows are landing', () => {
    // The foe is sized to a regime where the question is decidable:
    // wound attrition means a big enough monster kills both arms and a
    // small enough one kills neither, and a test run in either of those
    // regimes measures nothing. armsDiffer enforces that rather than
    // trusting the numbers I picked.
    let pool = 0;
    const outcome = spells => {
      const survived = [];
      const left = trials(60, () => {
        const party = new Party([byClass('fighter'), byClass('cleric'),
          ...spells.map(id => sp(id))]);
        pool = partyPool(party);
        // Formation pinned so it does not confound the healing measured
        resolveRoomAction(bruiser({ attack: 6, health: 90 }), party, 'fight',
          { formation: 'line' });
        survived.push(party.isAlive() ? 1 : 0);
        return partyHealth(party);
      });
      return { left, survival: survived.reduce((s, v) => s + v, 0) / survived.length };
    };
    const bare = outcome([]);
    const healed = outcome(['sp-mend', 'sp-balm']);

    const { a, b } = armsDiffer(healed.left, bare.left, {
      label: 'healing workings against none',
      spread: 1,
      bounds: { max: pool },
    });
    assert.ok(a > b, `healing workings keep the party up (${a.toFixed(1)} > ${b.toFixed(1)})`);
    assert.ok(healed.survival > bare.survival,
      `and keep it alive (${(healed.survival * 100).toFixed(0)}% vs ${(bare.survival * 100).toFixed(0)}%)`);
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
