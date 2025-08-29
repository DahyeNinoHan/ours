import React from 'react';

export interface CharacterColors {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface PrismSVGProps {
  colors: CharacterColors;
  className?: string;
}

const PrismSVG = ({ colors, className }: PrismSVGProps) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="bubbleGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Dragon body */}
      <path 
        d="M100 50 Q70 60 60 85 Q70 110 100 115 Q130 110 140 85 Q130 60 100 50" 
        fill="rgba(255,255,255,0.9)" 
        stroke={colors.baseColor} 
        strokeWidth="3" 
        filter="url(#bubbleGlow)"
      />
      
      {/* Dragon horns */}
      <polygon 
        points="85,48 80,38 90,45" 
        fill="rgba(255,255,255,0.8)" 
        stroke={colors.baseColor} 
        strokeWidth="2" 
        filter="url(#bubbleGlow)"
      />
      <polygon 
        points="115,48 120,38 110,45" 
        fill="rgba(255,255,255,0.8)" 
        stroke={colors.baseColor} 
        strokeWidth="2" 
        filter="url(#bubbleGlow)"
      />
      
      {/* Dragon eyes */}
      <circle 
        cx="82" 
        cy="75" 
        r="4" 
        fill={colors.accentColor} 
        filter="url(#bubbleGlow)"
      />
      <circle 
        cx="118" 
        cy="75" 
        r="4" 
        fill={colors.accentColor} 
        filter="url(#bubbleGlow)"
      />
      
      {/* Dragon mouth */}
      <ellipse 
        cx="100" 
        cy="90" 
        rx="12" 
        ry="4" 
        fill={colors.secondaryColor} 
        filter="url(#bubbleGlow)"
      />
      <ellipse 
        cx="100" 
        cy="90" 
        rx="8" 
        ry="2" 
        fill={colors.baseColor} 
        opacity="0.7"
      />
      
      {/* Bubbles around dragon */}
      <circle 
        cx="50" 
        cy="65" 
        r="6" 
        fill={colors.secondaryColor} 
        opacity="0.6" 
        filter="url(#bubbleGlow)"
      />
      <circle 
        cx="150" 
        cy="65" 
        r="6" 
        fill={colors.secondaryColor} 
        opacity="0.6" 
        filter="url(#bubbleGlow)"
      />
      <circle 
        cx="45" 
        cy="85" 
        r="4" 
        fill={colors.accentColor} 
        opacity="0.7"
      />
      <circle 
        cx="155" 
        cy="85" 
        r="4" 
        fill={colors.accentColor} 
        opacity="0.7"
      />
    </svg>
  );
};

export default PrismSVG;