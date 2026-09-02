/**
 * Encounters — data-driven situations for the capability engine
 *
 * These run alongside RoomEncounters' hand-written rooms, not instead
 * of them: a room carrying an `encounterId` is governed by the
 * definition named here. The point of each one is that a party's
 * drafted capabilities change what is on the menu, and that the
 * consequences reach past the room they happen in.
 *
 * No option names a character. Capabilities do all the gating.
 */

import { registerEncounter } from './EncounterEngine.js';

/* ------------------------------------------------------------------ */
/* The Astronomer's Chamber                                            */
/* ------------------------------------------------------------------ */

registerEncounter({
  id: 'astronomers-chamber',
  title: 'The Astronomer\'s Chamber',
  situation: 'A brass orrery fills the room, its planets moving incorrectly — and the walls have begun to turn with them.',
  affordances: ['mechanism', 'astral', 'unstable-environment'],
  options: [
    {
      id: 'repair-gears', name: 'Repair the Gears', desc: 'Still the mechanism and salvage what it sheds',
      requires: ['tinkering'], affordances: ['mechanism'], weight: 1.5,
    },
    {
      id: 'correct-orrery', name: 'Correct the Orrery', desc: 'Set the planets right and read what they say',
      requires: ['astronomy'], affordances: ['astral'], weight: 1.5,
    },
    {
      id: 'divine-instability', name: 'Divine the Instability', desc: 'Ask which motion is the dangerous one',
      requires: ['divination'], affordances: ['astral'], weight: 1,
    },
    {
      id: 'recognize-model', name: 'Recognize the Model', desc: 'Name the cosmology; note it for the record',
      requires: ['knowledge'], affordances: ['mechanism', 'astral'], weight: 1,
    },
    {
      id: 'compute-epicycles', name: 'Compute the Epicycles', desc: 'An orrery is a calculating engine; work out what it is calculating wrongly',
      requires: ['mathematics'], affordances: ['mechanism'], weight: 1.5,
    },
    {
      id: 'steady-ground', name: 'Hold the Stationary Floor', desc: 'Put the party on the part that is not turning',
      requires: ['tactics'], weight: 1,
    },
    { id: 'hurry-through', name: 'Hurry Through', desc: 'Run the turning floor and hope' },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'repair-gears':
        party.addGold(8);
        party.addScore(20);
        return { success: true, narrative: '🔧 The gears are coaxed still and the walls stop. A stripped bronze pinion goes into the satchel: +8 gold, +20 score.' };
      case 'correct-orrery':
        party.addScore(20);
        party.starBlessed = true;
        return { success: true, narrative: '🔭 The planets are set right and the room settles. The corrected heavens counsel the party: the next fight begins under a favourable aspect. +20 score.' };
      case 'divine-instability':
        party.addScore(15);
        party.forewarned = true;
        return { success: true, narrative: '🔮 The dangerous motion is named before it completes. The party crosses untouched, and forewarned of the next snare in their path. +15 score.' };
      case 'recognize-model':
        party.addScore(30);
        return { success: true, narrative: '📖 The cosmological model is recognized and recorded — worth rather more to the right buyer than the brass it turns on. +30 score.' };
      case 'compute-epicycles':
        party.addScore(26);
        party.addGold(8);
        return { success: true, narrative: '📐 The fault is arithmetical, not mechanical: one wheel was cut to the wrong ratio and has been quietly wrong for a century. Worked out on the floor in chalk, corrected with a shim, and the spare bronze goes in the satchel. +1 material, +26 score.' };
      case 'steady-ground':
        party.addScore(10);
        return { success: true, narrative: '🎯 The stationary floor is found and held; the party crosses in order while the room turns around them. +10 score.' };
      case 'hurry-through':
      default:
        party.takeDamage(2);
        return { success: false, damage: 2, narrative: '💫 The floor turns underfoot mid-crossing: 2 damage, and the party comes out of it in no order at all.' };
    }
  },
});

/* ------------------------------------------------------------------ */
/* The Sealed Laboratory — a door of correspondences                   */
/* ------------------------------------------------------------------ */

