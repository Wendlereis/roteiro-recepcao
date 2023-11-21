import { procedure, router } from "../trpc";

export const appRouter = router({
  edition: procedure.query((opts) => {
    return {
      name: "EJC 60",
    };
  }),
});

export type AppRouter = typeof appRouter;
