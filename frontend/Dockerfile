# Use Nginx to serve the built React app
FROM nginx:stable-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
# COPY ./nginx/default.conf /etc/nginx/conf.d/

# # Copy the pre-built dist folder from the local machine
COPY ./dist /usr/share/nginx/html


EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
