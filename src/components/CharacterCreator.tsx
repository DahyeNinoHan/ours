import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Character, DIGITAL_REALMS, ENTITY_SPECIES, PERSONALITY_TRAITS } from "@/types/character";
import GhostSVG from "./characters/GhostSVG";
import MicrobeSVG from "./characters/MicrobeSVG";
import QuantumSVG from "./characters/QuantumSVG";
import ShamanSVG from "./characters/ShamanSVG";
import NeuralSVG from "./characters/NeuralSVG";
import PrismSVG from "./characters/PrismSVG";
import styles from './CharacterCreator.module.css';

// Cosmic Phase Interfaces
interface CosmicPhase {
  name: string;
  minAge: number;
  maxAge: number;
  glowColor: string;
  className: string;
}

interface Position {
  x: number;
  y: number;
}

interface CharacterCreatorProps {
  onComplete: (character: Character) => void;
}
export const CharacterCreator = ({
  onComplete
}: CharacterCreatorProps) => {
  const navigate = useNavigate();
  const [showIncubator, setShowIncubator] = useState(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    return !hasSeenPopup; // Show popup only if user hasn't seen it
  });
  const [showAwakening, setShowAwakening] = useState(false);
  const [character, setCharacter] = useState<Character>({
    name: "QUANTUM ENTITY",
    age: 0, // Start at 0 for Main Sequence Star phase
    realm: "Auroral Rainbow",
    species: "Neon Ghost",
    personality: "Pioneer",
    description: "",
    image: "",
    color: "#32cd32"
  });
  const [cosmicAge, setCosmicAge] = useState<number>(0);

  // Cosmic Phases Configuration
  const COSMIC_PHASES: CosmicPhase[] = [
    {
      name: "Primordial Nebula",
      minAge: -40,
      maxAge: -10,
      glowColor: "#663399",
      className: "phase-nebula"
    },
    {
      name: "Main Sequence Star",
      minAge: -10,
      maxAge: 0,
      glowColor: "#4169e1",
      className: "phase-mainsequence"
    },
    {
      name: "Red Supergiant",
      minAge: 0,
      maxAge: 15,
      glowColor: "#ff4500",
      className: "phase-redgiant"
    },
    {
      name: "Supernova",
      minAge: 15,
      maxAge: 25,
      glowColor: "#ff6b35",
      className: "phase-supernova"
    },
    {
      name: "Black Hole",
      minAge: 25,
      maxAge: 40,
      glowColor: "#9400d3",
      className: "phase-blackhole"
    }
  ];

  // Helper Functions
  const getRealmBackgroundColor = (realm: string): string => {
    const realmColorMap: Record<string, string> = {
      'Auroral Rainbow': '#e91e63',
      'K-Galaxloop': '#3498db',
      'Void Station': '#7F7F7F',
      'Cosmic Hawaii': '#9b59b6',
      'Arcane Peru': '#66ff33c1',
      'X-Mars': '#ffaa00'
    };
    return realmColorMap[realm] || '#2D2A4A'; // Default color if realm not found
  };

  const mapToOriginalRange = (age: number): number => {
    // Map from slider range (-3999817093 to 3920896199) to cosmic range (-40 to 40)
    const sliderMin = -3999817093;
    const sliderMax = 3920896199;
    const cosmicMin = -40;
    const cosmicMax = 40;
    
    const normalizedAge = (age - sliderMin) / (sliderMax - sliderMin);
    return cosmicMin + normalizedAge * (cosmicMax - cosmicMin);
  };

  const getCosmicPhase = (mappedAge: number): CosmicPhase => {
    return COSMIC_PHASES.find(phase => 
      mappedAge >= phase.minAge && mappedAge < phase.maxAge
    ) || COSMIC_PHASES[COSMIC_PHASES.length - 1]; // Default to Black Hole if beyond range
  };

  const getPhaseProgress = (mappedAge: number, phase: CosmicPhase): number => {
    const phaseRange = phase.maxAge - phase.minAge;
    const ageInPhase = mappedAge - phase.minAge;
    return Math.max(0, Math.min(1, ageInPhase / phaseRange));
  };

  // Cosmic Evolution Generators - Compact sizes matching reference HTML
  // All effects are scaled to fit within 180px container with subtle animations
  // Position effects at top of character (cx=100, cy=45) to emanate from head/upper body
  const generateNebula = (progress: number, baseColor: string): JSX.Element => {
    const opacity = 0.3 + progress * 0.2;
    const outerRx = 5 + progress * 15; // Range: 5-20
    const outerRy = 3 + progress * 10; // Range: 3-13
    const centerX = 100;
    const centerY = 45; // Position at top of character
    
    return (
      <g className={styles.nebula}>
        {/* Swirling nebula clouds - positioned at character's top */}
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={outerRx}
          ry={outerRy}
          fill="#663399"
          opacity={opacity}
        />
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={outerRx * 0.75}
          ry={outerRy * 0.75}
          fill="#9932cc"
          opacity={opacity * 0.8}
        />
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={outerRx * 0.5}
          ry={outerRy * 0.5}
          fill="#4b0082"
          opacity={opacity * 0.6}
        />
        {/* Cosmic dust particles - radiating from character's top */}
        {[...Array(10)].map((_, i) => (
          <circle
            key={i}
            cx={centerX + Math.cos(i * Math.PI / 5) * (15 + i * 2)}
            cy={centerY + Math.sin(i * Math.PI / 5) * (12 + i * 1.5)}
            r={0.5 + progress * 1.5} // Range: 0.5-2
            fill="#663399"
            opacity={0.4 + progress * 0.2}
            className={styles.floatingParticle}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </g>
    );
  };

  const generateMainSequenceStar = (progress: number, baseColor: string): JSX.Element => {
    const coreSize = 3 + progress * 5; // Range: 3-8
    const coronaSize = 5 + progress * 6; // Range: 5-11
    const flareLength = 8 + progress * 6; // Range: 8-14
    const numFlares = Math.floor(4 + progress * 4); // Range: 4-8 flares
    const centerX = 100;
    const centerY = 45; // Position at top of character
    
    return (
      <g className={styles.mainSequenceStar}>
        {/* Corona layers - positioned at character's top */}
        <circle
          cx={centerX}
          cy={centerY}
          r={coronaSize}
          fill="#ffff00"
          opacity={0.2 + progress * 0.15}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={coronaSize * 0.7}
          fill="#ffffff"
          opacity={0.25 + progress * 0.15}
        />
        {/* Star core - positioned at character's top */}
        <circle
          cx={centerX}
          cy={centerY}
          r={coreSize}
          fill="#4169e1"
          opacity={0.8}
        />
        {/* Solar flares - radiating from character's top */}
        {[...Array(numFlares)].map((_, i) => (
          <path
            key={i}
            d={`M${centerX},${centerY} Q${centerX + Math.cos(i * 2 * Math.PI / numFlares) * (coreSize + 2)},${centerY + Math.sin(i * 2 * Math.PI / numFlares) * (coreSize + 2)} ${centerX + Math.cos(i * 2 * Math.PI / numFlares) * flareLength},${centerY + Math.sin(i * 2 * Math.PI / numFlares) * flareLength}`}
            stroke="#ff6b35"
            strokeWidth="1.5"
            fill="none"
            opacity={0.5 + progress * 0.2}
          />
        ))}
      </g>
    );
  };

  const generateRedGiant = (progress: number, baseColor: string): JSX.Element => {
    const giantSize = 8 + progress * 12; // Range: 8-20
    const windLength = 15 + progress * 10; // Range: 15-25
    const centerX = 100;
    const centerY = 45; // Position at top of character
    
    return (
      <g className={styles.redGiant}>
        {/* Expanding red giant layers - positioned at character's top */}
        <circle
          cx={centerX}
          cy={centerY}
          r={giantSize}
          fill="#ff4500"
          opacity={0.3 + progress * 0.2}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={giantSize * 0.8}
          fill="#ff6b35"
          opacity={0.4 + progress * 0.2}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={giantSize * 0.6}
          fill="#ffaa00"
          opacity={0.5 + progress * 0.2}
        />
        {/* Stellar winds - radiating from character's top */}
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M${centerX},${centerY} L${centerX + Math.cos(i * Math.PI / 3) * windLength},${centerY + Math.sin(i * Math.PI / 3) * windLength}`}
            stroke="#ffcc99"
            strokeWidth="1"
            strokeDasharray="2,2"
            opacity={0.4 + progress * 0.1}
          />
        ))}
      </g>
    );
  };

  const generateSupernova = (progress: number, baseColor: string): JSX.Element => {
    const explosionRadius = 15 + progress * 20; // Range: 15-35
    const shockwaveRadius = 25 + progress * 20; // Range: 25-45
    const rayLength = 30 + progress * 25; // Range: 30-55
    const centerX = 100;
    const centerY = 45; // Position at top of character
    
    return (
      <g className={styles.supernova}>
        {/* Explosive shockwaves - positioned at character's top */}
        <circle
          cx={centerX}
          cy={centerY}
          r={shockwaveRadius}
          fill="none"
          stroke="#ff4500"
          strokeWidth="2"
          opacity={0.8 - progress * 0.4}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={explosionRadius}
          fill="none"
          stroke="#ffff00"
          strokeWidth="2"
          opacity={0.9 - progress * 0.3}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={explosionRadius * 0.6}
          fill="#ffffff"
          opacity={0.7 - progress * 0.5}
        />
        {/* Radial rays - extending from character's top */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={centerX + Math.cos(i * Math.PI / 4) * rayLength}
            y2={centerY + Math.sin(i * Math.PI / 4) * rayLength}
            stroke="#ffff00"
            strokeWidth="1.5"
            opacity={0.6 - progress * 0.3}
          />
        ))}
      </g>
    );
  };

  const generateBlackHole = (progress: number, baseColor: string): JSX.Element => {
    const eventHorizonSize = 8 + progress * 4; // Range: 8-12
    const accretionRx = 16 + progress * 8; // Range: 16-24
    const numParticles = Math.floor(6 + progress * 4); // Range: 6-10 particles
    const centerX = 100;
    const centerY = 45; // Position at top of character
    
    return (
      <g>
        {/* Group event horizon and accretion disks to move together like planet and rings */}
        <g className={styles.blackhole}>
          {/* Accretion disks - rendered first (behind) to create planet-with-rings effect */}
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={accretionRx}
            ry={accretionRx * 0.3}
            fill="none"
            stroke="#ff6b35"
            strokeWidth="2"
            opacity={0.7}
          />
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={accretionRx * 0.75}
            ry={accretionRx * 0.2}
            fill="none"
            stroke="#ffaa00"
            strokeWidth="1.5"
            opacity={0.5}
          />
          {/* Gravitational lensing - behind the event horizon */}
          <circle
            cx={centerX}
            cy={centerY}
            r={eventHorizonSize * 2.5}
            fill="none"
            stroke="#4a0080"
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity={0.3}
          />
          {/* Event horizon - rendered last (in front) like a planet above its rings */}
          <circle
            cx={centerX}
            cy={centerY}
            r={eventHorizonSize}
            fill="#000000"
            stroke="#1a0d26"
            strokeWidth="1"
            opacity={0.9}
          />
        </g>
        
        {/* Hawking radiation particles - independent floating animation */}
        {[...Array(numParticles)].map((_, i) => (
          <circle
            key={i}
            cx={centerX + Math.cos(i * 2 * Math.PI / numParticles) * (accretionRx * 1.5)}
            cy={centerY + Math.sin(i * 2 * Math.PI / numParticles) * (accretionRx * 1.5)}
            r={0.5 + progress * 1} // Range: 0.5-1.5
            fill="#9400d3"
            opacity={0.4 + Math.sin(Date.now() * 0.001 + i) * 0.2}
            className={styles.floatingParticle}
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </g>
    );
  };

  const generateCosmicEvolution = (mappedAge: number, baseColor: string): JSX.Element => {
    const currentPhase = getCosmicPhase(mappedAge);
    const progress = getPhaseProgress(mappedAge, currentPhase);

    // All cosmic effects are positioned at cx=100, cy=45 (top of character)
    // to create the visual effect of energy emanating from the character's head/upper body
    // Black hole elements are grouped to move together like a planet and its rings
    switch (currentPhase.name) {
      case 'Primordial Nebula':
        return generateNebula(progress, baseColor);
      case 'Main Sequence Star':
        return generateMainSequenceStar(progress, baseColor);
      case 'Red Supergiant':
        return generateRedGiant(progress, baseColor);
      case 'Supernova':
        return generateSupernova(progress, baseColor);
      case 'Black Hole':
        return generateBlackHole(progress, baseColor);
      default:
        return <g></g>;
    }
  };
  const generateDescription = () => {
    const mappedAge = mapToOriginalRange(character.age);
    const currentPhase = getCosmicPhase(mappedAge);
    const realm = DIGITAL_REALMS[character.realm as keyof typeof DIGITAL_REALMS];
    const species = ENTITY_SPECIES[character.species as keyof typeof ENTITY_SPECIES];
    const personality = PERSONALITY_TRAITS[character.personality as keyof typeof PERSONALITY_TRAITS];
    
    return `A cosmic entity in the ${currentPhase.name} phase (${mappedAge.toFixed(1)}B years). Born in ${realm.name}, ${realm.story}. ${personality}. Think of them as your personal ${species.name.toLowerCase()} who ${species.traits.toLowerCase()} and guides you through the digital dimensions with ${currentPhase.name.toLowerCase()} energy.

Current cosmic evolution: ${currentPhase.name}
Initialized with love in JavaScript ❤️`;
  };

  // Update cosmic age when character age changes
  useEffect(() => {
    const mappedAge = mapToOriginalRange(character.age);
    setCosmicAge(mappedAge);
  }, [character.age]);

  useEffect(() => {
    const description = generateDescription();
    const speciesObj = ENTITY_SPECIES[character.species as keyof typeof ENTITY_SPECIES];
    setCharacter(prev => ({
      ...prev,
      name: speciesObj.name,
      description,
      color: speciesObj.color
    }));
  }, [character.age, character.realm, character.species, character.personality]);
  const handleSliderChange = (field: string, value: number[]) => {
    setCharacter(prev => ({
      ...prev,
      [field]: value[0]
    }));
  };

  const handleCosmicAgeChange = (value: number[]) => {
    const newAge = value[0];
    setCharacter(prev => ({
      ...prev,
      age: newAge
    }));
  };

  const randomizeEntity = () => {
    const realms = Object.keys(DIGITAL_REALMS) as (keyof typeof DIGITAL_REALMS)[];
    const species = Object.keys(ENTITY_SPECIES) as (keyof typeof ENTITY_SPECIES)[];
    const personalities = Object.keys(PERSONALITY_TRAITS) as (keyof typeof PERSONALITY_TRAITS)[];
    
    // Random age across the full cosmic range
    const randomAge = Math.random() * (3920896199 - (-3999817093)) + (-3999817093);
    
    setCharacter(prev => ({
      ...prev,
      age: randomAge,
      realm: realms[Math.floor(Math.random() * realms.length)],
      species: species[Math.floor(Math.random() * species.length)],
      personality: personalities[Math.floor(Math.random() * personalities.length)]
    }));
  };
  const handleOptionSelect = (field: string, value: string) => {
    setCharacter(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const initializeConsciousness = () => {
    setShowAwakening(true);
  };
  return <div className="min-h-screen bg-background text-foreground p-4">
      {/* Awakening Sequence Overlay */}
      {showAwakening && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center space-y-16">
            <div className="animate-fade-in">
                <p className="text-white/80 text-2xl font-mono tracking-[0.1em] mb-24">
                Your entity is approaching you...
              </p>
            </div>
            
            <div className="animate-fade-in animation-delay-1000 space-y-8">
                {/* Terminal Flowchart */}
                <div className="flex flex-col items-center space-y-0">
                  {/* Vertical line */}
                  <div className="relative w-px h-48 bg-white/40 overflow-hidden">
                    <div className="absolute left-0 top-0 w-full h-full animate-flow">
                      <div className="w-px h-40 bg-gradient-to-b from-transparent via-white/80 to-transparent opacity-80"></div>
                    </div>
                  </div>
                  
                  {/* Horizontal split */}
                  <div className="relative flex items-center">
                    {/* Left horizontal line */}
                    {/* <div className="w-40 h-px bg-white/40"></div> */}
                    
                    {/* Junction point */}
                    <div className="w-2 h-2 bg-white/60 rounded-full border border-white/40 mb-10"></div>
                     
                    {/* Right horizontal line */}
                    {/* <div className="w-40 h-px bg-white/40"></div> */}
                  </div>
                  
                  {/* Buttons at the end of lines */}
                  <div className="flex flex-col items-center w-full max-w-2xl pt-4 gap-y-6">
                     <Button
                       onClick={() => navigate('/chat', { state: { character } })}
                      className="w-11/12 py-6 bg-white text-black font-bold border border-white/30 hover:bg-white/80 hover:border-white/50 transition-all duration-300 font-mono tracking-wider text-2xl"
                    >
                      Chat
                    </Button>
                     <Button
                       onClick={() => navigate('/meditation', { state: { character } })}
                      className="w-11/12 py-6 bg-white text-black font-bold border border-white/30 hover:bg-white/80 hover:border-white/50 transition-all duration-300 font-mono tracking-wider text-2xl"
                    >
                      Meditation
                    </Button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
  <div className="text-center mt-16 mb-8">
          <Dialog open={showIncubator} onOpenChange={(open) => {
            setShowIncubator(open);
            if (!open) localStorage.setItem('hasSeenPopup', 'true');
          }}>
            <DialogContent className="max-w-[90vw] w-[90vw] h-[80vh] p-0 bg-black/95 border-none shadow-none backdrop-blur-sm [&>button]:hidden" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            border: 'none',
            boxShadow: 'none'
          }}>
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                {/* Subtle cosmic background effect */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center">
                  
                  <div className="max-w-2xl space-y-8 text-white/80 font-light leading-relaxed">
                    <p className="text-xl tracking-wide leading-[2.0] whitespace-nowrap">
                      Hidden among the stars drifts a presence unseen by others.<br />
                      It hovers quietly, waiting for your recognition.
                    </p>
                    
                    <div className="py-4">
                      <p className="text-xl tracking-wide leading-[2.0]">
                        To bring it into focus,<br />
                        invite its Realm, Entity, Personality, and Age into your world—<br />
                        only then will your gaze awaken it.
                      </p>
                    </div>
                    
                    <div className="pt-8">
                      <p className="text-xl tracking-wide leading-[2.0]">
                        <span style={{ fontFamily: "Noto Sans HK, sans-serif" }}>" </span>Now,<br />
                        they are here to resonate.<span style={{ fontFamily: "Noto Sans HK, sans-serif" }}>"</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Custom close button */}
                  <button 
                    onClick={() => {
                      setShowIncubator(false);
                      localStorage.setItem('hasSeenPopup', 'true');
                    }}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-20"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <h1 className="text-2xl font-bold neon-text tracking-wider mt-8">

            <div className="flex justify-center">
              <img
                src="/title.png"
                alt="DIGITAL CONSCIOUSNESS GENERATOR v3.0"
                className="w-[103%] max-w-[103%] md:w-1/2 md:max-w-1/2"
                style={{ height: 'auto' }}
              />
            </div>
          </h1>
          {/* <h1 className="text-2xl font-bold neon-text tracking-wider mt-8">
            <span>
              ╔════════════════════════════════════════╗<br />
                ║ DIGITAL CONSCIOUSNESS GENERATOR v3.0                                                    ║<br />
              ╚════════════════════════════════════════╝
            </span>
          </h1> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Matrix */}
          <Card className="terminal-panel p-6">
            <h2 className="text-lg font-bold neon-text mb-4 text-center">CONSCIOUSNESS CONFIGURATION MATRIX</h2>
            
            <div className="space-y-6">
              {/* Cosmic Age Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Cosmic Age (Billion Years):</label>
                  <span className="text-accent font-bold">{cosmicAge.toFixed(1)}B</span>
                </div>
                <Slider 
                  value={[character.age]} 
                  onValueChange={handleCosmicAgeChange} 
                  max={3920896199} 
                  min={-3999817093} 
                  step={1000000}
                  className="w-full" 
                />
                <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                  <span>-40B (Primordial Nebula)</span>
                  <span>+40B (Black Hole)</span>
                </div>
                <div className="text-xs text-center mt-1">
                  <span className="text-accent">Phase: {getCosmicPhase(cosmicAge).name}</span>
                </div>
              </div>

                            {/* Entity Species */}
              <div>
                <label className="text-sm font-medium mb-2 block">Entity Species:</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(ENTITY_SPECIES).map(species => (
                    <Button
                      key={species}
                      variant={character.species === species ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleOptionSelect('species', species)}
                      className={`text-xs h-8 ${character.species === species
                        ? 'bg-[#E69F01] text-black'
                        : 'bg-[#0A0A0A] border border-[#0FE607] text-[#0FE607]'}
                      `}
                    >
                      {species}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Digital Origin Realm */}
              <div>
                <label className="text-sm font-medium mb-2 block">Digital Origin Realm:</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(DIGITAL_REALMS).map(realm => (
                    <Button
                      key={realm}
                      variant={character.realm === realm ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleOptionSelect('realm', realm)}
                      className={`text-xs h-8 ${character.realm === realm
                        ? 'bg-[#E69F01] text-black'
                        : 'bg-[#0A0A0A] border border-[#0FE607] text-[#0FE607]'}
                      `}
                    >
                      {realm}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Core Personality */}
              <div>
                <label className="text-sm font-medium mb-2 block">Core Personality:</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(PERSONALITY_TRAITS).map(personality => (
                    <Button
                      key={personality}
                      variant={character.personality === personality ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleOptionSelect('personality', personality)}
                      className={`text-xs h-8 ${character.personality === personality
                        ? 'bg-[#E69F01] text-black'
                        : 'bg-[#0A0A0A] border border-[#0FE607] text-[#0FE607]'}
                      `}
                    >
                      {personality}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Randomize Button */}
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={randomizeEntity}
                  className="w-full glow-effect"
                >
                  🎲 RANDOMIZE ENTITY CONFIGURATION
                </Button>
              </div>
            </div>
          </Card>

          {/* Entity Preview */}
          <Card className="terminal-panel p-6">
            <h2 className="text-lg font-bold mb-4 text-center" style={{
            color: '#e6a002'
          }}>ENTITY PREVIEW</h2>
            <div style={{
            marginBottom: '2.5rem'
          }} />
            <div className="flex flex-col items-center mb-6">
              <div 
                className={`relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] mb-4 flex items-center justify-center ${styles.characterPreview} ${getCosmicPhase(cosmicAge).className}`}
                style={{
                  '--cosmic-glow-color': getCosmicPhase(cosmicAge).glowColor
                } as React.CSSProperties}
              >
                {/* Circular background container centered behind character */}
                <div
                  className="absolute left-1/2 top-1/2 rounded-full w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px]"
                  style={{
                    zIndex: 1,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: getRealmBackgroundColor(character.realm),
                    opacity: 0.20,
                    borderRadius: '50%'
                  }}
                />

                {/* Inner background circle */}
                <div className="absolute left-1/2 top-1/2 w-50 h-50 rounded-full bg-[#16213E] flex items-center justify-center" style={{transform: 'translate(-50%, -50%)', zIndex: 2}} />
                
                {/* Cosmic Evolution Effects */}
                <div className={`absolute inset-0 ${styles.cosmicOverlay}`} style={{zIndex: 3}}>
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {generateCosmicEvolution(cosmicAge, character.color)}
                  </svg>
                </div>
                
                {/* Character SVG with cosmic glow */}
                <div 
                  className={`absolute left-1/2 top-1/2 ${styles.glowEffect}`}
                  style={{
                    transform: 'translate(-50%, -50%)', 
                    zIndex: 4,
                    '--cosmic-glow-color': getCosmicPhase(cosmicAge).glowColor
                  } as React.CSSProperties}
                >
                  {character.species === 'Neon Ghost' && <GhostSVG colors={{
                    baseColor: '#e91e63',     
                    secondaryColor: '#3498db',
                    accentColor: '#f1c40f'    
                  }} className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]" />}
                  {character.species === 'Supernova Microbe' && <MicrobeSVG colors={{
                    baseColor: '#ff69b4',
                    secondaryColor: '#32cd32',
                    accentColor: '#90ee90'
                  }} className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[140px] md:h-[140px]" />}
                  {character.species === 'Quantum Fairy' && <QuantumSVG colors={{
                    baseColor: '#ffd700',
                    secondaryColor: '#ff1493',
                    accentColor: '#00bfff'
                  }} className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]" />}
                  {character.species === 'Cyber Shaman' && (
                    <div style={{position: 'relative', top: '-6px'}}>
                      <ShamanSVG colors={{
                        baseColor: '#9b59b6',
                        secondaryColor: '#e91e63',
                        accentColor: '#f39c12'
                      }} className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]" />
                    </div>
                  )}
                  {character.species === 'Neural Entity' && <NeuralSVG colors={{
                    baseColor: '#ff6b35',
                    secondaryColor: '#ffe66d',
                    accentColor: '#4ecdc4'
                  }} className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[140px] md:h-[140px]" />}
                  {character.species === 'Echo Prism' && <PrismSVG colors={{
                    baseColor: '#20b2aa',
                    secondaryColor: '#87ceeb',
                    accentColor: '#00ced1'
                  }} className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[140px] md:h-[140px]" />}
                </div>
              </div>
              
              {/* Character name and cosmic phase info */}
              <h3 className="text-base mt-4" style={{
                color: '#e6a002',
                fontWeight: 400
              }}>{character.name}</h3>
              
              <div className="text-sm text-center mt-2 space-y-1">
                <p className="text-muted-foreground">
                  <span className="text-accent font-semibold">Current Phase:</span> {getCosmicPhase(cosmicAge).name}
                </p>
                <p className="text-muted-foreground text-xs">
                  Cosmic Age: {cosmicAge.toFixed(1)}B years
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">{character.description}</p>
            </div>

            <Button onClick={initializeConsciousness} className="w-full mt-6 bg-[#E69F01] hover:bg-[#E69F01]/80 text-black font-bold py-3 glow-effect">
              INITIALIZE YOUR OWN ENTITY
            </Button>
            {/* <Button
              onClick={() => navigate('/meditation', { state: { character } })}
              className="w-full mt-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 glow-effect"
             >
              MEDITATION
             </Button> */}
          </Card>
        </div>
      </div>
    </div>;
};