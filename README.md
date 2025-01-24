# News Aggregator Application Setup Guide

This guide will walk you through setting up and running the **News Aggregator** application, which consists of both **backend** and **frontend** components, using **Docker** and **Docker Compose**. Follow these steps to get the system up and running on your local machine.

## Prerequisites

Before starting, ensure that you have the following software installed:

- **Docker**: Docker is a platform that allows you to build and run containers.
- **Docker Compose**: Docker Compose is a tool to define and run multi-container Docker applications.

If you do not have Docker and Docker Compose installed, follow the official installation guides:

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## Step-by-Step Setup

### 1. Backend Setup

#### 1.1. Navigate to the Backend Directory

First, open a terminal (or command prompt) and navigate to the `backend` directory where the backend services are located:

```bash
cd backend
```

#### 1.2. Run Docker Compose to Start the Backend

Once inside the backend folder, use the following command to start the backend services using Docker Compose:

```bash
docker compose up -d
```

This command will do the following:

- Pull the necessary Docker images if they are not available locally.
- Create the required containers based on the docker-compose.yml configuration.
- Start the backend services in detached mode, meaning they will run in the background.
- The backend will run in a PHP container and other required services (like the database) will also be set up automatically.

#### 1.3. Run Database Migrations

After the backend containers are up and running, you need to run the database migrations to set up the necessary tables. Execute the following command:

```bash
docker exec -it newsaggregator-php php artisan migrate
```

This will run the Laravel artisan migrate command inside the running container. The migrations will create the necessary tables in your database for storing articles and other data.

#### 1.4. Verify Backend

The backend should now be running on port 8080. You can verify that it is working by navigating to the following URL in your browser:

```bash
http://localhost:8080
```

This should display `Backend routes for the news aggregrator application` either on browser or postman.

#### 1.5. Scrape Articles and Populate the Database

Once the migrations are successful, it's time to scrape articles and populate the database. Run the following command:

```bash
docker exec -it newsaggregator-php php artisan scrape:all-articles
```

This command will trigger the scraping process, where the backend will collect articles from various sources and store them in the database.

Once the process is complete, the database will be populated with the scraped articles, and you'll have a fully functional backend.



All APIs are versioned as e.g.

```bash
http://localhost:8080/api/v1/articles
```

### 2. Frontend Setup

2.1. Navigate to the Frontend Directory
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
```


#### 2.2. Build the Docker Image for the Frontend
In the frontend directory, build the Docker image using the following command:

```bash
docker build -t frontend .
```
This will build the Docker image based on the Dockerfile in the current directory. The image will contain your React application along with all the required dependencies.


#### 2.3
To run the frontend and expose it on port 3000, execute the following command:

```bash
http://localhost:3000
```

The frontend is now accessible via the above port.

