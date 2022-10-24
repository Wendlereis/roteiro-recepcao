import Link from "next/link";

import { Fab } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

import { AppointmentDetail } from "../components/AppointmentDetail";

import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../api";

const currentDate = "2022-10-16";

export default function Schedule() {
  const { data: getEventsResponse } = useQuery(["events"], getEvents);

  return (
    <div>
      {getEventsResponse?.data && (
        <Scheduler data={getEventsResponse?.data}>
          <ViewState />

          <DayView startDayHour={5} endDayHour={22} cellDuration={15} />

          <Appointments appointmentComponent={AppointmentDetail} />

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
