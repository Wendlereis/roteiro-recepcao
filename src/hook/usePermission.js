import { useEffect } from "react";

import { useSession } from "next-auth/react";

import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/user";
import { useUsers } from "./useUsers";

export function usePermission() {
  const { users } = useUsers();

  const { data: session } = useSession();

  const isManager = users?.managers.result?.some((manager) => (manager.email = session?.user.email));

  const isTeamMember = users?.teamMembers.result?.some((teamMember) => (teamMember.email = session?.user.email));

  const isAdmin = isManager || isTeamMember;

  useEffect(() => {
    const hasPermissionStored = localStorage.getItem("@roteiro-recepcao:permission");

    if (hasPermissionStored) {
      localStorage.removeItem("@roteiro-recepcao:permission");
    }
  }, []);

  return { isAdmin, isManager, isTeamMember };
}
