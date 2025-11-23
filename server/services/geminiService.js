import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function extractIntentAndResponse(transcript) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // working stable model
    });

    const prompt = `
You are an AI calling agent. Respond politely and clearly.

User said: "${transcript}"

Tasks:
1. Understand user request.
2. Generate a helpful response.
`;

    const result = await model.generateContent(prompt);

    const aiResponse = result.response.text();

    // ✅ Added log so you can SEE the AI output
    console.log("🤖 Gemini Response:", aiResponse);

    return {
      intent: "general",
      response: aiResponse,
    };
  } catch (error) {
    console.error("❌ Gemini Error:", error);
    return {
      intent: "error",
      response: "Sorry, something went wrong with the AI.",
    };
  }
}

