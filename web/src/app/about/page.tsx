import Link from "next/link";
import React from "react";

import { FeedbackForm } from "@/features/feedback";

const page = () => {
  return (
    <div className="md:px-24 p-8 max-w-5xl flex-col items-center justify-between font-mono text-sm lg:flex space-y-14">
      <section className="flex flex-col w-full gap-y-8">
        <h1 className="font-bold text-2xl">What Time Meet?</h1>
        <div className="flex flex-col gap-y-4">
          <p className="">
            WhatTimeMeet is a self-made improvement from the well-known{" "}
            <Link
              href="https://www.when2meet.com"
              target="__blank"
              className="underline hover:text-blue-600"
            >
              When2meet
            </Link>
            .
          </p>
          <p>
            The way it works is similar, except it is responsive and supports
            mobile usage as well.
            <br />
            WhatTimeMeet is a lightweight option for quick meetings for groups
            on the go.
            <br />
            It doesn&apos;t require much setup as similar, more well-known,
            products{" "}
            <span className="text-xs text-zinc-500 italic">
              (which shall not be named)
            </span>
            .
          </p>
        </div>
      </section>
      <section className="flex flex-col w-full gap-y-4">
        <p>
          For questions or issues regarding WhatTimeMeet, please feel free to
          fill up the form below:
        </p>
        <FeedbackForm />
      </section>
    </div>
  );
};

export default page;
