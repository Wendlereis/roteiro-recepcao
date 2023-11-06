import { getDatabase } from "../infra/database/mongodb";

export async function list() {
  const db = await getDatabase();

  const categories = await db.collection("categories").find().toArray();

  return categories;
}
