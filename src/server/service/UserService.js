export class UserService {
  getManagers(users) {
    return users.filter((user) => user.role === "dirigente");
  }

  getTeamMembers(users) {
    return users.filter((user) => user.role === "equipista");
  }
}
