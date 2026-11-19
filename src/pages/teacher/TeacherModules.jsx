import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Sparkles, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import ModuleCard from '../../components/cards/ModuleCard';
import { ALL_MODULES } from '../../data/modulesData';
import { LEARNING_GROUPS } from '../../data/groupsData';
import soundEffects from '../../utils/soundSynth';

export const TeacherModules = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGroup = searchParams.get('group') || 'all';
  const [selectedGroup, setSelectedGroup] = useState(initialGroup);

  useEffect(() => {
    const grp = searchParams.get('group');
    if (grp) setSelectedGroup(grp);
  }, [searchParams]);

  const handleGroupFilter = (groupCode) => {
    soundEffects.playPop();
    setSelectedGroup(groupCode);
    if (groupCode === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ group: groupCode });
    }
  };

  const filteredModules = selectedGroup === 'all'
    ? ALL_MODULES
    : ALL_MODULES.filter(m => m.groupCode === selectedGroup);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-brand-purple uppercase tracking-wider">
            {t('പാഠ്യവിഭാഗങ്ങൾ (All 36 Modules)', 'Textbook Curriculum (36 Modules)')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {t('പൂർണ്ണ പാഠ്യപദ്ധതി', 'Inclusive Special Education Modules')}
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-1">
            {t('കെയർ (11), പ്രൈമറി (7), സെക്കൻഡറി (9), വൊക്കേഷണൽ (9)', 'Care Group (11), Primary (7), Secondary (9), Vocational (9)')}
          </p>
        </div>

        <span className="px-4 py-2 rounded-2xl bg-purple-100 text-brand-purple font-black text-xs">
          {filteredModules.length} {t('മോഡ്യൂളുകൾ', 'Modules Listed')}
        </span>
      </div>

      {/* Group Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => handleGroupFilter('all')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
            selectedGroup === 'all'
              ? 'bg-brand-purple text-white shadow-bubbly-purple'
              : 'bg-white hover:bg-purple-50 text-slate-700 border border-purple-100'
          }`}
        >
          {t('എല്ലാം (36)', 'All Groups (36)')}
        </button>

        {LEARNING_GROUPS.map((grp) => (
          <button
            key={grp.code}
            onClick={() => handleGroupFilter(grp.code)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all ${
              selectedGroup === grp.code
                ? 'bg-brand-purple text-white shadow-bubbly-purple'
                : 'bg-white hover:bg-purple-50 text-slate-700 border border-purple-100'
            }`}
          >
            {t(grp.name_ml, grp.name_en)} ({grp.moduleCount})
          </button>
        ))}
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModules.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            role="teacher"
            isCompleted={true}
            starsEarned={3}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherModules;

