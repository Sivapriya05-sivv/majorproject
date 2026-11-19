// INDIVIDUAL HOMEWORK SERVICE
// Strictly individual homework per student (Group homework is prohibited)

import { supabase, isSupabaseConfigured } from './supabaseClient';
import storageHelper from '../utils/storageHelper';
import { SAMPLE_HOMEWORK } from '../data/sampleUsers';

const HOMEWORK_KEY = 'homework_list';

// Initialize with sample homework if empty
if (!storageHelper.get(HOMEWORK_KEY)) {
  storageHelper.set(HOMEWORK_KEY, SAMPLE_HOMEWORK);
}

export const homeworkService = {
  // Get homework for a specific student
  async getHomeworkForStudent(studentId) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('homework')
          .select('*, modules(*), lessons(*)')
          .eq('student_id', studentId)
          .order('created_at', { ascending: false });
        if (!error && data?.length) return data;
      } catch (e) {
        console.warn('Supabase homework fetch error:', e);
      }
    }

    const list = storageHelper.get(HOMEWORK_KEY, SAMPLE_HOMEWORK);
    return list.filter(h => h.studentId === studentId);
  },

  // Get homework assigned by a teacher
  async getHomeworkByTeacher(teacherId) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('homework')
          .select('*, student:profiles!student_id(*), modules(*), lessons(*)')
          .eq('teacher_id', teacherId)
          .order('created_at', { ascending: false });
        if (!error && data?.length) return data;
      } catch (e) {
        console.warn('Supabase homework teacher fetch error:', e);
      }
    }

    const list = storageHelper.get(HOMEWORK_KEY, SAMPLE_HOMEWORK);
    return list;
  },

  // Assign individual homework to 1 specific student
  async assignHomework({ teacherId, studentId, moduleTitle_ml, moduleTitle_en, lessonTitle_ml, lessonTitle_en, gameCode, instructions_ml, instructions_en, dueDate }) {
    if (!studentId) {
      throw new Error('Homework must be assigned to an individual student.');
    }

    const newHw = {
      id: `hw-${Date.now()}`,
      teacherId,
      studentId,
      moduleTitle_ml,
      moduleTitle_en,
      lessonTitle_ml: lessonTitle_ml || '',
      lessonTitle_en: lessonTitle_en || '',
      gameCode: gameCode || '',
      instructions_ml: instructions_ml || '',
      instructions_en: instructions_en || '',
      dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      status: 'assigned',
      starsAwarded: 0,
      submissionNote: '',
      teacherFeedback: '',
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('homework').insert({
          teacher_id: teacherId,
          student_id: studentId,
          title_ml: lessonTitle_ml || moduleTitle_ml,
          title_en: lessonTitle_en || moduleTitle_en,
          instructions_ml,
          instructions_en,
          due_date: dueDate,
          status: 'assigned'
        });
      } catch (e) {
        console.warn('Supabase assignHomework error:', e);
      }
    }

    const list = storageHelper.get(HOMEWORK_KEY, SAMPLE_HOMEWORK);
    list.unshift(newHw);
    storageHelper.set(HOMEWORK_KEY, list);
    return newHw;
  },

  // Student submits homework
  async submitHomework(homeworkId, { submissionNote, gameCompleted }) {
    const list = storageHelper.get(HOMEWORK_KEY, SAMPLE_HOMEWORK);
    const index = list.findIndex(h => h.id === homeworkId);
    if (index === -1) throw new Error('Homework item not found');

    list[index].status = 'submitted';
    list[index].submissionNote = submissionNote || 'Completed with Ollie!';
    list[index].submittedAt = new Date().toISOString();

    storageHelper.set(HOMEWORK_KEY, list);
    return list[index];
  },

  // Teacher reviews and gives feedback/stars
  async reviewHomework(homeworkId, { starsAwarded, teacherFeedback }) {
    const list = storageHelper.get(HOMEWORK_KEY, SAMPLE_HOMEWORK);
    const index = list.findIndex(h => h.id === homeworkId);
    if (index === -1) throw new Error('Homework item not found');

    list[index].status = 'reviewed';
    list[index].starsAwarded = Number(starsAwarded) || 3;
    list[index].teacherFeedback = teacherFeedback || 'Well done! Great progress.';
    list[index].reviewedAt = new Date().toISOString();

    storageHelper.set(HOMEWORK_KEY, list);
    return list[index];
  }
};

export default homeworkService;

