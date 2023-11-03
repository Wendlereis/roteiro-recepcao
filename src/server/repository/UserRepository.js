import { ObjectId } from "mongodb";
import { getDatabase } from "../../../server/infra/database/mongodb";

export class UserRepository {
  async list() {
    const db = await getDatabase();

    const users = await db.collection("users").find().toArray();

    return users;
  }

  async add(user) {
    const db = await getDatabase();

    await db.collection("users").insertOne(user);
  }

  async destroy(id) {
    const db = await getDatabase();

    await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  }
}
