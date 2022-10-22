import Link from "next/link";

import { Fab } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

import { AppointmentDetail } from "../components/AppointmentDetail";

import { getEventos } from "./api/roteiro";

const currentDate = "2022-10-16";

export default function Roteiro({ eventos }) {
  return (
    <div>
      <Scheduler data={eventos}>
        <ViewState />

        <DayView startDayHour={5} endDayHour={22} cellDuration={15} />

        <Appointments appointmentComponent={AppointmentDetail} />

        <CurrentTimeIndicator updateInterval={60000} />
      </Scheduler>

      <Link href="/create">
        <Fab component="a" sx={{ position: "fixed", bottom: 16, right: 16 }} color="primary">
          <AddRounded />
        </Fab>
      </Link>
    </div>
  );
}

export async function getServerSideProps() {
  const eventos = await getEventos();

  return {
    props: {
      eventos,
    },
  };
}
