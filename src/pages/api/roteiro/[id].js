import { ObjectId } from "mongodb";
import { getDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const event = req.body;
  const { id } = req.query;

  if (req.method === "POST") {
    await editEvento(event, id);
  }

  if (req.method === "DELETE") {
    await deleteEvento(id);
  }

  res.send();
}

export async function editEvento({ title, startDate, endDate }, id) {
  try {
    const db = await getDatabase();

    await db.collection("eventos").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { title, startDate, endDate },
      }
    );
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
