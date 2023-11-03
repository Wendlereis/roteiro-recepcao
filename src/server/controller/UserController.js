import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";

export class UserController {
  constructor() {
    this.service = new UserService();
    this.repository = new UserRepository();
  }

  async index() {
    try {
      const users = this.repository.list();

      const managers = this.service.getManagers(users);

      const teamMembers = this.service.getTeamMembers(users);

      return JSON.parse(
        JSON.stringify({
          managers: getUserResponse(managers, 10),
          teamMembers: getUserResponse(teamMembers, 2),
        })
      );
    } catch (e) {
      console.error(e);
    }
  }

  async add(user) {
    try {
      this.repository.add(user);
    } catch (e) {
      console.error(e);
    }
  }

  async destroy(id) {
    try {
      this.repository.destroy(id);
    } catch (e) {
      console.error(e);
    }
  }

  getUserResponse(users, limit) {
    const size = users.length;

    return {
      result: users,
      metadata: {
        seatsAvailable: size < limit,
        size,
      },
    };
  }
}
