// src/types/app.ts
export type Role = "student" | "lecturer" | "admin";

export type NavChild = {
  id: string;
  label: string;
  to: string;
  allowedRoles?: Role[];
};

export type NavItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  to?: string;
  allowedRoles?: Role[];
  children?: NavChild[];
};
