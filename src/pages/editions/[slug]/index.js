import { useRouter } from "next/router";
import { trpc } from "../../../ultis/trpc";
import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../../../api/event";
import { Menu } from "../../../components/Menu/Menu";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";

import { DayViewCell } from "../../../components/DayViewCell";
import { DayViewLabel } from "../../../components/DayViewLabel";
import { AppointmentItem } from "../../../components/AppointmentItem";
import { AppointmentContent } from "../../../components/AppointmentContent";

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
        <Scheduler data={getEventsResponse?.data}>
          <ViewState currentDate={selectedTab} />

          <DayView
            startDayHour={7}
            endDayHour={20.5}
            cellDuration={10}
            dayScaleCellComponent={DayViewCell}
            timeScaleLabelComponent={DayViewLabel}
          />

          <Appointments
            appointmentComponent={AppointmentItem}
            appointmentContentComponent={AppointmentContent}
          />

          <CurrentTimeIndicator updateInterval={60000} />
        </Scheduler>
      )}
    </div>
  );
}
