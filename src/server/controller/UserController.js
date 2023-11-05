import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";

export class UserController {
  constructor() {
    this.service = new UserService();
    this.repository = new UserRepository();
  }

  async index() {
    try {
      const users = await this.repository.list();

      const managers = this.service.getManagers(users);

      const teamMembers = this.service.getTeamMembers(users);

      return JSON.parse(
        JSON.stringify({
          managers: this.getUserResponse(managers, 10),
          teamMembers: this.getUserResponse(teamMembers, 2),
        })
      );
    } catch (e) {
      console.error(e);
    }
  }

  async add(user) {
    try {
      await this.repository.add(user);
    } catch (e) {
      console.error(e);
    }
  }

  async destroy(id) {
    try {
      await this.repository.destroy(id);
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
