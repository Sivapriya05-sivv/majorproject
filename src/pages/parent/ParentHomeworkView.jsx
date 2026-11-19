import React, { useState, useEffect } from 'react';
import { ClipboardList, Star, CheckCircle2, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { parentService } from '../../services/parentService';
import { homeworkService } from '../../services/homeworkService';

export const ParentHomeworkView = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [child, setChild] = useState(null);
  const [homeworkList, setHomeworkList] = useState([]);

  useEffect(() => {
    const load = async () => {
      const ch = await parentService.getLinkedChild(user);
      setChild(ch);
      if (ch?.id) {
        const list = await homeworkService.getHomeworkForStudent(ch.id);
        setHomeworkList(list);
      }
    };
    load();
  }, [user]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-black text-pink-600 uppercase tracking-wider">
          {t('ഹോംവർക്ക് പരിശോധന', 'Child Homework Hub')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          {t(`കുട്ടിയുടെ ഹോംവർക്കുകൾ (${child?.fullName || 'ആരവ്'})`, `Homework Tasks for ${child?.fullName || 'Child'}`)}
        </h2>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {t('ടീച്ചർ നൽകിയ നിർദ്ദേശങ്ങളും വിലയിരുത്തലുകളും ഇവിടെ കാണാം.', 'View tasks assigned by special educator and awarded star feedback.')}
        </p>
      </div>

      <div className="grid gap-4">
        {homeworkList.map((hw) => (
          <div
            key={hw.id}
            className="p-6 rounded-4xl bg-white border-2 border-purple-100 shadow-soft space-y-3"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
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

              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Due Date: {hw.dueDate}</span>
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-800">
              {hw.lessonTitle_ml}
            </h3>

            <p className="text-xs font-semibold text-slate-700 bg-purple-50/50 p-3 rounded-2xl border border-purple-100 leading-relaxed">
              💡 <strong>{t('ടീച്ചറുടെ നിർദ്ദേശം:', 'Instructions:')}</strong> {hw.instructions_ml}
            </p>

            {hw.submissionNote && (
              <p className="text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                📝 <strong>{t('സമർപ്പണ കുറിപ്പ്:', 'Submission note:')}</strong> {hw.submissionNote}
              </p>
            )}

            {hw.teacherFeedback && (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{hw.teacherFeedback}</span>
                </div>
                <div className="flex items-center gap-1 font-black text-amber-700">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{hw.starsAwarded} Stars</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentHomeworkView;

