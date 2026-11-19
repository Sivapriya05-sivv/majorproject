import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useClassroomTV } from '../../contexts/ClassroomTVContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import ClassroomTVHeader from '../../components/classroom/ClassroomTVHeader';
import TurnTakingController from '../../components/classroom/TurnTakingController';
import VisualExplanation from '../../components/lessons/VisualExplanation';
import CommonActivityView from '../../components/lessons/CommonActivityView';
import UnderstandingCheckView from '../../components/lessons/UnderstandingCheckView';
import GameHubRouter from '../../components/games/GameHubRouter';
import soundEffects from '../../utils/soundSynth';
import { getModuleById } from '../../data/modulesData';
import { getLessonsForModule } from '../../data/lessonsData';
import { classService } from '../../services/classService';

export const ClassroomTVPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { currentPhase, startSession, turnIndex, setTurnIndex } = useClassroomTV();

  const moduleId = searchParams.get('moduleId') || 'care-m01';
  const lessonId = searchParams.get('lessonId');

  const [students, setStudents] = useState([]);
  const [currentModule, setCurrentModule] = useState(() => getModuleById(moduleId) || {
    id: 'care-m01',
    moduleNumber: 1,
    title_ml: 'എനിക്കും എന്റെ പേര് അറിയാം',
    title_en: 'I Also Know My Name',
    groupCode: 'care'
  });

  const lessons = getLessonsForModule(currentModule.id, currentModule);
  const currentLesson = lessons.find(l => l.id === lessonId) || lessons[0];

  useEffect(() => {
    classService.getTeacherAssignedStudents(user?.id).then(st => {
      setStudents(st);
      startSession(currentLesson, st);
    });
  }, [user, currentLesson]);

  const handleExit = () => {
    soundEffects.playPop();
    navigate('/teacher/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 classroom-tv-mode flex flex-col justify-between">
      {/* TV Header Bar with Phase Navigation, Fullscreen & Exit */}
      <ClassroomTVHeader onExit={handleExit} />

      {/* Main Classroom Display Stage */}
      <div className="max-w-6xl mx-auto w-full my-4 flex-1">
        {currentPhase === 'visual_learning' && (
          <div className="bg-slate-900/60 p-6 rounded-5xl border border-purple-500/30 shadow-2xl backdrop-blur-md">
            <VisualExplanation lesson={currentLesson} isClassroomTV={true} />
          </div>
        )}

        {currentPhase === 'classroom_activity' && (
          <div className="bg-slate-900/60 p-6 rounded-5xl border border-purple-500/30 shadow-2xl backdrop-blur-md">
            <CommonActivityView lesson={currentLesson} isClassroomTV={true} />
          </div>
        )}

        {currentPhase === 'understanding_check' && (
          <div className="bg-slate-900/60 p-6 rounded-5xl border border-purple-500/30 shadow-2xl backdrop-blur-md text-slate-900">
            <UnderstandingCheckView lesson={currentLesson} />
          </div>
        )}

        {currentPhase === 'games' && (
          <div className="bg-slate-900/60 p-6 rounded-5xl border border-purple-500/30 shadow-2xl backdrop-blur-md text-slate-900 max-w-3xl mx-auto">
            <GameHubRouter gameCode={currentLesson.gameCode || 'picture_match'} />
          </div>
        )}
      </div>

      {/* Turn Taking Controller at Bottom for Classroom Teaching */}
      <div className="max-w-6xl mx-auto w-full mt-6">
        <TurnTakingController
          students={students}
          currentTurnIndex={turnIndex}
          onSelectTurn={setTurnIndex}
        />
      </div>
    </div>
  );
};

export default ClassroomTVPage;

