package utils

import (
	"github.com/go-playground/validator/v10"
)

type (
	ValidationError struct {
		HasError bool
		Field    string
		Tag      string
		Value    interface{}
	}
)

var Validate = validator.New()

func ParseValidation(body interface{}) []*ValidationError {
	var errors []*ValidationError
	err := Validate.Struct(body)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var el ValidationError
			el.HasError = true
			el.Field = err.Field()
			el.Tag = err.Tag()
			el.Value = err.Param()
			errors = append(errors, &el)
		}
		return errors
	}
	return nil
}
