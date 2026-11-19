import React from 'react';
import { Star, Trophy, Award, Sparkles, BookOpen, Flower2, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Ollie from '../../components/mascot/Ollie';
import soundEffects from '../../utils/soundSynth';
import { progressService } from '../../services/progressService';
import { rewardService } from '../../services/rewardService';

export const StudentProfile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const progress = progressService.getStudentProgress(user?.id);
  const badges = rewardService.getStudentBadges(user);

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
          {t('എന്റെ പ്രൊഫൈൽ', 'My Profile')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          {t('വിദ്യാർത്ഥി പ്രൊഫൈൽ', 'Student Profile')}
        </h2>
      </div>

      {/* Profile Card */}
      <div className="p-8 rounded-5xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 text-white shadow-soft-lg flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="w-24 h-24 rounded-4xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-md flex-shrink-0 animate-gentle-pulse">
          {user?.avatar || '👦'}
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/25 px-3 py-1 rounded-full">
            {t(user?.groupName_ml || 'കെയർ ഗ്രൂപ്പ്', user?.groupName_en || 'Care Group')}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black">{user?.fullName}</h3>
          <p className="text-sm font-bold text-amber-100">
            {user?.fullName_ml || user?.fullName}
          </p>
          <p className="text-xs text-white/90 font-bold pt-1">
            Student ID: <strong>{user?.studentIdNumber || 'STU101'}</strong> • School: <strong>{user?.schoolId || 'SCH001'}</strong>
          </p>
        </div>
      </div>

      {/* Rewards & Stars Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-4xl bg-amber-50 border-3 border-amber-200 text-center shadow-sm">
          <Star className="w-8 h-8 text-amber-500 fill-amber-400 mx-auto mb-2" />
          <span className="text-3xl font-black text-amber-950">{progress?.totalStars || user?.stars || 15}</span>
          <p className="text-xs font-extrabold text-amber-800 mt-1">{t('ആകെ നക്ഷത്രങ്ങൾ', 'Stars Earned')}</p>
        </div>

        <div className="p-6 rounded-4xl bg-pink-50 border-3 border-pink-200 text-center shadow-sm">
          <Flower2 className="w-8 h-8 text-pink-500 mx-auto mb-2" />
          <span className="text-3xl font-black text-pink-950">{progress?.gardenFlowers?.length || 3}</span>
          <p className="text-xs font-extrabold text-pink-800 mt-1">{t('വിരിഞ്ഞ പൂക്കൾ', 'Garden Flowers')}</p>
        </div>

        <div className="p-6 rounded-4xl bg-purple-50 border-3 border-purple-200 text-center shadow-sm col-span-2 sm:col-span-1">
          <Trophy className="w-8 h-8 text-brand-purple mx-auto mb-2" />
          <span className="text-3xl font-black text-purple-950">{badges.filter(b => b.isEarned).length}</span>
          <p className="text-xs font-extrabold text-purple-800 mt-1">{t('ബാഡ്ജുകൾ', 'Earned Badges')}</p>
        </div>
      </div>

      {/* Badges List */}
      <div className="p-6 sm:p-8 rounded-4xl bg-white border-2 border-purple-100 shadow-soft space-y-4">
        <h4 className="text-lg font-black text-slate-800">
          {t('എന്റെ ബാഡ്ജ് ശേഖരം', 'My Badges Collection')}
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badges.map((b) => (
            <div
              key={b.code}
              onClick={() => {
                if (b.isEarned) soundEffects.playStar();
              }}
              className={`p-4 rounded-3xl border-2 flex items-center gap-3 transition-all ${
                b.isEarned ? 'bg-amber-50/60 border-amber-300 shadow-sm cursor-pointer' : 'bg-slate-50 border-slate-200 opacity-40'
              }`}
            >
              <span className="text-3xl">{b.isEarned ? '🏆' : '🔒'}</span>
              <div>
                <h5 className="text-xs font-black text-slate-800">{b.title_ml}</h5>
                <p className="text-[10px] font-bold text-slate-500">{b.title_en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

