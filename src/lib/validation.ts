// src/lib/validation.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be under 128 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
