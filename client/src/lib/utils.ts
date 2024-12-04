import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const combineDateAndTime = (date: Date, time: string): Date | null => {
  if (!date || !time) return null;

  const [hours, minutes] = time.split(":").map(Number);
  const combinedDate = new Date(date);

  combinedDate.setHours(hours, minutes, 0, 0);
  return combinedDate;
}