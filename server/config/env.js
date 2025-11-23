import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,

  // MongoDB
  MONGODB_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME || "ai_agent_db",

  // Gemini (Google Generative AI)
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,

  // ElevenLabs
  ELEVEN_API_KEY: process.env.ELEVEN_API_KEY,
  ELEVEN_VOICE_ID: process.env.ELEVEN_VOICE_ID,

  // VAPI / Calling
  VAPI_SECRET_TOKEN: process.env.VAPI_SECRET_TOKEN,
  VAPI_API_KEY: process.env.VAPI_API_KEY,
  VAPI_FROM: process.env.VAPI_FROM,
  VAPI_TO: process.env.VAPI_TO,
};
