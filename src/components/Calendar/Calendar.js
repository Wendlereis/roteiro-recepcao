import "react-big-calendar/lib/css/react-big-calendar.css";

import { setHours, setMinutes } from "date-fns";

import { Calendar as RBCCalendar } from "react-big-calendar";

import { localizer } from "./localizer";
import { formatter } from "./formatter";

export function Calendar({ day, events, onSelectEvent }) {
  const startHourDay = setMinutes(setHours(day, 7), 0);

  const endHourDay = setMinutes(setHours(day, 20), 40);

  const data = events.map((event) => ({
    id: event._id,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    color: event.color,
  }));

  function getEventStyles(event) {
    return {
      style: {
        background: event.color,
        borderColor: "transparent",
        fontSize: 14,
        fontWeight: 600,
        color: "#00000099",
      },
    };
  }

  function getHourStyles() {
    return {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: "#9e9e9e",
        marginLeft: 8,
      },
    };
  }

  return (
    <RBCCalendar
      defaultView="day"
      date={day}
      min={startHourDay}
      max={endHourDay}
      localizer={localizer}
      events={data}
      step={10}
      timeslots={1}
      toolbar={false}
      eventPropGetter={getEventStyles}
      slotPropGetter={getHourStyles}
      onSelectEvent={onSelectEvent}
      formats={formatter}
    />
  );
}
