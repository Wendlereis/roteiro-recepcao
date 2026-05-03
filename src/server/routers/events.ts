import { endOfDay } from "date-fns";

import * as yup from "yup";

import { procedure, router } from "../trpc";

import * as editionRepository from "../repository/EditionRepository";
import * as eventRepository from "../repository/EventRepository";
import * as eventService from "../service/EventService";

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
  getById: procedure.input(yup.string().required()).query(async (opts) => {
    return eventRepository.findById(opts.input);
  }),
  create: procedure
    .input(
      yup.object({
        title: yup.string().required(),
        color: yup.string().required(),
        day: yup.string().required(),
        startDate: yup.mixed().required(),
        endDate: yup.mixed().required(),
        author: yup.string(),
        updatedAt: yup.string().required(),
      }).required()
    )
    .mutation(async (opts) => {
      await eventRepository.add(opts.input);
    }),
  edit: procedure
    .input(
      yup.object({
        id: yup.string().required(),
        title: yup.string(),
        color: yup.string(),
        day: yup.string(),
        startDate: yup.mixed(),
        endDate: yup.mixed(),
        author: yup.string(),
        updatedAt: yup.string(),
        minutes: yup.number(),
      }).required()
    )
    .mutation(async (opts) => {
      const { id, ...restEvent } = opts.input;
      await eventRepository.edit({ ...restEvent, _id: id });
    }),
  editDuration: procedure
    .input(
      yup.object({
        endDate: yup.mixed().required(),
        minutes: yup.number().required(),
      }).required()
    )
    .mutation(async (opts) => {
      const { endDate, minutes } = opts.input;
      const events = await eventRepository.findByStartDate(endDate);
      const updatedEvents = eventService.updateEventsDuration(events, minutes);
      for (const event of updatedEvents) {
        await eventRepository.edit(event);
      }
    }),
  delete: procedure
    .input(yup.object({ id: yup.string().required() }).required())
    .mutation(async (opts) => {
      await eventRepository.destroy(opts.input.id);
    }),
});
