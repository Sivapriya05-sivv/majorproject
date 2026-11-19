import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LessonCard from '../../components/cards/LessonCard';
import OllieSpeechBubble from '../../components/mascot/OllieSpeechBubble';
import soundEffects from '../../utils/soundSynth';
import { getModuleById } from '../../data/modulesData';
import { getLessonsForModule } from '../../data/lessonsData';

export const StudentModuleView = () => {
  const { moduleId } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const currentModule = getModuleById(moduleId || 'care-m01') || {
    id: 'care-m01',
    moduleNumber: 1,
    title_ml: 'എനിക്കും എന്റെ പേര് അറിയാം',
    title_en: 'I Also Know My Name',
    description_ml: 'സ്വന്തം പേര് തിരിച്ചറിയാനും പ്രതികരിക്കാനും പഠിക്കുന്നു.',
    groupCode: 'care'
  };

  const lessons = getLessonsForModule(currentModule.id, currentModule);

  const handleSelectLesson = (lesson) => {
    soundEffects.playPop();
    navigate(`/student/lesson/${currentModule.id}/${lesson.id}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back button */}
      <Link
        to="/student/adventure"
        onClick={() => soundEffects.playPop()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-purple"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('സാഹസിക മാപ്പിലേക്ക് മടങ്ങുക', 'Back to Adventure Map')}</span>
      </Link>

      {/* Module Overview Card */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-500 text-white shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-black text-purple-200 uppercase tracking-wider block mb-1">
            {t(`മോഡ്യൂൾ ${currentModule.moduleNumber}`, `Module ${currentModule.moduleNumber}`)}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {currentModule.title_ml}
          </h2>
          <p className="text-xs font-bold text-purple-200 mt-1">
            {currentModule.title_en}
          </p>
          <p className="text-xs sm:text-sm text-purple-100/90 mt-3 max-w-xl leading-relaxed">
            {t(currentModule.description_ml, currentModule.description_en)}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3].map(s => (
            <Star key={s} className="w-6 h-6 text-amber-300 fill-amber-300" />
          ))}
        </div>
      </div>

      <OllieSpeechBubble
        text_ml="താഴെ കാണുന്ന പാഠം തൊട്ട് തുറക്കൂ! ഒല്ലിയോടൊപ്പം വിഷ്വൽ വീഡിയോ കാണാം, കളി കളിക്കാം!"
        text_en="Tap on the lesson below to watch visual explanations and play exciting educational games!"
        size="md"
        autoPlay={true}
      />

      {/* Lessons List */}
      <div>
        <h3 className="text-lg font-black text-slate-800 mb-4">
          {t('പാഠങ്ങൾ (Lessons)', 'Available Lessons')}
        </h3>

        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onSelect={handleSelectLesson}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentModuleView;

