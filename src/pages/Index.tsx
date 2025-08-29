import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreator } from "@/components/CharacterCreator";
import { Character } from "@/types/character";

const Index = () => {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  const handleCharacterComplete = (newCharacter: Character) => {
    navigate("/chat", { state: { character: newCharacter } });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  if (showPopup) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            background: "#1a1a1a",
            padding: "2rem",
            borderRadius: "12px",
            border: "1px solid #333",
            textAlign: "center",
            maxWidth: "400px",
            color: "white",
          }}
        >
          <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
            Welcome to OURS
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#ccc" }}>
            Choose your digital companion to begin your journey.
          </p>
          <button
            onClick={handlePopupClose}
            style={{
              background: "#00ff88",
              color: "#000",
              padding: "0.75rem 2rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <CharacterCreator onComplete={handleCharacterComplete} />
  );
};

export default Index;