registerEncounter({
  id: 'sealed-laboratory',
  title: 'The Sealed Laboratory',
  situation: 'A door bears the signs of Mercury, Venus, Mars, Jupiter, Saturn and the Sun. It has no handle, and the room beyond it is plainly still in use.',
  affordances: ['mechanism', 'astral', 'apparatus', 'study'],
  options: [
    {
      id: 'read-correspondences', name: 'Read the Correspondences', desc: 'The signs are a system; follow it',
      requires: ['correspondence'], affordances: ['astral'], weight: 2,
    },
    {
      id: 'planetary-sequence', name: 'Work the Planetary Sequence', desc: 'The order is astronomical, not decorative',
      requires: ['astronomy'], affordances: ['astral'], weight: 1.5,
    },
    {
      id: 'material-symbolism', name: 'Read the Metals', desc: 'Each planet is also a metal, and the metals are the lock',
      requires: ['alchemy'], affordances: ['apparatus'], weight: 1.5,
    },
    {
      id: 'reconcile-traditions', name: 'Reconcile the Traditions', desc: 'Two systems overlap here; use both',
      requires: ['syncretism'], weight: 1.5,
    },
    {
      id: 'divine-sequence', name: 'Divine the Order', desc: 'Ask which sign opens it and which is the trap',
      requires: ['divination'], weight: 1,
    },
    { id: 'force-the-door', name: 'Force the Door', desc: 'It is only a door' },
    { id: 'leave-sealed', name: 'Leave It Sealed', desc: 'Some laboratories are sealed on purpose' },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    const openIt = (narrative, score) => {
      party.addGold(15);
      party.addScore(score);
      return { success: true, narrative };
    };
    switch (optionId) {
      case 'read-correspondences':
        return openIt('🔗 The signs are not a lock but an argument, and it can be followed to its conclusion. The door opens on a working laboratory: +15 gold, +35 score.', 35);
      case 'planetary-sequence':
        return openIt('🔭 Pressed in the order the planets actually stand tonight, the signs give. +15 gold, +30 score.', 30);
      case 'material-symbolism':
        return openIt('⚗️ Each sign is its metal, and the metals want touching in the order of their melting. +15 gold, +30 score.', 30);
      case 'reconcile-traditions':
        return openIt('☯️ Two traditions are quarrelling on one door; reconciled, they agree to open it. +15 gold, +35 score.', 35);
      case 'divine-sequence':
        party.addScore(15);
        party.forewarned = true;
        return { success: true, narrative: '🔮 The sequence is read before it is attempted — and so is the sign that would have taken a hand off. +15 score, and the next snare is known.' };
      case 'force-the-door': {
        party.takeDamage(4);
        party.addScore(10);
        party.addGold(8);
        return { success: false, damage: 4, narrative: '💥 The door yields to shoulders and a crowbar, and the ward on it yields something back: 4 damage, and only what could be grabbed on the way past. +8 gold scraped up.' };
      }
      case 'leave-sealed':
      default:
        return { success: true, narrative: '🚪 The party leaves the laboratory sealed, as several previous parties evidently decided to.' };
    }
  },
});

/* ------------------------------------------------------------------ */
/* The Monster With a Grievance                                        */
/* ------------------------------------------------------------------ */

registerEncounter({
  id: 'monster-grievance',
  title: 'The Monster With a Grievance',
  situation: 'Something large blocks the passage and does not attack. It says, in a language it did not expect anyone to answer, that adventurers stole something from its people.',
  affordances: ['creature', 'people'],
  options: [
    {
      id: 'negotiate-grievance', name: 'Negotiate', desc: 'It is talking. Talk back',
      requires: ['diplomacy'], affordances: ['people'], weight: 2,
    },
    {
      id: 'translate-claim', name: 'Answer in Its Own Tongue', desc: 'Nobody has done that in a long time',
      requires: ['translation'], weight: 2,
    },
    {
      id: 'identify-artifact', name: 'Identify the Disputed Thing', desc: 'Recognize what was actually taken',
      requires: ['antiquarian'], weight: 1.5,
    },
    {
      id: 'investigate-claim', name: 'Investigate the Claim', desc: 'Find out whether it is even true',
      requires: ['knowledge'], weight: 1,
    },
    {
      id: 'slip-past-grievance', name: 'Slip Past It', desc: 'It is watching the passage, not the ceiling',
      requires: ['rogue'], weight: 1,
    },
    { id: 'fight-grievance', name: 'Fight It', desc: 'Talking is not the party\'s strength' },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'negotiate-grievance':
        party.addScore(25);
        party.addGold(20);
        return { success: true, narrative: '🤝 The grievance is real, old, and settleable. It stands aside, and pays 20 gold out of a hoard it says was never the point. +25 score.' };
      case 'translate-claim':
        party.addScore(30);
        party.addGold(15);
        return { success: true, narrative: '🌐 Answered in its own tongue, it stops being a monster in the passage and becomes someone with a complaint. It gives the party passage and a gift of its own reagents: +15 gold, +30 score.' };
      case 'identify-artifact':
        party.addScore(30);
        party.addGold(35);
        return { success: true, narrative: '🏺 The disputed thing is named, dated, and — awkwardly — recognized as something a previous party sold. It settles for the coin that changed hands: 35 gold to the party for the honesty. +30 score.' };
      case 'investigate-claim':
        party.addScore(20);
        return { success: true, narrative: '📖 The claim checks out in every particular, which it did not expect anyone to bother doing. It steps out of the way. +20 score.' };
      case 'slip-past-grievance':
        party.addScore(15);
        return { success: true, narrative: '🗡️ The party goes over and around while it watches the floor. Nothing is settled, but nothing is spent either. +15 score.' };
      case 'fight-grievance':
      default: {
        party.takeDamage(6);
        party.addScore(15);
        return {
          success: false, damage: 6,
          narrative: '⚔️ It is not a difficult fight, because it was not expecting one. That is most of what is wrong with it: 6 damage, and the passage is clear.',
        };
      }
    }
  },
});

