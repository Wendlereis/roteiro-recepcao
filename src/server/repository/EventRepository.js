import { getDatabase } from "../../../server/infra/database/mongodb";

export class EventRepository {
  async list() {
    const db = await getDatabase();

    const events = await db.collection("eventos").find().sort({ startDate: 1 }).toArray();

    return events;
  }

  async add(event) {
    const db = await getDatabase();

    await db.collection("eventos").insertOne(event);
  }

  async findById(id) {
    const db = await getDatabase();

    const event = await db.collection("eventos").findOne({ _id: ObjectId(id) });

    return event;
  }

  async findByStartDate(event) {
    const db = await getDatabase();

    const events = await db
      .collection("eventos")
      .find({ startDate: { $gte: event.endDate } })
      .sort({ startDate: 1 })
      .toArray();

    return events;
  }

  async edit(event) {
    const db = await getDatabase();

    const { _id, ...restEvent } = event;

    await db.collection("eventos").updateOne(
      { _id },
      {
        $set: restEvent,
      }
    );
  }

  async destroy(id) {
    const db = await getDatabase();

    await db.collection("eventos").deleteOne({ _id: new ObjectId(id) });
  }
}
