import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import narrator from '../../utils/speechSynthesizer';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';
import { Volume2 } from 'lucide-react';

export const AnimalSoundsGame = () => {
  const { user } = useAuth();
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const rounds = [
    {
      sound_ml: 'മ്യാവൂ... മ്യാവൂ...',
      sound_en: 'Meow... Meow...',
      correctName: 'പൂച്ച',
      animals: [
        { name: 'പൂച്ച', emoji: '🐱', isCorrect: true },
        { name: 'പട്ടി', emoji: '🐶', isCorrect: false },
        { name: 'ആന', emoji: '🐘', isCorrect: false }
      ]
    },
    {
      sound_ml: 'അംബേ... അംബേ...',
      sound_en: 'Moo... Moo...',
      correctName: 'പശു',
      animals: [
        { name: 'സിംഹം', emoji: '🦁', isCorrect: false },
        { name: 'പശു', emoji: '🐄', isCorrect: true },
        { name: 'കുതിര', emoji: '🐴', isCorrect: false }
      ]
    },
    {
      sound_ml: 'ചിഹ്നം വിളിച്ച് ചിഹ്നം വിളിക്കുന്ന കൊമ്പനാന!',
      sound_en: 'Trumpet sound of big elephant!',
      correctName: 'ആന',
      animals: [
        { name: 'കുരങ്ങൻ', emoji: '🐒', isCorrect: false },
        { name: 'ആന', emoji: '🐘', isCorrect: true },
        { name: 'പക്ഷി', emoji: '🐦', isCorrect: false }
      ]
    }
  ];

  const current = rounds[roundIdx];

  const playAnimalSound = () => {
    soundEffects.playPop();
    narrator.speak(current.sound_ml, 'ml-IN');
  };

  const handleSelect = (animal) => {
    if (isFinished) return;

    if (animal.isCorrect) {
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
          gameCode: 'animal_sounds',
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
      gameCode="animal_sounds"
      title_ml="മൃഗങ്ങളുടെ ശബ്ദം കണ്ടെത്താം"
      title_en="Animal Sounds Detective"
      instructions_ml="സ്പീക്കറിൽ തൊട്ട് ശബ്ദം കേൾക്കൂ, എന്നിട്ട് ഏത് മൃഗമാണെന്ന് കണ്ടെത്തൂ!"
      instructions_en="Tap the speaker to hear the animal sound, then choose the animal!"
      score={score}
      maxScore={rounds.length}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        {/* Big Sound Speaker Button */}
        <button
          onClick={playAnimalSound}
          className="flex items-center gap-3 px-6 py-4 rounded-3xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg shadow-bubbly-mint active:translate-y-1 transition-all"
        >
          <Volume2 className="w-7 h-7" />
          <span>ശബ്ദം കേൾക്കൂ ("{current.sound_ml}")</span>
        </button>

        {/* Animal Options */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {current.animals.map((a, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(a)}
              className="p-5 rounded-3xl bg-white border-3 border-emerald-200 hover:border-emerald-500 hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-5xl">{a.emoji}</span>
              <span className="text-sm font-black text-slate-800">{a.name}</span>
            </button>
          ))}
        </div>
      </div>
    </GameContainer>
  );
};

export default AnimalSoundsGame;

