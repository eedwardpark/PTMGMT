import axios from "axios";
export const api = axios.create({
  baseURL: "http://3.80.134.98:3000",
  headers: { "Content-Type": "application/json" },
});
