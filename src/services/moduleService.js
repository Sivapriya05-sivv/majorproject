// MODULE SERVICE
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { ALL_MODULES, getModulesByGroup, getModuleById } from '../data/modulesData';
import { LEARNING_GROUPS } from '../data/groupsData';

export const moduleService = {
  async getAllGroups() {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('learning_groups').select('*').order('display_order');
      if (!error && data?.length) return data;
    }
    return LEARNING_GROUPS;
  },

  async getModulesByGroupCode(groupCode) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('modules')
        .select('*, learning_groups!inner(*)')
        .eq('learning_groups.code', groupCode)
        .order('module_number');
      if (!error && data?.length) return data;
    }
    return getModulesByGroup(groupCode);
  },

  async getModuleDetails(moduleId) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('modules').select('*').eq('id', moduleId).single();
      if (!error && data) return data;
    }
    return getModuleById(moduleId);
  }
};

export default moduleService;

