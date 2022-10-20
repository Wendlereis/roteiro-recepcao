import { ObjectId } from "mongodb";
import { addMinutes } from "date-fns";

import { getDatabase } from "../../../lib/mongodb";

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

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

export async function addEvento({ title, startDate, endDate }) {
  try {
    const db = await getDatabase();

    await db.collection("eventos").insertOne({ title, startDate, endDate });
  } catch (e) {
    console.error(e);
  }
}

export async function editEventsDuration({ endDate, minutes }) {
  console.log({ endDate, minutes });

  try {
    const db = await getDatabase();

    const eventos = await db
      .collection("eventos")
      .find({ startDate: { $gte: new Date(endDate) } })
      .sort({ startDate: 1 })
      .toArray();

    console.log({ eventos });

    const updatedEventDurations = eventos.map((event) => ({
      ...event,
      startDate: addMinutes(new Date(event.startDate), minutes),
      endDate: addMinutes(new Date(event.endDate), minutes),
    }));

    console.log({ updatedEventDurations });

    // const asyncForEach = async () => {
    //   for (let index = 0; index < updatedEventDurations.length; index++) {
    //     const { _id, ...restEvent } = updatedEventDurations[index];

    //     console.log({ restEvent });

    //     await db.collection("eventos").updateOne(
    //       { _id },
    //       {
    //         $set: restEvent,
    //       }
    //     );
    //   }
    // };

    // await asyncForEach();
  } catch (e) {
    console.error(e);
  }
}
