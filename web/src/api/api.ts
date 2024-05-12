import axios from "axios";

export type APIResponse = {
  message: string;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  code?: number;
};

export const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
