import React from 'react';
import { Users, ChevronRight, UserCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const TurnTakingController = ({ students = [], currentTurnIndex = 0, onSelectTurn }) => {
  const { t } = useLanguage();

  const handleNext = () => {
    soundEffects.playPop();
    const nextIdx = (currentTurnIndex + 1) % (students.length || 1);
    if (onSelectTurn) onSelectTurn(nextIdx);
  };

  const currentStudent = students[currentTurnIndex] || { fullName: 'കുട്ടി', avatar: '👦' };

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-purple-500/30 text-white shadow-soft">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="flex items-center gap-1.5 text-xs font-black text-purple-300 uppercase tracking-wider">
          <Users className="w-4 h-4 text-pink-400" />
          <span>{t('ഊഴം ക്രമീകരിക്കൽ (Turn-Taking)', 'Turn-Taking Controller')}</span>
        </span>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black transition-colors"
        >
          <span>{t('അടുത്ത കുട്ടി', 'Next Turn')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Active Student Spotlight */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-purple-800/80 to-indigo-800/80 border-2 border-amber-400 mb-3 shadow-md animate-gentle-pulse">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-1.5 bg-white/20 rounded-xl">{currentStudent.avatar || '👦'}</span>
          <div>
            <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">ഇപ്പോൾ ഊഴം:</span>
            <h4 className="text-base font-black text-white">{currentStudent.fullName}</h4>
          </div>
        </div>

        <span className="text-xs font-black bg-amber-400 text-slate-900 px-3 py-1 rounded-xl">
          Active Turn ✨
        </span>
      </div>

      {/* Student Turn Roster */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {students.map((st, idx) => {
          const isActive = idx === currentTurnIndex;
          return (
            <button
              key={st.id || idx}
              onClick={() => {
                soundEffects.playPop();
                if (onSelectTurn) onSelectTurn(idx);
              }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-amber-400 text-slate-900 font-black scale-105'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <span>{st.avatar || '👦'}</span>
              <span>{st.fullName?.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TurnTakingController;

