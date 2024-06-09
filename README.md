# Telegram Web Application

This project consists of a Telegram bot and a web application. The Telegram bot interacts with users and the web application provides a user interface for signing up and viewing profiles. 

The project follows Domain-Driven Design (DDD), Clean Architecture, Dependency Inversion, and Interface Segregation principles.

## Prerequisites

- Docker
- Docker Compose

## Running the Project

To run the project, follow these steps:

Run the Project:
Use the following command to build and start the Docker containers:

```
docker-compose up --build
```

## Running Migrations

It is not necessary to run migrations for the project to work. Docker-compose will automatically run the migrations when the PostgreSQL container starts for the sake of the simplicity of this demonstration.


Use Docker Compose to run the migrations within the Docker network:

```
docker-compose run bot-migrations
```


## Environment Variables

.env file is consist of the following environment variables:

- **DATABASE_URL:** The connection string for the PostgreSQL database.
- **TELEGRAM_BOT_TOKEN:** The token for the Telegram bot.
- **TELEGRAM_API_URL:** The base URL for the Telegram API.
- **WEB_APP_URL:** The URL for the web application.


## Accessing the Web Application
To reach the web application, open your web browser and navigate to:

- http://localhost
- http://127.0.0.1

## Adding the Admin User

- Open `telegram.service.ts` file in the directory.
- Edit the `adminIds` array with your Telegram user ID.