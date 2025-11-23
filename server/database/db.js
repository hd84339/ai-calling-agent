import { MongoClient } from "mongodb";
import { config } from "../config/env.js";

let db;

export async function connectDB() {
  try {
    const client = new MongoClient(config.MONGODB_URI);
    await client.connect();
    db = client.db(config.DB_NAME);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

export function getDB() {
  return db;
}
