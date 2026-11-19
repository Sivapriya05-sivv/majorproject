import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const NumberTrainGame = () => {
  const { user } = useAuth();
  const [attachedNumbers, setAttachedNumbers] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const availableNumbers = [3, 1, 5, 2, 4];
  const nextExpected = attachedNumbers.length + 1;

  const handleAttach = (num) => {
    if (isFinished || attachedNumbers.includes(num)) return;

    if (num === nextExpected) {
      soundEffects.playStar();
      const updated = [...attachedNumbers, num];
      setAttachedNumbers(updated);
      const newScore = score + 1;
      setScore(newScore);

      if (updated.length === 5) {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'number_train',
          score: newScore * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setAttachedNumbers([]);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="number_train"
      title_ml="നമ്പർ ട്രെയിൻ അഡ്വഞ്ചർ"
      title_en="Number Train Adventure"
      instructions_ml={`ട്രെയിനിലേക്ക് അടുത്ത ബോഗി ഘടിപ്പിക്കൂ: ക്രമത്തിൽ 1, 2, 3, 4, 5 (ഇപ്പോൾ വേണ്ടത്: ${nextExpected})`}
      instructions_en={`Assemble train wagons 1 to 5 in order! Current expected number: ${nextExpected}`}
      score={score}
      maxScore={5}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-8">
        {/* The Train on Track */}
        <div className="w-full overflow-x-auto pb-4">
          <div className="flex items-center justify-center gap-2 min-w-max p-4 bg-purple-50/60 rounded-4xl border-2 border-purple-200">
            {/* Engine */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-brand-purple text-white font-black text-xl shadow-md">
              <span className="text-4xl mb-1">🚂</span>
              <span className="text-[10px]">എഞ്ചിൻ</span>
            </div>

            {/* Attached Wagons */}
            {attachedNumbers.map((num) => (
              <div
                key={num}
                className="flex flex-col items-center p-3 w-16 h-20 rounded-2xl bg-amber-400 text-slate-900 font-black text-2xl shadow-md animate-scaleUp justify-center border-2 border-amber-500"
              >
                <span>{num}</span>
                <span className="text-[10px] font-bold">ബോഗി</span>
              </div>
            ))}

            {/* Empty Slot */}
            {attachedNumbers.length < 5 && (
              <div className="w-16 h-20 rounded-2xl border-3 border-dashed border-purple-300 flex items-center justify-center text-purple-400 font-black text-lg animate-pulse">
                ?
              </div>
            )}
          </div>
        </div>

        {/* Number Buttons to Tap */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {availableNumbers.map((num) => {
            const isUsed = attachedNumbers.includes(num);
            return (
              <button
                key={num}
                onClick={() => handleAttach(num)}
                disabled={isUsed}
                className={`w-16 h-16 rounded-3xl font-black text-2xl border-3 transition-all ${
                  isUsed
                    ? 'opacity-20 scale-90 bg-slate-100 border-slate-300'
                    : 'bg-white hover:bg-purple-100 text-brand-purple border-purple-300 hover:scale-110 active:scale-95 shadow-sm'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </GameContainer>
  );
};

export default NumberTrainGame;

