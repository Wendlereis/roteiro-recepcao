import { getDatabase } from "../../../server/infra/database/mongodb";

export class CategoryRepository {
  async list() {
    const db = await getDatabase();

    const categories = await db.collection("categories").find().toArray();

    return categories;
  }
}
