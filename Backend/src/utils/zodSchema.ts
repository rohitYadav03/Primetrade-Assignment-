import { z } from "zod";

// Existing auth schemas...
export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  role: z.enum(["user", "admin"]).default("user")
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
});

// ✨ NEW: Task validation schemas
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title too long"),
  
  description: z
    .string()
    .max(1000, "Description too long")
    .optional(),
  
  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED"])
    .default("PENDING"),
  
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .default("MEDIUM"),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title too long")
    .optional(),
  
  description: z
    .string()
    .max(1000, "Description too long")
    .optional()
    .nullable(), // Allow null to clear description
  
  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED"])
    .optional(),
  
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),
});

export const taskIdSchema = z.object({
  id: z
    .string()
    .transform(Number), 
});