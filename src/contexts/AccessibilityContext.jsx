import React, { createContext, useContext, useState, useEffect } from 'react';
import storageHelper from '../utils/storageHelper';
import soundEffects from '../utils/soundSynth';
import narrator from '../utils/speechSynthesizer';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(() => storageHelper.get('acc_reduced_motion', false));
  const [highContrast, setHighContrast] = useState(() => storageHelper.get('acc_high_contrast', false));
  const [soundEnabled, setSoundEnabled] = useState(() => storageHelper.get('acc_sound_enabled', true));
  const [narrationEnabled, setNarrationEnabled] = useState(() => storageHelper.get('acc_narration_enabled', true));
  const [largeText, setLargeText] = useState(() => storageHelper.get('acc_large_text', false));

  useEffect(() => {
    storageHelper.set('acc_reduced_motion', reducedMotion);
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  useEffect(() => {
    storageHelper.set('acc_high_contrast', highContrast);
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    storageHelper.set('acc_large_text', largeText);
    if (largeText) {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.remove('text-lg');
    }
  }, [largeText]);

  useEffect(() => {
    storageHelper.set('acc_sound_enabled', soundEnabled);
    soundEffects.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    storageHelper.set('acc_narration_enabled', narrationEnabled);
    narrator.enabled = narrationEnabled;
  }, [narrationEnabled]);

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        setReducedMotion,
        highContrast,
        setHighContrast,
        soundEnabled,
        setSoundEnabled,
        narrationEnabled,
        setNarrationEnabled,
        largeText,
        setLargeText
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
export default AccessibilityContext;

