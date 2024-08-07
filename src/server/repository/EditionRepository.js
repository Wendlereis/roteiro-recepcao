import { ObjectId } from "mongodb";
import { getDatabase } from "../infra/database/mongodb";

export async function list() {
  const db = await getDatabase();

  const users = await db
    .collection("editions")
    .find()
    .sort({ startDate: -1 })
    .toArray();

  return users;
}

export async function add(edition) {
  const db = await getDatabase();

  const created = await db.collection("editions").insertOne(edition);

  return created;
}

export async function findById(id) {
  const db = await getDatabase();

  const edition = await db
    .collection("editions")
    .findOne({ _id: new ObjectId(id) });

  return edition;
}

export async function findByActive(active) {
  const db = await getDatabase();

  const edition = await db.collection("editions").findOne({ active });

  return edition;
}

export async function activateById(id) {
  const db = await getDatabase();

  await db.collection("editions").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { active: true },
    }
  );
}

export async function deactivateById(id) {
  const db = await getDatabase();

  await db.collection("editions").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { active: false },
    }
  );
}
