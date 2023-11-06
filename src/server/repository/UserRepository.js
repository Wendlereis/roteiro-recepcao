import { ObjectId } from "mongodb";

import { getDatabase } from "../infra/database/mongodb";

export async function list() {
  const db = await getDatabase();

  const users = await db.collection("users").find().toArray();

  return users;
}

export async function add(user) {
  const db = await getDatabase();

  await db.collection("users").insertOne(user);
}

export async function destroy(id) {
  const db = await getDatabase();

  await db.collection("users").deleteOne({ _id: new ObjectId(id) });
}
