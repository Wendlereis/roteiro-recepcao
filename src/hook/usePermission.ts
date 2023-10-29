import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function usePermission() {
  const { query } = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const hasPermissionStored = localStorage.getItem("@roteiro-recepcao:permission");

    if (hasPermissionStored) {
      setIsAdmin(true);
    }

    if (query.admin === "") {
      localStorage.setItem("@roteiro-recepcao:permission", "true");
      setIsAdmin(true);
    }
  }, [query.admin]);

  return isAdmin;
}
