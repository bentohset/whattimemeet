DIST_PATH=./dist

build:
	go build -o $(DIST_PATH)/server main.go

run: build
	./$(DIST_PATH)/server

watch:
	reflex -s -r '\.go$$' make run