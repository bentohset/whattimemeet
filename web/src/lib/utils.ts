import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDomainName() {
  const url = process.env.NEXT_PUBLIC_URL;
  if (!url) {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    }
    return "https://whattimemeet.com";
  }
  return url;
}
