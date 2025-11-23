import express from "express";
import { extractIntentAndResponse } from "../services/geminiService.js";
import { textToSpeech } from "../services/elevenlabsService.js";
import { logCall } from "../services/crmService.js";
import { config } from "../config/env.js";
import {makeCall} from "../services/vapiService.js";

const router = express.Router();

router.post("/vapi-call", async (req, res) => {
  try {
    // Security check
    if (
      config.VAPI_SECRET_TOKEN &&
      req.headers["x-vapi-token"] !== config.VAPI_SECRET_TOKEN
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { from, transcript } = req.body;
    console.log("📞 Incoming transcript:", transcript);

    // Generate AI response
    const { intent, entities, response: aiResponse } = await extractIntentAndResponse(transcript);
    console.log("🤖 Gemini Response:", aiResponse);

    // Convert AI response to speech
    const audioBase64 = await textToSpeech(aiResponse);
    if (!audioBase64) throw new Error("TTS failed");

    // Make the call via VAPI
    const callResult = await makeCall(audioBase64, from);
    console.log("📞 VAPI call result:", callResult);

    res.json({
      intent,
      response: aiResponse,
      callResult,
    });

  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
