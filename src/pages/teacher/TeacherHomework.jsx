import React, { useState, useEffect } from 'react';
import { ClipboardList, Plus, User, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { homeworkService } from '../../services/homeworkService';
import { SAMPLE_STUDENTS } from '../../data/sampleUsers';
import Button from '../../components/common/Button';

export const TeacherHomework = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [homeworkList, setHomeworkList] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    homeworkService.getHomeworkByTeacher(user?.id).then(setHomeworkList);
  }, [user]);

  const getStudent = (studentId) => {
    return SAMPLE_STUDENTS.find(s => s.id === studentId || s.studentIdNumber === studentId) || { fullName: 'Student', studentIdNumber: 'ID' };
  };

  const statusBadges = {
    assigned: 'bg-purple-100 text-purple-800 border-purple-200',
    submitted: 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse',
    reviewed: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  };

  const filtered = filter === 'all'
    ? homeworkList
    : homeworkList.filter(h => h.status === filter);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
            {t('വ്യക്തിഗത ഹോംവർക്ക്', 'Individual Homework')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {t('അസൈൻമെന്റുകൾ (Homework Tasks)', 'Homework Task Tracker')}
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-1">
            {t('ഒരു സമയം ഒരു കുട്ടിക്ക് മാത്രം അനുയോജ്യമായ ഹോംവർക്ക് നൽകുന്നു.', 'Strictly individual homework assigned to single students.')}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-purple-200">
          {['all', 'assigned', 'submitted', 'reviewed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-colors ${
                filter === st ? 'bg-brand-purple text-white shadow-sm' : 'text-slate-600 hover:bg-purple-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {filtered.map((hw) => {
          const student = getStudent(hw.studentId);
          return (
            <div
              key={hw.id}
              className="p-5 rounded-3xl bg-white border-2 border-purple-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{student.avatar || '👦'}</span>
                  <span className="font-black text-slate-800 text-sm">
                    {student.fullName} ({student.studentIdNumber})
                  </span>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${statusBadges[hw.status] || statusBadges.assigned}`}>
                    {hw.status}
                  </span>
                </div>

                <h4 className="text-base font-black text-brand-purple">
                  {hw.lessonTitle_ml || hw.moduleTitle_ml}
                </h4>

                <p className="text-xs font-semibold text-slate-600">
                  "{hw.instructions_ml}"
                </p>

                {hw.submissionNote && (
                  <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200">
                    📝 <strong>{t('കുട്ടിയുടെ സമർപ്പണം:', 'Student submission:')}</strong> {hw.submissionNote}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 self-end md:self-center">
                <div className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due: {hw.dueDate}</span>
                </div>

                {hw.status === 'reviewed' && (
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{hw.starsAwarded} Stars</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherHomework;