/* ================================================================ */
/* Mid-dungeon examinations — testing dead capabilities             */
/* ================================================================ */

registerEncounter({
  id: 'appraiser-test',
  rides: ['treasure', 'vault'],
  title: 'A Choice Between Treasures',
  situation: 'Three chests lie ahead, each promising wealth. Only one holds real value; the others are cursed, trapped, or simply weighted lead. You have time for one.',
  affordances: ['valuables', 'hazard'],
  options: [
    {
      id: 'appraise-chests', name: 'Appraise Each Chest', desc: 'Examine them carefully and identify the true prize',
      requires: ['appraisal'], affordances: ['valuables'], weight: 2,
    },
    {
      id: 'knowledge-mark', name: 'Recognize the Maker\'s Mark', desc: 'The goldsmith\'s seal tells you which is real',
      requires: ['knowledge', 'antiquarian'], affordances: [], weight: 1.5,
    },
    {
      id: 'observation-pick', name: 'Notice What Others Missed', desc: 'One chest has a scratch where the lock was tested',
      requires: ['observation'], affordances: [], weight: 1,
    },
    {
      id: 'guess-heavy', name: 'Take the Heaviest', desc: 'Gold is heavy. Probably.',
      requires: [],
    },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'appraise-chests':
        party.gold += 40;
        party.addScore(25);
        party.forewarned = true;
        return {
          success: true,
          narrative: '💰 Examined closely, the real chest is obvious — and so is how the other two were rigged, which is a lesson that keeps. +40 gold, +25 score, and the next snare is already understood.',
        };
      case 'knowledge-mark':
        party.gold += 35;
        party.addScore(20);
        return {
          success: true,
          narrative: '🏺 The mark of Maestro Cellini seals the chest — his work alone was worth the journey. +35 gold, +20 score.',
        };
      case 'observation-pick':
        party.gold += 30;
        party.addScore(18);
        return {
          success: true,
          narrative: '👁️ That faint scratch tells the story: this chest was opened, tested, and resealed. The real prize. +30 gold, +18 score.',
        };
      case 'guess-heavy':
      default:
        // A blast big enough to scar, and it leaves the party spread
        // across the room picking itself up — which is the shape it is
        // still in when the next thing finds it.
        party.takeDamage(5);
        party.forcedFormation = 'loose';
        party.gold += 10;
        return {
          success: false,
          damage: 5,
          narrative: '💥 The heaviest chest was heavy because of what was packed around the lead. 5 damage, the party scattered across the floor, and only 10 gold in the wreckage — and it meets the next room spread out and unready.',
        };
    }
  },
});

registerEncounter({
  id: 'experimental-crossroads',
  rides: ['treasure', 'corridor'],
  title: 'A Mechanism in Pieces',
  situation: 'A elaborate mechanism blocks the passage, broken into components. It was clearly built to open the far door, but whether it can be reassembled, or should be, is unclear. There are three similar passages around it.',
  affordances: ['mechanism', 'apparatus'],
  options: [
    {
      id: 'experiment-rebuild', name: 'Experiment With Assembly', desc: 'Try combinations until something works',
      requires: ['experimentation'], affordances: ['mechanism', 'apparatus'], weight: 2,
    },
    {
      id: 'alchemy-bypass', name: 'Dissolve the Lock', desc: 'The mechanism is guarding something. Dissolve it.',
      requires: ['alchemy'], affordances: ['apparatus'], weight: 1.5,
    },
    {
      id: 'tinkering-solve', name: 'Understand and Fix It', desc: 'This was engineered carefully. Restore it.',
      requires: ['tinkering'], affordances: ['mechanism'], weight: 1.5,
    },
    {
      id: 'take-detour', name: 'Take One of the Side Passages', desc: 'Avoid the mechanism entirely',
      requires: [],
    },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'experiment-rebuild':
        party.addGold(15);
        party.addScore(20);
        return {
          success: true,
          narrative: '🧪 Trial and error yields insight. The mechanism opens, and what its builder left in the works rewards the experiment. +15 gold, +20 score.',
        };
      case 'alchemy-bypass':
        party.addScore(15);
        return {
          success: true,
          narrative: '⚗️ The lock dissolves. The mechanism doesn\'t open the door, but it doesn\'t need to now. +15 score.',
        };
      case 'tinkering-solve':
        party.addScore(22);
        party.forcedFormation = 'shieldwall';
        return {
          success: true,
          narrative: '🔧 The mechanism is understood and restored — it was a door-holder, and it shows the party how the builders meant to stand in this passage. The party takes that shape and keeps it. +22 score, and a shield wall into the next fight.',
        };
      case 'take-detour':
      default:
        // The lamp, not the monsters, is what a detour costs.
        party.supply = Math.max(0, party.supply - 2);
        party.addScore(8);
        return {
          success: true,
          narrative: '🛤️ The side passage goes round, and round, and eventually through. Two more marches of oil burned than the direct road would have cost. +8 score.',
        };
    }
  },
});

