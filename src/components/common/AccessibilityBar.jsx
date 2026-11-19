import React, { useState } from 'react';
import { Settings2, Eye, Volume2, VolumeX, Sparkles, Type, ChevronUp, ChevronDown } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const AccessibilityBar = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const {
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
  } = useAccessibility();

  const toggleSound = () => {
    soundEffects.playPop();
    setSoundEnabled(prev => !prev);
  };

  return (
    <div className={`relative z-40 ${className}`}>
      {/* Toggle button */}
      <button
        onClick={() => {
          soundEffects.playPop();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-purple-200 text-xs font-bold text-slate-700 hover:bg-purple-50 shadow-sm"
        aria-label="Accessibility Options"
      >
        <Settings2 className="w-3.5 h-3.5 text-brand-purple" />
        <span className="hidden sm:inline">{t('സഹായ നിയന്ത്രണങ്ങൾ', 'Accessibility')}</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Floating Panel */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-72 p-4 bg-white rounded-3xl border-2 border-purple-200 shadow-soft-lg space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-purple-100">
            <h4 className="text-xs font-extrabold text-brand-purple uppercase tracking-wider">
              {t('സഹായ നിയന്ത്രണങ്ങൾ', 'Accessibility & Sensory')}
            </h4>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              {t('ശബ്ദ പ്രതികരണങ്ങൾ', 'Sound Effects')}
            </span>
            <button
              onClick={toggleSound}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-colors ${
                soundEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {soundEnabled ? t('ഓൺ', 'ON') : t('ഓഫ്', 'OFF')}
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              {t('ശാന്തമായ ചലനം', 'Reduced Motion')}
            </span>
            <button
              onClick={() => {
                soundEffects.playPop();
                setReducedMotion(!reducedMotion);
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-colors ${
                reducedMotion ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {reducedMotion ? t('ശാന്തം', 'Calm') : t('സാധാരണ', 'Normal')}
            </button>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-sky-600" />
              {t('വ്യക്തമായ നിറങ്ങൾ', 'High Contrast')}
            </span>
            <button
              onClick={() => {
                soundEffects.playPop();
                setHighContrast(!highContrast);
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-colors ${
                highContrast ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {highContrast ? t('ഓൺ', 'ON') : t('ഓഫ്', 'OFF')}
            </button>
          </div>

          {/* Text Size Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-amber-600" />
              {t('വലിയ അക്ഷരങ്ങൾ', 'Larger Text')}
            </span>
            <button
              onClick={() => {
                soundEffects.playPop();
                setLargeText(!largeText);
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-colors ${
                largeText ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {largeText ? '125%' : '100%'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityBar;

