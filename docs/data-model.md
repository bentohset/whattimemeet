# Data Modelling

PostgreSQL

```
Meetings {
  id: UUID
  title: string
  description: string (OPTIONAL)
  dates: array of dates (format: DD-MM-YYYY)
  startTime: string (format: "0400")
  endTime: string (format: "0400")
}

Attendees {
  meetingId: UUID
  name: string
  availability: string (eg. "0 1 1 1 1 0 0 0")
  - PRIMARYKEY: (meetingId, name)
}
```
