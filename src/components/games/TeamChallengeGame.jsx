import React, { useState } from 'react';
import GameContainer from './GameContainer';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';
import gameService from '../../services/gameService';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Award } from 'lucide-react';

export const TeamChallengeGame = () => {
  const { user } = useAuth();
  const [turn, setTurn] = useState(1);
  const [teamScoreA, setTeamScoreA] = useState(0);
  const [teamScoreB, setTeamScoreB] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const challenges = [
    {
      teamTarget: 'ടീം 1 (നക്ഷത്രങ്ങൾ)',
      question: 'ഇതിൽ ആകാശത്ത് തിളങ്ങുന്ന നക്ഷത്രം ഏതാണ്?',
      options: [
        { name: 'നക്ഷത്രം', emoji: '⭐', isCorrect: true },
        { name: 'മണ്ണ്', emoji: '🪴', isCorrect: false },
        { name: 'മേശ', emoji: '🪑', isCorrect: false }
      ]
    },
    {
      teamTarget: 'ടീം 2 (പൂക്കൾ)',
      question: 'ഇതിൽ സുഗന്ധമുള്ള ചുവന്ന റോസാപ്പൂവ് ഏതാണ്?',
      options: [
        { name: 'റോസ്', emoji: '🌹', isCorrect: true },
        { name: 'കല്ല്', emoji: '🪨', isCorrect: false },
        { name: 'കുപ്പായം', emoji: '👕', isCorrect: false }
      ]
    },
    {
      teamTarget: 'എല്ലാ കൂട്ടുകാരും ഒന്നിച്ച്!',
      question: 'ഒരുമിച്ച് കൈകൊട്ടാൻ തയ്യാറാണോ?',
      options: [
        { name: 'കൈകൊട്ടാം! (Clap)', emoji: '👏', isCorrect: true },
        { name: 'ദേഷ്യപ്പെടാം', emoji: '😠', isCorrect: false }
      ]
    }
  ];

  const current = challenges[roundIdx];

  const handleAnswer = (option) => {
    if (isFinished) return;

    if (option.isCorrect) {
      soundEffects.playStar();
      if (turn === 1) {
        setTeamScoreA(prev => prev + 1);
        setTurn(2);
      } else {
        setTeamScoreB(prev => prev + 1);
        setTurn(1);
      }

      if (roundIdx < challenges.length - 1) {
        setRoundIdx(roundIdx + 1);
      } else {
        setIsFinished(true);
        soundEffects.playFanfare();
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        gameService.recordGameResult({
          studentId: user?.id || 'student-aarav-101',
          gameCode: 'team_challenge',
          score: (teamScoreA + teamScoreB + 1) * 10,
          starsEarned: 3
        });
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleReset = () => {
    setTurn(1);
    setTeamScoreA(0);
    setTeamScoreB(0);
    setRoundIdx(0);
    setIsFinished(false);
  };

  return (
    <GameContainer
      gameCode="team_challenge"
      title_ml="ടീം ചലഞ്ച് റിലേ (കൂട്ടായ്മയുടെ ശക്തി)"
      title_en="Classroom Team Relay"
      instructions_ml="കൂട്ടുകാർ ഓരോരുത്തരായി മാറി മാറി ചോദ്യങ്ങൾക്ക് ശരിയുത്തരം നൽകി പരസ്പരം പ്രോത്സാഹിപ്പിക്കൂ!"
      instructions_en="Take turns answering collaboratively as a classroom team!"
      score={teamScoreA + teamScoreB}
      maxScore={challenges.length}
      onReset={handleReset}
      isFinished={isFinished}
    >
      <div className="flex flex-col items-center my-6 space-y-6">
        {/* Team Scoreboard */}
        <div className="flex items-center gap-6 p-4 rounded-3xl bg-purple-50 border-2 border-purple-200">
          <div className={`p-3 rounded-2xl text-center ${turn === 1 ? 'bg-brand-purple text-white' : 'bg-white text-slate-700'}`}>
            <span className="text-xs font-black block">ടീം 1</span>
            <span className="text-2xl font-black">{teamScoreA} pts</span>
          </div>

          <div className="text-lg font-black text-brand-purple">VS</div>

          <div className={`p-3 rounded-2xl text-center ${turn === 2 ? 'bg-sky-500 text-white' : 'bg-white text-slate-700'}`}>
            <span className="text-xs font-black block">ടീം 2</span>
            <span className="text-2xl font-black">{teamScoreB} pts</span>
          </div>
        </div>

        {/* Turn prompt */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>ഇപ്പോൾ ഊഴം: {current?.teamTarget}</span>
          </span>
          <h4 className="text-lg sm:text-xl font-black text-slate-800">{current?.question}</h4>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
          {current?.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className="p-5 rounded-3xl bg-white border-3 border-purple-200 hover:border-brand-purple hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-5xl">{opt.emoji}</span>
              <span className="text-xs font-black text-slate-800 text-center">{opt.name}</span>
            </button>
          ))}
        </div>
      </div>
    </GameContainer>
  );
};

export default TeamChallengeGame;

