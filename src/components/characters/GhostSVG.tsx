import React from 'react';

// CharacterColors 타입이 없을 경우를 대비해 임시 정의
export interface CharacterColors {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface GhostSVGProps {
  colors: CharacterColors;
  className?: string;
}

const GhostSVG = ({ colors, className }: GhostSVGProps) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlow-ghost">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background aura */}
      <circle cx="100" cy="100" r="85" fill={colors.baseColor} opacity="0.1"/>
      {/* Main ethereal form */}
      <path 
        d="M100 50 Q80 70 75 90 Q70 110 85 130 Q100 140 115 130 Q130 110 125 90 Q120 70 100 50" 
        fill="rgba(255,255,255,0.8)" 
        stroke={colors.baseColor} 
        strokeWidth="3" 
        filter="url(#neonGlow-ghost)"
      />
      {/* Flowing energy trails */}
      <path 
        d="M85 60 Q70 75 80 95 Q90 110 75 125" 
        fill={`${colors.baseColor}40`} 
        stroke={colors.baseColor} 
        strokeWidth="2" 
        filter="url(#neonGlow-ghost)"
      />
      <path 
        d="M115 60 Q130 75 120 95 Q110 110 125 125" 
        fill={`${colors.secondaryColor}40`} 
        stroke={colors.secondaryColor} 
        strokeWidth="2" 
        filter="url(#neonGlow-ghost)"
      />
      {/* Digital eyes */}
      <rect x="85" y="75" width="8" height="8" fill={colors.baseColor} filter="url(#neonGlow-ghost)"/>
      <rect x="107" y="75" width="8" height="8" fill={colors.accentColor} filter="url(#neonGlow-ghost)"/>
      <rect x="87" y="77" width="4" height="4" fill="#ffffff"/>
      <rect x="109" y="77" width="4" height="4" fill="#ffffff"/>
      {/* Digital mouth */}
      <rect x="92" y="95" width="16" height="4" fill={colors.secondaryColor} filter="url(#neonGlow-ghost)"/>
      <rect x="94" y="97" width="3" height="2" fill="#ffffff"/>
      <rect x="99" y="97" width="2" height="2" fill="#ffffff"/>
      <rect x="103" y="97" width="3" height="2" fill="#ffffff"/>
    </svg>
  );
};

export default GhostSVG;
