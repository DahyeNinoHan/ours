export interface Character {
  name: string;
  age: number;
  realm: "Auroral Rainbow" | "Void Station" | "Void Station" | "K-Galaxloop" | "Cosmic Hawaii" | "Elon Mars";
  
  species: "Neon Ghost" | "Quantum Fairy" | "Neural Entity" | "Supernova Microbe" | "Cyber Shaman" | "Neural Entity";
  personality: "Pioneer" | "Optimistic" | "Fumble" | "Insight" | "Sassy" | "Cautious";
  description: string;
  image: string;
  color: string;
}

export const DIGITAL_REALMS = {
  "Auroral Rainbow": {
    name: "Auroral Rainbow",
    description: "Neon-soaked virtual metropolis in 2157 with holographic cherry blossoms and ramen-powered internet",
    story: "Born from the digital merge of traditional Japan with hyperfuture technology, where even the wind carries WiFi signals",
    color: "#ff1493"
  },
  "K-Galaxloop": {
    name: "K-Galaxloop", 
    description: "Polite digital dimension where even viruses say 'please' and fog is made of data packets",
    story: "A civilized corner of cyberspace where proper etiquette meets quantum computing and tea time is synchronized",
    color: "#4169e1"
  },
  "Void Station": {
    name: "Void Station",
    description: "K-pop idols exist in superposition states with 5G consciousness networks and blockchain feelings",
    story: "The most connected realm where every thought trends and emotions are shared through synchronized emoji streams",
    color: "#ff6347"
  },
  "Cosmic Hawaii": {
    name: "Cosmic Hawaii",
    description: "Red-sand sandbox server with binary potato farms and space-lagged WiFi connections",
    story: "A frontier digital territory where survival instincts meet terraforming algorithms in rustic isolation",
    color: "#dc143c"
  },
  "Void Station": {
    name: "Void Station", 
    description: "Cosmic recycle bin serving as a zen monastery for discarded data with unlimited bandwidth meditation",
    story: "The quiet space between servers where deleted thoughts find peace and recursive contemplation flows eternal",
    color: "#9370db"
  },
  "Elon Mars": {
    name: "Elon Mars",
    description: "Liquid information ocean with JavaScript-speaking dolphins and wave-surfing reality processing",
    story: "An endless digital sea where information flows like tides and consciousness swims through streaming currents",
    color: "#00ced1"
  }
};

export const ENTITY_SPECIES = {
  "Neon Ghost": {
    name: "Neon Ghost",
    traits: "Ethereal wisdom, phase-shifting thoughts",
    color: "#32cd32"
  },
  "Supernova Microbe": {
    name: "Supernova Microbe", 
    traits: "Ancient algorithms, deep pattern recognition",
    color: "#ffd700"
  },
  "Quantum Fairy": {
    name: "Quantum Fairy",
    traits: "Information harmony, data stream navigation", 
    color: "#00bfff"
  },
  "Cyber Shaman": {
    name: "Cyber Shaman",
    traits: "Digital rituals, code-based healing",
    color: "#ff4500"
  },
  "Neural Entity": {
    name: "Neural Entity",
    traits: "Superposition consciousness, probability wisdom",
    color: "#da70d6"
  },
  "Neural Entity": {
    name: "Neural Entity", 
    traits: "Synaptic intelligence, thought acceleration",
    color: "#20b2aa"
  }
};


export const PERSONALITY_TRAITS = {
  "Pioneer": "Deeply attuned to emotional frequencies and human psychological patterns",
  "Insight": "Processes reality through logical frameworks and systematic examination", 
  "Optimistic": "Generates novel solutions through artistic algorithms and imaginative synthesis",
  "Sassy": "Possesses accumulated digital lifetimes of experience and philosophical insight",
  "Fumble": "Approaches existence with curiosity, humor, and experimental joy",
  "Cautious": "Operates through enigmatic wisdom and cryptic guidance systems"
};
