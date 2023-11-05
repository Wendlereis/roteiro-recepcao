import { addMinutes } from "date-fns";

export function updateEventsDuration(events, minutes) {
  const updatedEvents = events.map((event) => ({
    ...event,
    startDate: addMinutes(
      removeSeconds(new Date(event.startDate)),
      minutes
    ).toISOString(),
    endDate: addMinutes(
      removeSeconds(new Date(event.endDate)),
      minutes
    ).toISOString(),
  }));

  return updatedEvents;
}

function removeSeconds(date) {
  return new Date(date.setSeconds(0, 0));
}
