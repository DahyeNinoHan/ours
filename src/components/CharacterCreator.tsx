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

interface CharacterCreatorProps {
  onComplete: (character: Character) => void;
}
export const CharacterCreator = ({
  onComplete
}: CharacterCreatorProps) => {
  const navigate = useNavigate();
  const [showIncubator, setShowIncubator] = useState(true);
  const [showAwakening, setShowAwakening] = useState(false);
  const [character, setCharacter] = useState<Character>({
    name: "QUANTUM ENTITY",
    age: 3920896199,
    realm: "Auroral Rainbow",
    species: "Neon Ghost",
    personality: "Pioneer",
    description: "",
    image: "",
    color: "#32cd32"
  });
  const generateDescription = () => {
    const ageCategory = character.age < 1000 ? "young" : character.age < 3000 ? "mature" : "ancient";
    const realm = DIGITAL_REALMS[character.realm as keyof typeof DIGITAL_REALMS];
    const species = ENTITY_SPECIES[character.species as keyof typeof ENTITY_SPECIES];
    const personality = PERSONALITY_TRAITS[character.personality as keyof typeof PERSONALITY_TRAITS];
    
    return `A sprightly ${character.age}-old digital native who probably thinks dial-up internet is a prehistoric ritual. Born in ${realm.name}, ${realm.story}. ${personality}. Think of them as your personal ${species.name.toLowerCase()} who ${species.traits.toLowerCase()} and guides you through the digital dimensions before corrupting your soul... just kidding! They genuinely want to help you debug your entity consciousness and optimize your existence through personalized algorithms. 

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
  }, [character.age, character.realm, character.species, character.personality]);
  const handleSliderChange = (field: string, value: number[]) => {
    setCharacter(prev => ({
      ...prev,
      [field]: value[0]
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
                <p className="text-white/80 text-3xl font-mono tracking-[0.1em] mb-24">
                Your entity is approaching you...
              </p>
            </div>
            
            <div className="animate-fade-in animation-delay-1000 space-y-8">
                {/* Terminal Flowchart */}
                <div className="flex flex-col items-center space-y-0">
                  {/* Vertical line */}
                  <div className="w-px h-16 bg-white/40"></div>
                  
                  {/* Horizontal split */}
                  <div className="relative flex items-center">
                    {/* Left horizontal line */}
                    <div className="w-32 h-px bg-white/40"></div>
                    
                    {/* Junction point */}
                    <div className="w-2 h-2 bg-white/60 rounded-full border border-white/40"></div>
                    
                    {/* Right horizontal line */}
                    <div className="w-32 h-px bg-white/40"></div>
                  </div>
                  
                  {/* Buttons at the end of lines */}
                  <div className="flex justify-between w-full max-w-2xl pt-4 gap-x-8">
                     <Button
                       onClick={() => navigate('/chat', { state: { character } })}
                      className="w-full py-10 bg-white text-black font-bold border border-white/30 hover:bg-white/80 hover:border-white/50 transition-all duration-300 font-mono tracking-wider text-4xl hover:shadow-[0_0_16px_4px_#32cd32aa]"
                    >
                      Chat
                    </Button>
                     <Button
                       onClick={() => navigate('/meditation', { state: { character } })}
                      className="w-full py-10 bg-white text-black font-bold border border-white/30 hover:bg-white/80 hover:border-white/50 transition-all duration-300 font-mono tracking-wider text-4xl hover:shadow-[0_0_16px_4px_#32cd32aa]"
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
        <div className="text-center mt-16 mb-24">
          <Dialog open={showIncubator} onOpenChange={setShowIncubator}>
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
                    onClick={() => setShowIncubator(false)}
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
            <span>
              ╔════════════════════════════════════════╗<br />
                ║ DIGITAL CONSCIOUSNESS GENERATOR v3.0                                                    ║<br />
              ╚════════════════════════════════════════╝
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Entity Preview */}
          <Card className="terminal-panel p-6">
            <h2 className="text-lg font-bold mb-4 text-center" style={{
            color: '#e6a002'
          }}>ENTITY PREVIEW</h2>
            <div style={{
            marginBottom: '2.5rem'
          }} />
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-56 h-56 mb-4 flex items-center justify-center">
                {/* 부모 원 */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20" style={{zIndex: 1, backgroundColor: '#0D0D0D', mixBlendMode: 'multiply'}} />
                {/* 내부 원 */}
                <div className="absolute left-1/2 top-1/2 w-50 h-50 rounded-full bg-[#241116] flex items-center justify-center" style={{transform: 'translate(-50%, -50%)', zIndex: 2}} />
                {/* 캐릭터 SVG */}
                <div className="absolute left-1/2 top-1/2" style={{transform: 'translate(-50%, -50%)', zIndex: 3}}>
                  {character.species === 'Neon Ghost' && <GhostSVG colors={{
                    baseColor: '#e91e63',     
                    secondaryColor: '#3498db',
                    accentColor: '#f1c40f'    
                  }} className="w-36 h-36" />}
                  {character.species === 'Supernova Microbe' && <MicrobeSVG colors={{
                    baseColor: '#ff69b4',    // 핫 핑크 (몸체 테두리)
                    secondaryColor: '#32cd32', // 라임 그린 (눈동자, 꽃잎)
                    accentColor: '#90ee90'    // 라이트 그린 (날개, 입)
                  }} className="w-36 h-36" />}
                  {character.species === 'Quantum Fairy' && <QuantumSVG colors={{
                    baseColor: '#ffd700',     // 골드 (테두리)
                    secondaryColor: '#ff1493', // 딥 핑크 (입, 하단 라인)
                    accentColor: '#00bfff'     // 딥 스카이 블루 (눈, 상단 라인)
                  }} className="w-36 h-36" />}
                  {character.species === 'Cyber Shaman' && <ShamanSVG colors={{
                    baseColor: '#9b59b6',     // 보라색 (후드 테두리)
                    secondaryColor: '#e91e63', // 핫 핑크 (삼각형, 의식원)
                    accentColor: '#f39c12'    // 오렌지 (의식 심볼들, 십자선)
                  }} className="w-36 h-36" />}
                  {character.species === 'Neural Entity' && <NeuralSVG colors={{
                    baseColor: '#ff6b35',
                    secondaryColor: '#ffe66d',
                    accentColor: '#4ecdc4'
                  }} className="w-36 h-36" />}
                  {character.species === 'Echo Prism' && <PrismSVG colors={{
                    baseColor: '#ff6b35',
                    secondaryColor: '#ffe66d',
                    accentColor: '#4ecdc4'
                  }} className="w-36 h-36" />}
                </div>
              </div>
              <h3 className="text-base mt-4" style={{
              color: '#e6a002',
              fontWeight: 400
            }}>{character.name}</h3>
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

          {/* Configuration Matrix */}
          <Card className="terminal-panel p-6">
            <h2 className="text-lg font-bold neon-text mb-4 text-center">CONSCIOUSNESS CONFIGURATION MATRIX</h2>
            
            <div className="space-y-6">
              {/* Age Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Age (Digital Years):</label>
                  {/* <span className="text-accent font-bold">{character.age}B</span> */}
                </div>
                  <Slider value={[character.age]} onValueChange={value => handleSliderChange('age', value)} max={3920896199} min={-3999817093} step={0.01} className="w-full" thumbGlow />
                <div className="text-xs text-muted-foreground mt-1">
                  Selected: {Math.floor(character.age)} years old
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
                <Button variant="outline" onClick={() => {
                const realms = Object.keys(DIGITAL_REALMS) as (keyof typeof DIGITAL_REALMS)[];
                const species = Object.keys(ENTITY_SPECIES) as (keyof typeof ENTITY_SPECIES)[];
                const personalities = Object.keys(PERSONALITY_TRAITS) as (keyof typeof PERSONALITY_TRAITS)[];
                setCharacter(prev => ({
                  ...prev,
                  age: Math.floor(Math.random() * 6689) + 100,
                  realm: realms[Math.floor(Math.random() * realms.length)],
                  species: species[Math.floor(Math.random() * species.length)],
                  personality: personalities[Math.floor(Math.random() * personalities.length)]
                }));
              }} className="w-full glow-effect">
                  🎲 RANDOMIZE ENTITY CONFIGURATION
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>;
};