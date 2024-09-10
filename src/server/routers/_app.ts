import { router } from "../trpc";

import { editionRouter } from "./editions";
import { eventsRouter } from "./events";

export const appRouter = router({
  edition: editionRouter,
  event: eventsRouter,
});

export type AppRouter = typeof appRouter;
