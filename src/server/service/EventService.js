import { addMinutes } from "date-fns";

export class EventService {
  updateEventsDuration(events) {
    const updatedEvents = events.map((event) => ({
      ...event,
      startDate: addMinutes(this.removeSeconds(new Date(event.startDate)), minutes).toISOString(),
      endDate: addMinutes(this.removeSeconds(new Date(event.endDate)), minutes).toISOString(),
    }));

    return updatedEvents;
  }

  removeSeconds(date) {
    return new Date(date.setSeconds(0, 0));
  }
}
