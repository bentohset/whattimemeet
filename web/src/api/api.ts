import axios from "axios";

export type APIResponse = {
  message: string;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  code?: number;
};

export const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_API_URL_LOCAL
      : process.env.NEXT_API_URL_PROD,
  headers: {
    "Content-Type": "application/json",
  },
});
