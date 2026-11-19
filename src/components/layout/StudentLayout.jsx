import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Map, Gamepad2, Sparkles, BookOpen, Flower2, ClipboardList } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const StudentLayout = () => {
  const { t } = useLanguage();

  const studentLinks = [
    { to: '/student/dashboard', label: t('എന്റെ ദിനം', 'My Day'), icon: Sparkles, color: 'text-amber-500' },
    { to: '/student/adventure', label: t('സാഹസിക മാപ്പ്', 'Map'), icon: Map, color: 'text-purple-600' },
    { to: '/student/games', label: t('കളികൾ (15)', 'Games'), icon: Gamepad2, color: 'text-emerald-500' },
    { to: '/student/homework', label: t('ഹോംവർക്ക്', 'Homework'), icon: ClipboardList, color: 'text-sky-500' },
    { to: '/student/garden', label: t('പൂന്തോട്ടം', 'Garden'), icon: Flower2, color: 'text-pink-500' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FE]">
      <Navbar />

      {/* Child-Friendly Top/Bottom Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 py-3 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-around gap-2 overflow-x-auto">
          {studentLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => soundEffects.playPop()}
                className={({ isActive }) =>
                  `flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-3xl text-sm font-extrabold transition-all duration-150 min-w-[70px] ${
                    isActive
                      ? 'bg-brand-purple text-white shadow-bubbly-purple scale-105'
                      : 'text-slate-600 hover:bg-purple-100/60'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default StudentLayout;

