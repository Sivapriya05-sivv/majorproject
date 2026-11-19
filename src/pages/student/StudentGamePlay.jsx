import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import GameHubRouter from '../../components/games/GameHubRouter';
import soundEffects from '../../utils/soundSynth';

export const StudentGamePlay = () => {
  const { gameCode } = useParams();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      <Link
        to="/student/games"
        onClick={() => soundEffects.playPop()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-pink-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('എല്ലാ കളികളിലേക്കും മടങ്ങുക', 'Back to Games Hub')}</span>
      </Link>

      <GameHubRouter gameCode={gameCode || 'picture_match'} />
    </div>
  );
};

export default StudentGamePlay;

