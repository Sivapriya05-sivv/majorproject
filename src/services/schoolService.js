// SCHOOL SERVICE
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SAMPLE_SCHOOL } from '../data/sampleUsers';

export const schoolService = {
  async getSchoolByCode(schoolCode) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('schools').select('*').eq('school_code', schoolCode.toUpperCase()).single();
      if (error) throw error;
      return data;
    }
    if (schoolCode && schoolCode.toUpperCase() === SAMPLE_SCHOOL.code) {
      return SAMPLE_SCHOOL;
    }
    return null;
  }
};

export default schoolService;

