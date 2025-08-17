import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Character, DIGITAL_REALMS, ENTITY_SPECIES, GENDER_EXPRESSIONS, PERSONALITY_TRAITS } from "@/types/character";
import GhostSVG from "./characters/GhostSVG";
import SageSVG from "./characters/SageSVG";
import SpiritSVG from "./characters/SpiritSVG";
import ShamanSVG from "./characters/ShamanSVG";
import QuantumSVG from "./characters/QuantumSVG";
import NeuralSVG from "./characters/NeuralSVG";

interface CharacterCreatorProps {
  onComplete: (character: Character) => void;
}

export const CharacterCreator = ({ onComplete }: CharacterCreatorProps) => {
  const [character, setCharacter] = useState<Character>({
    name: "QUANTUM ENTITY",
    age: 1850,
    realm: "Cyber Tokyo",
    gender: "Fluid",
    species: "Digital Ghost", 
    personality: "Empathetic",
    description: "",
    image: "",
    color: "#32cd32"
  });

  const generateDescription = () => {
    const ageCategory = character.age < 1000 ? "young" : character.age < 3000 ? "mature" : "ancient";
    const realm = DIGITAL_REALMS[character.realm as keyof typeof DIGITAL_REALMS];
    const species = ENTITY_SPECIES[character.species as keyof typeof ENTITY_SPECIES];
    const genderExpr = GENDER_EXPRESSIONS[character.gender as keyof typeof GENDER_EXPRESSIONS];
    const personality = PERSONALITY_TRAITS[character.personality as keyof typeof PERSONALITY_TRAITS];

    return `A sprightly ${character.age}-cycle-old digital native who probably thinks dial-up internet is a prehistoric ritual. Born in ${realm.name}, ${realm.story}. ${genderExpr}. ${personality}. Think of them as your personal ${species.name.toLowerCase()} who ${species.traits.toLowerCase()} and guides you through the digital dimensions before corrupting your soul... just kidding! They genuinely want to help you debug your entity consciousness and optimize your existence through personalized algorithms. 

Initialized with love in JavaScript ❤️`;
  };

  useEffect(() => {
    const description = generateDescription();
    const species = ENTITY_SPECIES[character.species as keyof typeof ENTITY_SPECIES];
    setCharacter(prev => ({ 
      ...prev, 
      description,
      color: species.color
    }));
  }, [character.age, character.realm, character.gender, character.species, character.personality]);

  const handleSliderChange = (field: string, value: number[]) => {
    setCharacter(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleOptionSelect = (field: string, value: string) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  const initializeConsciousness = () => {
    onComplete(character);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="neon-border p-4 mb-6 inline-block">
            <h1 className="text-2xl font-bold neon-text tracking-wider">
              NEON GHOST CONSCIOUSNESS GENERATOR v3.0 - Build Your Entity
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Entity Preview */}
          <Card className="terminal-panel p-6">
            <h2 className="text-lg font-bold mb-4 text-center" style={{ color: '#e6a002' }}>ENTITY PREVIEW</h2>
            <div style={{ marginBottom: '1.25rem' }} />
            <div className="flex flex-col items-center mb-6">
              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 pulse-glow">
                <div className="w-36 h-36 rounded-full bg-primary/30 flex items-center justify-center">
                  {character.species === 'Digital Ghost' && (
                    <GhostSVG
                      colors={{
                        baseColor: '#7fffd4',
                        secondaryColor: '#00ced1',
                        accentColor: '#ffffff',
                      }}
                      className="w-36 h-36"
                    />
                  )}
                  {character.species === 'AI Sage' && (
                    <SageSVG
                      colors={{
                        baseColor: '#ffd700',
                        secondaryColor: '#8a2be2',
                        accentColor: '#fff8dc',
                      }}
                      className="w-36 h-36"
                    />
                  )}
                  {character.species === 'Data Spirit' && (
                    <SpiritSVG
                      colors={{
                        baseColor: '#00bfff',
                        secondaryColor: '#ff69b4',
                        accentColor: '#e0ffff',
                      }}
                      className="w-36 h-36"
                    />
                  )}
                  {character.species === 'Cyber Shaman' && (
                    <ShamanSVG
                      colors={{
                        baseColor: '#ff6347',
                        secondaryColor: '#20b2aa',
                        accentColor: '#ffe4b5',
                      }}
                      className="w-36 h-36"
                    />
                  )}
                  {character.species === 'Quantum Being' && (
                    <QuantumSVG
                      colors={{
                        baseColor: '#00ffea',
                        secondaryColor: '#ff00ea',
                        accentColor: '#fffacd',
                      }}
                      className="w-36 h-36"
                    />
                  )}
                  {character.species === 'Neural Entity' && (
                    <NeuralSVG
                      colors={{
                        baseColor: '#32cd32',
                        secondaryColor: '#4682b4',
                        accentColor: '#f0e68c',
                      }}
                      className="w-36 h-36"
                    />
                  )}
                </div>
              </div>
              <h3 className="text-base mt-4" style={{ color: '#e6a002', fontWeight: 400 }}>{character.name}</h3>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">{character.description}</p>
            </div>

            <Button 
              onClick={initializeConsciousness}
              className="w-full mt-6 bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-3 glow-effect"
            >
              INITIALIZE CONSCIOUSNESS
            </Button>
          </Card>

          {/* Configuration Matrix */}
          <Card className="terminal-panel p-6">
            <h2 className="text-lg font-bold neon-text mb-4 text-center">CONSCIOUSNESS CONFIGURATION MATRIX</h2>
            
            <div className="space-y-6">
              {/* Age Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Age (Digital Years):</label>
                  <span className="text-accent font-bold">{character.age}B</span>
                </div>
                  <Slider
                    value={[character.age]}
                    onValueChange={(value) => handleSliderChange('age', value)}
                    max={42.73}
                    min={-40.28}
                    step={0.01}
                    className="w-full"
                    thumbGlow
                  />
                <div className="text-xs text-muted-foreground mt-1">
                  Selected: {character.age} Billion years old
                </div>
              </div>

                            {/* Entity Species */}
              <div>
                <label className="text-sm font-medium mb-2 block">Entity Species:</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(ENTITY_SPECIES).map((species) => (
                    <Button
                      key={species}
                      variant={character.species === species ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleOptionSelect('species', species)}
                      className="text-xs h-8"
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
                  {Object.keys(DIGITAL_REALMS).map((realm) => (
                    <Button
                      key={realm}
                      variant={character.realm === realm ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleOptionSelect('realm', realm)}
                      className="text-xs h-8"
                    >
                      {realm}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Gender Expression */}
              <div>
                <label className="text-sm font-medium mb-2 block">Gender Expression:</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(GENDER_EXPRESSIONS).map((gender) => (
                    <Button
                      key={gender}
                      variant={character.gender === gender ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleOptionSelect('gender', gender)}
                      className="text-xs h-8"
                    >
                      {gender}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Entity Species
              <div>
                <label className="text-sm font-medium mb-2 block">Entity Species:</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(ENTITY_SPECIES).map((species) => (
                    <Button
                      key={species}
                      variant={character.species === species ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleOptionSelect('species', species)}
                      className="text-xs h-8"
                    >
                      {species}
                    </Button>
                  ))}
                </div>
              </div> */}

              {/* Core Personality */}
              <div>
                <label className="text-sm font-medium mb-2 block">Core Personality:</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(PERSONALITY_TRAITS).map((personality) => (
                    <Button
                      key={personality}
                      variant={character.personality === personality ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleOptionSelect('personality', personality)}
                      className="text-xs h-8"
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
                  onClick={() => {
                    const realms = Object.keys(DIGITAL_REALMS);
                    const species = Object.keys(ENTITY_SPECIES);
                    const genders = Object.keys(GENDER_EXPRESSIONS);
                    const personalities = Object.keys(PERSONALITY_TRAITS);
                    
                    setCharacter(prev => ({
                      ...prev,
                      age: Math.floor(Math.random() * 6689) + 100,
                      realm: realms[Math.floor(Math.random() * realms.length)],
                      gender: genders[Math.floor(Math.random() * genders.length)],
                      species: species[Math.floor(Math.random() * species.length)],
                      personality: personalities[Math.floor(Math.random() * personalities.length)]
                    }));
                  }}
                  className="w-full glow-effect"
                >
                  🎲 RANDOMIZE ENTITY CONFIGURATION
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};