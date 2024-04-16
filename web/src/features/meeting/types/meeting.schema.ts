import { z } from "zod";

export const newMeetingSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    dates: z.array(z.date()).min(1, { message: "Choose at least 1 date" }),
    startTime: z.string().min(1, { message: "Earliest time is required" }),
    endTime: z.string().min(1, { message: "Latest time is required" }),
  })
  .refine((data) => Number(data.startTime) < Number(data.endTime), {
    message: "Latest Time must be later than Earliest Time",
    path: ["endTime"],
  });
