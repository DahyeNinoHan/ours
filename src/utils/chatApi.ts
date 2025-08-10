interface Message {
  role: string;
  content: string;
}

interface SelectedCharacter {
  digitalOriginRealm: string;
  gender: string;
  entity: string;
  corePersonality: string;
}

// Load character database
async function loadCharacterDatabase() {
  try {
    const response = await fetch('/digital_characters_1080.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading character database:', error);
    return null;
  }
}

export async function callChatAPI(messages: Message[], selectedCharacter: SelectedCharacter) {
  try {
    console.log('Calling Supabase edge function with character:', selectedCharacter);
    
    // Call Supabase edge function instead of Hugging Face directly
    const response = await fetch('/functions/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        selectedCharacter
      })
    });

    if (!response.ok) {
      throw new Error(`Chat API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response:', data);
    
    return data;

  } catch (error) {
    console.error('Error calling chat API:', error);
    
    // Fallback response with character persona
    return {
      choices: [{
        message: {
          content: "My neural pathways are temporarily fragmented. Please try reconnecting to continue our conversation."
        }
      }]
    };
  }
}