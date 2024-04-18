import React from "react";

import type { Meeting } from "../types/meeting.type";

type Props = {
  data: Meeting;
};

export const MeetingSchedule = (props: Props) => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Everyone&apos;s Availability</h1>
      <p>{props.data.title}</p>
    </div>
  );
};
