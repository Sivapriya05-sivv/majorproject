import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Ollie from './Ollie';
import narrator from '../../utils/speechSynthesizer';
import soundEffects from '../../utils/soundSynth';
import { useLanguage } from '../../contexts/LanguageContext';

export const OllieSpeechBubble = ({
  text_ml,
  text_en,
  size = 'md',
  autoPlay = false,
  className = '',
  bubbleColor = 'bg-white',
  borderColor = 'border-purple-200'
}) => {
  const { language } = useLanguage();
  const [speaking, setSpeaking] = useState(false);

  const displayText = language === 'ml' ? text_ml : text_en;
  const langCode = language === 'ml' ? 'ml-IN' : 'en-US';

  useEffect(() => {
    const unsubscribe = narrator.subscribe((isTalking) => {
      setSpeaking(isTalking);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (autoPlay && displayText) {
      const timer = setTimeout(() => {
        narrator.speak(displayText, langCode);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, displayText, langCode]);

  const handleSpeak = (e) => {
    e.stopPropagation();
    soundEffects.playPop();
    if (speaking) {
      narrator.stop();
    } else {
      narrator.speak(displayText, langCode);
    }
  };

  return (
    <div className={`flex items-start gap-3 sm:gap-4 ${className}`}>
      {/* Ollie with animated state */}
      <div className="flex-shrink-0 cursor-pointer" onClick={handleSpeak} title="Tap Ollie to hear audio!">
        <Ollie state={speaking ? 'speaking' : 'happy'} size={size} />
      </div>

      {/* Bubble with speech pointer */}
      <div
        className={`relative flex-1 p-4 sm:p-5 rounded-3xl ${bubbleColor} border-2 ${borderColor} shadow-soft transition-all duration-300`}
      >
        {/* Little triangle arrow pointing to Ollie */}
        <div className="absolute top-5 -left-2.5 w-5 h-5 bg-inherit border-l-2 border-b-2 border-inherit transform rotate-45" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <p className="text-slate-800 font-semibold leading-relaxed text-base sm:text-lg">
            {displayText}
          </p>

          {/* Malayalam Audio Narration Button */}
          <button
            type="button"
            onClick={handleSpeak}
            className={`flex-shrink-0 p-2.5 rounded-2xl transition-all duration-200 ${
              speaking
                ? 'bg-brand-purple text-white animate-pulse shadow-md scale-105'
                : 'bg-purple-100 hover:bg-purple-200 text-brand-purple'
            }`}
            aria-label={speaking ? 'Stop Malayalam audio' : 'Listen in Malayalam audio'}
            title={speaking ? 'Stop audio' : 'Listen to Ollie speak'}
          >
            {speaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OllieSpeechBubble;

