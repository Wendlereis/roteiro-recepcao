import "react-big-calendar/lib/css/react-big-calendar.css";

import { useRouter } from "next/router";
import { trpc } from "../../../ultis/trpc";
import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../../../api/event";
import { Menu } from "../../../components/Menu/Menu";

import { useEffect, useState } from "react";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import { ptBR } from "date-fns/locale";
import {
  format,
  getDay,
  parse,
  setHours,
  setMinutes,
  startOfWeek,
} from "date-fns";
import { EditionTab } from "../../../components/EditionTab/EditionTab";

export default function EditionDetails() {
  const router = useRouter();

  const { data: getEventsResponse } = useQuery(["events"], getEvents);

  const edition = trpc.edition.getById.useQuery(String(router.query.slug));

  const [calendarDate, setCalendarDate] = useState();

  function handleOnEditionTabChange(tab) {
    setCalendarDate(new Date(tab));
  }

  useEffect(() => {
    if (edition.data) {
      setCalendarDate(edition.data.startDate);
    }
  }, [edition.data]);

  if (!edition.data) {
    return "loading...";
  }

  const locales = {
    "pt-BR": ptBR,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = getEventsResponse?.data.map((event) => ({
    id: event._id,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    color: event.color,
  }));

  return (
    <div>
      <Menu label={edition.data.name} />

      <EditionTab
        start={edition.data.startDate.toISOString()}
        end={edition.data.endDate.toISOString()}
        onChange={handleOnEditionTabChange}
      />

      {events && (
        <Calendar
          style={{ height: "100vh" }}
          localizer={localizer}
          date={calendarDate}
          timeslots={1}
          step={10}
          min={setMinutes(setHours(calendarDate, 7), 0)}
          max={setMinutes(setHours(calendarDate, 20), 40)}
          defaultView="day"
          events={events}
          toolbar={false}
          formats={{
            eventTimeRangeFormat: (range) => `${format(range.start, "HH:mm")}`,
          }}
          eventPropGetter={(event) => ({
            style: {
              background: event.color,
              borderColor: "transparent",
            },
          })}
        />
      )}
    </div>
  );
}
