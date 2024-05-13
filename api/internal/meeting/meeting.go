package meeting

import (
	"fmt"

	database "github.com/bentohset/whattimemeet/db"
	"github.com/bentohset/whattimemeet/internal/model"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm/clause"
)

func GetMeeting(c *fiber.Ctx) error {
	db := database.DB
	var meeting model.Meeting

	id := c.Params("id")

	db.Preload("Attendees").Find(&meeting, "id = ?", id)

	if meeting.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No meeting found", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Notes Found", "data": meeting})
}

func CreateMeeting(c *fiber.Ctx) error {
	db := database.DB
	meeting := new(model.Meeting)

	// Store the body in the note and return error if encountered
	c.BodyParser(meeting)

	meeting.ID = uuid.New()

	err := db.Create(&meeting).Error
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Could not create meeting", "data": err})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Created meeting", "data": meeting})
}

// given meetingID userID and availability, update or create a Availability entry
func UpdateAvailability(c *fiber.Ctx) error {
	db := database.DB

	var updateBody UpdateAvailBody
	c.BodyParser(&updateBody)

	// find meeting by id, if does not exists return error
	var meeting model.Meeting
	db.Find(&meeting, "id = ?", updateBody.MeetingId)
	if meeting.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No meeting found", "data": nil})
	}

	// upsert on Attendee entry with given meetingId and userId
	var attendee model.Attendee
	attendee.MeetingID = updateBody.MeetingId
	attendee.Name = updateBody.Name
	attendee.Availability = &updateBody.Availability

	db.Clauses(
		clause.OnConflict{
			Columns:   []clause.Column{{Name: "name"}, {Name: "meeting_id"}},
			DoUpdates: clause.Assignments(map[string]interface{}{"availability": attendee.Availability}),
		},
	).Create(&attendee)

	// db.Model(&attendee).Where("id = ?", updatedData.Id).Update("availability", updatedData.Availability)

	return c.JSON(fiber.Map{"status": "success", "message": "Updated availability successfully"})
}

func DeleteMeeting(c *fiber.Ctx) error {
	db := database.DB
	var meeting model.Meeting

	id := c.Params("id")
	db.Find(&meeting, "id = ?", id)

	// If no such note present return an error
	if meeting.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No meeting found", "data": nil})
	}

	err := db.Delete(&meeting, "id = ?", id).Error
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Failed to delete meeting", "data": nil})
	}

	// Return success message
	return c.JSON(fiber.Map{"status": "success", "message": "Deleted meeting"})
}

func SetupMeetingRoutes(router fiber.Router) {
	mt := router.Group("/meeting")

	// Create a Meeting
	mt.Post("/", ValidateNewMeeting, CreateMeeting)
	// Update availability
	mt.Put("/", UpdateAvailability)
	// Get all Notes
	mt.Get("/:id", GetMeeting)
	// Delete a meeting
	mt.Delete("/:id", DeleteMeeting)

	fmt.Println("Meeting routes setup")
}
