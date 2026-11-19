// PARENT SERVICE
// Handles Child Linking & Parent Home Learning Support

import { supabase, isSupabaseConfigured } from './supabaseClient';
import storageHelper from '../utils/storageHelper';
import { SAMPLE_STUDENTS } from '../data/sampleUsers';

export const parentService = {
  // Get linked student for parent
  async getLinkedChild(parentProfile) {
    const linkedId = parentProfile?.linkedStudentId || 'student-aarav-101';
    
    if (isSupabaseConfigured && supabase && parentProfile?.id) {
      try {
        const { data, error } = await supabase
          .from('parent_students')
          .select('*, student:profiles!student_id(*)')
          .eq('parent_id', parentProfile.id)
          .single();
        if (!error && data?.student) return data.student;
      } catch (e) {
        console.warn('Supabase parent linked child fetch:', e);
      }
    }

    return SAMPLE_STUDENTS.find(s => s.id === linkedId || s.studentIdNumber === linkedId) || SAMPLE_STUDENTS[0];
  },

  // Link child via Student ID Number
  async linkChildToParent(parentId, studentIdNumber) {
    if (!studentIdNumber) throw new Error('Please enter your child’s Student ID Number.');

    const cleanId = studentIdNumber.trim().toUpperCase();
    const found = SAMPLE_STUDENTS.find(s => s.studentIdNumber.toUpperCase() === cleanId);

    if (!found) {
      throw new Error(`Student with ID "${cleanId}" not found in school records.`);
    }

    // Save link in current user session
    const currentUser = storageHelper.get('current_user', {});
    currentUser.linkedStudentId = found.id;
    storageHelper.set('current_user', currentUser);

    return found;
  }
};

export default parentService;

