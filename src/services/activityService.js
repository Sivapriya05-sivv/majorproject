// ACTIVITY SERVICE
import { supabase, isSupabaseConfigured } from './supabaseClient';
import storageHelper from '../utils/storageHelper';

const ACTIVITY_RESULTS_KEY = 'activity_results';

export const activityService = {
  async recordActivityResult({ studentId, activityId, completed, score, timeSpentSeconds }) {
    const record = {
      id: `act-${Date.now()}`,
      studentId,
      activityId,
      completed: completed !== false,
      score: score || 10,
      timeSpentSeconds: timeSpentSeconds || 20,
      timestamp: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('student_activity_results').insert({
          student_id: studentId,
          activity_id: activityId,
          completed: record.completed,
          score: record.score,
          time_spent_seconds: record.timeSpentSeconds
        });
      } catch (e) {
        console.warn('Supabase activity result error:', e);
      }
    }

    const list = storageHelper.get(ACTIVITY_RESULTS_KEY, []);
    list.push(record);
    storageHelper.set(ACTIVITY_RESULTS_KEY, list);
    return record;
  },

  getStudentActivities(studentId) {
    const list = storageHelper.get(ACTIVITY_RESULTS_KEY, []);
    return list.filter(a => a.studentId === studentId);
  }
};

export default activityService;

