# API HTTP Routes

## Create a meeting
`POST /api/meeting`

- creates a meeting entity

Body:
```
{
  title
  description (optional)
  startDate
  endDate
  startTime
  endTime
}
```

Response:
```
{
  id: meeting id
}
```

## Get meeting
`GET /api/meeting/{id}`

- retrieves meeting details
- join with MeetingAttendees and get all availabilities

Response:
```
{
  id
  title
  description
  startDate
  endDate
  startTime
  endTime
  createdAt
  availabilities: [
    {name, availability},
    ...
  ]
}
```

## Quick login (no password)
`POST /api/login`

- checks if user is already added to the meeting, if not create an entity
- else, return id

Body:
```
{
  name: user's name
  meetingId: id of the meting
}
```

Response:
```
{
  id: userId
  availability
}
```


## Submit Availability
`POST /api/meeting/{id}`
- id: meetingId

Body:
```
{
  id: user id
  availability
}
```

- upserts MeetingAttendee entity with availability

Response: OK