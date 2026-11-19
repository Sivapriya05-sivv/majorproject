import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Ollie from '../../components/mascot/Ollie';
import soundEffects from '../../utils/soundSynth';
import { getModulesByGroup } from '../../data/modulesData';

export const AdventureMap = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const groupCode = user?.groupCode || 'care';
  const modules = getModulesByGroup(groupCode);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Map Header */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-purple-100 text-xs font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('സാഹസിക മാപ്പ് (Learning Adventure Map)', 'Learning Adventure Map')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {t('ഒല്ലിയുടെ മാന്ത്രിക പഠനയാത്ര', "Ollie's Magical Learning Journey")}
          </h2>
          <p className="text-xs sm:text-sm text-purple-100/90 mt-1 max-w-lg">
            {t(
              'ഓരോ പാഠവും പഠിക്കുമ്പോൾ മാപ്പിൽ പുതിയ ഘട്ടങ്ങൾ വിരിയുന്നു. മുന്നോട്ട് പോകൂ കൂട്ടുകാരാ!',
              'Step through each milestone, collect sparkling stars and advance with Ollie!'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/20 backdrop-blur-md">
          <Star className="w-6 h-6 text-amber-400 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <span className="text-lg font-black">{user?.stars || 12}</span>
            <p className="text-[10px] font-bold text-purple-200">{t('ആകെ നക്ഷത്രങ്ങൾ', 'Total Stars')}</p>
          </div>
        </div>
      </div>

      {/* Visual Adventure Map Path */}
      <div className="relative p-6 sm:p-10 rounded-5xl bg-gradient-to-b from-sky-50 via-purple-50 to-pink-50 border-4 border-purple-200 shadow-soft overflow-hidden">
        {/* Floating Clouds Background */}
        <div className="absolute top-8 left-12 text-5xl opacity-40 select-none animate-float">☁️</div>
        <div className="absolute top-48 right-16 text-6xl opacity-40 select-none animate-float" style={{ animationDelay: '3s' }}>☁️</div>

        {/* Path of Modules */}
        <div className="relative z-10 flex flex-col items-center space-y-8 sm:space-y-12">
          {modules.map((m, index) => {
            const isUnlocked = index <= 2; // sample unlocked state
            const isCurrent = index === 0;

            return (
              <div
                key={m.id}
                className={`relative flex flex-col items-center ${
                  index % 2 === 0 ? 'sm:translate-x-12' : 'sm:-translate-x-12'
                }`}
              >
                {/* Ollie Mascot standing at current stage */}
                {isCurrent && (
                  <div className="absolute -top-16 -right-14 z-20 animate-gentle-bounce">
                    <Ollie state="happy" size="sm" />
                    <span className="text-[10px] font-black bg-brand-purple text-white px-2 py-0.5 rounded-full shadow-md">
                      ഇവിടെ!
                    </span>
                  </div>
                )}

                {/* Stage Node */}
                <Link
                  to={`/student/module/${m.id}`}
                  onClick={() => soundEffects.playPop()}
                  className={`group relative p-5 sm:p-6 rounded-4xl border-4 transition-all duration-200 flex items-center gap-4 shadow-soft hover:shadow-soft-lg hover:scale-105 ${
                    isUnlocked
                      ? 'bg-white border-brand-purple cursor-pointer'
                      : 'bg-slate-100 border-slate-300 opacity-70 cursor-pointer'
                  }`}
                >
                  {/* Stage Number / Lock Icon */}
                  <div
                    className={`w-14 h-14 rounded-3xl flex items-center justify-center font-black text-xl shadow-md ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-900 border-2 border-amber-300'
                        : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? m.moduleNumber : <Lock className="w-5 h-5" />}
                  </div>

                  {/* Stage Info */}
                  <div className="min-w-[160px] max-w-[240px]">
                    <span className="text-[10px] font-black text-brand-purple uppercase tracking-wider block">
                      {t(`ഘട്ടം ${m.moduleNumber}`, `Stage ${m.moduleNumber}`)}
                    </span>
                    <h4 className="text-base font-black text-slate-800 line-clamp-1 group-hover:text-brand-purple transition-colors">
                      {m.title_ml}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 line-clamp-1">
                      {m.title_en}
                    </p>

                    {/* Stars Earned */}
                    {isUnlocked && (
                      <div className="flex items-center gap-1 mt-1.5">
                        {[1, 2, 3].map((s) => (
                          <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    )}
                  </div>

                  <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Path Connector Line */}
                {index < modules.length - 1 && (
                  <div className="w-1.5 h-8 sm:h-12 border-l-4 border-dashed border-purple-300 my-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdventureMap;

