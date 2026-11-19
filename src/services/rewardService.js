// REWARD & BADGES SERVICE
import { supabase, isSupabaseConfigured } from './supabaseClient';
import storageHelper from '../utils/storageHelper';

export const BADGES_LIST = [
  {
    code: 'STARTER',
    title_ml: 'ആദ്യ ചുവട്',
    title_en: 'First Step',
    description_ml: 'ആദ്യ പാഠം വിജയകരമായി പൂർത്തിയാക്കി!',
    description_en: 'Completed your very first lesson with Ollie!',
    icon: 'Sparkles',
    color: 'from-amber-400 to-yellow-500'
  },
  {
    code: 'STAR_COLLECTOR',
    title_ml: 'നക്ഷത്ര കൂട്ടുകാരൻ',
    title_en: 'Star Collector',
    description_ml: '10 നക്ഷത്രങ്ങൾ സ്വന്തമാക്കി!',
    description_en: 'Collected 10 bright learning stars!',
    icon: 'Star',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    code: 'GAME_CHAMPION',
    title_ml: 'ഗെയിം ചാമ്പ്യൻ',
    title_en: 'Game Champion',
    description_ml: '5 വ്യത്യസ്ത കളികൾ കളിച്ചു!',
    description_en: 'Successfully completed 5 learning games!',
    icon: 'Trophy',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    code: 'SUPER_HELPER',
    title_ml: 'നല്ല സഹായി',
    title_en: 'Super Helper',
    description_ml: 'ക്ലാസ്സ്റൂം പ്രവർത്തനങ്ങളിൽ മുന്നിൽ നിന്നു!',
    description_en: 'Active, caring classroom participation!',
    icon: 'Heart',
    color: 'from-pink-400 to-rose-500'
  },
  {
    code: 'GARDEN_BLOOM',
    title_ml: 'പൂന്തോട്ടം ചിരിക്കുന്നു',
    title_en: 'Garden Bloomer',
    description_ml: 'പ്രോഗ്രസ്സ് ഗാർഡനിൽ പുതിയ പൂക്കൾ വിരിയിച്ചു!',
    description_en: 'Nurtured flowers in your progress garden!',
    icon: 'Smile',
    color: 'from-sky-400 to-blue-500'
  }
];

export const rewardService = {
  getBadges() {
    return BADGES_LIST;
  },

  getStudentBadges(student) {
    const earnedCodes = student?.badges || ['STARTER', 'STAR_COLLECTOR'];
    return BADGES_LIST.map(b => ({
      ...b,
      isEarned: earnedCodes.includes(b.code)
    }));
  }
};

export default rewardService;

