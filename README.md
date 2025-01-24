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
cd path/to/backend

<!-- 1. make sure to have docker and docker compose installed
2. cd into the backend folder/directory and run *docker compose up -d*
3. Once done, run *docker exec -it newsaggregator-php php artisan migrate* to run the db migrations
4. Once completed succesfully, scrape the articles and add data to the database by running *docker exec -it newsaggregator-php php artisan scrape:all-articles*
5. After succesful completion, the backend should be running on port 8080 and the db should have all the scrapped articles.
6. Now, to run the frontend, cd into the frontend folder and run *docker build -t frontend .* to create build the dockerfile
7. To run the react frontend, run the docker image on port 3000 - *docker run -p 3000:80 frontend* -->