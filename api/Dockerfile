# Building the binary of the App
FROM golang:1.22 AS build

WORKDIR /build

# Copy all the Code and stuff to compile everything
COPY . .

# Downloads all the dependencies in advance (could be left out, but it's more clear this way)
RUN go mod download

# Builds the application as a staticly linked one, to allow it to run on alpine
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o app .


# Moving the binary to the 'final Image' to make it smaller
FROM alpine:latest as release

# Copy binary and config files from /build to root folder of small container
COPY --from=build ["/build/app", "/build/.env.production" ,"/build/.env.development", "/"]

# Exposes port
EXPOSE 8080

ENTRYPOINT ["/app"]