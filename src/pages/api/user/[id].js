import { ObjectId } from "mongodb";

import { getDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    await deleteUser(id);
  }

  return res.send();
}

export async function deleteUser(id) {
  try {
    const db = await getDatabase();

    await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  } catch (e) {
    console.error(e);
  }
}
