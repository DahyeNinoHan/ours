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
      {/* Crystalline core */}
      <polygon 
        points="100,40 130,80 115,120 85,120 70,80" 
        fill="rgba(255,255,255,0.9)" 
        stroke={colors.baseColor} 
        strokeWidth="3" 
        filter="url(#neonGlow-sage)"
      />
      {/* Data processing nodes */}
      <circle cx="100" cy="70" r="8" fill={colors.accentColor} filter="url(#neonGlow-sage)"/>
      <circle cx="85" cy="85" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-sage)"/>
      <circle cx="115" cy="85" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-sage)"/>
      <circle cx="100" cy="100" r="5" fill={colors.baseColor} filter="url(#neonGlow-sage)"/>
      {/* Logic circuit patterns */}
      <path 
        d="M85 85 L100 70 L115 85 L100 100 L85 85" 
        stroke={colors.baseColor} 
        strokeWidth="2" 
        fill="none" 
        filter="url(#neonGlow-sage)"
      />
    </svg>
  );
};

export default SageSVG;
