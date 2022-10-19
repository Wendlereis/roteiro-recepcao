import axios from "axios";

export function getEvent() {
  return axios.get("/api/roteiro");
}

export function createEvent({ title, startDate, endDate }) {
  return axios.post("/api/roteiro", { title, startDate, endDate });
}

export function editEvent({ title, startDate, endDate, id }) {
  return axios.put(`/api/roteiro/${id}`, { title, startDate, endDate });
}

export function deleteEvent({ id }) {
  return axios.delete(`/api/roteiro/${id}`);
}
