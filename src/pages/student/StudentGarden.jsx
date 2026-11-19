import React, { useState, useEffect } from 'react';
import { Flower2, Star, Award, Sparkles, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Ollie from '../../components/mascot/Ollie';
import soundEffects from '../../utils/soundSynth';
import { progressService } from '../../services/progressService';
import { rewardService } from '../../services/rewardService';

export const StudentGarden = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [progress, setProgress] = useState(null);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (user?.id) {
      const prog = progressService.getStudentProgress(user.id);
      setProgress(prog);
      const b = rewardService.getStudentBadges(user);
      setBadges(b);
    }
  }, [user]);

  const flowers = progress?.gardenFlowers || [
    { id: 1, type: 'sunflower', stage: 'bloomed', name: 'Curiosity Sunflower', emoji: '🌻' },
    { id: 2, type: 'lotus', stage: 'bloomed', name: 'Focus Lotus', emoji: '🪷' },
    { id: 3, type: 'rose', stage: 'bloomed', name: 'Kindness Rose', emoji: '🌹' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-500 text-white shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('പ്രോഗ്രസ്സ് ഗാർഡൻ (Progress Garden)', 'My Progress Garden')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {t('ഒല്ലിയുടെ പൂന്തോട്ടം വിരിയുന്നു!', 'My Learning Garden is Blooming!')}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-lg">
            {t(
              'നിങ്ങൾ നേടുന്ന ഓരോ നക്ഷത്രവും ഇവിടെ മനോഹരമായ പൂക്കളായി വിരിയുന്നു!',
              'Every learning star you earn waters and blooms new flowers in your personal garden!'
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-3xl bg-white/20 backdrop-blur-md">
          <Star className="w-8 h-8 text-amber-300 fill-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <span className="text-2xl font-black">{progress?.totalStars || user?.stars || 15}</span>
            <p className="text-[10px] font-bold text-emerald-100">{t('വിരിയിച്ച നക്ഷത്രങ്ങൾ', 'Garden Stars')}</p>
          </div>
        </div>
      </div>

      {/* The Visual Garden Canvas */}
      <div className="relative p-8 sm:p-14 rounded-5xl bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-200 border-4 border-emerald-300 shadow-soft-lg overflow-hidden min-h-[380px] flex flex-col justify-between">
        {/* Sky Elements: Sun & Butterflies */}
        <div className="absolute top-6 left-8 text-6xl animate-gentle-pulse">☀️</div>
        <div className="absolute top-12 right-20 text-4xl animate-gentle-bounce select-none">🦋</div>
        <div className="absolute top-28 left-48 text-3xl animate-gentle-bounce select-none" style={{ animationDelay: '1s' }}>🦋</div>

        {/* Ollie Watering Garden */}
        <div className="absolute top-6 right-8 flex flex-col items-center">
          <Ollie state="happy" size="md" className="animate-gentle-bounce" />
          <span className="text-[10px] font-black bg-white/90 text-emerald-800 px-3 py-1 rounded-full shadow-sm mt-1">
            തോട്ടക്കാരൻ ഒല്ലി 🦉
          </span>
        </div>

        <div className="flex-1" />

        {/* Flower Beds on Grass */}
        <div className="relative z-10 flex flex-wrap items-end justify-center gap-6 sm:gap-10 pt-16">
          {flowers.map((fl, idx) => (
            <div
              key={fl.id || idx}
              onClick={() => soundEffects.playStar()}
              className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
            >
              {/* Petal & Stem */}
              <span className="text-6xl sm:text-7xl animate-gentle-bounce" style={{ animationDelay: `${idx * 200}ms` }}>
                {fl.emoji || (fl.type === 'sunflower' ? '🌻' : fl.type === 'lotus' ? '🪷' : '🌹')}
              </span>
              <div className="w-2 h-10 bg-emerald-600 rounded-full my-1 shadow-sm" />
              <div className="w-16 h-4 bg-emerald-700/60 rounded-full blur-[2px]" />

              {/* Plant Tag */}
              <span className="text-xs font-black bg-white text-emerald-900 px-3 py-1 rounded-full border border-emerald-300 shadow-sm mt-2">
                {fl.name}
              </span>
            </div>
          ))}

          {/* Next Budding Flower */}
          <div className="flex flex-col items-center opacity-60">
            <span className="text-5xl">🌱</span>
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full my-1" />
            <span className="text-[10px] font-bold bg-white/80 text-slate-600 px-2.5 py-0.5 rounded-full mt-1">
              അടുത്ത പൂമൊട്ട്
            </span>
          </div>
        </div>
      </div>

      {/* Badges & Medals Showcase */}
      <div>
        <h3 className="text-xl font-black text-slate-800 mb-4">
          {t('എന്റെ ബാഡ്ജുകൾ (Earned Badges)', 'My Earned Badges')}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((b) => (
            <div
              key={b.code}
              onClick={() => {
                if (b.isEarned) soundEffects.playStar();
              }}
              className={`p-5 rounded-4xl border-3 flex flex-col items-center text-center transition-all ${
                b.isEarned
                  ? 'bg-white border-amber-300 shadow-soft hover:scale-105 cursor-pointer'
                  : 'bg-slate-50 border-slate-200 opacity-40'
              }`}
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-300 to-yellow-500 flex items-center justify-center text-3xl shadow-md mb-3 text-white">
                {b.isEarned ? '🏆' : '🔒'}
              </div>

              <h4 className="text-sm font-black text-slate-800 mb-1">
                {b.title_ml}
              </h4>
              <p className="text-[11px] font-semibold text-slate-500 line-clamp-2">
                {b.description_ml}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentGarden;

