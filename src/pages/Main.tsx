import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreator } from "@/components/CharacterCreator";
import { Character } from "@/types/character";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Main = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [showCharacterCreator, setShowCharacterCreator] = useState(false);
  const navigate = useNavigate();

  const handlePopupClose = () => {
    setShowPopup(false);
    setShowCharacterCreator(true);
  };

  const handleCharacterComplete = (newCharacter: Character) => {
    navigate("/chat", { state: { character: newCharacter } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to Ours</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              You're about to begin a unique journey. Choose your digital companion to guide you through this experience.
            </p>
            <Button onClick={handlePopupClose} className="w-full">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {showCharacterCreator && (
        <CharacterCreator onComplete={handleCharacterComplete} />
      )}
    </div>
  );
};

export default Main;