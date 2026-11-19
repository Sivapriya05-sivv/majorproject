import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tv, ArrowLeft, Plus, CheckSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import LessonPhaseTabs from '../../components/lessons/LessonPhaseTabs';
import VisualExplanation from '../../components/lessons/VisualExplanation';
import CommonActivityView from '../../components/lessons/CommonActivityView';
import UnderstandingCheckView from '../../components/lessons/UnderstandingCheckView';
import GameHubRouter from '../../components/games/GameHubRouter';
import Button from '../../components/common/Button';
import soundEffects from '../../utils/soundSynth';
import { getModuleById } from '../../data/modulesData';
import { getLessonsForModule } from '../../data/lessonsData';
import { classService } from '../../services/classService';

export const TeacherLessonView = () => {
  const { moduleId } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();

  const [currentPhase, setCurrentPhase] = useState('visual');
  const [students, setStudents] = useState([]);

  const currentModule = getModuleById(moduleId || 'care-m01') || {
    id: 'care-m01',
    title_ml: 'എനിക്കും എന്റെ പേര് അറിയാം',
    title_en: 'I Also Know My Name',
    groupCode: 'care'
  };

  const lessons = getLessonsForModule(currentModule.id, currentModule);
  const currentLesson = lessons[0];

  useEffect(() => {
    classService.getTeacherAssignedStudents(user?.id).then(setStudents);
  }, [user]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Classroom TV Launch */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <Link
            to="/teacher/modules"
            onClick={() => soundEffects.playPop()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-purple mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('എല്ലാ മോഡ്യൂളുകളിലേക്കും', 'Back to Modules')}</span>
          </Link>

          <span className="text-[11px] font-black text-brand-purple uppercase tracking-wider block">
            {t(`മോഡ്യൂൾ ${currentModule.moduleNumber || 1} • ${currentModule.title_en}`, `Module ${currentModule.moduleNumber || 1}`)}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {currentLesson.title_ml}
          </h2>
          <p className="text-xs font-bold text-slate-500">
            {currentLesson.title_en}
          </p>
        </div>

        {/* Classroom TV launcher */}
        <Link
          to={`/classroom-tv?moduleId=${currentModule.id}&lessonId=${currentLesson.id}`}
          onClick={() => soundEffects.playPop()}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-3xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-sm shadow-bubbly-yellow hover:scale-105 active:translate-y-1 transition-all"
        >
          <Tv className="w-5 h-5" />
          <span>{t('ക്ലാസ്സ് റൂം ടിവിയിൽ കാണിക്കൂ', 'Launch in Classroom TV')}</span>
        </Link>
      </div>

      {/* 4 Structured Lesson Phases Navigation */}
      <LessonPhaseTabs
        currentPhase={currentPhase}
        onPhaseChange={setCurrentPhase}
      />

      {/* Render Current Phase Content */}
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

export default TeacherLessonView;

