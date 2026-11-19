// GAME SERVICE
import { supabase, isSupabaseConfigured } from './supabaseClient';
import storageHelper from '../utils/storageHelper';
import { GAMES_CATALOG, getGameByCode } from '../data/gamesCatalog';

const GAME_RESULTS_KEY = 'game_results';

export const gameService = {
  getAllGames() {
    return GAMES_CATALOG;
  },

  getGame(code) {
    return getGameByCode(code);
  },

  async recordGameResult({ studentId, gameCode, score, starsEarned, attempts, timeSpentSeconds }) {
    const resultObj = {
      id: `gr-${Date.now()}`,
      studentId,
      gameCode,
      score,
      starsEarned,
      attempts: attempts || 1,
      timeSpentSeconds: timeSpentSeconds || 30,
      completedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('game_results').insert({
          student_id: studentId,
          score,
          stars_earned: starsEarned,
          attempts,
          time_spent_seconds: timeSpentSeconds
        });
      } catch (err) {
        console.warn('Supabase recordGameResult fallback:', err);
      }
    }

    // Save to persistent storage
    const currentResults = storageHelper.get(GAME_RESULTS_KEY, []);
    currentResults.push(resultObj);
    storageHelper.set(GAME_RESULTS_KEY, currentResults);

    // Update student stars
    const currentStudent = storageHelper.get('current_user', {});
    if (currentStudent && (currentStudent.id === studentId || currentStudent.studentIdNumber === studentId)) {
      currentStudent.stars = (currentStudent.stars || 0) + starsEarned;
      currentStudent.completedGames = (currentStudent.completedGames || 0) + 1;
      storageHelper.set('current_user', currentStudent);
    }

    return resultObj;
  },

  getStudentGameResults(studentId) {
    const all = storageHelper.get(GAME_RESULTS_KEY, []);
    return all.filter(r => r.studentId === studentId);
  }
};

export default gameService;

