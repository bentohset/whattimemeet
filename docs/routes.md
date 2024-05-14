# API HTTP Routes

## Create a meeting

`POST /api/meeting`

- creates a meeting entry

Body:

```
{
  "title": "Test Meeting 1",
  "dates": ["12-12-2000", "28-12-2000"],
  "startTime": "0800",
  "endTime": "1200"
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

## Update Availability

`PUT /api/meeting`

- finds an Attendee with name and meetingID
- if exists, update the Attendee entry
- else, create the Attendee entry

Body:

```
{
  "name": "tester",
  "availability": "0 1 1 1 1 1 1 0",
  "meetingId":
}
```

Response: OK
