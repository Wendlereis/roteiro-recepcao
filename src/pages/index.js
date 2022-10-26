import Link from "next/link";

import { Fab } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

import { useQuery } from "@tanstack/react-query";

import { DayViewCell } from "../components/DayViewCell";
import { DayViewLabel } from "../components/DayViewLabel";
import { AppointmentItem } from "../components/AppointmentItem";
import { AppointmentContent } from "../components/AppointmentContent";

import { getEvents } from "../api/event";

const currentDate = "2022-10-16";

export default function Schedule() {
  const { data: getEventsResponse } = useQuery(["events"], getEvents);

  return (
    <div>
      {getEventsResponse?.data && (
        <Scheduler data={getEventsResponse?.data}>
          <ViewState />

          <DayView
            startDayHour={6.75}
            endDayHour={20.5}
            cellDuration={15}
            dayScaleCellComponent={DayViewCell}
            timeScaleLabelComponent={DayViewLabel}
          />

          <Appointments appointmentComponent={AppointmentItem} appointmentContentComponent={AppointmentContent} />

          <CurrentTimeIndicator updateInterval={60000} />
        </Scheduler>
      )}

      <Link href="/create">
        <Fab component="a" sx={{ position: "fixed", bottom: 16, right: 16 }} color="primary">
          <AddRounded />
        </Fab>
      </Link>
    </div>
  );
}
