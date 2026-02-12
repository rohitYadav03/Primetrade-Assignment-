import { z } from "zod"

export const signUpSchema = z.object({
  name: z.string()
        .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password too long"),

  role: z
    .enum(["user", "admin"])
    .default("user")
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
});
