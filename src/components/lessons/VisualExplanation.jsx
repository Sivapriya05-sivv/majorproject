import React from 'react';
import OllieSpeechBubble from '../mascot/OllieSpeechBubble';
import VideoPlayer from './VideoPlayer';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const VisualExplanation = ({ lesson, isClassroomTV = false }) => {
  const { t } = useLanguage();
  const visual = lesson.visualLearning || {};
  const illustrations = visual.illustrations || [];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Ollie Welcome Narration */}
      <OllieSpeechBubble
        text_ml={lesson.narration_ml || visual.intro_ml}
        text_en={lesson.narration_en || visual.intro_en}
        size={isClassroomTV ? 'lg' : 'md'}
        autoPlay={true}
      />

      {/* Veo 3 Video Player Area */}
      <VideoPlayer
        videoUrl={visual.videoPath}
        title={visual.videoTitle || lesson.title_en}
        conceptSummary_ml={visual.intro_ml}
        conceptSummary_en={visual.intro_en}
        isClassroomTV={isClassroomTV}
      />

      {/* Picture-based Illustrations & Real-life Examples */}
      <div>
        <h4 className="text-sm font-extrabold text-brand-purple uppercase tracking-wider mb-3">
          {t('ചിത്രങ്ങളിലൂടെ പഠിക്കാം (വിഷ്വൽ കാർഡുകൾ)', 'Visual Picture Cards & Demonstrations')}
        </h4>

        <div className={`grid gap-4 ${isClassroomTV ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {illustrations.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => soundEffects.playPop()}
              className={`p-5 rounded-3xl border-2 border-purple-100 bg-white shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center`}
            >
              <div
                className={`w-20 h-20 rounded-3xl ${
                  item.bg || 'bg-purple-100'
                } flex items-center justify-center text-4xl mb-3 shadow-inner`}
              >
                {item.emoji || '🌟'}
              </div>

              <h5 className="text-base font-black text-slate-800 mb-1">
                {item.title_ml}
              </h5>
              <p className="text-xs font-bold text-slate-500 mb-2">
                {item.title_en}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc_ml}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualExplanation;

