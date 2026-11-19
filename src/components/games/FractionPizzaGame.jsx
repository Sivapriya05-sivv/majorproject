import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const FractionPizzaGame = () => {
  const { user } = useAuth();
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const rounds = [
    {
      customer: 'അനുവിന് പകുതി (1/2) പിസ്സ വേണം!',
      customer_en: 'Anu wants Half (1/2) Pizza!',
      avatar: '👧',
      correctFraction: '1/2',
      slices: [
        { label: 'പകുതി (1/2)', fraction: '1/2', emoji: '🌓' },
        { label: 'മുഴുവൻ (1)', fraction: '1', emoji: '🌕' },
        { label: 'കാൽ ഭാഗം (1/4)', fraction: '1/4', emoji: '🍕' }
      ]
    },
    {
      customer: 'രാഹുലിന് കാൽ ഭാഗം (1/4) പിസ്സ വേണം!',
      customer_en: 'Rahul wants a Quarter (1/4) Pizza slice!',
      avatar: '👦',
      correctFraction: '1/4',
      slices: [
        { label: 'മുക്കാൽ (3/4)', fraction: '3/4', emoji: '🌔' },
        { label: 'കാൽ ഭാഗം (1/4)', fraction: '1/4', emoji: '🍕' },
        { label: 'പകുതി (1/2)', fraction: '1/2', emoji: '🌓' }
      ]
    },
    {
      customer: 'ടീച്ചർക്ക് ഒരു മുഴുവൻ (1) പിസ്സ നൽകൂ!',
      customer_en: 'Serve a Whole (1) Pizza to Teacher!',
      avatar: '👩‍🏫',
      correctFraction: '1',
      slices: [
        { label: 'പകുതി (1/2)', fraction: '1/2', emoji: '🌓' },
        { label: 'മുഴുവൻ (1)', fraction: '1', emoji: '🌕' },
        { label: 'കാൽ ഭാഗം (1/4)', fraction: '1/4', emoji: '🍕' }
      ]
    }
  ];

  const current = rounds[roundIdx];

  const handleServe = (slice) => {
    if (isFinished) return;

    if (slice.fraction === current.correctFraction) {
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
          gameCode: 'fraction_pizza',
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
      gameCode="fraction_pizza"
      title_ml="ഫ്രാക്ഷൻ പിസ്സ ഷെഫ്"
      title_en="Fraction Pizza Chef"
      instructions_ml={current?.customer}
      instructions_en={current?.customer_en}
      score={score}
      maxScore={rounds.length}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        {/* Customer Order Bubble */}
        <div className="flex items-center gap-3 p-5 rounded-4xl bg-yellow-50 border-3 border-amber-300 shadow-sm max-w-md">
          <span className="text-5xl">{current?.avatar}</span>
          <div>
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider">ഓർഡർ:</span>
            <p className="text-base font-black text-slate-800">{current?.customer}</p>
          </div>
        </div>

        {/* Pizza Slices to Serve */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {current?.slices.map((slice, idx) => (
            <button
              key={idx}
              onClick={() => handleServe(slice)}
              className="p-5 rounded-3xl bg-white border-3 border-purple-200 hover:border-amber-500 hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-5xl">{slice.emoji}</span>
              <span className="text-xs font-black text-slate-800 text-center">{slice.label}</span>
            </button>
          ))}
        </div>
      </div>
    </GameContainer>
  );
};

export default FractionPizzaGame;

