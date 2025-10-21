// src/types/student.ts
export type Student = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  enrolledAt: string;
  gpa: number;
  status: "Active" | "Probation" | "Alumni";
  avatarUrl?: string;
  source?: "Facebook" | "Instagram" | "LinkedIn" | "Github" | "Twitter";
};
