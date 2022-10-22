export function removeSeconds(date) {
  return new Date(date.setSeconds(0, 0));
}
