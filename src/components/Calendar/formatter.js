import { format } from "date-fns";

function eventTimeRangeFormat(range) {
  const { start, end } = range;

  return `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`;
}

function timeGutterFormat(date) {
  return `${format(date, "HH:mm")}`;
}

export const formatter = { eventTimeRangeFormat, timeGutterFormat };
