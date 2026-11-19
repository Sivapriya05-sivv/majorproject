import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Map, Gamepad2, Sparkles, Star, Trophy, ArrowRight, Flower2, ClipboardList } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import OllieSpeechBubble from '../../components/mascot/OllieSpeechBubble';
import ModuleCard from '../../components/cards/ModuleCard';
import soundEffects from '../../utils/soundSynth';
import { getModulesByGroup } from '../../data/modulesData';
import { homeworkService } from '../../services/homeworkService';
import { progressService } from '../../services/progressService';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const groupCode = user?.groupCode || 'care';
  const groupModules = getModulesByGroup(groupCode);
  const currentModule = groupModules[0] || { id: 'care-m01', title_ml: 'പാഠം 1' };

  const [homework, setHomework] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (user?.id) {
      homeworkService.getHomeworkForStudent(user.id).then(setHomework);
      const prog = progressService.getStudentProgress(user.id);
      setProgress(prog);
    }
  }, [user]);

  const pendingHw = homework.filter(h => h.status === 'assigned');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Ollie Welcome Narration */}
      <OllieSpeechBubble
        text_ml={`ഹലോ ${user?.fullName_ml || user?.fullName || 'കൂട്ടുകാരാ'}! ഇന്ന് നമുക്ക് പുതിയ പാഠങ്ങളും കളികളും പഠിക്കാം! ഒല്ലി കൂടെയുണ്ട്.`}
        text_en={`Hello ${user?.fullName || 'friend'}! Ready for today's learning adventure with Ollie? Let's explore together!`}
        size="lg"
        autoPlay={true}
      />

      {/* Hero Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Continue Adventure Map */}
        <Link
          to="/student/adventure"
          onClick={() => soundEffects.playPop()}
          className="p-6 rounded-4xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-bubbly-purple hover:scale-103 active:translate-y-1 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-3xl bg-white/20 flex items-center justify-center text-3xl mb-4">
              🗺️
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-200">
              {t('സാഹസിക പാത', 'Learning Path')}
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              {t('സാഹസിക മാപ്പ്', 'Adventure Map')}
            </h3>
            <p className="text-xs text-purple-100/90 mt-1">
              {t('ഘട്ടം ഘട്ടമായി നക്ഷത്രങ്ങൾ സ്വന്തമാക്കൂ!', 'Journey through stages and unlock stars!')}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 mt-4">
            <span>{t('തുടങ്ങാം', 'Explore Map')}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* 2. Playable Games Hub */}
        <Link
          to="/student/games"
          onClick={() => soundEffects.playPop()}
          className="p-6 rounded-4xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-bubbly-pink hover:scale-103 active:translate-y-1 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-3xl bg-white/20 flex items-center justify-center text-3xl mb-4">
              🎮
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-pink-200">
              {t('15 രസകരമായ കളികൾ', '15 Interactive Games')}
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              {t('ഗെയിം ഹബ്ബ്', 'Games Hub')}
            </h3>
            <p className="text-xs text-pink-100/90 mt-1">
              {t('ബലൂൺ പൊട്ടിക്കൽ, പഴക്കൂട, മെമ്മറി കാർഡുകൾ...', 'Balloon pop, memory match, fruit catcher...')}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 mt-4">
            <span>{t('കളിക്കാം', 'Play Games')}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* 3. Progress Garden */}
        <Link
          to="/student/garden"
          onClick={() => soundEffects.playPop()}
          className="p-6 rounded-4xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-bubbly-mint hover:scale-103 active:translate-y-1 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-3xl bg-white/20 flex items-center justify-center text-3xl mb-4">
              🌸
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200">
              {t('പ്രോഗ്രസ്സ് ഗാർഡൻ', 'My Garden')}
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              {t('പൂന്തോട്ടം', 'Progress Garden')}
            </h3>
            <p className="text-xs text-emerald-100/90 mt-1">
              {t('പഠിക്കുമ്പോൾ പൂന്തോട്ടത്തിൽ പുതിയ പൂക്കൾ വിരിയുന്നു!', 'Nurture flowers with your learning stars!')}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 mt-4">
            <span>{t('പൂന്തോട്ടം കാണാം', 'Visit Garden')}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* Pending Homework Alert if any */}
      {pendingHw.length > 0 && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📝</span>
            <div>
              <h4 className="text-base font-black text-amber-950">
                {t(`ടീച്ചർ നൽകിയ ഹോംവർക്ക് ഉണ്ട് (${pendingHw.length} എണ്ണം)`, `You have ${pendingHw.length} assigned homework task(s)`)}
              </h4>
              <p className="text-xs font-bold text-amber-800">
                {pendingHw[0].lessonTitle_ml || pendingHw[0].moduleTitle_ml}
              </p>
            </div>
          </div>

          <Link
            to="/student/homework"
            onClick={() => soundEffects.playPop()}
            className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs shadow-md"
          >
            {t('ചെയ്യാം', 'Open Homework')}
          </Link>
        </div>
      )}

      {/* Current Learning Modules for Student's Group */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-black text-slate-800">
              {t(`എന്റെ പഠനവിഭാഗങ്ങൾ (${groupModules.length})`, `My Learning Modules (${groupModules.length})`)}
            </h3>
            <p className="text-xs font-bold text-slate-500">
              {t('നിങ്ങളുടെ ഗ്രൂപ്പിലെ പാഠങ്ങൾ ഒല്ലിയോടൊപ്പം പഠിക്കാം', 'Modules assigned to your learning group')}
            </p>
          </div>

          <Link to="/student/adventure" className="text-xs font-black text-brand-purple hover:underline">
            {t('സാഹസിക മാപ്പ് →', 'Adventure Map →')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groupModules.map((m) => (
            <ModuleCard
              key={m.id}
              module={m}
              role="student"
              isCompleted={true}
              starsEarned={3}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

