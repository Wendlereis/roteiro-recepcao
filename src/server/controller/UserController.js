import * as repository from "../repository/UserRepository";
import * as service from "../service/UserService";

export async function index(_, res) {
  try {
    const users = await repository.list();

    const managers = service.getManagers(users);

    const teamMembers = service.getTeamMembers(users);

    res.json({
      managers: getUserResponse(managers, 10),
      teamMembers: getUserResponse(teamMembers, 2),
    });
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

export async function add(req, res) {
  const user = req.body;

  try {
    await repository.add(user);

    res.send();
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

export async function destroy(req, res) {
  const { id } = req.query;

  try {
    await repository.destroy(id);

    res.send();
  } catch (e) {
    console.error(e);
    res.status(500);
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
