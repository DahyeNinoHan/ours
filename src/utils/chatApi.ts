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
    
    // Call Supabase edge function with correct URL
    const response = await fetch('https://ghtpxrzvghondpvyxoit.supabase.co/functions/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodHB4cnp2Z2hvbmRwdnl4b2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNDAyNzQsImV4cCI6MjA3MDYxNjI3NH0.6tIYuqWQKh-TgEFTUHe5_IMPuFlnqqTaElMpAZLybXc'
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