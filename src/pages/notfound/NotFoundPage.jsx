import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Ollie from '../../components/mascot/Ollie';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FBFBFE] flex flex-col items-center justify-center p-6 text-center">
      <Ollie state="thinking" size="lg" className="mb-4" />
      <h2 className="text-4xl font-black text-slate-800 mb-2">404</h2>
      <h3 className="text-xl font-extrabold text-brand-purple mb-2">
        {t('പേജ് കണ്ടെത്താനായില്ല', 'Page Not Found')}
      </h3>
      <p className="text-xs text-slate-500 max-w-sm mb-6">
        {t(
          'നിങ്ങൾ തിരഞ്ഞ പേജ് ലഭ്യമല്ല. ഒല്ലിയോടൊപ്പം സ്വാഗത പേജിലേക്ക് മടങ്ങാം!',
          'The page you are looking for does not exist. Let us return to safety with Ollie!'
        )}
      </p>

      <Link
        to="/welcome"
        onClick={() => soundEffects.playPop()}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-purple hover:bg-brand-purpleHover text-white font-black text-sm shadow-bubbly-purple"
      >
        <Home className="w-4 h-4" />
        <span>{t('സ്വാഗത പേജിലേക്ക്', 'Return Home')}</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;

