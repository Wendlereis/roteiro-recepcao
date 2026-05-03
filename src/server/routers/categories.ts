import { procedure, router } from "../trpc";

import * as repository from "../repository/CategoryRepository";

export const categoryRouter = router({
  get: procedure.query(async () => {
    return repository.list();
  }),
});
