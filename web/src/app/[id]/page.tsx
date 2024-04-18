"use client";

import React, { useState } from "react";

import { getDomainName } from "@/lib/utils";

import { LoginForm } from "@/features/login";
import {
  CopyToClipboard,
  MeetingSchedule,
  Scheduler,
} from "@/features/meeting";
import type { Attendee } from "@/features/meeting/types/meeting.type";

const STUB = {
  id: "123456789",
  title: "Stub Event!!",
  description: "a random meeting",
  dates: [],
  startTime: "",
  endTime: "",
  attendees: [
    {
      name: "ben",
    },
    {
      name: "dover",
    },
    {
      name: "mike",
    },
    {
      name: "oxlong",
    },
  ],
};

const page = ({ params }: { params: { id: string } }) => {
  const url = getDomainName();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<Attendee | undefined>();

  const handleLogin = (name: string) => {
    console.log(name);
    setIsLoggedIn(true);
    setUserData({ name });
  };

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
        <MeetingSchedule data={STUB} />
        {isLoggedIn ? (
          <Scheduler data={userData} />
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
