import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toDateInputValue = (date?: string | Date | null) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};
