package meeting

import (
	"regexp"
	"time"

	"github.com/bentohset/whattimemeet/internal/model"
	"github.com/bentohset/whattimemeet/internal/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type UpdateAvailBody struct {
	Availability string    `json:"availability" validate:"required"`
	MeetingId           uuid.UUID `json:"meetingId" validate:"required"`
	Name           string `json:"name" validate:"required"`
}

func ValidateNewMeeting(c *fiber.Ctx) error {
	var errors []*utils.ValidationError
	body := new(model.Meeting)
	c.BodyParser(&body)

	errors = utils.ParseValidation(body)

	// date string validation
	dateRegex := regexp.MustCompile(`^\d{2}-\d{2}-\d{4}$`)
	for _, dateStr := range body.Dates {
		if !dateRegex.MatchString(dateStr) {
			var el utils.ValidationError
			el.Field = "dates"
			el.HasError = true
			el.Tag = "Invalid date format, must be DD-MM-YYYY"
			el.Value = dateStr
			
			errors = append(errors, &el)
		}
		// Attempt to parse the date string into a time.Time object to ensure it's a valid date
		_, err := time.Parse("02-01-2006", dateStr)
		if err != nil {
			var et utils.ValidationError
			et.Field = "dates"
			et.HasError = true
			et.Tag = "Invalid date"
			et.Value = dateStr
			
			errors = append(errors, &et)
		}
	}

	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "message": errors})
	}

	return c.Next()
}

func ValidateAvailability(c *fiber.Ctx) error {
	var errors []*utils.ValidationError
	body := new(UpdateAvailBody)
	c.BodyParser(&body)

	errors = utils.ParseValidation(body)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "message": errors})
	}

	return c.Next()
}
