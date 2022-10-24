import { useRouter } from "next/router";

import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

export function AppointmentItem({ children, ...rest }) {
  const { push } = useRouter();

  function handleAppointmentSelect({ data }) {
    push(`/${data._id}/edit`);
  }

  return (
    <Appointments.Appointment onClick={handleAppointmentSelect} {...rest}>
      {children}
    </Appointments.Appointment>
  );
}
