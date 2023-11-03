import { getDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const event = req.body;

  if (req.method === "POST") {
    await addUser(event);

    res.send();
  }

  if (req.method === "GET") {
    const users = await getUsers();

    res.json(users);
  }
}

async function addUser(user) {
  try {
    const db = await getDatabase();

    await db.collection("users").insertOne(user);
  } catch (e) {
    console.error(e);
  }
}

function getUserResponse(users, limit) {
  const size = users.length;

  return {
    result: users,
    metadata: {
      seatsAvailable: size < limit,
      size,
    },
  };
}

export async function getUsers() {
  try {
    const db = await getDatabase();

    const users = await db.collection("users").find().toArray();

    const managers = users.filter((user) => user.role === "dirigente");

    const teamMembers = users.filter((user) => user.role === "equipista");

    return JSON.parse(
      JSON.stringify({
        managers: getUserResponse(managers, 10),
        teamMembers: getUserResponse(teamMembers, 2),
      })
    );
  } catch (e) {
    console.error(e);
  }
}
