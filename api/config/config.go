package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// Config func to get env value
func Config(key string) string {
	// Return the value of the variable
	return os.Getenv(key)
}

func LoadEnv() {
	env := os.Getenv("APP_ENV")
	fmt.Println("environment: ", env)

	var envFile string
	if env == "production" {
		envFile = ".env.production"
	} else {
		envFile = ".env.development"
	}

	err := godotenv.Load(envFile)
	if err != nil {
		fmt.Print("Error loading .env file")
	}
}
