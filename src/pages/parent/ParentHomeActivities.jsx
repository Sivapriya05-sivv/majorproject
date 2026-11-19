import React from 'react';
import { HeartHandshake, Volume2, Sparkles, Smile, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import AudioButton from '../../components/common/AudioButton';
import soundEffects from '../../utils/soundSynth';

export const ParentHomeActivities = () => {
  const { t } = useLanguage();

  const activities = [
    {
      id: 1,
      title_ml: 'പേര് വിളിക്കലും സ്നേഹത്തോടെയുള്ള നോട്ടവും',
      title_en: 'Name Response with Eye Contact',
      emoji: '👀',
      instructions_ml: 'കുട്ടിയെ പേര് വിളിച്ച് നോക്കുമ്പോൾ കെട്ടിപ്പിടിച്ച് പുഞ്ചിരിക്കുക. സ്വന്തം ഫോട്ടോ കാണിച്ചു പേര് ആവർത്തിക്കുക.',
      instructions_en: 'Call child by name softly. Give a warm smile and hug when child makes eye contact.',
      targetSkill: 'സ്വയം തിരിച്ചറിയൽ (Self-Identity)'
    },
    {
      id: 2,
      title_ml: 'പഴങ്ങൾ തൊട്ടും രുചിച്ചും അറിയൽ',
      title_en: 'Tactile Fruit Tasting',
      emoji: '🍎',
      instructions_ml: 'ആപ്പിൾ, വാഴപ്പഴം എന്നിവ തൊട്ടു നോക്കാനും അവയുടെ നിറവും മണവും അനുഭവിക്കാനും കുട്ടിയെ സഹായിക്കുക.',
      instructions_en: 'Let child feel the skin texture and aroma of fresh fruits before eating.',
      targetSkill: 'ഇന്ദ്രിയ പരിശീലനം (Sensory Exploration)'
    },
    {
      id: 3,
      title_ml: 'വീട്ടുപകരണങ്ങൾ എണ്ണൽ (1 മുതൽ 5 വരെ)',
      title_en: 'Counting Spoons at Dining Table',
      emoji: '🥄',
      instructions_ml: 'ഭക്ഷണത്തിന് മുൻപ് 5 സ്പൂണുകൾ കുട്ടിയോടൊപ്പം എണ്ണി വയ്ക്കുക. കൈയടിച്ച് പ്രോത്സാഹിപ്പിക്കുക.',
      instructions_en: 'Count 5 spoons or plates together before mealtime to develop real-life counting sense.',
      targetSkill: 'നിത്യജീവിത ഗണിതം (Everyday Math)'
    },
    {
      id: 4,
      title_ml: 'ശാന്തമായ ശ്വാസോച്ഛ്വാസം (ഓഡിയോ സഹിതം)',
      title_en: 'Calming Breath Together',
      emoji: '🌸',
      instructions_ml: 'പൂവിന്റെ സുഗന്ധം ശ്വസിക്കുന്നത് പോലെ ദീർഘമായി ശ്വാസമെടുത്ത് മെല്ലെ പുറത്തുവിടാൻ സഹായിക്കുക.',
      instructions_en: 'Inhale slowly imagining smelling a rose, and exhale softly like blowing out a candle.',
      targetSkill: 'മാനസിക ശാന്തത (ADHD Calming)'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-black text-pink-600 uppercase tracking-wider">
          {t('വീട്ടുപരിശീലനങ്ങൾ', 'Home Learning Support')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          {t('രക്ഷിതാക്കൾക്കുള്ള ലളിതമായ മാർഗ്ഗനിർദ്ദേശങ്ങൾ', 'Parent Practice Guides')}
        </h2>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {t('മലയാളം ഓഡിയോ വിശദീകരണത്തോടൊപ്പം വീട്ടിൽ ചെയ്യാവുന്ന ലളിത പ്രവർത്തനങ്ങൾ', 'Simple, loving home learning activities with Malayalam audio narration')}
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid gap-4">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-6 rounded-4xl bg-white border-2 border-pink-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl p-3 bg-pink-50 rounded-3xl border border-pink-100 flex-shrink-0">
                {act.emoji}
              </span>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-brand-purple">
                  {act.targetSkill}
                </span>
                <h3 className="text-base font-black text-slate-800">
                  {act.title_ml}
                </h3>
                <p className="text-xs font-bold text-slate-500">
                  {act.title_en}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  💡 {act.instructions_ml}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 self-end md:self-center">
              <AudioButton text={act.instructions_ml} size="md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentHomeActivities;

