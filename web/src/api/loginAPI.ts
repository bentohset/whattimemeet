import { logError } from "@/lib/toast";

import { API } from "./api";

type LoginData = {
  name: string;
  meetingId: string;
};

export const login = async (loginData: LoginData) => {
  try {
    const response = await API.post("/login", loginData);
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      logError("Invalid input format");
    } else {
      logError("An error occured, please try again");
    }
    return {
      status: "failed",
      message: "An error occured",
    };
  }
};
