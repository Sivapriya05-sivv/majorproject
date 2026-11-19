import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowLeft, AlertCircle, HeartHandshake, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/common/Button';
import Ollie from '../../components/mascot/Ollie';
import soundEffects from '../../utils/soundSynth';
import { SAMPLE_STUDENTS } from '../../data/sampleUsers';

export const ParentSignup = () => {
  const { signupParent } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [studentIdToLink, setStudentIdToLink] = useState('STU101');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signupParent({
        fullName,
        email,
        password,
        phone,
        studentIdToLink
      });
      soundEffects.playSuccess();
      navigate('/parent/dashboard');
    } catch (err) {
      soundEffects.playTryAgain();
      setError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-4xl border-3 border-pink-300 shadow-soft-lg p-7 sm:p-9 animate-scaleUp">
        <Link
          to="/login/parent"
          onClick={() => soundEffects.playPop()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-pink-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('ലോഗിനിലേക്ക് മടങ്ങുക', 'Back to Login')}</span>
        </Link>

        <div className="text-center mb-6">
          <Ollie state="happy" size="md" className="mx-auto mb-2" />
          <h2 className="text-2xl font-black text-slate-800">
            {t('രക്ഷിതാവ് രജിസ്ട്രേഷൻ', 'Parent Registration')}
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-1">
            {t('കുട്ടിയുടെ സ്റ്റുഡന്റ് ഐഡി ലിങ്ക് ചെയ്യുക', 'Link with your child’s Student ID')}
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              {t('രക്ഷിതാവിന്റെ പേര് (Full Name)', 'Full Name')}
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Parent Name"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-pink-500 font-bold text-sm bg-pink-50/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              {t('ഇമെയിൽ (Email)', 'Email')}
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-pink-500 font-bold text-sm bg-pink-50/20"
              />
            </div>
          </div>

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
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-pink-500 font-bold text-sm bg-pink-50/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              {t('ഫോൺ നമ്പർ (Phone)', 'Phone Number')}
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98470 12345"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-pink-500 font-bold text-sm bg-pink-50/20"
              />
            </div>
          </div>

          {/* Child Link ID */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
            <label className="block text-xs font-extrabold text-amber-900 mb-1">
              {t('ലിങ്ക് ചെയ്യേണ്ട സ്റ്റുഡന്റ് ഐഡി (Child Student ID)', 'Child Student ID Number')}
            </label>
            <input
              type="text"
              required
              value={studentIdToLink}
              onChange={(e) => setStudentIdToLink(e.target.value)}
              placeholder="e.g. STU101"
              className="w-full px-3 py-2 rounded-xl border border-amber-300 font-black text-sm bg-white"
            />
            <p className="text-[10px] font-bold text-amber-800 mt-1">
              {t('മാതൃക: STU101 (ആരവ്), STU102 (ദിയ)', 'Sample: STU101 (Aarav), STU102 (Diya)')}
            </p>
          </div>

          <Button
            type="submit"
            variant="pink"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-4"
          >
            {t('അക്കൗണ്ട് സൃഷ്ടിക്കുക', 'Create Parent Account')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ParentSignup;

