import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Fab } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../api/event";
import { trpc } from "../ultis/trpc";

import { Menu } from "../components/Menu/Menu";
import { EditionTab } from "../components/EditionTab/EditionTab";
import { Calendar } from "../components/Calendar/Calendar";

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
    if (!calendarDate && edition.data) {
      setCalendarDate(edition.data.startDate);
    }
  }, [calendarDate, edition.data]);

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
          day={calendarDate}
          events={events}
          onSelectEvent={handleOnSelectEvent}
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
