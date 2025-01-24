1. make sure to have docker installed
2. cd into the backend folder and run docker compose up -d
3. once done, run docker exec -it newsaggregator-php php artisan migrate to run the migrations
4. to scrape the articlesa and add data to the database, run docker exec -it newsaggregator-php php artisan scrape:all-articles
5. Once done, the backend should be running on port 8080 and the db should have all the scrapped articles
6. cd into the frontend folder and run npm run build to create the dist folder
7. run the 