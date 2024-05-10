/* eslint-disable no-plusplus */

"use client";

import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn, parseTimeStrings } from "@/lib/utils";

import type { Meeting } from "../types/meeting.type";

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
    const availabilityArrays = array.map((obj) => {
      return { name: obj.name, value: obj.availability.split(" ").map(Number) };
    });

    // Sum up the availability arrays
    const sumArray = availabilityArrays.reduce((acc, availability) => {
      return availability.value.map((value, index) => acc[index] + value);
    }, Array(24).fill(0));

    const combinedData = Array.from(
      { length: availabilityArrays[0].value.length },
      (_, i) => {
        const names = [];
        let total = 0;
        for (const item of availabilityArrays) {
          if (item.value[i] === 1) names.push(item.name);
          total += item.value[i];
        }
        return { names, total };
      },
    );

    // Convert the sum array back into a string format
    const sumString = sumArray.join(" ");

    return {
      nested: combinedData,
      string: sumString,
    };
  };

  function convertTo2DArray(data, rows: number, cols: number) {
    const result = Array.from({ length: rows }, () => Array(cols).fill([]));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Calculate the index in the flat array
        const index = i * cols + j;
        result[i][j] = data[index];
      }
    }

    return result;
  }

  const avails = convertTo2DArray(
    sumAvailability(props.data.attendees).nested,
    intervals,
    props.data.dates.length,
  );

  const totalPersons = props.data.attendees.length;

  const convertToColor = (value) => {
    let r = 22;
    let g = 128;
    let b = 61;

    if (value === totalPersons) {
      return `rgb(${r} ${g} ${b})`;
    }
    if (value === 0) {
      return "rgb(244 244 244)";
    }

    const fraction = 1 - value / totalPersons;
    r += Math.round((255 - r) * fraction);
    g += Math.round((255 - g) * fraction);
    b += Math.round((255 - b) * fraction);

    return `rgb(${r} ${g} ${b})`;
  };

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
                  <TooltipProvider key={time} delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          key={time}
                          className={cn("h-5 border-[0.5px] border-zinc-700")}
                          style={{
                            backgroundColor: convertToColor(
                              avails[row][col].total,
                            ),
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{time}</p>
                        {avails[row][col].names.map((name) => (
                          <p key={name}>{name}</p>
                        ))}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
