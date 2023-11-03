import axios from "axios";

export function createUser(user) {
  return axios.post("/api/user", user);
}

export function getUsers() {
  return axios.get("/api/user");
}
