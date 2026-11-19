import React, { useState, useEffect } from 'react';
import { TrendingUp, Star, Award, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { parentService } from '../../services/parentService';
import { progressService } from '../../services/progressService';
import { assessmentService } from '../../services/assessmentService';
import ProgressBar from '../../components/common/ProgressBar';

export const ParentChildProgress = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [child, setChild] = useState(null);
  const [progress, setProgress] = useState(null);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const ch = await parentService.getLinkedChild(user);
      setChild(ch);
      if (ch?.id) {
        const pr = progressService.getStudentProgress(ch.id);
        setProgress(pr);
        const ass = assessmentService.getStudentAssessments(ch.id);
        setAssessments(ass);
      }
    };
    load();
  }, [user]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Notice regarding permission boundaries */}
      <div className="p-4 rounded-3xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-brand-purple flex-shrink-0" />
        <span>
          {t(
            'രക്ഷിതാക്കൾക്ക് കുട്ടിയുടെ വിവരങ്ങൾ പരിശോധിക്കാം. ഔദ്യോഗിക സ്കൂൾ രേഖകളോ ടീച്ചറുടെ വിലയിരുത്തലുകളോ തിരുത്താൻ അനുവാദമില്ല.',
            'View-only permission: Parents can support home practice but cannot alter official school records, teacher evaluations or permissions.'
          )}
        </span>
      </div>

      {/* Child Summary Card */}
      <div className="p-6 rounded-4xl bg-white border-2 border-purple-100 shadow-soft flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl p-2 bg-pink-50 rounded-2xl">{child?.avatar || '👦'}</span>
          <div>
            <h3 className="text-xl font-black text-slate-800">{child?.fullName}</h3>
            <p className="text-xs font-bold text-slate-500">
              {t(child?.groupName_ml, child?.groupName_en)} • ID: {child?.studentIdNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-50 text-amber-900 font-black text-sm border border-amber-200">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span>{progress?.totalStars || child?.stars || 15} Stars</span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="p-6 rounded-4xl bg-white border-2 border-purple-100 shadow-soft space-y-4">
        <h4 className="text-base font-black text-slate-800">
          {t('പഠന പുരോഗതി (Curriculum Milestones)', 'Curriculum Milestones')}
        </h4>
        <ProgressBar
          current={progress?.completedLessons?.length || 4}
          total={10}
          label={t('പൂർത്തിയാക്കിയ പാഠങ്ങൾ', 'Lessons Completed')}
          color="purple"
        />
        <ProgressBar
          current={progress?.completedModules?.length || 2}
          total={7}
          label={t('മോഡ്യൂളുകൾ', 'Modules Explored')}
          color="sky"
        />
      </div>

      {/* Teacher's Individual Evaluations */}
      <div>
        <h3 className="text-lg font-black text-slate-800 mb-4">
          {t('ടീച്ചറുടെ വ്യക്തിഗത വിലയിരുത്തലുകൾ', 'Official Teacher Assessments')}
        </h3>

        {assessments.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-purple-100 text-xs font-bold text-slate-500">
            {t('ടീച്ചർ രേഖപ്പെടുത്തിയ പുതിയ വിലയിരുത്തലുകൾ ഇവിടെ കാണാം.', 'Assessments logged by the teacher will appear here.')}
          </div>
        ) : (
          <div className="grid gap-3">
            {assessments.map((ass) => (
              <div
                key={ass.id}
                className="p-5 rounded-3xl bg-white border border-purple-100 shadow-sm flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {ass.understandingLevel}
                  </span>
                  <h4 className="text-sm font-black text-slate-800 mt-1">
                    {ass.moduleId}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    "{ass.teacherNotes}"
                  </p>
                </div>

                <div className="text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl text-xs font-black border border-amber-200">
                  {ass.score} / 10 pts
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentChildProgress;

