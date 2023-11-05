import { EventRepository } from "../repository/EventRepository";
import { EventService } from "../service/EventService";

export class EventDurationController {
  constructor() {
    this.service = new EventService();
    this.repository = new EventRepository();
  }

  async edit(endDate, minutes) {
    try {
      const events = await this.repository.findByStartDate(endDate);

      const updatedEvents = this.service.updateEventsDuration(events, minutes);

      for (let index = 0; index < updatedEvents.length; index++) {
        const event = updatedEvents[index];

        await this.repository.edit(event);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
