import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import LessonPhaseTabs from '../../components/lessons/LessonPhaseTabs';
import VisualExplanation from '../../components/lessons/VisualExplanation';
import CommonActivityView from '../../components/lessons/CommonActivityView';
import UnderstandingCheckView from '../../components/lessons/UnderstandingCheckView';
import GameHubRouter from '../../components/games/GameHubRouter';
import soundEffects from '../../utils/soundSynth';
import { getModuleById } from '../../data/modulesData';
import { getLessonsForModule } from '../../data/lessonsData';

export const StudentLessonView = () => {
  const { moduleId, lessonId } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();

  const [currentPhase, setCurrentPhase] = useState('visual');

  const currentModule = getModuleById(moduleId || 'care-m01') || {
    id: 'care-m01',
    moduleNumber: 1,
    title_ml: 'എനിക്കും എന്റെ പേര് അറിയാം',
    title_en: 'I Also Know My Name',
    groupCode: 'care'
  };

  const lessons = getLessonsForModule(currentModule.id, currentModule);
  const currentLesson = lessons.find(l => l.id === lessonId) || lessons[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back button */}
      <Link
        to={`/student/module/${currentModule.id}`}
        onClick={() => soundEffects.playPop()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-purple"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('പാഠങ്ങളുടെ ലിസ്റ്റിലേക്ക്', 'Back to Lesson List')}</span>
      </Link>

      {/* Lesson Header */}
      <div className="pb-3 border-b border-purple-100 flex items-center justify-between">
        <div>
          <span className="text-xs font-black text-brand-purple uppercase tracking-wider block">
            {t(`പാഠം ${currentLesson.lessonNumber} • ${currentModule.title_ml}`, `Lesson ${currentLesson.lessonNumber}`)}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {currentLesson.title_ml}
          </h2>
          <p className="text-xs font-bold text-slate-500">
            {currentLesson.title_en}
          </p>
        </div>
      </div>

      {/* 4 Phases Navigation */}
      <LessonPhaseTabs
        currentPhase={currentPhase}
        onPhaseChange={setCurrentPhase}
      />

      {/* Phase Content */}
      <div className="mt-6">
        {currentPhase === 'visual' && (
          <VisualExplanation lesson={currentLesson} />
        )}

        {currentPhase === 'classroom' && (
          <CommonActivityView lesson={currentLesson} />
        )}

        {currentPhase === 'check' && (
          <UnderstandingCheckView lesson={currentLesson} />
        )}

        {currentPhase === 'game' && (
          <div className="max-w-2xl mx-auto">
            <GameHubRouter gameCode={currentLesson.gameCode || 'picture_match'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLessonView;

