import axios from "axios";

export function createEvent({ name, start, end }) {
  return axios.post("/api/roteiro", { name, start, end });
}

export function getEvent() {
  return axios.get("/api/roteiro");
}
