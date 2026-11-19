import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Play, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const GameCard = ({ game, onPlay }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleStart = () => {
    soundEffects.playPop();
    if (onPlay) {
      onPlay(game);
    } else {
      navigate(`/student/play/${game.code}`);
    }
  };

  const groupBadges = {
    care: 'bg-pink-100 text-pink-800 border-pink-200',
    primary: 'bg-sky-100 text-sky-800 border-sky-200',
    secondary: 'bg-purple-100 text-purple-800 border-purple-200',
    vocational: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  };

  return (
    <div
      onClick={handleStart}
      className="group p-5 rounded-4xl bg-white border-2 border-purple-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-3xl bg-pastel-lavender flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-6 h-6" />
          </div>

          <span
            className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
              groupBadges[game.group] || groupBadges.care
            }`}
          >
            {game.group}
          </span>
        </div>

        <h4 className="text-base font-black text-slate-800 group-hover:text-brand-purple transition-colors mb-1">
          {game.title_ml}
        </h4>
        <p className="text-xs font-bold text-slate-500 mb-2">
          {game.title_en}
        </p>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {t(game.description_ml, game.description_en)}
        </p>
      </div>

      <div className="pt-4 mt-3 border-t border-purple-50 flex items-center justify-between">
        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
          {t(game.difficulty === 'easy' ? 'എളുപ്പം' : 'ഇടത്തരം', game.difficulty)}
        </span>

        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-brand-purple text-white text-xs font-black shadow-sm group-hover:bg-brand-purpleHover"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{t('കളിക്കാം', 'Play')}</span>
        </button>
      </div>
    </div>
  );
};

export default GameCard;

