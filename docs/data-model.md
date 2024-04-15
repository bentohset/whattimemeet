# Data Modelling

Relational: PostgreSQL

Meetings {
  id
  title
  description
  startDate
  endDate
  startTime
  endTime
  createdAt
}

MeetingAttendees {
  id
  meetingId
  name
  availability
}