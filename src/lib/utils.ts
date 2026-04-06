import { format, parse } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRatingLabel(rating: number) {
  switch (rating) {
    case 1:
      return "Very Poor";
    case 2:
      return "Poor";
    case 3:
      return "Average";
    case 4:
      return "Good";
    case 5:
      return "Excellent";
    default:
      return "Unrated";
  }
}

export function formatScheduleTime(timeValue: string) {
  try {
    return format(parse(timeValue, "HH:mm:ss", new Date()), "hh:mm a");
  } catch {
    return timeValue;
  }
}

export function formatScheduleRange(startTime: string, endTime: string) {
  return `${formatScheduleTime(startTime)} - ${formatScheduleTime(endTime)}`;
}

export function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }

  if (cleaned.length === 11 || cleaned.length === 12) {
    return `+94 ${cleaned.slice(-9, -6)} ${cleaned.slice(-6, -3)} ${cleaned.slice(-3)}`;
  }

  return phone;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getFileTypeFromUrl(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url) ? "video" : "image";
}
