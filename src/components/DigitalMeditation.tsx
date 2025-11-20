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
import { ArrowLeft, Play, Pause, RotateCcw, Monitor, X } from "lucide-react";

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
  const [isScreenSaver, setIsScreenSaver] = useState(false);

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
      message: "Optimize neural pathways through systematic breathing..."
    },
    "Echo Prism": {
      gradient: "from-secondary/20 via-secondary/5 to-transparent",
      pulseColor: "shadow-[0_0_100px_hsl(180_100%_50%/0.3)]",
      message: "Reflect consciousness through prismatic meditation..."
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

  // Close screensaver on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isScreenSaver) {
        setIsScreenSaver(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isScreenSaver]);

  // Extract the meditation visual so we can reuse it in screensaver mode
  const renderMeditationVisual = () => (
    <div className="relative mb-28">
      <div 
        className={`meditation-visual transition-all duration-${BREATHING_PHASES[currentPhase].duration} ease-in-out ${getCircleScale()}`}
        style={{
          width: 'min(80vw, 480px)',
          height: 'min(80vw, 480px)',
          boxSizing: 'border-box',
          maxWidth: '560px',
          maxHeight: '560px'
        }}
      >
        {/* Multi-layer breathing circles */}
        <div className="breathing-circle breathing-circle-1"></div>
        <div className="breathing-circle breathing-circle-2"></div>
        <div className="breathing-circle breathing-circle-3"></div>

        {/* Character container with floating animation */}
        <div className="meditation-character-container">
          <div className="meditation-character-svg">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              {character.species === 'Neon Ghost' && (
                <GhostSVG colors={{ baseColor: '#e91e63', secondaryColor: '#3498db', accentColor: '#f1c40f' }} className="w-3/4 h-3/4" />
              )}
              {character.species === 'Supernova Microbe' && (
                <MicrobeSVG colors={{ baseColor: '#ff69b4', secondaryColor: '#32cd32', accentColor: '#90ee90' }} className="w-3/4 h-3/4" />
              )}
              {character.species === 'Quantum Fairy' && (
                <QuantumSVG colors={{ baseColor: '#ffd700', secondaryColor: '#ff1493', accentColor: '#00bfff' }} className="w-3/4 h-3/4" />
              )}
              {character.species === 'Cyber Shaman' && (
                <ShamanSVG colors={{ baseColor: '#9b59b6', secondaryColor: '#e91e63', accentColor: '#f39c12' }} className="w-3/4 h-3/4" />
              )}
              {character.species === 'Neural Entity' && (
                <NeuralSVG colors={{ baseColor: '#ff6b35', secondaryColor: '#ffe66d', accentColor: '#4ecdc4' }} className="w-3/4 h-3/4" />
              )}
              {character.species === 'Echo Prism' && (
                <PrismSVG colors={{ baseColor: '#20b2aa', secondaryColor: '#87ceeb', accentColor: '#00ced1' }} className="w-3/4 h-3/4" />
              )}
            </div>
          </div>
        </div>

        {/* Meditation particles */}
        <div className="absolute inset-0 overflow-hidden" id="meditation-particles">
          {renderMeditationParticles()}
        </div>
      </div>
    </div>
  );

  // If screensaver mode is active, render a minimal fullscreen view with only
  // the gradient, the meditation visual (with particles), the energy particles
  // container, and a small exit button. Cursor is hidden in this mode.
  if (isScreenSaver) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden cursor-none transition-all duration-1000">
        {/* Background gradient (kept) */}
        <div className={`absolute inset-0 bg-gradient-radial ${currentStyle.gradient}`} />

        {/* Exit button (top-right) */}
        <button
          onClick={() => setIsScreenSaver(false)}
          aria-label="Exit Screen Saver"
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/30 hover:bg-black/40 transform transition-all duration-200 hover:scale-110 text-white/90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Centered meditation visual (only thing visible besides gradient) */}
        <div className="relative z-40 flex items-center justify-center min-h-screen">
          {renderMeditationVisual()}
        </div>

        {/* Energy particles container (background) */}
        <div className="absolute inset-0 pointer-events-none" id="energy-particles-container"></div>

        {/* Bottom neon line (optional) */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-all duration-1000">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-radial ${currentStyle.gradient}`} />

      {/* Screen Saver toggle (top-center) */}
      <div className="absolute left-1/2 top-4 transform -translate-x-1/2 z-50">
        <button
          onClick={() => setIsScreenSaver(true)}
          aria-label="Enter Screen Saver"
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm text-white/90 hover:scale-105 transition-transform duration-200 hover:shadow-lg"
        >
          <Monitor className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Screen Saver</span>
        </button>
      </div>

      {/* Header + Session stats row */}
      <div className="relative z-10 px-4 pb-4 pt-1.5 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div className="flex gap-2 mb-6 justify-center md:justify-start">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.assign('/main')}
              className="text-xs min-w-[120px]"
            >
              Main
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onBack}
              className="text-xs min-w-[120px]"
            >
              Chat
            </Button>
          </div>
          {/* Session stats - now in header row */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="p-4 text-center bg-transparent border-none shadow-none">
                <div className="text-l font-bold neon-text">{formatTime(sessionTime)}</div>
                <div className="text-xs text-muted-foreground">Session Time</div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="p-4 text-center bg-transparent border-none shadow-none">
                <div className="text-l font-bold neon-text">{completedCycles}</div>
                <div className="text-xs text-muted-foreground">Cycles</div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="p-4 text-center bg-transparent border-none shadow-none">
                <div className="text-l font-bold neon-text">
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
        {renderMeditationVisual()}

        {/* Phase instruction area - moved above controls, no overlay/absolute/rotate */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="text-center rounded-lg p-4">
            <div className="text-2xl font-bold neon-text mb-2">
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
            className="px-6 py-4"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>


        {/* Meditation Protocol Header moved below stats */}
        <div className="w-full flex justify-center mb-8">
          <div className="px-3 py-2 md:px-4">
            <h1 className="text-sm md:text-xl font-bold neon-text text-center md:text-left">
                <span className="hidden sm:inline"><br />
                ║  DIGITAL CONSCIOUSNESS MEDITATION PROTOCOL v3.0  ║<br />
                </span>

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
