import React from 'react';

export interface CharacterColors {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface NeuralSVGProps {
  colors: CharacterColors;
  className?: string;
}

const NeuralSVG = ({ colors, className }: NeuralSVGProps) => {
  return (
    <svg s
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlow-neural">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
  {/* Background aura for consistency */}
  <circle cx="100" cy="100" r="85" fill={colors.baseColor} opacity="0.1"/>
      {/* Central processing unit */}
      <circle 
        cx="100" 
        cy="85" 
        r="20" 
        fill="rgba(255,255,255,0.8)" 
        stroke={colors.baseColor} 
        strokeWidth="3" 
        filter="url(#neonGlow-neural)"
      />
      {/* Neural network nodes */}
      <circle cx="70" cy="60" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-neural)"/>
      <circle cx="130" cy="60" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-neural)"/>
      <circle cx="60" cy="85" r="5" fill={colors.accentColor} filter="url(#neonGlow-neural)"/>
      <circle cx="140" cy="85" r="5" fill={colors.accentColor} filter="url(#neonGlow-neural)"/>
      <circle cx="70" cy="110" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-neural)"/>
      <circle cx="130" cy="110" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-neural)"/>
      {/* Synaptic connections */}
      <line x1="70" y1="60" x2="100" y2="85" stroke={colors.baseColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="130" y1="60" x2="100" y2="85" stroke={colors.baseColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="60" y1="85" x2="100" y2="85" stroke={colors.secondaryColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="140" y1="85" x2="100" y2="85" stroke={colors.secondaryColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="70" y1="110" x2="100" y2="85" stroke={colors.baseColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="130" y1="110" x2="100" y2="85" stroke={colors.baseColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      {/* Neural activity */}
      <circle cx="100" cy="85" r="8" fill={colors.accentColor} opacity="0.6" filter="url(#neonGlow-neural)"/>
    </svg>
  );
};

export default NeuralSVG;
