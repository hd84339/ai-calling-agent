import axios from "axios";
import { config } from "../config/env.js";

export async function textToSpeech(text) {
  try {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${config.ELEVEN_VOICE_ID}`;

    const response = await axios.post(
      url,
      {
        text,
        model_id: "eleven_multilingual_v2",
      },
      {
        headers: {
          "xi-api-key": config.ELEVEN_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const audioBase64 = Buffer.from(response.data).toString("base64");
    return audioBase64;
  } catch (err) {
    console.error("❌ ElevenLabs TTS error:", err.response?.data || err);
    return "";
  }
}
