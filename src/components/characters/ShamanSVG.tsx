import React from 'react';

export interface CharacterColors {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface ShamanSVGProps {
  colors: CharacterColors;
  className?: string;
}

const ShamanSVG = ({ colors, className }: ShamanSVGProps) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlow-shaman">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
  {/* Background aura for consistency */}
  <circle cx="100" cy="100" r="85" fill={colors.baseColor} opacity="0.1"/>
      {/* Shaman hood/cloak */}
      <path 
        d="M100 60 Q80 65 70 85 Q65 105 75 125 Q85 140 100 145 Q115 140 125 125 Q135 105 130 85 Q120 65 100 60" 
        fill="rgba(255,255,255,0.8)" 
        stroke={colors.baseColor} 
        strokeWidth="3" 
        filter="url(#neonGlow-shaman)"
      />
      {/* Ritual symbols */}
      <circle cx="85" cy="90" r="3" fill={colors.accentColor} filter="url(#neonGlow-shaman)"/>
      <polygon points="100,85 105,95 95,95" fill={colors.secondaryColor} filter="url(#neonGlow-shaman)"/>
      <circle cx="115" cy="90" r="3" fill={colors.accentColor} filter="url(#neonGlow-shaman)"/>
      {/* Medicine wheel */}
      <circle 
        cx="100" 
        cy="110" 
        r="10" 
        fill="none" 
        stroke={colors.secondaryColor} 
        strokeWidth="2" 
        filter="url(#neonGlow-shaman)"
      />
      <line 
        x1="90" 
        y1="110" 
        x2="110" 
        y2="110" 
        stroke={colors.accentColor} 
        strokeWidth="1" 
        filter="url(#neonGlow-shaman)"
      />
      <line 
        x1="100" 
        y1="100" 
        x2="100" 
        y2="120" 
        stroke={colors.accentColor} 
        strokeWidth="1" 
        filter="url(#neonGlow-shaman)"
      />
    </svg>
  );
};

export default ShamanSVG;
