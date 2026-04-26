import { useEffect } from "react";

import { useSession } from "next-auth/react";

import { useUsers } from "./useUsers";

function normalizeEmail(email) {
  if (typeof email !== "string") {
    return "";
  }

  return email.trim().toLowerCase();
}

export function usePermission() {
  const { users } = useUsers();

  const { data: session } = useSession();

  const sessionEmail = normalizeEmail(session?.user?.email);

  const isManager = users?.managers.result?.some(
    (manager) => normalizeEmail(manager.email) === sessionEmail,
  );

  const isTeamMember = users?.teamMembers.result?.some(
    (teamMember) => normalizeEmail(teamMember.email) === sessionEmail,
  );

  const isAdmin = isManager || isTeamMember;

  useEffect(() => {
    const hasPermissionStored = localStorage.getItem(
      "@roteiro-recepcao:permission",
    );

    if (hasPermissionStored) {
      localStorage.removeItem("@roteiro-recepcao:permission");
    }
  }, []);

  return { isAdmin, isManager, isTeamMember };
}
