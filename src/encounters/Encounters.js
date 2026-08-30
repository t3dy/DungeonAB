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
      id: 'steady-ground', name: 'Hold the Stationary Floor', desc: 'Put the party on the part that is not turning',
      requires: ['tactics'], weight: 1,
    },
    { id: 'hurry-through', name: 'Hurry Through', desc: 'Run the turning floor and hope' },
  ],
  resolveOption(optionId, party, room) {
    room.cleared = true;
    switch (optionId) {
      case 'repair-gears':
        party.materials += 1;
        party.addScore(20);
        return { success: true, narrative: '🔧 The gears are coaxed still and the walls stop. A stripped bronze pinion goes into the satchel: +1 material, +20 score.' };
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
      party.materials += 2;
      party.addScore(score);
      return { success: true, narrative };
    };
    switch (optionId) {
      case 'read-correspondences':
        return openIt('🔗 The signs are not a lock but an argument, and it can be followed to its conclusion. The door opens on a working laboratory: +2 materials, +35 score.', 35);
      case 'planetary-sequence':
        return openIt('🔭 Pressed in the order the planets actually stand tonight, the signs give. +2 materials, +30 score.', 30);
      case 'material-symbolism':
        return openIt('⚗️ Each sign is its metal, and the metals want touching in the order of their melting. +2 materials, +30 score.', 30);
      case 'reconcile-traditions':
        return openIt('☯️ Two traditions are quarrelling on one door; reconciled, they agree to open it. +2 materials, +35 score.', 35);
      case 'divine-sequence':
        party.addScore(15);
        party.forewarned = true;
        return { success: true, narrative: '🔮 The sequence is read before it is attempted — and so is the sign that would have taken a hand off. +15 score, and the next snare is known.' };
      case 'force-the-door': {
        party.takeDamage(4);
        party.addScore(10);
        party.materials += 1;
        return { success: false, damage: 4, narrative: '💥 The door yields to shoulders and a crowbar, and the ward on it yields something back: 4 damage, and only what could be grabbed on the way past. +1 material.' };
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
        party.materials += 2;
        return { success: true, narrative: '🌐 Answered in its own tongue, it stops being a monster in the passage and becomes someone with a complaint. It gives the party passage and a gift of its own reagents: +2 materials, +30 score.' };
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
