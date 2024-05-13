import { logError } from "@/lib/toast";

import type { APIResponse } from "./api";
import { API } from "./api";

type CreateMeeting = {
  title: string;
  description?: string;
  dates: string[];
  startTime: string;
  endTime: string;
};

type UpdateAvail = {
  name: string;
  availability?: string;
  meetingId: string;
};

export const getMeeting = async (meetingId: string): Promise<APIResponse> => {
  try {
    const response = await API.get(`/meeting/${meetingId}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      logError("Meeting not found");
      return {
        code: 404,
        status: "failed",
        message: "Meeting not found",
      };
    }
    logError("An error occured, please try again");
    return {
      code: 500,
      status: "failed",
      message: "Error fetching meeting",
    };
  }
};

export const createMeeting = async (
  meetingData: CreateMeeting,
): Promise<APIResponse> => {
  try {
    const response = await API.post("/meeting", meetingData);
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

export const updateAvailability = async (availabilityData: UpdateAvail) => {
  try {
    const response = await API.put("/meeting", availabilityData);
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
