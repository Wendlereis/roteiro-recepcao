import { DayView } from "@devexpress/dx-react-scheduler-material-ui";

export function DayViewCell({ ...props }) {
  function handleFormatDate(date) {
    return new Intl.DateTimeFormat("pt-BR", { month: 'short', day: 'numeric' }).format(date);
  }

  return <DayView.DayScaleCell {...props} formatDate={handleFormatDate} />;
}
