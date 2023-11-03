import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";

export function useUsers() {
  const query = useQuery(["users"], getUsers);

  const data = query.data?.data;

  return { users: data };
}
