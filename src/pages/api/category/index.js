import { getDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const event = await getCategories();

  return res.json(event);
}

export async function getCategories() {
  try {
    const db = await getDatabase();

    const categories = await db.collection("categories").find().toArray();

    return JSON.parse(JSON.stringify(categories));
  } catch (e) {
    console.error(e);
  }
}
