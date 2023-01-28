FROM node:19 AS build 

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production
COPY . .

RUN npm install react-scripts
RUN npm run build

FROM nginx:1.21.1-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
