import * as controller from "../../../server/controller/UserController";

export default function handler(req, res) {
  if (req.method === "GET") {
    return controller.index(req, res);
  }

  if (req.method === "POST") {
    return controller.add(req, res);
  }
}
