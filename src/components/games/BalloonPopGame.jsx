import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const BalloonPopGame = () => {
  const { user } = useAuth();
  const [targetChar, setTargetChar] = useState('ആ');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const balloons = [
    { id: 1, char: 'അ', color: 'from-pink-400 to-rose-500', isPopped: false },
    { id: 2, char: 'ആ', color: 'from-purple-400 to-indigo-500', isPopped: false },
    { id: 3, char: 'ഇ', color: 'from-sky-400 to-blue-500', isPopped: false },
    { id: 4, char: 'ഈ', color: 'from-amber-400 to-yellow-500', isPopped: false },
    { id: 5, char: 'ആ', color: 'from-emerald-400 to-teal-500', isPopped: false }
  ];

  const [balloonList, setBalloonList] = useState(balloons);

  const handlePop = (balloon) => {
    if (balloon.isPopped || isFinished) return;

    if (balloon.char === targetChar) {
      soundEffects.playPop();
      soundEffects.playStar();

      const updated = balloonList.map(b => b.id === balloon.id ? { ...b, isPopped: true } : b);
      setBalloonList(updated);
      const newScore = score + 1;
      setScore(newScore);

      if (newScore >= 3) {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'balloon_pop',
          score: newScore * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setBalloonList(balloons);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="balloon_pop"
      title_ml="അക്ഷര ബലൂൺ പൊട്ടിക്കൽ"
      title_en="Letter Balloon Pop"
      instructions_ml={`"${targetChar}" എന്ന അക്ഷരമുള്ള ബലൂൺ തൊട്ട് പൊട്ടിക്കൂ!`}
      instructions_en={`Pop the balloon with letter "${targetChar}"!`}
      score={score}
      maxScore={3}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-4 space-y-6">
        <div className="px-6 py-2 rounded-full bg-purple-100 border-2 border-purple-300 text-brand-purple font-black text-lg">
          ലക്ഷ്യം: "{targetChar}" പൊട്ടിക്കുക
        </div>

        {/* Floating Balloons */}
        <div className="flex flex-wrap items-center justify-center gap-6 p-4">
          {balloonList.map((b) => (
            <div
              key={b.id}
              onClick={() => handlePop(b)}
              className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                b.isPopped ? 'opacity-0 scale-0 pointer-events-none' : 'hover:scale-110 active:scale-95'
              }`}
            >
              {/* Balloon Oval */}
              <div
                className={`w-24 h-32 rounded-full bg-gradient-to-t ${b.color} shadow-lg flex items-center justify-center text-white font-black text-3xl select-none animate-gentle-bounce`}
                style={{ animationDelay: `${b.id * 200}ms` }}
              >
                {b.char}
              </div>
              {/* String */}
              <div className="w-0.5 h-10 bg-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </GameContainer>
  );
};

export default BalloonPopGame;

