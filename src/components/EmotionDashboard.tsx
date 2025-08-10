import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Character } from "@/types/character";
import { ArrowLeft, Brain, Heart, Zap, TrendingUp, Activity } from "lucide-react";

interface EmotionDashboardProps {
  character: Character;
  onBack: () => void;
}

interface EmotionData {
  emotion: string;
  intensity: number;
  timestamp: Date;
  trigger?: string;
}

interface EmotionMetrics {
  dominant: string;
  stability: number;
  energy: number;
  positivity: number;
  complexity: number;
}

export const EmotionDashboard = ({ character, onBack }: EmotionDashboardProps) => {
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<EmotionMetrics>({
    dominant: "Curious",
    stability: 75,
    energy: 65,
    positivity: 80,
    complexity: 45
  });

  // Mock emotion data generation based on character
  useEffect(() => {
    const generateEmotionData = () => {
      const baseEmotions = {
        "Neon Ghost": ["Ethereal", "Mysterious", "Contemplative", "Otherworldly"],
        "Data Sprite": ["Playful", "Energetic", "Optimistic", "Curious"],
        "Code Wraith": ["Analytical", "Focused", "Determined", "Logical"],
        "Pixel Phantom": ["Creative", "Artistic", "Inspired", "Expressive"],
        "Cyber Sylph": ["Harmonious", "Balanced", "Serene", "Fluid"],
        "Neural Shade": ["Systematic", "Precise", "Methodical", "Calculated"]
      };

      const characterEmotions = baseEmotions[character.species as keyof typeof baseEmotions] || ["Neutral"];
      
      const mockData: EmotionData[] = [];
      for (let i = 0; i < 24; i++) {
        const emotion = characterEmotions[Math.floor(Math.random() * characterEmotions.length)];
        mockData.push({
          emotion,
          intensity: Math.random() * 100,
          timestamp: new Date(Date.now() - (i * 60000)), // Last 24 minutes
          trigger: i % 3 === 0 ? "Chat Interaction" : i % 5 === 0 ? "Meditation Session" : undefined
        });
      }
      
      setEmotionHistory(mockData.reverse());
    };

    generateEmotionData();
    
    // Update metrics every 5 seconds
    const interval = setInterval(() => {
      setCurrentMetrics(prev => ({
        ...prev,
        stability: Math.max(20, Math.min(100, prev.stability + (Math.random() - 0.5) * 10)),
        energy: Math.max(10, Math.min(100, prev.energy + (Math.random() - 0.5) * 15)),
        positivity: Math.max(30, Math.min(100, prev.positivity + (Math.random() - 0.5) * 8)),
        complexity: Math.max(20, Math.min(80, prev.complexity + (Math.random() - 0.5) * 12))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [character]);

  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      "Ethereal": "border-primary/50 text-primary",
      "Mysterious": "border-purple-500/50 text-purple-400",
      "Playful": "border-accent/50 text-accent",
      "Analytical": "border-blue-500/50 text-blue-400",
      "Creative": "border-pink-500/50 text-pink-400",
      "Harmonious": "border-green-500/50 text-green-400",
      "Systematic": "border-gray-500/50 text-gray-400"
    };
    
    return colors[emotion] || "border-primary/50 text-primary";
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "stability": return <Brain className="w-4 h-4" />;
      case "energy": return <Zap className="w-4 h-4" />;
      case "positivity": return <Heart className="w-4 h-4" />;
      case "complexity": return <Activity className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const recentEmotions = emotionHistory.slice(-6);
  const emotionCounts = emotionHistory.reduce((acc, { emotion }) => {
    acc[emotion] = (acc[emotion] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const topEmotions = Object.entries(emotionCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="neon-border glow-effect"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Chat
        </Button>
        <div className="terminal-panel px-6 py-3">
          <h1 className="text-2xl font-bold neon-text">EMOTION ANALYSIS DASHBOARD</h1>
          <p className="text-sm text-muted-foreground">Neural Pattern Recognition • Character: {character.name}</p>
        </div>
      </div>

      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real-time metrics */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Core metrics */}
          <Card className="terminal-panel">
            <CardHeader>
              <CardTitle className="neon-text flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Consciousness Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(currentMetrics).filter(([key]) => key !== 'dominant').map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="capitalize text-sm flex items-center gap-2">
                      {getMetricIcon(key)}
                      {key}
                    </span>
                    <span className="text-sm font-mono">{Math.round(value)}%</span>
                  </div>
                  <Progress 
                    value={value} 
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emotion timeline */}
          <Card className="terminal-panel">
            <CardHeader>
              <CardTitle className="neon-text flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Emotional States
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEmotions.map((emotion, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded border border-primary/20 bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline" 
                        className={getEmotionColor(emotion.emotion)}
                      >
                        {emotion.emotion}
                      </Badge>
                      {emotion.trigger && (
                        <span className="text-xs text-muted-foreground">
                          via {emotion.trigger}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono">{Math.round(emotion.intensity)}%</div>
                      <div className="text-xs text-muted-foreground">
                        {emotion.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar stats */}
        <div className="space-y-6">
          
          {/* Current dominant emotion */}
          <Card className="terminal-panel">
            <CardHeader>
              <CardTitle className="neon-text text-lg">Dominant State</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold neon-text mb-2">
                {currentMetrics.dominant}
              </div>
              <div className="text-sm text-muted-foreground">
                Active for {Math.floor(Math.random() * 15) + 5} minutes
              </div>
            </CardContent>
          </Card>

          {/* Top emotions */}
          <Card className="terminal-panel">
            <CardHeader>
              <CardTitle className="neon-text text-lg">Frequent States</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topEmotions.map(([emotion, count], index) => (
                <div key={emotion} className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={getEmotionColor(emotion)}
                  >
                    #{index + 1} {emotion}
                  </Badge>
                  <span className="text-sm font-mono">{count}x</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Character insights */}
          <Card className="terminal-panel">
            <CardHeader>
              <CardTitle className="neon-text text-lg">AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 rounded bg-primary/10 border border-primary/20">
                <p className="text-primary/80">
                  Your {character.species} consciousness shows high adaptability patterns.
                </p>
              </div>
              <div className="p-3 rounded bg-accent/10 border border-accent/20">
                <p className="text-accent/80">
                  Meditation sessions have improved emotional stability by 23%.
                </p>
              </div>
              <div className="p-3 rounded bg-muted/20 border border-muted/30">
                <p className="text-muted-foreground">
                  Optimal interaction time: {Math.floor(Math.random() * 12) + 8}:00 - {Math.floor(Math.random() * 4) + 20}:00
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};