import { ObjectId } from "mongodb";

import { getDatabase } from "../infra/database/mongodb";

function normalizeEmail(email) {
  if (typeof email !== "string") {
    return "";
  }

  return email.trim().toLowerCase();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function list() {
  const db = await getDatabase();

  const users = await db.collection("users").find().toArray();

  return users;
}

export async function add(user) {
  const db = await getDatabase();

  await db.collection("users").insertOne(user);
}

export async function findById(id) {
  const db = await getDatabase();

  return db.collection("users").findOne({ _id: new ObjectId(id) });
}

export async function findByEmail(email) {
  const db = await getDatabase();
  const collection = db.collection("users");

  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  const exactMatch = await collection.findOne({ email: normalizedEmail });

  if (exactMatch) {
    return exactMatch;
  }

  return collection.findOne({
    email: new RegExp(`^\\s*${escapeRegex(normalizedEmail)}\\s*$`, "i"),
  });
}

export async function countByRole(role) {
  const db = await getDatabase();

  return db.collection("users").countDocuments({ role });
}

export async function destroy(id) {
  const db = await getDatabase();

  await db.collection("users").deleteOne({ _id: new ObjectId(id) });
}
