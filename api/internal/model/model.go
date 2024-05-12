package model

import (
	"github.com/google/uuid"
	"github.com/lib/pq"
)

type Meeting struct {
	ID          uuid.UUID  `gorm:"type:uuid" json:"id"`
	Title       string     `json:"title" validate:"required"`
	Description *string    `json:"description"`
	Dates   		pq.StringArray     `gorm:"type:text[]" json:"dates" validate:"required"`
	StartTime   string     `json:"startTime" validate:"required"`
	EndTime     string     `json:"endTime" validate:"required"`
	Attendees   []Attendee `json:"attendees"`
}
// dates format: dd-mm-yyyy

type Attendee struct {
	MeetingID    uuid.UUID `gorm:"primaryKey;type:uuid" json:"meetingId" validate:"required"`
	Name         string    `gorm:"primaryKey" json:"name" validate:"required"`
	Availability *string   `json:"availability"`
}
