import React from 'react';

export interface CharacterColors {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface MicrobeSVGProps {
  colors: CharacterColors;
  className?: string;
}

const MicrobeSVG = ({ colors, className }: MicrobeSVGProps) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="microbeFlowerGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Fairy body - 몸체 테두리는 분홍색 */}
      <path d="M100 45 Q70 55 65 80 Q70 105 100 120 Q130 105 135 80 Q130 55 100 45"
            fill="rgba(255,255,255,0.9)" stroke={colors.baseColor} strokeWidth="3" filter="url(#microbeFlowerGlow)"/>

      {/* Fairy eyes - 눈동자는 초록색 */}
      <circle cx="85" cy="68" r="4" fill={colors.secondaryColor} filter="url(#microbeFlowerGlow)"/>
      <circle cx="115" cy="68" r="4" fill={colors.secondaryColor} filter="url(#microbeFlowerGlow)"/>

      {/* Fairy mouth - 입술은 분홍색, 입 중앙점은 초록색 */}
      <path d="M92 80 Q100 85 108 80" stroke={colors.baseColor} strokeWidth="2" fill="none" filter="url(#microbeFlowerGlow)"/>
      <circle cx="100" cy="82" r="2" fill={colors.secondaryColor} opacity="0.8"/>

      {/* Flower petals around fairy - 머리 위: 가운데는 초록, 양쪽은 분홍 */}
      <circle cx="80" cy="38" r="5" fill={colors.baseColor} opacity="0.8" filter="url(#microbeFlowerGlow)"/>
      <circle cx="100" cy="35" r="5" fill={colors.secondaryColor} opacity="0.8" filter="url(#microbeFlowerGlow)"/>
      <circle cx="120" cy="38" r="5" fill={colors.baseColor} opacity="0.8" filter="url(#microbeFlowerGlow)"/>

      {/* Fairy wings - 귀는 분홍색 */}
      <ellipse cx="65" cy="75" rx="6" ry="12" fill={colors.baseColor} opacity="0.6" filter="url(#microbeFlowerGlow)"/>
      <ellipse cx="135" cy="75" rx="6" ry="12" fill={colors.baseColor} opacity="0.6" filter="url(#microbeFlowerGlow)"/>
    </svg>
  );
};

export default MicrobeSVG;