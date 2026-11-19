import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';

export const MemoryCardsGame = () => {
  const { user } = useAuth();

  const initialCards = [
    { id: 1, pairId: 'apple', emoji: '🍎', flipped: false, matched: false },
    { id: 2, pairId: 'star', emoji: '⭐', flipped: false, matched: false },
    { id: 3, pairId: 'sun', emoji: '☀️', flipped: false, matched: false },
    { id: 4, pairId: 'apple', emoji: '🍎', flipped: false, matched: false },
    { id: 5, pairId: 'sun', emoji: '☀️', flipped: false, matched: false },
    { id: 6, pairId: 'star', emoji: '⭐', flipped: false, matched: false }
  ];

  const [cards, setCards] = useState(initialCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleCardClick = (card) => {
    if (card.flipped || card.matched || selectedCards.length === 2 || isFinished) return;

    soundEffects.playPop();

    // Flip this card
    const updated = cards.map(c => c.id === card.id ? { ...c, flipped: true } : c);
    setCards(updated);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (first.pairId === second.pairId) {
        soundEffects.playStar();
        const matchedCards = updated.map(c =>
          c.pairId === first.pairId ? { ...c, matched: true, flipped: true } : c
        );
        setCards(matchedCards);
        setSelectedCards([]);
        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= 3) {
          setIsFinished(true);
          soundEffects.playFanfare();
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          gameService.recordGameResult({
            studentId: user?.id || 'student-aarav-101',
            gameCode: 'memory_cards',
            score: newScore * 10,
            starsEarned: 3
          });
        }
      } else {
        soundEffects.playTryAgain();
        setTimeout(() => {
          const resetCards = cards.map(c =>
            c.id === first.id || c.id === second.id ? { ...c, flipped: false } : c
          );
          setCards(resetCards);
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const handleReset = () => {
    setCards(initialCards);
    setSelectedCards([]);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="memory_cards"
      title_ml="ഓർമ്മച്ചെപ്പ് (മെമ്മറി കാർഡുകൾ)"
      title_en="Memory Flip Cards"
      instructions_ml="കാർഡുകൾ ഓരോന്നായി തുറന്ന് ഒരേപോലെയുള്ള 2 കാർഡുകൾ കണ്ടെത്തൂ!"
      instructions_en="Flip cards to match identical pairs!"
      score={score}
      maxScore={3}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto my-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`h-28 rounded-3xl border-3 flex items-center justify-center text-5xl transition-all duration-300 shadow-sm cursor-pointer ${
              card.flipped || card.matched
                ? 'bg-purple-100 border-brand-purple scale-102'
                : 'bg-gradient-to-br from-purple-500 to-indigo-600 border-purple-400 hover:scale-105 active:scale-95'
            }`}
          >
            {card.flipped || card.matched ? card.emoji : '❓'}
          </button>
        ))}
      </div>
    </GameContainer>
  );
};

export default MemoryCardsGame;

