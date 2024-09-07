import "react-big-calendar/lib/css/react-big-calendar.css";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Fab } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import {
  format,
  getDay,
  parse,
  setHours,
  setMinutes,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../api/event";
import { trpc } from "../ultis/trpc";

import { Menu } from "../components/Menu/Menu";
import { EditionTab } from "../components/EditionTab/EditionTab";

import { usePermission } from "../hook/usePermission";

export default function Schedule() {
  const { push } = useRouter();
  const { isAdmin } = usePermission();

  const { data: getEventsResponse } = useQuery(["events"], getEvents);

  const edition = trpc.edition.getByActive.useQuery();

  const [calendarDate, setCalendarDate] = useState();

  function handleOnEditionTabChange(tab) {
    setCalendarDate(new Date(tab));
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

  function handleOnSelectEvent(event) {
    if (!isAdmin) {
      return;
    }

    push(`/${event.id}/edit`);
  }

  useEffect(() => {
    if (edition.data) {
      setCalendarDate(edition.data.startDate);
    }
  }, [edition.data]);

  if (!edition.data) {
    return "loading...";
  }

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
          onSelectEvent={handleOnSelectEvent}
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

      {isAdmin && (
        <Link href="/create">
          <Fab
            component="a"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            color="secondary"
          >
            <AddRounded />
          </Fab>
        </Link>
      )}
    </div>
  );
}
