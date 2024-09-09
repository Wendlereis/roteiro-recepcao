import "react-big-calendar/lib/css/react-big-calendar.css";

import { setHours, setMinutes } from "date-fns";

import { Calendar as RBCCalendar } from "react-big-calendar";

import { localizer } from "./localizer";
import { formatter } from "./formatter";

export function Calendar({ day, events, onSelectEvent }) {
  const startHourDay = setMinutes(setHours(day, 7), 0);

  const endHourDay = setMinutes(setHours(day, 20), 40);

  function getEventStyles(event) {
    return {
      style: {
        background: event.color,
        borderColor: "transparent",
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
      events={events}
      step={10}
      timeslots={1}
      toolbar={false}
      eventPropGetter={getEventStyles}
      onSelectEvent={onSelectEvent}
      formats={formatter}
    />
  );
}
