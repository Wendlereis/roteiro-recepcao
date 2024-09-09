import { format } from "date-fns";

function eventTimeRangeFormat(range) {
  return `${format(range.start, "HH:mm")}`;
}

export const formatter = { eventTimeRangeFormat };
