import { addMinutes } from "date-fns";

import { getDatabase } from "../../../server/infra/database/mongodb";

function removeSeconds(date) {
  return new Date(date.setSeconds(0, 0));
}

export default async function handler(req, res) {
  const event = req.body;

  if (req.method === "POST") {
    await addEvento(event);

    res.send();
  }

  if (req.method === "GET") {
    const eventos = await getEventos();

    res.json(eventos);
  }

  if (req.method === "PUT") {
    const eventos = await editEventsDuration(event);

    res.json(eventos);
  }
}

export async function getEventos() {
  try {
    const db = await getDatabase();

    const eventos = await db.collection("eventos").find().sort({ startDate: 1 }).toArray();

    return JSON.parse(JSON.stringify(eventos));
  } catch (e) {
    console.error(e);
  }
}

export async function addEvento(event) {
  try {
    const db = await getDatabase();

    await db.collection("eventos").insertOne(event);
  } catch (e) {
    console.error(e);
  }
}

export async function editEventsDuration({ endDate, minutes }) {
  try {
    const db = await getDatabase();

    const eventos = await db
      .collection("eventos")
      .find({ startDate: { $gte: endDate } })
      .sort({ startDate: 1 })
      .toArray();

    const updatedEventDurations = eventos.map((event) => ({
      ...event,
      startDate: addMinutes(removeSeconds(new Date(event.startDate)), minutes).toISOString(),
      endDate: addMinutes(removeSeconds(new Date(event.endDate)), minutes).toISOString(),
    }));

    for (let index = 0; index < updatedEventDurations.length; index++) {
      const { _id, ...restEvent } = updatedEventDurations[index];

      await db.collection("eventos").updateOne(
        { _id },
        {
          $set: restEvent,
        }
      );
    }
  } catch (e) {
    console.error(e);
  }
}
