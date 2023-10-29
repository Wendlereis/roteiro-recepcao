import { useState } from "react";

import Link from "next/link";

import { Fab, Tab, Tabs } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

import { useQuery } from "@tanstack/react-query";

import { DayViewCell } from "../components/DayViewCell";
import { DayViewLabel } from "../components/DayViewLabel";
import { AppointmentItem } from "../components/AppointmentItem";
import { AppointmentContent } from "../components/AppointmentContent";

import { getEvents } from "../api/event";

import { edition } from "../ultis/date";
import { usePermission } from "../hook/usePermission";
import { Menu } from "../components/Menu/Menu";

export default function Schedule() {
  const { data: getEventsResponse } = useQuery(["events"], getEvents);

  const [selectedTab, setSelectedTab] = useState(edition.startDate);

  const isAdmin = usePermission();

  function handleTabChange(_, tab) {
    setSelectedTab(tab);
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("pt-BR", { month: "short", day: "numeric" }).format(new Date(date));
  }

  return (
    <div>
      <Menu />

      <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
        <Tab label={`Sábado ${formatDate(edition.startDate)}`} value={edition.startDate} />
        <Tab label={`Domingo ${formatDate(edition.endDate)}`} value={edition.endDate} />
      </Tabs>

      {getEventsResponse?.data && (
        <Scheduler data={getEventsResponse?.data}>
          <ViewState currentDate={selectedTab} />

          <DayView
            startDayHour={7}
            endDayHour={20.5}
            cellDuration={10}
            dayScaleCellComponent={DayViewCell}
            timeScaleLabelComponent={DayViewLabel}
          />

          <Appointments appointmentComponent={AppointmentItem} appointmentContentComponent={AppointmentContent} />

          <CurrentTimeIndicator updateInterval={60000} />
        </Scheduler>
      )}

      {isAdmin && (
        <Link href="/create">
          <Fab component="a" sx={{ position: "fixed", bottom: 16, right: 16 }} color="primary">
            <AddRounded />
          </Fab>
        </Link>
      )}
    </div>
  );
}
