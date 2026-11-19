import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const FruitBasketGame = () => {
  const { user } = useAuth();
  const [basket, setBasket] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const availableItems = [
    { id: 1, name: 'ആപ്പിൾ', emoji: '🍎', isFruit: true, collected: false },
    { id: 2, name: 'ഏത്തപ്പഴം', emoji: '🍌', isFruit: true, collected: false },
    { id: 3, name: 'കല്ല്', emoji: '🪨', isFruit: false, collected: false },
    { id: 4, name: 'മാമ്പഴം', emoji: '🥭', isFruit: true, collected: false },
    { id: 5, name: 'മുന്തിരി', emoji: '🍇', isFruit: true, collected: false },
    { id: 6, name: 'ആണി', emoji: '🔩', isFruit: false, collected: false }
  ];

  const [items, setItems] = useState(availableItems);

  const handleCollect = (item) => {
    if (item.collected || isFinished) return;

    if (item.isFruit) {
      soundEffects.playStar();
      setBasket(prev => [...prev, item]);
      const updated = items.map(i => i.id === item.id ? { ...i, collected: true } : i);
      setItems(updated);
      const newScore = score + 1;
      setScore(newScore);

      if (newScore >= 4) {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'fruit_basket',
          score: newScore * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setBasket([]);
    setItems(availableItems);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="fruit_basket"
      title_ml="പഴക്കൂട കളി (ഫ്രൂട്ട് ബാസ്കറ്റ്)"
      title_en="Catch the Fruit Basket"
      instructions_ml="നല്ല പഴങ്ങൾ മാത്രം തൊട്ട് പഴക്കൂടയിലേക്ക് ശേഖരിക്കുക! കല്ല് തൊടരുത്."
      instructions_en="Tap only fresh fruits into the basket! Do not tap stones."
      score={score}
      maxScore={4}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-4 space-y-6">
        {/* Available Items on Table */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCollect(item)}
              disabled={item.collected}
              className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-center transition-all ${
                item.collected
                  ? 'opacity-20 scale-90 border-slate-200'
                  : 'bg-white hover:bg-amber-50 border-purple-200 hover:scale-105 shadow-sm active:scale-95'
              }`}
            >
              <span className="text-4xl sm:text-5xl">{item.emoji}</span>
              <span className="text-xs font-bold text-slate-700 mt-1">{item.name}</span>
            </button>
          ))}
        </div>

        {/* The Basket */}
        <div className="w-full max-w-sm p-6 rounded-4xl bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-amber-300 shadow-md flex flex-col items-center">
          <span className="text-xs font-black text-amber-900 uppercase tracking-wider mb-2">
            🧺 എന്റെ പഴക്കൂട ({basket.length} പഴങ്ങൾ)
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 min-h-[60px]">
            {basket.length === 0 ? (
              <span className="text-xs font-bold text-amber-700/60">കൂട ഒഴിഞ്ഞിരിക്കുന്നു...</span>
            ) : (
              basket.map((f, idx) => (
                <span key={idx} className="text-4xl animate-bounce">
                  {f.emoji}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </GameContainer>
  );
};

export default FruitBasketGame;

