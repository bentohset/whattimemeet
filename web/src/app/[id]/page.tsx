"use client";

import React, { useEffect, useRef, useState } from "react";

import Spinner from "@/components/spinner";

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
import type { Attendee, Meeting } from "@/features/meeting/types/meeting.type";

import { login } from "@/api/loginAPI";
import { getMeeting, updateAvailability } from "@/api/meetingAPI";

const DEBOUNCE_TIME = 800; // ms

const page = ({ params }: { params: { id: string } }) => {
  const url = getDomainName();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<Attendee | undefined>();
  const [userAvail, setUserAvail] = useState<number[][]>([]);
  const [meeting, setMeeting] = useState<Meeting>();
  const [isNotFound, setIsNotFound] = useState(false);

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMeeting = async () => {
      setLoading(true);
      const res = await getMeeting(params.id);
      if (res && res.code === 404) {
        console.log("notfound");
        setIsNotFound(true);
      } else if (res.status === "success" && res.data) {
        setMeeting(res.data);
      }
      setLoading(false);
    };

    fetchMeeting();
  }, []);

  const handleLogin = async (name: string) => {
    const intervals = parseTimeStrings(meeting.startTime, meeting.endTime);
    const dates = meeting.dates.length;

    const response = await login({
      name,
      meetingId: params.id,
    });

    if (response.data && response.status === "success") {
      // old user
      const avail = convertStringTo2d(
        response.data.availability,
        intervals,
        dates,
      );
      setUserData(response.data);
      setUserAvail(avail);
      setIsLoggedIn(true);
    } else if (response.status === "success" && !response.data) {
      // new user
      const availString = createZeroString(dates * intervals);
      const avail = convertStringTo2d(availString, intervals, dates);
      setUserData({ name, availability: availString });
      setUserAvail(avail);
      setIsLoggedIn(true);
    } else {
      console.error("error logging in");
    }
  };

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

    const save = async () => {
      if (!userData) return;
      console.log("save");
      const response = await updateAvailability({
        name: userData.name,
        meetingId: params.id,
        availability: convert2DArrayToString(userAvail),
      });

      if (response.status !== "success") {
        console.error("error saving");
      }
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

  if (isLoading) {
    return (
      <div className="items-center justify-center font-mono text-sm flex">
        <Spinner />
      </div>
    );
  }
  if (isNotFound) {
    return (
      <div className="h-full items-center justify-center font-mono text-sm flex py-24">
        <h1 className="text-lg">
          No such meeting. Please double check the address
        </h1>
      </div>
    );
  }
  if (!meeting) return null;
  return (
    <div className="md:px-24 p-8 flex-col items-center justify-between font-mono text-sm lg:flex space-y-8">
      <section className="flex flex-col w-full gap-y-2">
        <h1 className="font-bold text-2xl">{meeting && meeting.title}</h1>
        <p className="font-semibold text-zinc-400">
          {meeting && meeting.description}
        </p>
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
