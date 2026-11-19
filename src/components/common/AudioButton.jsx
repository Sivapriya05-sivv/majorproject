import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import narrator from '../../utils/speechSynthesizer';
import soundEffects from '../../utils/soundSynth';

export const AudioButton = ({ text, lang = 'ml-IN', size = 'md', className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = narrator.subscribe((speaking) => {
      if (!speaking) setIsPlaying(false);
    });
    return () => unsub();
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    soundEffects.playPop();
    if (isPlaying) {
      narrator.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      narrator.speak(text, lang, () => setIsPlaying(false));
    }
  };

  const sizes = {
    sm: 'p-1.5 w-8 h-8',
    md: 'p-2 w-10 h-10',
    lg: 'p-3 w-14 h-14'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-2xl transition-all duration-200 select-none ${
        isPlaying
          ? 'bg-brand-purple text-white animate-pulse shadow-md scale-105'
          : 'bg-purple-100 hover:bg-purple-200 text-brand-purple active:scale-95'
      } ${sizes[size] || sizes.md} ${className}`}
      aria-label="Play audio narration"
      title="Listen audio"
    >
      {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};

export default AudioButton;

