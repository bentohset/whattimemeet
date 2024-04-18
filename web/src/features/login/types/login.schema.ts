import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
});
