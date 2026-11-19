import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  const handleToggle = () => {
    soundEffects.playPop();
    toggleLanguage();
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border-2 border-purple-200 bg-white hover:bg-purple-50 text-slate-800 text-sm font-bold shadow-sm transition-all duration-150 active:scale-95 ${className}`}
      title="Switch Language / ഭാഷ മാറ്റുക"
      aria-label="Switch between Malayalam and English"
    >
      <Languages className="w-4 h-4 text-brand-purple" />
      <span className="flex items-center gap-1.5">
        <span className={language === 'ml' ? 'text-brand-purple font-extrabold' : 'text-slate-400'}>
          മലയാളം
        </span>
        <span className="text-slate-300">|</span>
        <span className={language === 'en' ? 'text-brand-purple font-extrabold' : 'text-slate-400'}>
          EN
        </span>
      </span>
    </button>
  );
};

export default LanguageToggle;

