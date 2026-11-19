import React from 'react';
import soundEffects from '../../utils/soundSynth';

export const Button = ({
  children,
  onClick,
  variant = 'purple',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  type = 'button',
  fullWidth = false,
  playSound = true,
  ...props
}) => {
  const handleClick = (e) => {
    if (disabled || loading) return;
    if (playSound) soundEffects.playPop();
    if (onClick) onClick(e);
  };

  const variants = {
    purple: 'bg-brand-purple hover:bg-brand-purpleHover text-white shadow-bubbly-purple active:translate-y-1',
    sky: 'bg-sky-500 hover:bg-sky-600 text-white shadow-bubbly-sky active:translate-y-1',
    mint: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-bubbly-mint active:translate-y-1',
    yellow: 'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-bubbly-yellow active:translate-y-1',
    pink: 'bg-pink-500 hover:bg-pink-600 text-white shadow-bubbly-pink active:translate-y-1',
    lavender: 'bg-pastel-lavender hover:bg-purple-200 text-purple-900 shadow-sm active:translate-y-0.5',
    outline: 'border-2 border-purple-300 hover:border-brand-purple text-brand-purple bg-white active:translate-y-0.5',
    ghost: 'bg-transparent hover:bg-purple-50 text-slate-700'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-xl min-h-[38px]',
    md: 'px-5 py-3 text-base font-bold rounded-2xl min-h-[48px]',
    lg: 'px-7 py-4 text-lg font-extrabold rounded-3xl min-h-[56px]',
    tv: 'px-10 py-5 text-2xl font-black rounded-4xl min-h-[72px]'
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 select-none ${
        fullWidth ? 'w-full' : ''
      } ${variants[variant] || variants.purple} ${sizes[size] || sizes.md} ${
        disabled ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : 'cursor-pointer'
      } ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;

