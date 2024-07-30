import { router } from "../trpc";
import { editionRouter } from "./editions";

export const appRouter = router({
  edition: editionRouter,
});

export type AppRouter = typeof appRouter;
