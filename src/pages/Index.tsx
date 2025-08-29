import React from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreator } from "@/components/CharacterCreator";
import { Character } from "@/types/character";

const Index = () => {
  const navigate = useNavigate();

  const handleCharacterComplete = (newCharacter: Character) => {
    navigate("/chat", { state: { character: newCharacter } });
  };

  return (
    <CharacterCreator onComplete={handleCharacterComplete} />
  );
};

export default Index;
