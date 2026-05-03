import { trpc } from "../ultis/trpc";

export function useUsers() {
  const query = trpc.user.get.useQuery();

  const { refetch } = query;

  const data = query.data;

  return { users: data, refetch };
}
