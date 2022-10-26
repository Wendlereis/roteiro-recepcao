import axios from "axios";

export function getEvents() {
  return axios.get("/api/roteiro");
}

export function getEventById({ id }) {
  return axios.get(`/api/roteiro/${id}`);
}

export function createEvent(event) {
  return axios.post("/api/roteiro", event);
}

export function editEvent(event) {
  const { id, ...restEvent } = event;
  return axios.put(`/api/roteiro/${id}`, restEvent);
}

export function editEventsDuration({ endDate, minutes }) {
  return axios.put("/api/roteiro", { endDate, minutes });
}

export function deleteEvent({ id }) {
  return axios.delete(`/api/roteiro/${id}`);
}
