import { getDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const event = req.body;

  if (req.method === "POST") {
    await addUser(event);

    res.send();
  }
}

async function addUser(user) {
  try {
    const db = await getDatabase();

    await db.collection("users").insertOne(user);
  } catch (e) {
    console.error(e);
  }
}
