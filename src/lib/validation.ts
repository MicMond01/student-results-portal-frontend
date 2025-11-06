// src/lib/validation.ts
import { z } from "zod";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const matricRegex = /^\d{11}$/;

const loginSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  password: z.string().min(1, "Password is required"),
});

const verificationSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  phone: z.string().min(1, "Phone Number is required"),
  jambNo: z.string().min(1, "JAMB/Matric No. is required"),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current Password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"], // Error will be shown on this field
  });

// export const registrationSchema = z.object({
//   identifier: z.string(),
//   fullName: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .max(128, "Password must be under 128 characters"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .max(128, "Password must be under 128 characters"),
// });

export const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+]+$/, "Invalid phone number"),
  address: z.string().min(3, "Address is required"),
  gender: z.enum(["male", "female"], "Gender is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type VerificationSchema = z.infer<typeof verificationSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export const LoginSchema = loginSchema;
export const VerificationSchema = verificationSchema;
export const ChangePasswordSchema = changePasswordSchema;