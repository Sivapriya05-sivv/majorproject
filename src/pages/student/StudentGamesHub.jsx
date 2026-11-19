import React, { useState } from 'react';
import { Gamepad2, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import GameCard from '../../components/cards/GameCard';
import { GAMES_CATALOG } from '../../data/gamesCatalog';
import soundEffects from '../../utils/soundSynth';

export const StudentGamesHub = () => {
  const { t } = useLanguage();
  const [filterGroup, setFilterGroup] = useState('all');

  const filteredGames = filterGroup === 'all'
    ? GAMES_CATALOG
    : GAMES_CATALOG.filter(g => g.group === filterGroup);

  const handleFilter = (code) => {
    soundEffects.playPop();
    setFilterGroup(code);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
            {t('പഠന കളികൾ (15 Playable Games)', 'Educational Games Hub (15 Games)')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {t('കളിച്ചു പഠിക്കാം (Games Hub)', 'Play and Learn Games')}
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-1">
            {t('നിങ്ങൾക്ക് ഇഷ്ടമുള്ള കളി തിരഞ്ഞെടുക്കൂ! നക്ഷത്രങ്ങൾ സ്വന്തമാക്കൂ!', 'Choose any game to build skills and collect stars!')}
          </p>
        </div>

        <span className="px-4 py-2 rounded-2xl bg-pink-100 text-pink-800 font-black text-xs">
          {filteredGames.length} {t('കളികൾ', 'Games')}
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'care', 'primary', 'secondary', 'vocational'].map((grp) => (
          <button
            key={grp}
            onClick={() => handleFilter(grp)}
            className={`px-4 py-2 rounded-2xl text-xs font-black uppercase transition-all ${
              filterGroup === grp
                ? 'bg-pink-500 text-white shadow-bubbly-pink'
                : 'bg-white hover:bg-pink-50 text-slate-700 border border-purple-100'
            }`}
          >
            {grp === 'all' ? t('എല്ലാം (15)', 'All (15)') : grp}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((game) => (
          <GameCard key={game.code} game={game} />
        ))}
      </div>
    </div>
  );
};

export default StudentGamesHub;

