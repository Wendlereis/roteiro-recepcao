import "react-big-calendar/lib/css/react-big-calendar.css";

import { useState, useEffect, useMemo } from "react";

import Link from "next/link";

import { trpc } from "../ultis/trpc";

import { Fab, Tab, Tabs } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../api/event";

import { usePermission } from "../hook/usePermission";
import { Menu } from "../components/Menu/Menu";
import { ptBR } from "date-fns/locale";
import {
  format,
  getDay,
  parse,
  setHours,
  setMinutes,
  startOfWeek,
} from "date-fns";
import { useRouter } from "next/router";

export default function Schedule() {
  const { data: getEventsResponse } = useQuery(["events"], getEvents);

  const { push } = useRouter();

  const edition = trpc.edition.getByActive.useQuery();

  const [selectedTab, setSelectedTab] = useState();

  const { isAdmin } = usePermission();

  function handleTabChange(_, tab) {
    setSelectedTab(tab);
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("pt-BR", {
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  }

  useEffect(() => {
    if (edition.data) {
      const start = edition.data.startDate.toISOString();

      setSelectedTab(start);
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

      <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
        <Tab
          label={`Sábado ${formatDate(edition.data.startDate)}`}
          value={edition.data.startDate}
        />
        <Tab
          label={`Domingo ${formatDate(edition.data.endDate)}`}
          value={edition.data.endDate}
        />
      </Tabs>

      {getEventsResponse?.data && (
        <Calendar
          style={{ height: "100vh" }}
          localizer={localizer}
          date={new Date(selectedTab)}
          timeslots={1}
          step={10}
          min={setMinutes(setHours(new Date(selectedTab), 7), 0)}
          max={setMinutes(setHours(new Date(selectedTab), 20), 40)}
          defaultView="day"
          events={events}
          toolbar={false}
          onSelectEvent={(event) => push(`/${event.id}/edit`)}
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
