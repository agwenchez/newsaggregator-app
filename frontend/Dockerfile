FROM node:20-alpine3.20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

# # # Clean npm cache and remove existing node_modules(if any)
# RUN rm -rf node_modules && rm -f package-lock.json

RUN npm i --legacy-peer-deps

COPY ./ ./

RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=build /usr/src/app/nginx /etc/nginx/conf.d

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"] 


