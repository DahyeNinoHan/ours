import React from 'react';

export interface CharacterColors {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface SageSVGProps {
  colors: CharacterColors;
  className?: string;
}

const SageSVG = ({ colors, className }: SageSVGProps) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlow-sage">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background aura for consistency */}
      <circle cx="100" cy="100" r="85" fill={colors.baseColor} opacity="0.1"/>
      {/* Crystalline core (centered) */}
      <polygon 
        points="100,60 130,100 115,140 85,140 70,100" 
        fill="rgba(255,255,255,0.9)" 
        stroke={colors.baseColor} 
        strokeWidth="3" 
        filter="url(#neonGlow-sage)"
      />
      {/* Data processing nodes (centered) */}
      <circle cx="100" cy="90" r="8" fill={colors.accentColor} filter="url(#neonGlow-sage)"/>
      <circle cx="85" cy="105" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-sage)"/>
      <circle cx="115" cy="105" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-sage)"/>
      <circle cx="100" cy="120" r="5" fill={colors.baseColor} filter="url(#neonGlow-sage)"/>
      {/* Logic circuit patterns (centered) */}
      <path 
        d="M85 105 L100 90 L115 105 L100 120 L85 105" 
        stroke={colors.baseColor} 
        strokeWidth="2" 
        fill="none" 
        filter="url(#neonGlow-sage)"
      />
    </svg>
  );
};

export default SageSVG;
