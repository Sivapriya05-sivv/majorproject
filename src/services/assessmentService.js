// INDIVIDUAL ASSESSMENT SERVICE
// Strict separate tracking of each student's independent understanding (vs. group activity)

import { supabase, isSupabaseConfigured } from './supabaseClient';
import storageHelper from '../utils/storageHelper';

const ASSESSMENTS_KEY = 'individual_assessments';

export const assessmentService = {
  // Record individual understanding check
  async recordAssessment({ studentId, teacherId, lessonId, moduleId, understandingLevel, score, teacherNotes }) {
    const record = {
      id: `ass-${Date.now()}`,
      studentId,
      teacherId: teacherId || 'teacher-priya-01',
      lessonId,
      moduleId,
      understandingLevel: understandingLevel || 'independent', // 'independent', 'with_guidance', 'developing', 'needs_practice'
      score: score || 10,
      teacherNotes: teacherNotes || 'Demonstrated clear picture recognition.',
      evaluatedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('assessment_results').insert({
          student_id: studentId,
          teacher_id: record.teacherId,
          understanding_level: record.understandingLevel,
          score: record.score,
          teacher_notes: record.teacherNotes
        });
      } catch (e) {
        console.warn('Supabase assessment record error:', e);
      }
    }

    const list = storageHelper.get(ASSESSMENTS_KEY, []);
    list.push(record);
    storageHelper.set(ASSESSMENTS_KEY, list);
    return record;
  },

  getStudentAssessments(studentId) {
    const list = storageHelper.get(ASSESSMENTS_KEY, []);
    return list.filter(a => a.studentId === studentId);
  },

  getAllAssessments() {
    return storageHelper.get(ASSESSMENTS_KEY, []);
  }
};

export default assessmentService;

