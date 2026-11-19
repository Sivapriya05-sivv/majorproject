import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Sparkles, HeartHandshake, ArrowRight, ShieldCheck } from 'lucide-react';
import OllieSpeechBubble from '../../components/mascot/OllieSpeechBubble';
import LanguageToggle from '../../components/common/LanguageToggle';
import AccessibilityBar from '../../components/common/AccessibilityBar';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import soundEffects from '../../utils/soundSynth';
import { SAMPLE_SCHOOL } from '../../data/sampleUsers';

export const WelcomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { loginTeacher, loginStudent, loginParent } = useAuth();

  const handleQuickDemo = async (roleType) => {
    soundEffects.playPop();
    if (roleType === 'teacher') {
      await loginTeacher('SCH001', 'teacher@school.edu', 'password123');
      navigate('/teacher/dashboard');
    } else if (roleType === 'student') {
      await loginStudent('SCH001', 'STU101', 'student123');
      navigate('/student/dashboard');
    } else if (roleType === 'parent') {
      await loginParent('parent@gmail.com', 'parent123');
      navigate('/parent/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/60 via-[#FDFDFE] to-pink-50/40 flex flex-col">
      {/* Top Bar */}
      <header className="p-4 sm:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🦉</span>
          <div>
            <h1 className="text-xl font-black text-brand-purple">ADHD Learning World</h1>
            <p className="text-xs font-bold text-slate-500">Inclusive Kerala Curriculum</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <AccessibilityBar />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full flex flex-col items-center justify-center space-y-8">
        <OllieSpeechBubble
          text_ml="നമസ്കാരം! ഞാൻ ഒല്ലി. നമ്മുടെ പ്രത്യേക വിദ്യാഭ്യാസ ലോകത്തിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ ലോഗിൻ തിരഞ്ഞെടുക്കൂ!"
          text_en="Hello! I am Ollie. Welcome to our ADHD Learning World! Please select your login below."
          size="lg"
          autoPlay={true}
          className="max-w-2xl w-full"
        />

        {/* 3 Large Role Gateways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          {/* 1. Student Portal */}
          <div className="group relative p-7 rounded-4xl bg-gradient-to-b from-amber-50 to-orange-50 border-3 border-amber-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-2 transition-all flex flex-col justify-between text-center">
            <div>
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 flex items-center justify-center text-4xl shadow-md mb-4 group-hover:scale-110 transition-transform">
                👦
              </div>

              <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full border border-amber-200">
                {t('വിദ്യാർത്ഥികൾക്കായി', 'For Students')}
              </span>

              <h3 className="text-2xl font-black text-slate-800 mt-3 mb-1">
                {t('വിദ്യാർത്ഥി ലോഗിൻ', 'Student Login')}
              </h3>

              <p className="text-xs font-bold text-slate-600 leading-relaxed mb-6">
                {t('സ്കൂൾ ഐഡി + സ്റ്റുഡന്റ് ഐഡി + പാസ്‌വേഡ് ഉപയോഗിച്ച് കളിച്ചു പഠിക്കാം!', 'School ID + Student ID + Password to play and learn!')}
              </p>
            </div>

            <div className="space-y-2">
              <Link
                to="/login/student"
                onClick={() => soundEffects.playPop()}
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-sm shadow-bubbly-yellow flex items-center justify-center gap-2 active:translate-y-1 transition-all"
              >
                <span>{t('പ്രവേശിക്കുക', 'Student Login')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="w-full text-xs font-black text-amber-800 hover:underline py-1"
              >
                {t('⚡ ആരവ് (Aarav Demo Login)', '⚡ Quick Demo (Aarav)')}
              </button>
            </div>
          </div>

          {/* 2. Teacher Portal */}
          <div className="group relative p-7 rounded-4xl bg-gradient-to-b from-purple-50 to-indigo-50 border-3 border-purple-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-2 transition-all flex flex-col justify-between text-center">
            <div>
              <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-purple flex items-center justify-center text-4xl text-white shadow-md mb-4 group-hover:scale-110 transition-transform">
                👩‍🏫
              </div>

              <span className="text-[11px] font-black text-purple-900 uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full border border-purple-200">
                {t('അധ്യാപകർക്കായി', 'For Teachers')}
              </span>

              <h3 className="text-2xl font-black text-slate-800 mt-3 mb-1">
                {t('അധ്യാപക ലോഗിൻ', 'Teacher Login')}
              </h3>

              <p className="text-xs font-bold text-slate-600 leading-relaxed mb-6">
                {t('സ്കൂൾ ഐഡി + ഇമെയിൽ + പാസ്‌വേഡ്. ക്ലാസ്സ്റൂം ടിവി & മൂല്യനിർണ്ണയം.', 'School ID + Email + Password. Classroom TV & Individual Assessments.')}
              </p>
            </div>

            <div className="space-y-2">
              <Link
                to="/login/teacher"
                onClick={() => soundEffects.playPop()}
                className="w-full py-3.5 px-4 rounded-2xl bg-brand-purple hover:bg-brand-purpleHover text-white font-black text-sm shadow-bubbly-purple flex items-center justify-center gap-2 active:translate-y-1 transition-all"
              >
                <span>{t('പ്രവേശിക്കുക', 'Teacher Login')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => handleQuickDemo('teacher')}
                className="w-full text-xs font-black text-brand-purple hover:underline py-1"
              >
                {t('⚡ പ്രിയ ടീച്ചർ (Demo Login)', '⚡ Quick Demo (Teacher Priya)')}
              </button>
            </div>
          </div>

          {/* 3. Parent Portal */}
          <div className="group relative p-7 rounded-4xl bg-gradient-to-b from-pink-50 to-rose-50 border-3 border-pink-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-2 transition-all flex flex-col justify-between text-center">
            <div>
              <div className="w-20 h-20 mx-auto rounded-3xl bg-pink-500 flex items-center justify-center text-4xl text-white shadow-md mb-4 group-hover:scale-110 transition-transform">
                👨‍👩‍👧
              </div>

              <span className="text-[11px] font-black text-pink-900 uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full border border-pink-200">
                {t('രക്ഷിതാക്കൾക്കായി', 'For Parents')}
              </span>

              <h3 className="text-2xl font-black text-slate-800 mt-3 mb-1">
                {t('രക്ഷിതാക്കളുടെ ലോഗിൻ', 'Parent Login')}
              </h3>

              <p className="text-xs font-bold text-slate-600 leading-relaxed mb-6">
                {t('കുട്ടിയുടെ ഹോംവർക്കും വളർച്ചയും വീട്ടിലിരുന്ന് കാണാം!', 'Linked child homework, home activities and progress tracking.')}
              </p>
            </div>

            <div className="space-y-2">
              <Link
                to="/login/parent"
                onClick={() => soundEffects.playPop()}
                className="w-full py-3.5 px-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-black text-sm shadow-bubbly-pink flex items-center justify-center gap-2 active:translate-y-1 transition-all"
              >
                <span>{t('പ്രവേശിക്കുക', 'Parent Login')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => handleQuickDemo('parent')}
                className="w-full text-xs font-black text-pink-700 hover:underline py-1"
              >
                {t('⚡ ലക്ഷ്മി (Demo Parent)', '⚡ Quick Demo (Parent Lakshmi)')}
              </button>
            </div>
          </div>
        </div>

        {/* Institution Info */}
        <div className="p-4 rounded-3xl bg-white border border-purple-100 shadow-sm flex items-center gap-3 text-xs font-bold text-slate-600 text-center">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>
            {t(`മാതൃകാ സ്കൂൾ കോഡ്: "${SAMPLE_SCHOOL.code}" (${SAMPLE_SCHOOL.name_ml})`, `Sample Institution Code: "${SAMPLE_SCHOOL.code}" (${SAMPLE_SCHOOL.name})`)}
          </span>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;

