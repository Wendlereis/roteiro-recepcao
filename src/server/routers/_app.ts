import { router } from "../trpc";

import { editionRouter } from "./editions";
import { eventsRouter } from "./events";
import { categoryRouter } from "./categories";
import { userRouter } from "./users";

export const appRouter = router({
  edition: editionRouter,
  event: eventsRouter,
  category: categoryRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
