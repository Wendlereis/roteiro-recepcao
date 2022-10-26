import { useRouter } from "next/router";

import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

export function AppointmentItem({ children, ...rest }) {
  const { push } = useRouter();

  const { data } = rest;

  function handleAppointmentSelect({ data }) {
    push(`/${data._id}/edit`);
  }

  return (
    <Appointments.Appointment style={{ backgroundColor: data.color }} onClick={handleAppointmentSelect} {...rest}>
      {children}
    </Appointments.Appointment>
  );
}
