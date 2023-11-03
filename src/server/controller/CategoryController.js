import { CategoryRepository } from "../repository/CategoryRepository";

export class CategoryController {
  constructor() {
    this.repository = new CategoryRepository();
  }

  async index() {
    try {
      const categories = this.repository.list();

      return JSON.parse(JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }
}
