import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, TrendingUp, Sparkles, Star, ClipboardList, CheckCircle2, User, Volume2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import OllieSpeechBubble from '../../components/mascot/OllieSpeechBubble';
import Card from '../../components/common/Card';
import soundEffects from '../../utils/soundSynth';
import { parentService } from '../../services/parentService';
import { homeworkService } from '../../services/homeworkService';
import { progressService } from '../../services/progressService';

export const ParentDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [child, setChild] = useState(null);
  const [homework, setHomework] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const loadParentData = async () => {
      const ch = await parentService.getLinkedChild(user);
      setChild(ch);
      if (ch?.id) {
        const hw = await homeworkService.getHomeworkForStudent(ch.id);
        setHomework(hw);
        const pr = progressService.getStudentProgress(ch.id);
        setProgress(pr);
      }
    };
    loadParentData();
  }, [user]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Ollie Welcome */}
      <OllieSpeechBubble
        text_ml={`സ്വാഗതം ${user?.fullName || 'മാതാപിതാക്കളെ'}! നിങ്ങളുടെ മകൻ/മകൾ ${child?.fullName || 'ആരവ്'}യുടെ വീട്ടിലെ പഠന പ്രവർത്തനങ്ങളും പുരോഗതിയും ഇവിടെ കാണാം.`}
        text_en={`Welcome ${user?.fullName || 'Parents'}! Support your linked child ${child?.fullName || 'Aarav'} in their joyful learning adventure!`}
        size="lg"
        autoPlay={true}
      />

      {/* Linked Child Card */}
      {child && (
        <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl p-3 bg-white/20 rounded-3xl backdrop-blur-md">
              {child.avatar || '👦'}
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-pink-200 bg-white/20 px-3 py-1 rounded-full">
                {t('ലിങ്ക് ചെയ്ത കുട്ടി (Linked Child)', 'Linked Student')}
              </span>
              <h3 className="text-2xl font-black mt-1">{child.fullName}</h3>
              <p className="text-xs text-pink-100 font-bold">
                {t(child.groupName_ml, child.groupName_en)} • ID: {child.studentIdNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-400 text-slate-900 font-black text-sm shadow-md">
              <Star className="w-5 h-5 fill-current" />
              <span>{progress?.totalStars || child.stars || 15} Stars</span>
            </div>

            <Link
              to="/parent/progress"
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs transition-colors"
            >
              {t('പൂർണ്ണ പുരോഗതി', 'Full Report')}
            </Link>
          </div>
        </div>
      )}

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/parent/activities"
          onClick={() => soundEffects.playPop()}
          className="p-6 rounded-4xl bg-white border-2 border-pink-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-slate-800">
              {t('വീട്ടുപരിശീലനങ്ങൾ (Home Practice)', 'Home Practice Activities')}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {t('മലയാളം ഓഡിയോ വിവരണത്തോടൊപ്പം വീട്ടിൽ ചെയ്യാവുന്ന ലളിത കാര്യങ്ങൾ.', 'Simple activities with Malayalam audio narration.')}
            </p>
          </div>
          <span className="text-xs font-black text-pink-600 mt-4 flex items-center gap-1">
            {t('തുടങ്ങാം →', 'Explore →')}
          </span>
        </Link>

        <Link
          to="/parent/homework"
          onClick={() => soundEffects.playPop()}
          className="p-6 rounded-4xl bg-white border-2 border-purple-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-brand-purple mb-3">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-slate-800">
              {t('ഹോംവർക്ക് പരിശോധന', 'Homework View')}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {t('ടീച്ചർ നൽകിയ വ്യക്തിഗത ഹോംവർക്കുകളും ഫീഡ്‌ബാക്കും കാണാം.', 'View assigned homework and teacher star ratings.')}
            </p>
          </div>
          <span className="text-xs font-black text-brand-purple mt-4 flex items-center gap-1">
            {t('തുടങ്ങാം →', 'Explore →')}
          </span>
        </Link>

        <Link
          to="/parent/progress"
          onClick={() => soundEffects.playPop()}
          className="p-6 rounded-4xl bg-white border-2 border-emerald-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-slate-800">
              {t('കുട്ടിയുടെ വളർച്ച', 'Growth & Assessments')}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {t('ടീച്ചറുടെ വിലയിരുത്തലുകളും പൂന്തോട്ടത്തിലെ വികാസവും.', 'Official assessment results & garden flower bloom.')}
            </p>
          </div>
          <span className="text-xs font-black text-emerald-600 mt-4 flex items-center gap-1">
            {t('തുടങ്ങാം →', 'Explore →')}
          </span>
        </Link>
      </div>

      {/* Homework Summary Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-800">
            {t('കുട്ടിയുടെ സമീപകാല ഹോംവർക്കുകൾ', 'Recent Homework Tasks')}
          </h3>
          <Link to="/parent/homework" className="text-xs font-black text-pink-600 hover:underline">
            {t('എല്ലാം കാണുക →', 'View All →')}
          </Link>
        </div>

        <div className="grid gap-3">
          {homework.slice(0, 2).map((hw) => (
            <div
              key={hw.id}
              className="p-5 rounded-3xl bg-white border-2 border-purple-100 shadow-sm flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-brand-purple">
                  {hw.status}
                </span>
                <h4 className="text-base font-black text-slate-800 mt-1">
                  {hw.lessonTitle_ml || hw.moduleTitle_ml}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {hw.instructions_ml}
                </p>
              </div>

              {hw.starsAwarded > 0 && (
                <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-black">
                  <Star className="w-4 h-4 fill-current text-amber-500" />
                  <span>{hw.starsAwarded} Stars</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;

