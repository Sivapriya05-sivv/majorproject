import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';
import { Wrench } from 'lucide-react';

export const SmartWorkshopGame = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const steps = [
    {
      instruction_ml: 'ഘട്ടം 1: പേപ്പർ ബാഗ് ഉണ്ടാക്കാൻ നല്ല പേപ്പർ തിരഞ്ഞെടുക്കൂ!',
      options: [
        { name: 'ചാർട്ട് പേപ്പർ', emoji: '📄', isCorrect: true },
        { name: 'കല്ല്', emoji: '🪨', isCorrect: false },
        { name: 'ഇല', emoji: '🍃', isCorrect: false }
      ]
    },
    {
      instruction_ml: 'ഘട്ടം 2: വശങ്ങൾ ഒട്ടിക്കാൻ പശ തിരഞ്ഞെടുക്കൂ!',
      options: [
        { name: 'പശ (Glue)', emoji: '🧴', isCorrect: true },
        { name: 'വെള്ളം', emoji: '💧', isCorrect: false },
        { name: 'മണ്ണ്', emoji: '🪴', isCorrect: false }
      ]
    },
    {
      instruction_ml: 'ഘട്ടം 3: കൈപ്പിടി ഉണ്ടാക്കാൻ ചരട് തിരഞ്ഞെടുക്കൂ!',
      options: [
        { name: 'കട്ടി ചരട് (Handle)', emoji: '🧵', isCorrect: true },
        { name: 'മുള്ള്', emoji: '🌵', isCorrect: false },
        { name: 'പൂവ്', emoji: '🌸', isCorrect: false }
      ]
    },
    {
      instruction_ml: 'ഘട്ടം 4: ജോലി കഴിഞ്ഞു! മേശ വൃത്തിയാക്കാൻ ചൂൽ തിരഞ്ഞെടുക്കൂ!',
      options: [
        { name: 'ചൂൽ / തുണി', emoji: '🧹', isCorrect: true },
        { name: 'മൊബൈൽ ഫോൺ', emoji: '📱', isCorrect: false },
        { name: 'പന്ത്', emoji: '⚽', isCorrect: false }
      ]
    }
  ];

  const currentStep = steps[step];

  const handleSelect = (option) => {
    if (isFinished) return;

    if (option.isCorrect) {
      soundEffects.playStar();
      const newScore = score + 1;
      setScore(newScore);

      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'smart_workshop',
          score: newScore * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setStep(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="smart_workshop"
      title_ml="സ്മാർട്ട് വർക്ക്‌ഷോപ്പ് (തൊഴിൽ ചിട്ടകൾ)"
      title_en="Smart Vocational Workshop"
      instructions_ml={currentStep?.instruction_ml}
      instructions_en="Select the correct vocational tool for each production step."
      score={score}
      maxScore={steps.length}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        <div className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-900 font-black text-center text-sm sm:text-base">
          {currentStep?.instruction_ml}
        </div>

        {/* Options */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {currentStep?.options.map((opt, idx) => (
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

export default SmartWorkshopGame;

