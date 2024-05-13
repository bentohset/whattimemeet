# Data Modelling

Relational: PostgreSQL

Meetings {
id
title
description
dates
startTime
endTime
}

MeetingAttendees {
meetingId: compositekey
name: compositekey
availability
}
