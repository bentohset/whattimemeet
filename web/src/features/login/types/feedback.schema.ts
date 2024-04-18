import { z } from "zod";

export const feedbackSchema = z.object({
  contact: z.string().optional(),
  feedback: z.string().optional(),
});
