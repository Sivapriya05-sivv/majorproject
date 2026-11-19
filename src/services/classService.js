// SCHOOL & CLASS SERVICES
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SAMPLE_SCHOOL, SAMPLE_STUDENTS } from '../data/sampleUsers';

export const schoolService = {
  async getSchoolByCode(schoolCode) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('schools').select('*').eq('school_code', schoolCode.toUpperCase()).single();
      if (error) throw error;
      return data;
    }
    if (schoolCode.toUpperCase() === SAMPLE_SCHOOL.code) {
      return SAMPLE_SCHOOL;
    }
    return null;
  }
};

export const classService = {
  async getTeacherAssignedStudents(teacherId) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('teacher_students')
        .select('*, student:profiles!student_id(*)')
        .eq('teacher_id', teacherId);
      if (error) throw error;
      return data.map(d => d.student);
    }
    return SAMPLE_STUDENTS;
  },

  async getStudentDetails(studentId) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', studentId).single();
      if (error) throw error;
      return data;
    }
    return SAMPLE_STUDENTS.find(s => s.id === studentId || s.studentIdNumber === studentId) || SAMPLE_STUDENTS[0];
  }
};

