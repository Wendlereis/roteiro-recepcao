import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/routers/_app";

import superjson from "superjson";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.PUBLIC_URL) {
    return `https://${process.env.PUBLIC_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },

  ssr: false,
});
