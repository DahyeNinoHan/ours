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
        <filter id="quantumFairyGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Main teardrop/spirit body */}
      <path d="M100 45 Q70 60 80 85 Q90 100 70 115 Q85 130 100 125 Q115 130 130 115 Q110 100 120 85 Q130 60 100 45" 
            fill="rgba(255,255,255,0.7)" 
            stroke={colors.baseColor} 
            strokeWidth="2" 
            filter="url(#quantumFairyGlow)"/>

      {/* Upper data stream line (blue) - 눈을 가로지르는 파란선 */}
      <path d="M60 75 Q80 70 100 75 Q120 80 140 75" 
            stroke={colors.accentColor} 
            strokeWidth="3" 
            fill="none" 
            filter="url(#quantumFairyGlow)"/>

      {/* Lower data stream line (red) - 입을 가로지르는 빨간선 */}
      <path d="M65 90 Q85 85 100 90 Q115 95 135 90" 
            stroke={colors.secondaryColor} 
            strokeWidth="3" 
            fill="none" 
            filter="url(#quantumFairyGlow)"/>

      {/* Spirit eyes - 더 진한 색으로 */}
      <circle cx="90" cy="75" r="4" fill={colors.accentColor} filter="url(#quantumFairyGlow)"/>
      <circle cx="110" cy="75" r="4" fill={colors.accentColor} filter="url(#quantumFairyGlow)"/>

      {/* Spirit mouth - 빨간색으로 */}
      <ellipse cx="100" cy="90" rx="8" ry="3" fill={colors.secondaryColor} filter="url(#quantumFairyGlow)"/>
    </svg>
  );
};