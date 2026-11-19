import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';
import { Check, X } from 'lucide-react';

export const HealthyFoodSortGame = () => {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const foods = [
    { name: 'കാരറ്റ്', emoji: '🥕', isHealthy: true },
    { name: 'ചിപ്സ്', emoji: '🍟', isHealthy: false },
    { name: 'പാൽ', emoji: '🥛', isHealthy: true },
    { name: 'പച്ചക്കറി സാലഡ്', emoji: '🥗', isHealthy: true },
    { name: 'കോള സോഡ', emoji: '🥤', isHealthy: false }
  ];

  const current = foods[currentIdx];

  const handleClassify = (choseHealthy) => {
    if (isFinished) return;

    if (choseHealthy === current.isHealthy) {
      soundEffects.playStar();
      const newScore = score + 1;
      setScore(newScore);

      if (currentIdx < foods.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'healthy_food_sort',
          score: newScore * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="healthy_food_sort"
      title_ml="നല്ല ഭക്ഷണങ്ങൾ തരംതിരിക്കാം"
      title_en="Healthy Food Sort"
      instructions_ml="കാണുന്ന ഭക്ഷണം നല്ലതാണെങ്കിൽ പച്ച പ്ലേറ്റും, ജങ്ക് ഫുഡ് ആണെങ്കിൽ ചുവപ്പ് ബിന്നും തിരഞ്ഞെടുക്കൂ!"
      instructions_en="Tap Healthy (Green) or Junk (Red) for each food shown."
      score={score}
      maxScore={foods.length}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        {/* Food Card */}
        <div className="p-8 rounded-5xl bg-white border-4 border-purple-200 shadow-soft flex flex-col items-center animate-gentle-pulse">
          <span className="text-7xl mb-2">{current?.emoji}</span>
          <span className="text-xl font-black text-slate-800">{current?.name}</span>
        </div>

        {/* Choice Buttons */}
        <div className="flex items-center gap-4 w-full max-w-sm">
          <button
            onClick={() => handleClassify(true)}
            className="flex-1 py-4 px-4 rounded-3xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm sm:text-base shadow-bubbly-mint active:translate-y-1 flex flex-col items-center gap-1.5 transition-all"
          >
            <Check className="w-6 h-6" />
            <span>നല്ല ഭക്ഷണം (പച്ച)</span>
          </button>

          <button
            onClick={() => handleClassify(false)}
            className="flex-1 py-4 px-4 rounded-3xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm sm:text-base shadow-bubbly-pink active:translate-y-1 flex flex-col items-center gap-1.5 transition-all"
          >
            <X className="w-6 h-6" />
            <span>ജങ്ക് ഫുഡ് (മാറ്റുക)</span>
          </button>
        </div>
      </div>
    </GameContainer>
  );
};

export default HealthyFoodSortGame;

