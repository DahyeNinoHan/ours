import { useState } from "react";
import { CharacterCreator } from "@/components/CharacterCreator";
import { ChatInterface } from "@/components/ChatInterface";
import { DigitalMeditation } from "@/components/DigitalMeditation";
import { EmotionDashboard } from "@/components/EmotionDashboard";
import { Character } from "@/types/character";

const Index = () => {
  const [currentView, setCurrentView] = useState<"creator" | "chat" | "meditation" | "emotions">("creator");
  const [character, setCharacter] = useState<Character | null>(null);

  const handleCharacterComplete = (newCharacter: Character) => {
    setCharacter(newCharacter);
    setCurrentView("chat");
  };

  const handleBackToCreator = () => {
    setCurrentView("creator");
  };

  const handleMeditation = () => {
    setCurrentView("meditation");
  };

  const handleEmotions = () => {
    setCurrentView("emotions");
  };

  const handleBackToChat = () => {
    setCurrentView("chat");
  };

  if (currentView === "meditation" && character) {
    return (
      <DigitalMeditation 
        character={character} 
        onBack={handleBackToChat}
      />
    );
  }

  if (currentView === "emotions" && character) {
    return (
      <EmotionDashboard 
        character={character} 
        onBack={handleBackToChat}
      />
    );
  }

  if (currentView === "chat" && character) {
    return (
      <ChatInterface 
        character={character} 
        onBack={handleBackToCreator}
        onMeditation={handleMeditation}
        onEmotions={handleEmotions}
      />
    );
  }

  return (
    <CharacterCreator onComplete={handleCharacterComplete} />
  );
};

export default Index;
