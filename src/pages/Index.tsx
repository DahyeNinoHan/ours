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
        }}
      >
        <img
          src="/ours_logo_02.svg"
          alt="Ours Logo"
          style={{ maxWidth: "60vw", maxHeight: "60vh" }}
        />
      </div>
    );
  }

  return (
    <CharacterCreator onComplete={handleCharacterComplete} />
  );
};

export default Index;
