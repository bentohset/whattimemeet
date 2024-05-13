package main

import (
	"log"

	"github.com/bentohset/whattimemeet/config"
	database "github.com/bentohset/whattimemeet/db"
	"github.com/bentohset/whattimemeet/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	config.LoadEnv()
	database.ConnectDB()

	router.SetupRoutes(app)

	app.Get("/", func(c *fiber.Ctx) error {
		// Send a string response to the client
		return c.SendString("Hello, World")
	})

	log.Fatal(app.Listen(":8080"))
}
