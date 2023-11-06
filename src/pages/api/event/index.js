import * as eventController from "../../../server/controller/EventController";
import * as eventDurationController from "../../../server/controller/EventDurationController";

export default function handler(req, res) {
  if (req.method === "GET") {
    return eventController.index(req, res);
  }

  if (req.method === "POST") {
    return eventController.add(req, res);
  }

  if (req.method === "PUT") {
    return eventDurationController.edit(req, res);
  }
}
