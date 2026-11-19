import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Star, CheckCircle2, Play, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { homeworkService } from '../../services/homeworkService';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import soundEffects from '../../utils/soundSynth';
import confetti from 'canvas-confetti';

export const StudentHomework = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [homeworkList, setHomeworkList] = useState([]);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedHw, setSelectedHw] = useState(null);
  const [studentNote, setStudentNote] = useState('ഞാൻ സന്തോഷത്തോടെ പൂർത്തിയാക്കി!');

  const loadHw = async () => {
    if (user?.id) {
      const list = await homeworkService.getHomeworkForStudent(user.id);
      setHomeworkList(list);
    }
  };

  useEffect(() => {
    loadHw();
  }, [user]);

  const handleOpenSubmit = (hw) => {
    setSelectedHw(hw);
    setSubmitModalOpen(true);
  };

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    await homeworkService.submitHomework(selectedHw.id, {
      submissionNote: studentNote
    });
    soundEffects.playFanfare();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setSubmitModalOpen(false);
    loadHw();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
          {t('എന്റെ ഹോംവർക്ക്', 'My Homework')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          {t('ടീച്ചർ നൽകിയ വ്യക്തിഗത പ്രവർത്തനങ്ങൾ', 'Assigned Home Activities')}
        </h2>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {t('വീട്ടിൽ അമ്മയോടും അച്ഛനോടും ഒപ്പം ചെയ്ത് ടീച്ചർക്ക് അയച്ചു കൊടുക്കൂ!', 'Complete with family at home and submit for stars!')}
        </p>
      </div>

      {homeworkList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-4xl border-2 border-purple-100">
          <ClipboardList className="w-12 h-12 text-purple-300 mx-auto mb-3" />
          <h4 className="text-base font-black text-slate-700">
            {t('ഇപ്പോൾ പുതിയ ഹോംവർക്ക് ഒന്നും ഇല്ല!', 'No pending homework tasks!')}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {t('ടീച്ചർ ഹോംവർക്ക് നൽകുമ്പോൾ ഇവിടെ കാണാം.', 'New tasks from your teacher will appear here.')}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {homeworkList.map((hw) => (
            <div
              key={hw.id}
              className="p-6 rounded-4xl bg-white border-2 border-purple-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-100 text-brand-purple">
                    {hw.moduleTitle_ml}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      hw.status === 'assigned'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : hw.status === 'submitted'
                        ? 'bg-sky-100 text-sky-800 border-sky-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    {hw.status}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-800">
                  {hw.lessonTitle_ml}
                </h3>

                <p className="text-xs font-bold text-slate-600 bg-purple-50/60 p-3 rounded-2xl border border-purple-100">
                  💡 {hw.instructions_ml}
                </p>

                {hw.teacherFeedback && (
                  <p className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-2xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      {t('ടീച്ചർ നൽകിയ ഫീഡ്‌ബാക്ക്:', 'Teacher Feedback:')} "{hw.teacherFeedback}" ({hw.starsAwarded} ⭐)
                    </span>
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 self-end md:self-center">
                {hw.gameCode && (
                  <Link
                    to={`/student/play/${hw.gameCode}`}
                    onClick={() => soundEffects.playPop()}
                    className="px-4 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-black text-xs shadow-sm flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t('ഗെയിം കളിക്കൂ', 'Play Game')}</span>
                  </Link>
                )}

                {hw.status === 'assigned' && (
                  <Button
                    variant="purple"
                    size="sm"
                    onClick={() => handleOpenSubmit(hw)}
                    icon={Send}
                  >
                    {t('സമർപ്പിക്കുക', 'Submit Work')}
                  </Button>
                )}

                {hw.status === 'submitted' && (
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200">
                    {t('ടീച്ചറുടെ പരിശോധനയിലാണ്', 'Under Teacher Review')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submission Modal */}
      <Modal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        title={t('ഹോംവർക്ക് സമർപ്പിക്കുക', 'Submit Homework Task')}
        size="md"
      >
        <form onSubmit={handleConfirmSubmit} className="space-y-4">
          <p className="text-xs font-bold text-slate-600">
            {t(
              'നിങ്ങൾ ഈ ഹോംവർക്ക് വിജയകരമായി പൂർത്തിയാക്കിയോ? ഒല്ലിക്കും ടീച്ചർക്കും ഒരു സന്തോഷ സന്ദേശം അയക്കൂ!',
              'Have you completed this activity with family? Send a happy note to teacher!'
            )}
          </p>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t('നിങ്ങളുടെ കുറിപ്പ് (Your note)', 'Your note')}
            </label>
            <textarea
              rows={3}
              required
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-purple-100 font-bold text-sm bg-purple-50/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setSubmitModalOpen(false)}>
              {t('റദ്ദാക്കുക', 'Cancel')}
            </Button>
            <Button type="submit" variant="purple">
              {t('ടീച്ചർക്ക് അയക്കൂ! (Submit)', 'Submit to Teacher')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentHomework;

