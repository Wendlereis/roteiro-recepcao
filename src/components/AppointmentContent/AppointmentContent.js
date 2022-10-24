import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

export function AppointmentContent({ children, ...rest }) {
  function handleFormatDate(date) {
    return new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" }).format(new Date(date));
  }

  return (
    <Appointments.AppointmentContent {...rest} formatDate={handleFormatDate}>
      {children}
    </Appointments.AppointmentContent>
  );
}
