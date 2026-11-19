import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Tv, CheckSquare, ClipboardList, TrendingUp, Sparkles, Star, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Ollie from '../../components/mascot/Ollie';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StudentCard from '../../components/cards/StudentCard';
import soundEffects from '../../utils/soundSynth';
import { classService } from '../../services/classService';
import { homeworkService } from '../../services/homeworkService';
import { assessmentService } from '../../services/assessmentService';

export const TeacherDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [students, setStudents] = useState([]);
  const [homeworkList, setHomeworkList] = useState([]);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const st = await classService.getTeacherAssignedStudents(user?.id);
      setStudents(st);
      const hw = await homeworkService.getHomeworkByTeacher(user?.id);
      setHomeworkList(hw);
      const ass = assessmentService.getAllAssessments();
      setAssessments(ass);
    };
    loadData();
  }, [user]);

  const pendingSubmissions = homeworkList.filter(h => h.status === 'submitted');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Teacher Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-brand-purple via-indigo-600 to-purple-800 text-white shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-purple-100 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('സ്പെഷ്യൽ എഡ്യൂക്കേറ്റർ ഡാഷ്‌ബോർഡ്', 'Special Educator Hub')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {t(`സ്വാഗതം, ${user?.fullName_ml || user?.fullName || 'ടീച്ചർ'}!`, `Welcome, ${user?.fullName || 'Teacher'}!`)}
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl leading-relaxed">
            {t(
              'നിങ്ങൾ നിയന്ത്രിക്കുന്ന 4 ലേണിംഗ് ഗ്രൂപ്പുകളും 36 പാഠ്യവിഭാഗങ്ങളും ക്ലാസ്സ് റൂം ടിവിയിലൂടെ പഠിപ്പിക്കാം.',
              'Teach across all 4 learning groups and 36 exact curriculum modules via Classroom TV.'
            )}
          </p>
        </div>

        {/* Classroom TV Primary Button */}
        <Link
          to="/classroom-tv"
          onClick={() => soundEffects.playPop()}
          className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-3xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-base shadow-bubbly-yellow hover:scale-105 active:translate-y-1 transition-all"
        >
          <Tv className="w-6 h-6" />
          <span>{t('ക്ലാസ്സ് റൂം ടിവി തുടങ്ങൂ', 'Launch Classroom TV')}</span>
        </Link>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card color="purple" bordered={true} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-200/60 flex items-center justify-center text-brand-purple">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800">{students.length}</span>
            <p className="text-xs font-bold text-slate-500">{t('വിദ്യാർത്ഥികൾ', 'Assigned Students')}</p>
          </div>
        </Card>

        <Card color="sky" bordered={true} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-200/60 flex items-center justify-center text-sky-700">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800">36</span>
            <p className="text-xs font-bold text-slate-500">{t('പാഠ്യവിഭാഗങ്ങൾ', 'Total Modules')}</p>
          </div>
        </Card>

        <Card color="yellow" bordered={true} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-200/60 flex items-center justify-center text-amber-700">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800">{pendingSubmissions.length}</span>
            <p className="text-xs font-bold text-slate-500">{t('പരിശോധിക്കാനുള്ള HW', 'Pending Review')}</p>
          </div>
        </Card>

        <Card color="mint" bordered={true} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-200/60 flex items-center justify-center text-emerald-700">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800">{assessments.length}</span>
            <p className="text-xs font-bold text-slate-500">{t('വിലയിരുത്തലുകൾ', 'Assessments Saved')}</p>
          </div>
        </Card>
      </div>

      {/* Assigned Students Roster */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-800">
              {t('നിങ്ങൾക്ക് അനുവദിച്ച വിദ്യാർത്ഥികൾ', 'My Assigned Students')}
            </h3>
            <p className="text-xs font-bold text-slate-500">
              {t('വ്യക്തിഗതമായി വിലയിരുത്താനും ഹോംവർക്ക് നൽകാനും തിരഞ്ഞെടുക്കുക', 'Select student for individual assessment or homework')}
            </p>
          </div>

          <Link
            to="/teacher/students"
            className="text-xs font-black text-brand-purple hover:underline"
          >
            {t('എല്ലാവരെയും കാണുക →', 'View All →')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {students.map((st) => (
            <StudentCard
              key={st.id}
              student={st}
              onAssess={() => {}}
              onAssignHomework={() => {}}
            />
          ))}
        </div>
      </div>

      {/* 4 Learning Groups Navigation Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-800">
            {t('4 ലേണിംഗ് ഗ്രൂപ്പുകൾ (Curriculum Groups)', '4 Curriculum Groups')}
          </h3>
          <Link to="/teacher/modules" className="text-xs font-black text-brand-purple hover:underline">
            {t('എല്ലാ 36 മോഡ്യൂളുകളും കാണുക →', 'Explore All 36 Modules →')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-pink-50 border-2 border-pink-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black text-pink-700 bg-white px-2.5 py-0.5 rounded-full border border-pink-200">
                11 പാഠ്യവിഭാഗങ്ങൾ
              </span>
              <h4 className="text-base font-black text-slate-800 mt-2">കെയർ ഗ്രൂപ്പ് (Care Group)</h4>
              <p className="text-xs text-slate-600 mt-1">ഇന്ദ്രിയ പഠനം, സ്വന്തം പേര്, നിറങ്ങൾ, ആകൃതികൾ, ചലനശേഷി.</p>
            </div>
            <Link to="/teacher/modules?group=care" className="mt-4 text-xs font-black text-pink-700 hover:underline">
              പാഠങ്ങൾ കാണുക →
            </Link>
          </div>

          <div className="p-5 rounded-3xl bg-sky-50 border-2 border-sky-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black text-sky-700 bg-white px-2.5 py-0.5 rounded-full border border-sky-200">
                7 പാഠ്യവിഭാഗങ്ങൾ
              </span>
              <h4 className="text-base font-black text-slate-800 mt-2">പ്രൈമറി (Primary)</h4>
              <p className="text-xs text-slate-600 mt-1">അക്ഷരങ്ങൾ, സംഖ്യകൾ, ചുറ്റുമുള്ള ലോകം, ശുചിത്വം, സുരക്ഷ.</p>
            </div>
            <Link to="/teacher/modules?group=primary" className="mt-4 text-xs font-black text-sky-700 hover:underline">
              പാഠങ്ങൾ കാണുക →
            </Link>
          </div>

          <div className="p-5 rounded-3xl bg-purple-50 border-2 border-purple-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black text-purple-700 bg-white px-2.5 py-0.5 rounded-full border border-purple-200">
                9 പാഠ്യവിഭാഗങ്ങൾ
              </span>
              <h4 className="text-base font-black text-slate-800 mt-2">സെക്കൻഡറി (Secondary)</h4>
              <p className="text-xs text-slate-600 mt-1">ഭിന്നസംഖ്യകൾ, വ്യക്തിശുചിത്വം, പോഷകാഹാരം, സൂംബാ ഡാൻസ്.</p>
            </div>
            <Link to="/teacher/modules?group=secondary" className="mt-4 text-xs font-black text-purple-700 hover:underline">
              പാഠങ്ങൾ കാണുക →
            </Link>
          </div>

          <div className="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black text-emerald-700 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
                9 പാഠ്യവിഭാഗങ്ങൾ
              </span>
              <h4 className="text-base font-black text-slate-800 mt-2">വൊക്കേഷണൽ (Vocational)</h4>
              <p className="text-xs text-slate-600 mt-1">തൊഴിൽ പരിശീലനം, ലീഡർഷിപ്പ്, ഉത്സവങ്ങൾ, ഫോൺ മര്യാദകൾ.</p>
            </div>
            <Link to="/teacher/modules?group=vocational" className="mt-4 text-xs font-black text-emerald-700 hover:underline">
              പാഠങ്ങൾ കാണുക →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

