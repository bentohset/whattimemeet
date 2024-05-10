"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  convert2DArrayToString,
  convertStringTo2d,
  createZeroString,
  getDomainName,
  parseTimeStrings,
} from "@/lib/utils";

import { LoginForm } from "@/features/login";
import {
  CopyToClipboard,
  MeetingSchedule,
  Scheduler,
} from "@/features/meeting";
import type { Attendee } from "@/features/meeting/types/meeting.type";

const DEBOUNCE_TIME = 800; // ms
const STUB = {
  id: "123456789",
  title: "Stub Event!!",
  description: "a random meeting",
  dates: ["23042024", "24042024", "25042024"],
  startTime: "0900",
  endTime: "1300",
  attendees: [
    {
      name: "ben",
      availability: "0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    },
    {
      name: "dover",
      availability: "0 1 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0",
    },
    {
      name: "mike",
      availability: "0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    },
    {
      name: "oxlong",
      availability: "0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    },
  ],
};

const page = ({ params }: { params: { id: string } }) => {
  const url = getDomainName();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<Attendee | undefined>();
  const [userAvail, setUserAvail] = useState<number[][]>([]);
  const [meeting, setMeeting] = useState(STUB);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // TODO: query meeting on params.id in useEffect

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    const data = STUB;
    const user = data.attendees.find((o) => o.name === name); // TODO: replace with query
    const intervals = parseTimeStrings(data.startTime, data.endTime);
    const dates = data.dates.length;

    // TODO: no need to create empty string; backend will do
    if (user) {
      const avail = convertStringTo2d(user.availability, intervals, dates);
      setUserData(user);
      setUserAvail(avail);
    } else {
      const availString = createZeroString(dates * intervals);
      const avail = convertStringTo2d(availString, intervals, dates);
      setUserData({ name, availability: availString });
      setUserAvail(avail);
    }
  };

  // TODO: use isFirstLoad state to stop inifinite saving
  const debounceTimeoutRef = useRef(null);
  useEffect(() => {
    const updateMeeting = () => {
      // find index of name
      const index = meeting.attendees.findIndex(
        (item) => item.name === userData.name,
      );

      if (index === -1) {
        // if cannot find, append
        const updatedMeeting = { ...meeting };
        updatedMeeting.attendees.push({
          name: userData.name,
          availability: convert2DArrayToString(userAvail),
        });
        setMeeting(updatedMeeting);
      } else {
        // setmeeting at that index
        const updatedMeeting = { ...meeting };
        updatedMeeting.attendees[index].availability =
          convert2DArrayToString(userAvail);
        setMeeting(updatedMeeting);
      }
    };

    const save = () => {
      const avail = convert2DArrayToString(userAvail);
      console.log(avail);
      // TODO: send request to backend
    };

    const debounce = () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(save, DEBOUNCE_TIME);
    };

    debounce();
    if (userData && userData.name) updateMeeting();

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [userAvail]);

  return (
    <div className="md:px-24 p-8 max-w-5xl flex-col items-center justify-between font-mono text-sm lg:flex space-y-8">
      <section className="flex flex-col w-full gap-y-2">
        <h1 className="font-bold text-2xl">{STUB.title}</h1>
        <p className="font-semibold text-zinc-400">{STUB.description}</p>
        <p>To invite people to this meeting, share this URL:</p>
        <div className="md:w-1/2 w-full">
          <CopyToClipboard value={`${url}/${params.id}`} />
        </div>
      </section>

      <section className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-x-12 gap-y-4 md:gap-y-0">
        <MeetingSchedule data={meeting} />
        {isLoggedIn ? (
          <Scheduler
            user={userData}
            meeting={meeting}
            setAvail={setUserAvail}
            userAvail={userAvail}
          />
        ) : (
          <div className="flex flex-col gap-y-4">
            <h1>Login to submit your availability</h1>
            <LoginForm submitFn={handleLogin} />
          </div>
        )}
      </section>
    </div>
  );
};

export default page;
