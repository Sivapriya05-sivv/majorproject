import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const HygieneRoutineGame = () => {
  const { user } = useAuth();
  const [completedSteps, setCompletedSteps] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const routine = [
    { step: 1, name: '1. രാവിലെ ഉണരുക', emoji: '⏰' },
    { step: 2, name: '2. പല്ലുതേക്കുക', emoji: '🪥' },
    { step: 3, name: '3. കുളിക്കുക', emoji: '🛁' },
    { step: 4, name: '4. ശുദ്ധമായ വസ്ത്രം ധരിക്കുക', emoji: '👕' }
  ];

  const nextStepNum = completedSteps.length + 1;

  const handleStepClick = (item) => {
    if (completedSteps.includes(item.step) || isFinished) return;

    if (item.step === nextStepNum) {
      soundEffects.playStar();
      const updated = [...completedSteps, item.step];
      setCompletedSteps(updated);
      const newScore = score + 1;
      setScore(newScore);

      if (updated.length === 4) {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'hygiene_routine',
          score: newScore * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setCompletedSteps([]);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="hygiene_routine"
      title_ml="ശുചിത്വ ദിനചര്യ ക്രമം"
      title_en="Daily Hygiene Routine Sequence"
      instructions_ml={`ദിനചര്യകൾ ശരിയായ ക്രമത്തിൽ (1, 2, 3, 4) തൊട്ടു പൂർത്തിയാക്കൂ! (അടുത്തത്: ${nextStepNum})`}
      instructions_en="Tap hygiene steps in correct chronological order 1 to 4!"
      score={score}
      maxScore={4}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl">
          {routine.map((item) => {
            const isDone = completedSteps.includes(item.step);
            return (
              <button
                key={item.step}
                onClick={() => handleStepClick(item)}
                className={`p-6 rounded-4xl border-3 flex flex-col items-center justify-center gap-3 transition-all ${
                  isDone
                    ? 'bg-emerald-100 border-emerald-500 scale-98 shadow-inner'
                    : 'bg-white hover:bg-sky-50 border-purple-200 hover:scale-105 active:scale-95 shadow-sm'
                }`}
              >
                <span className="text-5xl">{item.emoji}</span>
                <span className={`text-xs font-black text-center ${isDone ? 'text-emerald-800' : 'text-slate-800'}`}>
                  {item.name}
                </span>
                {isDone && <span className="text-emerald-600 font-extrabold text-xs">✓ ശരിയായി!</span>}
              </button>
            );
          })}
        </div>
      </div>
    </GameContainer>
  );
};

export default HygieneRoutineGame;

