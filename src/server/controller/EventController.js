import { EventRepository } from "../repository/EventRepository";
import { EventService } from "../service/EventService";

export class EventController {
  constructor() {
    this.service = new EventService();
    this.repository = new EventRepository();
  }

  async index() {
    try {
      const eventos = await this.repository.list();

      return JSON.parse(JSON.stringify(eventos));
    } catch (e) {
      console.error(e);
    }
  }

  async add(event) {
    try {
      await this.repository.add(event);
    } catch (e) {
      console.error(e);
    }
  }

  async edit(id, event) {
    try {
      await this.repository.edit({ ...event, _id: id });
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

  async getById(id) {
    try {
      const event = await this.repository.findById(id);

      return JSON.parse(JSON.stringify(event));
    } catch (e) {
      console.error(e);
    }
  }
}
