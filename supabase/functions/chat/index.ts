import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Message {
  role: string;
  content: string;
}

interface ChatRequest {
  messages: Message[];
  selectedCharacter: {
    digitalOriginRealm: string;
    gender: string;
    entity: string;
    corePersonality: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, selectedCharacter }: ChatRequest = await req.json()

    // Get Hugging Face token from secrets
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data: secretData } = await supabaseClient
      .from('secrets')
      .select('value')
      .eq('name', 'HF_TOKEN')
      .single()

    if (!secretData?.value) {
      throw new Error('HF_TOKEN not found in secrets')
    }

    // Load character database
    const charactersResponse = await fetch(new URL('../../../public/digital_characters_1080.json', import.meta.url))
    const charactersData = await charactersResponse.json()

    // Find matching character
    const character = charactersData.characters.find((char: any) => 
      char.digitalOriginRealm === selectedCharacter.digitalOriginRealm &&
      char.gender === selectedCharacter.gender &&
      char.entity === selectedCharacter.entity &&
      char.corePersonality === selectedCharacter.corePersonality
    )

    if (!character) {
      throw new Error('Character not found in database')
    }

    // Prepare system message with character persona
    const systemMessage = {
      role: "system",
      content: character.chatPersona
    }

    // Call Hugging Face API
    const response = await fetch(
      "https://api.huggingface.co/models/Qwen/Qwen2.5-14B-Instruct/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${secretData.value}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          model: "Qwen/Qwen2.5-14B-Instruct",
          messages: [systemMessage, ...messages],
          max_tokens: 300,
          temperature: 0.7,
          top_p: 0.9,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`)
    }

    const data = await response.json()
    
    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})