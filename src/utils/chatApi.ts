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

export async function callChatAPI(messages: Message[], selectedCharacter: SelectedCharacter) {
  try {
    console.log('Calling Gradio API with character:', selectedCharacter);
    const HF_TOKEN = process.env.HF_TOKEN; // 새 토큰으로 교체 권장
    const response = await fetch('https://ninohan-ours.hf.space/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HF_TOKEN}`
      },
      body: JSON.stringify({
        data: [messages, selectedCharacter]
      })
    });

    if (!response.ok) {
      throw new Error(`Gradio API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response:', data);
    return {
      choices: [{
        message: {
          content: data.data[0].choices[0].message.content
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