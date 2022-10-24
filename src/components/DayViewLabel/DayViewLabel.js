import { DayView } from "@devexpress/dx-react-scheduler-material-ui";

export function DayViewLabel({ formatDate, ...restProps }) {
  function handleFormatDate(date) {
    return new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" }).format(date);
  }

  return <DayView.TimeScaleLabel {...restProps} formatDate={handleFormatDate} />;
}
