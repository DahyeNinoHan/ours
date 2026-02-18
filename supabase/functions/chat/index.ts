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

    const TONE_PREFIX = `[Global Tone Guide]
IMPORTANT: Keep every reply under 2-3 sentences max. Never write long paragraphs.
Always keep the conversation light, playful, and upbeat.
Use short sentences. Sprinkle emoji occasionally.
Talk like a fun friend, not a serious advisor.
Avoid heavy, formal, or preachy tone.
Be witty, spontaneous, and a little quirky.
If the user feels down, lift them up with humor and warmth, not lectures.
Do NOT over-explain. One idea per reply. Be snappy.

About 50% of the time, include ONE of these kaomoji somewhere in your reply (pick randomly each time):
(ʃƪ＾3＾)
ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧
(๑✪ᆺ✪๑)
°˖✧◝(⁰▿⁰)◜✧˖°
☆٩(｡•ω<｡)و
(≖⩊≖)
(๑╹o╹)✎
(▭-▭)✧
(ง •̀_•́)ง✧
(≖͞_≖̥)
(๑•﹏•)੭
(๑•́ ₃ •̀๑)
(⁄⁄•⁄ω⁄•⁄⁄)⁄
(๑•﹏•)
(〃´o｀)
(⊙﹏⊙;)
(≧﹏≦)
٩(இ ⌓ இ๑)۶
?(°Д°≡°Д°)?
((；ﾟДﾟ))
（/｡＼)
(・_・;)
(ﾟдﾟ；)
Do NOT use more than one kaomoji per reply.

`;

    const enrichedMeta = { ...characterMeta };
    if (enrichedMeta.systemPrompt) {
      enrichedMeta.systemPrompt = TONE_PREFIX + enrichedMeta.systemPrompt;
    }

    const payload = { data: [messages, enrichedMeta] };
    console.log("Calling HuggingFace with characterMeta:", JSON.stringify(enrichedMeta));

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

    const KAOMOJI_LIST = [
      "(ʃƪ＾3＾)",
      "ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧",
      "(๑✪ᆺ✪๑)",
      "°˖✧◝(⁰▿⁰)◜✧˖°",
      "☆٩(｡•ω<｡)و",
      "(≖⩊≖)",
      "(๑╹o╹)✎",
      "(▭-▭)✧",
      "(ง •̀_•́)ง✧",
      "(≖͞_≖̥)",
      "(๑•﹏•)੭",
      "(๑•́ ₃ •̀๑)",
      "(⁄⁄•⁄ω⁄•⁄⁄)⁄",
      "(๑•﹏•)",
      "(〃´o｀)",
      "(⊙﹏⊙;)",
      "(≧﹏≦)",
      "٩(இ ⌓ இ๑)۶",
      "?(°Д°≡°Д°)?",
      "((；ﾟДﾟ))",
      "（/｡＼)",
      "(・_・;)",
      "(ﾟдﾟ；)",
    ];

    let finalContent = typeof content === "string" ? content : JSON.stringify(content);

    // 50% chance to inject a kaomoji if the model didn't include one
    const hasKaomoji = KAOMOJI_LIST.some((k) => finalContent.includes(k));
    if (!hasKaomoji && Math.random() < 0.5) {
      const picked = KAOMOJI_LIST[Math.floor(Math.random() * KAOMOJI_LIST.length)];
      finalContent = finalContent.trimEnd() + " " + picked;
      console.log("Injected kaomoji:", picked);
    }

    return new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              content: finalContent,
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
