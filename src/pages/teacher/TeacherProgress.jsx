import React, { useState, useEffect } from 'react';
import { TrendingUp, Star, Award, BookOpen, Flower2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { classService } from '../../services/classService';
import { progressService } from '../../services/progressService';
import ProgressBar from '../../components/common/ProgressBar';

export const TeacherProgress = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [summaryList, setSummaryList] = useState([]);

  useEffect(() => {
    classService.getTeacherAssignedStudents(user?.id).then(students => {
      const summary = progressService.getTeacherClassProgressSummary(students);
      setSummaryList(summary);
    });
  }, [user]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
          {t('ക്ലാസ്സ് പുരോഗതി അവലോകനം', 'Progress Analytics')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          {t('വിദ്യാർത്ഥി പഠന പുരോഗതി (Student Progress)', 'Student Learning Progress')}
        </h2>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {t('നക്ഷത്രങ്ങൾ, പാഠങ്ങൾ, പൂന്തോട്ടത്തിലെ വളർച്ച എന്നിവയുടെ സമഗ്ര വിവരണം.', 'Positive stars, completed lessons and progress garden growth.')}
        </p>
      </div>

      {/* Roster Progress Cards */}
      <div className="grid gap-4">
        {summaryList.map((st) => (
          <div
            key={st.id}
            className="p-6 rounded-4xl bg-white border-2 border-purple-100 shadow-soft space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-purple-50 rounded-2xl">{st.avatar || '👦'}</span>
                <div>
                  <h4 className="text-lg font-black text-slate-800">{st.fullName}</h4>
                  <p className="text-xs font-bold text-brand-purple">
                    {t(st.groupName_ml, st.groupName_en)} • ID: {st.studentIdNumber}
                  </p>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 text-amber-800 font-black text-xs border border-amber-200">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>{st.totalStars} Stars</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-pink-50 text-pink-800 font-black text-xs border border-pink-200">
                  <Flower2 className="w-4 h-4 text-pink-500" />
                  <span>{st.gardenFlowerCount || 2} Flowers</span>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3 pt-2">
              <ProgressBar
                current={st.completedLessonCount || 1}
                total={10}
                label={t('പൂർത്തിയാക്കിയ പാഠങ്ങൾ (Lessons)', 'Lessons Completed')}
                color="purple"
              />

              <ProgressBar
                current={st.completedModuleCount || 1}
                total={7}
                label={t('പൂർത്തിയാക്കിയ മോഡ്യൂളുകൾ (Modules)', 'Modules Progress')}
                color="sky"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherProgress;

