.PHONY: up down dev-db logs build

up:
	docker compose up -d --build

down:
	docker compose down

dev-db:
	docker compose -f docker-compose.dev.yml up -d

logs:
	docker compose logs -f

build:
	docker compose build
