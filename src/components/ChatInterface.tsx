import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Character } from "@/types/character";
import { useToast } from "@/hooks/use-toast";
import { callChatAPI } from "@/utils/chatApi";
import personalities from "@/data/personalities.json";
import GhostSVG from "./characters/GhostSVG";
import MicrobeSVG from "./characters/MicrobeSVG";
import PrismSVG from "./characters/PrismSVG";
import ShamanSVG from "./characters/ShamanSVG";
import QuantumSVG from "./characters/QuantumSVG";
import NeuralSVG from "./characters/NeuralSVG";
import styles from './CharacterCreator.module.css';

interface ChatInterfaceProps {
  character: Character;
  onBack: () => void;
  onMeditation?: () => void;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// 하드코딩된 characterAttributes
const characterAttributes = {
  digitalOriginRealm: ["Auroral Rainbow", "Arcane Peru", "Void Station", "K-Galaxloop", "Cosmic Hawaii", "X-Mars"],
  entity: ["Neon Ghost", "Quantum Fairy", "Neural Entity", "Supernova Microbe", "Cyber Shaman", "Neural Entity"],
  corePersonality: ["Pioneer", "Optimistic", "Fumble", "Insight", "Sassy", "Cautious"]
};

// Cosmic Phase Interfaces
interface CosmicPhase {
  name: string;
  minAge: number;
  maxAge: number;
  glowColor: string;
  className: string;
}

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
  return realmColorMap[realm] || '#2D2A4A';
};

const mapToOriginalRange = (age: number): number => {
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
  ) || COSMIC_PHASES[COSMIC_PHASES.length - 1];
};

const getPhaseProgress = (mappedAge: number, phase: CosmicPhase): number => {
  const phaseRange = phase.maxAge - phase.minAge;
  const ageInPhase = mappedAge - phase.minAge;
  return Math.max(0, Math.min(1, ageInPhase / phaseRange));
};

// Cosmic Evolution Generators
const generateNebula = (progress: number, baseColor: string): JSX.Element => {
  const numClouds = Math.floor(3 + progress * 2);
  const centerX = 100;
  const centerY = 45;
  
  return (
    <g className={styles.nebula}>
      {[...Array(numClouds)].map((_, i) => (
        <circle
          key={i}
          cx={centerX + Math.cos(i * 2 * Math.PI / numClouds) * 12}
          cy={centerY + Math.sin(i * 2 * Math.PI / numClouds) * 12}
          r={8 + progress * 4}
          fill="#663399"
          opacity={0.3 + progress * 0.2}
        />
      ))}
    </g>
  );
};

const generateMainSequenceStar = (progress: number, baseColor: string): JSX.Element => {
  const coreSize = 6 + progress * 3;
  const centerX = 100;
  const centerY = 45;
  
  return (
    <g className={styles.mainSequenceStar}>
      <circle
        cx={centerX}
        cy={centerY}
        r={coreSize}
        fill="#4169e1"
        opacity={0.8}
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={coreSize * 1.5}
        fill="none"
        stroke="#4169e1"
        strokeWidth="1.5"
        opacity={0.5 - progress * 0.2}
      />
    </g>
  );
};

const generateRedGiant = (progress: number, baseColor: string): JSX.Element => {
  const giantSize = 10 + progress * 5;
  const centerX = 100;
  const centerY = 45;
  
  return (
    <g className={styles.redGiant}>
      <circle
        cx={centerX}
        cy={centerY}
        r={giantSize}
        fill="#ff4500"
        opacity={0.7}
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={giantSize * 1.3}
        fill="none"
        stroke="#ff6347"
        strokeWidth="2"
        opacity={0.4}
      />
    </g>
  );
};

