package feedback

import (
	"github.com/bentohset/whattimemeet/internal/utils"
	"github.com/gofiber/fiber/v2"
)

type FeedbackBody struct {
	Feedback string  `json:"feedback" validate:"required"`
	Contact  *string `json:"contact"`
}

func ValidatePostFeedback(c *fiber.Ctx) error {
	var errors []*utils.ValidationError
	body := new(FeedbackBody)
	c.BodyParser(&body)

	errors = utils.ParseValidation(body)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "message": errors})
	}

	return c.Next()
}
