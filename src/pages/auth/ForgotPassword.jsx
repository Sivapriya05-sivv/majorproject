import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import authService from '../../services/authService';
import Button from '../../components/common/Button';
import Ollie from '../../components/mascot/Ollie';
import soundEffects from '../../utils/soundSynth';

export const ForgotPassword = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      soundEffects.playSuccess();
      setSent(true);
    } catch (err) {
      soundEffects.playTryAgain();
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-4xl border-3 border-purple-200 shadow-soft-lg p-7 sm:p-9 animate-scaleUp">
        <Link
          to="/welcome"
          onClick={() => soundEffects.playPop()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-purple mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('പിന്നോട്ട്', 'Back to Welcome')}</span>
        </Link>

        <div className="text-center mb-6">
          <Ollie state="happy" size="md" className="mx-auto mb-2" />
          <h2 className="text-2xl font-black text-slate-800">
            {t('പാസ്‌വേഡ് മാറ്റുക', 'Reset Password')}
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-1">
            {t('രജിസ്റ്റർ ചെയ്ത ഇമെയിൽ നൽകുക', 'Enter your registered email address')}
          </p>
        </div>

        {sent ? (
          <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-base font-black text-emerald-900">
              {t('റീസെറ്റ് ലിങ്ക് അയച്ചു!', 'Password Reset Link Sent!')}
            </h4>
            <p className="text-xs font-bold text-emerald-800 leading-relaxed">
              {t(`നിങ്ങളുടെ ഇമെയിൽ (${email}) പരിശോധിക്കുക.`, `Please check your email (${email}) to proceed.`)}
            </p>
            <Link
              to="/welcome"
              className="inline-block mt-4 text-xs font-black text-brand-purple hover:underline"
            >
              {t('ലോഗിനിലേക്ക് മടങ്ങുക', 'Back to Login')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 mb-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                {t('ഇമെയിൽ വിലാസം', 'Email Address')}
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@example.com"
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
              {t('റീസെറ്റ് ലിങ്ക് അയക്കൂ', 'Send Reset Link')}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

