import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./database/db.js";
import { config } from "./config/env.js";
import callWebhook from "./routes/callWebhook.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/webhook", callWebhook);

app.get("/", (req, res) => {
  res.send("AI Voice Agent is running 🚀");
});

(async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`🚀 Server running on port ${config.PORT}`);
  });
})();
