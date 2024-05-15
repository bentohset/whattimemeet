DIST_PATH=./dist
IMG_NAME = whattimemeet:latest
PROJ_NAME = whattimemeet

install:
	go mod download

build:
	go build -o $(DIST_PATH)/server main.go

run-dev:
	APP_ENV=development go run main.go

run-prod:
	APP_ENV=production go run main.go

docker-run-dev: # need to configure dockerized postgres to work
	docker run --rm \
		-e APP_ENV=development \
		--name $(PROJ_NAME) \
		--env-file .env.development \
		-p 8080:8080 \
		$(IMG_NAME)

docker-build:
	docker-compose -f docker-compose-prod.yaml --env-file .env.production build

docker-run: 
	docker-compose -f docker-compose-prod.yaml --env-file .env.production up -d

docker-push: docker-build
	docker-compose --env-file .env.production -f docker-compose-prod.yaml push

delete-container-if-exist: ## Delete container if it exists
	docker stop $(PROJ_NAME) || true && docker rm $(PROJ_NAME) || true
