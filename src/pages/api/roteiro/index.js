import { getDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const event = req.body;

    await addEvento(event);

    res.send();
  } else {
    const eventos = await getEventos();

    res.json(eventos);
  }
}

export async function getEventos() {
  try {
    const db = await getDatabase();

    const eventos = await db.collection("eventos").find({}).toArray();

    return JSON.parse(JSON.stringify(eventos));
  } catch (e) {
    console.error(e);
  }
}

export async function addEvento({ title, startDate, endDate }) {
  try {
    const db = await getDatabase();

    await db.collection("eventos").insertOne({ title, startDate, endDate });
  } catch (e) {
    console.error(e);
  }
}
