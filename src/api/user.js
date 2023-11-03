import axios from "axios";

export function createUser(user) {
  return axios.post("/api/user", user);
}
