import { UserController } from "../../../server/controller/UserController";

export default async function handler(req, res) {
  const controller = new UserController();

  const { id } = req.query;

  if (req.method === "DELETE") {
    await controller.destroy(id);

    res.send();
  }
}
