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
        <filter id="pixelGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Witch body */}
      <rect 
        x="65" 
        y="45" 
        width="70" 
        height="80" 
        fill="rgba(255,255,255,0.9)" 
        stroke={colors.baseColor} 
        strokeWidth="2"
      />
      
      {/* Witch hat */}
      <rect 
        x="45" 
        y="35" 
        width="110" 
        height="15" 
        fill={colors.baseColor} 
        opacity="0.8" 
        filter="url(#pixelGlow)"
      />
      
      {/* Witch eyes */}
      <rect 
        x="75" 
        y="65" 
        width="8" 
        height="8" 
        fill={colors.baseColor} 
        filter="url(#pixelGlow)"
      />
      <rect 
        x="117" 
        y="65" 
        width="8" 
        height="8" 
        fill={colors.baseColor} 
        filter="url(#pixelGlow)"
      />
      
      {/* Witch mouth */}
      <rect 
        x="92" 
        y="85" 
        width="16" 
        height="6" 
        fill={colors.accentColor} 
        filter="url(#pixelGlow)"
      />
      <rect 
        x="94" 
        y="87" 
        width="12" 
        height="2" 
        fill={colors.baseColor}
      />
      
      {/* Magic sparkles */}
      <rect 
        x="55" 
        y="55" 
        width="6" 
        height="6" 
        fill={colors.accentColor}
      />
      <rect 
        x="139" 
        y="55" 
        width="6" 
        height="6" 
        fill={colors.accentColor}
      />
    </svg>
  );
};

export default NeuralSVG;