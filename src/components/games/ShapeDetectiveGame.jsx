import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const ShapeDetectiveGame = () => {
  const { user } = useAuth();
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const rounds = [
    {
      shape_ml: 'വട്ടം (Circle)',
      shape_emoji: '⚪',
      options: [
        { name: 'ക്ലോക്ക് (Clock)', emoji: '⏰', isCorrect: true },
        { name: 'പുസ്തകം (Book)', emoji: '📖', isCorrect: false },
        { name: 'ത്രികോണ കൊടി', emoji: '🚩', isCorrect: false }
      ]
    },
    {
      shape_ml: 'സമചതുരം (Square)',
      shape_emoji: '⬛',
      options: [
        { name: 'പന്ത്', emoji: '⚽', isCorrect: false },
        { name: 'ഗിഫ്റ്റ് ബോക്സ്', emoji: '🎁', isCorrect: true },
        { name: 'ഐസ്ക്രീം കോൺ', emoji: '🍦', isCorrect: false }
      ]
    },
    {
      shape_ml: 'ത്രികോണം (Triangle)',
      shape_emoji: '🔺',
      options: [
        { name: 'പിസ്സ സ്ലൈസ്', emoji: '🍕', isCorrect: true },
        { name: 'പൂന്തോട്ടം', emoji: '🌻', isCorrect: false },
        { name: 'വളയം', emoji: '⭕', isCorrect: false }
      ]
    }
  ];

  const current = rounds[roundIdx];

  const handleSelect = (option) => {
    if (isFinished) return;

    if (option.isCorrect) {
      soundEffects.playStar();
      const newScore = score + 1;
      setScore(newScore);

      if (roundIdx < rounds.length - 1) {
        setRoundIdx(roundIdx + 1);
      } else {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'shape_detective',
          score: newScore * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setRoundIdx(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="shape_detective"
      title_ml="ആകൃതികളുടെ കൂട്ടുകാരൻ (Shape Detective)"
      title_en="Shape Detective"
      instructions_ml={`മുകളിൽ കാണുന്ന ആകൃതിയുള്ള (${current?.shape_ml}) യഥാർത്ഥ വസ്തു കണ്ടെത്തൂ!`}
      instructions_en={`Find the real object that has the shape: ${current?.shape_ml}`}
      score={score}
      maxScore={rounds.length}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        <div className="p-6 rounded-4xl bg-purple-50 border-3 border-purple-300 shadow-sm flex flex-col items-center">
          <span className="text-6xl mb-2">{current?.shape_emoji}</span>
          <span className="text-base font-black text-brand-purple">{current?.shape_ml}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {current?.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              className="p-5 rounded-3xl bg-white border-3 border-purple-200 hover:border-brand-purple hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-5xl">{opt.emoji}</span>
              <span className="text-xs font-bold text-slate-800 text-center">{opt.name}</span>
            </button>
          ))}
        </div>
      </div>
    </GameContainer>
  );
};

export default ShapeDetectiveGame;

