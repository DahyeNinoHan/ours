import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChatInterface } from "@/components/ChatInterface";
import { Character } from "@/types/character";

const Chat = () => {
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

  const handleBackToCreator = () => {
    navigate("/");
  };

  const handleMeditation = () => {
    if (character) {
      navigate("/meditation", { state: { character } });
    }
  };

  if (!character) {
    return null; // Will redirect to home
  }

  return (
    <ChatInterface 
      character={character} 
      onBack={handleBackToCreator}
      onMeditation={handleMeditation}
    />
  );
};

export default Chat;