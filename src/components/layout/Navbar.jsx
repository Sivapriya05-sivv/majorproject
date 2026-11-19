import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Tv, Star, User, BookOpen, Sparkles, Home, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from '../common/LanguageToggle';
import AccessibilityBar from '../common/AccessibilityBar';
import Ollie from '../mascot/Ollie';
import soundEffects from '../../utils/soundSynth';

export const Navbar = () => {
  const { user, role, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    soundEffects.playPop();
    await logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (role === 'teacher') return '/teacher/dashboard';
    if (role === 'student') return '/student/dashboard';
    if (role === 'parent') return '/parent/dashboard';
    return '/welcome';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand & Ollie */}
        <Link
          to={getDashboardLink()}
          onClick={() => soundEffects.playPop()}
          className="flex items-center gap-3 group focus-visible:ring-2"
        >
          <Ollie state="happy" size="sm" className="group-hover:scale-110 transition-transform" />
          <div className="leading-tight">
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-brand-purple to-pink-500 bg-clip-text text-transparent">
              ADHD World
            </h1>
            <p className="text-[11px] font-bold text-slate-500 hidden sm:block">
              {t('പ്രത്യേക വിദ്യാഭ്യാസ ലോകം', 'Special Education Learning')}
            </p>
          </div>
        </Link>

        {/* Center / Role Nav Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {role === 'student' && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border-2 border-amber-300 rounded-full text-amber-900 font-extrabold text-sm shadow-sm">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{user?.stars || 12} {t('നക്ഷത്രങ്ങൾ', 'Stars')}</span>
            </div>
          )}

          {role === 'teacher' && (
            <Link
              to="/classroom-tv"
              onClick={() => soundEffects.playPop()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-purple to-indigo-600 text-white rounded-2xl font-extrabold text-sm shadow-bubbly-purple hover:scale-105 transition-all"
              title="Launch Classroom TV Large Screen Mode"
            >
              <Tv className="w-4 h-4" />
              <span className="hidden md:inline">{t('ക്ലാസ്സ് റൂം ടിവി', 'Classroom TV')}</span>
            </Link>
          )}

          {/* Language Switcher */}
          <LanguageToggle />

          {/* Accessibility Quick Menu */}
          <AccessibilityBar />

          {/* User & Logout */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-purple-100">
              <span className="text-xs font-bold text-slate-700 hidden lg:inline max-w-[120px] truncate">
                {user.fullName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-2xl bg-purple-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                title={t('പുറത്തു കടക്കുക', 'Logout')}
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/welcome"
              className="px-4 py-2 rounded-2xl bg-brand-purple text-white font-bold text-sm hover:bg-brand-purpleHover"
            >
              {t('പ്രവേശിക്കുക', 'Login')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

