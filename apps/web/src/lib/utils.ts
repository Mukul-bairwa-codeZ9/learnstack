import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function formatDate(dateInput: string | number | Date | undefined | null): string | null {
  if (!dateInput) return null;

  const date = new Date(dateInput);
  
  // Prevent returning "Invalid Date" if the input is malformed
  if (isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}