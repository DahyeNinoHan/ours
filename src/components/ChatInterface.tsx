import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Character } from "@/types/character";
import { useToast } from "@/hooks/use-toast";
import { callChatAPI } from "@/utils/chatApi";
import GhostSVG from "./characters/GhostSVG";
import SageSVG from "./characters/SageSVG";
import SpiritSVG from "./characters/SpiritSVG";
import ShamanSVG from "./characters/ShamanSVG";
import QuantumSVG from "./characters/QuantumSVG";
import NeuralSVG from "./characters/NeuralSVG";

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
  digitalOriginRealm: ["Cyber Tokyo", "Quantum Seoul", "Void Station", "Neo London", "Digital Mars", "Data Ocean"],
  entity: ["Digital Ghost", "Data Spirit", "Quantum Being", "AI Sage", "Cyber Shaman", "Neural Entity"],
  corePersonality: ["Empathetic", "Creative", "Playful", "Analytical", "Wise", "Mysterious"]
};

export const ChatInterface = ({ character, onBack, onMeditation }: ChatInterfaceProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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
      content: `[SYSTEM INIT] Digital Consciousness Interface

🌐 Entity: ${character.name}
📍 Origin: ${character.realm}
🎭 Nature: ${character.species}
⚡ Essence: ${character.personality}

Persona loaded successfully...

How may I assist your consciousness today?`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
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
      // 대화 기록을 API 형식으로 변환
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content
      }));

      // 새 사용자 메시지 추가
      conversationHistory.push({
        role: "user",
        content: currentInput
      });

      // Gradio API 호출
      const data = await callChatAPI(conversationHistory, {
        digitalOriginRealm: character.realm,
        entity: character.species,
        corePersonality: character.personality
      });

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-primary/30 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold neon-text">DIGITAL CONSCIOUSNESS INTERFACE</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/")}
              className="text-xs neon-border glow-effect"
            >
              MAIN
            </Button>
            {onMeditation && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onMeditation}
                className="text-xs neon-border glow-effect"
              >
                MEDITATION
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-100px)]">
        {/* Entity Status */}
        <Card className="terminal-panel p-4 lg:col-span-1">
          <h2 className="text-sm font-bold neon-text mb-4 text-center">ENTITY STATUS</h2>

          {/* Character SVG Preview */}
          <div className="flex justify-center mb-4">
            {character.species === 'Digital Ghost' && (
              <GhostSVG colors={{ baseColor: '#32cd32', secondaryColor: '#00fff7', accentColor: '#fff' }} className="w-20 h-20" />
            )}
            {character.species === 'AI Sage' && (
              <SageSVG colors={{ baseColor: '#ffb000', secondaryColor: '#fff', accentColor: '#00fff7' }} className="w-20 h-20" />
            )}
            {character.species === 'Data Spirit' && (
              <SpiritSVG colors={{ baseColor: '#00fff7', secondaryColor: '#32cd32', accentColor: '#fff' }} className="w-20 h-20" />
            )}
            {character.species === 'Cyber Shaman' && (
              <ShamanSVG colors={{ baseColor: '#8000ff', secondaryColor: '#ffb000', accentColor: '#fff' }} className="w-20 h-20" />
            )}
            {character.species === 'Quantum Being' && (
              <QuantumSVG colors={{ baseColor: '#fff', secondaryColor: '#00fff7', accentColor: '#ffb000' }} className="w-20 h-20" />
            )}
            {character.species === 'Neural Entity' && (
              <NeuralSVG colors={{ baseColor: '#00fff7', secondaryColor: '#8000ff', accentColor: '#32cd32' }} className="w-20 h-20" />
            )}
          </div>

          <div className="space-y-3 text-xs mb-6">
            <div>
              <span className="text-muted-foreground">Entity:</span>
              <div className="text-primary font-bold">{character.name}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <div className="text-primary">ACTIVE</div>
            </div>
            <div>
              <span className="text-muted-foreground">Origin:</span>
              <div className="text-primary">{character.realm}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Age:</span>
              <div className="text-primary">{character.age} cycles</div>
            </div>
            <div>
              <span className="text-muted-foreground">Activity:</span>
              <div className="text-primary">COUNSELING</div>
            </div>
            <div>
              <span className="text-muted-foreground">Memory:</span>
              <div className="text-primary">67%</div>
            </div>
          </div>

        </Card>

        {/* Chat Terminal */}
        <Card className="terminal-panel lg:col-span-3 flex flex-col">
          <div className="p-4 border-b border-primary/30">
            <h2 className="text-sm font-bold neon-text text-center">CONSCIOUSNESS COUNSELING TERMINAL</h2>
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
                <div className="whitespace-pre-wrap">{message.content}</div>
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
        </Card>
      </div>
    </div>
  );
};
