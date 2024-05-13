import { logError } from "@/lib/toast";

import type { FeedbackType } from "@/features/feedback";

import { API } from "./api";

export const postFeedback = async (feedbackData: FeedbackType) => {
  try {
    const response = await API.post("/feedback", feedbackData);
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
