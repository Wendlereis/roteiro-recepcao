import { ObjectId } from "mongodb";
import { getDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const event = req.body;
  const { id } = req.query;

  const updated = await editEvento(event, id);

  res.send();
}

export async function editEvento({ title, startDate, endDate }, id) {
  try {
    const db = await getDatabase();

    const updated = await db.collection("eventos").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { title, startDate, endDate },
      }
    );

    return updated;
  } catch (e) {
    console.error(e);
  }
}
