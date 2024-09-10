import { ObjectId } from "mongodb";

import { getDatabase } from "../infra/database/mongodb";

export async function list() {
  const db = await getDatabase();

  const events = await db
    .collection("eventos")
    .find()
    .sort({ startDate: 1 })
    .toArray();

  return events;
}

export async function add(event) {
  const db = await getDatabase();

  await db.collection("eventos").insertOne(event);
}

export async function findById(id) {
  const db = await getDatabase();

  const event = await db
    .collection("eventos")
    .findOne({ _id: new ObjectId(id) });

  return event;
}

export async function findByStartDate(date) {
  const db = await getDatabase();

  const events = await db
    .collection("eventos")
    .find({ startDate: { $gte: date } })
    .sort({ startDate: 1 })
    .toArray();

  return events;
}

export async function findByDateRange(start, end) {
  const db = await getDatabase();

  const events = await db
    .collection("eventos")
    .find({ startDate: { $gte: start }, endDate: { $lte: end } })
    .sort({ startDate: 1 })
    .toArray();

  return events;
}

export async function edit(event) {
  const db = await getDatabase();

  const { _id, ...restEvent } = event;

  await db.collection("eventos").updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: restEvent,
    }
  );
}

export async function destroy(id) {
  const db = await getDatabase();

  await db.collection("eventos").deleteOne({ _id: new ObjectId(id) });
}
