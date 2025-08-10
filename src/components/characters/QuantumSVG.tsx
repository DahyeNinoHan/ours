import React from 'react';

export interface CharacterColors {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface QuantumSVGProps {
  colors: CharacterColors;
  className?: string;
}

const QuantumSVG = ({ colors, className }: QuantumSVGProps) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlow-quantum">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background aura for consistency */}
      <circle cx="100" cy="100" r="85" fill={colors.baseColor} opacity="0.1"/>
      {/* Quantum probability cloud (centered) */}
      <ellipse 
        cx="100" 
        cy="105" 
        rx="35" 
        ry="25" 
        fill="rgba(255,255,255,0.6)" 
        stroke={colors.baseColor} 
        strokeWidth="2" 
        filter="url(#neonGlow-quantum)"
      />
      <ellipse 
        cx="100" 
        cy="105" 
        rx="25" 
        ry="35" 
        fill="rgba(255,255,255,0.4)" 
        stroke={colors.secondaryColor} 
        strokeWidth="2" 
        filter="url(#neonGlow-quantum)"
      />
      {/* Superposition states (centered) */}
      <circle cx="85" cy="95" r="5" fill={colors.accentColor} opacity="0.8" filter="url(#neonGlow-quantum)"/>
      <circle cx="115" cy="95" r="5" fill={colors.accentColor} opacity="0.8" filter="url(#neonGlow-quantum)"/>
      <circle cx="85" cy="115" r="5" fill={colors.baseColor} opacity="0.6" filter="url(#neonGlow-quantum)"/>
      <circle cx="115" cy="115" r="5" fill={colors.baseColor} opacity="0.6" filter="url(#neonGlow-quantum)"/>
      {/* Quantum entanglement lines (centered) */}
      <path 
        d="M85 95 Q100 85 115 95" 
        stroke={colors.secondaryColor} 
        strokeWidth="2" 
        fill="none" 
        opacity="0.8" 
        filter="url(#neonGlow-quantum)"
      />
      <path 
        d="M85 115 Q100 125 115 115" 
        stroke={colors.secondaryColor} 
        strokeWidth="2" 
        fill="none" 
        opacity="0.8" 
        filter="url(#neonGlow-quantum)"
      />
    </svg>
  );
};

export default QuantumSVG;
