import clientPromise from "../../lib/mongodb";

export async function getEventos() {
  try {
    const client = await clientPromise;

    const db = client.db("roteiro-recepcao");

    const eventos = await db.collection("eventos").find({}).toArray();

    return JSON.parse(JSON.stringify(eventos));
  } catch (e) {
    console.error(e);
  }
}
export async function addEvento({ name }) {
  try {
    const client = await clientPromise;

    const db = client.db("roteiro-recepcao");

    await db.collection("eventos").insertOne({ name });
  } catch (e) {
    console.error(e);
  }
}
