import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DigitalMeditation } from "@/components/DigitalMeditation";
import { Character } from "@/types/character";

const Meditation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    // Get character from location state or redirect to home
    if (location.state?.character) {
      setCharacter(location.state.character);
    } else {
      // If no character data, redirect to home
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleBackToChat = () => {
    if (character) {
      navigate("/chat", { state: { character } });
    }
  };

  if (!character) {
    return null; // Will redirect to home
  }

  return (
    <DigitalMeditation 
      character={character} 
      onBack={handleBackToChat}
    />
  );
};

export default Meditation;