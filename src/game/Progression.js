/**
 * Progression — run history, best scores, difficulty tracking
 * Adapted from SnakeAB's proven progression system.
 */

import { evaluateAchievements } from './Achievements.js';

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
    this.achievements = [];   // earned achievement ids (persisted)
    this.loadFromStorage();
  }

  /**
   * Record a finished campaign. `result` carries the run summary
   * (score, gold, depth, survivors, partySize, spellsLearned, and the
   * v4 honors: tally + phialsIdentified). Returns the achievements
   * newly earned this run, so the caller can celebrate them.
   */
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
      depth: result.depth || 1,
      condition: result.condition || null,
    });
    if (this.runHistory.length > 50) this.runHistory = this.runHistory.slice(0, 50);

    if (!this.bestScores[difficulty] || result.score > this.bestScores[difficulty]) {
      this.bestScores[difficulty] = result.score;
    }
    if (result.victory) {
      this.victories[difficulty] = (this.victories[difficulty] || 0) + 1;
    }
    this.totalRuns++;

    // Milestones are checked against this run — with career stats
    // updated first, so "retire from 10 campaigns" counts this one.
    const newlyEarned = evaluateAchievements({
      summary: {
        depth: result.depth || 1,
        gold: result.gold || 0,
        survivors: result.survivors || 0,
        partySize: result.partySize || 0,
        spellsLearned: result.spellsLearned || 0,
        tally: result.tally || {},
        phialsIdentified: result.phialsIdentified || 0,
      },
      difficulty,
      retired: !!result.victory,
      stats: this.getStats(),
    }, this.achievements);
    for (const a of newlyEarned) this.achievements.push(a.id);

    this.saveToStorage();
    return newlyEarned;
  }

  hasAchievement(id) {
    return this.achievements.includes(id);
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
      achievements: this.achievements,
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
      this.achievements = data.achievements || [];
    } catch (e) {
      console.error('Failed to load progression:', e);
    }
  }

  reset() {
    this.runHistory = [];
    this.bestScores = {};
    this.totalRuns = 0;
    this.victories = {};
    this.achievements = [];
    this.saveToStorage();
  }
}

export const progression = new ProgressionManager();