registerEncounter({
  id: 'healer-trial',
  rides: ['shrine', 'corridor'],
  title: 'A Companion Falls Suddenly Ill',
  situation: 'One party member collapses with a fever that will only worsen. The next room is impassable without someone strong enough to navigate. Medicine might help immediately; preparation would have prevented this.',
  affordances: [],
  options: [
    {
      id: 'heal-directly', name: 'Apply Direct Healing', desc: 'A healing working brings the fever down',
      requires: ['healing'], affordances: [], weight: 2,
    },
    {
      id: 'medicine-diagnose', name: 'Diagnose and Treat', desc: 'Medical knowledge identifies the cause and cure',
      requires: ['medicine'], affordances: [], weight: 2,
    },
    {
      id: 'naturalphil-remedy', name: 'Apply Natural Remedy', desc: 'A non-occult solution is sometimes strongest',
      requires: ['naturalPhilosophy'], affordances: [], weight: 1.5,
    },
    {
      id: 'push-through', name: 'Press On Without Treatment', desc: 'They\'ll recover or they won\'t',
      requires: [],
    },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    const living = party.living();
    const sick = living.length > 0 ? living[0] : null;

    switch (optionId) {
      case 'heal-directly':
        if (sick) sick.heal(3);
        party.addScore(15);
        return {
          success: true,
          narrative: '💚 The fever breaks under the working\'s touch. ' + (sick?.name || 'The member') + ' is steady again. +15 score.',
        };
      case 'medicine-diagnose':
        if (sick) sick.heal(4);
        party.addScore(18);
        return {
          success: true,
          narrative: '💊 The diagnosis is swift: a blood imbalance, easily corrected. Medical knowledge and a minute\'s treatment restore full vigor. +18 score.',
        };
      case 'naturalphil-remedy':
        if (sick) sick.heal(3);
        party.addScore(16);
        return {
          success: true,
          narrative: '🌿 The cure is mundane: cool water, rest, and specific herbs gathered from the last room. Within the hour, the crisis passes. +16 score.',
        };
      case 'push-through':
      default:
        // Carried rather than treated: one body takes a blow heavy
        // enough to scar, and a scar is a ceiling healing cannot reach
        // for the rest of the delve (agents/Adventurer.js).
        if (sick) sick.takeDamage(6);
        party.forcedFormation = 'column';
        return {
          success: false,
          damage: 6,
          narrative: `🤒 ${sick?.name || 'The stricken member'} is carried rather than treated, and the fever takes its price in full: 6 damage, and the party files through the next passage strung out around the litter.`,
        };
    }
  },
});

registerEncounter({
  id: 'memory-reconstruction',
  rides: ['library'],
  title: 'A Puzzle From the Past',
  situation: 'On the floor lies a mosaic, shattered into fragments. Its original pattern would show the way forward, but the image is fractured. Several walls hold clues: a scratched mural, a partial inscription, numbered tiles arranged in an earlier room.',
  affordances: ['books', 'mechanism'],
  options: [
    {
      id: 'reconstruct-memory', name: 'Reconstruct From Memory', desc: 'Recall every detail from earlier passages and rebuild the image',
      requires: ['memory'], affordances: [], weight: 2,
    },
    {
      id: 'imagine-solution', name: 'Imagine What It Should Be', desc: 'Creative insight fills the gaps',
      requires: ['imagination'], affordances: [], weight: 1.5,
    },
    {
      id: 'knowledge-pattern', name: 'Recognize the Pattern', desc: 'The image is historical; you know it',
      requires: ['knowledge'], affordances: ['books'], weight: 1,
    },
    {
      id: 'smash-wall', name: 'Break Through the Wall', desc: 'The hard way',
      requires: [],
    },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'reconstruct-memory':
        party.forewarned = true;
        party.forcedFormation = 'line';
        party.addScore(20);
        return {
          success: true,
          narrative: '🧠 Every detail aligns. The mosaic rebuilds perfectly, and what it shows is the floor plan of the rooms ahead — where the snare is, and where there is room to spread out before it. +20 score.',
        };
      case 'imagine-solution':
        party.addScore(16);
        party.gold += 10;
        return {
          success: true,
          narrative: '✨ Your creative instinct pieces together something that was never there but might have been. A hidden cache reveals itself. +10 gold, +16 score.',
        };
      case 'knowledge-pattern':
        party.addScore(18);
        return {
          success: true,
          narrative: '📖 This is a map of the crypt of San Severino. You know its layout from history. The path forward is obvious. +18 score.',
        };
      case 'smash-wall':
      default:
        party.takeDamage(3);
        party.supply = Math.max(0, party.supply - 1);
        party.forcedFormation = 'column';
        return {
          success: false,
          damage: 3,
          narrative: '💥 The wall yields to force and the ceiling comes with it. 3 damage, a march of oil spent clearing the rubble, and what is left is a hole the party can only go through one at a time.',
        };
    }
  },
});

