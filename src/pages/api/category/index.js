import { CategoryController } from "../../../server/controller/CategoryController";

export default async function handler(_, res) {
  const controller = new CategoryController();

  const categories = await controller.index();

  return res.json(categories);
}
