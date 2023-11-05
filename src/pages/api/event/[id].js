import * as controller from "../../../server/controller/EventController";

export default function handler(req, res) {
  if (req.method === "GET") {
    return controller.getById(req, res);
  }

  if (req.method === "PUT") {
    return controller.edit(req, res);
  }

  if (req.method === "DELETE") {
    return controller.destroy(req, res);
  }
}
