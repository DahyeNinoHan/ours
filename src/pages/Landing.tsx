import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <img
          src="/landing-visual.svg"
          alt="Ours Visual"
          className="w-full h-auto max-w-3xl mx-auto mb-8"
          draggable={false}
        />
        
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="mt-8"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Landing;