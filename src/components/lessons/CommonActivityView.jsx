import React, { useState } from 'react';
import { Users, Sparkles, ChevronRight, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../common/Button';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';

export const CommonActivityView = ({ lesson, isClassroomTV = false }) => {
  const { t } = useLanguage();
  const activity = lesson.classroomActivity || {};
  const rounds = activity.rounds || [];
  const [currentRound, setCurrentRound] = useState(0);
  const [celebrated, setCelebrated] = useState(false);

  const activeItem = rounds[currentRound] || rounds[0] || { name: 'പ്രവർത്തനം', emoji: '🌟' };

  const handleNextRound = () => {
    soundEffects.playPop();
    if (currentRound < rounds.length - 1) {
      setCurrentRound(prev => prev + 1);
    } else {
      triggerCheer();
    }
  };

  const triggerCheer = () => {
    soundEffects.playFanfare();
    setCelebrated(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Teacher Guide Box */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border-2 border-amber-200 shadow-sm flex items-start gap-3">
        <Users className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-extrabold text-amber-900">
            {t('അധ്യാപക നിർദ്ദേശം (ഗ്രൂപ്പ് പങ്കാളിത്തം)', 'Teacher Classroom Guidance')}
          </h4>
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed mt-1">
            {t(activity.teacherGuide_ml, activity.teacherGuide_en)}
          </p>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className={`p-8 rounded-4xl bg-gradient-to-br from-purple-50 via-white to-sky-50 border-3 border-purple-200 shadow-soft text-center ${
        isClassroomTV ? 'py-12' : 'py-8'
      }`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-200 text-xs font-black text-brand-purple mb-4">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>{activity.title_ml || t('ക്ലാസ്സ് റൂം പ്രവർത്തനം', 'Classroom Activity')}</span>
        </div>

        <h3 className={`font-black text-slate-800 mb-6 ${isClassroomTV ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
          {activity.prompt_ml || t('സ്ക്രീനിൽ വരുന്ന ചിത്രം കണ്ടുപിടിക്കൂ!', 'Spot the item on screen!')}
        </h3>

        {/* Big Shared Item on Screen */}
        <div className="my-6 inline-flex flex-col items-center justify-center p-8 sm:p-10 rounded-5xl bg-white border-4 border-purple-300 shadow-soft-lg transform hover:scale-105 transition-transform">
          <span className={`${isClassroomTV ? 'text-7xl sm:text-8xl' : 'text-6xl sm:text-7xl'} mb-4 animate-gentle-bounce`}>
            {activeItem.emoji || '🎯'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-800">
            {activeItem.name || activeItem.word || activeItem.letter || activeItem.item}
          </span>
        </div>

        {/* Round Progress & Next Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <span className="text-xs font-bold text-slate-500">
            {t(`റൗണ്ട് ${currentRound + 1} / ${rounds.length || 1}`, `Round ${currentRound + 1} of ${rounds.length || 1}`)}
          </span>

          <Button
            variant="purple"
            size={isClassroomTV ? 'tv' : 'lg'}
            onClick={handleNextRound}
            icon={ChevronRight}
          >
            {currentRound < rounds.length - 1 ? t('അടുത്ത റൗണ്ട്', 'Next Round') : t('എല്ലാവർക്കും കൈയടി!', 'Cheer for Everyone!')}
          </Button>

          <Button
            variant="yellow"
            size={isClassroomTV ? 'tv' : 'lg'}
            onClick={triggerCheer}
            icon={Award}
          >
            {t('കൈയടി പ്രോത്സാഹനം', 'Cheer & Confetti')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommonActivityView;

