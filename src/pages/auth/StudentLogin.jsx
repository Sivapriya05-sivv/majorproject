import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Building, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/common/Button';
import Ollie from '../../components/mascot/Ollie';
import soundEffects from '../../utils/soundSynth';
import { SAMPLE_SCHOOL, SAMPLE_STUDENTS } from '../../data/sampleUsers';

export const StudentLogin = () => {
  const { loginStudent } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [schoolCode, setSchoolCode] = useState(SAMPLE_SCHOOL.code);
  const [studentId, setStudentId] = useState(SAMPLE_STUDENTS[0].studentIdNumber);
  const [password, setPassword] = useState(SAMPLE_STUDENTS[0].password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginStudent(schoolCode, studentId, password);
      soundEffects.playSuccess();
      navigate('/student/dashboard');
    } catch (err) {
      soundEffects.playTryAgain();
      setError(err.message || 'Login failed. Please check student details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-4xl border-3 border-amber-300 shadow-soft-lg p-7 sm:p-9 animate-scaleUp">
        {/* Back Link */}
        <Link
          to="/welcome"
          onClick={() => soundEffects.playPop()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('പിന്നോട്ട്', 'Back to Welcome')}</span>
        </Link>

        {/* Mascot & Header */}
        <div className="text-center mb-6">
          <Ollie state="happy" size="md" className="mx-auto mb-2" />
          <span className="text-[11px] font-black text-amber-900 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {t('വിദ്യാർത്ഥി പോർട്ടൽ', 'Student Portal')}
          </span>
          <h2 className="text-2xl font-black text-slate-800 mt-2">
            {t('വിദ്യാർത്ഥി പ്രവേശനം', 'Student Login')}
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-1">
            {t('ഐഡി കാർഡിലുള്ള നമ്പറും പാസ്‌വേഡും നൽകൂ!', 'Enter your School ID and Student ID!')}
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* School ID */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              {t('സ്കൂൾ ഐഡി (School ID)', 'School ID')}
            </label>
            <div className="relative">
              <Building className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
                placeholder="e.g. SCH001"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-amber-200 focus:border-amber-500 font-bold text-sm bg-amber-50/20"
              />
            </div>
          </div>

          {/* Student ID Number */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              {t('സ്റ്റുഡന്റ് ഐഡി (Student ID)', 'Student ID Number')}
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. STU101"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-amber-200 focus:border-amber-500 font-bold text-sm bg-amber-50/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              {t('പാസ്‌വേഡ് (Password)', 'Password')}
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-amber-200 focus:border-amber-500 font-bold text-sm bg-amber-50/20"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="yellow"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-6"
          >
            {t('കളിച്ചു തുടങ്ങാം! (Start Adventure)', 'Start Learning Adventure!')}
          </Button>
        </form>

        {/* Quick hint of test students */}
        <div className="mt-6 pt-4 border-t border-amber-100">
          <p className="text-[11px] font-bold text-slate-500 text-center mb-2">
            {t('പരീക്ഷണ അക്കൗണ്ടുകൾ (Sample IDs):', 'Sample Student Accounts:')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {SAMPLE_STUDENTS.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setStudentId(st.studentIdNumber);
                  setPassword(st.password);
                }}
                className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200"
              >
                {st.avatar} {st.studentIdNumber} ({st.groupCode})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;

