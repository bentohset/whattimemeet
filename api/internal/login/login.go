package login

import (
	"fmt"

	database "github.com/bentohset/whattimemeet/db"
	"github.com/bentohset/whattimemeet/internal/model"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// check if name and meetingID exists, return attendee entry.
// else do nothing, updateMeeting creates new entry on frontend for new user
func Login(c *fiber.Ctx) error {
	db := database.DB

	var data LoginBody
	c.BodyParser(&data)

	var attendee model.Attendee
	// check if attendee with name and meetingId exists
	db.Find(&attendee, "name = ? AND meeting_id = ?", data.Name, data.MeetingId)
	if attendee.MeetingID == uuid.Nil {
		// does not exist, create attendee with empty availability
		// newAttendee := new(model.Attendee)
		// newAttendee.Name = data.Name
		// newAttendee.MeetingID = data.MeetingId
		// newAttendee.ID = uuid.New()

		// err := db.Create(&newAttendee).Error
		// if err != nil {
		// 	return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Could not create attendee", "data": err})
		// }

		return c.JSON(fiber.Map{"status": "success", "message": "New Attendee Logged In"})
	}
	// attendee exists
	return c.JSON(fiber.Map{"status": "success", "message": "Attendee Logged In", "data": attendee})
}

func SetupLoginRoutes(router fiber.Router) {
	lg := router.Group("/login")

	lg.Post("/", ValidateLogin, Login)
	fmt.Println("Login routes setup")
}
