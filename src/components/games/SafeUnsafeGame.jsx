import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export const SafeUnsafeGame = () => {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const scenarios = [
    {
      title_ml: 'സീബ്ര ലൈനിലൂടെ മുതിർന്നവരുടെ കൈപിടിച്ചു റോഡ് മുറിച്ചു കടക്കുന്നു.',
      title_en: 'Crossing road on zebra crossing holding adult hand.',
      emoji: '🚸',
      isSafe: true
    },
    {
      title_ml: 'അടുപ്പിലെ തീയിൽ കൈ തൊടാൻ ശ്രമിക്കുന്നു.',
      title_en: 'Trying to touch stove flame directly.',
      emoji: '🔥',
      isSafe: false
    },
    {
      title_ml: 'അമ്മയോ ടീച്ചറോ സ്നേഹത്തോടെ പുറത്തു തട്ടുന്നു (ഗുഡ് ടച്ച്).',
      title_en: 'Caring high five or pat from mother/teacher.',
      emoji: '🤝',
      isSafe: true
    },
    {
      title_ml: 'അപരിചിതൻ മിഠായി നൽകി രഹസ്യമായി കൂടെ വരാൻ പറയുന്നു.',
      title_en: 'A stranger asking child to come secretly for candy.',
      emoji: '🚫',
      isSafe: false
    }
  ];

  const current = scenarios[currentIdx];

  const handleDecision = (choseSafe) => {
    if (isFinished) return;

    if (choseSafe === current.isSafe) {
      soundEffects.playStar();
      const newScore = score + 1;
      setScore(newScore);

      if (currentIdx < scenarios.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'safe_unsafe',
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
      gameCode="safe_unsafe"
      title_ml="സുരക്ഷിതമോ അപകടമോ?"
      title_en="Safe or Unsafe?"
      instructions_ml="സാഹചര്യം വായിച്ച് സുരക്ഷിതമാണെങ്കിൽ പച്ചയും (Safe), അപകടമാണെങ്കിൽ ചുവപ്പും (Unsafe) തൊടൂ!"
      instructions_en="Decide if each situation is Safe (Green) or Unsafe (Red)."
      score={score}
      maxScore={scenarios.length}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        {/* Scenario Card */}
        <div className="p-8 rounded-5xl bg-white border-4 border-purple-200 shadow-soft flex flex-col items-center text-center max-w-md">
          <span className="text-7xl mb-4">{current?.emoji}</span>
          <p className="text-base sm:text-lg font-black text-slate-800 leading-relaxed">
            {current?.title_ml}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 w-full max-w-sm">
          <button
            onClick={() => handleDecision(true)}
            className="flex-1 py-4 px-4 rounded-3xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm sm:text-base shadow-bubbly-mint active:translate-y-1 flex flex-col items-center gap-1.5 transition-all"
          >
            <ShieldCheck className="w-7 h-7" />
            <span>സുരക്ഷിതം (Safe)</span>
          </button>

          <button
            onClick={() => handleDecision(false)}
            className="flex-1 py-4 px-4 rounded-3xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm sm:text-base shadow-bubbly-pink active:translate-y-1 flex flex-col items-center gap-1.5 transition-all"
          >
            <ShieldAlert className="w-7 h-7" />
            <span>അപകടം (Unsafe)</span>
          </button>
        </div>
      </div>
    </GameContainer>
  );
};

export default SafeUnsafeGame;

