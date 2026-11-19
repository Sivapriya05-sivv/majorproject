import React from 'react';

export const Card = ({
  children,
  className = '',
  color = 'white',
  bordered = true,
  hoverable = false,
  onClick,
  ...props
}) => {
  const colors = {
    white: 'bg-white',
    lavender: 'bg-pastel-lavender/60',
    purple: 'bg-purple-50',
    sky: 'bg-pastel-sky/50',
    mint: 'bg-pastel-mint/50',
    yellow: 'bg-pastel-yellow/50',
    pink: 'bg-pastel-pink/50',
    peach: 'bg-pastel-peach/50'
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-5 sm:p-6 transition-all duration-200 ${colors[color] || colors.white} ${
        bordered ? 'border border-purple-100/80 shadow-soft' : ''
      } ${
        hoverable ? 'hover:-translate-y-1 hover:shadow-soft-lg cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

