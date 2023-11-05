import { EventController } from "../../../server/controller/EventController";

export default async function handler(req, res) {
  const controller = new EventController();

  const { id } = req.query;

  const event = req.body;

  if (req.method === "GET") {
    const event = await controller.getById(id);

    res.json(event);
  }

  if (req.method === "PUT") {
    await controller.edit(id, event);
    
    res.send();
  }

  if (req.method === "DELETE") {
    await controller.destroy(id);

    res.send();
  }
}
