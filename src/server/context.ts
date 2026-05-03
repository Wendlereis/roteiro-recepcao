import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./auth";

export async function createContext({ req, res }: CreateNextContextOptions) {
  const session = await getServerSession(req, res, authOptions);

  return { req, res, session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
