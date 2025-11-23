import { getDB } from "../database/db.js";

export async function logCall({ from, transcript, intent, response }) {
  const db = getDB();
  await db.collection("calls").insertOne({
    from,
    transcript,
    intent,
    response,
    createdAt: new Date(),
  });
}
