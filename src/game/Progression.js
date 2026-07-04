/**
 * Progression — run history, best scores, difficulty tracking
 * Adapted from SnakeAB's proven progression system.
 */

export const DIFFICULTIES = {
  EASY: { id: 'easy', name: 'Easy', icon: '🌱', scoreMultiplier: 1.0 },
  MEDIUM: { id: 'medium', name: 'Medium', icon: '🌳', scoreMultiplier: 1.5 },
  HARD: { id: 'hard', name: 'Hard', icon: '⛰️', scoreMultiplier: 2.0 },
  NIGHTMARE: { id: 'nightmare', name: 'Nightmare', icon: '💀', scoreMultiplier: 3.0 },
};

const STORAGE_KEY = 'dungeonab_progression';

export class ProgressionManager {
  constructor() {
    this.runHistory = [];
    this.bestScores = {};
    this.totalRuns = 0;
    this.victories = {};
    this.loadFromStorage();
  }

  recordRun(difficulty, result) {
    this.runHistory.unshift({
      id: `run_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
      difficulty,
      score: result.score,
      gold: result.gold,
      roomsCleared: result.roomsCleared,
      victory: result.victory,
      survivors: result.survivors,
      partySize: result.partySize,
    });
    if (this.runHistory.length > 50) this.runHistory = this.runHistory.slice(0, 50);

    if (!this.bestScores[difficulty] || result.score > this.bestScores[difficulty]) {
      this.bestScores[difficulty] = result.score;
    }
    if (result.victory) {
      this.victories[difficulty] = (this.victories[difficulty] || 0) + 1;
    }
    this.totalRuns++;
    this.saveToStorage();
  }

  getStats() {
    const totalVictories = Object.values(this.victories).reduce((a, b) => a + b, 0);
    return {
      totalRuns: this.totalRuns,
      totalVictories,
      bestScores: { ...this.bestScores },
      avgScore: this.totalRuns > 0
        ? Math.round(this.runHistory.reduce((s, r) => s + r.score, 0) / Math.min(this.totalRuns, this.runHistory.length))
        : 0,
    };
  }

  getRecentRuns(limit = 5) {
    return this.runHistory.slice(0, limit);
  }

  saveToStorage() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      runHistory: this.runHistory,
      bestScores: this.bestScores,
      totalRuns: this.totalRuns,
      victories: this.victories,
    }));
  }

  loadFromStorage() {
    if (typeof localStorage === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const data = JSON.parse(saved);
      this.runHistory = data.runHistory || [];
      this.bestScores = data.bestScores || {};
      this.totalRuns = data.totalRuns || 0;
      this.victories = data.victories || {};
    } catch (e) {
      console.error('Failed to load progression:', e);
    }
  }

  reset() {
    this.runHistory = [];
    this.bestScores = {};
    this.totalRuns = 0;
    this.victories = {};
    this.saveToStorage();
  }
}

export const progression = new ProgressionManager();
