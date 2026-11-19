import React, { useState } from 'react';
import { CheckCircle2, XCircle, Star, Sparkles, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Ollie from '../mascot/Ollie';
import soundEffects from '../../utils/soundSynth';
import assessmentService from '../../services/assessmentService';
import progressService from '../../services/progressService';
import confetti from 'canvas-confetti';

export const UnderstandingCheckView = ({ lesson, onComplete }) => {
  const { t } = useLanguage();
  const { user, role } = useAuth();
  const checkData = lesson.understandingCheck || {};
  const questions = checkData.questions || [];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentQIndex] || {
    question_ml: 'ശരിയായ ചിത്രം തിരഞ്ഞെടുക്കൂ',
    question_en: 'Choose the correct picture',
    options: []
  };

  const handleSelectOption = (option) => {
    if (feedback !== null) return; // prevent spamming while showing feedback
    setSelectedOpt(option.id);

    if (option.isCorrect) {
      soundEffects.playStar();
      setFeedback('correct');
      setScore(prev => prev + 1);

      setTimeout(() => {
        if (currentQIndex < questions.length - 1) {
          setCurrentQIndex(prev => prev + 1);
          setSelectedOpt(null);
          setFeedback(null);
        } else {
          finishAssessment(score + 1);
        }
      }, 1200);
    } else {
      soundEffects.playTryAgain();
      setFeedback('wrong');
      setTimeout(() => {
        setSelectedOpt(null);
        setFeedback(null);
      }, 1400);
    }
  };

  const finishAssessment = async (finalScore) => {
    setIsFinished(true);
    soundEffects.playFanfare();
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

    // Save individual assessment result
    const studentId = user?.role === 'student' ? user.id : 'student-aarav-101';
    await assessmentService.recordAssessment({
      studentId,
      lessonId: lesson.id,
      moduleId: lesson.moduleId,
      understandingLevel: finalScore >= questions.length ? 'independent' : 'with_guidance',
      score: finalScore * 5,
      teacherNotes: `Successfully answered ${finalScore} of ${questions.length} picture checks.`
    });

    // Record lesson progress
    progressService.recordLessonCompletion(studentId, lesson.moduleId, lesson.id, 3);

    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setFeedback(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="p-8 sm:p-12 rounded-4xl bg-gradient-to-br from-amber-50 via-white to-purple-50 border-3 border-purple-200 shadow-soft text-center animate-scaleUp">
        <Ollie state="celebrating" size="lg" className="mx-auto mb-4" />
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">
          {t('വളരെ മിടുക്കൻ! പരിശോധന പൂർത്തിയായി!', 'Wonderful! Assessment Completed!')}
        </h3>
        <p className="text-sm font-bold text-slate-600 mb-6">
          {t(`താങ്കൾ ${questions.length}-ൽ ${score} ചോദ്യങ്ങൾക്കും ശരിയായി ഉത്തരം നൽകി! 3 നക്ഷത്രങ്ങൾ സമ്മാനം!`, `You answered ${score} of ${questions.length} checks correctly! 3 Gold Stars Earned!`)}
        </p>

        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3].map(s => (
            <Star key={s} className="w-10 h-10 text-amber-400 fill-amber-400 animate-bounce" style={{ animationDelay: `${s * 150}ms` }} />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="purple" size="lg" onClick={handleReset} icon={RotateCcw}>
            {t('വീണ്ടും പരിശീലിക്കാം', 'Try Again')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Assessment Header */}
      <div className="flex items-center justify-between pb-3 border-b border-purple-100">
        <div>
          <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
            {t('വ്യക്തിഗത ധാരണാ പരിശോധന (Individual Check)', 'Individual Understanding Check')}
          </span>
          <h4 className="text-lg font-black text-slate-800">
            {checkData.title_ml || t('ചോദ്യം കണ്ടുപിടിക്കൂ', 'Picture Check')}
          </h4>
        </div>

        <span className="px-3.5 py-1.5 rounded-2xl bg-purple-100 text-brand-purple font-black text-xs">
          {currentQIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-4xl bg-white border-2 border-purple-200 shadow-soft text-center">
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-6">
          {t(currentQ.question_ml, currentQ.question_en)}
        </h3>

        {/* Big Touch-Friendly Picture Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {currentQ.options?.map((opt) => {
            const isSelected = selectedOpt === opt.id;
            const isCorrect = opt.isCorrect;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className={`p-6 rounded-3xl border-3 text-center transition-all duration-150 flex flex-col items-center justify-center gap-3 cursor-pointer ${
                  isSelected && feedback === 'correct'
                    ? 'bg-emerald-100 border-emerald-500 scale-105 shadow-md'
                    : isSelected && feedback === 'wrong'
                    ? 'bg-rose-100 border-rose-400 animate-shake'
                    : 'bg-purple-50/50 hover:bg-purple-100/70 border-purple-200 active:scale-98'
                }`}
              >
                <span className="text-5xl sm:text-6xl">{opt.emoji || '❓'}</span>
                <span className="text-base sm:text-lg font-black text-slate-800">
                  {t(opt.text_ml, opt.text_en)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Notification */}
        {feedback === 'correct' && (
          <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600 font-black text-base animate-bounce">
            <CheckCircle2 className="w-6 h-6" />
            <span>{t('ശരിയുത്തരം! വളരെ നല്ലത്! ✨', 'Correct! Amazing job! ✨')}</span>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-6 flex items-center justify-center gap-2 text-rose-500 font-bold text-sm">
            <XCircle className="w-5 h-5" />
            <span>{t('ഒന്നു കൂടി ശ്രമിച്ചു നോക്കൂ! ഒല്ലി കൂടെയുണ്ട്.', 'Try once more! Ollie believes in you.')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnderstandingCheckView;

