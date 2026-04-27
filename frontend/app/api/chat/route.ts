// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("GROQ_API_KEY existe:", !!process.env.GROQ_API_KEY);
  console.log("GEMINI_API_KEY existe:", !!process.env.GEMINI_API_KEY);
  const { messages, model = "llama-3.3-70b-versatile" } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json(
      { error: "Messages are required" },
      { status: 400 },
    );
  }

  const groqApiKey = process.env.GROQ_API_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  // 1. Intentar con Groq (Principal)
  if (groqApiKey) {
    try {
      const groqResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: model.includes("gemini") ? "llama-3.3-70b-versatile" : model,
            messages,
            max_tokens: 500,
            temperature: 0.75,
          }),
        },
      );

      if (groqResponse.ok) {
        const data = await groqResponse.json();
        console.log("Chat completed using Groq (Primary)");
        return NextResponse.json(data);
      }

      const errorData = await groqResponse.json().catch(() => ({}));
      console.error("Groq API Error:", errorData);
    } catch (error) {
      console.error("Groq fetch error, falling back to Gemini:", error);
    }
  }

  // 2. Fallback a Gemini (Secundario)
  if (geminiApiKey) {
    try {
      const systemMessage = messages.find((m: any) => m.role === "system");
      const chatMessages = messages.filter((m: any) => m.role !== "system");

      const history = chatMessages.slice(0, -1).map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const lastMessage = chatMessages[chatMessages.length - 1].content;

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemMessage?.content || "" }],
            },
            contents: [
              ...history,
              { role: "user", parts: [{ text: lastMessage }] },
            ],
            generationConfig: { maxOutputTokens: 500 },
          }),
        },
      );

      if (geminiResponse.ok) {
        const data = await geminiResponse.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        console.log("Chat completed using Gemini (Fallback)");
        return NextResponse.json({
          choices: [{ message: { role: "assistant", content } }],
        });
      }

      const errorData = await geminiResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Gemini API Error", details: errorData },
        { status: geminiResponse.status },
      );
    } catch (error) {
      console.error("Gemini fetch error:", error);
      return NextResponse.json(
        { error: "Internal Server Error after both providers failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { error: "No API keys configured" },
    { status: 500 },
  );
}
