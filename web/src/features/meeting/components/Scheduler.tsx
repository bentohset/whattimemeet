import React, { useState } from "react";

import { cn, parseTimeStrings } from "@/lib/utils";

import type { Attendee, Meeting } from "../types/meeting.type";

type Props = {
  user: Attendee;
  meeting: Meeting;
  setAvail: (avail: number[][]) => void;
  userAvail: number[][];
};

// 15min intervals 1 col for each day
// click and drag for desktop
// click buttons with time for mobile
export const Scheduler = (props: Props) => {
  if (!props.user || !props.meeting) return null;

  const intervals = parseTimeStrings(
    props.meeting.startTime,
    props.meeting.endTime,
  );
  const hours = Number(props.meeting.startTime.slice(0, 2));
  const minutes = Number(props.meeting.startTime.slice(2));
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

  const [isMouseDown, setIsMouseDown] = useState(false);
  const handleMouseDown = () => {
    setIsMouseDown(true);
  };
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleSelectCell = (row: number, col: number) => {
    handleMouseDown();
    props.setAvail((prev: number[][]) => {
      const newGrid = [...prev];
      newGrid[row] = [...prev[row]];
      newGrid[row][col] = prev[row][col] === 1 ? 0 : 1;
      return newGrid;
    });
  };

  const handleMouseMove = (row: number, col: number) => {
    if (isMouseDown) {
      handleSelectCell(row, col);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="font-semibold text-xl">
        {props.user.name}&apos;s Availability
      </h1>
      <p className="mb-2">Click and drag to select availability</p>
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
        {props.meeting.dates.map((date, col) => {
          return (
            <div key={date} className="w-full flex flex-col">
              <h1 className="h-5">{date}</h1>
              {timings.map((time, row) => {
                return (
                  <div
                    key={time}
                    role="presentation"
                    onMouseDown={() => handleSelectCell(row, col)}
                    onMouseUp={handleMouseUp}
                    onMouseOver={() => handleMouseMove(row, col)}
                    onFocus={() => undefined}
                    onMouseOut={() => undefined}
                    onBlur={() => undefined}
                    className={cn(
                      "h-5 border-[0.5px]",
                      props.userAvail[row][col] === 1
                        ? "bg-green-500 border-white"
                        : "bg-zinc-100 border-zinc-400",
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
