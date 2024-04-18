import React from "react";

import type { Attendee } from "../types/meeting.type";

type Props = {
  data: Attendee;
};

export const Scheduler = (props: Props) => {
  if (!props.data) return null;

  return (
    <div className="flex flex-row w-full">
      <h1 className="font-semibold text-xl">
        {props.data.name}&apos;s Availability
      </h1>
    </div>
  );
};
