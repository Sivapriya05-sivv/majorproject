import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import soundEffects from '../utils/soundSynth';

const ClassroomTVContext = createContext();

export const ClassroomTVProvider = ({ children }) => {
  const [activeSession, setActiveSession] = useState(null);
  const [currentPhase, setCurrentPhase] = useState('visual_learning'); // 'visual_learning', 'classroom_activity', 'understanding_check', 'games'
  const [turnIndex, setTurnIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const startSession = (lesson, students = []) => {
    setActiveSession({
      lesson,
      students,
      startedAt: new Date().toISOString()
    });
    setCurrentPhase('visual_learning');
    setTurnIndex(0);
  };

  const endSession = () => {
    setActiveSession(null);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(e => console.warn(e));
    }
    setIsFullscreen(false);
  };

  const nextPhase = () => {
    const phases = ['visual_learning', 'classroom_activity', 'understanding_check', 'games'];
    const idx = phases.indexOf(currentPhase);
    if (idx < phases.length - 1) {
      setCurrentPhase(phases[idx + 1]);
      soundEffects.playPop();
    }
  };

  const prevPhase = () => {
    const phases = ['visual_learning', 'classroom_activity', 'understanding_check', 'games'];
    const idx = phases.indexOf(currentPhase);
    if (idx > 0) {
      setCurrentPhase(phases[idx - 1]);
      soundEffects.playPop();
    }
  };

  const triggerCelebration = () => {
    soundEffects.playFanfare();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(e => console.warn(e));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(e => console.warn(e));
    }
  };

  return (
    <ClassroomTVContext.Provider
      value={{
        activeSession,
        currentPhase,
        setCurrentPhase,
        turnIndex,
        setTurnIndex,
        isFullscreen,
        startSession,
        endSession,
        nextPhase,
        prevPhase,
        triggerCelebration,
        toggleFullscreen
      }}
    >
      {children}
    </ClassroomTVContext.Provider>
  );
};

export const useClassroomTV = () => useContext(ClassroomTVContext);
export default ClassroomTVContext;

