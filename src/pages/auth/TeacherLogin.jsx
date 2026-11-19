import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Building, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/common/Button';
import Ollie from '../../components/mascot/Ollie';
import soundEffects from '../../utils/soundSynth';
import { SAMPLE_SCHOOL, SAMPLE_TEACHER } from '../../data/sampleUsers';

export const TeacherLogin = () => {
  const { loginTeacher } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [schoolCode, setSchoolCode] = useState(SAMPLE_SCHOOL.code);
  const [email, setEmail] = useState(SAMPLE_TEACHER.email);
  const [password, setPassword] = useState(SAMPLE_TEACHER.password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginTeacher(schoolCode, email, password);
      soundEffects.playSuccess();
      navigate('/teacher/dashboard');
    } catch (err) {
      soundEffects.playTryAgain();
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-4xl border-3 border-purple-200 shadow-soft-lg p-7 sm:p-9 animate-scaleUp">
        {/* Back Link */}
        <Link
          to="/welcome"
          onClick={() => soundEffects.playPop()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-purple mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('പിന്നോട്ട്', 'Back to Welcome')}</span>
        </Link>

        {/* Mascot & Header */}
        <div className="text-center mb-6">
          <Ollie state="happy" size="md" className="mx-auto mb-2" />
          <span className="text-[11px] font-black text-brand-purple uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            {t('അധ്യാപക പോർട്ടൽ', 'Teacher Portal')}
          </span>
          <h2 className="text-2xl font-black text-slate-800 mt-2">
            {t('അധ്യാപക പ്രവേശനം', 'Teacher Login')}
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-1">
            {t('സ്കൂൾ ഐഡിയും അംഗീകൃത ക്രെഡൻഷ്യലുകളും നൽകുക', 'Authorized special educators only')}
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
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-purple-100 focus:border-brand-purple font-bold text-sm bg-purple-50/20"
              />
            </div>
          </div>

          {/* Teacher Email */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              {t('അധ്യാപക ഇമെയിൽ (Email)', 'Teacher Email')}
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@school.edu"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-purple-100 focus:border-brand-purple font-bold text-sm bg-purple-50/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-extrabold text-slate-700">
                {t('പാസ്‌വേഡ് (Password)', 'Password')}
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-bold text-brand-purple hover:underline"
              >
                {t('മറന്നുപോയോ?', 'Forgot?')}
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-purple-100 focus:border-brand-purple font-bold text-sm bg-purple-50/20"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="purple"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-6"
          >
            {t('ഡാഷ്‌ബോർഡിലേക്ക് പ്രവേശിക്കുക', 'Sign In to Dashboard')}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-purple-100 text-center">
          <p className="text-[11px] font-bold text-slate-500">
            {t('സ്കൂൾ അധികാരപ്പെടുത്തിയ അധ്യാപകർക്ക് മാത്രമേ പ്രവേശനം ഉള്ളൂ.', 'Teacher accounts must be authorized by the school.')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;

