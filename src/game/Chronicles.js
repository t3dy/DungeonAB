/**
 * Chronicles — the shelf the sagas are kept on
 *
 * A saga is one party's whole history: the chronicle they wrote and the
 * state they are in. Keeping both together is what makes a saved run
 * more than a souvenir — the party can be taken off the shelf and sent
 * down again, carrying their scars, their trophies, their grimoire and
 * whatever technique they have drilled.
 *
 * Three ways out, because a record nobody can get at is not a record:
 *   - **localStorage**, so a refresh does not lose the run
 *   - **JSON export/import**, so a saga is portable and can be handed on
 *   - **Markdown export**, so the delve can simply be read
 *
 * Storage is injectable, the same as ArchiveManager, so tests do not
 * need a browser.
 */

import { Chronicle, toMarkdown, CHRONICLE_VERSION } from '../narrative/Chronicle.js';
import { Party } from '../agents/Party.js';
import { getCard } from './Cards.js';

const STORAGE_KEY = 'dungeonab_chronicles';
const CAP = 20;

/** A saga id that sorts by age and reads as one. */
function makeId() {
  return `saga_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export class ChronicleLibrary {
  constructor(storage = null) {
    this.storage = storage
      || (typeof localStorage !== 'undefined' ? localStorage : null);
    this.entries = [];
    this.load();
  }

  load() {
    if (!this.storage) return;
    try {
      const raw = JSON.parse(this.storage.getItem(STORAGE_KEY) || '[]');
      this.entries = Array.isArray(raw) ? raw : [];
    } catch (e) {
      this.entries = [];
    }
  }

  persist() {
    if (!this.storage) return;
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.entries.slice(0, CAP)));
    } catch (e) { /* full or private mode — the shelf stays in memory */ }
  }

  /**
   * Save (or overwrite) a saga. Pass the previous record's id to append
   * to that party's history rather than starting a new shelf entry.
   *
   * Returns the stored record.
   */
  save({ id, chronicle, party, difficulty = null }) {
    const data = {
      id: id || makeId(),
      version: CHRONICLE_VERSION,
      date: Date.now(),
      partyName: chronicle.partyName,
      delves: chronicle.delves.length,
      lastOutcome: chronicle.delves[chronicle.delves.length - 1]?.outcome || null,
      difficulty,
      chronicle: chronicle.toJSON(),
      party: party ? party.toJSON() : null,
    };
    const at = this.entries.findIndex(e => e.id === data.id);
    if (at >= 0) this.entries[at] = data;
    else this.entries.unshift(data);
    if (this.entries.length > CAP) this.entries.length = CAP;
    this.persist();
    return data;
  }

  /** Newest first, with just enough to render a list. */
  list() {
    return this.entries.map(e => ({
      id: e.id,
      partyName: e.partyName,
      delves: e.delves,
      date: e.date,
      difficulty: e.difficulty,
      victory: e.lastOutcome?.victory ?? null,
      score: e.lastOutcome?.score ?? 0,
      alive: (e.party?.members || []).some(m => m.alive !== false),
    }));
  }

  get(id) {
    return this.entries.find(e => e.id === id) || null;
  }

  remove(id) {
    const at = this.entries.findIndex(e => e.id === id);
    if (at >= 0) {
      this.entries.splice(at, 1);
      this.persist();
      return true;
    }
    return false;
  }

  /**
   * Take a saga off the shelf: the chronicle to keep writing, and the
   * party to send back down. Returns null for an unknown id, and a null
   * party for a saga saved without one.
   */
  resume(id, lookup = getCard) {
    const record = this.get(id);
    if (!record) return null;
    const chronicle = Chronicle.fromJSON(record.chronicle);
    const party = record.party ? Party.fromJSON(record.party, lookup) : null;

    // A wiped saga is readable but not continuable. Letting a dead party
    // march again produced a "delve" that ended on its first tick and
    // appended an empty chapter to the saga -- a silent no-op exactly
    // where the player most needs telling.
    const standing = party ? party.living().length : 0;
    const bench = party ? party.reserve.filter(m => m.isAlive()).length : 0;
    let continuable = true;
    let reason = null;
    if (!party) {
      continuable = false;
      reason = 'This saga was saved as a story only — there is no party left to send down.';
    } else if (standing === 0 && bench === 0) {
      continuable = false;
      reason = `${chronicle.partyName} did not come back. The chronicle can be read, but nobody is left to continue it.`;
    } else if (standing === 0) {
      reason = `Nobody who marched came back, but ${bench} wait${bench > 1 ? '' : 's'} in town. They can take up the delve.`;
    }

    return {
      id: record.id,
      chronicle,
      party,
      difficulty: record.difficulty,
      continuable,
      reason,
      standing,
      bench,
    };
  }

  /** The saga as a portable file. */
  exportJSON(id) {
    const record = this.get(id);
    return record ? JSON.stringify(record, null, 2) : null;
  }

  /** The saga as something to read. */
  exportMarkdown(id, opts) {
    const record = this.get(id);
    if (!record) return null;
    return toMarkdown(Chronicle.fromJSON(record.chronicle), opts);
  }

  /**
   * Take in a saga from a file. Rejects anything that is not a saga
   * rather than half-loading it, and always lands under a fresh id so an
   * import can never quietly overwrite a run in progress.
   */
  importJSON(text) {
    let data;
    try {
      data = typeof text === 'string' ? JSON.parse(text) : text;
    } catch (e) {
      return { ok: false, error: 'That file is not readable as a saga.' };
    }
    if (!data || !data.chronicle || !Array.isArray(data.chronicle.delves)) {
      return { ok: false, error: 'That file does not hold a chronicle.' };
    }
    if ((data.version ?? 0) > CHRONICLE_VERSION) {
      return { ok: false, error: 'That saga was written by a newer version of the game.' };
    }
    const record = { ...data, id: makeId(), date: Date.now() };
    this.entries.unshift(record);
    if (this.entries.length > CAP) this.entries.length = CAP;
    this.persist();
    return { ok: true, record };
  }
}

/** A filename a person would recognise on disk. */
export function chronicleFilename(chronicle, ext = 'md') {
  const name = (chronicle.partyName || 'party')
    .split(',')[0].trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'party';
  return `chronicle-${name}-delve-${chronicle.delves.length || 1}.${ext}`;
}
