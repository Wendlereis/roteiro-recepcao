import * as yup from "yup";
import { procedure, router } from "../trpc";

import * as repository from "../repository/EditionRepository";

export const editionRouter = router({
  get: procedure.query(async () => {
    const editons = await repository.list();

    return editons;
  }),
  getById: procedure.input(yup.string()).query(async (opts) => {
    const edition = await repository.findById(opts.input);

    return edition;
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
      const currentActive = await repository.findByActive(true);

      const created = await repository.add(opts.input);

      await Promise.all([
        repository.deactivateById(currentActive._id),
        repository.activateById(created.id),
      ]);
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