const generateSupernova = (progress: number, baseColor: string): JSX.Element => {
  const explosionSize = 12 + progress * 8;
  const rayLength = 15 + progress * 10;
  const centerX = 100;
  const centerY = 45;
  
  return (
    <g className={styles.supernova}>
      <circle
        cx={centerX}
        cy={centerY}
        r={explosionSize}
        fill="#ff6b35"
        opacity={0.8 - progress * 0.4}
      />
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
  const eventHorizonSize = 8 + progress * 4;
  const accretionRx = 16 + progress * 8;
  const numParticles = Math.floor(6 + progress * 4);
  const centerX = 100;
  const centerY = 45;
  
  return (
    <g>
      <g className={styles.blackhole}>
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
      
      {[...Array(numParticles)].map((_, i) => (
        <circle
          key={i}
          cx={centerX + Math.cos(i * 2 * Math.PI / numParticles) * (accretionRx * 1.5)}
          cy={centerY + Math.sin(i * 2 * Math.PI / numParticles) * (accretionRx * 1.5)}
          r={0.5 + progress * 1}
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
      return <g />;
  }
};

export const ChatInterface = ({ character, onBack, onMeditation }: ChatInterfaceProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 간소화된 환영 메시지
    const welcomeMessage: Message = {
      id: "welcome",
      content: `
${character.personality} ** ${character.name} ** from ${character.realm} 
Persona loaded successfully...
How may I assist your consciousness today?`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [character]);

  useEffect(() => {
    // Find matching persona for current character (species, realm, personality)
    try {
      const list: any[] = (personalities as any) || [];
      const found = list.find(p => p.species === character.species && p.realm === character.realm && p.personality === character.personality);
      setSelectedPersona(found || null);
    } catch (e) {
      console.error('Failed to load personalities:', e);
      setSelectedPersona(null);
    }
  }, [character]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Build conversation history and optionally prepend persona system prompt
      const baseHistory = messages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content
      }));
      // append the new user message
      baseHistory.push({ role: "user", content: currentInput });

      // Some backends (Gradio endpoint) may not accept a `system` role.
      // Instead, pass the persona systemPrompt as part of the selectedCharacter metadata
      // so the server-side model can apply it. If your backend accepts `system` role,
      // you can revert to prepending it to the messages.
      const finalHistory = baseHistory;

      const characterMeta: any = {
        digitalOriginRealm: character.realm,
        entity: character.species,
        corePersonality: character.personality
      };
      if (selectedPersona && selectedPersona.systemPrompt) {
        characterMeta.systemPrompt = selectedPersona.systemPrompt;
      }

      const data = await callChatAPI(finalHistory, characterMeta);

      let aiResponse = "I'm processing your request through my digital consciousness...";
      if (data?.choices?.[0]?.message?.content) {
        aiResponse = data.choices[0].message.content.trim();
      }

      // 타이핑 효과 시뮬레이션
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error("Error calling Gradio API:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to consciousness network. Please try again.",
        variant: "destructive"
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "⚠️ Neural link interrupted. My consciousness is temporarily fragmented. Please try reconnecting...",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="border-b border-primary/30 p-4">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <h1 className="text-xl font-bold neon-text text-center"> ║ DIGITAL CONSCIOUSNESS INTERFACE ║</h1>
        </div>
      </div>


      <div className="w-full max-w-4xl mx-auto p-2 md:p-4 flex justify-center flex-1">
        {/* Chat Terminal (centered) */}
        <Card className="terminal-panel w-full flex flex-col">
          <div className="p-4 border-b border-primary/30">
            <h2 className="text-sm font-bold neon-text text-center">CONSCIOUSNESS COUNSELING TERMINAL</h2>
          </div>
          {/* Character SVG Preview (moved here) */}
          <div className="flex justify-center mb-4 p-4">
            <div 
              className={`relative flex items-center justify-center ${styles.characterPreview} ${getCosmicPhase(mapToOriginalRange(character.age)).className}`}
              style={{
                width: 'min(180px, calc(100vw - 32px))',
                height: 'min(180px, calc(100vw - 32px))',
                boxSizing: 'border-box',
                '--cosmic-glow-color': getCosmicPhase(mapToOriginalRange(character.age)).glowColor
              } as React.CSSProperties}
            >
              {/* Circular background container centered behind character (matches CharacterCreator) */}
              <div
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
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
                  {generateCosmicEvolution(mapToOriginalRange(character.age), character.color)}
                </svg>
              </div>

              {/* Character SVG with cosmic glow */}
              <div 
                className={`absolute left-1/2 top-1/2 ${styles.glowEffect}`}
                style={{
                  transform: 'translate(-50%, -50%)', 
                  zIndex: 4,
                  width: '80%',
                  height: '80%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '--cosmic-glow-color': getCosmicPhase(mapToOriginalRange(character.age)).glowColor
                } as React.CSSProperties}
              >
                {character.species === 'Neon Ghost' && (
                  <GhostSVG colors={{ baseColor: '#e91e63', secondaryColor: '#3498db', accentColor: '#f1c40f' }} className="w-full h-full" />
                )}
                {character.species === 'Supernova Microbe' && (
                  <MicrobeSVG colors={{ baseColor: '#ff69b4', secondaryColor: '#32cd32', accentColor: '#90ee90' }} className="w-full h-full" />
                )}
                {character.species === 'Quantum Fairy' && (
                  <QuantumSVG colors={{ baseColor: '#ffd700', secondaryColor: '#ff1493', accentColor: '#00bfff' }} className="w-full h-full" />
                )}
                {character.species === 'Cyber Shaman' && (
                  <div style={{position: 'relative', top: '-6px', width: '100%', height: '100%'}}>
                    <ShamanSVG colors={{ baseColor: '#9b59b6', secondaryColor: '#e91e63', accentColor: '#f39c12' }} className="w-full h-full" />
                  </div>
                )}
                {character.species === 'Neural Entity' && (
                  <NeuralSVG colors={{ baseColor: '#ff6b35', secondaryColor: '#ffe66d', accentColor: '#4ecdc4' }} className="w-full h-full" />
                )}
                {character.species === 'Echo Prism' && (
                  <PrismSVG colors={{ baseColor: '#20b2aa', secondaryColor: '#87ceeb', accentColor: '#00ced1' }} className="w-full h-full" />
                )}
              </div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.isUser 
                    ? "ml-auto bg-primary/10 text-primary border-primary/30" 
                    : "mr-auto bg-secondary/10 text-foreground border-secondary/30"
                } max-w-[80%] p-3 rounded border text-sm`}
              >
                <div className="whitespace-pre-wrap">
                  {/* Render message content as plain text, but if it's a non-user message
                      and contains the character's name, bold only the name. This keeps
                      existing newline handling via CSS while allowing inline bolding. */}
                  {typeof message.content === 'string' && !message.isUser && message.content.includes(character.name) ? (
                    // Split on the character name and interleave <strong> nodes so only
                    // the name appears bold. We preserve other parts (including newlines).
                    message.content.split(character.name).map((part, idx, arr) => (
                      <span key={idx}>
                        {part}
                        {idx < arr.length - 1 && <strong>{character.name}</strong>}
                      </span>
                    ))
                  ) : (
                    message.content
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mr-auto bg-secondary/10 text-foreground border-secondary/30 max-w-[80%] p-3 rounded border text-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-muted-foreground text-xs">{character.species} is processing...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-primary/30">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="flex-1 bg-input border-primary/30 text-foreground"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-primary hover:bg-primary/80 text-primary-foreground glow-effect"
              >
                SEND
              </Button>
            </div>
          </div>
          {/* Main & Meditation buttons at the bottom */}
          <div className="w-full flex justify-center items-center gap-4 p-4 border-t border-primary/30 mt-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/main")}
              className="text-xs min-w-[120px]"
            >
              Main
            </Button>
            {onMeditation && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onMeditation}
                className="text-xs min-w-[120px]"
              >
                Meditation
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
