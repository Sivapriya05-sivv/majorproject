import React, { useState, useEffect } from 'react';
import { Award, Star, CheckCircle2, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { homeworkService } from '../../services/homeworkService';
import { SAMPLE_STUDENTS } from '../../data/sampleUsers';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';

export const TeacherSubmissions = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [submissions, setSubmissions] = useState([]);
  const [selectedHw, setSelectedHw] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [stars, setStars] = useState(3);
  const [feedback, setFeedback] = useState('വളരെ നല്ല പ്രവർത്തനം! അഭിനന്ദനങ്ങൾ.');

  const loadSubmissions = async () => {
    const list = await homeworkService.getHomeworkByTeacher(user?.id);
    setSubmissions(list);
  };

  useEffect(() => {
    loadSubmissions();
  }, [user]);

  const handleOpenReview = (hw) => {
    setSelectedHw(hw);
    setReviewModalOpen(true);
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    await homeworkService.reviewHomework(selectedHw.id, {
      starsAwarded: Number(stars),
      teacherFeedback: feedback
    });
    soundEffects.playFanfare();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setReviewModalOpen(false);
    loadSubmissions();
  };

  const getStudent = (studentId) => {
    return SAMPLE_STUDENTS.find(s => s.id === studentId || s.studentIdNumber === studentId) || { fullName: 'Student' };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
          {t('ഹോംവർക്ക് സമർപ്പണങ്ങൾ', 'Homework Submissions')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          {t('സമർപ്പണ പരിശോധനയും ഫീഡ്‌ബാക്കും', 'Review Submissions & Award Stars')}
        </h2>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {t('വിദ്യാർത്ഥികൾ സമർപ്പിച്ച ജോലികൾ പരിശോധിച്ച് പ്രോത്സാഹന നക്ഷത്രങ്ങൾ നൽകുക.', 'Review completed student home activities and provide encouraging feedback.')}
        </p>
      </div>

      <div className="grid gap-4">
        {submissions.map((hw) => {
          const student = getStudent(hw.studentId);
          return (
            <div
              key={hw.id}
              className="p-5 rounded-3xl bg-white border-2 border-purple-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{student.avatar || '👦'}</span>
                  <span className="font-black text-slate-800 text-sm">{student.fullName}</span>
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      hw.status === 'submitted'
                        ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    {hw.status}
                  </span>
                </div>

                <h4 className="text-base font-black text-brand-purple">
                  {hw.lessonTitle_ml || hw.moduleTitle_ml}
                </h4>

                {hw.submissionNote && (
                  <p className="text-xs font-semibold text-slate-700 bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                    "{hw.submissionNote}"
                  </p>
                )}

                {hw.teacherFeedback && (
                  <p className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded-xl">
                    ✓ <strong>{t('ടീച്ചറുടെ ഫീഡ്‌ബാക്ക്:', 'Feedback:')}</strong> {hw.teacherFeedback} ({hw.starsAwarded} ⭐)
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <Button
                  variant={hw.status === 'submitted' ? 'yellow' : 'lavender'}
                  size="sm"
                  onClick={() => handleOpenReview(hw)}
                  icon={Award}
                >
                  {hw.status === 'submitted' ? t('വിലയിരുത്തുക (Review)', 'Review Now') : t('തിരുത്തുക (Edit)', 'Edit Review')}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={t('സമർപ്പണം വിലയിരുത്തുക', 'Review & Award Stars')}
        size="md"
      >
        <form onSubmit={handleSaveReview} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('സമ്മാനിക്കുന്ന നക്ഷത്രങ്ങൾ (Stars Awarded)', 'Stars Awarded')}
            </label>
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    soundEffects.playStar();
                    setStars(s);
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-1.5 transition-all ${
                    stars >= s ? 'bg-amber-100 border-amber-400 text-amber-800 scale-105' : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <Star className={`w-5 h-5 ${stars >= s ? 'fill-amber-400 text-amber-500' : ''}`} />
                  <span className="font-black text-sm">{s} Star</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('അധ്യാപികയുടെ പ്രോത്സാഹന വാക്ക് (Teacher Feedback)', 'Encouraging Feedback')}
            </label>
            <textarea
              rows={3}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setReviewModalOpen(false)}>
              {t('റദ്ദാക്കുക', 'Cancel')}
            </Button>
            <Button type="submit" variant="yellow">
              {t('ഫീഡ്‌ബാക്ക് നൽകുക (Submit Review)', 'Save Feedback & Stars')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherSubmissions;

