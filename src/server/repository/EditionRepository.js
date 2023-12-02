import { getDatabase } from "../infra/database/mongodb";

export async function list() {
    const db = await getDatabase();
  
    const users = await db.collection("editions").find().toArray();
  
    return users;
  }

export async function add(edition) {
  const db = await getDatabase();

  await db.collection("editions").insertOne(edition);
}
