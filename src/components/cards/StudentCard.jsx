import React from 'react';
import { Star, Award, CheckSquare, ClipboardPlus } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import soundEffects from '../../utils/soundSynth';

export const StudentCard = ({ student, onAssess, onAssignHomework, onClick }) => {
  const { t } = useLanguage();

  return (
    <div
      onClick={onClick}
      className="p-5 rounded-4xl bg-white border-2 border-purple-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top: Avatar & Student ID */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-purple-50 rounded-2xl border border-purple-100">
              {student.avatar || '👦'}
            </span>
            <div>
              <h4 className="text-base font-extrabold text-slate-800 leading-tight">
                {student.fullName}
              </h4>
              <p className="text-xs font-semibold text-brand-purple">
                {student.fullName_ml || student.fullName}
              </p>
            </div>
          </div>

          <span className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600">
            {student.studentIdNumber}
          </span>
        </div>

        {/* Group & Stars Info */}
        <div className="flex items-center justify-between text-xs font-bold py-2 px-3 bg-purple-50/60 rounded-2xl mb-4">
          <span className="text-purple-800">
            {t(student.groupName_ml, student.groupName_en)}
          </span>
          <span className="flex items-center gap-1 text-amber-700">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            {student.stars || 10} {t('നക്ഷത്രം', 'Stars')}
          </span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-50 text-xs font-bold">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            soundEffects.playPop();
            if (onAssess) onAssess(student);
          }}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-brand-purple transition-colors"
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>{t('വിലയിരുത്തുക', 'Assess')}</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            soundEffects.playPop();
            if (onAssignHomework) onAssignHomework(student);
          }}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors"
        >
          <ClipboardPlus className="w-3.5 h-3.5" />
          <span>{t('ഹോംവർക്ക്', 'Homework')}</span>
        </button>
      </div>
    </div>
  );
};

export default StudentCard;

