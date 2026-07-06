/**
 * Tests for the systems-depth layer: monster natures, elemental
 * spellcasting, trap types, and treasure finds.
 */

import { strict as assert } from 'assert';
import { applyNature, elementMult, TRAITS } from '../src/game/Bestiary.js';
import { generateDungeon, DUNGEON_THEMES, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { resolveRoomAction, rollFind } from '../src/encounters/RoomEncounters.js';
import { composeResolution } from '../src/narrative/Narrator.js';
import { Party } from '../src/agents/Party.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, SPELL_CARDS, CLASSES } from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const fighters = CHARACTER_CARDS.filter(c => c.class === CLASSES.FIGHTER);
const sp = id => SPELL_CARDS.find(s => s.id === id);

describe('The Bestiary', () => {
  test('natures overlay onto roster monsters at generation', () => {
    const d = generateDungeon('depth-nat', 'medium', { theme: 'crypt' });
    const annotated = d.rooms.filter(r => r.monster && (r.monster.trait || r.monster.weak || r.monster.undead));
    assert.ok(annotated.length > 0, 'crypt monsters carry natures');
    for (const r of d.rooms.filter(r => r.monster?.trait)) {
      assert.ok(TRAITS.includes(r.monster.trait), `${r.monster.kind}: known trait`);
    }
  });

  test('elements: weak ×1.5, resist ×0.5, undead always fear the holy', () => {
    const fire = { element: 'fire', power: 4 };
    const holy = { element: 'holy', power: 4 };
    assert.equal(elementMult(fire, { weak: ['fire'] }), 1.5);
    assert.equal(elementMult(fire, { resist: ['fire'] }), 0.5);
    assert.equal(elementMult(fire, {}), 1);
    assert.equal(elementMult(holy, { undead: true }), 1.5, 'no annotation needed');
    assert.equal(elementMult({ power: 4 }, { weak: ['fire'] }), 1, 'elementless spells are neutral');
  });
});

describe('Traits change the fight', () => {
  test('the slow strike last: a free first round', () => {
    // Against an unkillable wall, 12 rounds run; slow costs it round 1
    const wall = trait => ({ type: ROOM_TYPES.MONSTER, monster: { name: 'the wall', attack: 6, health: 9999, trait } });
    const partyA = new Party([fighters[0], fighters[1], fighters[2]]);
    const partyB = new Party([fighters[0], fighters[1], fighters[2]]);
    const fast = resolveRoomAction(wall(undefined), partyA, 'fight');
    const slow = resolveRoomAction(wall('slow'), partyB, 'fight');
    assert.ok(slow.damage < fast.damage, `slow bites later (${slow.damage} < ${fast.damage})`);
  });

  test('the ethereal ignore steel — unless a cleric gives it conviction', () => {
    const ghost = () => ({ type: ROOM_TYPES.MONSTER, monster: { name: 'a shade', attack: 2, health: 24, trait: 'ethereal' } });
    const steel = new Party([fighters[0], fighters[1]]);
    const faithful = new Party([fighters[0], fighters[1], byClass('cleric')]);
    const r1 = resolveRoomAction(ghost(), steel, 'fight');
    const r2 = resolveRoomAction(ghost(), faithful, 'fight');
    assert.ok(r2.rounds <= r1.rounds, `faith shortens it (${r2.rounds} ≤ ${r1.rounds})`);
    assert.ok(r1.preps.some(p => p.text.includes('pass through')), 'the futility is narrated');
    assert.ok(r2.preps.some(p => p.source === 'the cleric'), 'the litany is credited');
  });

  test('the venomous leave lingering poison; the cleric draws it', () => {
    const snake = () => ({ type: ROOM_TYPES.MONSTER, monster: { name: 'a viper', attack: 1, health: 2, trait: 'venomous' } });
    const bare = new Party([fighters[0]]);
    resolveRoomAction(snake(), bare, 'fight');
    assert.equal(bare.poisonLinger, 2, 'venom waits in the blood');
    const hp = bare.totalHealth();
    const linger = bare.applyLinger();
    assert.equal(linger.damage, 2);
    assert.equal(bare.totalHealth(), hp - 2, 'and bites on the march');

    const blessed = new Party([fighters[0], byClass('cleric')]);
    resolveRoomAction(snake(), blessed, 'fight');
    assert.ok(!blessed.poisonLinger, 'the cleric drew it at the corpse');
  });

  test('a tripped alarm makes the next fight meaner', () => {
    const party = new Party([fighters[0], fighters[1], fighters[2]]);
    resolveRoomAction({ type: ROOM_TYPES.TRAP, trapDamage: 6, trapType: 'alarm' }, party, 'push-through');
    assert.equal(party.alarmed, true, 'the bells told on them');
    const wall = { type: ROOM_TYPES.MONSTER, monster: { name: 'the warned', attack: 6, health: 9999 } };
    const result = resolveRoomAction(wall, party, 'fight');
    assert.ok(result.preps.some(p => p.source === 'the alarm'), 'the ambush is narrated');
    assert.equal(party.alarmed, false, 'and spent');
  });
});

describe('Elemental spellcasting', () => {
  test('the caster picks the spell the monster hates', () => {
    // Firebolt (4 fire) vs Frost Lance (5 frost) against a salamander:
    // frost is both stronger AND the weakness — but against a
    // frost-resistant target, fire wins despite lower power
    const party = new Party([byClass('wizard'), sp('sp-firebolt'), sp('sp-frost')]);
    const salamander = { type: ROOM_TYPES.MONSTER, monster: { name: 'a salamander', attack: 1, health: 30, resist: ['fire'], weak: ['frost'] } };
    const r = resolveRoomAction(salamander, party, 'spell-strike');
    assert.equal(r.spell, 'Frost Lance', 'the right tool');
    assert.equal(r.spellEdge, 'weak');

    const party2 = new Party([byClass('wizard'), sp('sp-firebolt'), sp('sp-frost')]);
    const wisp = { type: ROOM_TYPES.MONSTER, monster: { name: 'a frost wisp', attack: 1, health: 30, resist: ['frost'], weak: ['fire'] } };
    const r2 = resolveRoomAction(wisp, party2, 'spell-strike');
    assert.equal(r2.spell, 'Firebolt', 'never the resisted element');
  });

  test('Radiant Lance exists for the cleric\'s war', () => {
    const lance = sp('sp-radiance');
    assert.ok(lance && lance.element === 'holy' && lance.use === 'combat');
    assert.equal(elementMult(lance, { undead: true }), 1.5);
  });

  test('the choice is explained in the chronicle', () => {
    const text = composeResolution({ type: 'monster' }, 'spell-strike',
      { success: true, spell: 'Frost Lance', spellEdge: 'weak', spellElement: 'frost', monster: 'a salamander', rounds: 1, damage: 0, preps: [] },
      new Party([byClass('wizard')]));
    assert.ok(text.includes('chosen precisely'), 'the caster\'s read is narrated');
  });
});

describe('Trap types', () => {
  test('every theme sets its own kinds of snares', () => {
    for (const theme of Object.values(DUNGEON_THEMES)) {
      assert.ok(theme.trapTypes?.length >= 1, `${theme.id} has trapTypes`);
    }
    const d = generateDungeon('depth-traps', 'hard', { theme: 'volcanic' });
    for (const t of d.rooms.filter(r => r.type === ROOM_TYPES.TRAP)) {
      assert.ok(DUNGEON_THEMES.volcanic.trapTypes.includes(t.trapType), 'volcanic snares only');
    }
  });

  test('Frost Lance quenches a fire trap; without it, the burn is worse', () => {
    const room = () => ({ type: ROOM_TYPES.TRAP, trapDamage: 6, trapType: 'fire' });
    const bare = new Party([fighters[0], fighters[1]]);
    const frosty = new Party([fighters[0], fighters[1], sp('sp-frost')]);
    const r1 = resolveRoomAction(room(), bare, 'push-through');
    const r2 = resolveRoomAction(room(), frosty, 'push-through');
    assert.equal(r1.damage, 7, 'fire burns +1');
    assert.equal(r2.damage, 4, 'quenched −2 from the base');
    assert.ok(r2.preps.some(p => p.source === 'Frost Lance'));
  });

  test('poison traps sting little and linger long', () => {
    const party = new Party([fighters[0]]);
    const r = resolveRoomAction({ type: ROOM_TYPES.TRAP, trapDamage: 6, trapType: 'poison' }, party, 'push-through');
    assert.ok(r.damage <= 3, 'a half-strength sting');
    assert.equal(party.poisonLinger, 2, 'the patient part comes later');
  });
});

describe('Boss phases and coatings', () => {
  test('a boss turns the fight at half health, and the chronicle marks it', () => {
    // A big, weak-hitting boss against a strong party: the fight runs
    // long enough to cross the phase line, and the party still wins
    const party = new Party([fighters[0], fighters[1], fighters[2]]);
    const room = { type: ROOM_TYPES.BOSS, monster: { name: 'the Test King', kind: 'test-king', attack: 2, health: 60, isBoss: true } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.equal(result.bossPhased, true, 'the phase line was crossed');
    assert.ok(result.preps.some(p => p.text.includes('💢') || p.text.includes('👑')), 'the turn is narrated');
  });

  test('rank-and-file monsters never phase', () => {
    const party = new Party([fighters[0], fighters[1], fighters[2]]);
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a big rat', attack: 2, health: 60 } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.equal(result.bossPhased, false);
  });

  test('a fire coating bites deeper into what hates fire', () => {
    const arm = () => {
      const p = new Party([fighters[0], fighters[1]]);
      p.members[0].addWeaponMod({ name: 'fire coating', attack: 2, element: 'fire' });
      return p;
    };
    const vsWeak = arm().coatingBonusVs({ weak: ['fire'] });
    assert.equal(vsWeak.bonus, 2);
    assert.deepEqual(vsWeak.notes, ['fire coating']);
    const vsResist = arm().coatingBonusVs({ resist: ['fire'] });
    assert.equal(vsResist.bonus, 0, 'no edge against the fireproof');
  });

  test('venom sickens the living but not the dead; holy coatings burn the undead', () => {
    const party = new Party([fighters[0]]);
    party.members[0].addWeaponMod({ name: 'venom coating', attack: 3, venom: true });
    assert.equal(party.coatingBonusVs({}).bonus, 1, 'the living bleed');
    assert.equal(party.coatingBonusVs({ undead: true }).bonus, 0, 'the dead have no blood');

    const blessed = new Party([fighters[0]]);
    blessed.members[0].addWeaponMod({ name: 'blessed oil', attack: 1, element: 'holy' });
    assert.equal(blessed.coatingBonusVs({ undead: true }).bonus, 2, 'holy burns the dead');
  });

  test('the coating is credited in the fight', () => {
    const party = new Party([fighters[0], fighters[1]]);
    party.members[0].addWeaponMod({ name: 'fire coating', attack: 2, element: 'fire' });
    const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a vine', attack: 1, health: 10, weak: ['fire'] } };
    const result = resolveRoomAction(room, party, 'fight');
    assert.ok(result.preps.some(p => p.source.includes('fire coating')), 'the bench gets the credit');
  });
});

describe('Finds — treasure beyond coin', () => {
  test('a vault always yields a find; the kind spans the table', () => {
    const kinds = new Set();
    for (const r of [0.1, 0.3, 0.6, 0.9]) {
      const party = new Party([fighters[0]]);
      const find = rollFind(party, true, r);
      assert.ok(find, 'always, in a vault');
      kinds.add(find.find);
    }
    assert.ok(kinds.size >= 3, `variety across rolls (${[...kinds]})`);
  });

  test('a scroll find grows the grimoire; a trinket is worn at once', () => {
    const party = new Party([fighters[0]]);
    const before = party.grimoire.length;
    // Sweep rolls until a scroll and a trinket have both landed
    let scroll = null;
    let trinket = null;
    for (let r = 0.01; r < 1; r += 0.03) {
      const f = rollFind(party, true, r);
      if (f.find === 'scroll') scroll = f;
      if (f.find === 'trinket') trinket = f;
    }
    assert.ok(scroll && party.grimoire.length > before, 'the grimoire grew');
    assert.ok(trinket && party.members[0].equipment.some(e => e.slot === 'trinket'), 'the charm is worn');
  });

  test('a full crawl with all systems live still concludes', () => {
    for (const theme of ['castle', 'icecaverns', 'bogcellar']) {
      const sim = new Simulator([fighters[0], byClass('cleric'), byClass('wizard'), sp('sp-frost'), sp('sp-radiance')], `depth-${theme}`, 'easy', { theme });
      let guard = 0;
      while (!sim.gameOver && guard++ < 80) sim.tick();
      assert.ok(sim.gameOver, `${theme} concludes`);
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
