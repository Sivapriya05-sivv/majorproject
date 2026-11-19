import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const PictureMatchGame = () => {
  const { user } = useAuth();
  const [targetIndex, setTargetIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const rounds = [
    {
      target: { name: 'ആപ്പിൾ', emoji: '🍎', color: 'bg-rose-100' },
      options: [
        { id: 1, name: 'ആപ്പിൾ', emoji: '🍎', isCorrect: true },
        { id: 2, name: 'പന്ത്', emoji: '⚽', isCorrect: false },
        { id: 3, name: 'മരം', emoji: '🌳', isCorrect: false }
      ]
    },
    {
      target: { name: 'പൂച്ച', emoji: '🐱', color: 'bg-amber-100' },
      options: [
        { id: 1, name: 'പശു', emoji: '🐄', isCorrect: false },
        { id: 2, name: 'പൂച്ച', emoji: '🐱', isCorrect: true },
        { id: 3, name: 'കാർ', emoji: '🚗', isCorrect: false }
      ]
    },
    {
      target: { name: 'സൂര്യൻ', emoji: '☀️', color: 'bg-yellow-100' },
      options: [
        { id: 1, name: 'സൂര്യൻ', emoji: '☀️', isCorrect: true },
        { id: 2, name: 'മീൻ', emoji: '🐟', isCorrect: false },
        { id: 3, name: 'വീട്', emoji: '🏠', isCorrect: false }
      ]
    }
  ];

  const currentRound = rounds[targetIndex];

  const handleSelect = (option) => {
    if (isFinished) return;
    if (option.isCorrect) {
      soundEffects.playStar();
      const newScore = score + 1;
      setScore(newScore);

      if (targetIndex < rounds.length - 1) {
        setTargetIndex(targetIndex + 1);
      } else {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'picture_match',
          score: newScore * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setTargetIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="picture_match"
      title_ml="ചിത്രവും നിഴലും പൊരുത്തപ്പെടുത്തൽ"
      title_en="Picture & Item Match"
      instructions_ml="മുകളിൽ കാണുന്ന അതേ ചിത്രം താഴെയുള്ളവയിൽ നിന്നും തൊട്ടു തിരഞ്ഞെടുക്കുക."
      instructions_en="Tap the picture below that matches the one shown on top."
      score={score}
      maxScore={rounds.length}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center justify-center space-y-8 my-4">
        {/* Target Card */}
        <div className="flex flex-col items-center p-6 rounded-4xl bg-purple-50 border-3 border-purple-300 shadow-md">
          <span className="text-xs font-black text-brand-purple mb-2">ഈ ചിത്രം ഏതാണ്?</span>
          <span className="text-7xl animate-gentle-pulse">{currentRound?.target.emoji}</span>
          <span className="text-lg font-black text-slate-800 mt-2">{currentRound?.target.name}</span>
        </div>

        {/* Options */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {currentRound?.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className="p-5 rounded-3xl bg-white border-3 border-purple-200 hover:border-brand-purple hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-5xl">{opt.emoji}</span>
              <span className="text-xs font-bold text-slate-700">{opt.name}</span>
            </button>
          ))}
        </div>
      </div>
    </GameContainer>
  );
};

export default PictureMatchGame;

