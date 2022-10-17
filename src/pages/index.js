import { useState } from "react";

import { ViewState } from "@devexpress/dx-react-scheduler";

import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";
import { getEventos } from "./api/roteiro";

const currentDate = "2022-10-16";

const Appointment = ({ children, ...rest }) => (
  <Appointments.Appointment {...rest} onClick={(e) => console.log({ e })}>
    {children}
  </Appointments.Appointment>
);

export default function Roteiro({ eventos }) {
  const [schedulerData, setSchedulerData] = useState(() =>
    eventos.map((evento, index) => ({
      id: "qwe",
      startDate: `2022-10-16T0${index + 1}:35`,
      endDate: `2022-10-16T0${index + 2}:35`,
      title: evento.name,
    }))
  );

  return (
    <div>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />

        <DayView startDayHour={0} endDayHour={24} cellDuration={60} />

        <Appointments appointmentComponent={Appointment} />

        <CurrentTimeIndicator updateInterval={1000} />
      </Scheduler>
    </div>
  );
}

export async function getServerSideProps() {
  const eventos = await getEventos();

  console.log({ eventos });

  return {
    props: {
      eventos,
    },
  };
}
