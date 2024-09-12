import { endOfDay } from "date-fns";

import * as yup from "yup";

import { procedure, router } from "../trpc";

import * as editionRepository from "../repository/EditionRepository";
import * as eventRepository from "../repository/EventRepository";

export const eventsRouter = router({
  get: procedure.query(async () => {
    const edition = await editionRepository.findByActive(true);

    const { startDate, endDate } = edition;

    const events = await eventRepository.findByDateRange(
      startDate.toISOString(),
      endOfDay(endDate).toISOString()
    );

    return { edition, events };
  }),
  getByEditionId: procedure.input(yup.string()).query(async (opts) => {
    const edition = await editionRepository.findById(opts.input);

    const { startDate, endDate } = edition;

    const events = await eventRepository.findByDateRange(
      startDate.toISOString(),
      endOfDay(endDate).toISOString()
    );

    return { edition, events };
  }),
});
