import { EventController } from "../../../server/controller/EventController";
import { EventDurationController } from "../../../server/controller/EventDurationController";

export default async function handler(req, res) {
  const eventController = new EventController();
  const eventDurationController = new EventDurationController();

  if (req.method === "POST") {
    const event = req.body;
    
    await eventController.add(event);

    res.send();
  }

  if (req.method === "GET") {
    const events = await eventController.index();

    res.json(events);
  }

  if (req.method === "PUT") {
    const { endDate, minutes } = req.body;

    const eventos = await eventDurationController.edit(endDate, minutes);

    res.json(eventos);
  }
}
