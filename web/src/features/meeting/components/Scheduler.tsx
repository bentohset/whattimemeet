"use client";

import moment from "moment";
import React, { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Toggle } from "@/components/ui/toggle";

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

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // mobile version
  if (!isDesktop) {
    return (
      <div className="">
        <h1 className="font-semibold text-xl">
          {props.user.name}&apos;s Availability
        </h1>
        <p className="mb-2">Click to select availability</p>
        <div className="flex flex-row w-full">
          <div className="w-[550px] overflow-x-scroll flex flex-row gap-x-1">
            {props.meeting.dates.map((date, col) => {
              return (
                <div key={date} className="flex flex-col w-14">
                  <div className="h-9 w-full">
                    <h1 className="text-center text-xs">
                      {moment(date, "DD-MM-YYYY").format("DD MMM")}
                    </h1>
                    <h1 className="text-center text-xs">
                      {moment(date, "DD-MM-YYYY").format("ddd")}
                    </h1>
                  </div>
                  {timings.map((time, row) => {
                    return (
                      <Toggle
                        key={time}
                        variant="outline"
                        value={props.userAvail[row][col]}
                        onPressedChange={() => handleSelectCell(row, col)}
                        className="text-xs data-[state=on]:bg-green-500 m-1"
                      >
                        {time}
                      </Toggle>
                      // <div
                      //   key={time}
                      //   role="presentation"
                      //   onMouseDown={() => handleSelectCell(row, col)}
                      //   onMouseUp={handleMouseUp}
                      //   onMouseOver={() => handleMouseMove(row, col)}
                      //   onFocus={() => undefined}
                      //   onMouseOut={() => undefined}
                      //   onBlur={() => undefined}
                      //   className={cn(
                      //     "h-5 border-[0.5px] w-14",
                      //     props.userAvail[row][col] === 1
                      //       ? "bg-green-700 border-zinc-200"
                      //       : "bg-zinc-100 border-zinc-400",
                      //   )}
                      // />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="font-semibold text-xl">
        {props.user.name}&apos;s Availability
      </h1>
      <p className="mb-2">Click and drag to select availability</p>
      <div className="flex flex-row w-full">
        {/* display timestamps */}
        <div className="flex flex-col items-end mr-2">
          <div className="h-9" />
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
        <div className="w-[550px] overflow-x-scroll flex flex-row">
          {props.meeting.dates.map((date, col) => {
            return (
              <div key={date} className="flex flex-col w-14">
                <div className="h-9">
                  <h1 className="text-center text-xs">
                    {moment(date, "DD-MM-YYYY").format("DD MMM")}
                  </h1>
                  <h1 className="text-center text-xs">
                    {moment(date, "DD-MM-YYYY").format("ddd")}
                  </h1>
                </div>
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
                        "h-5 border-[0.5px] w-14",
                        props.userAvail[row][col] === 1
                          ? "bg-green-700 border-zinc-200"
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
    </div>
  );
};
