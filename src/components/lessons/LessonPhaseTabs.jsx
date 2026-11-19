import React from 'react';
import { PlayCircle, Users, CheckCircle2, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const LessonPhaseTabs = ({ currentPhase, onPhaseChange }) => {
  const { t } = useLanguage();

  const phases = [
    {
      id: 'visual',
      label_ml: '1. വിഷ്വൽ ലേണിംഗ്',
      label_en: '1. Visual Learning',
      sub_ml: 'വീഡിയോ & ആശയങ്ങൾ',
      icon: PlayCircle,
      activeColor: 'bg-brand-purple text-white shadow-bubbly-purple'
    },
    {
      id: 'classroom',
      label_ml: '2. ക്ലാസ്സ് റൂം ആക്റ്റിവിറ്റി',
      label_en: '2. Classroom Activity',
      sub_ml: 'കൂട്ടായ പങ്കാളിത്തം',
      icon: Users,
      activeColor: 'bg-sky-500 text-white shadow-bubbly-sky'
    },
    {
      id: 'check',
      label_ml: '3. വ്യക്തിഗത പരിശോധന',
      label_en: '3. Individual Check',
      sub_ml: 'സ്വന്തം ധാരണ',
      icon: CheckCircle2,
      activeColor: 'bg-emerald-500 text-white shadow-bubbly-mint'
    },
    {
      id: 'game',
      label_ml: '4. പാഠ്യ ഗെയിം',
      label_en: '4. Lesson Game',
      sub_ml: 'കളിച്ചു പഠിക്കാം',
      icon: Gamepad2,
      activeColor: 'bg-pink-500 text-white shadow-bubbly-pink'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-2 bg-purple-50/70 rounded-3xl border border-purple-100">
      {phases.map((phase) => {
        const Icon = phase.icon;
        const isActive = currentPhase === phase.id;

        return (
          <button
            key={phase.id}
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onPhaseChange(phase.id);
            }}
            className={`flex items-center gap-2.5 p-3 rounded-2xl text-left transition-all duration-150 select-none ${
              isActive
                ? `${phase.activeColor} scale-102`
                : 'bg-white hover:bg-purple-100/50 text-slate-700 border border-purple-100'
            }`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <span className="block text-xs font-black truncate">
                {t(phase.label_ml, phase.label_en)}
              </span>
              <span className={`block text-[10px] font-semibold truncate ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                {phase.sub_ml}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default LessonPhaseTabs;

