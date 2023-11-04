import { EventController } from "../../../server/controller/EventController";
import { EventDurationController } from "../../../server/controller/EventDurationController";

export default async function handler(req, res) {
  const eventController = new EventController();
  const eventDurationController = new EventDurationController();

  const event = req.body;

  if (req.method === "POST") {
    await eventController.add(event);

    res.send();
  }

  if (req.method === "GET") {
    const events = await eventController.index();

    res.json(events);
  }

  if (req.method === "PUT") {
    const eventos = await eventDurationController.edit(event);

    res.json(eventos);
  }
}
