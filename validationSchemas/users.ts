import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required").max(255),
  email: z.string().min(1, "Email is required").max(255),
  password: z
    .string()
    .min(6, "Password is required")
    .max(255)
    .optional()
    .or(z.literal("")),
  role: z.string().min(1, "Role is required").max(10),
});
