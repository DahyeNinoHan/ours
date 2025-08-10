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
        d="M100 40 Q80 45 70 65 Q65 85 75 105 Q85 120 100 125 Q115 120 125 105 Q135 85 130 65 Q120 45 100 40" 
        fill="rgba(255,255,255,0.8)" 
        stroke={colors.baseColor} 
        strokeWidth="3" 
        filter="url(#neonGlow-shaman)"
      />
      {/* Ritual symbols */}
      <circle cx="85" cy="70" r="3" fill={colors.accentColor} filter="url(#neonGlow-shaman)"/>
      <polygon points="100,65 105,75 95,75" fill={colors.secondaryColor} filter="url(#neonGlow-shaman)"/>
      <circle cx="115" cy="70" r="3" fill={colors.accentColor} filter="url(#neonGlow-shaman)"/>
      {/* Medicine wheel */}
      <circle 
        cx="100" 
        cy="90" 
        r="10" 
        fill="none" 
        stroke={colors.secondaryColor} 
        strokeWidth="2" 
        filter="url(#neonGlow-shaman)"
      />
      <line 
        x1="90" 
        y1="90" 
        x2="110" 
        y2="90" 
        stroke={colors.accentColor} 
        strokeWidth="1" 
        filter="url(#neonGlow-shaman)"
      />
      <line 
        x1="100" 
        y1="80" 
        x2="100" 
        y2="100" 
        stroke={colors.accentColor} 
        strokeWidth="1" 
        filter="url(#neonGlow-shaman)"
      />
    </svg>
  );
};

export default ShamanSVG;
