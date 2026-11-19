import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, CheckSquare, ClipboardList, TrendingUp, Tv, Award } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const TeacherLayout = () => {
  const { t } = useLanguage();

  const navLinks = [
    { to: '/teacher/dashboard', label: t('ഡാഷ്‌ബോർഡ്', 'Dashboard'), icon: LayoutDashboard },
    { to: '/teacher/students', label: t('കുട്ടികൾ', 'Students'), icon: Users },
    { to: '/teacher/modules', label: t('പാഠ്യവിഭാഗങ്ങൾ (36)', 'Modules (36)'), icon: BookOpen },
    { to: '/teacher/assessments', label: t('വ്യക്തിഗത വിലയിരുത്തൽ', 'Assessments'), icon: CheckSquare },
    { to: '/teacher/homework', label: t('വ്യക്തിഗത ഹോംവർക്ക്', 'Individual HW'), icon: ClipboardList },
    { to: '/teacher/submissions', label: t('സമർപ്പണങ്ങൾ', 'Submissions'), icon: Award },
    { to: '/teacher/progress', label: t('പുരോഗതി', 'Progress'), icon: TrendingUp },
    { to: '/classroom-tv', label: t('ക്ലാസ്സ് റൂം ടിവി', 'Classroom TV'), icon: Tv, highlight: true }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFD]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="sticky top-24 bg-white p-3 rounded-4xl border border-purple-100 shadow-soft space-y-1.5">
            <div className="px-3 py-2 text-xs font-black text-purple-900/60 uppercase tracking-wider">
              {t('അധ്യാപക പോർട്ടൽ', 'Teacher Portal')}
            </div>

            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => soundEffects.playPop()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-150 ${
                      item.highlight
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-bubbly-purple hover:scale-102'
                        : isActive
                        ? 'bg-brand-purple text-white shadow-md'
                        : 'text-slate-600 hover:bg-purple-50 hover:text-brand-purple'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TeacherLayout;

