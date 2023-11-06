export function getManagers(users) {
  return users.filter((user) => user.role === "dirigente");
}

export function getTeamMembers(users) {
  return users.filter((user) => user.role === "equipista");
}
