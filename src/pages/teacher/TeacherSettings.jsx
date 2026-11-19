import React, { useState } from 'react';
import { ShieldCheck, User, Building, Mail, Database, Settings2, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import Ollie from '../../components/mascot/Ollie';
import Button from '../../components/common/Button';
import soundEffects from '../../utils/soundSynth';
import { isSupabaseConfigured } from '../../services/supabaseClient';

export const TeacherSettings = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const {
    reducedMotion,
    setReducedMotion,
    highContrast,
    setHighContrast,
    soundEnabled,
    setSoundEnabled,
    narrationEnabled,
    setNarrationEnabled
  } = useAccessibility();

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSavePreferences = () => {
    soundEffects.playSuccess();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div>
        <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
          {t('അധ്യാപക പ്രൊഫൈലും ക്രമീകരണങ്ങളും', 'Teacher Profile & Settings')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          {t('ക്രമീകരണങ്ങൾ (Settings)', 'Settings & Account Profile')}
        </h2>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {t('അധ്യാപക അക്കൗണ്ട് വിവരങ്ങളും സിസ്റ്റം സ്റ്റാറ്റസും', 'Manage educator details, accessibility controls and database status')}
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 font-bold text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{t('ക്രമീകരണങ്ങൾ വിജയകരമായി സേവ് ചെയ്തു!', 'Settings saved successfully!')}</span>
        </div>
      )}

      {/* Profile Info Card */}
      <div className="p-6 sm:p-8 rounded-4xl bg-white border-2 border-purple-100 shadow-soft space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-purple-50">
          <div className="w-20 h-20 rounded-3xl bg-pastel-lavender flex items-center justify-center text-4xl shadow-inner">
            {user?.avatar || '👩‍🏫'}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-brand-purple border border-purple-200">
              {user?.role?.toUpperCase()} • AUTHORIZED EDUCATOR
            </span>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              {user?.fullName}
            </h3>
            <p className="text-xs font-bold text-brand-purple">
              {user?.fullName_ml || user?.fullName}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {user?.designation || 'Special Educator & Learning Specialist'}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
          <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100">
            <span className="text-[10px] font-extrabold text-slate-400 block mb-1">
              {t('സ്കൂൾ കോഡ് (School ID)', 'School ID')}
            </span>
            <span className="text-sm font-black text-slate-800">
              {user?.schoolId || 'SCH001'} (Kerala Inclusive Model School)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100">
            <span className="text-[10px] font-extrabold text-slate-400 block mb-1">
              {t('ഔദ്യോഗിക ഇമെയിൽ (Email)', 'Email Address')}
            </span>
            <span className="text-sm font-black text-slate-800">
              {user?.email || 'teacher@school.edu'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 sm:col-span-2">
            <span className="text-[10px] font-extrabold text-slate-400 block mb-1">
              {t('അനുവദിച്ച ഗ്രൂപ്പുകൾ (Authorized Groups)', 'Assigned Curriculum Groups')}
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {['care (കെയർ)', 'primary (പ്രൈമറി)', 'secondary (സെക്കൻഡറി)', 'vocational (വൊക്കേഷണൽ)'].map((g, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-white text-brand-purple border border-purple-200 text-xs font-black">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Database & Supabase Integration Status Card */}
      <div className="p-6 sm:p-8 rounded-4xl bg-white border-2 border-purple-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-brand-purple" />
            <div>
              <h4 className="text-base font-black text-slate-800">
                {t('ഡാറ്റാബേസ് കണക്ഷൻ സ്റ്റാറ്റസ് (Supabase Status)', 'Database Connection Status')}
              </h4>
              <p className="text-xs text-slate-500">
                PostgreSQL schema, RLS policies and local fallback store
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-black border ${
              isSupabaseConfigured
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}
          >
            {isSupabaseConfigured ? 'Live Supabase Connected' : 'Local Persistent Development Mode'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
          {isSupabaseConfigured ? (
            <span className="text-emerald-800 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Connected to live Supabase backend. Tables and RLS policies are active.
            </span>
          ) : (
            <span>
              ℹ️ <strong>Development Mode:</strong> Operating seamlessly with offline local storage persistence. All 36 modules, 4 groups, sample users, assessments, homework, and game results are active. To connect to your remote Supabase instance, update <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env</code> and run migrations from <code>supabase/schema.sql</code>.
            </span>
          )}
        </p>
      </div>

      {/* Accessibility Preferences */}
      <div className="p-6 sm:p-8 rounded-4xl bg-white border-2 border-purple-100 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <Settings2 className="w-6 h-6 text-brand-purple" />
          <h4 className="text-base font-black text-slate-800">
            {t('ഡിസ്‌പ്ലേ & സെൻസറി ക്രമീകരണങ്ങൾ', 'Display & Sensory Controls')}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-purple-100 flex items-center justify-between">
            <span className="text-xs font-black text-slate-700">
              {t('ശബ്ദ പ്രതികരണങ്ങൾ (Sound Effects)', 'Audio Sound Effects')}
            </span>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-5 h-5 accent-brand-purple rounded cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl border border-purple-100 flex items-center justify-between">
            <span className="text-xs font-black text-slate-700">
              {t('മലയാളം ഓഡിയോ വിവരണം (Speech Narration)', 'Malayalam Narration')}
            </span>
            <input
              type="checkbox"
              checked={narrationEnabled}
              onChange={(e) => setNarrationEnabled(e.target.checked)}
              className="w-5 h-5 accent-brand-purple rounded cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl border border-purple-100 flex items-center justify-between">
            <span className="text-xs font-black text-slate-700">
              {t('ശാന്തമായ ചലനം (Reduced Motion)', 'Reduced Motion (ADHD)')}
            </span>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-5 h-5 accent-brand-purple rounded cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl border border-purple-100 flex items-center justify-between">
            <span className="text-xs font-black text-slate-700">
              {t('വ്യക്തമായ നിറങ്ങൾ (High Contrast)', 'High Contrast Mode')}
            </span>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-5 h-5 accent-brand-purple rounded cursor-pointer"
            />
          </div>
        </div>

        <Button variant="purple" onClick={handleSavePreferences} className="mt-4">
          {t('സേവ് ചെയ്യുക', 'Save Settings')}
        </Button>
      </div>
    </div>
  );
};

export default TeacherSettings;

