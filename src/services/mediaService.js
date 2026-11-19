// MEDIA SERVICE - VEO 3 VIDEO & AUDIO ASSETS
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { getVideosForLesson } from '../data/videoCatalog';

export const mediaService = {
  async getMediaForLesson(lessonId) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('lesson_media')
        .select('*')
        .eq('lesson_id', lessonId);
      if (!error && data?.length) return data;
    }
    return getVideosForLesson(lessonId);
  }
};

export default mediaService;