registerEncounter({
  id: 'musician-harmony',
  rides: ['shrine', 'disaster'],
  title: 'A Room in Discord',
  situation: 'The air thrums with conflicting resonances. Three different frequencies echo in the chamber, each slightly out of tune with the others. The dissonance is growing, and the walls show stress fractures. Silence would fail: something here needs to be singing.',
  affordances: ['sacred', 'unstable-environment'],
  options: [
    {
      id: 'music-harmony', name: 'Sing the Harmony', desc: 'A voice trained in music can unify the three tones',
      requires: ['music'], affordances: [], weight: 2,
    },
    {
      id: 'harmony-attune', name: 'Attune the Resonances', desc: 'Bring them into consonance through sympathetic magic',
      requires: ['harmony'], affordances: ['sacred'], weight: 2,
    },
    {
      id: 'correspondence-solve', name: 'Understand and Link Them', desc: 'The three frequencies correspond to three principles that must agree',
      requires: ['correspondence'], affordances: [], weight: 1.5,
    },
    {
      id: 'endure-discord', name: 'Endure the Discord', desc: 'Push through the noise',
      requires: [],
    },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    const front = party.living();

    switch (optionId) {
      case 'music-harmony':
        if (front.length > 0) front[0].heal(2);
        party.addScore(18);
        return {
          success: true,
          narrative: '🎵 A perfect voice finds the third harmony. The three frequencies lock into a single, beautiful chord. The walls settle and the front-rank member feels renewed. +18 score.',
        };
      case 'harmony-attune':
        for (const m of party.living()) m.heal(2);
        party.starBlessed = true;
        party.addScore(22);
        return {
          success: true,
          narrative: '🎶 The resonances snap into attunement. The chamber sings with one voice, the party heals 2 apiece, and they carry the chord out with them: the next fight comes 1 damage a round softer. +22 score.',
        };
      case 'correspondence-solve':
        party.addScore(16);
        return {
          success: true,
          narrative: '🔗 The three principles understand each other. Tension dissolves; the frequencies fade into silence, and the walls steady. +16 score.',
        };
      case 'endure-discord':
      default:
        party.takeDamage(3);
        party.forcedFormation = 'loose';
        return {
          success: false,
          damage: 3,
          narrative: '🔊 The discord tears at the ears and nerves, and the party comes out of it well apart, each of them having walked away from the sound in a different direction. 3 damage, and no line to speak of.',
        };
    }
  },
});

registerEncounter({
  id: 'observer-secret',
  rides: ['corridor', 'treasure'],
  title: 'A Room With Hidden Reserves',
  situation: 'The passage looks bare — stone, dust, and the bare minimum of architecture. But something nags. There is excess here somewhere. Finding it requires attention that casual exploration will never provide.',
  affordances: [],
  options: [
    {
      id: 'observe-closely', name: 'Observe Every Detail', desc: 'Spend time examining everything the others missed',
      requires: ['observation'], affordances: [], weight: 2,
    },
    {
      id: 'search-methodical', name: 'Search Methodically', desc: 'Systematic inspection finds what casual glances miss',
      requires: ['rogue', 'knowledge'], affordances: [], weight: 1.5,
    },
    {
      id: 'divine-presence', name: 'Divine What\'s Here', desc: 'Sense the hidden without seeing',
      requires: ['divination'], affordances: [], weight: 1,
    },
    {
      id: 'hurry-past', name: 'Move Along', desc: 'Nothing here',
      requires: [], onlyWhenOwned: true,
    },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'observe-closely':
        party.addGold(15);
        party.gold += 15;
        party.addScore(18);
        return {
          success: true,
          narrative: '👁️ Hidden in plain sight: an alcove holding coin and small valuables, overlooked by a hundred hurrying parties. +15 gold, +18 score.',
        };
      case 'search-methodical':
        party.addGold(8);
        party.gold += 12;
        party.addScore(14);
        return {
          success: true,
          narrative: '🔎 Systematic searching reveals a cache in the oldest stones. Not as rich as it might have been, but real. +20 gold, +14 score.',
        };
      case 'divine-presence':
        party.gold += 8;
        party.addScore(10);
        return {
          success: true,
          narrative: '🔮 Divine sense finds what mortal eyes miss: a handful of coin scattered in crevices. +8 gold, +10 score.',
        };
      case 'hurry-past':
      default:
        party.addScore(3);
        return {
          success: true,
          narrative: '⏭️ Nothing here. You move on, and never know what you passed.',
        };
    }
  },
});

