import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto bg-white border-t border-purple-100 py-6 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <span>🦉 ADHD Learning World</span>
          <span>•</span>
          <span>{t('കേരള മാതൃകാ സമഗ്ര വിദ്യാഭ്യാസ പദ്ധതി', 'Kerala Model Inclusive Special Education')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-purple-700">
          <span>{t('സ്നേഹത്തോടും ശ്രദ്ധയോടും ഒല്ലി ഒരുക്കിയത്', 'Crafted with care and patience with Ollie')}</span>
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500 inline" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

