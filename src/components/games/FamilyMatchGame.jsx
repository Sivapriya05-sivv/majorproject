import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const FamilyMatchGame = () => {
  const { user } = useAuth();
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const rounds = [
    {
      action_ml: 'സ്നേഹത്തോടെ രുചിയുള്ള ഭക്ഷണം നൽകുന്നു',
      action_emoji: '🍲',
      options: [
        { name: 'അമ്മ (Amma)', emoji: '👩', isCorrect: true },
        { name: 'മൊബൈൽ', emoji: '📱', isCorrect: false },
        { name: 'പൂച്ച', emoji: '🐱', isCorrect: false }
      ]
    },
    {
      action_ml: 'രസമുള്ള കഥകൾ പറഞ്ഞു തരുന്നു',
      action_emoji: '📖',
      options: [
        { name: 'മുത്തശ്ശി (Grandma)', emoji: '👵', isCorrect: true },
        { name: 'ടിവി', emoji: '📺', isCorrect: false },
        { name: 'കല്ല്', emoji: '🪨', isCorrect: false }
      ]
    },
    {
      action_ml: 'കൈപിടിച്ച് പാർക്കിലേക്ക് കൊണ്ടുപോകുന്നു',
      action_emoji: '🌳',
      options: [
        { name: 'അച്ഛൻ (Acha)', emoji: '👨', isCorrect: true },
        { name: 'കസേര', emoji: '🪑', isCorrect: false },
        { name: 'വാഹനം', emoji: '🚗', isCorrect: false }
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
          gameCode: 'family_match',
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
      gameCode="family_match"
      title_ml="കുടുംബാംഗങ്ങളെ തിരിച്ചറിയാം"
      title_en="Family Care Match"
      instructions_ml={`സ്നേഹപ്രവൃത്തിക്ക് അനുയോജ്യമായ കുടുംബാംഗത്തെ തിരഞ്ഞെടുക്കൂ!`}
      instructions_en="Select the family member for each loving action!"
      score={score}
      maxScore={rounds.length}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        <div className="p-6 rounded-4xl bg-pink-50 border-3 border-pink-200 shadow-sm flex flex-col items-center text-center max-w-sm">
          <span className="text-6xl mb-2">{current?.action_emoji}</span>
          <p className="text-base font-black text-slate-800">{current?.action_ml}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {current?.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              className="p-5 rounded-3xl bg-white border-3 border-purple-200 hover:border-pink-500 hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center gap-2 cursor-pointer"
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

export default FamilyMatchGame;