/* ================================================================ */
/* The last five capabilities — conjuring, fencing, mathematics,     */
/* navigation, telepathy                                             */
/*                                                                   */
/* Every tag in the vocabulary should be able to answer something,   */
/* or it is a line on a card that never pays (v6 §22). These close   */
/* the five that nothing asked for. `tests/capabilities` holds that  */
/* property directly, so a capability with no encounter is a failing */
/* test rather than a quiet dead end.                                */
/* ================================================================ */

registerEncounter({
  id: 'haunted-armour',
  rides: ['monster', 'corridor'],
  title: 'The Armour That Follows',
  situation: 'A suit of plate has been standing in the corner, and is now standing rather closer. Nothing is wearing it. It has not attacked; it is waiting to be addressed.',
  affordances: ['creature', 'undead', 'mechanism'],
  options: [
    {
      id: 'commune-armour', name: 'Speak With Whatever Wears It', desc: 'Something is in there. Ask it what it wants',
      requires: ['conjuring'], affordances: ['undead'], weight: 2,
    },
    {
      id: 'name-the-owner', name: 'Name Its Owner', desc: 'The heraldry on the breastplate is not anonymous',
      requires: ['antiquarian'], weight: 1.5,
    },
    {
      id: 'strip-insignia', name: 'Strip the Insignia', desc: 'Whatever binds it is riveted on, and rivets come off',
      requires: ['rogue'], affordances: ['mechanism'], weight: 1.5,
    },
    {
      id: 'read-its-gait', name: 'Read Its Movement', desc: 'It repeats itself, and what repeats can be walked around',
      requires: ['tactics'], weight: 1.5,
    },
    { id: 'put-it-down', name: 'Put It Down', desc: 'Empty armour dents like full armour' },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'commune-armour':
        party.addScore(28);
        party.forcedFormation = 'shieldwall';
        return {
          success: true,
          narrative: '🪄 It answers at length, and mostly about a siege nobody else remembers. It asks only to be told the war is over — then falls in beside the party for the next stretch, shield up. +28 score, and a shield wall into the next fight.',
        };
      case 'name-the-owner':
        party.addScore(24);
        party.addGold(20);
        return {
          success: true,
          narrative: '🏺 The heraldry belongs to a house that ended badly and expensively. Named aloud, the armour stops following and folds up where it stands, and what is inside it is worth 20 gold. +24 score.',
        };
      case 'strip-insignia':
        party.addScore(20);
        party.addGold(8);
        return {
          success: true,
          narrative: '🗡️ The binding is three rivets and a sealed strip of vellum. Out they come, and the plate is only plate again — with a strip of very old vellum worth keeping. +8 gold, +20 score.',
        };
      case 'read-its-gait':
        party.addScore(18);
        party.forcedFormation = 'line';
        return {
          success: true,
          narrative: '🎯 Eleven paces, a turn, eleven paces back. The party crosses in the gap and comes out the far side abreast and unhurried. +18 score.',
        };
      case 'put-it-down':
      default:
        party.takeDamage(4);
        party.forcedFormation = 'loose';
        return {
          success: false,
          damage: 4,
          narrative: '⚔️ Empty armour does dent like full armour, and hits back like it too. 4 damage, a great deal of noise, and the party comes out of it spread across the passage.',
        };
    }
  },
});

registerEncounter({
  id: 'duellists-challenge',
  rides: ['corridor', 'monster'],
  title: 'The Duellist\'s Challenge',
  situation: 'A swordsman is sitting on a chair in the middle of the passage, and stands when the party arrives. He indicates, courteously, that one of them may pass by beating him, and that he has been here some time.',
  affordances: ['creature', 'people'],
  options: [
    {
      id: 'accept-duel', name: 'Accept the Duel', desc: 'Blade to blade, on his terms',
      requires: ['fencing'], affordances: ['people'], weight: 2,
    },
    {
      id: 'negotiate-terms', name: 'Negotiate the Terms', desc: 'He named the contest; he did not name the stakes',
      requires: ['diplomacy'], affordances: ['people'], weight: 1.5,
    },
    {
      id: 'recognize-style', name: 'Recognize the School', desc: 'That guard has a name and a published weakness',
      requires: ['knowledge'], weight: 1.5,
    },
    {
      id: 'make-it-a-melee', name: 'Make It a Team Fight', desc: 'He said one of them may pass. He did not say only one may fight',
      requires: ['tactics'], weight: 3,
    },
    { id: 'push-past-duellist', name: 'Push Past Him', desc: 'Decline, loudly, and keep walking' },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'accept-duel':
        party.addScore(30);
        party.forcedFormation = 'wedge';
        return {
          success: true,
          narrative: '🤺 It is a real bout and a close one, and he loses it grinning. The party goes through with its blood up and its front foot forward. +30 score, and a wedge into the next fight.',
        };
      case 'negotiate-terms':
        party.addScore(22);
        party.addGold(30);
        return {
          success: true,
          narrative: '🤝 The stakes are agreed before the blades are: purse against passage. He is a better swordsman than a bargainer, and pays out. +30 gold, +22 score.',
        };
      case 'recognize-style':
        party.addScore(26);
        party.forewarned = true;
        return {
          success: true,
          narrative: '📖 The guard is Bolognese, the counter to it is on a page somebody in the party has read, and the bout lasts four seconds. He takes it well, and mentions what is waiting further down. +26 score, and the next snare is known.',
        };
      case 'make-it-a-melee':
        party.addScore(20);
        party.forcedFormation = 'line';
        return {
          success: true,
          narrative: '🎯 Four of them step up at once. He objects on principle, loses on arithmetic, and stands aside — and the party is already abreast when it reaches the next room. +20 score.',
        };
      case 'push-past-duellist':
      default:
        party.takeDamage(5);
        party.forcedFormation = 'column';
        return {
          success: false,
          damage: 5,
          narrative: '💨 He does not stop them, exactly. He simply takes a toll on the way past, one at a time, and the party is still strung out single file when the passage opens. 5 damage.',
        };
    }
  },
});

