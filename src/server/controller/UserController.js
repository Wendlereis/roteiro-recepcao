import { getServerSession } from "next-auth/next";
import * as repository from "../repository/UserRepository";
import * as service from "../service/UserService";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

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
    const normalizedEmail = service.normalizeEmail(user?.email);

    if (!normalizedEmail) {
      return res.status(400).json({ message: "E-mail inválido." });
    }

    await repository.add({
      ...user,
      email: normalizedEmail,
    });

    res.send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Erro ao adicionar usuário." });
  }
}

export async function destroy(req, res) {
  const { id } = req.query;

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const currentUser = await repository.findByEmail(session.user.email);

    if (!service.isManager(currentUser)) {
      return res
        .status(403)
        .json({ message: "Apenas dirigentes podem excluir usuários." });
    }

    const targetUser = await repository.findById(id);

    if (!targetUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (service.isManager(targetUser)) {
      const managerCount = await repository.countByRole("dirigente");

      if (managerCount <= 1) {
        return res.status(409).json({
          code: "LAST_MANAGER_REQUIRED",
          message: "O sistema precisa manter ao menos 1 dirigente cadastrado.",
        });
      }
    }

    await repository.destroy(id);

    res.send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Erro ao excluir usuário." });
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
