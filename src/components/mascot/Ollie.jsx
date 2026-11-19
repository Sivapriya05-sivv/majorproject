import React from 'react';

export const Ollie = ({ state = 'happy', size = 'md', className = '', onClick }) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-36 h-36',
    xl: 'w-52 h-52',
    tv: 'w-64 h-64'
  };

  const isSpeaking = state === 'speaking';
  const isCelebrating = state === 'celebrating';
  const isThinking = state === 'thinking';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size] || sizeMap.md} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      } ${className}`}
      role="img"
      aria-label="Ollie the Owl Mascot"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`ollieBody-${size}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#9366f9" />
            <stop offset="100%" stopColor="#6d28d9" />
          </radialGradient>
          <radialGradient id={`ollieBelly-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fef08a" />
          </radialGradient>
        </defs>

        {/* Feet */}
        <ellipse cx="80" cy="180" rx="14" ry="7" fill="#f59e0b" />
        <ellipse cx="120" cy="180" rx="14" ry="7" fill="#f59e0b" />

        {/* Body */}
        <g>
          {/* Main Body */}
          <path
            d="M100 22 C60 22 40 52 40 105 C40 152 65 178 100 178 C135 178 160 152 160 105 C160 52 140 22 100 22 Z"
            fill={`url(#ollieBody-${size})`}
          />

          {/* Ears / Tufts */}
          <path d="M55 35 L38 12 L70 25 Z" fill="#6d28d9" />
          <path d="M145 35 L162 12 L130 25 Z" fill="#6d28d9" />

          {/* Soft Belly */}
          <ellipse cx="100" cy="122" rx="42" ry="46" fill={`url(#ollieBelly-${size})`} />

          {/* Feather marks */}
          <path d="M90 108 Q100 115 110 108" stroke="#eab308" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M85 125 Q100 133 115 125" stroke="#eab308" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M90 142 Q100 149 110 142" stroke="#eab308" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Wings */}
          {isCelebrating ? (
            <>
              {/* Both wings raised high in celebration */}
              <path d="M42 85 C25 60 20 40 40 35 C55 45 55 70 42 85 Z" fill="#7c3aed" />
              <path d="M158 85 C175 60 180 40 160 35 C145 45 145 70 158 85 Z" fill="#7c3aed" />
            </>
          ) : (
            <>
              {/* Normal friendly resting & waving */}
              <path d="M42 95 C30 115 35 145 52 150 C50 135 48 115 42 95 Z" fill="#7c3aed" />
              <path d="M158 95 C172 80 182 60 172 48 C156 55 150 80 158 95 Z" fill="#7c3aed" />
            </>
          )}

          {/* Eyes */}
          <circle cx="78" cy="74" r="23" fill="#ffffff" />
          <circle cx="122" cy="74" r="23" fill="#ffffff" />

          {/* Pupil borders */}
          <circle cx="78" cy="74" r="23" stroke="#c4b5fd" strokeWidth="2.5" fill="none" />
          <circle cx="122" cy="74" r="23" stroke="#c4b5fd" strokeWidth="2.5" fill="none" />

          {/* Pupils */}
          {isThinking ? (
            <>
              <circle cx="82" cy="67" r="13" fill="#1e1b4b" />
              <circle cx="126" cy="67" r="13" fill="#1e1b4b" />
            </>
          ) : (
            <>
              <circle cx="81" cy="75" r="13.5" fill="#1e1b4b" />
              <circle cx="119" cy="75" r="13.5" fill="#1e1b4b" />
            </>
          )}

          {/* Eye Sparkles */}
          <circle cx="85" cy="71" r="5" fill="#ffffff" />
          <circle cx="79" cy="79" r="2.5" fill="#ffffff" />
          <circle cx="123" cy="71" r="5" fill="#ffffff" />
          <circle cx="117" cy="79" r="2.5" fill="#ffffff" />

          {/* Rosy Cheeks */}
          <ellipse cx="60" cy="94" rx="8" ry="5" fill="#f472b6" opacity="0.65" />
          <ellipse cx="140" cy="94" rx="8" ry="5" fill="#f472b6" opacity="0.65" />

          {/* Beak & Mouth */}
          {isSpeaking ? (
            <ellipse cx="100" cy="87" rx="11" ry="8" fill="#f59e0b" />
          ) : (
            <polygon points="100,76 92,93 108,93" fill="#f59e0b" />
          )}
          <polygon points="100,99 94,93 106,93" fill="#d97706" />
        </g>
      </svg>

      {/* Cheerful sparkle stars when celebrating */}
      {isCelebrating && (
        <span className="absolute -top-2 -right-2 text-2xl animate-spin">✨</span>
      )}
    </div>
  );
};

export default Ollie;

