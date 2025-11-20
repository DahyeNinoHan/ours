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
    console.log('Calling Gradio API with character:', selectedCharacter);
    const HF_TOKEN = import.meta.env.VITE_HF_TOKEN; // process.env → import.meta.env
    if (!HF_TOKEN) {
      throw new Error('HF_TOKEN is not defined in environment variables');
    }
    const payload = { data: [messages, selectedCharacter] };
    console.log('Gradio request payload:', payload);

    const response = await fetch('https://ninohan-ours.hf.space/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HF_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    const respText = await response.text();
    // Try to parse JSON if possible for nicer logging
    let parsed: any = null;
    try {
      parsed = JSON.parse(respText);
    } catch (e) {
      // leave parsed as null
    }

    console.log('Gradio response status:', response.status);
    console.log('Gradio response body (parsed or raw):', parsed ?? respText);

    if (!response.ok) {
      // surface server response to help debugging
      throw new Error(`Gradio API error: ${response.status} - ${respText}`);
    }

    const data = parsed ?? JSON.parse(respText);
    console.log('Received response:', data);

    // Defensive access to nested fields
    const content = data?.data?.[0]?.choices?.[0]?.message?.content ?? data?.data?.[0] ?? null;
    if (!content) {
      throw new Error('Unexpected response format from Gradio endpoint');
    }

    return {
      choices: [{
        message: {
          content: typeof content === 'string' ? content : JSON.stringify(content)
        }
      }]
    };
  } catch (error) {
    console.error('Error calling Gradio API:', error);
    return {
      choices: [{
        message: {
          content: "My neural pathways are temporarily fragmented. Please try reconnecting to continue our conversation."
        }
      }]
    };
  }
}
