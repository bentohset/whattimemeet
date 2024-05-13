package database

import (
	"fmt"
	"log"
	"strconv"

	"github.com/bentohset/whattimemeet/config"
	"github.com/bentohset/whattimemeet/internal/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// global db variable
var DB *gorm.DB

// initialize db connection based on .env vars
func ConnectDB() {
	var err error
	p := config.Config("DB_PORT")
	port, err := strconv.ParseUint(p, 10, 32)

	if err != nil {
		log.Println("Idiot")
	}

	fmt.Println("connecting to DB: ", config.Config("DB_HOST"))

	// connection URL to connect to Postgres
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s", config.Config("DB_HOST"), port, config.Config("DB_USER"), config.Config("DB_PASSWORD"), config.Config("DB_NAME"))
	DB, err = gorm.Open(postgres.Open(dsn))

	if err != nil {
		panic("failed to connect database")
	}
	DB.AutoMigrate(&model.Meeting{}, &model.Attendee{}, &model.Feedback{})

	fmt.Println("Connection Opened to Database")
}
