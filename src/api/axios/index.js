import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3500",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosWithCredentials = axios.create({
  baseURL: "http://localhost:3500",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
