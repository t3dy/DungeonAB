/**
 * Tests for party, dungeon generation, encounters, and the full crawl
 */

import { strict as assert } from 'assert';
import { Party } from '../src/agents/Party.js';
import { generateDungeon, ROOM_TYPES } from '../src/world/DungeonGen.js';
import { getRoomOptions, resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import { Simulator } from '../src/sim/Simulator.js';
import { CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, PERSONALITY_CARDS } from '../src/game/Cards.js';
import { composePredicament, composeDeliberation, composeFall } from '../src/narrative/Narrator.js';

const fighter = CHARACTER_CARDS.find(c => c.class === 'fighter');
const cleric = CHARACTER_CARDS.find(c => c.class === 'cleric');
const rogue = CHARACTER_CARDS.find(c => c.class === 'rogue');
const wizard = CHARACTER_CARDS.find(c => c.class === 'wizard');
const alchemist = CHARACTER_CARDS.find(c => c.class === 'alchemist');

describe('Party assembly', () => {
  test('characters become the roster, capped at four; the rest are reserve', () => {
    const small = new Party([fighter, cleric]);
    assert.equal(small.members.length, 2);
    assert.equal(small.reserve.length, 0);

    // Five classes cannot all march — the cap forces a choice, which
    // is the point of it (AUDIT.md D1)
    const overfull = new Party([fighter, cleric, rogue, wizard, alchemist]);
    assert.equal(overfull.members.length, 4);
    assert.equal(overfull.reserve.length, 1);
    assert.ok(!overfull.hasClass('alchemist'), 'the fifth pick waits in town');
  });

  test('an empty draft gets Pip the Tavern Volunteer (no dead runs)', () => {
    const party = new Party([SPELL_CARDS[0], PERSONALITY_CARDS[0]]);
    assert.equal(party.members.length, 1);
    assert.ok(party.members[0].name.includes('Pip'));
  });

  test('equipment auto-assigns to best-fit class', () => {
    const shield = EQUIPMENT_CARDS.find(e => e.id === 'eq-tower-shield');
    const picks = EQUIPMENT_CARDS.find(e => e.id === 'eq-lockpicks');
    const party = new Party([fighter, rogue, shield, picks]);
    const f = party.members.find(m => m.class === 'fighter');
    const r = party.members.find(m => m.class === 'rogue');
    assert.ok(f.equipment.some(e => e.id === 'eq-tower-shield'));
    assert.ok(r.equipment.some(e => e.id === 'eq-lockpicks'));
  });

  test('fighters absorb damage first', () => {
    const party = new Party([fighter, wizard]);
    const f = party.members.find(m => m.class === 'fighter');
    const w = party.members.find(m => m.class === 'wizard');
    party.takeDamage(4);
    assert.ok(f.health < f.maxHealth, 'fighter took the hit');
    assert.equal(w.health, w.maxHealth, 'wizard untouched behind the line');
  });

  test('prepared workings persist and recharge; found scrolls burn', () => {
    const bolt = SPELL_CARDS.find(s => s.use === 'combat');

    // A drafted spell is a prepared working: it stays in the grimoire,
    // but it is spent for the room once cast
    const party = new Party([fighter, bolt]);
    assert.ok(party.castSpell('combat'), 'the first cast works');
    assert.equal(party.grimoire.length, 1, 'a drafted card is not consumed');
    assert.equal(party.castSpell('combat'), null, 'but it is spent for this room');
    party.restStep();
    assert.ok(party.castSpell('combat'), 'and ready again on the march');

    // A sealed scroll out of a hoard is one cast and gone
    const scrolled = new Party([fighter]);
    scrolled.grimoire.push({ ...bolt, id: 'found-bolt', source: 'found' });
    assert.ok(scrolled.castSpell('combat'));
    assert.equal(scrolled.grimoire.length, 0, 'the scroll burned');
  });

  test('mind buys spell power, and a wizard amplifies on top', () => {
    const bolt = SPELL_CARDS.find(s => s.use === 'combat');
    const brawn = new Party([fighter, bolt]);
    const arcane = new Party([wizard, bolt]);
    const plain = brawn.castSpell('combat');
    const amped = arcane.castSpell('combat');
    assert.ok(plain.effectivePower >= bolt.power, 'mind never subtracts');
    assert.ok(amped.effectivePower > plain.effectivePower,
      `the wizard's mind and amplification tell (${amped.effectivePower} > ${plain.effectivePower})`);
  });

  test('alchemy needs an alchemist and materials', () => {
    const noAlch = new Party([fighter]);
    noAlch.materials = 3;
    assert.equal(noAlch.doAlchemy(), null);

    const alch = new Party([alchemist]);
    assert.equal(alch.doAlchemy(), null, 'no materials, no miracles');
    alch.materials = 2;
    const potion = alch.doAlchemy(0.2); // < 0.5 → potion
    assert.equal(potion.type, 'potion');
    assert.equal(alch.potions.length >= 1, true);
    const mod = alch.doAlchemy(0.9); // ≥ 0.5 → weapon mod
    assert.equal(mod.type, 'weapon-mod');
    assert.equal(alch.materials, 0);
  });
});

describe('Dungeon generation', () => {
  test('dungeon runs entrance → boss', () => {
    const d = generateDungeon('delve-1', 'medium');
    assert.equal(d.rooms[0].type, ROOM_TYPES.ENTRANCE);
    assert.equal(d.rooms[d.spine[d.spine.length - 1]].type, ROOM_TYPES.BOSS, 'the spine ends at the boss');
    assert.ok(d.length >= 10);
  });

  test('same seed, same dungeon', () => {
    const a = generateDungeon('delve-2', 'medium');
    const b = generateDungeon('delve-2', 'medium');
    assert.deepEqual(a.rooms.map(r => r.type), b.rooms.map(r => r.type));
  });

  test('library and shrine guaranteed; lab guaranteed when wanted', () => {
    for (const seed of ['g1', 'g2', 'g3', 'g4', 'g5']) {
      const d = generateDungeon(seed, 'hard', { wantLab: true });
      const types = d.rooms.map(r => r.type);
      assert.ok(types.includes(ROOM_TYPES.LIBRARY), `${seed} has a library`);
      assert.ok(types.includes(ROOM_TYPES.SHRINE), `${seed} has a shrine`);
      assert.ok(types.includes(ROOM_TYPES.LAB), `${seed} has a lab`);
      assert.ok(types.includes(ROOM_TYPES.MATERIALS), `${seed} has materials`);
    }
  });
});

describe('Room encounters', () => {
  test('class gating: rogues unlock sneak and disarm', () => {
    const noRogue = new Party([fighter]);
    const withRogue = new Party([fighter, rogue]);
    const monsterRoom = { type: ROOM_TYPES.MONSTER, monster: { name: 'a test beast', attack: 4, health: 10 } };
    const trapRoom = { type: ROOM_TYPES.TRAP, trapDamage: 4 };

    assert.ok(!getRoomOptions(monsterRoom, noRogue).some(o => o.id === 'sneak'));
    assert.ok(getRoomOptions(monsterRoom, withRogue).some(o => o.id === 'sneak'));
    assert.ok(!getRoomOptions(trapRoom, noRogue).some(o => o.id === 'disarm'));
    assert.ok(getRoomOptions(trapRoom, withRogue).some(o => o.id === 'disarm'));
  });

  test('cleric unlocks turn-undead only against the undead', () => {
    const party = new Party([cleric]);
    const undeadRoom = { type: ROOM_TYPES.MONSTER, monster: { name: 'bones', undead: true, attack: 4, health: 10 } };
    const beastRoom = { type: ROOM_TYPES.MONSTER, monster: { name: 'beast', undead: false, attack: 4, health: 10 } };
    assert.ok(getRoomOptions(undeadRoom, party).some(o => o.id === 'turn-undead'));
    assert.ok(!getRoomOptions(beastRoom, party).some(o => o.id === 'turn-undead'));
  });

  test('lab bench needs alchemist AND materials', () => {
    const labRoom = { type: ROOM_TYPES.LAB };
    const alchParty = new Party([alchemist]);
    assert.ok(!getRoomOptions(labRoom, alchParty).some(o => o.id === 'alchemy'), 'no materials yet');
    alchParty.materials = 1;
    assert.ok(getRoomOptions(labRoom, alchParty).some(o => o.id === 'alchemy'));
  });

  test('looting treasure pays out', () => {
    const party = new Party([fighter, rogue]);
    const room = { type: ROOM_TYPES.TREASURE, gold: 30, mimicChance: 0 };
    const result = resolveRoomAction(room, party, 'loot');
    assert.equal(result.gold, 30);
    assert.equal(party.gold, 30);
  });

  test('studying in the library adds real spells to the grimoire', () => {
    const party = new Party([fighter]);
    const before = party.grimoire.length;
    resolveRoomAction({ type: ROOM_TYPES.LIBRARY }, party, 'study');
    assert.ok(party.grimoire.length > before);
    assert.ok(party.spellsLearned >= 1);
  });
});

describe('The full crawl', () => {
  test('a solid party crawls to a conclusion', () => {
    const pool = [fighter, cleric, rogue, wizard, alchemist,
      EQUIPMENT_CARDS[0], EQUIPMENT_CARDS[1], SPELL_CARDS[0], SPELL_CARDS[1],
      PERSONALITY_CARDS[0]];
    const sim = new Simulator(pool, 'crawl-1', 'easy');
    let safety = 0;
    while (!sim.gameOver && safety < 60) {
      safety++;
      sim.tick();
    }
    assert.ok(sim.gameOver, 'the crawl ends');
    assert.ok(sim.epitaph, 'the ending is narrated');
    const result = sim.getRunResult();
    assert.ok(result.roomsCleared > 0);
    assert.equal(typeof result.score, 'number');
  });

  test('every tick narrates in three beats', () => {
    const sim = new Simulator([fighter, cleric], 'crawl-2', 'easy');
    sim.tick();
    const n = sim.lastNarration;
    assert.ok(n.predicament.length > 20);
    assert.ok(n.deliberation.includes('chose to'));
    assert.ok(n.resolution.length > 5);
  });

  test('narration exists for every room type', () => {
    for (const type of Object.values(ROOM_TYPES)) {
      const text = composePredicament({ type });
      assert.ok(text.length > 30, `predicament for ${type}`);
    }
  });

  test('the predicament names the foe when there is one', () => {
    const monsterText = composePredicament({ type: ROOM_TYPES.MONSTER, monster: { name: 'a cold-eyed wraith' } });
    assert.ok(monsterText.includes('cold-eyed wraith'), 'the monster is named');
    const bossText = composePredicament({ type: ROOM_TYPES.BOSS, monster: { name: 'the Shrouded King' } });
    assert.ok(bossText.includes('Shrouded King'), 'the boss is named');
    // Still safe with no monster attached (falls back to the generic pool)
    assert.ok(composePredicament({ type: ROOM_TYPES.MONSTER }).length > 30);
  });

  test('a death is reported plainly: name and class', () => {
    for (const cls of ['fighter', 'cleric', 'wizard', 'rogue', 'alchemist']) {
      const text = composeFall({ name: 'Testa the Doomed', class: cls });
      assert.ok(text.includes('Testa the Doomed falls'), `${cls}: the fallen are named`);
      assert.ok(text.includes(cls), `${cls}: the class is stated`);
      assert.ok(text.length > 40, `${cls}: a death is a full sentence`);
    }
  });

  test('a wipe writes the fallen into the chronicle', () => {
    // A lone wizard on nightmare does not come home. Find the tick
    // where they fall and check the beat was written.
    let sawFall = false;
    for (const seed of ['doom-1', 'doom-2', 'doom-3', 'doom-4', 'doom-5']) {
      const sim = new Simulator([wizard], seed, 'nightmare');
      let guard = 0;
      while (!sim.gameOver && guard++ < 60) {
        sim.tick();
        if (sim.lastNarration?.falls?.length > 0) {
          assert.ok(sim.lastNarration.falls[0].includes(sim.party.members[0].name));
          sawFall = true;
        }
      }
      if (sawFall) break;
    }
    assert.ok(sawFall, 'somewhere in five doomed delves, a wizard fell on the record');
  });

  test('deliberation names the roads not taken', () => {
    const party = new Party([fighter, rogue, PERSONALITY_CARDS[1]]); // cunning
    const options = [
      { id: 'fight' }, { id: 'sneak' }, { id: 'flee' },
    ];
    const text = composeDeliberation('sneak', options, party);
    assert.ok(text.includes('chose to'));
    assert.ok(text.includes('might have chosen'));
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
