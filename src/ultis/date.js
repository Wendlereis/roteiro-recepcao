export const edition = {
  startDate: new Date(2023, 8, 2).toISOString(),
  endDate: new Date(2023, 8, 3).toISOString(),
};

export function removeSeconds(date) {
  return new Date(date.setSeconds(0, 0));
}

export function buildEventDate(day, time) {
  const eventDay = new Date(day);

  return new Date(
    eventDay.getFullYear(),
    eventDay.getMonth(),
    eventDay.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
}
