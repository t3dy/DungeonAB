/**
 * Providence — the narrative probability system (v6)
 *
 * The player writes a destiny for a character in their own words.
 * Providence reads it for themes and leans the world very slightly
 * toward tests of those themes:
 *
 *   "The world has noticed what you are trying to become.
 *    Now prove that you prepared for it."
 *
 * Deliberately NOT a keyword cheat code. Providence arranges
 * OPPORTUNITIES, never rewards: a destiny about lost books makes
 * libraries and manuscripts likelier to appear, and the party still
 * needs Antiquarian Knowledge to do anything with one. Every nudge is
 * probabilistic and small, so no destiny ever guarantees its own
 * fulfilment.
 */

/**
 * The themes Providence can recognize, and the words that suggest
 * them. Curated on purpose — an open vocabulary would make this a
 * search box instead of a narrative system.
 */
export const PROVIDENCE_THEMES = {
  manuscripts: {
    name: 'the Recovery of Books', icon: '📜',
    keywords: ['book', 'books', 'manuscript', 'manuscripts', 'library', 'libraries', 'alexandria',
      'archive', 'archives', 'codex', 'text', 'texts', 'scroll', 'scrolls', 'read', 'reading', 'lost words'],
    weightTweaks: { library: 1.2, treasure: 0.3 },
    favors: ['town-bookseller', 'town-closed-apothecary'],
  },
  mechanisms: {
    name: 'the Mastery of Machines', icon: '⚙️',
    keywords: ['machine', 'machines', 'mechanism', 'mechanisms', 'clock', 'clockwork', 'engine',
      'device', 'instrument', 'instruments', 'gear', 'gears', 'automaton', 'press', 'build', 'invent'],
    weightTweaks: { trap: 0.8, corridor: 0.6 },
    favors: ['astronomers-chamber', 'town-printers-breakdown'],
  },
  stars: {
    name: 'the Reading of the Heavens', icon: '🔭',
    keywords: ['star', 'stars', 'heaven', 'heavens', 'sky', 'planet', 'planets', 'astrology',
      'astronomy', 'celestial', 'orrery', 'horoscope', 'prophecy', 'omen', 'omens', 'fate', 'foresee'],
    weightTweaks: { corridor: 0.8, library: 0.4 },
    favors: ['astronomers-chamber', 'town-astrologer'],
  },
  spirits: {
    name: 'the Conversation with Spirits', icon: '👻',
    keywords: ['spirit', 'spirits', 'angel', 'angels', 'demon', 'demons', 'dead', 'ghost', 'ghosts',
      'summon', 'summoning', 'conjure', 'conjuring', 'seance', 'scrying', 'beyond', 'speak with'],
    weightTweaks: { monster: 0.6, shrine: 0.8 },
    favors: [],
  },
  substances: {
    name: 'the Perfection of Matter', icon: '⚗️',
    keywords: ['alchemy', 'alchemical', 'stone', 'elixir', 'transmute', 'transmutation', 'gold',
      'mercury', 'sulphur', 'salt', 'distill', 'furnace', 'laboratory', 'medicine', 'cure', 'panacea'],
    weightTweaks: { lab: 1.2, materials: 0.8 },
    favors: ['town-closed-apothecary'],
  },
  people: {
    name: 'the Winning of Hearts', icon: '🤝',
    keywords: ['court', 'courtier', 'patron', 'patronage', 'friend', 'friends', 'ally', 'allies',
      'reputation', 'name', 'fame', 'famous', 'noble', 'nobles', 'diplomacy', 'peace', 'persuade'],
    weightTweaks: { monster: -0.3, treasure: 0.3 },
    favors: ['town-public-debate', 'town-tavern-brawl', 'town-remembers'],
  },
  wealth: {
    name: 'the Filling of the Purse', icon: '💰',
    keywords: ['gold', 'wealth', 'rich', 'riches', 'fortune', 'treasure', 'coin', 'money',
      'hoard', 'profit', 'debt', 'debts', 'pay', 'buy', 'collection', 'collector'],
    weightTweaks: { treasure: 1.0, vault: 0.5 },
    favors: ['town-street-thief', 'town-bookseller'],
  },
  ruin: {
    name: 'the Facing of Ruin', icon: '🌋',
    keywords: ['revenge', 'vengeance', 'ruin', 'destroy', 'destruction', 'burn', 'war', 'blood',
      'kill', 'slay', 'monster', 'monsters', 'beast', 'hunt', 'avenge', 'died', 'death'],
    weightTweaks: { monster: 1.0, disaster: 0.5 },
    favors: [],
  },
};

