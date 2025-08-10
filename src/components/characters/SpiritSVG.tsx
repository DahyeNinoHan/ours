import React from 'react';

export interface CharacterColors {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface SpiritSVGProps {
  colors: CharacterColors;
  className?: string;
}

const SpiritSVG = ({ colors, className }: SpiritSVGProps) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlow-spirit">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background aura for consistency */}
      <circle cx="100" cy="100" r="85" fill={colors.baseColor} opacity="0.1"/>
      {/* Flowing spirit form (centered) */}
      <path 
        d="M100 65 Q70 80 80 105 Q90 120 70 135 Q85 150 100 145 Q115 150 130 135 Q110 120 120 105 Q130 80 100 65" 
        fill="rgba(255,255,255,0.7)" 
        stroke={colors.baseColor} 
        strokeWidth="2" 
        filter="url(#neonGlow-spirit)"
      />
      {/* Data streams (centered) */}
      <path 
        d="M60 95 Q80 90 100 95 Q120 100 140 95" 
        stroke={colors.accentColor} 
        strokeWidth="3" 
        fill="none" 
        filter="url(#neonGlow-spirit)"
      />
      <path 
        d="M65 110 Q85 105 100 110 Q115 115 135 110" 
        stroke={colors.secondaryColor} 
        strokeWidth="3" 
        fill="none" 
        filter="url(#neonGlow-spirit)"
      />
      {/* Spirit eyes (centered) */}
      <circle cx="90" cy="95" r="4" fill={colors.baseColor} filter="url(#neonGlow-spirit)"/>
      <circle cx="110" cy="95" r="4" fill={colors.baseColor} filter="url(#neonGlow-spirit)"/>
    </svg>
  );
};

export default SpiritSVG;
