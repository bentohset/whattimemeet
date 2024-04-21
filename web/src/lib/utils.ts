/* eslint-disable no-plusplus */
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

export function parseTimeStrings(start: string, end: string) {
  const startTiming = Number(start);
  const endTiming = Number(end);

  const diff = endTiming - startTiming;
  if (diff < 0)
    throw new Error("utils.parseTimeStrings(): end is earlier than start");

  const intervals = diff / 50;
  return intervals;
}

export function string24hToTime(time: string) {
  const hours = Number(time.slice(0, 2));
  const minutes = Number(time.slice(2));

  // convert hours to 12-hour format
  const meridiem = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;

  const formattedTime = `${displayHours}:${minutes.toString().padStart(2, "0")}${meridiem}`;

  return formattedTime;
}

export function createZeroString(length: number) {
  // Create an array of the desired length filled with '0'
  const zeroArray = Array.from({ length }, () => "0");

  // Join the array elements with spaces
  const zeroString = zeroArray.join(" ");

  return zeroString;
}

export function convertStringTo2d(avail: string, row: number, col: number) {
  const elements = avail.split(" ");

  // Initialize a 2D array
  const result = [];

  // Populate the 2D array
  for (let i = 0; i < row; i++) {
    result.push([]);
    for (let j = 0; j < col; j++) {
      // Calculate the index in the flat array
      const index = i * col + j;
      // Convert the string element to a number and push it into the 2D array
      result[i].push(Number(elements[index]));
    }
  }

  return result;
}

export function convert2DArrayToString(array: number[][]) {
  // Map each row of the 2D array to a string and join them with spaces
  const resultString = array.map((row) => row.join(" ")).join(" ");
  return resultString;
}
