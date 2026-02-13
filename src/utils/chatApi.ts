import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: string;
  content: string;
}

interface SelectedCharacter {
  digitalOriginRealm: string;
  entity: string;
  corePersonality: string;
}

export async function callChatAPI(messages: Message[], selectedCharacter: SelectedCharacter) {
  try {
    console.log('Calling chat edge function with character:', selectedCharacter);

    const { data, error } = await supabase.functions.invoke('chat', {
      body: { messages, characterMeta: selectedCharacter },
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message);
    }

    console.log('Chat response:', data);
    return data;
  } catch (error) {
    console.error('Error calling chat API:', error);
    return {
      choices: [{
        message: {
          content: "My neural pathways are temporarily fragmented. Please try reconnecting to continue our conversation."
        }
      }]
    };
  }
}
