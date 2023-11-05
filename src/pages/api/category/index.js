import { CategoryController } from "../../../server/controller/CategoryController";

export default async function handler(req, res) {
  const controller = new CategoryController();

  if (req.method === "GET") {
    const categories = await controller.index();

    return res.json(categories);
  }
}
