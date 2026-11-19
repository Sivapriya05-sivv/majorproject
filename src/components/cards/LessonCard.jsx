import React from 'react';
import { PlayCircle, Users, CheckCircle2, Gamepad2, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import AudioButton from '../common/AudioButton';
import soundEffects from '../../utils/soundSynth';

export const LessonCard = ({ lesson, onSelect, isSelected = false }) => {
  const { t } = useLanguage();

  const handleClick = () => {
    soundEffects.playPop();
    if (onSelect) onSelect(lesson);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
        isSelected
          ? 'bg-purple-100/70 border-brand-purple shadow-soft'
          : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
            {t(`പാഠം ${lesson.lessonNumber}`, `Lesson ${lesson.lessonNumber}`)}
          </span>
          <h4 className="text-base font-extrabold text-slate-800 line-clamp-1">
            {lesson.title_ml}
          </h4>
          <p className="text-xs font-semibold text-slate-500">
            {lesson.title_en}
          </p>
        </div>

        <AudioButton text={lesson.narration_ml || lesson.title_ml} size="sm" />
      </div>

      {/* 4 Phases Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-purple-50 text-[11px] font-bold">
        <div className="flex items-center gap-1.5 text-purple-700 bg-purple-50 px-2 py-1 rounded-xl">
          <PlayCircle className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" />
          <span className="truncate">{t('വിഷ്വൽ', 'Visual')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sky-700 bg-sky-50 px-2 py-1 rounded-xl">
          <Users className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
          <span className="truncate">{t('ക്ലാസ്സ്', 'Activity')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-xl">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span className="truncate">{t('വിലയിരുത്തൽ', 'Check')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-pink-700 bg-pink-50 px-2 py-1 rounded-xl">
          <Gamepad2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
          <span className="truncate">{t('ഗെയിം', 'Game')}</span>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;

