import { TRPCError } from "@trpc/server";
import * as yup from "yup";

import { procedure, router } from "../trpc";

import * as repository from "../repository/UserRepository";
import * as service from "../service/UserService";

interface User {
  _id: unknown;
  name?: string;
  email?: string;
  role?: string;
}

function getUserResponse(users: User[], limit: number) {
  const size = users.length;

  return {
    result: users,
    metadata: {
      seatsAvailable: size < limit,
      size,
    },
  };
}

export const userRouter = router({
  get: procedure.query(async () => {
    const users = await repository.list();

    const managers = service.getManagers(users);
    const teamMembers = service.getTeamMembers(users);

    return {
      managers: getUserResponse(managers, 10),
      teamMembers: getUserResponse(teamMembers, 2),
    };
  }),
  create: procedure
    .input(
      yup
        .object({
          name: yup.string().required(),
          email: yup.string().required(),
          role: yup.string().required(),
        })
        .required(),
    )
    .mutation(async (opts) => {
      const normalizedEmail = service.normalizeEmail(opts.input.email);

      if (!normalizedEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "E-mail inválido.",
        });
      }

      await repository.add({ ...opts.input, email: normalizedEmail });
    }),
  delete: procedure
    .input(yup.object({ id: yup.string().required() }).required())
    .mutation(async (opts) => {
      const { session } = opts.ctx;

      if (!session?.user?.email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Usuário não autenticado.",
        });
      }

      const currentUser = await repository.findByEmail(session.user.email);

      if (!service.isManager(currentUser)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Apenas dirigentes podem excluir usuários.",
        });
      }

      const targetUser = await repository.findById(opts.input.id);

      if (!targetUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuário não encontrado.",
        });
      }

      if (service.isManager(targetUser)) {
        const managerCount = await repository.countByRole("dirigente");

        if (managerCount <= 1) {
          throw new TRPCError({
            code: "CONFLICT",
            message:
              "O sistema precisa manter ao menos 1 dirigente cadastrado.",
          });
        }
      }

      await repository.destroy(opts.input.id);
    }),
});
