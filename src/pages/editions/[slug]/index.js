import "react-big-calendar/lib/css/react-big-calendar.css";

import { useRouter } from "next/router";
import { trpc } from "../../../ultis/trpc";
import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../../../api/event";
import { Menu } from "../../../components/Menu/Menu";
import { Tab, Tabs } from "@mui/material";
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

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export default function EditionDetails() {
  const router = useRouter();

  const { data: getEventsResponse } = useQuery(["events"], getEvents);

  const edition = trpc.edition.getById.useQuery(String(router.query.slug));

  const [selectedTab, setSelectedTab] = useState();

  function handleTabChange(_, tab) {
    setSelectedTab(tab);
  }

  useEffect(() => {
    if (edition.data) {
      const start = edition.data.startDate.toISOString();

      setSelectedTab(start);
    }
  }, [edition.data]);

  if (!edition.data) {
    return "loading..";
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
          value={edition.data.startDate.toISOString()}
        />
        <Tab
          label={`Domingo ${formatDate(edition.data.endDate)}`}
          value={edition.data.endDate.toISOString()}
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
