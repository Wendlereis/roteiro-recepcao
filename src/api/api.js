import axios from "axios";

export function getEvents() {
  return axios.get("/api/roteiro");
}

export function getEventById({ id }) {
  return axios.get(`/api/roteiro/${id}`);
}

export function createEvent({ title, startDate, endDate }) {
  return axios.post("/api/roteiro", { title, startDate, endDate });
}

export function editEvent({ title, startDate, endDate, id, minutes }) {
  return axios.put(`/api/roteiro/${id}`, { title, startDate, endDate, minutes });
}

export function editEventsDuration({ endDate, minutes }) {
  return axios.put("/api/roteiro", { endDate, minutes });
}

export function deleteEvent({ id }) {
  return axios.delete(`/api/roteiro/${id}`);
}
