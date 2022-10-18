import { getDatabase } from "../../lib/mongodb";

export async function getEventos() {
  try {
    const db = await getDatabase();

    const eventos = await db.collection("eventos").find({}).toArray();

    return JSON.parse(JSON.stringify(eventos));
  } catch (e) {
    console.error(e);
  }
}

export async function addEvento({ name }) {
  try {
    const db = await getDatabase();

    await db.collection("eventos").insertOne({ name });
  } catch (e) {
    console.error(e);
  }
}
