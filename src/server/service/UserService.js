export function getManagers(users) {
  return users.filter((user) => user.role === "dirigente");
}

export function getTeamMembers(users) {
  return users.filter((user) => user.role === "equipista");
}

export function isManager(user) {
  return user?.role === "dirigente";
}

export function normalizeEmail(email) {
  if (typeof email !== "string") {
    return "";
  }

  return email.trim().toLowerCase();
}
