import React, { useState } from 'react';
import { RotateCcw, Volume2, Star, Sparkles, HelpCircle, Trophy } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Ollie from '../mascot/Ollie';
import Button from '../common/Button';
import soundEffects from '../../utils/soundSynth';
import narrator from '../../utils/speechSynthesizer';
import gameService from '../../services/gameService';
import confetti from 'canvas-confetti';

export const GameContainer = ({
  gameCode,
  title_ml,
  title_en,
  instructions_ml,
  instructions_en,
  score,
  maxScore = 5,
  attempts = 1,
  onReset,
  children,
  isFinished = false,
  isClassroomTV = false
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [showHint, setShowHint] = useState(false);

  const handleSpeakInstructions = () => {
    soundEffects.playPop();
    const text = t(instructions_ml, instructions_en);
    narrator.speak(text, 'ml-IN');
  };

  const handleToggleHint = () => {
    soundEffects.playPop();
    setShowHint(!showHint);
  };

  return (
    <div className={`flex flex-col rounded-4xl bg-white border-3 border-purple-200 shadow-soft-lg overflow-hidden ${
      isClassroomTV ? 'p-6 sm:p-8 min-h-[550px]' : 'p-4 sm:p-6'
    }`}>
      {/* Game Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <Ollie state="happy" size="sm" />
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-800">
              {title_ml}
            </h3>
            <p className="text-xs font-bold text-slate-500">
              {title_en}
            </p>
          </div>
        </div>

        {/* Score & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Score display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 font-black text-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{score} / {maxScore}</span>
          </div>

          {/* Audio instructions */}
          <button
            type="button"
            onClick={handleSpeakInstructions}
            className="p-2.5 rounded-2xl bg-purple-100 hover:bg-purple-200 text-brand-purple transition-colors"
            title="Listen instructions in Malayalam"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Hint button */}
          <button
            type="button"
            onClick={handleToggleHint}
            className="p-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
            title="Need a hint?"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={onReset}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Instructions Banner */}
      <div className="p-3 sm:p-4 rounded-2xl bg-purple-50/70 border border-purple-100 mb-4 flex items-center justify-between gap-2">
        <p className="text-xs sm:text-sm font-bold text-purple-900 leading-relaxed">
          💡 {t(instructions_ml, instructions_en)}
        </p>
      </div>

      {showHint && (
        <div className="p-3 mb-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 animate-fadeIn">
          {t('സൂചന: സാവധാനം നോക്കി ഒല്ലി പറഞ്ഞു തന്ന രൂപത്തിൽ തൊടുക!', 'Hint: Look closely and tap gently on the matching picture!')}
        </div>
      )}

      {/* Playable Game Area */}
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>

      {/* Finished Celebration Modal View */}
      {isFinished && (
        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 border-2 border-purple-300 text-center animate-scaleUp">
          <Ollie state="celebrating" size="md" className="mx-auto mb-2" />
          <h4 className="text-xl font-black text-slate-800">
            {t('അഭിനന്ദനങ്ങൾ! കളി ജയിച്ചു!', 'Congratulations! Game Won!')}
          </h4>
          <p className="text-xs font-bold text-slate-600 mt-1 mb-4">
            {t(`സ്കോർ: ${score} പോയിന്റ്! 3 നക്ഷത്രങ്ങൾ സമ്മാനം!`, `Score: ${score} points! 3 Stars Saved!`)}
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="purple" size="md" onClick={onReset} icon={RotateCcw}>
              {t('വീണ്ടും കളിക്കാം', 'Play Again')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameContainer;

