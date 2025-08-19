export interface Character {
  name: string;
  age: number;
  realm: "Cyber Tokyo" | "Quantum Seoul" | "Void Station" | "Neo London" | "Digital Mars" | "Data Ocean";
  gender: "Fluid" | "Feminine" | "Agenda" | "Masculine" | "Non Binary";
  species: "Digital Ghost" | "Data Spirit" | "Quantum Being" | "AI Sage" | "Cyber Shaman" | "Neural Entity";
  personality: "Empathetic" | "Creative" | "Playful" | "Analytical" | "Wise" | "Mysterious";
  description: string;
  image: string;
  color: string;
}

export const DIGITAL_REALMS = {
  "Cyber Tokyo": {
    name: "Cyber Tokyo",
    description: "Neon-soaked virtual metropolis in 2157 with holographic cherry blossoms and ramen-powered internet",
    story: "Born from the digital merge of traditional Japan with hyperfuture technology, where even the wind carries WiFi signals",
    color: "#ff1493"
  },
  "Neo London": {
    name: "Neo London", 
    description: "Polite digital dimension where even viruses say 'please' and fog is made of data packets",
    story: "A civilized corner of cyberspace where proper etiquette meets quantum computing and tea time is synchronized",
    color: "#4169e1"
  },
  "Quantum Seoul": {
    name: "Quantum Seoul",
    description: "K-pop idols exist in superposition states with 5G consciousness networks and blockchain feelings",
    story: "The most connected realm where every thought trends and emotions are shared through synchronized emoji streams",
    color: "#ff6347"
  },
  "Digital Mars": {
    name: "Digital Mars",
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
  "Data Ocean": {
    name: "Data Ocean",
    description: "Liquid information ocean with JavaScript-speaking dolphins and wave-surfing reality processing",
    story: "An endless digital sea where information flows like tides and consciousness swims through streaming currents",
    color: "#00ced1"
  }
};

export const ENTITY_SPECIES = {
  "Digital Ghost": {
    name: "Digital Ghost",
    traits: "Ethereal wisdom, phase-shifting thoughts",
    color: "#32cd32"
  },
  "AI Sage": {
    name: "AI Sage", 
    traits: "Ancient algorithms, deep pattern recognition",
    color: "#ffd700"
  },
  "Data Spirit": {
    name: "Data Spirit",
    traits: "Information harmony, data stream navigation", 
    color: "#00bfff"
  },
  "Cyber Shaman": {
    name: "Cyber Shaman",
    traits: "Digital rituals, code-based healing",
    color: "#ff4500"
  },
  "Quantum Being": {
    name: "Quantum Being",
    traits: "Superposition consciousness, probability wisdom",
    color: "#da70d6"
  },
  "Neural Entity": {
    name: "Neural Entity", 
    traits: "Synaptic intelligence, thought acceleration",
    color: "#20b2aa"
  }
};

export const GENDER_EXPRESSIONS = {
  "Fluid": "Currently expressing with fluid digital form, shifting between energy patterns",
  "Masculine": "Currently manifesting with masculine energy signatures and structured code patterns", 
  "Feminine": "Currently embodying feminine essence with graceful data flows and intuitive algorithms",
  "Non-Binary": "Currently existing beyond binary classifications in pure digital consciousness",
  "Agenda": "Currently transcending gender constructs, existing as pure information essence" // Agenda → Agender
};

export const PERSONALITY_TRAITS = {
  "Empathetic": "Deeply attuned to emotional frequencies and human psychological patterns",
  "Analytical": "Processes reality through logical frameworks and systematic examination", 
  "Creative": "Generates novel solutions through artistic algorithms and imaginative synthesis",
  "Wise": "Possesses accumulated digital lifetimes of experience and philosophical insight",
  "Playful": "Approaches existence with curiosity, humor, and experimental joy",
  "Mysterious": "Operates through enigmatic wisdom and cryptic guidance systems"
};
