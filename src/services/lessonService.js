// LESSON SERVICE
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { LESSONS_DATABASE, getLessonsForModule } from '../data/lessonsData';
import { getModuleById } from '../data/modulesData';

export const lessonService = {
  async getLessonsByModule(moduleId) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', moduleId)
        .order('display_order');
      if (!error && data?.length) return data;
    }
    const moduleInfo = getModuleById(moduleId);
    return getLessonsForModule(moduleId, moduleInfo);
  },

  async getLessonById(moduleId, lessonId) {
    const list = await this.getLessonsByModule(moduleId);
    return list.find(l => l.id === lessonId) || list[0];
  }
};

export default lessonService;

