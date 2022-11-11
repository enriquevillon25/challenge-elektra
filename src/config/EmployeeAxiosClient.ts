import axios from "axios";

export const EmployeeAxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: Number(process.env.REACT_APP_API_TIMEOUT),
  headers: {
    Accept: "application/json",
  },
});
