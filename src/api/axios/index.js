import axios from "axios";

export default axios.create({
  baseURL: "https://library-app-server.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: "https://library-app-server.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
