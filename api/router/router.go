package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"

	"github.com/bentohset/whattimemeet/internal/feedback"
	"github.com/bentohset/whattimemeet/internal/login"
	"github.com/bentohset/whattimemeet/internal/meeting"
)

func SetupRoutes(app *fiber.App) {

	// Group api calls with param '/api'
	api := app.Group("/api", logger.New())
	login.SetupLoginRoutes(api)
	meeting.SetupMeetingRoutes(api)
	feedback.SetupFeedbackRoutes(api)

}
