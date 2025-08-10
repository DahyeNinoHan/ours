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
    <svg 
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
      {/* Central processing unit (centered) */}
      <circle 
        cx="100" 
        cy="105" 
        r="20" 
        fill="rgba(255,255,255,0.8)" 
        stroke={colors.baseColor} 
        strokeWidth="3" 
        filter="url(#neonGlow-neural)"
      />
      {/* Neural network nodes (centered) */}
      <circle cx="70" cy="80" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-neural)"/>
      <circle cx="130" cy="80" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-neural)"/>
      <circle cx="60" cy="105" r="5" fill={colors.accentColor} filter="url(#neonGlow-neural)"/>
      <circle cx="140" cy="105" r="5" fill={colors.accentColor} filter="url(#neonGlow-neural)"/>
      <circle cx="70" cy="130" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-neural)"/>
      <circle cx="130" cy="130" r="6" fill={colors.secondaryColor} filter="url(#neonGlow-neural)"/>
      {/* Synaptic connections (centered) */}
      <line x1="70" y1="80" x2="100" y2="105" stroke={colors.baseColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="130" y1="80" x2="100" y2="105" stroke={colors.baseColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="60" y1="105" x2="100" y2="105" stroke={colors.secondaryColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="140" y1="105" x2="100" y2="105" stroke={colors.secondaryColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="70" y1="130" x2="100" y2="105" stroke={colors.baseColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      <line x1="130" y1="130" x2="100" y2="105" stroke={colors.baseColor} strokeWidth="2" filter="url(#neonGlow-neural)"/>
      {/* Neural activity (centered) */}
      <circle cx="100" cy="105" r="8" fill={colors.accentColor} opacity="0.6" filter="url(#neonGlow-neural)"/>
    </svg>
  );
};

export default NeuralSVG;
