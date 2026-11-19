import React, { useState, useEffect } from 'react';
import { CheckSquare, Star, User, Calendar, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { assessmentService } from '../../services/assessmentService';
import { ALL_MODULES } from '../../data/modulesData';
import { SAMPLE_STUDENTS } from '../../data/sampleUsers';

export const TeacherAssessments = () => {
  const { t } = useLanguage();
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    setAssessments(assessmentService.getAllAssessments());
  }, []);

  const levelBadges = {
    independent: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    with_guidance: 'bg-sky-100 text-sky-800 border-sky-300',
    developing: 'bg-amber-100 text-amber-800 border-amber-300',
    needs_practice: 'bg-rose-100 text-rose-800 border-rose-300'
  };

  const getStudentName = (studentId) => {
    const s = SAMPLE_STUDENTS.find(st => st.id === studentId || st.studentIdNumber === studentId);
    return s ? `${s.fullName} (${s.studentIdNumber})` : studentId;
  };

  const getModuleTitle = (moduleId) => {
    const m = ALL_MODULES.find(mod => mod.id === moduleId);
    return m ? `${m.moduleNumber}. ${m.title_ml}` : moduleId;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
          {t('വ്യക്തിഗത ധാരണാ മൂല്യനിർണ്ണയം', 'Individual Understanding Records')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          {t('മൂല്യനിർണ്ണയ രേഖകൾ (Assessments)', 'Assessment Evaluation History')}
        </h2>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {t('ഓരോ വിദ്യാർത്ഥിയുടെയും വ്യക്തിഗത ധാരണ പ്രത്യേകം പരിശോധിച്ച ഫലങ്ങൾ', 'Results proving individual comprehension separate from classroom group activities')}
        </p>
      </div>

      {/* List / Table */}
      {assessments.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-4xl border-2 border-purple-100">
          <CheckSquare className="w-12 h-12 text-purple-300 mx-auto mb-3" />
          <h4 className="text-base font-black text-slate-700">
            {t('മൂല്യനിർണ്ണയങ്ങൾ ഒന്നും രേഖപ്പെടുത്തിയിട്ടില്ല', 'No individual assessments saved yet.')}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {t('പാഠങ്ങൾ പഠിപ്പിച്ച ശേഷം വ്യക്തിഗത പരിശോധന പൂർത്തിയാക്കുമ്പോൾ ഇവിടെ കാണാം.', 'Complete individual checks in lesson view or students roster.')}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {assessments.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-white border-2 border-purple-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-purple" />
                  <span className="font-black text-slate-800 text-sm">
                    {getStudentName(item.studentId)}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                      levelBadges[item.understandingLevel] || levelBadges.independent
                    }`}
                  >
                    {item.understandingLevel}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-600">
                  {getModuleTitle(item.moduleId)}
                </p>

                <p className="text-xs text-slate-500 italic">
                  "{item.teacherNotes}"
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 self-end md:self-center">
                <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>{item.score} / 10 pts</span>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(item.evaluatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherAssessments;

