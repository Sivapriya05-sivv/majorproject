import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { HeartHandshake, TrendingUp, Home, ClipboardList } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const ParentLayout = () => {
  const { t } = useLanguage();

  const parentLinks = [
    { to: '/parent/dashboard', label: t('മാതൃ-പിതൃ ഡാഷ്‌ബോർഡ്', 'Parent Hub'), icon: Home },
    { to: '/parent/progress', label: t('കുട്ടിയുടെ പുരോഗതി', "Child's Progress"), icon: TrendingUp },
    { to: '/parent/activities', label: t('വീട്ടുപരിശീലനങ്ങൾ', 'Home Activities'), icon: HeartHandshake },
    { to: '/parent/homework', label: t('ഹോംവർക്ക് പരിശോധന', 'Homework View'), icon: ClipboardList }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-white border-b border-purple-100 py-3 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-around gap-2 overflow-x-auto">
          {parentLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => soundEffects.playPop()}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-brand-purple text-white shadow-md'
                      : 'text-slate-600 hover:bg-purple-50'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
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

export default ParentLayout;

