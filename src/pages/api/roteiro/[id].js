import { ObjectId } from "mongodb";

import { getDatabase } from "../../../server/infra/database/mongodb";

export default async function handler(req, res) {
  const event = req.body;
  const { id } = req.query;

  if (req.method === "PUT") {
    await editEvento(event, id);
  }

  if (req.method === "DELETE") {
    await deleteEvento(id);
  }

  if (req.method === "GET") {
    const event = await getEventById(id);

    return res.json(event);
  }

  return res.send();
}

export async function getEventById(id) {
  try {
    const db = await getDatabase();

    const event = await db.collection("eventos").findOne({ _id: ObjectId(id) });

    return JSON.parse(JSON.stringify(event));
  } catch (e) {
    console.error(e);
  }
}

export async function editEvento(event, id) {
  try {
    const db = await getDatabase();

    await db.collection("eventos").updateOne({ _id: new ObjectId(id) }, { $set: event });
  } catch (e) {
    console.error(e);
  }
}

export async function deleteEvento(id) {
  try {
    const db = await getDatabase();

    await db.collection("eventos").deleteOne({ _id: new ObjectId(id) });
  } catch (e) {
    console.error(e);
  }
}
