import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Character } from "@/types/character";
import GhostSVG from "./characters/GhostSVG";
import MicrobeSVG from "./characters/MicrobeSVG";
import PrismSVG from "./characters/PrismSVG";
import ShamanSVG from "./characters/ShamanSVG";
import QuantumSVG from "./characters/QuantumSVG";
import NeuralSVG from "./characters/NeuralSVG";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";

interface DigitalMeditationProps {
  character: Character;
  onBack: () => void;
}

const BREATHING_PHASES = {
  inhale: { duration: 4000, instruction: "Inhale" },
  hold: { duration: 7000, instruction: "Hold" },
  exhale: { duration: 8000, instruction: "Exhale" },
};

export const DigitalMeditation = ({ character, onBack }: DigitalMeditationProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<keyof typeof BREATHING_PHASES>("inhale");
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [particlesActive, setParticlesActive] = useState(false);

  // Particle generation
  useEffect(() => {
    if (!isActive) {
      setParticlesActive(false);
      return;
    }

    setParticlesActive(true);

    // Create energy particles periodically
    const createBackgroundParticle = () => {
      if (!isActive) return;
      
      const particleColors = ['#00ff41', '#ffb000', '#8000ff', '#00ffff'];
      const particle = document.createElement('div');
      particle.className = 'energy-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.style.animationDuration = (8 + Math.random() * 4) + 's';
      
      const container = document.getElementById('energy-particles-container');
      if (container) {
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 12000);
      }
    };

    const particleInterval = setInterval(createBackgroundParticle, 800);
    
    return () => {
      clearInterval(particleInterval);
      setParticlesActive(false);
    };
  }, [isActive]);

  const characterMeditationStyles = {
    "Neon Ghost": {
      gradient: "from-primary/20 via-primary/5 to-transparent",
      pulseColor: "shadow-[0_0_100px_hsl(120_100%_50%/0.3)]",
      message: "Channel your ethereal energy through digital breath..."
    },
    "Supernova Microbe": {
      gradient: "from-accent/20 via-accent/5 to-transparent",
      pulseColor: "shadow-[0_0_100px_hsl(45_100%_50%/0.3)]",
      message: "Harmonize with ancient algorithms through mindful breathing..."
    },
    "Quantum Fairy": {
      gradient: "from-primary/15 via-muted/10 to-transparent",
      pulseColor: "shadow-[0_0_100px_hsl(120_80%_40%/0.3)]",
      message: "Flow with the data streams through controlled breath..."
    },
    "Cyber Shaman": {
      gradient: "from-accent/15 via-primary/5 to-transparent",
      pulseColor: "shadow-[0_0_100px_hsl(120_100%_50%/0.2)]",
      message: "Perform digital rituals through sacred breathing patterns..."
    },
    "Neural Entity": {
      gradient: "from-primary/25 via-accent/10 to-transparent",
      pulseColor: "shadow-[0_0_100px_hsl(45_100%_50%/0.4)]",
      message: "Exist in superposition through quantum breath awareness..."
    },
    "Neural Entity": {
      gradient: "from-muted/20 via-primary/8 to-transparent",
      pulseColor: "shadow-[0_0_100px_hsl(120_60%_50%/0.3)]",
      message: "Optimize neural pathways through systematic breathing..."
    }
  };

  const currentStyle = characterMeditationStyles[character.species as keyof typeof characterMeditationStyles] || {
    gradient: "from-primary/20 via-primary/5 to-transparent",
    pulseColor: "shadow-[0_0_100px_hsl(120_100%_50%/0.3)]",
    message: "Focus your digital consciousness through mindful breathing..."
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 100);
        setPhaseProgress(prev => {
          const currentPhaseDuration = BREATHING_PHASES[currentPhase].duration;
          const newProgress = prev + (100 / (currentPhaseDuration / 100));
          
          if (newProgress >= 100) {
            // Move to next phase
            if (currentPhase === "inhale") {
              setCurrentPhase("hold");
            } else if (currentPhase === "hold") {
              setCurrentPhase("exhale");
            } else {
              setCurrentPhase("inhale");
              setCompletedCycles(cycles => cycles + 1);
            }
            return 0;
          }
          return newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, currentPhase]);

  const toggleMeditation = () => {
    setIsActive(!isActive);
  };

  const resetSession = () => {
    setIsActive(false);
    setCurrentPhase("inhale");
    setPhaseProgress(0);
    setSessionTime(0);
    setCompletedCycles(0);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCircleScale = () => {
    if (!isActive) return "scale-100";
    
    switch (currentPhase) {
      case "inhale":
        return "scale-125";
      case "hold":
        return "scale-125";
      case "exhale":
        return "scale-100";
      default:
        return "scale-100";
    }
  };

  // Generate meditation particles
  const renderMeditationParticles = () => {
    if (!particlesActive) return null;
    
    return Array.from({ length: 12 }, (_, i) => {
      const colors = ['#00ff41', '#ffb000', '#8000ff', '#00ffff'];
      return (
        <div
          key={i}
          className="meditation-particle"
          style={{
            animationDelay: `${i * 1}s`,
            animationDuration: `${12 + (i % 3) * 2}s`,
            background: colors[i % colors.length],
          }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-radial ${currentStyle.gradient}`} />

      {/* Header + Session stats row */}
      <div className="relative z-10 p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="neon-border glow-effect self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chat
          </Button>
          {/* Session stats - now in header row */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="p-4 text-center bg-transparent border-none shadow-none">
                <div className="text-2xl font-bold neon-text">{formatTime(sessionTime)}</div>
                <div className="text-xs text-muted-foreground">Session Time</div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="p-4 text-center bg-transparent border-none shadow-none">
                <div className="text-2xl font-bold neon-text">{completedCycles}</div>
                <div className="text-xs text-muted-foreground">Breathing Cycles</div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="p-4 text-center bg-transparent border-none shadow-none">
                <div className="text-2xl font-bold neon-text">
                  {Math.round((completedCycles * 19) / 60 * 10) / 10}
                </div>
                <div className="text-xs text-muted-foreground">Focus Minutes</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main meditation interface */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6">
        {/* Enhanced meditation circle */}
  <div className="relative mb-28">
          <div 
            className={`meditation-visual transition-all duration-${BREATHING_PHASES[currentPhase].duration} ease-in-out ${getCircleScale()}`}
            style={{
              width: '560px',
              height: '560px'
            }}
          >
            {/* Multi-layer breathing circles */}
            <div className="breathing-circle breathing-circle-1"></div>
            <div className="breathing-circle breathing-circle-2"></div>
            <div className="breathing-circle breathing-circle-3"></div>

            {/* Character container with floating animation */}
            <div className="meditation-character-container">
              <div className="meditation-character-svg">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  {character.species === 'Neon Ghost' && (
                    <GhostSVG colors={{ baseColor: '#32cd32', secondaryColor: '#00fff7', accentColor: '#fff' }} className="w-40 h-40" />
                  )}
                  {character.species === 'Supernova Microbe' && (
                    <MicrobeSVG colors={{ baseColor: '#ffb000', secondaryColor: '#fff', accentColor: '#00fff7' }} className="w-40 h-40" />
                  )}
                  {character.species === 'Quantum Fairy' && (
                    <PrismSVG colors={{ baseColor: '#00fff7', secondaryColor: '#32cd32', accentColor: '#fff' }} className="w-40 h-40" />
                  )}
                  {character.species === 'Cyber Shaman' && (
                    <ShamanSVG colors={{ baseColor: '#8000ff', secondaryColor: '#ffb000', accentColor: '#fff' }} className="w-40 h-40" />
                  )}
                  {character.species === 'Neural Entity' && (
                    <QuantumSVG colors={{ baseColor: '#fff', secondaryColor: '#00fff7', accentColor: '#ffb000' }} className="w-40 h-40" />
                  )}
                  {character.species === 'Neural Entity' && (
                    <NeuralSVG colors={{ baseColor: '#00fff7', secondaryColor: '#8000ff', accentColor: '#32cd32' }} className="w-40 h-40" />
                  )}
                </div>
              </div>
            </div>

            {/* Meditation particles */}
            <div className="absolute inset-0" id="meditation-particles">
              {renderMeditationParticles()}
            </div>
          </div>
        </div>

        {/* Phase instruction area - moved above controls, no overlay/absolute/rotate */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="text-center rounded-lg p-4">
            <div className="text-3xl font-bold neon-text mb-2">
              {BREATHING_PHASES[currentPhase].instruction}
            </div>
            <Progress 
              value={phaseProgress} 
              className="w-32 h-2 mx-auto"
            />
          </div>
        </div>

  {/* Character guidance message */}
  <div className="p-4 mb-8 max-w-lg text-center bg-transparent border-none shadow-none">
          <p className="text-primary/80 text-sm mb-2">
            {character.name} guides you:
          </p>
          <p className="text-foreground italic">
            "{currentStyle.message}"
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={toggleMeditation}
            className="glow-effect px-8 py-4 text-lg"
            variant={isActive ? "secondary" : "default"}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause Session
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Begin Session
              </>
            )}
          </Button>
          <Button
            onClick={resetSession}
            variant="outline"
            className="neon-border glow-effect px-6 py-4"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>


        {/* Meditation Protocol Header moved below stats */}
        <div className="w-full flex justify-center mb-8">
          <div className="px-3 py-2 md:px-4">
            <h1 className="text-sm md:text-xl font-bold neon-text text-center md:text-left">
              <span className="hidden sm:inline">DIGITAL CONSCIOUSNESS MEDITATION PROTOCOL v3.0</span>
              <span className="sm:hidden">MEDITATION PROTOCOL v3.0</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Energy particles container */}
      <div className="absolute inset-0 pointer-events-none" id="energy-particles-container"></div>
      {/* Footer for bottom spacing */}
      <footer className="w-full bg-background h-12" />
    </div>
  );
};
