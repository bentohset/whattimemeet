package login

import (
	"github.com/bentohset/whattimemeet/internal/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type LoginBody struct {
	Name      string    `json:"name" validate:"required"`
	MeetingId uuid.UUID `json:"meetingId" validate:"required"`
}

func ValidateLogin(c *fiber.Ctx) error {
	var errors []*utils.ValidationError
	body := new(LoginBody)
	c.BodyParser(&body)

	errors = utils.ParseValidation(body)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "message": errors})
	}

	return c.Next()
}
