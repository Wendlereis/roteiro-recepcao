import axios from "axios";

export function getEvents() {
  return axios.get("/api/event");
}

export function getEventById({ id }) {
  return axios.get(`/api/event/${id}`);
}

export function createEvent(event) {
  return axios.post("/api/event", event);
}

export function editEvent(event) {
  const { id, ...restEvent } = event;
  return axios.put(`/api/event/${id}`, restEvent);
}

export function editEventsDuration({ endDate, minutes }) {
  return axios.put("/api/event", { endDate, minutes });
}

export function deleteEvent({ id }) {
  return axios.delete(`/api/event/${id}`);
}