registerEncounter({
  id: 'chessboard-floor',
  rides: ['trap', 'corridor'],
  title: 'The Chessboard Floor',
  situation: 'The floor is laid in alternating slabs, and the pattern is not decorative — some of the squares sit a finger lower than the rest, and the ceiling above them is scored.',
  affordances: ['mechanism', 'hazard'],
  options: [
    {
      id: 'solve-progression', name: 'Solve the Progression', desc: 'The safe squares are a sequence, and sequences can be continued',
      requires: ['mathematics'], affordances: ['mechanism'], weight: 2,
    },
    {
      id: 'read-the-dust', name: 'Read the Dust', desc: 'Dust does not settle where things move',
      requires: ['observation'], weight: 1.5,
    },
    {
      id: 'divine-safe-square', name: 'Ask Which Square Is Safe', desc: 'Put the question before putting a foot down',
      requires: ['divination'], weight: 1.5,
    },
    {
      id: 'cross-in-order', name: 'Cross in Order', desc: 'Weight distributed, one at a time, on the tested squares',
      requires: ['tactics'], weight: 1.5,
    },
    { id: 'walk-it', name: 'Just Walk It', desc: 'It is a floor' },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'solve-progression':
        party.addScore(30);
        party.forewarned = true;
        return {
          success: true,
          narrative: '📐 Every third square, then every fifth: the safe path is a sequence, and once it is written down the rest of the mechanism is legible too. The party crosses dry-shod and reads the next snare off the same logic. +30 score.',
        };
      case 'read-the-dust':
        party.addScore(22);
        return {
          success: true,
          narrative: '👁️ Dust lies thick on the squares that never move. The party walks the dusty ones. +22 score.',
        };
      case 'divine-safe-square':
        party.addScore(20);
        return {
          success: true,
          narrative: '🔮 The question is put once, at the threshold, and answered squarely enough to cross on. +20 score.',
        };
      case 'cross-in-order':
        party.addScore(18);
        party.forcedFormation = 'column';
        return {
          success: true,
          narrative: '🎯 One at a time, weight where the weight has already been tested. Slow, sound, and the party is in single file at the far end. +18 score.',
        };
      case 'walk-it':
      default: {
        const dmg = Math.max(2, room.trapDamage ? Math.ceil(room.trapDamage / 2) : 4);
        party.takeDamage(dmg);
        party.forcedFormation = 'loose';
        return {
          success: false,
          damage: dmg,
          narrative: `💥 It is a floor for about six paces. ${dmg} damage out of the ceiling, and the party finishes the crossing at a scattered run.`,
        };
      }
    }
  },
});

