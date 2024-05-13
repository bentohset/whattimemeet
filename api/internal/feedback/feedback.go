package feedback

import (
	"fmt"

	database "github.com/bentohset/whattimemeet/db"
	"github.com/bentohset/whattimemeet/internal/model"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func PostFeedback(c *fiber.Ctx) error {
	db := database.DB

	feedback := new(model.Feedback)
	c.BodyParser(feedback)

	feedback.ID = uuid.New()

	err := db.Create(&feedback).Error
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Could not submit feedback", "data": err})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Created feedback", "data": feedback})
}

func GetAllFeedback(c *fiber.Ctx) error {
	db := database.DB

	var feedbacks []model.Feedback

	err := db.Find(&feedbacks).Error
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Error retrieving feedback", "data": err})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Feedbacks retrieved", "data": feedbacks})
}

func DeleteFeedback(c *fiber.Ctx) error {
	db := database.DB
	var feedback model.Feedback

	id := c.Params("id")
	db.Find(&feedback, "id = ?", id)

	// If no such note present return an error
	if feedback.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No such feedback found", "data": nil})
	}

	err := db.Delete(&feedback, "id = ?", id).Error
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Failed to delete feedback", "data": nil})
	}

	// Return success message
	return c.JSON(fiber.Map{"status": "success", "message": "Deleted feedback"})
}

func SetupFeedbackRoutes(router fiber.Router) {
	fb := router.Group("/feedback")

	fb.Get("/", GetAllFeedback)
	fb.Post("/", ValidatePostFeedback, PostFeedback)
	fb.Delete("/:id", DeleteFeedback)

	fmt.Println("Feedback routes setup")
}
