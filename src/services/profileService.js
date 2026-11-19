// PROFILE SERVICE
import { supabase, isSupabaseConfigured } from './supabaseClient';
import storageHelper from '../utils/storageHelper';
import { SAMPLE_STUDENTS, SAMPLE_TEACHER, SAMPLE_PARENT } from '../data/sampleUsers';

export const profileService = {
  async getProfile(userId) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (error) throw error;
      return data;
    }

    const all = [SAMPLE_TEACHER, SAMPLE_PARENT, ...SAMPLE_STUDENTS, ...(storageHelper.get('registered_parents', []))];
    return all.find(u => u.id === userId) || storageHelper.get('current_user', null);
  },

  async updatePreferences(userId, preferences) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('profiles').update({ preferences }).eq('id', userId);
      if (error) throw error;
      return data;
    }
    const current = storageHelper.get('current_user', {});
    const updated = { ...current, preferences: { ...(current.preferences || {}), ...preferences } };
    storageHelper.set('current_user', updated);
    return updated;
  }
};

export default profileService;

