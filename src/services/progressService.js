// PROGRESS SERVICE
// Module progress, lesson completion, positive stars & progress garden state

import { supabase, isSupabaseConfigured } from './supabaseClient';
import storageHelper from '../utils/storageHelper';
import { ALL_MODULES } from '../data/modulesData';

const PROGRESS_KEY = 'student_progress';

export const progressService = {
  // Get student progress record
  getStudentProgress(studentId) {
    const records = storageHelper.get(PROGRESS_KEY, {});
    return records[studentId] || {
      completedModules: ['care-m01'],
      completedLessons: ['care-m01-l01'],
      totalStars: 15,
      gamesPlayed: 5,
      gardenFlowers: [
        { id: 1, type: 'sunflower', stage: 'bloomed', name: 'Curiosity Flower' },
        { id: 2, type: 'lotus', stage: 'bloomed', name: 'Focus Blossom' },
        { id: 3, type: 'rose', stage: 'budding', name: 'Kindness Rose' }
      ]
    };
  },

  // Mark lesson as completed and award stars
  recordLessonCompletion(studentId, moduleId, lessonId, stars = 3) {
    const allRecords = storageHelper.get(PROGRESS_KEY, {});
    const studentRec = allRecords[studentId] || {
      completedModules: [],
      completedLessons: [],
      totalStars: 0,
      gamesPlayed: 0,
      gardenFlowers: [
        { id: 1, type: 'sunflower', stage: 'bloomed', name: 'Curiosity Flower' },
        { id: 2, type: 'lotus', stage: 'budding', name: 'Focus Blossom' }
      ]
    };

    if (!studentRec.completedLessons.includes(lessonId)) {
      studentRec.completedLessons.push(lessonId);
    }
    if (!studentRec.completedModules.includes(moduleId)) {
      studentRec.completedModules.push(moduleId);
    }

    studentRec.totalStars = (studentRec.totalStars || 0) + stars;

    // Check garden growth: every 5 stars blooms a flower!
    if (studentRec.totalStars >= 10 && studentRec.gardenFlowers.length < 3) {
      studentRec.gardenFlowers.push({ id: 3, type: 'tulip', stage: 'bloomed', name: 'Star Tulip' });
    }
    if (studentRec.totalStars >= 18 && studentRec.gardenFlowers.length < 4) {
      studentRec.gardenFlowers.push({ id: 4, type: 'orchid', stage: 'bloomed', name: 'Courage Orchid' });
    }

    allRecords[studentId] = studentRec;
    storageHelper.set(PROGRESS_KEY, allRecords);

    // If currently logged-in student, sync user record
    const currentUser = storageHelper.get('current_user', {});
    if (currentUser && (currentUser.id === studentId || currentUser.studentIdNumber === studentId)) {
      currentUser.stars = studentRec.totalStars;
      currentUser.completedLessons = studentRec.completedLessons.length;
      storageHelper.set('current_user', currentUser);
    }

    return studentRec;
  },

  // Summary statistics for teacher dashboard
  getTeacherClassProgressSummary(studentList) {
    const allProgress = storageHelper.get(PROGRESS_KEY, {});
    return studentList.map(s => {
      const prog = allProgress[s.id] || {
        completedModules: [s.groupCode + '-m01'],
        completedLessons: [s.groupCode + '-m01-l01'],
        totalStars: s.stars || 10
      };
      return {
        ...s,
        completedModuleCount: prog.completedModules?.length || 1,
        completedLessonCount: prog.completedLessons?.length || 1,
        totalStars: prog.totalStars || s.stars || 10,
        gardenFlowerCount: prog.gardenFlowers?.length || 2
      };
    });
  }
};

export default progressService;

