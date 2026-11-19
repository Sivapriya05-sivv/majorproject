import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, BookOpen, Heart, Sparkles, Briefcase, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const ModuleCard = ({ module, role = 'student', isCompleted = false, starsEarned = 3 }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const themeColors = {
    purple: 'border-purple-200 hover:border-purple-400 bg-purple-50/40',
    yellow: 'border-amber-200 hover:border-amber-400 bg-amber-50/40',
    peach: 'border-orange-200 hover:border-orange-400 bg-orange-50/40',
    sky: 'border-sky-200 hover:border-sky-400 bg-sky-50/40',
    pink: 'border-pink-200 hover:border-pink-400 bg-pink-50/40',
    mint: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/40',
    rose: 'border-rose-200 hover:border-rose-400 bg-rose-50/40'
  };

  const handleOpen = () => {
    soundEffects.playPop();
    if (role === 'teacher') {
      navigate(`/teacher/lesson/${module.id}`);
    } else {
      navigate(`/student/module/${module.id}`);
    }
  };

  return (
    <div
      onClick={handleOpen}
      className={`group relative flex flex-col justify-between p-6 rounded-4xl border-2 transition-all duration-200 cursor-pointer shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 ${
        themeColors[module.themeColor] || themeColors.purple
      }`}
    >
      <div>
        {/* Top Header: Module Number & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-white font-black text-brand-purple text-sm shadow-sm border border-purple-100">
            {module.moduleNumber}
          </span>

          <div className="flex items-center gap-1">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-4 h-4 ${
                  isCompleted && starIdx <= starsEarned
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Title in Malayalam & English */}
        <h3 className="text-lg font-black text-slate-800 group-hover:text-brand-purple transition-colors line-clamp-1">
          {module.title_ml}
        </h3>
        <p className="text-xs font-bold text-slate-500 mb-3 line-clamp-1">
          {module.title_en}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {t(module.description_ml, module.description_en)}
        </p>
      </div>

      {/* Focus Area Tags */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {module.focusAreas?.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/80 text-purple-800 border border-purple-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-purple-100/60 text-xs font-black text-brand-purple">
          <span>{role === 'teacher' ? t('പാഠം പഠിപ്പിക്കുക', 'Teach Lesson') : t('തുടങ്ങാം', 'Explore')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;

