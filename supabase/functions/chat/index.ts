import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages, characterMeta } = await req.json();

    const HF_TOKEN = Deno.env.get("HF_TOKEN");
    if (!HF_TOKEN) {
      return new Response(
        JSON.stringify({ error: "HF_TOKEN not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload = { data: [messages, characterMeta] };
    console.log("Calling HuggingFace with characterMeta:", JSON.stringify(characterMeta));

    const response = await fetch("https://ninohan-ours.hf.space/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HF_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const respText = await response.text();
    console.log("HF response status:", response.status);
    console.log("HF response body:", respText.substring(0, 500));

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `HuggingFace API error: ${response.status}`, details: respText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = JSON.parse(respText);
    const content =
      data?.data?.[0]?.choices?.[0]?.message?.content ?? data?.data?.[0] ?? null;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Unexpected response format from HuggingFace" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              content: typeof content === "string" ? content : JSON.stringify(content),
            },
          },
        ],
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
