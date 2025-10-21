// src/types/app.ts
export type Role = "student" | "lecturer";

export type NavChild = {
  id: string;
  label: string;
  to: string;
  roles?: Role[];
};

export type NavItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  to?: string;
  roles?: Role[];
  children?: NavChild[];
};
