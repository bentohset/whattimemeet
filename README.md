# What Time Meet

A modern meeting scheduler for quick and lightweight scheduling built with Golang and Nextjs.

## Table of Contents

- [About](#about)
  - [Motivation](#motivation)
  - [Features](#features)
  - [Tech](#tech)
- [Setup](#setup)
- [Docs](#docs)

## About

### Motivation

This project came about from using When2meet and thus is a modern improvement of it. When2meet feels old, outdated and not responsive.

WhatTimeMeet is a lightweight option for quick meetings for groups on the go.
It doesn't require much setup as similar, more well-known, products.

### Features

- Create a meeting with a title, short description, some selected dates and the time range
- Share meetings by sharing the URL
- Password-less login for quick and easy access
- Users can submit their availability across different time and dates

### Tech

- Fiber Golang
- NextJS TypeScript
- PostgreSQL
- Docker

Deployment:

- Backend - AWS EC2
- Frontend - Vercel
- DB - AWS RDS

## Setup

Requirements:

- NodeJS and npm
- Makefile
- Go (at least v1.22)
- PostgreSQL (hosted locally)

**Frontend:**

```
cd web
npm i
npm run dev
```

Create an `env.local`:

```
NEXT_PUBLIC_URL_LOCAL=http://localhost:3000
NEXT_PUBLIC_API_URL_LOCAL=http://localhost:8080/api
```

**Backend:**

```
cd api
make install
make run-dev
```

Create an `env.development`:

```
DB_HOST=localhost
DB_NAME=
DB_USER=postgres
DB_PASSWORD=
DB_PORT=5432
```

## Docs

- [Data Modelling](./docs/data-model.md)
- [Deployment Practice](./docs/deploy.md)
- [Backend REST API Routes](./docs/routes.md)
