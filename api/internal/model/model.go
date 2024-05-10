package model

import (
	"github.com/google/uuid"
)

type Meeting struct {
	ID          uuid.UUID  `gorm:"type:uuid"`
	Title       string     `json:"title" validate:"required"`
	Description *string    `json:"description"`
	Dates   		string     `json:"dates" validate:"required"`
	StartTime   string     `json:"startTime" validate:"required"`
	EndTime     string     `json:"endTime" validate:"required"`
	Attendees   []Attendee `json:"attendees"`
}

type Attendee struct {
	ID           uuid.UUID `gorm:"type:uuid"`
	MeetingID    uuid.UUID `gorm:"type:uuid" json:"meetingId" validate:"required"`
	Name         string    `json:"name" validate:"required"`
	Availability *string   `json:"availability"`
}
