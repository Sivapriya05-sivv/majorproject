import React from 'react';

export const ProgressBar = ({ current = 0, total = 10, label = '', color = 'purple', className = '' }) => {
  const percentage = Math.min(100, Math.round((current / (total || 1)) * 100));

  const colors = {
    purple: 'bg-brand-purple',
    sky: 'bg-sky-500',
    mint: 'bg-emerald-500',
    yellow: 'bg-amber-400',
    pink: 'bg-pink-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="w-full h-3.5 bg-purple-100 rounded-full overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors[color] || colors.purple}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const Badge = ({ children, variant = 'purple', className = '' }) => {
  const variants = {
    purple: 'bg-purple-100 text-brand-purple border-purple-200',
    sky: 'bg-sky-100 text-sky-800 border-sky-200',
    mint: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    yellow: 'bg-amber-100 text-amber-800 border-amber-200',
    pink: 'bg-pink-100 text-pink-800 border-pink-200'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${
        variants[variant] || variants.purple
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default ProgressBar;

