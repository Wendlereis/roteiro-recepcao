import { useState } from "react";

import { ViewState } from "@devexpress/dx-react-scheduler";

import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

const currentDate = "2022-10-16";

export default function Roteiro() {
  const [schedulerData, setSchedulerData] = useState([
    { startDate: "2022-10-16T21:35", endDate: "2022-10-16T23:00", title: "Meeting" },
  ]);

  return (
    <div>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />

        <DayView startDayHour={0} endDayHour={24} cellDuration={60} />

        <Appointments />

        <CurrentTimeIndicator updateInterval={1000} />
      </Scheduler>
    </div>
  );
}