registerEncounter({
  id: 'cartographers-ghost',
  rides: ['library', 'corridor'],
  title: 'The Cartographer\'s Ghost',
  situation: 'Someone mapped this place thoroughly and never left it. What remains of him is agitated, helpful, and cannot remember where he put the map.',
  affordances: ['books', 'undead', 'people'],
  options: [
    {
      id: 'read-the-plan', name: 'Read the Place Itself', desc: 'The dungeon has a logic; a surveyor can follow it without his map',
      requires: ['navigation'], weight: 2,
    },
    {
      id: 'reconstruct-his-rounds', name: 'Reconstruct His Rounds', desc: 'He described his route. Hold all of it at once and the map falls out',
      requires: ['memory'], affordances: ['books'], weight: 2,
    },
    {
      id: 'question-the-ghost', name: 'Question Him Gently', desc: 'He is not obstructive, only frightened and very old',
      requires: ['diplomacy'], affordances: ['people'], weight: 1.5,
    },
    {
      id: 'ask-where-it-lies', name: 'Scry for the Map', desc: 'Ask the question he cannot answer himself',
      requires: ['divination'], weight: 1.5,
    },
    { id: 'leave-cartographer', name: 'Leave Him To It', desc: 'The party has its own way of getting lost' },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'read-the-plan':
        party.addScore(30);
        party.forewarned = true;
        party.supply = (party.supply || 0) + 2;
        return {
          success: true,
          narrative: '🧭 The map is unnecessary: the place was laid out by someone with habits, and habits can be read off three corridors. The party stops doubling back — two marches of oil saved, and the next snare is on the route before they reach it. +30 score.',
        };
      case 'reconstruct-his-rounds':
        party.addScore(28);
        party.supply = (party.supply || 0) + 2;
        return {
          success: true,
          narrative: '🧠 He is asked to describe his rounds, all of them, and somebody holds the whole account at once until the shape closes. The map was behind the shelving. Two marches of oil saved. +28 score.',
        };
      case 'question-the-ghost':
        party.addScore(22);
        party.supply = (party.supply || 0) + 1;
        return {
          success: true,
          narrative: '🤝 Asked gently and given time, he remembers most of it — enough to save a march of oil, and to be a good deal calmer about the whole business. +22 score.',
        };
      case 'ask-where-it-lies':
        party.addScore(20);
        party.supply = (party.supply || 0) + 1;
        return {
          success: true,
          narrative: '🔮 The map is under the flagstone he has been standing on for two centuries. He takes this news hard. +20 score, a march of oil saved.',
        };
      case 'leave-cartographer':
      default:
        party.supply = Math.max(0, (party.supply || 0) - 1);
        return {
          success: true,
          narrative: '🚶 The party leaves him looking for it and finds its own way round the long side. A march of oil for the privilege.',
        };
    }
  },
});

registerEncounter({
  id: 'severed-council',
  rides: ['disaster', 'corridor'],
  title: 'The Party Is Cut in Half',
  situation: 'A slab comes down across the passage without warning, and the party is on both sides of it. Neither half can hear the other through a foot of stone, and something on the far side has already started moving.',
  affordances: ['hazard', 'mechanism', 'unstable-environment'],
  options: [
    {
      id: 'linked-plan', name: 'Pass a Plan Through the Stone', desc: 'A link is only worth what is sent along it',
      requires: ['telepathy', 'tactics'], weight: 2.5,
    },
    {
      id: 'link-minds', name: 'Speak Mind to Mind', desc: 'Stone is no barrier to a thing air never carried',
      requires: ['telepathy'], weight: 2,
    },
    {
      id: 'send-a-messenger', name: 'Send Something Through', desc: 'Summon something that does not need the door',
      requires: ['conjuring'], weight: 1.5,
    },
    {
      id: 'signal-by-sound', name: 'Signal by Sound', desc: 'Stone carries a struck note further than a shout',
      requires: ['music'], weight: 1.5,
    },
    {
      id: 'work-the-slab', name: 'Work the Slab', desc: 'It came down on a mechanism, and mechanisms go both ways',
      requires: ['tinkering'], affordances: ['mechanism'], weight: 1.5,
    },
    { id: 'shout-through-it', name: 'Shout Through It', desc: 'And hope' },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'linked-plan':
        party.addScore(36);
        party.forcedFormation = 'wedge';
        party.forewarned = true;
        return {
          success: true,
          narrative: '📡 The link carries more than reassurance: a plan goes across it, timed, with both halves moving on the same count. They meet in the middle of whatever was waiting, from two sides at once, and are still in that shape when the next room opens. +36 score.',
        };
      case 'link-minds':
        party.addScore(26);
        party.forcedFormation = 'line';
        return {
          success: true,
          narrative: '📡 The link opens as easily as speech, and both halves know at once that the other is standing. They come back together at the far junction abreast and unpanicked. +26 score.',
        };
      case 'send-a-messenger':
        party.addScore(22);
        return {
          success: true,
          narrative: '🪄 Something small and borrowed goes under the slab with a message tied to the idea of it, and comes back with an answer. Slower than thought, faster than digging. +22 score.',
        };
      case 'signal-by-sound':
        party.addScore(20);
        party.forcedFormation = 'line';
        return {
          success: true,
          narrative: '🎵 Struck rather than shouted: the note goes through the stone where a voice would not, and a rhythm is agreed in about a minute. +20 score.',
        };
      case 'work-the-slab':
        party.addScore(24);
        party.addGold(8);
        return {
          success: true,
          narrative: '🔧 The counterweight is found, persuaded, and reversed. The slab goes back up, and a length of its chain comes away useful. +1 material, +24 score.',
        };
      case 'shout-through-it':
      default:
        party.takeDamage(5);
        party.forcedFormation = 'loose';
        return {
          success: false,
          damage: 5,
          narrative: '📢 Nothing carries. Both halves eventually go the long way round and meet somewhere in the middle, having each independently fought whatever it was. 5 damage, and nobody is standing where they meant to be.',
        };
    }
  },
});
