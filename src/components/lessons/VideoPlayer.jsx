import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Video, Film, Sparkles } from 'lucide-react';
import Ollie from '../mascot/Ollie';
import { useLanguage } from '../../contexts/LanguageContext';
import narrator from '../../utils/speechSynthesizer';
import soundEffects from '../../utils/soundSynth';

export const VideoPlayer = ({
  videoUrl,
  title,
  conceptSummary_ml,
  conceptSummary_en,
  isClassroomTV = false,
  className = ''
}) => {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [speakingPlaceholder, setSpeakingPlaceholder] = useState(false);

  const togglePlay = () => {
    soundEffects.playPop();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
    }
  };

  const toggleMute = () => {
    soundEffects.playPop();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    soundEffects.playPop();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handlePlaceholderNarrate = () => {
    soundEffects.playPop();
    const narrationText = t(
      conceptSummary_ml || 'ഈ പാഠത്തിന്റെ വീഡിയോ ഉടൻ അപ്‌ലോഡ് ചെയ്യുന്നതാണ്. ഒല്ലിയോടൊപ്പം നമുക്ക് കാര്യങ്ങൾ ചിത്രങ്ങളിലൂടെ മനസ്സിലാക്കാം.',
      conceptSummary_en || 'Veo 3 educational video will be added soon. Meanwhile, explore key concepts with Ollie!'
    );
    if (speakingPlaceholder) {
      narrator.stop();
      setSpeakingPlaceholder(false);
    } else {
      setSpeakingPlaceholder(true);
      narrator.speak(narrationText, 'ml-IN', () => setSpeakingPlaceholder(false));
    }
  };

  return (
    <div
      className={`relative w-full rounded-4xl overflow-hidden bg-slate-900 border-4 border-purple-200 shadow-soft-lg flex flex-col items-center justify-center ${
        isClassroomTV ? 'aspect-video min-h-[420px]' : 'aspect-video min-h-[260px]'
      } ${className}`}
    >
      {/* Real HTML5 Video element */}
      {videoUrl && !hasError ? (
        <video
          ref={videoRef}
          src={videoUrl}
          onError={() => setHasError(true)}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
          playsInline
        />
      ) : (
        /* Friendly Veo 3 Video Placeholder with Ollie */
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6 text-center text-white select-none">
          <Ollie state={speakingPlaceholder ? 'speaking' : 'happy'} size={isClassroomTV ? 'lg' : 'md'} />

          <div className="mt-4 max-w-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-400/30 mb-2">
              <Film className="w-3.5 h-3.5 text-pink-400" />
              <span>Google Veo 3 Educational Video Area</span>
            </span>

            <h4 className="text-lg sm:text-xl font-black text-white mb-1">
              {title || t('പാഠ്യ വീഡിയോ', 'Lesson Concept Video')}
            </h4>
            <p className="text-xs text-purple-200/90 leading-relaxed mb-4">
              {t(
                conceptSummary_ml || 'വീഡിയോ ആസ്വദിക്കാൻ ഒല്ലിയെ ടാപ്പ് ചെയ്യുക അല്ലെങ്കിൽ വിവരണം കേൾക്കുക.',
                conceptSummary_en || 'Tap Ollie or the audio button below to listen to the Malayalam concept narration.'
              )}
            </p>

            <button
              onClick={handlePlaceholderNarrate}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs shadow-md transition-all ${
                speakingPlaceholder
                  ? 'bg-brand-pink text-white animate-pulse'
                  : 'bg-white text-brand-purple hover:bg-purple-100'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{speakingPlaceholder ? t('നിർത്തുക', 'Stop Audio') : t('മലയാളത്തിൽ കേൾക്കുക', 'Listen in Malayalam')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Video Controls Bar */}
      {videoUrl && !hasError && (
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950/80 to-transparent flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          <span className="text-xs font-bold text-white/90 truncate max-w-xs">{title}</span>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors"
            aria-label="Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

