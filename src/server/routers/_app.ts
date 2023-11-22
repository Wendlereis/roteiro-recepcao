import { procedure, router } from "../trpc";

const editionRouter = router({
  get: procedure.query(() => {
    return { name: "EJC 62 " };
  }),
});

export const appRouter = router({
  edition: editionRouter,
});

export type AppRouter = typeof appRouter;
