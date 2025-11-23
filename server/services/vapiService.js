import axios from "axios";
import { config } from "../config/env.js";

export async function makeCall(transcriptAudioBase64, toNumber = config.VAPI_TO) {
  try {
    const url = "https://api.vapi.io/v1/call"; // check VAPI docs for correct endpoint

    const body = {
      from: config.VAPI_FROM,
      to: toNumber,
      audio: transcriptAudioBase64 // base64 audio from ElevenLabs
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.VAPI_API_KEY}`
    };

    const response = await axios.post(url, body, { headers });
    console.log("📞 Call initiated successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ VAPI call error:", err.response?.data || err.message || err);
    return null;
  }
}
