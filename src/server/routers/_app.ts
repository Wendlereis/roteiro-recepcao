import * as yup from "yup";
import { procedure, router } from "../trpc";

import * as repository from "../repository/EditionRepository";

const editionRouter = router({
  get: procedure.query(async () => {
    const editons = await repository.list();

    return editons;
  }),
  create: procedure
    .input(
      yup.object({
        name: yup.string().required(),
        startDate: yup.date().required(),
        endDate: yup.date().required(),
        active: yup.boolean().required(),
      })
    )
    .mutation(async (opts) => {
      await repository.add(opts.input);
    }),
  setActive: procedure
    .input(
      yup.object({
        id: yup.string().required(),
      })
    )
    .mutation(async (opts) => {
      const currentActive = await repository.findByActive(true);

      await Promise.all([
        repository.deactivateById(currentActive._id),
        repository.activateById(opts.input.id),
      ]);
    }),
});

export const appRouter = router({
  edition: editionRouter,
});

export type AppRouter = typeof appRouter;
