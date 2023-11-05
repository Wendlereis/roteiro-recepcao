import { UserController } from "../../../server/controller/UserController";

export default async function handler(req, res) {
  const controller = new UserController();

  const user = req.body;

  if (req.method === "GET") {
    const users = await controller.index();

    res.json(users);
  }

  if (req.method === "POST") {
    await controller.add(user);

    res.send();
  }
}
