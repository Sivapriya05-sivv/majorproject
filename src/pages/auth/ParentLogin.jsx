import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, AlertCircle, HeartHandshake } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/common/Button';
import Ollie from '../../components/mascot/Ollie';
import soundEffects from '../../utils/soundSynth';
import { SAMPLE_PARENT } from '../../data/sampleUsers';

export const ParentLogin = () => {
  const { loginParent } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState(SAMPLE_PARENT.email);
  const [password, setPassword] = useState(SAMPLE_PARENT.password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginParent(email, password);
      soundEffects.playSuccess();
      navigate('/parent/dashboard');
    } catch (err) {
      soundEffects.playTryAgain();
      setError(err.message || 'Parent login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-4xl border-3 border-pink-300 shadow-soft-lg p-7 sm:p-9 animate-scaleUp">
        <Link
          to="/welcome"
          onClick={() => soundEffects.playPop()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-pink-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('പിന്നോട്ട്', 'Back to Welcome')}</span>
        </Link>

        <div className="text-center mb-6">
          <Ollie state="happy" size="md" className="mx-auto mb-2" />
          <span className="text-[11px] font-black text-pink-900 uppercase tracking-wider bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
            {t('രക്ഷിതാക്കളുടെ പോർട്ടൽ', 'Parent Portal')}
          </span>
          <h2 className="text-2xl font-black text-slate-800 mt-2">
            {t('രക്ഷിതാക്കളുടെ പ്രവേശനം', 'Parent Login')}
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-1">
            {t('കുട്ടിയുടെ ഹോം ലേണിംഗും പുരോഗതിയും പിന്തുണയ്ക്കാം', 'Support your child’s home learning journey')}
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
              {t('ഇമെയിൽ വിലാസം (Email)', 'Email Address')}
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-pink-100 focus:border-pink-500 font-bold text-sm bg-pink-50/20"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-extrabold text-slate-700">
                {t('പാസ്‌വേഡ് (Password)', 'Password')}
              </label>
              <Link to="/forgot-password" className="text-[11px] font-bold text-pink-600 hover:underline">
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
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-pink-100 focus:border-pink-500 font-bold text-sm bg-pink-50/20"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="pink"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-6"
          >
            {t('പ്രവേശിക്കുക', 'Sign In to Parent Portal')}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-pink-100 text-center">
          <p className="text-xs font-bold text-slate-600">
            {t('പുതിയ അക്കൗണ്ട് വേണമോ? ', 'Need a new parent account? ')}
            <Link to="/signup/parent" className="text-pink-600 font-black hover:underline">
              {t('രജിസ്റ്റർ ചെയ്യൂ', 'Register with Child ID')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;

