/**
 * Tests for difficulty scaling and the four-adventurer party cap
 */

import { strict as assert } from 'assert';
import { generateDungeon, STAT_SCALE, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { Party, PARTY_CAP } from '../src/agents/Party.js';
import { CHARACTER_CARDS } from '../src/game/Cards.js';
import { BUDGETS, validateCard } from '../src/game/CardPacks.js';

function bossOf(dungeon) {
  return dungeon.rooms.find(r => r.type === ROOM_TYPES.BOSS).monster;
}

describe('Difficulty sharpens the monsters', () => {
  test('stat scale rises with difficulty', () => {
    assert.ok(STAT_SCALE.easy < STAT_SCALE.medium);
    assert.ok(STAT_SCALE.medium < STAT_SCALE.hard);
    assert.ok(STAT_SCALE.hard < STAT_SCALE.nightmare);
  });

  test('the same seed breeds meaner bosses on nightmare than easy', () => {
    const easy = bossOf(generateDungeon('scale-test', 'easy'));
    const nightmare = bossOf(generateDungeon('scale-test', 'nightmare'));
    assert.ok(nightmare.health > easy.health, `nightmare boss hp ${nightmare.health} > easy ${easy.health}`);
    assert.ok(nightmare.attack > easy.attack, `nightmare boss atk ${nightmare.attack} > easy ${easy.attack}`);
  });

  test('bosses are flagged as bosses', () => {
    const boss = bossOf(generateDungeon('flag-test', 'medium'));
    assert.equal(boss.isBoss, true);
  });

  test('campaign depth stacks on top of difficulty', () => {
    const shallow = bossOf(generateDungeon('depth-test', 'medium', { depth: 1 }));
    const deep = bossOf(generateDungeon('depth-test', 'medium', { depth: 3 }));
    assert.ok(deep.health > shallow.health);
    assert.ok(deep.attack > shallow.attack);
  });
});

describe('Corridor frontage', () => {
  const fighters = CHARACTER_CARDS.filter(c => c.class === 'fighter');

  test('small parties swing at full strength', () => {
    const party = new Party(CHARACTER_CARDS.slice(0, 4));
    assert.equal(party.combatAttack(), party.totalAttack());
  });

  test('the mob strategy is dead: a party is four, however many you draft', () => {
    // Drafting the whole box used to be the dominant line (AUDIT.md D1:
    // five bare bodies won 100% of medium runs). The cap ends it.
    const mob = new Party([...CHARACTER_CARDS, ...CHARACTER_CARDS]);
    assert.equal(mob.members.length, PARTY_CAP, 'only four march');
    assert.ok(mob.reserve.length > 10, 'the rest wait in town');

    // And the ones who march are the ones drafted first
    const order = [...CHARACTER_CARDS, ...CHARACTER_CARDS].slice(0, PARTY_CAP).map(c => c.name);
    assert.deepEqual(mob.members.map(m => m.name), order,
      'draft order decides who fights');

    // No hidden frontage tax inside the cap: all four blades count
    const combat = mob.combatAttack();
    const total = mob.totalAttack();
    assert.equal(combat, total, `a capped party swings in full (${combat})`);
  });

  test('every character costs the same, and no card breaks the cap', () => {
    // The pool used to be silently uncosted: fighters ran 36-40 points
    // while wizards ran 22-26, all against a documented cap of 34. A
    // 24-point body and a 38-point body cannot compete for the same one
    // of four party slots, which is most of why the arcane package lost
    // (DESIGN_DIALOGUE.md §8). Equalized at 30 — the pool's own mean, so
    // parity cost no power — with the 34 cap left as real headroom.
    const cost = c => c.stats.health + c.stats.attack * 2 + c.stats.defense * 2 + c.stats.mind;
    const totals = CHARACTER_CARDS.map(cost);
    assert.equal(new Set(totals).size, 1,
      `every character is costed alike (found ${[...new Set(totals)].sort().join(', ')})`);
    for (const c of CHARACTER_CARDS) {
      assert.ok(cost(c) <= BUDGETS.character.statTotal,
        `${c.name} is inside the documented budget`);
      assert.deepEqual(validateCard(c), [], `${c.name} is a legal card`);
    }
  });

  test('each class still reads as itself after recosting', () => {
    const avg = (cls, key) => {
      const cards = CHARACTER_CARDS.filter(c => c.class === cls);
      return cards.reduce((s, c) => s + c.stats[key], 0) / cards.length;
    };
    // Fighters hold the line, wizards hold the mind: equal cost, not
    // equal shape
    assert.ok(avg('fighter', 'defense') > avg('wizard', 'defense'), 'fighters are armoured');
    assert.ok(avg('fighter', 'attack') > avg('wizard', 'attack'), 'fighters hit harder');
    assert.ok(avg('wizard', 'mind') > avg('fighter', 'mind'), 'wizards think harder');
    assert.ok(avg('cleric', 'health') > avg('rogue', 'health'), 'clerics outlast rogues');
  });

  test('a fallen adventurer can be replaced from the reserve, but only to the cap', () => {
    const party = new Party(CHARACTER_CARDS.slice(0, 6));
    assert.equal(party.reserve.length, 2);
    assert.equal(party.promoteReserve(), null, 'nobody is promoted over a living four');

    party.members[0].takeDamage(999);
    const promoted = party.promoteReserve();
    assert.ok(promoted, 'the dead make room');
    assert.equal(party.living().length, PARTY_CAP, 'still four in the field');
    assert.equal(party.reserve.length, 1);
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
