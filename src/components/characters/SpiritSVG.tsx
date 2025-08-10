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
      {/* Flowing spirit form */}
      <path 
        d="M100 45 Q70 60 80 85 Q90 100 70 115 Q85 130 100 125 Q115 130 130 115 Q110 100 120 85 Q130 60 100 45" 
        fill="rgba(255,255,255,0.7)" 
        stroke={colors.baseColor} 
        strokeWidth="2" 
        filter="url(#neonGlow-spirit)"
      />
      {/* Data streams */}
      <path 
        d="M60 75 Q80 70 100 75 Q120 80 140 75" 
        stroke={colors.accentColor} 
        strokeWidth="3" 
        fill="none" 
        filter="url(#neonGlow-spirit)"
      />
      <path 
        d="M65 90 Q85 85 100 90 Q115 95 135 90" 
        stroke={colors.secondaryColor} 
        strokeWidth="3" 
        fill="none" 
        filter="url(#neonGlow-spirit)"
      />
      {/* Spirit eyes */}
      <circle cx="90" cy="75" r="4" fill={colors.baseColor} filter="url(#neonGlow-spirit)"/>
      <circle cx="110" cy="75" r="4" fill={colors.baseColor} filter="url(#neonGlow-spirit)"/>
    </svg>
  );
};

export default SpiritSVG;
