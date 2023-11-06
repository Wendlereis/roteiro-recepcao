import * as controller from "../../../server/controller/CategoryController";

export default function handler(req, res) {
  if (req.method === "GET") {
    return controller.index(req, res);
  }
}
