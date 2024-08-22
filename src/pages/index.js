import "react-big-calendar/lib/css/react-big-calendar.css";

import { useState, useEffect, useMemo } from "react";

import Link from "next/link";

import { trpc } from "../ultis/trpc";

import { Fab, Tab, Tabs } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";

import { useQuery } from "@tanstack/react-query";

import { DayViewCell } from "../components/DayViewCell";
import { DayViewLabel } from "../components/DayViewLabel";
import { AppointmentItem } from "../components/AppointmentItem";
import { AppointmentContent } from "../components/AppointmentContent";

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

  const components = useMemo(
    () => ({
      day: {
        event: ({ event }) => event.title,
      },
    }),
    []
  );

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
          components={components}
          toolbar={false}
          onSelectEvent={(event) => push(`/${event.id}/edit`)}
        />

        // <Scheduler data={getEventsResponse?.data}>
        //   <ViewState currentDate={selectedTab} />

        //   <DayView
        //     startDayHour={7}
        //     endDayHour={20.5}
        //     cellDuration={10}
        //     dayScaleCellComponent={DayViewCell}
        //     timeScaleLabelComponent={DayViewLabel}
        //   />

        //   <Appointments
        //     appointmentComponent={AppointmentItem}
        //     appointmentContentComponent={AppointmentContent}
        //   />

        //   <CurrentTimeIndicator updateInterval={60000} />
        // </Scheduler>
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
