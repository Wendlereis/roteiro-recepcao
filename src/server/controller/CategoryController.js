import * as repository from "../repository/CategoryRepository";

export async function index(_, res) {
  try {
    const categories = await repository.list();

    res.json(categories);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}
