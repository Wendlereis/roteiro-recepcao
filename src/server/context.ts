import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export async function createContext({ req, res }: CreateNextContextOptions) {
  return { req, res };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
