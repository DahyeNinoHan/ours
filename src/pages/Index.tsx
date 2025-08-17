import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreator } from "@/components/CharacterCreator";
import { Character } from "@/types/character";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  // 15초 타이머 제거, 클릭 이벤트로만 스플래시 종료

  const handleSplashClick = () => {
    setShowSplash(false);
    // 캐릭터 선택 페이지로 바로 이동
    // 현재 구조상 splash가 사라지면 바로 캐릭터 선택이 나오므로, splash에서 바로 navigate할 수도 있음
  };

  const handleCharacterComplete = (newCharacter: Character) => {
    navigate("/chat", { state: { character: newCharacter } });
  };

  if (showSplash) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          cursor: "pointer",
        }}
        onClick={() => {
          setShowSplash(false);
        }}
      >
        <img
          src="/ours_logo_02.svg"
          alt="Ours Logo"
          style={{ maxWidth: "60vw", maxHeight: "60vh" }}
          draggable={false}
        />
      </div>
    );
  }

  return (
    <CharacterCreator onComplete={handleCharacterComplete} />
  );
};

export default Index;
