import axios from "axios";

export function getCategories() {
  return axios.get("/api/category");
}
