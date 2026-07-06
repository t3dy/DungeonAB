/**
 * Archive — every dungeon the party has walked, kept as a design
 *
 * Finished delves are serialized (rooms, edges, secrets and all) into
 * a local archive. Archived dungeons are viewable as minimaps,
 * re-enterable exactly as they were, and editable — the editor saves
 * customized copies back here. This is the roguelike "morgue file"
 * grown into a design collection (see ROGUELIKE_ROADMAP.md, Phase 1-2).
 */

const STORAGE_KEY = 'dungeonab_dungeon_archive';
const CAP = 30;

export class ArchiveManager {
  constructor(storage = null) {
    // Injectable storage for tests; defaults to localStorage when present
    this.storage = storage
      || (typeof localStorage !== 'undefined' ? localStorage : null);
    this.entries = [];
    this.load();
  }

  load() {
    if (!this.storage) return;
    try {
      this.entries = JSON.parse(this.storage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      this.entries = [];
    }
  }

  persist() {
    if (!this.storage) return;
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
    } catch (e) { /* storage full or private mode — archive stays in memory */ }
  }

  /**
   * File a dungeon design. entry = { name, layout, seed, outcome, custom }
   * Returns the stored record (with id/date added).
   */
  save(entry) {
    const record = {
      id: `dgn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      date: Date.now(),
      custom: false,
      ...entry,
    };
    this.entries.unshift(record);
    // Player-made designs outlive auto-archived runs when trimming
    if (this.entries.length > CAP) {
      const idx = this.entries.map((e, i) => [e, i]).reverse()
        .find(([e]) => !e.custom)?.[1];
      this.entries.splice(idx !== undefined ? idx : this.entries.length - 1, 1);
    }
    this.persist();
    return record;
  }

  update(id, changes) {
    const entry = this.entries.find(e => e.id === id);
    if (!entry) return null;
    Object.assign(entry, changes);
    this.persist();
    return entry;
  }

  get(id) {
    return this.entries.find(e => e.id === id) || null;
  }

  remove(id) {
    const before = this.entries.length;
    this.entries = this.entries.filter(e => e.id !== id);
    this.persist();
    return this.entries.length < before;
  }

  list() {
    return this.entries;
  }
}

export const archive = new ArchiveManager();
