import axios from "axios";

const environment = process.env.NODE_ENV;

export default axios.create({
  baseURL:
    environment === "production"
      ? "https://library-app-server.herokuapp.com/"
      : "http://localhost:3500/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL:
    environment === "production"
      ? "https://library-app-server.herokuapp.com/"
      : "http://localhost:3500/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
