import { useRouter } from "next/router";

import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

import { usePermission } from "../../hook/usePermission";

export function AppointmentItem({ children, ...rest }) {
  const { push } = useRouter();

  const { isAdmin } = usePermission();

  const { data } = rest;

  function handleAppointmentSelect({ data }) {
    if (!isAdmin) {
      return;
    }

    push(`/${data._id}/edit`);
  }

  return (
    <Appointments.Appointment style={{ backgroundColor: data.color }} onClick={handleAppointmentSelect} {...rest}>
      {children}
    </Appointments.Appointment>
  );
}
