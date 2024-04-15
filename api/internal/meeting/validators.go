package meeting

import (
	"github.com/bentohset/whattimemeet/internal/model"
	"github.com/bentohset/whattimemeet/internal/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func ValidateNewMeeting(c *fiber.Ctx) error {
	var errors []*utils.ValidationError
	body := new(model.Meeting)
	c.BodyParser(&body)

	errors = utils.ParseValidation(body)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}

	return c.Next()
}

type UpdateAvailBody struct {
	Availability string    `json:"availability" validate:"required"`
	Id           uuid.UUID `json:"userId" validate:"required"`
}

func ValidateAvailability(c *fiber.Ctx) error {
	var errors []*utils.ValidationError
	body := new(UpdateAvailBody)
	c.BodyParser(&body)

	errors = utils.ParseValidation(body)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}

	return c.Next()
}
