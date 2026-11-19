import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Ollie from '../../components/mascot/Ollie';
import soundEffects from '../../utils/soundSynth';
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles, Star } from 'lucide-react';

export const SplashScreen = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  useEffect(() => {
    soundEffects.playStar();

    const timer = setTimeout(() => {
      if (user) {
        if (role === 'teacher') navigate('/teacher/dashboard');
        else if (role === 'student') navigate('/student/dashboard');
        else if (role === 'parent') navigate('/parent/dashboard');
        else navigate('/welcome');
      } else {
        navigate('/welcome');
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigate, user, role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lavender via-purple-100 to-pastel-pink flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden relative">
      {/* Decorative stars */}
      <div className="absolute top-12 left-16 text-amber-400 animate-gentle-bounce">
        <Star className="w-10 h-10 fill-amber-300" />
      </div>
      <div className="absolute bottom-16 right-20 text-pink-400 animate-gentle-pulse">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md animate-scaleUp">
        <Ollie state="happy" size="xl" className="animate-gentle-bounce mb-6" />

        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 text-brand-purple text-xs font-black border border-purple-200 shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Inclusive Learning Platform</span>
        </span>

        <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-brand-purple via-indigo-600 to-pink-600 bg-clip-text text-transparent">
          ADHD Learning World
        </h1>

        <p className="text-base sm:text-lg font-bold text-purple-900 mt-2">
          പ്രത്യേക വിദ്യാഭ്യാസ ലോകം
        </p>
        <p className="text-xs font-bold text-slate-500 mt-1">
          Special Education Platform with Ollie
        </p>

        {/* Loading dots */}
        <div className="flex items-center gap-2 mt-8">
          <div className="w-3.5 h-3.5 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3.5 h-3.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3.5 h-3.5 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

