import * as controller from "../../../server/controller/UserController";

export default function handler(req, res) {
  if (req.method === "DELETE") {
    return controller.destroy(req, res);
  }
}
