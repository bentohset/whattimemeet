"use client";

import React from "react";

import {
  cn,
  convertStringTo2d,
  normalizeToScale,
  parseTimeStrings,
} from "@/lib/utils";

import type { Meeting } from "../types/meeting.type";
import { colorMap } from "../types/times";

type Props = {
  data: Meeting;
};

export const MeetingSchedule = (props: Props) => {
  const intervals = parseTimeStrings(props.data.startTime, props.data.endTime);
  const hours = Number(props.data.startTime.slice(0, 2));
  const minutes = Number(props.data.startTime.slice(2));
  const timings = Array.from({ length: intervals }, (_, i) => {
    const intervalMinutes = i * 30;
    const totalMinutes = minutes + intervalMinutes;
    let newHours = hours + Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    newHours %= 24;
    const displayNewHours = newHours % 12 || 12;
    const meridiem = newHours >= 12 ? "pm" : "am";
    return `${displayNewHours}:${newMinutes.toString().padStart(2, "0")}${meridiem}`;
  });

  const sumAvailability = (array) => {
    // Split availability strings into arrays of integers
    const availabilityArrays = array.map((obj) =>
      obj.availability.split(" ").map(Number),
    );

    // Sum up the availability arrays
    const sumArray = availabilityArrays.reduce((acc, availability) => {
      return availability.map((value, index) => acc[index] + value);
    }, Array(24).fill(0));

    // Convert the sum array back into a string format
    const sumString = sumArray.join(" ");

    return sumString;
  };

  const avails = convertStringTo2d(
    sumAvailability(props.data.attendees),
    intervals,
    props.data.dates.length,
  );

  const totalPersons = props.data.attendees.length;

  return (
    <div>
      <h1 className="font-semibold text-xl">Everyone&apos;s Availability</h1>
      <div className="flex flex-row w-full">
        {/* display timestamps */}
        <div className="flex flex-col items-end mr-2">
          <div className="h-5" />
          {timings.map((o) => {
            const minMeridian = o.split(":")[1];

            if (minMeridian.slice(0, 1) === "0") {
              return (
                <div key={o} className="h-5">
                  <p className="text-left text-xs">{o}</p>
                </div>
              );
            }
            return <div className="h-5" key={o} />;
          })}
        </div>
        {props.data.dates.map((date, col) => {
          return (
            <div key={date} className="w-full flex flex-col">
              <h1 className="h-5">{date}</h1>
              {timings.map((time, row) => {
                return (
                  <div
                    key={time}
                    className={cn(
                      "h-5 border-[0.5px]",
                      colorMap[
                        normalizeToScale(avails[row][col], totalPersons, 9)
                      ],
                    )}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