/**
 * Read a destiny's words for themes. Returns theme ids, strongest
 * first, capped at two — a destiny that means everything means
 * nothing, and the cap keeps Providence from flattening the world.
 */
export function deriveThemes(text) {
  if (!text || typeof text !== 'string') return [];
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  const wordSet = new Set(words);
  const scored = [];
  for (const [id, theme] of Object.entries(PROVIDENCE_THEMES)) {
    let hits = 0;
    for (const kw of theme.keywords) {
      // Multi-word keywords match against the raw text, single words
      // against the token set (so "gold" doesn't match "golden ratio")
      if (kw.includes(' ')) {
        if (text.toLowerCase().includes(kw)) hits++;
      } else if (wordSet.has(kw)) {
        hits++;
      }
    }
    if (hits > 0) scored.push({ id, hits });
  }
  scored.sort((a, b) => b.hits - a.hits);
  return scored.slice(0, 2).map(s => s.id);
}

/** How much authored text Providence will read (v6 §19: keep it constrained). */
export const DESTINY_MAX_LENGTH = 240;

export class Providence {
  constructor() {
    /** [{ characterId, characterName, text, themes }] */
    this.destinies = [];
    /** Quest-log entries: what Providence has already tested. */
    this.log = [];
  }

  /**
   * Give a character a destiny in the player's own words. The text is
   * clamped; the themes derived from it are what the world reads.
   */
  setDestiny(characterId, characterName, text) {
    const clamped = String(text || '').slice(0, DESTINY_MAX_LENGTH);
    const themes = deriveThemes(clamped);
    const existing = this.destinies.findIndex(d => d.characterId === characterId);
    const entry = { characterId, characterName, text: clamped, themes };
    if (existing >= 0) this.destinies[existing] = entry;
    else this.destinies.push(entry);
    return entry;
  }

  destinyFor(characterId) {
    return this.destinies.find(d => d.characterId === characterId) || null;
  }

  /** Every theme the party's destinies point at, deduplicated. */
  themes() {
    return [...new Set(this.destinies.flatMap(d => d.themes))];
  }

  hasThemes() {
    return this.themes().length > 0;
  }

  /**
   * The world's lean, as room-type weight nudges for DungeonGen.
   *
   * Two guards keep this Providence and not a cheat code:
   *   - `chance`: on most descents Providence says nothing at all
   *   - `strength`: what it does say is a nudge, not a guarantee
   *
   * @param rngValue  a roll in [0,1) — pass one for determinism
   */
  weightTweaks(rngValue = Math.random(), { chance = 0.6, strength = 0.7 } = {}) {
    const themes = this.themes();
    if (themes.length === 0 || rngValue > chance) return {};
    const tweaks = {};
    for (const id of themes) {
      const theme = PROVIDENCE_THEMES[id];
      if (!theme) continue;
      for (const [roomType, value] of Object.entries(theme.weightTweaks)) {
        tweaks[roomType] = (tweaks[roomType] || 0) + value * strength;
      }
    }
    return tweaks;
  }

  /** Encounter ids the party's destinies make likelier to be offered. */
  favoredEncounters() {
    return [...new Set(this.themes().flatMap(id => PROVIDENCE_THEMES[id]?.favors || []))];
  }

  /**
   * Note that the world tested a destiny — the quest log's raw
   * material, and what the interlude writing reads back.
   */
  recordTest(characterId, text) {
    this.log.push({ characterId, text, at: this.log.length });
  }

  /** What Providence is currently arranging, for the UI. */
  summary() {
    return {
      destinies: this.destinies.map(d => ({
        characterId: d.characterId,
        characterName: d.characterName,
        text: d.text,
        themes: d.themes.map(id => ({
          id, name: PROVIDENCE_THEMES[id].name, icon: PROVIDENCE_THEMES[id].icon,
        })),
      })),
      log: this.log.slice(),
    };
  }
}
