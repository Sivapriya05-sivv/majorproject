import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const ColourHuntGame = () => {
  const { user } = useAuth();
  const [targetColor, setTargetColor] = useState({ name_ml: 'ചുവപ്പ്', code: 'red' });
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const items = [
    { id: 1, name: 'തക്കാളി', emoji: '🍅', color: 'red', collected: false },
    { id: 2, name: 'പച്ച തവള', emoji: '🐸', color: 'green', collected: false },
    { id: 3, name: 'ചുവന്ന റോസ്', emoji: '🌹', color: 'red', collected: false },
    { id: 4, name: 'നീല തിമിംഗലം', emoji: '🐳', color: 'blue', collected: false },
    { id: 5, name: 'ചുവന്ന സ്ട്രോബെറി', emoji: '🍓', color: 'red', collected: false },
    { id: 6, name: 'മഞ്ഞ നാരങ്ങ', emoji: '🍋', color: 'yellow', collected: false }
  ];

  const [itemList, setItemList] = useState(items);

  const handleSelect = (item) => {
    if (item.collected || isFinished) return;

    if (item.color === targetColor.code) {
      soundEffects.playStar();
      const updated = itemList.map(i => i.id === item.id ? { ...i, collected: true } : i);
      setItemList(updated);
      const newScore = score + 1;
      setScore(newScore);

      if (newScore >= 3) {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'colour_hunt',
          score: newScore * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setItemList(items);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="colour_hunt"
      title_ml="നിറങ്ങൾ കണ്ടെത്താം (കളർ ഹണ്ട്)"
      title_en="Colour Hunt Challenge"
      instructions_ml={`ചുവപ്പ് (${targetColor.name_ml}) നിറത്തിലുള്ള വസ്തുക്കൾ മാത്രം തൊട്ടു തിരഞ്ഞെടുക്കുക!`}
      instructions_en={`Tap only the items that are RED!`}
      score={score}
      maxScore={3}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        <div className="px-6 py-2.5 rounded-full bg-rose-100 border-2 border-rose-300 text-rose-800 font-black text-base flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-rose-600 inline-block" />
          <span>ലക്ഷ്യം: ചുവപ്പ് നിറം (Red)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
          {itemList.map((i) => (
            <button
              key={i.id}
              onClick={() => handleSelect(i)}
              disabled={i.collected}
              className={`p-6 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 transition-all ${
                i.collected
                  ? 'opacity-20 scale-90 border-slate-200'
                  : 'bg-white hover:bg-purple-50 border-purple-200 hover:scale-105 active:scale-95 shadow-sm'
              }`}
            >
              <span className="text-5xl">{i.emoji}</span>
              <span className="text-xs font-bold text-slate-700">{i.name}</span>
            </button>
          ))}
        </div>
      </div>
    </GameContainer>
  );
};

export default ColourHuntGame;

