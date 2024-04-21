export interface Meeting {
  id?: string;
  title: string;
  description?: string;
  dates: string[];
  startTime: string;
  endTime: string;
  attendees: Attendee[];
}

export interface Attendee {
  name: string;
  availability: string;
}
