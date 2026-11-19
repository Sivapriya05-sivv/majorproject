import React from 'react';
import { Maximize2, Minimize2, Tv, Sparkles, LogOut, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useClassroomTV } from '../../contexts/ClassroomTVContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Ollie from '../mascot/Ollie';
import soundEffects from '../../utils/soundSynth';

export const ClassroomTVHeader = ({ onExit }) => {
  const { isFullscreen, toggleFullscreen, triggerCelebration, currentPhase, nextPhase, prevPhase } = useClassroomTV();
  const { t } = useLanguage();

  const phaseLabels = {
    visual_learning: '1. വിഷ്വൽ പഠനം (Visual)',
    classroom_activity: '2. ഗ്രൂപ്പ് പ്രവർത്തനം (Activity)',
    understanding_check: '3. പരിശോധന (Check)',
    games: '4. ഗെയിം (Game)'
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 bg-slate-900/90 text-white rounded-3xl backdrop-blur-md border border-purple-500/30 shadow-soft-lg mb-6">
      {/* Title & Mascot */}
      <div className="flex items-center gap-3">
        <Ollie state="happy" size="sm" />
        <div>
          <span className="flex items-center gap-1.5 text-xs font-black text-purple-300 uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>Classroom TV Mode</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {phaseLabels[currentPhase] || currentPhase}
          </h2>
        </div>
      </div>

      {/* Navigation & Teacher Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={prevPhase}
          className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
          title="Previous Phase"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextPhase}
          className="px-4 py-3 rounded-2xl bg-brand-purple hover:bg-brand-purpleHover text-white font-black text-sm transition-colors flex items-center gap-1.5 shadow-md"
          title="Next Phase"
        >
          <span>{t('അടുത്ത ഘട്ടം', 'Next Phase')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={triggerCelebration}
          className="p-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold transition-all shadow-md active:scale-95"
          title="Celebrate Classroom Achievement!"
        >
          <Award className="w-5 h-5" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>

        {onExit && (
          <button
            onClick={() => {
              soundEffects.playPop();
              onExit();
            }}
            className="p-3 rounded-2xl bg-rose-500/80 hover:bg-rose-600 text-white font-bold transition-colors"
            title="Exit Classroom TV"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ClassroomTVHeader;

